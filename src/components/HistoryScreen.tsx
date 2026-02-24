import { useState } from 'react';
import type { ProblemKind } from '@/types/problem.ts';
import type { QuizResult } from '@/types/history.ts';
import { loadHistory, clearHistory } from '@/utils/history.ts';

interface HistoryScreenProps {
  onBack: () => void;
}

const kindLabels: Record<ProblemKind, string> = {
  find_wariai: 'わりあいを求める',
  find_kuraberu: 'くらべる量を求める',
  find_motoni: 'もとにする量を求める',
};

const kinds: ProblemKind[] = ['find_wariai', 'find_kuraberu', 'find_motoni'];

function analyzeWeakness(history: QuizResult[]) {
  const allDetails = history.flatMap((r) => r.details);

  const stats = kinds.map((kind) => {
    const items = allDetails.filter((d) => d.kind === kind);
    const correct = items.filter((d) => d.correct).length;
    return { kind, correct, total: items.length };
  });

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
    if (lowestRate === 1) weakestKind = null;
  }

  return { stats, weakestKind };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [history, setHistory] = useState<QuizResult[]>(loadHistory);
  const [showConfirm, setShowConfirm] = useState(false);

  const { stats, weakestKind } = analyzeWeakness(history);
  const hasData = history.length > 0;

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4 pt-6 pb-10">
      {/* ヘッダー */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-orange-500 hover:text-orange-600 font-bold cursor-pointer"
        >
          ← もどる
        </button>
        <h1 className="text-xl font-black text-gray-900">きろく</h1>
      </div>

      {!hasData ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <p className="text-gray-400 text-lg">まだきろくがありません</p>
          <p className="text-gray-400 text-sm mt-2">
            ドリルをといてみよう！
          </p>
        </div>
      ) : (
        <>
          {/* 苦手分析 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-bold text-orange-500 mb-4">
              にがて分析
            </p>
            <div className="flex flex-col gap-3">
              {stats.map(
                (s) =>
                  s.total > 0 && (
                    <div key={s.kind}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700 flex items-center gap-1.5">
                          {kindLabels[s.kind]}
                          {s.kind === weakestKind && (
                            <span className="text-xs bg-red-100 text-red-500 font-bold px-1.5 py-0.5 rounded">
                              にがて
                            </span>
                          )}
                        </span>
                        <span className="font-bold text-gray-900">
                          {s.correct}/{s.total}（
                          {Math.round((s.correct / s.total) * 100)}%）
                        </span>
                      </div>
                      {/* 正答率バー */}
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            s.kind === weakestKind
                              ? 'bg-red-400'
                              : 'bg-green-400'
                          }`}
                          style={{
                            width: `${Math.round((s.correct / s.total) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>

          {/* 記録一覧 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-bold text-orange-500 mb-3">
              きろく一覧
            </p>
            <div className="flex flex-col gap-2">
              {[...history].reverse().map((r) => {
                const pct = Math.round((r.score / r.total) * 100);
                return (
                  <div
                    key={r.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-sm text-gray-500">
                      {formatDate(r.date)}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {r.score}/{r.total}（{pct}%）
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* きろくをけす */}
          <div className="flex justify-center">
            {!showConfirm ? (
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="text-sm text-gray-400 hover:text-red-500 cursor-pointer underline underline-offset-4"
              >
                きろくをけす
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-red-500">本当にけしますか？</span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm font-bold text-red-500 hover:text-red-600 cursor-pointer underline underline-offset-4"
                >
                  けす
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="text-sm text-gray-400 hover:text-gray-500 cursor-pointer underline underline-offset-4"
                >
                  やめる
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
