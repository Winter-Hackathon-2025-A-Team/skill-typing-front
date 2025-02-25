import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";

const app = () => {
  const [category, setCategory] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth.user?.access_token;
  // 作成ボタンを押した時の処理
  const handleCreate = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URI;
      const response = await fetch(
        `${apiUrl}/api/generate-quiz?category=${encodeURI(category)}&topic=${encodeURI(word)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("サーバーとの通信に失敗しました");
      }
      const result = await response.json();
      console.log("サーバーからのレスポンス:", result);

      setCategory("");
      setWord("");
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container">
      {/* カテゴリと単語の入力 */}
      <p className="text-center text-gray-700">ジャンル</p>
      <input
        type="text"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        placeholder="ジャンルを入力してください"
        className="placeholder-opacity-50 mx-auto flex w-1/4 border-b py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />

      <p className="text-center text-gray-700">単語</p>
      <input
        type="text"
        value={word}
        onChange={(event) => setWord(event.target.value)}
        placeholder="単語を入力してください"
        className="placeholder-opacity-50 mx-auto flex w-1/4 border-b py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />
      <div className="center relative my-1 flex w-full justify-around">
        <button
          onClick={() => handleNavigate("/management")}
          className="boder relative inline-block rounded border-gray-400 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
        >
          戻る
        </button>
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
