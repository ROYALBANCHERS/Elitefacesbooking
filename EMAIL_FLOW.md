# Email Flow Diagram

## How Emails Work on Your Site

### Overall Email Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    YOUR WEBSITE                              │
│              (React/Vite Frontend)                           │
└──────────────┬─────────────────────────────────────────┬────┘
               │                                         │
               │ (Form Submission)                      │ (Form Submission)
               │                                        │
               ▼                                        ▼
         ┌─────────────┐                          ┌──────────────┐
         │   BOOKING   │                          │  CONTACT     │
         │   FORM      │                          │  FORM        │
         └──────┬──────┘                          └────────┬─────┘
                │                                         │
                └─────────────────────┬───────────────────┘
                                      │
                                      │ (HTTPS POST)
                                      │
                                      ▼
                    ┌─────────────────────────────┐
                    │   EMAILJS SERVICE           │
                    │  (Cloud Email Provider)     │
                    │                             │
                    │ • Validates form data      │
                    │ • Processes template       │
                    │ • Sends via SMTP           │
                    └────────────┬────────────────┘
                                 │
                                 │ (SMTP)
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   GMAIL / EMAIL SERVICE  │
                    │   (SMTP Server)          │
                    └────────────┬─────────────┘
                                 │
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │  ELITEFACESBOOKING       │
                    │  @GMAIL.COM              │
                    │                          │
                    │ INBOX:                   │
                    │ ✓ Booking Requests       │
                    │ ✓ Contact Inquiries      │
                    └──────────────────────────┘
```

## Booking Form Email Flow

```
USER VISITS WEBSITE
        ↓
CLICKS ON CELEBRITY CARD
        ↓
BOOKING MODAL OPENS
        ↓
FILLS FORM:
  ✓ Full Name
  ✓ Email
  ✓ Event Date
  ✓ Event Location
  ✓ Event Type
  ✓ Requirements
        ↓
CLICKS "SUBMIT REQUEST"
        ↓
BROWSER VALIDATES FORM
        ↓
FORM DATA SENT TO EMAILJS:
  {
    from_name: "John Doe",
    from_email: "john@company.com",
    celebrity_name: "Bollywood Star",
    event_type: "Brand Endorsement",
    event_date: "2024-06-15",
    event_location: "Mumbai",
    category: "Bollywood",
    requirements: "Requirements text..."
  }
        ↓
EMAILJS RECEIVES REQUEST
        ↓
EMAILJS FILLS TEMPLATE:
  "New Booking Request from {{from_name}}"
        ↓
EMAILJS SENDS VIA GMAIL SMTP
        ↓
EMAIL ARRIVES AT:
  elitefacesbooking@gmail.com
        ↓
USER SEES: "Request Received"
        ↓
USER REDIRECTED TO HOME
```

## Contact Form Email Flow

```
USER VISITS WEBSITE
        ↓
CLICKS "CONTACT" BUTTON
        ↓
CONTACT PAGE LOADS
        ↓
FILLS FORM:
  ✓ Name
  ✓ Email
  ✓ Phone
  ✓ Company
  ✓ Event Type
  ✓ Event Date
  ✓ Budget
  ✓ Message
        ↓
CLICKS "SEND MESSAGE"
        ↓
BROWSER VALIDATES FORM
        ↓
FORM DATA SENT TO EMAILJS:
  {
    from_name: "Jane Smith",
    from_email: "jane@brand.com",
    phone: "9999999999",
    company: "Company Name",
    event_type: "Product Launch",
    event_date: "2024-07-20",
    budget: "₹50 Lakhs - ₹1 Crore",
    message: "We want to book..."
  }
        ↓
EMAILJS RECEIVES REQUEST
        ↓
EMAILJS FILLS TEMPLATE:
  "New Contact Form Submission from {{from_name}}"
        ↓
EMAILJS SENDS VIA GMAIL SMTP
        ↓
EMAIL ARRIVES AT:
  elitefacesbooking@gmail.com
        ↓
USER SEES: "Thank You!"
        ↓
USER CAN RETURN TO HOME
```

## Email Template Structure

### Booking Template

```
EMAIL TEMPLATE: booking_template

Subject: New Booking Request from {{from_name}}

Body:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW BOOKING REQUEST RECEIVED

