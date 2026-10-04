import React from 'react';
import { Product } from '../types/index.ts';
import { navigateTo } from '../lib/router.ts';
import { useStore } from '../context/StoreContext.tsx';
import {
  Smartphone,
  Cpu,
  Camera,
  BatteryCharging,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface SmartphoneShowcaseProps {
  smartphone?: Product;
}

export const SmartphoneShowcase: React.FC<SmartphoneShowcaseProps> = ({ smartphone }) => {
  const { formatPrice } = useStore();

  const phone = smartphone || {
    id: 'prod-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max (Natural Titanium)',
    slug: 'apple-iphone-16-pro-max-natural-titanium',
    brand: 'Apple',
    price: 144900,
    original_price: 159900,
    discount_percentage: 9,
    image_url:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
    short_description:
      'Grade 5 titanium design with sculpted edges, Camera Control button, 48MP Fusion quad-pixel sensor, and A18 Pro silicon.',
    specs: {
      processor: 'Apple A18 Pro (3nm 6-Core CPU + 6-Core GPU + 16-Core Neural Engine)',
      ram: '8GB Unified LPDDR5X',
      storage: '256GB / 512GB / 1TB NVMe',
      display: '6.9" Super Retina XDR OLED ProMotion 120Hz',
      camera: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto',
      battery: '4,685 mAh (Up to 33 hours video playback)',
    },
  };

  const salePrice = phone.price ?? 144900;
  const mrp = phone.original_price ?? 159900;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1B2A] via-[#111F33] to-[#07111F] border border-[#2563EB]/40 p-6 sm:p-12 shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Info Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#06B6D4] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>FLAGSHIP SMARTPHONE SHOWCASE</span>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A7B4C7] block">
              {phone.brand} Titanium Edition
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {phone.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-xl leading-relaxed">
              {phone.short_description}
            </p>
          </div>

          {/* Floating Spec Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-[#07111F]/80 border border-[#2563EB]/25 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#06B6D4] font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Processor</span>
              </div>
              <p className="text-[11px] text-white font-medium line-clamp-2">
                {phone.specs?.processor || 'Apple A18 Pro 3nm'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#07111F]/80 border border-[#2563EB]/25 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#7C3AED] font-bold">
                <Camera className="w-3.5 h-3.5" />
                <span>Optics</span>
              </div>
              <p className="text-[11px] text-white font-medium line-clamp-2">
                {phone.specs?.camera || '48MP Fusion + 5x Optical Zoom'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#07111F]/80 border border-[#2563EB]/25 backdrop-blur-md space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#22C55E] font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>Display</span>
              </div>
              <p className="text-[11px] text-white font-medium line-clamp-2">
                {phone.specs?.display || '6.9" ProMotion 120Hz OLED'}
              </p>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-black text-white">
                {formatPrice(salePrice)}
              </span>
              {mrp > salePrice && (
                <span className="font-mono text-sm text-neutral-500 line-through">
                  {formatPrice(mrp)}
                </span>
              )}
              {phone.discount_percentage ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#EF4444] text-white text-xs font-bold font-mono">
                  {phone.discount_percentage}% OFF
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo(`/product/${phone.slug}`)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs shadow-lg shadow-[#2563EB]/30 transition-all flex items-center gap-2"
              >
                <span>View Smartphone</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('/smartphones')}
                className="px-4 py-3.5 rounded-xl bg-[#07111F] hover:bg-[#0D1B2A] border border-[#2563EB]/30 text-white font-semibold text-xs transition-all"
              >
                All Phones
              </button>
            </div>
          </div>
        </div>

        {/* Right Visual Image (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-[#2563EB]/40 bg-[#07111F] shadow-2xl group cursor-pointer"
            onClick={() => navigateTo(`/product/${phone.slug}`)}
          >
            <img
              src={phone.image_url}
              alt={phone.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#111F33]/90 backdrop-blur-md border border-[#2563EB]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#06B6D4]" />
                <span className="font-bold text-white">Interactive 360° 3D Model</span>
              </div>
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase font-bold">
                Tap to Orbit &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
