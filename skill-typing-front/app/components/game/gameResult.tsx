import React from "react";
import Button from "~/components/button";
import { resultColors, type GameResultProps } from "~/types/types";

export default function GameResult({
  score,
  results,
  handleShowExplanation,
}: GameResultProps) {
  return (
    <div className="mx-auto grid w-full max-w-screen-lg place-items-center gap-4 px-4">
      <h1 className="text-center text-2xl text-gray-900">結果一覧</h1>
      <p className="text-2xl text-gray-900">最終スコア {score}点</p>
      <ul className="grid grid-cols-1 gap-2 rounded bg-blue-200 p-4 sm:grid-cols-2 md:grid-cols-4">
        {results.map((result, index) => (
          <li
            key={index}
            className="grid w-32 grid-cols-2 rounded bg-white p-4"
          >
            <span className="justify-self-start">{index + 1}問目</span>
            <span className={`justify-self-end ${resultColors[result]}`}>
              {result}
            </span>
          </li>
        ))}
      </ul>
      <Button onClick={handleShowExplanation}>用語解説</Button>
    </div>
  );
}
