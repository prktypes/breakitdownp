import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDdUxXcdUaMrNy3k_dU9eeL8Nc1V0DJKms");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function run() {
  let subject = "Physics";
  let topic = "Work Energy Power";
  let additionalReq = "Explain Power";
  const prompt = `Generate structured learning content in JSON format for the topic: ${topic} from the subject ${subject} , explain this especially ${additionalReq}. The format should include teaching segments, followed by interactive questions. Each teaching segment should explain concepts in a simple and engaging way, using real-life analogies. After every 5 minutes of learning content, include 1-2 interactive questions to reinforce the concept. The response should be JSON structured as follows: {"topic": "[TOPIC]", "sections": [{"type": "teaching", "content": "Explain the first part of the topic here..."}, {"type": "teaching", "content": "Continue explaining with more details..."}, {"type": "question", "question": "What is [CONCEPT]?", "options": ["Option A", "Option B", "Option C", "Option D"], "answer": "Option B"}, {"type": "teaching", "content": "Now, move to the next concept..."}], "upcoming_topics": ["Related Topic 1", "Related Topic 2"]}. Ensure that the response is concise but effective for micro-learning (for example only 15-20 words for a single segment). Use clear, beginner-friendly explanations while keeping it engaging and interactive.`;
  const result = await model.generateContent(prompt);
  console.log(await result.response.text());
}

run().catch(console.error);
