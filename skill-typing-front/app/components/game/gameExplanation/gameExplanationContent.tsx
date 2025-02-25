import React from "react";
import type { Question } from "~/types/types";

export default function GameExplanationContent({
  question,
}: {
  question: Question;
}) {
  return (
    <div className="grid gap-2 rounded bg-blue-200 p-4">
      <p className="rounded bg-white p-4 text-gray-900 md:min-h-[150px]">
        {question.content}
      </p>
      <ul className="grid gap-2">
        {question.choices.map((choice) => (
          <li key={choice.id} className="rounded bg-white p-4 text-gray-900">
            <p>{choice.content}</p>
            <p>{choice.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
