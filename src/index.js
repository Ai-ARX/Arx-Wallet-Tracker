/**
 * ARX Wallet Tracker - Main Package Entry Point
 * 
 * Advanced blockchain wallet tracker with AI-powered analytics,
 * real-time monitoring, and comprehensive DeFi protocol integrations.
 * 
 * @package @arx/wallet-tracker
 * @version 1.0.0
 * @author ARX Team
 * @license MIT
 */

// Core Analytics Engine
export { AnalyticsEngine } from '../packages/core/src/services/analytics-engine.js';

// AI Signal Processing
export { AISignalProcessor } from '../packages/core/src/services/ai-signal-processor.js';

// WebSocket Connection Management
export { WebSocketManager } from '../packages/core/src/services/websocket-manager.js';

// Cache Management
export { CacheManager } from '../packages/core/src/utils/cache-manager.js';

// Wallet Tracker Core
export { WalletTracker } from '../packages/core/src/wallet-tracker.js';

// Type Definitions
export * from '../packages/core/types/analytics.types.js';
export * from '../packages/core/types/protocol-integration.types.js';
export * from '../packages/core/types/ai-signals.types.js';
export * from '../packages/core/types/cache.types.js';
export * from '../packages/core/types/wallet.types.js';
export * from '../packages/core/types/websocket.types.js';

// Utility Functions
export { Logger } from '../packages/core/src/utils/logger.js';
export { EventEmitter } from '../packages/core/src/utils/event-emitter.js';
export { WalletAddress } from '../packages/core/src/utils/wallet-address.js';
export { NumberFormatter } from '../packages/core/src/utils/number-formatter.js';
export { DateFormatter } from '../packages/core/src/utils/date-formatter.js';
export { Validators } from '../packages/core/src/utils/validators.js';

// Services
export { PortfolioService } from '../packages/core/src/services/portfolio-service.js';
export { TokenDataService } from '../packages/core/src/services/token-data-service.js';
export { WebSocketBackend } from '../packages/core/src/services/websocket-backend.js';

// API Integrations
export { HeliusAPI } from '../packages/core/src/api/helius-api.js';

// Filters
export { TransactionFilter } from '../packages/core/src/filters/transaction-filter.js';

/**
 * Default configuration for ARX Wallet Tracker
 */
export const defaultConfig = {
  version: '1.0.0',
  analytics: {
    enableRealTimeProcessing: true,
    riskThresholds: {
      low: 25,
      medium: 50,
      high: 75,
      critical: 90
    },
    updateIntervals: {
      behaviorMetrics: 300000,     // 5 minutes
      riskProfile: 600000,        // 10 minutes
      networkAnalysis: 900000,    // 15 minutes
      performanceMetrics: 1800000 // 30 minutes
    }
  },
  websocket: {
    reconnectAttempts: 5,
    reconnectInterval: 3000,
    heartbeatInterval: 30000,
    maxMessageQueue: 1000
  },
  cache: {
    defaultTTL: 300000,      // 5 minutes
    maxSize: 10000,
    strategy: 'lru'
  },
  api: {
    timeout: 30000,          // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000
  }
};

/**
 * Initialize ARX Wallet Tracker with custom configuration
 * 
 * @param {Object} config - Configuration options
 * @returns {WalletTracker} Initialized wallet tracker instance
 */
export function createWalletTracker(config = {}) {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
    analytics: { ...defaultConfig.analytics, ...config.analytics },
    websocket: { ...defaultConfig.websocket, ...config.websocket },
    cache: { ...defaultConfig.cache, ...config.cache },
    api: { ...defaultConfig.api, ...config.api }
  };

  return new WalletTracker(mergedConfig);
}

/**
 * Package information
 */
export const packageInfo = {
  name: '@arx/wallet-tracker',
  version: '1.0.0',
  description: 'Advanced blockchain wallet tracker with AI-powered analytics',
  author: 'ARX Team',
  license: 'MIT',
  repository: 'https://github.com/Ai-ARX/Arx-Wallet-Tracker',
  keywords: [
    'blockchain', 'wallet', 'tracker', 'analytics', 'defi', 
    'solana', 'ethereum', 'crypto', 'ai', 'machine-learning',
    'real-time', 'websocket', 'typescript'
  ]
};

// Version compatibility check
if (typeof window !== 'undefined' && window.console) {
  console.log(`ARX Wallet Tracker v${packageInfo.version} initialized`);
}

export default {
  createWalletTracker,
  AnalyticsEngine,
  AISignalProcessor,
  WebSocketManager,
  WalletTracker,
  defaultConfig,
  packageInfo
};
