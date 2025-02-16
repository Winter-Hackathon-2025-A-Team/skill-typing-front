import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "~/components/button";
import type { Score } from "~/types/types";

export async function clientLoader() {
  const uri = import.meta.env.VITE_API_URI;

  const response = await fetch(`${uri}/api/scores/latest`);

  const latestScore: Score = await response.json();

  return latestScore;
}

export default function Home({ loaderData }: { loaderData: Score }) {
  const [category, setCategory] = useState("基本情報技術者");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/game?category=${category}`);
  };

  return (
    <div className="grid min-h-screen -translate-y-12 transform place-items-center">
      <div className="grid max-w-screen-xl place-items-center gap-4 px-4">
        <p className="text-gray-900">最終スコア : {loaderData.score}点</p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-center justify-items-center gap-4"
        >
          <label className="grid grid-cols-1 gap-2 text-center">
            カテゴリー選択
            <select
              value={category}
              onChange={handleChange}
              className="rounded border border-blue-600 bg-white p-2 text-center"
            >
              <option value="基本情報技術者">基本情報技術者</option>
              <option value="AWSアソシエイト">AWSアソシエイト</option>
            </select>
          </label>
          <Button type="submit">ゲーム開始</Button>
        </form>
      </div>
    </div>
  );
}
