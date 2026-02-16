import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getGenAIAPIResponse = async (userMessage) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    });

    return response.text;
  } catch (error) {
    console.error("GenAI Error:", error.message);
    return "AI service unavailable.";
  }
};

export default getGenAIAPIResponse;
