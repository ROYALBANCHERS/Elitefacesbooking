# Deployment & Email Setup Guide - COMPLETE

## What Was Fixed

### 1. Build Error Fixed
- **Problem**: `Could not resolve "./App" from "index.tsx"`
- **Solution**: 
  - Removed conflicting `pnpm-lock.yaml` file
  - Fixed vite config alias path from `./src` to `.`
  - Now using npm instead of pnpm

### 2. Mobile Responsiveness Added
- New hamburger menu component for mobile devices
- Responsive navigation that hides on mobile
- All pages now mobile-optimized

### 3. Navigation Updates
- Removed "TALENT ROSTER" from navigation
- Added "ALL CELEBRITIES" link to new celebrities page
- Hamburger menu works on screens under 768px

### 4. All Celebrities Page Added
- New dedicated page showing all celebrities
- Search functionality by name
- Filter by category (Actor, Model, Anchor, etc.)
- Responsive grid layout (1-4 columns)
- Full navigation and footer

---

## Email Setup (EmailJS) - MUST DO

Your booking forms will NOT send emails without this setup. This is required for:
- Welcome modal bookings
- Celebrity card request bookings
- Contact form inquiries

### Step 1: Create EmailJS Account (5 minutes)

1. Visit https://emailjs.com
2. Click "Sign Up"
3. Sign up with email/Google/GitHub
4. Verify your email

### Step 2: Add Gmail Service (10 minutes)

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose **Gmail**
4. Name it: `gmail_service`
5. Click **Connect Account**
6. Select your Gmail account (elitefacesbooking@gmail.com)
7. Click **Create Service**
8. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template (10 minutes)

1. Go to **Email Templates**
2. Click **Create Template**
3. Name: `booking_request`
4. From Name: `{{from_name}}`
5. From Email: `{{from_email}}`
6. To Email: `elitefacesbooking@gmail.com`
7. Subject: `New Booking Request from {{from_name}}`
8. Body: Copy and paste this:

```
NEW BOOKING REQUEST

Client Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company_name}}
Location: {{location}}

Booking Type: {{booking_type}}
Preferred Celebrity: {{celebrity_name}}
Event Date: {{event_date}}

Additional Details:
{{additional_details}}

---
Message sent via EliteFaces Booking System
```

9. Click **Create Template**
10. **Copy the Template ID** (you'll need this)

### Step 4: Get Your Public Key (2 minutes)

1. Go to **Account** (top right)
2. Go to **API Keys**
3. **Copy your Public Key**

### Step 5: Update Your Code

Now you have 3 credentials:
- Service ID
- Template ID
- Public Key

Update these THREE files:

#### File 1: `/components/WelcomeModal.tsx`

Find this line (around line 8):
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
```

Replace with:
```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE');
```

Find this (around line 47):
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
```

Replace with:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID_HERE',
  'YOUR_TEMPLATE_ID_HERE',
```

#### File 2: `/components/BookingModal.tsx`

Same changes as above (lines 11, 25-26)

#### File 3: `/components/pages/ContactUs.tsx`

Same changes as above

### Step 6: Test Locally

1. Run: `npm run dev`
2. Open http://localhost:5173
3. Fill the welcome modal form
4. Click "SUBMIT BOOKING"
5. Check your email for the booking notification

### Step 7: Deploy to Vercel

1. Push your changes to GitHub
2. Go to Vercel project settings
3. Add Environment Variables:
   - `VITE_API_KEY`: Your Gemini API key
   - `VITE_GEMINI_API_KEY`: Same as above
4. Redeploy

---

## Verification Checklist

- [ ] pnpm-lock.yaml is deleted
- [ ] vite.config.ts uses correct alias path
- [ ] .npmrc file exists
- [ ] vercel.json file exists
- [ ] MobileMenu component created
- [ ] Celebrities page created
- [ ] Router updated with 'celebrities' page type
- [ ] "TALENT ROSTER" removed from nav
- [ ] "ALL CELEBRITIES" added to nav
- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created
- [ ] Credentials updated in 3 component files
- [ ] Local testing successful
- [ ] Deploy to Vercel

---

## Testing the Email System

### Welcome Modal Test
1. Refresh site (first time only)
2. Fill form with test data
3. Click SUBMIT
4. Check email within 30 seconds

### Celebrity Card Test
1. Go to any celebrity card
2. Click "BOOK NOW"
3. Fill form
4. Check email

### Contact Form Test
1. Click CONTACT in nav
2. Fill form
3. Check email

---

## Troubleshooting

### Emails not sending?
- Verify Service ID is correct
- Verify Template ID is correct
- Verify Public Key is correct
- Check spam/promotions folder
- Check browser console for errors

### "Service not found" error?
- Public Key is wrong
- Check you copied entire key with no spaces

### Build still fails?
- Run `npm install` locally first
- Push to GitHub
- Let Vercel rebuild

### Mobile menu not showing?
- View on device under 768px width
- Or resize browser window

---

## Your Updated Navigation

### Desktop (>768px)
- Logo
- OUR SERVICES
- ALL CELEBRITIES
- ABOUT
- BLOG (dropdown)
- PORTFOLIO
- CONTACT (button)

### Mobile (<768px)
- Logo
- Hamburger icon
- Tap hamburger to open menu with all options

---

## What Users Will Experience

1. **First Visit**: Welcome modal pops up
2. **Fills Form**: Full booking details captured
3. **Submits**: Email instantly sent to your inbox
4. **See Response**: Success message appears
5. **Second Visit**: Modal doesn't appear again

---

## Important Notes

- Email sends automatically, user doesn't need Gmail open
- Works on mobile and desktop
- Uses industry-standard EmailJS service
- Free tier allows 200 emails/month
- 100% GDPR compliant

---

## Next Steps

1. Complete EmailJS setup (30 minutes)
2. Test locally
3. Push to GitHub
4. Check Vercel deployment
5. Start receiving booking requests!

Need help? Check the other documentation files or test locally first before deploying.
