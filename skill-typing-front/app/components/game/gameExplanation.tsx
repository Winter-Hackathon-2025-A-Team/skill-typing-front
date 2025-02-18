import React from "react";
import type { Question } from "~/types/types";
import LinkButton from "../linkButton";

export default function GameExplanation({
  question,
  decreaseIndex,
  increaseIndex,
}: {
  question: Question;
  decreaseIndex: () => void;
  increaseIndex: () => void;
}) {
  return (
    <div className="grid pt-20">
      <div className="mx-auto grid w-full max-w-screen-lg gap-4 px-4">
        <div className="grid gap-2 rounded bg-blue-200 p-4">
          <p className="rounded bg-white p-4 text-gray-900 md:min-h-[150px]">
            {question.content}
          </p>
          <ul className="grid gap-2">
            {question.choices.map((choice) => (
              <li
                key={choice.id}
                className="rounded bg-white p-4 text-gray-900"
              >
                <p>{choice.content}</p>
                <p>{choice.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto grid w-fit grid-cols-3 place-items-center gap-2">
          <button onClick={decreaseIndex} className="px-3 py-1 text-gray-900">
            &lt;
          </button>
          <span className="text-center text-gray-900">{question.id}</span>
          <button onClick={increaseIndex} className="px-3 py-1 text-gray-900">
            &gt;
          </button>
        </div>
        <div className="grid place-items-center gap-2">
          <LinkButton url="/">ホームに戻る</LinkButton>
        </div>
      </div>
    </div>
  );
}
