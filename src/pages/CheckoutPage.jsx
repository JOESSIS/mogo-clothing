import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { MessageCircle, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalAmount, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    city: 'Abidjan',
    phone: '',
    notes: ''
  });

  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[rgba(247,248,250,0.4)] mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">Votre panier est vide</h2>
          <p className="text-xs text-[rgba(247,248,250,0.5)] mb-6 max-w-sm">
            Vous n'avez pas encore sélectionné de vêtement à commander.
          </p>
          <Link
            to="/boutique"
            className="px-6 py-3 rounded-full bg-[#F298BC] text-[#0A0B0D] font-bold text-xs uppercase tracking-wider"
          >
            Découvrir la collection
          </Link>
        </main>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name.trim()) {
      setError('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!customer.phone.trim()) {
      setError('Veuillez renseigner votre numéro de téléphone.');
      return;
    }

    const url = generateWhatsAppOrderUrl({ cart, customer });
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F7F8FA] flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-16 w-full">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[rgba(247,248,250,0.6)] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-white font-display mb-2">
          Finaliser votre commande
        </h1>
        <p className="text-xs sm:text-sm text-[rgba(247,248,250,0.6)] mb-8">
          Renseignez vos coordonnées de livraison. La confirmation et le règlement s'effectuent en toute sécurité sur WhatsApp avec notre équipe.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Formulaire Coordonnées */}
          <div className="lg:col-span-7 bg-[#13161C] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-6 font-display flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F298BC] text-[#0A0B0D] flex items-center justify-center text-xs font-bold">1</span>
              Coordonnées de livraison
            </h2>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[rgba(247,248,250,0.7)] mb-1.5">
                  Nom & Prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Kouassi Emmanuel"
                  value={customer.name}
                  onChange={(e) => {
                    setCustomer({ ...customer, name: e.target.value });
                    setError('');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.12)] text-white text-xs placeholder-[rgba(247,248,250,0.35)] focus:outline-none focus:border-[#F298BC]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[rgba(247,248,250,0.7)] mb-1.5">
                  Numéro de Téléphone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex : +225 07 00 00 00 00"
                  value={customer.phone}
                  onChange={(e) => {
                    setCustomer({ ...customer, phone: e.target.value });
                    setError('');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.12)] text-white text-xs placeholder-[rgba(247,248,250,0.35)] focus:outline-none focus:border-[#F298BC]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[rgba(247,248,250,0.7)] mb-1.5">
                  Ville & Quartier de livraison *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Abidjan - Cocody Angré 8e Tranche"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.12)] text-white text-xs placeholder-[rgba(247,248,250,0.35)] focus:outline-none focus:border-[#F298BC]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[rgba(247,248,250,0.7)] mb-1.5">
                  Remarques particulières (optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex : Livraison souhaitée en fin d'après-midi..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.12)] text-white text-xs placeholder-[rgba(247,248,250,0.35)] focus:outline-none focus:border-[#F298BC]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0B0D] font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Envoyer ma commande sur WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

          {/* Récapitulatif Panier */}
          <div className="lg:col-span-5 bg-[#13161C] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F298BC] text-[#0A0B0D] flex items-center justify-center text-xs font-bold">2</span>
              Articles commandés ({cart.length})
            </h2>

            <div className="divide-y divide-[rgba(255,255,255,0.06)] max-h-72 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.cartItemId} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white font-display">{item.name}</p>
                    <p className="text-[11px] text-[rgba(247,248,250,0.5)]">
                      Taille {item.selectedSize} | {item.color?.name} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-extrabold text-[#F298BC]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[rgba(247,248,250,0.6)]">
                <span>Total articles</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[rgba(247,248,250,0.6)]">
                <span>Frais de livraison</span>
                <span className="text-[#F298BC]">À convenir selon votre zone</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.08)]">
                <span className="text-sm font-bold uppercase text-white font-display">Total</span>
                <span className="text-lg font-extrabold text-white font-display">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-start gap-2.5 text-[11px] text-[rgba(247,248,250,0.6)]">
              <ShieldCheck className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
              <span>
                Paiement direct (Wave, Orange Money, MTN MoMo ou espèces à la livraison) confirmé avec notre conseiller WhatsApp.
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
