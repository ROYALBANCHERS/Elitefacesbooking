# Troubleshooting Guide

## Common Issues & Solutions

### Installation & Setup Issues

#### Issue: "npm install fails"
**Solution:**
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Or use pnpm if npm fails
pnpm install
```

#### Issue: "npm run dev shows errors"
**Solution:**
1. Check Node version: `node --version` (should be v16+)
2. Delete `node_modules` and reinstall
3. Clear terminal and try again
4. Check for typos in file names

#### Issue: "Module '@emailjs/browser' not found"
**Solution:**
```bash
npm install @emailjs/browser
# or
pnpm add @emailjs/browser
```

---

### EmailJS Setup Issues

#### Issue: "Can't create EmailJS account"
**Solution:**
1. Use a valid email address
2. Check spam folder for verification email
3. Try different browser
4. Clear browser cache and cookies

#### Issue: "Gmail authentication fails"
**Solution:**
1. Enable "Less secure app access" in Gmail settings
   - Go to: https://myaccount.google.com/security
   - Scroll to "Less secure app access"
   - Click "Turn on access"
   
2. Or use App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select Gmail
   - Copy the generated password
   - Use in EmailJS setup

#### Issue: "Can't find Service ID"
**Solution:**
1. Go to EmailJS Dashboard
2. Click "Email Services" in left sidebar
3. Your service appears in list
4. Copy the exact Service ID (starts with 'service_')

#### Issue: "Can't find Template ID"
**Solution:**
1. Go to EmailJS Dashboard
2. Click "Email Templates" in left sidebar
3. Click on the template you created
4. Template ID shown at top (starts with 'template_')

#### Issue: "Can't find Public Key"
**Solution:**
1. Go to EmailJS Dashboard
2. Click "Account" in left sidebar
3. Find "Public Key" section
4. Click copy button
5. Should start with 'pk_'

---

### Code Issues

#### Issue: "Pages don't show up"
**Solution:**
1. Check Router.tsx exists
2. Verify all imports in App.tsx
3. Check component file names match imports exactly
4. Clear browser cache: Ctrl+Shift+Delete
5. Check browser console for errors (F12)

#### Issue: "Navigation buttons don't work"
**Solution:**
```typescript
// Check RouterProvider wraps App
<RouterProvider>
  <AppContainer />
</RouterProvider>

// Check useRouter is imported
import { useRouter } from './components/Router';

// Check navigateTo is called correctly
const { navigateTo } = useRouter();
<button onClick={() => navigateTo('home')}>
```

#### Issue: "Blog dropdown menu doesn't open"
**Solution:**
1. Check BlogMenu.tsx exists
2. Check BlogMenu imported in App.tsx
3. Verify useState is working
4. Check CSS classes are correct
5. Clear cache and reload

#### Issue: "Forms don't submit"
**Solution:**
1. Check browser console for errors (F12)
2. Verify all form fields have `name` attributes
3. Check form field names match template variables
4. Verify EmailJS credentials are correct
5. Check network tab (F12) for failed requests

---

### Email Issues

#### Issue: "Email not arriving in inbox"
**Solution (Step by Step):**

**Step 1: Verify Credentials**
```bash
# Check these are correct:
Public Key:        pk_live_xxxx...
Service ID:        service_xxx...
Template ID:       template_xxx...
Email recipient:   elitefacesbooking@gmail.com
```

**Step 2: Check EmailJS Dashboard**
1. Go to EmailJS Dashboard
2. Click "Activity" tab
3. Look for your test email
4. Check if it shows "Success" or "Failed"
5. Click on it to see error details

**Step 3: Check Gmail**
1. Log in to Gmail
2. Check Inbox
3. Check Spam folder
4. Check "All Mail" label
5. Check for filter rules that block emails

**Step 4: Verify Gmail Permissions**
1. Check "Less secure app access" is ON
2. Check no security prompts blocking it
3. Try App Password instead

**Step 5: Test with Debug**
1. Open browser console (F12)
2. Submit form
3. Look for error messages
4. Copy error and paste in EmailJS support

#### Issue: "Email arrives but formatting is wrong"
**Solution:**
1. Check template variables are spelled exactly right
2. Verify template content matches what you entered
3. Check no typos in variable names
4. Clear EmailJS cache and edit template
5. Test with simple template first

#### Issue: "Email subject is wrong"
**Solution:**
1. Edit template in EmailJS
2. Update subject line
3. Verify {{variable}} names are correct
4. Save and test again

#### Issue: "Attachments not working"
**Solution:**
```javascript
// EmailJS doesn't support attachments by default
// Option 1: Use EmailJS paid plan features
// Option 2: Send link to file instead
// Option 3: Use different service like SendGrid

// Example: Add file link in message
message: "Your file: https://example.com/file.pdf"
```

---

### Form Validation Issues

#### Issue: "Form not validating required fields"
**Solution:**
```typescript
// Make sure each input has required attribute
<input 
  required                    // Add this
  name="fieldName"           // Add this
  value={formData.fieldName}
  onChange={handleChange}
/>

// And button type is submit
<button type="submit">SUBMIT</button>
```

#### Issue: "Form submits even with empty fields"
**Solution:**
1. Add `required` attribute to all input fields
2. Check form tag has `onSubmit={handleSubmit}`
3. Check handleSubmit has `e.preventDefault()`
4. Verify form validation logic

#### Issue: "Email validation not working"
**Solution:**
```typescript
// HTML5 validation
<input type="email" required />

