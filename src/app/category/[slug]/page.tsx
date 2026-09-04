import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { getProductsByCategory, getAllProducts } from '@/data/products';
import { siteConfig } from '@/data/siteConfig';
import { ProductCard } from '@/components/ProductCard';
import { ComparisonTable } from '@/components/ComparisonTable';
import { AmazonButton } from '@/components/AmazonButton';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import {
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) {
    return { title: 'Category Not Found' };
  }

  const title = `${category.title} — Top Picks & Reviews`;
  const description = category.description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/category/${category.slug}/`,
      images: [{ url: category.heroImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [category.heroImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/category/${category.slug}/`,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  // Get products for this category. If less than 4, include others to showcase comparison
  let categoryProducts = getProductsByCategory(category.slug);
  if (categoryProducts.length < 3) {
    const fallback = getAllProducts().filter((p) => p.categorySlug !== category.slug);
    categoryProducts = [...categoryProducts, ...fallback].slice(0, 5);
  }

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Guides', url: `${siteConfig.url}/#categories` },
    { name: category.shortTitle, url: `${siteConfig.url}/category/${category.slug}/` },
  ];

  return (
    <div className="space-y-12 md:space-y-16 py-8 md:py-12">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-dark" />
          <Link href="/#categories" className="hover:text-white transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-dark" />
          <span className="text-brand font-medium truncate">{category.shortTitle}</span>
        </nav>
      </div>

      {/* 2. Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-glass">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand/10 text-brand border border-brand/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editor-Researched Buying Guide &bull; Updated for 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white leading-tight">
              {category.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-light leading-relaxed">
              {category.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Researched Across {categoryProducts.length} Top Contenders
              </span>
              <span className="text-muted-dark">&bull;</span>
              <span>Editorial Author: {siteConfig.editorialBoard}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Summary Box / Top Pick Podium */}
      {categoryProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#15151c] border border-border-brand/40 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-4 border-b border-border-subtle pb-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand" />
                Our Quick Verdict / Top Recommendation
              </h2>
              <span className="text-xs font-mono uppercase bg-brand text-black font-bold px-2.5 py-0.5 rounded-full">
                #1 Editor Pick
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <h3 className="text-xl font-serif font-bold text-white">
                  <Link href={`/review/${categoryProducts[0].slug}/`} className="hover:text-brand transition-colors">
                    {categoryProducts[0].title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {categoryProducts[0].verdict}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted pt-1">
                  <span>Rating: {categoryProducts[0].rating}/5.0</span>
                  <span>&bull;</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {categoryProducts[0].priceDisplay}
                  </span>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
                <AmazonButton
                  href={categoryProducts[0].affiliateUrl}
                  price={categoryProducts[0].priceDisplay}
                  variant="primary"
                />
                <Link
                  href={`/review/${categoryProducts[0].slug}/`}
                  className="text-center text-xs text-muted hover:text-white py-1"
                >
                  Read full review & specs &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Side-by-Side Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComparisonTable
          products={categoryProducts}
          title={`Side-by-Side: ${category.shortTitle} Comparison`}
        />
      </section>

      {/* 5. Listicle / Detailed Product Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-border-subtle pb-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
            Detailed Reviews & Evaluation
          </h2>
          <p className="text-sm text-muted mt-1">
            Analyzed across manufacturer specifications, thousands of verified owner reviews, and comparative build quality.
          </p>
        </div>

        <div className="space-y-8">
          {categoryProducts.map((product, index) => (
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
              variant="listicle"
              rankIndex={index + 1}
            />
          ))}
        </div>
      </section>

      {/* 6. Comprehensive Buyer's Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-10 shadow-glass">
          <div className="flex items-center gap-2.5 text-brand mb-3">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Buyer’s Blueprint
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            How to Choose the Right Gear
          </h2>

          <p className="text-muted-light text-sm sm:text-base leading-relaxed mb-8">
            {category.buyingGuide.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {category.buyingGuide.factors.map((factor, i) => (
              <div
                key={i}
                className="bg-surface-lowest p-5 rounded-2xl border border-border-subtle space-y-2"
              >
                <div className="w-7 h-7 rounded-full bg-brand/15 text-brand text-xs font-mono font-bold flex items-center justify-center">
                  0{i + 1}
                </div>
                <h3 className="font-semibold text-white text-base">
                  {factor.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-surface-high border border-border-subtle text-xs sm:text-sm text-gray-300 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">The Bottom Line:</strong>
              {category.buyingGuide.bottomLine}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Category FAQ */}
      {category.faqs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-10">
            <div className="flex items-center gap-2 text-brand mb-2">
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
              Expert Answers & Buying Advice
            </h2>

            <div className="space-y-4">
              {category.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-surface-lowest p-5 rounded-xl border border-border-subtle"
                >
                  <h3 className="font-semibold text-white text-sm sm:text-base mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
