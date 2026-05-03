// API Configuration for RANIA Website
import i18n from '../i18n';
import { API_ENDPOINTS } from '../utils/constants';
import logger from '../utils/logger';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const SUPPORTED_LOCALES = ['id', 'en', 'ar'];

const getActiveLocale = () => {
  const code = (i18n.language || 'id').slice(0, 2).toLowerCase();
  return SUPPORTED_LOCALES.includes(code) ? code : 'id';
};

// Log API configuration on load
logger.info('⚙️ [API Config] Base URL:', API_BASE_URL);
logger.debug('⚙️ [API Config] Available Endpoints:', API_ENDPOINTS);

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} API response
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': getActiveLocale(),
    },
  };

  try {
    logger.debug('🌐 [API Request]', {
      url,
      method: options.method || 'GET'
    });

    const response = await fetch(url, { ...defaultOptions, ...options });

    // Check if response is OK
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorMessage = `HTTP ${response.status} ${response.statusText}`;

      // Try to get error details
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const errorText = await response.text();
        // If HTML error page, provide helpful message
        if (errorText.includes('<!DOCTYPE') || errorText.includes('<html')) {
          errorMessage = `Backend returned HTML instead of JSON. Is the Laravel server running at ${API_BASE_URL}?`;
        }
      }

      throw new Error(errorMessage);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but got ${contentType}. Check if the endpoint exists.`);
    }

    return await response.json();
  } catch (error) {
    // Network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      logger.error('❌ [Network Error] Cannot connect to API server at:', API_BASE_URL);
      logger.error('   Make sure your Laravel backend is running!');
      throw new Error(`Cannot connect to API server at ${API_BASE_URL}. Is the backend running?`);
    }

    logger.error('❌ [API Request Failed]', error.message);
    throw error;
  }
};

/**
 * Get hero slides with pagination support
 * @param {Object} params - Query parameters
 * @param {number} params.per_page - Items per page (default: 10, max: 50)
 * @param {number} params.page - Page number (default: 1)
 * @returns {Promise<{success: boolean, data: Array, pagination: Object}>}
 */
export const getHeroSlides = async (params = {}) => {
  const { per_page = 10, page = 1 } = params;
  const queryParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
  });

  const endpoint = `${API_ENDPOINTS.HERO_SLIDES}?${queryParams}`;
  logger.debug('📡 [API] GET', endpoint);

  try {
    const response = await apiRequest(endpoint);
    logger.info('✅ [API] Hero Slides Response:', {
      success: response.success,
      dataCount: response.data?.length,
      pagination: response.pagination
    });
    return response;
  } catch (error) {
    logger.error('❌ [API] Hero Slides Error:', error.message);
    throw error;
  }
};

/**
 * Get all events
 * @returns {Promise<{data: Array}>}
 */
export const getEvents = async () => {
  logger.debug('📡 [API] GET', API_ENDPOINTS.EVENTS);

  try {
    const response = await apiRequest(API_ENDPOINTS.EVENTS);
    logger.info('✅ [API] Events Response:', {
      dataCount: response.data?.length
    });
    return response;
  } catch (error) {
    logger.error('❌ [API] Events Error:', error.message);
    throw error;
  }
};

/**
 * Get testimonials with pagination support
 * @param {Object} params - Query parameters
 * @param {number} params.per_page - Items per page (default: 10, max: 50)
 * @param {number} params.page - Page number (default: 1)
 * @returns {Promise<{success: boolean, data: Array, pagination: Object}>}
 */
export const getTestimonials = async (params = {}) => {
  const { per_page = 10, page = 1 } = params;
  const queryParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
  });

  try {
    const response = await apiRequest(`${API_ENDPOINTS.TESTIMONIALS}?${queryParams}`);
    return response;
  } catch (error) {
    console.warn('Failed to fetch testimonials:', error);
    throw error;
  }
};

/**
 * Get Rania Gallery images with pagination
 * @param {{per_page?: number, page?: number}} params
 * @returns {Promise<{success: boolean, data: Array, pagination: object}>}
 */
export const getRaniaGalleries = async (params = {}) => {
  const { per_page = 12, page = 1 } = params;
  const queryParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
  });

  try {
    const response = await apiRequest(`${API_ENDPOINTS.RANIA_GALLERIES}?${queryParams}`);
    return response;
  } catch (error) {
    console.warn('Failed to fetch rania galleries:', error);
    throw error;
  }
};

/**
 * Get News & Articles with pagination
 * @param {{per_page?: number, page?: number}} params
 * @returns {Promise<{success: boolean, data: Array, pagination: object}>}
 */
export const getNewsArticles = async (params = {}) => {
  const { per_page = 12, page = 1 } = params;
  const queryParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
  });

  try {
    const response = await apiRequest(`${API_ENDPOINTS.NEWS_ARTICLES}?${queryParams}`);
    return response;
  } catch (error) {
    console.warn('Failed to fetch news articles:', error);
    throw error;
  }
};

/**
 * Get all umrah packages with hotels and airlines
 * @returns {Promise<{success: boolean, data: Array}>}
 */
export const getUmrahPackages = async () => {
  const logPrefix = '[Umrah Packages]';

  try {
    logger.debug(`📡 [API] GET ${API_ENDPOINTS.UMRAH_PACKAGES}`);
    const response = await apiRequest(API_ENDPOINTS.UMRAH_PACKAGES);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      dataCount: response.data?.length
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Get umrah package detail by slug
 * @param {string} slug - Package slug
 * @returns {Promise<{success: boolean, data: Object}>}
 */
export const getUmrahPackageDetail = async (slug) => {
  const logPrefix = '[Umrah Package Detail]';
  const endpoint = `${API_ENDPOINTS.UMRAH_PACKAGE_DETAIL}/${slug}`;

  try {
    logger.debug(`📡 [API] GET ${endpoint}`);
    const response = await apiRequest(endpoint);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      packageId: response.data?.id,
      packageTitle: response.data?.title
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Get other additional services not included in a specific package
 * @param {string} slug - Package slug
 * @param {Object} params - Query parameters
 * @param {number} params.per_page - Items per page (default: 12)
 * @param {number} params.page - Page number (default: 1)
 * @returns {Promise<{success: boolean, data: Array, meta: Object, links: Object}>}
 */
export const getOtherAdditionalServices = async (slug, params = {}) => {
  const logPrefix = '[Other Additional Services]';
  const { per_page = 12, page = 1 } = params;
  const queryParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
  });
  const endpoint = `${API_ENDPOINTS.UMRAH_OTHER_ADDITIONAL_SERVICES}/${slug}/other-additional-services?${queryParams}`;

  try {
    logger.debug(`📡 [API] GET ${endpoint}`);
    const response = await apiRequest(endpoint);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      dataCount: response.data?.length,
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Get all hajj packages with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @returns {Promise<{success: boolean, data: Array, meta: Object, links: Object}>}
 */
export const getHajjPackages = async (params = {}) => {
  const logPrefix = '[Hajj Packages]';
  const { page = 1 } = params;
  const queryParams = new URLSearchParams({ page: page.toString() });
  const endpoint = `${API_ENDPOINTS.HAJJ_PACKAGES}?${queryParams}`;

  try {
    logger.debug(`📡 [API] GET ${endpoint}`);
    const response = await apiRequest(endpoint);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      dataCount: response.data?.length
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Get hajj package detail by slug
 * @param {string} slug - Package slug
 * @returns {Promise<{success: boolean, data: Object}>}
 */
export const getHajjPackageDetail = async (slug) => {
  const logPrefix = '[Hajj Package Detail]';
  const endpoint = `${API_ENDPOINTS.HAJJ_PACKAGE_DETAIL}/${slug}`;

  try {
    logger.debug(`📡 [API] GET ${endpoint}`);
    const response = await apiRequest(endpoint);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      packageId: response.data?.id,
      packageTitle: response.data?.title
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Get other additional services not included in a specific hajj package
 * @param {string} slug - Package slug
 * @param {Object} params - Query parameters
 * @param {number} params.per_page - Items per page (default: 12)
 * @param {number} params.page - Page number (default: 1)
 * @returns {Promise<{success: boolean, data: Array, meta: Object, links: Object}>}
 */
export const getHajjOtherAdditionalServices = async (slug, params = {}) => {
  const logPrefix = '[Hajj Other Additional Services]';
  const { per_page = 12, page = 1 } = params;
  const queryParams = new URLSearchParams({
    per_page: per_page.toString(),
    page: page.toString(),
  });
  const endpoint = `${API_ENDPOINTS.HAJJ_OTHER_ADDITIONAL_SERVICES}/${slug}/other-additional-services?${queryParams}`;

  try {
    logger.debug(`📡 [API] GET ${endpoint}`);
    const response = await apiRequest(endpoint);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      dataCount: response.data?.length,
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Get all active social media links
 * @returns {Promise<{success: boolean, data: Array}>}
 */
export const getSocialMedia = async () => {
  const logPrefix = '[Social Media]';

  try {
    logger.debug(`📡 [API] GET ${API_ENDPOINTS.SOCIAL_MEDIA}`);
    const response = await apiRequest(API_ENDPOINTS.SOCIAL_MEDIA);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      dataCount: response.data?.length
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Get linktree data (links + social media) in a single request
 * @returns {Promise<{success: boolean, data: {links: Array, social_media: Array}}>}
 */
export const getLinktree = async () => {
  const logPrefix = '[Linktree]';

  try {
    logger.debug(`📡 [API] GET ${API_ENDPOINTS.LINKTREE}`);
    const response = await apiRequest(API_ENDPOINTS.LINKTREE);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      linksCount: response.data?.links?.length,
      socialCount: response.data?.social_media?.length,
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Track a linktree link click (fire-and-forget).
 * Does not throw — failures are logged and swallowed so they never block navigation.
 * @param {number|string} linkId - The linktree link ID
 */
export const trackLinktreeClick = (linkId) => {
  const endpoint = `${API_ENDPOINTS.LINKTREE_LINKS}/${linkId}/click`;
  apiRequest(endpoint, { method: 'POST' }).catch((error) => {
    logger.warn('[Linktree] Click tracking failed:', error.message);
  });
};

/**
 * Get all active FAQs
 * @returns {Promise<{success: boolean, data: Array}>}
 */
export const getFAQs = async () => {
  const logPrefix = '[FAQs]';

  try {
    logger.debug(`📡 [API] GET ${API_ENDPOINTS.FAQS}`);
    const response = await apiRequest(API_ENDPOINTS.FAQS);
    logger.info(`✅ ${logPrefix} Response:`, {
      success: response.success,
      dataCount: response.data?.length
    });
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Submit contact form
 * @param {Object} formData - Contact form data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const submitContactForm = async (formData) => {
  const logPrefix = '[Contact Form]';

  try {
    logger.debug(`📡 [API] POST ${API_ENDPOINTS.CONTACT}`, {
      name: formData.name,
      email: formData.email,
      subject: formData.subject
    });
    const response = await apiRequest(API_ENDPOINTS.CONTACT, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    logger.info(`✅ ${logPrefix} Submitted successfully`);
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

/**
 * Subscribe to newsletter
 * @param {string} email - Subscriber email address
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const subscribeNewsletter = async (email) => {
  const logPrefix = '[Newsletter]';

  try {
    logger.debug(`📡 [API] POST ${API_ENDPOINTS.NEWSLETTER}`, {
      email
    });
    const response = await apiRequest(API_ENDPOINTS.NEWSLETTER, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    logger.info(`✅ ${logPrefix} Subscribed successfully`);
    return response;
  } catch (error) {
    logger.error(`❌ ${logPrefix} Error:`, error.message);
    throw error;
  }
};

export default apiRequest;
