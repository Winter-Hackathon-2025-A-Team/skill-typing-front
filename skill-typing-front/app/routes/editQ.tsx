import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "react-oidc-context";

type Category = { id: number; title: string };
type Question = {
  id: number;
  title: string;
  content: string;
  category: Category;
  choices: { id: number; content: string; description: string }[];
};
type SelectOption = { value: number; label: string };

function SelectComponent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(
    null,
  );
  const [words, setWords] = useState<SelectOption[]>([]);
  const [selectedWord, setSelectedWord] = useState<SelectOption | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth.user?.access_token;

  // カテゴリのプルダウン表示の処理
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URI;
    axios
      .post(`${apiUrl}/api/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const SendQuestions: Question[] = response.data.questions;

        const uniqueCategories = Array.from(
          new Map(
            SendQuestions.map((q) => [q.category.id, q.category]),
          ).values(),
        ).map((cat) => ({ value: cat.id, label: cat.title }));

        setQuestions(SendQuestions);
        setCategories(uniqueCategories);
      });
  }, []);

  //  単語のプルダウン表示の処理
  useEffect(() => {
    if (selectedCategory) {
      const filteredWords = questions
        .filter((q) => q.category.id === selectedCategory.value)
        .map((q) => ({ value: q.id, label: q.title }));
      setWords(filteredWords);
    } else {
      setWords([]);
    }
    setSelectedWord(null);
    setSelectedQuestion(null);
  }, [selectedCategory, questions]);

  // 表示ボタンを押した時の処理
  const handleappear = () => {
    if (selectedWord) {
      const foundQuestion = questions.find((q) => q.id === selectedWord.value);
      setSelectedQuestion(foundQuestion || null);
    }
  };

  // 保存ボタンを押した時の処理
  const handlesave = async () => {
    if (!selectedQuestion) {
      console.error("エラー: 質問が選択されていません");
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URI;
      const response = await fetch(
        `${apiUrl}/api/questions/${selectedQuestion.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedQuestion),
        },
      );

      if (!response.ok) throw new Error("サーバーとの通信に失敗しました");

      console.log("サーバーからのレスポンス:", await response.json());
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // 削除ボタンを押した時の処理
  const handledelete = async () => {
    if (!selectedQuestion) {
      console.error("エラー: 質問が選択されていません");
      return;
    }

    if (!window.confirm("削除しますか？")) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URI;
      const response = await fetch(
        `${apiUrl}/api/questions/${selectedQuestion.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("サーバーとの通信に失敗しました");

      console.log("サーバーからのレスポンス:", await response.json());
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // 戻るボタンを押した時の処理
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container">
      {/* プルダウンリストから取得したカテゴリーと単語を選択 */}
      <p className="text-center text-gray-700">問題</p>
      <Select
        value={selectedCategory}
        options={categories}
        onChange={setSelectedCategory}
        placeholder="ジャンルを選択してください"
        className="placeholder-opacity-50 mx-auto flex w-1/3 justify-center py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />

      <p className="text-center text-gray-700">単語</p>
      <Select
        value={selectedWord}
        options={words}
        onChange={setSelectedWord}
        placeholder="単語を入力してください"
        className="placeholder-opacity-50 mx-auto flex w-1/4 justify-center py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />
      <div className="center relative my-1 flex w-full justify-around">
        <button
          onClick={() => handleNavigate("/management")}
          className="boder relative inline-block rounded border-gray-400 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
        >
          戻る
        </button>
        <button
          onClick={handleappear}
          className="boder relative inline-block rounded border-gray-400 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
        >
          表示
        </button>
      </div>
      {/* 取得した問題と選択肢を表示 */}
      {selectedQuestion && (
        <div className="mx-auto mt-12 w-full rounded-lg border bg-white p-5 shadow-lg">
          <TextareaAutosize
            value={selectedQuestion.title}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSelectedQuestion((prev) => ({
                ...prev!,
                title: e.target.value,
              }))
            }
            className="w-1/3 text-xl font-bold text-gray-800"
            minRows={1} // 最小1行から開始
            maxRows={10} // 最大10行まで拡張
          />
          <TextareaAutosize
            value={selectedQuestion.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSelectedQuestion({
                ...selectedQuestion,
                content: e.target.value,
              })
            }
            className="mt-2 w-full rounded border border-gray-300 p-2"
            minRows={1} // 最小1行から開始
            maxRows={10} // 最大10行まで拡張
          />
          <ul className="mt-3 space-y-2">
            {selectedQuestion.choices.map((choice, index) => (
              <li key={choice.id} className="mb-4">
                <TextareaAutosize
                  value={choice.content}
                  // {/* 選択肢の入力欄 */}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const updatedChoices = [...selectedQuestion.choices];
                    updatedChoices[index] = {
                      ...choice,
                      content: e.target.value,
                    };
                    setSelectedQuestion({
                      ...selectedQuestion,
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
                    const updatedChoices = [...selectedQuestion.choices];
                    updatedChoices[index] = {
                      ...choice,
                      description: e.target.value,
                    };
                    setSelectedQuestion({
                      ...selectedQuestion,
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
            <button
              onClick={handledelete}
              className="relative inline-block rounded border !border-gray-900 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
            >
              削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectComponent;
