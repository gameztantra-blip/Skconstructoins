/**
 * Construction Packages & Specifications Data
 * Formatted for Indian construction standards (TMT Steel, 53-grade cement, vitrified tiles, sanitary)
 */

export interface ConstructionPackage {
  id: string;
  name: string;
  badge?: string;
  ratePerSqFt: number;
  highlight: string;
  description: string;
  popular?: boolean;
  specs: {
    category: string;
    items: string[];
  }[];
  warranty: string;
  inclusions: string[];
}

export const PACKAGES_DATA: ConstructionPackage[] = [
  {
    id: "standard",
    name: "Standard Package",
    badge: "Essential Quality",
    ratePerSqFt: 1850,
    highlight: "Essential Quality for Investment & Rental Homes",
    description: "Ideal for budget-conscious independent homes and rental G+2 investment units across Bangalore.",
    popular: false,
    warranty: "10-Year Structural Warranty + 1-Year General Warranty",
    specs: [
      {
        category: "Structural Core",
        items: [
          "Steel: Tata Tiscon / JSW Fe-500D TMT bars",
          "Cement: UltraTech / ACC 43 & 53 Grade",
          "RMC/Mix: M20 Grade design concrete mix",
          "Walls: 6\" & 4\" Solid Concrete Blocks (APCO/equivalent)",
        ],
      },
      {
        category: "Finishing & Tiling",
        items: [
          "Living & Bedrooms: 2ft × 2ft Double Charged Vitrified Tiles (₹65/sq.ft)",
          "Kitchen: 20mm Polished Black Granite with SS Sink",
          "Staircase: Sadarahalli grey granite steps",
          "Wall Finishes: Asian Paints Tractor Emulsion (2 coats + putty)",
        ],
      },
      {
        category: "Plumbing & Electrical",
        items: [
          "CP & Sanitary: Cera / Hindware with 10-Yr warranty",
          "Plumbing: Ashirvad / Astral CPVC & PVC pipes",
          "Electrical Wiring: Finolex / Anchor fire-retardant copper wires",
          "Switches: Anchor Roma modular switches",
        ],
      },
      {
        category: "Doors & Windows",
        items: [
          "Main Door: Neem / Honne wood frame with flush teak veneer door",
          "Internal Doors: Sal wood frames with waterproof panel doors",
          "Windows: 2-track aluminium sliding windows with mosquito mesh",
        ],
      },
    ],
    inclusions: [
      "Architectural working drawings",
      "Structural engineering design & vetting",
      "Soil testing & bearing capacity report",
      "Underground RCC sump (6,000 Litres)",
      "Overhead Sintex water tank (1,500 Litres)",
    ],
  },
  {
    id: "premium",
    name: "Premium Package",
    badge: "Most Popular in Bangalore",
    ratePerSqFt: 2250,
    highlight: "Bangalore Homeowner Standard for Luxury Living",
    description: "Engineered for luxury family residences, self-use villas, and contemporary duplexes with zero compromise.",
    popular: true,
    warranty: "10-Year Structural Warranty + 5-Year Waterproofing Guarantee",
    specs: [
      {
        category: "Structural Core",
        items: [
          "Steel: Tata Tiscon 550D Super Ductile exclusively",
          "Cement: UltraTech Super / Weather Pro waterproofing mix",
          "RMC/Mix: M25 Grade design concrete with micro-silica",
          "Walls: Premium Wire-Cut Red Bricks or 6\" solid concrete blocks",
        ],
      },
      {
        category: "Finishing & Tiling",
        items: [
          "Living & Dining: 4ft × 2ft GVT Glazed Vitrified Tiles (Kajaria/Nitco, ₹110/sq.ft)",
          "Master Suite: Wooden laminate or designer vitrified plank flooring",
          "Kitchen: 40mm Quartz or Jet Black Granite counter with Franke sink",
          "Paint: Asian Paints Royale Luxury interior & Apex Ultima exterior",
          "Ceilings: Saint-Gobain Gyproc false ceiling in living & dining",
        ],
      },
      {
        category: "Plumbing & Electrical",
        items: [
          "CP & Sanitary: Kohler / Grohe concealed wall-hung commodes",
          "Diverters: Jaquar Florentine / Kohler thermostatic showers",
          "Wiring: Havells / Polycab FR-LSH low-smoke copper cables",
          "Switches: Schneider Electric AvatarOn modular switches",
        ],
      },
      {
        category: "Doors & Windows",
        items: [
          "Main Door: 8ft Solid Teakwood frame & carved shutter with Yale biometric digital lock",
          "Internal Doors: Teakwood frames with veneer flush doors",
          "Windows: Fenesta / Prominance 3-track acoustic UPVC soundproof windows with Saint-Gobain glass",
        ],
      },
    ],
    inclusions: [
      "BBMP / BDA Municipal Plan Sanction liaison assistance",
      "100% Vastu-Compliant 2D & 3D elevations",
      "Underground monolithic waterproof sump (10,000 Litres)",
      "Solar water heater plumbing integration",
      "Rainwater harvesting percolation pit",
      "Daily HD site progress via dedicated WhatsApp group",
    ],
  },
  {
    id: "luxury",
    name: "Luxury Royale",
    badge: "Ultra-Prime Bespoke",
    ratePerSqFt: 2750,
    highlight: "Uncompromising Custom Architecture & Italian Finishes",
    description: "Architect-led bespoke luxury estates, imported finishes, hydraulic lift readiness, and smart home automation.",
    popular: false,
    warranty: "15-Year Structural Bond + 10-Year Waterproofer Warranty",
    specs: [
      {
        category: "Structural Core",
        items: [
          "Steel: Fe-550D + Composite steel beams + Post-tensioned column-free spans",
          "Cement: UltraTech Weather Pro & epoxy reinforced concrete",
          "RMC/Mix: M30 Grade high-strength mix with slump retention",
          "Foundation: Raft foundation with multi-barrier subterranean waterproofing",
        ],
      },
      {
        category: "Finishing & Tiling",
        items: [
          "Flooring: Imported Italian Marble (Dyna / Botticino / Statuario, ₹380/sq.ft)",
          "Bathrooms: Full-height imported porcelain slabs with glass shower cubicles",
          "Kitchen: German Hafele / Blum soft-close fittings with Caesarstone countertop",
          "Paint: Asian Paints Royale Aspira Zero-VOC with PU polish on wood",
          "Ceilings: Complete architectural false ceiling with recessed magnetic track lighting",
        ],
      },
      {
        category: "Plumbing & Electrical",
        items: [
          "Sanitary: Toto Japanese Washlets & Grohe thermostatic rain showers",
          "Automation: Full KNX touch automation for lighting, HVAC, and curtains",
          "Piping: Astral Silencio acoustic noise-cancelling drainage runs",
          "Water Management: Grundfos pressure booster pump + centralized RO plant",
        ],
      },
      {
        category: "Doors & Windows",
        items: [
          "Main Door: 9ft Burma Teak pivot door with biometric facial recognition",
          "Windows: Schüco Aluminium / Fenesta double-glazed hermetic acoustic glazing (6mm + 12mm Argon + 6mm)",
          "Balconies: Frameless 12mm toughened laminated glass railings",
        ],
      },
    ],
    inclusions: [
      "End-to-end BBMP Occupancy Certificate & utility clearance",
      "VR / 3D BIM walkthrough & sun-path analysis",
      "Hydraulic residential lift shaft construction",
      "Landscaped terrace garden with automated drip irrigation & solar pergola",
      "Central heat pump & VRV AC copper pipe pre-installation",
    ],
  },
];
