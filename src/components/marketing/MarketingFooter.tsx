import React from 'react';
import {
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const MarketingFooter: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M21.71 8.71l-3.42-3.42a2 2 0 0 0-2.83 0l-1.46 1.46-1.41-1.41a2 2 0 0 0-2.83 0L7.05 8.05a2 2 0 0 0 0 2.83l.71.71-4.47 4.47a2 2 0 0 0 0 2.83l2.83 2.83a2 2 0 0 0 2.83 0l4.47-4.47.71.71a2 2 0 0 0 2.83 0l2.71-2.71a2 2 0 0 0 0-2.83l-1.41-1.41 1.46-1.46a2 2 0 0 0 0-2.83z" />
              </svg>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                Marketing<span className="text-orange-500">walaa</span>
              </span>
              <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest block">
                Best Place For Marketing Solutions
              </span>
            </div>
          </div>

          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
            Marketingwalaa empowers entrepreneurs, retailers, and direct-to-consumer brands with high-performance WooCommerce e-commerce stores, integrated payment gateways, and scalable growth strategies.
          </p>

          <div className="pt-2 space-y-1.5 text-xs">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <a href="tel:+916355776735" className="hover:text-white transition-colors">
                +91 6355776735
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-orange-500" />
              <a href="https://marketingwalaa.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                marketingwalaa.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-orange-500" />
              <a href="mailto:info@marketingwalaa.com" className="hover:text-white transition-colors">
                info@marketingwalaa.com
              </a>
            </p>
          </div>

          {/* Social Icons from flyer */}
          <div className="pt-3 flex items-center gap-3 text-neutral-400">
            <a
              href="https://instagram.com/marketingwalaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-orange-500 hover:text-neutral-950 flex items-center justify-center transition-colors border border-neutral-800"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com/marketingwalaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-orange-500 hover:text-neutral-950 flex items-center justify-center transition-colors border border-neutral-800"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@marketingwalaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-orange-500 hover:text-neutral-950 flex items-center justify-center transition-colors border border-neutral-800"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/marketingwalaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-orange-500 hover:text-neutral-950 flex items-center justify-center transition-colors border border-neutral-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-amber-400 transition-colors">Services</a></li>
            <li><a href="#features" className="hover:text-amber-400 transition-colors">Included Features</a></li>
            <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Client Portfolio</a></li>
            <li><a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing & Offers</a></li>
            <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Core Services
          </h4>
          <ul className="space-y-2.5">
            <li><span>WooCommerce Development</span></li>
            <li><span>Payment Gateway Integration</span></li>
            <li><span>Shipping API Setup</span></li>
            <li><span>WhatsApp Order Automation</span></li>
            <li><span>Mobile App Integration (PWA)</span></li>
            <li><span>E-Commerce SEO & Marketing</span></li>
            <li><span>1-Year Maintenance & Hosting</span></li>
          </ul>
        </div>

        {/* Special Offer Box */}
        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block">
            Special Campaign
          </span>
          <h5 className="text-xs font-bold text-white">
            E-Commerce Storefront @ ₹10,999
          </h5>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Free domain, free hosting, payment gateway, WhatsApp integration, and mobile responsiveness included.
          </p>
          <a
            href="tel:+916355776735"
            className="block text-center py-2 px-3 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
          >
            Call +91 6355776735
          </a>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="border-t border-neutral-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© 2026 Marketingwalaa. All rights reserved. Sell Anything, Anywhere.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-neutral-300">Privacy Policy</a>
            <span>·</span>
            <a href="#home" className="hover:text-neutral-300">Terms & Conditions</a>
            <span>·</span>
            <a href="/admin/login" className="hover:text-neutral-300">Admin Control Panel</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
