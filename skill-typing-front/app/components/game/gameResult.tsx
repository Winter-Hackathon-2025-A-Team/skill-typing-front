import React from "react";
import Button from "~/components/button";
import type { GameResultProps } from "~/types/types";

export default function GameResult({
  score,
  handleShowExplanation,
}: GameResultProps) {
  return (
    <div className="grid place-items-center gap-4">
      <p className="text-2xl text-gray-900">最終スコア : {score}点</p>
      <Button onClick={handleShowExplanation}>用語解説</Button>
    </div>
  );
}
