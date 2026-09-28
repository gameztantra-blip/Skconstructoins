/**
 * Frequently Asked Questions (FAQ) Data
 * Comprehensive answers covering cost guarantees, BBMP sanctions, escrow safety, and warranties
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Cost & Payments" | "Approvals & Legal" | "Construction & Quality" | "NRI & Remote";
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-01",
    question: "How does the fixed-price guarantee protect against cement & steel price hikes?",
    answer: "Once our comprehensive turnkey contract is executed, the rates for your entire Bill of Quantities (BOQ) are legally locked. We hedge material costs through bulk direct procurement contracts with manufacturers like Tata Tiscon and UltraTech. Even if retail steel or cement prices surge by 20% during your 12-month build, your price per square foot remains 100% unaltered.",
    category: "Cost & Payments",
  },
  {
    id: "faq-02",
    question: "What is the typical completion timeline for a 3,000 sq.ft G+2 residence in Bangalore?",
    answer: "A standard 3,000 to 4,000 sq.ft G+2 villa takes approximately 9.5 to 11 months from the date of Bhoomi Pujan to final key handover. This includes 28 days for foundation curing, 21 days between successive slab castings for structural strength gain, and 3 months for fine plastering, electrical cabling, tiling, painting, and joinery snags.",
    category: "Construction & Quality",
  },
  {
    id: "faq-03",
    question: "Can you assist with BBMP / BDA building plan approvals and utility connections?",
    answer: "Yes. Our legal and liaisoning department assists with the entire municipal approval lifecycle: drafting sanctioned drawings according to BBMP bye-laws, obtaining building license certificates, arranging temporary BESCOM power connections, and securing BWSSB sanitary and water inlets.",
    category: "Approvals & Legal",
  },
  {
    id: "faq-04",
    question: "How can NRI clients monitor ongoing construction remotely?",
    answer: "Over 35% of our active projects belong to Non-Resident Indians residing in the US, UK, and Middle East. We provide a cloud dashboard and weekly HD video-call walkthroughs with your dedicated civil engineer. High-resolution daily CCTV photos, laboratory material testing reports, and invoice challans are logged systematically, allowing you to track progress across any time zone.",
    category: "NRI & Remote",
  },
  {
    id: "faq-05",
    question: "What bank loan assistance do you offer for residential plots and construction?",
    answer: "SK Constructions is an approved tier-1 builder with State Bank of India (SBI), HDFC Bank, ICICI Bank, and LIC Housing Finance. We supply the stamped technical estimation, legal title vetting documents, and architectural plans needed to expedite loan sanctioning with 0% builder processing charges.",
    category: "Cost & Payments",
  },
  {
    id: "faq-06",
    question: "What does the 10-year structural warranty cover?",
    answer: "Our 10-year structural warranty is a legally enforceable indemnity covering RCC footings, columns, beams, and slab integrity against structural cracks and foundational settlement. Additionally, we provide a 1-year complimentary defect liability warranty on plumbing line leakages, electrical short circuits, and terrace waterproofing membranes.",
    category: "Construction & Quality",
  },
  {
    id: "faq-07",
    question: "How does the milestone-linked escrow payment system protect my capital?",
    answer: "Rather than huge advance payments, payments are partitioned into 7 distinct verified stages (Excavation, Plinth Beam, Ground Slab, First Slab, Masonry, Finishing, Handover). Funds reside safely in a dedicated project escrow account and are disbursed only after third-party quality signoff.",
    category: "Cost & Payments",
  },
  {
    id: "faq-08",
    question: "Are interior modular woodwork and modular kitchens included?",
    answer: "The baseline package covers civil shell, waterproofing, full electrical cabling, CPVC plumbing, premium flooring, Fenesta soundproof windows, and architectural bathroom suites. Modular kitchens and custom wardrobes can be bundled via our in-house SK Interiors division at an audited factory-rate add-on.",
    category: "Cost & Payments",
  },
];
