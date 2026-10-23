# Constitution du projet — Le Môgô de God Clothing

## Principes Fondamentaux

### I. Immersion & Qualité Visuelle Mobile-First
Le site reflète une marque de streetwear chrétienne/prophétique haut de gamme née de la culture urbaine (« Môgô »). L'expérience doit être fluide et percutante sur mobile comme sur desktop :
- Gestion optimale des deux formats vidéo : 16:9 paysage (`video du debut.mp4`) en accueil et 9:16 portrait (`deuxieme video.mp4`) sur la page atmosphère.
- Sur grand écran, la vidéo portrait est élégamment centrée avec arrière-plan flouté pour éviter toute bande noire inesthétique.
- Autoplay en sourdine (`muted playsinline`) pour compatibilité tous navigateurs, avec toggle son clair.

### II. Accessibilité & Respect de l'Utilisateur
- Chaque étape vidéo comporte un bouton discret « Passer » permettant aux visiteurs habitués d'accéder directement au catalogue sans attendre.
- Les boutons principaux respectent les normes d'accessibilité (contraste WCAG AA >= 4.5:1, cible tactile minimale 44x44px).
- Respect du paramètre système `prefers-reduced-motion` : transitions adoucies ou instantanées pour les utilisateurs sensibles.

### III. Plaques de Couleur Modulaires (Data-First)
- En l'absence de photos détourées studio définitives, les cartes produits affichent des plaques de couleur artistiques avec typographie soignée (couleur du tissu, nom de la collection).
- L'architecture de données (`src/data/products.js`) intègre un champ `image: null` (ou chemin local optionnel). Remplacer `null` par l'URL d'une photo bascule automatiquement la carte en affichage photo sans retouche de code.

### IV. Tunnel d'Achat & Commande WhatsApp
- Prix affichés et calculés en Francs CFA (FCFA / XOF).
- Le processus de commande se conclut par une redirection fluide vers WhatsApp avec un message préformaté et structuré (articles, tailles, couleurs, quantités, total en FCFA).

### V. Architecture Modulaire & Performance (Vite + React)
- Structure de composants découplée (Header avec logo centré, VideoStage, ProductCard, CartDrawer, etc.).
- Design tokens unifiés dans `tokens.css` (palette sombre issue de la bâche `#0E0F11`, ardoise `#2E3640`, blanc cassé, accents rose prophétique).
- Panier d'achat géré via React Context avec persistance dans le `localStorage`.

## Gouvernance & Standards de Qualité
- Toute nouvelle fonctionnalité doit respecter les tokens de design et la cohérence de marque.
- Build de production `npm run build` toujours vert et sans warning.
- Validation multi-écrans (390px mobile, 768px tablette, 1440px desktop).

**Version**: 1.0.0 | **Ratifié**: 2026-10-21 | **Statut**: Actif
