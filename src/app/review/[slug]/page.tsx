import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { siteConfig } from '@/data/siteConfig';
import { ImageGallery } from '@/components/ImageGallery';
import { AmazonButton } from '@/components/AmazonButton';
import { StarRating } from '@/components/StarRating';
import { ProsCons } from '@/components/ProsCons';
import { ProductCard } from '@/components/ProductCard';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Award,
  Calendar,
  Layers,
  Scale,
} from 'lucide-react';

interface ProductReviewPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return products.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: ProductReviewPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const title = `${product.title} Review (${product.rating}/5.0) — Buyer’s Guide & Analysis`;
  const description = `${product.summary} Read our in-depth research breakdown, verified user insights, specs, and pros and cons before buying.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/review/${product.slug}/`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `${siteConfig.url}/review/${product.slug}/`,
    },
  };
}

export default function ProductReviewPage({ params }: ProductReviewPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, product.categorySlug, 3);

  const breadcrumbs = [
    { name: 'Home', url: siteConfig.url },
    { name: product.categoryName, url: `${siteConfig.url}/category/${product.categorySlug}/` },
    { name: product.shortTitle, url: `${siteConfig.url}/review/${product.slug}/` },
  ];

  return (
    <article className="py-8 md:py-12 space-y-12 md:space-y-16">
      {/* Schema.org Product & Review Structured Data */}
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-dark" />
          <Link
            href={`/category/${product.categorySlug}/`}
            className="hover:text-white transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-dark" />
          <span className="text-brand font-medium truncate">{product.shortTitle}</span>
        </nav>
      </div>

      {/* 2. Header & Main Hero Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery & Sticky Buy Box */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <ImageGallery images={product.gallery} title={product.title} />

            {/* Sticky Amazon Buy Card */}
            <div className="bg-surface border border-border-subtle rounded-2xl p-5 shadow-glass space-y-4">
              <div className="flex items-baseline justify-between gap-2 border-b border-border-subtle pb-3">
                <span className="text-xs text-muted uppercase tracking-wider font-semibold">
                  Amazon Prime Pricing
                </span>
                <div className="flex items-baseline gap-2">
                  {product.originalPrice && (
                    <span className="text-xs text-muted line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-mono font-bold text-emerald-400">
                    {product.priceDisplay}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <AmazonButton
                  href={product.affiliateUrl}
                  price={product.priceDisplay}
                  variant="primary"
                  className="w-full text-center py-3.5"
                />
                <p className="text-[11px] text-center text-muted">
                  Fulfilled by Amazon &bull; Free Returns &bull; Real-time pricing
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Editorial Evaluation */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badges & Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {product.badge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand text-black shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    {product.badge}
                  </span>
                )}
                <span className="text-xs font-mono uppercase bg-surface-high px-2.5 py-1 rounded-full text-gray-300 border border-border-subtle">
                  Brand: {product.brand}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Calendar className="w-3 h-3 text-muted" />
                  Updated &bull; {product.updatedAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-white leading-tight">
                {product.title}
              </h1>

              {/* Rating Summary */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-border-subtle">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="lg" />
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  Customer Satisfaction Score
                </span>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="text-base text-gray-300 leading-relaxed space-y-3">
              <p>{product.summary}</p>
            </div>

            {/* Key Standout Features */}
            <div className="bg-surface-lowest p-6 rounded-2xl border border-border-subtle space-y-3">
              <h3 className="text-sm uppercase tracking-wider font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand" />
                Top Engineered Features:
              </h3>
              <ul className="space-y-2">
                {product.keyFeatures.map((feat, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-brand mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros and Cons */}
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                The Assessment: Pros & Cons
              </h3>
              <p className="text-xs text-muted mb-3">
                Synthesized from verified customer reviews and manufacturer engineering data.
              </p>
              <ProsCons pros={product.pros} cons={product.cons} />
            </div>

            {/* The Brutal Truth Callout */}
            <div className="bg-[#111118] border-l-4 border-brand border-y border-r border-border-subtle rounded-2xl p-6 shadow-glass space-y-2">
              <div className="flex items-center gap-2 text-brand">
                <Zap className="w-5 h-5 text-brand" />
                <h3 className="font-serif font-bold text-lg text-white">
                  The Brutal Truth: What Other Reviewers Won’t Tell You
                </h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {product.brutalTruth}
              </p>
            </div>

            {/* Who Should Buy vs Skip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface p-5 rounded-xl border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  Who It’s Perfect For
                </div>
                <p className="text-xs text-muted-light leading-relaxed">
                  {product.whoShouldBuy}
                </p>
              </div>

              <div className="bg-surface p-5 rounded-xl border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                  <XCircle className="w-4 h-4" />
                  Who Should Skip It
                </div>
                <p className="text-xs text-muted-light leading-relaxed">
                  {product.whoShouldSkip}
                </p>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand" />
                Technical Specifications
              </h3>
              <div className="bg-surface border border-border-subtle rounded-2xl overflow-hidden">
                <dl className="divide-y divide-border-subtle text-xs sm:text-sm">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 hover:bg-surface-high/30 transition-colors"
                    >
                      <dt className="font-medium text-muted uppercase tracking-wider text-[11px] sm:text-xs">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 font-mono text-white sm:col-span-2 sm:mt-0 font-semibold">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Verdict Section */}
            <div className="bg-surface-lowest border border-border-brand/40 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Final Editorial Verdict
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                {product.verdict}
              </p>
              <div className="pt-2">
                <AmazonButton
                  href={product.affiliateUrl}
                  price={product.priceDisplay}
                  text="Check Amazon Stock & Best Price"
                  variant="primary"
                />
              </div>
            </div>

            {/* FAQ Section */}
            {product.faqs.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-brand" />
                  Product FAQs
                </h3>
                <div className="space-y-3">
                  {product.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-surface p-4 rounded-xl border border-border-subtle space-y-1.5"
                    >
                      <h4 className="font-semibold text-white text-sm">
                        {faq.question}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand">
                More in {product.categoryName}
              </span>
              <h2 className="text-2xl font-serif font-bold text-white mt-1">
                Other Top-Rated Contenders
              </h2>
            </div>
            <Link
              href={`/category/${product.categorySlug}/`}
              className="text-xs sm:text-sm font-semibold text-brand hover:underline"
            >
              View Category Guide &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                image={rel.image}
                title={rel.title}
                shortTitle={rel.shortTitle}
                price={rel.priceDisplay}
                rating={rel.rating}
                reviewCount={rel.reviewCount}
                affiliateLink={rel.affiliateUrl}
                badge={rel.badge}
                slug={rel.slug}
                categoryName={rel.categoryName}
                variant="grid"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
