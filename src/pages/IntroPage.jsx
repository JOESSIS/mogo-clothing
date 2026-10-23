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
        console.warn('Autoplay bloqué par le navigateur:', err);
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
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#0A0B0D] flex items-center justify-center select-none">
      {/* VIDÉO PLEIN ÉCRAN D'ACCUEIL — PARFAITEMENT CENTRÉE */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        muted
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
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Voile sombre cinématographique subtil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/75 pointer-events-none z-10" />

      {/* LOGO OFFICIEL CENTRÉ EN HAUT — TAILLE PROPORTIONNÉE MOBILE & DESKTOP */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-20 text-center animate-fade-in pointer-events-none w-full px-4 flex justify-center">
        <img
          src="/brand/logo.svg"
          alt="Le Môgô de God Clothing"
          className="h-14 sm:h-20 md:h-28 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Bouton discret "Passer" en haut à droite */}
      <div className="absolute top-6 sm:top-10 right-4 sm:right-6 z-30">
        <button
          onClick={handleEnterAtmosphere}
          className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white text-[11px] sm:text-xs uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95 hover:scale-105 shadow-lg"
          title="Passer directement"
        >
          <span>Passer</span>
          <FastForward className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {/* CONTRÔLE DU SON EN BAS À DROITE */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 z-30">
        <button
          onClick={handleToggleSound}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          className="p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/20 text-white backdrop-blur-md transition-all active:scale-90 hover:scale-110 shadow-lg"
        >
          {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>

      {/* GRAND BOUTON « ENTRER DANS NOTRE ATMOSPHÈRE »
          Placé élégamment en bas de l'écran pour ne JAMAIS masquer la vidéo */}
      <div
        className={`absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-30 w-full px-4 max-w-lg flex justify-center transition-all duration-700 ${
          isEnded
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={handleEnterAtmosphere}
          className="group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/80 hover:border-white text-white font-extrabold text-xs sm:text-base uppercase tracking-widest backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-center"
        >
          <span>Entrer dans notre atmosphère</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5 text-[#F298BC]" />
        </button>
      </div>
    </div>
  );
}
