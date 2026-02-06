# Quick Start Guide - EliteFacesBooking Updates

## What You Got

Your EliteFacesBooking website now has:
- 12 new professional pages
- Email functionality for bookings and inquiries
- Navigation system
- Blog section with 4 articles
- FAQs and portfolio showcase

## First Steps (5 minutes)

### 1. Install Email Library
```bash
npm install @emailjs/browser
```

### 2. Get EmailJS Credentials
1. Sign up at [EmailJS.com](https://emailjs.com) (free)
2. Create an email service (Gmail recommended)
3. Create 2 email templates:
   - `booking_template` 
   - `contact_template`
4. Copy your Public Key and Service ID

### 3. Add Your Credentials
Open these files and replace placeholders:

**File: `components/BookingModal.tsx`**
- Line 11: Replace `YOUR_EMAILJS_PUBLIC_KEY`
- Line 52: Replace `YOUR_SERVICE_ID`
- Line 53: Replace `YOUR_TEMPLATE_ID`

**File: `components/pages/ContactUs.tsx`**
- Line 7: Replace `YOUR_EMAILJS_PUBLIC_KEY`
- Line 45: Replace `YOUR_SERVICE_ID`
- Line 46: Replace `YOUR_CONTACT_TEMPLATE_ID`

### 4. Test It
```bash
npm run dev
```
- Try booking a celebrity
- Try the contact form
- Check elitefacesbooking@gmail.com for emails

## Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | / | Celebrity roster (already existed) |
| Privacy Policy | /privacy | Legal terms |
| Our Services | /services | 6 service offerings |
| About Us | /about | Company story |
| Why Choose Us | /why-us | Competitive advantages |
| Portfolio | /portfolio | Success stories |
| FAQs | /faqs | Q&A page |
| Contact Us | /contact | Contact form |
| Blog - Industry Trends | /blog-industry | Industry news |
| Blog - FAQ | /blog-faq | Help center |
| Blog - Success Stories | /blog-success | Case studies |
| Blog - Event Planning | /blog-event | Event guide |

## Key Features

✓ Mobile responsive
✓ Email notifications to elitefacesbooking@gmail.com
✓ No backend server needed
✓ Professional dark theme
✓ Fast page transitions
✓ Expandable FAQs
✓ Portfolio filtering

## Common Tasks

### Change Email Recipient
Find "elitefacesbooking@gmail.com" in:
- `components/BookingModal.tsx`
- `components/pages/ContactUs.tsx`

### Add New Blog Post
1. Create new file: `components/pages/BlogNewTopic.tsx`
2. Import in `App.tsx`
3. Add route in `AppContainer` component

### Update Services List
Edit `components/pages/OurServices.tsx` - modify the `services` array

### Change About Page Content
Edit `components/pages/AboutUs.tsx` - update text sections

## Troubleshooting

**Emails not sending?**
1. Check EmailJS dashboard for errors
2. Verify your Public Key and Service ID are correct
3. Check browser console (F12) for errors
4. Ensure template names match exactly

**Navigation not working?**
- Clear browser cache
- Check console for JavaScript errors
- Ensure all page components are imported in App.tsx

**Styling looks off?**
- Make sure you have Tailwind CSS configured
- Check that globals.css is loaded

## Need Help?

1. **EmailJS Issues**: https://support.emailjs.com
2. **Code Issues**: Check the EMAILJS_SETUP.md file
3. **Design Questions**: See PROJECT_SUMMARY.md

## Deployment

When deploying (Vercel, Netlify, etc.):
1. Install dependencies: `npm install`
2. Build project: `npm run build`
3. EmailJS works automatically with no backend needed
4. Monitor incoming emails in your EmailJS dashboard

Happy booking! 🎉
