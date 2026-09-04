import React from 'react';
import { Check, X } from 'lucide-react';

interface ProsConsProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export function ProsCons({ pros, cons, className = '' }: ProsConsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 my-6 ${className}`}>
      {/* Pros Card */}
      <div className="bg-[#121f15] border border-emerald-500/20 rounded-xl p-5 shadow-sm">
        <h4 className="flex items-center text-emerald-400 font-semibold text-base mb-3.5 tracking-wide uppercase text-xs">
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </span>
          The Good (Reasons to Buy)
        </h4>
        <ul className="space-y-2.5">
          {pros.map((pro, index) => (
            <li key={`pro-${index}`} className="flex items-start text-sm text-gray-200">
              <Check className="w-4 h-4 text-emerald-400 mr-2.5 mt-0.5 flex-shrink-0" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons Card */}
      <div className="bg-[#241316] border border-rose-500/20 rounded-xl p-5 shadow-sm">
        <h4 className="flex items-center text-rose-400 font-semibold text-base mb-3.5 tracking-wide uppercase text-xs">
          <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center mr-2">
            <X className="w-3.5 h-3.5 text-rose-400" />
          </span>
          The Bad (Trade-offs & Flaws)
        </h4>
        <ul className="space-y-2.5">
          {cons.map((con, index) => (
            <li key={`con-${index}`} className="flex items-start text-sm text-gray-200">
              <X className="w-4 h-4 text-rose-400 mr-2.5 mt-0.5 flex-shrink-0" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
