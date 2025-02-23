import React from "react";
import GameExplanationContent from "./gameExplanationContent";
import GameExplanationPagination from "./gameExplanationPagination";
import LinkButton from "~/components/linkButton";
import type { GameExplanationProps } from "~/types/types";

export default function GameExplanation({
  question,
  currentExplanationIndex,
  handleDecreaseExplanationIndex,
  handleIncreaseExplanationIndex,
}: GameExplanationProps) {
  return (
    <div className="mx-auto grid w-full max-w-screen-lg gap-4 px-4">
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
