import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { Order } from '../../types/index.ts';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Trash2,
  ChevronDown,
  Eye,
  AlertCircle,
  Package,
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { formatPrice, showToast } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await authFetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order['order_status']) => {
    try {
      const res = await authFetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, order_status: newStatus } : null));
        }
        showToast(`Order status updated to ${newStatus}`, 'success');
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await authFetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        if (selectedOrder?.id === orderId) setSelectedOrder(null);
        showToast('Order removed', 'success');
      }
    } catch {
      showToast('Failed to delete order', 'error');
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (st: Order['order_status']) => {
    switch (st) {
      case 'placed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Placed</span>;
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Confirmed</span>;
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">Processing</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Shipped</span>;
      case 'out_for_delivery':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Out for Delivery</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Delivered</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-800 text-neutral-300">{st}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="font-display text-2xl font-black text-white">Orders Management</h1>
          <p className="text-xs text-neutral-400">
            Track customer orders, manage fulfillment stages, and monitor payments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">
            Total Orders: {orders.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID, customer name, email..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-neutral-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Order Statuses</option>
            <option value="placed">Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500 animate-pulse">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-2">
          <Package className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No orders match the filter</h3>
          <p className="text-xs text-neutral-500">Try changing your search terms or filter selection.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {o.order_number}
                    <span className="block text-[10px] text-neutral-500 font-normal">
                      {new Date(o.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-white block">{o.customer_name}</span>
                    <span className="text-[11px] text-neutral-400 block">{o.customer_email}</span>
                    <span className="text-[10px] text-neutral-500">{o.shipping_address?.city}, {o.shipping_address?.pincode}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white">{o.items.length} item(s)</span>
                    <span className="block text-[10px] text-neutral-400 truncate max-w-44">
                      {o.items[0]?.product_name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {formatPrice(o.grand_total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="uppercase font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold block w-fit mb-1">
                      {o.payment_method}
                    </span>
                    <span className={`text-[10px] font-bold ${o.payment_status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {o.payment_status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(o.order_status)}
                      <select
                        value={o.order_status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value as any)}
                        className="bg-neutral-950 border border-neutral-700 text-neutral-300 text-[11px] rounded px-1.5 py-0.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(o.id)}
                        className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400"
                        title="Delete Order"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Order Overview</span>
                <h3 className="font-mono text-lg font-black text-white">{selectedOrder.order_number}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-neutral-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-neutral-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Customer</span>
                  <span className="font-bold text-white">{selectedOrder.customer_name}</span>
                  <span className="text-neutral-400 block">{selectedOrder.customer_email}</span>
                  <span className="text-neutral-400">{selectedOrder.customer_phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Delivery Address</span>
                  <span className="text-neutral-300 block">{selectedOrder.shipping_address?.street}</span>
                  <span className="text-neutral-300 block">
                    {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state} {selectedOrder.shipping_address?.pincode}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-white uppercase block mb-2">Purchased Devices</span>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/60">
                      <div className="flex items-center gap-3">
                        {item.product_image && (
                          <img src={item.product_image} alt="" className="w-10 h-10 object-cover rounded-lg bg-neutral-900" />
                        )}
                        <div>
                          <span className="font-bold text-white block">{item.product_name}</span>
                          <span className="text-[10px] text-neutral-400">
                            {item.selected_color || ''} {item.selected_ram ? `• ${item.selected_ram}` : ''} {item.selected_storage ? `• ${item.selected_storage}` : ''}
                          </span>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <span className="text-neutral-400 block">Qty: {item.quantity}</span>
                        <span className="font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5 font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal:</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span>-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery Charges:</span>
                  <span>{selectedOrder.delivery_fee === 0 ? 'FREE' : formatPrice(selectedOrder.delivery_fee)}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-neutral-800 text-sm">
                  <span>Grand Total:</span>
                  <span className="text-amber-400">{formatPrice(selectedOrder.grand_total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
