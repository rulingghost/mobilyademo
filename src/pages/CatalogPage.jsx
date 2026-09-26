import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/furnitureData';
import { 
  ArrowLeft, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  Check, 
  ArrowUpDown, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const CatalogPage = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    goBack,
    navigateTo 
  } = useStore();

  const [priceRange, setPriceRange] = useState(100000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'price-asc' | 'price-desc' | 'popular'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available function filter options (İstikbal style)
  const availableFeatures = [
    "Yatak Olabilme",
    "Sandıklı Saklama",
    "Açılır Masa",
    "Robot Süpürge Uyumlu",
    "Doğal Ahşap / Meşe"
  ];

  const availableColors = [
    { label: "Vizon / Kum Beji", hex: "#D6CCC2" },
    { label: "Antrasit Gri", hex: "#3A3B3C" },
    { label: "Doğal Ahşap / Meşe", hex: "#C7B299" },
    { label: "Taba / Kahve", hex: "#9E643C" },
    { label: "Beyaz / Fildişi", hex: "#F3EFEA" }
  ];

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Live search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mName = product.name.toLowerCase().includes(q);
        const mCat = product.categoryName?.toLowerCase().includes(q);
        const mCol = product.collection?.toLowerCase().includes(q);
        const mDesc = product.description?.toLowerCase().includes(q);
        if (!mName && !mCat && !mCol && !mDesc) return false;
      }

      // Price filter
      const activePrice = product.discountPrice || product.basePrice || product.price;
      if (activePrice > priceRange) return false;

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors?.some(c => 
          selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase()) || sc.toLowerCase().includes(c.name.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Feature filter
      if (selectedFeatures.length > 0) {
        const fullDesc = `${product.description} ${product.features?.join(' ')} ${product.shortDescription}`.toLowerCase();
        const matchesAll = selectedFeatures.every(f => {
          if (f === "Yatak Olabilme") return fullDesc.includes('yatak');
          if (f === "Sandıklı Saklama") return fullDesc.includes('sandık');
          if (f === "Açılır Masa") return fullDesc.includes('açılır');
          if (f === "Robot Süpürge Uyumlu") return fullDesc.includes('robot süpürge');
          if (f === "Doğal Ahşap / Meşe") return fullDesc.includes('ahşap') || fullDesc.includes('meşe') || fullDesc.includes('ceviz');
          return true;
        });
        if (!matchesAll) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.basePrice || a.price;
      const priceB = b.discountPrice || b.basePrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); // 'recommended'
    });
  }, [products, selectedCategory, searchQuery, priceRange, selectedColors, selectedFeatures, sortBy]);

  const toggleColor = (label) => {
    const key = label.split('/')[0].trim();
    setSelectedColors(prev => 
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    );
  };

  const toggleFeature = (feat) => {
    setSelectedFeatures(prev =>
      prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedColors([]);
    setSelectedFeatures([]);
    setPriceRange(100000);
    setSearchQuery('');
    setSortBy('recommended');
  };

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) +
    selectedColors.length +
    selectedFeatures.length +
    (priceRange < 100000 ? 1 : 0);

  const currentCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Tüm Mobilyalar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Working Navigation Header: Back Button & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri Dön</span>
          </button>

          <nav className="flex items-center gap-2 text-xs text-stone-500">
            <button onClick={() => navigateTo('home')} className="hover:text-stone-900">Anasayfa</button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-semibold">{currentCategoryName}</span>
          </nav>
        </div>

        {/* Sorting Dropdown & Mobile Filter Trigger */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 flex items-center gap-2 shadow-2xs"
          >
            <Filter className="w-4 h-4 text-stone-600" />
            <span>Filtreler ({activeFilterCount})</span>
          </button>

          <div className="relative flex items-center bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-stone-900 font-semibold focus:outline-none cursor-pointer pr-4"
            >
              <option value="recommended">Önerilen Sıralama</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="popular">En Çok Satanlar & Puan</option>
            </select>
          </div>
        </div>

      </div>

      {/* 2. Main Title Strip */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
          {currentCategoryName}
        </h1>
        <p className="text-xs text-stone-500">
          Evinizin konforunu artıran {filteredProducts.length} adet seçkin mobilya modeli listeleniyor.
        </p>
      </div>

      {/* 3. Catalog Layout (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* SIDEBAR FILTERS (İstikbal Style) */}
        <aside className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm sticky top-24`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-700" />
              <h3 className="font-bold text-stone-900 text-sm">Filtreler</h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-amber-700 hover:text-stone-900 font-semibold flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" /> Sıfırla
              </button>
            )}
          </div>

          {/* 1. Categories */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Mobilya Kategorisi
            </label>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = cat.id === 'all' 
                  ? products.length 
                  : products.filter(p => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-[#1E2229] text-white'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-stone-800 text-stone-200' : 'bg-stone-100 text-stone-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Price Range Slider */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-stone-400">Maksimum Bütçe</span>
              <span className="font-bold text-stone-900 font-serif">{priceRange.toLocaleString('tr-TR')} ₺</span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="2500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400">
              <span>10.000 ₺</span>
              <span>100.000 ₺</span>
            </div>
          </div>

          {/* 3. Fonksiyonellik Filtresi (İstikbal Style) */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Fonksiyonel Özellikler
            </label>
            <div className="space-y-1.5">
              {availableFeatures.map((feat) => {
                const isSelected = selectedFeatures.includes(feat);
                return (
                  <label
                    key={feat}
                    onClick={() => toggleFeature(feat)}
                    className="flex items-center gap-2.5 text-xs text-stone-700 hover:text-black cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 accent-stone-900 rounded"
                    />
                    <span>{feat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Renk Paleti */}
          <div className="pt-4 border-t border-stone-200 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
              Kumaş & Renk Tonu
            </label>
            <div className="space-y-1">
              {availableColors.map((col) => {
                const key = col.label.split('/')[0].trim();
                const isSelected = selectedColors.includes(key);
                return (
                  <button
                    key={col.label}
                    onClick={() => toggleColor(col.label)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition border ${
                      isSelected
                        ? 'border-stone-900 bg-stone-100 font-bold'
                        : 'border-transparent hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-2xs" 
                        style={{ backgroundColor: col.hex }} 
                      />
                      <span className="text-stone-800">{col.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-stone-900" />}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* PRODUCTS GRID AREA */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs">
              <span className="text-stone-500 font-medium">Seçili Filtreler:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 border border-stone-300 font-medium">
                  {currentCategoryName}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-black ml-1">×</button>
                </span>
              )}
              {selectedFeatures.map(f => (
                <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 border border-stone-300 font-medium">
                  {f}
                  <button onClick={() => toggleFeature(f)} className="hover:text-black ml-1">×</button>
                </span>
              ))}
              {selectedColors.map(c => (
                <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 border border-stone-300 font-medium">
                  Renk: {c}
                  <button onClick={() => toggleColor(c)} className="hover:text-black ml-1">×</button>
                </span>
              ))}
              {priceRange < 100000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 border border-stone-300 font-medium">
                  Max {priceRange.toLocaleString('tr-TR')} ₺
                  <button onClick={() => setPriceRange(100000)} className="hover:text-black ml-1">×</button>
                </span>
              )}
              <button 
                onClick={resetFilters}
                className="text-xs text-amber-700 hover:underline font-bold ml-auto"
              >
                Tümünü Temizle
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Aramanıza Uygun Mobilya Bulunamadı
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Kriterlerinize uygun mobilya bulunamadı. Filtreleri sıfırlayarak tüm koleksiyonumuzu inceleyebilirsiniz.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#1E2229] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
