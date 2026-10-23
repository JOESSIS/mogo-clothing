import React from 'react';

/**
 * Composant ColorPlate :
 * Affiche la plaque de couleur texturée avec typographie de marque si `image` est null,
 * ou affiche directement la photo si le client en a renseigné une.
 */
export default function ColorPlate({ product, aspectRatio = '4/5', className = '' }) {
  if (product.image) {
    return (
      <div 
        style={{ aspectRatio }} 
        className={`relative overflow-hidden rounded-lg bg-surface ${className}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  const bgColor = product.color?.hex || '#1A1E24';
  const accentColor = product.accentColor || '#F298BC';
  const isLight = bgColor.toLowerCase() === '#f8f9fa' || bgColor.toLowerCase() === '#f4efeb';
  const textColor = isLight ? '#13161C' : '#F7F8FA';

  return (
    <div
      style={{
        aspectRatio,
        backgroundColor: bgColor,
        borderColor: product.color?.border || 'rgba(255,255,255,0.1)'
      }}
      className={`relative w-full overflow-hidden rounded-xl border flex flex-col justify-between p-6 select-none transition-all duration-300 group shadow-md ${className}`}
    >
      {/* Texture textile subtile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 80%),
                            linear-gradient(45deg, rgba(0,0,0,0.15) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.15))`
        }}
      />

      {/* En-tête : Badge collection & pastille */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span 
          style={{
            color: accentColor,
            letterSpacing: '0.15em'
          }}
          className="text-xs font-bold tracking-widest uppercase font-display"
        >
          {product.collection}
        </span>
        <div 
          className="w-3.5 h-3.5 rounded-full border shadow-sm"
          style={{ 
            backgroundColor: accentColor,
            borderColor: isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)'
          }}
          title={product.color?.name}
        />
      </div>

      {/* Centre : Emblème & Typographie de la plaque */}
      <div className="relative z-10 my-auto text-center py-4 flex flex-col items-center">
        <div 
          style={{ borderColor: accentColor }}
          className="w-8 h-8 rounded-full border border-dashed flex items-center justify-center mb-3 opacity-60 group-hover:opacity-100 transition-opacity"
        >
          <span style={{ color: accentColor }} className="text-xs font-serif font-bold">✝</span>
        </div>
        
        <h4 
          style={{ color: textColor }} 
          className="text-sm md:text-base font-bold tracking-widest uppercase font-display px-2"
        >
          {product.name}
        </h4>

        <div 
          style={{ backgroundColor: accentColor }}
          className="w-8 h-0.5 my-2.5 opacity-50 group-hover:w-14 transition-all duration-300"
        />

        <p 
          style={{ color: isLight ? '#4B5565' : 'rgba(247,248,250,0.7)' }}
          className="text-[11px] uppercase tracking-wider font-medium"
        >
          {product.subtitle || 'Streetwear Prophétique'}
        </p>
      </div>

      {/* Bas de la plaque : Détail couleur & indication maquette discrète */}
      <div className="relative z-10 flex items-center justify-between w-full pt-3 border-t" style={{ borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
        <span 
          style={{ color: textColor }}
          className="text-[11px] font-medium tracking-wide flex items-center gap-1.5"
        >
          <span 
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: bgColor, border: '1px solid rgba(255,255,255,0.3)' }}
          />
          {product.color?.name}
        </span>
        <span 
          style={{ color: isLight ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)' }}
          className="text-[10px] uppercase tracking-wider"
        >
          {product.sizes?.length ? `${product.sizes.length} Tailles` : 'Standard'}
        </span>
      </div>
    </div>
  );
}
