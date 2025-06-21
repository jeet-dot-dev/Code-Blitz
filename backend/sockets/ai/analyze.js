import { client } from "./openai.js";

const analyzeBattle = async (openAiData) => {
  const { codeSubmit, questionInfo } = openAiData;

  if (!Array.isArray(codeSubmit) || codeSubmit.length !== 2) {
    throw new Error("Battle analysis requires exactly 2 player submissions");
  }

  const [player1, player2] = codeSubmit;

  const prompt = `
You are an expert code reviewer and algorithm analyst. Your task is to compare two code submissions fairly and return your evaluation STRICTLY in JSON format.

BATTLE PARTICIPANTS:
**Player 1**: ${player1.playerName} (ID: ${player1.playerId})
Language: ${player1.language}
Code:
${player1.code}

**Player 2**: ${player2.playerName} (ID: ${player2.playerId})
Language: ${player2.language}
Code:
${player2.code}

QUESTION:
Topic: ${questionInfo.topic}
Difficulty: ${questionInfo.difficulty}
${JSON.stringify(questionInfo.questions, null, 2)}

SCORING:
- Correctness (0-40)
- Time Complexity (0-20)
- Space Complexity (0-15)
- Code Quality (0-15)
- Edge Cases (0-10)

IMPORTANT:
✅ Return ONLY a valid JSON object.
✅ NO explanations outside the JSON.
✅ DO NOT write: "Here is the JSON", "I'm sorry", or anything else.
✅ Make sure JSON is parseable — no comments, no extra text.

FORMAT:
{
  "battleResult": {
    "player1": {
      "playerId": "${player1.playerId}",
      "playerName": "${player1.playerName}",
      "evaluation": {
        "correctness": { "score": <0-40>, "feedback": "<feedback>" },
        "timeComplexity": { "score": <0-20>, "analysis": "<Big O>", "feedback": "<feedback>" },
        "spaceComplexity": { "score": <0-15>, "analysis": "<Big O>", "feedback": "<feedback>" },
        "codeQuality": { "score": <0-15>, "feedback": "<feedback>" },
        "edgeCases": { "score": <0-10>, "feedback": "<feedback>" }
      },
      "totalScore": <sum>,
      "grade": "<A+/A/B+/B/C+/C/D/F>",
      "overallFeedback": "<summary>",
      "suggestions": ["<suggestion 1>", "<suggestion 2>"]
    },
    "player2": { ... same structure ... },
    "comparison": {
      "winner": "<player1/player2/tie>",
      "winnerName": "<name or 'Tie'>",
      "scoreDifference": <difference>,
      "battleSummary": "<summary>",
      "keyDifferences": ["<diff 1>", "<diff 2>", "<diff 3>"]
    }
  }
}
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert code reviewer and grader. Always respond with clean, valid JSON. Never include natural language text outside the JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    });

    let raw = response.choices[0].message.content;
    raw = raw.replace(/```json|```/g, "").trim();

    try {
      const result = JSON.parse(raw);
      return result;
    } catch (parseErr) {
      console.error("❌ JSON parse error:", parseErr.message);
      console.log("⚠ Raw response from AI:", raw);
      throw new Error("AI returned malformed JSON");
    }
  } catch (err) {
    console.error("❌ Failed to analyze battle:", err);
    throw new Error("AI battle analysis failed");
  }
};

export default analyzeBattle;
