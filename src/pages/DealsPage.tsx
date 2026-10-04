import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { useStore } from '../context/StoreContext.tsx';
import {
  Flame,
  Clock,
  Tag,
  CreditCard,
  Gift,
  Percent,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export const DealsPage: React.FC = () => {
  const { formatPrice, showToast } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<
    'all' | 'flash' | 'todays' | 'bank' | 'coupons' | 'combos' | 'clearance'
  >('all');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Coupon ${code} copied to clipboard!`, 'success');
  };

  const coupons = [
    { code: 'ELECTRO15', discount: '15% Off', minSpend: 'Above ₹25,000', desc: 'Valid across flagship smartphones, M4 laptops & 4K OLED TVs.' },
    { code: 'HDFCGAMER', discount: '₹5,000 Flat Off', minSpend: 'On HDFC Cards', desc: 'Applicable on custom liquid-cooled rigs and RTX 4090 GPUs.' },
    { code: 'PRIME1000', discount: '₹1,000 Off', minSpend: 'No Min Order', desc: 'Exclusive discount code for first-time electronics orders.' },
  ];

  const bankOffers = [
    { bank: 'HDFC Bank', offer: 'Instant ₹5,000 Discount on Credit Card EMI (6/9/12 Months)', icon: CreditCard },
    { bank: 'ICICI Bank', offer: '10% Instant Cashback up to ₹4,500 on all electronics above ₹30,000', icon: CreditCard },
    { bank: 'State Bank of India', offer: 'Flat ₹3,000 off on laptop and workstation purchases', icon: CreditCard },
    { bank: 'Axis Bank', offer: '0% No-Cost EMI for up to 18 months + ₹2,000 extra exchange bonus', icon: CreditCard },
  ];

  const comboOffers = [
    {
      title: 'Creator Battlestation Bundle',
      desc: 'MacBook Pro 16" (M4 Max) + Studio Display 4K + Magic Keyboard & Trackpad',
      saving: 'Save ₹38,000 Together',
      price: 499990,
      oldPrice: 537990,
      image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Ultimate Esports Arena Pack',
      desc: 'ASUS ROG Zephyrus G16 + Samsung Odyssey 240Hz OLED + SteelSeries Apex Pro TKL',
      saving: 'Save ₹29,000 Together',
      price: 469990,
      oldPrice: 498990,
      image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const flashSaleItems = products.filter((p) => p.discount_percentage && p.discount_percentage >= 8);
  const clearanceItems = products.filter((p) => (p.price || 0) < 100000);

  return (
    <div className="space-y-10">
      <SeoHead
        title="Electronics Mega Deals & Flash Sales | ElectroPulse 3D"
        description="Exclusive discounts, verified promo coupon codes, bank cashback, and bundled combo packages."
      />

      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0D1B2A] via-[#111F33] to-[#07111F] border border-[#EF4444]/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF4444]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs font-mono font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5" />
          <span>FESTIVE SAVINGS HUB</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
          Electronics Deals & Mega Discounts
        </h1>
        <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-xl mx-auto">
          Save on titanium smartphones, high-TGP gaming laptops, 4K OLED displays, and genuine peripherals with verified coupons.
        </p>
      </div>

      {/* Section Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Deals' },
          { id: 'flash', label: 'Flash Sale' },
          { id: 'todays', label: "Today's Deals" },
          { id: 'bank', label: 'Bank Offers' },
          { id: 'coupons', label: 'Coupons' },
          { id: 'combos', label: 'Combo Offers' },
          { id: 'clearance', label: 'Clearance' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-md shadow-[#2563EB]/25'
                : 'bg-[#111F33] text-[#A7B4C7] hover:text-white border border-[#2563EB]/20 hover:bg-[#0D1B2A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. COUPONS SECTION */}
      {(activeTab === 'all' || activeTab === 'coupons') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
            <Tag className="w-4 h-4" />
            <span>Instant Promo Coupon Codes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-5 rounded-2xl bg-[#111F33] border border-[#2563EB]/30 space-y-3 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-[#06B6D4]">{c.code}</span>
                    <span className="text-xs font-black text-[#22C55E] bg-[#22C55E]/15 px-2 py-0.5 rounded">
                      {c.discount}
                    </span>
                  </div>
                  <p className="text-xs text-white font-medium">{c.minSpend}</p>
                  <p className="text-[11px] text-[#A7B4C7] leading-relaxed">{c.desc}</p>
                </div>

                <button
                  onClick={() => copyCoupon(c.code)}
                  className="w-full py-2 bg-[#0D1B2A] hover:bg-[#2563EB] text-[#06B6D4] hover:text-white rounded-xl text-xs font-bold border border-[#2563EB]/30 transition-colors"
                >
                  Copy Coupon Code
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. BANK OFFERS */}
      {(activeTab === 'all' || activeTab === 'bank') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>Exclusive Partner Bank Cashback</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bankOffers.map((b) => (
              <div
                key={b.bank}
                className="p-4 rounded-2xl bg-[#111F33] border border-[#2563EB]/25 flex items-start gap-3 text-xs"
              >
                <div className="p-2.5 rounded-xl bg-[#0D1B2A] text-[#06B6D4] shrink-0 border border-[#2563EB]/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <strong className="text-white block font-bold">{b.bank}</strong>
                  <p className="text-[#A7B4C7] leading-relaxed">{b.offer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. COMBO OFFERS */}
      {(activeTab === 'all' || activeTab === 'combos') && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
            <Gift className="w-4 h-4" />
            <span>Curated Hardware Combos & Ecosystem Bundles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comboOffers.map((combo) => (
              <div
                key={combo.title}
                className="p-6 rounded-3xl bg-[#111F33] border border-[#7C3AED]/35 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={combo.image_url}
                    alt={combo.title}
                    className="w-24 h-24 rounded-2xl object-cover bg-[#0D1B2A] shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#22C55E] bg-[#22C55E]/15 px-2 py-0.5 rounded">
                      {combo.saving}
                    </span>
                    <h3 className="font-bold text-base text-white">{combo.title}</h3>
                    <p className="text-xs text-[#A7B4C7] line-clamp-2">{combo.desc}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#7C3AED]/20 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl font-black text-white">
                      {formatPrice(combo.price)}
                    </span>
                    <span className="font-mono text-xs text-neutral-500 line-through">
                      {formatPrice(combo.oldPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => showToast('Combo bundle added to cart!', 'success')}
                    className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:from-[#6d28d9] hover:to-[#1d4ed8] text-white text-xs font-bold rounded-xl shadow transition-all"
                  >
                    Claim Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FLASH SALE & TODAY'S DEALS PRODUCTS GRID */}
      {(activeTab === 'all' || activeTab === 'flash' || activeTab === 'todays') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Discounted Electronics Catalog</span>
            </div>
            <span className="text-xs text-[#A7B4C7] font-mono">{flashSaleItems.length} Deals Live</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {flashSaleItems.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
