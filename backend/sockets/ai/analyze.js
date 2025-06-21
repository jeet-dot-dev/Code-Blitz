import { client } from "./openai.js";

const analyzeBattle = async (openAiData) => {
  const { codeSubmit, questionInfo } = openAiData;
  
  // Ensure we have exactly 2 players
  if (!Array.isArray(codeSubmit) || codeSubmit.length !== 2) {
    throw new Error("Battle analysis requires exactly 2 player submissions");
  }
  
  const [player1, player2] = codeSubmit;
  
  const prompt = `
You are an expert code reviewer and algorithm analyst conducting a coding battle analysis. Compare and evaluate both players' code submissions against the given questions.

BATTLE PARTICIPANTS:
**Player 1**: ${player1.playerName} (ID: ${player1.playerId})
- Language: ${player1.language}
- Code:
${player1.code}

**Player 2**: ${player2.playerName} (ID: ${player2.playerId})
- Language: ${player2.language}
- Code:
${player2.code}

QUESTIONS CONTEXT:
- Topic: ${questionInfo.topic}
- Difficulty: ${questionInfo.difficulty}
- Questions: ${JSON.stringify(questionInfo.questions, null, 2)}

EVALUATION CRITERIA:
1. **Correctness**: Does the code solve the problem correctly? (0-40 points)
2. **Time Complexity**: Big O time complexity analysis (0-20 points)
3. **Space Complexity**: Big O space complexity analysis (0-15 points)
4. **Code Quality**: Readability, structure, best practices (0-15 points)
5. **Edge Case Handling**: How well does it handle edge cases? (0-10 points)

IMPORTANT: Compare both solutions directly and provide detailed analysis for each player. Consider:
- Which solution is more efficient?
- Which handles edge cases better?
- Which has better code quality?
- Which is more optimized?

Return your analysis in this exact JSON format:
{
  "battleResult": {
    "player1": {
      "playerId": "${player1.playerId}",
      "playerName": "${player1.playerName}",
      "evaluation": {
        "correctness": {
          "score": <0-40>,
          "feedback": "<detailed feedback>"
        },
        "timeComplexity": {
          "score": <0-20>,
          "analysis": "<Big O analysis>",
          "feedback": "<explanation>"
        },
        "spaceComplexity": {
          "score": <0-15>,
          "analysis": "<Big O analysis>",
          "feedback": "<explanation>"
        },
        "codeQuality": {
          "score": <0-15>,
          "feedback": "<readability and structure feedback>"
        },
        "edgeCases": {
          "score": <0-10>,
          "feedback": "<edge case handling analysis>"
        }
      },
      "totalScore": <sum of all scores>,
      "grade": "<A+/A/B+/B/C+/C/D/F>",
      "overallFeedback": "<comprehensive summary>",
      "suggestions": ["<improvement suggestion 1>", "<improvement suggestion 2>"]
    },
    "player2": {
      "playerId": "${player2.playerId}",
      "playerName": "${player2.playerName}",
      "evaluation": {
        "correctness": {
          "score": <0-40>,
          "feedback": "<detailed feedback>"
        },
        "timeComplexity": {
          "score": <0-20>,
          "analysis": "<Big O analysis>",
          "feedback": "<explanation>"
        },
        "spaceComplexity": {
          "score": <0-15>,
          "analysis": "<Big O analysis>",
          "feedback": "<explanation>"
        },
        "codeQuality": {
          "score": <0-15>,
          "feedback": "<readability and structure feedback>"
        },
        "edgeCases": {
          "score": <0-10>,
          "feedback": "<edge case handling analysis>"
        }
      },
      "totalScore": <sum of all scores>,
      "grade": "<A+/A/B+/B/C+/C/D/F>",
      "overallFeedback": "<comprehensive summary>",
      "suggestions": ["<improvement suggestion 1>", "<improvement suggestion 2>"]
    },
    "comparison": {
      "winner": "<player1/player2/tie>",
      "winnerName": "<winner's name or 'Tie'>",
      "scoreDifference": <absolute difference in scores>,
      "battleSummary": "<detailed comparison of both solutions>",
      "keyDifferences": ["<difference 1>", "<difference 2>", "<difference 3>"]
    }
  }
}

Be thorough, fair, and constructive in your evaluation. Compare both solutions directly and explain why one might be better than the other.
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4", // Using GPT-4 for more accurate code analysis
      messages: [
        {
          role: "system",
          content: "You are an expert programming instructor and code reviewer conducting coding battles. You have deep knowledge of algorithms, data structures, and software engineering best practices."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3 // Lower temperature for more consistent evaluations
    });

    let raw = response.choices[0].message.content;
    raw = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(raw);

    //console.log(result);
    
    // console.log("=== CODING BATTLE RESULTS ===");
    // console.log(`Player 1: ${result.battleResult.player1.playerName} - Score: ${result.battleResult.player1.totalScore}/100`);
    // console.log(`Player 2: ${result.battleResult.player2.playerName} - Score: ${result.battleResult.player2.totalScore}/100`);
    // console.log(`Winner: ${result.battleResult.comparison.winnerName}`);
    // console.log(`Score Difference: ${result.battleResult.comparison.scoreDifference}`);
    
    return result;
  } catch (error) {
    console.error("Failed to analyze battle:", error);
    console.log("Raw response:", response.choices[0].message.content);
    throw new Error("AI battle analysis failed");
  }
};

export default analyzeBattle ;