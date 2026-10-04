import React from 'react';
import { navigateTo } from '../lib/router.ts';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface BrandItem {
  name: string;
  tagline: string;
  logoText: string;
  category: string;
  badge?: string;
}

export const BrandShowcase: React.FC = () => {
  // Top 9 Brands strictly matching user request: Apple, Samsung, Sony, LG, Dell, HP, Lenovo, ASUS, OnePlus
  const brands: BrandItem[] = [
    { name: 'Apple', tagline: 'iPhone, MacBook, iPad, Studio Display', logoText: ' Apple', category: 'smartphones', badge: 'Flagship Partner' },
    { name: 'Samsung', tagline: 'Galaxy S-Series, Neo QLED, Tab Ultra', logoText: 'SAMSUNG', category: 'smartphones', badge: 'Top Rated' },
    { name: 'Sony', tagline: 'Alpha Cinema Cameras, Bravia XR, WH-1000XM5', logoText: 'SONY', category: 'audio', badge: 'Pro Optics' },
    { name: 'LG', tagline: 'OLED evo G4, UltraGear 240Hz Monitors', logoText: 'LG OLED', category: 'tvs', badge: 'OLED Leader' },
    { name: 'Dell', tagline: 'XPS 16 Ultrabooks, Alienware, UltraSharp', logoText: 'DELL', category: 'laptops' },
    { name: 'HP', tagline: 'Spectre x360, OMEN Battlestations', logoText: 'hp', category: 'laptops' },
    { name: 'Lenovo', tagline: 'ThinkPad X1 Carbon, Legion Pro Rigs', logoText: 'Lenovo', category: 'laptops' },
    { name: 'ASUS', tagline: 'Republic of Gamers, Zephyrus, RTX 4090 Rigs', logoText: 'ASUS ROG', category: 'gaming', badge: 'Pro Esports' },
    { name: 'OnePlus', tagline: 'Flagship Killers, Hasselblad Cameras, Buds Pro', logoText: 'ONEPLUS', category: 'smartphones' },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Authorized Global Partners</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Top Brands
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
            Every product is backed by 100% genuine manufacturer warranties and direct brand authorized service.
          </p>
        </div>

        <a
          href="/shop"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/shop');
          }}
          className="text-xs font-bold text-[#2563EB] hover:text-[#06B6D4] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Explore All Brand Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.name}
            onClick={() => navigateTo(`/shop?brand=${encodeURIComponent(brand.name)}`)}
            className="group relative rounded-2xl bg-[#111F33] border border-[#2563EB]/25 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] p-4 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-lg font-black tracking-tight text-white group-hover:text-[#06B6D4] transition-colors">
                {brand.logoText}
              </span>
              {brand.badge && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#2563EB]/20 text-[#06B6D4] border border-[#2563EB]/30">
                  {brand.badge}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-[11px] text-[#A7B4C7] line-clamp-1">
                {brand.tagline}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#2563EB] group-hover:text-[#7C3AED] transition-colors">
                <span>View Products</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
