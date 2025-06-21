import React, { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Result = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [battleResult, setBattleResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("result", (data) => {
      console.log(data);
      setBattleResult(data.battleResult);
      setIsLoading(false);
    });
    return () => {
      socket.off("result");
    };
  }, [socket]);

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'text-green-400';
      case 'B': return 'text-blue-400';
      case 'C': return 'text-yellow-400';
      case 'D': return 'text-orange-400';
      case 'F': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getWinnerColor = (winner) => {
    if (winner === 'tie') return 'text-yellow-400';
    return 'text-green-400';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C0D0D] text-white font-press flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading Results...</div>
      </div>
    );
  }

  if (!battleResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white font-press flex items-center justify-center">
        <div className="text-red-400 text-xl">No results available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white font-press">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">BATTLE RESULTS</h1>
          <div className={`text-2xl flex items-center justify-center ${getWinnerColor(battleResult.comparison.winner)}`}>
            <img className="w-10 h-10 mr-2" src="https://img.icons8.com/color-pixels/2x/trophy.png" alt="Trophy" />
            Winner:{battleResult.comparison.winnerName}
          </div>
          <p className="text-gray-300 mt-2 text-sm max-w-2xl mx-auto">
            {battleResult.comparison.battleSummary}
          </p>
        </div>

        {/* Players Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Player 1 */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <img 
                className="w-12 h-12 mr-3" 
                src="https://img.icons8.com/color-pixels/2x/batman.png" 
                alt="Player 1"
              />
              <div>
                <h2 className="text-xl text-green-400">{battleResult.player1.playerName}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-yellow-400">{battleResult.player1.totalScore}</span>
                  <span className={`text-xl font-bold ${getGradeColor(battleResult.player1.grade)}`}>
                    Grade: {battleResult.player1.grade}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-700 p-3 rounded">
                <h4 className="text-green-400 font-semibold">Correctness: {battleResult.player1.evaluation.correctness.score}/10</h4>
                <p className="text-gray-300">{battleResult.player1.evaluation.correctness.feedback}</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded">
                <h4 className="text-blue-400 font-semibold">Time Complexity: {battleResult.player1.evaluation.timeComplexity.score}/10</h4>
                <p className="text-gray-300">{battleResult.player1.evaluation.timeComplexity.feedback}</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded">
                <h4 className="text-purple-400 font-semibold">Code Quality: {battleResult.player1.evaluation.codeQuality.score}/10</h4>
                <p className="text-gray-300">{battleResult.player1.evaluation.codeQuality.feedback}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Suggestions:</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                {battleResult.player1.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Player 2 */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <img 
                className="w-12 h-12 mr-3" 
                src="https://img.icons8.com/color-pixels/2x/joker-dc.png" 
                alt="Player 2"
              />
              <div>
                <h2 className="text-xl text-blue-400">{battleResult.player2.playerName}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-yellow-400">{battleResult.player2.totalScore}</span>
                  <span className={`text-xl font-bold ${getGradeColor(battleResult.player2.grade)}`}>
                    Grade: {battleResult.player2.grade}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-700 p-3 rounded">
                <h4 className="text-green-400 font-semibold">Correctness: {battleResult.player2.evaluation.correctness.score}/10</h4>
                <p className="text-gray-300">{battleResult.player2.evaluation.correctness.feedback}</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded">
                <h4 className="text-blue-400 font-semibold">Time Complexity: {battleResult.player2.evaluation.timeComplexity.score}/10</h4>
                <p className="text-gray-300">{battleResult.player2.evaluation.timeComplexity.feedback}</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded">
                <h4 className="text-purple-400 font-semibold">Code Quality: {battleResult.player2.evaluation.codeQuality.score}/10</h4>
                <p className="text-gray-300">{battleResult.player2.evaluation.codeQuality.feedback}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Suggestions:</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                {battleResult.player2.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Differences */}
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-xl text-purple-400 font-semibold mb-4">Key Differences</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            {battleResult.comparison.keyDifferences.map((difference, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-400 mr-2">→</span>
                {difference}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => navigate("/createroom")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            🔥 Battle Again
          </button>
          <button 
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
