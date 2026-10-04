import React, { useState, useEffect, useMemo } from 'react';
import { AnalyticsSummary } from '../../types/index.ts';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import {
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Calendar,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Clock,
  Layers,
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const { authFetch } = useAdminAuth();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  // Table filters
  const [searchFilter, setSearchFilter] = useState('');
  const [sortKey, setSortKey] = useState<'clicks' | 'name' | 'last_clicked'>('clicks');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/analytics');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Filtered and sorted product analytics table
  const tableProducts = useMemo(() => {
    if (!data?.topProducts) return [];
    let list = [...data.topProducts];

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category_name.toLowerCase().includes(q));
    }

    list.sort((a, b) => {
      let result = 0;
      if (sortKey === 'clicks') {
        result = b.click_count - a.click_count;
      } else if (sortKey === 'name') {
        result = a.name.localeCompare(b.name);
      } else if (sortKey === 'last_clicked') {
        const timeA = a.last_clicked ? new Date(a.last_clicked).getTime() : 0;
        const timeB = b.last_clicked ? new Date(b.last_clicked).getTime() : 0;
        result = timeB - timeA;
      }
      return sortOrder === 'desc' ? result : -result;
    });

    return list;
  }, [data, searchFilter, sortKey, sortOrder]);

  const toggleSort = (key: 'clicks' | 'name' | 'last_clicked') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  if (loading || !data) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-64 bg-neutral-900 rounded" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-neutral-900 rounded-2xl" />
          ))}
        </div>
        <div className="h-64 bg-neutral-900 rounded-2xl" />
      </div>
    );
  }

  // Calculate SVG line chart coordinates for clicksByDate (last 14 days)
  const chartPoints = data.clicksByDate || [];
  const maxClicks = Math.max(...chartPoints.map((p) => p.clicks), 5);
  const chartHeight = 160;
  const chartWidth = 700;

  const pointsSvg = chartPoints.map((pt, i) => {
    const x = chartPoints.length > 1 ? (i / (chartPoints.length - 1)) * (chartWidth - 40) + 20 : 20;
    const y = chartHeight - 20 - (pt.clicks / maxClicks) * (chartHeight - 40);
    return { x, y, pt };
  });

  const polylineStr = pointsSvg.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6">
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">
          Affiliate Analytics & Click Tracking
        </h1>
        <p className="mt-1 text-xs text-neutral-400">
          Real-time tracking of partner clicks, conversion velocity, and item performance.
        </p>
      </div>

      {/* Top Velocity Cards (Total, Today, Yesterday, This Week, This Month) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-400 block">Total Clicks</span>
          <span className="text-2xl sm:text-3xl font-bold text-white font-mono mt-1 block">
            {data.totalClicks}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">Lifetime total</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-400 block">Today's Clicks</span>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono mt-1 block">
            {data.todayClicks}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">Since 00:00 local</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-400 block">Yesterday</span>
          <span className="text-2xl sm:text-3xl font-bold text-neutral-200 font-mono mt-1 block">
            {data.yesterdayClicks}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">Previous 24 hours</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
          <span className="text-xs font-semibold text-neutral-400 block">This Week</span>
          <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono mt-1 block">
            {data.thisWeekClicks}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">Last 7 days</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 col-span-2 sm:col-span-1">
          <span className="text-xs font-semibold text-neutral-400 block">This Month</span>
          <span className="text-2xl sm:text-3xl font-bold text-purple-400 font-mono mt-1 block">
            {data.thisMonthClicks}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">Last 30 days</span>
        </div>
      </div>

      {/* Visual Charts: Clicks Over Time (Line) + Top Products (Bar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Line Chart (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Clicks Over Time (Last 14 Days)</span>
            </h3>
            <span className="text-[11px] text-neutral-500 font-mono">Peak: {maxClicks} clicks/day</span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
            >
              {/* Horizontal Grid Lines */}
              <line x1="20" y1="20" x2={chartWidth - 20} y2="20" stroke="#262626" strokeDasharray="3 3" />
              <line x1="20" y1={chartHeight / 2} x2={chartWidth - 20} y2={chartHeight / 2} stroke="#262626" strokeDasharray="3 3" />
              <line x1="20" y1={chartHeight - 20} x2={chartWidth - 20} y2={chartHeight - 20} stroke="#404040" />

              {/* Area gradient under line */}
              <defs>
                <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {pointsSvg.length > 1 && (
                <polygon
                  points={`20,${chartHeight - 20} ${polylineStr} ${chartWidth - 20},${chartHeight - 20}`}
                  fill="url(#clickGrad)"
                />
              )}

              {/* Trendline */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                points={polylineStr}
              />

              {/* Data points */}
              {pointsSvg.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#171717"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <text
                    x={p.x}
                    y={chartHeight - 4}
                    textAnchor="middle"
                    fill="#737373"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {p.pt.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Top Products Bar Chart (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Top Affiliate Performers</span>
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {data.topProducts.slice(0, 5).map((prod) => {
              const maxProdClicks = Math.max(...data.topProducts.map((p) => p.click_count), 1);
              const pct = Math.round((prod.click_count / maxProdClicks) * 100);

              return (
                <div key={prod.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-300 truncate max-w-[200px]">
                      {prod.name}
                    </span>
                    <span className="font-mono font-bold text-white text-[11px]">
                      {prod.click_count}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analytics Product Table with Filter & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Product Click Performance Table
            </h3>
            <p className="text-xs text-neutral-400">
              Detailed breakdown of affiliate link hits and last recorded interactions.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search in table..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th
                    onClick={() => toggleSort('name')}
                    className="py-3 px-4 cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Product</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4">Category</th>
                  <th
                    onClick={() => toggleSort('clicks')}
                    className="py-3 px-4 text-center cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Total Clicks</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => toggleSort('last_clicked')}
                    className="py-3 px-4 text-right cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Last Clicked</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {tableProducts.map((p) => {
                  const lastClickedStr = p.last_clicked
                    ? new Date(p.last_clicked).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'No clicks yet';

                  return (
                    <tr key={p.id} className="hover:bg-neutral-800/40 transition-colors">
                      <td className="py-3 px-4 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image_url}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-semibold text-neutral-200 block truncate">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              /{p.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-neutral-300 font-medium">
                        {p.category_name}
                      </td>

                      <td className="py-3 px-4 text-center font-mono font-bold text-amber-400 text-sm">
                        {p.click_count}
                      </td>

                      <td className="py-3 px-4 text-right text-neutral-400 font-mono text-[11px]">
                        {lastClickedStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
