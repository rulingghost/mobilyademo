// VALENZA MOBİLYA - Kapsamlı Mobilya ve Koleksiyon Veri Tabanı
// İstikbal standartlarında zengin modüler takım yapıları, parça adetleri, adet fiyatları ve ölçü tabloları

export const CATEGORIES = [
  {
    id: "all",
    name: "Tüm Ürünler",
    slug: "tum-urunler",
    bannerImg: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: "oturma-grubu",
    name: "Oturma Grubu",
    slug: "oturma-grubu",
    tagline: "Koltuk Takımları, Berjerler & TV Üniteleri",
    bannerImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
    subcategories: ["Koltuk Takımları", "Köşe Takımları", "Berjerler", "TV Üniteleri", "Sehpalar"]
  },
  {
    id: "yemek-odasi",
    name: "Yemek Odası",
    slug: "yemek-odasi",
    tagline: "Yemek Odası Takımları, Açılır Masalar & Sandalyeler",
    bannerImg: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80",
    subcategories: ["Yemek Masası Takımları", "Açılır Masalar", "Sandalyeler", "Konsollar"]
  },
  {
    id: "yatak-odasi",
    name: "Yatak Odası",
    slug: "yatak-odasi",
    tagline: "Karyolalar, Gardıroplar, Şifonyerler & Komodinler",
    bannerImg: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    subcategories: ["Yatak Odası Takımları", "Karyola & Başlık", "Gardıroplar", "Komodin & Şifonyer"]
  },
  {
    id: "kose-takimi",
    name: "Köşe Takımları",
    slug: "kose-takimlari",
    tagline: "Yataklı & Sandıklı Konforlu L-Köşe Modelleri",
    bannerImg: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
    subcategories: ["L-Köşe Koltuklar", "Modüler Köşe Takımları", "Dinlenme Koltukları"]
  },
  {
    id: "yatak-baza",
    name: "Yatak & Baza",
    slug: "yatak-baza",
    tagline: "Ortopedik Yaylı Yataklar & Geniş Sandıklı Bazalar",
    bannerImg: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80",
    subcategories: ["Çift Kişilik Yataklar", "Sandıklı Bazalar", "Yatak Başlıkları", "Tek Kişilik Yataklar"]
  },
  {
    id: "calisma-odasi",
    name: "Çalışma & Genç Odası",
    slug: "calisma-odasi",
    tagline: "Ergonomik Çalışma Masaları & Kitaplıklar",
    bannerImg: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80",
    subcategories: ["Çalışma Masaları", "Kitaplıklar", "Çalışma Sandalyeleri"]
  },
  {
    id: "tamamlayici",
    name: "Sehpa & Tamamlayıcı",
    slug: "tamamlayici",
    tagline: "Doğal Taş & Masif Ahşap Sehpalar, Zemin Aynaları",
    bannerImg: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1600&q=80",
    subcategories: ["Orta Sehpalar", "Zigon Sehpalar", "Boy Aynaları", "Dresuarlar"]
  }
];

