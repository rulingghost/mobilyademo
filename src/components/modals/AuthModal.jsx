import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, User, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, showToast, navigateTo } = useStore();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      showToast('Giriş başarılı! Hoş geldiniz, Selin Yılmaz.', 'success');
    } else {
      showToast('Hesabınız başarıyla oluşturuldu! Hoş geldiniz.', 'success');
    }
    setIsAuthModalOpen(false);
  };

  const handleDemoQuickLogin = () => {
    showToast('Demo müşteri hesabı ile başarıyla giriş yapıldı.', 'success');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <span className="font-bold text-base">Mobilya Müşteri Paneli</span>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex border-b border-stone-200 text-xs font-bold text-center">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 border-b-2 transition ${
              mode === 'login'
                ? 'border-stone-900 text-stone-900 bg-stone-50'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 border-b-2 transition ${
              mode === 'register'
                ? 'border-stone-900 text-stone-900 bg-stone-50'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Yeni Üyelik Oluştur
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="font-bold text-stone-700 block mb-1">Ad Soyad</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Selin Yılmaz"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-700"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-stone-700 block mb-1">E-Posta Adresi</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-700"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-stone-700">Şifre</label>
              {mode === 'login' && (
                <button type="button" className="text-[11px] text-amber-700 hover:underline">
                  Şifremi Unuttum
                </button>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative py-2 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
            <span className="relative px-3 bg-white text-[11px] text-stone-400 font-semibold">VEYA</span>
          </div>

          <button
            type="button"
            onClick={handleDemoQuickLogin}
            className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold transition"
          >
            Demo Müşteri Olarak Hızlı Devam Et
          </button>
        </form>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-center gap-2 text-[11px] text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Kişisel verileriniz 6698 sayılı KVKK kapsamında korunmaktadır.</span>
        </div>
      </div>
    </div>
  );
};
