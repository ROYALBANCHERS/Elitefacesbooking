
import { GoogleGenAI } from "@google/genai";
import { CELEBRITIES } from "../constants";
import { RecommendationRequest } from "../types";

export const getTalentRecommendations = async (request: RecommendationRequest) => {
  try {
    // Check if API key is available
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn('[v0] API_KEY not set in environment variables');
      return `⚠️ **Setup Required**\n\nThe AI Talent Consultant needs a Google Gemini API key to generate recommendations.\n\n**Steps to activate:**\n1. Visit https://aistudio.google.com/app/apikeys\n2. Create a new API key\n3. Add it to your environment variables as \`API_KEY\`\n4. Restart your development server\n\nOnce configured, I'll provide expert talent recommendations based on your campaign needs.`;
    }

    // Initialize AI client with the API key
    const ai = new GoogleGenAI({ apiKey });
    const model = "gemini-1.5-flash";
    
    const celebritiesContext = CELEBRITIES.map(c => 
      `• ${c.name} (${c.category}): ${c.bio}. Expertise: ${c.expertise.join(', ')}. Price: ${c.priceRange}. Followers: ${c.followers}. Rating: ${c.rating}/5`
    ).join('\n');

    const prompt = `You are a world-class Talent Acquisition Consultant for EliteFacesBooking, a premium celebrity booking platform.

Available Talent:
${celebritiesContext}

Client Requirements:
- Campaign Goal: ${request.brandGoal}
- Target Audience: ${request.targetAudience}
- Budget Level: ${request.budget}

Your Task:
1. Analyze the client's requirements carefully
2. Recommend the TOP 2 celebrity matches from the available talent
3. For each recommendation, provide:
   - Why they are perfect for this campaign
   - How they align with the target audience
   - Expected impact and reach
   - Any special considerations for this collaboration

Format your response professionally with clear sections. Be persuasive but honest about the fit. Keep the tone luxurious and professional.`;

    console.log('[v0] Calling Gemini API with model:', model);
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2000
      }
    });

    // Handle response
    if (!response) {
      throw new Error('No response from Gemini API');
    }

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    console.log('[v0] Successfully received AI response');
    return text;
    
  } catch (error) {
    console.error('[v0] Gemini API Error:', error);
    
    let errorMessage = 'Unable to generate AI recommendations at this moment.';
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'API key error. Please check your API_KEY environment variable.';
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }
    }
    
    return `❌ **AI Service Error**\n\n${errorMessage}\n\n**Troubleshooting:**\n- Verify your API_KEY is set correctly\n- Check your internet connection\n- Try again in a few moments\n\nFor more help, see TROUBLESHOOTING.md`;
  }
};
