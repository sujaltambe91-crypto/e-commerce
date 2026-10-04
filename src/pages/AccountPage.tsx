import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ArrowRight,
  Edit2,
  Zap,
  Settings,
  Bell,
  Lock,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export const AccountPage: React.FC = () => {
  const { wishlist, formatPrice, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<
    'profile' | 'orders' | 'wishlist' | 'addresses' | 'payments' | 'settings' | 'reviews' | 'recently_viewed'
  >('profile');

  // User Profile Data
  const [userName, setUserName] = useState('Sujal Tambe');
  const [userEmail, setUserEmail] = useState('sujaltambe91@gmail.com');
  const [userPhone, setUserPhone] = useState('+91 9876543210');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Saved Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Home (Default)',
      recipient: 'Sujal Tambe',
      line: '402 Silicon Heights, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+91 9876543210',
    },
    {
      id: 'addr-2',
      title: 'Studio Office',
      recipient: 'Sujal Tambe',
      line: 'Floor 3, Cyber Tech Hub, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 9876543210',
    },
  ]);

  // Saved Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pay-1', type: 'card', label: 'HDFC Bank Regalia Visa Infinite', last4: '4821', expiry: '08/28' },
    { id: 'pay-2', type: 'upi', label: 'Google Pay UPI', upiId: 'sujal@okhdfcbank' },
  ]);

  // Past Orders
  const orders = [
    {
      id: 'ORD-984210',
      date: 'Yesterday, 04:30 PM',
      total: 144900,
      status: 'Out for Delivery',
      statusColor: 'text-[#06B6D4] bg-[#2563EB]/15',
      items: [
        {
          name: 'Apple iPhone 16 Pro Max (Titanium)',
          specs: 'Natural Titanium • 256GB NVMe',
          image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    {
      id: 'ORD-892144',
      date: '12 Jan 2026',
      total: 24999,
      status: 'Delivered',
      statusColor: 'text-[#22C55E] bg-[#22C55E]/15',
      items: [
        {
          name: 'Sony WH-1000XM5 Headphones',
          specs: 'Midnight Silver • Active Noise Cancelling',
          image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
  ];

  // User Reviews
  const reviews = [
    {
      id: 'rev-1',
      productName: 'Sony WH-1000XM5 Headphones',
      rating: 5,
      date: '15 Jan 2026',
      comment: 'Audio fidelity is top tier. ANC blocks office ambient buzz completely.',
    },
  ];

  // Recently Viewed Products
  const recentlyViewed = [
    {
      id: 'rec-1',
      name: 'LG 65" Class C4 Series 4K OLED Smart TV',
      price: 189990,
      slug: 'lg-65-c4-series-oled-4k',
      image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'rec-2',
      name: 'ASUS ROG Strix SCAR 18 Gaming Laptop',
      price: 359990,
      slug: 'asus-rog-strix-scar-18-rtx4090',
      image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    showToast('Profile information updated successfully!', 'success');
  };

  return (
    <div className="space-y-8">
      <SeoHead
        title="User Account | Profile, Orders & Settings"
        description="Manage your profile, active orders, saved wishlist, shipping addresses, and review history."
      />

      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2563EB]/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#2563EB]/30">
            {userName.charAt(0)}
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
              {userName}
            </h1>
            <p className="text-xs text-[#A7B4C7]">
              {userEmail} • Verified Tech VIP Member
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('/order-tracking')}
          className="px-4 py-2 bg-[#111F33] hover:bg-[#0D1B2A] text-white text-xs font-semibold rounded-xl border border-[#2563EB]/30 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Clock className="w-4 h-4 text-[#06B6D4]" />
          <span>Track Active Order</span>
        </button>
      </div>

      {/* Navigation Tabs (Profile, Orders, Wishlist, Addresses, Payment Methods, Reviews, Recently Viewed) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Menu (4 cols) */}
        <div className="lg:col-span-4 bg-[#111F33] rounded-3xl border border-[#2563EB]/30 p-3 space-y-1 shadow-xl">
          {[
            { id: 'profile', label: 'Profile Details', icon: User },
            { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: orders.length },
            { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
            { id: 'payments', label: 'Payment Methods', icon: CreditCard, count: paymentMethods.length },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'reviews', label: 'Product Reviews', icon: MessageSquare, count: reviews.length },
            { id: 'recently_viewed', label: 'Recently Viewed', icon: Clock, count: recentlyViewed.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  active
                    ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25'
                    : 'text-[#A7B4C7] hover:text-white hover:bg-[#0D1B2A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-[#0D1B2A] text-[#A7B4C7]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Panel (8 cols) */}
        <div className="lg:col-span-8 bg-[#111F33] rounded-3xl border border-[#2563EB]/30 p-6 sm:p-8 space-y-6 shadow-xl">
          {/* 1. PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#2563EB]/20">
                <h3 className="font-display text-xl font-bold text-white">Profile Details</h3>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-3.5 py-1.5 bg-[#0D1B2A] hover:bg-[#07111F] text-[#06B6D4] rounded-xl text-xs font-semibold border border-[#2563EB]/30 transition-colors flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                  <div className="space-y-1">
                    <label className="text-xs text-[#A7B4C7]">Full Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#A7B4C7]">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-[#A7B4C7]">Phone Number</label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-xl shadow"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                    <span className="text-[#A7B4C7]">Full Name</span>
                    <span className="font-bold text-white text-sm block">{userName}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                    <span className="text-[#A7B4C7]">Email Address</span>
                    <span className="font-bold text-white text-sm block">{userEmail}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                    <span className="text-[#A7B4C7]">Contact Phone</span>
                    <span className="font-bold text-white text-sm block">{userPhone}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1">
                    <span className="text-[#A7B4C7]">Membership Tier</span>
                    <span className="font-bold text-[#06B6D4] text-sm block">Platinum VIP Member</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-in fade-in-50">
              <h3 className="font-display text-xl font-bold text-white pb-3 border-b border-[#2563EB]/20">
                Order History ({orders.length})
              </h3>
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-mono font-bold text-white text-sm block">{ord.id}</span>
                        <span className="text-[#A7B4C7]">{ord.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${ord.statusColor}`}>
                          {ord.status}
                        </span>
                        <span className="font-mono font-black text-sm text-white">
                          {formatPrice(ord.total)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#2563EB]/15 space-y-2">
                      {ord.items.map((it, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img src={it.image_url} alt={it.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <span className="font-bold text-white block">{it.name}</span>
                              <span className="text-[#A7B4C7] text-[11px]">{it.specs}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => navigateTo(`/order-tracking?orderId=${ord.id}`)}
                            className="px-3 py-1 bg-[#111F33] hover:bg-[#2563EB] text-[#06B6D4] hover:text-white rounded-lg text-[11px] font-semibold transition-colors"
                          >
                            Track Live
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#2563EB]/20">
                <h3 className="font-display text-xl font-bold text-white">Saved Wishlist ({wishlist.length})</h3>
                <button onClick={() => navigateTo('/wishlist')} className="text-xs text-[#06B6D4] hover:underline">
                  Full Page View →
                </button>
              </div>
              {wishlist.length === 0 ? (
                <p className="text-xs text-[#A7B4C7]">No saved items in wishlist.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((w) => (
                    <div key={w.id} className="p-3 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 flex items-center gap-3">
                      <img src={w.image_url} alt={w.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="truncate flex-1">
                        <h4 className="text-xs font-bold text-white truncate">{w.name}</h4>
                        <span className="text-xs font-mono text-[#06B6D4]">{formatPrice(w.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 animate-in fade-in-50">
              <h3 className="font-display text-xl font-bold text-white pb-3 border-b border-[#2563EB]/20">
                Saved Delivery Addresses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((ad) => (
                  <div key={ad.id} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-2 text-xs">
                    <span className="font-mono font-bold text-[#06B6D4] text-[10px] uppercase block">
                      {ad.title}
                    </span>
                    <strong className="text-white block">{ad.recipient}</strong>
                    <p className="text-[#A7B4C7] leading-relaxed">
                      {ad.line}, {ad.city}, {ad.state} - {ad.pincode}
                    </p>
                    <span className="text-[#A7B4C7] block">Phone: {ad.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. PAYMENT METHODS */}
          {activeTab === 'payments' && (
            <div className="space-y-4 animate-in fade-in-50">
              <h3 className="font-display text-xl font-bold text-white pb-3 border-b border-[#2563EB]/20">
                Saved Payment Methods
              </h3>
              <div className="space-y-3">
                {paymentMethods.map((pm) => (
                  <div key={pm.id} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#2563EB]" />
                      <div>
                        <strong className="text-white block">{pm.label}</strong>
                        <span className="text-[#A7B4C7]">
                          {pm.last4 ? `Card ending in •••• ${pm.last4} (Exp: ${pm.expiry})` : pm.upiId}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-in fade-in-50">
              <h3 className="font-display text-xl font-bold text-white pb-3 border-b border-[#2563EB]/20">
                My Reviews ({reviews.length})
              </h3>
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-white">{r.productName}</strong>
                      <span className="text-[#A7B4C7]">{r.date}</span>
                    </div>
                    <p className="text-[#A7B4C7]">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. RECENTLY VIEWED */}
          {activeTab === 'recently_viewed' && (
            <div className="space-y-4 animate-in fade-in-50">
              <h3 className="font-display text-xl font-bold text-white pb-3 border-b border-[#2563EB]/20">
                Recently Viewed Electronics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentlyViewed.map((rv) => (
                  <div
                    key={rv.id}
                    onClick={() => navigateTo(`/product/${rv.slug}`)}
                    className="p-3.5 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 hover:border-[#06B6D4] cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <img src={rv.image_url} alt={rv.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-white truncate">{rv.name}</h4>
                      <span className="text-xs font-mono font-bold text-[#06B6D4] block">{formatPrice(rv.price)}</span>
                      <span className="text-[10px] text-[#A7B4C7]">Tap to inspect specs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="pb-3 border-b border-[#2563EB]/20">
                <h3 className="font-display text-xl font-bold text-white">Account Settings & Security</h3>
                <p className="text-xs text-[#A7B4C7]">Manage your notification preferences, privacy, and currency display.</p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Security */}
                <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Lock className="w-4 h-4 text-[#06B6D4]" />
                    <span>Security & Authentication</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white block">Two-Factor Authentication (2FA)</span>
                      <span className="text-[11px] text-[#A7B4C7]">Secure your hardware orders with SMS / Authenticator OTP</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                      ENABLED
                    </span>
                  </div>
                </div>

                {/* Notifications */}
                <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Bell className="w-4 h-4 text-[#7C3AED]" />
                    <span>Alerts & Notifications</span>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-neutral-300">Live SMS & WhatsApp shipment updates</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-neutral-300">Exclusive Flash Sale & Drop notifications</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer" />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-neutral-300">Hardware price-drop alerts on wishlisted devices</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer" />
                    </label>
                  </div>
                </div>

                {/* Regional Preferences */}
                <div className="p-4 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/20 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Settings className="w-4 h-4 text-[#2563EB]" />
                    <span>Display Preferences</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Default Currency</span>
                    <span className="font-mono font-bold text-white px-3 py-1 bg-[#111F33] rounded-lg border border-[#2563EB]/30">
                      INR (₹) - Indian Rupee
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300">Color Theme</span>
                    <span className="font-mono text-white px-3 py-1 bg-[#111F33] rounded-lg border border-[#2563EB]/30">
                      Cyber Navy & Electric Blue (Default)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
