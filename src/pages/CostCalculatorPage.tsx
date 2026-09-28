import React from "react";
import { Link } from "react-router-dom";
import { CostCalculatorComponent } from "../components/CostCalculatorComponent";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";
import { formatINR } from "../utils/formatters";

interface CostCalculatorPageProps {
  onOpenThankYou?: (name: string, leadId: string) => void;
}

export const CostCalculatorPage: React.FC<CostCalculatorPageProps> = ({ onOpenThankYou }) => {
  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-primary text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Cost Estimator</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
              Bangalore Construction Index 2026
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Bangalore House Construction Cost Calculator
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Calculate realistic construction costs based on live material rates, BBMP/BDA zonal bylaws, floor configuration, and stilt/basement parking parameters. Download full itemized bill of quantities (BOQ) with ±8% tolerance guarantee.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Base Rate / sq.ft</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">{formatINR(CONSTRUCTION_CONFIG.defaultBaseRatePerSqFt)}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Cost Deviation</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">0.0% Overruns</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Escrow Safety</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">Milestone Tranches</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Structural Warranty</div>
              <div className="text-xl sm:text-2xl font-black text-secondary font-mono mt-0.5">10 Years Legal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <CostCalculatorComponent onSuccess={(name, leadId) => onOpenThankYou?.(name, leadId)} />
      </section>

      {/* Methodology & FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-3">
            How Our Cost Estimator Works
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
            Unlike superficial generic tools, our engine calculates structural steel requirements (Fe-550D TMT), 53-grade cement tranches, ready-mix concrete grades (M25/M30), BBMP sanctioned setback rules, and Bangalore soil excavation variations.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-dim p-6 rounded-xl border border-outline-variant">
              <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-mono font-bold text-sm mb-4">
                01
              </div>
              <h3 className="font-bold text-primary text-base mb-2">Built-up vs Carpet Area</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Construction costs are determined strictly on Built-Up Area (BUA) including external walls, balconies, utility ducts, and staircase shafts. Plot area is used only for FAR and ground coverage sanity checks.
              </p>
            </div>

            <div className="bg-surface-dim p-6 rounded-xl border border-outline-variant">
              <div className="w-10 h-10 rounded-lg bg-secondary text-primary flex items-center justify-center font-mono font-bold text-sm mb-4">
                02
              </div>
              <h3 className="font-bold text-primary text-base mb-2">Basement & Stilt Loading</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Basements in Bangalore require specialized shoring piles, bentonite mud excavation, and 3-ply membrane waterproofing, creating a +25% structural cost premium over standard superstructure levels.
              </p>
            </div>

            <div className="bg-surface-dim p-6 rounded-xl border border-outline-variant">
              <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-mono font-bold text-sm mb-4">
                03
              </div>
              <h3 className="font-bold text-primary text-base mb-2">Fixed-Price Escrow Guarantee</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Once a quote is signed under our Turnkey Contract, prices are locked against market inflation. Material price hikes during construction are absorbed 100% by SK Constructions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
