import React from "react";
import { Link } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">About Our Firm</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
            Founded 2011 • Bangalore Headquarters
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Engineering Precision Homes with Uncompromising Integrity
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            SK Constructions was founded by civil engineering graduates from IISc and RVCE to eliminate the chronic opacity, cost overruns, and quality degradation prevalent in traditional Indian residential contracting.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Completed Homes</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">450+ Units</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Total Built-Up Area</div>
              <div className="text-xl sm:text-2xl font-black text-secondary font-mono mt-0.5">14.8 Lakh sq.ft</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Full-Time Civil Engineers</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">38 Specialists</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Legal Warranty</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">10 Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-secondary font-bold">
              The SK Constructions Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-primary tracking-tight">
              Why 450+ Bangalore Families Entrusted Us With Their Lifelong Investments
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              In Bangalore’s unorganized construction sector, 78% of projects experience delays averaging 9 months and hidden budget inflations of 22% to 35%. SK Constructions replaced verbal contractor promises with contractual escrow tranches, live site CCTV telemetry, and digitized 430-point quality checks.
            </p>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Every foundation pour, steel reinforcement layout, and waterproofing barrier is inspected personally by licensed structural engineers before milestone payouts are released from client escrow accounts.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 rounded-lg bg-primary text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary hover:text-primary transition-colors"
              >
                Inspect Delivered Projects
              </Link>
              <Link
                to="/cost-calculator"
                className="px-6 py-3 rounded-lg bg-surface border border-outline-variant text-primary font-bold text-xs uppercase tracking-wider font-mono hover:bg-surface-variant transition-colors"
              >
                Estimate Construction Cost
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant bg-primary">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1000&q=80"
                alt="Engineers on Bangalore construction site"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-mono text-secondary uppercase font-bold">Bangalore Site Inspection</div>
                <div className="text-sm font-bold mt-1">Fe-550D TMT Rebar Spacing & Cover Block Audit, Indiranagar G+3 Site</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Board */}
      <section className="bg-surface py-16 border-y border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono text-secondary uppercase font-bold tracking-wider">
              Engineering Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-primary mt-1">
              Led by Structural & Civil Engineers
            </h2>
            <p className="text-sm text-on-surface-variant mt-2">
              Our core directors bring decades of high-rise structural calculation, project governance, and municipal sanctioning expertise in Karnataka.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface-dim border border-outline-variant">
              <div className="w-16 h-16 rounded-xl bg-primary text-secondary font-mono font-bold text-xl flex items-center justify-center mb-4">
                SK
              </div>
              <h3 className="text-lg font-bold text-primary">S. Karthik, M.Tech (Structures)</h3>
              <div className="text-xs font-mono text-secondary mb-3">Founder & Managing Director</div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Over 18 years in residential high-load structural engineering. Former Senior Structural Consultant for Grade-A commercial projects across Bangalore and Hyderabad.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-dim border border-outline-variant">
              <div className="w-16 h-16 rounded-xl bg-primary text-secondary font-mono font-bold text-xl flex items-center justify-center mb-4">
                VP
              </div>
              <h3 className="text-lg font-bold text-primary">Vidya Prasad, B.Arch, AIIA</h3>
              <div className="text-xs font-mono text-secondary mb-3">Head of Architecture & BIM</div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                14 years designing luxury tropical villas and contemporary Bangalore homes. Expert in BDA zoning regulations and climate-responsive passive ventilation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-dim border border-outline-variant">
              <div className="w-16 h-16 rounded-xl bg-primary text-secondary font-mono font-bold text-xl flex items-center justify-center mb-4">
                MN
              </div>
              <h3 className="text-lg font-bold text-primary">M. Nanjappa, B.E. (Civil)</h3>
              <div className="text-xs font-mono text-secondary mb-3">VP of Site Operations & Quality</div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                22 years overseeing ground civil execution, Ready-Mix Concrete batching, structural curing regimes, and RERA compliance documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-primary text-white rounded-2xl p-8 sm:p-12 border border-white/10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-secondary uppercase tracking-wider">Accreditations & Governance</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2 mb-4">
              Registered, Certified & Transparently Audited
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              We operate strictly within the legal frameworks prescribed by the Real Estate Regulatory Authority (RERA Karnataka), Bureau of Indian Standards (BIS), and Karnataka State Fire Safety directives.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-secondary font-bold">RERA Registered</div>
                <div className="text-white/60 mt-1">{CONSTRUCTION_CONFIG.reraNumber}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-secondary font-bold">GSTIN Validated</div>
                <div className="text-white/60 mt-1">{CONSTRUCTION_CONFIG.gstin}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-secondary font-bold">Quality Standard</div>
                <div className="text-white/60 mt-1">{CONSTRUCTION_CONFIG.isoCertification}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-secondary font-bold">Data Compliance</div>
                <div className="text-white/60 mt-1">India DPDP Act 2023</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
