import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";
import { useLanguage } from "../context/LanguageContext";
import { Logo } from "./Logo";

interface HeaderProps {
  onOpenQuoteModal?: () => void;
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal, onOpenConsultation }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/services", label: t.nav.services },
    { to: "/projects", label: t.nav.projects },
    { to: "/cost-calculator", label: t.nav.costCalculator },
    { to: "/3d-home-designs", label: t.nav.designs3D, badge: "HOT" },
    { to: "/about", label: t.nav.about },
    { to: "/careers", label: t.nav.careers },
    { to: "/blog", label: t.nav.blog },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      {/* 1. Top Technical Compliance & Ribbon Bar */}
      <div className="w-full bg-[#04060a] text-white py-1 px-4 sm:px-6 lg:px-12 border-b border-white/10 text-[11px] font-inter">
        <div className="max-w-7xl mx-auto flex items-center justify-between tracking-wide">
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="tel:+919845012345"
              className="flex items-center gap-1.5 text-white/90 hover:text-[#e07a2f] transition-colors"
            >
              <span>📞</span>
              <span>+91 98450 12345</span>
            </a>
            <span className="hidden md:inline text-white/20">|</span>
            <a
              href="mailto:dir.surveys@skconstructions.in"
              className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-[#e07a2f] transition-colors"
            >
              <span>✉️</span>
              <span>dir.surveys@skconstructions.in</span>
            </a>
            <span className="hidden xl:inline text-white/20">|</span>
            <span className="hidden xl:flex items-center gap-1.5 text-white/70">
              <span>📍</span>
              <span>Bungalow HQ: 28 MG Road, Bangalore 560001</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-white/80 font-mono text-[11px]">
              <span className="text-[#e07a2f]">🛡️</span>
              <span>RERA Reg: PRM/KA/RERA/1251/310/PR/200924/003621</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="flex items-center gap-1 font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === "en"
                    ? "bg-[#e07a2f] text-[#04060a]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === "hi"
                    ? "bg-[#e07a2f] text-[#04060a]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                KN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 bg-white/95 backdrop-blur-xl border-b border-[#e9eef8] ${
          scrolled ? "h-16 shadow-md" : "h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1 p-1 bg-[#eff4fe] rounded-xl text-[13px]">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg font-inter font-medium transition-all relative flex items-center gap-1 ${
                    isActive
                      ? "bg-[#1c1f24] text-white shadow-sm font-semibold"
                      : "text-[#45474b] hover:text-[#171c23] hover:bg-white/60"
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#e07a2f] text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden lg:inline-flex items-center gap-1.5 h-10 px-3 bg-[#04060a] hover:bg-[#1c1f24] text-white font-manrope font-semibold text-[13px] rounded-lg transition-all border border-white/20 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ff9245]">smart_toy</span>
              <span>Ask Nirmaan AI</span>
            </button>

            <Link
              to="/cost-calculator"
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-semibold text-[13px] rounded-lg shadow-[0_4px_16px_rgba(224,122,47,0.28)] transition-all"
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5">calculate</span>
              <span>{t.nav.getFreeEstimate}</span>
            </Link>

            {/* Direct Phone glyph for quick mobile access */}
            <a
              href={`tel:${CONSTRUCTION_CONFIG.brand.contact.primaryPhone}`}
              className="sm:hidden w-9 h-9 rounded-lg bg-[#eff4fe] text-[#171c23] flex items-center justify-center hover:bg-[#e4e8f2] transition-colors"
              title="Direct Call"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-lg bg-[#eff4fe] text-[#171c23] flex items-center justify-center hover:bg-[#e4e8f2] transition-colors"
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Flyout Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-white border-b border-[#dee3ec] shadow-xl px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg font-inter text-[15px] flex items-center justify-between ${
                    isActive
                      ? "bg-[#1c1f24] text-white font-semibold"
                      : "text-[#171c23] hover:bg-[#eff4fe]"
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#e07a2f] text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-[#dee3ec] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation?.();
                }}
                className="w-full h-11 bg-[#04060a] hover:bg-[#1c1f24] text-white font-manrope font-semibold text-[14px] rounded-lg flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ff9245]">smart_toy</span>
                <span>Ask Nirmaan AI Co-Pilot</span>
              </button>
              <Link
                to="/cost-calculator"
                className="w-full h-11 bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-semibold text-[14px] rounded-lg flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">calculate</span>
                <span>{t.nav.getFreeEstimate}</span>
              </Link>
              <a
                href={`https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 bg-[#25D366] text-white font-manrope font-semibold text-[14px] rounded-lg flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Instant Consult</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
