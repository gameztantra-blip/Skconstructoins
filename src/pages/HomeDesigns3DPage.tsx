import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HOME_DESIGNS_3D_DATA, Design3DItem } from "../data/homeDesigns3DData";

export const HomeDesigns3DPage: React.FC = () => {
  const [selectedPlot, setSelectedPlot] = useState<string>("All");

  const plotFilters = ["All", "30 × 40", "30 × 50", "40 × 60", "20 × 30"];

  const filteredDesigns = HOME_DESIGNS_3D_DATA.filter((item) => {
    if (selectedPlot === "All") return true;
    return item.plotDimensions.includes(selectedPlot);
  });

  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">3D Home Designs & BIM</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
            Interactive BIM & Elevation Catalogue
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Architectural 3D Home Designs for Bangalore Sites
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            Pre-engineered floor plans, structural layouts, and modern elevations calibrated strictly for standard Bangalore BDA/BBMP plot sizes (30x40, 30x50, 40x60). 100% Vastu compliant with instant turnkey cost estimates.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/cost-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-primary font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary-hover transition-colors shadow-lg shadow-secondary/20"
            >
              <span>Customize Any Design in Calculator</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Plot Size Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant pb-4">
          <div className="flex flex-wrap gap-2">
            {plotFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedPlot(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedPlot === filter
                    ? "bg-primary text-secondary shadow-md"
                    : "bg-surface text-on-surface-variant hover:bg-surface-variant hover:text-primary border border-outline-variant"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-on-surface-variant">
            Showing <strong className="text-primary">{filteredDesigns.length}</strong> Architectural Models
          </div>
        </div>
      </section>

      {/* 3D Designs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design: Design3DItem) => (
            <div
              key={design.id}
              className="group bg-surface rounded-2xl border border-outline-variant overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all flex flex-col"
            >
              {/* Image Preview with 3D Badge */}
              <div className="relative h-64 overflow-hidden bg-primary">
                <img
                  src={design.heroImage}
                  alt={design.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-secondary text-primary font-mono text-[11px] font-bold uppercase tracking-wider">
                    {design.plotDimensions}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-primary/80 backdrop-blur text-white font-mono text-[11px] border border-white/20">
                    {design.facing} Facing
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-mono uppercase text-secondary font-bold">
                    {design.bhk} • {design.style}
                  </span>
                  <h3 className="text-xl font-black text-white group-hover:text-secondary transition-colors">
                    {design.name}
                  </h3>
                </div>
              </div>

              {/* Specs & Room Breakdown */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed line-clamp-3">
                    {design.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-dim border border-outline-variant mb-6 text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Built-Up Area</div>
                      <div className="font-bold text-primary">{design.builtUpAreaSqFt.toLocaleString('en-IN')} sq.ft</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Configuration</div>
                      <div className="font-bold text-primary">{design.bhk} ({design.floors})</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Ceiling Height</div>
                      <div className="font-bold text-primary">{design.ceilingHeight}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Est. Construction</div>
                      <div className="font-bold text-secondary">{design.estimatedCostDisplay}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                    <span>🧭</span> {design.vastuLabel.split('(')[0]}
                  </span>
                  <Link
                    to={`/3d-home-designs/${design.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:text-secondary uppercase tracking-wider"
                  >
                    <span>Inspect 3D Layout</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
