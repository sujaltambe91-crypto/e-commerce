import React, { useState } from 'react';
import { Product } from '../types/index.ts';
import { navigateTo } from '../lib/router.ts';
import { useStore } from '../context/StoreContext.tsx';
import {
  Gamepad2,
  Laptop,
  Cpu,
  Monitor,
  Headphones,
  Keyboard,
  Mouse,
  ArrowRight,
  Zap,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface GamingZoneProps {
  products: Product[];
}

export const GamingZone: React.FC<GamingZoneProps> = ({ products }) => {
  const { formatPrice, addToCart } = useStore();
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    'all' | 'laptop' | 'pc' | 'monitor' | 'peripherals'
  >('all');

  // Curated gaming hardware items
  const gamingItems = [
    {
      id: 'game-1',
      type: 'laptop',
      name: 'ASUS ROG Strix SCAR 18 (2026 Edition)',
      subtitle: 'Core i9-14900HX • RTX 4090 16GB • 240Hz Nebula HDR',
      category: 'Gaming Laptop',
      price: 359990,
      original_price: 389990,
      image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      badge: 'TOP TIER RIG',
    },
    {
      id: 'game-2',
      type: 'pc',
      name: 'Alienware Aurora R16 Liquid-Cooled Desktop',
      subtitle: 'Intel Core Ultra 9 • RTX 4080 Super • 64GB DDR5',
      category: 'Gaming PC',
      price: 289900,
      original_price: 319900,
      image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      badge: 'CUSTOM LIQUID RGB',
    },
    {
      id: 'game-3',
      type: 'monitor',
      name: 'Samsung Odyssey OLED G9 (49" Curved 240Hz)',
      subtitle: 'Dual QHD 5120x1440 • 0.03ms Response • Neo Quantum',
      category: 'Gaming Monitor',
      price: 139999,
      original_price: 169999,
      image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      badge: 'ULTRAWIDE OLED',
    },
    {
      id: 'game-4',
      type: 'peripherals',
      name: 'SteelSeries Apex Pro TKL Mechanical Keyboard',
      subtitle: 'OmniPoint 2.0 Adjustable Switches • OLED Smart Display',
      category: 'Keyboard',
      price: 19999,
      original_price: 24999,
      image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      badge: 'ESPORTS GRADE',
    },
    {
      id: 'game-5',
      type: 'peripherals',
      name: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse',
      subtitle: 'HERO 2 Sensor 32,000 DPI • 60g Featherweight',
      category: 'Mouse',
      price: 14995,
      original_price: 17995,
      image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      badge: 'HERO SENSOR',
    },
    {
      id: 'game-6',
      type: 'peripherals',
      name: 'HyperX Cloud III Wireless 7.1 Gaming Headset',
      subtitle: '120-Hour Battery • DTS Headphone:X Spatial Audio',
      category: 'Headset',
      price: 13990,
      original_price: 16990,
      image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      badge: 'SPATIAL AUDIO',
    },
  ];

  const filteredItems = gamingItems.filter((item) => {
    if (selectedSubcategory === 'all') return true;
    return item.type === selectedSubcategory;
  });

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07111F] via-[#0D1B2A] to-[#111F33] border border-[#7C3AED]/50 shadow-2xl p-6 sm:p-10 lg:p-12">
      {/* Neon Purple + Blue Glow Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2563EB]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header Strip */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#7C3AED]/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/50 text-[#06B6D4] text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <Gamepad2 className="w-4 h-4 text-[#7C3AED]" />
            <span>NEON BATTLESTATION ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            GAMING{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#2563EB]">
              ZONE
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A7B4C7] max-w-xl mt-1">
            Engineered for competitive esports and AAA ultra-settings: high-TGP gaming laptops, liquid-cooled towers, 240Hz monitors, and mechanical peripherals.
          </p>
        </div>

        {/* Filter Navigation: Laptop, PC, Monitor, Keyboard, Mouse, Headset */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Gear' },
            { id: 'laptop', label: 'Gaming Laptop' },
            { id: 'pc', label: 'Gaming PC' },
            { id: 'monitor', label: 'Monitor' },
            { id: 'peripherals', label: 'Peripherals' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubcategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSubcategory === tab.id
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-lg shadow-[#7C3AED]/30 scale-105'
                  : 'bg-[#111F33] text-[#A7B4C7] hover:text-white border border-[#7C3AED]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hardware Grid with Neon Purple + Blue borders */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-[#111F33] border border-[#7C3AED]/35 hover:border-[#06B6D4] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all duration-300 p-4 flex flex-col justify-between"
          >
            <div>
              {/* Image Preview with Badge */}
              <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-[#07111F] mb-3.5 border border-[#2563EB]/20">
                <img
                  src={item.image_url}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#7C3AED] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                  {item.badge}
                </div>
              </div>

              {/* Category & Title */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="font-display text-base font-bold text-white group-hover:text-[#06B6D4] transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[#A7B4C7] line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 mt-3 border-t border-[#7C3AED]/20 flex items-center justify-between">
              <div>
                <div className="text-base font-black text-white font-mono">
                  {formatPrice(item.price)}
                </div>
                {item.original_price && (
                  <div className="text-xs text-neutral-500 line-through font-mono">
                    {formatPrice(item.original_price)}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateTo('/gaming')}
                className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6d28d9] hover:to-[#1d4ed8] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 pt-8 mt-6 border-t border-[#7C3AED]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#A7B4C7]">
          <Zap className="w-4 h-4 text-[#06B6D4]" />
          <span>All gaming rigs backed by 3-Year On-Site Thermal & Hardware Warranty</span>
        </div>

        <a
          href="/gaming"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/gaming');
          }}
          className="text-xs font-bold text-[#06B6D4] hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>Visit Full Gaming Zone Department</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
