import { useState, useEffect } from 'react';
import type { ProblemKind } from '@/types/problem.ts';
import { MiniQuiz } from '@/components/MiniQuiz.tsx';
import { BarDiagram } from '@/components/BarDiagram.tsx';
import { FormulaDiagram } from '@/components/FormulaDiagram.tsx';

interface ExplanationScreenProps {
  highlightKind: ProblemKind | null;
  onBack: () => void;
}

const TAB_NAMES = [
  'わりあいってなに？',
  'わりあいを求める',
  'くらべる量を求める',
  'もとにする量を求める',
  'まとめ',
] as const;

/** highlightKind → 対応するタブindex */
function kindToTab(kind: ProblemKind | null): number {
  switch (kind) {
    case 'find_wariai':
      return 1;
    case 'find_kuraberu':
      return 2;
    case 'find_motoni':
      return 3;
    default:
      return 0;
  }
}

export function ExplanationScreen({
  highlightKind,
  onBack,
}: ExplanationScreenProps) {
  const [activeTab, setActiveTab] = useState(() => kindToTab(highlightKind));

  useEffect(() => {
    setActiveTab(kindToTab(highlightKind));
  }, [highlightKind]);

  const goNext = () => {
    if (activeTab < TAB_NAMES.length - 1) {
      setActiveTab(activeTab + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 sm:p-4 pt-5 sm:pt-6 pb-10 sm:pb-12">
      {/* ヘッダー */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 cursor-pointer active:scale-95"
        >
          ←
        </button>
        <h1 className="text-xl sm:text-2xl font-black text-orange-500">
          わりあいのせつめい
        </h1>
      </div>

      {/* タブバー */}
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-3 sm:-mx-4 px-3 sm:px-4 scrollbar-none">
        {TAB_NAMES.map((name, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActiveTab(i);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`shrink-0 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === i
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* タブステップ表示 */}
      <p className="text-xs text-gray-400 text-center">
        {activeTab + 1} / {TAB_NAMES.length}
      </p>

      {/* タブ内容 */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm">
        {activeTab === 0 && <Tab1WhatIsRatio onNext={goNext} />}
        {activeTab === 1 && <Tab2FindWariai onNext={goNext} />}
        {activeTab === 2 && <Tab3FindKuraberu onNext={goNext} />}
        {activeTab === 3 && <Tab4FindMotoni onNext={goNext} />}
        {activeTab === 4 && <Tab5Summary />}
      </div>

      {/* もどるボタン */}
      <button
        type="button"
        onClick={onBack}
        className="w-full py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg font-bold rounded-xl transition-colors cursor-pointer active:scale-[0.97]"
      >
        もどる
      </button>
    </div>
  );
}

/* ============================
   Tab 1: わりあいってなに？
   ============================ */
function Tab1WhatIsRatio({ onNext }: { onNext: () => void }) {
  return (
    <>
      <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-2 sm:mb-3">
        わりあいってなに？
      </h2>

      <p className="text-sm sm:text-base leading-relaxed text-gray-700 mb-3 sm:mb-4">
        わりあいとは、ある量が
        <strong>「もとにする量」</strong>
        の何倍にあたるかを表す数のことです。
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
        <p className="text-sm sm:text-base leading-relaxed text-gray-800">
          たとえば、バスの定員が <strong>40人</strong> で、今{' '}
          <strong>32人</strong> 乗っていたら…
        </p>
      </div>

      <BarDiagram
        baseLabel="もとにする量"
        baseValue={40}
        compareLabel="くらべる量"
        compareValue={32}
        ratio={0.8}
      />

      <div className="mt-3 sm:mt-4">
        <p className="text-sm sm:text-base leading-relaxed text-gray-700 mb-2">
          わりあいの問題では、次の <strong>3つの量</strong> が出てきます。
        </p>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2">
            <span className="shrink-0 bg-blue-100 text-blue-700 font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm">
              もとにする量
            </span>
            <span className="text-gray-600 text-xs sm:text-sm">
              基準になる数
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 bg-green-100 text-green-700 font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm">
              くらべる量
            </span>
            <span className="text-gray-600 text-xs sm:text-sm">
              くらべたい数
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 bg-orange-100 text-orange-700 font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm">
              わりあい
            </span>
            <span className="text-gray-600 text-xs sm:text-sm">
              何倍かを表す数
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-bold text-gray-500 mb-1.5 sm:mb-2">
          見分けるコツ
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700">
          「〜<strong>の</strong>何倍」「〜<strong>の</strong>0.6倍」のように
          <strong>「の」の前にある量</strong>が「もとにする量」です。
        </p>
        <div className="mt-2 sm:mt-3 bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100">
          <p className="text-sm sm:text-base text-gray-800">
            例：「乗っている人数は
            <span className="underline decoration-blue-400 decoration-2 underline-offset-4 font-bold">
              定員
            </span>
            <strong>の</strong>何倍」
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            →「定員」がもとにする量
          </p>
        </div>
      </div>

      <MiniQuiz
        question="「乗っている32人は定員40人の何倍？」もとにする量はどれ？"
        choices={['32人（乗っている人数）', '40人（定員）', '0.8倍']}
        correctIndex={1}
        explanation="「〜の何倍」の「の」の前＝定員40人がもとにする量です。"
        onNext={onNext}
      />
    </>
  );
}

/* ============================
   Tab 2: わりあいを求める
   ============================ */
function Tab2FindWariai({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="bg-orange-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-2.5 py-0.5 rounded-lg">
          ①
        </span>
        <h2 className="text-lg sm:text-xl font-black text-gray-900">
          わりあいを求める
        </h2>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
        <p className="text-center text-base sm:text-lg font-black text-orange-700">
          わりあい ＝
          <span className="text-green-600"> くらべる量 </span>÷
          <span className="text-blue-600"> もとにする量</span>
        </p>
      </div>

      <FormulaDiagram
        unknown="wariai"
        motoniValue="50個"
        kurabeluValue="30個"
        wariaiValue="？"
      />

      <div className="mt-3 sm:mt-4 bg-gray-50 rounded-xl p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-bold text-gray-500 mb-1.5 sm:mb-2">
          れい
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-800 mb-2 sm:mb-3">
          ケーキ屋さんにケーキが
          <span className="font-bold text-blue-600">50個</span>
          ありました。そのうち
          <span className="font-bold text-green-600">30個</span>
          が売れました。売れた数は全体の何倍ですか？
        </p>
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <p className="text-gray-700">
            <span className="text-blue-600 font-bold">もとにする量</span>
            ＝ 全体の50個
          </p>
          <p className="text-gray-700">
            <span className="text-green-600 font-bold">くらべる量</span>
            ＝ 売れた30個
          </p>
          <p className="text-gray-700 mt-1">
            式：<strong className="text-orange-600">30 ÷ 50 ＝ 0.6</strong>
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            → 売れた数は全体の <strong>0.6倍</strong>
          </p>
        </div>
      </div>

      <MiniQuiz
        question="もとにする量が50、くらべる量が30のとき、わりあいを求める式は？"
        choices={['50 × 30', '30 ÷ 50', '50 ÷ 30']}
        correctIndex={1}
        explanation="わりあい ＝ くらべる量 ÷ もとにする量 なので、30 ÷ 50 です。"
        onNext={onNext}
      />
    </>
  );
}

/* ============================
   Tab 3: くらべる量を求める
   ============================ */
function Tab3FindKuraberu({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="bg-orange-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-2.5 py-0.5 rounded-lg">
          ②
        </span>
        <h2 className="text-lg sm:text-xl font-black text-gray-900">
          くらべる量を求める
        </h2>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
        <p className="text-center text-base sm:text-lg font-black text-orange-700">
          くらべる量 ＝
          <span className="text-blue-600"> もとにする量 </span>×
          <span className="text-orange-600"> わりあい</span>
        </p>
      </div>

      <FormulaDiagram
        unknown="kuraberu"
        motoniValue="40人"
        kurabeluValue="？"
        wariaiValue="0.6倍"
      />

      <div className="mt-3 sm:mt-4 bg-gray-50 rounded-xl p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-bold text-gray-500 mb-1.5 sm:mb-2">
          れい
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-800 mb-2 sm:mb-3">
          定員
          <span className="font-bold text-blue-600">40人</span>
          のバスに、定員の
          <span className="font-bold text-orange-600">0.6倍</span>
          の人が乗っています。何人乗っていますか？
        </p>
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <p className="text-gray-700">
            <span className="text-blue-600 font-bold">もとにする量</span>
            ＝ 定員の40人
          </p>
          <p className="text-gray-700">
            <span className="text-orange-600 font-bold">わりあい</span>
            ＝ 0.6倍
          </p>
          <p className="text-gray-700 mt-1">
            式：<strong className="text-orange-600">40 × 0.6 ＝ 24</strong>
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            → 乗っているのは <strong>24人</strong>
          </p>
        </div>
      </div>

      <MiniQuiz
        question="もとにする量が40、わりあいが0.6のとき、くらべる量を求める式は？"
        choices={['40 ÷ 0.6', '40 × 0.6', '0.6 ÷ 40']}
        correctIndex={1}
        explanation="くらべる量 ＝ もとにする量 × わりあい なので、40 × 0.6 です。"
        onNext={onNext}
      />
    </>
  );
}

/* ============================
   Tab 4: もとにする量を求める
   ============================ */
function Tab4FindMotoni({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="bg-orange-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-2.5 py-0.5 rounded-lg">
          ③
        </span>
        <h2 className="text-lg sm:text-xl font-black text-gray-900">
          もとにする量を求める
        </h2>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
        <p className="text-center text-base sm:text-lg font-black text-orange-700">
          もとにする量 ＝
          <span className="text-green-600"> くらべる量 </span>÷
          <span className="text-orange-600"> わりあい</span>
        </p>
      </div>

      <FormulaDiagram
        unknown="motoni"
        motoniValue="？"
        kurabeluValue="24人"
        wariaiValue="0.6倍"
      />

      <div className="mt-3 sm:mt-4 bg-gray-50 rounded-xl p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-bold text-gray-500 mb-1.5 sm:mb-2">
          れい
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-800 mb-2 sm:mb-3">
          バスに
          <span className="font-bold text-green-600">24人</span>
          乗っていて、これは定員の
          <span className="font-bold text-orange-600">0.6倍</span>
          です。定員は何人ですか？
        </p>
        <div className="flex flex-col gap-1 text-sm sm:text-base">
          <p className="text-gray-700">
            <span className="text-green-600 font-bold">くらべる量</span>
            ＝ 乗っている24人
          </p>
          <p className="text-gray-700">
            <span className="text-orange-600 font-bold">わりあい</span>
            ＝ 0.6倍
          </p>
          <p className="text-gray-700 mt-1">
            式：<strong className="text-orange-600">24 ÷ 0.6 ＝ 40</strong>
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            → 定員は <strong>40人</strong>
          </p>
        </div>
      </div>

      <MiniQuiz
        question="くらべる量が24、わりあいが0.6のとき、もとにする量を求める式は？"
        choices={['24 × 0.6', '0.6 ÷ 24', '24 ÷ 0.6']}
        correctIndex={2}
        explanation="もとにする量 ＝ くらべる量 ÷ わりあい なので、24 ÷ 0.6 です。"
        onNext={onNext}
      />
    </>
  );
}

/* ============================
   Tab 5: まとめ
   ============================ */
function Tab5Summary() {
  return (
    <>
      <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-2 sm:mb-3">
        まとめ
      </h2>

      {/* 3公式一覧 */}
      <div className="flex flex-col gap-2 mb-3 sm:mb-4">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs sm:text-sm font-bold text-gray-500 mb-0.5 sm:mb-1">
            ①
          </p>
          <p className="text-sm sm:text-base font-black text-orange-700">
            わりあい ＝ くらべる量 ÷ もとにする量
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs sm:text-sm font-bold text-gray-500 mb-0.5 sm:mb-1">
            ②
          </p>
          <p className="text-sm sm:text-base font-black text-orange-700">
            くらべる量 ＝ もとにする量 × わりあい
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs sm:text-sm font-bold text-gray-500 mb-0.5 sm:mb-1">
            ③
          </p>
          <p className="text-sm sm:text-base font-black text-orange-700">
            もとにする量 ＝ くらべる量 ÷ わりあい
          </p>
        </div>
      </div>

      {/* 解き方のステップ */}
      <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm font-bold text-gray-500 mb-1.5 sm:mb-2">
          どの式を使うか決めるステップ
        </p>
        <ol className="list-decimal list-inside text-sm sm:text-base leading-relaxed text-gray-700 flex flex-col gap-1.5 sm:gap-2">
          <li>
            問題文から
            <span className="text-blue-600 font-bold">もとにする量</span>・
            <span className="text-green-600 font-bold">くらべる量</span>・
            <span className="text-orange-600 font-bold">わりあい</span>
            を見つける
          </li>
          <li>どれが「？（わからない数）」かを確認する</li>
          <li>上の3つの公式から、「？」を求める式をえらぶ</li>
        </ol>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-bold text-yellow-700 mb-1">
          ポイント
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-gray-700">
          ×（かける）と ÷（わる）をまちがえやすいので気をつけよう！
          わりあいを求めるときは<strong>わり算</strong>、
          くらべる量を求めるときは<strong>かけ算</strong>です。
        </p>
      </div>
    </>
  );
}
