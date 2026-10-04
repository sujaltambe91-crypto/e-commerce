import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Laptop,
  Smartphone,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  Package,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface StepDetail {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  previewType: 'shapes' | 'laptop' | 'website' | 'mobile' | 'products' | 'cart' | 'checkout' | 'payment' | 'success' | 'delivery' | 'cta';
}

const FLOW_STEPS: StepDetail[] = [
  {
    id: 1,
    label: '01. Page Load',
    title: 'Client Lands On Your Storefront',
    description: 'Ultra-fast optimized page load with server-side caching and dynamic CDN distribution.',
    icon: Sparkles,
    color: 'text-amber-400',
    previewType: 'shapes',
  },
  {
    id: 2,
    label: '02. 3D Shapes Enter',
    title: 'Floating Orange Geometry Emerges',
    description: 'Kinetic 3D polygon crystals glide into the viewport creating an immersive visual hook.',
    icon: Sparkles,
    color: 'text-orange-500',
    previewType: 'shapes',
  },
  {
    id: 3,
    label: '03. 3D Laptop Rotates',
    title: 'Desktop Viewport Unfolds',
    description: 'Realistic metallic laptop rotates into focus showcasing full desktop responsiveness.',
    icon: Laptop,
    color: 'text-amber-400',
    previewType: 'laptop',
  },
  {
    id: 4,
    label: '04. Website Loads On Laptop',
    title: 'WooCommerce Storefront Renders',
    description: 'Dynamic products, categories, search bar, and hero sliders illuminate in high contrast.',
    icon: Laptop,
    color: 'text-orange-400',
    previewType: 'website',
  },
  {
    id: 5,
    label: '05. Smartphone Appears',
    title: 'Mobile Shopping Experience',
    description: 'Mobile responsive touch-friendly shopping app slides beside the desktop canvas.',
    icon: Smartphone,
    color: 'text-blue-400',
    previewType: 'mobile',
  },
  {
    id: 6,
    label: '06. Products Start Floating',
    title: '3D Products Hover In Motion',
    description: 'Running shoes, smartwatches, studio headphones, and leather bags levitate in 3D orbit.',
    icon: ShoppingBag,
    color: 'text-purple-400',
    previewType: 'products',
  },
  {
    id: 7,
    label: '07. Product Goes Into Cart',
    title: 'Interactive Add-To-Cart Action',
    description: 'Selected product flies seamlessly into the shopping cart with live subtotal calculation.',
    icon: ShoppingBag,
    color: 'text-amber-400',
    previewType: 'cart',
  },
  {
    id: 8,
    label: '08. Cart Goes To Checkout',
    title: 'Streamlined One-Page Checkout',
    description: 'Customer contact fields, shipping address validation, and instant coupon verification.',
    icon: ShoppingBag,
    color: 'text-orange-400',
    previewType: 'checkout',
  },
  {
    id: 9,
    label: '09. Payment Animation',
    title: 'Secure Payment Gateway Flow',
    description: 'Card details, UPI, NetBanking, or Amazon partner redirect secured via 256-bit encryption.',
    icon: CreditCard,
    color: 'text-cyan-400',
    previewType: 'payment',
  },
  {
    id: 10,
    label: '10. Payment Successful',
    title: 'Instant Order Confirmation',
    description: 'Digital receipt generated, customer WhatsApp notification triggered, and inventory synced.',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    previewType: 'success',
  },
  {
    id: 11,
    label: '11. Delivery Box Appears',
    title: 'Integrated Courier Fulfillment',
    description: 'Shipping label printed, tracking number dispatched to customer, and dispatch scheduled.',
    icon: Package,
    color: 'text-amber-500',
    previewType: 'delivery',
  },
  {
    id: 12,
    label: '12. CTA: Start Your Store',
    title: 'Ready To Sell Anything, Anywhere?',
    description: 'Launch your complete WooCommerce e-commerce website with Marketingwalaa today for just ₹10,999!',
    icon: ArrowRight,
    color: 'text-orange-500',
    previewType: 'cta',
  },
];

