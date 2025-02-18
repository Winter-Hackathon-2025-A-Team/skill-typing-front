import React, { useState } from "react";

const app = () => {
  const [category, setCategory] = useState<string>("");
  const [word, setWord] = useState<string>("");

  const handleCreate = async () => {
    const data = { category, word };

    try {
      const response = await fetch("バックのエンドポイント記載", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("サーバーとの通信に失敗しました");
      }
      const result = await response.json();
      console.log("サーバーからのレスポンス:", result);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return (
    <div className="container">
      <p className="mt-20 text-center text-gray-700">問題</p>
      <input
        type="text"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        placeholder="ジャンルを入力してください"
        className="placeholder-opacity-50 mx-auto flex w-1/4 justify-center border-b py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />

      <p className="mt-5 text-center text-gray-700">単語</p>
      <input
        type="text"
        value={word}
        onChange={(event) => setWord(event.target.value)}
        placeholder="単語を入力してください"
        className="placeholder-opacity-50 mx-auto flex w-1/4 justify-center border-b py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />
      <div className="absolute right-1/3 my-2 flex">
        <button
          onClick={handleCreate}
          className="boder relative inline-block rounded border-gray-400 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
        >
          作成
        </button>
      </div>
    </div>
  );
};

export default app;