export const FURNITURE_PRODUCTS = [
  {
    id: "val-01",
    sku: "VLZ-OTR-101",
    name: "Milano Koltuk Takımı",
    category: "oturma-grubu",
    categoryName: "Oturma Grubu",
    collection: "Milano Exclusive",
    basePrice: 46900,
    discountPrice: 41500,
    rating: 4.9,
    reviewCount: 38,
    isNew: true,
    isFeatured: true,
    tag: "Yeni Sezon",
    shortDescription: "Geniş oturumlu, yatak olabilen Zero-Wall mekanizmalı ve yüksek konik ayaklı lüks koltuk takımı.",
    description: "Milano Koltuk Takımı, modern İtalyan siluetini fonksiyonel yaşam detaylarıyla buluşturuyor. Özel Zero-Wall mekanizması sayesinde koltuğu duvardan öne çekmeden tek bir hareketle çift kişilik yatak pozisyonuna getirebilirsiniz. 32 DNS ekstra yumuşak soft sünger dolgusu ve leke tutmayan dokuma kumaşı uzun ömürlü kullanım sunar.",
    colors: [
      { name: "Vizon / Kum Beji", hex: "#D6CCC2", code: "VZ-01" },
      { name: "Antrasit Gri", hex: "#3A3B3C", code: "AN-02" },
      { name: "Adaçayı Yeşili", hex: "#7E8A7A", code: "AD-03" },
      { name: "Taba / Karamel", hex: "#9E643C", code: "TB-04" }
    ],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
    ],
    // İstikbal Takım Modülleri (Her bir parçanın adet fiyatı, varsayılan takım adedi ve modül fotoğrafı)
    modules: [
      {
        id: "mod-m1",
        name: "3'lü Koltuk (Yataklı & Sandıklı)",
        unitPrice: 21500,
        price: 21500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 4,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80",
        width: 232,
        depth: 98,
        height: 86,
        badge: "Ana Parça",
        desc: "Zero-Wall çift kişilik yatak ve amortisörlü geniş sandık"
      },
      {
        id: "mod-m2",
        name: "2'li Koltuk",
        unitPrice: 14500,
        price: 14500,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 4,
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=80",
        width: 178,
        depth: 98,
        height: 86,
        badge: "Opsiyonel",
        desc: "Kompakt salonlar için konforlu ikili oturum alanı"
      },
      {
        id: "mod-m3",
        name: "Tekli Koltuk (Berjer)",
        unitPrice: 9500,
        price: 9500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 6,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80",
        width: 84,
        depth: 88,
        height: 92,
        badge: "Takıma Dahil",
        desc: "Yüksek ergonomik sırt destekli tekli berjer (Adet Fiyatı)"
      },
      {
        id: "mod-m4",
        name: "Kombin Puf",
        unitPrice: 4200,
        price: 4200,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 4,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80",
        width: 65,
        depth: 65,
        height: 44,
        badge: "Tamamlayıcı",
        desc: "Döşemeli ayak uzatma veya ekstra sehpa pufu"
      }
    ],
    features: [
      "Zero-Wall Yatak Mekanizması: Koltuğu öne çekmeden açılır",
      "Geniş Sandık Hacmi: Yorgan, battaniye ve yastık muhafazası",
      "14 cm Yüksek Ahşap Ayaklar: Robot süpürge kullanımına %100 uygun",
      "Silinebilir Leke Tutmaz Kumaş: Nemli bezle anında leke temizliği",
      "32 DNS HR Sünger ve S-Yaylı Ortopedik Sırt Desteği"
    ],
    technicalSpecs: {
      "İskelet Malzemesi": "Fırınlanmış Masif Gürgen Ağacı & Profil Çelik Karkas",
      "Kumaş Tipi": "İthal Leke Dirençli Dokuma Şönil Kumaş",
      "Oturum Yumuşaklığı": "Orta - Yumuşak Ortopedik Konfor",
      "Ayak Malzemesi": "Masif Ahşap Lake Kaplama",
      "Yatak Ölçüsü": "120 × 190 cm (Geniş Çift Kişilik)"
    },
    deliveryInstallInfo: "Türkiye geneli anlaşmalı teslimat filomuzla adresinize kata teslim ve profesyonel montaj ücretsiz olarak sağlanır.",
    warranty: "2 Yıl Üretici Garantisi + 10 Yıl İskelet Dayanım Güvencesi"
  },
  {
    id: "val-02",
    sku: "VLZ-YMK-202",
    name: "Monza Açılır Yemek Odası Takımı",
    category: "yemek-odasi",
    categoryName: "Yemek Odası",
    collection: "Monza Living",
    basePrice: 52900,
    discountPrice: 47500,
    rating: 5.0,
    reviewCount: 29,
    isNew: true,
    isFeatured: true,
    tag: "Çok Satan",
    shortDescription: "Doğal mermer desenli senkron açılır masa, konfor sandalyeler ve LED aydınlatmalı konsol takımı.",
    description: "Monza Yemek Odası, modern mimarinin dingin çizgilerini mermer dokusu ve sıcak ahşap tonlarıyla bir araya getiriyor. Senkronize mekanizmalı açılır masa mekanizması tek bir dokunuşla 6 kişilik masayı 8-10 kişilik geniş bir ziyafet alanına dönüştürür. Konsol içi gizli kaşıklık ve soft-close frenli raylar kullanım kolaylığı sağlar.",
    colors: [
      { name: "Ceviz & Calacatta Mermer", hex: "#4A3B32", code: "CW-01" },
      { name: "Doğal Meşe & Beyaz Mermer", hex: "#C7B299", code: "MK-02" },
      { name: "Dumanlı Antrasit", hex: "#2B2A29", code: "DM-03" }
    ],
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1200&q=80"
    ],
    modules: [
      {
        id: "mod-y1",
        name: "Senkron Açılır Yemek Masası",
        unitPrice: 23500,
        price: 23500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=500&q=80",
        width: 175,
        depth: 95,
        height: 78,
        badge: "Ana Parça",
        desc: "175 cm'den 220 cm'ye uzayan senkronize çelik raylı açılır tabla"
      },
      {
        id: "mod-y2",
        name: "Ergonomik Kavisli Sandalye",
        unitPrice: 3500,
        price: 3500,
        defaultQty: 4,
        defaultSelected: true,
        minQty: 0,
        maxQty: 12,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80",
        width: 54,
        depth: 58,
        height: 86,
        badge: "Takıma Dahil (Adet)",
        desc: "Leke tutmaz buklet kumaş, torna masif kayın ayak (Adet Fiyatı)"
      },
      {
        id: "mod-y3",
        name: "Konsol ve Aynası",
        unitPrice: 18500,
        price: 18500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=500&q=80",
        width: 210,
        depth: 48,
        height: 82,
        badge: "Takıma Dahil",
        desc: "Gizli kaşıklık bölmesi ve yavaş kapanan frenli kapaklar"
      },
      {
        id: "mod-y4",
        name: "LED Aydınlatmalı Cam Vitrin Dolabı",
        unitPrice: 9800,
        price: 9800,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=500&q=80",
        width: 90,
        depth: 45,
        height: 172,
        badge: "Opsiyonel",
        desc: "Dokunmatik açılan füme temperli cam kapaklı vitrin dolap"
      }
    ],
    features: [
      "Senkronize Kolay Açılır Mekanizma: 175 cm'den 220 cm'ye uzar",
      "Çizilmeye Dirençli Nano Yüzey Kaplama",
      "Tüm Çekmece ve Kapaklarda Yavaş Kapanan Frenli Menteşeler",
      "Konsol İçi Gizli Flok Kaplı Çatal-Kaşık Düzenleyici",
      "Ergonomik Sırt Eğimli Yumuşak Buklet Kumaş Sandalyeler"
    ],
    technicalSpecs: {
      "Masa Tablası": "1. Sınıf Doğal Ahşap Kaplama & Nano Mermer Efekti",
      "Konsol Gövdesi": "E1 Standartlarında Çevre Dostu Dayanıklı Panel",
      "Sandalye Ayakları": "Fırınlanmış Masif Kayın Torna Ayak",
      "Kapasite": "6-10 Kişilik Ayarlanabilir"
    },
    deliveryInstallInfo: "Uzman montaj ekibimiz konsol aynasını duvara güvenle sabitler, masayı kurup ambalaj atıklarını geri dönüşüme teslim eder.",
    warranty: "2 Yıl Garanti"
  },
  {
    id: "val-03",
    sku: "VLZ-YTK-303",
    name: "Venedik Yatak Odası Takımı",
    category: "yatak-odasi",
    categoryName: "Yatak Odası",
    collection: "Venedik Elegance",
    basePrice: 58900,
    discountPrice: 51900,
    rating: 4.8,
    reviewCount: 42,
    isNew: false,
    isFeatured: true,
    tag: "Klasik & Modern",
    shortDescription: "Kavisli keten yatak başlığı, geniş akordiyon gardırop, şifonyer ve komodin seti.",
    description: "Venedik Yatak Odası Takımı, yatak odanızı huzur dolu bir dinlenme mabedine çevirir. Nefes alabilen keten kumaş kaplı yatak başlığı akşamları kitap okurken veya dinlenirken mükemmel sırt desteği sunar. 6 kapaklı gardırop içindeki pantolonluk, ışıklı askı borusu ve çekmece modülleri ile gardırop düzenini kusursuz kılar.",
    colors: [
      { name: "Doğal Açık Meşe & Keten", hex: "#D8C7B5", code: "OM-01" },
      { name: "Ceviz & Fildişi", hex: "#5C4738", code: "CF-02" },
      { name: "Mat Beyaz & Altın Detay", hex: "#F3EFEA", code: "BA-03" }
    ],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
    ],
    modules: [
      {
        id: "mod-k1",
        name: "160x200 Karyola & Döşemeli Başlık",
        unitPrice: 19500,
        price: 19500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80",
        width: 185,
        depth: 215,
        height: 122,
        badge: "Ana Parça",
        desc: "Keten dokuma başlık ve ses yapmayan latalı ızgara karkas"
      },
      {
        id: "mod-k2",
        name: "6 Kapaklı Aynalı Gardırop",
        unitPrice: 29000,
        price: 29000,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=500&q=80",
        width: 250,
        depth: 62,
        height: 218,
        badge: "Takıma Dahil",
        desc: "Sensörlü LED askılık, dahili çekmeceler ve pantolonluk rayı"
      },
      {
        id: "mod-k3",
        name: "Şifonyer & LED Aydınlatmalı Ayna",
        unitPrice: 12500,
        price: 12500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80",
        width: 120,
        depth: 48,
        height: 86,
        badge: "Takıma Dahil",
        desc: "3 geniş frenli çekmece ve buğulanmaz dokunmatik LED ayna"
      },
      {
        id: "mod-k4",
        name: "Komodin",
        unitPrice: 3950,
        price: 3950,
        defaultQty: 2,
        defaultSelected: true,
        minQty: 0,
        maxQty: 4,
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
        width: 58,
        depth: 45,
        height: 52,
        badge: "Takıma Dahil (Adet)",
        desc: "Başucu için frenli raylı şık komodin (Adet Fiyatı)"
      }
    ],
    features: [
      "Gardırop İçi Sensörlü LED Askılık Aydınlatması",
      "Frenli Menteşeli ve Çarpmayı Önleyen Ray Sistemi",
      "Akustik İzolasyonlu Gizli Çekmece Bölmeleri",
      "160x200 ve 180x200 Standart Yatak Ölçülerine Uygunluk",
      "Ergonomik Dokulu Leke Tutmaz Keten Yatak Başlığı"
    ],
    technicalSpecs: {
      "Kapaklar": "Reflekte Füme Cam & Masif Ahşap Çerçeve",
      "Gövde": "Yüksek Yoğunluklu E1 Yongalevha & Melamin Yüzey",
      "Karyola Tabanı": "Ses Yapmayan Esnek Çelik Latalı Izgara Taban"
    },
    deliveryInstallInfo: "Tüm gardırop ve karyola parçaları odanızda ücretsiz birleştirilir ve teraziye alınır.",
    warranty: "2 Yıl Üretici Garantisi"
  },
  {
    id: "val-04",
    sku: "VLZ-KSE-404",
    name: "Pera Sandıklı Fonksiyonel L-Köşe Takımı",
    category: "kose-takimi",
    categoryName: "Köşe Takımları",
    collection: "Pera Comfort",
    basePrice: 38900,
    discountPrice: 34900,
    rating: 4.9,
    reviewCount: 51,
    isNew: true,
    isFeatured: true,
    tag: "Geniş Sandıklı",
    shortDescription: "Sağ/Sol yöne çevrilebilen modüler yapı, kolay açılır yatak mekanizması ve puf seçeneği.",
    description: "Pera Köşe Takımı, kompakt salonlardan geniş oturma odalarına kadar her alana uyum sağlayan yön değiştirebilir köşe yapısına sahiptir. Koltuk altındaki amortisörlü geniş sandık alanı evinizdeki tüm fazla eşyaları saklarken, tek hareketle açılan yatak mekanizması misafirleriniz için konforlu bir uyku alanı yaratır.",
    colors: [
      { name: "Kum Beji Buklet", hex: "#E3DAC9", code: "KB-01" },
      { name: "Koyu Antrasit", hex: "#353839", code: "KA-02" },
      { name: "Petrol Mavisi", hex: "#2A4B58", code: "PM-03" }
    ],
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
    ],
    modules: [
      {
        id: "mod-p1",
        name: "Pera L-Köşe Koltuk (Yataklı & Sandıklı)",
        unitPrice: 29500,
        price: 29500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=80",
        width: 285,
        depth: 195,
        height: 85,
        badge: "Ana Parça",
        desc: "Yön değiştirebilir modüler L-köşe, çift kişilik geniş yatak ve sandık"
      },
      {
        id: "mod-p2",
        name: "Pera Uyumlu Berjer",
        unitPrice: 7900,
        price: 7900,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 4,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80",
        width: 82,
        depth: 85,
        height: 90,
        badge: "Opsiyonel",
        desc: "Köşe kumaşı ile tam takım şık berjer (Adet Fiyatı)"
      },
      {
        id: "mod-p3",
        name: "Sandıklı Uzanma Pufu",
        unitPrice: 4500,
        price: 4500,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 3,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80",
        width: 75,
        depth: 75,
        height: 44,
        badge: "Opsiyonel",
        desc: "Amortisörlü saklama sandığına sahip puf"
      }
    ],
    features: [
      "Yönü Değiştirilebilir (Sağ/Sol Köşe Uyumlu)",
      "Emniyet Kilitli Çift Amortisörlü Geniş Sandık",
      "Açıldığında 145x210 cm Çift Kişilik Geniş Yatak",
      "Robot Süpürge Girişine Uygun 13 cm Ayak Yüksekliği"
    ],
    technicalSpecs: {
      "Sünger Tipi": "30 DNS Soft Sünger + 300 gr Elyaf Dolgu",
      "İskelet": "Masif Gürgen ve Metal Profil Karkas",
      "Kumaş": "Su İtici Özellikli Dokuma Buklet Kumaş"
    },
    deliveryInstallInfo: "Adresinize ücretsiz teslimat ve sağ/sol yön seçiminize göre uzman montaj yapılır.",
    warranty: "2 Yıl Garanti"
  },
  {
    id: "val-05",
    sku: "VLZ-YTK-505",
    name: "Alora Ortopedik Yatak & Sandıklı Baza Başlık Seti",
    category: "yatak-baza",
    categoryName: "Yatak & Baza",
    collection: "Alora Sleep System",
    basePrice: 28500,
    discountPrice: 24900,
    rating: 5.0,
    reviewCount: 64,
    isNew: false,
    isFeatured: true,
    tag: "Omurga Dostu",
    shortDescription: "5 Bölgeli paket yay sistemi, ortopedik yatak ve çelik amortisörlü sandıklı baza.",
    description: "Alora Yatak Seti, omurganın doğal eğrisini koruyan 5 bölgeli bağımsız Pocket Yay teknolojisine sahiptir. Eşlerin birbirlerinin gece dönüş hareketlerinden etkilenmesini önler. Altındaki çift emniyet kilitli sandıklı baza ise kışlık yorganlar ve eşyalarınız için devasa bir saklama alanı sağlar.",
    colors: [
      { name: "Keten Taş Beji", hex: "#D1C7BD", code: "TB-01" },
      { name: "Vizon Gri", hex: "#6D6875", code: "VG-02" },
      { name: "Koyu Antrasit", hex: "#343A40", code: "AN-03" }
    ],
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
    ],
    modules: [
      {
        id: "mod-a1",
        name: "160x200 Alora 5-Zone Pocket Yatak",
        unitPrice: 13500,
        price: 13500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80",
        width: 160,
        depth: 200,
        height: 32,
        badge: "Ana Parça",
        desc: "5 bölgeli omurga destekli bağımsız paket yay sistemi"
      },
      {
        id: "mod-a2",
        name: "160x200 Çift Sandıklı Çelik Baza",
        unitPrice: 11500,
        price: 11500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=500&q=80",
        width: 160,
        depth: 200,
        height: 38,
        badge: "Takıma Dahil",
        desc: "Emniyet mandallı çift kademeli amortisörlü çelik baza"
      },
      {
        id: "mod-a3",
        name: "Döşemeli Alora Yatak Başlığı",
        unitPrice: 5500,
        price: 5500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80",
        width: 175,
        depth: 10,
        height: 125,
        badge: "Takıma Dahil",
        desc: "Leke tutmaz şık dikiş detaylı yatak başlığı"
      }
    ],
    features: [
      "5 Bölgeli Bağımsız Pocket Yay (Eşlerin hareketlerini iletmez)",
      "Antibakteriyel ve Doğal Bambu Dokuma Kumaş",
      "Emniyet Mandallı Çift Kademeli Amortisör Kilit Sistemi",
      "Tamamen Çelik Profil Ağır Yük Taşıyıcı Baza İskeleti"
    ],
    technicalSpecs: {
      "Yatak Yüksekliği": "32 cm",
      "Sertlik Derecesi": "Orta - Sert Ortopedik",
      "Baza Derinliği": "28 cm Net İç Sandık Derinliği"
    },
    deliveryInstallInfo: "Odanıza kata taşınır, baza ayakları takılarak yatak yerleştirilir.",
    warranty: "2 Yıl Yatak Garantisi / 10 Yıl Yay Sistemi Garantisi"
  },
  {
    id: "val-06",
    sku: "VLZ-TV-606",
    name: "Verona TV Ünitesi & Duvar Konsolu",
    category: "oturma-grubu",
    categoryName: "Oturma Grubu",
    collection: "Verona Home",
    basePrice: 26500,
    discountPrice: 22900,
    rating: 4.7,
    reviewCount: 22,
    isNew: true,
    isFeatured: false,
    tag: "Trend Tasarım",
    shortDescription: "Oluklu ahşap paneller, füme cam vitrin, gizli kablo kanalı ve duvara asılan üst modül.",
    description: "Verona TV Ünitesi, teknolojik cihazların kablo karmaşasını şık bir estetikle gizler. Uzaktan kumanda sinyallerini geçiren özel füme cam kapağı ve oluklu ahşap el işçiliği detaylarıyla salonunuza zengin bir mimari hava katar. 85 inçe kadar tüm televizyon modellerine uygundur.",
    colors: [
      { name: "Ceviz & Füme Cam", hex: "#4B3621", code: "CF-01" },
      { name: "Doğal Meşe & Kum Taşı", hex: "#C2B280", code: "MS-02" }
    ],
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ],
    modules: [
      {
        id: "mod-v1",
        name: "TV Alt Sehpası (220 cm)",
        unitPrice: 16500,
        price: 16500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=80",
        width: 220,
        depth: 46,
        height: 55,
        badge: "Ana Parça",
        desc: "Füme cam kapaklı, kablo gizleme hazneli alt konsol"
      },
      {
        id: "mod-v2",
        name: "Duvar Askılı Üst Raf & Dolap",
        unitPrice: 8500,
        price: 8500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80",
        width: 140,
        depth: 25,
        height: 35,
        badge: "Takıma Dahil",
        desc: "Duvara gizli ankraj ile monte edilen kapaklı üst dolap"
      },
      {
        id: "mod-v3",
        name: "Yan Kitaplık & Vitrin Modülü",
        unitPrice: 6500,
        price: 6500,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=500&q=80",
        width: 50,
        depth: 35,
        height: 150,
        badge: "Opsiyonel",
        desc: "Dikey yerleşimli cam raflı dekoratif kitaplık"
      }
    ],
    features: [
      "Füme Cam Sayesinde Kumanda Sinyallerini Geçirir",
      "Gizli Kablo Geçiş Kanalları ve Havalandırma Menfezleri",
      "Blum Marka Soft-Close Frenli Çekmece Rayları",
      "Duvara Güvenli Askı ve Devrilmeyi Önleyici Ankraj Kiti"
    ],
    technicalSpecs: {
      "Malzeme": "Doğal Ahşap Kaplama & Temperli Füme Cam",
      "Taşıma Kapasitesi": "90 kg TV Yük Kapasitesi"
    },
    deliveryInstallInfo: "Alt konsol kurulumu ve üst rafın duvara montajı dahil ücretsiz montaj.",
    warranty: "2 Yıl Garanti"
  },
  {
    id: "val-07",
    sku: "VLZ-CLK-707",
    name: "Ponte Masif Ahşap Çalışma Masası & Kitaplık",
    category: "calisma-odasi",
    categoryName: "Çalışma & Genç Odası",
    collection: "Ponte Workspace",
    basePrice: 24500,
    discountPrice: 21500,
    rating: 4.9,
    reviewCount: 18,
    isNew: false,
    isFeatured: false,
    tag: "Masif Ahşap",
    shortDescription: "Amerikan masif ceviz tabla, elektrostatik siyah çelik ayaklar ve entegre sümen.",
    description: "Ponte Çalışma Masası, ev-ofis ortamınıza verimlilik ve lüks bir atmosfer katar. Geniş tablası dizüstü ve harici monitörler için ideal çalışma derinliği sağlarken, gizli kablo haznesi masa üzerindeki tüm priz ve adaptörleri saklar.",
    colors: [
      { name: "Doğal Amerikan Ceviz", hex: "#5C4033", code: "CV-01" },
      { name: "Açık Doğal Meşe", hex: "#C4A482", code: "MK-02" }
    ],
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
    ],
    modules: [
      {
        id: "mod-pt1",
        name: "Ponte Çalışma Masası (160 cm)",
        unitPrice: 16500,
        price: 16500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=500&q=80",
        width: 160,
        depth: 80,
        height: 76,
        badge: "Ana Parça",
        desc: "Doğal ceviz masif tabla ve gizli manyetik kablo kanalı"
      },
      {
        id: "mod-pt2",
        name: "4 Raflı Metal İskeletli Kitaplık",
        unitPrice: 8500,
        price: 8500,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 3,
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500&q=80",
        width: 85,
        depth: 35,
        height: 180,
        badge: "Opsiyonel",
        desc: "Elektrostatik siyah fırın boyalı çelik dikmeler ve masif raflar"
      },
      {
        id: "mod-pt3",
        name: "Tekerlekli Çekmeceli Keson",
        unitPrice: 4200,
        price: 4200,
        defaultQty: 0,
        defaultSelected: false,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
        width: 42,
        depth: 48,
        height: 58,
        badge: "Opsiyonel",
        desc: "Masa altına yanaşan kilitli 3 çekmeceli mobil keson"
      }
    ],
    features: [
      "Entegre Manyetik Kablo ve Şarj Cihazı Saklama Yuvası",
      "Yumuşak Kapanan İki Adet Gizli Çekmece",
      "Sallantıyı Sıfırlayan Ayarlanabilir Denge Pabuçları"
    ],
    technicalSpecs: {
      "Tabla": "Doğal Amerikan Ceviz Masif Kaplama",
      "Ayaklar": "Fırın Boyalı Ağır Rijit Çelik Gövde"
    },
    deliveryInstallInfo: "Dairenize kata teslim edilip çalışma odanızda kurulur.",
    warranty: "2 Yıl Garanti"
  },
  {
    id: "val-08",
    sku: "VLZ-TMM-808",
    name: "Siena Traverten Taş Sehpa Takımı",
    category: "tamamlayici",
    categoryName: "Sehpa & Tamamlayıcı",
    collection: "Siena Natural Stone",
    basePrice: 19800,
    discountPrice: 16900,
    rating: 5.0,
    reviewCount: 33,
    isNew: true,
    isFeatured: true,
    tag: "Doğal Taş",
    shortDescription: "Doğal Denizli traverten taşından üretilen yuvarlak orta sehpa ve yan sehpa seti.",
    description: "Doğal traverten taşının eşsiz damar yapısını modern mimariyle buluşturan Siena Sehpa Seti, salonunuzun merkezine zarif bir sanat eseri kazandırır. Mat honlu yüzeyi kadifemsi bir dokunuş hissi verir.",
    colors: [
      { name: "Doğal Krem Traverten", hex: "#E6DFD5", code: "TR-01" },
      { name: "Gri Mermer Efekti", hex: "#A8A9AD", code: "MR-02" }
    ],
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80"
    ],
    modules: [
      {
        id: "mod-sn1",
        name: "Yuvarlak Büyük Orta Sehpa (Çap: 90 cm)",
        unitPrice: 11500,
        price: 11500,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=500&q=80",
        width: 90,
        depth: 90,
        height: 42,
        badge: "Ana Parça",
        desc: "Masif doğal traverten blok gövde, honlu mat koruma cilası"
      },
      {
        id: "mod-sn2",
        name: "İkili Geçmeli Yan Zigon Sehpa",
        unitPrice: 7900,
        price: 7900,
        defaultQty: 1,
        defaultSelected: true,
        minQty: 0,
        maxQty: 2,
        image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=500&q=80",
        width: 45,
        depth: 45,
        height: 50,
        badge: "Takıma Dahil",
        desc: "Koltuk kenarına yanaşan pratik iç içe geçen yan sehpa"
      }
    ],
    features: [
      "%100 Doğal Masif Traverten Taş Blok",
      "Leke Dirençli Mat Koruma Cilası",
      "Parkeyi Çizmeyen Yumuşak Keçe Tabanlar"
    ],
    technicalSpecs: {
      "Malzeme": "Doğal Honlu Traverten",
      "Ağırlık": "54 kg (Dengeli ve Ağır Taş Yapı)"
    },
    deliveryInstallInfo: "Korumalı özel ahşap sandık içerisinde dairenize teslim edilir.",
    warranty: "2 Yıl Garanti"
  }
];

