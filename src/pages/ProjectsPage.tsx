import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS_DATA, ProjectItem } from "../data/projectsData";

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = ["All", "Residential", "Commercial", "Ongoing Sites"];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Ongoing Sites") return project.status === "ongoing";
    if (activeFilter === "Residential") return project.type === "residential";
    if (activeFilter === "Commercial") return project.type === "commercial";
    return true;
  });

  return (
    <div className="bg-surface-dim min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 sm:py-24 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-secondary uppercase mb-3">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary">Portfolio</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-xs font-mono uppercase tracking-wider mb-4">
            Executed Construction Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Landmark Construction Projects in Bangalore
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            Explore our delivered custom villas, G+3 duplex homes, and steel commercial edifices across Indiranagar, Whitefield, HSR Layout, Sarjapur, and Hebbal. 100% BBMP sanctioned with zero deviations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Delivered Area</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">14.8 Lakh sq.ft</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">On-Time Track Record</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">99.2%</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Active Work Sites</div>
              <div className="text-xl sm:text-2xl font-black text-secondary font-mono mt-0.5">18 Projects</div>
            </div>
            <div>
              <div className="text-xs font-mono text-white/50 uppercase">Average Client Rating</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">4.9 / 5.0 (Google)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-outline-variant pb-4">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-primary text-secondary shadow-md"
                  : "bg-surface text-on-surface-variant hover:bg-surface-variant hover:text-primary border border-outline-variant"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              className="group bg-surface rounded-2xl border border-outline-variant overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-64 overflow-hidden bg-primary">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase tracking-wider ${
                    project.status === "completed"
                      ? "bg-emerald-500/90 text-white"
                      : "bg-secondary text-primary"
                  }`}>
                    {project.statusLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-primary/80 backdrop-blur text-white text-[11px] font-mono border border-white/20">
                    {project.locality}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-secondary">
                    {project.typeLabel}
                  </span>
                  <h3 className="text-xl font-black text-white group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-dim border border-outline-variant mb-6 text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Built-Up Area</div>
                      <div className="font-bold text-primary">{project.builtUpAreaSqFt.toLocaleString('en-IN')} sq.ft</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Plot Dimension</div>
                      <div className="font-bold text-primary">{project.plotSize}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Execution Time</div>
                      <div className="font-bold text-primary">{project.timelineMonths} Months</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-on-surface-variant uppercase">Project Value</div>
                      <div className="font-bold text-secondary">{project.investmentDisplay}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
                  <span className="text-xs font-mono text-on-surface-variant">
                    {project.completionYear} Delivery
                  </span>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary hover:text-secondary uppercase tracking-wider"
                  >
                    <span>View Case Study</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
