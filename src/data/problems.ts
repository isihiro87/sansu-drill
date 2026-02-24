import type { ProblemSeed } from '@/types/problem.ts';

/**
 * 手作りの割合問題 36問
 *
 * 不正解選択肢の設計方針:
 * - find_wariai（正解: 比べる量 ÷ もとにする量）
 *   ダミー①: もとにする量 ÷ 比べる量（割り算の向きを逆にする典型ミス）
 *   ダミー②: もとにする量 − 比べる量（差を求めてしまうミス）
 *
 * - find_kuraberu（正解: もとにする量 × 割合）
 *   ダミー①: もとにする量 ÷ 割合（かけ算と割り算を取り違えるミス）
 *   ダミー②: 割合 ÷ もとにする量（向きも演算も逆にするミス）
 *
 * - find_motoni（正解: 比べる量 ÷ 割合）
 *   ダミー①: 比べる量 × 割合（かけ算と割り算を取り違えるミス）
 *   ダミー②: 割合 ÷ 比べる量（向きも演算も逆にするミス）
 */

// ============================================================
//  割合を求める 12問
//  （割合 ＝ 比べる量 ÷ もとにする量）
// ============================================================
const findWariaiProblems: ProblemSeed[] = [
  {
    id: 'w01',
    kind: 'find_wariai',
    questionText:
      'バスの定員は40人で、今32人乗っています。乗っている人数は定員の何倍ですか？',
    correctExpression: '32 ÷ 40',
    distractors: ['40 ÷ 32', '40 − 32'],
    explanation:
      'もとにする量は定員の「40人」、比べる量は乗っている「32人」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 32 ÷ 40 ＝ 0.8',
  },
  {
    id: 'w02',
    kind: 'find_wariai',
    questionText:
      'ケーキ屋さんにケーキが50個ありました。そのうち30個が売れました。売れた数は全体の何倍ですか？',
    correctExpression: '30 ÷ 50',
    distractors: ['50 ÷ 30', '50 − 30'],
    explanation:
      'もとにする量は全体の「50個」、比べる量は売れた「30個」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 30 ÷ 50 ＝ 0.6',
  },
  {
    id: 'w03',
    kind: 'find_wariai',
    questionText:
      '5年1組は30人です。そのうち12人がめがねをかけています。めがねの人は全体の何倍ですか？',
    correctExpression: '12 ÷ 30',
    distractors: ['30 ÷ 12', '30 − 12'],
    explanation:
      'もとにする量はクラス全体の「30人」、比べる量はめがねの「12人」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 12 ÷ 30 ＝ 0.4',
  },
  {
    id: 'w04',
    kind: 'find_wariai',
    questionText:
      '500mLのジュースのうち、200mLを飲みました。飲んだ量はもとの量の何倍ですか？',
    correctExpression: '200 ÷ 500',
    distractors: ['500 ÷ 200', '500 − 200'],
    explanation:
      'もとにする量はジュース全体の「500mL」、比べる量は飲んだ「200mL」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 200 ÷ 500 ＝ 0.4',
  },
  {
    id: 'w05',
    kind: 'find_wariai',
    questionText:
      'テストは100問あります。太郎くんは80問正解しました。正解した数は全体の何倍ですか？',
    correctExpression: '80 ÷ 100',
    distractors: ['100 ÷ 80', '100 − 80'],
    explanation:
      'もとにする量は全体の「100問」、比べる量は正解した「80問」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 80 ÷ 100 ＝ 0.8',
  },
  {
    id: 'w06',
    kind: 'find_wariai',
    questionText:
      '花だんに花が200本あります。そのうち120本がチューリップです。チューリップは全体の何倍ですか？',
    correctExpression: '120 ÷ 200',
    distractors: ['200 ÷ 120', '200 − 120'],
    explanation:
      'もとにする量は花全体の「200本」、比べる量はチューリップの「120本」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 120 ÷ 200 ＝ 0.6',
  },
  {
    id: 'w07',
    kind: 'find_wariai',
    questionText:
      '的あてゲームで25回投げて、10回当たりました。当たった回数は投げた回数の何倍ですか？',
    correctExpression: '10 ÷ 25',
    distractors: ['25 ÷ 10', '25 − 10'],
    explanation:
      'もとにする量は投げた「25回」、比べる量は当たった「10回」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 10 ÷ 25 ＝ 0.4',
  },
  {
    id: 'w08',
    kind: 'find_wariai',
    questionText:
      '種を50つぶまきました。そのうち40つぶが芽を出しました。芽が出た数はまいた数の何倍ですか？',
    correctExpression: '40 ÷ 50',
    distractors: ['50 ÷ 40', '50 − 40'],
    explanation:
      'もとにする量はまいた「50つぶ」、比べる量は芽が出た「40つぶ」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 40 ÷ 50 ＝ 0.8',
  },
  {
    id: 'w09',
    kind: 'find_wariai',
    questionText:
      '全校生徒300人のうち、180人が運動会のつなひきに参加しました。参加した人数は全体の何倍ですか？',
    correctExpression: '180 ÷ 300',
    distractors: ['300 ÷ 180', '300 − 180'],
    explanation:
      'もとにする量は全校生徒の「300人」、比べる量は参加した「180人」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 180 ÷ 300 ＝ 0.6',
  },
  {
    id: 'w10',
    kind: 'find_wariai',
    questionText:
      'お小遣いが1000円あります。そのうち400円を使いました。使った金額はお小遣い全体の何倍ですか？',
    correctExpression: '400 ÷ 1000',
    distractors: ['1000 ÷ 400', '1000 − 400'],
    explanation:
      'もとにする量はお小遣いの「1000円」、比べる量は使った「400円」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 400 ÷ 1000 ＝ 0.4',
  },
  {
    id: 'w11',
    kind: 'find_wariai',
    questionText:
      '本が250ページあります。今日50ページ読みました。読んだページは全体の何倍ですか？',
    correctExpression: '50 ÷ 250',
    distractors: ['250 ÷ 50', '250 − 50'],
    explanation:
      'もとにする量は全体の「250ページ」、比べる量は読んだ「50ページ」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 50 ÷ 250 ＝ 0.2',
  },
  {
    id: 'w12',
    kind: 'find_wariai',
    questionText:
      '80cmのリボンのうち、48cmを使いました。使った長さはもとの長さの何倍ですか？',
    correctExpression: '48 ÷ 80',
    distractors: ['80 ÷ 48', '80 − 48'],
    explanation:
      'もとにする量はリボン全体の「80cm」、比べる量は使った「48cm」です。\n割合 ＝ 比べる量 ÷ もとにする量 なので 48 ÷ 80 ＝ 0.6',
  },
];

