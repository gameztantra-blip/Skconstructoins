import React from "react";
import { Link } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";
import { useLanguage } from "../context/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleDownloadBrochure = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    // Create and trigger download of architectural specifications summary
    const content = `SK CONSTRUCTIONS - BANGALORE TURNKEY SPECIFICATIONS 2025
RERA No: ${CONSTRUCTION_CONFIG.brand.reraNumber}
Head Office: 28 MG Road, Bangalore 560001
Contact: ${CONSTRUCTION_CONFIG.brand.contact.primaryPhone} | ${CONSTRUCTION_CONFIG.brand.contact.email}

1. TURNKEY PACKAGES & RATES:
- Standard: ₹1,850/sq.ft (Fe-500D TMT, 53-Grade OPC, Kajaria vitrified tiles)
- Premium: ₹2,250/sq.ft (Tata Tiscon 550D, UltraTech 53, M25 RMC, Teak wood)
- Luxury: ₹2,750/sq.ft (Italian marble, home automation, VRV HVAC, Grohe/Kohler)

2. GUARANTEES:
- Zero Price Escalation Clause
- 10-Year Comprehensive Structural Warranty
- RERA Milestone-Linked Escrow Accounts
- 100% Monolithic RCC Underground Sump (8,000L - 12,000L)`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SK_Constructions_2025_Brochure_Specs.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#04060a] text-white pt-16 pb-12 border-t border-white/10 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1 & 2: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-manrope text-[22px] font-extrabold text-white tracking-tight">
                {CONSTRUCTION_CONFIG.brand.name}
              </span>
            </div>
            
            <p className="text-[14px] text-[#c4c6cd] leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="pt-2 space-y-2 text-[12px] text-[#a0a3aa]">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#ff9245] mt-0.5">location_on</span>
                <span>{CONSTRUCTION_CONFIG.brand.headOffice.building}, {CONSTRUCTION_CONFIG.brand.headOffice.street}, {CONSTRUCTION_CONFIG.brand.headOffice.city}, {CONSTRUCTION_CONFIG.brand.headOffice.state} {CONSTRUCTION_CONFIG.brand.headOffice.pincode}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#ff9245]">call</span>
                <a href={`tel:${CONSTRUCTION_CONFIG.brand.contact.primaryPhone}`} className="hover:text-white transition-colors">
                  {CONSTRUCTION_CONFIG.brand.contact.formattedPhone} / {CONSTRUCTION_CONFIG.brand.contact.landline}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#ff9245]">mail</span>
                <a href={`mailto:${CONSTRUCTION_CONFIG.brand.contact.email}`} className="hover:text-white transition-colors">
                  {CONSTRUCTION_CONFIG.brand.contact.email}
                </a>
              </p>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1c1f24] hover:bg-[#e07a2f] text-white rounded-lg text-[13px] font-semibold border border-white/10 transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>{downloadSuccess ? "Downloaded Brochure Specs ✓" : "Download 2025 Architectural Brochure"}</span>
              </button>
            </div>
          </div>

          {/* Column 3: Turnkey Solutions */}
          <div className="space-y-3">
            <h4 className="font-manrope text-[16px] font-bold text-white tracking-tight">
              {t.footer.turnkeySolutions}
            </h4>
            <ul className="space-y-2 text-[13px] text-[#c4c6cd]">
              <li>
                <Link to="/services/turnkey-home-construction" className="hover:text-[#ff9245] transition-colors">
                  Luxury Villa Construction
                </Link>
              </li>
              <li>
                <Link to="/services/turnkey-home-construction" className="hover:text-[#ff9245] transition-colors">
                  G+3 Duplex Residences
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-tech-parks" className="hover:text-[#ff9245] transition-colors">
                  PEB Commercial Buildings
                </Link>
              </li>
              <li>
                <Link to="/services/structural-renovation" className="hover:text-[#ff9245] transition-colors">
                  Structural Remodeling
                </Link>
              </li>
              <li>
                <Link to="/services/premium-interior-design" className="hover:text-[#ff9245] transition-colors">
                  Turnkey Interior Fitouts
                </Link>
              </li>
              <li>
                <Link to="/services/architectural-vastu" className="hover:text-[#ff9245] transition-colors">
                  Architectural Plan Approvals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Prime Localities */}
          <div className="space-y-3">
            <h4 className="font-manrope text-[16px] font-bold text-white tracking-tight">
              {t.footer.primeLocalities}
            </h4>
            <ul className="space-y-2 text-[13px] text-[#c4c6cd]">
              <li>
                <Link to="/house-construction-in/indiranagar" className="hover:text-[#ff9245] transition-colors">
                  Indiranagar &amp; Domlur
                </Link>
              </li>
              <li>
                <Link to="/house-construction-in/whitefield" className="hover:text-[#ff9245] transition-colors">
                  Whitefield &amp; ITPL Corridor
                </Link>
              </li>
              <li>
                <Link to="/house-construction-in/hsr-layout" className="hover:text-[#ff9245] transition-colors">
                  HSR Layout &amp; Bellandur
                </Link>
              </li>
              <li>
                <Link to="/house-construction-in/koramangala" className="hover:text-[#ff9245] transition-colors">
                  Koramangala 1st-8th Block
                </Link>
              </li>
              <li>
                <Link to="/house-construction-in/sarjapur-road" className="hover:text-[#ff9245] transition-colors">
                  Sarjapur Road &amp; Carmelaram
                </Link>
              </li>
              <li>
                <Link to="/house-construction-in/hebbal" className="hover:text-[#ff9245] transition-colors">
                  Hebbal &amp; North Bangalore
                </Link>
              </li>
              <li>
                <Link to="/house-construction-in/jp-nagar" className="hover:text-[#ff9245] transition-colors">
                  JP Nagar &amp; Jayanagar
                </Link>
              </li>
              <li>
                <Link to="/house-construction-in/electronic-city" className="hover:text-[#ff9245] transition-colors">
                  Electronic City Phases 1 &amp; 2
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Governance & QA */}
          <div className="space-y-3">
            <h4 className="font-manrope text-[16px] font-bold text-white tracking-tight">
              {t.footer.governance}
            </h4>
            <div className="space-y-2.5 text-[12px]">
              <div className="p-3 bg-[#1c1f24] rounded-lg border border-white/5">
                <span className="block text-[10px] font-semibold text-[#ff9245] uppercase tracking-wider">
                  RERA Karnataka
                </span>
                <span className="font-semibold text-white text-[11px] break-all">
                  {CONSTRUCTION_CONFIG.brand.reraNumber}
                </span>
              </div>
              <div className="p-3 bg-[#1c1f24] rounded-lg border border-white/5">
                <span className="block text-[10px] font-semibold text-[#89d7a1] uppercase tracking-wider">
                  ISO Certified
                </span>
                <span className="font-semibold text-white text-[11px]">
                  {CONSTRUCTION_CONFIG.brand.isoCertified}
                </span>
              </div>
              <div className="p-3 bg-[#1c1f24] rounded-lg border border-white/5">
                <span className="block text-[10px] font-semibold text-[#ff9245] uppercase tracking-wider">
                  GST Compliance
                </span>
                <span className="font-semibold text-white text-[11px]">
                  GSTIN: {CONSTRUCTION_CONFIG.brand.gstin}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#84868d]">
          <div>{t.footer.rights}</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <span className="text-white/20">•</span>
            <span className="text-[#a4f4bc] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              {t.footer.structuralWarranty}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
