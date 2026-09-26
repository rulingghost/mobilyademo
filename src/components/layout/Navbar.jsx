import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Truck, 
  CreditCard, 
  PackageCheck, 
  ChevronDown, 
  ChevronRight,
  Flame,
  Clock
} from 'lucide-react';
import { CATEGORIES } from '../../data/furnitureData';

export const Navbar = () => {
  const { 
    totalCartCount, 
    wishlist, 
    cartSubtotal,
    setIsCartOpen, 
    setIsShowroomModalOpen,
    setIsAuthModalOpen,
    activeTab, 
    navigateTo, 
    setSelectedCategory, 
    products,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Live search matched items
  const matchedProducts = searchQuery.trim().length > 1 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.collection?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('catalog', null, catId);
    setIsMobileMenuOpen(false);
  };

  const handleSearchItemClick = (productId) => {
    navigateTo('detail', productId);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('catalog');
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-stone-200">
      
      {/* 1. TOP UTILITY STRIP (İstikbal Style) */}
      <div className="bg-[#1E2229] text-stone-300 text-xs py-2 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:4443344" className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">444 33 44</span> Müşteri Hizmetleri
            </a>
            <span className="text-stone-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-stone-400">
              Peşin Fiyatına 9 Taksit & Ücretsiz Teslimat / Montaj
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <button 
              onClick={() => setIsShowroomModalOpen(true)}
              className="hover:text-amber-400 transition flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Mağazalarımız
            </button>
            <span className="text-stone-600">|</span>
            <button 
              onClick={() => navigateTo('orders')}
              className="hover:text-white transition flex items-center gap-1"
            >
              <PackageCheck className="w-3.5 h-3.5 text-stone-400" /> Sipariş Takibi
            </button>
            <span className="text-stone-600">|</span>
            <button 
              onClick={() => setIsShowroomModalOpen(true)}
              className="hover:text-white transition"
            >
              İç Mimar Desteği
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 hover:bg-stone-100 rounded-xl transition"
            aria-label="Menüyü Aç"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Corporate Brand Logo: MOBİLYA */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex flex-col items-start select-none group shrink-0"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1E2229]">
                MOBİLYA
              </span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-amber-600"></span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold -mt-0.5">
              Evinizin En Güzel Hali
            </span>
          </div>

          {/* Search Bar with live autocomplete */}
          <div className="hidden md:flex flex-1 max-w-xl relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full flex">
              <input
                type="text"
                placeholder="Mobilya, koltuk takımı, yatak odası, masa ara..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-4 pr-24 py-2.5 bg-stone-100/90 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-800 focus:bg-white transition"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-[#1E2229] hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Ara</span>
              </button>
            </form>

            {/* Live Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50 animate-in fade-in duration-150">
                <div className="p-3 border-b border-stone-100 bg-stone-50 text-xs font-semibold text-stone-600 flex justify-between">
                  <span>Arama Sonuçları ({matchedProducts.length})</span>
                  <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-stone-800">Temizle</button>
                </div>
                {matchedProducts.length > 0 ? (
                  <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                    {matchedProducts.map((p) => {
                      const activePrice = p.discountPrice || p.basePrice || p.price;
                      return (
                        <div
                          key={p.id}
                          onClick={() => handleSearchItemClick(p.id)}
                          className="p-3 flex items-center gap-3 hover:bg-stone-50 cursor-pointer transition"
                        >
                          <img 
                            src={p.images[0]} 
                            alt={p.name} 
                            className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-stone-900 truncate">{p.name}</p>
                            <span className="text-[11px] text-stone-500">{p.categoryName}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-stone-900">
                              {activePrice.toLocaleString('tr-TR')} ₺
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div 
                      onClick={() => {
                        navigateTo('catalog');
                        setIsSearchFocused(false);
                      }}
                      className="p-2.5 text-center text-xs font-bold text-stone-800 hover:bg-stone-100 cursor-pointer border-t"
                    >
                      Tüm sonuçları katalogda gör →
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-stone-500">
                    "{searchQuery}" için eşleşen mobilya bulunamadı.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Customer Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-3">
            
            {/* Showrooms Button */}
            <button
              onClick={() => setIsShowroomModalOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-semibold transition"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Mağazalar</span>
            </button>

            {/* Account / Login Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-semibold transition"
            >
              <User className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Hesabım</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
              title="Favorilerim"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 bg-[#1E2229] hover:bg-stone-800 text-white rounded-xl transition shadow-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 text-stone-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-[10px] text-stone-300 font-medium">Sepetim</span>
                <span className="text-xs font-bold text-white">
                  {cartSubtotal > 0 ? `${cartSubtotal.toLocaleString('tr-TR')} ₺` : '0 ₺'}
                </span>
              </div>
            </button>

          </div>

        </div>
      </div>

      {/* 3. CATEGORY MEGA NAVIGATION (İstikbal Style) */}
      <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 py-2.5 border-t border-stone-200 bg-stone-50/70 text-xs font-bold uppercase tracking-wider text-stone-700">
        <button
          onClick={() => handleCategoryClick('all')}
          className="hover:text-black py-1 border-b-2 border-transparent hover:border-stone-900 transition"
        >
          Tüm Ürünler
        </button>
        {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="hover:text-black py-1 border-b-2 border-transparent hover:border-stone-900 transition"
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => handleCategoryClick('all')}
          className="py-1 text-rose-700 hover:text-rose-900 flex items-center gap-1 transition"
        >
          <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>Kampanyalar</span>
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-6 py-6 space-y-6 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Mobilya ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-100 rounded-xl text-xs text-stone-900"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 pb-1">Mobilya Kategorileri</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="w-full flex items-center justify-between py-2 text-xs font-semibold text-stone-800 hover:text-black border-b border-stone-100"
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => { setIsShowroomModalOpen(true); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-xs font-semibold text-stone-800"
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Mağazalarımız & Showroom Bul</span>
            </button>
            <button
              onClick={() => { navigateTo('orders'); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-xs font-semibold text-stone-800"
            >
              <PackageCheck className="w-4 h-4 text-stone-600" />
              <span>Sipariş Sorgulama / Takip</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