// ============================================================
//  比べる量を求める 12問
//  （比べる量 ＝ もとにする量 × 割合）
// ============================================================
const findKuraberuProblems: ProblemSeed[] = [
  {
    id: 'k01',
    kind: 'find_kuraberu',
    questionText:
      '定員40人のバスに、定員の0.6倍の人が乗っています。何人乗っていますか？',
    correctExpression: '40 × 0.6',
    distractors: ['40 ÷ 0.6', '0.6 ÷ 40'],
    explanation:
      'もとにする量は定員の「40人」、割合は「0.6倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 40 × 0.6 ＝ 24',
  },
  {
    id: 'k02',
    kind: 'find_kuraberu',
    questionText:
      'お店にりんごが50個あります。全体の0.4倍が売れました。売れたのは何個ですか？',
    correctExpression: '50 × 0.4',
    distractors: ['50 ÷ 0.4', '0.4 ÷ 50'],
    explanation:
      'もとにする量は全体の「50個」、割合は「0.4倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 50 × 0.4 ＝ 20',
  },
  {
    id: 'k03',
    kind: 'find_kuraberu',
    questionText:
      'テストは200点満点です。花子さんは満点の0.8倍の点数を取りました。花子さんは何点ですか？',
    correctExpression: '200 × 0.8',
    distractors: ['200 ÷ 0.8', '0.8 ÷ 200'],
    explanation:
      'もとにする量は満点の「200点」、割合は「0.8倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 200 × 0.8 ＝ 160',
  },
  {
    id: 'k04',
    kind: 'find_kuraberu',
    questionText:
      '青いリボンは40cmです。赤いリボンは青いリボンの0.5倍の長さです。赤いリボンは何cmですか？',
    correctExpression: '40 × 0.5',
    distractors: ['40 ÷ 0.5', '0.5 ÷ 40'],
    explanation:
      'もとにする量は青いリボンの「40cm」、割合は「0.5倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 40 × 0.5 ＝ 20',
  },
  {
    id: 'k05',
    kind: 'find_kuraberu',
    questionText:
      '水そうには満水で30L入ります。今、満水の0.6倍の水が入っています。今入っている水は何Lですか？',
    correctExpression: '30 × 0.6',
    distractors: ['30 ÷ 0.6', '0.6 ÷ 30'],
    explanation:
      'もとにする量は満水の「30L」、割合は「0.6倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 30 × 0.6 ＝ 18',
  },
  {
    id: 'k06',
    kind: 'find_kuraberu',
    questionText:
      '貯金が5000円あります。貯金の0.4倍を使いました。使ったのは何円ですか？',
    correctExpression: '5000 × 0.4',
    distractors: ['5000 ÷ 0.4', '0.4 ÷ 5000'],
    explanation:
      'もとにする量は貯金の「5000円」、割合は「0.4倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 5000 × 0.4 ＝ 2000',
  },
  {
    id: 'k07',
    kind: 'find_kuraberu',
    questionText:
      '全校生徒は500人です。全校生徒の0.2倍が図書委員です。図書委員は何人ですか？',
    correctExpression: '500 × 0.2',
    distractors: ['500 ÷ 0.2', '0.2 ÷ 500'],
    explanation:
      'もとにする量は全校生徒の「500人」、割合は「0.2倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 500 × 0.2 ＝ 100',
  },
  {
    id: 'k08',
    kind: 'find_kuraberu',
    questionText:
      '板は60cmあります。その0.5倍の長さを切り取ります。何cm切り取りますか？',
    correctExpression: '60 × 0.5',
    distractors: ['60 ÷ 0.5', '0.5 ÷ 60'],
    explanation:
      'もとにする量は板の「60cm」、割合は「0.5倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 60 × 0.5 ＝ 30',
  },
  {
    id: 'k09',
    kind: 'find_kuraberu',
    questionText:
      '去年の参加者は150人でした。今年の参加者は去年の0.8倍です。今年は何人ですか？',
    correctExpression: '150 × 0.8',
    distractors: ['150 ÷ 0.8', '0.8 ÷ 150'],
    explanation:
      'もとにする量は去年の「150人」、割合は「0.8倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 150 × 0.8 ＝ 120',
  },
  {
    id: 'k10',
    kind: 'find_kuraberu',
    questionText:
      '牛乳が500mLあります。全体の0.4倍を料理に使います。何mL使いますか？',
    correctExpression: '500 × 0.4',
    distractors: ['500 ÷ 0.4', '0.4 ÷ 500'],
    explanation:
      'もとにする量は牛乳全体の「500mL」、割合は「0.4倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 500 × 0.4 ＝ 200',
  },
  {
    id: 'k11',
    kind: 'find_kuraberu',
    questionText:
      '通学路の道のりは800mです。全体の0.5倍を歩きました。歩いた道のりは何mですか？',
    correctExpression: '800 × 0.5',
    distractors: ['800 ÷ 0.5', '0.5 ÷ 800'],
    explanation:
      'もとにする量は道のりの「800m」、割合は「0.5倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 800 × 0.5 ＝ 400',
  },
  {
    id: 'k12',
    kind: 'find_kuraberu',
    questionText:
      '畑は250㎡あります。全体の0.6倍にトマトを植えました。トマトを植えたのは何㎡ですか？',
    correctExpression: '250 × 0.6',
    distractors: ['250 ÷ 0.6', '0.6 ÷ 250'],
    explanation:
      'もとにする量は畑全体の「250㎡」、割合は「0.6倍」です。\n比べる量 ＝ もとにする量 × 割合 なので 250 × 0.6 ＝ 150',
  },
];

