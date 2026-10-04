/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCurrentPath } from './lib/router.ts';
import { StoreProvider } from './context/StoreContext.tsx';
import { AdminAuthProvider } from './context/AdminAuthContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';

// Marketingwalaa Agency Landing Page & 3D Showcase
import { MarketingPage } from './pages/MarketingPage.tsx';

// E-Commerce Storefront Pages (ElectroPulse 3D)
import { HomePage } from './pages/HomePage.tsx';
import { ShopPage } from './pages/ShopPage.tsx';
import { ProductDetailPage } from './pages/ProductDetailPage.tsx';
import { CategoriesPage } from './pages/CategoriesPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { SearchPage } from './pages/SearchPage.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { CheckoutPage } from './pages/CheckoutPage.tsx';
import { OrderTrackingPage } from './pages/OrderTrackingPage.tsx';
import { AccountPage } from './pages/AccountPage.tsx';
import { WishlistPage } from './pages/WishlistPage.tsx';
import { ComparePage } from './pages/ComparePage.tsx';
import { DealsPage } from './pages/DealsPage.tsx';
import { SupportPage } from './pages/SupportPage.tsx';

// Admin Control Panel Pages
import { AdminLogin } from './pages/admin/AdminLogin.tsx';
import { AdminLayout } from './pages/admin/AdminLayout.tsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';
import { AdminProducts } from './pages/admin/AdminProducts.tsx';
import { AdminProductForm } from './pages/admin/AdminProductForm.tsx';
import { AdminOrders } from './pages/admin/AdminOrders.tsx';
import { AdminCustomers } from './pages/admin/AdminCustomers.tsx';
import { AdminInventory } from './pages/admin/AdminInventory.tsx';
import { AdminCoupons } from './pages/admin/AdminCoupons.tsx';
import { AdminOffers } from './pages/admin/AdminOffers.tsx';
import { AdminReviews } from './pages/admin/AdminReviews.tsx';
import { AdminBanners } from './pages/admin/AdminBanners.tsx';
import { AdminCategories } from './pages/admin/AdminCategories.tsx';
import { AdminHeroSlides } from './pages/admin/AdminHeroSlides.tsx';
import { AdminAnalytics } from './pages/admin/AdminAnalytics.tsx';
import { AdminMessages } from './pages/admin/AdminMessages.tsx';
import { AdminSettings } from './pages/admin/AdminSettings.tsx';

/**
 * Dark Futuristic Storefront Layout
 * - Deep Navy Background (#07111F)
 * - Blue/Purple Ambient Glow Halos
 * - Electric Blue Primary (#2563EB)
 * - Cyber Purple Accent (#7C3AED)
 * - Neon Cyan Highlights (#06B6D4)
 * - Crisp White Text (#FFFFFF)
 */
