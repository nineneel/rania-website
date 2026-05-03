// Helper functions for RANIA Website

/**
 * Format currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

const PRICE_LOCALE_BY_CURRENCY = {
  IDR: 'id-ID',
  USD: 'en-US',
  SAR: 'ar-SA',
};

/**
 * Resolve a usable price + currency from an umrah package response.
 * Falls back to IDR when the requested locale's price is null.
 *
 * @param {{ price?: string|null, currency?: string|null, prices?: { idr?: string|null, usd?: string|null, sar?: string|null } | null }} pkg
 * @returns {{ amount: number, currency: 'IDR'|'USD'|'SAR' } | null}
 */
export const resolvePackagePrice = (pkg) => {
  if (!pkg) return null;

  if (pkg.price != null && pkg.currency) {
    const numeric = Number(pkg.price);
    if (!Number.isNaN(numeric)) {
      return { amount: numeric, currency: pkg.currency };
    }
  }

  const idrFallback = pkg.prices?.idr;
  if (idrFallback != null) {
    const numeric = Number(idrFallback);
    if (!Number.isNaN(numeric)) {
      return { amount: numeric, currency: 'IDR' };
    }
  }

  return null;
};

/**
 * Format an umrah package price into separate currency + amount strings,
 * suitable for the existing two-span layout used in listing & detail pages.
 *
 * @param {object} pkg - Package object from /api/umrah-packages
 * @returns {{ currency: string, amount: string } | null}
 */
export const formatPackagePrice = (pkg) => {
  const resolved = resolvePackagePrice(pkg);
  if (!resolved) return null;

  const { amount, currency } = resolved;
  const locale = PRICE_LOCALE_BY_CURRENCY[currency] || 'id-ID';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return { currency, amount: formatted };
};

/**
 * Format date
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Truncate text
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
