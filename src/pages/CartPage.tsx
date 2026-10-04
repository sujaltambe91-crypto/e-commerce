import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    formatPrice,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  // Financial calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  const deliveryFee = subtotal > 10000 || subtotal === 0 ? 0 : 499;
  const tax = Math.round(subtotal * 0.18); // 18% GST for electronics breakdown
  const grandTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponCode.trim());
    setCouponLoading(false);
  };

  return (
    <div className="space-y-8">
      <SeoHead
        title="Shopping Cart | Review Selected Hardware & Checkout"
        description="Review your selected smartphones, laptops, monitors, RAM and storage variants before checkout."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2563EB]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4 text-[#2563EB]" />
            <span>Secure Checkout Preparation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            Shopping Cart ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
          </h1>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-[#A7B4C7] hover:text-[#EF4444] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Cart</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-[#111F33] rounded-3xl border border-[#2563EB]/20 p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/30 text-[#2563EB] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display text-xl font-bold text-white">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-md mx-auto">
            Browse our flagship devices, select your desired RAM and storage options, and add items to begin your order.
          </p>
          <button
            onClick={() => navigateTo('/shop')}
            className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#2563EB]/25 transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Item List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item, idx) => {
              const product = item.product;
              return (
                <div
                  key={`${product.id}-${item.selected_color}-${item.selected_ram}-${item.selected_storage}-${idx}`}
                  className="p-4 sm:p-5 rounded-2xl bg-[#111F33] border border-[#2563EB]/25 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-[#0D1B2A] border border-[#2563EB]/20 shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase">
                        {product.brand}
                      </span>
                      <h3
                        onClick={() => navigateTo(`/product/${product.slug}`)}
                        className="font-bold text-sm text-white hover:text-[#06B6D4] cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      {/* Selected RAM, Storage & Color */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A7B4C7]">
                        {item.selected_ram && (
                          <span className="bg-[#0D1B2A] px-2 py-0.5 rounded border border-[#2563EB]/20 text-white font-mono">
                            RAM: {item.selected_ram}
                          </span>
                        )}
                        {item.selected_storage && (
                          <span className="bg-[#0D1B2A] px-2 py-0.5 rounded border border-[#2563EB]/20 text-white font-mono">
                            Storage: {item.selected_storage}
                          </span>
                        )}
                        {item.selected_color && (
                          <span className="text-neutral-400">Color: {item.selected_color}</span>
                        )}
                      </div>

                      <div className="text-xs font-mono font-bold text-white pt-1">
                        {formatPrice(product.price)} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#2563EB]/20">
                    <div className="flex items-center gap-2 bg-[#0D1B2A] p-1 rounded-xl border border-[#2563EB]/30">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            product.id,
                            Math.max(1, item.quantity - 1),
                            item.selected_color,
                            item.selected_ram,
                            item.selected_storage
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-[#111F33] hover:bg-[#2563EB]/20 text-[#A7B4C7] hover:text-white flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="font-mono font-bold text-xs text-white px-2">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateCartQuantity(
                            product.id,
                            item.quantity + 1,
                            item.selected_color,
                            item.selected_ram,
                            item.selected_storage
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-[#111F33] hover:bg-[#2563EB]/20 text-[#A7B4C7] hover:text-white flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-sm text-white">
                        {formatPrice((product.price || 0) * item.quantity)}
                      </span>

                      <button
                        onClick={() =>
                          removeFromCart(
                            product.id,
                            item.selected_color,
                            item.selected_ram,
                            item.selected_storage
                          )
                        }
                        className="p-1.5 rounded-lg text-[#A7B4C7] hover:text-[#EF4444] transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary & Pricing Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="p-6 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-5 shadow-xl">
              <h2 className="font-display text-xl font-bold text-white tracking-tight">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#A7B4C7] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>Promo / Discount Coupon:</span>
                </span>

                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-[#22C55E] block">
                        Coupon "{appliedCoupon.code}" Applied!
                      </span>
                      <span className="text-[11px] text-[#A7B4C7]">
                        -{formatPrice(couponDiscount)} instant deduction
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#EF4444] hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. ELECTRO15"
                      className="flex-1 px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white placeholder-neutral-500 uppercase font-mono focus:outline-none focus:border-[#06B6D4]"
                    />
                    <button
                      type="submit"
                      disabled={couponLoading}
                      className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl transition-all shadow"
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-[#2563EB]/20 text-xs">
                <div className="flex justify-between text-[#A7B4C7]">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#22C55E]">
                    <span>Coupon Discount</span>
                    <span className="font-mono font-semibold">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#A7B4C7]">
                  <span>Express Insured Delivery</span>
                  <span className="font-mono font-semibold text-[#22C55E]">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>

                <div className="flex justify-between text-[#A7B4C7]">
                  <span>Estimated GST (18% Included)</span>
                  <span className="font-mono text-neutral-400">{formatPrice(tax)}</span>
                </div>

                <div className="pt-3 border-t border-[#2563EB]/30 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-white">Grand Total</span>
                  <span className="font-mono text-2xl font-black text-[#06B6D4]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => navigateTo('/checkout')}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-extrabold text-sm rounded-xl shadow-xl shadow-[#2563EB]/30 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-2 pt-2 text-[11px] text-[#A7B4C7]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>Doorstep Inspection & Free Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
