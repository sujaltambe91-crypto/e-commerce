import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import { SeoHead } from '../components/SeoHead.tsx';
import { ArrowRight, Layers } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, settings } = useStore();

  return (
    <div className="space-y-10">
      <SeoHead
        title="Departments & Categories"
        description={`Explore all departments and curated categories on ${settings.brand_name}.`}
      />

      <div className="border-b border-neutral-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Taxonomy</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Browse All Categories
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Find exactly what you're looking for across our specialized departments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigateTo(`/shop?category=${cat.slug}`)}
            className="group relative rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 overflow-hidden cursor-pointer flex flex-col justify-between h-72 p-6 transition-all duration-300"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={cat.image_url}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-25 group-hover:opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="px-2.5 py-1 rounded-md bg-neutral-950/70 border border-neutral-800 text-xs font-mono text-amber-400">
                {cat.product_count !== undefined ? `${cat.product_count} Products` : 'Curated'}
              </span>
              <span className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700/80 group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:border-amber-500 text-neutral-300 flex items-center justify-center transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="font-display text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.subcategories.slice(0, 4).map((sub) => (
                    <span
                      key={sub}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(`/shop?category=${cat.slug}&search=${encodeURIComponent(sub)}`);
                      }}
                      className="px-2 py-0.5 rounded-md bg-neutral-900/90 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800 border border-neutral-800 text-[10px] font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
