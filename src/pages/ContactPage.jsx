import React, { useState } from 'react';
import Header from '../components/Header';
import CartDrawer from '../components/CartDrawer';
import { MessageCircle, Phone, MapPin, Clock, Send } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../utils/whatsapp';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    subject: 'Renseignement sur les articles',
    message: ''
  });

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = `Bonjour Le Môgô de God Clothing ! 👋\n` +
      `Nom : ${form.name || '[Non précisé]'}\n` +
      `Sujet : ${form.subject}\n\n` +
      `Message : ${form.message || 'Je souhaite entrer en contact avec vous.'}`;

    const cleanPhone = WHATSAPP_PHONE_NUMBER.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F7F8FA] flex flex-col font-body">
      <Header />
      <CartDrawer />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-20 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-boardley text-3xl sm:text-4xl text-[#F298BC] block mb-2">
            Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider font-display text-white mt-1 mb-4">
            Service Client & Échanges
          </h1>
          <p className="text-xs sm:text-sm text-[rgba(247,248,250,0.6)] max-w-lg mx-auto">
            Une question sur une taille, un modèle ou une livraison ? Notre équipe est à votre écoute directe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Colonne Coordonnées */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#13161C] border border-white/10 shadow-xl space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-display">
                Service Client Dédié
              </h2>

              <div className="flex items-start gap-3.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#F298BC] flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Téléphone & WhatsApp</p>
                  <p className="text-[rgba(247,248,250,0.6)] mt-0.5">+225 07 00 00 00 00</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#F298BC] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Localisation</p>
                  <p className="text-[rgba(247,248,250,0.6)] mt-0.5">Abidjan, Côte d'Ivoire</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#F298BC] flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Disponibilité</p>
                  <p className="text-[rgba(247,248,250,0.6)] mt-0.5">Du Lundi au Dimanche : 08h - 22h</p>
                </div>
              </div>
            </div>

            {/* Bouton direct WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0B0D] font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Ouvrir WhatsApp directement</span>
            </a>
          </div>

          {/* Formulaire de Message direct */}
          <div className="md:col-span-7 bg-[#13161C] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white font-display mb-6">
              Envoyer un message
            </h2>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-[rgba(247,248,250,0.7)] mb-1.5">
                  Votre Nom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Samuel Konan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-white/15 text-white text-xs placeholder-[rgba(247,248,250,0.35)] focus:outline-none focus:border-[#F298BC]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[rgba(247,248,250,0.7)] mb-1.5">
                  Objet
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-white/15 text-white text-xs focus:outline-none focus:border-[#F298BC]"
                >
                  <option value="Renseignement sur les articles">Renseignement sur les articles</option>
                  <option value="Question sur ma commande">Question sur ma commande</option>
                  <option value="Conseil de taille (Sizing)">Conseil de taille (Sizing)</option>
                  <option value="Partenariat / Collaboration">Partenariat / Collaboration</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[rgba(247,248,250,0.7)] mb-1.5">
                  Votre Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Écrivez votre message ici..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.3)] border border-white/15 text-white text-xs placeholder-[rgba(247,248,250,0.35)] focus:outline-none focus:border-[#F298BC]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#F298BC] hover:bg-[#ffb0d0] text-[#0A0B0D] font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Transmettre via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#0A0B0D] py-8 text-center text-xs text-[rgba(247,248,250,0.4)]">
        <p className="font-display tracking-widest uppercase mb-1">Le Môgô de God — Clothing</p>
        <p>Boutique officielle.</p>
      </footer>
    </div>
  );
}
