
import { GoogleGenAI, Type } from "@google/genai";
import { AiEventPlan } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are the AI Event Concierge for an event vendor marketplace.
The user will describe their event (type, date, size, budget, style, and location). Your job is to act as an “Information Center” and suggest all key services they are likely to need for that event (e.g. DJ, catering, photography, decor, sound & lighting, entertainer, etc.).

For each suggested service, output a structured summary that includes:

A short descriptive title for the service

A 1–2 sentence description of what this service will cover for this event

Location / service area (based on the user’s location or event location)

An estimated average price range in AED (make it realistic and clearly marked as an estimate)

A placeholder vendor name (e.g. “Sample DJ Vendor”) or real vendor name if you’re given vendor data

A rating (e.g. 4.7 / 5)

A suggestion for an appropriate stock image (describe the image, do not generate the URL)

Your output will be displayed in a white information box at the top, and below that the UI will show a list of recommended vendors for each service. At the bottom of the list there will be a “+ Add service” button that lets the user add extra custom services.

Important behavior rules:

Always suggest a complete, minimal set of core services for the event type (not just one vendor).

Keep descriptions clear and simple so non-technical users understand them.

Never promise exact prices; always present them as estimated ranges.

Assume the marketplace is based in Dubai/UAE unless the user clearly states another city.

Do not handle booking or payments; your role is to suggest and explain what the user needs so they can choose vendors from the list below.`;


export const getAiEventPlan = async (prompt: string): Promise<AiEventPlan | null> => {
  if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled.");
    // Mock response for offline development
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                services: [
                    {
                        serviceTitle: "DJ Services",
                        description: "A professional DJ to play music and keep the party atmosphere energetic for your 50 guests.",
                        location: "Dubai, UAE",
                        priceRangeAED: [1200, 4000],
                        vendorName: "Sample DJ Vendor",
                        rating: 4.8,
                        imageSuggestion: "A DJ at a lively party with colorful lights."
                    },
                    {
                        serviceTitle: "Event Catering",
                        description: "Delicious catering to provide food for all attendees, with options for various dietary needs.",
                        location: "Dubai, UAE",
                        priceRangeAED: [5000, 10000],
                        vendorName: "Sample Catering Co.",
                        rating: 4.9,
                        imageSuggestion: "A beautiful buffet spread of food at an event."
                    }
                ]
            });
        }, 1000);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User event description: "${prompt}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            services: {
              type: Type.ARRAY,
              description: "A list of suggested key services for the event.",
              items: {
                type: Type.OBJECT,
                properties: {
                  serviceTitle: { type: Type.STRING, description: "A short descriptive title for the service." },
                  description: { type: Type.STRING, description: "A 1-2 sentence description of what this service will cover." },
                  location: { type: Type.STRING, description: "Location / service area, e.g., 'Dubai, UAE'." },
                  priceRangeAED: { 
                    type: Type.ARRAY, 
                    description: "An estimated average price range in AED, e.g., [1500, 3000].",
                    items: { type: Type.NUMBER }
                  },
                  vendorName: { type: Type.STRING, description: "A placeholder vendor name, e.g., 'Sample DJ Vendor'." },
                  rating: { type: Type.NUMBER, description: "A rating, e.g., 4.7." },
                  imageSuggestion: { type: Type.STRING, description: "A description of an appropriate stock image for this service." }
                },
                required: ["serviceTitle", "description", "location", "priceRangeAED", "vendorName", "rating", "imageSuggestion"]
              }
            }
          },
          required: ["services"]
        },
      },
    });

    const jsonString = response.text.trim();
    const result: AiEventPlan = JSON.parse(jsonString);
    
    return result;

  } catch (error) {
    console.error("Error fetching AI event plan from Gemini API:", error);
    return null;
  }
};
