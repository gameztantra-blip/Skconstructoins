/**
 * Services Data for SK Constructions Bangalore
 * Complete with pricing models, deliverables, scopes, and FAQs
 */

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  priceModel: string;
  startingPrice: string;
  deliverables: string[];
  stages: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  heroImage: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "svc-turnkey-home",
    slug: "turnkey-home-construction",
    title: "Turnkey Home Construction",
    shortDescription: "Complete architectural planning, structural analysis, BBMP/BMRDA approvals, Bhoomi Pujan, and execution till final housewarming.",
    fullDescription: "Our signature turnkey model relieves Bangalore plot owners of contractor chaos, material price spikes, and labor unpredictability. From digital borehole soil testing and Vastu-compliant BIM drafting to BBMP municipal sanctioning and daily on-site civil engineering oversight, we manage every single aspect under a legally binding zero-escalation contract.",
    icon: "villa",
    priceModel: "Per Square Foot (Built-up)",
    startingPrice: "Starts ₹1,850/sq.ft",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuApJ_GiljZeMblYW2ZnHs3xH5ByTFiFGGrhRN5cXjRCH_SXOWpPS-9xXwbDDl6fhjSt9ZUcYWueEiELS_SBsMT9MZlRgngdCM0671gFQqL4sGvGsb2Si0Vf8dgzPqoUGwHLY0HzFDLO5G0RUBikqB_FVzEJ7nx-u9EV5Qtw_G2YAqUYp3zxy87U2RzqZq0sj2s93EOEiu-9RZNW9IPTei8k8VlXo0gAVefLKH4zxALbuYE6fyCMulvk5Q",
    deliverables: [
      "100% Vastu-Compliant 2D & 3D Architectural Blueprints",
      "BBMP / BDA Sanction Drawing Liaison & Approvals",
      "Full RCC Structural Frame using Tata Tiscon 550D & UltraTech Cement",
      "Concealed CPVC Plumbing & Fire-Retardant Electrical Conduits",
      "Premium Tiling, Teakwood Doors, and UPVC Glazed Windows",
      "10-Year Structural Integrity Warranty Certificate",
    ],
    stages: [
      { step: "01", title: "Plot Feasibility & Vastu Alignment", desc: "Topographic survey, soil bearing test, and client requirement gathering." },
      { step: "02", title: "3D BIM Drafting & Municipal Sanction", desc: "BBMP bye-law calculations, 3D elevations, and approval submission." },
      { step: "03", title: "Bhoomi Pujan & Substructure", desc: "Groundbreaking ceremony, raft excavation, and plinth beam casting." },
      { step: "04", title: "Superstructure & Slab Castings", desc: "RCC column erection, shuttering, beam rebars, and slab pours." },
      { step: "05", title: "Masonry & Concealed MEP", desc: "Table-moulded red brickwork, electrical conduits, and plumbing lines." },
      { step: "06", title: "Architectural Finishes & Snagging", desc: "Flooring tiles, teak woodwork, paint coats, and 400-point audit." },
      { step: "07", title: "Griha Pravesh Handover", desc: "Key handover with 10-year warranty document and master CAD files." },
    ],
    faqs: [
      {
        q: "What does turnkey construction mean?",
        a: "Turnkey means we handle everything from start to finish. You provide the plot, and we hand you the finished house with lights on, plumbing working, and keys in hand.",
      },
      {
        q: "How are payments structured?",
        a: "Payments are linked strictly to 7 verified milestones (Foundation, Ground Slab, First Slab, Masonry, Plastering, Finishes, Handover). Funds are held in escrow.",
      },
    ],
  },
  {
    id: "svc-commercial-tech",
    slug: "commercial-tech-parks",
    title: "Commercial & Tech Parks",
    shortDescription: "Multi-storey retail complexes, G+4 corporate spaces, and IT office workspaces with high-load slab design and fire NOC clearances.",
    fullDescription: "We engineer commercial edifices tailored for Bangalore's thriving business landscape. Utilizing post-tensioned (PT) slabs and steel-concrete composite frameworks, we deliver expansive column-free floor plates that optimize leaseable carpet area while guaranteeing strict compliance with Karnataka Fire Force, BBMP commercial FAR, and BESCOM high-tension power norms.",
    icon: "corporate_fare",
    priceModel: "Tailored BOQ Contracts",
    startingPrice: "Custom Contract Pricing",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR9iVs8771eOzjY_FqSH3BDkkqTl9eT2ReAIVFqqpN9aVFV0L6FBHGd3uANYY3fxqIDLebp2h3tL0Vw7Al78jruZ2ZXExwnXjmNGUVQuiO3ZR1ietRQX77ZAyTLOuSx4JvlC5uQR_7KiUJQyHcjY_BEg_KwxIsr2CT7gX_v4dFr7gm7n-cBSDEElsAL_P4nFqWj1xCUEDGZMqTHUWGN-BkjzMLBaWe3MZAyfPmkThwHQ_kjJ7Vpbea3A",
    deliverables: [
      "Post-Tensioned Slabs for 12m+ Column-Free Clear Spans",
      "Structural Fire NOC Clearances & Dual Emergency Staircases",
      "Acoustic Saint-Gobain Curtain Glazing Systems",
      "High-Tension Transformer Yard & DG Backup Enclosures",
      "Automated Stilt / Basement Parking Systems",
      "BBMP Commercial Occupancy Certificate (OC) Clearance",
    ],
    stages: [
      { step: "01", title: "Commercial FAR & Zonal Study", desc: "Road width review, commercial set-backs, and traffic impact assessment." },
      { step: "02", title: "PT Structural Modeling", desc: "Etabs & StaadPro finite element analysis for heavy floor live loads." },
      { step: "03", title: "Excavation & Shoring", desc: "Soldier pile retention walls and foundation raft casting." },
      { step: "04", title: "Fast-Track Slabs & Envelope", desc: "Automated hydraulic boom concrete pumping and structural glazing." },
      { step: "05", title: "MEP & Fire Testing", desc: "Sprinkler hydrostatic tests, lift inspections, and OC certification." },
    ],
    faqs: [
      {
        q: "What is the typical timeline for a 15,000 sq.ft commercial building?",
        a: "Typically 12 to 14 months, depending on basement depth and municipal clearance approvals.",
      },
    ],
  },
  {
    id: "svc-premium-interiors",
    slug: "premium-interior-design",
    title: "Premium Interior Design",
    shortDescription: "German-hinged modular kitchens, Italian marble polishing, customized solid Burma teak doors, and smart architectural ambient lighting.",
    fullDescription: "Our in-house SK Interiors wing bridges structural architecture with tactile bespoke luxury. We eliminate modular middlemen by sourcing IS:710 Marine Grade BWP Plywood straight from manufacturers, marrying it with German Hafele/Blum hardware and authentic Italian marble crafted in precision workshop conditions.",
    icon: "countertops",
    priceModel: "Turnkey Package / Flat Rate",
    startingPrice: "Starts ₹50 Lakhs / Full Home",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTU5ItGrb723PyuxgnZieIFvwR8xZ7Bdb1n7cPrQu9qxRruBfKVX0Pf8Wws3FATYHxL0sX8Gy7Ecg3u0_e5NIdtFbOiVOuEl_fL4jxmH8JYzQfe6Rk2y_ocyRtqrVJJ2LTic4cRkhwtzI_JK5FHsS_egh50cgy6idvnb5HKzEYAYmHGyh_KJsPUVeeR3qjuRz_bQ_VOcBL7buzZDKmMYvJOWPlnfJCUM4jB8JS3t0Hw2S7hshO722f4Q",
    deliverables: [
      "German-Hinged Factory-Finished Modular Kitchens",
      "Master Walk-in Closets with Sensor Lighting",
      "Statuario / Botticino Italian Marble Polishing",
      "Concealed Magnetic Track Lights & False Ceilings",
      "Solid Burma Teak Wall Paneling & Partitions",
      "45-Day Guaranteed Handover from Bare Shell",
    ],
    stages: [
      { step: "01", title: "3D Moodboard & Material Sampling", desc: "Touch-and-feel physical samples at our MG Road experience studio." },
      { step: "02", title: "Precision Laser Site Measurement", desc: "Millimeter-level 3D scanning of completed civil shells." },
      { step: "03", title: "Factory CNC Cutting & Edge-Banding", desc: "Automated German machinery cuts to prevent site sawdust." },
      { step: "04", title: "Dry Fit & On-site Assembly", desc: "Silent installation within 45 days with zero mess." },
    ],
    faqs: [
      {
        q: "What plywood grade do you use?",
        a: "We strictly use IS:710 Boiling Water Proof (BWP) Marine Grade plywood with 100% calibrated core.",
      },
    ],
  },
  {
    id: "svc-renovation",
    slug: "structural-renovation",
    title: "Structural Renovation & Extension",
    shortDescription: "Vertical structural additions for G+1 to G+3, column jacketing, foundation load enhancements, and modern contemporary facade updates.",
    fullDescription: "Transform aging Bangalore residences into high-yield, modern contemporary homes. We specialize in non-destructive structural audits, ultrasonic concrete testing, column reinforcement jacketing, and vertical expansion to add additional rental or duplex floors without compromising the foundation.",
    icon: "upgrade",
    priceModel: "Engineered Retrofit",
    startingPrice: "Starts ₹1,400/sq.ft",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4UorjuH4T29fuawDhqbnldNBfmPOy1pIDNVH4fjSgaJcJbIm-WqnihqAQatBsXzQLfARsHjSoo3R4oO5E4mLwfp02ALUYSoULGUKRKjGRWjhXZtISOUNKN3-kVE58Dsd9f9RIrVh_ZN7gZmmXbK_tYWKtInzt7hDDKAyZop1S1Rf3Th2Y7Fzcss4EJLWchJj4f0a49fQRH4qeWHP6lmzDFdg1DyD9Tt_9miBgWJYCiWLxIYMBmcQ-6A",
    deliverables: [
      "Non-Destructive Core & Rebar Scan Testing",
      "Steel & Micro-Concrete Column Jacketing",
      "Lightweight Structural Steel Roof Extensions",
      "Exterior Facade Modernization (Teak Louvers / Glass)",
      "Re-plumbing & Upgraded Electrical Distribution Boards",
    ],
    stages: [
      { step: "01", title: "Structural Health Audit", desc: "Schmidt hammer tests and load-bearing calculations." },
      { step: "02", title: "Retrofit Engineering Design", desc: "Anchorage plan with Hilti chemical rebar bonding." },
      { step: "03", title: "Excavation & Footing Extension", desc: "Widening footings where vertical loads increase." },
      { step: "04", title: "Extension Casting & Finishes", desc: "Adding new levels with modern facade wrap." },
    ],
    faqs: [
      {
        q: "Can I add a floor to my existing 20-year-old house?",
        a: "Yes, once we verify the column and footing capacities through our structural audit. If needed, we reinforce via column jacketing.",
      },
    ],
  },
  {
    id: "svc-industrial-peb",
    slug: "industrial-peb-sheds",
    title: "Industrial & PEB Steel Sheds",
    shortDescription: "Pre-Engineered Building (PEB) design, large-span logistic warehouses, manufacturing plants, and heavy overhead crane beam installations.",
    fullDescription: "Fast-track industrial civil engineering in KIADB parks, Bommasandra, Hoskote, and Devanahalli. We engineer large-span PEB structures using 345 MPa high-tensile steel, laser-screeded FM2 high-tolerance industrial flooring, and zero-leakage standing seam roofing with 20-year corrosion warranties.",
    icon: "warehouse",
    priceModel: "Turnkey PEB Contract",
    startingPrice: "Starts ₹1,150/sq.ft",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW2UIySaUBHLwtpjXgSNPBobb_wKXIgfpSZJ8vrVZTNodRK2a6XnSTRuIiPzpBIdhBQ-BTRxH400ttQZWfP7xfsFL4wl1tsA2ESwpbCUZG6V2HAgsIEeLySxLnjo8VoOyl9QCek3g-_3m9-SjI12iTR14Aj7mv5c2rK4vgcgg1dCzPnuMH9CmBT3WSCHOdKRWpJMa04myA4OB5qF5Xl7JHGXL611ojxcYtKc_SsFB807MXyXlJORz6gQ",
    deliverables: [
      "Clear-Span Steel Structures up to 40 Meters",
      "Laser-Screeded Industrial FM2 Heavy Load Floors",
      "Overhead EOT Crane Gantry Beam Engineering",
      "Automated Hydraulic Loading Docks & Shutters",
      "KIADB / Pollution Control Board (KSPCB) Liaison",
    ],
    stages: [
      { step: "01", title: "Industrial Topo & Wind Load Analysis", desc: "IS 875 wind velocity modeling for Bangalore terrain." },
      { step: "02", title: "Off-site CNC Fabrication", desc: "Automated cutting, shot-blasting, and epoxy primer coating." },
      { step: "03", title: "Foundation & Plinth Casting", desc: "Heavy pedestal anchors and holding-down bolts." },
      { step: "04", title: "Crane Erection & Sheeting", desc: "Fast-track erection within 60 to 90 days." },
    ],
    faqs: [
      {
        q: "What is the erection time for a 20,000 sq.ft shed?",
        a: "Civil foundations take 45 days, while steel erection and sheeting take approximately 45 days, completing within 90 days total.",
      },
    ],
  },
  {
    id: "svc-architectural-vastu",
    slug: "architectural-vastu",
    title: "Architectural & Vastu Advisory",
    shortDescription: "Authentic traditional Vastu alignment paired with clean Scandinavian aesthetics, hyper-realistic 3D elevations, and full MEP blueprint packages.",
    fullDescription: "We blend the timeless scientific wisdom of Vastu Shastra (solar orientation, geomagnetic alignment, thermal flow) with cutting-edge contemporary Scandinavian and tropical modernist architecture. Our chartered civil architects deliver sanctioned drawing packages that pass BBMP scrutiny on the first attempt.",
    icon: "architecture",
    priceModel: "Consultation / Blueprint Package",
    startingPrice: "Starts ₹45/sq.ft",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr6mCWN9PR4wPMMF5b7deHH80kcWHixSlGeK0qnQqqpyQ_hMuUK6T1YYICOXJQ1rfKceKu_QLGqawL2YSIrM-cGu8zeCZAmDu5J2DdYe-rCvhnKyOH-_JAnWysGMWzCr2BJd7dBzF25HIKkZrnKBK_41uniwzqo4uAkK__pHw9pggngd4KfAWBNqU3VD2fSzo1cyjD76ZN021W8X5PsFHeVxTNZ7EMqv_AdV8KN6tF5Y2DX6brT2Lh9Q",
    deliverables: [
      "100% Vastu Orientation (Agneya, Ishanya, Nairutya alignments)",
      "BBMP Municipal Building Sanction Architectural Package",
      "Hyper-realistic 4K 3D Elevations & Virtual Reality Tour",
      "Complete Structural Steel Schedules (IS 456 Stamped)",
      "MEP Conduit Routing & Plumbing Schematic Sheets",
    ],
    stages: [
      { step: "01", title: "Plot Vastu & Energy Grid Mapping", desc: "Compass orientation check and Brahmasthan demarcation." },
      { step: "02", title: "Concept 2D Floor Zoning", desc: "Zoning rooms according to sunlight, wind, and Vastu principles." },
      { step: "03", title: "3D BIM Visualization", desc: "Rendering realistic materials, sun-shadow studies, and facade detailing." },
      { step: "04", title: "Working CAD Drawing Release", desc: "Delivering complete 80-sheet construction blueprint set." },
    ],
    faqs: [
      {
        q: "Can you remedy a South or West facing plot for Vastu?",
        a: "Yes. By carefully positioning the internal Brahmasthan, locating the master bedroom in the South-West, and placing the entry in the approved Vastu pada, South and West plots can be highly auspicious.",
      },
    ],
  },
];
