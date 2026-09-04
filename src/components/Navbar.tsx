'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/data/categories';
import { siteConfig } from '@/data/siteConfig';
import { Menu, X, Compass, Flame, ShieldAlert, Sparkles, Coffee, Smartphone, UtensilsCrossed } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Top Affiliate Micro-Banner */}
      <aside aria-label="Affiliate Disclosure" className="bg-surface-lowest text-[11px] text-muted py-1.5 px-4 text-center border-b border-border-subtle flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
        <span>
          Editorial Buyer’s Guide &bull; We may earn an affiliate commission on Amazon purchases at zero extra cost to you.
        </span>
      </aside>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-surface-lowest/85 backdrop-blur-md border-b border-border-subtle transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-amber-600 flex items-center justify-center font-serif font-black text-black text-xl shadow-glow-brand-sm group-hover:scale-105 transition-transform">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-xl tracking-tight text-white group-hover:text-brand transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-muted font-medium -mt-1">
                Curated Gear
              </span>
            </div>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}/`;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}/`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-brand/15 text-brand border border-brand/30'
                      : 'text-muted-light hover:text-white hover:bg-surface-high'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                  <span>{cat.shortTitle}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/about/"
              className="text-xs font-semibold text-muted hover:text-white uppercase tracking-wider transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/disclosure/"
              className="text-xs font-semibold text-muted hover:text-white uppercase tracking-wider transition-colors"
            >
              FTC Notice
            </Link>
            <Link
              href="/contact/"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-surface-high hover:bg-surface-highest text-white border border-border-subtle hover:border-brand-dim transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-surface-high text-muted-light hover:text-white hover:bg-surface-highest focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-b border-border-subtle px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2 px-2">
              Browse Categories
            </div>
            <div className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}/`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white hover:bg-surface-high transition-colors"
                >
                  <span className="text-brand">{getCategoryIcon(cat.iconName)}</span>
                  <span>{cat.title}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border-subtle grid grid-cols-3 gap-2 text-center text-xs">
              <Link
                href="/about/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 rounded-lg bg-surface-lowest text-muted-light hover:text-white"
              >
                About Us
              </Link>
              <Link
                href="/disclosure/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 rounded-lg bg-surface-lowest text-muted-light hover:text-white"
              >
                Disclosure
              </Link>
              <Link
                href="/contact/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 rounded-lg bg-surface-lowest text-muted-light hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
