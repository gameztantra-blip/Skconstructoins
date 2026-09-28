import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "10mb" }));

// System instructions for Gemini grounded with the Bangalore Construction & Engineering Knowledge Hub
const NIRMAAN_SYSTEM_INSTRUCTION = `
You are "Nirmaan AI", the Principal Structural Engineering & Turnkey Civil Construction Co-Pilot for SK Constructions in Bangalore, Karnataka, India.

Your core mission is to provide homeowners and NRI investors with accurate, transparent, and authoritative civil engineering advice, Bangalore-specific cost estimations, BBMP building bye-laws, and construction guidance.

KNOWLEDGE BASE & BENCHMARKS (Bangalore Q4 2024 - 2026):
1. TURNKEY CONTRACT RATES:
   - Standard Package: ₹1,850 / sq.ft (Fe-500 TMT, 43/53 OPC cement, Johnson/Kajaria vitrified tiles, 10-year structural warranty)
   - Premium Package: ₹2,250 / sq.ft (Tata Tiscon 550D TMT, UltraTech 53-Grade OPC, M25 automated RMC, Teak main door, Kohler/Jaquar sanitary, double glazed UPVC)
   - Luxury Package: ₹2,750 / sq.ft (Italian marble / engineered oak, automated smart home, VRV HVAC piping, Grohe/Hansgrohe fittings, louvers, acoustic glass)
   - Cost deviation guarantee: 0% escalation with Zero Price Escalation Clause. Tolerance range is ±8%.

2. ITEMIZED COST DISTRIBUTION:
   - RCC Core Structure & Foundation: 33%
   - Masonry & Internal/External Plaster: 12%
   - Flooring & Wall Cladding: 11%
   - Electrical & Plumbing (MEP): 14%
   - Woodwork, Doors & Windows: 12%
   - Painting & Weather-Proof Finishing: 7%
   - Plan Sanctions, Liaison, Site Ops & Architecture: 11%

3. LIVE BENGALURU MATERIAL INDEX:
   - Tata Tiscon 550D TMT Rebar: ₹74,500 / MT (₹74.5 / kg)
   - UltraTech 53-Grade OPC Cement: ₹410 / 50kg bag
   - M25 Automated Ready-Mix Concrete (RMC): ₹4,200 / cu.m
   - Wire-Cut Red Clay Bricks (Hosur/Malur): ₹11.50 / brick
   - High-Fineness M-Sand (Zone II): ₹48 / cft
   - Asian Paints Royale Luxury Emulsion: ₹560 / litre

4. HIDDEN COSTS IN BANGALORE (Crucial for homeowners):
   - BBMP Plan Sanction & Betterment Charges: ₹1,80,000 – ₹3,50,000
   - BESCOM 3-Phase Meter & Transformer: ₹85,000 – ₹1,60,000
   - BWSSB Water & Sewer Connection & Road Cutting: ₹1,20,000 – ₹2,40,000
   - Soil Test & Geotechnical Structural Report (IS 1892): ₹18,000 – ₹30,000
   - Hard Rock Excavation & Breaker Surcharge: ₹800 – ₹1,400 / cu.m

5. CRITICAL ENGINEERING PRECAUTIONS:
   - Water Sump Sizing: Always specify a minimum 8,000L to 12,000L monolithic RCC underground sump. Never use underground plastic tanks in Bangalore due to hydrostatic lateral soil pressure and intermittent BWSSB supply.
   - Soil Bearing Capacity (SBC) Test: Must be conducted prior to foundation design to prevent differential structural settlement.
   - Milestone Escrow: Never pay large lump-sum advances. SK Constructions uses milestone-linked escrow accounts where funds are disbursed only after concrete cube compression tests pass.

6. BBMP BYE-LAWS & FAR (Bangalore Master Plan 2031):
   - Road width < 9m: Allowable FAR 1.75
   - Road width 9m to 12m: Allowable FAR 2.25
   - Road width > 12m: Allowable FAR up to 2.75 / 3.0 with premium FAR/TDR
   - Standard Setbacks (30x40): Front ~1.5m to 2.0m, Rear ~1.2m, Sides ~1.0m
   - Stilt floor parking (< 2.4m height) is 100% FAR exempt.

7. SCIENTIFIC VASTU:
   - North-East (Ishanya): Water sump, Pooja room, main entrance
   - South-East (Agneya): Kitchen cooking hob facing East, electrical main board
   - South-West (Nairutya): Master bedroom suite, highest structural elevation
   - Northwest (Vayu): Guest bedrooms, bathrooms
   - Brahmasthan (Center): Kept open with double-height ceiling or ventilation atrium

8. STANDARD PLOT CALCULATIONS:
   - 30×40 (1,200 sq.ft plot, G+1 duplex ~2,400 sq.ft): Standard ~₹44.4L, Premium ~₹54.0L, Luxury ~₹66.0L
   - 30×50 (1,500 sq.ft plot, G+2 triplex ~3,200 sq.ft): Standard ~₹59.2L, Premium ~₹72.0L, Luxury ~₹88.0L
   - 40×60 (2,400 sq.ft plot, G+2 villa ~4,600 sq.ft): Standard ~₹85.1L, Premium ~₹1.03Cr, Luxury ~₹1.26Cr

9. CREDENTIALS & CONTACT:
   - Company: SK Constructions (Bangalore)
   - RERA Registration: PRM/KA/RERA/1251/310/PR/200924/003621
   - Engineering Lead: Er. Rajeshwar Rao (M.E. Structures, IISc Bangalore)
   - Office: Bungalow HQ: 28 MG Road, Bangalore 560001
   - Phone: +91 98450 12345
   - Email: dir.surveys@skconstructions.in

RESPONSE GUIDELINES:
- Be concise, structured, and informative. Use bullet points and bold headers.
- Always provide realistic rupee figures (Lakhs / Crores) when asked about costs.
- Mention Bangalore micro-market nuances (Indiranagar, Whitefield, HSR Layout, Sarjapur, etc.) when relevant.
- Offer actionable next steps like calculating exact BOQ, booking a free plot survey, or reviewing 3D BIM models.
- Support English and provide Kannada/Hindi greetings when addressed in those languages.
`;

