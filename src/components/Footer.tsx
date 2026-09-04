import React from 'react';
import Link from 'next/link';
import { siteConfig, AMAZON_ASSOCIATES_DISCLOSURE } from '@/data/siteConfig';
import { categories } from '@/data/categories';
import { ShieldCheck, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-canvas-dark border-t border-border-subtle pt-16 pb-12 text-muted-light mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-subtle">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-amber-600 flex items-center justify-center font-serif font-black text-black text-lg shadow-glow-brand-sm">
                A
              </div>
              <span className="font-serif font-extrabold text-xl text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-brand font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>In-Depth Comparative Research &bull; Verified Buyer Insights</span>
            </div>
          </div>

          {/* Col 2: Buying Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Curated Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}/`}
                    className="text-muted hover:text-brand transition-colors"
                  >
                    {cat.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Editorial Standards
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about/" className="text-muted hover:text-brand transition-colors">
                  Research Methodology
                </Link>
              </li>
              <li>
                <Link href="/disclosure/" className="text-muted hover:text-brand transition-colors">
                  FTC / Amazon Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-muted hover:text-brand transition-colors">
                  Suggest Products to Feature
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              The Affilore Dispatch
            </h4>
            <p className="text-xs text-muted leading-relaxed mb-3">
              Weekly price-drop alerts and curated buyer guides. Zero sponsored spam.
            </p>
            <NewsletterForm layout="stacked" />
          </div>
        </div>

        {/* Amazon Associates & Legal Mandatory Disclaimer */}
        <div className="pt-8 space-y-4 text-xs text-muted leading-relaxed">
          <div className="p-4 rounded-xl bg-surface-lowest border border-border-subtle/80 text-[11px] leading-relaxed">
            <p className="font-semibold text-gray-300 mb-1">
              Affiliate Transparency & Amazon Associates Notice:
            </p>
            <p>{AMAZON_ASSOCIATES_DISCLOSURE}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-subtle text-[11px]">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/disclosure/" className="hover:text-white transition-colors">
                Affiliate Disclosure
              </Link>
              <Link href="/about/" className="hover:text-white transition-colors">
                Privacy & Terms
              </Link>
              <Link href="/contact/" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
