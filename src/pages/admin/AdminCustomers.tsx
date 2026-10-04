import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { Customer } from '../../types/index.ts';
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Award,
  Calendar,
} from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const { formatPrice } = useStore();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await authFetch('/api/admin/customers');
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="font-display text-2xl font-black text-white">Customers Directory</h1>
          <p className="text-xs text-neutral-400">
            View registered tech buyers, purchase histories, and total lifetime order values.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold">
            Total Customers: {customers.length}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, city..."
          className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Customers Table */}
      {loading ? (
        <div className="p-8 text-center text-neutral-500 animate-pulse">Loading customers...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-2">
          <Users className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No customers found</h3>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Member Tier</th>
                <th className="py-3 px-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-neutral-950 font-black text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{c.name}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">{c.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <Mail className="w-3 h-3 text-neutral-500" />
                      <span>{c.email}</span>
                    </div>
                    {c.phone && (
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
                        <Phone className="w-3 h-3 text-neutral-600" />
                        <span>{c.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{c.city}</span>
                      {c.state && <span className="text-neutral-500">, {c.state}</span>}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      <span>{c.total_orders} Orders</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {formatPrice(c.total_spent)}
                  </td>
                  <td className="py-3.5 px-4">
                    {c.status === 'vip' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 inline-flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>VIP TITANIUM</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 text-neutral-400">
                        ACTIVE
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 font-mono text-[11px]">
                    {new Date(c.last_order_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
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
