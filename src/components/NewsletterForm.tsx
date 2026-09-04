'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface NewsletterFormProps {
  layout?: 'stacked' | 'inline';
}

export function NewsletterForm({ layout = 'inline' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium animate-in fade-in">
        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
        <span>You’re subscribed to the Affilore Dispatch!</span>
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-3.5 py-2.5 text-xs bg-surface border border-border-subtle rounded-xl text-white placeholder-muted focus:outline-none focus:border-brand"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-brand hover:bg-brand-hover text-black transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Subscribe</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address..."
        className="w-full sm:flex-1 px-4 py-3 rounded-full bg-surface-lowest border border-border-subtle text-white text-sm placeholder-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
        required
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold bg-brand hover:bg-brand-hover text-black transition-colors shadow-glow-brand-sm whitespace-nowrap"
      >
        Join Dispatch
      </button>
    </form>
  );
}
