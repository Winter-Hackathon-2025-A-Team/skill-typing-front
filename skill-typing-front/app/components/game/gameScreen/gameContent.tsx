import React from "react";
import type { Question } from "~/types/types";

export default function GameContent({ question }: { question: Question }) {
  return (
    <div className="grid gap-2 rounded bg-blue-200 p-4">
      <p
        className="rounded bg-white p-4 text-gray-900 md:min-h-[300px]"
        onCopy={(e) => e.preventDefault()}
      >
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
  );
}
