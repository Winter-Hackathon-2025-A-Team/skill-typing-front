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
    <div className="grid pt-20">
      <div className="mx-auto grid w-full max-w-screen-lg gap-4 px-4">
        <GameExplanationContent question={question} />
        <GameExplanationPagination
          currentExplanationIndex={currentExplanationIndex}
          decreaseIndex={handleDecreaseExplanationIndex}
          increaseIndex={handleIncreaseExplanationIndex}
        />
        <div className="grid place-items-center gap-2">
          <LinkButton url="/">ホームに戻る</LinkButton>
        </div>
      </div>
    </div>
  );
}