Name: {{from_name}}
Email: {{from_email}}
Celebrity: {{celebrity_name}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Event Location: {{event_location}}
Category: {{category}}

Customer Requirements:
{{requirements}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Action: Review and respond within 24 hours
```

### Contact Template

```
EMAIL TEMPLATE: contact_template

Subject: New Contact Form Submission from {{from_name}}

Body:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW CONTACT FORM SUBMISSION

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Budget: {{budget}}

Message:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Action: Reach out with relevant proposal
```

## Error Handling Flow

```
FORM SUBMISSION
        ↓
VALIDATION CHECK
        ├─ Missing Field?
        │  └─ Show Error: "Field Required"
        │
        ├─ Invalid Email?
        │  └─ Show Error: "Invalid Email Format"
        │
        └─ All Valid?
           └─ Send to EmailJS
               ├─ Network Error?
               │  └─ Show Error: "Failed to Submit"
               │
               ├─ EmailJS Error?
               │  └─ Show Error: "Submission Failed. Try Again."
               │
               └─ Success?
                  └─ Show: "Success! Submitted"
                     └─ Close form after 2 seconds
```

## Email Delivery Timeline

```
User Submits Form
    ↓ (Instant)
Frontend Validation
    ↓ (<100ms)
EmailJS Receives Request
    ↓ (10-100ms)
Template Processing
    ↓ (10-50ms)
SMTP Connection
    ↓ (50-200ms)
Email Delivery
    ↓ (1-5 seconds)
Gmail Receives
    ↓ (Instant)
Inbox Notification
    ↓ (1-2 minutes)
Admin Sees Email
    ↓
Admin Responds
```

## Security Flow

```
┌─────────────────────────────────────────┐
│ User Form Input                         │
│ (Untrusted User Data)                   │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ Frontend Validation                     │
│ • Check fields present                  │
│ • Validate email format                 │
│ • Check required fields                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ HTTPS Encryption                        │
│ • Data encrypted in transit             │
│ • SSL/TLS certificate                   │
│ • Secure connection to EmailJS          │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ EmailJS Processing                      │
│ • API authentication                    │
│ • Rate limiting                         │
│ • Spam filtering                        │
│ • Template sanitization                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ SMTP to Gmail                           │
│ • Gmail SMTP security                   │
│ • App-specific password                 │
│ • Secure authentication                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ Email Inbox                             │
│ • Gmail spam filters                    │
│ • Authentication checks                 │
│ • Secure storage                        │
└─────────────────────────────────────────┘
```

## Code Integration Points

### In BookingModal.tsx

```typescript
// 1. Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

// 2. Prepare form data
const formData = {
  from_name: "John Doe",
  from_email: "john@example.com",
  // ... other fields
};

// 3. Send email
await emailjs.send(
  'service_abc123',      // Service ID
  'template_xyz789',     // Template ID
  formData               // Data to fill template
);

// 4. Handle response
.then(() => {
  setSuccess(true);      // Show success message
})
.catch((err) => {
  setError('Failed...');  // Show error message
});
```

### In ContactUs.tsx

```typescript
// Same pattern as BookingModal
// But uses contact_template instead

await emailjs.send(
  'service_abc123',         // Service ID
  'contact_template_id',    // Different template
  {
    from_name,
    from_email,
    phone,
    company,
    // ... other fields
  }
);
```

## Testing Email Flow

### Test 1: Booking Email
```
1. Go to website
2. Click on any celebrity
3. Fill booking form with:
   - Name: Test User
   - Email: your-email@example.com
   - Date: Any date
   - Other required fields
4. Submit form
5. Check email inbox for test email
6. Verify content appears correctly
```

### Test 2: Contact Email
```
1. Go to Contact page
2. Fill contact form with:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: 9999999999
   - Other fields
3. Submit form
4. Check email inbox for test email
5. Verify content appears correctly
```

### Test 3: Error Handling
```
1. Try submitting form with empty fields
2. Try submitting with invalid email
3. Verify error messages appear
4. Verify form doesn't submit with errors
```

## Email Troubleshooting

### Email Not Arriving?

```
Check:
  1. Public Key correct?          → Update in code
  2. Service ID correct?          → Update in code
  3. Template ID correct?         → Update in code
  4. Template exists?             → Create in EmailJS
  5. Gmail auth failed?           → Re-authenticate
  6. Spam folder?                 → Check & whitelist
  7. EmailJS quota?               → Check dashboard
  8. Network issue?               → Check console
  9. Form validation error?       → Check console
  10. Template variables match?   → Update template
```

### Template Variables Not Working?

```
Verify exact match:
  Template:  {{from_name}}
  Code:      from_name: "value"
  
Booking form variables:
  {{from_name}}
  {{from_email}}
  {{celebrity_name}}
  {{event_type}}
  {{event_date}}
  {{event_location}}
  {{category}}
  {{requirements}}

Contact form variables:
  {{from_name}}
  {{from_email}}
  {{phone}}
  {{company}}
  {{event_type}}
  {{event_date}}
  {{budget}}
  {{message}}
```

## Performance Metrics

```
Form Submission Timeline:

User Click (0ms)
  ↓ 10ms: Validation
  ↓ 50ms: Data preparation
  ↓ 100ms: HTTPS send
  ↓ 200ms: EmailJS receives
  ↓ 300ms: Template process
  ↓ 400ms: SMTP connect
  ↓ 500ms: Email sent
  ↓ 1000ms: Response received
  ↓ 1100ms: UI update (Success)

Total Time: ~1 second

User Experience:
  • Loading indicator during send
  • Success message after ~1 second
  • Auto-close after 2 seconds
```

---

This email flow ensures:
✓ Reliable delivery
✓ Secure transmission
✓ Professional formatting
✓ Error handling
✓ User feedback
✓ Admin notifications
