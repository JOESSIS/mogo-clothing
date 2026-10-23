import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', path: '/accueil' },
    { label: 'Boutique', path: '/boutique' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0B0D]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 md:h-24 flex items-center justify-between relative">
        {/* Navigation gauche (Desktop) - Police Boardley */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/accueil"
            className={`font-boardley text-2xl tracking-wide transition-colors ${
              location.pathname === '/accueil' || location.pathname === '/'
                ? 'text-white border-b-2 border-white pb-0.5'
                : 'text-[rgba(247,248,250,0.7)] hover:text-white'
            }`}
          >
            Accueil
          </Link>
          <Link
            to="/boutique"
            className={`font-boardley text-2xl tracking-wide transition-colors ${
              location.pathname === '/boutique'
                ? 'text-white border-b-2 border-white pb-0.5 font-bold'
                : 'text-[rgba(247,248,250,0.7)] hover:text-white'
            }`}
          >
            Boutique
          </Link>
        </nav>

        {/* Bouton Hamburger Mobile (Gauche) */}
        <div className="flex md:hidden items-center z-10">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:text-white transition-colors"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* LOGO OFFICIEL GRAND FORMAT CENTRÉ AU MILIEU */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center flex items-center justify-center">
          <Link to="/accueil" className="group block focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-1" title="Le Môgô de God">
            <img
              src="/brand/logo.svg"
              alt="Le Môgô de God Clothing"
              className="h-10 sm:h-14 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
            />
          </Link>
        </div>

        {/* Navigation droite (Desktop) - Police Boardley + Panier */}
        <div className="flex items-center gap-4 sm:gap-8 z-10">
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/a-propos"
              className={`font-boardley text-2xl tracking-wide transition-colors ${
                location.pathname === '/a-propos'
                  ? 'text-white border-b-2 border-white pb-0.5'
                  : 'text-[rgba(247,248,250,0.7)] hover:text-white'
              }`}
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className={`font-boardley text-2xl tracking-wide transition-colors ${
                location.pathname === '/contact'
                  ? 'text-white border-b-2 border-white pb-0.5'
                  : 'text-[rgba(247,248,250,0.7)] hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Panier */}
          <button
            onClick={openCart}
            aria-label={`Ouvrir le panier (${totalItems} articles)`}
            className="relative p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all focus:outline-none focus:ring-2 focus:ring-white shadow-sm hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-[#0A0B0D] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0B0D]/98 border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-boardley text-2xl py-2 transition-colors ${
                location.pathname === link.path
                  ? 'text-white font-bold'
                  : 'text-[rgba(247,248,250,0.8)] hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
