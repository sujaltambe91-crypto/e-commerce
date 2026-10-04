import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
  productName: string;
  date: string;
  comment: string;
}

export const CustomerReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 'rev-1',
      name: 'Dr. Rohan Mehra',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      productName: 'Apple iPhone 16 Pro Max (Titanium)',
      rating: 5,
      date: '2 days ago',
      comment:
        'The 3D interactive viewer on this website convinced me before buying. Being able to inspect the titanium frame and camera module in 3D gave me total confidence. Delivered in 24 hours in sealed Apple packaging with valid serial number for AppleCare+.',
    },
    {
      id: 'rev-2',
      name: 'Aditya Sharma',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      productName: 'ASUS ROG Zephyrus G16 (RTX 4090)',
      rating: 5,
      date: '1 week ago',
      comment:
        'Insane performance! The 240Hz OLED screen is buttery smooth for Cyberpunk 2077 and Unreal Engine 5 rendering. Availed 12-month no cost EMI smoothly via HDFC credit card. Absolute beast of a machine.',
    },
    {
      id: 'rev-3',
      name: 'Pooja Iyer',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      productName: 'LG OLED evo G4 65" 4K Smart TV',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'True blacks and zero blooming. Upgraded from an older LED and the difference is night and day. Wall mount installation was coordinated seamlessly by the brand technician.',
    },
    {
      id: 'rev-4',
      name: 'Vikram Joshi',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      productName: 'Sony WH-1000XM5 Noise Cancelling Headphones',
      rating: 5,
      date: '3 weeks ago',
      comment:
        'Active Noise Cancellation is unbeatable during metro commutes. Audio clarity on LDAC lossless is crystal clear. 100% genuine product with 1-year Sony India warranty card.',
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Verified Purchase Experiences</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
            Real feedback from verified tech enthusiasts, creators, and esports gamers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#111F33] px-3.5 py-1.5 rounded-xl border border-[#2563EB]/25 text-xs">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-white font-mono">4.9 / 5.0</span>
          <span className="text-[#A7B4C7] text-[11px]">(1,420+ Reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-[#111F33] border border-[#2563EB]/20 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Customer Photo, Name, Rating */}
              <div className="flex items-center gap-3">
                <img
                  src={rev.photoUrl}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#2563EB]/40 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white truncate">
                      {rev.name}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  </div>
                  <div className="flex items-center gap-1 pt-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] text-[#A7B4C7] ml-1 font-mono">{rev.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs text-[#A7B4C7] leading-relaxed line-clamp-4">
                "{rev.comment}"
              </p>
            </div>

            {/* Product Purchased Tag */}
            <div className="pt-3 border-t border-[#2563EB]/15 text-[10px] font-mono text-[#06B6D4] truncate">
              Verified: {rev.productName}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
