import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { useStore } from '../context/StoreContext.tsx';
import { SeoHead } from '../components/SeoHead.tsx';

// 🏠 HOME PAGE SECTIONS
import { Electronics3DHero } from '../components/Electronics3DHero.tsx';
import { HomeSearchBar } from '../components/HomeSearchBar.tsx';
import { FeaturedCategoriesSection } from '../components/FeaturedCategoriesSection.tsx';
import { FlashSaleSection } from '../components/FlashSaleSection.tsx';
import { BestSellersSection } from '../components/BestSellersSection.tsx';
import { NewArrivalsSection } from '../components/NewArrivalsSection.tsx';
import { TrendingProductsSection } from '../components/TrendingProductsSection.tsx';
import { GamingZone } from '../components/GamingZone.tsx';
import { LaptopShowcase } from '../components/LaptopShowcase.tsx';
import { SmartphoneShowcase } from '../components/SmartphoneShowcase.tsx';
import { TvShowcase } from '../components/TvShowcase.tsx';
import { BrandShowcase } from '../components/BrandShowcase.tsx';
import { HomeDealsOffersSection } from '../components/HomeDealsOffersSection.tsx';
import { CustomerReviews } from '../components/CustomerReviews.tsx';
import { NewsletterSection } from '../components/NewsletterSection.tsx';

export const HomePage: React.FC = () => {
  const { categories, settings } = useStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const list: Product[] = await res.json();
          setAllProducts(list);
        }
      } catch (err) {
        console.error('Failed to load products for homepage:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const flagshipLaptop = allProducts.find(
    (p) => p.category_slug === 'laptops' && (p.featured || p.price > 150000)
  );

  const flagshipSmartphone = allProducts.find(
    (p) => p.category_slug === 'smartphones' && (p.featured || p.name.includes('16 Pro') || p.name.includes('Ultra'))
  );

  const flagshipTv = allProducts.find(
    (p) => p.category_slug === 'tvs' && (p.featured || p.name.includes('OLED'))
  );

  return (
    <div className="space-y-20 sm:space-y-24">
      <SeoHead
        title={settings.seo_title || 'ElectroPulse 3D | Next-Gen Electronics & 3D Interactive Hub'}
        description={settings.seo_description || settings.website_description}
      />

      {/* 1. 🚀 3D ANIMATED HERO */}
      <Electronics3DHero />

      {/* 2. 🔍 SEARCH BAR */}
      <HomeSearchBar />

      {/* 3. 📱 FEATURED CATEGORIES */}
      <FeaturedCategoriesSection categories={categories} />

      {/* 4. 🔥 FLASH SALE */}
      <FlashSaleSection products={allProducts} />

      {/* 5. ⭐ BEST SELLERS */}
      <BestSellersSection products={allProducts} />

      {/* 6. ✨ NEW ARRIVALS */}
      <NewArrivalsSection products={allProducts} />

      {/* 7. 📈 TRENDING PRODUCTS */}
      <TrendingProductsSection products={allProducts} />

      {/* 8. 🎮 GAMING ZONE */}
      <GamingZone products={allProducts} />

      {/* 9. 💻 LAPTOP SHOWCASE */}
      <LaptopShowcase laptop={flagshipLaptop} />

      {/* 10. 📱 SMARTPHONE SHOWCASE */}
      <SmartphoneShowcase smartphone={flagshipSmartphone} />

      {/* 11. 📺 TV SHOWCASE */}
      <TvShowcase tvProduct={flagshipTv} />

      {/* 12. 🏷️ TOP BRANDS */}
      <BrandShowcase />

      {/* 13. 🎟️ DEALS & OFFERS */}
      <HomeDealsOffersSection />

      {/* 14. ⭐ CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* 15. 📧 NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
};
