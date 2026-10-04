import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { Coupon } from '../../types/index.ts';
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Percent,
  Sparkles,
} from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { formatPrice, showToast } = useStore();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // New Coupon Form
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(10);
  const [maxDiscount, setMaxDiscount] = useState(5000);
  const [minSpend, setMinSpend] = useState(10000);
  const [description, setDescription] = useState('');

  const fetchCoupons = async () => {
    try {
      const res = await authFetch('/api/admin/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch (err) {
      console.error('Error fetching coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      showToast('Coupon code is required', 'error');
      return;
    }

    try {
      const res = await authFetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          discount_percentage: Number(discountPercentage),
          max_discount: Number(maxDiscount),
          min_spend: Number(minSpend),
          description: description.trim(),
          active: true,
        }),
      });

      if (res.ok) {
        showToast('Coupon created successfully!', 'success');
        setCode('');
        setDescription('');
        setIsCreating(false);
        fetchCoupons();
      } else {
        showToast('Failed to create coupon', 'error');
      }
    } catch {
      showToast('Error saving coupon', 'error');
    }
  };

  const handleDeleteCoupon = async (couponCode: string) => {
    if (!window.confirm(`Delete coupon code ${couponCode}?`)) return;
    try {
      const res = await authFetch(`/api/admin/coupons/${couponCode}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCoupons((prev) => prev.filter((c) => c.code !== couponCode));
        showToast(`Coupon ${couponCode} deleted`, 'success');
      }
    } catch {
      showToast('Error deleting coupon', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="font-display text-2xl font-black text-white">Coupons & Promo Codes</h1>
          <p className="text-xs text-neutral-400">
            Create promotional discount codes with minimum spend thresholds and maximum discount ceilings.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? 'Cancel' : 'Add New Coupon'}</span>
        </button>
      </div>

      {/* Coupon Creation Form */}
      {isCreating && (
        <form onSubmit={handleCreateCoupon} className="p-6 rounded-2xl bg-neutral-900 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Create Promotional Discount Voucher</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Coupon Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. ELECTRO20"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Discount (%)</label>
              <input
                type="number"
                min={1}
                max={90}
                required
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Max Discount (₹)</label>
              <input
                type="number"
                min={100}
                required
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Min Cart Spend (₹)</label>
              <input
                type="number"
                min={0}
                required
                value={minSpend}
                onChange={(e) => setMinSpend(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-neutral-400">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Instant 10% discount on flagship smartphones & creator laptops"
              className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            />
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
              Save Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupons List */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500 animate-pulse">Loading coupons...</div>
      ) : coupons.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-2">
          <Tag className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No active coupons</h3>
          <p className="text-xs text-neutral-500">Click the button above to generate a promo code.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-base font-black px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 tracking-wider">
                    {c.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    {c.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>

                <div className="text-lg font-bold text-white">
                  {c.discount_percentage}% OFF
                  <span className="text-xs text-neutral-400 font-normal ml-2">
                    (Up to {formatPrice(c.max_discount)})
                  </span>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-2">
                  {c.description || 'Valid across all eligible electronics.'}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-neutral-500 text-[11px]">
                  Min Spend: <strong className="text-neutral-300 font-mono">{formatPrice(c.min_spend)}</strong>
                </span>

                <button
                  onClick={() => handleDeleteCoupon(c.code)}
                  className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
