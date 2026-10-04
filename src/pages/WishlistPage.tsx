import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { navigateTo } from '../lib/router.ts';
import { Heart, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SeoHead } from '../components/SeoHead.tsx';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, formatPrice } = useStore();

  return (
    <div className="space-y-8">
      <SeoHead
        title="My Wishlist | Saved Electronics & Hardware"
        description="View your saved smartphones, laptops, smart TVs, and gaming gear. Move items to cart or check live stock availability."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2563EB]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7C3AED] uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Saved Hardware Portfolio</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C7] mt-1">
            Save items for future purchase, track price fluctuations, or directly transfer to your shopping cart.
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={() => {
              wishlist.forEach((prod) => addToCart(prod, 1));
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#2563EB]/25 hover:from-[#1d4ed8] hover:to-[#6d28d9] transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Cart</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-[#111F33] rounded-3xl border border-[#2563EB]/20 p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#0D1B2A] border border-[#2563EB]/30 text-[#7C3AED] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-display text-xl font-bold text-white">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-[#A7B4C7] max-w-md mx-auto">
            Explore our curated catalog of smartphones, laptops, 4K OLED TVs, and gaming peripherals and tap the heart icon on any card to save it here.
          </p>
          <button
            onClick={() => navigateTo('/shop')}
            className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#2563EB]/25 transition-all"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const salePrice = product.price ?? product.selling_price ?? 0;
            const mrp = product.original_price ?? product.mrp;
            const isOutOfStock = product.stock_status === 'out_of_stock';

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-[#111F33] border border-[#2563EB]/25 hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div
                    onClick={() => navigateTo(`/product/${product.slug}`)}
                    className="relative aspect-4/3 w-full bg-[#0D1B2A] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discount_percentage ? (
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#EF4444] text-white text-[10px] font-bold uppercase shadow">
                        Save {product.discount_percentage}%
                      </div>
                    ) : null}

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#07111F]/80 text-[#A7B4C7] hover:text-[#EF4444] transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase">
                      {product.brand}
                    </span>

                    <h3
                      onClick={() => navigateTo(`/product/${product.slug}`)}
                      className="text-sm font-bold text-white hover:text-[#06B6D4] cursor-pointer line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </h3>

                    {/* Stock status */}
                    <div className="flex items-center gap-1.5 text-[11px] font-medium">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isOutOfStock ? 'bg-red-400' : 'bg-[#22C55E]'
                        }`}
                      />
                      <span className={isOutOfStock ? 'text-red-400' : 'text-[#22C55E]'}>
                        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-base font-black text-white font-mono">
                        {formatPrice(salePrice)}
                      </span>
                      {mrp && mrp > salePrice && (
                        <span className="text-xs text-neutral-500 line-through font-mono">
                          {formatPrice(mrp)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions: Add to Cart & Remove */}
                <div className="p-4 pt-0 grid grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    disabled={isOutOfStock}
                    className={`col-span-3 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow ${
                      isOutOfStock
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-[#2563EB]/20'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2 rounded-xl bg-[#0D1B2A] hover:bg-red-500/20 text-[#A7B4C7] hover:text-[#EF4444] border border-[#2563EB]/20 flex items-center justify-center transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
