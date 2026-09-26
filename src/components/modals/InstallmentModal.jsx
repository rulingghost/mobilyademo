import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, CreditCard, ShieldCheck } from 'lucide-react';

export const InstallmentModal = () => {
  const { installmentProduct, setInstallmentProduct } = useStore();

  if (!installmentProduct) return null;

  const basePrice = installmentProduct.discountPrice || installmentProduct.basePrice || installmentProduct.price;

  const banks = [
    { name: "Maximum (İş Bankası)", badgeColor: "bg-blue-600" },
    { name: "Worldcard (Yapı Kredi)", badgeColor: "bg-purple-600" },
    { name: "Bonus (Garanti BBVA)", badgeColor: "bg-emerald-600" },
    { name: "Axess (Akbank)", badgeColor: "bg-rose-600" },
    { name: "Paraf (Halkbank)", badgeColor: "bg-cyan-600" }
  ];

  const installments = [
    { count: 3, rate: 1.0 },
    { count: 6, rate: 1.0 },
    { count: 9, rate: 1.0 }, // Peşin fiyatına 9 taksit!
    { count: 12, rate: 1.05 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Taksit Seçenekleri Tablosu</h3>
              <p className="text-xs text-stone-500">{installmentProduct.name}</p>
            </div>
          </div>
          <button
            onClick={() => setInstallmentProduct(null)}
            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Peşin Fiyatına Kampanya Vurgusu */}
        <div className="p-4 bg-amber-50 border-b border-amber-200/80 flex items-center justify-between text-xs text-amber-900 font-medium">
          <span>🌟 Anlaşmalı tüm kredi kartlarına <strong>Peşin Fiyatına 9 Taksit</strong> imkanı!</span>
          <span className="font-bold font-serif text-sm text-stone-900">{basePrice.toLocaleString('tr-TR')} ₺</span>
        </div>

        {/* Installment Table */}
        <div className="p-6 overflow-x-auto max-h-[60vh]">
          <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
            <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Banka / Kart Programı</th>
                <th className="p-3 text-center">Taksit</th>
                <th className="p-3 text-right">Aylık Ödeme</th>
                <th className="p-3 text-right">Toplam Tutar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {banks.map((bank, bIdx) => (
                <React.Fragment key={bIdx}>
                  <tr className="bg-stone-50/80 font-bold text-stone-800 text-[11px]">
                    <td colSpan={4} className="py-2 px-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-stone-900 mr-2"></span>
                      {bank.name}
                    </td>
                  </tr>
                  {installments.map((inst, iIdx) => {
                    const totalVal = Math.round(basePrice * inst.rate);
                    const monthly = Math.round(totalVal / inst.count);
                    const isZeroInterest = inst.rate === 1.0;

                    return (
                      <tr key={iIdx} className="hover:bg-amber-50/40 transition">
                        <td className="py-2.5 px-4 pl-8 text-stone-600">
                          {inst.count} Taksit {isZeroInterest && <span className="text-[10px] text-emerald-700 font-bold ml-1.5 bg-emerald-50 px-1.5 py-0.5 rounded">Vade Farksız</span>}
                        </td>
                        <td className="py-2.5 px-3 text-center text-stone-700 font-semibold">{inst.count} Ay</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-900">{monthly.toLocaleString('tr-TR')} ₺</td>
                        <td className="py-2.5 px-3 text-right font-mono text-stone-700">{totalVal.toLocaleString('tr-TR')} ₺</td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Korumalı Güvenli Ödeme Altyapısı</span>
          </div>
          <button
            onClick={() => setInstallmentProduct(null)}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
