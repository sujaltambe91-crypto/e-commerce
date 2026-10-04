import React, { useState } from 'react';
import { MarketingNavbar } from '../components/marketing/MarketingNavbar.tsx';
import { Hero3DCanvas } from '../components/marketing/Hero3DCanvas.tsx';
import { FeaturesGrid } from '../components/marketing/FeaturesGrid.tsx';
import { AnimationFlowSimulator } from '../components/marketing/AnimationFlowSimulator.tsx';
import { PortfolioSection } from '../components/marketing/PortfolioSection.tsx';
import { PricingSection } from '../components/marketing/PricingSection.tsx';
import { TestimonialsSection } from '../components/marketing/TestimonialsSection.tsx';
import { FaqSection } from '../components/marketing/FaqSection.tsx';
import { ContactSection } from '../components/marketing/ContactSection.tsx';
import { MarketingFooter } from '../components/marketing/MarketingFooter.tsx';
import { StoreShowcaseModal } from '../components/marketing/StoreShowcaseModal.tsx';
import { navigateTo } from '../lib/router.ts';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Zap,
  ShieldCheck,
  CheckCircle,
  Truck,
  MessageCircle,
  Smartphone,
  Layers,
  BarChart,
  Lock,
  Headphones,
  Check,
  Clock,
  Palette,
  Code,
  Rocket,
} from 'lucide-react';

