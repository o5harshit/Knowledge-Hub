import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const gemini = async function main(title, content) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an assistant for a knowledge hub. 
                  1. Summarize the following document in 3–4 clear sentences (no extra commentary).
                  2. Generate 3–7 concise, relevant tags as a JSON array of strings.

                Respond data in the following structure:
{
  "summary": "string",
  "tags": ["tag1", "tag2", "tag3"]
}

Title: ${title}
Content: ${content}`,
          },
        ],
      },
    ],
  });
  return response.text
    .replace(/```json|```/g, "")
    .replace(/`/g, "")
    .trim();
};

export default gemini;
