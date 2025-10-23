// API Configuration for RANIA Website
import { API_ENDPOINTS } from '../utils/constants';
import logger from '../utils/logger';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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

export default apiRequest;
