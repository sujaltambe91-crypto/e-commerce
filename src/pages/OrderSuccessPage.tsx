import React, { useEffect, useState } from 'react';
import { navigateTo } from '../lib/router.ts';
import { useStore } from '../context/StoreContext.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import {
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  Calendar,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { Order } from '../types/index.ts';

export const OrderSuccessPage: React.FC = () => {
  const { formatPrice } = useStore();
  const [order, setOrder] = useState<Order | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get('orderId') || 'ORD-984218';
  const total = searchParams.get('total');
  const method = searchParams.get('method') || 'UPI / Instant Pay';

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((orders: Order[]) => {
        const found = orders.find(
          (o) => o.order_number === orderId || o.id === orderId
        );
        if (found) setOrder(found);
      })
      .catch((err) => console.error(err));
  }, [orderId]);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <SeoHead
        title={`Order Confirmed | ${orderId}`}
        description="Your order has been verified and allocated for express priority dispatch."
      />

      {/* Confirmation Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07111F] via-[#0D1B2A] to-[#111F33] border border-[#22C55E]/40 p-8 sm:p-12 text-center shadow-2xl shadow-[#22C55E]/10">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/20 border border-[#22C55E]/50 text-[#22C55E] flex items-center justify-center mx-auto shadow-lg shadow-[#22C55E]/30 animate-in zoom-in-50">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-widest">
              ORDER CONFIRMATION
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-[#A7B4C7] max-w-md mx-auto">
              We have received your order and payment authorization. A confirmation receipt has been sent to your email.
            </p>
          </div>

          {/* Order Reference Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#07111F]/80 border border-[#2563EB]/30 font-mono text-xs">
            <span className="text-[#A7B4C7]">Order Number:</span>
            <span className="text-[#06B6D4] font-bold tracking-wider">{orderId}</span>
          </div>
        </div>
      </div>

      {/* Order Summary & Status Card */}
      <div className="rounded-3xl bg-[#111F33] border border-[#2563EB]/30 p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Package className="w-5 h-5 text-[#2563EB]" />
          <span>Order Details & Status</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Payment Status */}
          <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A7B4C7]">
              <CreditCard className="w-4 h-4 text-[#06B6D4]" />
              <span>Payment Status</span>
            </div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="capitalize">{order?.payment_status || 'Paid (Authorized)'}</span>
            </div>
            <span className="text-[11px] text-[#A7B4C7] font-mono block">
              Method: {order?.payment_method?.toUpperCase() || method}
            </span>
          </div>

          {/* Delivery Date */}
          <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A7B4C7]">
              <Calendar className="w-4 h-4 text-[#7C3AED]" />
              <span>Estimated Delivery</span>
            </div>
            <div className="text-base font-bold text-white">{formattedDelivery}</div>
            <span className="text-[11px] text-[#22C55E] font-medium block">
              Express Air Courier Guaranteed
            </span>
          </div>

          {/* Grand Total */}
          <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A7B4C7]">
              <ShoppingBag className="w-4 h-4 text-[#22C55E]" />
              <span>Grand Total</span>
            </div>
            <div className="text-xl font-black font-mono text-white">
              {formatPrice(order?.grand_total || (total ? Number(total) : 144900))}
            </div>
            <span className="text-[11px] text-[#06B6D4] font-mono block">Inclusive of all taxes</span>
          </div>
        </div>

        {/* Product Details if order found */}
        {order && order.items && order.items.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-[#2563EB]/20">
            <span className="text-xs font-mono text-[#A7B4C7] uppercase tracking-wider block">
              Purchased Products ({order.items.length})
            </span>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/15"
                >
                  <div className="flex items-center gap-3">
                    {item.product_image && (
                      <img
                        src={item.product_image}
                        alt=""
                        className="w-12 h-12 object-cover rounded-xl border border-[#2563EB]/20 bg-[#07111F]"
                      />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.product_name}</h4>
                      <span className="text-[10px] text-[#A7B4C7] font-mono">
                        Qty: {item.quantity} {item.selected_color ? `• ${item.selected_color}` : ''}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security & Warranty Banner */}
        <div className="p-4 rounded-2xl bg-[#07111F] border border-[#2563EB]/25 flex items-center justify-between text-xs text-[#A7B4C7]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0" />
            <span>Official manufacturer warranty serialized to this order. 7-day hassle-free replacement.</span>
          </div>
        </div>
      </div>

      {/* Primary Actions: Track Order & Continue Shopping */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => navigateTo(`/order-tracking?orderId=${orderId}`)}
          className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-sm rounded-2xl shadow-xl shadow-[#2563EB]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Truck className="w-4 h-4" />
          <span>Track Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('/shop')}
          className="w-full sm:flex-1 py-4 px-6 bg-[#111F33] hover:bg-[#0D1B2A] text-white font-bold text-sm rounded-2xl border border-[#2563EB]/30 hover:border-[#06B6D4] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#06B6D4]" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};
