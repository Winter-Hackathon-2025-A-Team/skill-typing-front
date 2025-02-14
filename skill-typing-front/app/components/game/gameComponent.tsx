import React, { useState } from "react";
import Button from "../button";
import type { Question } from "~/types/types";

export default function GameComponent({
  question,
  onAnswer,
  isLastQuestion,
}: {
  question: Question;
  onAnswer: (answer: string) => void;
  isLastQuestion: boolean;
}) {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAnswer(userAnswer);
    setUserAnswer("");
  };

  return (
    <div className="grid min-h-screen transform place-items-center">
      <div className="w-full max-w-screen-lg">
        <h1 className="mb-4 text-center text-2xl text-gray-900">
          {question.title}
        </h1>
        <div className="rounded bg-blue-200 p-4">
          <p className="mb-4 min-h-[300px] rounded bg-white p-4 text-gray-900">
            {question.content}
          </p>
          <ul className="grid grid-cols-2 gap-4">
            {question.choices.map((choice) => (
              <li
                key={choice.id}
                className="rounded bg-white p-4 text-center text-gray-900"
              >
                {choice.content}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="grid place-items-center">
          <input
            type="text"
            name="answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="答えをここに入力してください"
            className="mt-8 block w-1/2 rounded border border-blue-300 bg-white p-2 text-center text-gray-900"
          />
          <Button type="submit" className="mt-4">
            {isLastQuestion ? "ゲーム終了" : "次の問題"}
          </Button>
        </form>
      </div>
    </div>
  );
}
