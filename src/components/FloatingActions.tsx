import React from "react";
import { useLocation } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

interface FloatingActionsProps {
  onOpenConsultation?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenConsultation }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Pre-filled WhatsApp message including the page context
  const pageLabel = currentPath === "/" 
    ? "the Home Page" 
    : `page: ${currentPath}`;
  
  const waMessage = `Hi SK Constructions, I am browsing ${pageLabel} and would like to speak with an engineer about my Bangalore construction project.`;
  const waUrl = `https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      {/* Floating WhatsApp Desk (Desktop & Tablet: Bottom Left) */}
      <aside className="hidden md:block fixed bottom-6 left-6 z-40">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#002511] text-[#a4f4bc] hover:bg-[#000803] hover:text-white font-manrope font-semibold text-[13px] px-4 py-3 rounded-full shadow-[0_4px_16px_rgba(47,125,79,0.35)] transition-all border border-[#a4f4bc]/30 group"
          aria-label="Chat on WhatsApp"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#89d7a1] animate-pulse"></span>
          <span className="material-symbols-outlined text-[19px] text-[#89d7a1] group-hover:scale-110 transition-transform">
            chat_bubble
          </span>
          <span>Chat on WhatsApp</span>
        </a>
      </aside>

      {/* Floating Ask Nirmaan AI / Instant Consultation (Desktop & Tablet: Bottom Right) */}
      <aside className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex items-center gap-2 bg-[#04060a] text-white hover:bg-[#1c1f24] font-manrope font-semibold text-[13px] px-4 py-3 rounded-full shadow-[0_8px_24px_rgba(28,31,36,0.18)] transition-all border border-white/20 group"
          aria-label="Ask Nirmaan AI Assistant"
        >
          <span className="material-symbols-outlined text-[20px] text-[#ff9245] group-hover:rotate-12 transition-transform">
            smart_toy
          </span>
          <span>Ask Nirmaan AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#89d7a1]"></span>
        </button>
      </aside>
    </>
  );
};
