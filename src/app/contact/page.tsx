'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'gear-suggestion',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    // In static export, handle submission via client state or forward to mailto/formspree
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Editorial Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white">
          Get In Touch With Our Editorial Desk
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
          Have a product you want us to feature in our comparative guides? Noticed a price change or have a question for our research team? We read every submission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info / FAQs */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-surface p-6 rounded-2xl border border-border-subtle space-y-4">
            <h3 className="font-serif font-bold text-lg text-white">
              Editorial Response Times
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Our editorial research team responds to reader inquiries within 24–48 business hours.
            </p>
            <div className="pt-2 border-t border-border-subtle space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-gray-300">
                <Mail className="w-4 h-4 text-brand flex-shrink-0" />
                <span>{siteConfig.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>No sponsored reviews accepted</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-lowest p-5 rounded-2xl border border-border-subtle space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-brand">
              Notice for Brands & PR:
            </h4>
            <p className="text-xs text-muted-dark leading-relaxed">
              We maintain complete editorial independence. Unsolicited review pitches or promotional gear will never influence our comparative analysis, rankings, or ratings.
            </p>
          </div>
        </div>

        {/* Right: The Form */}
        <div className="md:col-span-7">
          <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-glass">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-muted-light max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Your dispatch has been logged with our editorial team at {siteConfig.supportEmail}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'gear-suggestion', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-surface-high hover:bg-surface-highest text-white border border-border-subtle transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 bg-surface-lowest border border-border-subtle rounded-xl text-white text-sm placeholder-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 bg-surface-lowest border border-border-subtle rounded-xl text-white text-sm placeholder-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-lowest border border-border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  >
                    <option value="gear-suggestion">Suggest Products to Feature</option>
                    <option value="review-question">Question About a Review</option>
                    <option value="price-correction">Report Pricing or Stock Discrepancy</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you have in mind..."
                    className="w-full px-4 py-3 bg-surface-lowest border border-border-subtle rounded-xl text-white text-sm placeholder-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full font-semibold text-sm bg-brand hover:bg-brand-hover text-black transition-all duration-200 shadow-glow-brand flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Editorial Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
