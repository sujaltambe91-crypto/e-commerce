import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Zap,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Instagram,
  Youtube,
  Github,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, categories } = useStore();

  return (
    <footer className="bg-[#07111F] border-t border-[#2563EB]/20 text-[#A7B4C7] text-sm mt-20">
      {/* 4 Trust Highlights Strip */}
      <div className="border-b border-[#2563EB]/20 py-8 bg-[#0D1B2A]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#111F33] border border-[#2563EB]/30 flex items-center justify-center shrink-0 text-[#06B6D4]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Fast Delivery</h4>
              <p className="text-[#A7B4C7] text-xs mt-0.5">24-48h Express Shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#111F33] border border-[#2563EB]/30 flex items-center justify-center shrink-0 text-[#22C55E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">100% Genuine</h4>
              <p className="text-[#A7B4C7] text-xs mt-0.5">Official Brand Warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#111F33] border border-[#2563EB]/30 flex items-center justify-center shrink-0 text-[#7C3AED]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Easy Returns</h4>
              <p className="text-[#A7B4C7] text-xs mt-0.5">7-Day Doorstep Pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#111F33] border border-[#2563EB]/30 flex items-center justify-center shrink-0 text-[#2563EB]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">24/7 Support</h4>
              <p className="text-[#A7B4C7] text-xs mt-0.5">Expert Tech Help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links: About, Categories, Customer Service, Contact, Social Media */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Column 1: Brand & About */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="font-display text-2xl font-black text-white tracking-tight">
              {settings.brand_name || 'ElectroPulse'}
            </span>
            <span className="text-xs font-mono font-bold text-[#06B6D4]">3D</span>
          </div>

          <p className="text-xs text-[#A7B4C7] leading-relaxed max-w-sm">
            India's next-generation electronics destination combining 360° interactive 3D device inspection, transparent tech benchmarks, and authentic brand fulfillment.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#111F33] border border-[#2563EB]/20 flex items-center justify-center text-[#A7B4C7] hover:text-[#06B6D4] hover:border-[#06B6D4] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#111F33] border border-[#2563EB]/20 flex items-center justify-center text-[#A7B4C7] hover:text-[#7C3AED] hover:border-[#7C3AED] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#111F33] border border-[#2563EB]/20 flex items-center justify-center text-[#A7B4C7] hover:text-[#EF4444] hover:border-[#EF4444] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#111F33] border border-[#2563EB]/20 flex items-center justify-center text-[#A7B4C7] hover:text-white hover:border-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Categories
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 7).map((c) => (
              <li key={c.id}>
                <a
                  href={`/shop?category=${c.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/shop?category=${c.slug}`);
                  }}
                  className="hover:text-[#06B6D4] transition-colors"
                >
                  {c.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/categories"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/categories');
                }}
                className="text-[#2563EB] hover:text-[#06B6D4] font-semibold flex items-center gap-1"
              >
                <span>All Categories →</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Customer Service
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="/order-tracking"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/order-tracking');
                }}
                className="hover:text-[#06B6D4] transition-colors"
              >
                Track Your Order
              </a>
            </li>
            <li>
              <a
                href="/wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/wishlist');
                }}
                className="hover:text-[#06B6D4] transition-colors"
              >
                Wishlist
              </a>
            </li>
            <li>
              <a
                href="/compare"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/compare');
                }}
                className="hover:text-[#06B6D4] transition-colors"
              >
                Product Comparison
              </a>
            </li>
            <li>
              <a
                href="/deals"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/deals');
                }}
                className="hover:text-[#06B6D4] transition-colors"
              >
                Flash Sales & Offers
              </a>
            </li>
            <li>
              <a
                href="/support"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/support');
                }}
                className="hover:text-[#06B6D4] transition-colors"
              >
                Returns & Refunds
              </a>
            </li>
            <li>
              <a
                href="/support"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/support');
                }}
                className="hover:text-[#06B6D4] transition-colors"
              >
                Warranty Claims
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Information */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Contact
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
              <span>{settings.contact_email || 'support@electropulse.store'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <span>{settings.contact_phone || '+91 6355776735'}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
              <span>Tech Zone Cyber Park, Bangalore, KA, India</span>
            </div>
            <div className="pt-2">
              <a
                href="/support"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/support');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111F33] border border-[#2563EB]/30 text-white font-semibold hover:border-[#06B6D4] transition-colors"
              >
                <span>Live Chat Support</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#06B6D4]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#2563EB]/20 py-6 bg-[#07111F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7B4C7]">
          <p>© 2026 ElectroPulse 3D Inc. All rights reserved. Next-Gen Electronics E-Commerce.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="/support" onClick={(e) => { e.preventDefault(); navigateTo('/support'); }} className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/support" onClick={(e) => { e.preventDefault(); navigateTo('/support'); }} className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/admin/login" onClick={(e) => { e.preventDefault(); navigateTo('/admin/login'); }} className="hover:text-[#06B6D4] transition-colors">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
