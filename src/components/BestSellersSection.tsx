import React from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from './ProductCard.tsx';
import { navigateTo } from '../lib/router.ts';
import { Award, ArrowRight, Sparkles } from 'lucide-react';

interface BestSellersSectionProps {
  products: Product[];
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({ products }) => {
  const bestSellers = products
    .filter((p) => p.is_best_seller || p.rating >= 4.7)
    .slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Community Verified Top Picks</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Best Selling Electronics
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
            Our most frequently purchased hardware based on performance benchmarks and customer ratings.
          </p>
        </div>

        <a
          href="/shop?sort=popular"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/shop?sort=popular');
          }}
          className="text-xs font-bold text-[#2563EB] hover:text-[#06B6D4] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Explore All Best Sellers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellers.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};
