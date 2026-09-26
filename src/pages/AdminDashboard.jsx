import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  Truck, 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  X, 
  Save, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { CATEGORIES } from '../data/furnitureData';

export const AdminDashboard = () => {
  const { 
    products, 
    orders, 
    messages, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    markMessageRead, 
    navigateTo,
    showToast 
  } = useStore();

  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'messages'
  
  // Search & Filter within Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Product Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'oturma-grubu',
    price: '',
    discountPrice: '',
    inStock: 5,
    material: '',
    color: 'Doğal',
    dimensions: {
      width: 180,
      depth: 90,
      height: 75,
      seatHeight: 44,
      weight: 45
    },
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
    description: '',
    featured: false
  });

  // Calculate high-level KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalStockCount = products.reduce((sum, p) => sum + (p.inStock || 0), 0);
  const lowStockProducts = products.filter(p => p.inStock > 0 && p.inStock <= 3);
  const outOfStockProducts = products.filter(p => p.inStock <= 0);

  // Quick preset image selector for convenience
  const PRESET_IMAGES = [
    { label: 'Kavisli Buklet Koltuk', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Doğal Mermer Masa', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Masif Meşe Karyola', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Traverten Taş Sehpa', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Minimalist Döner Berjer', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80' }
  ];

  // Open modal for new product
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'Salon',
      price: '',
      discountPrice: '',
      inStock: 4,
      material: 'Masif Meşe & İtalyan Buklet',
      color: 'Krem / Fildişi',
      dimensions: {
        width: 200,
        depth: 95,
        height: 75,
        seatHeight: 44,
        weight: 50
      },
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
      description: 'Depomuzda hazır bulunan seçkin ve lüks mobilya parçası.',
      featured: false
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      discountPrice: product.discountPrice || '',
      inStock: product.inStock,
      material: product.material,
      color: product.color,
      dimensions: {
        width: product.dimensions?.width || 100,
        depth: product.dimensions?.depth || 80,
        height: product.dimensions?.height || 75,
        seatHeight: product.dimensions?.seatHeight || 44,
        weight: product.dimensions?.weight || 30
      },
      images: product.images || [],
      description: product.description,
      featured: product.featured || false
    });
    setIsModalOpen(true);
  };

  // Submit product form
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showToast('Lütfen mobilya adı ve fiyat alanlarını doldurunuz.', 'warning');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      addProduct(productForm);
    }
    setIsModalOpen(false);
  };

  // Filtered products list for table
  const displayedProducts = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.material.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered orders
  const displayedOrders = orders.filter(o => {
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q) || o.customer.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-100/70">
      
      {/* Admin Top Navigation Strip */}
      <header className="bg-luxury-deep text-white border-b border-luxury-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#968160] flex items-center justify-center text-luxury-deep font-serif font-bold text-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wide">MOBİLYA</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-amber-400 font-semibold border border-stone-700">
                  Yönetici Paneli
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 px-4 py-2 bg-luxury-800 hover:bg-luxury-700 rounded-xl text-xs font-semibold text-luxury-200 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Canlı Mağazaya Dön</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR NAVIGATION MENU (3 cols) */}
          <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-luxury-200 shadow-soft space-y-2 sticky top-20">
            <div className="p-3 border-b border-luxury-100 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-400">Yönetim Modülleri</p>
            </div>

            <button
              onClick={() => setAdminTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                adminTab === 'overview'
                  ? 'bg-luxury-900 text-white shadow-sm'
                  : 'text-luxury-700 hover:bg-luxury-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Genel Bakış</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setAdminTab('products')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                adminTab === 'products'
                  ? 'bg-luxury-900 text-white shadow-sm'
                  : 'text-luxury-700 hover:bg-luxury-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Mobilya & Stok Yönetimi</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                adminTab === 'products' ? 'bg-luxury-800 text-white' : 'bg-luxury-100 text-luxury-600'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setAdminTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                adminTab === 'orders'
                  ? 'bg-luxury-900 text-white shadow-sm'
                  : 'text-luxury-700 hover:bg-luxury-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Siparişler & Sevkiyat</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                adminTab === 'orders' ? 'bg-luxury-800 text-white' : 'bg-luxury-100 text-luxury-600'
              }`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setAdminTab('messages')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition ${
                adminTab === 'messages'
                  ? 'bg-luxury-900 text-white shadow-sm'
                  : 'text-luxury-700 hover:bg-luxury-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Müşteri İletişim & Talepler</span>
              </div>
              {messages.filter(m => !m.read).length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              )}
            </button>

            <div className="pt-4 border-t border-luxury-100 mt-4 p-3 bg-luxury-50 rounded-2xl space-y-1">
              <p className="text-[11px] font-bold text-luxury-800">Hazır Stok Prensibi</p>
              <p className="text-[10px] text-luxury-500">
                Sistemde üretilen veya düzenlenen mobilyalar anında vitrine ve sepete yansır.
              </p>
            </div>
          </aside>

          {/* MAIN CONTENT AREA (9 cols) */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* 1. OVERVIEW TAB */}
            {adminTab === 'overview' && (
              <div className="space-y-8">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <div className="bg-white p-5 rounded-3xl border border-luxury-200 shadow-soft">
                    <div className="flex items-center justify-between text-luxury-500 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider">Toplam Ciro</span>
                      <div className="w-8 h-8 rounded-xl bg-luxury-100 text-[#968160] flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="font-serif text-2xl font-bold text-luxury-900">
                      {totalRevenue.toLocaleString('tr-TR')} ₺
                    </p>
                    <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                      Tamamlanan ve hazırlanan siparişler
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-luxury-200 shadow-soft">
                    <div className="flex items-center justify-between text-luxury-500 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider">Gelen Siparişler</span>
                      <div className="w-8 h-8 rounded-xl bg-luxury-100 text-luxury-800 flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="font-serif text-2xl font-bold text-luxury-900">
                      {orders.length} Adet
                    </p>
                    <p className="text-[10px] text-luxury-500 mt-1">
                      {orders.filter(o => o.status === 'Hazırlanıyor').length} tanesi depoda paketleniyor
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-luxury-200 shadow-soft">
                    <div className="flex items-center justify-between text-luxury-500 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider">Depodaki Hazır Parça</span>
                      <div className="w-8 h-8 rounded-xl bg-luxury-100 text-luxury-800 flex items-center justify-center">
                        <Package className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="font-serif text-2xl font-bold text-luxury-900">
                      {totalStockCount} Adet
                    </p>
                    <p className="text-[10px] text-luxury-500 mt-1">
                      {products.length} farklı mobilya modeli
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-luxury-200 shadow-soft">
                    <div className="flex items-center justify-between text-luxury-500 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider">Kritik Stok Uyarısı</span>
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="font-serif text-2xl font-bold text-amber-900">
                      {lowStockProducts.length + outOfStockProducts.length} Model
                    </p>
                    <p className="text-[10px] text-amber-700 mt-1">
                      3 veya daha az kalan mobilyalar
                    </p>
                  </div>

                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-3xl p-6 border border-luxury-200 shadow-soft space-y-4">
                  <div className="flex items-center justify-between border-b border-luxury-100 pb-3">
                    <h3 className="font-serif text-base font-bold text-luxury-900">
                      Son Gelen Sevkiyat & Montaj Siparişleri
                    </h3>
                    <button
                      onClick={() => setAdminTab('orders')}
                      className="text-xs font-semibold text-[#968160] hover:underline"
                    >
                      Tümünü Yönet ({orders.length})
                    </button>
                  </div>

                  <div className="divide-y divide-luxury-100">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-luxury-900">{ord.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'Teslim Edildi' ? 'bg-emerald-100 text-emerald-800' :
                              ord.status === 'Sevkiyatta' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-luxury-700 mt-1 font-medium">{ord.customer.name} • {ord.customer.city} / {ord.customer.district}</p>
                          <p className="text-luxury-400 text-[11px]">{ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="font-serif font-bold text-sm text-luxury-950">{ord.total.toLocaleString('tr-TR')} ₺</p>
                          <p className="text-[10px] text-luxury-400">{ord.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Attention List */}
                <div className="bg-white rounded-3xl p-6 border border-luxury-200 shadow-soft space-y-4">
                  <div className="flex items-center justify-between border-b border-luxury-100 pb-3">
                    <h3 className="font-serif text-base font-bold text-luxury-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Stok Azalan / Kritik Mobilyalar</span>
                    </h3>
                    <button
                      onClick={() => setAdminTab('products')}
                      className="text-xs font-semibold text-[#968160] hover:underline"
                    >
                      Stok Güncelle
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {lowStockProducts.concat(outOfStockProducts).slice(0, 4).map((p) => (
                      <div key={p.id} className="p-3 rounded-2xl bg-luxury-50 border border-luxury-200 flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border border-luxury-200" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs text-luxury-900 truncate">{p.name}</p>
                          <p className="text-[11px] text-luxury-500">{p.category}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.inStock <= 0 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.inStock <= 0 ? 'Tükendi' : `${p.inStock} Adet Kaldı`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 2. PRODUCTS MANAGEMENT TAB */}
            {adminTab === 'products' && (
              <div className="space-y-6">
                
                {/* Header & Actions */}
                <div className="bg-white rounded-3xl p-6 border border-luxury-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-luxury-900">
                      Mobilya & Hazır Stok Yönetimi
                    </h2>
                    <p className="text-xs text-luxury-500 mt-0.5">
                      Deponuzdaki mobilyaları anlık düzenleyin, yeni mobilya ekleyin veya hazır stok miktarını güncelleyin.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddModal}
                    className="px-5 py-3 bg-luxury-900 hover:bg-luxury-800 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Mobilya Ekle</span>
                  </button>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Mobilya adı, SKU veya malzeme ara..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-luxury-300 rounded-2xl text-xs text-luxury-900 focus:outline-none focus:border-luxury-600 shadow-sm"
                    />
                    <Search className="w-4 h-4 text-luxury-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2.5 bg-white border border-luxury-300 rounded-2xl text-xs text-luxury-900 font-medium focus:outline-none shadow-sm"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-3xl border border-luxury-200 shadow-soft overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-luxury-50 border-b border-luxury-200 text-luxury-500 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3.5 px-4">Görsel / SKU</th>
                          <th className="py-3.5 px-4">Mobilya Adı</th>
                          <th className="py-3.5 px-4">Kategori</th>
                          <th className="py-3.5 px-4">Fiyat</th>
                          <th className="py-3.5 px-4">Hazır Stok</th>
                          <th className="py-3.5 px-4 text-right">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-luxury-100">
                        {displayedProducts.map((p) => {
                          const activePrice = p.discountPrice || p.price;
                          return (
                            <tr key={p.id} className="hover:bg-luxury-50/50 transition">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border border-luxury-200 shrink-0" />
                                  <span className="font-mono text-[10px] text-luxury-400 font-semibold">{p.sku}</span>
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <p className="font-bold text-luxury-900">{p.name}</p>
                                <p className="text-[11px] text-luxury-500 line-clamp-1">{p.material}</p>
                                {p.dimensions && (
                                  <span className="text-[10px] font-mono text-luxury-400">
                                    {p.dimensions.width}×{p.dimensions.depth}×{p.dimensions.height} cm
                                  </span>
                                )}
                              </td>

                              <td className="py-3 px-4">
                                <span className="px-2.5 py-1 rounded-full bg-luxury-100 text-luxury-800 font-semibold text-[11px]">
                                  {p.category}
                                </span>
                              </td>

                              <td className="py-3 px-4">
                                <p className="font-serif font-bold text-luxury-950">{activePrice.toLocaleString('tr-TR')} ₺</p>
                                {p.discountPrice && (
                                  <p className="text-[10px] text-luxury-400 line-through">{p.price.toLocaleString('tr-TR')} ₺</p>
                                )}
                              </td>

                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                    p.inStock <= 0 ? 'bg-rose-100 text-rose-800' :
                                    p.inStock <= 3 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {p.inStock} Adet
                                  </span>
                                  {/* Quick stock +/- */}
                                  <div className="flex items-center border border-luxury-200 rounded-lg bg-white">
                                    <button
                                      onClick={() => updateProduct(p.id, { inStock: Math.max(0, p.inStock - 1) })}
                                      className="px-1.5 py-0.5 text-luxury-600 hover:text-black font-bold"
                                      title="1 Azalt"
                                    >
                                      -
                                    </button>
                                    <button
                                      onClick={() => updateProduct(p.id, { inStock: p.inStock + 1 })}
                                      className="px-1.5 py-0.5 text-luxury-600 hover:text-black font-bold"
                                      title="1 Ekle"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleOpenEditModal(p)}
                                    className="p-2 text-luxury-600 hover:text-luxury-950 hover:bg-luxury-100 rounded-xl transition"
                                    title="Düzenle"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteProduct(p.id)}
                                    className="p-2 text-luxury-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                                    title="Sil"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* 3. ORDERS MANAGEMENT TAB */}
            {adminTab === 'orders' && (
              <div className="space-y-6">
                
                <div className="bg-white rounded-3xl p-6 border border-luxury-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-luxury-900">
                      Sevkiyat & Montaj Siparişleri
                    </h2>
                    <p className="text-xs text-luxury-500 mt-0.5">
                      Gelen siparişlerin teslimat durumunu güncelleyin; anında müşteri takip ekranına yansır.
                    </p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Müşteri adı veya sipariş no ara..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-luxury-50 border border-luxury-200 rounded-2xl text-xs text-luxury-900 focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-luxury-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-4">
                  {displayedOrders.map((ord) => (
                    <div key={ord.id} className="bg-white rounded-3xl p-6 border border-luxury-200 shadow-soft space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-luxury-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-luxury-900">{ord.id}</span>
                            <span className="text-xs text-luxury-400">• {ord.date}</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-luxury-100 text-luxury-700">
                              {ord.paymentMethod}
                            </span>
                          </div>
                          <p className="font-serif font-bold text-base text-luxury-950 mt-1">
                            Alıcı: {ord.customer.name}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-luxury-600">Durum:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                              ord.status === 'Teslim Edildi' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' :
                              ord.status === 'Sevkiyatta' ? 'bg-sky-100 border-sky-300 text-sky-800' :
                              'bg-amber-100 border-amber-300 text-amber-800'
                            }`}
                          >
                            <option value="Hazırlanıyor">Depoda Hazırlanıyor</option>
                            <option value="Sevkiyatta">Özel Sevkiyatta</option>
                            <option value="Teslim Edildi">Teslim & Montaj Tamamlandı</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Details & Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div className="space-y-1.5 bg-luxury-50 p-4 rounded-2xl">
                          <p className="font-bold text-luxury-900 uppercase tracking-wider text-[10px]">Teslimat Bilgileri</p>
                          <p className="text-luxury-800">{ord.customer.phone} • {ord.customer.email}</p>
                          <p className="text-luxury-700">{ord.customer.address}</p>
                          <p className="text-luxury-700">{ord.customer.district} / {ord.customer.city}</p>
                          {ord.customer.floorInfo && (
                            <p className="text-luxury-600 italic">Kat/Asansör: {ord.customer.floorInfo}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <p className="font-bold text-luxury-900 uppercase tracking-wider text-[10px]">Siparişteki Mobilyalar</p>
                          <div className="divide-y divide-luxury-100">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="py-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <img src={it.image} alt="" className="w-8 h-8 object-cover rounded-lg border" />
                                  <span className="font-medium text-luxury-900">{it.name} ({it.quantity} adet)</span>
                                </div>
                                <span className="font-mono font-bold">{(it.price * it.quantity).toLocaleString('tr-TR')} ₺</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-luxury-200 flex justify-between font-bold text-sm">
                            <span>Toplam Tutar:</span>
                            <span className="font-serif text-luxury-950">{ord.total.toLocaleString('tr-TR')} ₺</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* 4. MESSAGES / INQUIRIES TAB */}
            {adminTab === 'messages' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-luxury-200 shadow-soft">
                  <h2 className="font-serif text-2xl font-bold text-luxury-900">
                    Müşteri Talepleri & Showroom Randevuları
                  </h2>
                  <p className="text-xs text-luxury-500 mt-0.5">
                    Kumaş numunesi talepleri, merdiven/asansör taşıma soruları ve randevu mesajları.
                  </p>
                </div>

                <div className="space-y-4">
                  {messages.map((m) => (
                    <div 
                      key={m.id} 
                      className={`p-6 rounded-3xl border transition shadow-soft ${
                        m.read ? 'bg-white border-luxury-200' : 'bg-luxury-50/90 border-[#968160]/40 ring-1 ring-[#968160]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-luxury-100 pb-3">
                        <div>
                          <span className="font-serif text-base font-bold text-luxury-900">{m.subject}</span>
                          <div className="flex items-center gap-2 mt-1 text-xs text-luxury-500">
                            <span className="font-semibold text-luxury-800">{m.name}</span>
                            <span>•</span>
                            <span>{m.phone}</span>
                            <span>•</span>
                            <span>{m.email}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-luxury-400 block">{m.date}</span>
                          {!m.read && (
                            <button
                              onClick={() => markMessageRead(m.id)}
                              className="mt-1 px-3 py-1 bg-luxury-900 text-white rounded-lg text-[10px] font-semibold"
                            >
                              Okundu İşaretle
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-luxury-700 leading-relaxed mt-4">
                        "{m.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* PRODUCT CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-luxury-200 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-luxury-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-luxury-900">
                  {editingProductId ? 'Mobilyayı Düzenle' : 'Kataloğa Yeni Hazır Mobilya Ekle'}
                </h3>
                <p className="text-xs text-luxury-500">
                  Kaydedildiğinde anında anasayfa ve katalog vitrininde listelenecektir.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-luxury-400 hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-luxury-800 block mb-1">Mobilya Adı *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Örn: Aura Kavisli Buklet Koltuk"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300 text-luxury-900 focus:outline-none focus:border-luxury-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-luxury-800 block mb-1">Kategori *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300 text-luxury-900 bg-white focus:outline-none focus:border-luxury-600"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-luxury-800 block mb-1">Fiyat (₺) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="45000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300 text-luxury-900 focus:outline-none focus:border-luxury-600 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-luxury-800 block mb-1">İndirimli Fiyat (₺) (Opsiyonel)</label>
                  <input
                    type="number"
                    value={productForm.discountPrice}
                    onChange={(e) => setProductForm({ ...productForm, discountPrice: e.target.value })}
                    placeholder="39500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300 text-luxury-900 focus:outline-none focus:border-luxury-600 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-luxury-800 block mb-1">Hazır Stok Adedi *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300 text-luxury-900 focus:outline-none focus:border-luxury-600 font-mono"
                  />
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <label className="font-bold text-luxury-800 block mb-1">Ölçüler (cm: Genişlik × Derinlik × Yükseklik)</label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="En (cm)"
                    value={productForm.dimensions.width}
                    onChange={(e) => setProductForm({
                      ...productForm,
                      dimensions: { ...productForm.dimensions, width: e.target.value }
                    })}
                    className="px-3 py-2 rounded-xl border border-luxury-300 font-mono"
                  />
                  <input
                    type="number"
                    placeholder="Derinlik (cm)"
                    value={productForm.dimensions.depth}
                    onChange={(e) => setProductForm({
                      ...productForm,
                      dimensions: { ...productForm.dimensions, depth: e.target.value }
                    })}
                    className="px-3 py-2 rounded-xl border border-luxury-300 font-mono"
                  />
                  <input
                    type="number"
                    placeholder="Yükseklik (cm)"
                    value={productForm.dimensions.height}
                    onChange={(e) => setProductForm({
                      ...productForm,
                      dimensions: { ...productForm.dimensions, height: e.target.value }
                    })}
                    className="px-3 py-2 rounded-xl border border-luxury-300 font-mono"
                  />
                </div>
              </div>

              {/* Material & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-luxury-800 block mb-1">Malzeme Tanımı</label>
                  <input
                    type="text"
                    value={productForm.material}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    placeholder="Örn: Masif Meşe & İtalyan Buklet Kumaş"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-luxury-800 block mb-1">Renk</label>
                  <input
                    type="text"
                    value={productForm.color}
                    onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                    placeholder="Krem / Kum Beji"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300"
                  />
                </div>
              </div>

              {/* Image URL & Quick Unsplash Presets */}
              <div>
                <label className="font-bold text-luxury-800 block mb-1">Görsel URL'si (Unsplash veya Doğrudan Link)</label>
                <input
                  type="url"
                  value={productForm.images[0] || ''}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-luxury-300 font-mono text-[11px]"
                />
                
                {/* Preset Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-luxury-400">Hazır Görseller:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, images: [preset.url] })}
                      className="px-2 py-0.5 rounded-md bg-luxury-100 hover:bg-luxury-200 text-luxury-800 text-[10px] font-medium"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-luxury-800 block mb-1">Açıklama & Detaylar</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-luxury-300"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-luxury-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-luxury-300 text-luxury-700 hover:bg-luxury-50 font-semibold"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-luxury-900 hover:bg-luxury-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProductId ? 'Değişiklikleri Kaydet' : 'Kataloğa Ekle'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
