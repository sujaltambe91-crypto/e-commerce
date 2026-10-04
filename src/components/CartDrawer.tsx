import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { X, Trash2, Plus, Minus, ExternalLink, ShoppingBag, ShieldCheck } from 'lucide-react';
import { navigateTo } from '../lib/router.ts';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    formatPrice,
    trackAndRedirect,
  } = useStore();

  if (!isCartOpen) return null;

  const totalEstimatedPrice = cart.reduce((total, item) => {
    return total + (item.product.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <div>
                <h2 className="text-base font-bold text-white leading-none">
                  Saved Products & Shopping List
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Amazon Affiliate Notice Banner */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-3 flex items-start gap-2.5 text-xs text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Affiliate Partner Notice:</strong> Items saved here are curated from Amazon. Checkout and final fulfillment are completed directly on Amazon via official partner links.
            </p>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                <ShoppingBag className="w-12 h-12 text-neutral-700 mb-3" />
                <h3 className="text-base font-semibold text-neutral-300">
                  Your saved list is empty
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                  Browse our catalog and tap the heart icon to curate your personal shopping list.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('/shop');
                  }}
                  className="mt-5 px-4 py-2 bg-amber-500 text-neutral-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 group"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo(`/product/${product.slug}`);
                        }}
                        className="text-xs font-semibold text-neutral-200 hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-white font-mono mt-0.5">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/60">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-700/80 rounded-md bg-neutral-900">
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          className="p-1 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          className="p-1 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Buy on Amazon direct button */}
                      <button
                        onClick={() => trackAndRedirect(product)}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <span>Buy on Amazon</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-400">Total Estimated Value</span>
                <span className="text-base font-bold text-white font-mono">
                  {formatPrice(totalEstimatedPrice)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-2.5 text-xs text-neutral-400 hover:text-neutral-200 border border-neutral-800 hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    // Open first saved item or open detail
                    if (cart.length > 0) {
                      trackAndRedirect(cart[0].product);
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-xl transition-all shadow-md active:scale-98"
                >
                  <span>Checkout Deal on Amazon</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
