// Trustii API Types for Human Resources Verification

export interface TrustiiCreateInquiryRequest {
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

export interface TrustiiCreateInquiryResponse {
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

export interface TrustiiRetrieveInquiryResponse {
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
  loading: boolean;
  error: string | null;
}

export interface TrustiiInquiryActions {
  createInquiry: (data: TrustiiCreateInquiryRequest) => Promise<void>;
  retrieveInquiry: (inquiryId: string) => Promise<void>;
  reset: () => void;
} 