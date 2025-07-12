# Credit Check Feature Testing Guide

This guide provides comprehensive testing instructions for the Trustii credit check feature implementation.

## 🚀 Quick Start Testing

### 1. Setup Environment
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Access the Feature
- Navigate to: `http://localhost:5173/trustii-demo`
- You should see the Trustii demo page with a "Start Credit Check" button

## 📋 Complete Testing Process

### Step 1: Initial Page Load
**Expected Result**: 
- Page loads with Trustii demo content
- "Start Credit Check" CTA section is visible
- Shows $90 pricing and features

**Test Actions**:
1. ✅ Verify page loads without errors
2. ✅ Check "Start Credit Check" button is visible
3. ✅ Confirm pricing shows $90
4. ✅ Verify feature list displays correctly

### Step 2: Launch Credit Check Wizard
**Expected Result**: 
- Clicking "Start Credit Check" opens the wizard
- Progress bar shows 25% (Step 1 of 4)
- Payment form is displayed

**Test Actions**:
1. ✅ Click "Start Credit Check" button
2. ✅ Verify wizard opens with payment step
3. ✅ Check progress bar shows 25%
4. ✅ Confirm step indicators show "Payment" as active

### Step 3: Payment Form Testing

#### 3.1 Form Validation
**Test Data**:
```
Cardholder Name: John Doe
Email: john.doe@example.com
Card Number: 4111111111111111
Expiry Date: 12/25
CVV: 123
Address: 123 Main St
City: Toronto
Province: ON
Postal Code: M5V 3A8
```

**Test Actions**:
1. ✅ Try submitting empty form - should show validation errors
2. ✅ Enter invalid email - should show email validation error
3. ✅ Enter invalid postal code - should show format error
4. ✅ Enter valid data and submit

#### 3.2 Payment Processing
**Expected Result**: 
- Payment processes successfully (mock)
- Progress bar shows processing
- Success message appears
- Moves to next step

**Test Actions**:
1. ✅ Fill form with valid data
2. ✅ Click "Pay $90" button
3. ✅ Watch processing animation
4. ✅ Verify success message
5. ✅ Confirm moves to Personal Info step

### Step 4: Personal Information Form

#### 4.1 Form Validation
**Test Data**:
```
First Name: John
Last Name: Doe
Date of Birth: 1990-01-01
SSN: 123-45-6789
Email: john.doe@example.com
Phone: (416) 555-0123
Address: 123 Main St
City: Toronto
Province: ON
Postal Code: M5V 3A8
```

**Test Actions**:
1. ✅ Try submitting empty form - should show validation errors
2. ✅ Test SSN format validation (XXX-XX-XXXX)
3. ✅ Test phone number formatting
4. ✅ Test date of birth validation (must be 18+)
5. ✅ Test postal code format validation
6. ✅ Test consent checkboxes - all must be checked

#### 4.2 Consent Management
**Test Actions**:
1. ✅ Try submitting without checking consent boxes
2. ✅ Check all consent boxes
3. ✅ Verify form submits successfully

### Step 5: Credit Check Processing

#### 5.1 Status Monitoring
**Expected Result**: 
- Shows processing status
- Progress bar updates
- Step indicators show progress
- Real-time status updates

**Test Actions**:
1. ✅ Verify processing step loads
2. ✅ Check progress bar shows 50%
3. ✅ Watch status updates every 10 seconds
4. ✅ Verify step indicators show "Processing" as active

#### 5.2 Status Polling
**Test Actions**:
1. ✅ Wait for status updates (mock data)
2. ✅ Check "Refresh Status" button works
3. ✅ Verify progress increases over time
4. ✅ Confirm moves to Report step when complete

### Step 6: Credit Report Display

#### 6.1 Report Overview
**Expected Result**: 
- Credit score displayed prominently
- Score range badge shows correctly
- Summary statistics visible
- Export buttons available

**Test Actions**:
1. ✅ Verify credit score displays (mock: 550-850 range)
2. ✅ Check score range badge (Excellent/Good/Fair/Poor)
3. ✅ Confirm summary statistics show
4. ✅ Verify export buttons are present

#### 6.2 Report Tabs
**Test Actions**:
1. ✅ Click "Overview" tab - should show score and factors
2. ✅ Click "Accounts" tab - should show credit accounts
3. ✅ Click "Inquiries" tab - should show recent inquiries
4. ✅ Click "Factors" tab - should show detailed factors

#### 6.3 Export Features
**Test Actions**:
1. ✅ Click "Print" button - should open print dialog
2. ✅ Click "Download PDF" - should trigger download
3. ✅ Click "Share" button - should copy link or open share dialog

