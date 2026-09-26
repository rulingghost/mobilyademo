import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  PackageCheck, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

export const OrderTrackingPage = () => {
  const { orders, navigateTo, goBack } = useStore();
  const [searchOrderId, setSearchOrderId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    const found = orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase());
    setSelectedOrder(found || null);
  };

  const getStatusStep = (status) => {
    switch (status) {
      case 'Sipariş Alındı': return 1;
      case 'Hazırlanıyor': return 2;
      case 'Sevkiyatta': return 2;
      case 'Teslim Edildi': return 3;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={goBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Geri Dön</span>
      </button>

      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Müşteri Hizmetleri</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
          Sipariş ve Montaj Takibi
        </h1>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Sipariş takip numaranızı girerek mobilyalarınızın teslimat ve montaj randevu aşamalarını anlık olarak takip edebilirsiniz.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Sipariş Takip No (Örn: ORD-2026-9041 veya VLZ-...)"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-stone-800 shadow-2xs"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#1E2229] hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          Sorgula
        </button>
      </form>

      {/* Quick Recent Orders Pills */}
      {orders.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-stone-500 font-medium">Kayıtlı Siparişler:</span>
          {orders.map(o => (
            <button
              key={o.id}
              onClick={() => setSelectedOrder(o)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition border ${
                selectedOrder?.id === o.id
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              {o.id}
            </button>
          ))}
        </div>
      )}

      {/* Order Status Display */}
      {selectedOrder ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs text-stone-400 font-mono">Takip No: {selectedOrder.id}</span>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                Alıcı: {selectedOrder.customer.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Sipariş Tarihi: {selectedOrder.date}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                {selectedOrder.status}
              </span>
              <p className="text-xs font-serif font-bold text-stone-950 mt-1">
                Tutar: {selectedOrder.total.toLocaleString('tr-TR')} ₺
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Teslimat & Montaj Aşamaları
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className={`p-4 rounded-2xl border ${
                getStatusStep(selectedOrder.status) >= 1
                  ? 'bg-amber-50/70 border-amber-300 text-stone-900'
                  : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    getStatusStep(selectedOrder.status) >= 1 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'
                  }`}>
                    1
                  </div>
                  <span className="font-semibold text-xs">Sipariş Alındı</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Mobilyalarınızın sevkiyat ve lojistik planlaması yapıldı.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                getStatusStep(selectedOrder.status) >= 2
                  ? 'bg-amber-50/70 border-amber-300 text-stone-900'
                  : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    getStatusStep(selectedOrder.status) >= 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-500'
                  }`}>
                    2
                  </div>
                  <span className="font-semibold text-xs">Sevkiyat & Randevu</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Özel nakliye aracı yolda. Dairenize teslimat randevusu alındı.
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                getStatusStep(selectedOrder.status) >= 3
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    getStatusStep(selectedOrder.status) >= 3 ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-500'
                  }`}>
                    3
                  </div>
                  <span className="font-semibold text-xs">Teslim & Montaj</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Uzman marangoz ekibimizce montaj tamamlandı.
                </p>
              </div>

            </div>

            {selectedOrder.statusNote && (
              <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-800 flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Lojistik Notu: </span>
                  <span>{selectedOrder.statusNote}</span>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Details & Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200 text-xs">
            <div className="space-y-1.5">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">Teslimat Adresi</h4>
              <p className="text-stone-700">{selectedOrder.customer.address}</p>
              <p className="text-stone-700">{selectedOrder.customer.district} / {selectedOrder.customer.city}</p>
              <p className="text-stone-500">{selectedOrder.customer.phone}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">Siparişteki Mobilyalar</h4>
              <div className="divide-y divide-stone-100">
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={it.image} alt="" className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                      <div>
                        <p className="font-medium text-stone-900">{it.name}</p>
                        <p className="text-[10px] text-stone-400">{it.quantity} adet</p>
                      </div>
                    </div>
                    <span className="font-semibold text-stone-950 font-serif">
                      {(it.price * it.quantity).toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-900">Sipariş Bulunamadı</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Girdiğiniz takip numarası ile eşleşen kayıt bulunamadı. Lütfen numarayı kontrol ediniz.
          </p>
        </div>
      )}

    </div>
  );
};
