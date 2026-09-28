import React from "react";
import { Link } from "react-router-dom";
import { SERVICES_DATA } from "../data/servicesData";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

interface ServicesPageProps {
  onOpenQuoteModal?: (serviceSlug?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Engineering Services</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
            Turnkey Civil & Structural Engineering
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Comprehensive Construction Services in Bangalore
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            From luxury independent villas and high-yield G+4 rental residences to precision commercial PEB structures and BBMP sanction liaising. Engineered under strict IS-456 standards with milestone-linked escrow payment security.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/cost-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-primary font-bold text-sm tracking-wide uppercase hover:bg-secondary-hover transition-colors shadow-lg shadow-secondary/20"
            >
              <span>Calculate Project Cost</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <button
              onClick={() => onOpenQuoteModal?.()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-bold text-sm tracking-wide uppercase hover:bg-white/20 transition-colors border border-white/20"
            >
              <span>Book Site Feasibility Study</span>
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="group bg-surface rounded-2xl border border-outline-variant overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-56 overflow-hidden bg-primary">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-primary/80 backdrop-blur text-secondary font-mono text-xs font-bold uppercase tracking-wider border border-white/10">
                    Service 0{index + 1}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs font-mono text-white/70 uppercase">Starting at</div>
                  <div className="text-xl font-bold font-mono text-white">{service.startingPrice}</div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                      Key Deliverables
                    </div>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant flex items-center justify-between gap-4">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold font-mono text-primary hover:text-secondary uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <span>View Specifications</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => onOpenQuoteModal?.(service.slug)}
                    className="px-3 py-1.5 rounded bg-primary text-white text-xs font-bold font-mono uppercase tracking-wider hover:bg-secondary hover:text-primary transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Quality & Assurance Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-primary text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono text-secondary uppercase tracking-wider">Standard Operating Procedures</span>
            <h2 className="text-2xl sm:text-4xl font-black mt-2 mb-4">
              430-Point Quality Checklist Across Every Foundation & Slab
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
              Every stage of construction is audited by certified civil engineers with slump cone testing, cube compression checks at 7 and 28 days, ultrasonic weld inspections, and digital rebar spacing verification before concrete pour approval.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-mono font-bold text-secondary">M-30</div>
                <div className="text-xs text-white/60 mt-1">Ready Mix Concrete minimum standard for slabs</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-mono font-bold text-white">Fe-550D</div>
                <div className="text-xs text-white/60 mt-1">High-ductility earthquake-resistant TMT steel</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-mono font-bold text-secondary">3-Stage</div>
                <div className="text-xs text-white/60 mt-1">Pre-construction anti-termite chemical barrier</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-mono font-bold text-white">100%</div>
                <div className="text-xs text-white/60 mt-1">BBMP / BDA sanctioned plan compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
