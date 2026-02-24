import { useState, useCallback, useRef } from 'react';
import type { Problem } from '@/types/problem.ts';
import type { ProblemKind } from '@/types/problem.ts';

export interface QuizDetail {
  kind: ProblemKind;
  correct: boolean;
}

export interface UseQuizReturn {
  currentIndex: number;
  currentProblem: Problem;
  selectedChoice: number | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  isComplete: boolean;
  score: number;
  totalCount: number;
  results: QuizDetail[];
  selectChoice: (index: number) => void;
  nextProblem: () => void;
}

export function useQuiz(problems: Problem[]): UseQuizReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const resultsRef = useRef<QuizDetail[]>([]);

  const currentProblem = problems[currentIndex];
  const isAnswered = selectedChoice !== null;
  const isCorrect = isAnswered
    ? selectedChoice === currentProblem.correctIndex
    : null;
  const isComplete = isAnswered && currentIndex >= problems.length - 1;

  const selectChoice = useCallback(
    (index: number) => {
      if (isAnswered) return;
      setSelectedChoice(index);
      const correct = index === currentProblem.correctIndex;
      if (correct) {
        setScore((s) => s + 1);
      }
      resultsRef.current = [
        ...resultsRef.current,
        { kind: currentProblem.kind, correct },
      ];
    },
    [isAnswered, currentProblem.correctIndex, currentProblem.kind],
  );

  const nextProblem = useCallback(() => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedChoice(null);
    }
  }, [currentIndex, problems.length]);

  return {
    currentIndex,
    currentProblem,
    selectedChoice,
    isAnswered,
    isCorrect,
    isComplete,
    score,
    totalCount: problems.length,
    results: resultsRef.current,
    selectChoice,
    nextProblem,
  };
}
