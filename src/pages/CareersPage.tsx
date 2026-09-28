import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isValidIndianPhone } from "../utils/formatters";
import { submitLead } from "../services/leadService";

interface CareersPageProps {
  onOpenThankYou?: (name: string, leadId: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenThankYou }) => {
  const [selectedRole, setSelectedRole] = useState("Project Civil Engineer (Site Execution)");
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [experience, setExperience] = useState("3-5 Years");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const jobs = [
    {
      title: "Project Civil Engineer (Residential Site Execution)",
      experience: "3-6 Years",
      location: "Indiranagar / Whitefield, Bangalore",
      type: "Full-Time",
      description: "Supervise daily RCC slab pours, shuttering alignment, rebar spacing audits, slump cone tests, and contractor labor deployment.",
    },
    {
      title: "Senior Structural BIM Specialist (Revit / Tekla)",
      experience: "4-7 Years",
      location: "MG Road HQ, Bangalore",
      type: "Full-Time",
      description: "Convert architectural drawings to 3D Revit models, generate structural rebar detailing schedules, and perform clash detections.",
    },
    {
      title: "MEP Project Coordinator (Plumbing & Electrical)",
      experience: "3-5 Years",
      location: "Bangalore Sites",
      type: "Full-Time",
      description: "Oversee internal CPVC/SWR plumbing routing, conduit laying, electrical distribution boards, and solar net-metering installations.",
    },
    {
      title: "Client Relationship Manager (Turnkey Contracts)",
      experience: "2-5 Years",
      location: "MG Road HQ, Bangalore",
      type: "Full-Time",
      description: "Guide prospective villa owners through our 4-step BOQ calculator, escrow tranches, BBMP approvals, and weekly site status updates.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidIndianPhone(applicantPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number");
      return;
    }
    setPhoneError("");
    setSubmitting(true);

    try {
      const res = await submitLead({
        name: applicantName,
        phone: applicantPhone,
        email: applicantEmail,
        service: `Career Application: ${selectedRole} (${experience})`,
        sourcePage: "/careers",
      });
      setSubmitting(false);
      onOpenThankYou?.(applicantName, res.leadId);
      setApplicantName("");
      setApplicantPhone("");
      setApplicantEmail("");
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
            <span className="text-secondary">Careers</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
            Join Our Engineering Guild
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Build Bangalore's Next Generation of Homes
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            We are hiring civil engineers, structural detailers, MEP managers, and construction architects who share our obsession with zero-deviation quality and ethical engineering.
          </p>
        </div>
      </section>

      {/* Jobs Grid & Application Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Job Openings */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-black text-primary mb-2">Open Engineering Roles</h2>
            <p className="text-sm text-on-surface-variant mb-6">
              All positions include performance bonuses linked to on-time milestone delivery, comprehensive health insurance, and structured career progression.
            </p>

            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface border border-outline-variant hover:border-primary/40 transition-colors shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-primary text-base">{job.title}</h3>
                    <span className="px-2.5 py-0.5 rounded bg-surface-dim border border-outline-variant font-mono text-xs text-secondary font-bold">
                      {job.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant mb-3">
                    <span>📍 {job.location}</span>
                    <span>⏱️ {job.type}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    {job.description}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRole(job.title);
                      window.scrollTo({ top: 600, behavior: "smooth" });
                    }}
                    className="text-xs font-mono font-bold text-secondary hover:text-secondary-hover uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply for this position</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Application Form */}
          <div className="lg:col-span-5">
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-md sticky top-24">
              <span className="text-xs font-mono uppercase text-secondary font-bold">Direct HR Channel</span>
              <h3 className="text-xl font-black text-primary mt-1 mb-2">Submit Your Resume</h3>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Applying for: <strong className="text-primary">{selectedRole}</strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    Target Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  >
                    {jobs.map((j) => (
                      <option key={j.title} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohith Gowda"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    WhatsApp Phone Number
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
                      value={applicantPhone}
                      onChange={(e) => {
                        setApplicantPhone(e.target.value.replace(/\D/g, ""));
                        if (phoneError) setPhoneError("");
                      }}
                      className="w-full px-3.5 py-2.5 rounded-r-lg border border-outline-variant bg-surface-dim text-sm text-primary font-mono focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                    />
                  </div>
                  {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-sm text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
                    Relevant Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant bg-surface-dim text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  >
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="6-9 Years">6-9 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-primary text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary hover:text-primary transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit Application"}
                </button>

                <p className="text-[10px] text-on-surface-variant text-center leading-tight">
                  Your credentials are protected under India DPDP Act and used solely for recruitment evaluation.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
