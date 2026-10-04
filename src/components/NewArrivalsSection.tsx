import React, { useState } from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from './ProductCard.tsx';
import { Sparkles, ArrowRight } from 'lucide-react';
import { navigateTo } from '../lib/router.ts';

interface NewArrivalsSectionProps {
  products: Product[];
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'smartphones' | 'laptops' | 'tvs' | 'gaming' | 'accessories'>('all');

  const tabs = [
    { id: 'all', label: 'All New Drops' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'tvs', label: 'TVs' },
    { id: 'gaming', label: 'Gaming Products' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category_slug === activeTab;
  }).slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Latest Generation Releases</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
            Freshly unboxed electronics featuring latest processors, higher refresh rates, and upgraded optics.
          </p>
        </div>

        {/* Tab Filter Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-[#2563EB]/25'
                  : 'bg-[#111F33] text-[#A7B4C7] hover:text-white border border-[#2563EB]/20 hover:bg-[#0D1B2A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-[#111F33] rounded-2xl border border-[#2563EB]/20">
          <p className="text-sm text-[#A7B4C7]">No new arrivals found in this category.</p>
        </div>
      )}
    </section>
  );
};
