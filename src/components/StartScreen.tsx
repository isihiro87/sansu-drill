import { useState } from 'react';

interface StartScreenProps {
  onStart: (count: number) => void;
  onOpenExplanation: () => void;
  onOpenHistory: () => void;
}

const countOptions = [5, 10, 15];

export function StartScreen({ onStart, onOpenExplanation, onOpenHistory }: StartScreenProps) {
  const [selectedCount, setSelectedCount] = useState(10);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-6 gap-8">
      {/* タイトル */}
      <div className="text-center">
        <h1 className="text-4xl font-black text-orange-500 mb-2">
          わりあいドリル
        </h1>
        <p className="text-gray-600 text-lg">
          もんだいに合う式をえらぼう！
        </p>
      </div>

      {/* 問題数の選択 */}
      <div className="w-full max-w-xs">
        <p className="text-sm font-bold text-gray-500 text-center mb-3">
          もんだいの数
        </p>
        <div className="flex gap-3">
          {countOptions.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setSelectedCount(count)}
              className={`flex-1 py-3 rounded-xl text-lg font-bold transition-all cursor-pointer
                ${
                  selectedCount === count
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300'
                }
              `}
            >
              {count}問
            </button>
          ))}
        </div>
      </div>

      {/* スタートボタン */}
      <button
        type="button"
        onClick={() => onStart(selectedCount)}
        className="w-full max-w-xs py-5 bg-orange-500 hover:bg-orange-600 text-white text-2xl font-black rounded-2xl shadow-lg transition-all cursor-pointer active:scale-[0.97]"
      >
        スタート
      </button>

      {/* リンク */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onOpenExplanation}
          className="text-orange-500 hover:text-orange-600 font-bold cursor-pointer underline underline-offset-4"
        >
          わりあいってなに？ → せつめいを見る
        </button>
        <button
          type="button"
          onClick={onOpenHistory}
          className="text-orange-500 hover:text-orange-600 font-bold cursor-pointer underline underline-offset-4"
        >
          きろくを見る
        </button>
      </div>
    </div>
  );
}
