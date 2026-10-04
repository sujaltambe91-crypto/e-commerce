import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { Device3DViewer } from '../components/Device3DViewer.tsx';
import { ProductSpecificationTabs } from '../components/ProductSpecificationTabs.tsx';
import { ProductReviewsSection } from '../components/ProductReviewsSection.tsx';
import { SeoHead } from '../components/SeoHead.tsx';
import {
  ExternalLink,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  CheckCircle,
  CreditCard,
  Tag,
  Play,
  ShoppingCart,
  Zap,
  Minus,
  Plus,
  Scale,
  Copy,
  Info,
  PackageCheck,
  Star,
  X,
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    trackAndRedirect,
    addToCart,
    formatPrice,
    addToCompare,
    isInCompare,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'photos' | '3d' | 'video'>('photos');
  const [quantity, setQuantity] = useState(1);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);

  // Variant States: Color, Size, Model, RAM, Storage
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedRam, setSelectedRam] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          const prod: Product = data.product;
          setProduct(prod);
          setRelated(data.related || []);
          setActiveImage(prod.image_url);

          // Initialize default variants
          if (prod.color_options && prod.color_options.length > 0) {
            setSelectedColor(prod.color_options[0]);
          }
          if (prod.size_options && prod.size_options.length > 0) {
            setSelectedSize(prod.size_options[0]);
          } else if (prod.specs?.screen_size) {
            setSelectedSize(prod.specs.screen_size);
          }
          if (prod.model_options && prod.model_options.length > 0) {
            setSelectedModel(prod.model_options[0]);
          }
          if (prod.ram_options && prod.ram_options.length > 0) {
            setSelectedRam(prod.ram_options[0]);
          }
          if (prod.storage_options && prod.storage_options.length > 0) {
            setSelectedStorage(prod.storage_options[0]);
          }
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 animate-pulse space-y-8">
        <div className="h-6 w-48 bg-[#111F33] rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-[#111F33] rounded-3xl" />
          <div className="space-y-4">
            <div className="h-10 bg-[#111F33] rounded-lg w-3/4" />
            <div className="h-6 bg-[#111F33] rounded-lg w-1/4" />
            <div className="h-32 bg-[#111F33] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#111F33] border border-[#2563EB]/40 flex items-center justify-center mx-auto text-[#06B6D4]">
          <Tag className="w-10 h-10" />
        </div>
        <h2 className="font-display text-3xl font-bold text-white">Product Not Found</h2>
        <p className="text-[#A7B4C7] max-w-md mx-auto">
          The requested product may have been relocated, or is temporarily out of catalog.
        </p>
        <button
          onClick={() => navigateTo('/shop')}
          className="px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#2563EB]/30 cursor-pointer"
        >
          Browse All Electronics Catalog
        </button>
      </div>
    );
  }

  const allImages = [product.image_url, ...(product.additional_images || [])];
  const isSaved = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Price calculations
  const rawPrice = product.price ?? product.selling_price ?? 0;
  const mrpPrice = product.original_price ?? product.mrp ?? Math.round(rawPrice * 1.15);
  const discountPct = product.discount_percentage || Math.round(((mrpPrice - rawPrice) / mrpPrice) * 100);
  const savings = mrpPrice - rawPrice;

  // Coupon calculations
  const couponDiscountAmount = appliedCouponCode ? (appliedCouponCode === 'ELECTRO1000' ? 1000 : 500) : 0;
  const finalPrice = Math.max(0, rawPrice - couponDiscountAmount);

  // EMI calculation
  const emiAmount = product.emi_starts_at || Math.round(finalPrice / 12);

  // SKU, Stock, Material, Delivery, Warranty defaults
  const productSku = product.sku || `SKU-${product.brand?.toUpperCase().slice(0, 3) || 'ELC'}-${product.id.slice(0, 8).toUpperCase()}`;
  const stockCount = product.stock_quantity ?? product.stock ?? 38;
  const isLowStock = stockCount <= 5;
  const isOutOfStock = product.stock_status === 'out_of_stock' || stockCount === 0;

  const estimatedDelivery = product.delivery_date || product.estimated_delivery || 'Tomorrow by 11:00 AM';
  const shippingCost = product.shipping_cost || 'FREE Express Delivery';
  const returnPeriod = product.return_period || product.return_policy || '7-Day Replacement Guarantee';
  const warrantyInfo = product.warranty || product.warranty_info || '1-Year Official Brand Manufacturer Warranty with Doorstep Service';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Product link copied to clipboard!', 'info');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleApplyCoupon = (code: string) => {
    if (appliedCouponCode === code) {
      setAppliedCouponCode(null);
      showToast(`Coupon ${code} removed`, 'info');
    } else {
      setAppliedCouponCode(code);
      showToast(`Coupon ${code} applied! Instant savings added.`, 'success');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Code ${code} copied!`, 'info');
  };

  return (
    <div className="space-y-12">
      <SeoHead
        title={`${product.name} | ElectroPulse 3D Premium Store`}
        description={product.short_description || product.full_description?.slice(0, 160)}
        image={product.image_url}
      />

      {/* 1. TOP BREADCRUMB & METADATA BAR (Product ID, Category, Subcategory, Brand, SKU, Stock Status) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2563EB]/20 text-xs text-[#A7B4C7]">
        <nav className="flex flex-wrap items-center gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="hover:text-white transition-colors"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <a
            href="/shop"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/shop');
            }}
            className="hover:text-white transition-colors"
          >
            Electronics
          </a>
          {product.category_name && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <a
                href={`/shop?category=${product.category_slug || product.category_id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`/shop?category=${product.category_slug || product.category_id}`);
                }}
                className="hover:text-[#06B6D4] transition-colors"
              >
                {product.category_name}
              </a>
            </>
          )}
          {product.subcategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-[#06B6D4] font-semibold">{product.subcategory}</span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Identification Badges */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <span className="bg-[#111F33] text-[#A7B4C7] px-2.5 py-1 rounded-lg border border-[#2563EB]/30">
            ID: <strong className="text-white">{product.id}</strong>
          </span>
          <span className="bg-[#111F33] text-[#A7B4C7] px-2.5 py-1 rounded-lg border border-[#2563EB]/30">
            SKU: <strong className="text-[#06B6D4]">{productSku}</strong>
          </span>
          <span
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-bold ${
              isOutOfStock
                ? 'bg-red-500/15 text-red-400 border-red-500/30'
                : isLowStock
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOutOfStock ? 'bg-red-400' : isLowStock ? 'bg-amber-400' : 'bg-[#22C55E] animate-pulse'
              }`}
            />
            <span>
              {isOutOfStock
                ? 'Out of Stock'
                : isLowStock
                ? `Only ${stockCount} Left!`
                : `In Stock (${stockCount} units)`}
            </span>
          </span>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN WORKBENCH: Left Showcase (7 cols) + Right Checkout Module (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Media Switcher (Photos, 3D Model, Video) + Description + Specifications Tabs + Reviews (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-[#111F33] p-1.5 rounded-2xl border border-[#2563EB]/30 text-xs font-semibold">
              <button
                onClick={() => setViewMode('photos')}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'photos'
                    ? 'bg-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/40'
                    : 'text-[#A7B4C7] hover:text-white'
                }`}
              >
                High-Res Photos
              </button>
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold shadow-md shadow-[#7C3AED]/40'
                    : 'text-[#A7B4C7] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>360° 3D Model</span>
              </button>
              <button
                onClick={() => setViewMode('video')}
                className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-[#7C3AED] text-white font-bold shadow-md shadow-[#7C3AED]/40'
                    : 'text-[#A7B4C7] hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Product Video</span>
              </button>
            </div>
            <span className="text-[11px] font-mono text-[#06B6D4]">
              {viewMode === '3d'
                ? 'Interactive 360° Inspection'
                : viewMode === 'video'
                ? 'Official 4K Cinematic Reel'
                : `${allImages.length} High-Res Gallery Photos`}
            </span>
          </div>

          {/* VIEWPORT AREA: 3D Model vs Video vs Photos */}
          {viewMode === '3d' ? (
            <Device3DViewer product={product} />
          ) : viewMode === 'video' ? (
            <div className="relative aspect-4/3 w-full rounded-3xl bg-[#07111F] border border-[#2563EB]/40 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
              <img
                src={product.image_url}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isPlayingVideo ? 'opacity-30 filter blur-xs scale-105' : 'opacity-70'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/50 to-transparent" />

              {/* Video Badge Strip */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#EF4444]/90 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#EF4444]/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>OFFICIAL TRAILER • 4K 60FPS</span>
                </span>
                <span className="text-xs font-mono text-[#A7B4C7]">02:30 HD</span>
              </div>

              {/* Center Play Button */}
              <div className="relative z-10 text-center my-auto space-y-3">
                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] hover:scale-110 active:scale-95 text-white flex items-center justify-center mx-auto shadow-2xl shadow-[#2563EB]/50 transition-all cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </button>
                <div className="space-y-1">
                  <span className="font-display text-lg font-black text-white block drop-shadow-md">
                    {product.name} Cinematic Hardware Reveal
                  </span>
                  <span className="text-xs text-[#A7B4C7] block">
                    Thermal architecture, optical sensor suite, and silicon benchmarks
                  </span>
                </div>
              </div>

              {/* Bottom Video Meta */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#2563EB]/20 text-xs text-[#A7B4C7] font-mono">
                <span>ElectroPulse Flagship Media</span>
                <span>Dolby Vision & Atmos</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main Photo Gallery Image */}
              <div className="relative aspect-4/3 w-full rounded-3xl bg-[#0D1B2A] border border-[#2563EB]/30 overflow-hidden shadow-2xl group">
                <img
                  src={activeImage || product.image_url}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {discountPct > 0 && (
                    <span className="px-3 py-1 rounded-xl bg-[#EF4444] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[#EF4444]/40">
                      Save {discountPct}% OFF
                    </span>
                  )}
                  {product.brand && (
                    <span className="px-3 py-1 rounded-xl bg-[#07111F]/80 backdrop-blur-md text-[#06B6D4] font-mono text-xs font-bold border border-[#2563EB]/40">
                      {product.brand}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-xl bg-[#07111F]/80 backdrop-blur-md text-white font-mono text-xs border border-[#2563EB]/40">
                  Hover to Inspect Details
                </div>
              </div>

              {/* Thumbnails Row */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImage === img
                          ? 'border-[#06B6D4] scale-105 shadow-lg shadow-[#06B6D4]/30'
                          : 'border-[#2563EB]/25 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#111F33] border border-[#2563EB]/25 text-xs text-[#A7B4C7]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>100% Genuine Brand</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#06B6D4] shrink-0" />
              <span>Free Express Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span>7-Day Replacement</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>No-Cost Bank EMI</span>
            </div>
          </div>

          {/* PRODUCT DESCRIPTION SECTION */}
          <section className="space-y-4 pt-6 border-t border-[#2563EB]/20">
            <div>
              <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase tracking-wider block mb-1">
                Overview & Architecture
              </span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Product Description
              </h3>
            </div>

            {product.short_description && (
              <p className="text-sm text-neutral-200 leading-relaxed font-medium bg-[#111F33]/80 p-4 rounded-2xl border border-[#2563EB]/25">
                {product.short_description}
              </p>
            )}

            <div className="text-sm text-[#A7B4C7] leading-relaxed space-y-3 whitespace-pre-line">
              {product.full_description}
            </div>

            {/* What's In The Box */}
            {product.whats_in_the_box && product.whats_in_the_box.length > 0 && (
              <div className="pt-3 space-y-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                  What's In The Box:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.whats_in_the_box.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 flex items-center gap-2 text-xs text-[#A7B4C7]"
                    >
                      <PackageCheck className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 3. DETAILED SPECIFICATIONS TABS (Material, Dimensions, Weight, Hardware, Display, Camera, Battery, Connectivity, OS, Inventory, Delivery) */}
          <ProductSpecificationTabs product={product} />

          {/* 4. REVIEWS & RATINGS SECTION */}
          <ProductReviewsSection product={product} />
        </div>

        {/* RIGHT COLUMN: Sticky Purchase & Variant Configurator (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-[#111F33] border border-[#2563EB]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-[#2563EB]/10 backdrop-blur-md">
            {/* Header: Brand, Title, Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#A7B4C7]">
                <div className="flex items-center gap-2">
                  {product.brand && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#0D1B2A] text-white font-bold font-mono text-[11px] border border-[#2563EB]/30">
                      {product.brand}
                    </span>
                  )}
                  <span className="uppercase tracking-wider font-semibold text-[#06B6D4]">
                    {product.category_name}
                  </span>
                </div>

                {/* Rating score badge */}
                <div className="flex items-center gap-1.5 bg-[#0D1B2A] px-2.5 py-1 rounded-lg border border-[#2563EB]/20 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{product.rating ? product.rating.toFixed(1) : '4.9'}</span>
                  <span className="text-[#A7B4C7] text-[11px]">({product.reviews_count || 342})</span>
                </div>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                {product.name}
              </h1>
            </div>

            {/* 1. PRICE MODULE: MRP, Selling Price, Discount %, Savings */}
            <div className="p-5 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/30 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#A7B4C7] block mb-0.5">
                    Selling Price (Inclusive of all taxes)
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                      {formatPrice(finalPrice)}
                    </span>
                    {mrpPrice > finalPrice && (
                      <span className="text-sm text-neutral-500 line-through font-mono">
                        MRP: {formatPrice(mrpPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {discountPct > 0 && (
                  <div className="text-right">
                    <span className="text-xs font-black text-[#22C55E] uppercase tracking-wider block bg-[#22C55E]/15 px-2.5 py-1 rounded-lg border border-[#22C55E]/30 shadow">
                      Save {discountPct}% OFF
                    </span>
                    <span className="text-[11px] text-[#06B6D4] font-mono mt-0.5 block font-semibold">
                      Save {formatPrice(savings + couponDiscountAmount)}
                    </span>
                  </div>
                )}
              </div>

              {/* Coupon Applied Savings Indicator */}
              {appliedCouponCode && (
                <div className="p-2 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-between text-xs text-[#22C55E]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon {appliedCouponCode} applied: -{formatPrice(couponDiscountAmount)}</span>
                  </span>
                  <button
                    onClick={() => setAppliedCouponCode(null)}
                    className="text-xs underline hover:text-white cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* EMI Breakout & Calculator Trigger */}
              <div className="flex items-center justify-between pt-2 border-t border-[#2563EB]/20 text-xs text-[#A7B4C7]">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#06B6D4] shrink-0" />
                  <span>
                    EMI from <strong className="text-[#06B6D4] font-mono font-bold">{formatPrice(emiAmount)}/mo</strong>
                  </span>
                </div>
                <button
                  onClick={() => setShowEmiModal(true)}
                  className="text-xs text-[#06B6D4] hover:underline font-semibold cursor-pointer"
                >
                  View EMI Plans
                </button>
              </div>
            </div>

            {/* 2. COUPON SECTION: Available Coupons */}
            <div className="space-y-2 pt-1 border-t border-[#2563EB]/20">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#06B6D4] uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Available Coupons & Instant Discounts:</span>
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { code: 'ELECTRO1000', desc: 'Flat ₹1,000 Off on orders above ₹50,000', discount: 1000 },
                  { code: 'FESTIVE500', desc: 'Flat ₹500 Off with any UPI / Debit / Credit card', discount: 500 },
                ].map((cpn) => {
                  const isApplied = appliedCouponCode === cpn.code;
                  return (
                    <div
                      key={cpn.code}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                        isApplied
                          ? 'bg-[#22C55E]/15 border-[#22C55E]/40 text-[#22C55E]'
                          : 'bg-[#0D1B2A] border-[#2563EB]/25 text-[#A7B4C7]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-white bg-[#111F33] px-2 py-0.5 rounded border border-[#2563EB]/30">
                            {cpn.code}
                          </span>
                          <span className="text-[11px] text-[#06B6D4] font-semibold">{cpn.desc}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyCode(cpn.code)}
                          className="p-1 text-[#A7B4C7] hover:text-white cursor-pointer"
                          title="Copy Code"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleApplyCoupon(cpn.code)}
                          className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                            isApplied
                              ? 'bg-[#22C55E] text-white shadow'
                              : 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow'
                          }`}
                        >
                          {isApplied ? 'Applied' : 'Apply'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. VARIANTS CONFIGURATOR (Color, Size, Model, RAM, Storage) */}
            <div className="space-y-4 pt-2 border-t border-[#2563EB]/20">
              {/* Color Options */}
              {product.color_options && product.color_options.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#A7B4C7]">
                    Finish Color: <strong className="text-white">{selectedColor}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.color_options.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedColor === col
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold shadow-lg shadow-[#2563EB]/40 scale-105'
                            : 'bg-[#0D1B2A] text-[#A7B4C7] border border-[#2563EB]/30 hover:border-[#06B6D4]'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {(product.size_options || (product.specs?.screen_size && [product.specs.screen_size])) && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#A7B4C7]">
                    Screen / Dimensions Size: <strong className="text-white">{selectedSize || 'Standard Form Factor'}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(product.size_options || [product.specs?.screen_size || '6.9-inch OLED']).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold shadow-lg shadow-[#2563EB]/40'
                            : 'bg-[#0D1B2A] text-[#A7B4C7] border border-[#2563EB]/30 hover:border-[#06B6D4]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Model Options */}
              {product.model_options && product.model_options.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#A7B4C7]">
                    Model Edition: <strong className="text-white">{selectedModel}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.model_options.map((mod) => (
                      <button
                        key={mod}
                        onClick={() => setSelectedModel(mod)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedModel === mod
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold shadow-lg shadow-[#2563EB]/40'
                            : 'bg-[#0D1B2A] text-[#A7B4C7] border border-[#2563EB]/30 hover:border-[#06B6D4]'
                        }`}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* RAM Options */}
              {product.ram_options && product.ram_options.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#A7B4C7]">
                    System Memory (RAM): <strong className="text-white">{selectedRam}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.ram_options.map((rm) => (
                      <button
                        key={rm}
                        onClick={() => setSelectedRam(rm)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedRam === rm
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold shadow-lg shadow-[#2563EB]/40'
                            : 'bg-[#0D1B2A] text-[#A7B4C7] border border-[#2563EB]/30 hover:border-[#06B6D4]'
                        }`}
                      >
                        {rm}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Options */}
              {product.storage_options && product.storage_options.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#A7B4C7]">
                    Internal Storage: <strong className="text-white">{selectedStorage}</strong>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.storage_options.map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStorage(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedStorage === st
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold shadow-lg shadow-[#2563EB]/40'
                            : 'bg-[#0D1B2A] text-[#A7B4C7] border border-[#2563EB]/30 hover:border-[#06B6D4]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. QUANTITY & PRIMARY ACTION BUTTONS */}
            <div className="space-y-4 pt-2 border-t border-[#2563EB]/20">
              {/* Quantity selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#A7B4C7]">Order Quantity:</span>
                <div className="flex items-center gap-3 bg-[#0D1B2A] px-3 py-1.5 rounded-xl border border-[#2563EB]/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="p-1 rounded-lg text-[#A7B4C7] hover:text-white hover:bg-[#111F33] transition-colors cursor-pointer disabled:opacity-40"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-sm font-bold text-white w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(stockCount, quantity + 1))}
                    disabled={isOutOfStock || quantity >= stockCount}
                    className="p-1 rounded-lg text-[#A7B4C7] hover:text-white hover:bg-[#111F33] transition-colors cursor-pointer disabled:opacity-40"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Main E-Commerce Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    addToCart(
                      product,
                      quantity,
                      selectedColor,
                      selectedRam,
                      selectedStorage,
                      selectedSize,
                      selectedModel
                    );
                    showToast(`Added ${quantity} item(s) to Cart!`, 'success');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-98 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#2563EB]/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>

                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    addToCart(
                      product,
                      quantity,
                      selectedColor,
                      selectedRam,
                      selectedStorage,
                      selectedSize,
                      selectedModel
                    );
                    navigateTo('/checkout');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] active:scale-98 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#7C3AED]/30 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Secondary Utility Controls: Wishlist, Compare, Share */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSaved
                      ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#7C3AED]'
                      : 'bg-[#0D1B2A] border-[#2563EB]/30 text-[#A7B4C7] hover:text-white hover:border-[#06B6D4]'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span className="truncate">{isSaved ? 'Saved' : 'Wishlist'}</span>
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isCompared
                      ? 'bg-[#06B6D4]/20 border-[#06B6D4] text-[#06B6D4]'
                      : 'bg-[#0D1B2A] border-[#2563EB]/30 text-[#A7B4C7] hover:text-white hover:border-[#06B6D4]'
                  }`}
                  title="Compare with other devices"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span className="truncate">{isCompared ? 'Comparing' : 'Compare'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#2563EB]/30 bg-[#0D1B2A] text-[#A7B4C7] hover:text-white hover:border-[#06B6D4] transition-colors cursor-pointer"
                  title="Share link"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>Share</span>
                </button>
              </div>

              {/* Amazon Affiliate Option */}
              <button
                onClick={() => trackAndRedirect(product)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#0D1B2A] hover:bg-[#07111F] border border-[#2563EB]/30 hover:border-[#06B6D4] text-[#A7B4C7] hover:text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                <span>Or View on Amazon Partner Store</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#06B6D4]" />
              </button>
            </div>

            {/* 5. DELIVERY & WARRANTY SUMMARY CARDS */}
            <div className="pt-4 border-t border-[#2563EB]/20 space-y-3 text-xs text-[#A7B4C7]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>
                  <strong className="text-white">{shippingCost}:</strong> {estimatedDelivery}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>
                  <strong className="text-white">Warranty:</strong> {warrantyInfo}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#7C3AED] shrink-0" />
                <span>
                  <strong className="text-white">Returns:</strong> {returnPeriod}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EMI PLANS MODAL */}
      {showEmiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#111F33] border border-[#2563EB]/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#2563EB]/20">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#06B6D4]" />
                <h3 className="font-display text-lg font-bold text-white">No-Cost & Low-Cost EMI Tenures</h3>
              </div>
              <button
                onClick={() => setShowEmiModal(false)}
                className="p-1 rounded-lg text-[#A7B4C7] hover:text-white hover:bg-[#0D1B2A] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#A7B4C7]">
              Select from verified credit/debit card partner tenures for{' '}
              <strong className="text-white">{product.name}</strong> at net selling price{' '}
              <strong className="text-[#06B6D4] font-mono">{formatPrice(finalPrice)}</strong>.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#2563EB]/20 text-[#A7B4C7] font-mono">
                    <th className="py-2">Bank / Partner</th>
                    <th className="py-2">Tenure</th>
                    <th className="py-2">Monthly Installment</th>
                    <th className="py-2">Annual Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2563EB]/15 text-white">
                  <tr>
                    <td className="py-3 font-semibold">HDFC Bank</td>
                    <td className="py-3">3 Months</td>
                    <td className="py-3 font-mono font-bold text-[#06B6D4]">{formatPrice(Math.round(finalPrice / 3))}/mo</td>
                    <td className="py-3 text-[#22C55E]">No Cost (0%)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">ICICI Bank</td>
                    <td className="py-3">6 Months</td>
                    <td className="py-3 font-mono font-bold text-[#06B6D4]">{formatPrice(Math.round(finalPrice / 6))}/mo</td>
                    <td className="py-3 text-[#22C55E]">No Cost (0%)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">SBI Card</td>
                    <td className="py-3">9 Months</td>
                    <td className="py-3 font-mono font-bold text-[#06B6D4]">{formatPrice(Math.round(finalPrice / 9))}/mo</td>
                    <td className="py-3 text-[#22C55E]">No Cost (0%)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Axis Bank & OneCard</td>
                    <td className="py-3">12 Months</td>
                    <td className="py-3 font-mono font-bold text-[#06B6D4]">{formatPrice(Math.round(finalPrice / 12))}/mo</td>
                    <td className="py-3 text-[#22C55E]">No Cost (0%)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold">Bajaj Finserv</td>
                    <td className="py-3">24 Months</td>
                    <td className="py-3 font-mono font-bold text-[#06B6D4]">{formatPrice(Math.round((finalPrice * 1.12) / 24))}/mo</td>
                    <td className="py-3 text-[#A7B4C7]">12% p.a.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-[#0D1B2A] border border-[#2563EB]/20 text-[11px] text-[#A7B4C7] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
              <span>
                No Cost EMI discount will be deducted upfront at final checkout payment stage upon entering your eligible card credentials.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. RELATED / ALTERNATIVE PRODUCTS */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-[#2563EB]/20 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider block mb-1">
                More in {product.category_name}
              </span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Recommended Hardware Alternatives
              </h3>
            </div>
            <a
              href={`/shop?category=${product.category_slug || product.category_id}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/shop?category=${product.category_slug || product.category_id}`);
              }}
              className="text-xs font-semibold text-[#A7B4C7] hover:text-[#06B6D4] transition-colors"
            >
              View All In {product.category_name} →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
