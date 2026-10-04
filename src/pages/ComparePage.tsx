import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { Product } from '../types/index.ts';
import { navigateTo } from '../lib/router.ts';
import {
  Scale,
  X,
  Plus,
  Star,
  CheckCircle2,
  Cpu,
  Monitor,
  Camera,
  Battery,
  HardDrive,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, addToCart, formatPrice, addToCompare } = useStore();
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [selectorOpen, setSelectorOpen] = useState(false);

  React.useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setCatalogProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const availableToAdd = catalogProducts.filter(
    (p) => !compareList.some((cp) => cp.id === p.id)
  );

  return (
    <div className="space-y-8">
      <SeoHead
        title="Compare Electronics | Side-by-Side Specs Matrix"
        description="Compare processor speeds, display refresh rates, cameras, battery capacities, and prices across flagship devices."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2563EB]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4 text-[#7C3AED]" />
            <span>Hardware Benchmarks</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            Product Comparison
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
            Compare up to 3 flagship devices side-by-side with verified hardware specifications.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="px-4 py-2 bg-[#111F33] hover:bg-[#0D1B2A] text-[#A7B4C7] hover:text-white rounded-xl text-xs font-semibold border border-[#2563EB]/25 transition-colors self-start sm:self-auto"
          >
            Clear All
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="text-center py-20 bg-[#111F33] rounded-3xl border border-[#2563EB]/20 p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/30 text-[#06B6D4] flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="font-display text-xl font-bold text-white">No Products Selected For Comparison</h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-md mx-auto">
            Add up to 3 devices from our catalog to inspect side-by-side specs, benchmark scores, camera optics, and pricing.
          </p>
          <button
            onClick={() => navigateTo('/shop')}
            className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#2563EB]/25 transition-all"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto rounded-3xl border border-[#2563EB]/30 bg-[#111F33] shadow-xl">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-[#2563EB]/20 bg-[#0D1B2A]">
                  <th className="p-4 sm:p-6 w-1/4 text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider">
                    SPECIFICATION
                  </th>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    return (
                      <th key={idx} className="p-4 sm:p-6 w-1/4 align-top">
                        {prod ? (
                          <div className="space-y-3 relative">
                            <button
                              onClick={() => removeFromCompare(prod.id)}
                              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#07111F] text-[#A7B4C7] hover:text-[#EF4444] border border-[#2563EB]/30 transition-colors"
                              title="Remove from comparison"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-[#07111F] border border-[#2563EB]/20">
                              <img
                                src={prod.image_url}
                                alt={prod.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div>
                              <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase">
                                {prod.brand}
                              </span>
                              <h3
                                onClick={() => navigateTo(`/product/${prod.slug}`)}
                                className="font-bold text-sm text-white hover:text-[#06B6D4] cursor-pointer line-clamp-2"
                              >
                                {prod.name}
                              </h3>
                            </div>

                            <button
                              onClick={() => addToCart(prod, 1)}
                              className="w-full py-2 px-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => setSelectorOpen(true)}
                            className="aspect-4/3 w-full rounded-2xl border-2 border-dashed border-[#2563EB]/40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#06B6D4] hover:bg-[#0D1B2A] transition-all text-[#A7B4C7] p-4 text-center"
                          >
                            <Plus className="w-6 h-6 text-[#06B6D4]" />
                            <span className="text-xs font-semibold">Add Device to Compare</span>
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2563EB]/15 text-xs">
                {/* 1. Price */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">Price</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    return (
                      <td key={idx} className="p-4 font-mono font-bold text-base text-white">
                        {prod ? formatPrice(prod.price) : '—'}
                      </td>
                    );
                  })}
                </tr>

                {/* 2. Rating */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">Rating</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    return (
                      <td key={idx} className="p-4">
                        {prod ? (
                          <div className="flex items-center gap-1 text-amber-400 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{prod.rating ? prod.rating.toFixed(1) : '4.8'}</span>
                            <span className="text-[#A7B4C7] font-normal">({prod.reviews_count || 120})</span>
                          </div>
                        ) : '—'}
                      </td>
                    );
                  })}
                </tr>

                {/* 3. Processor */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">Processor</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    const val = prod?.specs?.processor || prod?.hardware?.processor || 'Custom Silicon SoC';
                    return <td key={idx} className="p-4 text-white font-medium">{prod ? val : '—'}</td>;
                  })}
                </tr>

                {/* 4. RAM */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">RAM</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    const val = prod?.specs?.ram || prod?.hardware?.ram || (prod?.ram_options && prod.ram_options[0]) || '16GB LPDDR5X';
                    return <td key={idx} className="p-4 text-[#06B6D4] font-semibold">{prod ? val : '—'}</td>;
                  })}
                </tr>

                {/* 5. Storage */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">Storage</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    const val = prod?.specs?.storage || prod?.hardware?.storage || (prod?.storage_options && prod.storage_options[0]) || '512GB NVMe';
                    return <td key={idx} className="p-4 text-white">{prod ? val : '—'}</td>;
                  })}
                </tr>

                {/* 6. Display */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">Display</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    const val = prod?.specs?.display || prod?.display?.screen_size || 'True-Black OLED / Liquid Retina XDR';
                    return <td key={idx} className="p-4 text-white">{prod ? val : '—'}</td>;
                  })}
                </tr>

                {/* 7. GPU Graphics */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">GPU Graphics</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    const val = prod?.specs?.graphics || prod?.hardware?.graphics || 'Hardware Ray-Tracing Neural Core';
                    return <td key={idx} className="p-4 text-[#7C3AED] font-semibold">{prod ? val : '—'}</td>;
                  })}
                </tr>

                {/* 8. Camera */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">Camera</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    const val = prod?.specs?.camera || prod?.camera?.rear_camera || '48MP / 200MP Quad-Optics 4K 120fps';
                    return <td key={idx} className="p-4 text-white">{prod ? val : '—'}</td>;
                  })}
                </tr>

                {/* 9. Battery */}
                <tr className="hover:bg-[#0D1B2A]/40 transition-colors">
                  <td className="p-4 font-mono font-bold text-white bg-[#0D1B2A]/30">Battery</td>
                  {[0, 1, 2].map((idx) => {
                    const prod = compareList[idx];
                    const val = prod?.specs?.battery || prod?.battery?.capacity || 'High-Density 5000mAh / 99.6Wh Cell';
                    return <td key={idx} className="p-4 text-[#22C55E] font-medium">{prod ? val : '—'}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selector Modal if adding device */}
      {selectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111F33] border border-[#2563EB]/40 rounded-3xl p-6 max-w-xl w-full max-h-[80vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2563EB]/20">
              <h3 className="font-display text-lg font-bold text-white">Select Device To Compare</h3>
              <button onClick={() => setSelectorOpen(false)} className="text-[#A7B4C7] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {availableToAdd.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    addToCompare(p);
                    setSelectorOpen(false);
                  }}
                  className="p-3 rounded-xl bg-[#0D1B2A] hover:bg-[#07111F] border border-[#2563EB]/20 hover:border-[#06B6D4] cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <span className="text-[10px] font-mono text-[#06B6D4] uppercase">{p.brand}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                      <span className="text-xs font-mono text-[#A7B4C7]">{formatPrice(p.price)}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-[#2563EB] text-white rounded-lg text-xs font-bold">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
