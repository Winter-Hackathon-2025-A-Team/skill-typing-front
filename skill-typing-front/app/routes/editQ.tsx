import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

type Category = {
  id: number;
  title: string;
};

type Word = {
  id: number;
  Answer_id: number;
  word: string;
};

type QuestionOption = {
  question_text: string;
  choices1: string[];
  choices2: string[];
  choices3: string[];
  choices4: string[];
};

type SelectCategoryOption = {
  value: number;
  label: string;
};

type SelectWordOption = {
  value: number;
  label: string;
};

function SelectComponent() {
  const [categories, setCategories] = useState<SelectCategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectCategoryOption | null>(null);
  const [words, setWords] = useState<SelectWordOption[]>([]);
  const [selectedWord, setSelectedWord] = useState<SelectWordOption | null>(
    null,
  );
  const [question, setQuestion] = useState<QuestionOption | null>(null);

  // 初回ロード時にカテゴリ一覧を取得
  useEffect(() => {
    axios.get("バック側のエンドポイント").then((response) => {
      setCategories(
        response.data.map((category: Category) => ({
          value: category.id,
          label: category.title,
        })),
      );
    });
  }, []);

  // カテゴリ選択時に対応する問題を取得
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          `バック側のエンドポイント/words?category_id=${selectedCategory.value}`,
        )
        .then((response) => {
          setWords(
            response.data.map((word: Word) => ({
              value: word.id,
              label: word.word,
            })),
          );
        });
    } else {
      setWords([]);
    }
  }, [selectedCategory]);

  const handleappear = () => {
    if (selectedWord) {
      axios
        .get(`バック側のエンドポイント/questions?word_id=${selectedWord.value}`)
        .then((response) => {
          if (response.data.length > 0) {
            setQuestion(response.data[0]); // 最初の問題をセット
          } else {
            setQuestion(null); // データがない場合はリセット
          }
        })
        .catch((error) => {
          console.error("データ取得エラー:", error);
        });
    }
  };

  return (
    <div className="container">
      <p className="mt-20 text-center text-gray-700">問題</p>
      <Select
        value={selectedCategory}
        options={categories}
        onChange={setSelectedCategory}
        placeholder="ジャンルを選択してください"
        className="placeholder-opacity-50 mx-auto flex w-1/4 justify-center border-b py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />

      <p className="mt-5 text-center text-gray-700">単語</p>
      <Select
        value={selectedWord}
        options={words}
        onChange={setSelectedWord}
        placeholder="単語を入力してください"
        className="placeholder-opacity-50 mx-auto flex w-1/4 justify-center border-b py-2 placeholder-gray-500 focus:border-b-2 focus:border-blue-500 focus:outline-none"
      />
      <div className="absolute right-1/3 my-2 flex">
        <button
          onClick={handleappear}
          className="boder relative inline-block rounded border-gray-400 bg-white px-1 py-1 font-semibold text-gray-800 transition-all hover:bg-red-200 active:bottom-[-1px]"
        >
          表示
        </button>
      </div>
      {/* 取得した問題と選択肢を表示 */}
      {question && (
        <div className="container mt-5 rounded-lg border bg-white p-5 shadow-lg">
          <h1 className="text-xl font-bold text-gray-800">
            {question.question_text}
          </h1>
          <ul className="mt-3 space-y-2">
            <li className="rounded bg-gray-100 p-2">{question.choices1}</li>
            <li className="rounded bg-gray-100 p-2">{question.choices2}</li>
            <li className="rounded bg-gray-100 p-2">{question.choices3}</li>
            <li className="rounded bg-gray-100 p-2">{question.choices4}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectComponent;
