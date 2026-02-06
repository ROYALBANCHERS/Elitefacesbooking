# Setup Checklist - Complete Your EliteFacesBooking Site

## Pre-Setup Verification ✓

- [ ] You have npm or pnpm installed
- [ ] Project runs with `npm run dev`
- [ ] You can see the home page with celebrities

## Step 1: Install Email Library (2 minutes)

```bash
# Install the EmailJS library
npm install @emailjs/browser
```

**Verify:** Run `npm run dev` and check no errors in console

---

## Step 2: Create EmailJS Account (5 minutes)

Go to: https://www.emailjs.com

- [ ] Click "Sign Up Free"
- [ ] Create account with your email
- [ ] Verify your email address
- [ ] Log in to dashboard

---

## Step 3: Setup Email Service (10 minutes)

In EmailJS Dashboard:

1. **Click "Email Services" in sidebar**
2. **Click "Add New Service"**
3. **Configure Gmail:**
   - Service Name: `gmail_service`
   - Provider: Select Gmail
   - Click "Connect Gmail"
   - Follow Gmail authentication
   - Save service

**Note:** You'll get a **Service ID** - keep this safe!

- [ ] Email service created
- [ ] Service ID: _________________ (save it)

---

## Step 4: Create Email Templates (10 minutes)

### Template 1: Booking Request

In EmailJS Dashboard:
1. Click "Email Templates"
2. Click "Create New Template"
3. Fill in:
   - **Template Name:** `booking_template`
   - **Subject:** `New Booking Request from {{from_name}}`
   - **Content:** (see below)

**Template Content:**
```
New Booking Request Received

Name: {{from_name}}
Email: {{from_email}}
Celebrity: {{celebrity_name}}
Event Type: {{event_type}}
Event Date: {{event_date}}
Event Location: {{event_location}}
Category: {{category}}

Customer Requirements:
{{requirements}}

---
Action: Review and respond to customer within 24 hours
```

4. Click "Create Template"
5. Save your **Template ID** (shown at top)

- [ ] Booking template created
- [ ] Template ID: _________________ (save it)

### Template 2: Contact Form

Repeat the process:
1. Click "Create New Template"
2. Fill in:
   - **Template Name:** `contact_template`
   - **Subject:** `New Contact Form Submission from {{from_name}}`
   - **Content:** (see below)

**Template Content:**
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

---
Action: Reach out to customer with relevant proposal
```

3. Click "Create Template"
4. Save your **Template ID**

- [ ] Contact template created
- [ ] Template ID: _________________ (save it)

---

## Step 5: Get Your Public Key (5 minutes)

1. Click "Account" in sidebar
2. Find "Public Key" section
3. Click copy button
4. Save it somewhere safe

- [ ] Public Key: _________________ (save it)

---

## Step 6: Update Your Code (10 minutes)

### File 1: `components/BookingModal.tsx`

Open the file and find line 11:
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
```

Replace with your actual Public Key:
```javascript
emailjs.init('pk_live_1234567890abcdef'); // Your real key
```

