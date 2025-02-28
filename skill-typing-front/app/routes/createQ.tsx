import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import TextareaAutosize from "react-textarea-autosize";

type Question = {
  title: string;
  content: string;
  category: string;
  choices: { content: string; description: string }[];
  AnswerIndex: number;
  Explanation: string;
};

const App = () => {
  const [questions, setQuestions] = useState<Question | null>(null);
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
        `${apiUrl}/api/generate-quiz?category=${encodeURI(category)}&keyword=${encodeURI(word)}`,
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

      setQuestions(result);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // 保存ボタンを押した時の処理
  const handlesave = async () => {
    if (!questions) {
      console.error("エラー: 質問が選択されていません");
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URI;
      const response = await fetch(`${apiUrl}/api/questions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questions),
      });

      if (!response.ok) throw new Error("サーバーとの通信に失敗しました");

      console.log("サーバーからのレスポンス:", await response.json());

      setCategory("");
      setWord("");
      setQuestions(null);
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

      <p className="mt-4 text-center text-gray-700">単語</p>
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
          className="relative inline-block rounded border border-gray-400 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
        >
          戻る
        </button>
        <button
          onClick={handleCreate}
          className="relative inline-block rounded border border-gray-400 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
        >
          作成
        </button>
      </div>

      <div>
        {/* apiで返ってきた問題、選択肢、解説の表示 */}
        {questions && (
          <div className="mx-auto mt-12 w-full rounded-lg border bg-white p-5 shadow-lg">
            <TextareaAutosize
              value={questions.title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setQuestions((prev) => ({
                  ...prev!,
                  title: e.target.value,
                }))
              }
              className="w-1/3 text-xl font-bold text-gray-800"
              minRows={1} // 最小1行から開始
              maxRows={10} // 最大10行まで拡張
            />
            <TextareaAutosize
              value={questions.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setQuestions({
                  ...questions,
                  content: e.target.value,
                })
              }
              className="mt-2 w-full rounded border border-gray-300 p-2"
              minRows={1} // 最小1行から開始
              maxRows={10} // 最大10行まで拡張
            />
            <ul className="mt-3 space-y-2">
              {questions.choices.map((choice, index) => (
                <li key={index} className="mb-4">
                  <TextareaAutosize
                    value={choice.content}
                    // {/* 選択肢の入力欄 */}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const updatedChoices = [...questions.choices];
                      updatedChoices[index] = {
                        ...choice,
                        content: e.target.value,
                      };
                      setQuestions({
                        ...questions,
                        choices: updatedChoices,
                      });
                    }}
                    className="w-1/2 rounded border border-gray-300 p-2"
                    minRows={1} // 最小1行から開始
                    maxRows={10} // 最大10行まで拡張
                  />

                  {/* 解説の入力欄 */}
                  <TextareaAutosize
                    value={choice.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const updatedChoices = [...questions.choices];
                      updatedChoices[index] = {
                        ...choice,
                        description: e.target.value,
                      };
                      setQuestions({
                        ...questions,
                        choices: updatedChoices,
                      });
                    }}
                    className="mt-1 w-full rounded border border-gray-300 p-2"
                    minRows={1} // 最小1行から開始
                    maxRows={10} // 最大10行まで拡張
                    placeholder="解説を入力してください"
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handlesave}
                className="relative inline-block rounded border !border-gray-900 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
              >
                保存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
