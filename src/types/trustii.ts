// Trustii API Types for Human Resources Verification

// New API specification types
export interface TrustiiCreateInquiryRequest {
  contactName: string;
  sender?: string;
  customerName?: string;
  delegatePayment?: boolean;
  name: string;
  services: TrustiiService[];
  serviceAddOns?: string[];
  tags?: string[];
  email?: string;
  phoneNumber?: string;
  language: 'FR' | 'EN';
  notificationType?: 'Sms' | 'Email';
  documents?: TrustiiDocument[];
}

export interface TrustiiDocument {
  type: string;
  url: string;
  name: string;
}

export type TrustiiService = 'identity' | 'credit' | 'criminal_quebec' | 'criminal_canada' | 'online_reputation';

export interface TrustiiCreateInquiryResponse {
  id: string;
}

export interface TrustiiRetrieveInquiryResponse {
  id: string;
  createdAt: string;
  completedAt?: string;
  expiresAt: string;
  cancellable: boolean;
  name: string;
  email?: string;
  url: string;
  phoneNumber?: string;
  notificationType?: 'Sms' | 'Email';
  services: TrustiiService[];
  serviceAddOns?: string[];
  tags?: string[];
  creditStatus: 'NotIncluded' | 'Available' | 'Unavailable';
  status: 'Pending' | 'Completed' | 'Submitted' | 'InProgress' | 'Suspended';
  report?: TrustiiReport;
}

export interface TrustiiReport {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  results: {
    employment_verification?: {
      verified: boolean;
      company_name?: string;
      position?: string;
      start_date?: string;
      end_date?: string;
      salary?: number;
      reason_for_leaving?: string;
      notes?: string;
    };
    identity_verification?: {
      verified: boolean;
      first_name?: string;
      last_name?: string;
      date_of_birth?: string;
      address?: {
        street: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
      };
      notes?: string;
    };
    criminal_background_check?: {
      verified: boolean;
      has_criminal_record: boolean;
      records?: Array<{
        offense: string;
        date: string;
        disposition: string;
        jurisdiction: string;
      }>;
      notes?: string;
    };
    education_verification?: {
      verified: boolean;
      institution?: string;
      degree?: string;
      graduation_date?: string;
      notes?: string;
    };
  };
  summary: {
    overall_status: 'pass' | 'fail' | 'pending';
    total_checks: number;
    passed_checks: number;
    failed_checks: number;
    pending_checks: number;
  };
}

export interface TrustiiError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// Hook return types
export interface TrustiiInquiryState {
  inquiry: TrustiiCreateInquiryResponse | null;
  report: TrustiiReport | null;
  retrievedInquiry: TrustiiRetrieveInquiryResponse | null;
  loading: boolean;
  error: string | null;
}

export interface TrustiiInquiryActions {
  createInquiry: (data: TrustiiCreateInquiryRequest) => Promise<void>;
  retrieveInquiry: (inquiryId: string) => Promise<void>;
  reset: () => void;
}

// Legacy types for backward compatibility
export interface LegacyTrustiiCreateInquiryRequest {
  type: 'human_resources';
  data: {
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    date_of_birth?: string; // YYYY-MM-DD format
    address?: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    employment_details?: {
      company_name: string;
      position: string;
      start_date: string; // YYYY-MM-DD format
      end_date?: string; // YYYY-MM-DD format
      salary?: number;
      reason_for_leaving?: string;
    };
    consent: boolean;
    purpose: string;
  };
  metadata?: {
    [key: string]: any;
  };
}

export interface LegacyTrustiiCreateInquiryResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  type: 'human_resources';
  data: {
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    date_of_birth?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    employment_details?: {
      company_name: string;
      position: string;
      start_date: string;
      end_date?: string;
      salary?: number;
      reason_for_leaving?: string;
    };
    consent: boolean;
    purpose: string;
  };
  metadata?: {
    [key: string]: any;
  };
  report?: TrustiiReport;
} 