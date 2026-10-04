import React from 'react';
import { Product } from '../types/index.ts';
import { navigateTo } from '../lib/router.ts';
import { useStore } from '../context/StoreContext.tsx';
import { Cpu, HardDrive, Monitor, Zap, ArrowRight, ShieldCheck, Layers } from 'lucide-react';

interface LaptopShowcaseProps {
  laptop?: Product;
}

export const LaptopShowcase: React.FC<LaptopShowcaseProps> = ({ laptop }) => {
  const { formatPrice } = useStore();

  // Fallback flagship laptop data if not found in db
  const defaultLaptop: Partial<Product> = {
    id: 'prod-macbook-pro-m4',
    name: 'MacBook Pro 16" (Apple M4 Max)',
    slug: 'apple-macbook-pro-16-m4-max',
    brand: 'Apple',
    price: 349900,
    original_price: 369900,
    discount_percentage: 5,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Engineered for extreme creator workloads and AI models with up to 128GB Unified Memory and Liquid Retina XDR display.',
    specs: {
      processor: 'Apple M4 Max (16-Core CPU, 40-Core GPU, 16-Core Neural Engine)',
      ram: '64GB Unified Memory',
      storage: '1TB Ultra-Fast NVMe SSD',
      graphics: '40-Core Integrated GPU with Hardware Ray-Tracing',
      display: '16.2" Liquid Retina XDR (3456 x 2234), 120Hz ProMotion, 1600 nits Peak',
    },
  };

  const item = laptop || defaultLaptop;
  const specs = item.specs || {};

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D1B2A] via-[#111F33] to-[#07111F] border border-[#2563EB]/40 shadow-2xl p-6 sm:p-10 lg:p-12">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Specs & CTAs (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-mono font-bold tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>PRO CREATOR & AI POWERHOUSE</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {item.name}
            </h2>
            <p className="text-sm sm:text-base text-[#A7B4C7] leading-relaxed">
              {item.short_description}
            </p>
          </div>

          {/* Key Specs Grid: Processor, RAM, Storage, Graphics, Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Processor
              </span>
              <span className="text-xs font-bold text-white block">
                {specs.processor || 'Apple M4 Max 16-Core / Intel Core Ultra 9'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                RAM / Memory
              </span>
              <span className="text-xs font-bold text-white block">
                {specs.ram || '64GB High-Bandwidth Memory'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Storage
              </span>
              <span className="text-xs font-bold text-white block">
                {specs.storage || '1TB NVMe PCIe 4.0 SSD'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Graphics (GPU)
              </span>
              <span className="text-xs font-bold text-white block">
                {specs.graphics || '40-Core GPU Ray-Tracing'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07111F]/80 border border-[#2563EB]/20 space-y-1 sm:col-span-2">
              <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
                Display
              </span>
              <span className="text-xs font-bold text-white block">
                {specs.display || '16.2" Liquid Retina XDR, 120Hz ProMotion Mini-LED'}
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
              onClick={() => navigateTo(`/product/${item.slug || 'apple-macbook-pro-16-m4-max'}`)}
              className="px-7 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#2563EB]/30 transition-all flex items-center gap-2 group"
            >
              <span>View Laptop</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Large Laptop Image (6 cols) */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-[#07111F] border border-[#2563EB]/30 shadow-2xl group">
            <img
              src={item.image_url}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-[#07111F]/80 backdrop-blur-md border border-[#2563EB]/40 text-xs font-mono text-[#06B6D4] flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Full Precision Metal Chassis & MagSafe 3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
