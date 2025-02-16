import React, { useState } from "react";
import GameComponent from "~/components/game/gameComponent";
import GameResult from "~/components/game/gameResult";
import GameExplanation from "~/components/game/gameExplanation";
import type { Choice, Question } from "~/types/types";
import { useLoaderData } from "react-router";

export async function clientLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const response = await fetch(
    `${import.meta.env.VITE_API_URI}/api/game/questions?category=${category}`,
  );
  return response.json();
}

export default function Game() {
  const { questions } = useLoaderData() as { questions: Question[] };
  const [screen, setScreen] = useState("game");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentExplanationIndex, setCurrentExplanationIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = async (userInput: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    const correctChoice = currentQuestion.choices.find(
      (choice: Choice) => choice.id === currentQuestion.answer_id,
    );

    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedCorrectContent = correctChoice?.content
      .trim()
      .toLowerCase();

    if (normalizedInput === normalizedCorrectContent) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const uri = import.meta.env.VITE_API_URI;
      await fetch(`${uri}/api/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: score + 1 }),
      });
      setScreen("result");
    }
  };

  const handleShowExplanation = () => {
    setScreen("explanation");
  };

  const handleDecreaseExplanationIndex = () => {
    if (
      currentExplanationIndex > 0 &&
      currentExplanationIndex <= questions.length - 1
    ) {
      setCurrentExplanationIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleIncreaseExplanationIndex = () => {
    if (currentExplanationIndex < questions.length - 1) {
      setCurrentExplanationIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      {screen === "game" && (
        <GameComponent
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}
      {screen === "result" && (
        <GameResult score={score} onShowExplanation={handleShowExplanation} />
      )}
      {screen === "explanation" && (
        <GameExplanation
          question={questions[currentExplanationIndex]}
          decreaseIndex={handleDecreaseExplanationIndex}
          increaseIndex={handleIncreaseExplanationIndex}
        />
      )}
    </>
  );
}
