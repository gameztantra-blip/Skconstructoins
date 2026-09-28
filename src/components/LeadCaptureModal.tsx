import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  defaultService?: string;
  defaultLocality?: string;
  onSuccess?: (leadName: string, leadId: string, whatsappUrl: string) => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  title = "Get Free Construction Cost Estimate & 3D Plan",
  subtitle = "Direct consultation with our Senior Structural Civil Engineer at our MG Road HQ.",
  defaultService = "Turnkey Home Construction",
  defaultLocality = "HSR Layout",
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [locality, setLocality] = useState(defaultLocality);
  const [plotSize, setPlotSize] = useState("30x40 (1,200 sq.ft)");
  const [service, setService] = useState(defaultService);
  const [packageTier, setPackageTier] = useState("Premium (₹2,250/sq.ft)");
  const [timeline, setTimeline] = useState("Within 3 Months");
  const [consent, setConsent] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIndianPhone(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number (starts with 6-9)");
      return;
    }
    setPhoneError("");

    if (!consent) {
      setFormError("Please check the consent box to proceed as required by India's DPDP Act.");
      return;
    }
    setFormError("");

    setIsSubmitting(true);
    try {
      const result = await submitLead({
        name,
        phone,
        email,
        locality,
        plotSize,
        service,
        packageTier,
        timeline,
        sourcePage: window.location.pathname,
        sourceForm: "LeadCaptureModal",
      });

      setIsSubmitting(false);
      onClose();
      if (onSuccess) {
        onSuccess(name, result.leadId, result.whatsappUrl);
      }
    } catch {
      setIsSubmitting(false);
      setFormError("There was an issue submitting your request. Please try contacting us on WhatsApp directly.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-[#dee3ec] my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eff4fe] hover:bg-[#dee3ec] text-[#171c23] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="space-y-1 mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#ffdbc8] text-[#743500] text-[11px] font-inter font-bold tracking-wider uppercase">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Zero Escalation Fixed Price Contract
          </div>
          <h3 className="font-manrope text-[22px] font-extrabold text-[#04060a] leading-tight">
            {title}
          </h3>
          <p className="font-inter text-[13px] text-[#45474b]">
            {subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand Murthy"
                className="w-full h-11 px-3.5 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f] transition-all"
              />
            </div>

            <div>
              <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                WhatsApp Phone (+91) *
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
                  className="w-full h-11 px-3 rounded-r-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f] transition-all"
                />
              </div>
              {phoneError && (
                <p className="text-[11px] text-red-600 mt-1 font-inter">{phoneError}</p>
              )}
            </div>
          </div>

          {/* Email & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                Email Address (For BOQ PDF)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anand@gmail.com"
                className="w-full h-11 px-3.5 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f] transition-all"
              />
            </div>

            <div>
              <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                Plot Locality in Bangalore *
              </label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f] transition-all"
              >
                <option value="Indiranagar">Indiranagar &amp; Domlur</option>
                <option value="HSR Layout">HSR Layout &amp; Bellandur</option>
                <option value="Whitefield">Whitefield &amp; ITPL Corridor</option>
                <option value="Sarjapur Road">Sarjapur Road &amp; Carmelaram</option>
                <option value="Hebbal">Hebbal &amp; North Bangalore</option>
                <option value="Koramangala">Koramangala 1st-8th Block</option>
                <option value="JP Nagar">JP Nagar &amp; Jayanagar</option>
                <option value="Electronic City">Electronic City</option>
                <option value="Other">Other Bangalore Area</option>
              </select>
            </div>
          </div>

          {/* Plot Size & Package Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                Plot Size
              </label>
              <select
                value={plotSize}
                onChange={(e) => setPlotSize(e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f] transition-all"
              >
                <option value="30x40 (1,200 sq.ft)">30 × 40 ft (1,200 sq.ft)</option>
                <option value="30x50 (1,500 sq.ft)">30 × 50 ft (1,500 sq.ft)</option>
                <option value="40x60 (2,400 sq.ft)">40 × 60 ft (2,400 sq.ft)</option>
                <option value="50x80 (4,000 sq.ft)">50 × 80 ft (4,000 sq.ft)</option>
                <option value="Custom / Odd Plot">Custom / Odd Plot Dimensions</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                Preferred Construction Tier
              </label>
              <select
                value={packageTier}
                onChange={(e) => setPackageTier(e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f] transition-all"
              >
                <option value="Standard (₹1,850/sq.ft)">Standard (₹1,850/sq.ft)</option>
                <option value="Premium (₹2,250/sq.ft)">Premium (₹2,250/sq.ft)</option>
                <option value="Luxury Royale (₹2,750+/sq.ft)">Luxury Royale (₹2,750+/sq.ft)</option>
              </select>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
              Planned Construction Start
            </label>
            <div className="grid grid-cols-3 gap-2 text-center text-[13px] font-inter">
              {["Immediate / 1 Month", "Within 3 Months", "3-6 Months"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setTimeline(opt)}
                  className={`py-2 px-2 rounded-lg border transition-all ${
                    timeline === opt
                      ? "bg-[#1c1f24] text-white border-[#1c1f24] font-semibold"
                      : "bg-[#eff4fe] text-[#45474b] border-transparent hover:bg-[#dee3ec]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* DPDP Act Compliant Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#e07a2f] focus:ring-[#e07a2f] cursor-pointer"
              />
              <span className="text-[11px] font-inter text-[#45474b] leading-relaxed">
                I authorize SK Constructions to contact me via Call/WhatsApp regarding my construction inquiry. I understand my data is processed strictly in compliance with India's{" "}
                <Link to="/privacy-policy" className="text-[#984800] underline hover:text-[#e07a2f]">
                  DPDP Act &amp; Privacy Policy
                </Link>.
              </span>
            </label>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
              {formError}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-bold text-[15px] rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>Generating Engineering BOQ...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                  <span>Generate Free BOQ &amp; 3D Plan</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center font-inter text-[#76777b] mt-2">
              No sales spam. Direct communication from our licensed structural civil engineer.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
