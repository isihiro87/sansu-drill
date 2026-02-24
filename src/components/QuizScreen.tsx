import type { Problem } from '@/types/problem.ts';
import type { ProblemKind } from '@/types/problem.ts';
import { useQuiz } from '@/hooks/useQuiz.ts';
import type { QuizDetail } from '@/hooks/useQuiz.ts';
import { ChoiceButton } from '@/components/ChoiceButton.tsx';
import type { ChoiceState } from '@/components/ChoiceButton.tsx';
import { ProgressBar } from '@/components/ProgressBar.tsx';

interface QuizScreenProps {
  problems: Problem[];
  onComplete: (score: number, details: QuizDetail[]) => void;
  onOpenExplanation: (kind: ProblemKind) => void;
  onHome: () => void;
}

function getChoiceState(
  choiceIndex: number,
  selectedChoice: number | null,
  correctIndex: number,
): ChoiceState {
  if (selectedChoice === null) return 'default';
  if (choiceIndex === correctIndex) return 'correct';
  if (choiceIndex === selectedChoice) return 'incorrect';
  return 'unselected';
}

export function QuizScreen({
  problems,
  onComplete,
  onOpenExplanation,
  onHome,
}: QuizScreenProps) {
  const {
    currentIndex,
    currentProblem,
    selectedChoice,
    isAnswered,
    isComplete,
    score,
    totalCount,
    results,
    selectChoice,
    nextProblem,
  } = useQuiz(problems);

  const handleNext = () => {
    if (isComplete) {
      onComplete(score, results);
    } else {
      nextProblem();
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 pt-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onHome}
          className="text-sm text-gray-400 hover:text-orange-500 font-bold cursor-pointer"
        >
          ← ホームにもどる
        </button>
      </div>

      <ProgressBar current={currentIndex} total={totalCount} />

      {/* 問題文 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-bold text-orange-500 mb-2">もんだい</p>
        <p className="text-lg leading-relaxed text-gray-900">
          {currentProblem.questionText}
        </p>
      </div>

      {!isAnswered ? (
        <>
          {/* 選択肢 */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold text-gray-500">
              正しい式をえらぼう
            </p>
            {currentProblem.choices.map((choice, index) => (
              <ChoiceButton
                key={`${currentProblem.id}-${index}`}
                label={choice}
                index={index}
                state={getChoiceState(
                  index,
                  selectedChoice,
                  currentProblem.correctIndex,
                )}
                onClick={() => selectChoice(index)}
                disabled={isAnswered}
              />
            ))}
          </div>

          {/* せつめいリンク */}
          <button
            type="button"
            onClick={() => onOpenExplanation(currentProblem.kind)}
            className="text-orange-500 hover:text-orange-600 text-sm font-bold cursor-pointer py-2 underline underline-offset-4"
          >
            わからないときは → せつめいを見る
          </button>
        </>
      ) : (
        /* 回答後: 選択肢を隠してフィードバックに差し替え */
        <div
          className={`rounded-2xl p-5 ${
            selectedChoice === currentProblem.correctIndex
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <p className="font-bold text-lg mb-3">
            {selectedChoice === currentProblem.correctIndex
              ? 'せいかい！'
              : 'ざんねん...'}
          </p>

          {/* あなたの解答（不正解時のみ・控えめ） */}
          {selectedChoice !== currentProblem.correctIndex && (
            <div className="mb-2">
              <p className="text-xs text-red-400 mb-0.5">あなたの解答</p>
              <p className="text-sm text-red-400">
                {currentProblem.choices[selectedChoice!]}
              </p>
            </div>
          )}

          {/* 正答（常に表示・目立つ） */}
          <div className="bg-green-100 border-2 border-green-400 rounded-xl px-4 py-2.5 mb-3">
            <p className="text-xs text-green-600 mb-0.5">せいかい</p>
            <p className="text-lg font-black text-green-700">
              {currentProblem.choices[currentProblem.correctIndex]}
            </p>
          </div>

          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {currentProblem.explanation}
          </p>

          {/* 不正解時のみ説明ページリンクを表示 */}
          {selectedChoice !== currentProblem.correctIndex && (
            <button
              type="button"
              onClick={() => onOpenExplanation(currentProblem.kind)}
              className="mt-3 text-orange-500 hover:text-orange-600 text-sm font-bold cursor-pointer underline underline-offset-4"
            >
              くわしいせつめいを見る →
            </button>
          )}
        </div>
      )}

      {/* 次へボタン */}
      {isAnswered && (
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-xl transition-colors cursor-pointer active:scale-[0.97]"
        >
          {isComplete ? 'けっかを見る' : 'つぎの問題へ'}
        </button>
      )}
    </div>
  );
}
