import { useState, useCallback } from 'react';
import { trustiiService } from '@/services/trustii';
import {
  TrustiiCreateInquiryRequest,
  TrustiiInquiryState,
  TrustiiInquiryActions,
} from '@/types/trustii';

/**
 * React hook for Trustii human resources verification
 * 
 * Provides easy-to-use functions for creating and retrieving inquiries
 * with proper state management and error handling.
 * 
 * @returns Object containing state and actions for Trustii operations
 */
export const useTrustii = (): TrustiiInquiryState & TrustiiInquiryActions => {
  const [state, setState] = useState<TrustiiInquiryState>({
    inquiry: null,
    report: null,
    loading: false,
    error: null,
  });

  /**
   * Create a new human resources inquiry
   * @param data - The inquiry data to submit
   */
  const createInquiry = useCallback(async (data: TrustiiCreateInquiryRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Validate required fields
      if (!data.data.first_name || !data.data.last_name) {
        throw new Error('First name and last name are required');
      }

      if (!data.data.consent) {
        throw new Error('Consent is required to proceed with verification');
      }

      if (!data.data.purpose) {
        throw new Error('Purpose is required for the verification');
      }

      const inquiry = await trustiiService.createInquiry(data);
      
      setState(prev => ({
        ...prev,
        inquiry,
        report: inquiry.report || null,
        loading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create inquiry';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error; // Re-throw to allow calling code to handle
    }
  }, []);

  /**
   * Retrieve an existing inquiry by ID
   * @param inquiryId - The inquiry ID to retrieve
   */
  const retrieveInquiry = useCallback(async (inquiryId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      if (!inquiryId) {
        throw new Error('Inquiry ID is required');
      }

      const inquiry = await trustiiService.retrieveInquiry(inquiryId);
      
      setState(prev => ({
        ...prev,
        inquiry,
        report: inquiry.report || null,
        loading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve inquiry';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error; // Re-throw to allow calling code to handle
    }
  }, []);

  /**
   * Reset the hook state
   */
  const reset = useCallback(() => {
    setState({
      inquiry: null,
      report: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    createInquiry,
    retrieveInquiry,
    reset,
  };
};

/**
 * Hook to check Trustii service configuration
 * @returns Object with configuration status
 */
export const useTrustiiConfig = () => {
  const [configStatus, setConfigStatus] = useState(() => trustiiService.getConfigurationStatus());

  const refreshConfig = useCallback(() => {
    setConfigStatus(trustiiService.getConfigurationStatus());
  }, []);

  return {
    ...configStatus,
    refreshConfig,
  };
}; 