import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { InstallmentModal } from './components/modals/InstallmentModal';
import { ShowroomModal } from './components/modals/ShowroomModal';
import { AuthModal } from './components/modals/AuthModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent = () => {
  const { activeTab } = useStore();

  if (activeTab === 'admin') {
    return (
      <div className="min-h-screen bg-stone-100 text-stone-900 font-sans selection:bg-amber-600 selection:text-white">
        <AdminDashboard />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'catalog' && <CatalogPage />}
        {activeTab === 'detail' && <ProductDetailPage />}
        {activeTab === 'checkout' && <CheckoutPage />}
        {activeTab === 'wishlist' && <WishlistPage />}
        {activeTab === 'orders' && <OrderTrackingPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <InstallmentModal />
      <ShowroomModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
