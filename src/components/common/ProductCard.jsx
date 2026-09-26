import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Sparkles, Truck, Check, CreditCard } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    setQuickViewProduct,
    setInstallmentProduct 
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const activePrice = product.discountPrice || product.basePrice || product.price;
  const installment9 = Math.round(activePrice / 9);

  return (
    <div className="group relative bg-white rounded-2xl p-3 border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col justify-between">
      
      {/* Image Container with Badges */}
      <div 
        onClick={() => navigateTo('detail', product.id)}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100 cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.tag && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1E2229] text-white shadow-xs">
              {product.tag}
            </span>
          )}
          {product.discountPrice && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-600 text-white shadow-xs">
              Özel Fiyat
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition ${
            isFavorited 
              ? 'bg-rose-50 text-rose-600 shadow-md scale-105' 
              : 'bg-white/90 text-stone-600 hover:text-black hover:bg-white shadow-sm'
          }`}
          aria-label="Favorilere ekle"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button (Hover only) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="pointer-events-auto px-4 py-2 bg-white/95 text-stone-900 rounded-full text-xs font-bold shadow-lg hover:bg-white flex items-center gap-1.5 transition"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" /> Hızlı Bakış
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="pt-3 pb-1 px-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Collection Name & Category */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="font-semibold text-amber-700 uppercase tracking-wide">{product.collection || product.categoryName}</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
              <Truck className="w-3 h-3" /> Ücretsiz Montaj
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => navigateTo('detail', product.id)}
            className="font-bold text-sm text-stone-900 group-hover:text-amber-800 cursor-pointer line-clamp-1 transition"
          >
            {product.name}
          </h3>

          {/* Short feature summary */}
          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
            {product.shortDescription || product.features?.[0]}
          </p>

          {/* Color swatches if available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] text-stone-400 font-medium">Renkler:</span>
              <div className="flex gap-1">
                {product.colors.map((c, i) => (
                  <span
                    key={i}
                    title={c.name}
                    className="w-3 h-3 rounded-full border border-stone-300 shadow-2xs"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Installment Bottom Strip */}
        <div className="pt-3 mt-2 border-t border-stone-100 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-stone-950 font-serif">
                {activePrice.toLocaleString('tr-TR')} ₺
              </span>
              {product.discountPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {(product.basePrice || product.price).toLocaleString('tr-TR')} ₺
                </span>
              )}
            </div>

            {/* Installment Badge (İstikbal Style) */}
            <button
              onClick={() => setInstallmentProduct(product)}
              className="text-[10px] font-semibold text-stone-600 hover:text-amber-800 flex items-center gap-1 mt-0.5"
            >
              <CreditCard className="w-2.5 h-2.5 text-stone-400" />
              <span>{installment9.toLocaleString('tr-TR')} ₺ × 9 Taksit</span>
            </button>
          </div>

          {/* Action button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 bg-[#1E2229] hover:bg-amber-700 text-white rounded-xl transition shadow-xs"
            title="Sepete Ekle"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
