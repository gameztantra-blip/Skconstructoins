/**
 * Construction Cost & Business Configuration for SK Constructions Bangalore
 * Centralized configuration file for all rates, branding, contact details, and APIs
 */

export interface PackageRate {
  id: string;
  name: string;
  badge?: string;
  ratePerSqFt: number; // in INR
  tagline: string;
  suitableFor: string;
  specs: {
    steel: string;
    cement: string;
    flooring: string;
    sanitary: string;
    electrical: string;
    woodwork: string;
    paint: string;
  };
}

export interface ConstructionConfig {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    reraNumber: string;
    gstin: string;
    cin: string;
    isoCertified: string;
    establishedYear: number;
    headOffice: {
      building: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      coordinates: string;
    };
    contact: {
      primaryPhone: string;
      formattedPhone: string;
      landline: string;
      email: string;
      whatsappNumber: string; // international digits without +
      whatsappDisplay: string;
      workingHours: string;
    };
  };
  calculator: {
    baseRates: {
      standard: number;
      premium: number;
      luxury: number;
    };
    floorMultipliers: Record<string, { label: string; factor: number; description: string }>;
    extras: {
      stiltParkingRatePerSqFt: number; // or % factor
      stiltAreaFactor: number;
      basementExtraPercentage: number;
      basementRatePerSqFt: number;
      approvalsAndDesignPercentage: number;
      compositeGstRatePercentage: number; // 6% composite or 18% standard
      karnatakaLaborCessPercentage: number;
      tolerancePercentage: number; // ±8%
    };
    emi: {
      defaultInterestRate: number; // 8.5% p.a.
      defaultTenureYears: number; // 20
      defaultDownPaymentPercent: number; // 20%
    };
    ledgerDistribution: {
      civilStructure: number; // 42%
      architecturalFinishing: number; // 24%
      mepElectricalPlumbing: number; // 14%
      doorsWindowsRailings: number; // 10%
      approvalsAndSanctions: number; // 4%
      gstAndCess: number; // 6%
    };
  };
  leads: {
    googleAppsScriptUrl: string; // Webhook endpoint
    emailNotificationRecipient: string;
    enableLocalStorageBackup: boolean;
  };

  // Top-level aliases for direct component access
  defaultBaseRatePerSqFt: number;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  emailPrimary: string;
  reraNumber: string;
  gstin: string;
  isoCertification: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export const CONSTRUCTION_CONFIG: ConstructionConfig = {
  brand: {
    name: "SK CONSTRUCTIONS",
    legalName: "SK Constructions Bangalore Private Limited",
    tagline: "Engineered Living • Bengaluru",
    reraNumber: "PRM/KA/RERA/1251/310/PR/200924/003621",
    gstin: "29AAGCS4512Q1ZX",
    cin: "U45200KA2020PTC078912",
    isoCertified: "ISO 9001:2015 Quality Management Certified",
    establishedYear: 2020,
    headOffice: {
      building: "Prestige Meridian, 8th Floor",
      street: "29 M.G. Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      coordinates: "12.9754° N, 77.6066° E",
    },
    contact: {
      primaryPhone: "+919845012345",
      formattedPhone: "+91 98450 12345",
      landline: "080 4123 9900",
      email: "projects@skconstructions.in",
      whatsappNumber: "919845012345",
      whatsappDisplay: "+91 98450 12345",
      workingHours: "Mon - Sat: 9:00 AM - 7:30 PM IST",
    },
  },
  calculator: {
    baseRates: {
      standard: 1850,
      premium: 2250,
      luxury: 2750,
    },
    floorMultipliers: {
      "G": { label: "Ground Floor Only (G)", factor: 1.0, description: "1 Living Level" },
      "G+1": { label: "Ground + 1 Floor (G+1 Duplex)", factor: 1.75, description: "2 Living Levels" },
      "G+2": { label: "Ground + 2 Floors (G+2 Triplex)", factor: 2.30, description: "3 Living Levels (Most Popular)" },
      "G+3": { label: "Ground + 3 Floors (G+3 Mansion)", factor: 2.85, description: "4 Living Levels / Multi-Unit" },
    },
    extras: {
      stiltParkingRatePerSqFt: 1250,
      stiltAreaFactor: 0.25,
      basementExtraPercentage: 0.25, // 25% on basement area
      basementRatePerSqFt: 2200,
      approvalsAndDesignPercentage: 0.04, // 4%
      compositeGstRatePercentage: 0.06, // 6% composite
      karnatakaLaborCessPercentage: 0.01, // 1%
      tolerancePercentage: 0.08, // ±8%
    },
    emi: {
      defaultInterestRate: 8.5,
      defaultTenureYears: 20,
      defaultDownPaymentPercent: 20,
    },
    ledgerDistribution: {
      civilStructure: 0.42,
      architecturalFinishing: 0.24,
      mepElectricalPlumbing: 0.14,
      doorsWindowsRailings: 0.10,
      approvalsAndSanctions: 0.04,
      gstAndCess: 0.06,
    },
  },
  leads: {
    googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbx_SK_CONSTRUCTIONS_LEAD_WEBHOOK/exec",
    emailNotificationRecipient: "projects@skconstructions.in",
    enableLocalStorageBackup: true,
  },

  // Aliases for convenience
  defaultBaseRatePerSqFt: 1850,
  phonePrimary: "+91 98450 12345",
  phoneSecondary: "+91 80 4123 9900",
  whatsappNumber: "919845012345",
  emailPrimary: "projects@skconstructions.in",
  reraNumber: "PRM/KA/RERA/1251/310/PR/200924/003621",
  gstin: "29AAGCS4512Q1ZX",
  isoCertification: "ISO 9001:2015 Certified",
  address: {
    street: "Level 7, Prestige Meridian 1",
    area: "29 M.G. Road",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
  },
};
