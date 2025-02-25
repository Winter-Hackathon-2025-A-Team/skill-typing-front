import React from "react";
import GameExplanationContent from "./gameExplanationContent";
import GameExplanationPagination from "./gameExplanationPagination";
import LinkButton from "~/components/linkButton";
import type { GameExplanationProps } from "~/types/types";

export default function GameExplanation({
  question,
  results,
  currentExplanationIndex,
  handleDecreaseExplanationIndex,
  handleIncreaseExplanationIndex,
}: GameExplanationProps) {
  const renderExplanation = () => {
    if (results[currentExplanationIndex] === "○") {
      return <p className="grid justify-self-end text-2xl text-green-500">○</p>;
    }
    if (results[currentExplanationIndex] === "✗") {
      return <p className="grid justify-self-end text-2xl text-red-500">✗</p>;
    }
    return <p className="grid justify-self-end text-2xl text-gray-900">-</p>;
  };

  return (
    <div className="mx-auto grid w-full max-w-screen-lg gap-4 px-4">
      <div className="grid grid-cols-2 px-4">
        <h1 className="justify-self-start text-2xl text-gray-900">
          {question.title}
        </h1>
        {renderExplanation()}
      </div>

      <GameExplanationContent question={question} />
      <GameExplanationPagination
        currentExplanationIndex={currentExplanationIndex}
        decreaseIndex={handleDecreaseExplanationIndex}
        increaseIndex={handleIncreaseExplanationIndex}
      />
      <LinkButton url="/" className="justify-self-center">
        ホームに戻る
      </LinkButton>
    </div>
  );
}
