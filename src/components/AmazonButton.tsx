'use strict';

import React from 'react';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface AmazonButtonProps {
  href: string;
  price?: string | number;
  text?: string;
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
}

export function AmazonButton({
  href,
  price,
  text = 'Check Price on Amazon',
  variant = 'primary',
  className = '',
}: AmazonButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-canvas';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#f6a000] to-[#ffb95a] hover:from-[#e09100] hover:to-[#ffa733] text-black font-semibold shadow-md hover:shadow-glow-brand hover:-translate-y-0.5 px-6 py-3 text-sm md:text-base active:translate-y-0',
    secondary:
      'bg-surface-high hover:bg-surface-highest text-white border border-border-subtle hover:border-brand-dim px-5 py-2.5 text-sm hover:-translate-y-0.5',
    compact:
      'bg-brand hover:bg-brand-hover text-black font-semibold text-xs px-3.5 py-1.5 shadow-sm hover:shadow-glow-brand-sm',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      aria-label={`${text} ${price ? `for ${price}` : ''} (opens in new tab on Amazon)`}
    >
      <ShoppingCart className={`${variant === 'compact' ? 'w-3.5 h-3.5 mr-1.5' : 'w-4 h-4 mr-2'} flex-shrink-0`} />
      <span>{text}</span>
      {price && <span className="ml-1.5 opacity-90">({price})</span>}
      <ExternalLink className={`${variant === 'compact' ? 'w-3 h-3 ml-1' : 'w-3.5 h-3.5 ml-2'} opacity-75 flex-shrink-0`} />
    </a>
  );
}