const StorefrontLayout: React.FC<{ children: React.ReactNode; currentPath: string }> = ({
  children,
  currentPath,
}) => {
  return (
    <div className="relative min-h-screen bg-[#07111F] text-white selection:bg-[#2563EB]/40 selection:text-[#06B6D4] flex flex-col overflow-x-hidden">
      {/* Dark Futuristic Ambient Blue/Purple Glowing Backdrops */}
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.18),transparent_70%)] pointer-events-none z-0" />
      <div className="fixed top-1/4 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(124,58,237,0.12),transparent_70%)] pointer-events-none z-0" />
      <div className="fixed bottom-10 -left-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none z-0" />

      {/* Subtle futuristic cybernetic grid lines */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />

      <Header currentPath={currentPath} />
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  const { path } = useCurrentPath();

  // Router handler
  const renderContent = () => {
    // 1. Admin Login Route
    if (path === '/admin/login') {
      return <AdminLogin />;
    }

    // 2. Admin Control Panel Routes (All 10 blueprint tabs)
    if (path.startsWith('/admin')) {
      let adminComponent = <AdminDashboard />;

      if (path === '/admin/products') {
        adminComponent = <AdminProducts />;
      } else if (path === '/admin/products/new') {
        adminComponent = <AdminProductForm />;
      } else if (path.startsWith('/admin/products/edit/')) {
        const prodId = path.replace('/admin/products/edit/', '');
        adminComponent = <AdminProductForm productId={prodId} />;
      } else if (path === '/admin/orders') {
        adminComponent = <AdminOrders />;
      } else if (path === '/admin/customers') {
        adminComponent = <AdminCustomers />;
      } else if (path === '/admin/inventory') {
        adminComponent = <AdminInventory />;
      } else if (path === '/admin/coupons') {
        adminComponent = <AdminCoupons />;
      } else if (path === '/admin/offers') {
        adminComponent = <AdminOffers />;
      } else if (path === '/admin/reviews') {
        adminComponent = <AdminReviews />;
      } else if (path === '/admin/banners') {
        adminComponent = <AdminBanners />;
      } else if (path === '/admin/categories') {
        adminComponent = <AdminCategories />;
      } else if (path === '/admin/hero-slides') {
        adminComponent = <AdminHeroSlides />;
      } else if (path === '/admin/analytics') {
        adminComponent = <AdminAnalytics />;
      } else if (path === '/admin/messages') {
        adminComponent = <AdminMessages />;
      } else if (path === '/admin/settings') {
        adminComponent = <AdminSettings />;
      }

      return <AdminLayout currentPath={path}>{adminComponent}</AdminLayout>;
    }

    // 3. Marketing Showcase Route (/marketing or /agency)
    if (path === '/marketing' || path === '/agency') {
      return <MarketingPage />;
    }

    // 4. E-Commerce Product Detail Route /product/:slug
    if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '');
      return (
        <StorefrontLayout currentPath={path}>
          <ProductDetailPage slug={slug} />
        </StorefrontLayout>
      );
    }

    // 5. Dedicated Category Routes
    const cleanCategory = path.replace('/', '');
    const knownCategories = [
      'smartphones',
      'phones',
      'computing',
      'laptops',
      'computers',
      'tvs',
      'tv',
      'gaming',
      'audio',
      'cameras',
      'tablets',
      'monitors',
      'wearables',
      'accessories',
      'smart-home',
    ];

    if (knownCategories.includes(cleanCategory)) {
      return (
        <StorefrontLayout currentPath={path}>
          <ShopPage forcedCategory={cleanCategory} />
        </StorefrontLayout>
      );
    }

    // 6. Deals & Offers Page
    if (path === '/deals') {
      return (
        <StorefrontLayout currentPath={path}>
          <DealsPage />
        </StorefrontLayout>
      );
    }

    // 7. Product Comparison Matrix Page
    if (path === '/compare') {
      return (
        <StorefrontLayout currentPath={path}>
          <ComparePage />
        </StorefrontLayout>
      );
    }

    // 8. Customer Support & Live Helpdesk Page
    if (path === '/support' || path === '/customer-support') {
      return (
        <StorefrontLayout currentPath={path}>
          <SupportPage />
        </StorefrontLayout>
      );
    }

    // 9. E-Commerce Catalog / Shop / New Arrivals
    if (path === '/shop' || path === '/new-arrivals') {
      return (
        <StorefrontLayout currentPath={path}>
          <ShopPage />
        </StorefrontLayout>
      );
    }

    // 10. Cart Page
    if (path === '/cart') {
      return (
        <StorefrontLayout currentPath={path}>
          <CartPage />
        </StorefrontLayout>
      );
    }

    // 11. Checkout Page
    if (path === '/checkout') {
      return (
        <StorefrontLayout currentPath={path}>
          <CheckoutPage />
        </StorefrontLayout>
      );
    }

    // 12. Order Tracking Page
    if (path === '/order-tracking' || path.startsWith('/order-tracking')) {
      return (
        <StorefrontLayout currentPath={path}>
          <OrderTrackingPage />
        </StorefrontLayout>
      );
    }

    // 13. User Account Page
    if (path === '/account' || path.startsWith('/account')) {
      return (
        <StorefrontLayout currentPath={path}>
          <AccountPage />
        </StorefrontLayout>
      );
    }

    // 14. Wishlist Page
    if (path === '/wishlist') {
      return (
        <StorefrontLayout currentPath={path}>
          <WishlistPage />
        </StorefrontLayout>
      );
    }

    // 15. Categories Listing Page
    if (path === '/categories') {
      return (
        <StorefrontLayout currentPath={path}>
          <CategoriesPage />
        </StorefrontLayout>
      );
    }

    // 16. About Page
    if (path === '/about') {
      return (
        <StorefrontLayout currentPath={path}>
          <AboutPage />
        </StorefrontLayout>
      );
    }

    // 17. Contact Page
    if (path === '/contact') {
      return (
        <StorefrontLayout currentPath={path}>
          <ContactPage />
        </StorefrontLayout>
      );
    }

    // 18. Search Page
    if (path === '/search') {
      return (
        <StorefrontLayout currentPath={path}>
          <SearchPage />
        </StorefrontLayout>
      );
    }

    // Default Route / and /store -> Flagship Electronics E-Commerce Website Home
    return (
      <StorefrontLayout currentPath={path}>
        <HomePage />
      </StorefrontLayout>
    );
  };

  return (
    <StoreProvider>
      <AdminAuthProvider>
        {renderContent()}
        <CartDrawer />
        <ToastContainer />
      </AdminAuthProvider>
    </StoreProvider>
  );
}
