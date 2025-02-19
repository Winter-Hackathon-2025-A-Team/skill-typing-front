import React, { useState, useEffect } from "react";
import GameComponent from "~/components/game/gameComponent";
import GameResult from "~/components/game/gameResult";
import GameExplanation from "~/components/game/gameExplanation";
import type { Choice, Question } from "~/types/types";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router";
import useCountDownTimer from "~/hooks/useCountDownTimer";

export default function Game() {
  const auth = useAuth();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [screen, setScreen] = useState("game");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentExplanationIndex, setCurrentExplanationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [countTime, setCountTime] = useState<number>(60);

  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  useCountDownTimer(countTime, setCountTime);

  useEffect(() => {
    if (countTime === 0) {
      setScreen("result");
    }
  }, [countTime]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = auth.user?.access_token;
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/api/game/questions?category=${category}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${response.status} ${errorText}`);
        }

        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "予期しないエラーが発生しました";
        setError(errorMessage);
        console.error("問題取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [auth.isLoading, auth.user, category]);

  const handleAnswer = async (userInput: string) => {
    if (!questions) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctChoice = currentQuestion.choices.find(
      (choice: Choice) => choice.id === currentQuestion.answer_id,
    );

    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedCorrectContent =
      correctChoice?.content.trim().toLowerCase() ?? "";

    let newScore = score;
    if (normalizedInput === normalizedCorrectContent) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      try {
        const uri = import.meta.env.VITE_API_URI;
        const token = auth.user?.access_token;
        await fetch(`${uri}/api/scores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ score: newScore }),
        });
      } catch (error) {
        console.error("スコアの保存に失敗しました:", error);
      }
      setScreen("result");
    }
  };

  const handleShowExplanation = () => {
    setScreen("explanation");
  };

  const handleDecreaseExplanationIndex = () => {
    if (!questions) return;

    if (
      currentExplanationIndex > 0 &&
      currentExplanationIndex <= questions.length - 1
    ) {
      setCurrentExplanationIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleIncreaseExplanationIndex = () => {
    if (!questions) return;

    if (currentExplanationIndex < questions.length - 1) {
      setCurrentExplanationIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-center">読み込み中...</p>
      ) : error ? (
        <p className="text-center text-red-500">エラー: {error}</p>
      ) : (
        questions && (
          <>
            {screen === "game" && (
              <GameComponent
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                isLastQuestion={currentQuestionIndex === questions.length - 1}
                countTime={countTime}
              />
            )}
            {screen === "result" && (
              <GameResult
                score={score}
                onShowExplanation={handleShowExplanation}
              />
            )}
            {screen === "explanation" && (
              <GameExplanation
                question={questions[currentExplanationIndex]}
                decreaseIndex={handleDecreaseExplanationIndex}
                increaseIndex={handleIncreaseExplanationIndex}
              />
            )}
          </>
        )
      )}
    </>
  );
}
