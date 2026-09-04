'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { siteConfig } from '@/data/siteConfig';

export function GoogleAnalytics() {
  const [consentGranted, setConsentGranted] = useState<boolean>(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('affilore_cookie_consent');
        // In EU/strict mode, only load on explicit grant. If not set or denied, don't track.
        setConsentGranted(consent === 'granted');
      } catch {
        setConsentGranted(false);
      }
    };

    checkConsent();
    window.addEventListener('cookie_consent_updated', checkConsent);
    return () => {
      window.removeEventListener('cookie_consent_updated', checkConsent);
    };
  }, []);

  // If no GA ID configured or consent not granted, do not inject scripts
  if (!siteConfig.gaId || siteConfig.gaId.includes('PLACEHOLDER') || !consentGranted) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
}
