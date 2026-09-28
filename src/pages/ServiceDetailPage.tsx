import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { SERVICES_DATA } from "../data/servicesData";
import { isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

interface ServiceDetailPageProps {
  onOpenThankYou?: (name: string, leadId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenThankYou }) => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [plotSize, setPlotSize] = useState("30x40");
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPhone(formPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number (starts with 6-9)");
      return;
    }
    setPhoneError("");
    setSubmitting(true);

    try {
      const res = await submitLead({
        name: formName,
        phone: formPhone,
        service: service.title,
        plotSize: plotSize,
        sourcePage: `/services/${service.slug}`,
      });
      setSubmitting(false);
      onOpenThankYou?.(formName, res.leadId);
      setFormName("");
      setFormPhone("");
    } catch {
      setSubmitting(false);
    }
  };

  const defaultMaterials = [
    { category: "Primary TMT Steel", specification: "Tata Tiscon 550D Super Ductile / JSW Neosteel Fe-550D", standard: "IS 1786:2008" },
    { category: "Structural Cement", specification: "UltraTech Super / Birla Shakti 53-Grade OPC & PPC", standard: "IS 12269:2013" },
    { category: "Ready Mix Concrete", specification: "ACC / UltraTech M-25 & M-30 High Strength Mix", standard: "IS 456:2000" },
    { category: "Wall Masonry", specification: "Table-Moulded Wire-cut Red Bricks / Godrej Autoclaved Aerated Concrete", standard: "IS 2185:2008" },
    { category: "Internal Waterproofing", specification: "Dr. Fixit Fastflex 2-component polymer elastomeric coating", standard: "DIN 1048" },
    { category: "Concealed Plumbing", specification: "Astral CPVC Pro SDR-11 hot/cold pressure pipelines", standard: "ASTM D2846" },
    { category: "Concealed Wiring", specification: "Finolex / Havells Flame-Retardant Low Smoke (FRLS) copper", standard: "IS 694:2010" },
  ];

  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-primary text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="text-white/60 hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-secondary">{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
                Service Scope & Execution Standards
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6">
                {service.fullDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10">
                <div>
                  <div className="text-xs font-mono text-white/50 uppercase">Benchmark Pricing</div>
                  <div className="text-2xl font-bold font-mono text-secondary mt-0.5">{service.startingPrice}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-white/50 uppercase">Billing Model</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">{service.priceModel}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-white/50 uppercase">Structural Guarantee</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">10-Year RERA</div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Card */}
            <div className="lg:col-span-5">
              <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8 text-primary shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-secondary font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Site Consultation & Estimate
                </div>
                <h3 className="text-xl font-black text-primary mb-2">
                  Request Custom Proposal
                </h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Get structural feasibility report, BBMP FAR verification, and itemized bill of quantities for your plot.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      WhatsApp Mobile Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-variant text-xs font-mono font-bold text-on-surface-variant">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={formPhone}
                        onChange={(e) => {
                          setFormPhone(e.target.value.replace(/\D/g, ""));
                          if (phoneError) setPhoneError("");
                        }}
                        className="w-full px-3.5 py-2.5 rounded-r-lg border border-outline-variant bg-surface-dim text-sm text-primary font-mono focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                      />
                    </div>
                    {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      Plot Dimensions / Area
                    </label>
                    <select
                      value={plotSize}
                      onChange={(e) => setPlotSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                    >
                      <option value="30x40 (1,200 sq.ft)">30x40 (1,200 sq.ft)</option>
                      <option value="30x50 (1,500 sq.ft)">30x50 (1,500 sq.ft)</option>
                      <option value="40x60 (2,400 sq.ft)">40x60 (2,400 sq.ft)</option>
                      <option value="50x80 (4,000 sq.ft)">50x80 (4,000 sq.ft)</option>
                      <option value="Odd Plot / Commercial">Odd Dimension / Commercial Site</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg bg-primary text-white font-bold text-xs tracking-wider uppercase font-mono hover:bg-secondary hover:text-primary transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Processing..." : "Get Detailed BOQ & Site Visit"}
                  </button>

                  <p className="text-[10px] text-on-surface-variant text-center leading-tight">
                    By submitting, you consent to receive project updates under India's DPDP Act. We do not spam.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Deliverables & Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            {/* Deliverables */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-4">
                Included in This Turnkey Scope
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-dim border border-outline-variant">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm text-primary font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Process */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-6">
                Milestone Execution Workflow
              </h2>
              <div className="space-y-6">
                {service.stages.map((step) => (
                  <div key={step.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center font-mono font-bold text-sm shrink-0 border border-white/10">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-base mb-1">{step.title}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-2">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Material Specifications Table */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-4">
                Certified Material Specifications
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant bg-surface-dim text-on-surface-variant font-mono uppercase">
                      <th className="py-3 px-4">Component</th>
                      <th className="py-3 px-4">Brand / Specification</th>
                      <th className="py-3 px-4">Standard Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-mono text-xs">
                    {defaultMaterials.map((mat, i) => (
                      <tr key={i} className="hover:bg-surface-dim transition-colors">
                        <td className="py-3.5 px-4 font-bold text-primary font-sans">{mat.category}</td>
                        <td className="py-3.5 px-4 text-on-surface-variant font-sans">{mat.specification}</td>
                        <td className="py-3.5 px-4 text-secondary font-bold">{mat.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
                <h2 className="text-2xl font-black text-primary mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-surface-dim border border-outline-variant">
                      <h3 className="font-bold text-primary text-sm mb-1">{faq.q}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Advantages & Cost Estimator link */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary text-white rounded-2xl p-6 sm:p-8 border border-white/10">
              <span className="text-xs font-mono text-secondary uppercase tracking-wider">Turnkey Guarantee</span>
              <h3 className="text-xl font-black mt-2 mb-4">The SK Constructions Commitment</h3>
              <ul className="space-y-3 text-xs text-white/80 leading-relaxed mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Zero cost overrun policy. The signed quote is the final price.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>100% money back escrow safety for delayed milestones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>Live HD CCTV camera access & weekly engineer audit reports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">✓</span>
                  <span>10-year structural warranty on RERA registered stamp paper.</span>
                </li>
              </ul>
              <Link
                to="/cost-calculator"
                className="block text-center w-full py-3 rounded-lg bg-secondary text-primary font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary-hover transition-colors"
              >
                Estimate Cost For This Service
              </Link>
            </div>

            <div className="bg-surface rounded-2xl border border-outline-variant p-6">
              <h4 className="font-bold text-primary text-sm mb-3">Other Turnkey Solutions</h4>
              <div className="space-y-2">
                {SERVICES_DATA.filter((s) => s.slug !== service.slug).slice(0, 4).map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}`}
                    className="block p-3 rounded-xl hover:bg-surface-dim border border-transparent hover:border-outline-variant transition-colors"
                  >
                    <div className="font-bold text-xs text-primary">{s.title}</div>
                    <div className="text-[11px] font-mono text-secondary">{s.startingPrice}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
