/**
 * Internationalization & Localization Dictionary
 * Default: English (EN) and Hindi (HI).
 * Extensible for regional languages: Kannada (KN), Marathi (MR), Tamil (TA), Telugu (TE).
 */

export type LanguageCode = "en" | "hi";

export interface Translations {
  nav: {
    services: string;
    projects: string;
    costCalculator: string;
    designs3D: string;
    about: string;
    careers: string;
    blog: string;
    contact: string;
    getFreeEstimate: string;
    whatsAppDesk: string;
  };
  hero: {
    accreditation: string;
    headlineStart: string;
    headlineHighlight: string;
    headlineEnd: string;
    subheadline: string;
    startingRate: string;
    calculateCost: string;
    whatsAppUs: string;
    reraNotice: string;
    completedHomes: string;
    reviews: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    plotDimensions: string;
    floors: string;
    packages: string;
    unlockBOQ: string;
    grandTotal: string;
    tolerance: string;
    estimatedDuration: string;
    loanEmi: string;
  };
  footer: {
    tagline: string;
    corporateOffice: string;
    turnkeySolutions: string;
    primeLocalities: string;
    governance: string;
    rights: string;
    privacy: string;
    terms: string;
    structuralWarranty: string;
  };
  common: {
    sqft: string;
    crore: string;
    lakh: string;
    callNow: string;
    chatWhatsApp: string;
    getQuote: string;
    dpdpConsent: string;
    submit: string;
    viewCaseStudy: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      costCalculator: "Cost Calculator",
      designs3D: "3D Home Designs",
      about: "About",
      careers: "Careers",
      blog: "Blog",
      contact: "Contact",
      getFreeEstimate: "Get Free Estimate",
      whatsAppDesk: "WhatsApp Quick Desk",
    },
    hero: {
      accreditation: "ISO 9001:2015 & Karnataka RERA Approved",
      headlineStart: "Build Your Dream Home — ",
      headlineHighlight: "On Time",
      headlineEnd: ", On Budget, No Hidden Costs.",
      subheadline: "Turnkey construction in Bangalore from ₹1,850/sq.ft. Legally binding fixed-price contracts with zero cost escalation, 10-year structural warranty, and 400+ digital quality checks.",
      startingRate: "₹1,850/sq.ft",
      calculateCost: "Calculate Construction Cost",
      whatsAppUs: "WhatsApp Us (+91 98450 12345)",
      reraNotice: "RERA Reg: PRM/KA/RERA/1251/310/PR/200924/003621 | Escrow Protection Guaranteed",
      completedHomes: "350+ Completed Homes",
      reviews: "4.8 / 5.0 (280+ Reviews)",
    },
    calculator: {
      title: "Bangalore Construction Cost Calculator",
      subtitle: "Get an instant, itemized engineering estimate for your residential plot. Calibrated to Bangalore municipal BDA/BBMP bye-laws, current Q2 2024 material index rates, and audited turnkey BOQs.",
      step1: "Plot Spec",
      step2: "Floors",
      step3: "Packages",
      step4: "Unlock BOQ",
      plotDimensions: "Plot Dimensions & Orientation",
      floors: "Floor Structure & Architecture",
      packages: "Turnkey Engineering Specifications",
      unlockBOQ: "Unlock Complete 18-Page Detailed BOQ",
      grandTotal: "Grand Total Construction Cost",
      tolerance: "Tolerance ±8%",
      estimatedDuration: "Estimated Duration: 9.5 – 11 Months",
      loanEmi: "Estimated Loan EMI",
    },
    footer: {
      tagline: "Bangalore's trusted turnkey civil engineering & premium residential construction studio. Delivering RERA-compliant, architect-led villas, commercial spaces, and custom homes with guaranteed milestones.",
      corporateOffice: "Level 4, Prestige Meridian, 29 M.G. Road, Bengaluru, Karnataka 560001",
      turnkeySolutions: "Turnkey Solutions",
      primeLocalities: "Prime Localities",
      governance: "Governance & QA",
      rights: "© 2025 SK Constructions Bangalore Private Limited. All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Turnkey Escrow",
      structuralWarranty: "10-Year Structural Warranty Protection",
    },
    common: {
      sqft: "sq.ft",
      crore: "Cr",
      lakh: "Lakhs",
      callNow: "Call Now",
      chatWhatsApp: "Chat on WhatsApp",
      getQuote: "Get Quote",
      dpdpConsent: "I authorize SK Constructions to contact me via Call/WhatsApp regarding my construction project. Compliant with India's DPDP Act.",
      submit: "Submit Request",
      viewCaseStudy: "View Case Study",
    },
  },
  hi: {
    nav: {
      services: "सेवाएं",
      projects: "प्रोजेक्ट्स",
      costCalculator: "लागत कैलकुलेटर",
      designs3D: "3D होम डिज़ाइन्स",
      about: "हमारे बारे में",
      careers: "करियर",
      blog: "ब्लॉग",
      contact: "संपर्क करें",
      getFreeEstimate: "मुफ्त अनुमान पाएं",
      whatsAppDesk: "व्हाट्सएप हेल्प डेस्क",
    },
    hero: {
      accreditation: "आईएसओ 9001:2015 एवं कर्नाटक रेरा प्रमाणित",
      headlineStart: "अपने सपनों का घर बनाएं — ",
      headlineHighlight: "समय पर",
      headlineEnd: ", बजट में, बिना किसी छुपे खर्च के।",
      subheadline: "बैंगलोर में टर्नकी निर्माण ₹1,850/वर्ग फुट से शुरू। शून्य मूल्य वृद्धि की कानूनी गारंटी, 10 वर्ष की संरचनात्मक वारंटी और 400+ डिजिटल गुणवत्ता परीक्षण।",
      startingRate: "₹1,850/वर्ग फुट",
      calculateCost: "निर्माण लागत की गणना करें",
      whatsAppUs: "व्हाट्सएप करें (+91 98450 12345)",
      reraNotice: "रेरा पंजीकरण: PRM/KA/RERA/1251/310/PR/200924/003621 | एस्क्रो सुरक्षा गारंटी",
      completedHomes: "350+ निर्मित मकान",
      reviews: "4.8 / 5.0 (280+ समीक्षाएं)",
    },
    calculator: {
      title: "बैंगलोर निर्माण लागत कैलकुलेटर",
      subtitle: "अपने आवासीय प्लॉट के लिए त्वरित और विस्तृत इंजीनियरिंग लागत अनुमान प्राप्त करें। बैंगलोर नगर पालिका (BBMP/BDA) उप-नियमों के अनुसार निर्धारित।",
      step1: "प्लॉट विवरण",
      step2: "मंजिलें",
      step3: "पैकेज",
      step4: "BOQ प्राप्त करें",
      plotDimensions: "प्लॉट का आकार एवं दिशा",
      floors: "मंजिलों की संरचना",
      packages: "निर्माण सामग्री एवं पैकेज",
      unlockBOQ: "18-पृष्ठों की विस्तृत BOQ रिपोर्ट पाएं",
      grandTotal: "कुल अनुमानित निर्माण लागत",
      tolerance: "सहनशीलता ±8%",
      estimatedDuration: "अनुमानित समय: 9.5 – 11 महीने",
      loanEmi: "अनुमानित गृह ऋण ईएमआई",
    },
    footer: {
      tagline: "बैंगलोर का विश्वसनीय टर्नकी सिविल इंजीनियरिंग एवं प्रीमियम आवासीय निर्माण संस्थान। रेरा-अनुपालन, वास्तु सम्मत विला और समयबद्ध डिलीवरी।",
      corporateOffice: "प्रेस्टीज मेरिडियन, 8वीं मंजिल, 29 एम.जी. रोड, बेंगलुरु, कर्नाटक 560001",
      turnkeySolutions: "टर्नकी समाधान",
      primeLocalities: "प्रमुख क्षेत्र",
      governance: "प्रशासन एवं गुणवत्ता",
      rights: "© 2025 एसके कंस्ट्रक्शंस बैंगलोर प्राइवेट लिमिटेड। सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता नीति",
      terms: "टर्नकी एस्क्रो की शर्तें",
      structuralWarranty: "10-वर्षीय संरचनात्मक वारंटी",
    },
    common: {
      sqft: "वर्ग फुट",
      crore: "करोड़",
      lakh: "लाख",
      callNow: "कॉल करें",
      chatWhatsApp: "व्हाट्सएप चैट",
      getQuote: "कोटेशन पाएं",
      dpdpConsent: "मैं एसके कंस्ट्रक्शंस को कॉल/व्हाट्सएप के माध्यम से मुझसे संपर्क करने की सहमति देता हूं। भारत के डीपीडीपी अधिनियम के तहत संरक्षित।",
      submit: "अनुरोध भेजें",
      viewCaseStudy: "केस स्टडी देखें",
    },
  },
};
