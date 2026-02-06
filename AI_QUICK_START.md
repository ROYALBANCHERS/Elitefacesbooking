# AI Talent Consultant - Quick Start (5 Minutes)

## TL;DR - Setup in 3 Steps

### Step 1: Get API Key (2 min)
1. Go: https://aistudio.google.com/app/apikeys
2. Click "Create API Key"
3. Copy the key

### Step 2: Add to Environment (2 min)

**For Local Development:**
Create `.env.local` file in project root with:
```
VITE_API_KEY=your_key_here
```

**For Vercel Production:**
- Go to Vercel Dashboard
- Project Settings → Environment Variables
- Add `VITE_API_KEY` with your key

### Step 3: Restart & Test (1 min)
```bash
npm run dev
```
- Open http://localhost:5173
- Scroll to "Talent Consultant"
- Fill form and click "Generate Expert Advice"

---

## What Happens Next?

The AI will:
1. Analyze your campaign requirements
2. Review available celebrities
3. Find the 2 best matches
4. Explain why they're perfect for your campaign
5. Show expected reach and impact

---

## Test Input (Copy & Paste)

Try this to verify it's working:

**Campaign Goal:** Luxury Smartphone Launch

**Target Audience:** Tech-savvy professionals 25-40

**Budget:** Premium

Click "Generate Expert Advice" and watch the magic happen!

---

## Verify It's Working

✅ AI generates response within 5-10 seconds
✅ Shows 2 celebrity recommendations
✅ Includes detailed explanations
✅ Text appears with typing animation
✅ No error messages in console

---

## Troubleshooting Quick Fix

**Not working?**

1. Check API key is correct
2. Restart dev server: `npm run dev`
3. Clear browser cache (Ctrl+Shift+Del)
4. Refresh page

Still having issues? See `AI_TALENT_CONSULTANT_SETUP.md` for detailed help.

---

## What the User Sees

```
🌟 TALENT CONSULTANT

Expert AI Recommendations for Your Campaign

[Form Fields]
Campaign Goal: Luxury Smartphone Launch
Target Audience: Tech-savvy professionals 25-40
Budget Scale: Premium

[GENERATE EXPERT ADVICE Button]

[After clicking...]

AI EXPERT RECOMMENDATION

🌟 Top Recommendation #1: [Celebrity Name]
Why They're Perfect: [explanation...]
Audience Alignment: [explanation...]
Expected Impact: [explanation...]

🌟 Recommendation #2: [Celebrity Name]
[Same format...]

Pro Tip: This recommendation is based on campaign requirements...
```

---

## Features Included

- ✅ Real-time AI recommendations
- ✅ Type-writer animation effect
- ✅ Error handling and helpful messages
- ✅ Form validation
- ✅ Mobile responsive
- ✅ Professional formatting
- ✅ Auto-detects missing API key

---

## API Key Locations

Check your API key was added to correct place:

**Local (.env.local):**
```
VITE_API_KEY=sk_test_abc123xyz...
```

**Vercel Dashboard:**
Settings → Environment Variables → VITE_API_KEY

**Alternative (for process.env):**
Settings → Environment Variables → API_KEY

---

## Need More Help?

- **Setup Issues?** → `AI_TALENT_CONSULTANT_SETUP.md`
- **Not Working?** → `TROUBLESHOOTING.md`
- **Want Details?** → `AI_TALENT_CONSULTANT_SETUP.md` (Advanced section)
- **Error Messages?** → `TROUBLESHOOTING.md` (Error Solutions)

---

**You're all set! The AI Talent Consultant is now active and ready to provide expert recommendations!** 🚀
