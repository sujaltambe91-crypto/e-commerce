import React from 'react';
import { Product } from '../types/index.ts';
import { navigateTo } from '../lib/router.ts';
import { useStore } from '../context/StoreContext.tsx';
import { Tv, Sparkles, Monitor, ArrowRight, ShieldCheck } from 'lucide-react';

interface TvShowcaseProps {
  tvProduct?: Product;
}

export const TvShowcase: React.FC<TvShowcaseProps> = ({ tvProduct }) => {
  const { formatPrice } = useStore();

  const defaultTv: Partial<Product> = {
    id: 'prod-lg-c4-oled-65',
    name: 'LG 65" Class C4 Series 4K OLED evo Smart TV',
    slug: 'lg-65-c4-series-oled-4k',
    brand: 'LG',
    price: 189990,
    original_price: 249990,
    discount_percentage: 24,
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Self-lit pixels deliver infinite contrast, 100% color volume, and ultra-smooth 144Hz gaming with NVIDIA G-Sync & Dolby Vision IQ.',
    specs: {
      screen_size: '65 Inch (164 cm)',
      resolution: '4K Ultra HD (3840 x 2160 pixels)',
      refresh_rate: '144Hz Native Refresh Rate',
      panel_type: 'True-Black OLED evo Panel with Brightness Booster',
      hdr: 'Dolby Vision IQ, HDR10, HLG',
    },
  };

  const item = tvProduct || defaultTv;
  const specs = item.specs || {};

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111F33] via-[#0D1B2A] to-[#07111F] border border-[#2563EB]/40 shadow-2xl p-6 sm:p-10 lg:p-12">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-80 h-80 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: 3D TV Visual & Preview (6 cols) */}
        <div className="lg:col-span-6 relative order-2 lg:order-1">
          <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-[#07111F] border border-[#2563EB]/40 shadow-2xl group">
            <img
              src={item.image_url}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#07111F]/85 backdrop-blur-md border border-[#2563EB]/40 text-xs font-mono text-[#06B6D4] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
              <span>3D Interactive Cinema Panel</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#A7B4C7]">
              <span>Bezel-less Architectural Titanium Mount</span>
              <span className="text-[#22C55E]">Dolby Atmos 40W Audio</span>
            </div>
          </div>
        </div>

        {/* Right Column: TV Specs & Details (6 cols) */}
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED] text-xs font-mono font-bold tracking-widest uppercase">
            <Tv className="w-3.5 h-3.5" />
            <span>CINEMA AT HOME • TRUE-BLACK OLED</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {item.name}
            </h2>
            <p className="text-sm sm:text-base text-[#A7B4C7] leading-relaxed">
              {item.short_description}
            </p>
          </div>

          {/* TV Technical Specs: Screen Size, Resolution, Refresh Rate, Panel Type */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Screen Size
              </span>
              <span className="text-sm font-bold text-white block">
                {specs.screen_size || '65" Diagonal (164 cm)'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Resolution
              </span>
              <span className="text-sm font-bold text-white block">
                {specs.resolution || '4K Ultra HD (3840 x 2160)'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Refresh Rate
              </span>
              <span className="text-sm font-bold text-white block">
                {specs.refresh_rate || '144Hz VRR / G-Sync Ready'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Panel Type
              </span>
              <span className="text-sm font-bold text-white block">
                {specs.panel_type || 'Self-Lit True-Black OLED evo'}
              </span>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {formatPrice(item.price)}
              </span>
              {item.original_price && (
                <span className="text-sm text-neutral-500 line-through font-mono">
                  {formatPrice(item.original_price)}
                </span>
              )}
            </div>

            <button
              onClick={() => navigateTo('/tvs')}
              className="px-7 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#2563EB]/30 transition-all flex items-center gap-2 group"
            >
              <span>View TVs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
