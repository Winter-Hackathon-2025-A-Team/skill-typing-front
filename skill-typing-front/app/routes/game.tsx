import React, { useState } from "react";
import GameComponent from "~/components/game/gameComponent";
import GameResult from "~/components/game/gameResult";
import GameExplanation from "~/components/game/gameExplanation";
import type { Choice, QuestionsResponse } from "~/types/types";

export async function clientLoader() {
  const response = await fetch("/api/game/questions");

  const questions: QuestionsResponse = await response.json();

  return questions;
}

export default function Game({
  loaderData,
}: {
  loaderData: QuestionsResponse;
}) {
  const { questions } = loaderData;
  const [screen, setScreen] = useState("game");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentExplanationIndex, setCurrentExplanationIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (userInput: string) => {
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
