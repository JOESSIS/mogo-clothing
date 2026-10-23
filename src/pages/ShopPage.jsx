import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import { PRODUCTS, COLLECTIONS, CATEGORIES } from '../data/products';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCollection = selectedCollection === 'all' || product.collection === selectedCollection;
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color?.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCollection && matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCollection, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFFADA] text-[#111317] flex flex-col font-body transition-colors">
      <Header />
      <CartDrawer />

      {/* Hero section de la boutique */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-6 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl text-[#111317] mb-2 sm:mb-3 leading-tight tracking-normal">
          <span className="font-amazing font-bold mr-2 sm:mr-4">Le</span>
          <span className="font-jamaica font-black tracking-normal">Catalogue</span>
        </h1>

        <p className="text-xs sm:text-base text-[#4B5563] max-w-2xl mx-auto mb-2 px-2">
          Explorez les créations exclusives de la marque. Chaque vêtement allie confection haut de gamme et identité céleste.
        </p>
      </section>

      {/* Barre de filtres et recherche */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto w-full mb-8">
        <div className="bg-white/80 backdrop-blur-sm border border-[#E5DEC0] rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-5">
          
          {/* Ligne 1 : Onglets de Collections */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#EFE8CA] pb-4">
            <span className="text-xs uppercase font-bold text-[#6B7280] mr-2 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Collections :
            </span>
            {COLLECTIONS.map(col => (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCollection === col.id
                    ? 'bg-[#111317] text-white shadow-md'
                    : 'bg-[#F2EDD3] hover:bg-[#E5DEC0] text-[#374151]'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Ligne 2 : Filtres de Catégories & Recherche & Tri */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Catégories */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#111317] text-white font-bold'
                      : 'text-[#6B7280] hover:text-[#111317]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Barre de recherche et Tri */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-60">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F9C]" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#DDD5B8] rounded-lg text-xs text-[#111317] placeholder-[#8A8F9C] focus:outline-none focus:border-[#111317]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#DDD5B8] rounded-lg text-xs text-[#111317] px-3 py-1.5 focus:outline-none focus:border-[#111317]"
              >
                <option value="featured">En vedette</option>
                <option value="price-asc">Prix : Croissant</option>
                <option value="price-desc">Prix : Décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grille de produits */}
      <main className="px-4 sm:px-6 max-w-7xl mx-auto w-full flex-1 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/70 border border-[#E5DEC0] rounded-2xl p-8 shadow-sm">
            <p className="text-base font-semibold text-[#111317]">Aucun vêtement ne correspond à votre sélection.</p>
            <p className="text-xs text-[#6B7280] mt-1">Essayez de réinitialiser vos filtres ou votre recherche.</p>
            <button
              onClick={() => {
                setSelectedCollection('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#111317] text-white text-xs font-bold uppercase tracking-wider"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} light={true} />
            ))}
          </div>
        )}
      </main>

      {/* Footer minimaliste harmonisé */}
      <footer className="border-t border-[#E5DEC0] bg-[#F7F1D0] py-8 text-center text-xs text-[#524B36]">
        <p className="font-display tracking-widest uppercase mb-1 font-bold text-[#111317]">
          Le Môgô de God — Clothing
        </p>
        <p>Boutique officielle.</p>
      </footer>
    </div>
  );
}
