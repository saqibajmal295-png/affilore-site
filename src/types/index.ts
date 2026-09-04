export interface SpecItem {
  label: string;
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  brand: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  priceDisplay: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  image: string;
  gallery: string[];
  badge?: string; // e.g. "Best Overall", "Top Value Pick", "Premium Choice"
  award?: string;
  summary: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  specs: SpecItem[];
  verdict: string;
  brutalTruth: string; // Signature Affilore feature: unvarnished honest insight
  whoShouldBuy: string;
  whoShouldSkip: string;
  faqs: FAQItem[];
  updatedAt: string;
  featured?: boolean;
}

export interface Category {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  heroImage: string;
  featuredProductSlug: string;
  buyingGuide: {
    intro: string;
    factors: { title: string; description: string }[];
    bottomLine: string;
  };
  faqs: FAQItem[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  amazonTag: string;
  gaId: string;
  supportEmail: string;
  editorialBoard: string;
}
