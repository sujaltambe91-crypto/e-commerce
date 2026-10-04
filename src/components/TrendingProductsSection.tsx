import React from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from './ProductCard.tsx';
import { navigateTo } from '../lib/router.ts';
import { Flame, ArrowRight, TrendingUp } from 'lucide-react';

interface TrendingProductsSectionProps {
  products: Product[];
}

export const TrendingProductsSection: React.FC<TrendingProductsSectionProps> = ({ products }) => {
  const trendingList = products
    .filter((p) => p.is_trending || p.rating >= 4.7 || p.click_count > 500)
    .slice(0, 4);

  if (trendingList.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>VIRAL HARDWARE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Trending Products
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7]">
            Most viewed and heavily wishlisted consumer tech devices this week.
          </p>
        </div>

        <button
          onClick={() => navigateTo('/shop?sort=popular')}
          className="group inline-flex items-center gap-1 text-xs font-mono font-bold text-[#06B6D4] hover:text-white transition-colors"
        >
          <span>View All Trending</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
