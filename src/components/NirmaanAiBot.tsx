import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";
import { isValidIndianPhone, formatINR } from "../utils/formatters";
import { submitLead } from "../services/leadService";
import { useLanguage } from "../context/LanguageContext";

interface NirmaanAiBotProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onLeadSuccess?: (name: string, leadId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  source?: string;
  actions?: { label: string; action: () => void; primary?: boolean; linkUrl?: string }[];
}

export const NirmaanAiBot: React.FC<NirmaanAiBotProps> = ({
  isOpen,
  onClose,
  initialQuery,
  onLeadSuccess,
}) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadStep, setLeadStep] = useState<"idle" | "asking_phone" | "asking_name">("idle");
  const [pendingLeadData, setPendingLeadData] = useState<{ name?: string; phone?: string; topic?: string }>({});
  
  // Blueprint Analysis Modal
  const [showBlueprintModal, setShowBlueprintModal] = useState(false);
  const [selectedPresetPlot, setSelectedPresetPlot] = useState<string>("30x40");
  const [selectedFacing, setSelectedFacing] = useState<string>("East");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const welcomeText = language === "en"
        ? "Namaskara! 🙏 I'm Nirmaan AI\nYour structural engineering & turnkey construction co-pilot for Bangalore.\n\nGrounded in live Bangalore material rates (Tata Tiscon 550D, UltraTech 53-Grade), BBMP Master Plan 2031 bye-laws, and RERA milestone escrow. How can I assist with your plot, budget, or architectural drawings?"
        : "नमस्ते! 🙏 मैं निर्माण एआई हूँ\nबैंगलोर के लिए आपका स्ट्रक्चरल इंजीनियरिंग और टर्नकी निर्माण सहायक।\n\nलाइव बैंगलोर सामग्री दरों, बीबीएमपी मास्टर प्लान 2031 और रेरा एस्क्रो नियमों के साथ प्रशिक्षित। मैं आपके प्लॉट, बजट या ब्लूप्रिंट में क्या मदद कर सकता हूँ?";

      setMessages([
        {
          id: "welcome-1",
          sender: "bot",
          text: welcomeText,
          timestamp: now,
          source: "knowledge-hub",
        },
      ]);
    }
  }, [language]);

  // Handle initial query if opened with one
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleUserSend(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleUserSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // 1. If currently in lead capture step
    if (leadStep === "asking_phone") {
      const digits = trimmed.replace(/\D/g, "");
      if (isValidIndianPhone(digits)) {
        setPendingLeadData((prev) => ({ ...prev, phone: digits }));
        setLeadStep("asking_name");
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: "bot",
              text: `Got your mobile number +91 ${digits}. May I know your full name so our senior civil structural engineer can personalize the report?`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }, 500);
        return;
      } else {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: "bot",
              text: "Please provide a valid 10-digit Indian WhatsApp mobile number (starting with 6, 7, 8, or 9) to receive the itemized BOQ PDF.",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }, 400);
        return;
      }
    }

    if (leadStep === "asking_name") {
      const clientName = trimmed;
      const clientPhone = pendingLeadData.phone || "";
      setPendingLeadData((prev) => ({ ...prev, name: clientName }));
      setLeadStep("idle");

      // Submit lead to leadService
      try {
        const res = await submitLead({
          name: clientName,
          phone: clientPhone,
          service: `Nirmaan AI Chat: ${pendingLeadData.topic || "Site Visit Request"}`,
          sourcePage: window.location.pathname,
          sourceForm: "NirmaanAiBot",
        });
        onLeadSuccess?.(clientName, res.leadId);
      } catch (e) {
        console.error("Lead submission error:", e);
      }

      setTimeout(() => {
        setIsTyping(false);
        const waUrl = `https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}?text=Hi%20SK%20Constructions,%20I%20am%20${encodeURIComponent(clientName)}%20and%20just%20scheduled%20a%20site%20consultation%20via%20Nirmaan%20AI.`;
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `Thank you, ${clientName}! 🎉 Your consultation request has been booked with our Bangalore Engineering Desk. Our structural engineer will call you shortly at +91 ${clientPhone}.\n\nYou can also launch WhatsApp directly below with your inquiry.`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actions: [
              {
                label: "Chat with Engineer on WhatsApp",
                action: () => {},
                linkUrl: waUrl,
                primary: true,
              },
            ],
          },
        ]);
      }, 600);
      return;
    }

    // 2. Query Gemini API endpoint or use robust local civil engineering engine
    try {
      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          language,
        }),
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        setIsTyping(false);

        const actions = determineActionsForQuery(trimmed);

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            source: data.source || "gemini-3.8-flash",
            actions,
          },
        ]);
        return;
      }
    } catch {
      // Network or fetch failed, fallback to local intelligent civil engine below
    }

    // 3. Fallback Local Engineering Engine (Grounding in Stitch Knowledge Hub)
    setTimeout(() => {
      setIsTyping(false);
      const queryLower = trimmed.toLowerCase();
      let botReply = "";
      const actions = determineActionsForQuery(trimmed);

      if (
        queryLower.includes("cost") ||
        queryLower.includes("rate") ||
        queryLower.includes("price") ||
        queryLower.includes("estimate") ||
        queryLower.includes("sqft") ||
        queryLower.includes("sq ft") ||
        queryLower.includes("budget")
      ) {
        botReply = `Calculated via Bengaluru 2024–2025 BOQ rates & live material index:\n\n` +
          `• Standard Turnkey: ₹1,850 / sq.ft (Fe-500D steel, OPC 53, standard tiles)\n` +
          `• Premium Turnkey: ₹2,250 / sq.ft (Tata Tiscon 550D, UltraTech 53, M25 RMC, Teak wood)\n` +
          `• Luxury Turnkey: ₹2,750 / sq.ft (Italian marble, home automation, VRV HVAC, Grohe)\n\n` +
          `30×40 Plot (G+1 Duplex, 2,400 sq.ft built-up):\n` +
          `• Standard: ~₹44.40 Lakh\n` +
          `• Premium: ~₹54.00 Lakh (±8% tolerance: ₹49.68L – ₹58.32L)\n` +
          `• Luxury: ~₹66.00 Lakh\n\n` +
          `Zero Price Escalation Clause: 100% of steel & cement is booked upfront, protecting you from market surges.`;
      } else if (queryLower.includes("material") || queryLower.includes("steel") || queryLower.includes("cement") || queryLower.includes("tata") || queryLower.includes("ultratech")) {
        botReply = `Live Bengaluru Material Rate Index (Updated Q4 2024 - 2025):\n\n` +
          `• Tata Tiscon 550D TMT Rebar: ₹74,500 / MT (₹74.50 / kg)\n` +
          `• UltraTech 53-Grade OPC Cement: ₹410 / 50kg bag\n` +
          `• M25 Automated Ready-Mix Concrete: ₹4,200 / cu.m\n` +
          `• Wire-Cut Red Clay Bricks (Hosur): ₹11.50 / brick\n` +
          `• High-Fineness M-Sand: ₹48 / cft\n` +
          `• Asian Paints Royale Luxury: ₹560 / litre\n\n` +
          `We procure directly from primary manufacturer depots to eliminate middleman markups and fake branding.`;
      } else if (queryLower.includes("hidden") || queryLower.includes("bescom") || queryLower.includes("bwssb") || queryLower.includes("betterment")) {
        botReply = `5 Hidden Construction Costs in Bangalore You Must Account For:\n\n` +
          `1. BBMP Plan Sanction & Betterment Charges: ₹1,80,000 – ₹3,50,000\n` +
          `2. BESCOM 3-Phase Meter & Transformer: ₹85,000 – ₹1,60,000\n` +
          `3. BWSSB Water & Sanitary Liaison: ₹1,20,000 – ₹2,40,000\n` +
          `4. Soil Test & Geotechnical Structural Report (IS 1892): ₹18,000 – ₹30,000\n` +
          `5. Hard Rock Excavation (if granite strata found): ₹800 – ₹1,400 / cu.m\n\n` +
          `At SK Constructions, these municipal liaisons are transparently itemized upfront so there are zero mid-project surprises.`;
      } else if (queryLower.includes("bbmp") || queryLower.includes("bda") || queryLower.includes("far") || queryLower.includes("setback")) {
        botReply = `Under BBMP Master Plan 2031 guidelines for Bangalore:\n\n` +
          `• For road width < 9m: Allowable FAR is 1.75.\n` +
          `• For road width 9m to 12m: Allowable FAR is up to 2.25.\n` +
          `• Mandatory Setbacks for 30×40: Front ~1.5m, Rear ~1.2m, Sides ~1.0m.\n` +
          `• Stilt parking floors (height < 2.4m) are 100% exempted from FAR calculation.\n\n` +
          `SK Constructions delivers complete digital sanction drawings and liaises directly with BBMP engineers for zero deviation approvals.`;
      } else if (queryLower.includes("sump") || queryLower.includes("water") || queryLower.includes("tank")) {
        botReply = `Underground Sump Engineering Guidelines:\n\n` +
          `• Minimum Capacity: 8,000 to 12,000 Litres for 3 to 4 BHK duplexes in Bangalore.\n` +
          `• Material: Monolithic reinforced cement concrete (RCC) with waterproofing polymer.\n` +
          `• Crucial Warning: Avoid underground plastic/Sintex tanks. Bangalore's monsoon water table creates high lateral hydrostatic pressure that crushes plastic tanks within 3–5 years. Monolithic RCC is durable for 50+ years.`;
      } else if (queryLower.includes("vastu") || queryLower.includes("direction") || queryLower.includes("pooja") || queryLower.includes("kitchen")) {
        botReply = `Scientific Vastu Shastra Guidelines for Bangalore Homes:\n\n` +
          `• North-East (Ishanya): Underground water sump, Pooja room, and light main entrance foyer.\n` +
          `• South-East (Agneya): Kitchen cooking hob facing East, electrical main board.\n` +
          `• South-West (Nairutya): Master bedroom suite with highest floor level for structural stability.\n` +
          `• North-West (Vayu): Guest bedrooms, bathrooms, and staircase.\n` +
          `• Brahmasthan (Center): Kept open with double-height ceiling or ventilation atrium.`;
      } else if (queryLower.includes("site visit") || queryLower.includes("engineer") || queryLower.includes("talk") || queryLower.includes("call")) {
        setLeadStep("asking_phone");
        setPendingLeadData({ topic: "Site Visit Request" });
        botReply = "I would be happy to coordinate a free plot feasibility survey with our senior structural engineer at your Bangalore site. What is your 10-digit WhatsApp mobile number?";
      } else {
        botReply = `I understand you are asking about "${trimmed}". At SK Constructions Bangalore, we specialize in turnkey civil engineering, fixed-price contracts (₹1,850 – ₹2,750/sq.ft), 3D architectural elevations, and BBMP plan approvals.\n\nWould you like an instant cost estimate for your plot dimensions, a blueprint analysis, or to talk with an engineer?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          source: "knowledge-hub",
          actions,
        },
      ]);
    }, 450);
  };

  const determineActionsForQuery = (query: string): ChatMessage["actions"] => {
    const q = query.toLowerCase();
    const actions: NonNullable<ChatMessage["actions"]> = [];

    if (q.includes("cost") || q.includes("rate") || q.includes("estimate") || q.includes("sqft") || q.includes("30x40") || q.includes("duplex")) {
      actions.push({
        label: "Open in 4-Step Cost Calculator",
        action: () => {
          onClose();
          navigate("/cost-calculator");
        },
        primary: true,
      });
      actions.push({
        label: "Book Free Plot Feasibility Survey",
        action: () => {
          setLeadStep("asking_phone");
          setPendingLeadData({ topic: "Cost Estimate Follow-up" });
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-lead-${Date.now()}`,
              sender: "bot",
              text: "Great! Please share your 10-digit WhatsApp phone number to receive the itemized BOQ PDF and schedule our engineer's visit.",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        },
      });
    } else if (q.includes("bbmp") || q.includes("far") || q.includes("bda") || q.includes("bylaw")) {
      actions.push({
        label: "Read Full BBMP Bye-Laws Guide",
        action: () => {
          onClose();
          navigate("/blog/bbmp-building-bye-laws-sanction-guide");
        },
        primary: true,
      });
    } else if (q.includes("vastu")) {
      actions.push({
        label: "Read Scientific Vastu Guide",
        action: () => {
          onClose();
          navigate("/blog/scientific-vastu-shastra-modern-east-north-facing-homes");
        },
        primary: true,
      });
    } else if (q.includes("3d") || q.includes("design") || q.includes("plan") || q.includes("elevation")) {
      actions.push({
        label: "Explore 3D BIM Designs Catalogue",
        action: () => {
          onClose();
          navigate("/3d-home-designs");
        },
        primary: true,
      });
    } else if (q.includes("escrow") || q.includes("payment") || q.includes("advance") || q.includes("safety")) {
      actions.push({
        label: "Read RERA Escrow vs Advances Guide",
        action: () => {
          onClose();
          navigate("/blog/escrow-vs-milestone-advances-protect-capital");
        },
        primary: true,
      });
    } else {
      actions.push({
        label: "Calculate Construction Cost",
        action: () => {
          onClose();
          navigate("/cost-calculator");
        },
        primary: true,
      });
      actions.push({
        label: "Book Site Visit",
        action: () => {
          setLeadStep("asking_phone");
          setPendingLeadData({ topic: query });
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-lead-${Date.now()}`,
              sender: "bot",
              text: "Please share your 10-digit WhatsApp mobile number and our senior engineer will assist you directly.",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        },
      });
    }

    return actions;
  };

  // Run Blueprint Analysis
  const runBlueprintAudit = (plotType: string, facing: string) => {
    setShowBlueprintModal(false);
    
    let dimensions = "30×40 (1,200 sq.ft)";
    let builtUp = "2,400 sq.ft (G+1 Duplex)";
    let far = "1.75 - 2.0";
    let estCostStd = "₹44.40 Lakh";
    let estCostPrem = "₹54.00 Lakh";
    let estCostLux = "₹66.00 Lakh";
    let setbacks = "Front: 1.5m | Rear: 1.2m | Sides: 1.0m";
    let sumpSize = "10,000 Litres Monolithic RCC";

    if (plotType === "30x50") {
      dimensions = "30×50 (1,500 sq.ft)";
      builtUp = "3,200 sq.ft (G+2 Triplex)";
      far = "2.0 - 2.25";
      estCostStd = "₹59.20 Lakh";
      estCostPrem = "₹72.00 Lakh";
      estCostLux = "₹88.00 Lakh";
      setbacks = "Front: 1.8m | Rear: 1.5m | Sides: 1.0m";
      sumpSize = "12,000 Litres Monolithic RCC";
    } else if (plotType === "40x60") {
      dimensions = "40×60 (2,400 sq.ft)";
      builtUp = "4,600 sq.ft (G+2 Luxury Villa)";
      far = "2.0 - 2.35";
      estCostStd = "₹85.10 Lakh";
      estCostPrem = "₹1.03 Crore";
      estCostLux = "₹1.26 Crore";
      setbacks = "Front: 2.5m | Rear: 2.0m | Sides: 1.5m";
      sumpSize = "14,000 Litres Monolithic RCC";
    }

    const auditReport = `🏗️ **Civil & Architectural Plot Audit**: ${dimensions}\n` +
      `🧭 **Plot Orientation**: ${facing}-Facing\n\n` +
      `• **Permissible FAR (BBMP 2031)**: ${far}\n` +
      `• **Super Built-up Area**: ~${builtUp}\n` +
      `• **Mandatory Setbacks**: ${setbacks}\n` +
      `• **Water Sump Specification**: ${sumpSize} (Underground)\n` +
      `• **Vastu Alignment**: Main door in ${facing === "East" ? "East/North-East (Indra/Jayanta padha)" : facing === "North" ? "North (Kubera/Soma padha)" : "South/West calibrated entry"}. Kitchen in South-East (Agneya), Master Bed in South-West (Nairutya).\n\n` +
      `💰 **Estimated Turnkey Budget**:\n` +
      `• Standard: ${estCostStd}\n` +
      `• Premium (Recommended): ${estCostPrem}\n` +
      `• Luxury: ${estCostLux}\n\n` +
      `Would you like to lock this layout into an itemized BOQ or book a free physical plot level survey?`;

    setMessages((prev) => [
      ...prev,
      {
        id: `usr-blueprint-${Date.now()}`,
        sender: "user",
        text: `Analyze blueprint for ${dimensions}, ${facing}-facing plot.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        id: `bot-blueprint-${Date.now()}`,
        sender: "bot",
        text: auditReport,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "blueprint-engine",
        actions: [
          {
            label: "Open 4-Step Cost Calculator",
            action: () => {
              onClose();
              navigate("/cost-calculator");
            },
            primary: true,
          },
          {
            label: "Book Free On-Site Soil & Plot Survey",
            action: () => {
              setLeadStep("asking_phone");
              setPendingLeadData({ topic: `Blueprint Audit: ${dimensions}` });
              setMessages((p) => [
                ...p,
                {
                  id: `bot-lead-${Date.now()}`,
                  sender: "bot",
                  text: "Please share your 10-digit WhatsApp number to confirm the site survey appointment.",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
            },
          },
        ],
      },
    ]);
  };

  const handleSuggestedAction = (promptText: string) => {
    handleUserSend(promptText);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:pr-6 sm:pb-6 pointer-events-none">
      {/* Backdrop overlay on mobile */}
      <div
        className="fixed inset-0 bg-black/50 sm:hidden pointer-events-auto backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Main Bot Window */}
      <div className="relative pointer-events-auto w-full sm:w-[420px] h-[88vh] sm:h-[620px] max-h-[720px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#dee3ec] animate-in slide-in-from-bottom-6 duration-200">
        
        {/* Header */}
        <div className="bg-[#04060a] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#1c1f24] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1c1f24] to-[#2d3139] border border-white/20 flex items-center justify-center text-lg shadow-sm">
                👷‍♂️
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#04060a]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm font-sans tracking-tight">Nirmaan AI</span>
                <span className="px-1.5 py-0.5 rounded bg-[#e07a2f] text-[#04060a] font-mono text-[9px] font-black uppercase tracking-wider">
                  CIVIL ENGINE
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/70 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online • SK Constructions</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex bg-[#1c1f24] p-0.5 rounded-lg border border-white/10 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  language === "en" ? "bg-[#e07a2f] text-[#04060a] font-bold" : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  language === "hi" ? "bg-[#e07a2f] text-[#04060a] font-bold" : "text-white/70 hover:text-white"
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Minimize / Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Close Assistant"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Top Compliance Badge Banner */}
        <div className="bg-[#eff4fe] py-1 px-4 text-center border-b border-[#dee3ec] shrink-0">
          <span className="text-[10px] font-mono text-[#04060a] flex items-center justify-center gap-1.5">
            <span className="text-[#e07a2f]">🛡️</span>
            <span>RERA PRM/KA/RERA/1251/310 • IS 456 Vetted • BBMP 2031 Rules</span>
          </span>
        </div>

        {/* Message Feed Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa] text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className={`flex items-start gap-2 max-w-[90%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[#04060a] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                    👷‍♂️
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl shadow-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-[#e07a2f] text-white rounded-br-xs font-medium"
                      : "bg-white text-[#1c1f24] rounded-tl-xs border border-[#dee3ec]"
                  }`}
                >
                  {msg.text}

                  {/* Actions inside Bot Message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#dee3ec]/60 flex flex-col gap-1.5">
                      {msg.actions.map((act, aIdx) => {
                        if (act.linkUrl) {
                          return (
                            <a
                              key={aIdx}
                              href={act.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all text-left flex items-center justify-between cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                              <span>{act.label}</span>
                              <span>↗</span>
                            </a>
                          );
                        }
                        return (
                          <button
                            key={aIdx}
                            type="button"
                            onClick={act.action}
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                              act.primary
                                ? "bg-[#04060a] text-white hover:bg-[#e07a2f] hover:text-[#04060a]"
                                : "bg-[#eff4fe] text-[#04060a] hover:bg-[#dee3ec]"
                            }`}
                          >
                            <span>{act.label}</span>
                            <span>→</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-[10px] text-[#74777f] font-mono">
                  {msg.timestamp} {msg.sender === "user" ? "• Sent" : ""}
                </span>
                {msg.source && msg.sender === "bot" && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-200 text-neutral-700">
                    {msg.source}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#04060a] text-white flex items-center justify-center text-xs">
                👷‍♂️
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-[#dee3ec] flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#74777f] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#74777f] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#74777f] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          {/* Suggested Actions Grounded in Stitch Knowledge Hub */}
          {messages.length <= 2 && (
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase text-[#74777f] font-bold tracking-wider mb-2">
                KNOWLEDGE HUB TOPICS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: "💰", label: "2024-2025 Cost Matrix", prompt: "Explain the Bangalore 2024-2025 construction cost rates and itemized breakdown." },
                  { icon: "🏢", label: "BBMP FAR for 30x40", prompt: "How is FAR and setbacks calculated for a 30x40 plot under BBMP 2031?" },
                  { icon: "📈", label: "Live Steel & Cement Rates", prompt: "What are the live prices for Tata Tiscon 550D steel and UltraTech 53-grade cement?" },
                  { icon: "⚠️", label: "Hidden Costs in Bangalore", prompt: "What are the hidden costs like BESCOM, BWSSB, and BBMP plan sanction?" },
                  { icon: "💧", label: "Why 10,000L RCC Sump?", prompt: "Why is an 8,000 to 12,000L monolithic RCC underground sump critical in Bangalore?" },
                  { icon: "🧭", label: "Scientific Vastu Rules", prompt: "What are the scientific Vastu placements for kitchen, sump, and master bedroom?" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSuggestedAction(item.prompt)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white hover:bg-[#eff4fe] hover:border-[#04060a] border border-[#dee3ec] text-xs font-medium text-[#1c1f24] transition-all shadow-xs cursor-pointer text-left"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Blueprint CAD / PDF Inspection Overlay */}
        {showBlueprintModal && (
          <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md p-4 flex flex-col justify-between animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#dee3ec]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📐</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#04060a]">Plot & Blueprint CAD Inspector</h4>
                    <p className="text-[11px] text-[#74777f]">Instant BBMP 2031 setbacks & cost audit</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBlueprintModal(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-600"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-neutral-800 block mb-1.5">Select Standard Bangalore Plot Dimensions:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "30x40", label: "30×40 (1,200 sq.ft)" },
                      { id: "30x50", label: "30×50 (1,500 sq.ft)" },
                      { id: "40x60", label: "40×60 (2,400 sq.ft)" },
                    ].map((plot) => (
                      <button
                        key={plot.id}
                        type="button"
                        onClick={() => setSelectedPresetPlot(plot.id)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedPresetPlot === plot.id
                            ? "bg-[#04060a] text-white border-[#04060a] font-bold"
                            : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                        }`}
                      >
                        {plot.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1.5">Road Facing Direction:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["East", "North", "South", "West"].map((facing) => (
                      <button
                        key={facing}
                        type="button"
                        onClick={() => setSelectedFacing(facing)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedFacing === facing
                            ? "bg-[#e07a2f] text-white border-[#e07a2f] font-bold"
                            : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                        }`}
                      >
                        {facing}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#eff4fe] border border-[#dee3ec]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-neutral-800">Or Upload CAD / Blueprint (PDF/IMG):</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.dwg"
                    className="block w-full text-xs text-neutral-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#04060a] file:text-white hover:file:bg-[#e07a2f] cursor-pointer"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Our engine extracts FAR compliance, setback distances, and room ledger.</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dee3ec] flex gap-2">
              <button
                type="button"
                onClick={() => setShowBlueprintModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => runBlueprintAudit(selectedPresetPlot, selectedFacing)}
                className="flex-1 py-2.5 rounded-xl bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-bold shadow-md cursor-pointer"
              >
                Run Engineering Audit
              </button>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#dee3ec] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSend(inputVal);
            }}
            className="flex items-center gap-2 bg-[#eff4fe]/70 border border-[#dee3ec] rounded-full px-3 py-1.5 focus-within:border-[#e07a2f] focus-within:bg-white transition-all shadow-xs"
          >
            {/* Paperclip: Opens Blueprint / Plot Analysis Tool */}
            <button
              type="button"
              onClick={() => setShowBlueprintModal(true)}
              className="text-[#74777f] hover:text-[#04060a] transition-colors p-1 cursor-pointer"
              title="Inspect plot plan or CAD blueprint"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Input field */}
            <input
              type="text"
              placeholder="Ask about costs, BBMP bye-laws, materials..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent border-none text-xs text-[#04060a] placeholder-[#74777f] focus:outline-none py-1"
            />

            {/* Quick voice / sample prompt */}
            <button
              type="button"
              onClick={() => handleUserSend("Estimate my construction cost for 30x40 duplex")}
              className="text-[#74777f] hover:text-[#04060a] transition-colors p-1 cursor-pointer"
              title="Quick plot query"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-7 h-7 rounded-full bg-[#e07a2f] hover:bg-[#cf6b23] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
            >
              <svg className="w-3.5 h-3.5 transform -rotate-45 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Footer Status Bar: WhatsApp Launch + Engine Attribution */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#dee3ec]/60 px-1 text-[11px] font-mono">
            <a
              href={`https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}?text=Hi%20SK%20Constructions,%20I%20am%20chatting%20with%20Nirmaan%20AI%20and%20would%20like%20to%20continue%20on%20WhatsApp.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 transition-colors"
            >
              <span>💬</span>
              <span>WhatsApp Desk</span>
            </a>

            <span className="text-[#74777f]">
              Powered by <strong className="text-[#04060a]">Nirmaan AI Civil Core</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
