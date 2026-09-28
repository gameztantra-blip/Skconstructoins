import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = "dark" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* Precision Geometric Architectural S-K Monogram SVG */}
      <svg
        className="h-9 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric Outer Contour & Architectural Foundation Base */}
        <rect x="18" y="74" width="64" height="6" rx="1.5" fill="#1C1F24" />
        
        {/* Letter 'S' Girder Shape in Terracotta Saffron (#E07A2F) */}
        <path
          d="M24 16H76V24H32V42H76V50H24V16Z"
          fill="#E07A2F"
          stroke="#E07A2F"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* Letter 'K' Structural Truss in Charcoal (#1C1F24) */}
        <path
          d="M36 46H44V74H36V46Z"
          fill="#1C1F24"
        />
        <path
          d="M44 60L64 46H74L51 62L76 74H64L44 64V60Z"
          fill="#1C1F24"
        />
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-manrope font-extrabold text-[17px] tracking-tight leading-none ${
            variant === "light" ? "text-white" : "text-[#04060a]"
          }`}
        >
          SK CONSTRUCTIONS
        </span>
        <span className="font-inter text-[10px] font-semibold text-[#e07a2f] tracking-[0.16em] uppercase mt-0.5">
          Engineered Living • Bengaluru
        </span>
      </div>
    </Link>
  );
};
