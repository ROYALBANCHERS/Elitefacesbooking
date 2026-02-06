# EmailJS Setup Guide

Your EliteFacesBooking website includes email functionality for:
1. **Booking Requests** - When users submit celebrity booking forms
2. **Contact Us Forms** - When visitors send inquiries
3. **All emails sent to:** elitefacesbooking@gmail.com

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com)
2. Click "Sign Up Free"
3. Create your account and verify email

### Step 2: Create Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select your email provider (Gmail recommended):
   - Service Name: `gmail_service` (or your preference)
   - Provider: Gmail
   - Click **Create Service**
4. Follow Gmail authentication steps

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**

#### For Booking Requests:
- **Template Name:** `booking_template`
- **Subject:** `New Booking Request from {{from_name}}`
- **Content:**
```
New Booking Request

Name: {{from_name}}
Email: {{from_email}}
Celebrity: {{celebrity_name}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Event Location: {{event_location}}
Category: {{category}}

Requirements:
{{requirements}}
```

#### For Contact Form:
- **Template Name:** `contact_template`
- **Subject:** `New Inquiry from {{from_name}}`
- **Content:**
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Budget: {{budget}}

Message:
{{message}}
```

### Step 4: Get Your Credentials
1. Go to **Account** settings
2. Copy your **Public Key**
3. Go to **Email Services** and copy your **Service ID**
4. Go to **Email Templates** and copy **Template IDs**

### Step 5: Update Your Code
Replace these placeholders in your code:

**In `components/BookingModal.tsx` (line ~11):**
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // ← Paste your Public Key here
```

**In `components/BookingModal.tsx` (line ~52):**
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',        // ← Paste your Service ID
  'YOUR_TEMPLATE_ID',       // ← Paste your booking template ID
  { ... }
);
```

**In `components/pages/ContactUs.tsx` (line ~7):**
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // ← Paste your Public Key here
```

**In `components/pages/ContactUs.tsx` (line ~45):**
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',          // ← Paste your Service ID
  'YOUR_CONTACT_TEMPLATE_ID', // ← Paste your contact template ID
  { ... }
);
```

### Step 6: Test Your Email
1. Fill out a booking form or contact form on your website
2. Submit and check if email arrives at elitefacesbooking@gmail.com
3. Check your EmailJS dashboard under "Activity" for logs

## Troubleshooting

### Email Not Sending
1. Check EmailJS dashboard for error messages
2. Verify Service ID and Template IDs are correct
3. Ensure Public Key is correct
4. Check browser console for errors

### Gmail Issues
1. If using Gmail, enable "Less secure app access" or use App Passwords
2. Follow EmailJS Gmail setup guide in your dashboard

### Template Variables Not Working
Ensure all variable names match exactly:
- Booking: `from_name`, `from_email`, `celebrity_name`, `event_type`, `event_date`, `event_location`, `requirements`, `category`
- Contact: `from_name`, `from_email`, `phone`, `company`, `event_type`, `event_date`, `budget`, `message`

## Free Tier Limits
- EmailJS free tier: 200 emails/month
- Upgrade to paid plan if you need more
- Recommended for production: Paid plan

## Need Help?
- EmailJS Support: [support.emailjs.com](https://support.emailjs.com)
- Check EmailJS documentation in your dashboard
