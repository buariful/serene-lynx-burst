/**
 * Credit Check API Examples
 * 
 * This file shows how to post data to all credit check API endpoints
 * with complete payloads and usage examples.
 */

import { creditCheckService } from '@/services/creditCheckService';

// ============================================================================
// 1. PAYMENT PROCESSING
// ============================================================================

/**
 * Example: Process Payment for Credit Check
 * 
 * POST /credit-check/payment
 * 
 * Payload:
 */
const paymentPayload = {
  cardNumber: "4111111111111111",        // Visa test card
  expiryDate: "12/25",                   // MM/YY format
  cvv: "123",                            // 3-4 digit CVV
  cardholderName: "John Doe",            // Full name on card
  amount: 90,                            // Amount in CAD
  currency: "CAD",                       // Currency (auto-added by service)
  description: "Credit Check Report"     // Description (auto-added by service)
};

/**
 * Usage Example:
 */
export async function processPaymentExample() {
  try {
    console.log('Processing payment...');
    console.log('Payload:', paymentPayload);
    
    const response = await creditCheckService.processPayment(paymentPayload);
    
    console.log('Payment Response:', response);
    // Expected response:
    // {
    //   "success": true,
    //   "transactionId": "txn_1234567890_abc123def",
    //   "amount": 90,
    //   "currency": "CAD",
    //   "status": "completed"
    // }
    
    return response.transactionId;
  } catch (error) {
    console.error('Payment failed:', error);
    throw error;
  }
}

// ============================================================================
// 2. CREDIT CHECK INITIATION
// ============================================================================

/**
 * Example: Initiate Credit Check
 * 
 * POST /credit-check/initiate
 * 
 * Payload:
 */
const creditCheckPayload = {
  transactionId: "txn_1234567890_abc123def",  // From payment response
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",           // YYYY-MM-DD format
    ssn: "123-45-6789",                  // Social Security Number
    email: "john.doe@example.com",
    phone: "+1-416-555-0123",            // International format
    address: {
      street: "123 Main St",
      city: "Toronto",
      province: "ON",                    // Province/State code
      postalCode: "M5V 3A8",            // Postal/ZIP code
      country: "CA"                      // Country code
    }
  },
  consent: {
    creditCheck: true,                   // Consent for credit check
    termsAccepted: true,                 // Terms and conditions
    privacyPolicyAccepted: true,         // Privacy policy
    timestamp: "2024-01-15T10:30:00Z"   // ISO timestamp
  }
};

/**
 * Usage Example:
 */
export async function initiateCreditCheckExample(transactionId: string) {
  try {
    console.log('Initiating credit check...');
    console.log('Transaction ID:', transactionId);
    
    const response = await creditCheckService.initiateCreditCheck(transactionId);
    
    console.log('Credit Check Response:', response);
    // Expected response:
    // {
    //   "success": true,
    //   "reportId": "CR-20240115-001",
    //   "status": "pending",
    //   "estimatedCompletion": "2024-01-15T10:35:00Z"
    // }
    
    return response;
  } catch (error) {
    console.error('Credit check initiation failed:', error);
    throw error;
  }
}

// ============================================================================
// 3. REPORT RETRIEVAL
// ============================================================================

/**
 * Example: Retrieve Credit Report
 * 
 * GET /credit-check/report/{reportId}
 * 
 * No payload needed - just the report ID
 */
export async function retrieveReportExample(reportId: string) {
  try {
    console.log('Retrieving credit report...');
    console.log('Report ID:', reportId);
    
    const response = await creditCheckService.retrieveReport(reportId);
    
    console.log('Report Response:', response);
    // Expected response:
    // {
    //   "success": true,
    //   "report": {
    //     "id": "CR-20240115-001",
    //     "status": "completed",
    //     "createdAt": "2024-01-15T10:30:00Z",
    //     "completedAt": "2024-01-15T10:35:00Z",
    //     "score": 745,
    //     "scoreRange": "good",
    //     "factors": {
    //       "positive": [
    //         "No late payments in the last 24 months",
    //         "Low credit utilization ratio",
    //         "Long credit history"
    //       ],
    //       "negative": [
    //         "Recent credit inquiry",
    //         "Limited credit mix"
    //       ]
    //     },
    //     "accounts": [
    //       {
    //         "type": "Credit Card",
    //         "balance": 2500,
    //         "limit": 10000,
    //         "status": "Open",
    //         "paymentHistory": ["OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK"]
    //       }
    //     ],
    //     "inquiries": [
    //       {
    //         "date": "2024-01-15",
    //         "company": "ABC Bank",
    //         "type": "Credit Application"
    //       }
    //     ],
    //     "publicRecords": []
    //   }
    // }
    
    return response.report;
  } catch (error) {
    console.error('Report retrieval failed:', error);
    throw error;
  }
}

// ============================================================================
// 4. STATUS CHECKING
// ============================================================================

/**
 * Example: Check Report Status
 * 
 * GET /credit-check/status/{reportId}
 * 
 * No payload needed - just the report ID
 */
