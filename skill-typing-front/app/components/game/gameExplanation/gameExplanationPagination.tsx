import React from "react";
import type { GameExplanationPaginationProps } from "~/types/types";

export default function GameExplanationPagination({
  currentExplanationIndex,
  decreaseIndex,
  increaseIndex,
}: GameExplanationPaginationProps) {
  return (
    <div className="mx-auto grid w-fit grid-cols-3 place-items-center gap-2">
      <button onClick={decreaseIndex} className="px-3 py-1 text-gray-900">
        &lt;
      </button>
      <span className="text-center text-gray-900">
        {currentExplanationIndex + 1}
      </span>
      <button onClick={increaseIndex} className="px-3 py-1 text-gray-900">
        &gt;
      </button>
    </div>
  );
}
