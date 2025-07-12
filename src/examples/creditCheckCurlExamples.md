# Credit Check API - cURL Examples

This document shows how to test the credit check API endpoints using cURL commands.

## Base URL
```
https://api.rentals.ca
```

## Authentication

For static apps, you can use multiple authentication methods:

### Method 1: API Key (Recommended for Static Apps)
```bash
X-API-Key: YOUR_API_KEY
```

### Method 2: Bearer Token
```bash
Authorization: Bearer YOUR_AUTH_TOKEN
```

### Method 3: URL Parameter (Testing Only)
```bash
https://api.rentals.ca/credit-check/payment?token=YOUR_TOKEN
```

### Method 4: No Authentication (Public APIs)
No authentication headers required.

---

## 1. Process Payment

**Endpoint:** `POST /credit-check/payment`

**cURL Commands:**

**Method 1: API Key (Recommended)**
```bash
curl -X POST https://api.rentals.ca/credit-check/payment \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90,
    "currency": "CAD",
    "description": "Credit Check Report"
  }'
```

**Method 2: Bearer Token**
```bash
curl -X POST https://api.rentals.ca/credit-check/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90,
    "currency": "CAD",
    "description": "Credit Check Report"
  }'
```

**Method 3: URL Parameter (Testing)**
```bash
curl -X POST "https://api.rentals.ca/credit-check/payment?token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90,
    "currency": "CAD",
    "description": "Credit Check Report"
  }'
```v": "123",
    "cardholderName": "John Doe",
    "amount": 90,
    "currency": "CAD",
    "description": "Credit Check Report"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "transactionId": "txn_1234567890_abc123def",
  "amount": 90,
  "currency": "CAD",
  "status": "completed"
}
```

---

## 2. Initiate Credit Check

**Endpoint:** `POST /credit-check/initiate`

**cURL Command:**
```bash
curl -X POST https://api.rentals.ca/credit-check/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "transactionId": "txn_1234567890_abc123def",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-01",
      "ssn": "123-45-6789",
      "email": "john.doe@example.com",
      "phone": "+1-416-555-0123",
      "address": {
        "street": "123 Main St",
        "city": "Toronto",
        "province": "ON",
        "postalCode": "M5V 3A8",
        "country": "CA"
      }
    },
    "consent": {
      "creditCheck": true,
      "termsAccepted": true,
      "privacyPolicyAccepted": true,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "reportId": "CR-20240115-001",
  "status": "pending",
  "estimatedCompletion": "2024-01-15T10:35:00Z"
}
```

---

## 3. Check Report Status

**Endpoint:** `GET /credit-check/status/{reportId}`

**cURL Command:**
```bash
curl -X GET https://api.rentals.ca/credit-check/status/CR-20240115-001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"
```

**Expected Response:**
```json
{
  "status": "completed",
  "completedAt": "2024-01-15T10:35:00Z",
  "progress": 100,
  "estimatedCompletion": null
}
```

---

## 4. Retrieve Credit Report

**Endpoint:** `GET /credit-check/report/{reportId}`

**cURL Command:**
```bash
curl -X GET https://api.rentals.ca/credit-check/report/CR-20240115-001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "report": {
    "id": "CR-20240115-001",
    "status": "completed",
    "createdAt": "2024-01-15T10:30:00Z",
    "completedAt": "2024-01-15T10:35:00Z",
    "score": 745,
    "scoreRange": "good",
    "factors": {
      "positive": [
        "No late payments in the last 24 months",
        "Low credit utilization ratio",
        "Long credit history"
      ],
      "negative": [
        "Recent credit inquiry",
        "Limited credit mix"
      ]
    },
    "accounts": [
      {
        "type": "Credit Card",
        "balance": 2500,
        "limit": 10000,
        "status": "Open",
        "paymentHistory": ["OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK", "OK"]
      }
    ],
    "inquiries": [
      {
        "date": "2024-01-15",
        "company": "ABC Bank",
        "type": "Credit Application"
      }
    ],
    "publicRecords": []
  }
}
```

---

## Complete Workflow Example

Here's a complete workflow using cURL commands:

### Step 1: Process Payment
```bash
# Store the response in a variable
PAYMENT_RESPONSE=$(curl -s -X POST https://api.rentals.ca/credit-check/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90,
    "currency": "CAD",
    "description": "Credit Check Report"
  }')

# Extract transaction ID (requires jq)
TRANSACTION_ID=$(echo $PAYMENT_RESPONSE | jq -r '.transactionId')
echo "Transaction ID: $TRANSACTION_ID"
```

### Step 2: Initiate Credit Check
```bash
CHECK_RESPONSE=$(curl -s -X POST https://api.rentals.ca/credit-check/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d "{
    \"transactionId\": \"$TRANSACTION_ID\",
    \"personalInfo\": {
      \"firstName\": \"John\",
      \"lastName\": \"Doe\",
      \"dateOfBirth\": \"1990-01-01\",
      \"ssn\": \"123-45-6789\",
      \"email\": \"john.doe@example.com\",
      \"phone\": \"+1-416-555-0123\",
      \"address\": {
        \"street\": \"123 Main St\",
        \"city\": \"Toronto\",
        \"province\": \"ON\",
        \"postalCode\": \"M5V 3A8\",
        \"country\": \"CA\"
      }
    },
    \"consent\": {
      \"creditCheck\": true,
      \"termsAccepted\": true,
      \"privacyPolicyAccepted\": true,
      \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
    }
  }")

# Extract report ID
REPORT_ID=$(echo $CHECK_RESPONSE | jq -r '.reportId')
echo "Report ID: $REPORT_ID"
```

### Step 3: Poll for Status
```bash
# Poll until report is ready
while true; do
  STATUS_RESPONSE=$(curl -s -X GET https://api.rentals.ca/credit-check/status/$REPORT_ID \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_AUTH_TOKEN")
  
  STATUS=$(echo $STATUS_RESPONSE | jq -r '.status')
  echo "Status: $STATUS"
  
  if [ "$STATUS" = "completed" ]; then
    break
  fi
  
  sleep 5
done
```

### Step 4: Retrieve Report
```bash
# Get the final report
curl -X GET https://api.rentals.ca/credit-check/report/$REPORT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  | jq '.'
```

---

## Test Card Numbers

Use these test card numbers for development:

- **Visa:** `4111111111111111`
- **Mastercard:** `5555555555554444`
- **American Express:** `378282246310005`
- **Discover:** `6011111111111117`
- **Invalid:** `1234567890123456`

---

## Error Handling Examples

### Invalid Card Number
```bash
curl -X POST https://api.rentals.ca/credit-check/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -d '{
    "cardNumber": "1234",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90
  }'
```

**Expected Error Response:**
```json
{
  "success": false,
  "error": "Invalid card number"
}
```

### Missing Authentication
```bash
curl -X POST https://api.rentals.ca/credit-check/payment \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90
  }'
```

**Expected Error Response:**
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

---

## Environment Variables

Set these environment variables for easier testing:

```bash
export API_BASE_URL="https://api.rentals.ca"
export AUTH_TOKEN="YOUR_AUTH_TOKEN"
```

Then use them in your cURL commands:

```bash
curl -X POST $API_BASE_URL/credit-check/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d '{
    "cardNumber": "4111111111111111",
    "expiryDate": "12/25",
    "cvv": "123",
    "cardholderName": "John Doe",
    "amount": 90
  }'
``` 