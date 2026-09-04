'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('affilore_cookie_consent');
      if (!consent) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage might be disabled
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('affilore_cookie_consent', 'granted');
      window.dispatchEvent(new Event('cookie_consent_updated'));
    } catch {
      // ignore
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('affilore_cookie_consent', 'denied');
      window.dispatchEvent(new Event('cookie_consent_updated'));
    } catch {
      // ignore
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-surface-high/95 backdrop-blur-md border border-brand/30 rounded-2xl p-5 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 text-brand mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
            Privacy & Cookie Preferences
            <ShieldCheck className="w-4 h-4 text-brand" />
          </h4>
          <p className="text-xs text-muted-light mt-1.5 leading-relaxed">
            We use essential cookies to ensure our site works, and optional analytics cookies to understand how readers interact with our product recommendations. Learn more in our{' '}
            <Link href="/disclosure/" className="text-brand hover:underline font-medium">
              Affiliate & Privacy Disclosure
            </Link>.
          </p>
          <div className="flex items-center gap-2.5 mt-4">
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-brand hover:bg-brand-hover text-black transition-colors shadow-sm"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3.5 py-2 text-xs font-medium rounded-full bg-surface hover:bg-surface-highest text-muted-light border border-border-subtle transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="text-muted hover:text-white transition-colors p-1"
          aria-label="Dismiss cookie banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
