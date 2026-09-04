'use strict';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // e.g. 4.8
  reviewCount?: number;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({
  rating,
  reviewCount,
  showScore = true,
  size = 'md',
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center text-brand">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses[size]} fill-brand text-brand`} />
        ))}
        {hasHalfStar && (
          <span className="relative inline-block">
            <Star className={`${sizeClasses[size]} text-brand`} />
            <span className="absolute inset-0 overflow-hidden w-[50%]">
              <Star className={`${sizeClasses[size]} fill-brand text-brand`} />
            </span>
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-muted-dark opacity-40`} />
        ))}
      </div>

      {showScore && (
        <span className={`font-semibold text-white ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={`text-muted text-xs`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
