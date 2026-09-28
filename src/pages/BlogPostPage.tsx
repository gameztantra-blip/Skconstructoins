import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { BLOGS_DATA, FEATURED_REPORT_SLUG } from "../data/blogsData";
import { FeaturedEngineeringReport } from "../components/FeaturedEngineeringReport";

interface BlogPostPageProps {
  onOpenConsultation?: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenConsultation }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOGS_DATA.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // If this is the flagship featured report, render the comprehensive Stitch design
  if (post.slug === FEATURED_REPORT_SLUG || post.isFeatured) {
    return (
      <div className="bg-[#f8f9fa] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#74777f] mb-6">
            <Link to="/" className="hover:text-[#04060a] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#04060a] transition-colors">Construction Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#04060a] font-medium">Cost Benchmarks</span>
          </div>

          <FeaturedEngineeringReport onOpenConsultation={onOpenConsultation} />
        </div>
      </div>
    );
  }

  // Split content by headings or double newlines for other posts
  const contentBlocks = post.content.trim().split("\n\n");

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-white border-b border-[#dee3ec] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#74777f] mb-4">
            <Link to="/" className="hover:text-[#04060a] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#04060a] transition-colors">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#04060a]">{post.category}</span>
          </div>

          <span className="inline-block px-2.5 py-1 rounded bg-[#eff4fe] text-[#04060a] border border-[#dee3ec] text-[11px] font-mono uppercase font-bold tracking-wider mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#04060a] mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#74777f] pt-4 border-t border-[#dee3ec]">
            <span>By {post.author.name} ({post.author.role})</span>
            <span>•</span>
            <span>{post.publishDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl border border-[#dee3ec] overflow-hidden shadow-sm p-6 sm:p-10 space-y-8">
          {/* Hero Image */}
          <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-slate-100">
            <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Key Summary Box */}
          <div className="bg-[#eff4fe] rounded-xl border border-[#e07a2f]/30 p-5 sm:p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#e07a2f] font-bold mb-2 flex items-center gap-2">
              <span>⚡</span> Key Engineering Takeaway
            </div>
            <p className="text-xs sm:text-sm text-[#04060a] leading-relaxed font-medium">
              {post.summary}
            </p>
          </div>

          {/* Render Content Blocks */}
          <div className="space-y-6 text-[#44474f] leading-relaxed text-sm sm:text-base">
            {contentBlocks.map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-black text-[#04060a] tracking-tight mt-6 mb-2">
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-black text-[#04060a] tracking-tight mt-8 mb-3">
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-[#44474f] leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Author Card */}
          <div className="pt-8 border-t border-[#dee3ec] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#04060a] text-white flex items-center justify-center font-mono font-bold text-sm">
              {post.author.initials || post.author.name[0]}
            </div>
            <div>
              <div className="font-bold text-[#04060a] text-sm">{post.author.name}</div>
              <div className="text-xs text-[#74777f] font-mono">{post.author.role}</div>
            </div>
          </div>

          {/* In-Article Calculator CTA */}
          <div className="mt-8 bg-[#04060a] text-white p-6 sm:p-8 rounded-xl border border-[#1c1f24] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#e07a2f] uppercase font-bold">Interactive Tool</span>
              <h3 className="text-xl font-bold mt-1">Estimate Your Bangalore House Construction Cost</h3>
              <p className="text-xs text-white/70 mt-1 max-w-md">
                Get an instant BOQ estimate calibrated with live Fe-550D TMT steel and M-25 RMC concrete prices.
              </p>
            </div>
            <Link
              to="/cost-calculator"
              className="px-6 py-3 rounded-lg bg-[#e07a2f] hover:bg-[#cf6b23] text-white font-bold text-xs uppercase tracking-wider font-mono transition-colors shrink-0 whitespace-nowrap"
            >
              Launch Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
