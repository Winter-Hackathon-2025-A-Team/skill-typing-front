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
    <div className="grid pt-20">
      <div className="mx-auto grid w-full max-w-screen-lg gap-4 px-4">
        <h1 className="text-center text-2xl text-gray-900">{question.title}</h1>
        <div className="grid gap-2 rounded bg-blue-200 p-4">
          <p className="rounded bg-white p-4 text-gray-900 md:min-h-[300px]">
            {question.content}
          </p>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {question.choices.map((choice) => (
              <li
                key={choice.id}
                className="rounded bg-white p-4 text-center text-gray-900"
                onCopy={(e) => e.preventDefault()}
              >
                {choice.content}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="grid place-items-center gap-4">
          <input
            type="text"
            name="answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="答えをここに入力してください"
            className="block w-full rounded border border-blue-300 bg-white p-2 text-center text-gray-900 md:w-1/2"
            onPaste={(e) => e.preventDefault()}
          />
          <Button type="submit">
            {isLastQuestion ? "ゲーム終了" : "次の問題"}
          </Button>
        </form>
      </div>
    </div>
  );
}
