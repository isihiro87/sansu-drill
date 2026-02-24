import { useState } from 'react';

interface MiniQuizProps {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
  onNext: () => void;
}

export function MiniQuiz({
  question,
  choices,
  correctIndex,
  explanation,
  onNext,
}: MiniQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctIndex;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
  };

  const handleRetry = () => {
    setSelected(null);
  };

  return (
    <div className="mt-5">
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 sm:p-4">
        <p className="text-xs font-bold text-purple-600 mb-1.5">
          りかいチェック
        </p>
        <p className="text-sm sm:text-base font-bold text-gray-800 mb-3">
          {question}
        </p>

        {!answered ? (
          /* === 未回答: 選択肢 === */
          <div className="flex flex-col gap-2">
            {choices.map((choice, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                className="w-full text-left px-3 sm:px-4 py-3 rounded-lg border-2 border-purple-200 bg-white text-gray-700 text-sm sm:text-base font-bold cursor-pointer active:bg-purple-50 transition-colors"
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          /* === 回答後: フィードバック === */
          <div>
            <p className={`font-black text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-500'}`}>
              {isCorrect ? 'せいかい！' : 'ざんねん...'}
            </p>

            {/* あなたの解答（不正解時のみ・控えめ） */}
            {isWrong && (
              <div className="mb-2">
                <p className="text-xs text-red-400 mb-0.5">あなたの解答</p>
                <p className="text-sm text-red-400">
                  {choices[selected]}
                </p>
              </div>
            )}

            {/* 正答（常に表示・目立つ） */}
            <div className="bg-green-100 border-2 border-green-400 rounded-xl px-4 py-2.5 mb-2">
              <p className="text-xs text-green-600 mb-0.5">せいかい</p>
              <p className="text-base font-black text-green-700">
                {choices[correctIndex]}
              </p>
            </div>

            {explanation && (
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {explanation}
              </p>
            )}
            <button
              type="button"
              onClick={isCorrect ? onNext : handleRetry}
              className={`w-full py-3 text-white text-base font-bold rounded-xl cursor-pointer active:scale-95 ${
                isCorrect ? 'bg-green-500' : 'bg-orange-500'
              }`}
            >
              {isCorrect ? 'つぎへ →' : 'もう一度やってみる'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
