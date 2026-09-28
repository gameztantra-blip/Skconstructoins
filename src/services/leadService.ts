/**
 * Centralized Lead Capture & CRM Service
 * Captures all user leads across hero forms, cost calculator, consultation popups,
 * exit-intent modals, and service quote requests.
 */

import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  locality?: string;
  service?: string;
  packageTier?: string;
  budgetEstimate?: number | string;
  plotSize?: string;
  builtUpArea?: number | string;
  timeline?: string;
  message?: string;
  notes?: string;
  sourcePage?: string;
  sourceForm?: string;
  loanRequired?: boolean;
}

export interface StoredLead extends LeadPayload {
  id: string;
  timestamp: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  referrer: string;
  deviceType: "Mobile" | "Tablet" | "Desktop";
  leadScore: number;
  status: "new" | "synced" | "whatsapp_initiated";
}

// Key for sessionStorage UTM parameters
const UTM_STORAGE_KEY = "sk_utm_params";
const LEADS_STORAGE_KEY = "sk_captured_leads";

/**
 * Initialize UTM parameter extraction on page load
 */
export function initializeUtmTracking(): void {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");
  const utmTerm = urlParams.get("utm_term");
  const utmContent = urlParams.get("utm_content");

  if (utmSource || utmMedium || utmCampaign) {
    const utmData = {
      utmSource: utmSource || "",
      utmMedium: utmMedium || "",
      utmCampaign: utmCampaign || "",
      utmTerm: utmTerm || "",
      utmContent: utmContent || "",
      firstVisit: new Date().toISOString(),
    };
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  }
}

export const initLeadTracking = initializeUtmTracking;

/**
 * Retrieve saved UTM tracking parameters
 */
export function getSavedUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Detect client device type
 */
export function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof window === "undefined") return "Desktop";
  const width = window.innerWidth;
  if (width < 768) return "Mobile";
  if (width < 1024) return "Tablet";
  return "Desktop";
}

/**
 * Calculate automated lead qualification score (0 to 100)
 */
export function calculateLeadScore(lead: LeadPayload): number {
  let score = 20; // Base score for filling form

  // Timeline readiness
  if (lead.timeline?.toLowerCase().includes("immediate") || lead.timeline?.toLowerCase().includes("month")) {
    score += 30;
  } else if (lead.timeline?.toLowerCase().includes("3")) {
    score += 25;
  } else {
    score += 10;
  }

  // Budget / Package tier
  if (lead.packageTier === "luxury" || String(lead.budgetEstimate).includes("Cr")) {
    score += 25;
  } else if (lead.packageTier === "premium" || Number(lead.budgetEstimate) > 5000000) {
    score += 20;
  } else {
    score += 10;
  }

  // Plot details provided
  if (lead.plotSize || lead.builtUpArea) {
    score += 15;
  }

  // Locality provided
  if (lead.locality && lead.locality !== "all") {
    score += 10;
  }

  return Math.min(100, score);
}

/**
 * Central Lead Submission Handler
 */
export async function submitLead(payload: LeadPayload): Promise<{ success: boolean; leadId: string; whatsappUrl: string }> {
  const utm = getSavedUtmParams();
  const leadId = `SK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
  const score = calculateLeadScore(payload);

  const fullLead: StoredLead = {
    ...payload,
    id: leadId,
    timestamp: new Date().toISOString(),
    utmSource: utm.utmSource || "",
    utmMedium: utmMedium(utm),
    utmCampaign: utm.utmCampaign || "",
    utmTerm: utm.utmTerm || "",
    referrer: typeof document !== "undefined" ? document.referrer || "Direct" : "Direct",
    deviceType: getDeviceType(),
    leadScore: score,
    status: "new",
  };

  // 1. LocalStorage Persistence Backup (for offline or non-CRM deployments)
  if (CONSTRUCTION_CONFIG.leads.enableLocalStorageBackup && typeof window !== "undefined") {
    try {
      const existingRaw = localStorage.getItem(LEADS_STORAGE_KEY);
      const existing: StoredLead[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift(fullLead);
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {
      console.warn("Could not save lead to localStorage", e);
    }
  }

  // 2. Dispatch to Google Apps Script Web App (Webhook) or external CRM
  if (CONSTRUCTION_CONFIG.leads.googleAppsScriptUrl) {
    try {
      fetch(CONSTRUCTION_CONFIG.leads.googleAppsScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullLead),
      }).catch((err) => {
        console.warn("Webhook fetch caught error (graceful fallback)", err);
      });
    } catch (e) {
      console.warn("Could not post to webhook endpoint", e);
    }
  }

  // 3. Generate WhatsApp direct message URL
  const waMessage = `Hi SK Constructions,\nI submitted an inquiry on ${payload.sourcePage || "your website"}.\n\nName: ${payload.name}\nPhone: ${payload.phone}\n${payload.locality ? `Plot Locality: ${payload.locality}\n` : ""}${payload.builtUpArea ? `Built-up Area: ${payload.builtUpArea} sq.ft\n` : ""}${payload.packageTier ? `Preferred Package: ${payload.packageTier}\n` : ""}${payload.budgetEstimate ? `Est. Budget: ${payload.budgetEstimate}\n` : ""}\nPlease share the detailed BOQ & structural drawings schedule.`;

  const whatsappUrl = `https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return {
    success: true,
    leadId,
    whatsappUrl,
  };
}

function utmMedium(utm: Record<string, string>): string {
  return utm.utmMedium || "";
}
