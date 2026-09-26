// Initial Mock Data for Luxury Furniture Store (Maison Aura)
// All items are in stock, ready for immediate warehouse delivery

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    sku: "MA-SLN-001",
    name: "Aura Bouclé Kavisli 3'lü Koltuk",
    category: "Salon",
    price: 48500,
    discountPrice: 42900,
    inStock: 3,
    material: "İtalyan Buklet Kumaş & Masif Kayın İskelet",
    color: "Krem / Fildişi",
    colorHex: "#F5F2EB",
    dimensions: {
      width: 240,
      depth: 105,
      height: 78,
      seatHeight: 44,
      weight: 68
    },
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 28,
    description: "Organik kavisli hatları ve ultra yumuşak İtalyan buklet dokusu ile salonunuza heykelsi bir lüks kazandırır. Fırınlanmış masif kayın iskelet ve 35 dansite HR sünger dolgusu ile uzun yıllar formunu korur.",
    features: [
      "Leke tutmaz, silinebilir özel ithal buklet kumaş",
      "Fırınlanmış masif kayın ağacından iç iskelet",
      "Yüksek yoğunluklu ortopedik oturum konforu",
      "Hazır montajlı, depodan tek parça teslimat"
    ],
    careInstructions: "Nemli mikrofiber bezle silinebilir. Kimyasal ağartıcı kullanmayınız. Direkt güneş ışığından koruyunuz.",
    deliveryNote: "İstanbul içi aynı gün, diğer illere 48 saatte özel mobilya nakliye ekibimizce kata teslim ve montaj ücretsiz yapılır."
  },
  {
    id: "prod-2",
    sku: "MA-YMK-002",
    name: "Calacatta Gold Mermer Yemek Masası",
    category: "Yemek Odası",
    price: 56000,
    discountPrice: 49500,
    inStock: 2,
    material: "Doğal Calacatta Mermer & Fırçalanmış Titanyum Ayak",
    color: "Beyaz / Altın Damarlı",
    colorHex: "#ECEAE4",
    dimensions: {
      width: 220,
      depth: 100,
      height: 76,
      weight: 125
    },
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 19,
    description: "İtalya Carrara bölgesinden çıkarılan orijinal Calacatta mermer plaka, yüzey koruyucu nano cila ile işlenmiştir. 8-10 kişilik geniş oturum alanı ve heykelsi titanyum kaplama ayakları ile yemek odanızın odak noktasıdır.",
    features: [
      "20 mm kalınlığında doğal Calacatta mermer blok",
      "Sıvı emilimine karşı nano koruyucu şeffaf film kaplama",
      "Sallanmayı önleyen ağırlıklı paslanmaz titanyum konik ayak",
      "8-10 kişilik konforlu oturma kapasitesi"
    ],
    careInstructions: "Mermer özel temizleyicisi veya ılık sabunlu su ile temizleyiniz. Asitli maddelerle (limon, sirke) temas ettirmeyiniz.",
    deliveryNote: "Ağır ve hassas parça olması sebebiyle 4 kişilik profesyonel lojistik ekibimizle kata teslim ve kurulum yapılır."
  },
  {
    id: "prod-3",
    sku: "MA-YTK-003",
    name: "Palazzo Masif Meşe Karyola & Yatak Başlığı",
    category: "Yatak Odası",
    price: 39000,
    discountPrice: 34500,
    inStock: 4,
    material: "Doğal Masif Meşe & Naturel Keten Döşeme",
    color: "Doğal Meşe / Kum Beji",
    colorHex: "#D8C7B5",
    dimensions: {
      width: 190,
      depth: 215,
      height: 110,
      seatHeight: 38,
      weight: 75
    },
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    isNew: true,
    rating: 4.8,
    reviewsCount: 34,
    description: "Doğal İskandinav estetiğini Akdeniz huzuruyla buluşturan Palazzo karyola, 160x200 ve 180x200 standart yataklara uygundur. Yumuşak dokulu keten başlığı kitap okurken sırtınız için ergonomik destek sağlar.",
    features: [
      "1. sınıf fırınlanmış masif meşe ağacı gövde",
      "Nefes alabilen organik keten yatak başlığı",
      "Ses yapmayan gizli latalı esnek ızgara taban",
      "Depo stoklu, hızlı kargo ve daire içi montaj"
    ],
    careInstructions: "Ahşap kısımlar hafif nemli bez ve doğal ahşap yağı ile silinebilir.",
    deliveryNote: "Montaj ekibimiz karyolayı dilediğiniz odaya taşır ve 20 dakikada anahtar teslim kurar."
  },
  {
    id: "prod-4",
    sku: "MA-SLN-004",
    name: "Verona Minimalist Döner Berjer",
    category: "Salon",
    price: 18500,
    discountPrice: 15900,
    inStock: 5,
    material: "Hakiki Nubuk Dokulu Kumaş & 360° Döner Pirinç Taban",
    color: "Antrasit Kül",
    colorHex: "#2E2D2B",
    dimensions: {
      width: 85,
      depth: 88,
      height: 82,
      seatHeight: 42,
      weight: 29
    },
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580481077195-c22e4d081f9b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    isNew: true,
    rating: 4.7,
    reviewsCount: 15,
    description: "Salonunuza modern ve dinamik bir soluk getiren Verona döner berjer, sessiz rulman mekanizması ile 360 derece akıcı bir dönüş sunar. Yumuşak nubuk dokusu konforu üst düzeye çıkarır.",
    features: [
      "360 derece sessiz bilyeli döner pirinç mekanizma",
      "Nubuk hisli yıpranmaz dokuma yüzey",
      "Gövdeyi saran ergonomik sırt açısı",
      "Tamamen montajlı kutulu teslim"
    ],
    careInstructions: "Sert kimyasallardan uzak tutunuz, kuru temizleme köpüğü ile lokal leke temizliği uygundur.",
    deliveryNote: "Aynı gün kargoya hazır, korumalı özel sandık içinde sevk edilir."
  },
  {
    id: "prod-5",
    sku: "MA-CLK-005",
    name: "Nordic Masif Ceviz Yönetici Çalışma Masası",
    category: "Çalışma",
    price: 32000,
    discountPrice: 28500,
    inStock: 3,
    material: "Amerikan Masif Ceviz & Mat Siyah Elektrostatik Çelik",
    color: "Doğal Ceviz",
    colorHex: "#61472A",
    dimensions: {
      width: 160,
      depth: 80,
      height: 75,
      weight: 48
    },
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 22,
    description: "Görkemli ceviz hareleri ve gizli kablo kanalıyla ev-ofis deneyimini lüks bir çalışma odasına dönüştürür. Masif ceviz tabla dokunulduğunda doğal ahşabın sıcaklığını hissettirir.",
    features: [
      "Doğal Amerikan ceviz ağacından çift kat tablalı yüzey",
      "Gizli manyetik priz ve kablo düzenleme yuvası",
      "Frenli gizli çekmece mekanizması",
      "Lazer kesim rijit çelik ayak konstrüksiyonu"
    ],
    careInstructions: "Doğal balmumu cila ile yılda bir kez beslenmesi önerilir.",
    deliveryNote: "Masa tablası ve ayakları ayrı ambalajda sevk edilip odanızda ücretsiz birleştirilir."
  },
  {
    id: "prod-6",
    sku: "MA-DKR-006",
    name: "Traverten Taş İkili Zigon & Orta Sehpa Seti",
    category: "Tamamlayıcı",
    price: 21000,
    discountPrice: 17800,
    inStock: 6,
    material: "Doğal Denizli Traverten Taşı & Masif Gövde",
    color: "Doğal Krem / Bej",
    colorHex: "#E2DCD1",
    dimensions: {
      width: 90,
      depth: 90,
      height: 42,
      weight: 52
    },
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 41,
    description: "Doğanın binlerce yılda şekillendirdiği traverten taşının gözenekli ve eşsiz dokusu, modern geometrik siluetle buluştu. İki farklı boyuttaki parçasıyla iç içe veya bağımsız kullanılabilir.",
    features: [
      "%100 ham doğal traverten blok",
      "Mat honlu pürüzsüz dokunuş yüzeyi",
      "İç içe geçebilen modüler mimari",
      "Zemini çizmeyen keçe taban pabuçları"
    ],
    careInstructions: "Nemli bezle temizleyiniz. Sıcak içecek koyarken bardak altlığı kullanılması tavsiye edilir.",
    deliveryNote: "Özel ahşap kafes içerisinde kırılma garantili olarak depodan sevk edilir."
  },
  {
    id: "prod-7",
    sku: "MA-YMK-007",
    name: "Siena Kavisli Buklet Yemek Sandalyesi (2'li Takım)",
    category: "Yemek Odası",
    price: 16500,
    discountPrice: 14200,
    inStock: 8,
    material: "Premium Buklet & Masif Meşe Ayak",
    color: "Taş Beji",
    colorHex: "#D5CEC5",
    dimensions: {
      width: 56,
      depth: 58,
      height: 80,
      seatHeight: 47,
      weight: 16
    },
    images: [
      "https://images.unsplash.com/photo-1580481077195-c22e4d081f9b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 31,
    description: "Uzun akşam yemeklerinde kusursuz sırt desteği sunan kavisli ergonomisi ve sıcacık buklet kumaşı ile hem rahat hem son derece zarif. Fiyat 2 adet sandalye içindir.",
    features: [
      "Paket içeriği: 2 adet hazır sandalye",
      "Oturum konforunu artıran çelik yaylı karkas",
      "Masif meşe konik torna ayaklar",
      "Kolay temizlenebilen yüksek gramajlı kumaş"
    ],
    careInstructions: "Hafif nemli bezle siliniz, ovmayınız.",
    deliveryNote: "Kutulu, ekstra korumalı ambalajda hemen kargo."
  },
  {
    id: "prod-8",
    sku: "MA-SLN-008",
    name: "Lumina Dokulu Masif TV Ünitesi & Konsol",
    category: "Salon",
    price: 36500,
    discountPrice: 31900,
    inStock: 2,
    material: "Oluklu Masif Meşe & Füme Temperli Cam & Pirinç Kulp",
    color: "Dumanlı Meşe",
    colorHex: "#544E47",
    dimensions: {
      width: 220,
      depth: 46,
      height: 58,
      weight: 64
    },
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 18,
    description: "Ön kapaklarındaki el işçiliği oluklu ahşap desenleri ve füme camlı vitrin bölmesi ile modern teknoloji aygıtlarınızı şıkça gizler. Geniş kablo çıkışları ve soft-close kapak mekanizmasına sahiptir.",
    features: [
      "Soft-close frenli Blum marka menteşe sistemi",
      "Uzaktan kumanda sinyali geçiren füme cam",
      "Masif meşe gövde ve lüks fırçalanmış pirinç kulplar",
      "85 inçe kadar televizyonlar için ideal taşıma kapasitesi"
    ],
    careInstructions: "Mikrofiber bez ve mobilya cilası ile tozu alınmalıdır.",
    deliveryNote: "İstanbul içi aynı gün özel araçla teslim ve duvara sabitleme dahil ücretsiz montaj."
  },
  {
    id: "prod-9",
    sku: "MA-DKR-009",
    name: "Arcadia Heykelsi Masif Zemin Aynası",
    category: "Tamamlayıcı",
    price: 14500,
    discountPrice: 12800,
    inStock: 4,
    material: "Masif Dişbudak Çerçeve & Flotal-E Ekolojik Ayna",
    color: "Doğal Açık Ahşap",
    colorHex: "#CBBBA7",
    dimensions: {
      width: 90,
      depth: 8,
      height: 200,
      weight: 34
    },
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 27,
    description: "Geniş kavisli üst kemeri ve masif dişbudak ahşap çerçevesiyle mekana derinlik ve ışık katar. İster duvara yaslanarak, ister arkasındaki gizli askı aparatlarıyla asılarak kullanılabilir.",
    features: [
      "Kararmaya ve korozyona dirençli Flotal-E ayna",
      "Eksiz bükümlü masif dişbudak çerçeve",
      "Duvara yaslama için kaydırmaz taban kauçukları",
      "Güvenlik filmi kaplı (kırılsa dahi dağılmaz)"
    ],
    careInstructions: "Cam temizleyici bezle temizlenir, çerçeveye doğrudan kimyasal sıkmayınız.",
    deliveryNote: "Korumalı sandıkta depodan aynı gün sevkiyat."
  },
  {
    id: "prod-10",
    sku: "MA-YTK-010",
    name: "Venezia Masif Komodin (Çift Çekmeceli)",
    category: "Yatak Odası",
    price: 11500,
    discountPrice: 9900,
    inStock: 7,
    material: "Füme Meşe & Doğal Mermer Üst Tabla & Gizli Ray",
    color: "Koyu Meşe / Gri Mermer",
    colorHex: "#453F39",
    dimensions: {
      width: 55,
      depth: 45,
      height: 52,
      weight: 22
    },
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    isNew: false,
    rating: 4.6,
    reviewsCount: 14,
    description: "Üst tablasındaki doğal gri mermer detayı ile su lekelerine ve bardak izlerine dayanıklıdır. Gizli frenli çekmeceleri sessiz bir yatak odası konforu vadeder.",
    features: [
      "Doğal mermer üst tabla",
      "Tam açılır frenli gizli tandem raylar",
      "Kadife kumaş kaplı çekmece içi zemin",
      "Depo stoklu, montaj gerektirmeyen tek parça ürün"
    ],
    careInstructions: "Mermer kısmı kuru mikrofiber bezle siliniz.",
    deliveryNote: "Hazır kutusunda, hemen teslime uygundur."
  }
];

