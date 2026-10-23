import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import IntroPage from './pages/IntroPage';
import AccueilPage from './pages/AccueilPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/accueil" element={<AccueilPage />} />
          <Route path="/atmosphere" element={<Navigate to="/accueil" replace />} />
          <Route path="/boutique" element={<ShopPage />} />
          <Route path="/produit/:slug" element={<ProductPage />} />
          <Route path="/commande" element={<CheckoutPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/accueil" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
