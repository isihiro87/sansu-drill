/** 割合の問題の3つの種類 */
export type ProblemKind = 'find_wariai' | 'find_kuraberu' | 'find_motoni';

/** 手作りの問題データ（選択肢シャッフル前） */
export interface ProblemSeed {
  id: string;
  kind: ProblemKind;
  questionText: string;
  correctExpression: string;
  distractors: string[];
  explanation: string;
}

/** シャッフル済みの出題用問題 */
export interface Problem {
  id: string;
  kind: ProblemKind;
  questionText: string;
  correctExpression: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}
