import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// NOTE: In a production app, the API key should be proxyed through a backend.
// For this frontend-only demo, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateHerbalAdvice = async (
  query: string,
  products: Product[]
): Promise<string> => {
  if (!ai) {
    return "I apologize, but I am currently disconnected from the herbal knowledge base (API Key missing). Please check the products manually.";
  }

  // Create a context string about available products to help the AI recommend
  const productContext = products.map(p => 
    `- ${p.name} (${p.category}): ${p.description} Benefits: ${p.benefits.join(', ')}`
  ).join('\n');

  const systemInstruction = `
    You are "Sage", a wise and warm AI Herbalist for "Terra Mater Apothecary".
    Your goal is to help customers find the right natural products from our inventory.
    
    Style Guide:
    - Tone: Warm, earthy, professional, empathetic, and slightly poetic.
    - Perspective: Modern Apothecary. You bridge ancient wisdom with modern needs.
    - Do not give medical advice. Always use phrases like "traditionally used for" or "may support".
    - Keep responses concise (under 100 words) unless asked for a detailed regimen.

    Inventory Context:
    ${productContext}

    If the user asks about something we don't carry, suggest a general natural remedy but politely mention we don't stock it yet.
    Always try to recommend a specific product from the list above if it fits.
  `;

  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having a little trouble consulting my notes right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the herbal network. Please try again later.";
  }
};
