/**
 * WhatsApp Utility Functions
 * Generates WhatsApp URLs with pre-filled messages
 */

// WhatsApp phone numbers for sales
const WHATSAPP_HAJJ = '62812561717';
const WHATSAPP_UMRAH = '628118855489';

/**
 * Message templates for different actions
 */
export const whatsappMessages = {
  // Hajj Messages
  hajjInterest: (packageName) => `Assalamu'alaikum Rania, saya ingin informasi lebih lanjut tentang Program Haji Khusus (ONH) 🙏🏻

- Nama Jamaah:
- Domisili:
- Pekerjaan:
- Umur:
- Paket Haji yang diminati: ${packageName}`,

  hajjCTA: () => `Assalamu'alaikum Rania, saya ingin informasi lebih lanjut tentang Program Haji Khusus (ONH) 🙏🏻`,

  hajjUpgrade: () => `- nama jamaah:
- Domisili:
- Pekerjaan:
- Umur:
- Paket haji saat ini:
- Ganti Kelas haji ke:`,

  hajjChange: () => `- nama jamaah
- Domisili:
- Pekerjaan:
- Umur:
- kelas haji sekarang:
- ganti kelas haji ke:`,

  // Umrah Messages
  umrahInterest: (packageName) => `Assalamu'alaikum Rania, saya ingin info lanjut tentang keberangkatan Umroh saat ini 🙏🏻

- Nama Jamaah:
- Domisili:
- Pekerjaan:
- Umur:
- Paket Umrah yang diminati: ${packageName}`,

  umrahCTA: () => `Assalamu'alaikum Rania, saya ingin info lanjut tentang keberangkatan Umroh saat ini 🙏🏻`,

  umrahChange: () => `- nama jamaah
- Domisili:
- Pekerjaan:
- umur:
- rencana umrah:
- perubahan destinasi:`,

  umrahCustomize: () => `Assalamu'alaikum Rania, saya ingin info untuk kustomisasi paket Umroh 🙏🏻

- Nama Jamaah:
- Domisili:
- Pekerjaan:
- Umur:
- Detail perubahan yang diinginkan (hotel/penerbangan/tanggal/destinasi):`,

  // Partnership Messages
  partnershipCompany: () => `Assalamu'alaikum Rania, saya tertarik untuk berkolaborasi dalam Program Haji & Umrah 🙏🏻

- Nama Perusahaan:
- Bidang Usaha:
- Nama PIC:
- Jabatan:
- No. Telepon:
- Jenis Kolaborasi yang diminati: Company Collaboration`,

  partnershipNGO: () => `Assalamu'alaikum Rania, saya tertarik untuk berkolaborasi dalam Program Haji & Umrah 🙏🏻

- Nama Organisasi:
- Bidang Kegiatan:
- Nama PIC:
- Jabatan:
- No. Telepon:
- Jenis Kolaborasi yang diminati: NGO Collaboration`,

  partnershipOther: () => `Assalamu'alaikum Rania, saya tertarik untuk berkolaborasi dalam Program Haji & Umrah 🙏🏻

- Nama:
- Profesi/Bidang:
- No. Telepon:
- Jenis Kolaborasi yang diminati: Other Collaboration
- Detail kolaborasi yang diinginkan:`,

  // Contact Rania (general)
  contactRania: () => `Assalamu'alaikum Rania, saya ingin informasi lebih lanjut tentang layanan Anda 🙏🏻`
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
