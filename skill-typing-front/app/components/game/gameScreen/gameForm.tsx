import React from "react";
import Button from "../../button";
import type { GameFormProps } from "~/types/types";

export default function GameForm({
  handleSubmit,
  userAnswer,
  setUserAnswer,
  isLastQuestion,
}: GameFormProps) {
  return (
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
  );
}
