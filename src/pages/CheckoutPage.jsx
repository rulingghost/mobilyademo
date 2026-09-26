import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  MapPin, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Building, 
  Phone, 
  Mail, 
  User, 
  Lock, 
  Copy, 
  Check, 
  ShoppingBag 
} from 'lucide-react';

export const CheckoutPage = () => {
  const { 
    cartItems, 
    cartSubtotal, 
    discountAmount, 
    grandTotal, 
    appliedCoupon, 
    createOrder, 
    navigateTo, 
    goBack,
    showToast 
  } = useStore();

  const [step, setStep] = useState(1); // 1: Delivery, 2: Payment, 3: Success

  const [formData, setFormData] = useState({
    firstName: 'Selin',
    lastName: 'Yılmaz',
    email: 'selin.yilmaz@example.com',
    phone: '0532 841 22 90',
    city: 'İstanbul',
    district: 'Kadıköy',
    address: 'Bağdat Caddesi No: 284 Daire: 8',
    floorInfo: 'Kat 4, Geniş sedye/yük asansörü mevcuttur.',
    deliveryNote: 'Hafta içi saat 14:00 sonrası teslime uygundur.',
    paymentMethod: 'credit-card',
    installmentCount: '9', // Peşin fiyatına 9 taksit!
    cardName: 'SELİN YILMAZ',
    cardNumber: '4543 •••• •••• 8921',
    cardExpiry: '08/28',
    cardCvv: '342'
  });

  const [createdOrderSummary, setCreatedOrderSummary] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address || !formData.city) {
        showToast('Lütfen zorunlu teslimat alanlarını eksiksiz doldurunuz.', 'warning');
        return;
      }
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      showToast('Sepetinizde mobilya bulunmuyor.', 'error');
      return;
    }

    const orderPayload = {
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        district: formData.district,
        address: formData.address,
        floorInfo: formData.floorInfo,
        deliveryNote: formData.deliveryNote
      },
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        color: item.selectedColor,
        modules: item.selectedModuleNames,
        price: item.calculatedPrice,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      total: grandTotal,
      couponCode: appliedCoupon ? appliedCoupon.code : '',
      paymentMethod: formData.paymentMethod === 'credit-card' 
        ? `Kredi Kartı (${formData.installmentCount} Taksit)` 
        : 'Kapıda Kurulum Sonrası Ödeme'
    };

    const newOrder = createOrder(orderPayload);
    setCreatedOrderSummary(newOrder);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopyOrderId = () => {
    if (createdOrderSummary) {
      navigator.clipboard?.writeText(createdOrderSummary.id);
      setIsCopied(true);
      showToast('Sipariş takip kodu kopyalandı.', 'info');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-900">Sepetinizde Ürün Bulunmuyor</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Sipariş oluşturabilmek için lütfen mobilya koleksiyonumuzdan ürün ekleyiniz.
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-6 py-3 bg-[#1E2229] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition"
        >
          Koleksiyonu İncele
        </button>
      </div>
    );
  }

  // STEP 3: SUCCESS SCREEN
  if (step === 3 && createdOrderSummary) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in duration-300">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xl text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Siparişiniz Alındı
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
            Teşekkür Ederiz, {createdOrderSummary.customer.name}!
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            Siparişiniz sisteme kaydedildi. Lojistik ve montaj planlama ekibimiz randevu teyidi için sizinle iletişime geçecektir.
          </p>

          {/* Tracking Code Pill */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
              <span className="text-stone-500 font-medium">Sipariş Takip No:</span>
              <span className="font-mono font-bold text-base text-stone-950">{createdOrderSummary.id}</span>
              <button
                onClick={handleCopyOrderId}
                className="p-1 text-stone-500 hover:text-black transition"
                title="Kodu Kopyala"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
            Sipariş ve Teslimat Özeti
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <p className="font-bold text-stone-900 uppercase tracking-wider text-[10px]">Teslimat Adresi & İletişim</p>
              <p className="text-stone-800 font-semibold">{createdOrderSummary.customer.name}</p>
              <p className="text-stone-600">{createdOrderSummary.customer.phone} • {createdOrderSummary.customer.email}</p>
              <p className="text-stone-600">{createdOrderSummary.customer.address}</p>
              <p className="text-stone-600">{createdOrderSummary.customer.district} / {createdOrderSummary.customer.city}</p>
              {createdOrderSummary.customer.floorInfo && (
                <p className="text-stone-500 italic">Not: {createdOrderSummary.customer.floorInfo}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <p className="font-bold text-stone-900 uppercase tracking-wider text-[10px]">Ödeme & Kurulum Bilgisi</p>
              <p className="text-stone-600">Ödeme Yöntemi: <span className="font-semibold text-stone-900">{createdOrderSummary.paymentMethod}</span></p>
              <p className="text-stone-600">Durum: <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{createdOrderSummary.status}</span></p>
              <p className="text-stone-600">Montaj: <span className="font-semibold text-emerald-700">Ücretsiz Kat İçi Kurulum Dahil</span></p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="divide-y divide-stone-100 border-t border-stone-100 pt-3">
            {createdOrderSummary.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl border border-stone-200" />
                  <div>
                    <p className="font-bold text-stone-900">{item.name}</p>
                    {item.color && <p className="text-[11px] text-amber-800">Renk: {item.color}</p>}
                    {item.modules && item.modules.length > 0 && (
                      <p className="text-[10px] text-stone-400">Modüller: {item.modules.join(', ')}</p>
                    )}
                    <p className="text-[10px] text-stone-500">{item.quantity} adet</p>
                  </div>
                </div>
                <span className="font-bold text-stone-950 font-serif">
                  {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm">
            <span className="font-bold text-stone-900">Ödenen Toplam Tutar:</span>
            <span className="font-serif text-xl font-bold text-stone-950">{createdOrderSummary.total.toLocaleString('tr-TR')} ₺</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigateTo('orders')}
              className="flex-1 py-3 px-4 bg-[#1E2229] hover:bg-stone-800 text-white rounded-xl text-xs font-semibold text-center transition"
            >
              Sipariş Takip Ekranına Git
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="py-3 px-6 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold text-center transition"
            >
              Anasayfaya Dön
            </button>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={goBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Geri Dön</span>
      </button>

      {/* Stepper */}
      <div className="max-w-lg mx-auto flex items-center justify-center gap-4 text-xs font-semibold">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-stone-900' : 'text-stone-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 1 ? 'bg-[#1E2229] text-white' : 'bg-stone-200 text-stone-600'
          }`}>
            1
          </div>
          <span>Teslimat & Montaj</span>
        </div>

        <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-[#1E2229]' : 'bg-stone-200'}`} />

        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-stone-900' : 'text-stone-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 2 ? 'bg-[#1E2229] text-white' : 'bg-stone-200 text-stone-600'
          }`}>
            2
          </div>
          <span>Ödeme Yöntemi</span>
        </div>

        <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-[#1E2229]' : 'bg-stone-200'}`} />

        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-stone-900' : 'text-stone-400'}`}>
          <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs">
            3
          </div>
          <span>Onay</span>
        </div>
      </div>

      {/* Grid: Form + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-700" />
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Teslimat ve Kat Montaj Adresi
                  </h2>
                </div>
                <span className="text-xs text-stone-400">Adım 1 / 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Adınız *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Soyadınız *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Telefon Numarası *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">E-Posta Adresi *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">İl *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-stone-800"
                  >
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Antalya">Antalya</option>
                    <option value="Adana">Adana</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">İlçe *</label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Açık Adres (Cadde, Mahalle, No, Daire) *</label>
                <textarea
                  name="address"
                  rows={2}
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Bina Katı & Asansör Bilgisi (Montaj Ekibi İçin Önemlidir)</label>
                <input
                  type="text"
                  name="floorInfo"
                  value={formData.floorInfo}
                  onChange={handleInputChange}
                  placeholder="Örn: 4. Kat, Yük / Sedye Asansörü mevcuttur"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-800"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Geri Dön
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1E2229] hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <span>Ödeme Adımına Geç</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-700" />
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Ödeme Tercihi & Taksit
                  </h2>
                </div>
                <span className="text-xs text-stone-400">Adım 2 / 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'credit-card' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-stone-900">Online Kredi Kartı</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                      className="accent-stone-900"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Peşin fiyatına 9 taksit veya tek çekim ile 3D Secure güvenli ödeme.
                  </p>
                </label>

                <label className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-stone-900">Kapıda Montaj Sonrası Ödeme</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="accent-stone-900"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Mobilyanız kurulup teslim formu imzalandıktan sonra pos cihazı veya nakit ile ödeyin.
                  </p>
                </label>
              </div>

              {formData.paymentMethod === 'credit-card' && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">Taksit Seçimi</label>
                    <select
                      name="installmentCount"
                      value={formData.installmentCount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold"
                    >
                      <option value="1">Tek Çekim - {grandTotal.toLocaleString('tr-TR')} ₺</option>
                      <option value="3">3 Taksit (Vade Farksız) - {Math.round(grandTotal/3).toLocaleString('tr-TR')} ₺ × 3 Ay</option>
                      <option value="6">6 Taksit (Vade Farksız) - {Math.round(grandTotal/6).toLocaleString('tr-TR')} ₺ × 6 Ay</option>
                      <option value="9">9 Taksit (Özel Kampanya - Vade Farksız) - {Math.round(grandTotal/9).toLocaleString('tr-TR')} ₺ × 9 Ay</option>
                      <option value="12">12 Taksit - {Math.round((grandTotal*1.05)/12).toLocaleString('tr-TR')} ₺ × 12 Ay</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-1">Kart Numarası</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-1">Kart Sahibi</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-stone-600 hover:text-black flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Adrese Geri Dön
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#1E2229] hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition"
                >
                  <span>Siparişi Onayla</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
          <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-200 pb-3">
            Sipariş Özeti ({cartItems.length} Kalem)
          </h3>

          <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId || item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900 truncate">{item.product.name}</p>
                  {item.selectedColor && <p className="text-[10px] text-amber-800">Renk: {item.selectedColor}</p>}
                  <p className="text-[10px] text-stone-500">{item.quantity} adet × {item.calculatedPrice.toLocaleString('tr-TR')} ₺</p>
                </div>
                <span className="font-bold text-stone-950 font-serif">
                  {(item.calculatedPrice * item.quantity).toLocaleString('tr-TR')} ₺
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs">
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
              <span>Teslimat & Montaj</span>
              <span className="text-emerald-700 font-bold uppercase text-[11px]">Ücretsiz</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
              <span className="font-serif text-sm font-bold text-stone-900">Toplam Tutar</span>
              <span className="font-serif text-xl font-bold text-stone-950">
                {grandTotal.toLocaleString('tr-TR')} ₺
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
