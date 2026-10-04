import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { ShieldCheck, Award, HeartHandshake, Eye, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-6">
      <SeoHead
        title="About Our Curation"
        description={`Learn how ${settings.brand_name} tests, evaluates, and selects only the top 1% of e-commerce products.`}
      />

      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Our Philosophy & Mission
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Curating Products You'll Actually Love
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          The internet is saturated with counterfeit reviews, cheap knockoffs, and overwhelming choice.
          {settings.brand_name} was founded to cut through the noise with uncompromising editorial honesty.
        </p>
      </div>

      {/* Grid of Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Tested & Vetted</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Every product in our catalog meets strict benchmarks for material durability, manufacturer warranty, and customer satisfaction ratings over 4.2 stars.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Direct Amazon Fulfillment</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            You always transact safely on Amazon. You enjoy official Amazon Prime fast delivery, secure payment processing, and hassle-free returns.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Full Transparency</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            We are proud participants in the Amazon Associates program. When you buy through our links, we may earn an affiliate commission at zero extra cost to you.
          </p>
        </div>
      </div>

      {/* Editorial Process */}
      <div className="p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-6">
        <h2 className="font-display text-2xl font-bold text-white tracking-tight">
          How We Evaluate Products
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Authentic Review Sentiment</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                We run review velocity and sentiment algorithms to filter out fake or incentivized buyer reviews.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Price History & Discount Integrity</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                We only showcase discounts that are genuine price reductions rather than artificially inflated list prices.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Direct Manufacturer Warranties</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                We confirm genuine manufacturer warranties and reputable customer support channels for all electronics and high-ticket items.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
