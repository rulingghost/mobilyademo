import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  CreditCard,
  ArrowRight,
  Headphones,
  Lock,
  Compass
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setSelectedCategory, setIsShowroomModalOpen, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Lütfen geçerli bir e-posta adresi giriniz.', 'error');
      return;
    }
    showToast('Mobilya kampanya bültenine kaydınız alındı. Hoş geldiniz!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#1E2229] text-stone-300 border-t border-stone-800">
      
      {/* 1. Services Strip */}
      <div className="border-b border-stone-800/80 bg-stone-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Ücretsiz Teslimat & Montaj</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Tüm Türkiye'de kendi uzman ekibimizce</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Peşin Fiyatına 9 Taksit</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Anlaşmalı tüm banka kartlarına</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">2 Yıl Garanti</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">10 yıl iskelet dayanım güvencesi</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">444 33 44 Müşteri Hattı</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Haftanın 7 günü 09:00 - 20:00</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-extrabold tracking-tight text-white">
                MOBİLYA
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Mobilya, 30 yılı aşkın üretim tecrübesiyle evinizin her köşesine zarafet, fonksiyonellik ve benzersiz konfor taşır.
            </p>

            <div className="pt-2">
              <p className="text-xs font-bold text-white mb-2">Kampanya ve Yeni Katalog Bülteni</p>
              <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="E-posta adresiniz..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1"
                >
                  Kayıt Ol <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Categories Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Mobilya Grupları</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => { setSelectedCategory('oturma-grubu'); navigateTo('catalog'); }} className="hover:text-white transition">
                  Oturma Grubu & Koltuklar
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('yemek-odasi'); navigateTo('catalog'); }} className="hover:text-white transition">
                  Yemek Odası Takımları
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('yatak-odasi'); navigateTo('catalog'); }} className="hover:text-white transition">
                  Yatak Odası & Karyolalar
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('kose-takimi'); navigateTo('catalog'); }} className="hover:text-white transition">
                  Fonksiyonel Köşe Takımları
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('yatak-baza'); navigateTo('catalog'); }} className="hover:text-white transition">
                  Ortopedik Yatak & Baza
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('calisma-odasi'); navigateTo('catalog'); }} className="hover:text-white transition">
                  Çalışma & Genç Odası
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & Customer Service */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Müşteri Rehberi</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigateTo('orders')} className="hover:text-white transition">
                  Sipariş Durumu Sorgula
                </button>
              </li>
              <li>
                <button onClick={() => setIsShowroomModalOpen(true)} className="hover:text-white transition">
                  Mağazalarımız & Showroom Bul
                </button>
              </li>
              <li>
                <span className="text-stone-400">Ücretsiz Mimari Danışmanlık</span>
              </li>
              <li>
                <span className="text-stone-400">Kumaş & Mobilya Bakım Kılavuzu</span>
              </li>
              <li>
                <span className="text-stone-400">Teslimat & Montaj Şartları</span>
              </li>
              <li>
                <span className="text-stone-400">Taksit ve Ödeme Seçenekleri</span>
              </li>
            </ul>
          </div>

          {/* Corporate & Discreet Admin Access */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">Kurumsal</h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span>Hakkımızda</span></li>
              <li><span>Kariyer Olanakları</span></li>
              <li><span>Sürdürülebilirlik & İhracat</span></li>
              <li><span>Bayilik Başvurusu</span></li>
              <li><span>KVKK & Çerez Politikası</span></li>
              <li className="pt-2 border-t border-stone-800">
                {/* Discreet Admin Link */}
                <button 
                  onClick={() => navigateTo('admin')}
                  className="text-stone-500 hover:text-amber-400 transition text-[11px] flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>Yönetici / Bayi Girişi</span>
                </button>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-700 transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-700 transition" aria-label="Facebook">
                <svg className="w-4 h-4 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bank & Payment Cards Trust Strip (İstikbal Style) */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase font-bold text-stone-500">
            <span>Taksit İmkanları:</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">Maximum</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">World</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">Bonus</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">Axess</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">CardFinans</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300">Paraf</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-500">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Sertifikalı Güvenli Ödeme</span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 pt-4 border-t border-stone-800/60 text-center text-[11px] text-stone-500">
          © 2026 MOBİLYA SANAYİ VE TİCARET A.Ş. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};
