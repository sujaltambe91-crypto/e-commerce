import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { AdminReview } from '../../types/index.ts';
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  MessageSquare,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { showToast } = useStore();
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await authFetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await authFetch(`/api/admin/reviews/${id}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
        showToast(`Review marked as ${status}`, 'success');
      }
    } catch {
      showToast('Error updating review status', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this customer review?')) return;
    try {
      const res = await authFetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        showToast('Review deleted', 'success');
      }
    } catch {
      showToast('Error deleting review', 'error');
    }
  };

  const filtered = reviews.filter(
    (r) =>
      r.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.review_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="font-display text-2xl font-black text-white">Customer Reviews Moderation</h1>
          <p className="text-xs text-neutral-400">
            Moderate hardware feedback, verify buyer badges, and maintain community rating standards.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">
            Total Reviews: {reviews.length}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by product, customer, or keyword..."
          className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500 animate-pulse">Loading reviews...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-2">
          <MessageSquare className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No reviews found</h3>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-white">{rev.customer_name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {new Date(rev.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-xs font-bold text-amber-400 font-mono">
                  {rev.product_name}
                </div>

                <p className="text-xs text-neutral-300 italic">
                  "{rev.review_text}"
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                    rev.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : rev.status === 'rejected'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {rev.status}
                </span>

                {rev.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(rev.id, 'approved')}
                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                    title="Approve Review"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}

                {rev.status !== 'rejected' && (
                  <button
                    onClick={() => handleApprove(rev.id, 'rejected')}
                    className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400"
                    title="Reject Review"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                  title="Delete Review"
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
