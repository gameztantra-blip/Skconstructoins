/**
 * 3D Home Designs & Architectural Archetypes for Bangalore
 * Pre-calibrated for standard BDA/BBMP plot sizes (30x40, 30x50, 40x60, 20x30)
 */

export interface Design3DItem {
  id: string;
  slug: string;
  name: string;
  series: string;
  plotDimensions: string;
  plotAreaSqFt: number;
  builtUpAreaSqFt: number;
  facing: "East" | "North" | "South" | "West" | "North-East";
  vastuLabel: string;
  floors: string;
  bhk: string;
  style: string;
  estimatedCost: number;
  estimatedCostDisplay: string;
  heroImage: string;
  explodedImage: string;
  floorPlanCadImage: string;
  description: string;
  ceilingHeight: string;
  steelStandard: string;
  foundationSpec: string;
  roomLedger: {
    level: string;
    levelArea: string;
    rooms: { name: string; size: string; sqft: string }[];
  }[];
  specifications: string[];
}

export const HOME_DESIGNS_3D_DATA: Design3DItem[] = [
  {
    id: "3D-VAYU-01",
    slug: "vayu-duplex",
    name: "The Vayu Duplex",
    series: "Koramangala, HSR & Sarjapur Architectural Series",
    plotDimensions: "30 × 40 ft",
    plotAreaSqFt: 1200,
    builtUpAreaSqFt: 2450,
    facing: "East",
    vastuLabel: "100% Vastu Compliant (Purva Facing)",
    floors: "G+1 + Terrace Deck",
    bhk: "3 BHK",
    style: "Contemporary Minimalist",
    estimatedCost: 5512000,
    estimatedCostDisplay: "₹55.12 L",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnmDmWCfzukb0jhjAV5xoRqz0nuECdopHrqZLWkB_gokfLADYeJQ8hVY-E32OcKTM_iXuqujlzMsLOVcssjrKEfj-j99I9MM64K9el0yXAJx8Yj6JKIGgCILbKByvZ3ecfU9oyJq3eOy00m_RANjl42mpI70Z2Y6tmTBIRHeLIxqJQPzI5g19CwWDizisteFuHlzxDRo5DH_5wuKIRiF7FAnuhkCDwQHdGHGNdLfHo9lVf7IropIRAlw",
    explodedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2BysQJJxlu2qiTxaMlyAtvGmPR7lHFmfz2kmnPWYLwZn3IfUz-H5MssIlvylw9pliqOPhdide9Ih4FMvn9U8ZpH27JDgElnn8lpdl-C9pv-57zjlklIzlQk-nDOMVelm3bhb76Iq_Qs4PF1YVQsBoZL_dC3-qVACFzBIVqiqO1Z8ZfMB7S7E9lUgFbPPABpNUhQ76dpC4KAbqsL1sFOzjZHw6JkPxKn5364ARkkcSfNa5iLhr2GyguQ",
    floorPlanCadImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnDsexlicielTaL6SWvZUNQgR-K50S_h_uzZNjbmrdtXArrLT4tp8EX_nQP9umUBi8m1hzovhkcT0q4W59dljNAN2FgN2YXKSmqy2umt4r0soTGYZj0UUWVDcdXRYuEjtsk627LLS_YBT7hNJtPOBtDZpFkOdx1MJLduAbhXcDMjY5k-CXIVWPzkqry56CeqaThi6of4iKufgExAXVi7NxnlVrf_Bdva63SflBip2eNRkzV3XRZ922dg",
    description: "Our most requested 30×40 duplex villa across South Bangalore. Features an open double-height living room with Italian Botticino marble, custom floating teak staircase, dedicated North-East Pooja chamber, and an open terrace entertainment deck with solar pergola.",
    ceilingHeight: "10'6\" Clear Ceiling Height",
    steelStandard: "Tata Tiscon 550D Super Ductile",
    foundationSpec: "Isolated Column Footing with Plinth Tie Beams (180 kN/m²)",
    roomLedger: [
      {
        level: "Ground Floor Level",
        levelArea: "1,150 sq.ft",
        rooms: [
          { name: "Car Porch & Sit-out", size: "14'0\" × 16'6\"", sqft: "231 sq.ft" },
          { name: "Double-Height Living", size: "16'0\" × 18'0\"", sqft: "288 sq.ft" },
          { name: "Open Kitchen & Dining", size: "12'0\" × 20'6\"", sqft: "246 sq.ft" },
          { name: "North-East Pooja Mandir", size: "6'0\" × 8'0\"", sqft: "48 sq.ft" },
          { name: "Parents' Bedroom Ensuite", size: "12'0\" × 14'0\"", sqft: "168 sq.ft" },
        ],
      },
      {
        level: "First Floor Level",
        levelArea: "1,050 sq.ft",
        rooms: [
          { name: "Master Suite + Dressing", size: "15'0\" × 17'6\"", sqft: "262 sq.ft" },
          { name: "Kids' Bedroom + Balcony", size: "12'6\" × 14'0\"", sqft: "175 sq.ft" },
          { name: "Family Media Lounge", size: "14'0\" × 12'0\"", sqft: "168 sq.ft" },
        ],
      },
      {
        level: "Terrace Deck",
        levelArea: "250 sq.ft Covered",
        rooms: [
          { name: "Solar Pergola & Gazebo", size: "12'0\" × 15'0\"", sqft: "180 sq.ft" },
          { name: "Utility & Heat Pump Room", size: "7'0\" × 10'0\"", sqft: "70 sq.ft" },
        ],
      },
    ],
    specifications: [
      "BBMP Zonal FAR 1.75 Compliant",
      "Fenesta Double Glazed Soundproof UPVC",
      "10,000L Monolithic Rainwater Harvest Sump",
      "Concealed Astral CPVC and Fire-Retardant Cables",
      "10-Year Structural Guarantee Bond",
    ],
  },
  {
    id: "3D-CANT-02",
    slug: "cantilever-house",
    name: "The Cantilever House",
    series: "Whitefield & Outer Ring Road Belt",
    plotDimensions: "30 × 50 ft",
    plotAreaSqFt: 1500,
    builtUpAreaSqFt: 3200,
    facing: "North",
    vastuLabel: "North Facing (Kuber Corner Entry)",
    floors: "G+2 Triplex",
    bhk: "4 BHK",
    style: "Contemporary Cantilevered",
    estimatedCost: 7200000,
    estimatedCostDisplay: "₹72.00 L",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDu6mnL7lXETR4Zd83iaV8sdi-aJfU_L6TysOEaEqv5YiOM4_kaDWbY8JHwHNv77Nat2xLCIo3wR3jLJllsRh1KrtpWhVqGadHqYg8lcsAxNc1q5oOQvsfBu3GInQtWgFXz4n3mOK0Cb632hjxxoHSQCCFmBP1KauKA9drke3rRuMjvo7OSjNzK1f9leIKNGxsoGpOARq0G8R1CDbjJTx78MNkmPzKVfJ-necYIMm1F3QivvPTw-tJBlA",
    explodedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2BysQJJxlu2qiTxaMlyAtvGmPR7lHFmfz2kmnPWYLwZn3IfUz-H5MssIlvylw9pliqOPhdide9Ih4FMvn9U8ZpH27JDgElnn8lpdl-C9pv-57zjlklIzlQk-nDOMVelm3bhb76Iq_Qs4PF1YVQsBoZL_dC3-qVACFzBIVqiqO1Z8ZfMB7S7E9lUgFbPPABpNUhQ76dpC4KAbqsL1sFOzjZHw6JkPxKn5364ARkkcSfNa5iLhr2GyguQ",
    floorPlanCadImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDacp2SO0KeXNuG8aL2MvO5LaTtMLo-cQrzhS0MSCxPuZesJyVPg6LlqXJe7vpSPm6c1VNKXNVFLl31ld6AtewGnVqftiFBI2OmQ8LNqNmR2xCpucTmt2yJHfIRrj88e87ctnB_kd4GRu07R6u6XMNoTIgdh0sMLTKXoxTFGU3HC8L3JEziKOLsxDmYpsR6kfKx5PAT4bMmR6IzlU4UfjqpgLQaEZWQOtUCOhLsEdkDdlktIFMY-nqyYw",
    description: "Engineered for 30×50 corner or interior plots in East Bangalore. Features post-tensioned cantilever balconies, automated louver shading, home theatre lounge, and private elevator shaft.",
    ceilingHeight: "11'0\" Clear Ceiling Height",
    steelStandard: "Tata Tiscon 550D TMT",
    foundationSpec: "Combined Raft & Strip Footing with Water Barrier",
    roomLedger: [
      {
        level: "Ground Floor",
        levelArea: "1,200 sq.ft",
        rooms: [
          { name: "2-Car Parking Bay", size: "18'0\" × 18'0\"", sqft: "324 sq.ft" },
          { name: "Formal Living", size: "16'0\" × 16'0\"", sqft: "256 sq.ft" },
          { name: "Kitchen & Utility", size: "12'0\" × 14'0\"", sqft: "168 sq.ft" },
        ],
      },
      {
        level: "First Floor",
        levelArea: "1,200 sq.ft",
        rooms: [
          { name: "Family Living & Dining", size: "16'0\" × 20'0\"", sqft: "320 sq.ft" },
          { name: "2 Ensuite Bedrooms", size: "14'0\" × 14'0\"", sqft: "392 sq.ft" },
        ],
      },
      {
        level: "Second Floor",
        levelArea: "800 sq.ft",
        rooms: [
          { name: "Master Suite & Terrace", size: "18'0\" × 20'0\"", sqft: "360 sq.ft" },
          { name: "Acoustic Home Theatre", size: "14'0\" × 16'0\"", sqft: "224 sq.ft" },
        ],
      },
    ],
    specifications: [
      "Hydraulic Elevator Provision",
      "Automated Solar Louver Screens",
      "Statuario Marble Throughout",
      "Central Heat Pump Ready",
    ],
  },
  {
    id: "3D-TEAK-03",
    slug: "malabar-teak-villa",
    name: "Malabar Teak Villa",
    series: "Indiranagar & Sadashivanagar Custom Spec",
    plotDimensions: "40 × 60 ft",
    plotAreaSqFt: 2400,
    builtUpAreaSqFt: 4200,
    facing: "North-East",
    vastuLabel: "North-East Ishanya Courtyard",
    floors: "G+2 Royale",
    bhk: "4 BHK + Pool",
    style: "Tropical Modernist",
    estimatedCost: 11500000,
    estimatedCostDisplay: "₹1.15 Cr",
    heroImage: "https://lh3.googleusercontent.com/aida/AEtjO1XGHKQz5TfRRM_QfyvBK13P59yamWGMEraB8SCYtquL5ovpoyPP-EwfKqELn69GW61dk37jqEV0piWN7byOjurOCZ-Ol4n3Z3CZnu2F87UoaSpmL9rB4HnEt5Ea-UFJQOrKmei3oTh8T_7A4AgJKn5UmzrO5fHEvcgGKkFyKUblyDlVsKWSFKKILOvbhpSqoHlm8XnyLwn9gKp8mhSN7UPc7bLd8dy13uEX5bLkGDiukci6rkMlK5c13FmH",
    explodedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2BysQJJxlu2qiTxaMlyAtvGmPR7lHFmfz2kmnPWYLwZn3IfUz-H5MssIlvylw9pliqOPhdide9Ih4FMvn9U8ZpH27JDgElnn8lpdl-C9pv-57zjlklIzlQk-nDOMVelm3bhb76Iq_Qs4PF1YVQsBoZL_dC3-qVACFzBIVqiqO1Z8ZfMB7S7E9lUgFbPPABpNUhQ76dpC4KAbqsL1sFOzjZHw6JkPxKn5364ARkkcSfNa5iLhr2GyguQ",
    floorPlanCadImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnDsexlicielTaL6SWvZUNQgR-K50S_h_uzZNjbmrdtXArrLT4tp8EX_nQP9umUBi8m1hzovhkcT0q4W59dljNAN2FgN2YXKSmqy2umt4r0soTGYZj0UUWVDcdXRYuEjtsk627LLS_YBT7hNJtPOBtDZpFkOdx1MJLduAbhXcDMjY5k-CXIVWPzkqry56CeqaThi6of4iKufgExAXVi7NxnlVrf_Bdva63SflBip2eNRkzV3XRZ922dg",
    description: "An ultra-luxury 40×60 residence blending natural Burma teak slats, cantilevered concrete, imported Italian marble, and an infinity plunge pool set within a private tropical courtyard.",
    ceilingHeight: "12'0\" Clear Ceiling Height",
    steelStandard: "Tata Tiscon Fe 550D Primus",
    foundationSpec: "Engineered Mat Foundation with Dual Membrane Tanking",
    roomLedger: [
      {
        level: "Ground Floor",
        levelArea: "1,600 sq.ft",
        rooms: [
          { name: "3-Car Portico", size: "20'0\" × 20'0\"", sqft: "400 sq.ft" },
          { name: "Courtyard Living & Pool Deck", size: "24'0\" × 22'0\"", sqft: "528 sq.ft" },
          { name: "Show Kitchen & Spice Kitchen", size: "14'0\" × 16'0\"", sqft: "224 sq.ft" },
        ],
      },
      {
        level: "First Floor",
        levelArea: "1,500 sq.ft",
        rooms: [
          { name: "Grand Master Suite", size: "20'0\" × 18'0\"", sqft: "360 sq.ft" },
          { name: "2 Guest Suites", size: "16'0\" × 15'0\"", sqft: "480 sq.ft" },
        ],
      },
      {
        level: "Second Floor",
        levelArea: "1,100 sq.ft",
        rooms: [
          { name: "Sky Lounge & Terrace Garden", size: "24'0\" × 24'0\"", sqft: "576 sq.ft" },
        ],
      },
    ],
    specifications: [
      "Infinity Plunge Pool with Glass Filtration",
      "Full KNX Automation Suite",
      "Schüco Germany Acoustic Double Glazing",
      "VRV Central Air Conditioning Ready",
    ],
  },
  {
    id: "3D-SLIM-04",
    slug: "linear-courtyard",
    name: "The Linear Courtyard",
    series: "Jayanagar, Malleshwaram & BTM Layout",
    plotDimensions: "20 × 30 ft",
    plotAreaSqFt: 600,
    builtUpAreaSqFt: 1550,
    facing: "East",
    vastuLabel: "Compact Vastu Solution",
    floors: "G+2 Smart",
    bhk: "2.5 BHK",
    style: "Compact Urban Smart",
    estimatedCost: 3487000,
    estimatedCostDisplay: "₹34.87 L",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz2aZ4aW6Y68vDzNezYN9mPBjlAKL1Jr57B6Y0leIRPTAe9GrPG0i1glfBJt1foh4Rxj7V4hD_-uRjT-hVDR3_PUwoln8IbONLiuF7xvY2JJLDmfU2mpgmW0vZP3DHISi2s1W37iw9ZjGXwbK0BlwI5fC-w69sALUA2KPw69xN19jd79aZDhv4ybBZoiqd5OAPzQFoC0zM_U52heS0XQ0W7wCkS6KG95cdtqu6uHk6zpqhFj06DR6xHw",
    explodedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2BysQJJxlu2qiTxaMlyAtvGmPR7lHFmfz2kmnPWYLwZn3IfUz-H5MssIlvylw9pliqOPhdide9Ih4FMvn9U8ZpH27JDgElnn8lpdl-C9pv-57zjlklIzlQk-nDOMVelm3bhb76Iq_Qs4PF1YVQsBoZL_dC3-qVACFzBIVqiqO1Z8ZfMB7S7E9lUgFbPPABpNUhQ76dpC4KAbqsL1sFOzjZHw6JkPxKn5364ARkkcSfNa5iLhr2GyguQ",
    floorPlanCadImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDacp2SO0KeXNuG8aL2MvO5LaTtMLo-cQrzhS0MSCxPuZesJyVPg6LlqXJe7vpSPm6c1VNKXNVFLl31ld6AtewGnVqftiFBI2OmQ8LNqNmR2xCpucTmt2yJHfIRrj88e87ctnB_kd4GRu07R6u6XMNoTIgdh0sMLTKXoxTFGU3HC8L3JEziKOLsxDmYpsR6kfKx5PAT4bMmR6IzlU4UfjqpgLQaEZWQOtUCOhLsEdkDdlktIFMY-nqyYw",
    description: "Custom-engineered for tight 20×30 Bangalore plots. Features a vertical central skylight shaft that pulls cross-ventilation and sunlight through all three levels, creating the illusion of a 40ft home.",
    ceilingHeight: "10'0\" Clear Ceiling Height",
    steelStandard: "Tata Tiscon 550D",
    foundationSpec: "Continuous Tie-Beam with RCC Footings",
    roomLedger: [
      {
        level: "Ground Floor",
        levelArea: "500 sq.ft",
        rooms: [
          { name: "Covered Car Parking", size: "10'0\" × 15'0\"", sqft: "150 sq.ft" },
          { name: "Living & Kitchenette", size: "12'0\" × 18'0\"", sqft: "216 sq.ft" },
        ],
      },
      {
        level: "First Floor",
        levelArea: "550 sq.ft",
        rooms: [
          { name: "Master Bedroom Ensuite", size: "12'0\" × 14'0\"", sqft: "168 sq.ft" },
          { name: "Study / Guest Room", size: "10'0\" × 10'0\"", sqft: "100 sq.ft" },
        ],
      },
      {
        level: "Second Floor",
        levelArea: "500 sq.ft",
        rooms: [
          { name: "Kids' Suite + Terrace", size: "12'0\" × 14'0\"", sqft: "168 sq.ft" },
        ],
      },
    ],
    specifications: [
      "Zero Waste Space Maximization",
      "Central Vertical Lightwell Shaft",
      "Modular Kitchen Bundled",
      "Vastu Aligned Kitchen in SE",
    ],
  },
];
