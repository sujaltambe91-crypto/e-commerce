import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useStore } from '../../context/StoreContext.tsx';
import { navigateTo } from '../../lib/router.ts';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Layers,
  Image as ImageIcon,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  User,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  Flame,
  Star,
} from 'lucide-react';

interface AdminLayoutProps {
  currentPath: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, children }) => {
  const { adminUser, logout, isAuthenticated, isLoading } = useAdminAuth();
  const { settings } = useStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Protected route check
  if (!isAuthenticated) {
    navigateTo('/admin/login');
    return null;
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
    { label: 'Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Offers', href: '/admin/offers', icon: Flame },
    { label: 'Reviews', href: '/admin/reviews', icon: Star },
    { label: 'Banners', href: '/admin/banners', icon: ImageIcon },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
    { label: 'Categories', href: '/admin/categories', icon: Layers },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    await logout();
    navigateTo('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-500" />
          <span className="font-display font-bold text-white text-base">
            {settings.brand_name} Admin
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-neutral-400 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900/95 border-r border-neutral-800 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo / Admin Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-base text-white tracking-tight leading-none block">
                  {settings.brand_name}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  Admin Control Panel
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? currentPath === '/admin'
                  : currentPath.startsWith(item.href);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.href);
                    setMobileSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User / Storefront Link */}
        <div className="p-4 border-t border-neutral-800/80 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-300 hover:text-amber-400 transition-colors"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <span className="text-xs font-semibold text-neutral-200 truncate block">
                  {adminUser?.username || 'admin'}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">Authenticated</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-md transition-colors"
              title="Sign Out"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 md:p-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
};
