import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      showToast('🎉 Subscribed! Use promo coupon ELECTRO15 for 15% off your next order.');
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0D1B2A] via-[#111F33] to-[#0D1B2A] border border-[#2563EB]/40 p-8 sm:p-12 text-white shadow-2xl">
      {/* Background ambient neon glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#06B6D4] font-mono text-xs font-bold uppercase tracking-wider">
          <Tag className="w-3.5 h-3.5" />
          <span>VIP ELECTRONICS ACCESS</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Stay Ahead in Next-Gen Tech
          </h2>
          <p className="text-sm sm:text-base text-[#A7B4C7] max-w-xl mx-auto">
            Subscribe for early flash sale notifications, launch announcements on flagship silicon, and exclusive VIP member coupons.
          </p>
        </div>

        {subscribed ? (
          <div className="bg-[#07111F] text-white p-6 rounded-2xl max-w-md mx-auto space-y-2 border border-[#2563EB]/30 animate-in zoom-in-95">
            <div className="flex items-center justify-center gap-2 text-[#22C55E] font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>You're on the VIP list!</span>
            </div>
            <p className="text-xs text-[#A7B4C7]">
              Your instant checkout discount coupon is:
            </p>
            <div className="p-3 bg-[#111F33] rounded-xl border border-[#2563EB]/40 font-mono text-base font-extrabold text-[#06B6D4] tracking-wider">
              ELECTRO15
            </div>
            <span className="text-[11px] text-[#A7B4C7] block">
              Enjoy 15% discount on all flagship electronics today.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7B4C7]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-[#07111F] border border-[#2563EB]/40 rounded-xl text-xs text-white placeholder-[#A7B4C7] focus:outline-none focus:border-[#06B6D4]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#2563EB]/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
