/**
 * Logger Utility for RANIA Website
 * Using loglevel package for environment-based logging
 *
 * Automatically disables logging in production/staging environments
 * Usage: import logger from './utils/logger'
 *        logger.info('message'), logger.error('error'), etc.
 */

import log from 'loglevel';

// Configure log level based on environment
const env = import.meta.env.MODE;

if (env === 'production') {
  // Silent in production (no logs)
  log.setLevel('silent');
} else if (env === 'staging') {
  // Only show warnings and errors in staging
  log.setLevel('warn');
} else {
  // Show all logs in development
  log.setLevel('trace');
}

// Optional: Add custom prefix with timestamp and environment
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return function (...args) {
    const timestamp = new Date().toLocaleTimeString();
    const envPrefix = env === 'production' ? '' : `[${env.toUpperCase()}]`;
    rawMethod(`[${timestamp}]${envPrefix}`, ...args);
  };
};

// Apply the custom method factory
log.setLevel(log.getLevel());

// Log configuration on initialization (only in dev)
if (env !== 'production') {
  log.info('🔧 [Logger] Initialized with level:', log.getLevel());
  log.info('🔧 [Logger] Environment:', env);
  log.info('🔧 [Logger] Levels: 0=TRACE, 1=DEBUG, 2=INFO, 3=WARN, 4=ERROR, 5=SILENT');
}

// Helper function to check current mode (for debugging)
export const getLoggerInfo = () => ({
  mode: env,
  level: log.getLevel(),
  levelName: ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'SILENT'][log.getLevel()]
});

export default log;
