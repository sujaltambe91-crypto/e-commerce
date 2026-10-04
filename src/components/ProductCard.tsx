import React, { useState } from 'react';
import { Product } from '../types/index.ts';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import {
  Heart,
  ShoppingCart,
  Star,
  Zap,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Image as ImageIcon,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice } = useStore();
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(`/product/${product.slug}`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.color_options?.[0];
    const defaultRam = product.ram_options?.[0];
    const defaultStorage = product.storage_options?.[0];
    addToCart(product, 1, defaultColor, defaultRam, defaultStorage);
  };

  // Extract RAM & Storage
  const ramValue =
    product.specs?.ram ||
    product.hardware?.ram ||
    (product.ram_options && product.ram_options[0]) ||
    '';
  const storageValue =
    product.specs?.storage ||
    product.hardware?.storage ||
    (product.storage_options && product.storage_options[0]) ||
    '';

  // Extract Main Specification
  const mainSpec =
    product.specs?.processor ||
    product.hardware?.processor ||
    product.specs?.display ||
    product.display?.screen_size ||
    product.short_description?.slice(0, 50) ||
    'High-Performance Architecture';

  // Pricing values
  const salePrice = product.price ?? product.selling_price ?? 0;
  const mrp = product.original_price ?? product.mrp;
  const discount = product.discount_percentage;
  const emiAmount = product.emi_starts_at || Math.round(salePrice / 12);

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#111F33] rounded-2xl border border-[#2563EB]/25 hover:border-[#7C3AED] hover:shadow-[0_0_25px_rgba(124,58,237,0.3)] transition-all duration-300 overflow-hidden cursor-pointer h-full"
    >
      {/* 1. PRODUCT IMAGE & BADGES */}
      <div className="relative aspect-4/3 w-full bg-[#0D1B2A] overflow-hidden">
        {!imageError && product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-600">
            <ImageIcon className="w-10 h-10 mb-2 text-neutral-700" />
            <span className="text-xs text-center text-neutral-400 line-clamp-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Discount % (Red/Coral #EF4444) */}
        {discount ? (
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#EF4444] text-white text-[11px] font-bold tracking-tight uppercase shadow-md shadow-[#EF4444]/30">
            {discount}% OFF
          </div>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
            isFavorited
              ? 'bg-[#7C3AED] text-white'
              : 'bg-[#07111F]/70 text-[#A7B4C7] hover:text-[#7C3AED] hover:bg-[#07111F]'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* 3D Badge Indicator if model available */}
        {product.has_3d_model !== false && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#07111F]/80 backdrop-blur-sm border border-[#2563EB]/40 text-[10px] font-mono text-[#06B6D4] flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#06B6D4]" />
            <span>360° 3D</span>
          </div>
        )}
      </div>

      {/* 2. CARD CONTENT */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Brand & Rating Bar */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-[#06B6D4] text-[11px] uppercase tracking-wider">
              {product.brand || 'Flagship'}
            </span>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating ? product.rating.toFixed(1) : '4.8'}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-bold text-white group-hover:text-[#06B6D4] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* RAM & Storage Badges */}
          {(ramValue || storageValue) && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px] text-[#A7B4C7]">
              {ramValue && (
                <span className="bg-[#0D1B2A] border border-[#2563EB]/20 px-2 py-0.5 rounded text-[10px] font-medium text-white">
                  {ramValue}
                </span>
              )}
              {storageValue && (
                <span className="bg-[#0D1B2A] border border-[#2563EB]/20 px-2 py-0.5 rounded text-[10px] font-medium text-white">
                  {storageValue}
                </span>
              )}
            </div>
          )}

          {/* Main Specification Highlight */}
          <p className="text-[11px] text-[#A7B4C7] line-clamp-1 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-[#7C3AED] shrink-0" />
            <span className="truncate">{mainSpec}</span>
          </p>

          {/* Stock Availability */}
          <div className="flex items-center gap-1.5 text-[10px] font-medium">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.stock_status === 'out_of_stock'
                  ? 'bg-red-400'
                  : product.stock_status === 'low_stock'
                  ? 'bg-amber-400'
                  : 'bg-[#22C55E]'
              }`}
            />
            <span
              className={
                product.stock_status === 'out_of_stock'
                  ? 'text-red-400'
                  : product.stock_status === 'low_stock'
                  ? 'text-amber-400'
                  : 'text-[#22C55E]'
              }
            >
              {product.stock_status === 'out_of_stock'
                ? 'Out of Stock'
                : product.stock_status === 'low_stock'
                ? 'Only a few left'
                : 'In Stock'}
            </span>
          </div>
        </div>

        {/* 3. PRICING & ACTIONS */}
        <div className="pt-2.5 border-t border-[#2563EB]/20 space-y-2">
          {/* Sale Price & MRP */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-white font-mono tracking-tight">
                {formatPrice(salePrice)}
              </span>
              {mrp && mrp > salePrice && (
                <span className="text-xs text-neutral-500 line-through font-mono">
                  {formatPrice(mrp)}
                </span>
              )}
            </div>
          </div>

          {/* EMI Estimate */}
          {emiAmount > 0 && (
            <div className="text-[10px] text-[#A7B4C7] font-mono">
              EMI from <strong className="text-[#06B6D4]">{formatPrice(emiAmount)}/mo</strong>
            </div>
          )}

          {/* Add to Cart Button (Electric Blue #2563EB) */}
          <div className="pt-1">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-98 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#2563EB]/25"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
