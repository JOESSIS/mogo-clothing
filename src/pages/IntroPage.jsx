import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, FastForward } from 'lucide-react';

export default function IntroPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Démarrer la vidéo au tout début (0s) et tenter l'autoplay silencieux
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(err => {
        console.warn('Autoplay bloqué par le navigateur:', err);
      });
    }
  }, []);

  // Déclenché UNIQUEMENT quand la vidéo a fini de jouer complètement jusqu'à la fin
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
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0B0D] select-none">
      {/* VIDÉO PLEIN ÉCRAN D'ORIGINE — LUMINEUSE ET NATURELLE (AUCUN VOILE SOMBRE) */}
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
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* LOGO OFFICIEL CENTRÉ EN HAUT */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 text-center animate-fade-in pointer-events-none w-full px-4 flex justify-center">
        <img
          src="/brand/logo.svg"
          alt="Le Môgô de God Clothing"
          className="h-16 sm:h-24 md:h-28 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        />
      </div>

      {/* Bouton discret "Passer" en haut à droite */}
      <div className="absolute top-6 sm:top-8 right-4 sm:right-6 z-20">
        <button
          onClick={handleEnterAtmosphere}
          className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white/90 hover:text-white text-xs uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 shadow-md"
          title="Passer l'intro"
        >
          <span>Passer</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CONTRÔLE DU SON EN BAS À DROITE */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 z-20">
        <button
          onClick={handleToggleSound}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          className="p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white backdrop-blur-md transition-all hover:scale-110 shadow-lg"
        >
          {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* GRAND BOUTON « ENTRER DANS NOTRE ATMOSPHÈRE »
          Positionné BIEN EN BAS et apparaît UNIQUEMENT à la fin de la vidéo */}
      <div
        className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md flex justify-center transition-all duration-1000 ${
          isEnded
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-8 pointer-events-none'
        }`}
      >
        <button
          onClick={handleEnterAtmosphere}
          className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/80 hover:border-white text-white font-extrabold text-xs sm:text-base uppercase tracking-widest backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500 hover:scale-105 flex items-center justify-center gap-3.5 text-center"
        >
          <span>Entrer dans notre atmosphère</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-2 text-white" />
        </button>
      </div>
    </div>
  );
}
