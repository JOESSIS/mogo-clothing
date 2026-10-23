import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CartDrawer from '../components/CartDrawer';
import { ArrowRight, Cross, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#F7F8FA] flex flex-col font-body">
      <Header />
      <CartDrawer />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-20 w-full">
        {/* Titre Principal */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-boardley text-3xl sm:text-4xl text-[#F298BC] block mb-2">
            À propos
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-wider font-display text-white mt-1 mb-4">
            Le Môgô de God Clothing
          </h1>
          <div className="w-16 h-1 bg-[#F298BC] mx-auto rounded-full" />
        </div>

        {/* Le Manifeste */}
        <section className="bg-[#13161C] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl mb-12 space-y-6 text-sm sm:text-base text-[rgba(247,248,250,0.85)] leading-relaxed">
          <p className="text-lg sm:text-xl font-display font-semibold text-white leading-snug">
            « Môgô » en nouchi désigne l’Homme, le frère, l'individu authentique du quotidien. 
            « De God », c'est l'affirmation d'une identité céleste inébranlable.
          </p>

          <p>
            Née au cœur des rues d’Abidjan, <strong>Le Môgô de God</strong> est bien plus qu'une marque de mode : 
            c'est un mouvement de streetwear prophétique. Nous concevons chaque vêtement comme une déclaration 
            d'autorité, d'élégance et de foi vivante.
          </p>

          <p>
            Trop longtemps, la foi a été dissociée de la créativité et de l'esthétique contemporaine. 
            Nous brisons les stéréotypes en proposant des silhouettes oversize affirmées, des grammages lourds 
            dignes des plus grandes maisons de streetwear, et un message spirituel qui inspire la génération montante.
          </p>
        </section>

        {/* Les 3 Piliers */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#13161C] border border-white/10 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4 text-[#F298BC]">
              <span className="text-xl font-serif">✝</span>
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white font-display mb-2">
              Identité Forte
            </h3>
            <p className="text-xs text-[rgba(247,248,250,0.6)] leading-relaxed">
              Porter ce que vous croyez. Des proclamations qui rappellent votre valeur et votre destinée royale.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#13161C] border border-white/10 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4 text-[#F298BC]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white font-display mb-2">
              Confection Premium
            </h3>
            <p className="text-xs text-[rgba(247,248,250,0.6)] leading-relaxed">
              Cotons peignés 240 à 400 GSM, coupes boxy confortables, sérigraphies et broderies de haute précision.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#13161C] border border-white/10 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4 text-[#F298BC]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white font-display mb-2">
              Proximité & Vérité
            </h3>
            <p className="text-xs text-[rgba(247,248,250,0.6)] leading-relaxed">
              Un échange direct et humain sur WhatsApp avec nos équipes pour vous conseiller dans chaque choix.
            </p>
          </div>
        </section>

        {/* Appel à l'action */}
        <div className="text-center bg-gradient-to-b from-[#13161C] to-[#0A0B0D] p-8 sm:p-12 rounded-3xl border border-white/10">
          <h2 className="text-xl sm:text-3xl font-extrabold uppercase font-display text-white mb-4">
            Rejoignez le Mouvement
          </h2>
          <p className="text-xs sm:text-sm text-[rgba(247,248,250,0.6)] max-w-md mx-auto mb-8">
            Explorez nos collections Prophetic Man, Prophetic Woman et I'm Prophetic dès maintenant.
          </p>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent hover:bg-white/10 border-2 border-white text-white font-extrabold text-xs uppercase tracking-widest transition-all hover:scale-105"
          >
            <span>Explorer la boutique</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#0A0B0D] py-8 text-center text-xs text-[rgba(247,248,250,0.4)]">
        <p className="font-display tracking-widest uppercase mb-1">Le Môgô de God — Clothing</p>
        <p>Boutique officielle.</p>
      </footer>
    </div>
  );
}
