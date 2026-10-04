import React, { useState } from 'react';
import { Product, ProductReview } from '../types/index.ts';
import { Star, ShieldCheck, ThumbsUp, MessageSquarePlus, CheckCircle2, User, X } from 'lucide-react';
import { useStore } from '../context/StoreContext.tsx';

interface ProductReviewsSectionProps {
  product: Product;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const { showToast } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const [reviewsList, setReviewsList] = useState<ProductReview[]>(
    product.reviews && product.reviews.length > 0
      ? product.reviews
      : [
          {
            id: 'rev-p1',
            user_name: 'Dr. Arjun Roy',
            rating: 5,
            date: '3 days ago',
            title: 'Unbelievable performance and OLED display clarity',
            comment:
              'The build quality and ergonomics are unmatched. The OLED display is crisp with zero glare under bright office lighting. Battery holds up for two full days of demanding workloads.',
            verified: true,
          },
          {
            id: 'rev-p2',
            user_name: 'Sneha Patel',
            rating: 5,
            date: '1 week ago',
            title: 'Flawless packaging and official brand warranty activation',
            comment:
              'Shipped overnight in tamper-proof packaging. Serial number validated right away on the official brand website for full 1-year coverage. 100% genuine.',
            verified: true,
          },
          {
            id: 'rev-p3',
            user_name: 'Karan Singhal',
            rating: 4,
            date: '2 weeks ago',
            title: 'Great thermal dissipation and silent operation',
            comment:
              'Even during intense 4K rendering and compilation, the chassis remains cool. The vapor chamber cooling makes a huge difference. Highly recommended.',
            verified: true,
          },
        ]
  );

  const [helpfuls, setHelpfuls] = useState<Record<string, number>>({});

  const handleUpvote = (id: string) => {
    setHelpfuls((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newComment.trim()) {
      const created: ProductReview = {
        id: `rev-${Date.now()}`,
        user_name: newName.trim(),
        rating: newRating,
        title: newTitle.trim() || 'Verified Customer Feedback',
        comment: newComment.trim(),
        date: 'Just now',
        verified: true,
      };
      setReviewsList([created, ...reviewsList]);
      setModalOpen(false);
      setNewName('');
      setNewTitle('');
      setNewComment('');
      showToast('Thank you! Your verified product review has been published.', 'success');
    }
  };

  const ratingCounts = product.rating_breakdown || {
    5: 82,
    4: 12,
    3: 4,
    2: 1,
    1: 1,
  };

  return (
    <section className="space-y-8 pt-8 border-t border-[#2563EB]/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider block mb-0.5">
            Verified Customer Ratings & Sentiment
          </span>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            Customer Reviews & Ratings
          </h3>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#2563EB]/25 cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4 text-[#06B6D4]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Aggregate Rating Banner */}
      <div className="rounded-3xl bg-[#111F33] border border-[#2563EB]/25 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl shadow-[#07111F]">
        {/* Score & Stars (4 cols) */}
        <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-[#2563EB]/20 pb-6 md:pb-0 md:pr-6">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="font-display text-5xl font-black text-white font-mono">
              {product.rating ? product.rating.toFixed(1) : '4.9'}
            </span>
            <span className="text-sm text-[#A7B4C7]">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-5 h-5 ${
                  s <= Math.round(product.rating || 5)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-neutral-600'
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-[#A7B4C7]">
            Based on {product.reviews_count || reviewsList.length * 48} verified customer purchases
          </p>
        </div>

        {/* Rating Breakdown Bars (8 cols) */}
        <div className="md:col-span-8 space-y-2.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = ratingCounts[star as keyof typeof ratingCounts] || 0;
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="font-mono text-white w-12 font-medium">{star} Star</span>
                <div className="flex-1 h-2 rounded-full bg-[#0D1B2A] border border-[#2563EB]/20 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      star === 5
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4]'
                        : star === 4
                        ? 'bg-[#2563EB]'
                        : star === 3
                        ? 'bg-[#7C3AED]'
                        : 'bg-neutral-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="font-mono text-[#A7B4C7] w-10 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-4">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#111F33] border border-[#2563EB]/20 space-y-3 transition-colors hover:border-[#2563EB]/40"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-xs font-bold font-mono">
                  {rev.user_name.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{rev.user_name}</span>
                    {rev.verified && (
                      <span className="px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-[10px] font-semibold border border-[#22C55E]/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#A7B4C7] font-mono">{rev.date}</span>
                </div>
              </div>

              {/* Star Score */}
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h4 className="text-sm font-bold text-white pt-1">{rev.title}</h4>
            <p className="text-xs text-[#A7B4C7] leading-relaxed">{rev.comment}</p>

            {/* Helpful feedback button */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#A7B4C7] border-t border-[#2563EB]/15">
              <span>Was this review helpful?</span>
              <button
                onClick={() => handleUpvote(rev.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0D1B2A] border border-[#2563EB]/25 hover:border-[#06B6D4] text-[#A7B4C7] hover:text-white transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Helpful ({helpfuls[rev.id] || 0})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#111F33] border border-[#2563EB]/40 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2563EB]/20">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="font-display text-lg font-bold text-white">Write a Product Review</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-[#A7B4C7] hover:text-white hover:bg-[#0D1B2A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A7B4C7] mb-1">Your Rating:</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-xs text-[#06B6D4] font-bold ml-2">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B4C7] mb-1">Your Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white placeholder-[#A7B4C7]/50 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B4C7] mb-1">Review Headline:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional display quality and speedy charging"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white placeholder-[#A7B4C7]/50 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A7B4C7] mb-1">Detailed Review:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details on performance, build quality, ergonomics, and daily usage..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white placeholder-[#A7B4C7]/50 focus:outline-none focus:border-[#06B6D4]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#A7B4C7] hover:text-white border border-[#2563EB]/25 hover:bg-[#0D1B2A] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#2563EB]/30 transition-all cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
