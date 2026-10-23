# Plan Technique: Boutique en ligne Le Môgô de God Clothing

**Feature Branch**: `001-boutique-mogo`  
**Created**: 2026-10-21  
**Status**: Ready for implementation  

## 1. Architecture Globale

- **Runtime & Build** : Vite + React 18 / 19 (SPA ultra-rapide)
- **Routage** : `react-router-dom` (pages `/`, `/atmosphere`, `/boutique`, `/produit/:slug`, `/commande`)
- **Styles** : Vanilla CSS modulaire avec Design Tokens complets (`src/styles/tokens.css`) + variables CSS pour assurer flexibilité, haute performance et zéro overhead de build.
- **État Global Panier** : `CartContext` avec stockage `localStorage` et synchronisation instantanée.
- **Assets** :
  - Vidéos stockées dans `public/videos/` (`intro.mp4`, `atmosphere.mp4`)
  - Logo SVG vectorisé haute fidélité dans `public/brand/logo.svg`
- **Intégration WhatsApp** : Générateur d'URL WhatsApp universel (`https://wa.me/?text=...`) encodant proprement le bon de commande.

## 2. Structure des Composants

```
mogo-boutique/
├── public/
│   ├── brand/
│   │   └── logo.svg               # Logo vectorisé propre (croix, livre, typographie)
│   └── videos/
│       ├── intro.mp4              # Vidéo d'accueil (paysage)
│       └── atmosphere.mp4         # Vidéo mannequin (portrait)
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Barre supérieure avec logo centré + icône panier flottant
│   │   ├── VideoStage.jsx         # Lecteur vidéo plein écran avec overlay & gestion son
│   │   ├── ColorPlate.jsx         # Plaque de couleur texturée élégante (fallback sans image)
│   │   ├── ProductCard.jsx        # Carte produit dans le catalogue
│   │   ├── CartDrawer.jsx         # Tiroir panier latéral avec récapitulatif & bouton WhatsApp
│   │   └── Filters.jsx            # Filtres par collection, type, couleur
│   ├── context/
│   │   └── CartContext.jsx        # Context d'état du panier (ajouter, modifier, supprimer, vider)
│   ├── data/
│   │   └── products.js            # Base catalogue (10+ articles avec image: null)
│   ├── pages/
│   │   ├── IntroPage.jsx          # Accueil vidéo + bouton fin "Entrer dans notre atmosphère"
│   │   ├── AtmospherePage.jsx     # Vidéo portrait avec fond miroir flou + "Voir tous les produits"
│   │   ├── ShopPage.jsx           # Catalogue complet filtrable & triable
│   │   ├── ProductPage.jsx        # Détail produit, sélection taille/couleur, ajout panier
│   │   └── CheckoutPage.jsx       # Récapitulatif commande & validation WhatsApp
│   ├── styles/
│   │   ├── tokens.css             # Palette sombre, typographies, espacements, ombres
│   │   └── index.css              # Reset CSS, utilitaires, animations
│   ├── App.jsx                    # Routing & Providers
│   └── main.jsx                   # Point d'entrée
├── package.json
└── vite.config.js
```

## 3. Design Tokens & Identité Visuelle

- **Palette Fond** : Noir Abyssal (`#0B0C0E`), Gris Carbone (`#15171B`), Ardoise Sombre (`#242930`)
- **Palette Accent** : Blanc Pur (`#FFFFFF`), Rose Prophétique (`#F098BD`), Mauve Royal (`#8E687E`), Or Discret (`#D4AF37`)
- **Typographie** :
  - Titres / Marque : `'Space Grotesk'`, `'Cinzel'` ou `'Montserrat'` uppercase espacé
  - Corps de texte : `'Inter'`, système sans-serif épuré
- **Bouton Événementiel** : Effet de verre sombre poli (`backdrop-filter: blur(12px)`), bordure subtile blanche phosphorescente, hover avec lueur discrète.

## 4. Stratégie Vidéo & Événements

1. **Vidéo d'Intro** :
   - `playsInline`, `muted` par défaut pour contourner les blocages des navigateurs mobiles et desktop.
   - Contrôles audio discrets (icône son barré / actif) en bas à droite.
   - Écouteur `onEnded` : bascule de l'état `isEnded = true` qui déclenche l'animation d'apparition du bouton géant.
   - Sécurité : bouton « Passer » discret en haut à droite dès le départ.

2. **Vidéo Atmosphère** :
   - Sur grand écran, affichage en conteneur 9:16 centré, flanqué d'un duplicata vidéo flouté à 40px en arrière-plan occupant 100% du viewport.
   - Bouton « Voir tous les produits » présent et flottant ou ancré sous la vidéo avec un appel à l'action clair.

## 5. Modèle Catalogue & WhatsApp

Format d'un article dans `products.js` :
```javascript
{
  id: "prophetic-man-black",
  name: "T-Shirt Prophetic Man",
  slug: "tshirt-prophetic-man-noir",
  collection: "Prophetic Man",
  category: "tshirt",
  price: 25000, // FCFA
  currency: "FCFA",
  color: { name: "Noir Délavé", hex: "#1F2124" },
  accentColor: "#F098BD",
  sizes: ["S", "M", "L", "XL", "XXL"],
  description: "T-shirt oversize en coton lourd 240 GSM. Coupe street contemporaine, marquage prophétique signature.",
  image: null // Remplacer ici par le chemin de la photo (ex: "/products/man-black.jpg")
}
```

Format du message WhatsApp généré :
```
Bonjour Le Môgô de God Clothing ! 👋
Je souhaite commander les articles suivants :

• 1x T-Shirt Prophetic Man (Taille: L, Couleur: Noir Délavé) — 25 000 FCFA
• 1x Casquette I'm Prophetic (Taille: Unique, Couleur: Noir) — 15 000 FCFA

Total de la commande : 40 000 FCFA
Nom du client : [À renseigner]
Ville / Adresse de livraison : [À renseigner]
```