export async function checkStatusExample(reportId: string) {
  try {
    console.log('Checking report status...');
    console.log('Report ID:', reportId);
    
    const response = await creditCheckService.checkReportStatus(reportId);
    
    console.log('Status Response:', response);
    // Expected response:
    // {
    //   "status": "completed",
    //   "completedAt": "2024-01-15T10:35:00Z",
    //   "progress": 100,
    //   "estimatedCompletion": null
    // }
    
    return response;
  } catch (error) {
    console.error('Status check failed:', error);
    throw error;
  }
}

// ============================================================================
// 5. COMPLETE WORKFLOW EXAMPLE
// ============================================================================

/**
 * Complete Credit Check Workflow
 * 
 * This example shows the entire process from payment to report retrieval
 */
export async function completeCreditCheckWorkflow() {
  try {
    console.log('=== Starting Complete Credit Check Workflow ===');
    
    // Step 1: Process Payment
    console.log('\n1. Processing Payment...');
    const transactionId = await processPaymentExample();
    
    // Step 2: Initiate Credit Check
    console.log('\n2. Initiating Credit Check...');
    const checkResponse = await initiateCreditCheckExample(transactionId);
    const reportId = checkResponse.reportId;
    
    // Step 3: Poll for Status (optional)
    console.log('\n3. Checking Status...');
    let status = 'pending';
    let attempts = 0;
    const maxAttempts = 10;
    
    while (status === 'pending' && attempts < maxAttempts) {
      const statusResponse = await checkStatusExample(reportId);
      status = statusResponse.status;
      
      if (status === 'completed') {
        console.log('Report is ready!');
        break;
      }
      
      console.log(`Status: ${status}, Attempt ${attempts + 1}/${maxAttempts}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      attempts++;
    }
    
    // Step 4: Retrieve Report
    console.log('\n4. Retrieving Report...');
    const report = await retrieveReportExample(reportId);
    
    console.log('\n=== Credit Check Workflow Complete ===');
    console.log('Final Report:', report);
    
    return report;
  } catch (error) {
    console.error('Workflow failed:', error);
    throw error;
  }
}

// ============================================================================
// 6. ERROR HANDLING EXAMPLES
// ============================================================================

/**
 * Example: Handling Payment Errors
 */
export async function handlePaymentErrors() {
  try {
    // Invalid card number
    const invalidPayment = {
      cardNumber: "1234",  // Too short
      expiryDate: "12/25",
      cvv: "123",
      cardholderName: "John Doe",
      amount: 90
    };
    
    await creditCheckService.processPayment(invalidPayment);
  } catch (error) {
    console.log('Expected error caught:', error.message);
    // Expected: "Invalid card number"
  }
}

/**
 * Example: Handling Network Errors
 */
export async function handleNetworkErrors() {
  try {
    // This will fail if API is not available
    await creditCheckService.retrieveReport('invalid-report-id');
  } catch (error) {
    console.log('Network error caught:', error.message);
    // Expected: Network error or API error
  }
}

// ============================================================================
// 7. TEST CARD NUMBERS
// ============================================================================

/**
 * Test Card Numbers for Development
 */
export const testCards = {
  visa: "4111111111111111",
  mastercard: "5555555555554444",
  amex: "378282246310005",
  discover: "6011111111111117",
  invalid: "1234567890123456"
};

// ============================================================================
// 8. USAGE IN COMPONENTS
// ============================================================================

/**
 * Example: Using in React Component
 */
export function useCreditCheckInComponent() {
  const handleCreditCheck = async () => {
    try {
      // 1. Process payment
      const transactionId = await processPaymentExample();
      
      // 2. Initiate credit check
      const checkResponse = await initiateCreditCheckExample(transactionId);
      
      // 3. Wait for completion and retrieve report
      const report = await retrieveReportExample(checkResponse.reportId);
      
      // 4. Handle the report data
      console.log('Credit Score:', report.score);
      console.log('Score Range:', report.scoreRange);
      console.log('Positive Factors:', report.factors.positive);
      console.log('Negative Factors:', report.factors.negative);
      
    } catch (error) {
      console.error('Credit check failed:', error);
    }
  };
  
  return { handleCreditCheck };
}

// ============================================================================
// 9. API ENDPOINTS SUMMARY
// ============================================================================

/**
 * API Endpoints Summary
 * 
 * Base URL: https://api.Scrubhub.ca
 * 
 * 1. POST /credit-check/payment
 *    - Process $90 payment
 *    - Returns transaction ID
 * 
 * 2. POST /credit-check/initiate
 *    - Start credit check process
 *    - Requires transaction ID and personal info
 *    - Returns report ID
 * 
 * 3. GET /credit-check/report/{reportId}
 *    - Retrieve completed credit report
 *    - Returns full report data
 * 
 * 4. GET /credit-check/status/{reportId}
 *    - Check report generation status
 *    - Returns status and progress
 * 
 * Authentication: Bearer token required in headers
 * Content-Type: application/json
 */ 