import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CartDrawer from '../components/CartDrawer';
import ColorPlate from '../components/ColorPlate';
import { PRODUCTS, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RefreshCw, MessageCircle } from 'lucide-react';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Unique');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] text-white flex flex-col items-center justify-center p-6">
        <p className="text-xl font-bold mb-4">Produit introuvable</p>
        <Link to="/boutique" className="px-6 py-2.5 rounded-full bg-[#F298BC] text-[#0A0B0D] font-bold text-xs uppercase tracking-wider">
          Retourner au catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleDirectWhatsApp = () => {
    const singleItemCart = [{
      cartItemId: `${product.id}-${selectedSize}`,
      id: product.id,
      name: product.name,
      collection: product.collection,
      price: product.price,
      currency: product.currency,
      color: product.color,
      selectedSize,
      quantity
    }];
    const url = generateWhatsAppOrderUrl({ cart: singleItemCart });
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F7F8FA] flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-16 w-full">
        {/* Fil d'Ariane / Retour */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[rgba(247,248,250,0.6)] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Colonne Gauche : Grande plaque de couleur */}
          <div className="w-full sticky top-32">
            <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl">
              <ColorPlate product={product} aspectRatio="4/5" />
            </div>
            <p className="text-[11px] text-center text-[rgba(247,248,250,0.4)] mt-3">
              Couleur réelle du modèle : <span className="text-white font-medium">{product.color?.name}</span>
            </p>
          </div>

          {/* Colonne Droite : Fiche détaillée */}
          <div className="flex flex-col space-y-6">
            <div>
              <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#F298BC] mb-2 font-display">
                {product.collection}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-white font-display">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[rgba(247,248,250,0.6)] mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Prix */}
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {formatPrice(product.price)}
            </div>

            {/* Sélecteur de couleur */}
            <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
              <label className="block text-xs uppercase tracking-wider text-[rgba(247,248,250,0.6)] mb-2 font-semibold">
                Couleur : <span className="text-white">{product.color?.name}</span>
              </label>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-[#F298BC] flex items-center justify-center p-0.5 shadow-md"
                >
                  <div
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: product.color?.hex }}
                  />
                </div>
              </div>
            </div>

            {/* Sélecteur de taille */}
            {product.sizes && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[rgba(247,248,250,0.6)] mb-2 font-semibold">
                  Taille : <span className="text-white">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 h-11 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                        selectedSize === size
                          ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                          : 'bg-[rgba(255,255,255,0.04)] text-white border-[rgba(255,255,255,0.12)] hover:border-white/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sélecteur de quantité */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[rgba(247,248,250,0.6)] mb-2 font-semibold">
                Quantité :
              </label>
              <div className="inline-flex items-center border border-[rgba(255,255,255,0.15)] rounded-xl bg-[rgba(255,255,255,0.04)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-sm text-[rgba(247,248,250,0.7)] hover:text-white"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-white min-w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-sm text-[rgba(247,248,250,0.7)] hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-xl bg-[#F298BC] hover:bg-[#ffb0d0] text-[#0A0B0D] font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(242,152,188,0.4)] hover:scale-[1.02]"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#0A0B0D]" />
                    <span>Ajouté au panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter au panier</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0B0D] font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.02]"
                title="Commander immédiatement cet article via WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </button>
            </div>

            {/* Description & détails */}
            <div className="space-y-4 pt-6 border-t border-[rgba(255,255,255,0.08)]">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-display">
                  Description
                </h3>
                <p className="text-xs sm:text-sm text-[rgba(247,248,250,0.7)] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.details && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-display">
                    Caractéristiques
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[rgba(247,248,250,0.6)]">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F298BC]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Garanties & réassurance */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[rgba(255,255,255,0.08)] text-center">
              <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#F298BC] mb-1" />
                <span className="text-[10px] font-semibold uppercase text-white">Qualité 100%</span>
                <span className="text-[9px] text-[rgba(247,248,250,0.5)]">Coton peigné lourd</span>
              </div>
              <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#F298BC] mb-1" />
                <span className="text-[10px] font-semibold uppercase text-white">Livraison</span>
                <span className="text-[9px] text-[rgba(247,248,250,0.5)]">Partout en Côte d'Ivoire</span>
              </div>
              <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-[#F298BC] mb-1" />
                <span className="text-[10px] font-semibold uppercase text-white">Échange</span>
                <span className="text-[9px] text-[rgba(247,248,250,0.5)]">Sous 48h si besoin</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
