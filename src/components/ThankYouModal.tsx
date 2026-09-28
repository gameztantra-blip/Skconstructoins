import React, { useEffect } from "react";
import confetti from "canvas-confetti";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName?: string;
  leadId?: string;
  whatsappUrl?: string;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  leadName,
  leadId,
  whatsappUrl,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#e07a2f", "#ff9245", "#2f7d4f", "#1c1f24"],
        });
      } catch {
        // graceful fallback if canvas-confetti is not loaded
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#dee3ec] text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eff4fe] hover:bg-[#dee3ec] text-[#171c23] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#a4f4bc]/40 text-[#00522c] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <div>
            <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#984800]">
              Estimation Request Confirmed
            </span>
            <h3 className="font-manrope text-[22px] font-extrabold text-[#04060a] leading-tight">
              Thank You, {leadName || "Valued Homeowner"}!
            </h3>
          </div>
        </div>

        {leadId && (
          <div className="mb-4 px-3 py-1.5 rounded-lg bg-[#eff4fe] text-[12px] font-inter text-[#45474b] flex items-center justify-between">
            <span>Reference ID:</span>
            <span className="font-bold text-[#171c23]">{leadId}</span>
          </div>
        )}

        <p className="font-inter text-[14px] text-[#45474b] leading-relaxed mb-6">
          Your plot parameters and construction requirements have been assigned to our Senior Structural Civil Engineer at our MG Road HQ.
        </p>

        {/* 3 Clear Next Steps */}
        <div className="space-y-3 mb-6 bg-[#f8f9ff] p-4 rounded-xl border border-[#dee3ec]">
          <h4 className="font-manrope text-[14px] font-bold text-[#171c23]">
            What Happens Next:
          </h4>
          <ul className="space-y-2 text-[13px] font-inter text-[#45474b]">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1c1f24] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
              <span><strong>Engineering Review:</strong> BBMP setback &amp; FAR analysis calculated within 30 minutes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1c1f24] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
              <span><strong>Detailed BOQ Dispatch:</strong> Full 18-page material itemization sent directly to WhatsApp &amp; Email.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1c1f24] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
              <span><strong>Free On-Site Soil Review:</strong> Complimentary borehole and boundary survey scheduled at your plot.</span>
            </li>
          </ul>
        </div>

        {/* High Conversion Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-[#25D366] hover:bg-[#20BD5A] text-white font-manrope font-bold text-[14px] rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Chat on WhatsApp Now</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#eff4fe] hover:bg-[#dee3ec] text-[#171c23] font-inter font-semibold text-[13px] rounded-lg transition-colors"
          >
            Done &amp; Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
