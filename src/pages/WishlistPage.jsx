import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist, products, navigateTo, goBack } = useStore();

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with working Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri Dön</span>
          </button>

          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-900 flex items-center gap-2">
              <span>Favori Mobilyalarım</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-sans font-bold">
                {favoriteProducts.length}
              </span>
            </h1>
          </div>
        </div>

        <button
          onClick={() => navigateTo('catalog')}
          className="text-xs font-bold text-stone-700 hover:text-black self-start sm:self-auto"
        >
          Koleksiyonu İncele →
        </button>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-xl font-bold text-stone-900">Henüz Favori Mobilyanız Yok</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Beğendiğiniz mobilyaların kalp simgesine tıklayarak favorilerinize ekleyebilir, daha sonra kolayca inceleyebilirsiniz.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="px-6 py-2.5 bg-[#1E2229] text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition"
          >
            Mobilyaları Keşfet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
