import type { Problem, ProblemSeed, ProblemKind } from '@/types/problem.ts';
import { shuffle } from '@/utils/random.ts';
import { allProblems } from '@/data/problems.ts';

/** ProblemSeed を選択肢シャッフル済みの Problem に変換する */
function seedToProblem(seed: ProblemSeed): Problem {
  const allChoices = [seed.correctExpression, ...seed.distractors];
  const shuffled = shuffle(allChoices);
  const correctIndex = shuffled.indexOf(seed.correctExpression);

  return {
    id: seed.id,
    kind: seed.kind,
    questionText: seed.questionText,
    correctExpression: seed.correctExpression,
    choices: shuffled,
    correctIndex,
    explanation: seed.explanation,
  };
}

/** 問題プールから指定数を3種類均等に選んで出題する */
export function generateProblemSet(count: number): Problem[] {
  const kinds: ProblemKind[] = ['find_wariai', 'find_kuraberu', 'find_motoni'];
  const poolByKind = new Map<ProblemKind, ProblemSeed[]>();
  for (const kind of kinds) {
    poolByKind.set(kind, shuffle(allProblems.filter((p) => p.kind === kind)));
  }

  const selected: ProblemSeed[] = [];
  let kindIndex = 0;

  while (selected.length < count) {
    const kind = kinds[kindIndex % kinds.length];
    const pool = poolByKind.get(kind)!;
    const alreadyUsed = selected.filter((s) => s.kind === kind).length;

    if (alreadyUsed < pool.length) {
      selected.push(pool[alreadyUsed]);
    }

    kindIndex++;

    // 全種類の問題を使い切ったら終了
    const totalAvailable = kinds.reduce(
      (sum, k) => sum + poolByKind.get(k)!.length,
      0,
    );
    if (selected.length >= totalAvailable) break;
  }

  return shuffle(selected).map(seedToProblem);
}
