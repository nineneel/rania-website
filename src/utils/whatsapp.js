/**
 * WhatsApp Utility Functions
 * Generates WhatsApp URLs with pre-filled messages
 */

import i18n from '../i18n';

// WhatsApp phone numbers for sales
const WHATSAPP_HAJJ = '62812561717';
const WHATSAPP_UMRAH = '628118855489';

/**
 * Message templates for different actions
 */
export const whatsappMessages = {
  // Hajj Messages
  hajjInterest: (packageName) => i18n.t('whatsapp.hajjInterest', { packageName }),

  hajjCTA: () => i18n.t('whatsapp.hajjCTA'),

  hajjUpgrade: () => i18n.t('whatsapp.hajjUpgrade'),

  hajjChange: () => i18n.t('whatsapp.hajjChange'),

  // Umrah Messages
  umrahInterest: (packageName) => i18n.t('whatsapp.umrahInterest', { packageName }),

  umrahCTA: () => i18n.t('whatsapp.umrahCTA'),

  umrahChange: () => i18n.t('whatsapp.umrahChange'),

  umrahCustomize: () => i18n.t('whatsapp.umrahCustomize'),

  // Partnership Messages
  partnershipCompany: () => i18n.t('whatsapp.partnershipCompany'),

  partnershipNGO: () => i18n.t('whatsapp.partnershipNGO'),

  partnershipOther: () => i18n.t('whatsapp.partnershipOther'),

  // Contact Rania (general)
  contactRania: () => i18n.t('whatsapp.contactRania')
};

/**
 * Generate WhatsApp URL with pre-filled message
 * @param {string} message - The pre-filled message
 * @param {string} phoneNumber - WhatsApp number
 * @returns {string} WhatsApp URL
 */
export const generateWhatsAppUrl = (message, phoneNumber) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Open WhatsApp for Hajj inquiries
 * @param {string} message - The pre-filled message
 */
export const openWhatsAppHajj = (message) => {
  const url = generateWhatsAppUrl(message, WHATSAPP_HAJJ);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Open WhatsApp for Umrah inquiries
 * @param {string} message - The pre-filled message
 */
export const openWhatsAppUmrah = (message) => {
  const url = generateWhatsAppUrl(message, WHATSAPP_UMRAH);
  window.open(url, '_blank', 'noopener,noreferrer');
};
