import { useState } from 'react';
import type { Problem } from '@/types/problem.ts';
import type { ProblemKind } from '@/types/problem.ts';
import type { QuizDetail } from '@/hooks/useQuiz.ts';
import { generateProblemSet } from '@/data/generator.ts';
import { saveResult } from '@/utils/history.ts';
import { StartScreen } from '@/components/StartScreen.tsx';
import { QuizScreen } from '@/components/QuizScreen.tsx';
import { ResultScreen } from '@/components/ResultScreen.tsx';
import { ExplanationScreen } from '@/components/ExplanationScreen.tsx';
import { HistoryScreen } from '@/components/HistoryScreen.tsx';

type AppScreen = 'start' | 'quiz' | 'result' | 'explanation' | 'history';

function App() {
  const [screen, setScreen] = useState<AppScreen>('start');
  const [previousScreen, setPreviousScreen] = useState<AppScreen>('start');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [score, setScore] = useState(0);
  const [details, setDetails] = useState<QuizDetail[]>([]);
  const [highlightKind, setHighlightKind] = useState<ProblemKind | null>(null);

  const handleStart = (count: number) => {
    const generated = generateProblemSet(count);
    setProblems(generated);
    setScore(0);
    setDetails([]);
    setScreen('quiz');
  };

  const handleComplete = (finalScore: number, quizDetails: QuizDetail[]) => {
    setScore(finalScore);
    setDetails(quizDetails);

    saveResult({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      total: problems.length,
      score: finalScore,
      details: quizDetails,
    });

    setScreen('result');
  };

  const handleRetry = () => {
    setScreen('start');
  };

  const handleOpenExplanation = (kind: ProblemKind | null) => {
    setPreviousScreen(screen);
    setHighlightKind(kind);
    setScreen('explanation');
  };

  const handleBackFromExplanation = () => {
    setScreen(previousScreen);
  };

  const handleOpenHistory = () => {
    setScreen('history');
  };

  const handleBackFromHistory = () => {
    setScreen('start');
  };

  return (
    <div className="mx-auto max-w-md min-h-dvh">
      {screen === 'start' && (
        <StartScreen
          onStart={handleStart}
          onOpenExplanation={() => handleOpenExplanation(null)}
          onOpenHistory={handleOpenHistory}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          problems={problems}
          onComplete={handleComplete}
          onOpenExplanation={handleOpenExplanation}
          onHome={handleRetry}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          score={score}
          total={problems.length}
          details={details}
          onRetry={handleRetry}
        />
      )}
      {screen === 'explanation' && (
        <ExplanationScreen
          highlightKind={highlightKind}
          onBack={handleBackFromExplanation}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen onBack={handleBackFromHistory} />
      )}
    </div>
  );
}

export default App;
