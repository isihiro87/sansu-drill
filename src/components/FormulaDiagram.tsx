type UnknownTarget = 'wariai' | 'kuraberu' | 'motoni';

interface FormulaDiagramProps {
  /** どの量を「？」にするか */
  unknown: UnknownTarget;
  motoniValue?: string;
  kurabeluValue?: string;
  wariaiValue?: string;
}

export function FormulaDiagram({
  unknown,
  motoniValue = '40人',
  kurabeluValue = '24人',
  wariaiValue = '0.6倍',
}: FormulaDiagramProps) {
  const motoni = unknown === 'motoni' ? '？' : motoniValue;
  const kuraberu = unknown === 'kuraberu' ? '？' : kurabeluValue;
  const wariai = unknown === 'wariai' ? '？' : wariaiValue;

  const motoniColor =
    unknown === 'motoni'
      ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-400'
      : 'bg-blue-50 border-blue-300';
  const kurabeluColor =
    unknown === 'kuraberu'
      ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-400'
      : 'bg-green-50 border-green-300';
  const wariaiHighlight = unknown === 'wariai';

  return (
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
      {/* 上段: もとにする量 → くらべる量 */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
        {/* もとにする量 */}
        <div
          className={`flex flex-col items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 min-w-0 ${motoniColor}`}
        >
          <span className="text-[10px] sm:text-xs font-bold text-blue-600 whitespace-nowrap">
            もとにする量
          </span>
          <span className="text-base sm:text-lg font-black text-gray-800">
            {motoni}
          </span>
        </div>

        {/* × わりあい → */}
        <div className="flex flex-col items-center text-[10px] sm:text-xs text-gray-500 shrink-0">
          <span>
            ×{' '}
            <span
              className={`font-bold ${wariaiHighlight ? 'text-yellow-600 bg-yellow-100 px-0.5 rounded' : 'text-orange-600'}`}
            >
              {wariai}
            </span>
          </span>
          <span>→</span>
        </div>

        {/* くらべる量 */}
        <div
          className={`flex flex-col items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 min-w-0 ${kurabeluColor}`}
        >
          <span className="text-[10px] sm:text-xs font-bold text-green-600 whitespace-nowrap">
            くらべる量
          </span>
          <span className="text-base sm:text-lg font-black text-gray-800">
            {kuraberu}
          </span>
        </div>
      </div>

      {/* 下段: くらべる量 ÷ もとにする量 = わりあい */}
      <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-gray-500 bg-white rounded-lg p-1.5 sm:p-2 border border-gray-200 flex-wrap">
        <span className="text-green-600 font-bold">くらべる量</span>
        <span>÷</span>
        <span className="text-blue-600 font-bold">もとにする量</span>
        <span>＝</span>
        <span
          className={`font-bold ${wariaiHighlight ? 'text-yellow-600 bg-yellow-100 px-1 rounded' : 'text-orange-600'}`}
        >
          わりあい{unknown === 'wariai' ? '（？）' : ''}
        </span>
      </div>
    </div>
  );
}
