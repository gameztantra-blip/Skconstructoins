import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";
import { useLanguage } from "../context/LanguageContext";
import { SERVICES_DATA } from "../data/servicesData";
import { PROJECTS_DATA } from "../data/projectsData";
import { PACKAGES_DATA } from "../data/packagesData";
import { BLOGS_DATA } from "../data/blogsData";
import { FAQS_DATA } from "../data/faqsData";
import { CostCalculatorComponent } from "../components/CostCalculatorComponent";

interface HomePageProps {
  onOpenQuoteModal: (serviceSlug?: string) => void;
  onSuccess?: (leadName: string, leadId: string, whatsappUrl?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal, onSuccess }) => {
  const { t } = useLanguage();
  const [activeFloorLayer, setActiveFloorLayer] = useState("Foundation");
  const [activeFaq, setActiveFaq] = useState<string | null>("faq-01");

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-5 z-10 text-left">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-lg bg-[#e4e8f2] text-[#04060a]">
              <span className="material-symbols-outlined text-[16px] text-[#2f7d4f]">verified</span>
              <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#171c23]">
                {t.hero.accreditation}
              </span>
            </div>

            <h1 className="font-manrope text-[36px] sm:text-[44px] lg:text-[54px] font-extrabold text-[#04060a] leading-[1.12] tracking-tight">
              {t.hero.headlineStart}
              <span className="text-[#e07a2f]">{t.hero.headlineHighlight}</span>
              {t.hero.headlineEnd}
            </h1>

            <p className="font-inter text-[16px] sm:text-[17px] text-[#45474b] max-w-xl leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* Trust Reviews */}
            <div className="flex flex-wrap items-center gap-4 text-[13px] font-inter text-[#45474b]">
              <div className="flex items-center gap-1.5">
                <span className="flex text-[#e07a2f]">
                  {"★".repeat(5)}
                </span>
                <span className="font-bold text-[#04060a]">4.8 / 5.0</span>
                <span>(280+ Reviews)</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6c6cb]"></span>
              <div className="flex items-center gap-1 text-[#04060a]">
                <span className="material-symbols-outlined text-[16px] text-[#e07a2f]">home_work</span>
                <span className="font-bold">{t.hero.completedHomes}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/cost-calculator"
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-bold text-[14px] shadow-[0_4px_16px_rgba(224,122,47,0.28)] transition-all group"
              >
                <span>{t.hero.calculateCost}</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  calculate
                </span>
              </Link>
              <a
                href={`https://wa.me/${CONSTRUCTION_CONFIG.brand.contact.whatsappNumber}?text=${encodeURIComponent("Hi SK Constructions, I would like to book a site inspection on my Bangalore plot.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#002511] text-[#a4f4bc] hover:bg-[#000803] hover:text-white font-manrope font-bold text-[14px] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Us (+91 98450 12345)</span>
              </a>
            </div>

            {/* RERA Notice */}
            <div className="pt-1 text-[11px] font-inter text-[#76777b] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">gavel</span>
              <span>{t.hero.reraNotice}</span>
            </div>
          </div>

          {/* Hero Right Column: Interactive BIM Stage */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#090b0e] group border border-[#dee3ec]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApJ_GiljZeMblYW2ZnHs3xH5ByTFiFGGrhRN5cXjRCH_SXOWpPS-9xXwbDDl6fhjSt9ZUcYWueEiELS_SBsMT9MZlRgngdCM0671gFQqL4sGvGsb2Si0Vf8dgzPqoUGwHLY0HzFDLO5G0RUBikqB_FVzEJ7nx-u9EV5Qtw_G2YAqUYp3zxy87U2RzqZq0sj2s93EOEiu-9RZNW9IPTei8k8VlXo0gAVefLKH4zxALbuYE6fyCMulvk5Q"
                alt="G+2 Contemporary Luxury Residence in Bangalore engineered by SK Constructions"
                className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Live BIM Layer Status Ribbon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between p-2.5 rounded-xl bg-[#04060a]/85 backdrop-blur-md text-white text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff9245] animate-pulse"></span>
                  <span className="text-[11px] font-inter font-bold uppercase tracking-wider text-[#ffdbc8]">
                    Live BIM Render Engine
                  </span>
                </div>
                <span className="text-[11px] font-inter text-[#e1e2e9]">
                  Bangalore G+2 Custom Villa
                </span>
              </div>

              {/* Floor Layer Tabs Selector */}
              <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-xl bg-white/95 backdrop-blur-md shadow-lg flex flex-wrap gap-1.5 justify-between">
                {[
                  { name: "Foundation", label: "Foundation & Stilt" },
                  { name: "Floor1", label: "1st Floor: 3BHK Living" },
                  { name: "Floor2", label: "2nd Floor: Master Suites" },
                  { name: "Terrace", label: "Terrace Garden & Solar" },
                ].map((fl) => (
                  <button
                    key={fl.name}
                    type="button"
                    onClick={() => setActiveFloorLayer(fl.name)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-inter font-semibold transition-all ${
                      activeFloorLayer === fl.name
                        ? "bg-[#1c1f24] text-white shadow-sm"
                        : "bg-[#eff4fe] text-[#171c23] hover:bg-[#dee3ec]"
                    }`}
                  >
                    {fl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical CAD annotation */}
            <div className="flex items-center justify-between px-2 text-[11px] font-inter text-[#76777b]">
              <span>SCHEMATIC: CAD-REVIT-2025-BLR</span>
              <span>RCC M-25 GRADE + TATA TISCON 550D</span>
              <span className="text-[#2f7d4f] font-semibold">100% VASTU COMPLIANT</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUST STRIP & ACCREDITATIONS */}
      <section className="w-full bg-[#eff4fe] py-8 border-y border-[#dee3ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-4 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#e07a2f] rounded-full"></span>
              <span className="font-manrope text-[18px] font-bold text-[#04060a]">
                Certified Material Brands &amp; Banking Partners
              </span>
            </div>
            <span className="text-[11px] font-inter text-[#76777b] uppercase tracking-wider font-semibold">
              Zero Adulteration • Pre-Approved Housing Loans
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: "Tata Tiscon", sub: "Fe-550D Super Ductile", icon: "shield" },
              { title: "UltraTech Cement", sub: "53 Grade Weather Pro", icon: "domain" },
              { title: "Asian Paints", sub: "Royale Luxury Emulsion", icon: "format_paint" },
              { title: "Jaquar & Kohler", sub: "CP & Sanitaryware", icon: "water_drop" },
              { title: "State Bank of India", sub: "Approved Project Tier-1", icon: "account_balance" },
              { title: "HDFC & ICICI", sub: "0% Loan Processing Fee", icon: "verified_user" },
            ].map((brand) => (
              <div
                key={brand.title}
                className="p-3 bg-white rounded-xl flex items-center gap-2.5 shadow-sm border border-[#dee3ec]"
              >
                <span className="material-symbols-outlined text-[20px] text-[#e07a2f]">
                  {brand.icon}
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-inter font-bold text-[13px] text-[#04060a]">
                    {brand.title}
                  </span>
                  <span className="text-[10px] font-inter text-[#76777b]">
                    {brand.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC STATS COUNTER STRIP */}
      <section className="w-full bg-[#1c1f24] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
            <div className="flex flex-col gap-0.5">
              <span className="font-manrope text-[40px] font-extrabold text-[#ffdbc8] leading-none">
                4+
              </span>
              <span className="font-manrope text-[16px] font-bold text-white mt-1">
                Years of Rigor
              </span>
              <span className="text-[11px] font-inter uppercase text-[#a0a3aa] tracking-widest">
                Est. 2020 Bengaluru
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-manrope text-[40px] font-extrabold text-white leading-none">
                350+
              </span>
              <span className="font-manrope text-[16px] font-bold text-white mt-1">
                Homes Delivered
              </span>
              <span className="text-[11px] font-inter uppercase text-[#a0a3aa] tracking-widest">
                Zero Escalation
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-manrope text-[40px] font-extrabold text-[#ff9245] leading-none">
                12.5L+
              </span>
              <span className="font-manrope text-[16px] font-bold text-white mt-1">
                Sq.Ft Engineered
              </span>
              <span className="text-[11px] font-inter uppercase text-[#a0a3aa] tracking-widest">
                In Karnataka
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-manrope text-[40px] font-extrabold text-white leading-none">
                400+
              </span>
              <span className="font-manrope text-[16px] font-bold text-white mt-1">
                Quality Checkpoints
              </span>
              <span className="text-[11px] font-inter uppercase text-[#a0a3aa] tracking-widest">
                IS 456 Cube Tests
              </span>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col gap-0.5">
              <span className="font-manrope text-[40px] font-extrabold text-[#a4f4bc] leading-none">
                100%
              </span>
              <span className="font-manrope text-[16px] font-bold text-white mt-1">
                On-Time Handover
              </span>
              <span className="text-[11px] font-inter uppercase text-[#a0a3aa] tracking-widest">
                Penalty Clause in Pact
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TURNKEY SERVICES CAPABILITIES (6 Cards) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
              End-to-End Civil &amp; Architectural Engineering
            </span>
            <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-[#04060a] tracking-tight">
              Turnkey Engineering Capabilities
            </h2>
          </div>
          <p className="font-inter text-[14px] text-[#45474b] max-w-md">
            From plot soil analysis and Vastu compliance to BBMP plan sanctions and Griha Pravesh key handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((svc) => (
            <div
              key={svc.id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-[#dee3ec] transition-all flex flex-col justify-between group text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#eff4fe] flex items-center justify-center text-[#e07a2f] group-hover:bg-[#e07a2f] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">
                    {svc.icon}
                  </span>
                </div>

                <h3 className="font-manrope text-[20px] font-bold text-[#04060a] group-hover:text-[#e07a2f] transition-colors">
                  {svc.title}
                </h3>

                <p className="font-inter text-[13px] text-[#45474b] leading-relaxed">
                  {svc.shortDescription}
                </p>

                <ul className="space-y-1.5 pt-2 text-[12px] font-inter text-[#171c23]">
                  {svc.deliverables.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#2f7d4f]">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-[#dee3ec] flex items-center justify-between text-[#e07a2f]">
                <span className="text-[12px] font-inter font-bold uppercase tracking-wider">
                  {svc.startingPrice}
                </span>
                <Link
                  to={`/services/${svc.slug}`}
                  className="flex items-center gap-1 font-inter font-semibold text-[13px] hover:underline"
                >
                  <span>Explore</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY SK CONSTRUCTIONS - 6 KEY DIFFERENTIATORS */}
      <section className="w-full bg-[#f8f9ff] py-16 border-t border-[#dee3ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-left">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
              The Engineering Discipline
            </span>
            <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-[#04060a] tracking-tight">
              Why Bangalore Chooses SK Constructions
            </h2>
            <p className="font-inter text-[14px] text-[#45474b]">
              We eliminate contractor unpredictability with structural engineering precision, legal escrow safeguards, and transparent daily reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "price_check",
                title: "Fixed-Price Contract",
                desc: "Your signed quotation is legally bound. No price escalations due to steel or cement inflation mid-project. If materials rise, we absorb the margin.",
              },
              {
                icon: "fact_check",
                title: "400+ Quality Audits",
                desc: "Standardized concrete slump tests, 7/14/28-day cube curing lab reports, rebar binding spacing checks, and moisture scans before tile laying.",
              },
              {
                icon: "account_balance_wallet",
                title: "Stage-Wise Escrow Payments",
                desc: "Never pay in advance. Your capital is disbursed only after you personally inspect and approve each stage: Foundation, Slabs, Masonry, and Finishes.",
              },
              {
                icon: "videocam",
                title: "Live WhatsApp Updates",
                desc: "Daily morning and evening video summaries, delivery challan scans, and weekly time-lapse footage uploaded to your private client portal.",
              },
              {
                icon: "verified",
                title: "100% Factory Sourcing",
                desc: "Zero local grey-market sourcing. All materials come straight from authorized distributors with test certificates and batch verification barcodes.",
              },
              {
                icon: "engineering",
                title: "Resident Civil Engineer",
                desc: "A dedicated B.E. Civil Engineer permanently stationed on your plot from 8:00 AM to 6:00 PM to oversee labor discipline and structural tolerances.",
              },
            ].map((diff) => (
              <div
                key={diff.title}
                className="p-6 rounded-2xl bg-white shadow-sm border border-[#dee3ec] space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eff4fe] flex items-center justify-center text-[#1c1f24]">
                    <span className="material-symbols-outlined text-[22px]">
                      {diff.icon}
                    </span>
                  </div>
                  <h3 className="font-manrope text-[18px] font-bold text-[#04060a]">
                    {diff.title}
                  </h3>
                </div>
                <p className="font-inter text-[13px] text-[#45474b] leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 7-STAGE CONSTRUCTION ROADMAP */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 text-left">
        <div className="space-y-2 mb-10">
          <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
            Standardized Project Life-Cycle
          </span>
          <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-[#04060a] tracking-tight">
            7-Stage Construction Roadmap
          </h2>
          <p className="font-inter text-[14px] text-[#45474b]">
            Transparent milestone-driven progress from initial plot consultation to final Griha Pravesh key handover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {[
            { num: "01", icon: "contact_page", title: "Free Consult & Scope", desc: "Plot dimensions, family needs, and aesthetic preference gathering." },
            { num: "02", icon: "biotech", title: "Soil Test & Survey", desc: "Core borewell soil analysis, bearing capacity testing, and boundary survey." },
            { num: "03", icon: "view_in_ar", title: "3D & Vastu Plan", desc: "2D structural drafting, 3D elevation walkthrough, and Vastu orientation." },
            { num: "04", icon: "approval", title: "BBMP Sanction", desc: "Liaisoning for municipal plan approvals, BESCOM power, and BWSSB permits." },
            { num: "05", icon: "foundation", title: "Bhoomi Pujan & Build", desc: "Groundbreaking, footings, column erection, and slab castings." },
            { num: "06", icon: "checklist", title: "Quality Audit & Snag", desc: "400-point inspection covering electrical continuity and zero leaks." },
            { num: "07", icon: "key", title: "Griha Pravesh", desc: "Physical brass keys handed over with 10-Year Warranty certificate." },
          ].map((st) => (
            <div
              key={st.num}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
                st.num === "07"
                  ? "bg-[#04060a] text-white border-[#04060a] shadow-md"
                  : "bg-white text-[#171c23] border-[#dee3ec]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-manrope text-[20px] font-extrabold ${st.num === "07" ? "text-[#ff9245]" : "text-[#e07a2f]"}`}>
                    {st.num}
                  </span>
                  <span className={`material-symbols-outlined text-[18px] ${st.num === "07" ? "text-[#a4f4bc]" : "text-[#76777b]"}`}>
                    {st.icon}
                  </span>
                </div>
                <h4 className="font-manrope text-[14px] font-bold leading-snug">
                  {st.title}
                </h4>
              </div>
              <p className={`text-[11px] font-inter leading-relaxed ${st.num === "07" ? "text-[#c4c6cd]" : "text-[#45474b]"}`}>
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FEATURED PROJECTS SHOWCASE */}
      <section className="w-full bg-[#f8f9ff] py-16 border-t border-[#dee3ec] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
                Delivered Landmark Residences
              </span>
              <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-[#04060a] tracking-tight">
                Featured Construction Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1c1f24] hover:bg-[#04060a] text-white font-manrope font-semibold text-[13px] transition-all"
            >
              <span>View All Landmark Projects</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS_DATA.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#dee3ec] transition-all flex flex-col group"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#090b0e]">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#002511]/90 text-[#a4f4bc] text-[11px] font-inter font-bold uppercase tracking-wider backdrop-blur-sm">
                    {p.statusLabel}
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-[#1c1f24]/85 text-white text-[11px] font-inter backdrop-blur-sm">
                    Built-up: {p.builtUpAreaSqFt.toLocaleString("en-IN")} sq.ft
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-manrope text-[22px] font-bold text-[#04060a]">
                        {p.title}
                      </h3>
                      <span className="font-manrope text-[20px] font-extrabold text-[#e07a2f]">
                        {p.investmentDisplay}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#45474b] text-[13px] font-inter">
                      <span className="material-symbols-outlined text-[16px] text-[#e07a2f]">
                        location_on
                      </span>
                      <span>{p.address}</span>
                    </div>

                    <p className="font-inter text-[13px] text-[#45474b] leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#dee3ec] flex items-center justify-between text-[12px] font-inter">
                    <span className="text-[#76777b] uppercase font-bold tracking-wider">
                      RERA COMPLIANT • 10-YR BOND
                    </span>
                    <Link
                      to={`/projects/${p.slug}`}
                      className="text-[#e07a2f] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Explore Case Study</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PACKAGES & SPECIFICATIONS COMPARISON */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 text-left">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
            Transparent Engineering BOQ
          </span>
          <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-[#04060a] tracking-tight">
            Fixed Turnkey Construction Packages
          </h2>
          <p className="font-inter text-[14px] text-[#45474b]">
            Clear material specifications with branded warranties. What you see in the contract is what goes into your building.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PACKAGES_DATA.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? "bg-white border-[#e07a2f] shadow-xl ring-2 ring-[#e07a2f]/20 lg:-translate-y-2"
                  : "bg-white border-[#dee3ec] shadow-sm"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#e07a2f] text-white text-[11px] font-manrope font-bold uppercase tracking-wider shadow-md">
                  Most Popular in Bangalore
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-inter font-bold text-[#76777b] uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                  <h3 className="font-manrope text-[22px] font-bold text-[#04060a]">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="font-manrope text-[32px] font-extrabold text-[#e07a2f]">
                      ₹{pkg.ratePerSqFt.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[13px] font-inter text-[#76777b]">/ sq.ft + GST</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#eff4fe] text-[12px] font-inter text-[#171c23]">
                  {pkg.description}
                </div>

                <ul className="space-y-2 text-[13px] font-inter text-[#45474b]">
                  {pkg.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#2f7d4f] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>
                        <strong>{s.category}:</strong> {s.items[0]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-[#dee3ec]">
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(pkg.id)}
                  className={`w-full h-11 rounded-lg font-manrope font-semibold text-[13px] transition-all ${
                    pkg.popular
                      ? "bg-[#e07a2f] hover:bg-[#cf6b23] text-white shadow-md"
                      : "bg-[#eff4fe] hover:bg-[#dee3ec] text-[#171c23]"
                  }`}
                >
                  Choose {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. COST CALCULATOR EMBEDDED BAND */}
      <section className="w-full bg-[#1c1f24] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-left">
          <div className="max-w-3xl mb-10 space-y-2">
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#ff9245]">
              Instant Online Estimator
            </span>
            <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-white tracking-tight">
              Calculate Your Bangalore Home Construction Budget
            </h2>
            <p className="font-inter text-[14px] text-[#c4c6cd]">
              Select your plot dimensions, elevation levels, and turnkey tier to compute your itemized Bill of Quantities (BOQ).
            </p>
          </div>

          <CostCalculatorComponent onSuccess={onSuccess} />
        </div>
      </section>

      {/* 10. CLIENT TESTIMONIALS & NRI CASE STUDIES */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
              Unfiltered Client Experiences
            </span>
            <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-[#04060a] tracking-tight">
              Trusted by Bangalore Families &amp; NRIs
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[#04060a] text-[14px] font-inter font-semibold">
            <span>4.8 / 5.0</span>
            <span className="text-[#e07a2f]">★★★★★</span>
            <span className="text-[#76777b] font-normal">(Google Verified)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "We were terrified of typical contractor stories about price hikes and missed deadlines. SK Constructions proved to be complete professionals. Not a single rupee changed from the initial contract quotation, and their weekly WhatsApp reports kept us stress-free.",
              name: "Rajesh & Sunita Gowda",
              loc: "Indiranagar • 4,200 sq.ft Villa",
              tag: "LOCAL CLIENT",
            },
            {
              quote: "Managing house construction for my aging parents from California seemed impossible. SK Constructions assigned an engineer who coordinated everything on Zoom, shared material delivery invoices, and executed our Vastu layout flawlessly.",
              name: "Vikramaditya Rao",
              loc: "San Jose, USA ➔ Hebbal Villa",
              tag: "NRI CLIENT",
            },
            {
              quote: "As a doctor, I have zero spare time to chase plumbers and carpenters. SK Constructions took care of BBMP plan sanctions, BESCOM power, and soil testing. The 10-year warranty document gives great assurance.",
              name: "Dr. Manjunath Shetty",
              loc: "HSR Layout • 5,600 sq.ft Duplex",
              tag: "RESIDENT CLIENT",
            },
          ].map((testi, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-[#dee3ec] flex flex-col justify-between gap-4 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#e07a2f] text-[18px]">★★★★★</span>
                  <span className="text-[10px] font-inter font-bold uppercase px-2 py-0.5 bg-[#eff4fe] text-[#743500] rounded">
                    {testi.tag}
                  </span>
                </div>
                <p className="font-inter text-[13px] text-[#45474b] italic leading-relaxed">
                  "{testi.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#dee3ec]">
                <div className="font-manrope font-bold text-[14px] text-[#04060a]">
                  {testi.name}
                </div>
                <div className="text-[11px] font-inter text-[#76777b]">
                  {testi.loc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. BLOG & KNOWLEDGE ARTICLES */}
      <section className="w-full bg-[#f8f9ff] py-16 border-t border-[#dee3ec] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
                Knowledge &amp; Compliance Hub
              </span>
              <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-[#04060a] tracking-tight">
                Bangalore Construction Insights
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-[#e07a2f] font-manrope font-bold text-[13px] hover:underline flex items-center gap-1"
            >
              <span>Read All Engineering Articles</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOGS_DATA.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-[#dee3ec] transition-all flex flex-col group"
              >
                <div className="h-44 w-full overflow-hidden bg-[#090b0e]">
                  <img
                    src={b.heroImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-inter font-bold text-[#76777b] uppercase">
                      <span>{b.category}</span>
                      <span>•</span>
                      <span>{b.readTime}</span>
                    </div>
                    <h3 className="font-manrope font-bold text-[16px] text-[#04060a] group-hover:text-[#e07a2f] transition-colors leading-snug">
                      {b.title}
                    </h3>
                    <p className="font-inter text-[12px] text-[#45474b] line-clamp-2 leading-relaxed">
                      {b.summary}
                    </p>
                  </div>

                  <Link
                    to={`/blog/${b.slug}`}
                    className="pt-2 text-[13px] font-inter font-semibold text-[#e07a2f] flex items-center gap-1 hover:underline"
                  >
                    <span>Read Analysis</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 text-left">
        <div className="text-center mb-10 space-y-2">
          <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#e07a2f]">
            Frequently Asked Questions
          </span>
          <h2 className="font-manrope text-[28px] sm:text-[34px] font-extrabold text-[#04060a] tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="font-inter text-[14px] text-[#45474b]">
            Got queries regarding approvals, escrows, and warranties? We answer with structural transparency.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_DATA.slice(0, 6).map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[#dee3ec] overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-manrope font-bold text-[15px] sm:text-[16px] text-[#04060a] hover:text-[#e07a2f] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#e07a2f] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-[13px] font-inter text-[#45474b] leading-relaxed border-t border-[#eff4fe] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. FINAL CALL TO ACTION BANNER */}
      <section className="w-full bg-[#f8f9ff] py-14 border-t border-[#dee3ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#04060a] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[11px] font-inter font-bold uppercase tracking-widest text-[#ff9245]">
                Ready to Start on Your Plot?
              </span>
              <h2 className="font-manrope text-[28px] sm:text-[36px] font-extrabold text-white tracking-tight leading-tight">
                Book a Free On-Site Inspection &amp; Soil Test Consultation
              </h2>
              <p className="font-inter text-[14px] text-[#c4c6cd]">
                Meet our senior structural architects at your Bangalore plot. We will evaluate soil levels, orientation for Vastu, and deliver a complimentary custom 3D concept sketch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${CONSTRUCTION_CONFIG.brand.contact.primaryPhone}`}
                className="h-12 px-6 rounded-lg bg-white hover:bg-[#eff4fe] text-[#04060a] font-manrope font-bold text-[14px] flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Call {CONSTRUCTION_CONFIG.brand.contact.formattedPhone}</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="h-12 px-6 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-bold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Schedule Site Visit</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
