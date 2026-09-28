import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BLOGS_DATA, BlogPostItem } from "../data/blogsData";
import { FeaturedEngineeringReport } from "../components/FeaturedEngineeringReport";

interface BlogPageProps {
  onOpenConsultation?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenConsultation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Cost Benchmarks & BOQ");
  const [perspective, setPerspective] = useState<"homebuilder" | "technical">("technical");

  const filterCategories = [
    { label: "All Articles (84)", value: "All" },
    { label: "Cost Benchmarks & BOQ", value: "Cost Benchmarks & BOQ" },
    { label: "BBMP & BDA Approvals", value: "Legal & Approvals" },
    { label: "Vastu Architecture", value: "Vastu Engineering" },
    { label: "Home Loans & Escrow", value: "Home Loans & Escrow" },
    { label: "Structural Materials", value: "Structural Materials" },
    { label: "Design Ideas & Interior", value: "Design Ideas & Interior" },
  ];

  const filteredPosts = BLOGS_DATA.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === "All") return matchesSearch;
    if (activeCategory === "Cost Benchmarks & BOQ") {
      return matchesSearch && (post.category === "Contracts & Cost" || post.isFeatured);
    }
    return matchesSearch && post.category === activeCategory;
  });

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Knowledge Hub Banner */}
      <section className="bg-white border-b border-[#dee3ec] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#74777f] mb-4">
            <Link to="/" className="hover:text-[#04060a] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#04060a] transition-colors">Construction Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#04060a] font-medium">Technical Guides & Insights</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-block px-2.5 py-1 rounded bg-[#eff4fe] text-[#04060a] border border-[#dee3ec] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                RERA & STRUCTURAL ENGINEERING ARCHIVES
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#04060a] tracking-tight mb-3">
                Bangalore Construction & Engineering Knowledge Hub
              </h1>
              <p className="text-sm sm:text-base text-[#44474f] leading-relaxed">
                Transparent civil engineering blueprints, BBMP bye-law decoding, cost benchmarks, and modern Vastu science for Bangalore homeowners.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 bg-[#eff4fe] p-3.5 rounded-2xl border border-[#dee3ec] shrink-0 font-mono text-center">
              <div className="px-3 border-r border-[#dee3ec]">
                <div className="text-2xl font-black text-[#04060a]">84</div>
                <div className="text-[10px] uppercase text-[#74777f]">ENGINEERING GUIDES</div>
              </div>
              <div className="px-3">
                <div className="text-2xl font-black text-[#e07a2f]">Q4 2024</div>
                <div className="text-[10px] uppercase text-[#74777f]">RATES UPDATED</div>
              </div>
            </div>
          </div>

          {/* Search Bar & Perspective Selector */}
          <div className="mt-8 pt-6 border-t border-[#dee3ec]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Field */}
              <div className="relative w-full md:max-w-lg">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#74777f]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search 80+ engineering articles, building guides, bye-laws..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#dee3ec] bg-[#eff4fe]/50 text-xs sm:text-sm text-[#04060a] focus:bg-white focus:outline-none focus:border-[#e07a2f] transition-all"
                />
              </div>

              {/* Perspective Selector Toggle */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#74777f]">Perspective:</span>
                <div className="flex bg-[#eff4fe] p-1 rounded-xl border border-[#dee3ec]">
                  <button
                    onClick={() => setPerspective("homebuilder")}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      perspective === "homebuilder"
                        ? "bg-white text-[#04060a] font-bold shadow-sm"
                        : "text-[#44474f] hover:text-[#04060a]"
                    }`}
                  >
                    Regular Homebuilder
                  </button>
                  <button
                    onClick={() => setPerspective("technical")}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                      perspective === "technical"
                        ? "bg-[#04060a] text-white font-bold shadow-sm"
                        : "text-[#44474f] hover:text-[#04060a]"
                    }`}
                  >
                    Technical/Engineering Spec
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#dee3ec]">
              {filterCategories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#04060a] text-white shadow-sm"
                        : "bg-white text-[#44474f] hover:bg-[#eff4fe] hover:text-[#04060a] border border-[#dee3ec]"
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#e07a2f]" />}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10">
        {/* If viewing the flagship report category or no search applied, show the featured 1:1 Stitch report! */}
        {activeCategory === "Cost Benchmarks & BOQ" && !searchQuery ? (
          <FeaturedEngineeringReport onOpenConsultation={onOpenConsultation} />
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#dee3ec]">
              <span className="text-xs font-mono text-[#74777f] uppercase font-bold">
                Showing {filteredPosts.length} Engineering Guides
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post: BlogPostItem) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-[#dee3ec] overflow-hidden hover:shadow-lg hover:border-[#04060a] transition-all flex flex-col group"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-[#04060a]/90 text-white font-mono text-[10px] uppercase font-bold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#74777f] mb-2">
                        <span>{post.publishDate}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-[#04060a] text-base group-hover:text-[#e07a2f] transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#44474f] leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#dee3ec] flex items-center justify-between mt-4">
                      <span className="text-xs font-mono text-[#74777f]">
                        By {post.author.name}
                      </span>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#e07a2f] hover:underline"
                      >
                        <span>Read Spec</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
