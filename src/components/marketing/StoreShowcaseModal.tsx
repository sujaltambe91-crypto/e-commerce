import React, { useState } from 'react';
import { navigateTo } from '../../lib/router.ts';
import {
  X,
  ExternalLink,
  Laptop,
  Smartphone,
  Shield,
  ShoppingBag,
  Layers,
  Sparkles,
  ArrowRight,
  Maximize2,
} from 'lucide-react';

interface StoreShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreShowcaseModal: React.FC<StoreShowcaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'store' | 'shop' | 'admin'>('store');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-6xl h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-950/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-base font-bold text-white tracking-tight truncate">
                Live Store Demonstration — Built by Marketingwalaa
              </h3>
              <p className="text-[11px] text-neutral-400 truncate">
                Interactive real-time preview of the customer storefront & administrative panel
              </p>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('store')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'store'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Storefront Home
              </button>
              <button
                onClick={() => setActiveTab('shop')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'shop'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Catalog & Shop
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                  activeTab === 'admin'
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Shield className="w-3 h-3 text-amber-500" />
                <span>Admin Panel</span>
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                navigateTo(activeTab === 'admin' ? '/admin' : activeTab === 'shop' ? '/shop' : '/');
              }}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              title="Open full page"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Live Webview Frame */}
        <div className="flex-1 bg-neutral-950 overflow-hidden relative">
          <iframe
            src={activeTab === 'admin' ? '/admin' : activeTab === 'shop' ? '/shop' : '/'}
            title="ShopKart Store Preview"
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer info bar */}
        <div className="p-3 sm:p-4 border-t border-neutral-800 bg-neutral-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Fully functional database backend with real-time affiliate click tracking</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                const contactEl = document.querySelector('#contact');
                if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-neutral-950 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              Order Your Store Like This (₹10,999)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
