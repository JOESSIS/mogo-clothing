import { formatPrice } from '../data/products';

// Numéro WhatsApp par défaut du service client Le Môgô de God (peut être mis à jour par le client)
export const WHATSAPP_PHONE_NUMBER = '2250700000000'; // Indicatif Côte d'Ivoire par exemple (+225)

/**
 * Génère l'URL WhatsApp avec le bon de commande formaté
 */
export const generateWhatsAppOrderUrl = ({ cart, customer = {}, phoneNumber = WHATSAPP_PHONE_NUMBER }) => {
  if (!cart || cart.length === 0) return '';

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let message = `Bonjour *Le Môgô de God Clothing* ! 👋\n`;
  message += `Je souhaite passer commande sur votre boutique en ligne :\n\n`;
  message += `*RÉCAPITULATIF DE MA COMMANDE :*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   • Taille : ${item.selectedSize}\n`;
    message += `   • Couleur : ${item.color.name}\n`;
    message += `   • Quantité : ${item.quantity}\n`;
    message += `   • Prix unitaire : ${formatPrice(item.price)}\n`;
    message += `   • Sous-total : ${formatPrice(item.price * item.quantity)}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*MONTANT TOTAL : ${formatPrice(total)}*\n\n`;

  message += `*INFORMATIONS CLIENT :*\n`;
  message += `• Nom complet : ${customer.name?.trim() || '[À préciser]'}\n`;
  message += `• Ville / Quartier : ${customer.city?.trim() || '[À préciser]'}\n`;
  message += `• Téléphone : ${customer.phone?.trim() || '[À préciser]'}\n`;
  if (customer.notes?.trim()) {
    message += `• Remarques : ${customer.notes.trim()}\n`;
  }

  message += `\nMerci de me confirmer la disponibilité et les modalités de livraison ! 🙏`;

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
