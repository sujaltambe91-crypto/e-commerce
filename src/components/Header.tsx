import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Shield,
  Menu,
  X,
  ArrowRight,
  Flame,
  Zap,
  Sparkles,
  Layers,
  ChevronDown,
  Scale,
  Smartphone,
  Laptop,
  Tv,
  Gamepad2,
  Headphones,
  Camera,
  Watch,
  Plug,
  Home as HomeIcon,
  Monitor,
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const { settings, cart, wishlist, compareList, setIsCartOpen, categories } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const compareCount = compareList.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigateTo(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories', hasDropdown: true },
    { label: 'Products', href: '/shop' },
    { label: 'Deals', href: '/deals', badge: 'SALE', badgeColor: 'bg-[#EF4444]' },
    { label: 'New Arrivals', href: '/new-arrivals' },
  ];

  return (
    <>
      {/* Top Notification Strip */}
      <div className="bg-gradient-to-r from-[#0D1B2A] via-[#111F33] to-[#0D1B2A] text-[#A7B4C7] text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-[#2563EB]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Flame className="w-3.5 h-3.5 text-[#EF4444] animate-pulse" />
              <span className="text-[#EF4444] font-bold">FLASH SALE LIVE:</span>
              <span>Extra 15% off with code <code className="bg-[#2563EB]/20 text-[#06B6D4] px-1.5 py-0.5 rounded font-mono font-bold">ELECTRO15</code></span>
            </span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-300">Free Express Delivery & Genuine Brand Warranty</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/order-tracking"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/order-tracking');
              }}
              className="text-[#A7B4C7] hover:text-[#06B6D4] transition-colors"
            >
              Track Order
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href="/support"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/support');
              }}
              className="text-[#A7B4C7] hover:text-[#06B6D4] transition-colors"
            >
              24/7 Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Header (Deep Navy Background) */}
      <header className="sticky top-0 z-40 w-full bg-[#07111F]/95 backdrop-blur-md border-b border-[#2563EB]/20 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white shadow-lg shadow-[#2563EB]/30 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1 leading-none">
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#06B6D4] transition-colors">
                  {settings.brand_name || 'ElectroPulse'}
                </span>
                <span className="text-xs font-mono font-bold text-[#06B6D4]">3D</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-[#A7B4C7] tracking-widest block uppercase">
                Next-Gen Electronics
              </span>
            </div>
          </a>

          {/* Navigation Links: Active -> Electric Blue (#2563EB), Hover -> Cyan (#06B6D4) / Purple (#7C3AED) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.href.split('?')[0]);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setCategoriesDropdownOpen(true)}
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(link.href);
                      }}
                      className={`relative py-2 flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? 'text-[#2563EB] font-bold'
                          : 'text-[#A7B4C7] hover:text-[#06B6D4]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </a>

                    {/* Categories Mega-Menu */}
                    {categoriesDropdownOpen && (
                      <div className="absolute top-full -left-20 w-[840px] max-w-[95vw] bg-[#111F33] border border-[#2563EB]/40 rounded-3xl shadow-2xl p-6 grid grid-cols-4 gap-6 animate-in fade-in-50 zoom-in-95 z-50">
                        {/* Col 1: Smartphones & Wearables */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Smartphone className="w-4 h-4" />
                              <span>Smartphones</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['iPhone', 'Samsung Galaxy', 'OnePlus', 'Google Pixel', 'Xiaomi', 'Motorola', 'Realme', 'Nothing Phone'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/smartphones?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/smartphones?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Watch className="w-4 h-4" />
                              <span>Wearables</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['Smartwatch', 'Fitness Band', 'Smart Rings'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/wearables?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/wearables?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Col 2: Computing & Monitors */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Laptop className="w-4 h-4" />
                              <span>Computing</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['Laptops', 'Gaming Laptops', 'MacBook', 'Desktop PC', 'Gaming PC', 'All-in-One PC', 'Mini PC', 'Workstation'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/computing?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/computing?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Monitor className="w-4 h-4" />
                              <span>Monitors</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['Office Monitor', 'Gaming Monitor', '4K Monitor', 'Ultrawide Monitor', 'Curved Monitor'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/monitors?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/monitors?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Col 3: TV & Entertainment, Gaming */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#EF4444] uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Tv className="w-4 h-4" />
                              <span>TV & Entertainment</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['LED TV', 'OLED TV', 'QLED TV', '4K Smart TV', '8K TV', 'Projector', 'Streaming Devices'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/tvs?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/tvs?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Gamepad2 className="w-4 h-4" />
                              <span>Gaming</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['Gaming Console', 'Gaming Controller', 'Gaming Keyboard', 'Gaming Mouse', 'Gaming Headset', 'Gaming Chair', 'VR Headset'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/gaming?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/gaming?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Col 4: Audio, Cameras, Smart Home & Accessories */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-[#22C55E] uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Headphones className="w-4 h-4" />
                              <span>Audio</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['TWS Earbuds', 'Wireless Headphones', 'Wired Headphones', 'Bluetooth Speakers', 'Soundbars', 'Home Theatre'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/audio?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/audio?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider pb-1.5 border-b border-[#2563EB]/20 mb-2">
                              <Camera className="w-4 h-4" />
                              <span>Cameras & Smart Home</span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {['Mirrorless Camera', 'Action Camera', 'Power Bank', 'Smart Speaker', 'Smart Bulb', 'Laptop Bag'].map((sub) => (
                                <li key={sub}>
                                  <a
                                    href={`/shop?search=${encodeURIComponent(sub)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigateTo(`/shop?search=${encodeURIComponent(sub)}`);
                                      setCategoriesDropdownOpen(false);
                                    }}
                                    className="text-[#A7B4C7] hover:text-white hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-[#2563EB]/20">
                            <a
                              href="/categories"
                              onClick={(e) => {
                                e.preventDefault();
                                navigateTo('/categories');
                                setCategoriesDropdownOpen(false);
                              }}
                              className="px-3 py-2 rounded-xl bg-[#2563EB]/20 hover:bg-[#2563EB] text-white text-xs font-bold flex items-center justify-between transition-colors"
                            >
                              <span>Explore All Categories</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.href);
                  }}
                  className={`relative py-1 transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#2563EB] font-bold'
                      : 'text-[#A7B4C7] hover:text-[#06B6D4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded text-white ${link.badgeColor}`}
                    >
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full shadow-[0_0_8px_#2563EB]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Icons: Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#A7B4C7] hover:text-[#06B6D4] hover:bg-[#111F33] rounded-xl transition-colors"
              aria-label="Search"
              title="Search electronics"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <a
              href="/wishlist"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/wishlist');
              }}
              className="relative p-2 text-[#A7B4C7] hover:text-[#7C3AED] hover:bg-[#111F33] rounded-xl transition-colors flex items-center"
              aria-label="Wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7C3AED] text-white font-bold text-[10px] flex items-center justify-center rounded-full shadow-md font-mono">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Compare */}
            <a
              href="/compare"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/compare');
              }}
              className="relative p-2 text-[#A7B4C7] hover:text-[#06B6D4] hover:bg-[#111F33] rounded-xl transition-colors flex items-center"
              aria-label="Compare Products"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#06B6D4] text-neutral-950 font-bold text-[10px] flex items-center justify-center rounded-full shadow-md font-mono">
                  {compareCount}
                </span>
              )}
            </a>

            {/* User Account */}
            <a
              href="/account"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/account');
              }}
              className="p-2 text-[#A7B4C7] hover:text-[#06B6D4] hover:bg-[#111F33] rounded-xl transition-colors"
              aria-label="User Account"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </a>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#A7B4C7] hover:text-[#2563EB] hover:bg-[#111F33] rounded-xl transition-colors flex items-center"
              aria-label="Shopping Cart"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#2563EB]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-[10px] flex items-center justify-center rounded-full shadow-md font-mono">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Portal Shortcut */}
            <a
              href="/admin/login"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/admin/login');
              }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#A7B4C7] hover:text-white hover:bg-[#111F33] rounded-xl border border-[#2563EB]/30 transition-colors"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Admin</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#A7B4C7] hover:text-white hover:bg-[#111F33] rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-t border-[#2563EB]/20 bg-[#0D1B2A] animate-in fade-in-50 slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#06B6D4]" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search smartphones, gaming laptops, 4K OLED TVs, processors, audio..."
                autoFocus
                className="w-full pl-12 pr-28 py-3 bg-[#111F33] border border-[#2563EB]/40 rounded-2xl text-sm text-white placeholder-[#A7B4C7] focus:outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D1B2A] border-t border-[#2563EB]/20 p-4 space-y-3 animate-in fade-in-50">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#06B6D4]" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#111F33] border border-[#2563EB]/30 rounded-xl text-xs text-white placeholder-[#A7B4C7] focus:outline-none focus:border-[#06B6D4]"
              />
            </form>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    currentPath === link.href
                      ? 'bg-[#2563EB]/20 text-[#2563EB] font-bold'
                      : 'text-[#A7B4C7] hover:bg-[#111F33] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white bg-[#EF4444]">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}

              <div className="pt-2 border-t border-[#2563EB]/20 space-y-1">
                <a
                  href="/compare"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/compare');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs text-[#A7B4C7] hover:text-white flex items-center justify-between"
                >
                  <span>Compare Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#06B6D4]" />
                </a>
                <a
                  href="/wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/wishlist');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs text-[#A7B4C7] hover:text-white flex items-center justify-between"
                >
                  <span>Wishlist ({wishlistCount})</span>
                  <Heart className="w-3.5 h-3.5 text-[#7C3AED]" />
                </a>
                <a
                  href="/account"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/account');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs text-[#A7B4C7] hover:text-white flex items-center justify-between"
                >
                  <span>My Account</span>
                  <User className="w-3.5 h-3.5 text-[#2563EB]" />
                </a>
                <a
                  href="/admin/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/admin/login');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs text-[#06B6D4] hover:text-white flex items-center justify-between font-semibold"
                >
                  <span>Admin Portal</span>
                  <Shield className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
