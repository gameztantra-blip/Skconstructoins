import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-surface-dim min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center bg-surface p-8 sm:p-10 rounded-2xl border border-outline-variant shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-primary text-secondary font-mono font-bold text-2xl flex items-center justify-center mx-auto mb-6">
          404
        </div>
        <span className="text-xs font-mono uppercase text-secondary font-bold tracking-wider">
          Blueprint Not Found
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-primary mt-1 mb-3">
          Page Under Construction
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
          The requested engineering resource or project page has either moved or does not exist on our Bangalore server.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full py-3 rounded-lg bg-primary text-white font-bold text-xs uppercase tracking-wider font-mono hover:bg-secondary hover:text-primary transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            to="/cost-calculator"
            className="block w-full py-3 rounded-lg bg-surface-dim border border-outline-variant text-primary font-bold text-xs uppercase tracking-wider font-mono hover:bg-surface-variant transition-colors"
          >
            Estimate Construction Cost
          </Link>
        </div>
      </div>
    </div>
  );
};
