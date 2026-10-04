import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from './ProductCard.tsx';
import { navigateTo } from '../lib/router.ts';
import { Flame, Clock, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

interface FlashSaleSectionProps {
  products: Product[];
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ products }) => {
  const { formatPrice, trackAndRedirect } = useStore();
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
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
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products with highest discount
  const saleProducts = products
    .filter((p) => p.discount_percentage && p.discount_percentage >= 5)
    .sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0))
    .slice(0, 4);

  const heroSaleProduct = saleProducts[0] || products[0];

  return (
    <section id="flash-sale" className="space-y-6">
      {/* Flash Sale Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#111F33] via-[#0D1B2A] to-[#111F33] border border-[#EF4444]/30 shadow-xl shadow-[#EF4444]/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444]">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#EF4444] uppercase tracking-wider">
                Limited Time Drop
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#EF4444] text-white">
                FLASH SALE
              </span>
            </div>
            <h2 className="font-display text-2xl font-black text-white tracking-tight">
              Today's Mega Electronics Deals
            </h2>
          </div>
        </div>

        {/* Live Countdown Timer (Sale Color: Red/Coral #EF4444) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#A7B4C7] mr-1">
            <Clock className="w-4 h-4 text-[#EF4444]" />
            <span>Ends In:</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-sm font-black">
            <div className="px-2.5 py-1.5 rounded-lg bg-[#EF4444] text-white shadow-md">
              {String(timeLeft.hours).padStart(2, '0')}h
            </div>
            <span className="text-[#EF4444] font-bold">:</span>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#EF4444] text-white shadow-md">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
            <span className="text-[#EF4444] font-bold">:</span>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#EF4444] text-white shadow-md">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>
        </div>
      </div>

      {/* Featured Spotlight Flash Sale Item + Grid */}
      {heroSaleProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Spotlight Hero Deal Card */}
          <div className="lg:col-span-4 bg-[#111F33] rounded-3xl border border-[#EF4444]/40 p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#EF4444] text-white font-black text-xs uppercase tracking-wider rounded-bl-2xl shadow-md">
              Save {heroSaleProduct.discount_percentage || 15}% OFF
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider">
                Deal of the Day
              </span>
              <h3 className="font-display text-xl font-bold text-white leading-snug">
                {heroSaleProduct.name}
              </h3>

              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#0D1B2A] border border-[#2563EB]/20 my-2">
                <img
                  src={heroSaleProduct.image_url}
                  alt={heroSaleProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white font-mono">
                    {formatPrice(heroSaleProduct.price)}
                  </span>
                  {heroSaleProduct.original_price && (
                    <span className="text-sm text-neutral-500 line-through font-mono">
                      {formatPrice(heroSaleProduct.original_price)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#22C55E] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Free Express Delivery & Verified Seller Warranty</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#2563EB]/20">
              <button
                onClick={() => navigateTo(`/product/${heroSaleProduct.slug}`)}
                className="w-full py-3 px-4 bg-[#EF4444] hover:bg-[#dc2626] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#EF4444]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Buy Now at Flash Price</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Adjacent Flash Sale Product Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {saleProducts.slice(1, 4).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
