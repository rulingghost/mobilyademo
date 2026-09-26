import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Check, ShoppingBag, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    navigateTo, 
    setInstallmentProduct 
  } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct?.colors?.[0]?.name || "Standart");
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activePrice = product.discountPrice || product.basePrice || product.price;

  const handleAddToCart = () => {
    addToCart(product, qty, null, activePrice, selectedColor);
    setQuickViewProduct(null);
  };

  const handleGoToDetail = () => {
    navigateTo('detail', product.id);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 p-2 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 bg-stone-100 flex flex-col p-5 justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-2xs">
            <img
              src={product.images[selectedImgIndex] || product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";
              }}
              className="w-full h-full object-cover object-center"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-bold bg-[#1E2229] text-white shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    selectedImgIndex === idx ? 'border-stone-900 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";
                    }}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Summary & Purchase */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
              {product.collection || product.categoryName}
            </span>

            <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug mt-1">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-serif text-2xl font-bold text-stone-950">
                {activePrice.toLocaleString('tr-TR')} ₺
              </span>
              {product.discountPrice && (
                <span className="text-sm text-stone-400 line-through">
                  {(product.basePrice || product.price).toLocaleString('tr-TR')} ₺
                </span>
              )}
            </div>

            {/* Installment Badge */}
            <button
              onClick={() => {
                setInstallmentProduct(product);
                setQuickViewProduct(null);
              }}
              className="mt-1 text-xs text-amber-800 font-semibold hover:underline flex items-center gap-1"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Peşin Fiyatına 9 Taksit Seçenekleri →</span>
            </button>

            {/* Description */}
            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Color Swatch */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-bold text-stone-800">Renk Seçimi:</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition ${
                        selectedColor === c.name
                          ? 'border-stone-900 bg-stone-100 font-bold'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantees */}
            <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-2.5 text-xs text-stone-700">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ücretsiz Nakliye & Profesyonel Kat İçi Montaj Dahildir.</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-xl px-2.5 py-2 bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-2 text-stone-600 hover:text-black font-bold"
                  disabled={qty <= 1}
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-stone-900">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-2 text-stone-600 hover:text-black font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-[#1E2229] hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sepete Ekle</span>
              </button>
            </div>

            <button
              onClick={handleGoToDetail}
              className="w-full py-2 text-center text-xs font-bold text-stone-800 hover:text-amber-700 flex items-center justify-center gap-1 transition"
            >
              <span>Tüm Modül Ölçüleri ve Detay Sayfasına Git</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