export const AnimationFlowSimulator: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const step = FLOW_STEPS[currentStepIndex];
  const StepIcon = step.icon;

  return (
    <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-8">
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D E-Commerce Journey</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Animated Customer Purchase Flow
          </h3>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800 shrink-0">
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => (prev === 0 ? FLOW_STEPS.length - 1 : prev - 1));
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 transition-colors"
            title="Previous Stage"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold rounded-xl transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIndex((prev) => (prev + 1) % FLOW_STEPS.length);
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 transition-colors"
            title="Next Stage"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCurrentStepIndex(0);
              setIsPlaying(true);
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-900 transition-colors"
            title="Restart Flow"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Flow Stage Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Step Information (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-amber-400">
            <span>Stage {step.id} of {FLOW_STEPS.length}</span>
            <span>·</span>
            <span>{step.label}</span>
          </div>

          <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {step.title}
          </h4>

          <p className="text-sm text-neutral-300 leading-relaxed">
            {step.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {FLOW_STEPS.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  setIsPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-8 bg-gradient-to-r from-orange-500 to-amber-500'
                    : idx < currentStepIndex
                    ? 'w-3 bg-neutral-600'
                    : 'w-2 bg-neutral-800'
                }`}
                title={s.label}
              />
            ))}
          </div>

          {step.previewType === 'cta' && (
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95"
              >
                <span>CLAIM ₹10,999 SPECIAL OFFER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Visual Stage Simulation Canvas (7 cols) */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl bg-neutral-950 border border-neutral-800/80 overflow-hidden flex items-center justify-center p-6">
          {/* Ambient geometric orange backlight */}
          <div className="absolute w-64 h-64 rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />

          {/* Dynamic Scene Renderer based on step */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center transition-all duration-500 animate-in fade-in zoom-in-95">
            {step.previewType === 'shapes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 rotate-45 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 shadow-xl shadow-orange-500/30 animate-bounce" />
                  <div className="w-12 h-12 rotate-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 shadow-lg shadow-amber-500/20 animate-pulse" />
                </div>
                <p className="text-xs font-mono text-neutral-400">
                  Initializing Three.js WebGL 3D Canvas & Kinetic Assets...
                </p>
              </div>
            )}

            {step.previewType === 'laptop' && (
              <div className="relative w-64 h-40 rounded-xl bg-neutral-900 border-2 border-neutral-700 shadow-2xl flex flex-col items-center justify-center p-3 animate-in slide-in-from-bottom-6">
                <Laptop className="w-12 h-12 text-amber-500 mb-2" />
                <span className="text-xs font-bold text-white">Full-Stack Responsive Storefront</span>
                <span className="text-[10px] text-neutral-400 font-mono">1440px Desktop Baseline</span>
              </div>
            )}

            {step.previewType === 'website' && (
              <div className="w-full max-w-sm rounded-xl bg-neutral-900 border border-neutral-700 overflow-hidden shadow-2xl text-left">
                <div className="bg-neutral-800 px-3 py-1.5 flex items-center gap-1.5 border-b border-neutral-700">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-neutral-400 ml-2">shopkart.store</span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-10 rounded-lg bg-orange-600/30 border border-orange-500/40 p-2 flex items-center justify-between text-xs text-white font-bold">
                    <span>Upgrade Your Shopping</span>
                    <span className="px-2 py-0.5 rounded bg-orange-500 text-neutral-950 text-[10px]">Shop Now</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-14 rounded bg-neutral-800/80 p-1 text-[9px] text-neutral-400">Headphones</div>
                    <div className="h-14 rounded bg-neutral-800/80 p-1 text-[9px] text-neutral-400">Smartwatch</div>
                    <div className="h-14 rounded bg-neutral-800/80 p-1 text-[9px] text-neutral-400">Sneakers</div>
                  </div>
                </div>
              </div>
            )}

            {step.previewType === 'mobile' && (
              <div className="w-48 h-80 rounded-3xl bg-neutral-900 border-4 border-neutral-700 shadow-2xl p-3 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-2" />
                  <div className="text-xs font-bold text-amber-500">ShopKart App</div>
                  <div className="p-2 rounded-lg bg-neutral-800 text-[10px] text-neutral-300">
                    Touch-Optimized PWA
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-orange-500 text-neutral-950 text-center text-xs font-bold">
                  Tap to Buy
                </div>
              </div>
            )}

            {step.previewType === 'products' && (
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                {['👟 Running Shoes', '⌚ Smartwatch', '🎧 ANC Headphones', '👜 Leather Tote'].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-200 shadow-lg animate-bounce"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            {step.previewType === 'cart' && (
              <div className="max-w-xs w-full p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>Shopping Cart</span>
                  <span className="text-amber-500">1 Item</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-950 flex items-center justify-between text-xs">
                  <span>Pro-Studio ANC Headphones</span>
                  <span className="font-mono font-bold text-white">₹14,999</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-xs font-bold">
                  <span>Subtotal</span>
                  <span className="text-emerald-400 font-mono">₹14,999</span>
                </div>
              </div>
            )}

            {step.previewType === 'checkout' && (
              <div className="max-w-xs w-full p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 text-left">
                <span className="text-xs font-bold text-white block">One-Page Checkout</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 rounded bg-neutral-950 text-neutral-400">Customer: Rahul Verma</div>
                  <div className="p-2 rounded bg-neutral-950 text-neutral-400">Shipping: Express Mumbai</div>
                  <div className="p-2 rounded bg-emerald-950/60 text-emerald-400 font-semibold">Coupon: SALE10 Applied</div>
                </div>
              </div>
            )}

            {step.previewType === 'payment' && (
              <div className="max-w-xs w-full p-5 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-700 shadow-2xl space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <CreditCard className="w-6 h-6 text-amber-500" />
                  <span className="text-xs font-mono font-bold text-neutral-400">256-BIT SSL</span>
                </div>
                <div className="font-mono text-sm text-neutral-300">•••• •••• •••• 4242</div>
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>EXP: 08/29</span>
                  <span>UPI / NETBANKING / CARD</span>
                </div>
              </div>
            )}

            {step.previewType === 'success' && (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-base font-bold text-white">Payment Successful</h4>
                <p className="text-xs text-neutral-400 font-mono">Order #MKW-8941 Confirmed</p>
              </div>
            )}

            {step.previewType === 'delivery' && (
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
                  <Package className="w-9 h-9" />
                </div>
                <h4 className="text-base font-bold text-white">Courier Dispatch Scheduled</h4>
                <p className="text-xs text-neutral-400 font-mono">Tracking: IN-EXP-99214</p>
              </div>
            )}

            {step.previewType === 'cta' && (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-neutral-950 flex items-center justify-center mx-auto shadow-xl shadow-orange-500/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Your Business Online In 3 Days</h4>
                <p className="text-xs text-neutral-300 max-w-xs mx-auto">
                  Domain + Hosting + WooCommerce + Payment Gateway + WhatsApp + App Integration
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
