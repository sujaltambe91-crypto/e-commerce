import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { Search, RotateCcw } from 'lucide-react';
import { navigateTo } from '../lib/router.ts';

export const SearchPage: React.FC = () => {
  const { settings } = useStore();
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInputVal(query);
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to search products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      navigateTo(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  return (
    <div className="space-y-8">
      <SeoHead
        title={query ? `Search: "${query}"` : 'Search Products'}
        description={`Search results for ${query} on ${settings.brand_name}.`}
      />

      {/* Search Header */}
      <div className="max-w-2xl mx-auto space-y-4 text-center">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">
          Product Search
        </h1>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search by keywords, model, features..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
          >
            Search
          </button>
        </form>

        {query && (
          <p className="text-xs text-neutral-400">
            Showing results for <span className="text-amber-400 font-semibold">"{query}"</span>
            {!loading && ` (${products.length} ${products.length === 1 ? 'match' : 'matches'} found)`}
          </p>
        )}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-neutral-900/60 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-neutral-900/30 border border-neutral-800 text-neutral-400 max-w-lg mx-auto space-y-3">
          <Search className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No matches found</h3>
          <p className="text-xs text-neutral-400">
            We couldn't find any products matching your query. Try broader keywords or explore our departments.
          </p>
          <button
            onClick={() => navigateTo('/shop')}
            className="mt-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Browse All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
