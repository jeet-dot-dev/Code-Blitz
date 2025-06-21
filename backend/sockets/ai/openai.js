import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
 })

const getQuestionsFromOpenAI = async (topic, difficulty) => {
  const prompt = `
You are a professional problem setter for coding interviews. Generate one unique coding question based on the following criteria:

- Topic: ${topic}
- Difficulty: ${difficulty}
- Each question should have:
  1️⃣ A clear problem statement
  2️⃣ Example input/output
  3️⃣ Constraints if needed

⚠ Return ONLY valid JSON, no explanations, no text before or after the JSON.

The output must follow this format exactly:
{
  "questions": [
    {
      "title": "<short title>",
      "description": "<full problem statement>",
      "exampleInput": "<example input>",
      "exampleOutput": "<example output>"
    }
  ],
  "estimatedTime": <integer value in minutes>
}

💡 The estimatedTime must be a single integer (e.g., 10, 20, 30) based on difficulty:
easy = 10, medium = 20, hard = 30.
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for generating programming questions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    let raw = response.choices[0].message.content;
    
    // Remove code fences if they exist
    raw = raw.replace(/```json|```/g, "").trim();

    // Optional: Remove accidental explanation lines (just in case)
    raw = raw.split('\n').filter(line => {
      return !line.toLowerCase().startsWith("explanation") &&
             !line.toLowerCase().startsWith("output");
    }).join('\n');

    const result = JSON.parse(raw);

    console.log("✅ Generated questions:", JSON.stringify(result.questions, null, 2));
    console.log("✅ Estimated completion time (min):", result.estimatedTime);

    return result;

  } catch (error) {
    console.error("❌ Failed to parse or fetch question:", error);
    console.log("🔹 Raw response:\n", response?.choices?.[0]?.message?.content || "No content");
    throw new Error("OpenAI returned invalid or malformed JSON");
  }
};

export default getQuestionsFromOpenAI;

// Example usage
 //getQuestionsFromOpenAI("Array", "hard");
