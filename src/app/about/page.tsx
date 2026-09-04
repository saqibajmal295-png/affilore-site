import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import {
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  Search,
  MessageSquareQuote,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Affilore — Editorial Independence & Research Standards',
  description:
    'Learn how Affilore researches kitchen appliances, coffee gear, and smart home tech. Read our independent charter, research methodology, and editorial standards.',
  alternates: {
    canonical: `${siteConfig.url}/about/`,
  },
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 space-y-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Editorial Charter</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight">
          Unvarnished Insight In An Era Of Marketing Noise.
        </h1>
        <p className="text-base sm:text-lg text-muted-light max-w-2xl mx-auto leading-relaxed">
          Affilore was created to build clear, objective, and deeply researched consumer buying guides. We analyze technical specifications, aggregate verified buyer experiences, and compare performance trade-offs so you can shop with clarity.
        </p>
      </section>

      {/* Credibility Statement Box */}
      <section className="bg-surface border border-border-subtle rounded-3xl p-8 sm:p-12 shadow-glass relative overflow-hidden">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-brand">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Our Core Editorial Pledge
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            We believe buying advice should be transparent, evidence-based, and free of sponsored influence. We research products by cross-referencing verified customer reviews, manufacturer engineering schematics, known failure modes, and authoritative culinary sources. We highlight real-world flaws openly and never accept paid placement or sponsored rankings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle text-center">
            <div className="p-4 bg-surface-lowest rounded-2xl border border-border-subtle">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-brand">
                100%
              </div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                Unsponsored Guides
              </div>
            </div>
            <div className="p-4 bg-surface-lowest rounded-2xl border border-border-subtle">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
                500+
              </div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                Hours of Comparative Research
              </div>
            </div>
            <div className="p-4 bg-surface-lowest rounded-2xl border border-border-subtle">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400">
                $0
              </div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                Paid Placement Fees
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Pillar Methodology */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            The Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            How We Research Every Product
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface p-6 rounded-2xl border border-border-subtle space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand font-mono font-bold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Comprehensive Specification Analysis
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              We examine official technical documentation, power wattage, material purity (such as virgin cast iron or high-carbon steel), and safety certifications to confirm foundational build quality.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border-subtle space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand font-mono font-bold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Verified Buyer Feedback Synthesis
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Instead of relying on isolated opinions, we aggregate thousands of verified owner reviews across multiple retail platforms to identify recurring defect patterns, long-term durability issues, and ease of daily cleaning.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border-subtle space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand font-mono font-bold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Comparative Market Benchmarking
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              We evaluate price-to-performance ratios across competing models in the same category, verifying whether a premium item justifies its cost or if a budget alternative delivers equal utility.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border-subtle space-y-3">
            <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand font-mono font-bold text-sm flex items-center justify-center">
              04
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              The Signature "Brutal Truth"
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Every review includes a highlighted callout breaking down the biggest caveats, maintenance hurdles, or specific reasons a shopper might want to skip the product entirely.
            </p>
          </div>
        </div>
      </section>

      {/* Affiliate Transparency Callout */}
      <section className="bg-surface-lowest border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-brand" />
          How Affilore Sustains Itself
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Affilore is reader-supported. When you click through our Amazon product links and make a purchase, we may receive a small affiliate commission at zero additional cost to you. This model allows our platform to remain completely free of intrusive banner ads, popups, and paid brand rankings.
        </p>
        <Link
          href="/disclosure/"
          className="inline-flex items-center text-xs font-semibold text-brand hover:underline"
        >
          Read our full FTC & Amazon Associates Affiliate Disclosure &rarr;
        </Link>
      </section>

      {/* Next Step CTA */}
      <div className="text-center pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-brand hover:bg-brand-hover text-black transition-all shadow-glow-brand"
        >
          <span>Explore Curated Gear</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
