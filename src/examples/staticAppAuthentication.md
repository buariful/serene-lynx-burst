# Static App Authentication Guide

This guide shows how to handle authentication in static apps for the credit check API.

## 🔐 Authentication Methods for Static Apps

### Method 1: API Key (Recommended)

**Most secure for static apps** - Use an API key stored in environment variables.

#### Setup:
1. Create `.env` file:
```bash
VITE_API_KEY=your_api_key_here
VITE_USE_API_KEY=true
VITE_API_URL=https://api.Scrubhub.ca
```

2. The service automatically uses the API key:
```typescript
// Headers will include: X-API-Key: your_api_key_here
const response = await creditCheckService.processPayment(paymentData);
```

#### cURL Example:
```bash
curl -X POST https://api.Scrubhub.ca/credit-check/payment \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key_here" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90
  }'
```

---

### Method 2: Bearer Token from Storage

**For apps with user login** - Store JWT tokens in localStorage/sessionStorage.

#### Setup:
```typescript
// After user login, store the token
creditCheckService.setAuthToken('your_jwt_token_here', true); // true = persist in localStorage

// The service automatically uses the stored token
const response = await creditCheckService.processPayment(paymentData);
```

#### cURL Example:
```bash
curl -X POST https://api.Scrubhub.ca/credit-check/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token_here" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90
  }'
```

---

### Method 3: URL Parameters (Testing Only)

**For development/testing** - Pass token as URL parameter (less secure).

#### Setup:
```typescript
// Access via: https://yourapp.com/credit-check?token=your_token_here
// The service automatically picks up the token from URL
const response = await creditCheckService.processPayment(paymentData);
```

#### cURL Example:
```bash
curl -X POST "https://api.Scrubhub.ca/credit-check/payment?token=your_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90
  }'
```

---

### Method 4: Environment Variable Token

**For simple static deployments** - Store token in environment variable.

#### Setup:
1. Create `.env` file:
```bash
VITE_AUTH_TOKEN=your_bearer_token_here
VITE_API_URL=https://api.Scrubhub.ca
```

2. The service automatically uses the token:
```typescript
// Headers will include: Authorization: Bearer your_bearer_token_here
const response = await creditCheckService.processPayment(paymentData);
```

---

## 🚀 Implementation Examples

### Example 1: API Key Setup (Recommended)

```typescript
// .env file
VITE_API_KEY=sk_live_1234567890abcdef
VITE_USE_API_KEY=true
VITE_API_URL=https://api.Scrubhub.ca

// In your component
import { creditCheckService } from '@/services/creditCheckService';

const handleCreditCheck = async () => {
  try {
    // API key is automatically included in headers
    const paymentResponse = await creditCheckService.processPayment({
      cardNumber: "4111111111111111",
      expiryDate: "12/25",
      cvv: "123",
      cardholderName: "John Doe",
      amount: 90
    });
    
    console.log('Payment successful:', paymentResponse);
  } catch (error) {
    console.error('Payment failed:', error);
  }
};
```

### Example 2: JWT Token Setup

```typescript
// After user login
const handleLogin = async (credentials: LoginCredentials) => {
  try {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const { token } = await loginResponse.json();
    
    // Store token for credit check API
    creditCheckService.setAuthToken(token, true);
    
    // Now credit check API calls will use this token
    const paymentResponse = await creditCheckService.processPayment(paymentData);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Example 3: URL Token Setup

```typescript
// User visits: https://yourapp.com/credit-check?token=abc123
// The service automatically picks up the token

const CreditCheckPage = () => {
  const handleCreditCheck = async () => {
    try {
      // Token from URL is automatically used
      const response = await creditCheckService.processPayment(paymentData);
      console.log('Success:', response);
    } catch (error) {
      console.error('Failed:', error);
    }
  };
  
  return (
    <button onClick={handleCreditCheck}>
      Get Credit Report
    </button>
  );
};
```

---

## 🔧 Environment Variables

### For Development (.env.local)
```bash
# API Configuration
VITE_API_URL=https://api.Scrubhub.ca

# Authentication (choose one method)
VITE_API_KEY=your_api_key_here
VITE_USE_API_KEY=true

# OR
VITE_AUTH_TOKEN=your_bearer_token_here

# OR (for testing)
VITE_USE_API_KEY=false
```

### For Production
```bash
# Set these in your hosting platform (Vercel, Netlify, etc.)
VITE_API_KEY=sk_live_production_key
VITE_USE_API_KEY=true
VITE_API_URL=https://api.Scrubhub.ca
```

---

## 🛡️ Security Best Practices

### 1. API Key Method (Most Secure)
- ✅ API keys are designed for static apps
- ✅ Can be restricted by domain/IP
- ✅ No user-specific data in client
- ✅ Easy to rotate

### 2. JWT Token Method
- ✅ Good for user-specific data
- ✅ Can include user permissions
- ⚠️ Store in sessionStorage for sensitive data
- ⚠️ Implement token refresh

### 3. URL Parameter Method
- ❌ Not secure for production
- ✅ Good for testing/development
- ❌ Token visible in browser history
- ❌ Token visible in server logs

---

## 🔍 Debugging Authentication

### Check Current Auth Method
```typescript
// Add this to your component to debug
const debugAuth = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');
  const localToken = localStorage.getItem('authToken');
  const sessionToken = sessionStorage.getItem('authToken');
  const envToken = import.meta.env.VITE_AUTH_TOKEN;
  const apiKey = import.meta.env.VITE_API_KEY;
  const useApiKey = import.meta.env.VITE_USE_API_KEY;
  
  console.log('Auth Debug:', {
    urlToken,
    localToken: localToken ? '***' : null,
    sessionToken: sessionToken ? '***' : null,
    envToken: envToken ? '***' : null,
    apiKey: apiKey ? '***' : null,
    useApiKey
  });
};
```

### Test API Connection
```typescript
const testConnection = async () => {
  try {
    // This will show what headers are being sent
    const response = await creditCheckService.processPayment({
      cardNumber: "4111111111111111",
      expiryDate: "12/25",
      cvv: "123",
      cardholderName: "Test User",
      amount: 90
    });
    
    console.log('Connection successful:', response);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

---

## 📋 Quick Setup Checklist

### For API Key Method:
- [ ] Set `VITE_API_KEY` in environment
- [ ] Set `VITE_USE_API_KEY=true`
- [ ] Set `VITE_API_URL`
- [ ] Test with cURL command
- [ ] Test in your app

### For JWT Token Method:
- [ ] Implement login flow
- [ ] Store token with `creditCheckService.setAuthToken()`
- [ ] Test API calls
- [ ] Implement token refresh if needed

### For URL Token Method:
- [ ] Pass token in URL: `?token=your_token`
- [ ] Test API calls
- [ ] Remove for production

---

## 🚨 Common Issues

### "Unauthorized" Error
- Check if API key/token is set correctly
- Verify environment variables are loaded
- Check browser console for auth debug info

### "CORS" Error
- Ensure API allows your domain
- Check if API key has correct permissions
- Verify API URL is correct

### "Token not found" Error
- Check localStorage/sessionStorage
- Verify URL parameter format
- Check environment variable names

---

## 📞 Support

If you're still having issues:

1. Check the browser console for error messages
2. Use the debug function to see current auth state
3. Test with cURL to isolate the issue
4. Verify your API credentials are correct
5. Check if your API endpoint is accessible 