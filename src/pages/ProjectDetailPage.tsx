import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projectsData";

interface ProjectDetailPageProps {
  onOpenQuoteModal?: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const allImages = [
    { url: project.heroImage, caption: project.title, alt: project.title },
    ...(project.galleryImages || []),
  ];

  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-14 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/projects" className="text-white/60 hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-secondary">{project.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded bg-secondary text-primary text-xs font-mono font-bold uppercase tracking-wider">
              {project.statusLabel}
            </span>
            <span className="px-3 py-1 rounded bg-white/10 text-white text-xs font-mono border border-white/20">
              📍 {project.locality}
            </span>
            <span className="px-3 py-1 rounded bg-white/10 text-white text-xs font-mono border border-white/20">
              🏷️ {project.typeLabel}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Total Built-Up Area</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">{project.builtUpAreaSqFt.toLocaleString('en-IN')} sq.ft</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Plot Dimension</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">{project.plotSize}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Execution Time</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">{project.timelineMonths} Months</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Turnkey Budget</div>
              <div className="text-xl sm:text-2xl font-black text-secondary font-mono mt-0.5">{project.investmentDisplay}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-surface rounded-2xl border border-outline-variant overflow-hidden p-4 sm:p-6 shadow-sm">
          {/* Main Active Image */}
          <div className="relative h-80 sm:h-[480px] rounded-xl overflow-hidden bg-primary mb-4">
            <img
              src={allImages[activeImageIndex]?.url}
              alt={allImages[activeImageIndex]?.alt || project.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur px-3 py-1.5 rounded text-white text-xs font-mono border border-white/10">
              {allImages[activeImageIndex]?.caption || `Photo ${activeImageIndex + 1} of ${allImages.length}`}
            </div>
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? "border-secondary scale-102" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Engineering Blueprint & Specs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview Card */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-4">Engineering Scope & Architectural Concept</h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant">
                  <div className="text-xs font-mono uppercase text-secondary font-bold mb-1">Site Challenge</div>
                  <p className="text-xs text-on-surface-variant">{project.challenge}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant">
                  <div className="text-xs font-mono uppercase text-secondary font-bold mb-1">Engineering Solution</div>
                  <p className="text-xs text-on-surface-variant">{project.solution}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant">
                  <div className="text-xs font-mono uppercase text-secondary font-bold mb-1">Outcome</div>
                  <p className="text-xs text-on-surface-variant">{project.result}</p>
                </div>
              </div>

              <h3 className="font-bold text-primary text-base mb-3 font-mono uppercase tracking-wider text-xs">
                Key Architectural Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim border border-outline-variant text-xs text-primary font-medium">
                    <span className="text-secondary font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Approvals Audit */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <h2 className="text-2xl font-black text-primary mb-4">Municipal Sanctions & Material Audits</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant font-mono text-xs">
                  <div className="text-[10px] text-on-surface-variant uppercase">Site Location & Zone</div>
                  <div className="text-primary font-bold text-sm mt-0.5">{project.address}</div>
                </div>
                <div className="p-4 rounded-xl bg-surface-dim border border-outline-variant font-mono text-xs">
                  <div className="text-[10px] text-on-surface-variant uppercase">Completion Timeline</div>
                  <div className="text-primary font-bold text-sm mt-0.5">{project.completionDate}</div>
                </div>
              </div>

              <h4 className="text-xs font-mono uppercase text-primary font-bold mb-3">Audited Materials On Site</h4>
              <div className="flex flex-wrap gap-2">
                {project.materialsAudited.map((mat, mIdx) => (
                  <span key={mIdx} className="px-3 py-1 rounded-lg bg-surface-dim border border-outline-variant text-xs font-mono text-on-surface-variant">
                    🛡️ {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Testimonial if present */}
            {project.clientTestimonial && (
              <div className="bg-primary text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                <div className="text-secondary text-4xl font-serif">“</div>
                <p className="text-sm sm:text-base text-white/90 italic leading-relaxed mb-4">
                  {project.clientTestimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-primary font-bold flex items-center justify-center font-mono">
                    {project.clientTestimonial.avatarInitials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{project.clientTestimonial.clientName}</div>
                    <div className="text-xs text-white/60 font-mono">{project.clientTestimonial.designation}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: CTA & Action Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sm:p-8">
              <span className="text-xs font-mono uppercase text-secondary font-bold">Inspired by this project?</span>
              <h3 className="text-xl font-black text-primary mt-1 mb-2">Build a Similar Home</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                We can adapt this design to your specific plot dimensions, soil bearing capacity, and Vastu orientation anywhere in Bangalore.
              </p>

              <div className="space-y-3">
                <Link
                  to="/cost-calculator"
                  className="block text-center w-full py-3 rounded-lg bg-secondary text-primary font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary-hover transition-colors"
                >
                  Estimate Cost for My Plot
                </Link>
                <button
                  onClick={() => onOpenQuoteModal?.()}
                  className="block text-center w-full py-3 rounded-lg bg-primary text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Schedule Site Feasibility Visit
                </button>
              </div>
            </div>

            {/* Other Projects */}
            <div className="bg-surface rounded-2xl border border-outline-variant p-6">
              <h4 className="font-bold text-primary text-sm mb-3">Explore Other Projects</h4>
              <div className="space-y-3">
                {PROJECTS_DATA.filter((p) => p.slug !== project.slug).slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.slug}`}
                    className="flex gap-3 items-center group"
                  >
                    <img src={p.heroImage} alt={p.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {p.title}
                      </div>
                      <div className="text-[11px] font-mono text-on-surface-variant">
                        {p.locality} • {p.builtUpAreaSqFt.toLocaleString('en-IN')} sq.ft
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
