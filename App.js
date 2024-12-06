import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WordDisplay from './components/WordDisplay';
import WordInput from './components/WordInput';
import Results from './components/Results';
import RestartButton from './components/RestartButton';
import { startTimer, stopTimer, setResult } from './redux/actions';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);

    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return <h2>Something went wrong.</h2>;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { timer, isTimerRunning, words, typedWords, result } = useSelector(state => state);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const countdown = setInterval(() => {
        dispatch(startTimer());
      }, 1000);

      return () => clearInterval(countdown);
    }

    if (timer === 0) {
      dispatch(stopTimer());
      const correctWords = typedWords.filter((word, index) => word === words[index]);
      const incorrectWords = typedWords.filter((word, index) => word !== words[index]);

      dispatch(setResult({
        correct: correctWords.length,
        incorrect: incorrectWords.length,
      }));
    }
  }, [dispatch, timer, isTimerRunning, typedWords, words]);

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Typing Speed Test</h1>
        {result ? (
          <Results />
        ) : (
          <>
            <WordDisplay />
            <WordInput />
            <div>
              <span>Time Left: {timer}s</span>
              <RestartButton />
            </div>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
