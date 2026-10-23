# Tasks: Boutique en ligne Le Môgô de God Clothing

**Feature Branch**: `001-boutique-mogo`  
**Status**: Completed  

## Phase 1: Setup & Design Tokens
- [x] T001: Initialiser le projet Vite React.
- [x] T002: Installer les dépendances (`react-router-dom`, `lucide-react`).
- [x] T003: Créer le fichier `src/styles/tokens.css` avec toute la palette (fond sombre `#0B0C0E`, ardoise `#242930`, rose `#F098BD`, typo, transitions).
- [x] T004: Vectoriser et générer le logo officiel `public/brand/logo.svg` (typographie "LE MÔGÔ DE GOD", croix et livre dans le D, "CLOTHING").
- [x] T005: Déplacer/copier les vidéos `video du debut.mp4` et `deuxieme video.mp4` dans `public/videos/intro.mp4` et `public/videos/atmosphere.mp4`.

## Phase 2: Données Catalogue & Contexte Panier
- [x] T006: Créer `src/data/products.js` avec 10 produits répartis dans les 3 collections (Prophetic Man, Prophetic Woman, I'm Prophetic), prix en FCFA, plaques de couleur hex et champ `image: null`.
- [x] T007: Créer `src/context/CartContext.jsx` avec persistance `localStorage` (ajout, retrait, mise à jour quantité, calcul du total en FCFA).
- [x] T008: Créer le composant utilitaire `src/utils/whatsapp.js` pour générer le lien de commande avec message WhatsApp formatté.

## Phase 3: Composants Partagés & Navigation
- [x] T009: Créer `src/components/Header.jsx` avec le logo SVG blanc centré, lien d'accueil et bouton panier avec badge de quantité.
- [x] T010: Créer `src/components/ColorPlate.jsx` pour afficher les vêtements sans photo sous forme de plaques artistiques texturées avec badges de collection.
- [x] T011: Créer `src/components/CartDrawer.jsx` pour le panier latéral coulissant avec récapitulatif et bouton de commande direct WhatsApp.

## Phase 4: Pages Vidéo Immersives
- [x] T012: Créer `src/pages/IntroPage.jsx` avec lecture plein écran de `intro.mp4`, bouton "Passer l'intro", toggle audio, et apparition fluide du bouton « Entrer dans notre atmosphère » à la fin de la vidéo.
- [x] T013: Créer `src/pages/AtmospherePage.jsx` avec lecture de `atmosphere.mp4` (gestion 9:16 portrait avec fond miroir flouté sur desktop) et bouton d'action « Voir tous les produits ».

## Phase 5: Catalogue & Fiche Produit
- [x] T014: Créer `src/pages/ShopPage.jsx` avec barre de filtres (collections, catégories, couleurs), barre de recherche, tri et grille de cartes produits.
- [x] T015: Créer `src/components/ProductCard.jsx` intégrant la plaque de couleur, les badges de collection, le prix en FCFA et le bouton d'ajout direct ou vue détail.
- [x] T016: Créer `src/pages/ProductPage.jsx` avec sélecteur de taille (S, M, L, XL, XXL), sélecteur de couleur, description détaillée, garantie de qualité et ajout au panier.

## Phase 6: Checkout & Finalisation
- [x] T017: Créer `src/pages/CheckoutPage.jsx` permettant de saisir les coordonnées client (nom, téléphone, ville de livraison) et d'initier la commande WhatsApp préformatée.
- [x] T018: Intégrer les routes dans `src/App.jsx` (`/`, `/atmosphere`, `/boutique`, `/produit/:slug`, `/commande`).

## Phase 7: Tests, Accessibilité & Validation
- [x] T019: Vérifier le build de production `npm run build` sans aucune erreur (Build validé en 18s).
- [x] T020: Tester le parcours utilisateur complet : Intro -> Atmosphère -> Boutique -> Fiche Produit -> Panier -> WhatsApp.
