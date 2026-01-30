
import { GoogleGenAI } from "@google/genai";
import { CELEBRITIES } from "../constants";
import { RecommendationRequest } from "../types";

export const getTalentRecommendations = async (request: RecommendationRequest) => {
  // Initialize AI client inside the function to ensure the most up-to-date API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const celebritiesContext = CELEBRITIES.map(c => 
    `${c.name} (${c.category}): Expertise in ${c.expertise.join(', ')}. Price range ${c.priceRange}. Followers: ${c.followers}.`
  ).join('\n');

  const prompt = `
    You are an expert Talent Acquisition Consultant for EliteFacesBooking, a premium celebrity management firm.
    
    Context of Talent available:
    ${celebritiesContext}
    
    User Requirement:
    - Brand Goal: ${request.brandGoal}
    - Target Audience: ${request.targetAudience}
    - Budget Level: ${request.budget}
    
    Task:
    Recommend the 2 best matches from the list above. Explain why they are a good fit for this specific brand goal and target audience. 
    Keep the tone professional, persuasive, and luxurious.
    Format your response in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
      }
    });

    // Directly access the .text property of the GenerateContentResponse object
    return response.text || "I am unable to provide recommendations at the moment. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI consultant. Please check your connection.";
  }
};
