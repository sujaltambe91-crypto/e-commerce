import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface PricingTier {
  name: string;
  badge?: string;
  popular?: boolean;
  price: string;
  oldPrice?: string;
  duration: string;
  description: string;
  features: string[];
}

const TIERS: PricingTier[] = [
  {
    name: 'BASIC',
    price: '₹ 6,999',
    duration: 'One-Time Setup',
    description: 'Perfect for local boutiques starting their very first online storefront.',
    features: [
      'Free Domain (.com / .in) — 1 Year',
      'Free Cloud SSD Hosting — 1 Year',
      'WooCommerce Core Store Setup',
      'Up to 50 Product Listings',
      'Standard Payment Gateway (UPI / Cards)',
      'Mobile Responsive Layout',
      'Email Customer Support',
    ],
  },
  {
    name: 'PROFESSIONAL',
    badge: 'LIMITED TIME FLYER OFFER • 45% OFF',
    popular: true,
    price: '₹ 10,999',
    oldPrice: '₹ 19,999',
    duration: 'All-Inclusive Turnkey',
    description: 'Our signature complete e-commerce package as advertised in our campaign.',
    features: [
      'Free Domain (.com / .in) — 1 Year',
      'Free Ultra-Fast Hosting — 1 Year',
      'Full WooCommerce E-Commerce Store',
      'Unlimited Products & Category Setup',
      'Multi-Payment Gateway (Razorpay/Stripe/UPI)',
      'Automated Shipping (Shiprocket / Delhivery)',
      'WhatsApp Integration & Chat Trigger',
      'Progressive Web App (PWA) Mobile Ready',
      'Complete Admin Control Dashboard',
      'Product & Customer Management',
      '1 Year Dedicated Technical Support',
    ],
  },
  {
    name: 'PREMIUM',
    badge: 'ENTERPRISE GROWTH',
    price: '₹ 18,999',
    duration: 'Full Growth Suite',
    description: 'Designed for scaling e-commerce brands needing multi-vendor or app capabilities.',
    features: [
      'Everything in Professional Plan',
      'Native Android & iOS App Integration',
      'Advanced On-Page SEO Optimization',
      'Digital Marketing Strategy Session',
      'Amazon Affiliate Hybrid Redirect System',
      'Custom Checkout Upsell & Cross-sell Engine',
      'High-Performance CDN & Cloudflare Security',
      'Priority 24/7 WhatsApp VIP Support',
    ],
  },
];

export const PricingSection: React.FC = () => {
  // 48-hour countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 41, minutes: 28, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16">
      {/* Special Offer Alert Banner with Countdown */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-8 sm:p-12 text-neutral-950 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/20 text-neutral-950 text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>MARKETINGWALAA SPECIAL LAUNCH OFFER</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              Get Your Complete Store For Just ₹10,999
            </h3>
            <p className="text-neutral-900 font-medium text-sm sm:text-base max-w-xl">
              Normally ₹19,999. Includes 1-year domain, 1-year hosting, full WooCommerce store, payment gateway, and WhatsApp integration.
            </p>
          </div>

          {/* Countdown & Action */}
          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
            {/* Timer boxes */}
            <div className="flex items-center gap-2">
              <div className="bg-neutral-950 text-white rounded-2xl p-3 text-center min-w-[64px]">
                <span className="font-display text-2xl font-bold font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[9px] uppercase font-bold text-neutral-400">Hours</span>
              </div>
              <span className="text-2xl font-bold text-neutral-950">:</span>
              <div className="bg-neutral-950 text-white rounded-2xl p-3 text-center min-w-[64px]">
                <span className="font-display text-2xl font-bold font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[9px] uppercase font-bold text-neutral-400">Mins</span>
              </div>
              <span className="text-2xl font-bold text-neutral-950">:</span>
              <div className="bg-neutral-950 text-white rounded-2xl p-3 text-center min-w-[64px]">
                <span className="font-display text-2xl font-bold font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[9px] uppercase font-bold text-neutral-400">Secs</span>
              </div>
            </div>

            <a
              href="#contact"
              className="px-6 py-4 bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl transition-all active:scale-95 whitespace-nowrap"
            >
              CLAIM OFFER NOW →
            </a>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/20 blur-3xl pointer-events-none" />
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
              tier.popular
                ? 'bg-neutral-900/90 border-2 border-orange-500 shadow-2xl shadow-orange-500/10 lg:-translate-y-2'
                : 'bg-neutral-900/50 border border-neutral-800'
            }`}
          >
            {tier.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                {tier.badge}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  {tier.name}
                </span>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                    {tier.price}
                  </span>
                  {tier.oldPrice && (
                    <span className="text-sm font-bold text-neutral-500 line-through font-mono">
                      {tier.oldPrice}
                    </span>
                  )}
                </div>
                <span className="text-xs text-neutral-400 block mt-1 font-mono">
                  {tier.duration}
                </span>
                <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-3 pt-6 border-t border-neutral-800/80">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Included Features:
                </span>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="#contact"
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs transition-all shadow-md active:scale-98 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                }`}
              >
                <span>Get Started with {tier.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