export const CATEGORIES = [
  {
    id: "all",
    name: "Tüm Koleksiyon",
    tagline: "Stoktaki Hazır Mobilyalar",
    icon: "LayoutGrid",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "Salon",
    name: "Salon",
    tagline: "Koltuk, Berjer & TV Üniteleri",
    icon: "Armchair",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "Yatak Odası",
    name: "Yatak Odası",
    tagline: "Karyola, Komodin & Dolaplar",
    icon: "Bed",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "Yemek Odası",
    name: "Yemek Odası",
    tagline: "Mermer Masa & Buklet Sandalyeler",
    icon: "Utensils",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "Çalışma",
    name: "Çalışma",
    tagline: "Yönetici Masaları & Kütüphaneler",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "Tamamlayıcı",
    name: "Tamamlayıcı / Dekorasyon",
    tagline: "Traverten Sehpalar & Masif Aynalar",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
  }
];

export const MATERIALS = [
  "Masif Ahşap & Meşe",
  "Doğal Mermer & Traverten",
  "İtalyan Buklet Kumaş",
  "Organik Keten",
  "Titanyum & Pirinç Metal",
  "Hakiki Deri / Nubuk"
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-2026-9041",
    customer: {
      name: "Selin Yılmaz",
      email: "selin.yilmaz@example.com",
      phone: "+90 532 841 22 90",
      city: "İstanbul",
      district: "Kadıköy / Caddebostan",
      address: "Bağdat Cad. No: 284 D: 8",
      floorInfo: "Kat 4, Geniş Yük Asansörü Mevcut"
    },
    items: [
      {
        id: "prod-1",
        name: "Aura Bouclé Kavisli 3'lü Koltuk",
        price: 42900,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "prod-6",
        name: "Traverten Taş İkili Zigon Sehpa Seti",
        price: 17800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 60700,
    discount: 6070,
    total: 54630,
    couponCode: "INDIRIM10",
    paymentMethod: "Kredi Kartı (Tek Çekim)",
    status: "Hazırlanıyor",
    statusNote: "Depodan paketlendi, nakliye aracına yükleme aşamasında.",
    date: "2026-09-26 14:30"
  },
  {
    id: "ORD-2026-9038",
    customer: {
      name: "Murat Eren Demir",
      email: "m.demir@example.com",
      phone: "+90 542 119 44 55",
      city: "Ankara",
      district: "Çankaya / Gaziosmanpaşa",
      address: "Kader Sokak No: 14/3",
      floorInfo: "Müstakil Villa, Zemin Kat Giriş"
    },
    items: [
      {
        id: "prod-2",
        name: "Calacatta Gold Mermer Yemek Masası",
        price: 49500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "prod-7",
        name: "Siena Kavisli Buklet Sandalye (2'li Takım)",
        price: 14200,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1580481077195-c22e4d081f9b?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 92100,
    discount: 0,
    total: 92100,
    couponCode: "",
    paymentMethod: "Kapıda Kart ile Ödeme",
    status: "Sevkiyatta",
    statusNote: "Özel nakliye aracı yolda. Tahmini varış: Yarın 11:00.",
    date: "2026-09-25 10:15"
  },
  {
    id: "ORD-2026-8994",
    customer: {
      name: "Berrin Karaarslan",
      email: "berrin.kara@example.com",
      phone: "+90 555 776 33 21",
      city: "İzmir",
      district: "Urla / İskele",
      address: "Zeytinler Mevkii No: 12",
      floorInfo: "Müstakil Ev, Düz Giriş"
    },
    items: [
      {
        id: "prod-3",
        name: "Palazzo Masif Meşe Karyola",
        price: 34500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "prod-10",
        name: "Venezia Masif Komodin (Çift)",
        price: 9900,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    subtotal: 54300,
    discount: 0,
    total: 54300,
    couponCode: "",
    paymentMethod: "Kredi Kartı (3 Taksit)",
    status: "Teslim Edildi",
    statusNote: "Kurulum montaj ekibimizce tamamlandı ve onay formu alındı.",
    date: "2026-09-24 16:40"
  }
];

export const INITIAL_MESSAGES = [
  {
    id: "msg-1",
    name: "Emre Aktaş",
    email: "emre.aktas@example.com",
    phone: "+90 533 210 99 88",
    subject: "Aura Koltuk Kumaş Numunesi & Showroom Ziyareti",
    message: "Aura Bouclé koltuğu Nişantaşı mağazanızda deneyimlemek istiyorum. Cumartesi günü saat 14:00 için randevu oluşturabilir miyiz? Ayrıca keten kumaş alternatifi var mıdır?",
    date: "2026-09-26 11:20",
    read: false
  },
  {
    id: "msg-2",
    name: "Zeynep Çetin",
    email: "zeynep.c@example.com",
    phone: "+90 505 443 11 02",
    subject: "Calacatta Masanın Merdivenden Taşınması",
    message: "Calacatta mermer masanın siparişini vermek üzereyim. Binamızda yük asansörü yok, 3. kata merdivenden taşınma konusunda montaj ekibiniz destek veriyor mu?",
    date: "2026-09-25 18:45",
    read: true
  }
];