Now find around line 52:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
```

Replace with your credentials:
```javascript
await emailjs.send(
  'service_abc123def456',              // Your Service ID
  'template_xyz789uvw123',             // Your Booking Template ID
```

- [ ] BookingModal.tsx updated with Public Key
- [ ] BookingModal.tsx updated with Service ID
- [ ] BookingModal.tsx updated with Booking Template ID

### File 2: `components/pages/ContactUs.tsx`

Open the file and find line 7:
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
```

Replace with your Public Key (same one):
```javascript
emailjs.init('pk_live_1234567890abcdef'); // Your real key
```

Now find around line 45:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_CONTACT_TEMPLATE_ID',
```

Replace with your credentials:
```javascript
await emailjs.send(
  'service_abc123def456',              // Your Service ID (same)
  'template_qwe456rty789ui123',        // Your Contact Template ID
```

- [ ] ContactUs.tsx updated with Public Key
- [ ] ContactUs.tsx updated with Service ID
- [ ] ContactUs.tsx updated with Contact Template ID

---

## Step 7: Test Email Functionality (5 minutes)

1. **Start your app:**
   ```bash
   npm run dev
   ```

2. **Test Booking Email:**
   - Go to home page
   - Click on any celebrity
   - Fill in the booking form:
     - Name: Test Name
     - Email: test@example.com
     - Event Date: Pick any date
     - Event Location: Test City
     - Message: Test message
   - Click "SUBMIT REQUEST"
   - You should see a success message

3. **Test Contact Email:**
   - Click "CONTACT" in top navigation
   - Fill the contact form:
     - Name: Test Name
     - Email: test@example.com
     - Phone: 9999999999
     - Fill other fields
   - Click "SEND MESSAGE"
   - You should see a success message

4. **Check Your Email:**
   - Log into elitefacesbooking@gmail.com
   - Check inbox for 2 test emails
   - Verify content looks correct

- [ ] Booking form test email received
- [ ] Contact form test email received
- [ ] Email content looks correct

---

## Step 8: Verify All Pages (10 minutes)

Test that all pages are accessible:

- [ ] Home - Click EliteFaces logo
- [ ] Privacy Policy - Click in footer
- [ ] Our Services - Click in top nav
- [ ] About Us - Click in top nav
- [ ] Why Choose Us - Click link in About
- [ ] Blog - Click dropdown in nav
  - [ ] Industry Trends
  - [ ] FAQ & Help
  - [ ] Success Stories
  - [ ] Event Planning
- [ ] FAQs - Click in footer
- [ ] Contact Us - Click CONTACT button
- [ ] Portfolio - Click in nav

---

## Step 9: Clean Up & Deploy (5 minutes)

1. **Remove Test Data:**
   - Don't submit real test data

2. **Update Navigation (Optional):**
   - Verify all links work
   - Check mobile navigation

3. **Update Content (Optional):**
   - Change blog posts with real content
   - Update success stories
   - Update team info

4. **Deploy to Production:**
   ```bash
   npm run build
   # Then deploy using your platform
   # (Vercel, Netlify, GitHub Pages, etc.)
   ```

- [ ] Code is cleaned up
- [ ] All content is accurate
- [ ] Ready to deploy

---

## Common Issues & Solutions

### Email Not Sending?
- [ ] Check Public Key is correct in both files
- [ ] Check Service ID is correct
- [ ] Check Template IDs match your created templates
- [ ] Open browser DevTools (F12) to see errors
- [ ] Check EmailJS dashboard for error logs

### Website Shows Errors?
- [ ] Run `npm install` to ensure all dependencies installed
- [ ] Check browser console (F12) for errors
- [ ] Clear browser cache
- [ ] Restart dev server (`npm run dev`)

### Pages Not Showing?
- [ ] Verify all imports in App.tsx
- [ ] Check Router component is working
- [ ] Ensure no typos in navigation buttons

### Form Not Submitting?
- [ ] Check all form fields have names matching template variables
- [ ] Verify template variable names match exactly
- [ ] Check browser console for validation errors

---

## Your Credentials Summary

**Keep these safe!**

```
Public Key:              _________________________
Service ID:              _________________________
Booking Template ID:     _________________________
Contact Template ID:     _________________________
Email Recipient:         elitefacesbooking@gmail.com
Admin WhatsApp:          +91 9990996091
                         +91 7678683436
```

---

## You're Done! 🎉

Your EliteFacesBooking website now has:
- ✓ 12 new professional pages
- ✓ Email notifications for bookings & inquiries
- ✓ Blog section with 4 articles
- ✓ Portfolio showcase
- ✓ Responsive design
- ✓ Mobile-friendly navigation

**Next Steps:**
1. Update content with real information
2. Add real images to portfolio
3. Update blog posts
4. Customize colors/fonts if desired
5. Deploy to production

**Need Help?**
- See QUICK_START.md for fast reference
- See EMAILJS_SETUP.md for detailed email setup
- See PAGES_GUIDE.md to explore all pages
- See PROJECT_SUMMARY.md for technical details

Happy booking! 🚀
