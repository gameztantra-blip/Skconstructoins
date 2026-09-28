import React from "react";
import { Link } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Legal</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
            India DPDP Act 2023 Compliant
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Privacy Policy & Data Protection Charter
          </h1>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-mono">
            Effective Date: January 1, 2026 • Last Reviewed: March 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-10 space-y-8 text-on-surface-variant text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">1. Overview & Commitment</h2>
            <p>
              SK Constructions ("we", "our", or "the Firm"), headquartered at {CONSTRUCTION_CONFIG.address.street}, {CONSTRUCTION_CONFIG.address.area}, Bangalore {CONSTRUCTION_CONFIG.address.pincode}, Karnataka, is committed to safeguarding the personal data of our prospective and enrolled home construction clients in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 of India.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">2. Data We Collect</h2>
            <p className="mb-3">
              We collect information explicitly provided by you when using our construction cost calculator, scheduling site feasibility visits, or requesting architectural consultation:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
              <li><strong>Contact Identifiers:</strong> Name, 10-digit Indian mobile number (+91), email address.</li>
              <li><strong>Plot & Project Details:</strong> Plot size (e.g. 30x40, 40x60), BBMP zonal ward, proposed floors, package preferences, and tentative budget.</li>
              <li><strong>Technical Logs:</strong> Referrer URL, UTM campaign tags, device browser metadata, and timestamps for session attribution.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">3. Purpose of Processing (Lawful Basis)</h2>
            <p className="mb-2">Your information is used strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Generating and sending itemized Bill of Quantities (BOQ) and architectural estimates.</li>
              <li>Coordinating with civil site engineers for plot soil feasibility visits.</li>
              <li>Providing project updates, milestone escrow notifications, and RERA/BBMP statutory disclosures.</li>
              <li>Complying with statutory records mandated by RERA Karnataka and GST authorities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">4. Zero-Sale Commitment</h2>
            <p>
              We maintain a strict zero-sale policy: SK Constructions will never sell, rent, or trade your phone number or project information to real estate brokers, interior lead aggregators, or unsolicited telemarketers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-3">5. Data Principal Rights</h2>
            <p className="mb-2">Under the DPDP Act 2023, you retain the following rights:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong>Right to Access:</strong> Request a summary of your personal data held by us.</li>
              <li><strong>Right to Correction & Erasure:</strong> Request rectification or deletion of your information once feasibility consultation concludes.</li>
              <li><strong>Right to Withdraw Consent:</strong> Opt out of WhatsApp status notifications by replying "STOP" or notifying our Grievance Officer.</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-surface-dim border border-outline-variant">
            <h3 className="text-base font-bold text-primary mb-2">6. Grievance Redressal Officer</h3>
            <p className="text-xs text-on-surface-variant mb-2">
              For any privacy queries, consent revocation, or data inquiries, contact our designated Data Protection Officer:
            </p>
            <div className="font-mono text-xs space-y-1 text-primary">
              <div><strong>Name:</strong> S. Karthik, Grievance Officer</div>
              <div><strong>Email:</strong> privacy@skconstructions-bangalore.com</div>
              <div><strong>Address:</strong> Level 7, Prestige Meridian 1, MG Road, Bangalore 560001</div>
              <div><strong>Response SLA:</strong> Within 48 business hours</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
