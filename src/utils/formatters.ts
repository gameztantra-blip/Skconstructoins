/**
 * Indian Currency & Number Formatting Utilities
 * Handles Lakhs, Crores, INR symbols, and phone validations
 */

import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

/**
 * Format a number as Indian Currency (e.g., ₹68,85,000)
 */
export function formatINR(amount: number, showDecimals = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return "₹0";
  const rounded = Math.round(amount);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(rounded);
}

/**
 * Format large amounts using standard Indian Lakhs / Crores representation
 * Examples:
 * - 18500000 -> ₹1.85 Cr
 * - 5512000 -> ₹55.12 Lakhs
 * - 85000 -> ₹85,000
 */
export function formatLakhsCrores(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return "₹0";
  const abs = Math.abs(amount);
  
  if (abs >= 10000000) {
    // 1 Crore = 10,000,000
    const cr = amount / 10000000;
    const formatted = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2);
    return `₹${formatted} Cr`;
  } else if (abs >= 100000) {
    // 1 Lakh = 100,000
    const lakh = amount / 100000;
    const formatted = lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2);
    return `₹${formatted} Lakhs`;
  }
  
  return formatINR(amount);
}

/**
 * Validate Indian phone numbers (10 digits starting with 6, 7, 8, 9)
 */
export function isValidIndianPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
  // If starts with 91 and has 12 digits, strip 91
  const digits = cleaned.startsWith("91") && cleaned.length === 12 
    ? cleaned.slice(2) 
    : (cleaned.startsWith("0") && cleaned.length === 11 ? cleaned.slice(1) : cleaned);
  
  return /^[6-9]\d{9}$/.test(digits);
}

/**
 * Clean phone to pure 10-digit format
 */
export function cleanIndianPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned.slice(2);
  }
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Generate a WhatsApp click-to-chat URL with pre-filled message
 */
export function getWhatsAppLink(message: string, customPhone?: string): string {
  const phone = customPhone || CONSTRUCTION_CONFIG.brand.contact.whatsappNumber;
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Standard Home Loan EMI Formula (Reducing Balance)
 * P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEmi(principal: number, annualInterestRate = 8.5, tenureYears = 20): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualInterestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}
