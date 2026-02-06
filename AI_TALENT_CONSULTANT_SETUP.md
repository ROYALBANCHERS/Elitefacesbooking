# AI Talent Consultant Setup Guide

## Overview

The AI Talent Consultant is a powerful feature that uses Google's Gemini AI to provide expert recommendations for celebrity talent based on a client's campaign requirements. This guide will walk you through setting it up.

---

## What It Does

When users visit the "Talent Consultant" section and fill in:
- Campaign Goal (what they're promoting)
- Target Audience (who they want to reach)
- Budget Level (premium, medium, or entry)

The AI will analyze the available talent database and recommend the 2 best celebrity matches with detailed explanations of why they're perfect for the campaign.

---

## Feature Benefits

✅ Instant expert recommendations
✅ Personalized based on campaign details
✅ Professional, persuasive explanations
✅ Considers audience alignment
✅ Budget-aware suggestions
✅ Increases conversion rates

---

## Setup Steps (5 Minutes)

### Step 1: Get Your Google Gemini API Key

1. **Go to Google AI Studio:**
   - Visit: https://aistudio.google.com/app/apikeys
   - Sign in with your Google account

2. **Create an API Key:**
   - Click "Create API Key"
   - Select "Create API key in new project"
   - Copy the generated API key

3. **Save the Key:**
   - Keep this key safe
   - You'll add it to your environment variables next

### Step 2: Add API Key to Environment Variables

The app needs to read your API key from environment variables.

#### Option A: Local Development (For Testing)

1. **Create .env.local file** in the project root:
   ```
   /vercel/share/v0-project/.env.local
   ```

2. **Add this line:**
   ```
   VITE_API_KEY=your_api_key_here
   ```

3. **Replace** `your_api_key_here` with your actual API key

4. **Restart your dev server:**
   ```bash
   npm run dev
   ```

#### Option B: Production Deployment (For Vercel)

1. **Go to Vercel Project Settings:**
   - Open: https://vercel.com/dashboard

2. **Navigate to Environment Variables:**
   - Project Settings → Environment Variables

3. **Add New Variable:**
   - Name: `VITE_API_KEY`
   - Value: Your Google Gemini API key

4. **Redeploy:**
   - Push to GitHub or redeploy from Vercel dashboard

#### Option C: Using process.env (Current Setup)

The app is currently configured to use `process.env.API_KEY`. If deploying to Vercel:

1. Set environment variable as `API_KEY` (without VITE_ prefix)
2. The app will automatically read it

---

## How It Works

### User Flow

1. **User visits Talent Consultant section**
2. **User fills in form:**
   - Campaign Goal: "Luxury Watch Launch"
   - Target Audience: "High-net-worth individuals"
   - Budget: "Premium"
3. **User clicks "Generate Expert Advice"**
4. **AI processes the request:**
   - Analyzes available talent
   - Matches expertise with requirements
   - Considers audience alignment
   - Evaluates budget fit
5. **AI returns recommendations:**
   - Displays top 2 matching celebrities
   - Explains why each is suitable
   - Suggests collaboration potential
   - Shows expected reach/impact

### Response Format

The AI returns a formatted recommendation including:

```
🌟 Top Recommendation #1: [Celebrity Name]
- Why They're Perfect: [Explanation]
- Audience Alignment: [How they match target audience]
- Expected Impact: [Reach and engagement]
- Special Considerations: [Any notes]

🌟 Recommendation #2: [Celebrity Name]
- [Same format as above]

📋 Summary: [Overall strategy suggestion]
```

---

## Error Messages & Solutions

### Error: "API key is missing"

**Solution:**
1. Go to https://aistudio.google.com/app/apikeys
2. Create a new API key if you haven't already
3. Add it to environment variables as shown above

### Error: "Rate limit exceeded"

**Solution:**
- The Gemini API has usage limits on free tier
- Wait a few minutes and try again
- Upgrade to a paid plan for higher limits

### Error: "Network error"

**Solution:**
- Check your internet connection
- Make sure the API key is correct
- Verify Gemini API is accessible in your region

### Error: "Invalid API key"

**Solution:**
- Go back to Google AI Studio
- Generate a new API key
- Update your environment variable
- Restart your development server

---

## Available Models

The app uses: **`gemini-1.5-flash`**

This model is:
- ⚡ Fast for recommendations
- 💰 Cost-effective
- 🎯 Perfect for talent matching
- 📈 Good context understanding

---

## Customization Options

### Change AI Model

Edit `/vercel/share/v0-project/services/geminiService.ts`:

```typescript
const model = "gemini-1.5-pro"; // For more detailed responses
// or
const model = "gemini-2.0-flash"; // For faster responses
```

### Adjust Recommendation Count

Change this line in the prompt:
```typescript
Recommend the TOP 2 celebrity matches...
// Change to:
Recommend the TOP 3 celebrity matches...
```

### Customize Tone

Edit the prompt section to change the AI's personality:
```typescript
// Current: Professional and luxury-focused
// You can change to: More casual, more technical, etc.
```

### Modify Temperature Settings

Lower = More consistent
Higher = More creative

```typescript
temperature: 0.7, // Current setting
// Range: 0.0 to 1.0
```

---

## Testing the AI Consultant

### Local Testing

1. Start development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173

3. Scroll to "Talent Consultant" section

4. Try these test inputs:
   - **Goal:** "Sports Energy Drink Launch"
   - **Audience:** "Gen Z Athletes"
   - **Budget:** "Medium"

5. Click "Generate Expert Advice"

6. Watch the AI provide recommendations

### Expected Results

✅ Response generates within 5-10 seconds
✅ Shows 2 celebrity recommendations
✅ Includes detailed explanations
✅ Text animates with typewriter effect
✅ Displays success message

---

## API Limits & Costs

### Free Tier (Google Cloud)
- **Requests per minute:** 100
- **Daily limit:** 10,000
- **Cost:** Free

### Pricing
- **Input tokens:** $0.075 per 1M tokens
- **Output tokens:** $0.30 per 1M tokens

For most use cases, you'll stay within the free tier.

---

## Troubleshooting Checklist

- [ ] API key is created in Google AI Studio
- [ ] API key is added to environment variables correctly
- [ ] Development server has been restarted
- [ ] Browser has been refreshed
- [ ] No typos in the API key
- [ ] Environment variable name matches (`API_KEY` or `VITE_API_KEY`)
- [ ] All required fields are filled in the form
- [ ] Internet connection is stable
- [ ] Google Gemini API is accessible in your region

---

## How the AI Selects Celebrities

The AI considers:

1. **Expertise Match**
   - Does their background match the campaign?
   - Are their skills relevant?

2. **Audience Alignment**
   - Does their follower base match target audience?
   - Are their values aligned?

3. **Budget Fit**
   - Premium tier = Most expensive, biggest names
   - Medium tier = Mid-range influencers
   - Entry tier = Emerging talent, digital natives

4. **Rating & Performance**
   - Previous campaign success
   - Audience engagement rates
   - Professional reliability

5. **Category Specialization**
   - Fashion, Sports, Music, etc.
   - Niche expertise
   - Industry experience

---

## Best Practices

### For Users

✅ Be specific about campaign goals
✅ Clearly describe target audience
✅ Choose realistic budget level
✅ Read through recommendations carefully
✅ Check individual celebrity profiles for more details

### For Admins

✅ Keep API key confidential
✅ Monitor API usage
✅ Update celebrities in constants.ts for better recommendations
✅ Test recommendations periodically
✅ Update AI prompt if campaign types change

---

## Integration with Other Features

The AI Talent Consultant integrates with:

1. **Celebrity Database** (`constants.ts`)
   - Reads current available celebrities
   - Uses their expertise and pricing

2. **Booking System**
   - Users can book recommended celebrities
   - Links to celebrity detail pages

3. **Contact Form**
   - Users can ask about recommended celebrities
   - Request more information

---

## Advanced Configuration

### Custom Recommendation Criteria

Edit the prompt in `geminiService.ts` to add:
- Specific industry requirements
- Geographic preferences
- Language requirements
- Availability windows
- Specific campaign types

### Performance Optimization

For faster responses, reduce:
- `maxOutputTokens`: 2000 → 1000
- `temperature`: 0.7 → 0.5

For more creative responses:
- `temperature`: 0.7 → 0.9
- `topP`: 0.95 → 0.99

---

## Need Help?

### Common Issues

**Issue:** Recommendations are not relevant
- **Solution:** Be more specific in campaign goal
- Make sure celebrity database is up to date

**Issue:** Response is too slow
- **Solution:** Reduce maxOutputTokens
- Use gemini-1.5-flash instead of pro version

**Issue:** Same recommendations every time
- **Solution:** Increase temperature setting
- Vary your input descriptions

---

## Security Notes

⚠️ **Important:**
- Never share your API key publicly
- Don't commit .env files to Git
- Use environment variables for production
- Rotate API keys periodically
- Monitor for suspicious usage

---

## Monitoring & Analytics

Track AI feature usage:

```typescript
// Add analytics tracking in AIAssistant.tsx
const handleSubmit = async (e: React.FormEvent) => {
  // Log analytics
  console.log('AI recommendation requested:', formData);
  // Rest of code...
}
```

---

## Future Enhancements

Potential improvements:

1. **Caching:** Store frequent recommendations
2. **A/B Testing:** Test different AI prompts
3. **User Feedback:** Rate recommendations
4. **Analytics:** Track which recommendations convert
5. **Multi-Language:** Support different languages
6. **Advanced Filters:** More specific criteria
7. **Comparison View:** Compare multiple celebrities
8. **History:** Save past recommendations

---

## Support & Resources

- **Google AI Documentation:** https://ai.google.dev/
- **Gemini API Reference:** https://ai.google.dev/api/rest/google.ai.generativelanguage.v1beta/projects.locations.endpoints/streamGenerateContent
- **Project Documentation:** See README files in project root
- **Troubleshooting:** See TROUBLESHOOTING.md

---

## Version Info

- **Last Updated:** 2024
- **AI Model:** Gemini 1.5 Flash
- **Package:** @google/genai ^1.38.0
- **Status:** Production Ready

---

**Your AI Talent Consultant is now ready to provide expert recommendations!**
