import React from "react";
import GameTitle from "./gameTitle";
import GameContent from "./gameContent";
import GameForm from "./gameForm";
import type { GameScreenProps } from "~/types/types";

export default function GameScreen({
  question,
  countTime,
  questionsLength,
  currentQuestionIndex,
  handleSubmit,
  userAnswer,
  setUserAnswer,
  isLastQuestion,
}: GameScreenProps) {
  return (
    <div className="mx-auto grid w-full max-w-screen-lg gap-4 px-4">
      <GameTitle
        question={question}
        countTime={countTime}
        questionsLength={questionsLength}
        currentQuestionIndex={currentQuestionIndex}
      />
      <GameContent question={question} />
      <GameForm
        handleSubmit={handleSubmit}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        isLastQuestion={isLastQuestion}
      />
    </div>
  );
}
