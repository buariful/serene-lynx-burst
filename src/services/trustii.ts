import {
  TrustiiCreateInquiryRequest,
  TrustiiCreateInquiryResponse,
  TrustiiRetrieveInquiryResponse,
  TrustiiError,
} from '@/types/trustii';

// Environment configuration
const TRUSTII_API_BASE_URL = import.meta.env.VITE_TRUSTII_API_BASE_URL || 'https://api.trustii.co/verif';
const TRUSTII_API_KEY = import.meta.env.VITE_TRUSTII_API_KEY;

if (!TRUSTII_API_KEY) {
  console.warn('TRUSTII_API_KEY is not set. Trustii API calls will fail.');
} else if (TRUSTII_API_KEY.includes('dummy_key')) {
  console.warn('Using dummy API key. API calls will fail but UI can be tested.');
}

/**
 * Trustii API Service for Human Resources Verification
 * 
 * This service provides methods to interact with Trustii's verification API
 * for creating and retrieving human resources inquiries.
 */
class TrustiiService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = TRUSTII_API_BASE_URL;
    this.apiKey = TRUSTII_API_KEY || '';
  }

  /**
   * Create a new human resources inquiry
   * @param data - The inquiry data
   * @returns Promise with the created inquiry response
   */
  async createInquiry(data: TrustiiCreateInquiryRequest): Promise<TrustiiCreateInquiryResponse> {
    if (!this.apiKey) {
      throw new Error('TRUSTII_API_KEY is not configured');
    }

    if (this.apiKey.includes('dummy_key')) {
      throw new Error('Dummy API key detected. Please replace with a real Trustii API key to test actual API calls.');
    }

    try {
      const response = await fetch(`${this.baseURL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: TrustiiError = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result: TrustiiCreateInquiryResponse = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create Trustii inquiry: ${error.message}`);
      }
      throw new Error('Failed to create Trustii inquiry: Unknown error');
    }
  }

  /**
   * Retrieve an existing inquiry by ID
   * @param inquiryId - The inquiry ID to retrieve
   * @returns Promise with the inquiry response
   */
  async retrieveInquiry(inquiryId: string): Promise<TrustiiRetrieveInquiryResponse> {
    if (!this.apiKey) {
      throw new Error('TRUSTII_API_KEY is not configured');
    }

    if (this.apiKey.includes('dummy_key')) {
      throw new Error('Dummy API key detected. Please replace with a real Trustii API key to test actual API calls.');
    }

    if (!inquiryId) {
      throw new Error('Inquiry ID is required');
    }

    try {
      const response = await fetch(`${this.baseURL}/inquiries/${inquiryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData: TrustiiError = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result: TrustiiRetrieveInquiryResponse = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve Trustii inquiry: ${error.message}`);
      }
      throw new Error('Failed to retrieve Trustii inquiry: Unknown error');
    }
  }

  /**
   * Check if the service is properly configured
   * @returns boolean indicating if the service is ready to use
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get the current configuration status
   * @returns object with configuration details
   */
  getConfigurationStatus() {
    return {
      hasApiKey: !!this.apiKey,
      baseUrl: this.baseURL,
      isConfigured: this.isConfigured(),
    };
  }
}

// Export a singleton instance
export const trustiiService = new TrustiiService();

// Export the class for testing purposes
export { TrustiiService }; 