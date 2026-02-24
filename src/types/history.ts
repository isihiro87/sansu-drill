import type { ProblemKind } from '@/types/problem.ts';

export interface QuizResult {
  id: string;
  date: string;
  total: number;
  score: number;
  details: {
    kind: ProblemKind;
    correct: boolean;
  }[];
}
