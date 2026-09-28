import React from "react";
import { useLocation } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

interface MobileBottomBarProps {
  onOpenQuoteModal?: () => void;
  onOpenConsultation?: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenQuoteModal, onOpenConsultation }) => {
  const location = useLocation();

  const waMessage = `Hi SK Constructions, I am inquiring from ${location.pathname} about home construction in Bangalore.`;
  const waUrl = `https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dee3ec] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-2 py-1.5">
      <div className="grid grid-cols-4 gap-1.5">
        {/* 1. Click to Call */}
        <a
          href={`tel:${CONSTRUCTION_CONFIG.brand.contact.primaryPhone}`}
          className="flex flex-col items-center justify-center h-12 bg-[#1c1f24] text-white rounded-lg text-[11px] font-manrope font-semibold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[17px] text-[#ff9245]">call</span>
          <span>Call</span>
        </a>

        {/* 2. WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-12 bg-[#25D366] text-white rounded-lg text-[11px] font-manrope font-semibold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[17px]">chat</span>
          <span>WhatsApp</span>
        </a>

        {/* 3. Ask AI */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex flex-col items-center justify-center h-12 bg-[#04060a] text-white rounded-lg text-[11px] font-manrope font-semibold active:scale-95 transition-transform border border-white/20"
        >
          <span className="material-symbols-outlined text-[17px] text-[#ff9245]">smart_toy</span>
          <span>Ask AI</span>
        </button>

        {/* 4. Get Quote */}
        <button
          type="button"
          onClick={onOpenQuoteModal}
          className="flex flex-col items-center justify-center h-12 bg-[#e07a2f] text-white rounded-lg text-[11px] font-manrope font-semibold active:scale-95 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[17px]">calculate</span>
          <span>Quote</span>
        </button>
      </div>
    </div>
  );
};
