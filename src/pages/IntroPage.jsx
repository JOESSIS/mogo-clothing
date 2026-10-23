import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, FastForward, Play } from 'lucide-react';

export default function IntroPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  // Tentative d'autoplay au chargement avec support iOS / Android
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasStarted(true);
          })
          .catch(err => {
            console.warn('Autoplay bloqué par le navigateur mobile:', err);
            // Si l'autoplay est bloqué sur mobile, on révèle le bouton pour ne pas bloquer l'utilisateur
            setIsEnded(true);
          });
      }
    }

    // Sécurité mobile : si la vidéo met trop de temps à charger (réseau lent),
    // on affiche le bouton après 4 secondes pour que l'utilisateur ne soit jamais coincé
    const safetyTimer = setTimeout(() => {
      setIsEnded(true);
    }, 4500);

    return () => clearTimeout(safetyTimer);
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

  const handleScreenClick = () => {
    // Si la vidéo n'avait pas démarré (blocage iOS), on la lance
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().then(() => setHasStarted(true)).catch(() => {});
    }
  };

  return (
    <div 
      onClick={handleScreenClick}
      className="relative w-screen h-screen overflow-hidden bg-[#0A0B0D] flex items-center justify-center cursor-pointer select-none"
    >
      {/* VIDÉO PLEIN ÉCRAN D'ACCUEIL AVEC ATTRIBUTS MOBILES STRICTS */}
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
        onPlay={() => setHasStarted(true)}
        onEnded={handleVideoEnded}
        onTimeUpdate={() => {
          if (videoRef.current && videoRef.current.duration > 0) {
            if (videoRef.current.currentTime >= videoRef.current.duration - 0.4) {
              setIsEnded(true);
            }
          }
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Voile sombre subtil pour garantir la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/70 pointer-events-none z-10" />

      {/* LOGO OFFICIEL CENTRÉ EN HAUT */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center animate-fade-in pointer-events-none">
        <img
          src="/brand/logo.svg"
          alt="Le Môgô de God Clothing"
          className="h-20 sm:h-28 md:h-32 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Bouton discret "Passer" en haut à droite */}
      <div className="absolute top-8 right-6 z-30">
        <button
          onClick={handleEnterAtmosphere}
          className="px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white/90 hover:text-white text-xs uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95 hover:scale-105 shadow-lg"
          title="Passer directement à l'étape suivante"
        >
          <span>Passer</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CONTRÔLE DU SON EN BAS À DROITE */}
      <div className="absolute bottom-8 right-6 z-30">
        <button
          onClick={handleToggleSound}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
          className="p-3.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white hover:text-white backdrop-blur-md transition-all active:scale-90 hover:scale-110 shadow-lg"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* GRAND BOUTON « ENTRER DANS NOTRE ATMOSPHÈRE »
          Apparaît à la fin ou en sécurité si le mobile tarde à lire */}
      <div
        className={`relative z-20 flex flex-col items-center text-center px-4 max-w-xl transition-all duration-700 ${
          isEnded
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={handleEnterAtmosphere}
          className="group relative px-8 sm:px-12 py-5 sm:py-6 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/70 hover:border-white text-white font-extrabold text-sm sm:text-lg uppercase tracking-widest backdrop-blur-xl shadow-[0_0_50px_rgba(242,152,188,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_70px_rgba(255,255,255,0.6)] flex items-center gap-4"
        >
          <span>Entrer dans notre atmosphère</span>
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-2 text-[#F298BC]" />
        </button>
      </div>
    </div>
  );
}
