import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { PromotionalOffer } from '../../types/index.ts';
import {
  Flame,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const AdminOffers: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { showToast } = useStore();
  const [offers, setOffers] = useState<PromotionalOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [discountBadge, setDiscountBadge] = useState('15% OFF');
  const [code, setCode] = useState('');
  const [categorySlug, setCategorySlug] = useState('all');
  const [bannerImage, setBannerImage] = useState('');

  const fetchOffers = async () => {
    try {
      const res = await authFetch('/api/admin/offers');
      if (res.ok) {
        const data = await res.json();
        setOffers(data);
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Offer title is required', 'error');
      return;
    }

    try {
      const res = await authFetch('/api/admin/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim(),
          discount_badge: discountBadge.trim(),
          code: code ? code.trim().toUpperCase() : undefined,
          category_slug: categorySlug,
          banner_image:
            bannerImage ||
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
          status: 'active',
        }),
      });

      if (res.ok) {
        showToast('Offer campaign created successfully!', 'success');
        setTitle('');
        setSubtitle('');
        setCode('');
        setBannerImage('');
        setIsCreating(false);
        fetchOffers();
      } else {
        showToast('Failed to create offer campaign', 'error');
      }
    } catch {
      showToast('Error saving offer', 'error');
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    if (!window.confirm('Are you sure you want to delete this promotional offer?')) return;
    try {
      const res = await authFetch(`/api/admin/offers/${offerId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setOffers((prev) => prev.filter((o) => o.id !== offerId));
        showToast('Offer campaign deleted', 'success');
      }
    } catch {
      showToast('Failed to delete offer', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="font-display text-2xl font-black text-white">Promotional Offers & Campaigns</h1>
          <p className="text-xs text-neutral-400">
            Publish seasonal flash sale banners, instant bank discount campaigns, and category promotions.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? 'Cancel' : 'Create Campaign'}</span>
        </button>
      </div>

      {/* Campaign Form */}
      {isCreating && (
        <form onSubmit={handleCreateOffer} className="p-6 rounded-2xl bg-neutral-900 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>New Hardware Promotional Campaign</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Campaign Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. RTX 40-Series Esports Blast"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Discount Pill Badge</label>
              <input
                type="text"
                required
                value={discountBadge}
                onChange={(e) => setDiscountBadge(e.target.value)}
                placeholder="e.g. 15% INSTANT OFF"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Optional Promo Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. ESPORTS2026"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Subtitle / Offer Description</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Flat ₹15,000 instant discount on ASUS & Dell gaming rigs"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Banner Image URL</label>
              <input
                type="url"
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs shadow"
            >
              Publish Offer
            </button>
          </div>
        </form>
      )}

      {/* Offers Grid */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500 animate-pulse">Loading campaigns...</div>
      ) : offers.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-2">
          <Flame className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No promotional campaigns yet</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl group hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 w-full bg-neutral-950">
                <img
                  src={offer.banner_image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase shadow-lg shadow-red-500/30">
                  {offer.discount_badge}
                </div>
                {offer.code && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold">
                    CODE: {offer.code}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-lg font-black text-white">{offer.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1">{offer.subtitle}</p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                    Status: {offer.status}
                  </span>
                  <button
                    onClick={() => handleDeleteOffer(offer.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
