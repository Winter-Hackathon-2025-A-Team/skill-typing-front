import React from "react";
import type { GameTitleProps } from "~/types/types";

export default function GameTitle({
  question,
  countTime,
  questionsLength,
  currentQuestionIndex,
}: GameTitleProps) {
  return (
    <div className="grid grid-cols-2 px-4">
      <h1 className="justify-self-start text-2xl text-gray-900">
        {question.title}
      </h1>
      <div className="grid justify-self-end">
        <p className="text-center">残り時間 : {countTime} 秒</p>
        <progress
          max={questionsLength}
          value={currentQuestionIndex}
          className="[&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-blue-600 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-blue-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-600"
        />
      </div>
    </div>
  );
}
