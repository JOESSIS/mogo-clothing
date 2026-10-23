import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, totalAmount, totalItems } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderUrl({ cart });
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop sombre flouté */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Tiroir coulissant */}
      <aside className="relative w-full max-w-md bg-[#101318] text-[#F7F8FA] h-full shadow-2xl flex flex-col z-10 border-l border-[rgba(255,255,255,0.08)] animate-in slide-in-from-right duration-300">
        {/* En-tête du panier */}
        <div className="p-5 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#F298BC]" />
            <h2 className="text-base font-bold uppercase tracking-wider font-display">
              Votre Panier ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.08)] text-[rgba(247,248,250,0.6)] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Liste des articles */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(247,248,250,0.4)]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-base font-semibold text-[#F7F8FA]">Votre panier est vide</p>
                <p className="text-xs text-[rgba(247,248,250,0.5)] mt-1">
                  Découvrez nos créations prophétiques et ajoutez vos articles favoris.
                </p>
              </div>
              <Link
                to="/boutique"
                onClick={closeCart}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F298BC] text-[#0A0B0D] font-bold text-xs uppercase tracking-wider hover:bg-[#ffb0d0] transition-colors"
              >
                Explorer la boutique
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.cartItemId}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]"
              >
                {/* Vignette de la plaque de couleur */}
                <div
                  className="w-16 h-20 rounded-lg flex-shrink-0 flex items-center justify-center border shadow-sm relative overflow-hidden"
                  style={{
                    backgroundColor: item.color?.hex || '#1E2229',
                    borderColor: item.color?.border || 'rgba(255,255,255,0.1)'
                  }}
                >
                  <span className="text-[10px] font-bold uppercase text-white/80 font-display">
                    ✝
                  </span>
                </div>

                {/* Infos article */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#F7F8FA] truncate font-display">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[rgba(247,248,250,0.5)] mt-0.5">
                    Taille : <span className="text-white font-medium">{item.selectedSize}</span> | {item.color?.name}
                  </p>
                  <p className="text-xs font-extrabold text-[#F298BC] mt-1">
                    {formatPrice(item.price)}
                  </p>

                  {/* Contrôles de quantité */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(0,0,0,0.2)]">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 px-2 text-[rgba(247,248,250,0.6)] hover:text-white transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 px-2 text-[rgba(247,248,250,0.6)] hover:text-white transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1 text-[rgba(247,248,250,0.4)] hover:text-red-400 transition-colors"
                      aria-label="Supprimer cet article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pied de panier */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[rgba(255,255,255,0.08)] bg-[#0C0E12] space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[rgba(247,248,250,0.6)]">
                Sous-total
              </span>
              <span className="text-lg font-bold text-[#F7F8FA] font-display">
                {formatPrice(totalAmount)}
              </span>
            </div>

            {/* Bouton direct WhatsApp (confirmé par l'utilisateur) */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0B0D] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              Commander via WhatsApp
            </button>

            {/* Lien page de validation / saisie de coordonnées */}
            <Link
              to="/commande"
              onClick={closeCart}
              className="w-full py-2.5 rounded-xl border border-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.3)] text-[rgba(247,248,250,0.8)] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              Renseigner mes coordonnées
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <p className="text-[10px] text-center text-[rgba(247,248,250,0.4)]">
              Paiement et confirmation immédiate après échange sur WhatsApp.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
