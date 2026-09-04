'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Main Preview Image */}
      <div className="relative w-full aspect-square max-w-[480px] mx-auto rounded-2xl overflow-hidden bg-surface-lowest border border-border-subtle shadow-glass">
        <Image
          src={activeImage}
          alt={`${title} - view ${selectedIndex + 1}`}
          fill
          className="object-cover transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 480px"
          priority
        />
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                selectedIndex === idx
                  ? 'border-brand scale-105 shadow-glow-brand-sm ring-2 ring-brand/30'
                  : 'border-border-subtle opacity-60 hover:opacity-100 hover:border-white/40'
              }`}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
