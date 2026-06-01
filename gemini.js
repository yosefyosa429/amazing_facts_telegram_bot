import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

export async function generateFact(topic) {
  try {
    const result = await model.generateContent(topic.prompt);
    const text = result.response.text().trim();
    return text;
  } catch (err) {
    console.error("❌ Gemini ስህተት:", err.message);
    return null;
  }
}

export function formatPost(fact, topic) {
  return `${topic.emoji} *አስደናቂ እውነታ — ${topic.name}*\n\n${fact}\n\n${topic.hashtags}`;
}
