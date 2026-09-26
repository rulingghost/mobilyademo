import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  CreditCard, 
  Ruler, 
  Sparkles, 
  ChevronRight, 
  Star, 
  MapPin, 
  Check, 
  Info,
  Share2,
  Calendar,
  RotateCcw,
  Plus,
  Minus,
  Layers,
  PackageCheck
} from 'lucide-react';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

export const ProductDetailPage = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    goBack,
    setInstallmentProduct,
    setIsShowroomModalOpen,
    showToast 
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "Standart");
  
  // İstikbal Style: Modül bazında adet seçimi (Örn: 3'lü Koltuk: 1 adet, Berjer: 2 adet)
  const [moduleQuantities, setModuleQuantities] = useState(() => {
    const initialMap = {};
    if (product?.modules) {
      product.modules.forEach(m => {
        initialMap[m.id] = m.defaultQty !== undefined ? m.defaultQty : (m.defaultSelected ? 1 : 0);
      });
    }
    return initialMap;
  });

  const [quantity, setQuantity] = useState(1); // Kaç takım alınacağı
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'dimensions' | 'care' | 'delivery'

  // Update modules if product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.colors?.[0]?.name || "Standart");
      if (product.modules) {
        const initialMap = {};
        product.modules.forEach(m => {
          initialMap[m.id] = m.defaultQty !== undefined ? m.defaultQty : (m.defaultSelected ? 1 : 0);
        });
        setModuleQuantities(initialMap);
      }
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold font-serif text-stone-900">Mobilya Bulunamadı</h2>
        <button 
          onClick={() => navigateTo('catalog')}
          className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold"
        >
          Kataloğa Dön
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  // Modül adet güncelleme (+ / -)
  const handleModuleQtyChange = (moduleId, delta) => {
    setModuleQuantities(prev => {
      const current = prev[moduleId] || 0;
      const target = Math.max(0, Math.min(10, current + delta));
      return { ...prev, [moduleId]: target };
    });
  };

  // Standart takım içeriğine dön (Reset)
  const handleResetToStandard = () => {
    if (!product.modules) return;
    const standardMap = {};
    product.modules.forEach(m => {
      standardMap[m.id] = m.defaultQty !== undefined ? m.defaultQty : (m.defaultSelected ? 1 : 0);
    });
    setModuleQuantities(standardMap);
    showToast('Tavsiye edilen standart takım içeriğine dönüldü.', 'info');
  };

  // Toplam seçili parça sayısı
  const totalPiecesInSet = product.modules
    ? Object.values(moduleQuantities).reduce((acc, q) => acc + q, 0)
    : 1;

  // Seçili modüllerin dinamik toplam fiyatı
  const chosenModulesTotal = product.modules && Object.keys(moduleQuantities).length > 0
    ? product.modules.reduce((sum, m) => {
        const qty = moduleQuantities[m.id] || 0;
        const unitPrice = m.unitPrice || m.price;
        return sum + (unitPrice * qty);
      }, 0)
    : (product.discountPrice || product.basePrice || product.price);

  const installment9 = Math.round(chosenModulesTotal / 9);

  const handleAddToCart = () => {
    if (totalPiecesInSet === 0) {
      showToast('Lütfen takımdan en az bir parça seçiniz.', 'warning');
      return;
    }
    addToCart(product, quantity, moduleQuantities, chosenModulesTotal, selectedColor);
  };

  const handleBuyNow = () => {
    if (totalPiecesInSet === 0) {
      showToast('Lütfen takımdan en az bir parça seçiniz.', 'warning');
      return;
    }
    addToCart(product, quantity, moduleQuantities, chosenModulesTotal, selectedColor);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Mobilya ürün bağlantısı kopyalandı.', 'info');
    }
  };

  // Complementary items
  const complementaryProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.category === 'tamamlayici'))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      {/* 1. Navigation Header: Back Button & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geri Dön</span>
        </button>

        <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto">
          <button onClick={() => navigateTo('home')} className="hover:text-stone-900 whitespace-nowrap">Anasayfa</button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <button onClick={() => { navigateTo('catalog', null, product.category); }} className="hover:text-stone-900 whitespace-nowrap">
            {product.categoryName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* 2. Main Product Display (Gallery + Purchasing Options) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0] || FALLBACK_IMAGE}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.tag && (
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#1E2229] text-white shadow-sm">
                  {product.tag}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-stone-800 backdrop-blur-md shadow-xs">
                SKU: {product.sku}
              </span>
            </div>

            {/* Floating Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-md transition"
                title="Paylaş"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition ${
                  isFavorited ? 'bg-rose-50 text-rose-600' : 'bg-white/90 hover:bg-white text-stone-700'
                }`}
                title="Favorilere Ekle"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === idx
                      ? 'border-stone-900 ring-2 ring-amber-500/40 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}

          {/* İstikbal Delivery & Assembly Promise Bar */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-3 text-stone-700">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-stone-900">Ücretsiz Nakliye & Kat Kurulumu</p>
                <p className="text-[11px] text-stone-500">Kendi profesyonel montaj ekibimizce yapılır</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-stone-700">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-stone-900">2 Yıl Mobilya Güvencesi</p>
                <p className="text-[11px] text-stone-500">10 yıl iskelet dayanım garantisi</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Title, İstikbal Style Module Quantities & Unit Prices (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Title & Collection */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              {product.collection || product.categoryName}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
              {product.name}
            </h1>

            {/* Ratings & Comments */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-stone-800">{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount} Müşteri Değerlendirmesi)</span>
            </div>
          </div>

          {/* Pricing & Installment Section */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  Seçili Takım Toplam Tutarı
                </span>
                <span className="font-serif text-3xl font-bold text-stone-950">
                  {chosenModulesTotal.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              {/* Installment Modal Trigger */}
              <button
                onClick={() => setInstallmentProduct({ ...product, customTotal: chosenModulesTotal })}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 flex items-center gap-1.5 transition shadow-2xs"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                <span>Taksit Seçenekleri</span>
              </button>
            </div>

            <p className="text-xs text-amber-800 font-medium">
              🌟 Peşin Fiyatına 9 Taksit: <strong>{installment9.toLocaleString('tr-TR')} ₺ / Ay</strong>
            </p>
          </div>

          {/* Kumaş & Renk Kartelası Seçici */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">Kumaş & Renk Seçimi:</span>
                <span className="font-semibold text-amber-700">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition ${
                      selectedColor === c.name
                        ? 'border-stone-900 bg-stone-100 font-bold shadow-xs'
                        : 'border-stone-200 hover:border-stone-400 bg-white'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-stone-300 shrink-0" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* İSTİKBAL TARZI: TAKIM İÇERİĞİ, ADET SAYISI VE ADET FİYATI TABLOSU */}
          {/* ============================================================== */}
          {product.modules && product.modules.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-stone-200">
              
              {/* Header with Reset Button */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-700" />
                    <span>Takım İçeriği ve Parça Adet Seçimi</span>
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    İstediğiniz parçanın adedini artırabilir, azaltabilir veya 0 yaparak takımdan çıkarabilirsiniz.
                  </p>
                </div>

                <button
                  onClick={handleResetToStandard}
                  className="px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-[11px] font-semibold text-stone-700 flex items-center gap-1.5 transition shrink-0 shadow-2xs"
                  title="Standart Takım İçeriğine Dön"
                >
                  <RotateCcw className="w-3 h-3 text-stone-500" />
                  <span>Varsayılan Takım</span>
                </button>
              </div>

              {/* Modules List / Card breakdown */}
              <div className="space-y-2.5">
                {product.modules.map((m) => {
                  const qty = moduleQuantities[m.id] || 0;
                  const unitPrice = m.unitPrice || m.price;
                  const lineTotal = unitPrice * qty;
                  const isSelected = qty > 0;

                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        isSelected 
                          ? 'border-stone-900 bg-stone-50/90 shadow-2xs' 
                          : 'border-stone-200 bg-white opacity-60 hover:opacity-90'
                      }`}
                    >
                      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
                        
                        {/* Piece Thumbnail & Info */}
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={m.image || product.images[0] || FALLBACK_IMAGE}
                            alt={m.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                            className="w-14 h-14 object-cover rounded-xl border border-stone-200 shrink-0 bg-stone-100"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-stone-900 truncate">
                                {m.name}
                              </h4>
                              {m.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                                  m.badge === 'Ana Parça'
                                    ? 'bg-amber-100 text-amber-900'
                                    : isSelected
                                      ? 'bg-emerald-100 text-emerald-900'
                                      : 'bg-stone-100 text-stone-600'
                                }`}>
                                  {m.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                              {m.desc || `Ölçüler: G: ${m.width} • D: ${m.depth} • Y: ${m.height} cm`}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] font-bold text-amber-900">
                                Adet Fiyatı: {unitPrice.toLocaleString('tr-TR')} ₺
                              </span>
                              <span className="text-[10px] text-stone-400">
                                ({m.width}×{m.depth}×{m.height} cm)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Counter & Line Total */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                          
                          {/* [-] QTY [+] Stepper */}
                          <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
                            <button
                              onClick={() => handleModuleQtyChange(m.id, -1)}
                              disabled={qty <= 0}
                              className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition"
                              title="Adet Azalt"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className={`w-8 text-center text-xs font-bold ${qty > 0 ? 'text-stone-900' : 'text-stone-400'}`}>
                              {qty}
                            </span>
                            <button
                              onClick={() => handleModuleQtyChange(m.id, 1)}
                              disabled={qty >= (m.maxQty || 10)}
                              className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition"
                              title="Adet Artır"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right min-w-[90px]">
                            {qty > 0 ? (
                              <div>
                                <span className="text-xs font-bold text-stone-950 font-serif block">
                                  {lineTotal.toLocaleString('tr-TR')} ₺
                                </span>
                                <span className="text-[10px] text-emerald-700 font-semibold">
                                  {qty} Adet Takımda
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span className="text-xs font-medium text-stone-400 block">
                                  0 ₺
                                </span>
                                <span className="text-[10px] text-stone-400">
                                  Çıkarıldı
                                </span>
                              </div>
                            )}
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Realtime Selection Summary Bar */}
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-amber-700" />
                  <span className="text-amber-950 font-medium">
                    Seçilen Takım İçeriği: <strong>{totalPiecesInSet} Parça</strong>
                  </span>
                </div>
                <span className="font-bold text-stone-900 font-serif text-sm">
                  Toplam: {chosenModulesTotal.toLocaleString('tr-TR')} ₺
                </span>
              </div>

            </div>
          )}

          {/* Set Multiplier + Add to Cart + Buy Now */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Set Multiplier Quantity */}
              <div className="flex items-center border border-stone-300 rounded-xl px-3 py-2.5 bg-white">
                <span className="text-[11px] text-stone-500 font-medium mr-2">Takım:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 font-bold text-stone-600 hover:text-black"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-2 text-sm font-bold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 font-bold text-stone-600 hover:text-black"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={totalPiecesInSet === 0}
                className="flex-1 py-3.5 px-6 bg-[#1E2229] hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sepete Ekle ({totalPiecesInSet} Parça)</span>
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={totalPiecesInSet === 0}
              className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-300 disabled:cursor-not-allowed text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
            >
              <span>Hemen Satın Al ({(chosenModulesTotal * quantity).toLocaleString('tr-TR')} ₺)</span>
            </button>

            {/* Showroom Visit Button */}
            <button
              onClick={() => setIsShowroomModalOpen(true)}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Mağazada İncelemek İçin Randevu Al</span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. Detailed Specification Tabs (İstikbal Style) */}
      <section className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm">
        
        {/* Tab Headers */}
        <div className="flex border-b border-stone-200 overflow-x-auto gap-4 sm:gap-8 pb-3">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Ürün Özellikleri & Fonksiyonlar
          </button>

          <button
            onClick={() => setActiveTab('dimensions')}
            className={`pb-2 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeTab === 'dimensions'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Modül ve Ölçü Tablosu
          </button>

          <button
            onClick={() => setActiveTab('care')}
            className={`pb-2 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeTab === 'care'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Kumaş & Temizlik Rehberi
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-2 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeTab === 'delivery'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Teslimat & Montaj Şartları
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-6">
          {activeTab === 'specs' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h4 className="font-bold text-stone-900 text-base mb-2">Tasarım & Fonksiyonel Ayrıntılar</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.features && (
                <div className="space-y-2">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-stone-700">Öne Çıkan Fonksiyonlar</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.technicalSpecs && (
                <div className="space-y-2">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-stone-700">Teknik Özellikler</h5>
                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs">
                    {Object.entries(product.technicalSpecs).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 p-3 bg-white">
                        <span className="font-medium text-stone-500">{key}</span>
                        <span className="font-bold text-stone-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'dimensions' && (
            <div className="space-y-4 max-w-4xl">
              <h4 className="font-bold text-stone-900 text-base">Modül ve Ölçü / Adet Fiyatı Tablosu</h4>
              <p className="text-xs text-stone-500">
                Oda yerleşimi ve modül bazında güncel birim fiyat dökümü:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                  <thead className="bg-stone-100 font-bold uppercase text-stone-700 text-[10px]">
                    <tr>
                      <th className="p-3">Görsel</th>
                      <th className="p-3">Modül Adı</th>
                      <th className="p-3 text-center">Ölçüler (G × D × Y)</th>
                      <th className="p-3 text-right">Adet Fiyatı</th>
                      <th className="p-3 text-center">Seçili Adet</th>
                      <th className="p-3 text-right">Toplam Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {product.modules ? (
                      product.modules.map(m => {
                        const qty = moduleQuantities[m.id] || 0;
                        const unitPrice = m.unitPrice || m.price;
                        return (
                          <tr key={m.id} className="hover:bg-stone-50">
                            <td className="p-2.5">
                              <img
                                src={m.image || product.images[0] || FALLBACK_IMAGE}
                                alt={m.name}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = FALLBACK_IMAGE;
                                }}
                                className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                              />
                            </td>
                            <td className="p-3 font-semibold text-stone-900">
                              {m.name}
                              {m.badge && (
                                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-normal">
                                  {m.badge}
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-center font-mono text-stone-600">
                              {m.width} × {m.depth} × {m.height} cm
                            </td>
                            <td className="p-3 text-right font-mono font-bold text-stone-900">
                              {unitPrice.toLocaleString('tr-TR')} ₺
                            </td>
                            <td className="p-3 text-center font-bold">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                qty > 0 ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-400'
                              }`}>
                                {qty} Adet
                              </span>
                            </td>
                            <td className="p-3 text-right font-mono font-bold text-stone-900">
                              {(unitPrice * qty).toLocaleString('tr-TR')} ₺
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="p-4 text-center text-stone-500">
                          Standart tek parça mobilya
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-stone-700 leading-relaxed">
              <h4 className="font-bold text-stone-900 text-base">Kumaş Temizliği ve Bakım Talimatı</h4>
              <p>
                Mobilya koleksiyonlarımızda kullanılan döşemelik kumaşlar leke tutmazlık apre testlerinden başarıyla geçmiştir.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-600">
                <li>Sıvı dökülmelerinde hemen kuru bir havlu veya peçete ile sıvıyı emdiriniz, ovalamayınız.</li>
                <li>Sabunlu ılık su ve mikrofiber bez yardımıyla dairesel hareketlerle siliniz.</li>
                <li>Ağartıcı, çamaşır suyu veya alkol bazlı kimyasallar kullanmayınız.</li>
                <li>Mobilyanızı doğrudan güneş ışığından ve yüksek ısı kaynaklarından (radyatör) koruyunuz.</li>
              </ul>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-stone-700 leading-relaxed">
              <h4 className="font-bold text-stone-900 text-base">Teslimat & Kurulum Güvencesi</h4>
              <p>{product.deliveryInstallInfo}</p>
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs space-y-1">
                <p className="font-bold">✓ Randevulu ve Özel Araçla Kata Teslimat</p>
                <p className="font-bold">✓ Kendi Bordrolu Marangoz Ekibimizce Oda İçi Montaj</p>
                <p className="font-bold">✓ Montaj Sonrası Ambalaj Atıklarının Geri Dönüşümü</p>
              </div>
            </div>
          )}
        </div>

      </section>

      {/* 4. Complementary Furniture Suggestions */}
      {complementaryProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Kombin Önerisi</span>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-stone-900">
                Bu Mobilyayı Tamamlayan Parçalar
              </h3>
            </div>
            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs font-bold text-stone-800 hover:text-amber-700"
            >
              Tüm Kataloğu Gör →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {complementaryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
