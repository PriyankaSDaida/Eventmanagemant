import { GoogleGenAI, Type } from "@google/genai";
import { AgendaItem } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

interface AIEventContent {
  description: string;
  tags: string[];
  agenda: {
    time: string;
    title: string;
    speaker: string;
    description: string;
  }[];
}

export const generateEventMetadata = async (
  title: string,
  notes: string,
  date: string,
  location: string
): Promise<AIEventContent> => {
  try {
    const prompt = `
      Create detailed event content for an event titled "${title}".
      Event Date: ${date}
      Location: ${location}
      User Notes: ${notes}

      Please generate:
      1. A compelling marketing description (approx 100 words).
      2. A list of 3-5 relevant tags.
      3. A suggested agenda with 3-5 items.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "Compelling marketing copy for the event.",
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Relevant tags for the event category.",
            },
            agenda: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "Time of the agenda item (e.g., 10:00 AM)" },
                  title: { type: Type.STRING, description: "Title of the session" },
                  speaker: { type: Type.STRING, description: "Suggested speaker or role" },
                  description: { type: Type.STRING, description: "Brief description of the session" }
                },
                required: ["time", "title", "description"]
              }
            }
          },
          required: ["description", "tags", "agenda"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as AIEventContent;

  } catch (error) {
    console.error("Error generating event content:", error);
    // Fallback in case of error
    return {
      description: "Join us for this exciting event! Detailed description coming soon.",
      tags: ["Event", "Gathering"],
      agenda: []
    };
  }
};
