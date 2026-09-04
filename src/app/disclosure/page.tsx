import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig, AMAZON_ASSOCIATES_DISCLOSURE } from '@/data/siteConfig';
import { ShieldCheck, AlertCircle, ExternalLink, CheckCircle2, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate & FTC Disclosure — Full Compliance Statement',
  description:
    'Full FTC 16 CFR Part 255 and Amazon Associates affiliate compliance disclosure for Affilore. Learn how commissions work and why editorial independence remains absolute.',
  alternates: {
    canonical: `${siteConfig.url}/disclosure/`,
  },
};

export default function DisclosurePage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Compliance & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white">
          Affiliate & FTC Disclosure
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          In full accordance with Federal Trade Commission (FTC) 16 CFR § 255 guidelines and the Amazon Associates Operating Agreement, this document explains how Affilore is compensated.
        </p>
      </div>

      {/* Primary Amazon Associate Notice Box */}
      <div className="bg-[#181822] border-2 border-brand/50 rounded-2xl p-6 sm:p-8 shadow-glow-brand space-y-4">
        <div className="flex items-center gap-3 text-brand">
          <AlertCircle className="w-6 h-6" />
          <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
            Official Amazon Associates Statement
          </h2>
        </div>
        <div className="p-4 bg-surface-lowest rounded-xl border border-border-subtle font-mono text-sm text-amber-200/90 leading-relaxed">
          {AMAZON_ASSOCIATES_DISCLOSURE}
        </div>
        <p className="text-xs text-muted leading-relaxed">
          Amazon, the Amazon logo, AmazonSupply, and the AmazonSupply logo are trademarks of Amazon.com, Inc. or its affiliates.
        </p>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-8 text-sm sm:text-base text-gray-300 leading-relaxed">
        {/* Section 1 */}
        <section className="bg-surface p-6 sm:p-8 rounded-2xl border border-border-subtle space-y-3">
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-mono font-bold flex items-center justify-center">
              1
            </span>
            What Are Affiliate Links?
          </h3>
          <p className="text-sm text-muted-light">
            When you click on certain links throughout Affilore (such as "Check Price on Amazon" buttons or product card links), your web browser sends a referral identifier tag to the retailer. If you proceed to purchase a product through that retailer, Affilore may receive a modest commission from the merchant.
          </p>
          <div className="p-3 bg-surface-lowest rounded-lg border border-border-subtle text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Zero Cost To You:</strong> The commission comes directly out of the merchant’s marketing budget. You will never pay an extra penny for using our links.
            </span>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-surface p-6 sm:p-8 rounded-2xl border border-border-subtle space-y-3">
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-mono font-bold flex items-center justify-center">
              2
            </span>
            Strict Editorial Independence
          </h3>
          <p className="text-sm text-muted-light">
            Our editorial evaluations, star ratings, and rankings are strictly governed by our testing protocols and are completely isolated from our commercial affiliate relationships.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-brand font-bold">&bull;</span>
              <span>We never accept payment or incentives to rank a product higher.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand font-bold">&bull;</span>
              <span>If an expensive product underperforms a $30 budget alternative, we explicitly name the budget winner.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand font-bold">&bull;</span>
              <span>Our writers and testing engineers do not receive commission bonuses based on which specific products readers purchase.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-surface p-6 sm:p-8 rounded-2xl border border-border-subtle space-y-3">
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-mono font-bold flex items-center justify-center">
              3
            </span>
            Real-Time Price & Availability Dynamics
          </h3>
          <p className="text-sm text-muted-light">
            Retail pricing on platforms like Amazon fluctuates dynamically based on supply, seller inventory, and promotional events. While we strive to display accurate pricing indicators, prices and availability are accurate only as of the date/time of testing and are subject to change. Always verify the current final checkout price on Amazon.com.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-surface p-6 sm:p-8 rounded-2xl border border-border-subtle space-y-3">
          <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-mono font-bold flex items-center justify-center">
              4
            </span>
            Cookies & Tracking Disclosures
          </h3>
          <p className="text-sm text-muted-light">
            When you navigate to Amazon or partner retailers from Affilore, those merchants may place a temporary tracking cookie (usually valid for 24 hours to 30 days) on your device to attribute any qualifying purchases made during that session. You can manage or disable cookies at any time through your browser settings or our cookie consent manager.
          </p>
        </section>
      </div>

      {/* Contact Notice */}
      <div className="p-6 rounded-2xl bg-surface-lowest border border-border-subtle text-center text-xs text-muted space-y-2">
        <p>
          Questions about our affiliate relationships or compliance standards?
        </p>
        <div>
          <Link
            href="/contact/"
            className="text-brand hover:underline font-semibold"
          >
            Contact the Affilore Compliance & Editorial Team &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
