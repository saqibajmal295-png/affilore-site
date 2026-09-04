import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts, getAllProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { siteConfig } from '@/data/siteConfig';
import { ProductCard } from '@/components/ProductCard';
import { ComparisonTable } from '@/components/ComparisonTable';
import { AmazonButton } from '@/components/AmazonButton';
import { NewsletterForm } from '@/components/NewsletterForm';
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  Coffee,
  Smartphone,
  UtensilsCrossed,
  Flame,
  Award,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getAllProducts();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-brand" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-brand" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-brand" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-brand" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand" />;
    }
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border-subtle">
        {/* Ambient Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-high border border-brand/30 text-brand text-xs font-semibold uppercase tracking-wider mb-6 shadow-glow-brand-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Independent Culinary & Tech Lab</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Engineered Reviews For <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-amber-300 to-brand">Discerning Shoppers.</span>
          </h1>

          {/* Subtitle / Value Prop */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-muted-light max-w-2xl mx-auto leading-relaxed">
            Unbiased, data-driven gear testing. We independently test thermal consistency, decibel levels, and real-world durability so you never regret a purchase.
          </p>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>100% Independent</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Zero Sponsored Rankings</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>FTC Compliant</span>
            </div>
          </div>

          {/* CTA Group */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#featured-picks"
              className="px-7 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-brand to-amber-500 hover:from-amber-500 hover:to-brand text-black shadow-glow-brand transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Explore Top Tested Picks
            </a>
            <Link
              href="/category/best-espresso-coffee-gear/"
              className="px-6 py-3.5 rounded-full text-sm font-semibold bg-surface-high hover:bg-surface-highest text-white border border-border-subtle hover:border-brand-dim transition-all"
            >
              Browse Buying Guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Curated Guides
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mt-1">
              Shop By Tested Category
            </h2>
          </div>
          <Link
            href="/category/best-espresso-coffee-gear/"
            className="text-xs md:text-sm font-semibold text-brand hover:underline flex items-center gap-1"
          >
            All Guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}/`}
              className="group bg-surface border border-border-subtle hover:border-brand-dim rounded-2xl p-6 transition-all duration-300 hover:shadow-glow-brand hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-lowest border border-border-subtle flex items-center justify-center mb-4 group-hover:border-brand/40 transition-colors">
                  {getCategoryIcon(category.iconName)}
                </div>
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-brand transition-colors mb-2">
                  {category.shortTitle}
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
                  {category.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-brand">
                <span>View Buyer’s Guide</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PICKS (GRID) */}
      <section id="featured-picks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Editor Tested & Approved</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white">
              Featured Product Picks
            </h2>
            <p className="text-sm text-muted mt-2 max-w-xl">
              Every item below earned our highest laboratory test scores for efficiency, reliability, and value.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              shortTitle={product.shortTitle}
              price={product.priceDisplay}
              rating={product.rating}
              reviewCount={product.reviewCount}
              affiliateLink={product.affiliateUrl}
              badge={product.badge}
              award={product.award}
              summary={product.summary}
              keyFeatures={product.keyFeatures}
              slug={product.slug}
              categoryName={product.categoryName}
              variant="grid"
            />
          ))}
        </div>
      </section>

      {/* 4. THE BRUTAL TRUTH BOX (Signature Affilore Feature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111118] border-l-4 border-brand border-y border-r border-border-subtle rounded-2xl p-6 sm:p-8 md:p-10 shadow-glass relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 text-brand mt-1">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  Affilore Editorial Standard
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
                The Brutal Truth: Why Most Affiliate Review Sites Are Broken
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-4xl">
                Most affiliate sites summarize Amazon user reviews without ever touching the hardware. At Affilore, we purchase our own test units with editorial funds. If an espresso maker has a loose gasket or an air fryer smells like burnt plastic on cycle three, we put it in bold print right on the page. We don’t recommend what we wouldn’t keep on our own kitchen counters.
              </p>
              <div className="pt-2">
                <Link
                  href="/about/"
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-brand hover:text-brand-hover hover:underline"
                >
                  Read our full testing charter and standards &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SIDE-BY-SIDE COMPARISON HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComparisonTable
          products={featuredProducts.slice(0, 5)}
          title="Quick Benchmark Comparison: Top Kitchen & Coffee Gear"
        />
      </section>

      {/* 6. NEWSLETTER / DEAL ALERT SIGNUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-br from-surface to-surface-low border border-border-subtle rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 blur-3xl rounded-full pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
              <Sparkles className="w-3.5 h-3.5" />
              The Affilore Dispatch
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Never Pay Full Price For Great Gear.
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              We monitor historical price charts on Amazon every 6 hours. Get our monthly teardown digest and flash deal alerts directly in your inbox.
            </p>

            <div className="mt-6">
              <NewsletterForm layout="inline" />
            </div>

            <p className="text-[11px] text-muted-dark pt-2">
              No spam. No sponsored promotions. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
