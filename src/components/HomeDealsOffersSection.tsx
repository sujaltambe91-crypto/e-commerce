import React from 'react';
import { navigateTo } from '../lib/router.ts';
import { useStore } from '../context/StoreContext.tsx';
import {
  Tag,
  CreditCard,
  Percent,
  ArrowRight,
  Sparkles,
  Zap,
  Gift,
  Copy,
  Check,
} from 'lucide-react';

export const HomeDealsOffersSection: React.FC = () => {
  const { showToast } = useStore();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon ${code} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const dealCards = [
    {
      title: 'HDFC Instant Card Discount',
      badge: 'BANK OFFER',
      badgeColor: 'bg-[#2563EB] text-white',
      desc: 'Flat ₹5,000 instant discount on orders above ₹40,000 with HDFC Bank Credit Cards & EasyEMI.',
      code: 'HDFCINSTANT',
      action: 'Apply in Checkout',
    },
    {
      title: 'First-Time Tech Welcome Bonus',
      badge: 'FLAT 10% OFF',
      badgeColor: 'bg-[#7C3AED] text-white',
      desc: 'Get 10% off up to ₹3,500 on your first electronics order across smartphones, audio, and laptops.',
      code: 'ELECTRO10',
      action: 'Copy Code',
    },
    {
      title: 'Esports Rigs No-Cost EMI',
      badge: '0% INTEREST',
      badgeColor: 'bg-[#22C55E] text-white',
      desc: 'Spread your payments over up to 12 months with 0% interest and zero down payment on gaming setups.',
      code: 'NOCOSTEMI',
      action: 'Check Eligibility',
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#7C3AED] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>EXCLUSIVE PROMOTIONS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Deals & Offers
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7]">
            Active bank cashbacks, coupon codes, and bundle bonuses to maximize your savings.
          </p>
        </div>

        <button
          onClick={() => navigateTo('/deals')}
          className="group inline-flex items-center gap-1 text-xs font-mono font-bold text-[#06B6D4] hover:text-white transition-colors"
        >
          <span>View All Deals Hub</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dealCards.map((deal) => (
          <div
            key={deal.title}
            className="p-6 rounded-3xl bg-[#111F33] border border-[#2563EB]/25 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono tracking-wider inline-block ${deal.badgeColor}`}>
                {deal.badge}
              </span>

              <h3 className="text-base font-bold text-white leading-snug">
                {deal.title}
              </h3>

              <p className="text-xs text-[#A7B4C7] leading-relaxed">
                {deal.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-[#2563EB]/20 flex items-center justify-between">
              <button
                onClick={() => handleCopy(deal.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/30 hover:border-[#06B6D4] text-xs font-mono font-bold text-[#06B6D4] transition-colors"
              >
                {copiedCode === deal.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="text-[#22C55E]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{deal.code}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTo('/deals')}
                className="text-xs font-bold text-white hover:text-[#06B6D4] transition-colors"
              >
                Details &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
