/**
 * Portfolio of Executed & Ongoing Landmark Construction Projects in Bangalore
 * Rich technical metrics, images, timelines, RERA & IGBC compliance data
 */

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  type: "residential" | "commercial" | "industrial" | "interior";
  typeLabel: string;
  status: "completed" | "ongoing";
  statusLabel: string;
  locality: string;
  localitySlug: string;
  address: string;
  investmentAmount: number; // in INR
  investmentDisplay: string;
  builtUpAreaSqFt: number;
  plotSize: string;
  timelineMonths: number;
  completionDate: string;
  completionYear: number;
  heroImage: string;
  galleryImages: { url: string; caption: string; alt: string }[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  highlights: string[];
  materialsAudited: string[];
  constructionLogs?: {
    date: string;
    stage: string;
    description: string;
    qualityMetric: string;
    materialBatch: string;
    status: string;
  }[];
  floorPlanDetails?: {
    groundFloor: { area: string; rooms: { name: string; size: string }[] };
    firstFloor: { area: string; rooms: { name: string; size: string }[] };
    secondFloor?: { area: string; rooms: { name: string; size: string }[] };
  };
  clientTestimonial?: {
    quote: string;
    clientName: string;
    designation: string;
    avatarInitials: string;
    rating: number;
  };
  featured?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "SK-2401",
    slug: "the-terraced-villa",
    title: "The Terraced Villa",
    tagline: "Cantilevered Luxury Urban Sanctuary with Skylit Rain-Court",
    type: "residential",
    typeLabel: "Residential Villa (G+2 Duplex)",
    status: "completed",
    statusLabel: "Handed Over • 2024",
    locality: "Indiranagar",
    localitySlug: "indiranagar",
    address: "100ft Road, 12th Main, Indiranagar, Bengaluru 560038",
    investmentAmount: 18500000,
    investmentDisplay: "₹1.85 Cr",
    builtUpAreaSqFt: 4200,
    plotSize: "40 × 60 ft",
    timelineMonths: 9.5,
    completionDate: "November 2024",
    completionYear: 2024,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuASMGQ3cL-L3AETXa62bDuOuAerMlnREXSrI1Yaqi-8ZOOp_s9IMpX4N2nqW4uQ_FbeE97RGvGvyCpJYoBO_UGlmGui8sTGUUoUB9RL_ftYQ2GjQVfkUOXiMj4CFYtLqDlKWjtqzfM1pCm4mfwmCCjmUY7DWbYkFETnawaDpUrHpYK_5VDKfagXcb8ajkhcq4qg2exXJ7pQKAu2QeUOymD0D_K7X6BZFbqp_LWcKY3tPCUcLWwFL1ey_g",
    galleryImages: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVU2f1I7jCC3pb7G_XVvcAlOc0bZu949psyZHNvRtO25fhyvQnZYlU0c147P_poOdytPFwL1H6JShjP6yKSMmGzWSUHpqPPHSl8Iv3Ek8TZv_vhiyVIOyvd_HdIQTkjd7DaRePhQl4bAfdVXO_623FHWdFDco-YSXMXCrqtDKDqoRsSU1tW3aDRwswl_aDqKEo0hriXKtgdIKTlVqIAoAnrl5ECBSsR87U-dnCPOZyTIEG5B6udPwnqQ",
        caption: "Twilight Elevation with Teak Louvers",
        alt: "The Terraced Villa in Indiranagar Bengaluru at sunset with dark charcoal facades, teak louvers and warm linear LED lighting"
      },
      {
        url: "https://lh3.googleusercontent.com/aida/AEtjO1XGHKQz5TfRRM_QfyvBK13P59yamWGMEraB8SCYtquL5ovpoyPP-EwfKqELn69GW61dk37jqEV0piWN7byOjurOCZ-Ol4n3Z3CZnu2F87UoaSpmL9rB4HnEt5Ea-UFJQOrKmei3oTh8T_7A4AgJKn5UmzrO5fHEvcgGKkFyKUblyDlVsKWSFKKILOvbhpSqoHlm8XnyLwn9gKp8mhSN7UPc7bLd8dy13uEX5bLkGDiukci6rkMlK5c13FmH",
        caption: "Private Courtyard & Pool Deck",
        alt: "Courtyard pool deck of luxury Indiranagar villa with lush tropical landscaping and glass walls"
      },
      {
        url: "https://lh3.googleusercontent.com/aida/AEtjO1VAk4z07o47_X4pQzNl7yE6yLzP2q44BvG3QJ5jI7lK10j9p4yX2nQG0y2t00b6d2kQcM1b1tN0lQ7pP5kR8fM6z7rY8wQcE1v1b0fGz6cQ4sL2",
        caption: "Double-Height Living & Italian Marble",
        alt: "Double height living room with Italian Botticino marble flooring and teak panelling"
      }
    ],
    description: "Designed as a sanctuary amidst Indiranagar’s bustling urban fabric. Engineered with seismic-resistant shear walls, cantilevered teak shading fins, double-glazed soundproof envelope, and a central landscaped rain-court that brings natural light into all three levels.",
    challenge: "Tight urban footprint with adjacent G+3 concrete buildings obstructing sunlight on East and South boundaries. Client required 100% Vastu compliance, a 4-passenger hydraulic elevator, and a strict 10-month delivery prior to the monsoon season.",
    solution: "Engineered a central 22-foot double-height skylight with motorized solar-tracking louvers. Used cantilevered post-tensioned RCC beams eliminating internal columns, yielding an unobstructed 28-foot living span. Integrated a monolithic 12,000L rainwater retention sump directly into the raft foundation.",
    result: "Delivered 18 days ahead of schedule with zero price escalations. Passed all 400 quality audit checks with zero defects. Attained IGBC Gold Green Home certification for optimal cross-ventilation and thermal mass insulation.",
    highlights: [
      "Tata Tiscon 550D TMT Rebars exclusively",
      "Fenesta Double Glazed Acoustic UPVC",
      "Dyna Italian Marble in Living & Dining",
      "100% Vastu Compliant Orientation",
      "15-Year Structural Integrity Warranty",
      "Hydraulic Schindler Elevator Installed"
    ],
    materialsAudited: [
      "UltraTech 53 Grade Ordinary Portland Cement",
      "Tata Tiscon Fe-550D Super Ductile Rebars",
      "Fenesta 3-Track Acoustic DGU Glass (6+12A+6)",
      "Astral Silencio Acoustic Drainage Pipes",
      "Schneider Electric AvatarOn Smart Switches",
      "Asian Paints Royale Aspira Zero-VOC"
    ],
    constructionLogs: [
      {
        date: "Feb 12, 2024",
        stage: "Soil Test & Raft Excavation",
        description: "Core borehole samples confirmed Safe Bearing Capacity (SBC) of 180 kN/m² at 8.5ft depth.",
        qualityMetric: "Standard Penetration Test (N-value: 24). Water table at 22ft.",
        materialBatch: "PCC 1:4:8 base layer over 300mm quarry granite boulders.",
        status: "Lab Verified"
      },
      {
        date: "Mar 28, 2024",
        stage: "Plinth Beam & Anti-Termite",
        description: "Continuous tie-beam lattice anchored with Chlorpyrifos soil injection barrier.",
        qualityMetric: "Rebar cover clearance 40mm. 7-day cube test: 19.8 MPa.",
        materialBatch: "UltraTech 53 Grade OPC + Tata Tiscon 550D TMT.",
        status: "Lab Verified"
      },
      {
        date: "May 15, 2024",
        stage: "RCC Frame & Slabs Casting",
        description: "3 suspended slab casts completed with automated vibratory needles and 21-day continuous ponding.",
        qualityMetric: "28-day compressive cube strength: 31.4 N/mm² (Target: 25.0).",
        materialBatch: "M-25 Ready-Mix computer-batched concrete.",
        status: "Structural Cleared"
      },
      {
        date: "Jul 10, 2024",
        stage: "Masonry & Concealed Conduiting",
        description: "Wire-cut table moulded red bricks laid in 1:6 mortar with mesh rebar at lintels.",
        qualityMetric: "Plumbing pressure test passed at 10 bar without drop.",
        materialBatch: "Finolex FR-LSH conduits + Astral CPVC pipes.",
        status: "Pressure Tested"
      },
      {
        date: "Aug 22, 2024",
        stage: "Dual Waterproofing & Plastering",
        description: "Terrace and sunken slabs treated with 72-hour continuous water ponding test.",
        qualityMetric: "Zero moisture penetration on thermal scan.",
        materialBatch: "Dr. Fixit 2K Polymer coating + 12mm fiber screed.",
        status: "Zero Leakage Pass"
      },
      {
        date: "Nov 24, 2024",
        stage: "Griha Pravesh Handover",
        description: "Sanitization, smart home calibration, BESCOM solar net-metering synchronization, and formal key handover.",
        qualityMetric: "All BBMP occupancy certificates & master CAD handed over.",
        materialBatch: "15-Year Structural Bond issued.",
        status: "Handed Over"
      }
    ],
    floorPlanDetails: {
      groundFloor: {
        area: "920 sq.ft",
        rooms: [
          { name: "Car Parking & Ramp", size: "16'0\" × 14'0\"" },
          { name: "Entry Foyer & Sit-out", size: "6'0\" × 8'6\"" },
          { name: "Guest Bedroom", size: "12'0\" × 11'6\"" },
          { name: "Ensuite Bathroom", size: "7'0\" × 5'0\"" }
        ]
      },
      firstFloor: {
        area: "1,080 sq.ft",
        rooms: [
          { name: "Double Height Living", size: "16'0\" × 14'0\"" },
          { name: "Dining Space", size: "10'0\" × 11'6\"" },
          { name: "Modular Open Kitchen", size: "10'0\" × 10'0\"" },
          { name: "North-East Pooja Mandir", size: "5'0\" × 6'0\"" }
        ]
      },
      secondFloor: {
        area: "950 sq.ft",
        rooms: [
          { name: "Master Suite with Balcony", size: "14'0\" × 13'6\"" },
          { name: "Walk-in Closet & Bath", size: "7'6\" × 6'0\"" },
          { name: "Children's Bedroom", size: "12'8\" × 11'8\"" },
          { name: "Terrace Lounge Deck", size: "12'0\" × 14'0\"" }
        ]
      }
    },
    clientTestimonial: {
      quote: "Building a custom home in Indiranagar while managing intense tech engineering roles seemed terrifying given contractor horror stories. SK Constructions gave us a strict fixed-price escrow contract, a daily WhatsApp camera feed, and delivered our Griha Pravesh 18 days before schedule with impeccable civil finish quality.",
      clientName: "Mr. Rajesh & Sunita Gowda",
      designation: "Tech Directors • Indiranagar Homeowners",
      avatarInitials: "RG",
      rating: 5
    },
    featured: true
  },
  {
    id: "SK-2402",
    slug: "saffron-heights",
    title: "Saffron Heights",
    tagline: "Independent Luxury G+3 Residence with Burma Teak Automated Solar Louvers",
    type: "residential",
    typeLabel: "Residential Villa (G+3 Triplex)",
    status: "completed",
    statusLabel: "Handed Over",
    locality: "HSR Layout",
    localitySlug: "hsr-layout",
    address: "Sector 2, HSR Layout, Bengaluru 560102",
    investmentAmount: 24500000,
    investmentDisplay: "₹2.45 Cr",
    builtUpAreaSqFt: 3600,
    plotSize: "30 × 50 ft",
    timelineMonths: 10,
    completionDate: "August 2024",
    completionYear: 2024,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCClPwe374cS6LN8lYx7lUFcIIiTkPfoHVQKmyzI8VFrbh-rMf8Xy3G2CEVFOIbzAA_4hW5KFlfImxwa4XR_K1E49dyfWzAZfOSTWn3ebi1jdPDggFq_NZ_4BATJP0MarbTr3KVQvdIEmtEL93nML0HI7IMahyhkKAOEE30UcLLpPBZDuobtKHjDCNNJGwmYvP1yjW895C5Q5iEDapuTA2me209hQQfzwgVlRQhhf6rVjBE3zhQVXcbqg",
    galleryImages: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5tEaAI_R3JaZci1xwj1F38yWmr81RhWHkO0rxTvn1KlDqLN4pTn8pmyK74myKQfqBNMa3_jrlz1xHe0MuKGz6T4cdohaDrzjlZe9q2YmytxWSLpFxf64YamVVsskqGpJP3IRS09elW8R3by1mpou-nAgxRsRNhCPk0xmhkqjlLZFGYuPYN-ko0dCrVxltLu88fEK1ArkOTVSuZKAtoT9jyc5Xqc6pnTdTo0DAUEhXsDDSA--VaPznTA",
        caption: "Facade with Exposed Wire-cut Bricks",
        alt: "Saffron Heights duplex residence in HSR Layout Bangalore with exposed brick and steel lintels"
      }
    ],
    description: "Multi-generational duplex home built with double-height 22ft central living room, Italian Statuario marble flooring, and acoustic double-glazed UPVC windows.",
    challenge: "High noise corridor near 27th Main and requirement for multi-generational living with separate privacy zones for elderly parents.",
    solution: "Acoustic envelope with Fenesta soundproof windows, Schindler hydraulic elevator, and ground-level step-free living for elderly accessibility.",
    result: "Delivered in exactly 10 months with full BBMP Occupancy Certificate and BESCOM permanent meter.",
    highlights: [
      "Schindler Hydraulic Elevator",
      "5kW Grid-Tied Solar Rooftop Array",
      "Statuario Italian Marble",
      "Double-Height 22ft Living Room",
      "Zero Price Escalation Guarantee"
    ],
    materialsAudited: ["Tata Tiscon 550D", "UltraTech Super 53", "Kohler Sanitaryware", "Havells FR-LSH"],
    clientTestimonial: {
      quote: "As a doctor, I have zero spare time to chase plumbers and carpenters. SK Constructions took care of BBMP plan sanctions, BESCOM power, and soil testing. The 10-year warranty document gives great assurance.",
      clientName: "Dr. Manjunath Shetty",
      designation: "Consultant Surgeon • HSR Layout",
      avatarInitials: "MS",
      rating: 5
    }
  },
  {
    id: "SK-2403",
    slug: "greenwood-modernist",
    title: "Greenwood Modernist",
    tagline: "Eco-Friendly Villa with Passive Geothermal Cooling & Rainwater Percolation",
    type: "residential",
    typeLabel: "Contemporary Residential Villa",
    status: "completed",
    statusLabel: "Handed Over",
    locality: "Sarjapur Road",
    localitySlug: "sarjapur-road",
    address: "Carmelaram, Sarjapur Road, Bengaluru 560035",
    investmentAmount: 16800000,
    investmentDisplay: "₹1.68 Cr",
    builtUpAreaSqFt: 2900,
    plotSize: "30 × 40 ft",
    timelineMonths: 8,
    completionDate: "May 2024",
    completionYear: 2024,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiliL1ckuYWFhbA1NrOLdgIrRl0N274kl7gXJlkHHrxVHWKZu8NDsrIzVfouHrklmFu7ZQrycVQ8ymfDjPjVwOlAAWwKktWQHXIf4WfcE39Vx6ieqo88rYp4VVeOmSwjjrlQY9DE1GuCNL7OzMy4dyEqFPxJ8CCCX4ZsbFPPZZUlWy7BY5BV4nsHb5lK7hj_ryiFoxMuxpNRIXZg6x55Rd4Iybfqw758RZkc1R5mKgzqQHHFjqcHT6Bg",
    galleryImages: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMMASTPpxRMN-msg_Z2jUNI0VLAk2yLF-C7ept1GAyH1j8CpX7VnMoggeozMftdZZ0pR3STCmoTHtdLlfJQpF3gbbbRgVFPXPk592QSKoSyGxbi99mOXWVZNVriTEb2dvvAUDPpPHFTWuSvVF27-9_CZUUhspYodQ69PtMm7_gU1CZLGxcCvmsAwD9GTy9YTohDnBzt1p1eZJO42IAgbPE6XZc8uJpuh1as9V7cU5zY3gx0z1MKnA5Zw",
        caption: "Biophilic Green Terrace & Pergola",
        alt: "Greenwood Modernist eco villa with lush terrace garden and terracotta shading fins"
      }
    ],
    description: "Exposed wire-cut clay brick facade villa with passive geothermal earth-air cooling tubes, integrated 15,000L rainwater percolation pit, and rooftop solar array.",
    challenge: "Clay soil conditions with high moisture variation in the Sarjapur lake belt.",
    solution: "Engineered pile-and-raft foundation with deep water table drainage sumps and thermal cavity brick walls.",
    result: "Achieved IGBC Silver Green Certification with internal temperatures 4°C cooler than outdoor ambient heat.",
    highlights: ["IGBC Silver Certified", "Thermal Cavity Brick Walls", "15,000L Rainwater Harvesting", "Geothermal Earth Cooling"],
    materialsAudited: ["Tata Tiscon 550D", "Dalmia 53 Grade", "Wienerberger Porotherm Bricks", "Grohe CP Fittings"]
  },
  {
    id: "SK-2404",
    slug: "silicon-valley-studio",
    title: "Silicon Valley Studio",
    tagline: "Post-Tensioned Commercial Tech Center with Column-Free 12m Structural Bays",
    type: "commercial",
    typeLabel: "Commercial IT & Office Complex",
    status: "completed",
    statusLabel: "Commercial PEB & RCC",
    locality: "Whitefield",
    localitySlug: "whitefield",
    address: "EPIP Zone, Whitefield, Bengaluru 560066",
    investmentAmount: 62000000,
    investmentDisplay: "₹6.20 Cr",
    builtUpAreaSqFt: 14500,
    plotSize: "60 × 120 ft",
    timelineMonths: 12,
    completionDate: "October 2024",
    completionYear: 2024,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR9iVs8771eOzjY_FqSH3BDkkqTl9eT2ReAIVFqqpN9aVFV0L6FBHGd3uANYY3fxqIDLebp2h3tL0Vw7Al78jruZ2ZXExwnXjmNGUVQuiO3ZR1ietRQX77ZAyTLOuSx4JvlC5uQR_7KiUJQyHcjY_BEg_KwxIsr2CT7gX_v4dFr7gm7n-cBSDEElsAL_P4nFqWj1xCUEDGZMqTHUWGN-BkjzMLBaWe3MZAyfPmkThwHQ_kjJ7Vpbea3A",
    galleryImages: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqF2voXzWfzdpxTqaRvKsepmvtqN59lXPLinDWD67L6G-p04jL125YISYLjoLb0qwPh-jpe8rmDMgUl9zoNmmJGj8y4vNgH_uTtyx8KrYoBuuokinhoB-UwsImrtGJa18ZBBNGvwBFlpZGTIEMbedrCXmYaC5MtZ7vLoCkpalXUE9AosvAh_Yjr_XXAeSIvib-zu80bAw36XxTZuC7vzOvo_jwPGWhqe9DOVNurUXRnxWtPd9bUv44Vg",
        caption: "Glass Curtain Wall Elevation",
        alt: "Commercial tech office building in Whitefield Bangalore with blue structural glazing"
      }
    ],
    description: "Post-tensioned commercial IT center engineered with column-free 12-meter structural bays and Saint-Gobain acoustic curtain walls.",
    challenge: "High live-load requirements for IT server rooms and strict Karnataka Fire Force NOC clearance.",
    solution: "PT (post-tensioned) slabs with high-strength M35 concrete and dedicated dual fire-escape stairwells.",
    result: "Received complete BBMP Occupancy Certificate with all floor spaces leased to US tech firm.",
    highlights: ["Post-Tensioned Slabs", "12m Clear Column Spans", "Fire NOC Cleared", "Centralized VRV HVAC"],
    materialsAudited: ["JSW Steel 550D", "UltraTech 53 Grade", "Saint-Gobain Solar Glass", "Schneider Electric Switchgear"]
  },
  {
    id: "SK-2405",
    slug: "pavilion-duplex",
    title: "Pavilion Duplex",
    tagline: "Contemporary Residential Villa near Manyata Tech Park (Active Site)",
    type: "residential",
    typeLabel: "Contemporary Residential Villa",
    status: "ongoing",
    statusLabel: "Ongoing • 75% Done",
    locality: "Hebbal",
    localitySlug: "hebbal",
    address: "Near Manyata Tech Park, Hebbal, Bengaluru 560045",
    investmentAmount: 17200000,
    investmentDisplay: "₹1.72 Cr",
    builtUpAreaSqFt: 3100,
    plotSize: "30 × 45 ft",
    timelineMonths: 9,
    completionDate: "November 2025",
    completionYear: 2025,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwUecB6I-0vOxDaE_hEoLwQZT5818mlfmgqBLdjdJPe9toCpi1WvRFuIw0t1YcVfWCBnd4OnpAVWgbaQwhPu2FEhWGH5Z421_X4mWqLARiuHzTtbfe59XnxxYj94uClkQTaQp4ljV4RwDf7Q_M3hvRKjus7ikSE8lHlCPs_l8jrTNaEoS0bAWADIo6oFMW8KtwLqm0dPHcJtBOPjnD96swWBrX0Bc39ETdV7wTDbcT8Udkq-PG9xrd9A",
    galleryImages: [
      {
        url: "https://lh3.googleusercontent.com/aida/AEtjO1VxAW1B-dbRknOPodyBZminVDw9oKSTCeWZ6UpKEei7N8MKAw19V3iHbuFyWrf1-0Z6GfZ07juDeYwU-WVXjlgknS0dgBx8wALbmWCkxUfvmO4qQfeyCyjA_A227eOoOPFhplruDaxBTT6-LyCKCojCIwAWvIy-7Bx8yYvZCcwS-B6Jyv3EbC2FIvDUE1mULnm48_au6KLzx-o6-jwU7t96pifiAkhk-tvcgLLb75qg0WrNG3E1mCR-FMU",
        caption: "Current Active Structural Slabs & Masonry",
        alt: "Under construction villa in Bangalore Hebbal showing concrete frame and red brickwork"
      }
    ],
    description: "Contemporary residential villa near Manyata Tech Park. Structural slabs completed; internal electrical rough-ins, concealed CPVC plumbing, and plastering in active progress.",
    challenge: "NRI owner residing in California requiring 100% remote milestone verification before releasing escrow payments.",
    solution: "Installed 4K on-site CCTV stream accessible 24/7 via private client portal + weekly Zoom site walkthroughs.",
    result: "Tracking 2 weeks ahead of scheduled timeline with zero non-conformances across 280 test points.",
    highlights: ["Live 4K Site CCTV Feed", "BBMP Approved Layout", "Escrow Milestone Governed", "Vastu Ishanya Entrance"],
    materialsAudited: ["Tata Tiscon 550D", "UltraTech Super 53", "Finolex FR-LSH", "Astral CPVC"]
  },
  {
    id: "SK-2406",
    slug: "oakwood-urban-home",
    title: "Oakwood Urban Home",
    tagline: "Minimalist G+2 Private Residence with Post-Tensioned Cantilever Decks",
    type: "residential",
    typeLabel: "Bespoke Urban Residence",
    status: "completed",
    statusLabel: "Handed Over",
    locality: "Koramangala",
    localitySlug: "koramangala",
    address: "4th Block, Koramangala, Bengaluru 560034",
    investmentAmount: 21000000,
    investmentDisplay: "₹2.10 Cr",
    builtUpAreaSqFt: 3850,
    plotSize: "40 × 50 ft",
    timelineMonths: 9,
    completionDate: "July 2024",
    completionYear: 2024,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo4G1Nd-UvXnM9hz5frSZQS8WwU_1rqTabs6R5-Dfzo-_4fnaqW3J5mjKn2OwsOn1ygRngunKEFNMClZXQ4LQq5ygyhGqZ_3-7-AyInu0fq2mxHwzOXXz7wL8DGZyiZzbw-RYPpEy1lrd98FMA0eHbK9yzSwLbg7OgN26XzqFGJH3_9AOdpoEfMVF-PRK3xuTeUGa_OjjgVIITd8k1KN7G5rkZwz4WSwTzh4EQtUxoKQDdd2Hj-8NoLQ",
    galleryImages: [],
    description: "Minimalist G+2 private residence featuring post-tensioned cantilever decks, custom cast concrete kitchen island, and smart climate shading.",
    challenge: "High water table during monsoon excavation.",
    solution: "Executed deep well-point dewatering and waterproofed reinforced concrete retaining perimeter.",
    result: "Delivered in 9 months flat with flawless interior finish quality.",
    highlights: ["KNX Home Automation", "10-Year Structural Warranty", "Italian Marble Floors", "Post-Tensioned Balcony"],
    materialsAudited: ["Tata Tiscon 550D", "UltraTech 53", "Fenesta UPVC", "Schneider KNX"]
  },
  {
    id: "SK-2407",
    slug: "aeropolis-peb-facility",
    title: "Aeropolis PEB Facility",
    tagline: "Clear-Span Heavy Engineering Warehouse with 12m Apex Clearance",
    type: "industrial",
    typeLabel: "Industrial PEB Warehouse",
    status: "completed",
    statusLabel: "Industrial PEB Shed",
    locality: "Devanahalli",
    localitySlug: "devanahalli",
    address: "KIADB Aerospace Park, Devanahalli, Bengaluru 562149",
    investmentAmount: 48000000,
    investmentDisplay: "₹4.80 Cr",
    builtUpAreaSqFt: 28000,
    plotSize: "150 × 200 ft",
    timelineMonths: 5,
    completionDate: "June 2024",
    completionYear: 2024,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW2UIySaUBHLwtpjXgSNPBobb_wKXIgfpSZJ8vrVZTNodRK2a6XnSTRuIiPzpBIdhBQ-BTRxH400ttQZWfP7xfsFL4wl1tsA2ESwpbCUZG6V2HAgsIEeLySxLnjo8VoOyl9QCek3g-_3m9-SjI12iTR14Aj7mv5c2rK4vgcgg1dCzPnuMH9CmBT3WSCHOdKRWpJMa04myA4OB5qF5Xl7JHGXL611ojxcYtKc_SsFB807MXyXlJORz6gQ",
    galleryImages: [],
    description: "28,000 sq.ft clear-span heavy engineering warehouse with 12m apex clearance, laser-screeded FM2 flooring, and automated docking.",
    challenge: "Strict 5-month erection timeline required by multinational client.",
    solution: "Prefabricated high-tensile structural steel components produced off-site and assembled using mobile cranes.",
    result: "Handed over in 5 months with KIADB approval and industrial occupancy certificate.",
    highlights: ["36-Meter Clear Span", "Laser Screeded FM2 Floor", "Tata Bluescope Steel", "KIADB Approved"],
    materialsAudited: ["Tata Bluescope 345 MPa Steel", "UltraTech 53 Grade Concrete", "Standing Seam Roof"]
  },
  {
    id: "SK-2408",
    slug: "palm-grove-penthouse",
    title: "Palm Grove Penthouse",
    tagline: "Turnkey Luxury Duplex Penthouse Architectural Transformation",
    type: "interior",
    typeLabel: "Luxury Interior Fitout",
    status: "completed",
    statusLabel: "Interior Fitout",
    locality: "JP Nagar",
    localitySlug: "jp-nagar",
    address: "7th Phase, JP Nagar, Bengaluru 560078",
    investmentAmount: 5800000,
    investmentDisplay: "₹58 Lakhs",
    builtUpAreaSqFt: 2400,
    plotSize: "Penthouse Apartment",
    timelineMonths: 1.5,
    completionDate: "September 2024",
    completionYear: 2024,
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTU5ItGrb723PyuxgnZieIFvwR8xZ7Bdb1n7cPrQu9qxRruBfKVX0Pf8Wws3FATYHxL0sX8Gy7Ecg3u0_e5NIdtFbOiVOuEl_fL4jxmH8JYzQfe6Rk2y_ocyRtqrVJJ2LTic4cRkhwtzI_JK5FHsS_egh50cgy6idvnb5HKzEYAYmHGyh_KJsPUVeeR3qjuRz_bQ_VOcBL7buzZDKmMYvJOWPlnfJCUM4jB8JS3t0Hw2S7hshO722f4Q",
    galleryImages: [],
    description: "High-end turnkey architectural interior transformation. German Hafele fittings, bespoke acoustic wall panelling, and integrated home theatre.",
    challenge: "Strict apartment complex quiet-hours and lift weight limits.",
    solution: "100% factory-cut modular paneling assembled on site with dry joinery techniques.",
    result: "Completed within 45 days with zero snag complaints.",
    highlights: ["BWP Marine Plywood IS:710", "German Hafele Hardware", "Italian Marble Polishing", "Integrated Dolby Atmos Theatre"],
    materialsAudited: ["Greenlam Marine Ply", "Hafele Hinges", "Asian Paints PU Finish", "Saint-Gobain Glass"]
  }
];
