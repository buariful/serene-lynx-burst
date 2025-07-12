/**
 * Development Configuration
 * 
 * This file contains configuration settings for development mode.
 * These settings help avoid CORS issues and provide mock data for testing.
 */

export const developmentConfig = {
  // Mock API settings
  useMockApis: true,
  
  // Mock payment settings
  payment: {
    successRate: 0.9, // 90% success rate
    processingTime: 2000, // 2 seconds
    mockTransactionPrefix: 'txn_',
  },
  
  // Mock credit check settings
  creditCheck: {
    processingTime: 30 * 1000, // 30 seconds for faster testing
    mockReportPrefix: 'CR-',
    statusUpdateInterval: 5000, // 5 seconds for faster updates
  },
  
  // Mock report settings
  report: {
    scoreRange: {
      min: 550,
      max: 850,
    },
    defaultScore: 720,
    defaultScoreRange: 'good',
  },
  
  // API endpoints (for reference)
  apiEndpoints: {
    trustii: 'https://api.trustii.co/verif',
    stripe: 'https://api.stripe.com',
  },
  
  // CORS bypass settings
  cors: {
    enabled: true,
    bypassForDevelopment: true,
  },
  
  // Logging settings
  logging: {
    enableApiLogs: true,
    enableMockLogs: true,
    enableErrorLogs: true,
  },
};

/**
 * Check if we should use mock APIs
 */
export const shouldUseMockApis = (): boolean => {
  return import.meta.env.DEV && developmentConfig.useMockApis;
};

/**
 * Get mock processing time for credit check
 */
export const getMockProcessingTime = (): number => {
  return developmentConfig.creditCheck.processingTime;
};

/**
 * Get mock payment processing time
 */
export const getMockPaymentTime = (): number => {
  return developmentConfig.payment.processingTime;
};

/**
 * Generate mock report ID
 */
export const generateMockReportId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${developmentConfig.creditCheck.mockReportPrefix}${timestamp}-${random}`;
};

/**
 * Generate mock transaction ID
 */
export const generateMockTransactionId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${developmentConfig.payment.mockTransactionPrefix}${timestamp}_${random}`;
};

/**
 * Calculate mock progress based on time elapsed
 */
export const calculateMockProgress = (startTime: number): number => {
  const elapsed = Date.now() - startTime;
  const maxTime = developmentConfig.creditCheck.processingTime;
  return Math.min((elapsed / maxTime) * 100, 100);
};

/**
 * Get mock credit score
 */
export const getMockCreditScore = (): number => {
  const { min, max } = developmentConfig.report.scoreRange;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get mock score range based on score
 */
export const getMockScoreRange = (score: number): string => {
  if (score >= 750) return 'excellent';
  if (score >= 650) return 'good';
  if (score >= 550) return 'fair';
  return 'poor';
};

/**
 * Log development messages
 */
export const logDev = (message: string, data?: any): void => {
  if (developmentConfig.logging.enableMockLogs) {
    console.log(`[DEV] ${message}`, data || '');
  }
};

/**
 * Log API errors in development
 */
export const logApiError = (error: any, context: string): void => {
  if (developmentConfig.logging.enableErrorLogs) {
    console.error(`[DEV API Error] ${context}:`, error);
  }
}; 