// Showrooms / Mağazalarımız
export const SHOWROOMS = [
  {
    city: "İstanbul",
    district: "Kadıköy - Kozyatağı",
    name: "Mobilya Kozyatağı Konsept Showroom",
    address: "Değirmen Sokak No: 18 Nida Kule Yanı, Kozyatağı",
    phone: "0216 444 33 44",
    hours: "Hergün 10:00 - 20:00",
    features: ["İç Mimar Destek Ofisi", "Kumaş Kartela Odası", "Otopark"]
  },
  {
    city: "İstanbul",
    district: "Şişli - Nişantaşı",
    name: "Mobilya Nişantaşı Flagship Mağaza",
    address: "Abdi İpekçi Caddesi No: 42/B, Nişantaşı",
    phone: "0212 444 33 45",
    hours: "Hergün 10:00 - 20:00",
    features: ["Özel Koleksiyon Alanı", "VIP Randevulu Sunum", "Valet"]
  },
  {
    city: "Ankara",
    district: "Çankaya - Çayyolu",
    name: "Mobilya Çayyolu Mağazası",
    address: "Park Caddesi No: 88, Çayyolu",
    phone: "0312 444 33 46",
    hours: "Hergün 09:30 - 20:30",
    features: ["3 Katlı Geniş Sergi Alanı", "Çocuk Oyun Alanı", "Otopark"]
  },
  {
    city: "İzmir",
    district: "Bornova",
    name: "Mobilya Bornova Bölge Mağazası",
    address: "Ankara Asfaltı Üzeri No: 142/A, Bornova",
    phone: "0232 444 33 47",
    hours: "Hergün 10:00 - 20:00",
    features: ["Bahçe & Balkon Sergisi", "İç Mimar Danışmanlığı", "Otopark"]
  }
];

// Kampanyalar / Aktif Fırsatlar
export const CAMPAIGNS = [
  {
    id: "cmp-1",
    title: "Bahar Yenilenme Kampanyası",
    badge: "%15 İNDİRİM",
    subtitle: "Tüm Oturma Gruplarında ve Yemek Odalarında Peşin Fiyatına 9 Taksit!",
    code: "BAHAR15",
    discountRate: 0.15,
    validUntil: "30 Nisan 2026"
  },
  {
    id: "cmp-2",
    title: "Düğün & Çeyiz Paketi İndirimi",
    badge: "15.000 TL KUPON",
    subtitle: "3 Takım Alışverişinizde Anında Ekstra İndirim!",
    code: "CEYIZ2026",
    discountRate: 0.10,
    validUntil: "31 Mayıs 2026"
  }
];
