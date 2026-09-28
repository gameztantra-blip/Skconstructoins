import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { LOCALITIES_DATA, LocalityItem } from "../data/localitiesData";
import { isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

interface LocalityPageProps {
  onOpenThankYou?: (name: string, leadId: string) => void;
}

export const LocalityPage: React.FC<LocalityPageProps> = ({ onOpenThankYou }) => {
  const { locality: slug } = useParams<{ locality: string }>();
  const locality = LOCALITIES_DATA.find((l) => l.slug === slug);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [plotSize, setPlotSize] = useState("30x40 (1200 sq.ft)");
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  if (!locality) {
    return <Navigate to="/house-construction-in/indiranagar" replace />;
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPhone(formPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number");
      return;
    }
    setPhoneError("");
    setSubmitting(true);

    try {
      const res = await submitLead({
        name: formName,
        phone: formPhone,
        service: `House Construction in ${locality.name}`,
        plotSize: plotSize,
        sourcePage: `/house-construction-in/${locality.slug}`,
      });
      setSubmitting(false);
      onOpenThankYou?.(formName, res.leadId);
      setFormName("");
      setFormPhone("");
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Bangalore Micro-Markets</span>
            <span>/</span>
            <span className="text-secondary">{locality.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
                BBMP {locality.bbmpZone} • Zonal Engineering Report
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
                House Construction in {locality.name}, Bangalore
              </h1>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6">
                Turnkey residential construction engineered specifically for {locality.name}’s soil profile ({locality.soilType}), water table dynamics ({locality.waterTableDepth}), and BBMP setback norms.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <div className="text-white/50 uppercase">Benchmark Construction Rate</div>
                  <div className="text-xl font-bold font-mono text-secondary mt-0.5">{locality.averageRatePerSqFt}</div>
                </div>
                <div>
                  <div className="text-white/50 uppercase">Max Permissible FAR</div>
                  <div className="text-xl font-bold font-mono text-white mt-0.5">{locality.bylawFAR}</div>
                </div>
                <div>
                  <div className="text-white/50 uppercase">SK Delivered Projects</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{locality.deliveredProjectsCount}+ Sites</div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Card */}
            <div className="lg:col-span-5">
              <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8 text-primary shadow-2xl">
                <span className="text-xs font-mono uppercase text-secondary font-bold">
                  {locality.name} Plot Feasibility
                </span>
                <h3 className="text-xl font-black text-primary mt-1 mb-2">
                  Get Free Site Survey & FAR Check
                </h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Get custom structural footing recommendations and setback clearances for your {locality.name} site.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nanda Kishore"
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
                      Plot Dimensions
                    </label>
                    <select
                      value={plotSize}
                      onChange={(e) => setPlotSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                    >
                      <option value="30x40 (1200 sq.ft)">30x40 (1,200 sq.ft)</option>
                      <option value="30x50 (1500 sq.ft)">30x50 (1,500 sq.ft)</option>
                      <option value="40x60 (2400 sq.ft)">40x60 (2,400 sq.ft)</option>
                      <option value="50x80 (4000 sq.ft)">50x80 (4,000 sq.ft)</option>
                      <option value="Odd Dimension Site">Odd Dimension Site</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg bg-primary text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary hover:text-primary transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Processing..." : `Book ${locality.name} Site Visit`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Bylaws & Soil Analysis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Municipal Sanction Matrix */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-4">
                BBMP Building Bylaws & Setbacks in {locality.name}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                Under BBMP Master Plan 2015/2031 guidelines, construction in {locality.name} ({locality.zone}) requires strict adherence to permissible Floor Area Ratio (FAR) and boundary clearances to ensure Occupancy Certificate (OC) issuance without penalties.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant font-mono text-xs">
                  <div className="text-[10px] text-on-surface-variant uppercase">Permissible FAR</div>
                  <div className="text-primary font-bold text-base mt-1">{locality.bylawFAR}</div>
                </div>
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant font-mono text-xs">
                  <div className="text-[10px] text-on-surface-variant uppercase">Setback Rules</div>
                  <div className="text-primary font-bold text-base mt-1">{locality.setbackRule}</div>
                </div>
              </div>
            </div>

            {/* Geological & Soil Intelligence */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-4">
                Geological Profile & Foundation Strategy
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                {locality.overview}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant">
                  <div className="text-xs font-mono font-bold text-secondary uppercase mb-1">Safe Bearing Capacity</div>
                  <div className="font-bold text-primary text-sm">{locality.safeBearingCapacity}</div>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Soil Type: {locality.soilType}. Footings calibrated to prevent differential settlement.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant">
                  <div className="text-xs font-mono font-bold text-secondary uppercase mb-1">Water Table Dynamics</div>
                  <div className="font-bold text-primary text-sm">{locality.waterTableDepth}</div>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Ensures protection against seasonal hydrostatic head with customized membrane tanking.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Challenges & Engineering Solutions */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-4">
                Site Challenges & SK Engineering Mitigations
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-primary text-sm mb-3 font-mono uppercase text-secondary">
                    Local Site Hurdles
                  </h3>
                  <div className="space-y-2">
                    {locality.keyChallenges.map((ch, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <span className="text-red-500 font-bold shrink-0">✕</span>
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-primary text-sm mb-3 font-mono uppercase text-emerald-600">
                    SK Engineering Protocols
                  </h3>
                  <div className="space-y-2">
                    {locality.engineeringSolutions.map((sol, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Other Localities & Cost Tool */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary text-white rounded-2xl p-6 sm:p-8 border border-white/10">
              <span className="text-xs font-mono text-secondary uppercase tracking-wider">Live Rates</span>
              <h3 className="text-xl font-black mt-2 mb-4">Calculate {locality.name} House Build Cost</h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Use our automated estimator to evaluate built-up area cost including structural approvals, BESCOM transformer connections, and BWSSB underground drainage tapping.
              </p>
              <Link
                to="/cost-calculator"
                className="block text-center w-full py-3 rounded-lg bg-secondary text-primary font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary-hover transition-colors"
              >
                Launch Cost Calculator
              </Link>
            </div>

            <div className="bg-surface rounded-2xl border border-outline-variant p-6">
              <h4 className="font-bold text-primary text-sm mb-3">Other Bangalore Micro-Markets</h4>
              <div className="space-y-2">
                {LOCALITIES_DATA.filter((l) => l.slug !== locality.slug).map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/house-construction-in/${loc.slug}`}
                    className="block p-3 rounded-xl hover:bg-surface-dim border border-transparent hover:border-outline-variant transition-colors"
                  >
                    <div className="font-bold text-xs text-primary">{loc.name}</div>
                    <div className="text-[11px] font-mono text-secondary">{loc.averageRatePerSqFt} • {loc.bbmpZone}</div>
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
