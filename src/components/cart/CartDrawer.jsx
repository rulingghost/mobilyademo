import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    cartSubtotal, 
    discountAmount, 
    grandTotal, 
    totalCartCount, 
    updateQuantity, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    navigateTo 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-2xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Alışveriş Sepetim
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold">
                  {totalCartCount} Parça
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Guarantee Banner */}
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center gap-2 text-xs text-amber-900">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Tüm mobilyalarda <strong>Ücretsiz Teslimat & Montaj</strong> dahildir.</span>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Sepetiniz Boş</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                    Koleksiyonumuzdaki şık mobilyaları keşfedip sepetinize ekleyebilirsiniz.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('catalog');
                  }}
                  className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition"
                >
                  Koleksiyonu İncele
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const { cartItemId, id, quantity, product, calculatedPrice, selectedColor, selectedModuleNames } = item;
                const itemKey = cartItemId || id;

                return (
                  <div 
                    key={itemKey} 
                    className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs flex gap-3 items-start"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-20 h-20 object-cover rounded-xl border border-stone-100 shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('detail', product.id);
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('detail', product.id);
                          }}
                          className="font-bold text-xs text-stone-900 line-clamp-1 cursor-pointer hover:text-amber-800 transition"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(itemKey)}
                          className="text-stone-400 hover:text-rose-600 transition p-1"
                          title="Ürünü Çıkar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Selected color */}
                      {selectedColor && (
                        <p className="text-[11px] text-amber-800 font-medium mt-0.5">
                          Renk: {selectedColor}
                        </p>
                      )}

                      {/* Selected modules summary */}
                      {selectedModuleNames && selectedModuleNames.length > 0 && (
                        <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                          Parçalar: {selectedModuleNames.join(' + ')}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                          <button
                            onClick={() => updateQuantity(itemKey, -1)}
                            className="p-1 hover:text-black text-stone-600 disabled:opacity-40"
                            disabled={quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-900">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(itemKey, 1)}
                            className="p-1 hover:text-black text-stone-600"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-stone-950 font-serif">
                            {(calculatedPrice * quantity).toLocaleString('tr-TR')} ₺
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Actions & Price Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-3.5">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-950 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-amber-700" />
                      <span>{appliedCoupon.code} ({appliedCoupon.label})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-500 hover:text-rose-600 text-xs font-bold"
                    >
                      Kaldır
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="İndirim Kuponu (örn: BAHAR15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs uppercase placeholder:normal-case focus:outline-none focus:border-stone-800"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Uygula
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Ara Toplam</span>
                  <span className="font-semibold text-stone-900">{cartSubtotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Kampanya İndirimi ({appliedCoupon?.code})</span>
                    <span>-{discountAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Teslimat & Kat İçi Montaj</span>
                  <span className="text-emerald-700 font-bold uppercase text-[11px]">Ücretsiz</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="font-serif text-sm font-bold text-stone-900">Toplam Tutar</span>
                  <span className="font-serif text-lg font-bold text-stone-950">
                    {grandTotal.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#1E2229] hover:bg-stone-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition"
              >
                <span>Siparişi Tamamla</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-400">
                Peşin Fiyatına 9 Taksit • 256-Bit SSL Korumalı Güvenli Ödeme
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
