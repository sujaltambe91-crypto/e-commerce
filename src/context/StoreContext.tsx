import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Category, Product, SiteSettings, Coupon, Order } from '../types/index.ts';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  settings: SiteSettings;
  categories: Category[];
  cart: CartItem[];
  wishlist: Product[];
  compareList: Product[];
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  addToCart: (
    product: Product,
    quantity?: number,
    color?: string,
    ram?: string,
    storage?: string,
    size?: string,
    model?: string
  ) => void;
  removeFromCart: (
    productId: string,
    color?: string,
    ram?: string,
    storage?: string,
    size?: string,
    model?: string
  ) => void;
  updateCartQuantity: (
    productId: string,
    quantity: number,
    color?: string,
    ram?: string,
    storage?: string,
    size?: string,
    model?: string
  ) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  trackAndRedirect: (product: Product) => Promise<void>;
  refreshSettings: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  formatPrice: (amount?: number) => string;
}

const defaultSettings: SiteSettings = {
  id: 'site-settings-1',
  brand_name: 'ElectroPulse 3D',
  logo_url: '',
  favicon_url: '',
  website_description: 'Premier Electronics E-Commerce Store & 3D Interactive Technology Platform.',
  contact_email: 'support@electropulse.store',
  contact_phone: '+91 6355776735',
  social_links: {},
  footer_text: '© 2026 ElectroPulse Inc. All rights reserved.',
  seo_title: 'ElectroPulse 3D | Next-Gen Electronics & 3D Tech Hub',
  seo_description: 'Shop smartphones, laptops, 4K OLED TVs, monitors, and gaming gear with 3D product previews.',
  amazon_affiliate_tag: 'electropulse-21',
  currency: '₹',
  updated_at: new Date().toISOString(),
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'electropulse_cart_v2';
const WISHLIST_STORAGE_KEY = 'electropulse_wishlist_v2';
const COMPARE_STORAGE_KEY = 'electropulse_compare_v2';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [compareList, setCompareList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(COMPARE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareList));
    } catch (e) {
      console.error('Failed to save compare list', e);
    }
  }, [compareList]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn('Could not fetch settings', err);
    }
  };

  const refreshCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.warn('Could not fetch categories', err);
    }
  };

  useEffect(() => {
    refreshSettings();
    refreshCategories();
  }, []);

  // Cart operations with variant support
  const addToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    ram?: string,
    storage?: string,
    size?: string,
    model?: string
  ) => {
    const selected_color = color || product.color_options?.[0];
    const selected_ram = ram || product.ram_options?.[0];
    const selected_storage = storage || product.storage_options?.[0];
    const selected_size = size || product.size_options?.[0];
    const selected_model = model || product.model_options?.[0];

    setCart((prev) => {
      const matchIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selected_color === selected_color &&
          item.selected_ram === selected_ram &&
          item.selected_storage === selected_storage &&
          item.selected_size === selected_size &&
          item.selected_model === selected_model
      );

      if (matchIndex > -1) {
        const updated = [...prev];
        updated[matchIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selected_color,
          selected_ram,
          selected_storage,
          selected_size,
          selected_model,
          added_at: new Date().toISOString(),
        },
      ];
    });

    showToast(`Added ${product.name.slice(0, 24)}... to your cart!`);
  };

  const removeFromCart = (
    productId: string,
    color?: string,
    ram?: string,
    storage?: string,
    size?: string,
    model?: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selected_color === color &&
            item.selected_ram === ram &&
            item.selected_storage === storage &&
            item.selected_size === size &&
            item.selected_model === model
          )
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
    color?: string,
    ram?: string,
    storage?: string,
    size?: string,
    model?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, ram, storage, size, model);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selected_color === color &&
        item.selected_ram === ram &&
        item.selected_storage === storage &&
        item.selected_size === size &&
        item.selected_model === model
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Cart cleared', 'info');
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist: ${product.name.slice(0, 24)}...`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Added to wishlist: ${product.name.slice(0, 24)}...`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Compare List (max 3 items)
  const addToCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      showToast('Product already added to comparison', 'info');
      setIsCompareOpen(true);
      return;
    }
    if (compareList.length >= 3) {
      showToast('You can compare at most 3 products at a time.', 'error');
      setIsCompareOpen(true);
      return;
    }
    setCompareList((prev) => [...prev, product]);
    showToast(`Added ${product.name.slice(0, 20)} to comparison`);
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison list cleared', 'info');
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  // Coupon handling
  const applyCoupon = async (code: string) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.valid && data.coupon) {
        setAppliedCoupon(data.coupon);
        setCouponDiscount(data.discount);
        showToast(data.message, 'success');
        return { success: true, message: data.message };
      } else {
        showToast(data.message || 'Invalid coupon', 'error');
        return { success: false, message: data.message };
      }
    } catch {
      showToast('Error validating coupon', 'error');
      return { success: false, message: 'Server error validating coupon.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Coupon removed', 'info');
  };

  // Affiliate Track
  const trackAndRedirect = async (product: Product) => {
    showToast(`Opening official partner link for ${product.name.slice(0, 24)}...`, 'info');
    try {
      const res = await fetch(`/api/track-click/${product.slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.amazonUrl) {
          window.open(data.amazonUrl, '_blank', 'noopener,noreferrer');
          return;
        }
      }
    } catch (err) {
      console.error(err);
    }
    window.open(`/go/${product.slug}`, '_blank', 'noopener,noreferrer');
  };

  const formatPrice = (amount?: number) => {
    if (amount === undefined || amount === null) return '';
    const currency = settings.currency || '₹';
    return `${currency} ${amount.toLocaleString('en-IN')}`;
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        categories,
        cart,
        wishlist,
        compareList,
        appliedCoupon,
        couponDiscount,
        isCartOpen,
        setIsCartOpen,
        isCompareOpen,
        setIsCompareOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        applyCoupon,
        removeCoupon,
        toasts,
        showToast,
        removeToast,
        trackAndRedirect,
        refreshSettings,
        refreshCategories,
        formatPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
