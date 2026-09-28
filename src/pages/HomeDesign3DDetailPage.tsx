import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { HOME_DESIGNS_3D_DATA } from "../data/homeDesigns3DData";
import { isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

interface HomeDesign3DDetailPageProps {
  onOpenThankYou?: (name: string, leadId: string) => void;
}

export const HomeDesign3DDetailPage: React.FC<HomeDesign3DDetailPageProps> = ({ onOpenThankYou }) => {
  const { slug } = useParams<{ slug: string }>();
  const design = HOME_DESIGNS_3D_DATA.find((d) => d.slug === slug);

  const [activeFloor, setActiveFloor] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<"render" | "structural" | "cad">("render");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  if (!design) {
    return <Navigate to="/3d-home-designs" replace />;
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPhone(formPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setPhoneError("");
    setSubmitting(true);

    try {
      const res = await submitLead({
        name: formName,
        phone: formPhone,
        service: `3D Customization: ${design.name}`,
        plotSize: design.plotDimensions,
        sourcePage: `/3d-home-designs/${design.slug}`,
      });
      setSubmitting(false);
      onOpenThankYou?.(formName, res.leadId);
      setFormName("");
      setFormPhone("");
    } catch {
      setSubmitting(false);
    }
  };

  const currentLevel = design.roomLedger[activeFloor] || design.roomLedger[0];

  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/3d-home-designs" className="text-white/60 hover:text-white transition-colors">3D Designs</Link>
            <span>/</span>
            <span className="text-secondary">{design.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded bg-secondary text-primary text-xs font-mono font-bold uppercase tracking-wider">
              {design.plotDimensions} Plot ({design.plotAreaSqFt} sq.ft)
            </span>
            <span className="px-3 py-1 rounded bg-white/10 text-white text-xs font-mono border border-white/20">
              Facing: {design.facing}
            </span>
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
              {design.vastuLabel}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            {design.name} ({design.bhk})
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            {design.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Super Built-up Area</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">{design.builtUpAreaSqFt.toLocaleString('en-IN')} sq.ft</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Configuration</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">{design.floors}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Ceiling Clearance</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">{design.ceilingHeight}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Turnkey Construction</div>
              <div className="text-xl sm:text-2xl font-black text-secondary font-mono mt-0.5">{design.estimatedCostDisplay}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Viewer & Floor Plan Sandbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main 3D / Isometric Canvas Container */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-primary rounded-2xl border border-white/10 overflow-hidden shadow-xl p-4 sm:p-6 text-white relative">
              {/* BIM Layer Switcher Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white/80 font-bold">
                    Interactive BIM Model Viewer
                  </span>
                </div>

                <div className="flex gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() => setActiveLayer("render")}
                    className={`px-3 py-1 rounded text-xs font-mono uppercase transition-colors cursor-pointer ${
                      activeLayer === "render" ? "bg-secondary text-primary font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    3D Elevation
                  </button>
                  <button
                    onClick={() => setActiveLayer("structural")}
                    className={`px-3 py-1 rounded text-xs font-mono uppercase transition-colors cursor-pointer ${
                      activeLayer === "structural" ? "bg-secondary text-primary font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Exploded BIM
                  </button>
                  <button
                    onClick={() => setActiveLayer("cad")}
                    className={`px-3 py-1 rounded text-xs font-mono uppercase transition-colors cursor-pointer ${
                      activeLayer === "cad" ? "bg-secondary text-primary font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    CAD Blueprint
                  </button>
                </div>
              </div>

              {/* Simulation Visual Frame */}
              <div className="relative h-80 sm:h-[460px] rounded-xl overflow-hidden bg-gradient-to-b from-primary-container to-primary flex items-center justify-center border border-white/5">
                <img
                  src={
                    activeLayer === "render"
                      ? design.heroImage
                      : activeLayer === "structural"
                      ? design.explodedImage
                      : design.floorPlanCadImage
                  }
                  alt={design.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />

                {/* HUD Overlay */}
                <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-secondary">
                  Mode: {activeLayer.toUpperCase()} VIEW • Bangalore Zone II
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <div className="bg-primary/80 backdrop-blur px-3 py-1.5 rounded border border-white/20">
                    Orientation: {design.facing} • {design.steelStandard}
                  </div>
                  <div className="bg-primary/80 backdrop-blur px-3 py-1.5 rounded border border-white/20 text-secondary">
                    Foundation: {design.foundationSpec}
                  </div>
                </div>
              </div>

              {/* Floor Plan Level Tabs */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-secondary font-bold">
                    Floor-Wise Architectural Layout
                  </span>
                  <span className="text-xs font-mono text-white/50">
                    Floor {activeFloor + 1} of {design.roomLedger.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {design.roomLedger.map((fp, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFloor(idx)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        activeFloor === idx
                          ? "border-secondary bg-secondary/10 text-white"
                          : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="font-bold text-xs">{fp.level}</div>
                      <div className="text-[11px] font-mono text-secondary mt-0.5">{fp.levelArea}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Floor Plan Details Card */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">
                  {currentLevel.level} Specification ({currentLevel.levelArea})
                </h3>
                <span className="px-3 py-1 rounded bg-secondary/10 text-secondary font-mono text-xs font-bold">
                  FAR & Vastu Compliant
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {currentLevel.rooms.map((room, rIdx: number) => (
                  <div key={rIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim border border-outline-variant">
                    <span className="text-secondary font-bold text-xs mt-0.5">●</span>
                    <div>
                      <div className="text-xs font-bold text-primary">{room.name}</div>
                      <div className="text-[11px] font-mono text-on-surface-variant">{room.size} ({room.sqft})</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Specifications */}
              <div className="bg-surface-dim p-4 rounded-xl border border-outline-variant">
                <h4 className="text-xs font-mono uppercase font-bold text-primary mb-2">
                  Structural & Engineering Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {design.specifications.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-on-surface-variant">
                      <span className="text-secondary font-bold">✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form & Cost Link */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-sm">
              <span className="text-xs font-mono uppercase text-secondary font-bold">
                Customise for your plot
              </span>
              <h3 className="text-xl font-black text-primary mt-1 mb-2">
                Build this on Your Land
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                Receive the CAD blueprints, structural calculations, and BOQ itemized schedule tailored for your Bangalore address.
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Murthy"
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

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-primary text-white font-bold text-xs tracking-wider uppercase font-mono hover:bg-secondary hover:text-primary transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Get Free CAD & BOQ Estimate"}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-outline-variant text-center">
                <Link
                  to="/cost-calculator"
                  className="text-xs font-mono font-bold text-secondary hover:text-secondary-hover uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <span>Open in Live Cost Calculator</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Other 3D archetypes */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6">
              <h4 className="font-bold text-primary text-sm mb-3">Other Bangalore Archetypes</h4>
              <div className="space-y-3">
                {HOME_DESIGNS_3D_DATA.filter((d) => d.slug !== design.slug).slice(0, 3).map((d) => (
                  <Link
                    key={d.id}
                    to={`/3d-home-designs/${d.slug}`}
                    className="flex gap-3 items-center group"
                  >
                    <img src={d.heroImage} alt={d.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {d.name}
                      </div>
                      <div className="text-[11px] font-mono text-on-surface-variant">
                        {d.plotDimensions} • {d.bhk}
                      </div>
                    </div>
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