export const MarketingPage: React.FC = () => {
  const [storeModalOpen, setStoreModalOpen] = useState(false);

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen selection:bg-orange-500/30 selection:text-orange-200">
      {/* 01. HEADER / NAVBAR */}
      <MarketingNavbar onOpenStoreModal={() => setStoreModalOpen(true)} />

      {/* Main Container */}
      <main className="space-y-24 sm:space-y-32">
        {/* 02. HERO SECTION */}
        <section id="home" className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
          {/* Ambient radial lighting */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-600/20 via-amber-500/15 to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & CTA (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Top Label from flyer */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>YOUR ONLINE STORE STARTS HERE</span>
                </div>

                {/* Main Heading from flyer */}
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] text-balance">
                  GET YOUR{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 block sm:inline">
                    WOOCOMMERCE
                  </span>{' '}
                  E-COMMERCE WEBSITE
                </h1>

                {/* Subtitle from flyer */}
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-widest text-neutral-300 uppercase">
                  SELL ANYTHING, ANYWHERE
                </h2>

                {/* Description from flyer */}
                <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  A complete e-commerce solution to grow your business online. Free 1-year domain, high-speed hosting, payment gateways, WhatsApp ordering, and full administrative freedom.
                </p>

                {/* CTAs & Circular Limited Offer Badge */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#contact"
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-black text-sm rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <span>GET STARTED</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </a>

                    <button
                      onClick={() => setStoreModalOpen(true)}
                      className="px-6 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-2xl border border-neutral-700/80 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-500" />
                      <span>VIEW LIVE DEMO</span>
                    </button>
                  </div>

                  {/* Circular Orange Offer Badge directly from flyer! */}
                  <div className="relative group cursor-pointer animate-pulse hover:animate-none">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-neutral-950 p-2 flex flex-col items-center justify-center text-center shadow-xl shadow-orange-500/30 transform hover:scale-105 transition-transform">
                      <span className="text-[9px] font-black uppercase tracking-wider text-neutral-950/80 leading-none">
                        LIMITED TIME
                      </span>
                      <span className="text-xs font-bold line-through text-neutral-900 font-mono">
                        ₹19,999
                      </span>
                      <span className="text-lg font-extrabold text-neutral-950 font-mono tracking-tight leading-none mt-0.5">
                        ₹10,999
                      </span>
                      <span className="text-[8px] font-black uppercase text-neutral-950 mt-0.5">
                        ALL-INCLUSIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Trust Highlights */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    1 Year Free Domain & Hosting
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    Razorpay / UPI Payment Gateway
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    1-Click WhatsApp Ordering
                  </span>
                </div>
              </div>

              {/* Right Column: 3D HERO OBJECTS (5 cols) */}
              <div className="lg:col-span-5 relative">
                {/* 3D Canvas */}
                <div className="relative rounded-3xl bg-neutral-900/40 border border-neutral-800 p-2 shadow-2xl overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Interactive 3D Preview (Drag to Orbit)</span>
                  </div>

                  <Hero3DCanvas />

                  <div className="p-4 bg-neutral-950/80 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Multi-Device Synchronized Experience</span>
                    <button
                      onClick={() => setStoreModalOpen(true)}
                      className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
                    >
                      <span>Explore Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03. TRUST / INTRO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
                Industry-Leading Track Record
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                EVERYTHING YOU NEED TO SELL ONLINE
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Marketingwalaa is a premier digital marketing agency dedicated to turning regional retail businesses and modern entrepreneurs into high-converting online brands.
              </p>
            </div>

            {/* Metrics Counter Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-neutral-800/80">
              <div className="space-y-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  500+
                </span>
                <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                  Stores Created
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-orange-400 font-mono">
                  1,200+
                </span>
                <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                  Businesses Served
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  850+
                </span>
                <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                  Projects Completed
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                  24/7
                </span>
                <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                  Customer Support
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 04. WHY CHOOSE US */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              The Marketingwalaa Difference
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Why Business Owners Choose Us
            </h2>
            <p className="text-sm text-neutral-400">
              Built by experienced engineers and marketing strategists focused on real retail conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Complete E-Commerce Solution',
                desc: 'From custom branding, domain registration, and hosting setup to live payment testing and product catalog upload.',
                icon: Layers,
              },
              {
                title: 'Professional UI/UX Design',
                desc: 'Distinguished aesthetics, clean whitespace, intuitive navigation, and high-converting product pages that drive transactions.',
                icon: Palette,
              },
              {
                title: 'Mobile Responsive (PWA)',
                desc: 'Engineered specifically for touchscreens and smartphone shoppers with zero lag and rapid tap-to-checkout flows.',
                icon: Smartphone,
              },
              {
                title: 'Fast Performance & High Speed',
                desc: 'Sub-second page speeds with compressed imagery, asset minification, and optimized database queries for Google rankings.',
                icon: Zap,
              },
              {
                title: 'Bank-Grade Secure Platform',
                desc: 'End-to-end SSL encryption, enterprise firewall, brute-force login prevention, and PCI-compliant gateway processing.',
                icon: Lock,
              },
              {
                title: 'Business Growth Focused',
                desc: 'Integrated SEO meta tags, Google Analytics tags, Facebook Pixel, and automated WhatsApp cart abandonment reminders.',
                icon: BarChart,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3 hover:border-orange-500/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 05. FEATURES SECTION (with flyer checkmarks) */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <FeaturesGrid />
        </section>

        {/* 06 & 07. 3D E-COMMERCE EXPERIENCE & ANIMATION FLOW */}
        <section id="3d-experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <AnimationFlowSimulator />
        </section>

        {/* 08. HOW IT WORKS (6 STEPS) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              Simple 6-Step Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              How We Launch Your Store
            </h2>
            <p className="text-sm text-neutral-400">
              A transparent, hassle-free roadmap from initial consultation to your first automated online order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: 'STEP 01',
                title: 'Discuss Your Business',
                desc: 'We review your target industry, products, brand colors, and domain preferences over a quick WhatsApp or phone call.',
                icon: MessageCircle,
              },
              {
                step: 'STEP 02',
                title: 'Plan Your Store Architecture',
                desc: 'We map out your category taxonomy, shipping zones, pricing strategies, and preferred payment gateways.',
                icon: Clock,
              },
              {
                step: 'STEP 03',
                title: 'UI/UX Design Mockups',
                desc: 'Our design team crafts bespoke storefront banners, hero sliders, and mobile layouts personalized to your brand identity.',
                icon: Palette,
              },
              {
                step: 'STEP 04',
                title: 'Website Development',
                desc: 'We configure WooCommerce, upload your initial product catalog, configure responsive styling, and set up your admin panel.',
                icon: Code,
              },
              {
                step: 'STEP 05',
                title: 'Payment & Shipping Integration',
                desc: 'We link your bank account via Razorpay/Stripe, test UPI QR payments, and connect automated courier APIs.',
                icon: Truck,
              },
              {
                step: 'STEP 06',
                title: 'Launch Your Store & Celebrate',
                desc: 'We deploy your site to fast SSD cloud servers, provide full admin credentials, and activate your 1-year support.',
                icon: Rocket,
              },
            ].map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-orange-500 tracking-wider">
                      {st.step}
                    </span>
                    <div className="p-2 rounded-xl bg-neutral-800 text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {st.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 09. SERVICES SECTION */}
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
              Agency Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Full-Spectrum E-Commerce Services
            </h2>
            <p className="text-sm text-neutral-400">
              Comprehensive marketing and engineering solutions under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              'WooCommerce Development',
              'E-Commerce Website Development',
              'UI/UX Design',
              'Payment Gateway Integration',
              'Shipping Integration',
              'WhatsApp Integration',
              'Mobile App Integration',
              'Website Maintenance',
              'SEO',
              'Digital Marketing',
            ].map((srv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-orange-500/40 transition-colors flex flex-col justify-between h-32"
              >
                <span className="text-[10px] font-mono text-neutral-500 font-bold">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-sm font-bold text-white">
                  {srv}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* 10 & 11. E-COMMERCE SHOWCASE BANNER & LIVE DEMO TRIGGER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
                Experience The Product Firsthand
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Explore The Complete Live Demo Store & Admin Control Center
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Test the exact customer shopping experience and administrative product management interface we deliver for your brand.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setStoreModalOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-all"
                >
                  Launch Interactive Demo
                </button>
                <a
                  href="/admin/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/admin/login');
                  }}
                  className="px-5 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-700"
                >
                  Test Admin Login
                </a>
              </div>
            </div>

            <div className="w-full lg:w-96 rounded-2xl bg-neutral-950 p-4 border border-neutral-800 space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                <span className="font-bold text-white">Live Storefront Modules:</span>
                <span className="text-[10px] text-emerald-400 font-mono">100% OPERATIONAL</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                <li className="flex items-center gap-2">✓ Responsive Hero Banner Carousel</li>
                <li className="flex items-center gap-2">✓ Category Filters & Dynamic Search</li>
                <li className="flex items-center gap-2">✓ Detailed Product Page & Specs Table</li>
                <li className="flex items-center gap-2">✓ Slide-Out Saved Shopping Cart</li>
                <li className="flex items-center gap-2">✓ Live Click & Conversion Analytics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 12. PORTFOLIO SECTION */}
        <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <PortfolioSection onOpenStoreModal={() => setStoreModalOpen(true)} />
        </section>

        {/* 13 & 14. PRICING & SPECIAL OFFER SECTION */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <PricingSection />
        </section>

        {/* 15. TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsSection />
        </section>

        {/* 16. FAQ SECTION */}
        <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <FaqSection />
        </section>

        {/* 17. FINAL CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-8 sm:p-14 text-center text-neutral-950 shadow-2xl space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest bg-neutral-950/20 px-3 py-1 rounded-full">
                START YOUR ONLINE STORE TODAY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Ready To Grow Your Business Online?
              </h2>
              <p className="text-neutral-900 font-medium text-sm sm:text-base leading-relaxed">
                Take advantage of our ₹10,999 limited time all-inclusive WooCommerce launch package. Domain, hosting, payment gateways, and WhatsApp included.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-8 py-4 bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all active:scale-95"
              >
                GET STARTED NOW
              </a>
              <a
                href="https://wa.me/916355776735?text=Hello%20Marketingwalaa,%20I%20would%20like%20to%20talk%20to%20an%20e-commerce%20expert."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/20 hover:bg-white/30 text-neutral-950 font-extrabold text-sm rounded-2xl border border-neutral-950/20 transition-all"
              >
                TALK TO AN EXPERT
              </a>
            </div>
          </div>
        </section>

        {/* 18. CONTACT SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <ContactSection />
        </section>
      </main>

      {/* 19. FOOTER */}
      <MarketingFooter />

      {/* Interactive Live Store Showcase Modal */}
      <StoreShowcaseModal
        isOpen={storeModalOpen}
        onClose={() => setStoreModalOpen(false)}
      />
    </div>
  );
};
