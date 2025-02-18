import React from "react";
import Button from "../button";

export default function GameResult({
  score,
  onShowExplanation,
}: {
  score: number;
  onShowExplanation: () => void;
}) {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="-translate-y-12 transform text-center">
        <p className="text-2xl text-gray-900">最終スコア : {score}点</p>
        <Button onClick={onShowExplanation} className="mt-4">
          用語解説
        </Button>
      </div>
    </div>
  );
}
