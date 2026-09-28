import React, { useState, useMemo } from "react";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";
import { formatINR, formatLakhsCrores, calculateEmi, isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

interface CostCalculatorComponentProps {
  initialLocality?: string;
  onSuccess?: (leadName: string, leadId: string, whatsappUrl: string) => void;
}

export const CostCalculatorComponent: React.FC<CostCalculatorComponentProps> = ({
  initialLocality = "HSR Layout",
  onSuccess,
}) => {
  // Wizard Step State
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Plot Parameters
  const [locality, setLocality] = useState(initialLocality);
  const [plotLength, setPlotLength] = useState(40);
  const [plotWidth, setPlotWidth] = useState(30);
  const [plotFacing, setPlotFacing] = useState("North");

  // Step 2: Floors & Architecture
  const [floorKey, setFloorKey] = useState<"G" | "G+1" | "G+2" | "G+3">("G+2");
  const [hasStilt, setHasStilt] = useState(true);
  const [hasBasement, setHasBasement] = useState(false);
  const [bhk, setBhk] = useState(4);

  // Step 3: Packages
  const [packageId, setPackageId] = useState<"standard" | "premium" | "luxury">("premium");

  // Step 4: Verification & Lead details
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [startTime, setStartTime] = useState("Within 3 Months");
  const [loanRequired, setLoanRequired] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EMI Calculator Parameters
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);

  // Mathematical Calculations based on CONSTRUCTION_CONFIG
  const plotArea = Math.max(200, plotLength * plotWidth);
  const floorFactor = CONSTRUCTION_CONFIG.calculator.floorMultipliers[floorKey]?.factor || 2.30;
  
  // Base Super Built-up Calculation
  const superBuiltUpArea = useMemo(() => {
    let baseArea = plotArea * floorFactor;
    if (hasStilt) {
      baseArea += plotArea * CONSTRUCTION_CONFIG.calculator.extras.stiltAreaFactor;
    }
    if (hasBasement) {
      baseArea += plotArea * 0.85; // 85% basement footprint
    }
    return Math.round(baseArea);
  }, [plotArea, floorFactor, hasStilt, hasBasement]);

  // Rate per sq ft
  const ratePerSqFt = CONSTRUCTION_CONFIG.calculator.baseRates[packageId] || 2250;

  // Base Civil & Finishes Cost
  const baseCost = superBuiltUpArea * ratePerSqFt;

  // Extras: Approvals & Statutory
  const approvalsFee = Math.round(baseCost * CONSTRUCTION_CONFIG.calculator.extras.approvalsAndDesignPercentage);
  const compositeGst = Math.round(baseCost * CONSTRUCTION_CONFIG.calculator.extras.compositeGstRatePercentage);

  // Grand Total
  const grandTotalCost = baseCost + approvalsFee + compositeGst;

  // Tolerance Range ±8%
  const tolerance = CONSTRUCTION_CONFIG.calculator.extras.tolerancePercentage;
  const minCostRange = Math.round(grandTotalCost * (1 - tolerance));
  const maxCostRange = Math.round(grandTotalCost * (1 + tolerance));

  // Ledger itemization
  const ledger = useMemo(() => {
    return {
      civil: Math.round(grandTotalCost * CONSTRUCTION_CONFIG.calculator.ledgerDistribution.civilStructure),
      finishing: Math.round(grandTotalCost * CONSTRUCTION_CONFIG.calculator.ledgerDistribution.architecturalFinishing),
      mep: Math.round(grandTotalCost * CONSTRUCTION_CONFIG.calculator.ledgerDistribution.mepElectricalPlumbing),
      doors: Math.round(grandTotalCost * CONSTRUCTION_CONFIG.calculator.ledgerDistribution.doorsWindowsRailings),
      approvals: Math.round(grandTotalCost * CONSTRUCTION_CONFIG.calculator.ledgerDistribution.approvalsAndSanctions),
      gst: Math.round(grandTotalCost * CONSTRUCTION_CONFIG.calculator.ledgerDistribution.gstAndCess),
    };
  }, [grandTotalCost]);

  // EMI Computation
  const downPaymentAmount = Math.round(grandTotalCost * (downPaymentPercent / 100));
  const loanPrincipal = Math.max(0, grandTotalCost - downPaymentAmount);
  const monthlyEmi = calculateEmi(loanPrincipal, CONSTRUCTION_CONFIG.calculator.emi.defaultInterestRate, tenureYears);

  // Preset Handlers
  const handlePreset = (len: number, wid: number) => {
    setPlotLength(len);
    setPlotWidth(wid);
  };

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIndianPhone(ownerPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian WhatsApp number (starts with 6-9)");
      return;
    }
    setPhoneError("");

    setIsSubmitting(true);
    try {
      const result = await submitLead({
        name: ownerName || "Bangalore Plot Owner",
        phone: ownerPhone,
        email: ownerEmail,
        locality,
        plotSize: `${plotWidth}×${plotLength} (${plotArea} sq.ft)`,
        builtUpArea: superBuiltUpArea,
        packageTier: packageId.toUpperCase(),
        budgetEstimate: formatINR(grandTotalCost),
        timeline: startTime,
        loanRequired,
        sourcePage: window.location.pathname,
        sourceForm: "CostCalculator_Step4_UnlockBOQ",
      });

      setIsSubmitting(false);
      setSubmissionSuccess(`Thank you! Your estimate of ${formatINR(grandTotalCost)} has been saved. Reference ID: ${result.leadId}. Our engineer will reach out on WhatsApp.`);
      if (onSuccess) {
        onSuccess(ownerName || "Plot Owner", result.leadId, result.whatsappUrl);
      }
    } catch {
      setIsSubmitting(false);
      setSubmissionError("There was an issue processing your request. Please connect on WhatsApp directly.");
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 4-Step Interactive Estimation Wizard */}
        <section aria-label="Cost Estimation Wizard" className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#dee3ec] text-left">
            {/* Step Navigation Tabs */}
            <div className="relative mb-8">
              <div className="grid grid-cols-4 gap-2 text-center relative z-10">
                {[
                  { step: 1, label: "Plot Spec" },
                  { step: 2, label: "Floors" },
                  { step: 3, label: "Packages" },
                  { step: 4, label: "Unlock BOQ" },
                ].map((s) => {
                  const isActive = currentStep === s.step;
                  const isPassed = currentStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setCurrentStep(s.step)}
                      className={`flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#984800]"
                          : isPassed
                          ? "text-[#04060a]"
                          : "text-[#76777b]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all shadow-sm ${
                          isActive
                            ? "bg-[#984800] text-white"
                            : isPassed
                            ? "bg-[#a4f4bc] text-[#00210e]"
                            : "bg-[#dee3ec] text-[#45474b]"
                        }`}
                      >
                        {isPassed ? "✓" : s.step}
                      </div>
                      <span className="text-[11px] font-inter font-semibold uppercase tracking-wider">
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#dee3ec] -z-0">
                <div
                  className="h-full bg-[#984800] transition-all duration-300"
                  style={{
                    width: `${((currentStep - 1) / 3) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* STEP 1: Plot Dimensions & Orientation */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#dee3ec]">
                  <div>
                    <h3 className="font-manrope text-[18px] font-bold text-[#04060a]">
                      Step 1: Plot Dimensions &amp; Orientation
                    </h3>
                    <p className="font-inter text-[13px] text-[#45474b]">
                      Define spatial boundaries in Bangalore municipal limits
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#eff4fe] rounded text-[11px] font-bold text-[#984800] uppercase">
                    1 of 4
                  </span>
                </div>

                {/* Locality Selector */}
                <div>
                  <label className="block text-[13px] font-inter font-semibold text-[#171c23] mb-1.5">
                    Bangalore Micro-Market / Zone
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                  >
                    <option value="Indiranagar">Indiranagar &amp; Defence Colony (Central / Zone 1)</option>
                    <option value="HSR Layout">HSR Layout &amp; Koramangala (South / Zone 2)</option>
                    <option value="Whitefield">Whitefield &amp; ITPL Corridor (East / Zone 3)</option>
                    <option value="Sarjapur Road">Sarjapur Road &amp; Bellandur (SE Corridor)</option>
                    <option value="Hebbal">Hebbal &amp; Yelahanka Enclave (North BBMP)</option>
                    <option value="JP Nagar">JP Nagar &amp; Jayanagar Heritage (South Core)</option>
                    <option value="Electronic City">Electronic City Phases 1 &amp; 2</option>
                  </select>
                  <p className="text-[11px] text-[#76777b] mt-1">
                    Sanction Bye-law applied: BBMP Zonal Regulations (2020–2026 revision).
                  </p>
                </div>

                {/* Standard Plot Presets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-inter font-semibold text-[#171c23]">
                      Standard Bangalore Plot Dimensions
                    </span>
                    <span className="text-[11px] font-inter font-bold px-2 py-0.5 bg-[#ffdbc8] text-[#743500] rounded">
                      {plotArea.toLocaleString("en-IN")} sq.ft
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { l: 40, w: 30, label: "30 × 40", sqft: "1,200 sq.ft" },
                      { l: 50, w: 30, label: "30 × 50", sqft: "1,500 sq.ft" },
                      { l: 60, w: 40, label: "40 × 60", sqft: "2,400 sq.ft" },
                      { l: 80, w: 50, label: "50 × 80", sqft: "4,000 sq.ft" },
                    ].map((p) => {
                      const isSelected = plotLength === p.l && plotWidth === p.w;
                      return (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handlePreset(p.l, p.w)}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            isSelected
                              ? "bg-[#1c1f24] text-white border-[#1c1f24] shadow-sm font-semibold"
                              : "bg-[#eff4fe] text-[#171c23] border-transparent hover:bg-[#dee3ec]"
                          }`}
                        >
                          <span className="block text-[13px]">{p.label}</span>
                          <span className="block text-[10px] opacity-80">({p.sqft})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Precision Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-inter font-semibold uppercase text-[#76777b] mb-1">
                      Plot Length (Depth)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={15}
                        max={300}
                        value={plotLength}
                        onChange={(e) => setPlotLength(Math.max(10, Number(e.target.value) || 0))}
                        className="w-full h-11 px-3.5 pr-10 rounded-lg bg-[#eff4fe] text-[#171c23] font-manrope font-bold text-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                      />
                      <span className="absolute right-3 top-3 text-[11px] font-inter font-bold text-[#76777b]">
                        FT
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-inter font-semibold uppercase text-[#76777b] mb-1">
                      Plot Width (Frontage)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={15}
                        max={300}
                        value={plotWidth}
                        onChange={(e) => setPlotWidth(Math.max(10, Number(e.target.value) || 0))}
                        className="w-full h-11 px-3.5 pr-10 rounded-lg bg-[#eff4fe] text-[#171c23] font-manrope font-bold text-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                      />
                      <span className="absolute right-3 top-3 text-[11px] font-inter font-bold text-[#76777b]">
                        FT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vastu Facing Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-inter font-semibold text-[#171c23]">
                      Plot Road Facing (Vastu Alignment)
                    </span>
                    <span className="text-[11px] font-inter text-[#2f7d4f] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      100% Vastu setbacks auto-modeled
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {["North", "East", "South", "West"].map((direction) => {
                      const isSelected = plotFacing === direction;
                      return (
                        <button
                          key={direction}
                          type="button"
                          onClick={() => setPlotFacing(direction)}
                          className={`py-2 px-3 rounded-lg text-center font-inter text-[13px] font-semibold transition-all ${
                            isSelected
                              ? "bg-[#e07a2f] text-white shadow-sm"
                              : "bg-[#eff4fe] text-[#171c23] hover:bg-[#dee3ec]"
                          }`}
                        >
                          {direction}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto h-11 px-6 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Continue to Floor &amp; Scope</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Floors & Architecture */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#dee3ec]">
                  <div>
                    <h3 className="font-manrope text-[18px] font-bold text-[#04060a]">
                      Step 2: Floor Structure &amp; Architecture
                    </h3>
                    <p className="font-inter text-[13px] text-[#45474b]">
                      Select elevation levels, stilt parking, and room inventory
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#eff4fe] rounded text-[11px] font-bold text-[#984800] uppercase">
                    2 of 4
                  </span>
                </div>

                {/* Elevation Level Pills */}
                <div>
                  <label className="block text-[13px] font-inter font-semibold text-[#171c23] mb-2">
                    Elevation Levels (Ground + Superstructure)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { key: "G", title: "G Only", sub: "1 Living Level" },
                        { key: "G+1", title: "G + 1", sub: "2 Living Levels" },
                        { key: "G+2", title: "G + 2", sub: "3 Levels (Triplex)" },
                        { key: "G+3", title: "G + 3", sub: "4 Levels (Mansion)" },
                      ] as const
                    ).map((f) => {
                      const isSelected = floorKey === f.key;
                      return (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => setFloorKey(f.key)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            isSelected
                              ? "bg-[#1c1f24] text-white border-[#1c1f24] shadow-sm"
                              : "bg-[#eff4fe] text-[#171c23] border-transparent hover:bg-[#dee3ec]"
                          }`}
                        >
                          <div className="text-[14px] font-bold">{f.title}</div>
                          <div className={`text-[11px] ${isSelected ? "text-white/70" : "text-[#76777b]"}`}>
                            {f.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Civil Calculation Callout */}
                <div className="bg-[#eff4fe] p-4 rounded-xl flex items-start gap-3 border border-[#dee3ec]">
                  <div className="w-10 h-10 rounded-lg bg-[#ffdbc8] text-[#743500] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">architecture</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] font-inter font-bold uppercase text-[#76777b]">
                      <span>Permissible FAR Applied: {floorFactor.toFixed(2)}</span>
                      <span className="text-[#2f7d4f]">BBMP Compliant</span>
                    </div>
                    <div className="font-manrope text-[18px] font-extrabold text-[#04060a] mt-0.5">
                      Super Built-Up Area: <span className="text-[#e07a2f]">{superBuiltUpArea.toLocaleString("en-IN")} sq.ft</span>
                    </div>
                    <div className="text-[12px] font-inter text-[#45474b] mt-1">
                      Includes staircase core, setback adjustments, balcony slabs, and perimeter columns.
                    </div>
                  </div>
                </div>

                {/* Stilt Parking & Basement Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="p-3.5 rounded-xl bg-[#eff4fe] flex items-center justify-between cursor-pointer border border-[#dee3ec] hover:bg-[#e4e8f2] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[22px] text-[#e07a2f]">directions_car</span>
                      <div>
                        <div className="font-inter font-semibold text-[13px] text-[#171c23]">Covered Stilt Parking</div>
                        <div className="text-[11px] text-[#76777b]">2-Car bay + driver toilet</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasStilt}
                      onChange={(e) => setHasStilt(e.target.checked)}
                      className="w-4 h-4 rounded text-[#e07a2f] focus:ring-[#e07a2f] cursor-pointer"
                    />
                  </label>

                  <label className="p-3.5 rounded-xl bg-[#eff4fe] flex items-center justify-between cursor-pointer border border-[#dee3ec] hover:bg-[#e4e8f2] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[22px] text-[#e07a2f]">foundation</span>
                      <div>
                        <div className="font-inter font-semibold text-[13px] text-[#171c23]">Basement Hall / Sump</div>
                        <div className="text-[11px] text-[#76777b]">Retaining wall &amp; waterproofing</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasBasement}
                      onChange={(e) => setHasBasement(e.target.checked)}
                      className="w-4 h-4 rounded text-[#e07a2f] focus:ring-[#e07a2f] cursor-pointer"
                    />
                  </label>
                </div>

                {/* BHK Stepper */}
                <div className="p-3.5 bg-[#eff4fe] rounded-xl flex items-center justify-between border border-[#dee3ec]">
                  <div>
                    <div className="font-inter font-semibold text-[13px] text-[#171c23]">
                      Bedroom Inventory (BHK)
                    </div>
                    <div className="text-[11px] text-[#76777b]">
                      Includes dedicated Vastu Pooja Mandir &amp; Terrace Utility
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBhk(Math.max(1, bhk - 1))}
                      className="w-8 h-8 rounded-lg bg-white text-[#171c23] hover:bg-[#dee3ec] flex items-center justify-center font-bold text-lg shadow-sm"
                    >
                      −
                    </button>
                    <span className="font-manrope font-bold text-[16px] text-[#04060a] w-12 text-center">
                      {bhk} BHK
                    </span>
                    <button
                      type="button"
                      onClick={() => setBhk(Math.min(8, bhk + 1))}
                      className="w-8 h-8 rounded-lg bg-white text-[#171c23] hover:bg-[#dee3ec] flex items-center justify-center font-bold text-lg shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="h-11 px-5 rounded-lg bg-[#eff4fe] hover:bg-[#dee3ec] text-[#171c23] font-inter font-semibold text-[13px]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="h-11 px-6 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-semibold text-[14px] flex items-center gap-2 shadow-sm"
                  >
                    <span>Choose Package Tier</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Construction Packages */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#dee3ec]">
                  <div>
                    <h3 className="font-manrope text-[18px] font-bold text-[#04060a]">
                      Step 3: Turnkey Engineering Specifications
                    </h3>
                    <p className="font-inter text-[13px] text-[#45474b]">
                      Transparent material tiers with verified Indian brands
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#eff4fe] rounded text-[11px] font-bold text-[#984800] uppercase">
                    3 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: "standard" as const,
                      name: "Standard",
                      rate: 1850,
                      tag: "Essential",
                      features: [
                        "Tata Tiscon Fe-500D TMT",
                        "UltraTech / ACC 43/53 Grade",
                        "2×2 Vitrified flooring tiles",
                        "Cera / Parryware sanitary",
                      ],
                    },
                    {
                      id: "premium" as const,
                      name: "Premium",
                      rate: 2250,
                      tag: "Recommended",
                      popular: true,
                      features: [
                        "Tata Tiscon 550D Super Ductile",
                        "UltraTech Super Weather Pro",
                        "4×2 GVT Vitrified (Kajaria)",
                        "Teak door + Fenesta UPVC",
                        "Jaquar / Kohler CP fittings",
                      ],
                    },
                    {
                      id: "luxury" as const,
                      name: "Luxury Royale",
                      rate: 2750,
                      tag: "Ultra-Prime",
                      features: [
                        "Fe-550D + Composite Steel Beams",
                        "Imported Italian Marble (Dyna)",
                        "Schüco / Fenesta Double Glazing",
                        "Grohe / Kohler Smart Sanitary",
                        "Full KNX Home Touch Automation",
                      ],
                    },
                  ].map((pkg) => {
                    const isSelected = packageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setPackageId(pkg.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-white border-[#e07a2f] shadow-md ring-2 ring-[#e07a2f]/20"
                            : "bg-[#eff4fe] border-transparent hover:bg-[#dee3ec]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-manrope font-bold text-[16px] text-[#04060a]">
                              {pkg.name}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                pkg.popular ? "bg-[#ffdbc8] text-[#743500]" : "bg-[#dee3ec] text-[#45474b]"
                              }`}
                            >
                              {pkg.tag}
                            </span>
                          </div>

                          <div className="font-manrope font-extrabold text-[20px] text-[#e07a2f] my-1">
                            ₹{pkg.rate.toLocaleString("en-IN")}
                            <span className="text-[11px] font-normal text-[#76777b]"> / sq.ft</span>
                          </div>

                          <ul className="space-y-1.5 text-[12px] font-inter text-[#45474b] mt-3">
                            {pkg.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="material-symbols-outlined text-[15px] text-[#2f7d4f] shrink-0 mt-0.5">
                                  check
                                </span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-2 border-t border-[#dee3ec]">
                          <span
                            className={`text-[12px] font-inter font-bold ${
                              isSelected ? "text-[#e07a2f]" : "text-[#76777b]"
                            }`}
                          >
                            {isSelected ? "✓ Currently Selected" : "Click to Select"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="h-11 px-5 rounded-lg bg-[#eff4fe] hover:bg-[#dee3ec] text-[#171c23] font-inter font-semibold text-[13px]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="h-11 px-6 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-semibold text-[14px] flex items-center gap-2 shadow-sm"
                  >
                    <span>Proceed to Verification</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Verification & Complete Report Unlock */}
            {currentStep === 4 && (
              <form onSubmit={handleStepSubmit} className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#dee3ec]">
                  <div>
                    <h3 className="font-manrope text-[18px] font-bold text-[#04060a]">
                      Step 4: Unlock Complete 18-Page Detailed BOQ
                    </h3>
                    <p className="font-inter text-[13px] text-[#45474b]">
                      Instant PDF &amp; WhatsApp dispatch directly to plot owner
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#eff4fe] rounded text-[11px] font-bold text-[#984800] uppercase">
                    4 of 4
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full h-11 px-3.5 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                      WhatsApp Number (+91) *
                    </label>
                    <div className="flex">
                      <span className="h-11 px-3 bg-[#dee3ec] text-[#45474b] rounded-l-lg flex items-center font-inter font-semibold text-[13px]">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => {
                          setOwnerPhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        placeholder="98450 12345"
                        maxLength={10}
                        className="w-full h-11 px-3 rounded-r-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                      />
                    </div>
                    {phoneError && (
                      <p className="text-[11px] text-red-600 mt-1 font-inter">{phoneError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                    Email Address (For BOQ PDF Attachment)
                  </label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="ramesh@gmail.com"
                    className="w-full h-11 px-3.5 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                      When are you planning excavation?
                    </label>
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                    >
                      <option value="Immediate / 1 Month">Immediate / 1 Month</option>
                      <option value="Within 3 Months">Within 3 Months</option>
                      <option value="3 to 6 Months">3 to 6 Months</option>
                      <option value="Just Exploring">Just Exploring Budget</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-inter font-semibold text-[#171c23] mb-1">
                      Construction Loan Assistance?
                    </label>
                    <select
                      value={loanRequired ? "yes" : "no"}
                      onChange={(e) => setLoanRequired(e.target.value === "yes")}
                      className="w-full h-11 px-3 rounded-lg bg-[#eff4fe] text-[#171c23] font-inter text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e07a2f]"
                    >
                      <option value="yes">Yes (SBI / HDFC 8.5% p.a. Assist)</option>
                      <option value="no">No (Self-Funded Plot &amp; Build)</option>
                    </select>
                  </div>
                </div>

                {submissionSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium">
                    {submissionSuccess}
                  </div>
                )}

                {submissionError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
                    {submissionError}
                  </div>
                )}

                <div className="pt-3 flex flex-col gap-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-manrope font-bold text-[15px] rounded-lg shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">lock_open</span>
                        <span>Calculate &amp; Unlock Itemized BOQ</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[11px] font-inter text-[#76777b]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#2f7d4f]">lock</span>
                      100% Data Confidentiality
                    </span>
                    <span>•</span>
                    <span>Zero Tele-Spam Policy</span>
                    <span>•</span>
                    <span>DPDP Act Compliant</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Real-Time Financial Dashboard & Itemized Ledger */}
        <section aria-label="Cost Analysis Dashboard" className="lg:col-span-5 flex flex-col gap-6 text-left">
          {/* Big Estimated Total Card */}
          <div className="bg-[#04060a] text-white rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden border border-white/10">
            <div className="flex items-center justify-between text-[#c4c6cd] text-[11px] font-inter font-semibold uppercase tracking-wider">
              <span className="text-[#ff9245]">Grand Total Construction Cost</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                AUDITED BOQ
              </span>
            </div>

            <div className="mt-3">
              <div className="font-manrope text-[38px] sm:text-[44px] font-extrabold text-white tracking-tight leading-none">
                {formatINR(grandTotalCost)}
              </div>

              <div className="flex items-center gap-2 mt-2 text-[12px] font-inter">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[#ffdbc8] font-bold">
                  TOLERANCE ±8%
                </span>
                <span className="text-[#a0a3aa]">
                  Range: {formatLakhsCrores(minCostRange)} – {formatLakhsCrores(maxCostRange)}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 space-y-1.5 text-[12px] font-inter text-[#c4c6cd]">
              <div className="flex justify-between">
                <span>Selected Benchmark Rate:</span>
                <span className="font-bold text-white">₹{ratePerSqFt.toLocaleString("en-IN")} / sq.ft ({packageId.toUpperCase()})</span>
              </div>
              <div className="flex justify-between">
                <span>Total Super Built-up:</span>
                <span className="font-bold text-white">{superBuiltUpArea.toLocaleString("en-IN")} sq.ft ({floorKey})</span>
              </div>
              <div className="flex justify-between">
                <span>Soil Bearing Standard:</span>
                <span className="text-white">Bangalore Red Loam (180 kN/m²)</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[#ffdbc8] text-[12px] font-inter font-semibold">
              <span className="material-symbols-outlined text-[17px] text-[#ff9245] shrink-0">
                security_update_good
              </span>
              <span>Zero Escalation Guarantee: Material surge costs are 100% absorbed.</span>
            </div>
          </div>

          {/* Itemized Cost Ledger Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dee3ec] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-manrope text-[16px] font-bold text-[#04060a]">
                  Itemized Cost Ledger
                </h4>
                <p className="text-[12px] font-inter text-[#45474b]">
                  Breakdown by civil engineering &amp; finishing packages
                </p>
              </div>
              <span className="material-symbols-outlined text-[22px] text-[#e07a2f]">
                pie_chart
              </span>
            </div>

            <div className="space-y-2 text-[13px] font-inter">
              <div className="flex items-center justify-between p-2.5 bg-[#eff4fe] rounded-lg">
                <div>
                  <div className="font-semibold text-[#171c23]">1. Civil RCC Structure (42%)</div>
                  <div className="text-[11px] text-[#76777b]">Tata Tiscon 550D, UltraTech 53, Plinth beams</div>
                </div>
                <span className="font-bold text-[#171c23]">{formatINR(ledger.civil)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#eff4fe] rounded-lg">
                <div>
                  <div className="font-semibold text-[#171c23]">2. Architectural Finishing (24%)</div>
                  <div className="text-[11px] text-[#76777b]">Kajaria 4x2 GVT, Asian Paints Royale, False ceiling</div>
                </div>
                <span className="font-bold text-[#171c23]">{formatINR(ledger.finishing)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#eff4fe] rounded-lg">
                <div>
                  <div className="font-semibold text-[#171c23]">3. Plumbing &amp; Electrical MEP (14%)</div>
                  <div className="text-[11px] text-[#76777b]">Finolex FR-LSH, Astral CPVC, Schneider switches</div>
                </div>
                <span className="font-bold text-[#171c23]">{formatINR(ledger.mep)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#eff4fe] rounded-lg">
                <div>
                  <div className="font-semibold text-[#171c23]">4. Teak Doors &amp; UPVC Glazing (10%)</div>
                  <div className="text-[11px] text-[#76777b]">Burma Teak main frame, Fenesta UPVC acoustic glass</div>
                </div>
                <span className="font-bold text-[#171c23]">{formatINR(ledger.doors)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#eff4fe] rounded-lg">
                <div>
                  <div className="font-semibold text-[#171c23]">5. BBMP Approvals &amp; Vastu (4%)</div>
                  <div className="text-[11px] text-[#76777b]">IS 456 stamp, chartered engineer sanction drawing</div>
                </div>
                <span className="font-bold text-[#171c23]">{formatINR(ledger.approvals)}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#eff4fe] rounded-lg">
                <div>
                  <div className="font-semibold text-[#171c23]">6. RERA Composite GST &amp; Cess (6%)</div>
                  <div className="text-[11px] text-[#76777b]">Statutory input credit accounted composite rate</div>
                </div>
                <span className="font-bold text-[#171c23]">{formatINR(ledger.gst)}</span>
              </div>
            </div>
          </div>

          {/* EMI Finance Calculator Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dee3ec] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-inter font-bold text-[#984800] uppercase tracking-wider block">
                  Bank Finance Assist
                </span>
                <h4 className="font-manrope text-[16px] font-bold text-[#04060a]">
                  Estimated EMI: <span className="text-[#e07a2f]">{formatINR(monthlyEmi)}</span> / mo
                </h4>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#eff4fe] text-[11px] font-bold text-[#171c23]">
                @ 8.5% p.a.
              </div>
            </div>

            <div className="space-y-3 font-inter">
              <div>
                <div className="flex justify-between text-[11px] text-[#76777b] mb-1">
                  <span>Down Payment ({downPaymentPercent}%)</span>
                  <span className="font-bold text-[#171c23]">{formatINR(downPaymentAmount)}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#e07a2f] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#76777b] mb-1">
                  <span>Loan Tenure</span>
                  <span className="font-bold text-[#171c23]">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-[#e07a2f] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#dee3ec] flex items-center justify-between text-[11px] font-inter text-[#76777b]">
              <span>Pre-Approved Bank Partners:</span>
              <div className="flex items-center gap-1.5 font-bold text-[#171c23]">
                <span className="px-1.5 py-0.5 bg-[#eff4fe] rounded">SBI</span>
                <span className="px-1.5 py-0.5 bg-[#eff4fe] rounded">HDFC</span>
                <span className="px-1.5 py-0.5 bg-[#eff4fe] rounded">ICICI</span>
                <span className="px-1.5 py-0.5 bg-[#eff4fe] rounded">Axis</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
