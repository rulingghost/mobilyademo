import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES, CAMPAIGNS } from '../data/furnitureData';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  CreditCard, 
  Compass, 
  Sparkles, 
  MapPin, 
  Flame, 
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const HomePage = () => {
  const { products, navigateTo, setSelectedCategory, setIsShowroomModalOpen } = useStore();

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "2026 Oturma Grubu Trendleri",
      highlight: "Zarafet ve Üstün Konfor",
      description: "Yatak olabilen Zero-Wall mekanizması, robot süpürge uyumlu ayakları ve kolay temizlenen dokuma kumaşlarıyla evinizin yeni gözdesi.",
      ctaText: "Koltuk Takımlarını Keşfet",
      category: "oturma-grubu",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=85",
      badge: "YENİ SEZON KOLEKSİYONU"
    },
    {
      title: "Yatak Odasında Doğal Ahşap Huzuru",
      highlight: "Venedik Elegance Serisi",
      description: "Nefes alan keten döşemeli yatak başlıkları, LED aydınlatmalı geniş gardıroplar ve frenli sessiz çekmeceler.",
      ctaText: "Yatak Odalarını İncele",
      category: "yatak-odasi",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=85",
      badge: "PEŞİN FİYATINA 9 TAKSİT"
    },
    {
      title: "Açılır Mermer & Ahşap Masalar",
      highlight: "Monza Ziyafet Sofraları",
      description: "Tek hareketle 6 kişiden 10 kişiye uzayan senkronize mekanizmalı masalar ve konforlu kavisli sandalyeler.",
      ctaText: "Yemek Odalarını İncele",
      category: "yemek-odasi",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=85",
      badge: "ÜCRETSİZ MONTAJ DAHİL"
    }
  ];

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const [activeTabCategory, setActiveTabCategory] = useState('oturma-grubu');

  const tabFilteredProducts = products.filter(p => p.category === activeTabCategory).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO CAROUSEL SLIDER (İstikbal Style) */}
      <section className="relative overflow-hidden bg-stone-900 min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
            />
            {/* Gradient Overlay for high-end editorial text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-6 sm:px-12 lg:px-16">
              <div className="max-w-2xl text-white space-y-5">
                
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-600/90 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  {slide.title} <br />
                  <span className="text-amber-400 font-normal italic">{slide.highlight}</span>
                </h1>

                <p className="text-xs sm:text-base text-stone-200 font-light leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedCategory(slide.category);
                      navigateTo('catalog', null, slide.category);
                    }}
                    className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsShowroomModalOpen(true)}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl text-xs sm:text-sm font-semibold transition"
                  >
                    Mağazada Deneyimle
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-stone-900 flex items-center justify-center transition backdrop-blur-md shadow-md"
          aria-label="Önceki Slayt"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-stone-900 flex items-center justify-center transition backdrop-blur-md shadow-md"
          aria-label="Sonraki Slayt"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === i ? 'w-8 bg-amber-500' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>

      </section>

      {/* 2. CORPORATE SERVICES STRIP (İstikbal 4 Direk Servis) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          
          <div className="flex items-center gap-4 pt-3 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Ücretsiz Teslimat & Montaj</h4>
              <p className="text-xs text-stone-500 mt-0.5">Kendi uzman marangoz ekibimiz kurar</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Peşin Fiyatına 9 Taksit</h4>
              <p className="text-xs text-stone-500 mt-0.5">Tüm banka kartlarına vade farksız</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">2 Yıl Tam Garanti</h4>
              <p className="text-xs text-stone-500 mt-0.5">10 yıl iskelet dayanım güvencesi</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Ücretsiz Mimari Destek</h4>
              <p className="text-xs text-stone-500 mt-0.5">3D oda yerleşim danışmanlığı</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR CATEGORIES DISCOVERY (İstikbal Style Circle & Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Evini Keşfet</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mt-0.5">
              Popüler Mobilya Kategorileri
            </h2>
          </div>
          <button
            onClick={() => { setSelectedCategory('all'); navigateTo('catalog', null, 'all'); }}
            className="text-xs font-bold text-stone-800 hover:text-amber-700 flex items-center gap-1 group"
          >
            <span>Tüm Kategoriler</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                navigateTo('catalog', null, cat.id);
              }}
              className="group cursor-pointer bg-white rounded-2xl p-3 border border-stone-200 hover:border-amber-600/60 hover:shadow-md transition text-center space-y-2.5"
            >
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={cat.bannerImg}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-xs text-stone-900 group-hover:text-amber-700 transition">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS TABBED SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Öne Çıkanlar</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 mt-0.5">
              Haftanın Yıldız Mobilyaları
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {[
              { id: 'oturma-grubu', label: 'Oturma Grubu' },
              { id: 'yemek-odasi', label: 'Yemek Odası' },
              { id: 'yatak-odasi', label: 'Yatak Odası' },
              { id: 'kose-takimi', label: 'Köşe Takımları' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTabCategory(tab.id)}
                className={`px-4 py-2 rounded-xl transition ${
                  activeTabCategory === tab.id
                    ? 'bg-[#1E2229] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabFilteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. ÇEYİZ & DÜĞÜN PAKETİ KAMPANYA BANNERI (İstikbal Special) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#1E2229] via-[#2A313D] to-[#1E2229] text-white p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>2026 Çeyiz & Evlilik Kampanyası</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight">
                3 Takım Alışverişinizde <br />
                <span className="text-amber-400">15.000 TL Anında İndirim</span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light max-w-lg">
                Koltuk Takımı + Yemek Odası + Yatak Odası kombinasyonlarında geçerli özel evlilik paketi indirimi! Peşin fiyatına 9 taksit ve düğün tarihinize kadar ücretsiz emanet depolarımızda bekletme imkanı.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    navigateTo('catalog');
                  }}
                  className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md"
                >
                  Kampanyalı Koleksiyonu İncele
                </button>
                <div className="text-xs text-stone-300 font-mono bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/20">
                  Kupon Kodu: <strong className="text-amber-300">CEYIZ2026</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                  alt="Mobilya Evlilik Paketi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SHOWROOM & STORE DISCOVERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 rounded-3xl p-8 sm:p-12 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Deneyim Alanları</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900">
              Türkiye Genelinde 45 Konsept Showroom
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Koltuklarımızın konforunu bizzat test edin, kumaş kartelalarımıza dokunun ve ücretsiz iç mimarlık hizmetimizle evinizi 3 boyutlu planlayın.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsShowroomModalOpen(true)}
              className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>En Yakın Mağazayı Bul</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
