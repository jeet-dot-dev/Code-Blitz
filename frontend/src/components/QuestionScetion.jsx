const QuestionSection = ({ questions, topic }) => {
  if (!questions) {
    return (
      <div className="font-press flex items-center justify-center h-full">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }
  console.log(questions?.questions);
  return (
    <div className="font-press border-t-2 border-purple-500 bg-black h-full p-4 overflow-y-auto">
      <div className="space-y-6">
        <h1 className="text-lg font-bold text-purple-400 pb-2">
          Topic: {topic || questions?.topic || 'Coding Challenge'}
        </h1>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-green-400 mb-2 text-sm">Question:</h4>
            <p className="text-white leading-relaxed text-sm">
              {questions?.questions[0]?.title}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-green-400 mb-2 text-sm">Description:</h4>
            <p className="text-gray-300 leading-relaxed text-sm">
              {questions?.questions[0]?.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-400 mb-2 text-sm">Example Input:</h3>
            <pre className="bg-[#1d1d1d] text-green-300 p-3 rounded border-2 border-[#7024DC] text-xs overflow-x-auto">
              {questions?.questions[0]?.exampleInput}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-blue-400 mb-2 text-sm">Example Output:</h3>
            <pre className="bg-[#1d1d1d] text-green-300 p-3 rounded border-2  border-[#7024DC] text-xs overflow-x-auto">
              {questions?.questions[0]?.exampleOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
