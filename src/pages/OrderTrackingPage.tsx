import React, { useState, useEffect } from 'react';
import { navigateTo } from '../lib/router.ts';
import { useStore } from '../context/StoreContext.tsx';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export const OrderTrackingPage: React.FC = () => {
  const { formatPrice } = useStore();
  const searchParams = new URLSearchParams(window.location.search);
  const initialOrderId = searchParams.get('orderId') || 'ORD-984210';

  const [inputOrderNumber, setInputOrderNumber] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<any>({
    order_number: initialOrderId,
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    status_index: 3, // Out for Delivery
    carrier: 'BlueDart Express Aviation',
    tracking_code: 'BD982741094IN',
    estimated_delivery: 'Tomorrow by 11:30 AM',
    recipient: 'Sujal Tambe',
    address: '402 Silicon Heights, MG Road, Bangalore 560001',
    items: [
      {
        name: 'Apple iPhone 16 Pro Max (Titanium)',
        specs: 'Natural Titanium • 256GB NVMe',
        qty: 1,
        price: 144900,
        image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      },
    ],
  });

  const steps = [
    { title: 'Order Placed', time: 'Yesterday, 04:30 PM', desc: 'Order received and payment authorization completed' },
    { title: 'Confirmed', time: 'Yesterday, 08:15 PM', desc: 'Hardware serialized, QC verified, and packed in tamper-evident anti-static box' },
    { title: 'Shipped', time: 'Today, 02:40 AM', desc: 'Dispatched via Express Aviation Air Cargo (BlueDart Tracking BD982741094IN)' },
    { title: 'Out for Delivery', time: 'Today, 08:30 AM', desc: 'Courier courier executive out for doorstep delivery' },
    { title: 'Delivered', time: 'Pending OTP Verification', desc: 'Open-box hardware verification at customer doorstep' },
  ];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOrderNumber.trim()) {
      setActiveOrder((prev: any) => ({
        ...prev,
        order_number: inputOrderNumber.trim().toUpperCase(),
      }));
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SeoHead
        title="Live Order Tracking | ElectroPulse 3D"
        description="Track your electronics shipment live from warehouse packaging to final doorstep dispatch."
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-mono font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5" />
          <span>Real-Time GPS Tracking</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-[#A7B4C7]">
          Enter your 6-digit or 9-character order number to see live fulfillment updates.
        </p>
      </div>

      {/* Order Search Bar */}
      <form onSubmit={handleLookup} className="relative flex items-center max-w-lg mx-auto">
        <Search className="absolute left-4 w-4 h-4 text-[#06B6D4]" />
        <input
          type="text"
          value={inputOrderNumber}
          onChange={(e) => setInputOrderNumber(e.target.value)}
          placeholder="Enter Order ID (e.g. ORD-984210)..."
          className="w-full pl-11 pr-24 py-3 bg-[#111F33] border border-[#2563EB]/40 rounded-2xl text-xs text-white uppercase font-mono focus:outline-none focus:border-[#06B6D4]"
        />
        <button
          type="submit"
          className="absolute right-2 px-4 py-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl transition-all shadow"
        >
          Track
        </button>
      </form>

      {/* Main Order Status Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2563EB]/20">
          <div>
            <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider block">
              Active Shipment
            </span>
            <h2 className="font-mono text-xl sm:text-2xl font-black text-white">
              {activeOrder.order_number}
            </h2>
            <span className="text-xs text-[#A7B4C7]">
              Carrier: {activeOrder.carrier} • Tracking: <span className="font-mono text-white">{activeOrder.tracking_code}</span>
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono text-[#A7B4C7] uppercase block">
              Estimated Delivery
            </span>
            <span className="font-bold text-sm text-[#22C55E]">
              {activeOrder.estimated_delivery}
            </span>
          </div>
        </div>

        {/* 5-Step Order Timeline: Order Confirmed -> Processing -> Shipped -> Out for Delivery -> Delivered */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Fulfillment Journey
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2563EB]/25">
            {steps.map((st, idx) => {
              const isPast = idx < activeOrder.status_index;
              const isCurrent = idx === activeOrder.status_index;
              const isPending = idx > activeOrder.status_index;

              return (
                <div key={st.title} className="relative flex items-start gap-4">
                  {/* Status Circle */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                      isPast
                        ? 'bg-[#22C55E] border-[#22C55E] text-[#07111F]'
                        : isCurrent
                        ? 'bg-[#2563EB] border-[#06B6D4] text-white animate-pulse shadow-[0_0_12px_#06B6D4]'
                        : 'bg-[#0D1B2A] border-[#2563EB]/30 text-neutral-500'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`text-sm font-bold ${
                          isCurrent
                            ? 'text-[#06B6D4]'
                            : isPast
                            ? 'text-white'
                            : 'text-[#A7B4C7]'
                        }`}
                      >
                        {st.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#A7B4C7]">
                        {st.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#A7B4C7] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Destination & Item Preview */}
        <div className="pt-6 border-t border-[#2563EB]/20 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Delivery Address</span>
            </span>
            <p className="text-[#A7B4C7] leading-relaxed">
              <strong className="text-white block">{activeOrder.recipient}</strong>
              {activeOrder.address}
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Package Contents</span>
            </span>
            {activeOrder.items.map((it: any, i: number) => (
              <div key={i} className="flex items-center gap-2.5">
                <img src={it.image_url} alt={it.name} className="w-9 h-9 rounded-lg object-cover" />
                <div className="truncate">
                  <span className="text-white block truncate font-medium">{it.name}</span>
                  <span className="text-[10px] text-[#A7B4C7]">{it.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
