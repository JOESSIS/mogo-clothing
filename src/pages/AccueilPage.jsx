import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Volume2, VolumeX, ShoppingBag, Sparkles, ZoomIn, X } from 'lucide-react';
import Header from '../components/Header';
import CartDrawer from '../components/CartDrawer';

export default function AccueilPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activePreview, setActivePreview] = useState(null); // Lightbox modal si l'utilisateur clique sur une illustration

  const handleToggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleGoToShop = () => {
    navigate('/boutique');
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#0A0B0D] flex flex-col justify-between font-body">
      {/* HEADER AVEC LOGO CENTRÉ ET NAVIGATION */}
      <Header />
      <CartDrawer />

      {/* ARRIÈRE-PLAN FLOU ATMOSPHÉRIQUE */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-35 filter blur-3xl scale-110 z-0">
        <video
          src="/videos/atmosphere.mp4"
          playsInline
          webkit-playsinline="true"
          muted
          defaultMuted
          autoPlay
          loop
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>

      {/* SECTION CENTRALE : VIDÉO ENCADRÉE PAR LES 2 ILLUSTRATIONS LOOKBOOK */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12 pt-28 sm:pt-32 pb-8 px-4 max-w-[1440px] mx-auto w-full">
        
        {/* ILLUSTRATION GAUCHE (LOOKBOOK 01) */}
        <aside className="hidden md:flex flex-col items-center justify-center w-52 lg:w-64 xl:w-72 flex-shrink-0 group">
          <div 
            onClick={() => setActivePreview('/images/lookbook-left.png')}
            className="cursor-pointer relative w-full h-[58vh] lg:h-[64vh] rounded-2xl p-2 bg-[#13161C]/75 backdrop-blur-md border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
              <img
                src="/images/lookbook-left.png"
                alt="Lookbook Le Môgô de God — Planche 01"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              
              {/* Badge discret & bouton zoom */}
              <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] uppercase font-bold tracking-widest text-white/90 backdrop-blur-md">
                Lookbook 01
              </div>

              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                <span className="text-[11px] font-bold text-white tracking-wider uppercase font-display drop-shadow">
                  Prophetic Man
                </span>
                <span className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" title="Agrandir l'illustration">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENEUR PRINCIPAL DE LA VIDÉO MANNEQUIN (Format 9:16 centré) */}
        <section className="relative h-[70vh] sm:h-[75vh] max-w-[440px] lg:max-w-[460px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-black/60 flex flex-col justify-end flex-shrink-0 z-20">
          
          {/* Vidéo Mannequin principale */}
          <video
            ref={videoRef}
            src="/videos/atmosphere.mp4"
            playsInline
            webkit-playsinline="true"
            muted={isMuted}
            defaultMuted
            autoPlay
            loop
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dégradé de contraste en bas pour le bouton */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

          {/* Bouton de contrôle du son sur la vidéo */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white hover:text-white backdrop-blur-md transition-all shadow-md"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* ZONE D'ACTION : BOUTON BLANC NON REMPLI « VOIR TOUS LES PRODUITS » */}
          <div className="relative z-20 p-6 text-center flex flex-col items-center">
            <button
              onClick={handleGoToShop}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-white/10 border-2 border-white text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 backdrop-blur-sm"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Voir tous les produits</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </section>

        {/* ILLUSTRATION DROITE (LOOKBOOK 02) */}
        <aside className="hidden md:flex flex-col items-center justify-center w-52 lg:w-64 xl:w-72 flex-shrink-0 group">
          <div 
            onClick={() => setActivePreview('/images/lookbook-right.png')}
            className="cursor-pointer relative w-full h-[58vh] lg:h-[64vh] rounded-2xl p-2 bg-[#13161C]/75 backdrop-blur-md border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out transform rotate-2 group-hover:rotate-0 group-hover:scale-105 group-hover:border-white/40 group-hover:shadow-[0_25px_60px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
              <img
                src="/images/lookbook-right.png"
                alt="Lookbook Le Môgô de God — Planche 02"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

              {/* Badge discret & bouton zoom */}
              <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] uppercase font-bold tracking-widest text-white/90 backdrop-blur-md">
                Lookbook 02
              </div>

              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                <span className="text-[11px] font-bold text-white tracking-wider uppercase font-display drop-shadow">
                  I'm Prophetic
                </span>
                <span className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" title="Agrandir l'illustration">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* SECTION LOOKBOOK COMPLÉMENTAIRE SUR MOBILE (Sous la vidéo) */}
      <section className="md:hidden relative z-10 px-4 py-8 max-w-sm mx-auto w-full space-y-6">
        <div className="text-center">
          <span className="font-boardley text-2xl text-white block">
            L'Univers Illustré
          </span>
          <p className="text-[11px] text-white/60 tracking-wider uppercase mt-1">
            Les visuels officiels de la collection
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div
            onClick={() => setActivePreview('/images/lookbook-left.png')}
            className="cursor-pointer rounded-xl overflow-hidden border border-white/15 bg-black/50 p-1.5 shadow-lg active:scale-95 transition-transform"
          >
            <img
              src="/images/lookbook-left.png"
              alt="Lookbook 01"
              className="w-full h-56 object-cover rounded-lg"
            />
            <p className="text-[10px] text-center font-bold text-white mt-1.5 uppercase font-display">
              Lookbook 01
            </p>
          </div>

          <div
            onClick={() => setActivePreview('/images/lookbook-right.png')}
            className="cursor-pointer rounded-xl overflow-hidden border border-white/15 bg-black/50 p-1.5 shadow-lg active:scale-95 transition-transform"
          >
            <img
              src="/images/lookbook-right.png"
              alt="Lookbook 02"
              className="w-full h-56 object-cover rounded-lg"
            />
            <p className="text-[10px] text-center font-bold text-white mt-1.5 uppercase font-display">
              Lookbook 02
            </p>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODALE DE ZOOM SI CLIC SUR UNE ILLUSTRATION */}
      {activePreview && (
        <div 
          onClick={() => setActivePreview(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black"
          >
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors shadow-lg"
              aria-label="Fermer la vue agrandie"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePreview}
              alt="Aperçu Lookbook Grand Format"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
