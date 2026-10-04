import React, { useState } from 'react';
import { navigateTo } from '../lib/router.ts';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

export const HomeSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigateTo(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const trendingTags = [
    'iPhone 16 Pro Max',
    'RTX 4090 Gaming PC',
    'OLED 4K TV',
    'M4 MacBook Pro',
    'Sony WH-1000XM5',
    'Ultrawide 240Hz',
    'Mechanical Keyboard',
  ];

  return (
    <div className="relative max-w-3xl mx-auto -mt-6 sm:-mt-10 z-20 px-4">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center bg-[#111F33] border-2 border-[#2563EB]/40 hover:border-[#06B6D4] rounded-2xl shadow-2xl shadow-[#2563EB]/20 transition-all p-1.5"
      >
        <div className="pl-4 pr-2 text-[#06B6D4]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 10,000+ smartphones, gaming laptops, 4K OLED TVs, cameras..."
          className="w-full py-3 bg-transparent text-xs sm:text-sm text-white placeholder-[#A7B4C7] focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-md shadow-[#2563EB]/25"
        >
          <span>Search</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Suggested Quick Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-[11px] text-[#A7B4C7]">
        <span className="font-mono text-[#06B6D4] font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Popular:</span>
        </span>
        {trendingTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => navigateTo(`/search?q=${encodeURIComponent(tag)}`)}
            className="px-2.5 py-0.5 rounded-lg bg-[#0D1B2A] border border-[#2563EB]/20 hover:border-[#06B6D4] hover:text-white transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
