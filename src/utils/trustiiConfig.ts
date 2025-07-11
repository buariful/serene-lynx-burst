/**
 * Trustii Configuration Utility
 * 
 * Provides validation and helpful information about Trustii API configuration
 */

export interface TrustiiConfigStatus {
  isConfigured: boolean;
  hasApiKey: boolean;
  baseUrl: string;
  missingVariables: string[];
  warnings: string[];
}

/**
 * Check Trustii configuration status
 * @returns Configuration status object
 */
export const checkTrustiiConfig = (): TrustiiConfigStatus => {
  const apiKey = import.meta.env.VITE_TRUSTII_API_KEY;
  const baseUrl = import.meta.env.VITE_TRUSTII_API_BASE_URL || 'https://api.trustii.co/verif';
  
  const missingVariables: string[] = [];
  const warnings: string[] = [];

  if (!apiKey) {
    missingVariables.push('VITE_TRUSTII_API_KEY');
  } else if (apiKey === 'your_trustii_api_key_here') {
    warnings.push('VITE_TRUSTII_API_KEY appears to be a placeholder value');
  }

  if (!import.meta.env.VITE_TRUSTII_API_BASE_URL) {
    warnings.push('VITE_TRUSTII_API_BASE_URL not set, using default production URL');
  }

  return {
    isConfigured: !!apiKey && apiKey !== 'your_trustii_api_key_here',
    hasApiKey: !!apiKey,
    baseUrl,
    missingVariables,
    warnings,
  };
};

/**
 * Get environment variable setup instructions
 * @returns Formatted instructions for setting up environment variables
 */
export const getSetupInstructions = (): string => {
  return `
To set up Trustii integration, create a .env file in your project root with:

VITE_TRUSTII_API_KEY=your_actual_api_key_here
VITE_TRUSTII_API_BASE_URL=https://api.trustii.co/verif

Get your API key from: https://docs.trustii.co/verif/docs/api/human-resources
  `.trim();
};

/**
 * Validate inquiry data before submission
 * @param data - The inquiry data to validate
 * @returns Validation result with errors if any
 */
export const validateInquiryData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data?.data?.first_name) {
    errors.push('First name is required');
  }

  if (!data?.data?.last_name) {
    errors.push('Last name is required');
  }

  if (!data?.data?.consent) {
    errors.push('Consent is required');
  }

  if (!data?.data?.purpose) {
    errors.push('Purpose is required');
  }

  if (data?.data?.employment_details) {
    const emp = data.data.employment_details;
    if (!emp.company_name) {
      errors.push('Company name is required when employment details are provided');
    }
    if (!emp.position) {
      errors.push('Position is required when employment details are provided');
    }
    if (!emp.start_date) {
      errors.push('Start date is required when employment details are provided');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Format inquiry ID for display
 * @param inquiryId - The inquiry ID to format
 * @returns Formatted inquiry ID
 */
export const formatInquiryId = (inquiryId: string): string => {
  if (!inquiryId) return '';
  
  // If it's a UUID-like string, format it for better readability
  if (inquiryId.length > 20) {
    return `${inquiryId.slice(0, 8)}-${inquiryId.slice(8, 12)}-${inquiryId.slice(12, 16)}-${inquiryId.slice(16, 20)}-${inquiryId.slice(20)}`;
  }
  
  return inquiryId;
};

/**
 * Get status color for different verification statuses
 * @param status - The status to get color for
 * @returns Tailwind CSS color classes
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'pass':
      return 'text-green-600 bg-green-100';
    case 'failed':
    case 'fail':
      return 'text-red-600 bg-red-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}; 