// ============================================================
//  もとにする量を求める 12問
//  （もとにする量 ＝ 比べる量 ÷ 割合）
// ============================================================
const findMotoniProblems: ProblemSeed[] = [
  {
    id: 'm01',
    kind: 'find_motoni',
    questionText:
      'バスに24人乗っていて、これは定員の0.6倍です。定員は何人ですか？',
    correctExpression: '24 ÷ 0.6',
    distractors: ['24 × 0.6', '0.6 ÷ 24'],
    explanation:
      '比べる量は乗っている「24人」、割合は「0.6倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 24 ÷ 0.6 ＝ 40',
  },
  {
    id: 'm02',
    kind: 'find_motoni',
    questionText:
      'ケーキが20個売れました。これは全体の0.4倍にあたります。ケーキはもともと何個ありましたか？',
    correctExpression: '20 ÷ 0.4',
    distractors: ['20 × 0.4', '0.4 ÷ 20'],
    explanation:
      '比べる量は売れた「20個」、割合は「0.4倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 20 ÷ 0.4 ＝ 50',
  },
  {
    id: 'm03',
    kind: 'find_motoni',
    questionText:
      '花子さんのテストの点数は160点で、これは満点の0.8倍です。このテストは何点満点ですか？',
    correctExpression: '160 ÷ 0.8',
    distractors: ['160 × 0.8', '0.8 ÷ 160'],
    explanation:
      '比べる量は花子さんの点数「160点」、割合は「0.8倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 160 ÷ 0.8 ＝ 200',
  },
  {
    id: 'm04',
    kind: 'find_motoni',
    questionText:
      '赤いリボンは20cmで、これは青いリボンの0.5倍の長さです。青いリボンは何cmですか？',
    correctExpression: '20 ÷ 0.5',
    distractors: ['20 × 0.5', '0.5 ÷ 20'],
    explanation:
      '比べる量は赤いリボンの「20cm」、割合は「0.5倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 20 ÷ 0.5 ＝ 40',
  },
  {
    id: 'm05',
    kind: 'find_motoni',
    questionText:
      '水そうに18Lの水が入っています。これは満水の0.6倍です。この水そうは満水で何L入りますか？',
    correctExpression: '18 ÷ 0.6',
    distractors: ['18 × 0.6', '0.6 ÷ 18'],
    explanation:
      '比べる量は今の水の量「18L」、割合は「0.6倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 18 ÷ 0.6 ＝ 30',
  },
  {
    id: 'm06',
    kind: 'find_motoni',
    questionText:
      '今月のお小遣いで400円使いました。これはお小遣い全体の0.4倍にあたります。お小遣いは全部で何円ですか？',
    correctExpression: '400 ÷ 0.4',
    distractors: ['400 × 0.4', '0.4 ÷ 400'],
    explanation:
      '比べる量は使った「400円」、割合は「0.4倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 400 ÷ 0.4 ＝ 1000',
  },
  {
    id: 'm07',
    kind: 'find_motoni',
    questionText:
      '図書委員は100人で、これは全校生徒の0.2倍にあたります。全校生徒は何人ですか？',
    correctExpression: '100 ÷ 0.2',
    distractors: ['100 × 0.2', '0.2 ÷ 100'],
    explanation:
      '比べる量は図書委員の「100人」、割合は「0.2倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 100 ÷ 0.2 ＝ 500',
  },
  {
    id: 'm08',
    kind: 'find_motoni',
    questionText:
      '板を30cm切り取りました。これは板全体の0.5倍にあたります。板はもともと何cmありましたか？',
    correctExpression: '30 ÷ 0.5',
    distractors: ['30 × 0.5', '0.5 ÷ 30'],
    explanation:
      '比べる量は切り取った「30cm」、割合は「0.5倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 30 ÷ 0.5 ＝ 60',
  },
  {
    id: 'm09',
    kind: 'find_motoni',
    questionText:
      '今年のマラソン大会の参加者は120人で、これは去年の0.8倍です。去年の参加者は何人でしたか？',
    correctExpression: '120 ÷ 0.8',
    distractors: ['120 × 0.8', '0.8 ÷ 120'],
    explanation:
      '比べる量は今年の「120人」、割合は「0.8倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 120 ÷ 0.8 ＝ 150',
  },
  {
    id: 'm10',
    kind: 'find_motoni',
    questionText:
      '料理に牛乳を200mL使いました。これは全体の0.4倍にあたります。牛乳はもともと何mLありましたか？',
    correctExpression: '200 ÷ 0.4',
    distractors: ['200 × 0.4', '0.4 ÷ 200'],
    explanation:
      '比べる量は使った牛乳「200mL」、割合は「0.4倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 200 ÷ 0.4 ＝ 500',
  },
  {
    id: 'm11',
    kind: 'find_motoni',
    questionText:
      '400m歩きました。これは通学路全体の0.5倍にあたります。通学路は全部で何mですか？',
    correctExpression: '400 ÷ 0.5',
    distractors: ['400 × 0.5', '0.5 ÷ 400'],
    explanation:
      '比べる量は歩いた「400m」、割合は「0.5倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 400 ÷ 0.5 ＝ 800',
  },
  {
    id: 'm12',
    kind: 'find_motoni',
    questionText:
      'トマトを植えた面積は150㎡で、これは畑全体の0.6倍にあたります。畑全体は何㎡ですか？',
    correctExpression: '150 ÷ 0.6',
    distractors: ['150 × 0.6', '0.6 ÷ 150'],
    explanation:
      '比べる量はトマトの面積「150㎡」、割合は「0.6倍」です。\nもとにする量 ＝ 比べる量 ÷ 割合 なので 150 ÷ 0.6 ＝ 250',
  },
];

export const allProblems: ProblemSeed[] = [
  ...findWariaiProblems,
  ...findKuraberuProblems,
  ...findMotoniProblems,
];
