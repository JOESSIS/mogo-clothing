import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import ColorPlate from './ColorPlate';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, light = false }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || 'Unique', 1);
  };

  if (light) {
    return (
      <div className="group relative flex flex-col bg-white border border-[#E8E1C5] hover:border-[#111317] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)]">
        {/* Plaque / Image cliquable */}
        <Link to={`/produit/${product.slug}`} className="block relative overflow-hidden bg-[#FAF5DF]">
          <ColorPlate product={product} aspectRatio="4/5" />

          {/* Overlay hover avec actions rapides */}
          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <span className="p-3 bg-white text-[#111317] rounded-full hover:scale-110 transition-transform shadow-lg flex items-center justify-center" title="Voir les détails">
              <Eye className="w-4 h-4" />
            </span>
            <button
              onClick={handleQuickAdd}
              className="p-3 bg-[#111317] text-white font-bold rounded-full hover:scale-110 transition-transform shadow-lg flex items-center justify-center"
              title="Ajout rapide au panier"
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* Badge Nouveauté si présent */}
          {product.isNew && (
            <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#111317] text-white rounded-full shadow-md">
              Nouveau
            </span>
          )}
        </Link>

        {/* Informations produit */}
        <div className="p-4 flex flex-col flex-grow justify-between bg-white">
          <div>
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1">
              <span className="uppercase tracking-widest text-[10px] font-bold text-[#8C0037]">
                {product.collection}
              </span>
              <span className="text-[11px] text-[#4B5563]">{product.color?.name}</span>
            </div>

            <Link to={`/produit/${product.slug}`} className="block">
              <h3 className="text-sm sm:text-base font-bold text-[#111317] group-hover:text-[#8C0037] transition-colors line-clamp-1 font-display">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="mt-3 pt-3 border-t border-[#F0EAD2] flex items-center justify-between">
            <span className="text-sm font-extrabold text-[#111317] tracking-wide font-display">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleQuickAdd}
              className="text-xs font-semibold text-[#111317] hover:text-white transition-colors flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#FAF5DF] hover:bg-[#111317]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              + Panier
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dark variant (utilisé sur pages à thème sombre si besoin)
  return (
    <div className="group relative flex flex-col bg-[#13161C] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(242,152,188,0.35)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
      <Link to={`/produit/${product.slug}`} className="block relative overflow-hidden">
        <ColorPlate product={product} aspectRatio="4/5" />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <span className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg flex items-center justify-center" title="Voir les détails">
            <Eye className="w-4 h-4" />
          </span>
          <button
            onClick={handleQuickAdd}
            className="p-3 bg-[#F298BC] text-[#0A0B0D] font-bold rounded-full hover:scale-110 transition-transform shadow-lg flex items-center justify-center"
            title="Ajout rapide au panier"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        {product.isNew && (
          <span className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#F298BC] text-[#0A0B0D] rounded-full shadow-md">
            Nouveau
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow justify-between bg-[#13161C]">
        <div>
          <div className="flex items-center justify-between text-xs text-[rgba(247,248,250,0.6)] mb-1">
            <span className="uppercase tracking-widest text-[10px] font-semibold text-[#F298BC]">
              {product.collection}
            </span>
            <span>{product.color?.name}</span>
          </div>

          <Link to={`/produit/${product.slug}`} className="block">
            <h3 className="text-sm sm:text-base font-bold text-[#F7F8FA] group-hover:text-[#F298BC] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <span className="text-sm font-extrabold text-[#F7F8FA] tracking-wide font-display">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleQuickAdd}
            className="text-xs font-semibold text-[rgba(247,248,250,0.8)] hover:text-[#F298BC] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(242,152,188,0.15)]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            + Panier
          </button>
        </div>
      </div>
    </div>
  );
}
