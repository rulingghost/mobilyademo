import React, { createContext, useContext, useState, useEffect } from 'react';
import { FURNITURE_PRODUCTS, CATEGORIES, CAMPAIGNS, SHOWROOMS } from '../data/furnitureData';
import { INITIAL_ORDERS, INITIAL_MESSAGES } from '../data/mockData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Products state (persisted or defaults)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('valenza_products');
      return saved ? JSON.parse(saved) : FURNITURE_PRODUCTS;
    } catch {
      return FURNITURE_PRODUCTS;
    }
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('valenza_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Messages / inquiries state
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('valenza_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('valenza_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: "val-01",
          quantity: 1,
          selectedColor: "Vizon / Kum Beji",
          selectedModules: ["mod-m1", "mod-m3"], // 3'lü Koltuk + Berjer
          unitPrice: 31000
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('valenza_wishlist');
      return saved ? JSON.parse(saved) : ["val-02", "val-04"];
    } catch {
      return [];
    }
  });

  // Navigation & Browser History
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'catalog' | 'detail' | 'checkout' | 'wishlist' | 'orders' | 'admin'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShowroomModalOpen, setIsShowroomModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [installmentProduct, setInstallmentProduct] = useState(null);

  // Coupons & Orders
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('valenza_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('valenza_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('valenza_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('valenza_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('valenza_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Setup PopState (Browser Back / Forward Button Handler)
  useEffect(() => {
    // Initial state setup if needed
    if (!window.history.state) {
      window.history.replaceState({ tab: 'home', productId: null, category: 'all' }, '', window.location.pathname);
    }

    const handlePopState = (event) => {
      if (event.state) {
        setActiveTab(event.state.tab || 'home');
        setSelectedProductId(event.state.productId || null);
        setSelectedCategory(event.state.category || 'all');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // Full-featured navigate with Browser History integration
  const navigateTo = (tab, productId = null, category = null, pushHistory = true) => {
    if (productId !== null) {
      setSelectedProductId(productId);
    }
    if (category !== null) {
      setSelectedCategory(category);
    }
    setActiveTab(tab);
    setIsCartOpen(false);

    if (pushHistory) {
      const stateObj = { 
        tab, 
        productId: productId || selectedProductId, 
        category: category || selectedCategory 
      };
      
      let url = window.location.pathname;
      if (tab !== 'home') {
        const params = new URLSearchParams();
        params.set('page', tab);
        if (productId) params.set('id', productId);
        if (category && category !== 'all') params.set('cat', category);
        url += '?' + params.toString();
      }
      
      window.history.pushState(stateObj, '', url);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Go Back function for in-page Back buttons
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo('home');
    }
  };

  // Cart operations (Module & set aware)
  const addToCart = (product, quantity = 1, selectedModules = null, customPrice = null, selectedColor = null) => {
    if (!product) return;

    const chosenColor = selectedColor || (product.colors && product.colors[0]?.name) || "Standart";
    const chosenModules = selectedModules || (product.modules ? product.modules.filter(m => m.defaultSelected).map(m => m.id) : []);
    
    // Calculate final unit price based on selected modules or product price
    let effectiveUnitPrice = product.discountPrice || product.basePrice || product.price;
    if (product.modules && chosenModules.length > 0) {
      const modulesTotal = product.modules
        .filter(m => chosenModules.includes(m.id))
        .reduce((sum, m) => sum + m.price, 0);
      if (modulesTotal > 0) {
        effectiveUnitPrice = modulesTotal;
      }
    }
    if (customPrice) {
      effectiveUnitPrice = customPrice;
    }

    const cartItemId = `${product.id}-${chosenColor}-${chosenModules.sort().join('_')}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId || (item.id === product.id && item.selectedColor === chosenColor));
      if (existing) {
        return prev.map(item =>
          item === existing
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          id: product.id,
          quantity,
          selectedColor: chosenColor,
          selectedModules: chosenModules,
          unitPrice: effectiveUnitPrice
        }
      ];
    });

    showToast(`"${product.name}" alışveriş sepetinize eklendi!`, 'success');
  };

  const removeFromCart = (cartItemIdOrId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemIdOrId && item.id !== cartItemIdOrId));
    showToast('Ürün sepetten kaldırıldı.', 'info');
  };

  const updateQuantity = (cartItemIdOrId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartItemId === cartItemIdOrId || item.id === cartItemIdOrId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId) => {
    const isSaved = wishlist.includes(productId);
    const prod = products.find(p => p.id === productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`"${prod?.name || 'Ürün'}" favorilerinizden kaldırıldı.`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`"${prod?.name || 'Ürün'}" favorilerinize eklendi!`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BAHAR15' || clean === 'MOBILYA15' || clean === 'VALENZA15') {
      setAppliedCoupon({ code: clean, discountRate: 0.15, label: '%15 Bahar Kampanyası İndirimi' });
      showToast('Tebrikler! %15 Bahar İndirimi uygulandı.', 'success');
      return true;
    } else if (clean === 'CEYIZ2026' || clean === 'INDIRIM10') {
      setAppliedCoupon({ code: clean, discountRate: 0.10, label: '%10 Özel Çeyiz İndirimi' });
      showToast('Tebrikler! %10 indirim uygulandı.', 'success');
      return true;
    } else {
      showToast('Geçersiz kupon kodu. ("BAHAR15" veya "CEYIZ2026" deneyiniz)', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('İndirim kuponu kaldırıldı.', 'info');
  };

  // Create Order
  const createOrder = (orderData) => {
    const orderId = `VLZ-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
      id: orderId,
      ...orderData,
      status: 'Sipariş Alındı',
      statusNote: 'Siparişiniz sistemimize kaydedildi. Teslimat ve montaj planlaması için müşteri temsilcimiz arayacaktır.',
      date: formattedDate
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, note = '') => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          statusNote: note || o.statusNote
        };
      }
      return o;
    }));
    showToast(`Sipariş durumu "${newStatus}" olarak güncellendi.`, 'success');
  };

  // Product CRUD
  const addProduct = (productData) => {
    const newId = `val-${Date.now()}`;
    const newSku = `VLZ-${(productData.category || 'OTR').substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newProduct = {
      id: newId,
      sku: newSku,
      name: productData.name,
      category: productData.category || 'oturma-grubu',
      categoryName: CATEGORIES.find(c => c.id === productData.category)?.name || 'Oturma Grubu',
      collection: productData.collection || `${productData.name} Serisi`,
      basePrice: Number(productData.price) || 25000,
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : null,
      rating: 5.0,
      reviewCount: 1,
      isNew: true,
      isFeatured: Boolean(productData.featured),
      tag: "Yeni Koleksiyon",
      shortDescription: productData.shortDescription || productData.description?.substring(0, 100),
      description: productData.description || 'Yüksek konforlu ve estetik tasarım mobilya parçası.',
      colors: productData.colors || [{ name: 'Standart', hex: '#D6CCC2' }],
      images: productData.images && productData.images.length > 0 ? productData.images : [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
      ],
      modules: productData.modules || [
        { id: `mod-${Date.now()}`, name: "Ana Modül", price: Number(productData.price) || 25000, width: 200, depth: 90, height: 80, defaultSelected: true }
      ],
      features: productData.features || ['Birinci sınıf ergonomik sünger', 'Leke tutmayan kumaş', 'Robot süpürge uyumlu ayaklar'],
      technicalSpecs: productData.technicalSpecs || { "İskelet": "Masif Gürgen", "Kumaş": "İthal Dokuma" },
      deliveryInstallInfo: "Ücretsiz nakliye ve kat içi montaj dahildir.",
      warranty: "2 Yıl Üretici Garantisi"
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" kataloğa eklendi.`, 'success');
    return newProduct;
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          ...updatedFields,
          basePrice: updatedFields.price !== undefined ? Number(updatedFields.price) : p.basePrice,
          discountPrice: updatedFields.discountPrice !== undefined ? (updatedFields.discountPrice ? Number(updatedFields.discountPrice) : null) : p.discountPrice
        };
      }
      return p;
    }));
    showToast('Mobilya bilgileri güncellendi.', 'success');
  };

  const deleteProduct = (productId) => {
    const prod = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCart(prev => prev.filter(item => item.id !== productId));
    setWishlist(prev => prev.filter(id => id !== productId));
    showToast(`"${prod?.name || 'Ürün'}" katalogdan silindi.`, 'info');
  };

  const addMessage = (messageData) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...messageData,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
    showToast('Mesajınız ve showroom talebiniz başarıyla alındı.', 'success');
  };

  const markMessageRead = (messageId) => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, read: true } : m));
  };

  // Enriched Cart Items with product metadata & price calculations
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return null;

    let itemPrice = item.unitPrice || product.discountPrice || product.basePrice || product.price;
    let selectedModuleNames = [];

    if (product.modules && item.selectedModules && item.selectedModules.length > 0) {
      const activeMods = product.modules.filter(m => item.selectedModules.includes(m.id));
      if (activeMods.length > 0) {
        selectedModuleNames = activeMods.map(m => m.name);
      }
    }

    return {
      ...item,
      product,
      calculatedPrice: itemPrice,
      selectedModuleNames
    };
  }).filter(Boolean);

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.calculatedPrice * item.quantity), 0);
  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discountRate) : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      messages,
      cart,
      cartItems,
      cartSubtotal,
      discountAmount,
      grandTotal,
      totalCartCount,
      appliedCoupon,
      wishlist,
      activeTab,
      selectedProductId,
      selectedCategory,
      searchQuery,
      isCartOpen,
      isShowroomModalOpen,
      isAuthModalOpen,
      quickViewProduct,
      installmentProduct,
      lastPlacedOrder,
      toast,
      setActiveTab,
      setSelectedProductId,
      setSelectedCategory,
      setSearchQuery,
      setIsCartOpen,
      setIsShowroomModalOpen,
      setIsAuthModalOpen,
      setQuickViewProduct,
      setInstallmentProduct,
      navigateTo,
      goBack,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      applyCoupon,
      removeCoupon,
      createOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      addMessage,
      markMessageRead,
      showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
