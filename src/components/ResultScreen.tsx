import type { ProblemKind } from '@/types/problem.ts';
import type { QuizDetail } from '@/hooks/useQuiz.ts';

interface ResultScreenProps {
  score: number;
  total: number;
  details: QuizDetail[];
  onRetry: () => void;
}

const kindLabels: Record<ProblemKind, string> = {
  find_wariai: 'わりあいを求める',
  find_kuraberu: 'くらべる量を求める',
  find_motoni: 'もとにする量を求める',
};

const kinds: ProblemKind[] = ['find_wariai', 'find_kuraberu', 'find_motoni'];

function getMessage(percentage: number): { message: string; emoji: string } {
  if (percentage === 100) return { message: 'パーフェクト！すごい！', emoji: '🎉' };
  if (percentage >= 80) return { message: 'よくできました！', emoji: '😊' };
  if (percentage >= 60) return { message: 'いい調子！もう少し！', emoji: '💪' };
  if (percentage >= 40) return { message: 'がんばったね！', emoji: '📖' };
  return { message: 'もう一度チャレンジしよう！', emoji: '✏️' };
}

function getKindStats(details: QuizDetail[]) {
  const stats = kinds.map((kind) => {
    const items = details.filter((d) => d.kind === kind);
    const correct = items.filter((d) => d.correct).length;
    return { kind, correct, total: items.length };
  });

  // 出題があった種類のうち、正答率が一番低いものを特定
  const attempted = stats.filter((s) => s.total > 0);
  let weakestKind: ProblemKind | null = null;
  if (attempted.length > 0) {
    let lowestRate = Infinity;
    for (const s of attempted) {
      const rate = s.correct / s.total;
      if (rate < lowestRate) {
        lowestRate = rate;
        weakestKind = s.kind;
      }
    }
    // 全部100%なら苦手なし
    if (lowestRate === 1) weakestKind = null;
  }

  return { stats, weakestKind };
}

export function ResultScreen({ score, total, details, onRetry }: ResultScreenProps) {
  const percentage = Math.round((score / total) * 100);
  const { message, emoji } = getMessage(percentage);
  const { stats, weakestKind } = getKindStats(details);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-6 gap-8">
      {/* 結果 */}
      <div className="text-center">
        <p className="text-6xl mb-4">{emoji}</p>
        <h2 className="text-2xl font-black text-gray-900 mb-2">けっか</h2>
        <div className="text-6xl font-black text-orange-500 mb-2">
          {score}
          <span className="text-3xl text-gray-400"> / {total}</span>
        </div>
        <p className="text-xl text-gray-500">{percentage}点</p>
      </div>

      {/* メッセージ */}
      <div className="bg-white rounded-2xl p-6 shadow-sm w-full max-w-xs text-center">
        <p className="text-xl font-bold text-gray-800">{message}</p>
      </div>

      {/* 種類別の正答数 */}
      {details.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm w-full max-w-xs">
          <p className="text-sm font-bold text-gray-500 mb-3">しゅるいべつ</p>
          <div className="flex flex-col gap-2">
            {stats.map(
              (s) =>
                s.total > 0 && (
                  <div key={s.kind} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{kindLabels[s.kind]}</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1.5">
                      {s.correct} / {s.total}
                      {s.kind === weakestKind && (
                        <span className="text-xs text-red-500 font-bold">にがて</span>
                      )}
                    </span>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* リトライボタン */}
      <button
        type="button"
        onClick={onRetry}
        className="w-full max-w-xs py-5 bg-orange-500 hover:bg-orange-600 text-white text-xl font-black rounded-2xl shadow-lg transition-all cursor-pointer active:scale-[0.97]"
      >
        もう一度チャレンジ
      </button>
    </div>
  );
}
