import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CONSTRUCTION_CONFIG } from "../config/constructionConfig";
import { isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

interface ContactPageProps {
  onOpenThankYou?: (name: string, leadId: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenThankYou }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [locality, setLocality] = useState("Indiranagar / East Bangalore");
  const [service, setService] = useState("Turnkey Villa Construction");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [consentError, setConsentError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPhone(phone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number");
      return;
    }
    if (!consent) {
      setConsentError("Please accept the DPDP consent terms to proceed.");
      return;
    }
    setPhoneError("");
    setConsentError("");
    setSubmitting(true);

    try {
      const res = await submitLead({
        name,
        phone,
        email,
        city: "Bangalore",
        service,
        sourcePage: "/contact",
        notes: `Locality: ${locality}. Message: ${message}`,
      });
      setSubmitting(false);
      onOpenThankYou?.(name, res.leadId);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Contact Us</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
            Prestige Meridian, MG Road Office
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Connect with Our Engineering Office
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            Schedule a confidential site feasibility consultation, review BBMP building plan bylaws for your specific plot, or tour an active ongoing construction site in Bangalore.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-primary mb-6">Corporate Headquarters</h2>
              
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-dim border border-outline-variant flex items-center justify-center text-secondary text-lg shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-on-surface-variant font-bold">Office Address</div>
                    <div className="font-bold text-primary mt-0.5">{CONSTRUCTION_CONFIG.address.street}</div>
                    <div className="text-xs text-on-surface-variant">{CONSTRUCTION_CONFIG.address.area}</div>
                    <div className="text-xs text-on-surface-variant">{CONSTRUCTION_CONFIG.address.city}, {CONSTRUCTION_CONFIG.address.state} - {CONSTRUCTION_CONFIG.address.pincode}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-dim border border-outline-variant flex items-center justify-center text-secondary text-lg shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-on-surface-variant font-bold">Direct Phone Line</div>
                    <a href={`tel:${CONSTRUCTION_CONFIG.phonePrimary}`} className="font-mono font-bold text-primary hover:text-secondary block mt-0.5">
                      {CONSTRUCTION_CONFIG.phonePrimary}
                    </a>
                    <a href={`tel:${CONSTRUCTION_CONFIG.phoneSecondary}`} className="font-mono text-xs text-on-surface-variant hover:text-primary block">
                      {CONSTRUCTION_CONFIG.phoneSecondary} (NRI Desk)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-dim border border-outline-variant flex items-center justify-center text-emerald-500 text-lg shrink-0">
                    💬
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-on-surface-variant font-bold">Instant WhatsApp</div>
                    <a
                      href={`https://wa.me/${CONSTRUCTION_CONFIG.whatsappNumber}?text=Hi%20SK%20Constructions,%20I%20would%20like%20to%20discuss%20a%20project%20in%20Bangalore`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-emerald-600 hover:underline block mt-0.5"
                    >
                      +91 98450 12345 (Chat Now)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-dim border border-outline-variant flex items-center justify-center text-secondary text-lg shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-on-surface-variant font-bold">Official Email</div>
                    <a href={`mailto:${CONSTRUCTION_CONFIG.emailPrimary}`} className="font-mono font-bold text-primary hover:text-secondary block mt-0.5">
                      {CONSTRUCTION_CONFIG.emailPrimary}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Governance Card */}
            <div className="bg-primary text-white rounded-2xl p-6 sm:p-8 border border-white/10">
              <span className="text-xs font-mono text-secondary uppercase font-bold">Legal Governance</span>
              <h3 className="text-lg font-bold mt-1 mb-4">Official Registrations</h3>
              <div className="space-y-3 text-xs font-mono text-white/80">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">RERA Karnataka:</span>
                  <span className="font-bold text-secondary">{CONSTRUCTION_CONFIG.reraNumber}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">GSTIN:</span>
                  <span className="font-bold text-white">{CONSTRUCTION_CONFIG.gstin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Quality System:</span>
                  <span className="font-bold text-white">{CONSTRUCTION_CONFIG.isoCertification}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-10 shadow-sm">
              <span className="text-xs font-mono uppercase text-secondary font-bold">
                Consultation Request
              </span>
              <h2 className="text-2xl font-black text-primary mt-1 mb-2">
                Book a Site Feasibility Assessment
              </h2>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Meet our senior civil engineers at our MG Road office or request an on-plot survey anywhere across Greater Bangalore.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rao"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      WhatsApp Mobile *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-variant text-xs font-mono font-bold text-on-surface-variant">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ""));
                          if (phoneError) setPhoneError("");
                        }}
                        className="w-full px-3.5 py-2.5 rounded-r-lg border border-outline-variant bg-surface-dim text-sm text-primary font-mono focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                      />
                    </div>
                    {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="vikram@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                      Bangalore Locality
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                    >
                      <option value="Indiranagar / East Bangalore">Indiranagar / East Bangalore</option>
                      <option value="Whitefield / ITPL Corridor">Whitefield / ITPL Corridor</option>
                      <option value="HSR Layout / Koramangala">HSR Layout / Koramangala</option>
                      <option value="Sarjapur Road / Bellandur">Sarjapur Road / Bellandur</option>
                      <option value="Hebbal / North Bangalore">Hebbal / North Bangalore</option>
                      <option value="JP Nagar / Jayanagar / South">JP Nagar / Jayanagar / South</option>
                      <option value="Other Bangalore Locality">Other Bangalore Locality</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    Construction Scope
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  >
                    <option value="Turnkey Villa Construction">Turnkey Villa Construction</option>
                    <option value="High-Yield G+4 Duplex Residence">High-Yield G+4 Duplex Residence</option>
                    <option value="Commercial PEB & Office Building">Commercial PEB & Office Building</option>
                    <option value="BBMP Sanction & Structural Plan Only">BBMP Sanction & Structural Plan Only</option>
                    <option value="Structural Renovation">Structural Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    Plot Dimensions & Project Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide plot dimension (e.g. 30x40, 40x60), current condition (vacant, old structure to demolish), and tentative start timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none resize-none"
                  />
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="contactConsent"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (consentError) setConsentError("");
                    }}
                    className="mt-1 rounded text-secondary focus:ring-secondary border-outline-variant"
                  />
                  <label htmlFor="contactConsent" className="text-xs text-on-surface-variant leading-relaxed">
                    I consent to SK Constructions processing my phone and details under India's Digital Personal Data Protection (DPDP) Act 2023 for project estimation.
                  </label>
                </div>
                {consentError && <p className="text-xs text-red-500 font-medium">{consentError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-lg bg-primary text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary hover:text-primary transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Sending Request..." : "Schedule Engineering Consultation"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
