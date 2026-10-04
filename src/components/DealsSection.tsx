import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from './ProductCard.tsx';
import { navigateTo } from '../lib/router.ts';
import { Clock, Flame, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

interface DealsSectionProps {
  products: Product[];
}

export const DealsSection: React.FC<DealsSectionProps> = ({ products }) => {
  // Live countdown timer for Today's Deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(
    (p) => (p.discount_percentage && p.discount_percentage >= 10) || p.is_trending
  ).slice(0, 4);

  if (dealProducts.length === 0) return null;

  return (
    <section id="todays-deals" className="space-y-6">
      {/* Deals Header with Live Countdown Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-950/60 via-amber-950/40 to-neutral-900 border border-red-500/20 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-bounce" />
            <span>LIGHTNING ELECTRONICS DEALS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Today's Best Electronics Deals
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
            Verified flash discounts on flagship smartphones, gaming laptops, and studio audio. Verified price drops refreshed every 24 hours.
          </p>
        </div>

        {/* Live Countdown Display */}
        <div className="flex items-center gap-4 bg-neutral-950/80 border border-neutral-800 p-4 rounded-2xl shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Ends In:</span>
          </div>

          <div className="flex items-center gap-2 text-center font-mono">
            <div className="bg-neutral-900 px-3 py-2 rounded-xl border border-neutral-800">
              <span className="text-xl font-bold text-white block leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-neutral-500 uppercase">Hours</span>
            </div>
            <span className="text-amber-500 font-bold">:</span>
            <div className="bg-neutral-900 px-3 py-2 rounded-xl border border-neutral-800">
              <span className="text-xl font-bold text-white block leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-neutral-500 uppercase">Mins</span>
            </div>
            <span className="text-amber-500 font-bold">:</span>
            <div className="bg-neutral-900 px-3 py-2 rounded-xl border border-neutral-800">
              <span className="text-xl font-bold text-red-400 block leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-neutral-500 uppercase">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
