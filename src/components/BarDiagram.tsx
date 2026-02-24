interface BarDiagramProps {
  baseLabel: string;
  baseValue: number;
  compareLabel: string;
  compareValue: number;
  ratio: number;
}

export function BarDiagram({
  baseLabel,
  baseValue,
  compareLabel,
  compareValue,
  ratio,
}: BarDiagramProps) {
  const percent = Math.round(ratio * 100);

  return (
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4 flex flex-col gap-2.5">
      {/* もとにする量 */}
      <div>
        <p className="text-xs sm:text-sm font-bold text-blue-600 mb-1">
          {baseLabel}（{baseValue}人）
        </p>
        <div className="w-full h-9 sm:h-10 bg-blue-200 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-400 rounded-lg" />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            全体（100%）
          </span>
        </div>
      </div>

      {/* くらべる量 */}
      <div>
        <p className="text-xs sm:text-sm font-bold text-green-600 mb-1">
          {compareLabel}（{compareValue}人）
        </p>
        <div className="w-full h-9 sm:h-10 bg-gray-200 rounded-lg relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-green-400 rounded-lg"
            style={{ width: `${percent}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
            {percent}%
          </span>
        </div>
      </div>

      {/* 結論 */}
      <p className="text-center text-sm sm:text-base font-bold text-gray-700">
        → {compareValue}は{baseValue}の{' '}
        <span className="text-orange-600 text-base sm:text-lg">{ratio}倍</span>
        ！
      </p>
    </div>
  );
}
