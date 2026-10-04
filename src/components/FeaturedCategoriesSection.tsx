import React, { useState } from 'react';
import { Category } from '../types/index.ts';
import { navigateTo } from '../lib/router.ts';
import {
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  BookOpen,
  Dumbbell,
  Gamepad2,
  ShoppingBasket,
  ArrowRight,
  Layers,
  Laptop,
  Tv,
  Headphones,
  Camera,
  Monitor,
} from 'lucide-react';

interface FeaturedCategoriesSectionProps {
  categories: Category[];
}

export const FeaturedCategoriesSection: React.FC<FeaturedCategoriesSectionProps> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'electronics' | 'lifestyle'>('all');

  // Primary 8 shopping categories config from prompt
  const mainCategories = [
    {
      slug: 'fashion',
      name: 'Fashion',
      icon: Shirt,
      desc: "Men's, Women's, Sneakers & Luxury Watches",
      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      badge: 'Up to 50% Off',
      badgeColor: 'bg-[#EF4444]',
    },
    {
      slug: 'electronics',
      name: 'Electronics',
      icon: Smartphone,
      desc: '3D Smartphones, Laptops, 4K OLED & Audio',
      img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      badge: 'Flagship 3D',
      badgeColor: 'bg-[#2563EB]',
    },
    {
      slug: 'home-kitchen',
      name: 'Home & Kitchen',
      icon: Home,
      desc: 'Smart Lamps, Cookware, 600TC Bedsheets & Decor',
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      badge: 'Best Value',
      badgeColor: 'bg-[#7C3AED]',
    },
    {
      slug: 'beauty',
      name: 'Beauty & Personal Care',
      icon: Sparkles,
      desc: 'Luxury Perfumes, Glow Serums & Trimmers',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
      badge: '100% Genuine',
      badgeColor: 'bg-[#EC4899]',
    },
    {
      slug: 'books-stationery',
      name: 'Books & Stationery',
      icon: BookOpen,
      desc: 'Bestseller Books, Moleskine Pens & Art Sets',
      img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
      badge: 'Top Reads',
      badgeColor: 'bg-[#06B6D4]',
    },
    {
      slug: 'sports-fitness',
      name: 'Sports & Fitness',
      icon: Dumbbell,
      desc: 'English Willow Bats, Yoga Mats & Gym Gear',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      badge: 'Pro Grade',
      badgeColor: 'bg-[#10B981]',
    },
    {
      slug: 'toys-kids',
      name: 'Toys & Kids',
      icon: Gamepad2,
      desc: 'STEM Robotics, 4WD RC Cars & Board Games',
      img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=600&q=80',
      badge: 'Ages 3-16',
      badgeColor: 'bg-[#F59E0B]',
    },
    {
      slug: 'grocery',
      name: 'Grocery & Gourmet',
      icon: ShoppingBasket,
      desc: 'Aged Basmati, Arabica Coffee & Dry Fruits',
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      badge: 'Daily Essentials',
      badgeColor: 'bg-[#22C55E]',
    },
  ];

  return (
    <section id="categories-section" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#2563EB]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Universal Shopping Mall</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
            Explore 8 mega departments curated with verified authentic stock, instant EMI, and express doorstep delivery.
          </p>
        </div>

        <a
          href="/categories"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/categories');
          }}
          className="text-xs font-bold text-[#2563EB] hover:text-[#06B6D4] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>View All Departments</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 8 Primary Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
        {mainCategories.map((cat) => {
          const IconComponent = cat.icon;
          const matchingCat = categories.find((c) => c.slug === cat.slug);
          const count = matchingCat?.product_count ?? 25;

          return (
            <div
              key={cat.slug}
              onClick={() => navigateTo(`/${cat.slug}`)}
              className="group relative rounded-2xl bg-[#111F33] border border-[#2563EB]/30 hover:border-[#7C3AED] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-52 shadow-xl"
            >
              {/* Product Background Image */}
              <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-45 group-hover:scale-105 transition-all duration-500 overflow-hidden">
                <img
                  src={cat.img}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111F33] via-[#111F33]/80 to-transparent" />
              </div>

              {/* Top: Icon & Badge */}
              <div className="relative z-10 p-4 flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/40 group-hover:bg-[#2563EB] group-hover:border-[#06B6D4] text-[#06B6D4] group-hover:text-white flex items-center justify-center transition-all shadow-md group-hover:scale-110">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded text-white shadow-md ${cat.badgeColor}`}
                >
                  {cat.badge}
                </span>
              </div>

              {/* Bottom: Title, Description & Action */}
              <div className="relative z-10 p-4 space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-[#06B6D4] transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#A7B4C7] line-clamp-1">
                  {cat.desc}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#2563EB]/20 text-[11px] font-bold text-[#A7B4C7] group-hover:text-[#7C3AED] transition-colors">
                  <span>Explore Items</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-[#06B6D4]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
