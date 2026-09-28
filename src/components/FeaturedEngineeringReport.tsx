import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

interface FeaturedEngineeringReportProps {
  onOpenConsultation?: () => void;
}

export const FeaturedEngineeringReport: React.FC<FeaturedEngineeringReportProps> = ({ onOpenConsultation }) => {
  const [activeToc, setActiveToc] = useState("toc-benchmarks");
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadBoq = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    const content = `SK CONSTRUCTIONS - BANGALORE BOQ MATRIX 2024-2025
Report: Bangalore Construction Cost per Sq Ft (2024–2025)
Author: Er. Rajeshwar Rao (M.E. Structures, IISc Bangalore)
RERA Registration: ${CONSTRUCTION_CONFIG.brand.reraNumber}

1. COST SUMMARY PER SQ FT:
- Standard Package: ₹1,850/sq.ft
- Premium Package: ₹2,250/sq.ft
- Luxury Royale: ₹2,750/sq.ft

2. MATERIAL INDEX:
- Tata Tiscon 550D TMT: ₹74,500/MT
- UltraTech 53-Grade OPC: ₹410/50kg bag
- M25 Automated RMC: ₹4,200/cum
- Wire-Cut Bricks: ₹11.50/pc
- M-Sand: ₹48/cft
- Asian Paints Royale: ₹560/ltr

3. CRITICAL MUNICIPAL & ENGINEERING GUIDELINES:
- BBMP FAR: 1.75 (<9m road) | 2.25 (9-12m road)
- Water Sump Sizing: 8,000L to 12,000L Monolithic RCC
- Soil Bearing Capacity: Mandatory IS 1892 geotechnical test`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Bangalore_Construction_Cost_Matrix_2025.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const scrollTo = (id: string) => {
    setActiveToc(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 4000);
    }
  };

  const faqs = [
    {
      q: "How is FAR (Floor Area Ratio) calculated for a 30×40 plot under BBMP?",
      a: "For a standard 30×40 ft plot (1,200 sq.ft) in Bangalore, the permissible FAR ranges between 1.75 and 2.25 based on road width. Under a 9m road width, you are permitted a maximum built-up area of 2,100 to 2,400 sq.ft (typically G+1 or G+2). Stilt parking floors and staircase headrooms are exempted from FAR calculations under revised BBMP Master Plan 2031 guidelines.",
    },
    {
      q: "What is the average timeline for obtaining BBMP plan sanction in 2024?",
      a: "With online BPAMS (Building Plan Approval Management System), an automated sanction drawing takes 25 to 35 working days, provided your land has an e-Khata (A-Khata), BWSSB NOC, and up-to-date property tax receipts. SK Constructions handles the entire liaison and structural certification in-house.",
    },
    {
      q: "How does SK Constructions mitigate steel price volatility during construction?",
      a: "Under our Turnkey Contract, we execute a legally binding Zero Price Escalation Clause. We hedge and book the entire Fe-550D TMT steel and 53-grade cement tonnage directly with manufacturers at agreement signing, absorbing 100% of open market price spikes.",
    },
    {
      q: "Is underground sump capacity included in standard turnkey packages?",
      a: "Yes. All our turnkey packages include a 10,000 to 12,000-liter RCC or wire-cut brickwork underground rainwater/Cauvery water sump with waterproof polymer lining, along with a 2,000-liter dual-tank overhead storage system.",
    },
  ];

  return (
    <article className="w-full text-[#1c1f24] font-sans">
      {/* Featured Header Badges & Title */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded bg-[#e07a2f]/15 text-[#e07a2f] border border-[#e07a2f]/30 text-[11px] font-mono font-bold uppercase tracking-wider">
            FEATURED ENGINEERING REPORT
          </span>
          <span className="px-2.5 py-1 rounded bg-[#1c1f24]/5 text-[#44474f] border border-[#dee3ec] text-[11px] font-mono font-medium uppercase">
            LIVE BIS 456 STANDARD
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 text-[11px] font-mono font-medium uppercase">
            ✓ BBMP 2024 BYE-LAW COMPLIANT
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#04060a] leading-[1.15] mb-4">
          Bangalore Construction Cost per Sq Ft in 2024–2025: Complete Civil & Material Breakdown
        </h1>

        {/* Author Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#dee3ec] text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#04060a] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
              RR
            </div>
            <div>
              <div className="font-bold text-[#04060a] text-sm">Er. Rajeshwar Rao</div>
              <div className="text-[#44474f] text-xs">VP Structural Engineering • M.E. Structures, IISc Bangalore</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[#44474f] font-mono text-xs">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#74777f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Dec 14, 2024</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#74777f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>8 min read</span>
            </span>
            <span>•</span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 text-[#04060a] font-bold hover:text-[#e07a2f] transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{copied ? "Link Copied!" : "Share Spec"}</span>
            </button>
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-sans border border-emerald-200">
              🛡️ Tata & UltraTech QA Audited Matrix
            </span>
          </div>
        </div>

        {/* Quick Consultation Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#04060a]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">Live Bangalore Material Ticker: Steel ₹64.50/kg • Cement ₹385/bag (M-53)</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}?text=Hi%20SK%20Constructions,%20I%20am%20reviewing%20the%20Bangalore%20Cost%20per%20Sq%20Ft%20guide%20and%20need%20a%20site%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-all shadow-sm"
            >
              <span>Chat with Construction Expert</span>
            </a>
            <button
              onClick={() => onOpenConsultation?.()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#04060a] hover:bg-[#1c1f24] text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Ask Nirmaan AI — Instant Cost & Vastu Bot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Site Specimen Graphic */}
      <div className="relative rounded-2xl overflow-hidden bg-[#04060a] border border-[#dee3ec] mb-12 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80"
          alt="Indiranagar Villa Construction Site"
          className="w-full h-72 sm:h-96 lg:h-[420px] object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#e07a2f] text-[#04060a] font-mono text-xs font-black uppercase tracking-wider mb-2">
            STRUCTURAL CASE SPECIMEN: INDIRANAGAR VILLA G+2
          </div>
          <p className="text-xs sm:text-sm text-white/90 max-w-2xl font-mono leading-relaxed">
            Raft foundation anchored under IS 1893:2016 seismic provisions with 24hr dimensional assay & ultrasonic weld verification.
          </p>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Sticky Table of Contents & Download Cards */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Table of Contents Card */}
          <div className="bg-white rounded-2xl border border-[#dee3ec] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#dee3ec] mb-4">
              <span className="font-bold text-[#04060a] text-sm uppercase font-mono tracking-wider">
                Table of Contents
              </span>
              <span className="text-xs font-mono text-[#74777f]">6 Sections</span>
            </div>

            <nav className="space-y-1 text-xs font-medium">
              {[
                { id: "toc-benchmarks", label: "1. Per-Sq-Ft Benchmarks" },
                { id: "toc-boq", label: "2. Itemized BOQ Distribution" },
                { id: "toc-materials", label: "3. Cement, Steel & BIS Grades" },
                { id: "toc-traps", label: "4. Escalation Clauses & Traps" },
                { id: "toc-savings", label: "5. How to Save 8–12% Safely" },
                { id: "toc-faqs", label: "6. Frequently Asked Questions" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                    activeToc === item.id
                      ? "bg-[#e07a2f]/10 text-[#e07a2f] font-bold"
                      : "text-[#44474f] hover:bg-[#eff4fe] hover:text-[#04060a]"
                  }`}
                >
                  <span>{item.label}</span>
                  {activeToc === item.id && <span className="text-[#e07a2f] text-sm">→</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Download Box */}
          <div className="bg-[#04060a] text-white rounded-2xl p-6 border border-[#1c1f24] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e07a2f]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-[#e07a2f] font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Bangalore Cost Matrix</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Download Full 2024–2025 BOQ Schedule
            </h4>
            <p className="text-xs text-white/70 leading-relaxed mb-5">
              Itemized 42-page PDF schedule detailing brand-wise rate contracts, steel weight schedules, and BBMP municipal fee structures.
            </p>
            <button
              type="button"
              onClick={handleDownloadBoq}
              className="w-full py-3 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>{downloadSuccess ? "Downloaded Schedule ✓" : "Download PDF (2.4 MB)"}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>

          {/* Zero Price Escalation Guarantee Box */}
          <div className="bg-[#eff4fe] rounded-2xl p-5 border border-[#dee3ec]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e07a2f]/20 text-[#e07a2f] flex items-center justify-center font-bold text-base shrink-0 mt-0.5">
                🛡️
              </div>
              <div>
                <h5 className="font-bold text-[#04060a] text-xs uppercase font-mono">
                  Zero Price Escalation Guarantee
                </h5>
                <p className="text-xs text-[#44474f] leading-relaxed mt-1">
                  SK Constructions guarantees locked BOQ pricing backed by tripartite bank escrow milestone schedules. Zero inflation pass-through to homeowners.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Article Content Sections */}
        <main className="lg:col-span-8 space-y-12">
          {/* EXECUTIVE BRIEFING */}
          <section className="bg-white rounded-2xl border border-[#dee3ec] p-6 sm:p-8 shadow-sm">
            <span className="text-[11px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block mb-2">
              EXECUTIVE BRIEFING
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#04060a] mb-4 leading-snug">
              Why traditional labor contracts in Bangalore end up 25% higher than turnkey fixed-price contracts
            </h2>
            <p className="text-sm text-[#44474f] leading-relaxed mb-6">
              When sourcing separate labor contractors and buying retail building materials across Whitefield, HSR, or North Bangalore, property owners absorb standard retail logistics markups (12-15%), untracked site pilferage (5-8%), and hidden structural escalation clauses. A precision turnkey contract fixes the square-footage cost upfront, transferring bulk-procurement rebates directly to the homeowner.
            </p>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#eff4fe] border border-[#dee3ec]">
                <div className="text-[10px] font-mono uppercase text-[#74777f] font-bold">MATERIAL WASTAGE GAP</div>
                <div className="text-2xl font-black font-mono text-[#04060a] mt-1">14.2%</div>
                <div className="text-[11px] text-[#44474f] mt-0.5">Unmonitored Local Sites</div>
              </div>

              <div className="p-4 rounded-xl bg-[#eff4fe] border border-[#dee3ec]">
                <div className="text-[10px] font-mono uppercase text-[#74777f] font-bold">TURNKEY SCRAP INDEX</div>
                <div className="text-2xl font-black font-mono text-emerald-600 mt-1">1.0%</div>
                <div className="text-[11px] text-[#44474f] mt-0.5">Organized Precision Sites</div>
              </div>

              <div className="p-4 rounded-xl bg-[#eff4fe] border border-[#dee3ec]">
                <div className="text-[10px] font-mono uppercase text-[#74777f] font-bold">AVERAGE COST LEAKAGE</div>
                <div className="text-2xl font-black font-mono text-[#e07a2f] mt-1">₹3.8 Lakh</div>
                <div className="text-[11px] text-[#44474f] mt-0.5">Per 2,400 sq ft Build</div>
              </div>
            </div>
          </section>

          {/* SECTION 01: Per-Sq-Ft Benchmarks */}
          <section id="toc-benchmarks" className="space-y-4 scroll-mt-24">
            <span className="text-[11px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block">
              SECTION 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#04060a] tracking-tight">
              Current Per-Sq-Ft Benchmarks in Bangalore (2024–2025)
            </h2>
            <p className="text-sm text-[#44474f] leading-relaxed">
              Based on executed contracts over Q3 and Q4 2024 across BBMP and BDA jurisdictional plots, residential construction in Bangalore scales into three calibrated tiers based on structural strength, electrical ratings, and luxury architectural finishes.
            </p>

            {/* Standard 30x40 Plot Cost Breakdown Table */}
            <div className="bg-white rounded-2xl border border-[#dee3ec] p-6 shadow-sm overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#dee3ec]">
                <div>
                  <h3 className="font-bold text-[#04060a] text-base">
                    Standard 30×40 Plot Cost Breakdown
                  </h3>
                  <div className="text-xs font-mono text-[#74777f]">
                    1,200 sq ft Land = 2,400 sq ft G+1 Built-up Area
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#e07a2f]/10 text-[#e07a2f] font-mono text-xs font-bold uppercase border border-[#e07a2f]/20">
                  Q4 2024 LIVE INDEX
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#dee3ec] bg-[#eff4fe] text-[#44474f] font-mono uppercase">
                      <th className="py-3 px-3">Package Tier</th>
                      <th className="py-3 px-3">Rate / Sq Ft</th>
                      <th className="py-3 px-3">Total G+1 Cost</th>
                      <th className="py-3 px-3">Steel & Cement Spec</th>
                      <th className="py-3 px-3">Flooring & Fixtures</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dee3ec]">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[#04060a]">Standard Package</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#04060a]">₹1,850</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#04060a]">₹44.40 Lakh</td>
                      <td className="py-3.5 px-3 text-[#44474f]">Fe-500D Primary, 43 Grade PPC</td>
                      <td className="py-3.5 px-3 text-[#44474f]">Vitrified (₹65/sqft), Hindware</td>
                    </tr>

                    <tr className="bg-[#e07a2f]/5 hover:bg-[#e07a2f]/10 transition-colors border-l-4 border-l-[#e07a2f]">
                      <td className="py-3.5 px-3 font-bold text-[#e07a2f] flex items-center gap-1.5">
                        <span>Premium Package</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e07a2f] text-white font-mono">POPULAR</span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#e07a2f]">₹2,250</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#e07a2f]">₹54.00 Lakh</td>
                      <td className="py-3.5 px-3 font-medium text-[#04060a]">Tata Tiscon 550D, UltraTech 53</td>
                      <td className="py-3.5 px-3 font-medium text-[#04060a]">Italian Glazed (₹130/sqft), Kohler</td>
                    </tr>

                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-[#04060a]">Luxury Royale</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#04060a]">₹2,750</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-[#04060a]">₹66.00 Lakh</td>
                      <td className="py-3.5 px-3 text-[#44474f]">JSW/Amritha 550D + Solar Pre-conduit</td>
                      <td className="py-3.5 px-3 text-[#44474f]">Imported Marble (₹240/sqft), Grohe</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-3 border-t border-[#dee3ec] text-[11px] text-[#74777f] font-mono leading-relaxed">
                ℹ️ Note: Rates exclude BBMP Plan Sanction charges, BESCOM external power liaison, and BWSSB water connection fees.
              </div>
            </div>
          </section>

          {/* SECTION 02: Itemized Cost Distribution */}
          <section id="toc-boq" className="space-y-4 scroll-mt-24">
            <span className="text-[11px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block">
              SECTION 02
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#04060a] tracking-tight">
              Itemized Cost Distribution (Donut & BOQ Allocation)
            </h2>
            <p className="text-sm text-[#44474f] leading-relaxed">
              Every rupee spent during residential construction in Karnataka maps to structural concrete, brick masonry, and internal infrastructure. Knowing where the capital flows prevents mid-project budget compromises.
            </p>

            {/* Visual BOQ Allocation Card with SVG Donut */}
            <div className="bg-white rounded-2xl border border-[#dee3ec] p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Donut Chart Visual */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* 48% Civil: 0 to 48 -> strokeDasharray="48 52" */}
                      <circle cx="50" cy="50" r="40" stroke="#04060a" strokeWidth="16" fill="transparent" strokeDasharray="120.6 130.6" strokeDashoffset="0" />
                      {/* 22% Finishes: 48 to 70 -> strokeDasharray="55.3 195.9" strokeDashoffset="-120.6" */}
                      <circle cx="50" cy="50" r="40" stroke="#e07a2f" strokeWidth="16" fill="transparent" strokeDasharray="55.3 195.9" strokeDashoffset="-120.6" />
                      {/* 16% MEP: 70 to 86 -> strokeDasharray="40.2 211" strokeDashoffset="-175.9" */}
                      <circle cx="50" cy="50" r="40" stroke="#0d9488" strokeWidth="16" fill="transparent" strokeDasharray="40.2 211" strokeDashoffset="-175.9" />
                      {/* 14% Doors/Windows: 86 to 100 -> strokeDasharray="35.2 216" strokeDashoffset="-216.1" */}
                      <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="16" fill="transparent" strokeDasharray="35.2 216" strokeDashoffset="-216.1" />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-black font-mono text-[#04060a]">100%</span>
                      <span className="text-[10px] font-mono uppercase text-[#74777f] font-bold">FULL TURNOUT</span>
                    </div>
                  </div>
                </div>

                {/* Progress Breakdown Bars */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#04060a]" />
                        <span>RCC Civil Structure & Masonry</span>
                      </span>
                      <span className="font-mono text-[#04060a]">48%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#04060a] rounded-full" style={{ width: "48%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#e07a2f]" />
                        <span>Finishes, Plaster & Flooring</span>
                      </span>
                      <span className="font-mono text-[#e07a2f]">22%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#e07a2f] rounded-full" style={{ width: "22%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#0d9488]" />
                        <span>Concealed MEP (Plumbing & Electrical)</span>
                      </span>
                      <span className="font-mono text-[#0d9488]">16%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#0d9488] rounded-full" style={{ width: "16%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#3b82f6]" />
                        <span>Doors, UPVC Glass & Exterior Paint</span>
                      </span>
                      <span className="font-mono text-[#3b82f6]">14%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#3b82f6] rounded-full" style={{ width: "14%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 03: Cement, Steel & Sand: Price Trends & BIS Grades */}
          <section id="toc-materials" className="space-y-4 scroll-mt-24">
            <span className="text-[11px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block">
              SECTION 03
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#04060a] tracking-tight">
              Cement, Steel & Sand: Price Trends & BIS Grades
            </h2>
            <p className="text-sm text-[#44474f] leading-relaxed">
              Bangalore sits in <strong>Seismic Zone II</strong>. While earthquake risks are moderate, the city's red clay and rocky strata require strict adherence to IS 456:2000 plain and reinforced concrete guidelines.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box 1 */}
              <div className="bg-white rounded-2xl border border-[#dee3ec] p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#e07a2f]/10 text-[#e07a2f] flex items-center justify-center font-bold text-lg mb-3">
                  🏗️
                </div>
                <h3 className="font-bold text-[#04060a] text-base mb-2">
                  M25 Automated RMC vs Site Mix
                </h3>
                <p className="text-xs text-[#44474f] leading-relaxed mb-4">
                  Hand-mixed site concrete suffers from variable water-cement ratios depending on weather. Automated Ready-Mix Concrete (RMC) from computerized batching plants delivers homogenous compressive strength (M25 or M30) at 28 days, critical for cantilever porticos in modern Bangalore duplexes.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#dee3ec] font-mono text-xs">
                  <span className="text-[#74777f]">COMPRESSIVE DELTA</span>
                  <span className="font-bold text-emerald-600">+18% STANDARD ON SK TURNKEY</span>
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-white rounded-2xl border border-[#dee3ec] p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#04060a]/10 text-[#04060a] flex items-center justify-center font-bold text-lg mb-3">
                  🔩
                </div>
                <h3 className="font-bold text-[#04060a] text-base mb-2">
                  Tata Tiscon 550D Rebar
                </h3>
                <p className="text-xs text-[#44474f] leading-relaxed mb-4">
                  Fe-550D rebar has high elongation (minimum 14.5%), absorbing lateral shock without brittle cracking. Rather than re-rolled scrap, primary steel manufacturing via automated Thermo-Mechanical Treatment prevents premature sulfur and phosphorous corrosion during Bangalore's monsoon season.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#dee3ec] font-mono text-xs">
                  <span className="text-[#74777f]">IS 1786:2008 CERTIFIED</span>
                  <span className="font-bold text-[#04060a]">CORROSION PROTECTED</span>
                </div>
              </div>
            </div>

            {/* M-Sand vs River Sand in Karnataka */}
            <div className="bg-white rounded-2xl border border-[#dee3ec] p-6 shadow-sm">
              <h3 className="font-bold text-[#04060a] text-base mb-2">
                M-Sand vs River Sand in Karnataka
              </h3>
              <p className="text-xs text-[#44474f] leading-relaxed">
                With Karnataka government bans on environmental river sand dredging, Zone-II Manufactured Sand (M-Sand) with cubical particle shapes has proven superior in bond strength. Plastering Sand (P-Sand) washed through hydro-cyclones avoids surface shrinkage cracks on smooth internal wall finishes.
              </p>
            </div>
          </section>

          {/* HIGH-IMPACT CALCULATOR CALLOUT BANNER */}
          <section className="bg-[#04060a] text-white rounded-2xl p-6 sm:p-10 border border-[#1c1f24] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#e07a2f]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 text-[#e07a2f] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <span>📐</span>
                <span>ENGINEERING COST ESTIMATOR</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Calculate the exact construction cost for your Bangalore plot in 60 seconds
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                Input your plot dimensions (30×40, 30×50, 40×60), floors, and ward location. Our algorithmic BOQ engine generates a milestone-by-milestone financial forecast instantly.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/cost-calculator"
                  className="px-6 py-3.5 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>Launch Instant Cost Calculator</span>
                  <span>→</span>
                </Link>
                <span className="text-[11px] font-mono text-white/50">
                  No spam • Instant WhatsApp PDF Copy • Zero Obligation
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 04: Hidden Traps: Escalation Clauses & Water Curing Deficits */}
          <section id="toc-traps" className="space-y-4 scroll-mt-24">
            <span className="text-[11px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block">
              SECTION 04
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#04060a] tracking-tight">
              Hidden Traps: Escalation Clauses & Water Curing Deficits
            </h2>
            <p className="text-sm text-[#44474f] leading-relaxed">
              Contractor disputes during villa construction in Bangalore typically hinge on two factors: vague steel cost fluctuation formulas and negligent curing schedules that weaken load-bearing columns.
            </p>

            <div className="space-y-4">
              {/* Alert 1 */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold font-mono uppercase text-sm mb-1.5">
                  <span className="text-amber-600 font-bold text-base">⚠️</span>
                  <span>The "Market Fluctuation" Clause</span>
                </div>
                <p className="text-amber-950/80 leading-relaxed">
                  Standard local agreements state cement and steel hikes will be billed to the client if costs rise by &gt;3%. Always insist on a locked-turnkey BOQ where the builder assumes raw material risk via pre-booked wholesale supply hedges.
                </p>
              </div>

              {/* Alert 2 */}
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-bold font-mono uppercase text-sm mb-1.5">
                  <span className="text-blue-600 font-bold text-base">💧</span>
                  <span>Water Curing Negligence in Summer</span>
                </div>
                <p className="text-blue-950/80 leading-relaxed">
                  Portland Pozzolana Cement (PPC/53-Grade) demands a minimum of 14 continuous days of ponding and wet hessian sack curing. Skipping this drops compressive strength by up to 30%, causing hairline micro-cracks before internal paint coats even commence.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 05: How to Save 8–12% Without Cutting Quality */}
          <section id="toc-savings" className="space-y-4 scroll-mt-24">
            <span className="text-[11px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block">
              SECTION 05
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#04060a] tracking-tight">
              How to Save 8–12% Without Cutting Quality
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-[#dee3ec] p-5 shadow-sm">
                <div className="text-xl font-black font-mono text-[#e07a2f] mb-2">01</div>
                <h4 className="font-bold text-[#04060a] text-sm mb-1.5">Optimize Beam Spans</h4>
                <p className="text-xs text-[#44474f] leading-relaxed">
                  Keep column spans under 16 feet to avoid expensive heavy RC / post-tensioned slabs, saving 7% on rebar tonnage.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#dee3ec] p-5 shadow-sm">
                <div className="text-xl font-black font-mono text-[#e07a2f] mb-2">02</div>
                <h4 className="font-bold text-[#04060a] text-sm mb-1.5">Standardize Openings</h4>
                <p className="text-xs text-[#44474f] leading-relaxed">
                  Ordering standardized UPVC window profiles reduces custom cutting wastage and installation labor costs by ₹42,000.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#dee3ec] p-5 shadow-sm">
                <div className="text-xl font-black font-mono text-[#e07a2f] mb-2">03</div>
                <h4 className="font-bold text-[#04060a] text-sm mb-1.5">Direct Factory Procuring</h4>
                <p className="text-xs text-[#44474f] leading-relaxed">
                  Source vitrified tiles directly from Morbi manufacturers via your turnkey partner to bypass dealer markups.
                </p>
              </div>
            </div>
          </section>

          {/* AUTHOR PROFILE CARD */}
          <div className="bg-white rounded-2xl border border-[#dee3ec] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#04060a] text-white flex items-center justify-center font-mono font-bold text-lg shrink-0">
                RR
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#04060a] text-base">Er. Rajeshwar Rao</h4>
                  <span className="text-[10px] font-mono text-[#e07a2f] uppercase font-bold">VP STRUCTURAL ENGINEERING</span>
                </div>
                <p className="text-xs text-[#44474f] leading-relaxed mt-1">
                  Er. Rao holds an M.E. in Structural Engineering from the Indian Institute of Science (IISc), Bangalore. With over 18 years of deep structural consultancy across Karnataka, he has supervised the execution of 450+ RCC residential and commercial structures with zero warranty defects.
                </p>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#e07a2f] hover:underline mt-2"
                >
                  <span>View Rao's Engineering Portfolio</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* SECTION 06: Frequently Asked Questions */}
          <section id="toc-faqs" className="space-y-4 scroll-mt-24">
            <span className="text-[11px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block">
              SECTION 06
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#04060a] tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-[#dee3ec] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full text-left p-4.5 flex items-center justify-between gap-4 font-bold text-sm text-[#04060a] hover:text-[#e07a2f] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-mono text-[#74777f] shrink-0">
                      {expandedFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4.5 pb-4 pt-1 text-xs text-[#44474f] leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* RELATED ENGINEERING GUIDES & SANCTIONS */}
          <section className="pt-8 border-t border-[#dee3ec] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#e07a2f] font-bold tracking-wider">
                  KNOWLEDGE BASE
                </span>
                <h3 className="text-xl font-black text-[#04060a] mt-0.5">
                  Related Engineering Guides & Sanctions
                </h3>
              </div>
              <Link
                to="/blog"
                className="text-xs font-mono font-bold text-[#e07a2f] hover:underline"
              >
                Explore All 84 Articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/blog/bbmp-building-bye-laws-sanction-guide"
                className="group bg-white rounded-xl border border-[#dee3ec] overflow-hidden hover:shadow-md hover:border-[#04060a] transition-all flex flex-col"
              >
                <div className="h-32 bg-slate-200 overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeSntk1n-bVR7vNXaGFpDdgH6Z5jUgTFt-sESgcdB9TptKvduGf7nRpNaimpcpWBwPw5HOuxlC9pdcSoDaR2Kwu5ulZAHuRJuTzE-VmXDodnHpVlb30QNSv-7wGQZMe1ms2U1AH6acQVvEZUaWV7d69pTe-9gJdFbs_U8tFJZOJEbA9WN6erdR_uNjXX-10RVZr8jKcfVSRtXW7mVZ422DqROz3Kg40YT7HYvN5qaMRBFN0Cp1Vklz8A"
                    alt="BBMP Bye-laws"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#04060a]/80 text-white font-mono text-[9px] uppercase">
                    LEGAL & SANCTIONS
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#74777f] mb-1">Oct 18, 2024 • 8 min read</div>
                    <h4 className="font-bold text-xs text-[#04060a] group-hover:text-[#e07a2f] transition-colors line-clamp-2">
                      BBMP Building Bye-Laws 2024: Setback Rules for 30×40 & 30×50 Plots Explained
                    </h4>
                  </div>
                  <div className="text-[11px] font-mono text-[#e07a2f] font-bold mt-3">
                    Read Complete Guide →
                  </div>
                </div>
              </Link>

              <Link
                to="/blog/scientific-vastu-shastra-modern-east-north-facing-homes"
                className="group bg-white rounded-xl border border-[#dee3ec] overflow-hidden hover:shadow-md hover:border-[#04060a] transition-all flex flex-col"
              >
                <div className="h-32 bg-slate-200 overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr6mCWN9PR4wPMMF5b7deHH80kcWHixSlGeK0qnQqqpyQ_hMuUK6T1YYICOXJQ1rfKceKu_QLGqawL2YSIrM-cGu8zeCZAmDu5J2DdYe-rCvhnKyOH-_JAnWysGMWzCr2BJd7dBzF25HIKkZrnKBK_41uniwzqo4uAkK__pHw9pggngd4KfAWBNqU3VD2fSzo1cyjD76ZN021W8X5PsFHeVxTNZ7EMqv_AdV8KN6tF5Y2DX6brT2Lh9Q"
                    alt="Vastu Architecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#04060a]/80 text-white font-mono text-[9px] uppercase">
                    VASTU ENGINEERING
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#74777f] mb-1">Sep 28, 2024 • 5 min read</div>
                    <h4 className="font-bold text-xs text-[#04060a] group-hover:text-[#e07a2f] transition-colors line-clamp-2">
                      Scientific Vastu Shastra for Modern East and North Facing Bangalore Homes
                    </h4>
                  </div>
                  <div className="text-[11px] font-mono text-[#e07a2f] font-bold mt-3">
                    Read Complete Guide →
                  </div>
                </div>
              </Link>

              <Link
                to="/blog/escrow-vs-milestone-advances-protect-capital"
                className="group bg-white rounded-xl border border-[#dee3ec] overflow-hidden hover:shadow-md hover:border-[#04060a] transition-all flex flex-col"
              >
                <div className="h-32 bg-slate-200 overflow-hidden relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4UorjuH4T29fuawDhqbnldNBfmPOy1pIDNVH4fjSgaJcJbIm-WqnihqAQatBsXzQLfARsHjSoo3R4oO5E4mLwfp02ALUYSoULGUKRKjGRWjhXZtISOUNKN3-kVE58Dsd9f9RIrVh_ZN7gZmmXbK_tYWKtInzt7hDDKAyZop1S1Rf3Th2Y7Fzcss4EJLWchJj4f0a49fQRH4qeWHP6lmzDFdg1DyD9Tt_9miBgWJYCiWLxIYMBmcQ-6A"
                    alt="Escrow Construction Advances"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#04060a]/80 text-white font-mono text-[9px] uppercase">
                    CONTRACTS & ESCROW
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#74777f] mb-1">Sep 14, 2024 • 7 min read</div>
                    <h4 className="font-bold text-xs text-[#04060a] group-hover:text-[#e07a2f] transition-colors line-clamp-2">
                      Escrow vs Milestone Advances: How to Protect Your Capital During Home Construction
                    </h4>
                  </div>
                  <div className="text-[11px] font-mono text-[#e07a2f] font-bold mt-3">
                    Read Complete Guide →
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* NEWSLETTER SUBSCRIBE BANNER */}
          <section className="bg-[#04060a] text-white rounded-2xl p-6 sm:p-8 border border-[#1c1f24] shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono text-[#e07a2f] font-bold uppercase tracking-wider block">
                  KARNATAKA MARKET INTELLIGENCE
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Subscribe to the Quarterly Bangalore BOQ & Material Index
                </h3>
                <p className="text-xs text-white/70 mt-1 max-w-lg">
                  Get quarterly Bangalore construction material price reports and statutory bye-law updates directly to your inbox.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-[#1c1f24] border border-[#2d3139] text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#e07a2f] min-w-[220px]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-mono text-xs font-bold whitespace-nowrap transition-colors cursor-pointer"
                >
                  {subscribed ? "Subscribed! ✓" : "Subscribe to Insights →"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </article>
  );
};