// Also check in JavaScript
if (!formData.email.includes('@')) {
  setError('Invalid email');
  return;
}
```

---

### Styling & Display Issues

#### Issue: "Pages look different on mobile"
**Solution:**
1. Check responsive classes: `md:`, `lg:`, `sm:`
2. Use browser DevTools (F12) to test responsiveness
3. Check Tailwind CSS is loaded
4. Verify `globals.css` is imported in main.tsx

#### Issue: "Colors look wrong"
**Solution:**
1. Check color names are in Tailwind class list
2. Verify color values in Tailwind config
3. Clear cache: `npm run build` and restart
4. Use color names like `bg-yellow-500`, not custom hex

#### Issue: "Text is too small/large"
**Solution:**
```typescript
// Use Tailwind text classes
<h1 className="text-5xl md:text-6xl">Title</h1>
// text-xs, text-sm, text-base, text-lg, text-xl, etc.

// Or use custom sizes in Tailwind config
// Don't use inline styles
```

---

### Performance Issues

#### Issue: "Website loads slowly"
**Solution:**
1. Check network in DevTools (F12)
2. Minimize images
3. Remove unused dependencies
4. Check for console errors
5. Build and deploy: `npm run build`

#### Issue: "Form submission takes too long"
**Solution:**
1. This is normal if network is slow (1-2 seconds)
2. Check internet connection
3. Check EmailJS dashboard for issues
4. Show loading indicator while waiting

---

### Browser Compatibility Issues

#### Issue: "Doesn't work in Safari"
**Solution:**
1. Check for `const` vs `let` usage
2. Avoid newer JavaScript features
3. Check CSS vendor prefixes
4. Test in Safari to identify specific issue

#### Issue: "Doesn't work in older browsers"
**Solution:**
```bash
# Build for older browsers
npm run build

# Update package.json browserslist
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

---

### Deployment Issues

#### Issue: "Works locally but not on server"
**Solution:**
1. Check `.env` files are set up
2. Verify EmailJS credentials are correct on server
3. Check CORS settings (should be fine with EmailJS)
4. Verify domain name in EmailJS whitelist
5. Check server logs for errors

#### Issue: "Vercel deployment fails"
**Solution:**
1. Check `package.json` dependencies
2. Verify `npm run build` works locally
3. Check environment variables in Vercel settings
4. Review build logs in Vercel dashboard
5. Ensure all imports are correct

#### Issue: "Forms don't work after deploying"
**Solution:**
1. Verify Public Key, Service ID, Template IDs in code
2. Check EmailJS account is still active
3. Verify credentials in deployed code
4. Check browser console for errors
5. Test with EmailJS Activity dashboard

---

### Advanced Debugging

#### Enable Debug Mode
```typescript
// In BookingModal.tsx and ContactUs.tsx
// Add this to see what's happening

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("[DEBUG] Form data:", formData);
  
  try {
    console.log("[DEBUG] Sending email...");
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData
    );
    console.log("[DEBUG] Email sent successfully:", result);
    setSuccess(true);
  } catch (err) {
    console.error("[DEBUG] Email error:", err);
    setError('Failed to send');
  }
};
```

#### Check Network Requests
1. Open DevTools (F12)
2. Go to "Network" tab
3. Submit form
4. Look for request to `api.emailjs.com`
5. Check status (should be 200)
6. Check response for errors

#### Check Browser Console
```javascript
// Common console errors:
"Module not found" → Check imports
"undefined is not a function" → Check function names
"EmailJS is not defined" → Check init is called
"Template not found" → Check template ID
```

---

### Getting Help

If you're still stuck:

1. **Check the docs**
   - QUICK_START.md
   - EMAILJS_SETUP.md
   - SETUP_CHECKLIST.md

2. **Check EmailJS Support**
   - https://support.emailjs.com
   - Check your activity logs

3. **Check browser DevTools**
   - F12 to open
   - Check Console tab
   - Check Network tab
   - Look for error messages

4. **Try simple test first**
   - Create minimal form
   - Test with basic template
   - Add complexity gradually

5. **Check all credentials**
   - Public Key
   - Service ID
   - Template ID (both)
   - Email recipient

---

### Quick Checklist Before Giving Up

```
□ EmailJS account created?
□ Email service added?
□ Templates created (2)?
□ Public Key copied?
□ Service ID copied?
□ Template IDs copied?
□ Code updated with credentials?
□ npm install completed?
□ npm run dev works?
□ Forms render correctly?
□ Browser console clear?
□ Gmail SMTP authenticated?
□ Test email submitted?
□ Check inbox + spam?
□ Check EmailJS Activity log?
```

If all checked, your system should work!

---

### Emergency Reset

If everything is broken, start fresh:

```bash
# 1. Clear everything
rm -rf node_modules package-lock.json

# 2. Reinstall dependencies
npm install

# 3. Recreate EmailJS account
# (Go to emailjs.com)

# 4. Update code with new credentials

# 5. Test
npm run dev
```

You'll be back up and running in 15 minutes!

---

## Still Need Help?

- EmailJS Issues: https://support.emailjs.com
- React Issues: https://react.dev
- Tailwind Issues: https://tailwindcss.com
- Check the documentation files in your project
