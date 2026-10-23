/**
 * Catalogue Le Môgô de God Clothing
 * 
 * NOTE POUR LE CLIENT :
 * Pour afficher de vraies photos au lieu des plaques de couleur,
 * remplacez simplement `image: null` par le chemin de votre photo
 * (ex: image: "/images/tshirt-prophetic-man.jpg")
 */

export const COLLECTIONS = [
  { id: 'all', label: 'Toutes les Collections' },
  { id: 'Prophetic Man', label: 'Prophetic Man' },
  { id: 'Prophetic Woman', label: 'Prophetic Woman' },
  { id: "I'm Prophetic", label: "I'm Prophetic" },
];

export const CATEGORIES = [
  { id: 'all', label: 'Tous les Types' },
  { id: 'tshirt', label: 'T-Shirts Oversize' },
  { id: 'sweat', label: 'Sweats & Hoodies' },
  { id: 'cap', label: 'Casquettes & Accessoires' },
];

export const PRODUCTS = [
  {
    id: 'pm-tee-black',
    slug: 't-shirt-prophetic-man-noir-delave',
    name: 'T-Shirt Prophetic Man',
    collection: 'Prophetic Man',
    category: 'tshirt',
    subtitle: 'Oversize 240 GSM — Édition Prophétique',
    price: 25000,
    currency: 'FCFA',
    color: {
      name: 'Noir Délavé Ardoise',
      hex: '#1E2229',
      border: '#2e3540'
    },
    accentColor: '#F298BC',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'T-shirt coupe boxy oversize taillé dans un coton peigné lourd de 240 GSM. Sérigraphie haute densité "PROPHETIC MAN" au dos avec le lettrage signature rose et croix brodée sur le torse.',
    details: [
      '100% Coton peigné haut de gamme (240 GSM)',
      'Coupe décontractée oversize streetwear',
      'Col rond renforcé anti-déformation',
      'Sérigraphie résistante au lavage industriel'
    ],
    image: null,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'pm-tee-white',
    slug: 't-shirt-prophetic-man-blanc-optique',
    name: 'T-Shirt Prophetic Man Blanc',
    collection: 'Prophetic Man',
    category: 'tshirt',
    subtitle: 'Oversize Pure Cotton — Signature White',
    price: 25000,
    currency: 'FCFA',
    color: {
      name: 'Blanc Immaculé',
      hex: '#F8F9FA',
      border: '#D0D5DD'
    },
    accentColor: '#1E2229',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Version épurée en blanc pur immaculé. Conçu pour illuminer les atmosphères urbaines tout en proclamant une identité céleste forte.',
    details: [
      '100% Coton premium ultra-doux',
      'Coupe boxy streetwear',
      'Finition double piqûre aux manches et à la base'
    ],
    image: null,
    isNew: true,
    isFeatured: false
  },
  {
    id: 'pw-tee-pink',
    slug: 't-shirt-prophetic-woman-rose-poudre',
    name: 'T-Shirt Prophetic Woman Rose',
    collection: 'Prophetic Woman',
    category: 'tshirt',
    subtitle: 'Coupe Élégance Streetwear',
    price: 25000,
    currency: 'FCFA',
    color: {
      name: 'Rose Poudré Prophétique',
      hex: '#ECA8C1',
      border: '#D38AA7'
    },
    accentColor: '#2B1B24',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Teinte rose poudré subtile et affirmée. T-shirt conçu pour la femme prophétique, alliant prestance spirituelle, douceur et attitude streetwear affirmée.',
    details: [
      'Coton peigné toucher soyeux',
      'Coupe ajustée-loose pour femme',
      'Marquage prophétique doré délicat'
    ],
    image: null,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'pw-sweat-cream',
    slug: 'sweat-crewneck-prophetic-woman-creme',
    name: 'Sweat Crewneck Prophetic Woman',
    collection: 'Prophetic Woman',
    category: 'sweat',
    subtitle: 'Molleton Chaud 360 GSM — Crème & Mauve',
    price: 35000,
    currency: 'FCFA',
    color: {
      name: 'Blanc Crème Nacré',
      hex: '#F4EFEB',
      border: '#DDD5CD'
    },
    accentColor: '#8C6A7B',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Sweatshirt crewneck molletonné ultra-confortable en crème nacré. Lettrage texturé en relief mauve prophétique.',
    details: [
      'Molleton brossé intérieur doux 360 GSM',
      'Bords-côtes élastiques durables',
      'Badge brodé haute définition au poignet'
    ],
    image: null,
    isNew: false,
    isFeatured: true
  },
  {
    id: 'ip-tee-black',
    slug: 't-shirt-im-prophetic-black-gold',
    name: "T-Shirt I'm Prophetic",
    collection: "I'm Prophetic",
    category: 'tshirt',
    subtitle: 'Déclaration Prophétique — Noir & Or',
    price: 25000,
    currency: 'FCFA',
    color: {
      name: 'Noir Royal',
      hex: '#111215',
      border: '#282B33'
    },
    accentColor: '#D4AF37',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Plus qu’un vêtement, une proclamation : "I\'m Prophetic". Typographie percutante rehaussée de reflets dorés satinés.',
    details: [
      '100% Coton peigné 240 GSM',
      'Impression dorée sérigraphique résistante',
      'Coupe oversize mixte'
    ],
    image: null,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'pm-hoodie-charcoal',
    slug: 'hoodie-prophetic-man-charcoal',
    name: 'Hoodie Oversize Prophetic Man',
    collection: 'Prophetic Man',
    category: 'sweat',
    subtitle: 'Capuche Double Épaisseur 400 GSM',
    price: 40000,
    currency: 'FCFA',
    color: {
      name: 'Gris Anthracite Bâche',
      hex: '#272B33',
      border: '#3D4450'
    },
    accentColor: '#F8F9FA',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Le hoodie lourd emblématique de la marque, inspiré de l’univers visuel du logo original. Capuche enveloppante sans cordon pour un design épuré et moderne.',
    details: [
      'Heavyweight fleece 400 GSM',
      'Poche kangourou renforcée',
      'Coupe tombante aux épaules'
    ],
    image: null,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'ip-cap-black',
    slug: 'casquette-im-prophetic-signature',
    name: "Casquette I'm Prophetic",
    collection: "I'm Prophetic",
    category: 'cap',
    subtitle: 'Broderie 3D Relief — Visière Structurée',
    price: 15000,
    currency: 'FCFA',
    color: {
      name: 'Noir Nuit',
      hex: '#141518',
      border: '#2A2C33'
    },
    accentColor: '#FFFFFF',
    sizes: ['Taille Unique (Ajustable)'],
    description: 'Casquette streetwear 6 panneaux avec broderie 3D en relief "I\'M PROPHETIC" et boucle de réglage métallique à l’arrière gravée du logo.',
    details: [
      'Tissu sergé de coton robuste',
      'Broderie en relief haute densité',
      'Attache métallique ajustable'
    ],
    image: null,
    isNew: false,
    isFeatured: true
  },
  {
    id: 'pw-tee-black',
    slug: 't-shirt-prophetic-woman-black',
    name: 'T-Shirt Prophetic Woman Noir',
    collection: 'Prophetic Woman',
    category: 'tshirt',
    subtitle: 'Noir Intense & Typographie Rose Poudré',
    price: 25000,
    currency: 'FCFA',
    color: {
      name: 'Noir Profond',
      hex: '#151618',
      border: '#2E3036'
    },
    accentColor: '#ECA8C1',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Le contraste parfait entre la puissance du noir et la subtilité du rose poudré. Conçu pour les femmes qui portent leur appel avec assurance.',
    details: [
      'Coton peigné doux toucher velouté',
      'Coupe streetwear fluide',
      'Finition haut de gamme'
    ],
    image: null,
    isNew: false,
    isFeatured: false
  }
];

export const formatPrice = (amount) => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
};
