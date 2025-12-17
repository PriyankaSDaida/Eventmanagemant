import { GoogleGenAI } from "@google/genai";

// Initialize the client conditionally
const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn("Gemini API Key not found. Running in MOCK mode.");
}

export interface AIEventContent {
  description: string;
  tags: string[];
  agenda: { time: string; activity: string }[];
}

// Mock Data Generators to simulate AI creativity
const MOCK_ADJECTIVES = ["Groundbreaking", "Immersive", "Exclusive", "Transformative", "Global", "Next-Gen"];
const MOCK_TOPICS = ["Innovation", "Future Trends", "Networking", "Hands-on Workshops", "Keynote Speeches"];

const generateMockResponse = (title: string, notes: string): AIEventContent => {
  const isTech = title.toLowerCase().includes('tech') || title.toLowerCase().includes('code') || title.toLowerCase().includes('summit') || notes.toLowerCase().includes('tech');
  const isMusic = title.toLowerCase().includes('concert') || title.toLowerCase().includes('music') || title.toLowerCase().includes('festival') || notes.toLowerCase().includes('music');

  let description = "";
  let tags = [];
  let agenda = [];

  if (isTech) {
    description = `Join us for ${title}, a ${MOCK_ADJECTIVES[Math.floor(Math.random() * MOCK_ADJECTIVES.length)]} technology experience designed for developers, innovators, and visionaries. 

    Over the course of this event, you will dive deep into the latest advancements in AI, Cloud Computing, and Web3. Connect with industry leaders, participate in interactive coding sessions, and discover tools that will shape the future. Whether you are a startup founder or a senior engineer, this is the place to be.`;

    tags = ["Technology", "Innovation", "Networking", "AI", "Future"];
    agenda = [
      { time: "09:00 AM", activity: "Opening Keynote: The Future of Code" },
      { time: "11:00 AM", activity: "Workshop: Building Scalable Systems" },
      { time: "01:00 PM", activity: "Networking Lunch" },
      { time: "03:00 PM", activity: "Panel: AI Ethics & Safety" }
    ];
  } else if (isMusic) {
    description = `Get ready to lose yourself in the music at ${title}! This isn't just a concert; it's a sonic journey featuring world-class artists, mesmerizing light shows, and an energy you have to feeel to believe.
     
     Experience a curated lineup of genres ranging from indie rock to electronic beats. Located in an iconic venue with state-of-the-art sound systems, prepare for a night of dancing, connection, and pure euphoria.`;
    tags = ["Music", "Live Performance", "Festival", "Nightlife"];
    agenda = [
      { time: "06:00 PM", activity: "Doors Open & Pre-Show Mixer" },
      { time: "07:30 PM", activity: "Opening Act: The Rising Stars" },
      { time: "09:00 PM", activity: "Headliner Performance" },
      { time: "11:30 PM", activity: "After Party with DJ Pulse" }
    ];
  } else {
    description = `Welcome to ${title}, a premier gathering for enthusiasts and professionals alike. This event brings together the best minds and most passionate spirits for a day of learning, sharing, and growth.
     
     Expect engaging discussions, hands-on demonstrations, and opportunities to meet like-minded individuals. We’ve curated an environment that fosters creativity and collaboration. Don't miss this opportunity to be part of something special.`;
    tags = ["Community", "Gathering", "Lifestyle", "Education"];
    agenda = [
      { time: "10:00 AM", activity: "Welcome & Introduction" },
      { time: "10:30 AM", activity: "Session 1: Core Concepts" },
      { time: "12:30 PM", activity: "Community Lunch" },
      { time: "02:00 PM", activity: "Interactive Breakout Rooms" }
    ];
  }

  return { description, tags, agenda };
};

export const generateEventMetadata = async (
  title: string,
  notes: string,
  date: string,
  location: string
): Promise<AIEventContent> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 2000));

  if (!ai) {
    return generateMockResponse(title, notes);
  }

  try {
    const prompt = `
      Create detailed event content for an event titled "${title}".
      Context notes: ${notes}
      Date: ${date}
      Location: ${location}

      Return a JSON object with:
      1. description: A compelling marketing description (2-3 paragraphs)
      2. tags: 3-5 relevant category tags
      3. agenda: Array of 3-5 items with 'time' and 'activity'
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            description: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            agenda: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  time: { type: "string" },
                  activity: { type: "string" }
                },
                required: ["time", "activity"]
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
