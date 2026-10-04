import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types/index.ts';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { navigateTo } from '../../lib/router.ts';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { categories, formatPrice, showToast } = useStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [deleteModalProduct, setDeleteModalProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleStatus = async (product: Product) => {
    const nextStatus = product.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await authFetch(`/api/admin/products/${product.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, status: nextStatus } : p))
        );
        showToast(`Product set to ${nextStatus}`);
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDuplicate = async (product: Product) => {
    try {
      const res = await authFetch(`/api/admin/products/${product.id}/duplicate`, {
        method: 'POST',
      });
      if (res.ok) {
        const dup = await res.json();
        setProducts((prev) => [dup, ...prev]);
        showToast(`Duplicated "${product.name}"`);
      }
    } catch {
      showToast('Failed to duplicate product', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteModalProduct) return;
    setDeleting(true);
    try {
      const res = await authFetch(`/api/admin/products/${deleteModalProduct.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteModalProduct.id));
        showToast('Product deleted from database');
        setDeleteModalProduct(null);
      } else {
        showToast('Could not delete product', 'error');
      }
    } catch {
      showToast('Network error while deleting', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== 'all' && p.category_id !== selectedCat && p.category_slug !== selectedCat) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.short_description.toLowerCase().includes(q) ||
        (p.category_name && p.category_name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Product Management
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Add, update, duplicate, toggle availability, and monitor affiliate click counts.
          </p>
        </div>

        <button
          onClick={() => navigateTo('/admin/products/new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500/60 w-full sm:w-auto font-medium"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / Discount</th>
                <th className="py-3 px-4 text-center">Clicks</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Added</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    Loading catalog...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-800/40 transition-colors">
                    {/* Item */}
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image_url}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover bg-neutral-950 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-neutral-200 line-clamp-1">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-500 font-mono">
                            <span>/{p.slug}</span>
                            {p.featured && (
                              <span className="text-amber-400 font-sans font-bold flex items-center gap-0.5 text-[10px]">
                                <Sparkles className="w-3 h-3" /> Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-neutral-300 font-medium">
                      {p.category_name}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-white">
                        {formatPrice(p.price)}
                      </div>
                      {p.discount_percentage ? (
                        <span className="text-[10px] text-emerald-400 font-sans font-bold">
                          {p.discount_percentage}% OFF
                        </span>
                      ) : null}
                    </td>

                    {/* Clicks */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-400">
                      {p.click_count || 0}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          p.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 border border-neutral-700'
                        }`}
                        title="Click to toggle active status"
                      >
                        {p.status}
                      </button>
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-neutral-400 font-mono text-[11px]">
                      {new Date(p.created_at).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => window.open(`/product/${p.slug}`, '_blank')}
                          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                          title="View on Storefront"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => navigateTo(`/admin/products/edit/${p.id}`)}
                          className="p-1.5 text-neutral-400 hover:text-amber-400 rounded-lg hover:bg-neutral-800 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-1.5 text-neutral-400 hover:text-blue-400 rounded-lg hover:bg-neutral-800 transition-colors"
                          title="Duplicate Product"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteModalProduct(p)}
                          className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Delete Product</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-neutral-200">"{deleteModalProduct.name}"</strong>?
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
