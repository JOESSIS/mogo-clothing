import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, FastForward } from 'lucide-react';

export default function IntroPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(err => {
        console.warn('Autoplay bloqué par le navigateur mobile:', err);
      });
    }
  }, []);

  const handleVideoEnded = () => {
    setIsEnded(true);
  };

  const handleToggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleEnterAtmosphere = (e) => {
    if (e) e.stopPropagation();
    navigate('/accueil');
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0A0B0D] flex flex-col justify-between items-center p-4 sm:p-6 select-none overflow-hidden z-50 font-body">
      
      {/* 1. EN HAUT : LOGO OFFICIEL AU CENTRE + BOUTON PASSER À DROITE */}
      <header className="w-full max-w-4xl flex items-center justify-between z-20 pt-2 sm:pt-4">
        {/* Espaceur gauche pour un centrage parfait du logo */}
        <div className="w-16 sm:w-20" />

        {/* LOGO OFFICIEL TOUJOURS AU SOMMET */}
        <div className="flex-1 flex justify-center">
          <img
            src="/brand/logo.svg"
            alt="Le Môgô de God Clothing"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
          />
        </div>

        {/* BOUTON PASSER DISCRET EN HAUT À DROITE */}
        <div className="w-16 sm:w-20 flex justify-end">
          <button
            onClick={handleEnterAtmosphere}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] sm:text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
            title="Passer l'introduction"
          >
            <span>Passer</span>
            <FastForward className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. AU CENTRE : VIDÉO DANS SES VRAIES PROPORTIONS (AUCUN ZOOM, 100% VISIBLE) */}
      <main className="relative flex-1 w-full max-w-3xl flex items-center justify-center my-3 sm:my-6 overflow-hidden">
        {/* Conteneur stylisé pour la vidéo */}
        <div className="relative w-full max-h-[58vh] sm:max-h-[64vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            muted={isMuted}
            defaultMuted
            autoPlay
            preload="auto"
            onEnded={handleVideoEnded}
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.duration > 0) {
                if (videoRef.current.currentTime >= videoRef.current.duration - 0.5) {
                  setIsEnded(true);
                }
              }
            }}
            className="w-full h-auto max-h-[58vh] sm:max-h-[64vh] object-contain rounded-2xl"
          />

          {/* Bouton son incrusté dans le coin inférieur de la vidéo */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            className="absolute bottom-3 right-3 z-30 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/25 text-white backdrop-blur-md transition-all active:scale-90 shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </main>

      {/* 3. EN BAS : GRAND BOUTON TOUJOURS ACCESSIBLE ET PARFAITEMENT POSITIONNÉ */}
      <footer className="w-full max-w-md flex flex-col items-center z-20 pb-2 sm:pb-4">
        <button
          onClick={handleEnterAtmosphere}
          className={`group w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-full bg-transparent hover:bg-white/10 border-2 border-white text-white font-extrabold text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 text-center ${
            isEnded ? 'ring-2 ring-white ring-offset-2 ring-offset-black animate-pulse' : ''
          }`}
        >
          <span>Entrer dans notre atmosphère</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5 text-white" />
        </button>
      </footer>

    </div>
  );
}
