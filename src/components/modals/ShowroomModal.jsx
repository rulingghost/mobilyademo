import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SHOWROOMS } from '../../data/furnitureData';
import { X, MapPin, Phone, Clock, Compass, CheckCircle2, Calendar } from 'lucide-react';

export const ShowroomModal = () => {
  const { isShowroomModalOpen, setIsShowroomModalOpen, showToast } = useStore();
  const [selectedCity, setSelectedCity] = useState('Hepsi');
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [activeShowroom, setActiveShowroom] = useState(null);

  if (!isShowroomModalOpen) return null;

  const cities = ['Hepsi', 'İstanbul', 'Ankara', 'İzmir'];

  const filteredShowrooms = selectedCity === 'Hepsi'
    ? SHOWROOMS
    : SHOWROOMS.filter(s => s.city === selectedCity);

  const handleBookVisit = (showroom) => {
    setActiveShowroom(showroom);
    setAppointmentSent(true);
    showToast(`${showroom.name} için randevu talebiniz oluşturuldu. Danışmanımız arayacaktır.`, 'success');
    setTimeout(() => {
      setAppointmentSent(false);
      setIsShowroomModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Mobilya Showroomları</h3>
              <p className="text-xs text-stone-300">Mobilyalarımızı yakından inceleyin, kumaş kartelalarını hissedin</p>
            </div>
          </div>
          <button
            onClick={() => setIsShowroomModalOpen(false)}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City Filter Pills */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-stone-500 mr-2">Şehir:</span>
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCity === c
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Showrooms List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredShowrooms.map((showroom, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl border border-stone-200 hover:border-amber-500/60 hover:shadow-md transition bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-bold text-[10px] uppercase">
                    {showroom.city}
                  </span>
                  <h4 className="font-bold text-stone-900 text-sm">{showroom.name}</h4>
                </div>

                <p className="text-xs text-stone-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{showroom.address}</span>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" /> {showroom.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" /> {showroom.hours}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {showroom.features.map((f, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-200/70 text-stone-700 font-medium">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleBookVisit(showroom)}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Randevu Al</span>
                </button>
                <button
                  onClick={() => showToast('Yol tarifi haritalar uygulamasında açılıyor...', 'info')}
                  className="px-4 py-2.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Yol Tarifi</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 text-center">
          Mağazalarımızda ücretsiz mimari danışmanlık ve 3D oda yerleşim çizimi hizmeti verilmektedir.
        </div>
      </div>
    </div>
  );
};