### Step 7: Error Handling Testing

#### 7.1 Payment Errors
**Test Actions**:
1. ✅ Enter invalid card number (less than 16 digits)
2. ✅ Submit payment - should show error
3. ✅ Click "Try Again" - should reset form
4. ✅ Enter valid data and retry

#### 7.2 Network Errors
**Test Actions**:
1. ✅ Disconnect internet during processing
2. ✅ Verify error message appears
3. ✅ Reconnect and click "Try Again"
4. ✅ Confirm process continues

#### 7.3 Form Validation Errors
**Test Actions**:
1. ✅ Submit forms with invalid data
2. ✅ Verify specific error messages appear
3. ✅ Test field-specific validation
4. ✅ Confirm errors clear when typing

## 🧪 Advanced Testing Scenarios

### Scenario 1: Complete Happy Path
1. ✅ Start credit check
2. ✅ Complete payment successfully
3. ✅ Fill personal information correctly
4. ✅ Wait for processing to complete
5. ✅ View and export report
6. ✅ Return to main page

### Scenario 2: Error Recovery
1. ✅ Start credit check
2. ✅ Enter invalid payment data
3. ✅ See error message
4. ✅ Fix data and retry
5. ✅ Complete successfully

### Scenario 3: Mobile Testing
1. ✅ Test on mobile device
2. ✅ Verify responsive design
3. ✅ Test touch interactions
4. ✅ Check form usability on small screens

### Scenario 4: Accessibility Testing
1. ✅ Test keyboard navigation
2. ✅ Verify screen reader compatibility
3. ✅ Check color contrast
4. ✅ Test focus management

## 🔧 Development Testing

### Mock Data Testing
The implementation includes mock data for development:

**Payment Mock Data**:
- Success rate: 90%
- Transaction ID: Generated automatically
- Processing time: 2 seconds

**Credit Check Mock Data**:
- Report ID: Generated automatically
- Processing time: 5-10 minutes (simulated)
- Credit score: Random between 550-850

**Report Mock Data**:
- Sample accounts and inquiries
- Mock credit factors
- Sample payment history

### Environment Variables
For development, these are optional:
```env
VITE_TRUSTII_API_KEY=your_key_here
VITE_STRIPE_PUBLISHABLE_KEY=your_key_here
```

The app will use mock services if keys are not provided.

## 🐛 Common Issues and Solutions

### Issue 1: Payment Form Not Loading
**Solution**: 
- Check browser console for errors
- Verify all dependencies are installed
- Clear browser cache

### Issue 2: Form Validation Not Working
**Solution**:
- Check browser console for JavaScript errors
- Verify form field IDs are correct
- Test individual validation functions

### Issue 3: Status Not Updating
**Solution**:
- Check network connectivity
- Verify polling interval (10 seconds)
- Check browser console for API errors

### Issue 4: Export Not Working
**Solution**:
- Check browser permissions
- Verify print dialog is not blocked
- Test in different browsers

## 📊 Testing Checklist

### Functionality Testing
- [ ] Payment form loads correctly
- [ ] Form validation works
- [ ] Payment processing succeeds
- [ ] Personal info form loads
- [ ] Personal info validation works
- [ ] Credit check initiates
- [ ] Status updates in real-time
- [ ] Report displays correctly
- [ ] Export features work
- [ ] Error handling works

### UI/UX Testing
- [ ] Responsive design works
- [ ] Progress indicators update
- [ ] Loading states display
- [ ] Error messages are clear
- [ ] Success messages appear
- [ ] Navigation works smoothly

### Security Testing
- [ ] No sensitive data in console
- [ ] Form validation prevents invalid data
- [ ] Error messages don't expose data
- [ ] No data stored permanently

### Performance Testing
- [ ] Page loads quickly
- [ ] Forms respond immediately
- [ ] Status updates are timely
- [ ] Export functions work fast

## 🎯 Success Criteria

The feature is working correctly if:

1. ✅ Users can complete the entire credit check process
2. ✅ All forms validate correctly
3. ✅ Payment processing works (mock)
4. ✅ Status updates in real-time
5. ✅ Reports display with all data
6. ✅ Export features function properly
7. ✅ Error handling works gracefully
8. ✅ UI is responsive and accessible

## 📞 Support

If you encounter issues during testing:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Test with different browsers
4. Check network connectivity
5. Review the implementation documentation

The feature is designed to work with mock data in development mode, so you can test the complete flow without real API keys. 