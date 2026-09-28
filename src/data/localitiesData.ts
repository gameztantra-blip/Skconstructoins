/**
 * Locality-Specific Construction Intelligence for Bangalore Micro-Markets
 * Powers the dynamic `/house-construction-in/:locality` landing pages
 */

export interface LocalityItem {
  slug: string;
  name: string;
  zone: string;
  bbmpZone: string;
  averageRatePerSqFt: string;
  typicalTimeline: string;
  soilType: string;
  safeBearingCapacity: string;
  waterTableDepth: string;
  bylawFAR: string;
  setbackRule: string;
  overview: string;
  keyChallenges: string[];
  engineeringSolutions: string[];
  nearbyLandmarks: string[];
  deliveredProjectsCount: number;
}

export const LOCALITIES_DATA: LocalityItem[] = [
  {
    slug: "indiranagar",
    name: "Indiranagar & Domlur",
    zone: "Central / East Corridor",
    bbmpZone: "East Zone (BDA & BBMP)",
    averageRatePerSqFt: "₹2,250 – ₹2,850",
    typicalTimeline: "9 to 11 Months",
    soilType: "Hard Red Loam with Granite Substratum",
    safeBearingCapacity: "180 – 220 kN/m²",
    waterTableDepth: "20 to 25 Feet",
    bylawFAR: "1.75 to 2.25 (Based on road width)",
    setbackRule: "1.0m to 1.5m minimum side setbacks mandatory",
    overview: "Indiranagar is one of Bangalore's most prime residential corridors with high-value plots (30x40, 40x60, and 50x80). Construction demands strict dust containment, noise suppression for premium neighbors, and architectural expertise in maximizing natural light in compact urban spaces.",
    keyChallenges: [
      "Narrow access lanes on cross roads requiring small batch concrete transit mixers",
      "High density surrounding structures requiring vibration-controlled foundation excavation",
      "Strict BESCOM tree-trimming and underground cable clearance protocols",
    ],
    engineeringSolutions: [
      "Automated concrete boom pumps deployed during approved morning transit hours",
      "Centralized double-height light shafts and rain-courts to overcome side setback shadow",
      "Acoustic Fenesta double glazing to isolate high traffic decibel levels from 100ft road",
    ],
    nearbyLandmarks: ["100ft Road", "Defence Colony", "HAL 2nd Stage", "CMH Road", "Domlur Club"],
    deliveredProjectsCount: 14,
  },
  {
    slug: "whitefield",
    name: "Whitefield & ITPL Corridor",
    zone: "East Tech Belt",
    bbmpZone: "Mahadevapura Zone",
    averageRatePerSqFt: "₹2,100 – ₹2,600",
    typicalTimeline: "8 to 10 Months",
    soilType: "Clay Loam with Pockets of Black Soil",
    safeBearingCapacity: "140 – 175 kN/m²",
    waterTableDepth: "30 to 45 Feet",
    bylawFAR: "1.75 to 2.50",
    setbackRule: "Standard BBMP setback tables apply",
    overview: "Whitefield is home to senior tech leaders and NRI property owners seeking high-specification contemporary villas, duplexes, and commercial workspaces near tech parks. Wide roads make material logistics smoother, but soil variability demands rigorous core testing.",
    keyChallenges: [
      "Soil bearing capacity varies near older lake beds and tech park fringes",
      "Hard water scaling requiring integrated water treatment systems",
      "High demand for remote NRI project tracking across US/UK time zones",
    ],
    engineeringSolutions: [
      "Deep borehole soil tests with raft foundation or under-reamed piles where needed",
      "Centralized dual-tank water softening and pressure booster pumps pre-engineered into plinth",
      "24/7 4K live CCTV site broadcast + weekly drone time-lapse videos for remote owners",
    ],
    nearbyLandmarks: ["ITPL", "EPIP Zone", "Hope Farm Junction", "Varthur Lake Road", "ECC Road"],
    deliveredProjectsCount: 18,
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout & Bellandur",
    zone: "South-East Start-up Hub",
    bbmpZone: "Bommanahalli Zone",
    averageRatePerSqFt: "₹2,200 – ₹2,700",
    typicalTimeline: "9 to 11 Months",
    soilType: "Red Gravelly Sand over Silty Clay",
    safeBearingCapacity: "160 – 195 kN/m²",
    waterTableDepth: "18 to 24 Feet",
    bylawFAR: "1.75 to 2.25",
    setbackRule: "Standard BDA layout norms strictly audited by BBMP",
    overview: "HSR Layout boasts wide planned BDA sectors (Sectors 1 to 7) with consistent rectangular plot cuts. It has become Bangalore's premier enclave for founders and tech families desiring contemporary duplex and triplex living with rooftop solar arrays.",
    keyChallenges: [
      "Monsoon groundwater seepage in Sectors 1 and 2 near Bellandur lake drainage",
      "Strict BBMP building license checks and BDA layout khata compliance",
      "Fast-rising plot values demanding zero space wastage in staircases and stilt car bays",
    ],
    engineeringSolutions: [
      "Subterranean waterproofing using 2-coat polymer elastomer screed on basement sumps",
      "Post-tensioned cantilever deck engineering to eliminate bulky ground columns",
      "Integrated 5kW rooftop solar pergola that doubles as a weatherproof terrace deck",
    ],
    nearbyLandmarks: ["27th Main Food Street", "Agara Lake", "HSR BDA Complex", "Salarpuria Greenage"],
    deliveredProjectsCount: 16,
  },
  {
    slug: "sarjapur-road",
    name: "Sarjapur Road & Carmelaram",
    zone: "South-East Growth Belt",
    bbmpZone: "Mahadevapura & Anekal Borders",
    averageRatePerSqFt: "₹1,950 – ₹2,450",
    typicalTimeline: "8 to 10 Months",
    soilType: "Fertile Agricultural Loam with Clay Strata",
    safeBearingCapacity: "135 – 170 kN/m²",
    waterTableDepth: "25 to 35 Feet",
    bylawFAR: "1.75 to 2.0",
    setbackRule: "Gram Panchayat & BMRDA/BBMP dual regulations",
    overview: "Sarjapur Road features spacious gated community plots, independent villa land, and eco-friendly home builds. Homeowners prioritize sustainable living, rainwater harvesting, geothermal cooling, and lush biophilic gardens.",
    keyChallenges: [
      "Clay strata requiring plinth stabilization against shrinkage cracks during summer",
      "Sanction liaison navigating BMRDA, Anekal Planning Authority, and BBMP transition",
    ],
    engineeringSolutions: [
      "Continuous plinth tie-beam reinforced with Tata Tiscon 550D rebar grid",
      "Pre-engineered rainwater harvesting pits (15,000L) with natural gravel filtration",
    ],
    nearbyLandmarks: ["Wipro Corporate Campus", "RGA Tech Park", "Carmelaram Station", "Decathlon Sarjapur"],
    deliveredProjectsCount: 12,
  },
  {
    slug: "hebbal",
    name: "Hebbal & North Bangalore",
    zone: "North Bangalore Airport Corridor",
    bbmpZone: "Yelahanka & North BBMP",
    averageRatePerSqFt: "₹2,150 – ₹2,650",
    typicalTimeline: "9 to 11 Months",
    soilType: "Hard Gravelly Loam & Compact Sandy Clay",
    safeBearingCapacity: "190 – 240 kN/m²",
    waterTableDepth: "30 to 40 Feet",
    bylawFAR: "2.0 to 2.5 (Wider road allowances)",
    setbackRule: "Standard North BBMP bylaws",
    overview: "Connecting directly to Kempegowda International Airport and Manyata Tech Park, North Bangalore is witnessing rapid construction of high-rise commercial structures and luxury modern villas.",
    keyChallenges: [
      "Heavy commercial vehicle traffic on Ballari Road necessitating synchronized logistics",
      "Aircraft height clearance limits (AAI NOC) for structures above G+4",
    ],
    engineeringSolutions: [
      "High-strength M30 Ready-Mix concrete to speed up cycle time to 14 days per slab",
      "Fast-track AA approval liaison handled entirely by our in-house compliance wing",
    ],
    nearbyLandmarks: ["Manyata Tech Park", "Hebbal Flyover", "Aster CMI Hospital", "Jakkur Aerodrome"],
    deliveredProjectsCount: 15,
  },
  {
    slug: "koramangala",
    name: "Koramangala 1st-8th Block",
    zone: "South Bangalore Prime",
    bbmpZone: "South Zone",
    averageRatePerSqFt: "₹2,350 – ₹3,000",
    typicalTimeline: "10 to 12 Months",
    soilType: "Red Clay Loam with Granitic Gneiss",
    safeBearingCapacity: "175 – 210 kN/m²",
    waterTableDepth: "16 to 22 Feet",
    bylawFAR: "1.75 to 2.25",
    setbackRule: "Strict residential zoning setbacks",
    overview: "Koramangala represents ultra-luxury independent residential living. High land values warrant high-precision architecture, Italian marble flooring, and smart automation.",
    keyChallenges: [
      "Extremely quiet neighborhood regulations with strict 9 AM to 6 PM work hour enforcement",
      "High preservation standards for heritage avenue trees along plot boundaries",
    ],
    engineeringSolutions: [
      "Off-site fabrication of formwork and steel cages to minimize on-site sound",
      "Specialized root-barrier foundations to prevent tree root damage to basement walls",
    ],
    nearbyLandmarks: ["Koramangala Club", "Forum Mall", "Sony World Signal", "Bethany High School"],
    deliveredProjectsCount: 11,
  },
  {
    slug: "jp-nagar",
    name: "JP Nagar & Jayanagar",
    zone: "South Bangalore Heritage",
    bbmpZone: "South Zone (BBMP)",
    averageRatePerSqFt: "₹2,150 – ₹2,650",
    typicalTimeline: "9 to 11 Months",
    soilType: "Stable Red Sandy Loam",
    safeBearingCapacity: "185 – 225 kN/m²",
    waterTableDepth: "20 to 28 Feet",
    bylawFAR: "1.75 to 2.20",
    setbackRule: "Standard BBMP bye-law sets",
    overview: "Classic South Bangalore living combining multi-generational family requirements with traditional Vastu shastra, central pooja courtyards, and stilt car bays.",
    keyChallenges: [
      "Redevelopment of older 30-year-old single-story homes into modern G+3 duplexes",
      "Safe demolition of existing structures without disturbing shared boundary walls",
    ],
    engineeringSolutions: [
      "Precision diamond-core wall cutting and acoustic hydraulic demolition",
      "Structural underwriting guaranteeing zero cracks to adjoining neighborhood walls",
    ],
    nearbyLandmarks: ["Ranga Shankara", "Jayanagar 4th Block Complex", "Sarakki Lake", "Mini Forest"],
    deliveredProjectsCount: 13,
  },
  {
    slug: "electronic-city",
    name: "Electronic City Phases 1 & 2",
    zone: "South Tech Corridor",
    bbmpZone: "ELCITA & Bommasandra",
    averageRatePerSqFt: "₹1,850 – ₹2,350",
    typicalTimeline: "8 to 10 Months",
    soilType: "Hard Red Soil with Weathered Rock",
    safeBearingCapacity: "180 – 230 kN/m²",
    waterTableDepth: "35 to 50 Feet",
    bylawFAR: "1.75 to 2.25",
    setbackRule: "ELCITA industrial & residential bylaws",
    overview: "Popular choice for IT professionals building first homes and high-rental-yield multi-family apartments near Infosys and Wipro campuses.",
    keyChallenges: [
      "High summer heat requiring superior roof insulation and solar heat reflection",
      "Maximizing rental units within BBMP / ELCITA residential building heights",
    ],
    engineeringSolutions: [
      "Reflective ceramic cooling tiles on terrace deck reducing top-floor heat by 5°C",
      "Optimized 2BHK/1BHK modular layout designs for high rental return",
    ],
    nearbyLandmarks: ["Infosys Campus", "Wipro Gate 5", "Velankani Tech Park", "Elevated Expressway"],
    deliveredProjectsCount: 19,
  },
];
