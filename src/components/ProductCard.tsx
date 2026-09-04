import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AmazonButton } from './AmazonButton';
import { StarRating } from './StarRating';
import { CheckCircle2, ChevronRight, Award } from 'lucide-react';

export interface ProductCardProps {
  // Required by user specification
  image: string;
  title: string;
  price: string | number;
  rating: number;
  affiliateLink: string;

  // Optional enhancements
  id?: string;
  slug?: string;
  shortTitle?: string;
  reviewCount?: number;
  badge?: string;
  award?: string;
  summary?: string;
  keyFeatures?: string[];
  categoryName?: string;
  variant?: 'grid' | 'listicle' | 'compact';
  rankIndex?: number;
}

export function ProductCard({
  image,
  title,
  price,
  rating,
  affiliateLink,
  slug,
  shortTitle,
  reviewCount = 1200,
  badge,
  award,
  summary,
  keyFeatures = [],
  categoryName,
  variant = 'grid',
  rankIndex,
}: ProductCardProps) {
  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;
  const reviewLink = slug ? `/review/${slug}/` : '#';

  if (variant === 'listicle') {
    return (
      <div className="bg-surface border border-border-subtle hover:border-brand-dim rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-glass hover:shadow-glow-brand group relative">
        {/* Top Badge Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2.5">
            {rankIndex !== undefined && (
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand/10 text-brand font-mono font-bold text-sm border border-brand/30">
                #{rankIndex}
              </span>
            )}
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand text-black shadow-sm">
                <Award className="w-3.5 h-3.5" />
                {badge}
              </span>
            )}
            {categoryName && (
              <span className="text-xs uppercase tracking-wider text-muted font-medium">
                {categoryName}
              </span>
            )}
          </div>
          {award && (
            <span className="text-xs font-serif italic text-amber-300 bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-500/20">
              {award}
            </span>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Image & Quick Specs */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[280px] rounded-xl overflow-hidden bg-surface-lowest border border-border-subtle p-3 flex items-center justify-center group-hover:border-border-brand transition-colors">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            {slug && (
              <Link
                href={reviewLink}
                className="mt-3 inline-flex items-center text-xs font-semibold text-brand hover:text-brand-hover hover:underline"
              >
                Read in-depth buyer guide <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-brand transition-colors">
                  {slug ? <Link href={reviewLink}>{title}</Link> : title}
                </h3>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={rating} reviewCount={reviewCount} size="md" />
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {formattedPrice}
                </span>
              </div>

              {summary && (
                <p className="text-muted-light text-sm leading-relaxed mb-4">
                  {summary}
                </p>
              )}

              {keyFeatures.length > 0 && (
                <div className="mb-6 space-y-1.5 bg-surface-lowest/60 p-4 rounded-xl border border-border-subtle">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-muted mb-2">
                    Key Highlights:
                  </h4>
                  {keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start text-xs md:text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <AmazonButton href={affiliateLink} price={formattedPrice} variant="primary" />
              {slug && (
                <Link
                  href={reviewLink}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold bg-surface-high hover:bg-surface-highest text-white border border-border-subtle hover:border-white/30 transition-all"
                >
                  Full Analysis & Specs
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Card
  return (
    <div className="bg-surface border border-border-subtle hover:border-brand-dim rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-glass hover:shadow-glow-brand hover:-translate-y-1 group relative">
      {/* Badge Ribbon */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand text-black shadow-md">
            <Award className="w-3 h-3" />
            {badge}
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] bg-surface-lowest overflow-hidden border-b border-border-subtle">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {categoryName && (
          <span className="absolute bottom-2 right-2 bg-canvas/80 backdrop-blur-xs text-[10px] uppercase font-semibold text-muted px-2 py-0.5 rounded">
            {categoryName}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <StarRating rating={rating} reviewCount={reviewCount} size="sm" />
            <span className="font-mono font-bold text-base text-emerald-400">
              {formattedPrice}
            </span>
          </div>

          <h3 className="font-serif font-bold text-lg text-white group-hover:text-brand transition-colors line-clamp-2 mb-2">
            {slug ? <Link href={reviewLink}>{title}</Link> : title}
          </h3>

          {summary && (
            <p className="text-muted text-xs line-clamp-3 mb-4 leading-relaxed">
              {summary}
            </p>
          )}

          {keyFeatures.length > 0 && (
            <div className="space-y-1 mb-4">
              {keyFeatures.slice(0, 2).map((feature, i) => (
                <div key={i} className="flex items-center text-xs text-gray-300 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mr-2 flex-shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-border-subtle flex flex-col gap-2">
          <AmazonButton href={affiliateLink} text="Check Price on Amazon" variant="primary" className="w-full text-xs md:text-sm py-2.5" />
          {slug && (
            <Link
              href={reviewLink}
              className="text-center text-xs text-muted hover:text-white transition-colors py-1"
            >
              Read full review & specs &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
