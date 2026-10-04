import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Wallet,
  Building,
  DollarSign,
  Tag,
  MapPin,
  User,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export const CheckoutPage: React.FC = () => {
  const { cart, clearCart, appliedCoupon, couponDiscount, formatPrice, showToast } = useStore();

  // Form State
  const [customerName, setCustomerName] = useState('Sujal Tambe');
  const [customerEmail, setCustomerEmail] = useState('sujaltambe91@gmail.com');
  const [customerPhone, setCustomerPhone] = useState('+91 9876543210');

  // Address
  const [street, setStreet] = useState('402 Silicon Heights, MG Road');
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560001');

  // Delivery
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('express');

  // Payment Options: UPI, Card, Net Banking, EMI, Cash on Delivery (Prompt Section 12)
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'emi' | 'cod'>('upi');
  const [selectedEmiTenure, setSelectedEmiTenure] = useState<'3' | '6' | '9' | '12'>('12');
  const [upiId, setUpiId] = useState('sujal@oksbi');
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );
  const deliveryFee = deliveryOption === 'express' ? 0 : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !street || !pincode) {
      showToast('Please fill in all shipping details.', 'error');
      return;
    }

    setIsPlacing(true);

    try {
      const orderData = {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address: { street, city, state, pincode },
        items: cart.map((i) => ({
          product_id: i.product.id,
          product_name: i.product.name,
          product_image: i.product.image_url,
          quantity: i.quantity,
          price: i.product.price,
          selected_color: i.selected_color,
          selected_ram: i.selected_ram,
          selected_storage: i.selected_storage,
        })),
        subtotal,
        discount: couponDiscount,
        delivery_fee: deliveryFee,
        grand_total: grandTotal,
        payment_method: paymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const result = await res.json();
        clearCart();
        const finalOrderNum = result.order?.order_number || result.order?.id || 'ORD-984218';
        showToast('🎉 Order placed successfully!', 'success');
        navigateTo(`/order-success?orderId=${finalOrderNum}&total=${grandTotal}&method=${paymentMethod}`);
      } else {
        // Fallback demo order
        const fallbackOrderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        clearCart();
        showToast('🎉 Order placed successfully!', 'success');
        navigateTo(`/order-success?orderId=${fallbackOrderNum}&total=${grandTotal}&method=${paymentMethod}`);
      }
    } catch {
      const fallbackOrderNum = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      showToast('🎉 Order placed successfully!', 'success');
      navigateTo(`/order-success?orderId=${fallbackOrderNum}&total=${grandTotal}&method=${paymentMethod}`);
    } finally {
      setIsPlacing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-[#A7B4C7]">Please add electronics to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('/shop')}
          className="px-6 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-bold"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SeoHead
        title="Secure Checkout | ElectroPulse 3D"
        description="Complete your electronics order with verified bank encryption and priority Prime delivery."
      />

      {/* Header */}
      <div className="pb-4 border-b border-[#2563EB]/20">
        <h1 className="font-display text-3xl font-black text-white tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs text-[#A7B4C7] mt-1">
          256-Bit SSL Encrypted Transaction with Official Brand Warranty Protection.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Login / Customer Info, Address, Delivery, Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Customer Info / Login */}
          <div className="p-6 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-[#2563EB]/20">
              <User className="w-4 h-4 text-[#06B6D4]" />
              <span>1. Customer & Account Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs text-[#A7B4C7]">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#A7B4C7]">Email Address</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#A7B4C7]">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address */}
          <div className="p-6 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-[#2563EB]/20">
              <MapPin className="w-4 h-4 text-[#06B6D4]" />
              <span>2. Delivery Address</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-[#A7B4C7]">Street Address & Flat / House No.</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-[#A7B4C7]">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#A7B4C7]">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#A7B4C7]">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Delivery Options */}
          <div className="p-6 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-[#2563EB]/20">
              <Truck className="w-4 h-4 text-[#06B6D4]" />
              <span>3. Shipping & Delivery Speed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setDeliveryOption('express')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  deliveryOption === 'express'
                    ? 'bg-[#2563EB]/15 border-[#2563EB] shadow-md shadow-[#2563EB]/20'
                    : 'bg-[#0D1B2A] border-[#2563EB]/20'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">Express Prime Delivery</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold">
                      FREE
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A7B4C7]">Tomorrow by 11:00 AM</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    deliveryOption === 'express' ? 'border-[#2563EB] bg-[#2563EB]' : 'border-neutral-600'
                  }`}
                >
                  {deliveryOption === 'express' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </label>

              <label
                onClick={() => setDeliveryOption('standard')}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  deliveryOption === 'standard'
                    ? 'bg-[#2563EB]/15 border-[#2563EB]'
                    : 'bg-[#0D1B2A] border-[#2563EB]/20'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">Standard Delivery</span>
                  </div>
                  <span className="text-[11px] text-[#A7B4C7]">2-3 Business Days</span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    deliveryOption === 'standard' ? 'border-[#2563EB] bg-[#2563EB]' : 'border-neutral-600'
                  }`}
                >
                  {deliveryOption === 'standard' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: Payment Methods (UPI, Card, Net Banking, Wallet, COD) */}
          <div className="p-6 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-[#2563EB]/20">
              <CreditCard className="w-4 h-4 text-[#06B6D4]" />
              <span>4. Payment Method</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {[
                { id: 'upi', label: 'UPI / QR', icon: DollarSign },
                { id: 'card', label: 'Credit/Debit', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building },
                { id: 'emi', label: 'Easy EMI', icon: Wallet },
                { id: 'cod', label: 'Cash on Delivery', icon: ShieldCheck },
              ].map((m) => {
                const Icon = m.icon;
                const active = paymentMethod === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      active
                        ? 'bg-[#2563EB] text-white border-[#06B6D4] shadow-md shadow-[#2563EB]/25'
                        : 'bg-[#0D1B2A] text-[#A7B4C7] hover:text-white border-[#2563EB]/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'upi' && (
              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2">
                <span className="text-xs text-[#A7B4C7]">Instant UPI ID (Google Pay, PhonePe, Paytm):</span>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@okhdfcbank"
                  className="w-full px-3.5 py-2 bg-[#111F33] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2 text-xs text-[#A7B4C7]">
                <p>Enter 16-digit card number and CVV on next secure gateway screen with 3D Secure OTP verification.</p>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2 text-xs text-[#A7B4C7]">
                <p>Support for HDFC Bank, ICICI, SBI, Axis, Kotak Mahindra, and all major Indian retail banks.</p>
              </div>
            )}

            {paymentMethod === 'emi' && (
              <div className="p-4 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Select No-Cost / Standard EMI Tenure:</span>
                  <span className="text-[#06B6D4] font-mono font-bold">
                    {formatPrice(Math.round(grandTotal / Number(selectedEmiTenure)))}/month
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { tenure: '3', label: '3 Months' },
                    { tenure: '6', label: '6 Months' },
                    { tenure: '9', label: '9 Months' },
                    { tenure: '12', label: '12 Months' },
                  ].map((ten) => (
                    <button
                      type="button"
                      key={ten.tenure}
                      onClick={() => setSelectedEmiTenure(ten.tenure as any)}
                      className={`p-2 rounded-xl text-xs text-center border font-mono transition-all ${
                        selectedEmiTenure === ten.tenure
                          ? 'bg-[#2563EB] text-white font-bold border-[#06B6D4]'
                          : 'bg-[#111F33] text-[#A7B4C7] border-[#2563EB]/20'
                      }`}
                    >
                      <span className="block">{ten.label}</span>
                      <span className="text-[10px] opacity-75">
                        {formatPrice(Math.round(grandTotal / Number(ten.tenure)))}/mo
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2 text-xs text-[#A7B4C7]">
                <p>Pay with cash, UPI QR scan, or card on doorstep delivery with open-box verification.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order (5 cols, sticky) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="p-6 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-5 shadow-xl">
            <h2 className="font-display text-lg font-bold text-white">Order Summary</h2>

            {/* Item Mini Thumbnails */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-[#0D1B2A] shrink-0"
                    />
                    <div className="truncate">
                      <span className="font-bold text-white block truncate">{item.product.name}</span>
                      <span className="text-[10px] text-[#A7B4C7]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-white shrink-0">
                    {formatPrice((item.product.price || 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-4 border-t border-[#2563EB]/20 text-xs">
              <div className="flex justify-between text-[#A7B4C7]">
                <span>Items Subtotal</span>
                <span className="font-mono text-white">{formatPrice(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#22C55E]">
                  <span>Coupon Deduction</span>
                  <span className="font-mono">- {formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#A7B4C7]">
                <span>Shipping</span>
                <span className="font-mono text-[#22C55E]">FREE EXPRESS</span>
              </div>
              <div className="pt-3 border-t border-[#2563EB]/30 flex justify-between items-baseline">
                <span className="font-bold text-white text-base">Total Amount</span>
                <span className="font-mono text-2xl font-black text-[#06B6D4]">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-extrabold text-sm rounded-xl shadow-xl shadow-[#2563EB]/30 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{isPlacing ? 'Confirming Order...' : 'Place Order Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-[#A7B4C7] space-y-1">
              <p className="flex items-center gap-1.5 text-[#22C55E]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>1 Year Manufacturer Warranty Included</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Your payment credentials are safe and tokenized</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
