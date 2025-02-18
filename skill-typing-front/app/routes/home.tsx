import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import Button from "~/components/button";

export default function Home() {
  const auth = useAuth();
  const uri = import.meta.env.VITE_API_URI;
  const [latestScore, setLatestScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestScore = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = auth.user?.access_token;
        const response = await fetch(`${uri}/api/scores/latest`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${response.status} ${errorText}`);
        }
        const data = await response.json();

        if (data && typeof data.score !== "undefined") {
          setLatestScore(data.score);
        } else {
          throw new Error("レスポンスにscoreプロパティが含まれていません");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.log("スコア取得エラー:", err);
        } else {
          setError("予期しないエラーが発生しました");
          console.log("スコア取得エラー:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLatestScore();
  }, [auth.user, uri]);

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
        {loading ? (
          <p className="text-gray-900">読み込み中...</p>
        ) : error ? (
          <p className="text-red-500">エラー: {error}</p>
        ) : (
          <p className="text-gray-900">最終スコア : {latestScore}点</p>
        )}
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
