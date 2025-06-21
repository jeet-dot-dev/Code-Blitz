import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//console.log(process.env.OPENAI_API_KEY);

const getQuestionsFromOpenAI = async (topic, difficulty) => {
  const prompt = `
You are a professional problem setter for coding interviews. Generate one coding questions based on the following criteria:

- Topic: ${topic}
- Difficulty: ${difficulty}
- Each question should have:
  1. A clear problem statement
  2. Example input/output
  3. Constraints if needed

Also provide an estimated total completion time for all questions based on their difficulty level.

Output format (as a JSON object):
{
  "questions": [
    {
      "title": "<short title>",
      "description": "<full problem statement>",
      "exampleInput": "<example input>",
      "exampleOutput": "<example output>"
    },
    ...
  ],
  "estimatedTime": "<time in minutes (e.g., '30 min', '45 min')>"
}

Make sure the problems are unique and clear. Estimate time based on difficulty: easy (10-15 min per question), medium (20-25 min per question), hard (30-40 min per question).
`;

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo", // ✅ switched to 3.5
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant for generating programming questions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  try {
    let raw = response.choices[0].message.content;
    raw = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(raw);
    console.log("Generated questions:", result.questions);
    console.log("Estimated completion time:", result.estimatedTime);
    return result;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    console.log("Raw response:", response.choices[0].message.content);
    throw new Error("OpenAI returned malformed JSON");
  }
};

//getQuestionsFromOpenAI("Array","2","easy");

export default getQuestionsFromOpenAI;
