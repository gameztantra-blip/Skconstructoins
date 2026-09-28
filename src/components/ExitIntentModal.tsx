import React, { useState, useEffect } from "react";
import { isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

const SESSION_KEY = "sk_exit_intent_shown";

interface ExitIntentModalProps {
  onSuccess?: (name: string, leadId: string, whatsappUrl: string) => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already shown in this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // 1. Desktop mouseleave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 && !sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setIsOpen(true);
      }
    };

    // 2. Mobile 45-second timer trigger
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setIsOpen(true);
      }
    }, 45000); // 45 seconds

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIndianPhone(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian WhatsApp number (starts with 6-9)");
      return;
    }
    setPhoneError("");

    setIsSubmitting(true);
    try {
      const result = await submitLead({
        name,
        phone,
        sourcePage: window.location.pathname,
        sourceForm: "ExitIntentPopup_CostGuide2026",
        message: "Requested Free Construction Cost Guide 2026 PDF + Vastu Checklist",
      });

      setIsSubmitting(false);
      setIsOpen(false);
      if (onSuccess) {
        onSuccess(name, result.leadId, result.whatsappUrl);
      }
    } catch {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-[#dee3ec] text-left">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eff4fe] hover:bg-[#dee3ec] text-[#171c23] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#ffdbc8] text-[#743500] text-[11px] font-inter font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[14px]">menu_book</span>
          Free Construction Cost Guide 2026
        </div>

        <h3 className="font-manrope text-[22px] font-extrabold text-[#04060a] leading-tight mb-2">
          Before You Leave — Get the 2026 Bangalore Cost &amp; Vastu Guide
        </h3>

        <p className="font-inter text-[13px] text-[#45474b] leading-relaxed mb-4">
          Includes current Q2 steel &amp; cement rate indices, BBMP bye-law setback tables, and our 100-point Vastu checklist for independent houses.
        </p>

        {/* Benefits checklist */}
        <div className="space-y-1.5 mb-5 bg-[#f8f9ff] p-3.5 rounded-xl border border-[#dee3ec] text-[12px] font-inter text-[#171c23]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2f7d4f]">check_circle</span>
            <span>2026 Itemized BOQ Rates (₹/sq.ft) by Locality</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2f7d4f]">check_circle</span>
            <span>100% Vastu Orientation Blueprint Guide</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#2f7d4f]">check_circle</span>
            <span>Escrow Protection Checklist for Homeowners</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Sharma"
              className="w-full h-11 px-3.5 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
              WhatsApp Number (+91) *
            </label>
            <div className="flex">
              <span className="h-11 px-3 bg-[#dee3ec] text-[#45474b] rounded-l-lg flex items-center font-inter font-semibold text-[13px]">
                +91
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError("");
                }}
                placeholder="98450 12345"
                maxLength={10}
                className="w-full h-11 px-3 rounded-r-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
              />
            </div>
            {phoneError && (
              <p className="text-[11px] text-red-600 mt-1 font-inter">{phoneError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#25D366] hover:bg-[#20BD5A] text-white font-manrope font-bold text-[14px] rounded-lg shadow-md flex items-center justify-center gap-2 mt-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Send PDF &amp; Checklist to WhatsApp</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center font-inter text-[#76777b]">
            Direct PDF dispatch. Zero spam calls. DPDP Act Compliant.
          </p>
        </form>
      </div>
    </div>
  );
};
