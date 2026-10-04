import React, { useState } from 'react';
import { navigateTo } from '../../lib/router.ts';
import {
  Phone,
  Globe,
  Sparkles,
  ShoppingBag,
  Shield,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

interface MarketingNavbarProps {
  onOpenStoreModal?: () => void;
}

export const MarketingNavbar: React.FC<MarketingNavbarProps> = ({ onOpenStoreModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Features', href: '#features' },
    { label: '3D Experience', href: '#3d-experience' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      {/* Top Contact Strip */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-neutral-950 text-[11px] font-bold py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="tel:+916355776735"
              className="flex items-center gap-1.5 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 6355776735</span>
            </a>
            <span className="hidden sm:inline opacity-60">|</span>
            <a
              href="https://marketingwalaa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>marketingwalaa.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-neutral-950 text-amber-400 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold">
              Limited Offer: ₹10,999 Only
            </span>
            <a
              href="https://wa.me/916355776735?text=Hello%20Marketingwalaa,%20I%20am%20interested%20in%20the%20WooCommerce%20E-Commerce%20Website%20special%20offer."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-neutral-950 hover:opacity-80"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Marketingwalaa Logo Lockup */}
        <a
          href="#home"
          onClick={(e) => handleNavClick('#home', e)}
          className="flex items-center gap-2.5 group"
        >
          {/* Stylized Handshake Emblem from flyer */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M21.71 8.71l-3.42-3.42a2 2 0 0 0-2.83 0l-1.46 1.46-1.41-1.41a2 2 0 0 0-2.83 0L7.05 8.05a2 2 0 0 0 0 2.83l.71.71-4.47 4.47a2 2 0 0 0 0 2.83l2.83 2.83a2 2 0 0 0 2.83 0l4.47-4.47.71.71a2 2 0 0 0 2.83 0l2.71-2.71a2 2 0 0 0 0-2.83l-1.41-1.41 1.46-1.46a2 2 0 0 0 0-2.83z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1 leading-none">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Marketing<span className="text-orange-500">walaa</span>
              </span>
            </div>
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest block mt-0.5">
              Best Place For Marketing Solutions
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(link.href, e)}
              className="hover:text-amber-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Live Store Demo Trigger */}
          <button
            onClick={() => {
              if (onOpenStoreModal) {
                onOpenStoreModal();
              } else {
                navigateTo('/shop');
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold rounded-xl border border-neutral-700/80 transition-all shadow-sm"
            title="Experience the live e-commerce store"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
            <span>View Demo Store</span>
          </button>

          {/* Admin Login shortcut */}
          <a
            href="/admin/login"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/admin/login');
            }}
            className="hidden md:flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 border border-neutral-800"
            title="Admin Dashboard"
          >
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>Admin</span>
          </a>

          {/* Primary GET STARTED Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick('#contact', e)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
          >
            <span>GET STARTED</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-neutral-800 px-6 py-6 space-y-4 animate-in fade-in">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-neutral-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="py-1.5 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenStoreModal) onOpenStoreModal();
                else navigateTo('/shop');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-neutral-900 text-neutral-200 text-xs font-bold rounded-xl border border-neutral-700"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Explore Live Demo Store</span>
            </button>
            <a
              href="/admin/login"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigateTo('/admin/login');
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Admin Portal Login</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
