# Trustii Integration Documentation

This document describes the implementation of Trustii human resources verification API integration in the project.

## Overview

The Trustii integration provides comprehensive background verification capabilities including:
- Employment verification
- Identity verification  
- Criminal background checks
- Education verification

## Files Structure

```
src/
├── types/
│   └── trustii.ts              # TypeScript types for Trustii API
├── services/
│   └── trustii.ts              # Trustii API service
├── hooks/
│   └── useTrustii.ts           # React hooks for Trustii operations
├── components/
│   ├── TrustiiInquiryForm.tsx  # Form component for creating inquiries
│   └── TrustiiInquiryRetriever.tsx # Component for retrieving results
└── pages/
    └── TrustiiDemoPage.tsx     # Demo page showcasing the integration
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Trustii API Configuration
VITE_TRUSTII_API_KEY=your_trustii_api_key_here
VITE_TRUSTII_API_BASE_URL=https://api.trustii.co/verif
```

### Getting Your API Key

1. Visit [Trustii Documentation](https://docs.trustii.co/verif/docs/api/human-resources)
2. Sign up for an account
3. Generate your API key from the dashboard
4. Add the key to your `.env` file

## Usage

### Basic Usage with React Hook

```tsx
import { useTrustii } from '@/hooks/useTrustii';

const MyComponent = () => {
  const { createInquiry, retrieveInquiry, loading, error, inquiry, report } = useTrustii();

  const handleCreateInquiry = async () => {
    try {
      await createInquiry({
        type: 'human_resources',
        data: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          consent: true,
          purpose: 'Employment verification for new hire',
          employment_details: {
            company_name: 'Previous Company Inc',
            position: 'Software Engineer',
            start_date: '2020-01-01',
            end_date: '2023-12-31',
          }
        }
      });
    } catch (error) {
      console.error('Failed to create inquiry:', error);
    }
  };

  const handleRetrieveInquiry = async (inquiryId: string) => {
    try {
      await retrieveInquiry(inquiryId);
    } catch (error) {
      console.error('Failed to retrieve inquiry:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateInquiry} disabled={loading}>
        {loading ? 'Creating...' : 'Create Inquiry'}
      </button>
      
      {error && <p>Error: {error}</p>}
      
      {inquiry && (
        <div>
          <h3>Inquiry Created</h3>
          <p>ID: {inquiry.id}</p>
          <p>Status: {inquiry.status}</p>
        </div>
      )}
      
      {report && (
        <div>
          <h3>Verification Report</h3>
          <p>Overall Status: {report.summary.overall_status}</p>
          <p>Passed Checks: {report.summary.passed_checks}</p>
        </div>
      )}
    </div>
  );
};
```

### Using the Form Component

```tsx
import { TrustiiInquiryForm } from '@/components/TrustiiInquiryForm';

const MyPage = () => {
  const handleSuccess = (inquiryId: string) => {
    console.log('Inquiry created:', inquiryId);
  };

  const handleError = (error: string) => {
    console.error('Inquiry failed:', error);
  };

  return (
    <TrustiiInquiryForm
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};
```

### Using the Retriever Component

```tsx
import { TrustiiInquiryRetriever } from '@/components/TrustiiInquiryRetriever';

const MyPage = () => {
  const handleInquiryFound = (inquiryId: string) => {
    console.log('Inquiry retrieved:', inquiryId);
  };

  return (
    <TrustiiInquiryRetriever
      onInquiryFound={handleInquiryFound}
    />
  );
};
```

## API Reference

### TrustiiService

The main service class for interacting with Trustii API.

#### Methods

- `createInquiry(data: TrustiiCreateInquiryRequest): Promise<TrustiiCreateInquiryResponse>`
- `retrieveInquiry(inquiryId: string): Promise<TrustiiRetrieveInquiryResponse>`
- `isConfigured(): boolean`
- `getConfigurationStatus(): object`

### useTrustii Hook

React hook providing state management and actions for Trustii operations.

#### State

- `inquiry: TrustiiCreateInquiryResponse | null`
- `report: TrustiiReport | null`
- `loading: boolean`
- `error: string | null`

#### Actions

- `createInquiry(data: TrustiiCreateInquiryRequest): Promise<void>`
- `retrieveInquiry(inquiryId: string): Promise<void>`
- `reset(): void`

### useTrustiiConfig Hook

Hook for checking Trustii service configuration.

#### Returns

- `isConfigured: boolean`
- `hasApiKey: boolean`
- `baseUrl: string`
- `refreshConfig(): void`

## Data Types

### TrustiiCreateInquiryRequest

```typescript
interface TrustiiCreateInquiryRequest {
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
  metadata?: Record<string, any>;
}
```

### TrustiiReport

```typescript
interface TrustiiReport {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  results: {
    employment_verification?: EmploymentVerificationResult;
    identity_verification?: IdentityVerificationResult;
    criminal_background_check?: CriminalBackgroundResult;
    education_verification?: EducationVerificationResult;
  };
  summary: {
    overall_status: 'pass' | 'fail' | 'pending';
    total_checks: number;
    passed_checks: number;
    failed_checks: number;
    pending_checks: number;
  };
}
```

## Error Handling

The integration includes comprehensive error handling:

1. **Configuration Errors**: Checks for API key and base URL
2. **Validation Errors**: Validates required fields before submission
3. **API Errors**: Handles HTTP errors and API-specific error messages
4. **Network Errors**: Handles network connectivity issues

## Security Considerations

1. **API Key Protection**: Never commit API keys to version control
2. **Environment Variables**: Use `.env` files for configuration
3. **Input Validation**: All inputs are validated before API calls
4. **Error Messages**: Sensitive information is not exposed in error messages

## Testing

To test the integration:

1. Set up your environment variables
2. Navigate to the demo page (`/trustii-demo`)
3. Create a test inquiry
4. Retrieve the results using the inquiry ID

## Troubleshooting

### Common Issues

1. **"TRUSTII_API_KEY is not configured"**
   - Check your `.env` file
   - Ensure the variable name is correct
   - Restart your development server

2. **"Failed to create inquiry"**
   - Verify your API key is valid
   - Check the required fields are provided
   - Ensure consent is set to `true`

3. **"Failed to retrieve inquiry"**
   - Verify the inquiry ID is correct
   - Check if the inquiry exists
   - Ensure you have permission to access the inquiry

### Debug Mode

Enable debug logging by setting:

```env
VITE_DEBUG=true
```

## Support

For additional support:

1. Check the [Trustii API Documentation](https://docs.trustii.co/verif/docs/api/human-resources)
2. Review the TypeScript types for detailed field descriptions
3. Use the demo page to test functionality
4. Check browser console for detailed error messages

## License

This integration is part of the main project and follows the same license terms. 