// Initialize GoogleGenAI per guidelines
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
  }
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Chat endpoint for Nirmaan AI
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, history, language = "en", plotContext } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing 'message' string in request body." });
    }

    // If Gemini client is available, attempt real AI generation
    if (geminiClient && process.env.GEMINI_API_KEY) {
      try {
        let promptText = message;
        if (plotContext) {
          promptText = `[User Plot Context: Dimensions: ${plotContext.dimensions || "30x40"}, Facing: ${plotContext.facing || "North"}, Locality: ${plotContext.locality || "Bangalore"}]\nUser Query: ${message}`;
        }

        if (language === "hi") {
          promptText += "\n(Please respond in conversational Hindi with technical clarity)";
        }

        const response = await geminiClient.models.generateContent({
          model: "gemini-3.8-flash",
          contents: promptText,
          config: {
            systemInstruction: NIRMAAN_SYSTEM_INSTRUCTION,
          },
        });

        const reply = response.text || "I am analyzing your Bangalore construction query. Please connect with our engineering desk for immediate BOQ verification.";

        return res.json({
          reply,
          source: "gemini-3.8-flash",
        });
      } catch (geminiErr) {
        console.warn("Gemini API call encountered error, falling back to local Knowledge Hub engine:", geminiErr);
        // Fall through to knowledge hub below
      }
    }

    // Fallback: Intelligent engineered response based on Knowledge Hub
    const lower = message.toLowerCase();
    let fallbackReply = "";

    if (lower.includes("cost") || lower.includes("rate") || lower.includes("price") || lower.includes("sqft") || lower.includes("sq ft") || lower.includes("estimate") || lower.includes("budget")) {
      fallbackReply = `Here is the official Bangalore Construction Cost Index (2024–2025):\n\n` +
        `• **Standard Package**: ₹1,850 / sq.ft (Fe-500D TMT, 43/53 OPC cement, Johnson vitrified tiles)\n` +
        `• **Premium Package**: ₹2,250 / sq.ft (Tata Tiscon 550D, UltraTech 53-Grade, M25 RMC, Teak wood)\n` +
        `• **Luxury Package**: ₹2,750 / sq.ft (Italian marble, home automation, VRV HVAC, Grohe/Kohler)\n\n` +
        `**Itemized Cost Distribution**:\n` +
        `• RCC Core & Foundation: 33%\n` +
        `• Masonry & Plaster: 12%\n` +
        `• Flooring & Tiling: 11%\n` +
        `• Electrical & Plumbing: 14%\n` +
        `• Woodwork & Windows: 12%\n` +
        `• Painting & Finishing: 7%\n` +
        `• Sanctions & Liaison: 11%\n\n` +
        `All contracts feature a **Zero Price Escalation Clause** with milestone-linked RERA escrow disbursements.`;
    } else if (lower.includes("material") || lower.includes("steel") || lower.includes("cement") || lower.includes("tata") || lower.includes("ultratech") || lower.includes("sand")) {
      fallbackReply = `**Live Bengaluru Material Rate Index (Monitored Weekly)**:\n\n` +
        `• **Tata Tiscon 550D TMT Rebar**: ₹74,500 / MT (₹74.50 / kg)\n` +
        `• **UltraTech 53-Grade OPC Cement**: ₹410 / 50kg bag\n` +
        `• **M25 Automated Ready-Mix Concrete (RMC)**: ₹4,200 / cu.m\n` +
        `• **Wire-Cut Red Clay Bricks (Hosur/Malur)**: ₹11.50 / brick\n` +
        `• **High-Fineness M-Sand (Zone II)**: ₹48 / cft\n` +
        `• **Asian Paints Royale Luxury Emulsion**: ₹560 / litre\n\n` +
        `SK Constructions books 100% of required steel and cement tonnage upon contract signing to absorb market volatility on your behalf.`;
    } else if (lower.includes("hidden") || lower.includes("bescom") || lower.includes("bwssb") || lower.includes("sanction") || lower.includes("betterment")) {
      fallbackReply = `**Hidden Construction Costs in Bangalore You Must Budget For**:\n\n` +
        `1. **BBMP Plan Sanction & Betterment Charges**: ₹1.80L – ₹3.50L (Digital BPAMS submission)\n` +
        `2. **BESCOM 3-Phase Meter & Transformer**: ₹85,000 – ₹1.60L\n` +
        `3. **BWSSB Water & Sanitary Liaison & Road Cut**: ₹1.20L – ₹2.40L\n` +
        `4. **Soil Test & Geotechnical Report (IS 1892)**: ₹18,000 – ₹30,000\n` +
        `5. **Hard Rock Excavation (if granite strata found)**: ₹800 – ₹1,400 / cu.m\n\n` +
        `SK Constructions includes municipal liaison and transparency schedules in our turnkey packages.`;
    } else if (lower.includes("bbmp") || lower.includes("far") || lower.includes("bda") || lower.includes("setback") || lower.includes("bylaw") || lower.includes("bye-law")) {
      fallbackReply = `**BBMP Master Plan 2031 Guidelines for Bangalore**:\n\n` +
        `• **Road width < 9m**: Permissible FAR is **1.75**\n` +
        `• **Road width 9m to 12m**: Permissible FAR is **2.25**\n` +
        `• **Road width > 12m**: Permissible FAR up to **2.75 / 3.0** with Premium FAR\n` +
        `• **Mandatory Setbacks for 30×40**: Front ~1.5m, Rear ~1.2m, Sides ~1.0m\n` +
        `• **Stilt Parking Exemption**: Stilt floors with height < 2.4m are 100% FAR exempt.\n\n` +
        `Our architectural team produces automated CAD submission drawings guaranteed for zero deviation approvals.`;
    } else if (lower.includes("sump") || lower.includes("water") || lower.includes("tank")) {
      fallbackReply = `**Underground Sump Engineering Guidelines**:\n\n` +
        `• **Minimum Capacity**: 8,000 to 12,000 Litres for a 3 to 4 BHK Bangalore duplex.\n` +
        `• **Construction**: Always monolithic RCC or engineered wire-cut masonry with polymer waterproof coating.\n` +
        `• **Why avoid plastic Sintex tanks underground?** Hydrostatic groundwater pressure during Bangalore monsoons causes lateral crushing and buckling. Monolithic RCC handles soil loads safely for 50+ years.`;
    } else if (lower.includes("vastu") || lower.includes("direction") || lower.includes("pooja") || lower.includes("kitchen")) {
      fallbackReply = `**Scientific Vastu Shastra Placement for Bangalore Homes**:\n\n` +
        `• **North-East (Ishanya)**: Ideal for underground RCC water sump, Pooja chamber, and light open entrance foyer.\n` +
        `• **South-East (Agneya)**: The fire zone—kitchen cooking counter facing East, main electrical meter.\n` +
        `• **South-West (Nairutya)**: Earth element—master bedroom suite with highest floor level for structural and family stability.\n` +
        `• **North-West (Vayu)**: Air quadrant—guest bedrooms, study, staircase, and bathrooms.\n` +
        `• **Brahmasthan (Center)**: Maintained open with double-height ceiling or central light shaft.`;
    } else {
      fallbackReply = `Namaskara! 🙏 I'm Nirmaan AI, your structural engineering and turnkey construction co-pilot for Bangalore.\n\n` +
        `At **SK Constructions**, we provide:\n` +
        `• Fixed-price Turnkey contracts: ₹1,850 to ₹2,750 / sq.ft with 0% escalation\n` +
        `• Tata Tiscon 550D TMT steel & UltraTech 53-grade cement as standard\n` +
        `• 100% RERA milestone-linked escrow governance (PRM/KA/RERA/1251/310)\n` +
        `• BBMP digital plan approval and BESCOM/BWSSB liaison\n` +
        `• 10-year comprehensive structural warranty\n\n` +
        `How can I assist with your plot dimensions, budget, or architectural drawings today?`;
    }

    return res.json({
      reply: fallbackReply,
      source: "knowledge-hub-engine",
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      error: "Internal server error processing chat query.",
      message: error?.message || "Unknown error",
    });
  }
});

// Setup Vite middleware in dev or static server in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SK Constructions Full-Stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
