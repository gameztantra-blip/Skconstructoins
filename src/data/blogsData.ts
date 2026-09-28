/**
 * Construction Knowledge & Engineering Articles
 * Targeted for Bangalore homeowners and NRI investors
 */

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: "Contracts & Cost" | "Legal & Approvals" | "Vastu Engineering" | "Quality & Civil" | "Home Loans & Escrow" | "Structural Materials";
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    initials: string;
    bio?: string;
  };
  summary: string;
  heroImage: string;
  content: string;
  isFeatured?: boolean;
}

export const FEATURED_REPORT_SLUG = "bangalore-construction-cost-per-sq-ft-2024-2025";

export const BLOGS_DATA: BlogPostItem[] = [
  {
    id: "blog-00",
    slug: "bangalore-construction-cost-per-sq-ft-2024-2025",
    title: "Bangalore Construction Cost per Sq Ft in 2024–2025: Complete Civil & Material Breakdown",
    category: "Contracts & Cost",
    readTime: "8 min read",
    publishDate: "Dec 14, 2024",
    author: {
      name: "Er. Rajeshwar Rao",
      role: "VP Structural Engineering • M.E. Structures, IISc Bangalore",
      initials: "RR",
      bio: "Er. Rao holds an M.E. in Structural Engineering from the Indian Institute of Science (IISc), Bangalore. With over 18 years of deep structural consultancy across Karnataka, he has supervised the execution of 450+ RCC residential and commercial structures with zero warranty defects.",
    },
    summary: "Comprehensive Bangalore house construction cost analysis. Live per-sq-ft rates for standard, premium, and luxury packages, BOQ allocation donut, BIS material trends, hidden escalation traps, and cost optimization strategies.",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    content: `
### Executive Briefing
Why traditional labor contracts in Bangalore end up 25% higher than turnkey fixed-price contracts. When sourcing separate labor contractors and buying retail building materials across Whitefield, HSR, or North Bangalore, property owners absorb standard retail logistics markups (12-15%), untracked site pilferage (5-8%), and hidden structural escalation clauses. A precision turnkey contract fixes the square-footage cost upfront, transferring bulk-procurement rebates directly to the homeowner.

### Current Per-Sq-Ft Benchmarks in Bangalore (2024–2025)
Based on executed contracts over Q3 and Q4 2024 across BBMP and BDA jurisdictional plots, residential construction in Bangalore scales into three calibrated tiers based on structural strength, electrical ratings, and luxury architectural finishes.

### Itemized Cost Distribution (Donut & BOQ Allocation)
Every rupee spent during residential construction in Karnataka maps to structural concrete, brick masonry, and internal infrastructure. Knowing where the capital flows prevents mid-project budget compromises.
- RCC Civil Structure & Masonry: 48%
- Finishes, Plaster & Flooring: 22%
- Concealed MEP (Plumbing & Electrical): 16%
- Doors, UPVC Glass & Exterior Paint: 14%

### Cement, Steel & Sand: Price Trends & BIS Grades
Bangalore sits in Seismic Zone II. While earthquake risks are moderate, the city's red clay and rocky strata require strict adherence to IS 456:2000 plain and reinforced concrete guidelines.

### Hidden Traps: Escalation Clauses & Water Curing Deficits
Contractor disputes during villa construction in Bangalore typically hinge on two factors: vague steel cost fluctuation formulas and negligent curing schedules that weaken load-bearing columns.

### How to Save 8–12% Without Cutting Quality
1. Optimize Beam Spans: Keep column spans under 16 feet to avoid expensive heavy RC / PT post-tensioned slabs, saving 7% on rebar tonnage.
2. Standardize Openings: Ordering standardized UPVC window profiles reduces custom cutting wastage and installation labor costs by ₹42,000.
3. Direct Factory Procuring: Source vitrified tiles directly from Morbi manufacturers via your turnkey partner to bypass dealer markups.
    `,
  },
  {
    id: "blog-01",
    slug: "bbmp-building-bye-laws-sanction-guide",
    title: "BBMP Building Bye-Laws 2024: Setback Rules for 30×40 & 30×50 Plots Explained",
    category: "Legal & Approvals",
    readTime: "8 min read",
    publishDate: "Oct 18, 2024",
    author: {
      name: "Ar. Sneha Kulkarni",
      role: "Chief Architect & Municipal Liaison Head",
      initials: "SK",
    },
    summary: "Deep-dive step calculation of front, rear, and side setbacks required to secure hassle-free Plan Sanction under BBMP Master Plan 2031 with full OC compliance.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeSntk1n-bVR7vNXaGFpDdgH6Z5jUgTFt-sESgcdB9TptKvduGf7nRpNaimpcpWBwPw5HOuxlC9pdcSoDaR2Kwu5ulZAHuRJuTzE-VmXDodnHpVlb30QNSv-7wGQZMe1ms2U1AH6acQVvEZUaWV7d69pTe-9gJdFbs_U8tFJZOJEbA9WN6erdR_uNjXX-10RVZr8jKcfVSRtXW7mVZ422DqROz3Kg40YT7HYvN5qaMRBFN0Cp1Vklz8A",
    content: `
Navigating Bangalore's Bruhat Bengaluru Mahanagara Palike (BBMP) building bye-laws requires precision. Building without a sanctioned plan risks notice issuance, demolition of non-compliant setbacks, and denial of the permanent BESCOM electricity meter.

### Key Factors for Sanction Approval
1. **Road Width and Allowable FAR:** Road width in front of your plot dictates the maximum Floor Area Ratio. Road widths under 9 meters permit an FAR of 1.75, while 9m to 12m roads allow up to 2.25.
2. **Mandatory Setbacks:** For a 30x40 site, standard setbacks are approximately 1.0m on the sides and 1.5m in the front/rear.
3. **Rainwater Harvesting (RWH):** Under BBMP mandate, every site exceeding 1,200 sq.ft must construct a percolation pit and dual filtration sump.
    `,
  },
  {
    id: "blog-02",
    slug: "scientific-vastu-shastra-modern-east-north-facing-homes",
    title: "Scientific Vastu Shastra for Modern East and North Facing Bangalore Homes",
    category: "Vastu Engineering",
    readTime: "5 min read",
    publishDate: "Sep 28, 2024",
    author: {
      name: "Er. Ramesh Narayan",
      role: "Senior Civil Engineer & Vastu Consultant",
      initials: "RN",
    },
    summary: "Harmonizing ancient orientation science with structural RCC column placements and modern cross-ventilation light shafts.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr6mCWN9PR4wPMMF5b7deHH80kcWHixSlGeK0qnQqqpyQ_hMuUK6T1YYICOXJQ1rfKceKu_QLGqawL2YSIrM-cGu8zeCZAmDu5J2DdYe-rCvhnKyOH-_JAnWysGMWzCr2BJd7dBzF25HIKkZrnKBK_41uniwzqo4uAkK__pHw9pggngd4KfAWBNqU3VD2fSzo1cyjD76ZN021W8X5PsFHeVxTNZ7EMqv_AdV8KN6tF5Y2DX6brT2Lh9Q",
    content: `
Many homeowners fear that strict Vastu compliance forces outdated, dark layouts. At SK Constructions, we practice 'Vastu Engineering'—retaining timeless spatial energy principles while maximizing Scandinavian light and natural airflow.

### The 4 Pillars of Contemporary Vastu
- **Ishanya (North-East):** The zone of water and divine wisdom. Ideal for light entrance foyers, water features, and open Pooja prayer spaces.
- **Agneya (South-East):** The fire element. Strictly designated for the kitchen and electrical distribution boards.
- **Nairutya (South-West):** The earth element. Designated for the master suite to confer grounding authority to the head of the family.
- **Brahmasthan (Center):** Kept open and unobstructed. In our duplex villas, we frequently design a 22-foot double-height skylit atrium here.
    `,
  },
  {
    id: "blog-03",
    slug: "escrow-vs-milestone-advances-protect-capital",
    title: "Escrow vs Milestone Advances: How to Protect Your Capital During Home Construction",
    category: "Home Loans & Escrow",
    readTime: "7 min read",
    publishDate: "Sep 14, 2024",
    author: {
      name: "Er. Vikram Oberoi",
      role: "Managing Director & Principal Structural Engineer",
      initials: "VO",
    },
    summary: "Why smart homeowners bar contractor payments until concrete cube compression reports clear verified milestone completion.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4UorjuH4T29fuawDhqbnldNBfmPOy1pIDNVH4fjSgaJcJbIm-WqnihqAQatBsXzQLfARsHjSoo3R4oO5E4mLwfp02ALUYSoULGUKRKjGRWjhXZtISOUNKN3-kVE58Dsd9f9RIrVh_ZN7gZmmXbK_tYWKtInzt7hDDKAyZop1S1Rf3Th2Y7Fzcss4EJLWchJj4f0a49fQRH4qeWHP6lmzDFdg1DyD9Tt_9miBgWJYCiWLxIYMBmcQ-6A",
    content: `
Building a home in Bangalore has historically been fraught with contractor friction. In an item-rate or labor-only contract, the client assumes 100% of the material price fluctuation risk, delivery delays, theft on site, and quality variance.

### Why Fixed-Price Turnkey Wins
Under a legally binding turnkey agreement with SK Constructions:
1. **Zero Price Escalation:** The quoted rate (e.g. ₹2,250/sq.ft) is locked. Even if market steel rises from ₹62/kg to ₹75/kg, our firm absorbs the margin.
2. **One Accountable Entity:** Single point of responsibility for civil integrity, waterproofing, electrical conduits, and BBMP sanction compliance.
3. **Escrow Protected Milestones:** Funds reside safely in a project escrow account and are disbursed only after third-party structural cube tests clear.
    `,
  },
];
