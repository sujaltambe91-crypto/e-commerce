import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import {
  Boxes,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  Save,
  RotateCw,
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category_name: string;
  price: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  stock_quantity: number;
  image_url: string;
}

export const AdminInventory: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { formatPrice, showToast } = useStore();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchInventory = async () => {
    try {
      const res = await authFetch('/api/admin/inventory');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleQuantityChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.stock_quantity + delta);
          let newStatus = item.stock_status;
          if (newQty === 0) newStatus = 'out_of_stock';
          else if (newQty < 10) newStatus = 'low_stock';
          else newStatus = 'in_stock';
          return { ...item, stock_quantity: newQty, stock_status: newStatus };
        }
        return item;
      })
    );
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          let newQty = item.stock_quantity;
          if (newStatus === 'out_of_stock') newQty = 0;
          else if (newStatus === 'low_stock' && newQty >= 10) newQty = 5;
          else if (newStatus === 'in_stock' && newQty === 0) newQty = 25;
          return { ...item, stock_status: newStatus, stock_quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleSaveItem = async (item: InventoryItem) => {
    setSavingId(item.id);
    try {
      const res = await authFetch(`/api/admin/inventory/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stock_status: item.stock_status,
          stock_quantity: item.stock_quantity,
        }),
      });
      if (res.ok) {
        showToast(`Stock updated for ${item.name}`, 'success');
      } else {
        showToast('Failed to save stock update', 'error');
      }
    } catch {
      showToast('Error saving stock', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.stock_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const lowStockCount = items.filter((i) => i.stock_status === 'low_stock').length;
  const outOfStockCount = items.filter((i) => i.stock_status === 'out_of_stock').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="font-display text-2xl font-black text-white">Live Inventory Control</h1>
          <p className="text-xs text-neutral-400">
            Monitor warehouse SKU quantities, adjust hardware availability, and resolve low-stock flags.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {lowStockCount > 0 && (
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{lowStockCount} Low Stock</span>
            </span>
          )}
          {outOfStockCount > 0 && (
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" />
              <span>{outOfStockCount} Out of Stock</span>
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products or brands..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Inventory States</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock (&lt;10 Units)</option>
            <option value="out_of_stock">Out of Stock (0 Units)</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500 animate-pulse">Loading inventory...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-2">
          <Boxes className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No products found</h3>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Product Hardware</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Retail Price</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Available Qty</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-neutral-950 border border-neutral-800"
                      />
                      <div>
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[10px] text-amber-400 font-mono uppercase font-bold">
                          {item.brand}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-neutral-400">
                    {item.category_name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {formatPrice(item.price)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={item.stock_status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        item.stock_status === 'out_of_stock'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : item.stock_status === 'low_stock'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="low_stock">Low Stock</option>
                      <option value="out_of_stock">Out of Stock</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center font-mono font-bold text-white">
                        {item.stock_quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleSaveItem(item)}
                      disabled={savingId === item.id}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow inline-flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {savingId === item.id ? (
                        <RotateCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Save className="w-3 h-3" />
                      )}
                      <span>Save</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
