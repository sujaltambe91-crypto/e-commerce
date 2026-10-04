import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { navigateTo } from '../../lib/router.ts';
import {
  Package,
  MousePointerClick,
  Calendar,
  Layers,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  Plus,
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  allProductsCount: number;
  featuredCount: number;
  totalClicks: number;
  todayClicks: number;
  yesterdayClicks: number;
  categoriesCount: number;
  unreadMessagesCount: number;
  topProducts: Array<{
    id: string;
    name: string;
    slug: string;
    image_url: string;
    category_name: string;
    click_count: number;
  }>;
  recentClicks: Array<{
    id: string;
    product_name: string;
    product_slug: string;
    clicked_at: string;
    referrer?: string;
  }>;
}

export const AdminDashboard: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await authFetch('/api/admin/dashboard-stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-64 bg-neutral-900 rounded-lg" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-neutral-900 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Active Products',
      value: stats?.totalProducts || 0,
      subtext: `Out of ${stats?.allProductsCount || 0} total in catalog`,
      icon: Package,
      link: '/admin/products',
      color: 'text-amber-400',
    },
    {
      label: 'Total Affiliate Clicks',
      value: stats?.totalClicks || 0,
      subtext: 'Lifetime partner link hits',
      icon: MousePointerClick,
      link: '/admin/analytics',
      color: 'text-emerald-400',
    },
    {
      label: "Today's Clicks",
      value: stats?.todayClicks || 0,
      subtext: `Yesterday: ${stats?.yesterdayClicks || 0} clicks`,
      icon: Calendar,
      link: '/admin/analytics',
      color: 'text-blue-400',
    },
    {
      label: 'Categories',
      value: stats?.categoriesCount || 0,
      subtext: 'Active store departments',
      icon: Layers,
      link: '/admin/categories',
      color: 'text-purple-400',
    },
    {
      label: 'Unread Messages',
      value: stats?.unreadMessagesCount || 0,
      subtext: 'Customer inquiries awaiting review',
      icon: MessageSquare,
      link: '/admin/messages',
      color: stats?.unreadMessagesCount ? 'text-rose-400' : 'text-neutral-400',
    },
    {
      label: 'Featured Products',
      value: stats?.featuredCount || 0,
      subtext: 'Highlighted on storefront',
      icon: Sparkles,
      link: '/admin/products',
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Real-time affiliate performance, product catalog metrics, and customer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('/admin/products/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* 6 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              onClick={() => navigateTo(card.link)}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-neutral-400">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl bg-neutral-800/80 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {card.value}
                </span>
                <p className="mt-1 text-[11px] text-neutral-500">
                  {card.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Performing Products & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Clicked Products (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Top Clicked Products</span>
            </h3>
            <button
              onClick={() => navigateTo('/admin/analytics')}
              className="text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>View Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden divide-y divide-neutral-800/60">
            {stats?.topProducts && stats.topProducts.length > 0 ? (
              stats.topProducts.map((prod, idx) => (
                <div key={prod.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-neutral-800/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 text-xs font-mono font-bold text-neutral-500 text-center">
                      #{idx + 1}
                    </span>
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-neutral-200 truncate">
                        {prod.name}
                      </h4>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {prod.category_name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-white font-mono block">
                        {prod.click_count} clicks
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">Affiliate Tracked</span>
                    </div>
                    <button
                      onClick={() => navigateTo(`/admin/products/edit/${prod.id}`)}
                      className="p-1.5 text-neutral-400 hover:text-white rounded-md transition-colors"
                      title="Edit Product"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-neutral-500">
                No product clicks recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Live Click Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-emerald-400" />
              <span>Recent Partner Clicks</span>
            </h3>
            <span className="text-[11px] text-neutral-400 font-mono">Live feed</span>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4 space-y-3">
            {stats?.recentClicks && stats.recentClicks.length > 0 ? (
              stats.recentClicks.map((click) => {
                const date = new Date(click.clicked_at);
                const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

                return (
                  <div
                    key={click.id}
                    className="p-2.5 rounded-xl bg-neutral-950/40 border border-neutral-800/60 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-neutral-200 truncate block">
                        {click.product_name}
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        {click.referrer || 'Direct'}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-[11px] text-neutral-400 block">{timeStr}</span>
                      <span className="text-[10px] text-neutral-600 font-mono">{dateStr}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-neutral-500">
                No recent clicks recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
