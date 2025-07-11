# 🚀 Quick Trustii Setup Guide

## Step 1: Create Environment File

Run the setup script to create your `.env` file with a dummy API key:

```bash
npm run setup-trustii
```

Or manually create a `.env` file in your project root with:

```env
# Trustii API Configuration
VITE_TRUSTII_API_KEY=tr_test_dummy_key_123456789abcdef
VITE_TRUSTII_API_BASE_URL=https://api.trustii.co/verif
VITE_DEBUG=true
```

## Step 2: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the demo page:
   ```
   http://localhost:8080/trustii-demo
   ```

3. Test the form validation and UI components

## Step 3: Get Real API Key (When Ready)

1. Visit [Trustii Documentation](https://docs.trustii.co/verif/docs/api/human-resources)
2. Sign up for an account
3. Generate your API key
4. Replace the dummy key in your `.env` file

## What the Dummy Key Does

- ✅ Allows you to test the UI and form validation
- ✅ Shows proper error handling
- ✅ Demonstrates the complete user flow
- ❌ API calls will fail (as expected with dummy key)

## Testing Features

With the dummy key, you can test:
- Form validation and error messages
- UI components and styling
- State management
- Error handling flows
- Configuration detection

## Next Steps

Once you have a real API key:
1. Replace `tr_test_dummy_key_123456789abcdef` with your actual key
2. Test real API calls
3. Integrate into your existing workflows

For detailed documentation, see `TRUSTII_INTEGRATION.md` 