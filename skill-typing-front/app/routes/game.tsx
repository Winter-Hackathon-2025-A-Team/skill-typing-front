import React, { useCallback, useReducer, type JSX } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router";
import useCountDownTimer from "~/hooks/useCountDownTimer";
import useFetchQuestions from "~/hooks/useFetchQuestions";
import handleAnswer from "~/utils/handleAnswer";
import GameScreen from "~/components/game/gameScreen/gameScreen";
import GameResult from "~/components/game/gameResult";
import GameExplanation from "~/components/game/gameExplanation/gameExplanation";
import { gameReducer, initialState } from "~/hooks/gameReducer";
import Loading from "~/components/loading";
import Error from "~/components/error";
import useSound from "use-sound";

export default function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const {
    questions,
    loading,
    error,
    screen,
    currentQuestionIndex,
    currentExplanationIndex,
    userAnswer,
    score,
    countTime,
  } = state;
  const [playCorrectAnswer] = useSound(
    "../../public/Quiz-Correct_Answer01-1.mp3",
  );
  const [playWrongAnswer] = useSound("../../public/Quiz-Wrong_Buzzer02-1.mp3");

  const auth = useAuth();
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useCountDownTimer(
    countTime,
    useCallback(
      (time) => {
        dispatch({ type: "SET_COUNT_TIME", payload: time });
      },
      [dispatch],
    ),
    useCallback(() => {
      dispatch({ type: "SET_SCREEN", payload: "result" });
    }, [dispatch]),
  );

  useFetchQuestions({
    setLoading: useCallback(
      (loading) => dispatch({ type: "SET_LOADING", payload: loading }),
      [dispatch],
    ),
    setError: useCallback(
      (error) => dispatch({ type: "SET_ERROR", payload: error }),
      [dispatch],
    ),
    setQuestions: useCallback(
      (questions) => dispatch({ type: "SET_QUESTIONS", payload: questions }),
      [dispatch],
    ),
    auth,
    category,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAnswer({
        questions,
        currentQuestionIndex,
        setCurrentQuestionIndex: () =>
          dispatch({ type: "INCREMENT_QUESTION_INDEX" }),
        userAnswer,
        score,
        setScore: (score) => dispatch({ type: "SET_SCORE", payload: score }),
        auth,
        setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
        setLoading: (loading) =>
          dispatch({ type: "SET_LOADING", payload: loading }),
        setScreen: () => dispatch({ type: "SET_SCREEN", payload: "result" }),
        playCorrectAnswer: playCorrectAnswer,
        playWrongAnswer: playWrongAnswer,
      });
      dispatch({ type: "RESET_USER_ANSWER" });
    },
    [questions, currentQuestionIndex, userAnswer, score, auth],
  );

  const handleDecreaseExplanationIndex = useCallback(() => {
    if (!questions) return;
    if (
      currentExplanationIndex > 0 &&
      currentExplanationIndex <= questions.length - 1
    ) {
      dispatch({ type: "DECREMENT_EXPLANATION_INDEX" });
    }
  }, [questions, currentExplanationIndex]);

  const handleIncreaseExplanationIndex = useCallback(() => {
    if (!questions) return;
    if (currentExplanationIndex < questions.length - 1) {
      dispatch({ type: "INCREMENT_EXPLANATION_INDEX" });
    }
  }, [questions, currentExplanationIndex]);

  const handleShowExplanation = useCallback(() => {
    dispatch({ type: "SET_SCREEN", payload: "explanation" });
  }, [dispatch]);

  const memoizedSetUserAnswer = useCallback(
    (answer: string) => {
      dispatch({ type: "SET_USER_ANSWER", payload: answer });
    },
    [dispatch],
  );

  const screenComponents: { [key: string]: JSX.Element } = {
    game: (
      <GameScreen
        question={questions[currentQuestionIndex]}
        countTime={countTime}
        questionsLength={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        handleSubmit={handleSubmit}
        userAnswer={userAnswer}
        setUserAnswer={memoizedSetUserAnswer}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    ),
    result: (
      <GameResult score={score} handleShowExplanation={handleShowExplanation} />
    ),
    explanation: (
      <GameExplanation
        question={questions[currentExplanationIndex]}
        currentExplanationIndex={currentExplanationIndex}
        handleDecreaseExplanationIndex={handleDecreaseExplanationIndex}
        handleIncreaseExplanationIndex={handleIncreaseExplanationIndex}
      />
    ),
  };

  const renderContent = useCallback(() => {
    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    if (!questions || questions.length === 0) {
      return <p className="text-gray-900">質問が見つかりませんでした。</p>;
    }
    return screenComponents[screen] || null;
  }, [
    loading,
    error,
    questions,
    screen,
    currentQuestionIndex,
    countTime,
    handleSubmit,
    userAnswer,
    memoizedSetUserAnswer,
    score,
    currentExplanationIndex,
    handleDecreaseExplanationIndex,
    handleIncreaseExplanationIndex,
    handleShowExplanation,
  ]);

  return <>{renderContent()}</>;
}
