'use strict';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { AmazonButton } from './AmazonButton';
import { StarRating } from './StarRating';
import { Check, ArrowRight } from 'lucide-react';

interface ComparisonTableProps {
  products: Product[];
  title?: string;
}

export function ComparisonTable({ products, title = 'Quick Side-by-Side Comparison' }: ComparisonTableProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="my-10 bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-glass">
      <div className="p-5 md:p-6 border-b border-border-subtle flex items-center justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-muted mt-1">
            Compare key specifications, ratings, and real-world prices.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-lowest border-b border-border-subtle text-xs uppercase tracking-wider text-muted font-semibold">
              <th className="py-3.5 px-4">Product</th>
              <th className="py-3.5 px-4 text-center">Editor’s Pick</th>
              <th className="py-3.5 px-4">Rating</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Top Key Feature</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-sm">
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-surface-high/50 transition-colors group"
              >
                {/* Product Column */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-lowest flex-shrink-0 border border-border-subtle">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/review/${product.slug}/`}
                        className="font-semibold text-white group-hover:text-brand transition-colors line-clamp-1 hover:underline"
                      >
                        {product.shortTitle || product.title}
                      </Link>
                      <span className="text-xs text-muted block">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Badge Column */}
                <td className="py-4 px-4 text-center">
                  {product.badge ? (
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand/15 text-brand border border-brand/30">
                      {product.badge}
                    </span>
                  ) : (
                    <span className="text-xs text-muted">—</span>
                  )}
                </td>

                {/* Rating Column */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                </td>

                {/* Price Column */}
                <td className="py-4 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                  {product.priceDisplay}
                </td>

                {/* Key Feature Column */}
                <td className="py-4 px-4 text-xs text-gray-300 max-w-xs">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="line-clamp-2">
                      {product.keyFeatures[0] || product.summary}
                    </span>
                  </div>
                </td>

                {/* Action Column */}
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <AmazonButton
                    href={product.affiliateUrl}
                    text="Check Price"
                    variant="compact"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
