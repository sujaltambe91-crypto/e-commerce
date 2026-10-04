import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { useStore } from '../context/StoreContext.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Filter,
  Check,
  Smartphone,
  Laptop,
  Tv,
  Gamepad2,
  Headphones,
  Camera,
  Cpu,
} from 'lucide-react';

interface ShopPageProps {
  forcedCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ forcedCategory }) => {
  const { categories, formatPrice, settings } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse initial query params from window location
  const searchParams = new URLSearchParams(window.location.search);
  const pathCategory = window.location.pathname.replace('/', '');
  const isDirectCategoryPath = ['smartphones', 'laptops', 'computers', 'tvs', 'gaming', 'audio', 'cameras'].includes(pathCategory);

  const initialCat = forcedCategory || (isDirectCategoryPath ? pathCategory : searchParams.get('category')) || 'all';
  const initialFeatured = searchParams.get('featured') === 'true';
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialSort = searchParams.get('sortBy') || searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [isFeaturedOnly, setIsFeaturedOnly] = useState<boolean>(initialFeatured);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(400000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Category-Specific Dynamic Filters
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedRam, setSelectedRam] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [selectedDisplay, setSelectedDisplay] = useState<string>('all');
  const [is5GOnly, setIs5GOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);

  // Hardware Filters (Laptops/PCs/TVs/Gaming)
  const [selectedGpu, setSelectedGpu] = useState<string>('all');
  const [selectedTvType, setSelectedTvType] = useState<string>('all');
  const [selectedAudioType, setSelectedAudioType] = useState<string>('all');

  // Fetch products
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'all') {
          params.set('category', selectedCategory);
        }
        if (isFeaturedOnly) {
          params.set('featured', 'true');
        }
        if (searchTerm.trim()) {
          params.set('search', searchTerm.trim());
        }
        params.set('sortBy', sortBy);

        const res = await fetch(`/api/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching shop catalog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, [selectedCategory, isFeaturedOnly, searchTerm, sortBy]);

  // Client-Side Multi-Filter Filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Price
      if (p.price !== undefined && p.price > maxPriceFilter) return false;

      // 2. Brand
      if (selectedBrand !== 'all') {
        if (!p.brand || !p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
          return false;
        }
      }

      // 3. RAM
      if (selectedRam !== 'all') {
        const ramStr = `${p.specs?.ram || ''} ${p.hardware?.ram || ''} ${(p.ram_options || []).join(' ')}`;
        if (!ramStr.toLowerCase().includes(selectedRam.toLowerCase())) return false;
      }

      // 4. Storage
      if (selectedStorage !== 'all') {
        const storageStr = `${p.specs?.storage || ''} ${p.hardware?.storage || ''} ${(p.storage_options || []).join(' ')}`;
        if (!storageStr.toLowerCase().includes(selectedStorage.toLowerCase())) return false;
      }

      // 5. 5G
      if (is5GOnly) {
        const text = `${p.name} ${p.specs?.connectivity || ''} ${p.short_description || ''}`;
        if (!text.toLowerCase().includes('5g')) return false;
      }

      // 6. Rating
      if (minRating > 0 && (p.rating || 0) < minRating) return false;

      // 7. GPU (for laptops & PCs)
      if (selectedGpu !== 'all') {
        const gpuStr = `${p.specs?.graphics || ''} ${p.hardware?.graphics || ''}`;
        if (!gpuStr.toLowerCase().includes(selectedGpu.toLowerCase())) return false;
      }

      // 8. TV Panel
      if (selectedTvType !== 'all') {
        const tvStr = `${p.specs?.panel_type || ''} ${p.name || ''}`;
        if (!tvStr.toLowerCase().includes(selectedTvType.toLowerCase())) return false;
      }

      return true;
    });
  }, [
    products,
    maxPriceFilter,
    selectedBrand,
    selectedRam,
    selectedStorage,
    is5GOnly,
    minRating,
    selectedGpu,
    selectedTvType,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setIsFeaturedOnly(false);
    setSearchTerm('');
    setSortBy('popular');
    setMaxPriceFilter(400000);
    setSelectedBrand('all');
    setSelectedRam('all');
    setSelectedStorage('all');
    setIs5GOnly(false);
    setMinRating(0);
    setSelectedGpu('all');
    setSelectedTvType('all');
  };

  const getPageTitle = () => {
    if (selectedCategory === 'smartphones') return 'Flagship 5G Smartphones';
    if (selectedCategory === 'laptops') return 'High-Performance Creator Laptops';
    if (selectedCategory === 'computers') return 'Desktop PCs & Workstations';
    if (selectedCategory === 'tvs') return 'True-Black 4K & 8K OLED Smart TVs';
    if (selectedCategory === 'gaming') return 'Esports Gaming Gear & Battlestations';
    if (selectedCategory === 'audio') return 'Audiophile Wireless Sound & ANC';
    if (selectedCategory === 'cameras') return 'Cinema Mirrorless & 4K Optics';
    return 'Full Electronics Catalog';
  };

  return (
    <div className="space-y-8">
      <SeoHead
        title={`${getPageTitle()} | ElectroPulse 3D`}
        description="Filter flagship hardware by processor, RAM, storage, 5G, display refresh rate, and verified customer ratings."
      />

      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0D1B2A] via-[#111F33] to-[#07111F] border border-[#2563EB]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED HARDWARE CATALOG</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            {getPageTitle()}
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-xl">
            Compare specs, inspect 360° 3D models, and order with official brand warranty and same-day air dispatch.
          </p>
        </div>

        {/* Search Bar in Header */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#06B6D4]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search specs, models..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#07111F] border border-[#2563EB]/30 rounded-xl text-xs text-white placeholder-[#A7B4C7] focus:outline-none focus:border-[#06B6D4]"
          />
        </div>
      </div>

      {/* Main Grid: Filters Sidebar (3 cols) + Product Grid (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters (Desktop & Mobile) */}
        <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
          <div className="p-5 rounded-3xl bg-[#111F33] border border-[#2563EB]/30 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2563EB]/20">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Filters</span>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-mono text-[#06B6D4] hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-[#2563EB] text-white font-bold'
                      : 'text-[#A7B4C7] hover:text-white hover:bg-[#0D1B2A]'
                  }`}
                >
                  <span>All Categories</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.slug)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === c.slug
                        ? 'bg-[#2563EB] text-white font-bold'
                        : 'text-[#A7B4C7] hover:text-white hover:bg-[#0D1B2A]'
                    }`}
                  >
                    <span>{c.name}</span>
                    {c.product_count !== undefined && (
                      <span className="text-[10px] font-mono opacity-60">({c.product_count})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 pt-3 border-t border-[#2563EB]/20">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Max Budget</span>
                <span className="font-mono font-bold text-[#06B6D4]">
                  {formatPrice(maxPriceFilter)}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={400000}
                step={5000}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#2563EB] bg-[#0D1B2A] h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Brand Filter */}
            <div className="space-y-2 pt-3 border-t border-[#2563EB]/20">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Brand
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['all', 'Apple', 'Samsung', 'Sony', 'ASUS', 'Dell', 'LG', 'OnePlus', 'HP'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      selectedBrand === b
                        ? 'bg-[#2563EB] text-white font-bold'
                        : 'bg-[#0D1B2A] text-[#A7B4C7] hover:text-white border border-[#2563EB]/20'
                    }`}
                  >
                    {b === 'all' ? 'All Brands' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* RAM Filter (Smartphones & Laptops) */}
            <div className="space-y-2 pt-3 border-t border-[#2563EB]/20">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                RAM / Memory
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {['all', '8GB', '16GB', '32GB', '64GB'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRam(r)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium text-center transition-colors ${
                      selectedRam === r
                        ? 'bg-[#2563EB] text-white font-bold'
                        : 'bg-[#0D1B2A] text-[#A7B4C7] hover:text-white border border-[#2563EB]/20'
                    }`}
                  >
                    {r === 'all' ? 'Any RAM' : r}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Filter */}
            <div className="space-y-2 pt-3 border-t border-[#2563EB]/20">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Internal Storage
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {['all', '128GB', '256GB', '512GB', '1TB'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStorage(s)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium text-center transition-colors ${
                      selectedStorage === s
                        ? 'bg-[#2563EB] text-white font-bold'
                        : 'bg-[#0D1B2A] text-[#A7B4C7] hover:text-white border border-[#2563EB]/20'
                    }`}
                  >
                    {s === 'all' ? 'Any Storage' : s}
                  </button>
                ))}
              </div>
            </div>

            {/* 5G Switch (Smartphones) */}
            {selectedCategory === 'smartphones' && (
              <div className="pt-3 border-t border-[#2563EB]/20 flex items-center justify-between">
                <span className="text-xs font-bold text-white">5G Enabled Only</span>
                <input
                  type="checkbox"
                  checked={is5GOnly}
                  onChange={(e) => setIs5GOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#2563EB] rounded cursor-pointer"
                />
              </div>
            )}

            {/* GPU Filter (Laptops & Gaming) */}
            {(selectedCategory === 'laptops' || selectedCategory === 'gaming' || selectedCategory === 'computers') && (
              <div className="space-y-2 pt-3 border-t border-[#2563EB]/20">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">
                  Dedicated GPU
                </label>
                <div className="space-y-1">
                  {['all', 'RTX 4090', 'RTX 4080', 'Apple GPU'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGpu(g)}
                      className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        selectedGpu === g
                          ? 'bg-[#7C3AED] text-white font-bold'
                          : 'text-[#A7B4C7] hover:bg-[#0D1B2A] hover:text-white'
                      }`}
                    >
                      {g === 'all' ? 'All Graphics Chips' : g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Minimum Rating */}
            <div className="space-y-2 pt-3 border-t border-[#2563EB]/20">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Rating
              </label>
              <div className="flex gap-2">
                {[0, 4.0, 4.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                      minRating === rate
                        ? 'bg-[#F59E0B] text-[#07111F]'
                        : 'bg-[#0D1B2A] text-[#A7B4C7] border border-[#2563EB]/20'
                    }`}
                  >
                    {rate === 0 ? 'All' : `${rate}★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#111F33] border border-[#2563EB]/25 text-xs">
            <span className="font-mono text-[#A7B4C7]">
              Showing <strong className="text-white">{filteredProducts.length}</strong> Devices
            </span>

            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <span className="text-[#A7B4C7]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-[#0D1B2A] border border-[#2563EB]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#06B6D4]"
              >
                <option value="popular">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="discount">Biggest Discount</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-[#111F33] border border-[#2563EB]/20" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#111F33] rounded-3xl border border-[#2563EB]/20 p-8 space-y-3">
              <h3 className="text-lg font-bold text-white">No products match your filter criteria</h3>
              <p className="text-xs text-[#A7B4C7]">Try adjusting your price range, RAM, or storage filters.</p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
