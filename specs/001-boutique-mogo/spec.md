# Feature Specification: Boutique en ligne Le Môgô de God Clothing

**Feature Branch**: `001-boutique-mogo`  
**Created**: 2026-10-21  
**Status**: Approved  
**Input**: Boutique vitrine streetwear chrétien avec accueil vidéo plein écran, transition atmosphère mannequin, catalogue de plaques de couleur, panier d'achat et commande WhatsApp en Francs CFA.

## User Scenarios & Testing

### User Story 1 - Immersion Accueil Vidéo (Priority: P1)
Un visiteur arrive sur le site. Il est accueilli par une vidéo cinématographique plein écran (16:9). À la fin complète de la vidéo (ou via un bouton passer discret), un bouton géant apparaît avec élégance : « Entrer dans notre atmosphère ». En cliquant, l'utilisateur est transporté vers la suite de l'expérience.

- **Why this priority**: Établit l'identité de marque forte et crée la tension narrative voulue par le client.
- **Independent Test**: Lancer la page d'accueil, observer la lecture vidéo, vérifier l'apparition du bouton « Entrer dans notre atmosphère » à l'événement `ended` et la navigation au clic.
- **Acceptance Scenarios**:
  1. **Given** un visiteur sur `/`, **When** la vidéo d'intro atteint sa fin, **Then** le bouton « Entrer dans notre atmosphère » s'affiche avec animation douce.
  2. **Given** un visiteur pressé, **When** il clique sur « Passer l'intro », **Then** il accède directement à la page atmosphère ou boutique.

---

### User Story 2 - Vidéo Atmosphère Mannequin (Priority: P1)
Sur la page `/atmosphere`, une vidéo portrait (9:16) présente le mannequin portant les créations. Sur mobile, elle occupe l'écran ; sur desktop, elle est centrée avec un fond miroir flouté atmosphérique. Un bouton « Voir tous les produits » permet d'accéder au catalogue.

- **Why this priority**: Transition visuelle entre le concept artistique et les vêtements portés.
- **Independent Test**: Visiter `/atmosphere`, vérifier le cadrage responsive et le clic vers `/boutique`.
- **Acceptance Scenarios**:
  1. **Given** un utilisateur sur mobile, **When** il charge `/atmosphere`, **Then** la vidéo portrait remplit l'écran avec le bouton d'action visible.
  2. **Given** un utilisateur desktop, **When** il charge `/atmosphere`, **Then** la vidéo 9:16 est centrée sans bandes noires brutes, avec fond flouté d'ambiance.

---

### User Story 3 - Exploration du Catalogue (Plaques de Couleur) (Priority: P1)
Sur `/boutique`, le visiteur parcourt les vêtements présentés sous forme de cartes élégantes avec plaques de couleur fidèles aux tissus réels (Prophetic Man, Prophetic Woman, I'm Prophetic). Il peut filtrer par collection, catégorie, couleur, et trier par prix.

- **Why this priority**: Cœur commercial de la boutique permettant de découvrir l'offre complète.
- **Independent Test**: Filtrer par collection "Prophetic Woman", vérifier que seuls les articles correspondants s'affichent.
- **Acceptance Scenarios**:
  1. **Given** le catalogue, **When** l'utilisateur sélectionne un filtre de collection, **Then** la grille se met à jour instantanément.
  2. **Given** une carte produit sans image réelle, **When** elle est affichée, **Then** la plaque de couleur texturée avec typographie premium met en valeur le modèle.

---

### User Story 4 - Fiche Produit, Tailles & Panier (Priority: P2)
L'utilisateur clique sur un produit pour voir sa fiche détaillée : description, composition, sélection de la taille (S, M, L, XL, XXL) et de la couleur. Il ajoute l'article au panier. Un tiroir latéral s'ouvre, montrant le récapitulatif et le montant total en FCFA.

- **Independent Test**: Choisir une taille M, ajouter au panier, recharger la page, vérifier que le panier est conservé (`localStorage`).

---

### User Story 5 - Finalisation & Commande WhatsApp (Priority: P2)
Dans le tiroir panier ou la page de récapitulatif, l'utilisateur clique sur « Commander via WhatsApp ». Il est redirigé vers l'application WhatsApp (ou web) avec un message préformaté contenant ses articles, tailles, quantités et le total en FCFA.

- **Independent Test**: Remplir un panier, cliquer sur commander, vérifier que l'URL générée `https://wa.me/...` contient l'encodage correct du message.

---

## Requirements

### Functional Requirements
- **FR-001**: Le logo officiel doit être affiché au centre de la barre supérieure sur toutes les pages avec un contraste parfait.
- **FR-002**: L'accueil affiche `video du debut.mp4` en plein écran avec muted autoplay et bouton sonore.
- **FR-003**: Le bouton « Entrer dans notre atmosphère » ne doit s'afficher qu'à l'issue de la vidéo d'intro (ou via bypass de secours si erreur de lecture).
- **FR-004**: La page atmosphère diffuse `deuxieme video.mp4` avec le bouton « Voir tous les produits ».
- **FR-005**: Les produits utilisent un modèle de données unifié (`src/data/products.js`) avec un champ `image: null` facilement substituable.
- **FR-006**: Tous les prix sont affichés au format `XX XXX FCFA`.
- **FR-007**: Le panier est persisté localement et permet d'ajuster les quantités ou supprimer des articles.
- **FR-008**: La redirection WhatsApp génère un message clair et professionnel prêt à être envoyé par le client.

## Key Entities
- **Product**: ID, nom, slug, collection (`Prophetic Man`, `Prophetic Woman`, `I'm Prophetic`), catégorie (`tshirt`, `sweat`, `cap`), description, prix (FCFA), couleur (hex + libellé), tailles disponibles (`['S', 'M', 'L', 'XL', 'XXL']`), `image: null | string`.
- **CartItem**: ID produit, nom, taille choisie, couleur, quantité, prix unitaire, sous-total.

## Success Criteria
- **SC-001**: Parcours complet fonctionnel sans rechargement de page (SPA Vite React).
- **SC-002**: Zéro décalage de layout (CLS < 0.1) et performance vidéo 60fps.
- **SC-003**: Panier d'achat fiable à 100% avec génération immédiate du lien WhatsApp.
