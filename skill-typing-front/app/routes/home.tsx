import React, { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import CategoryForm from "~/components/categoryForm";
import useFetchLatestScore from "~/hooks/useFetchLatestScore";

export default function Home() {
  const auth = useAuth();
  const [latestScore, setLatestScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState("1");
  const navigate = useNavigate();

  useFetchLatestScore({ auth, setLoading, setError, setLatestScore });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategoryId(e.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(`/game?category_id=${categoryId}`);
    },
    [categoryId, navigate],
  );

  const renderLoading = () => <p className="text-gray-900">読み込み中...</p>;
  const renderError = () => <p className="text-red-500">エラー: {error}</p>;
  const renderScoreDisplay = () => (
    <p className="text-gray-900">最終スコア : {latestScore ?? "未取得"}点</p>
  );

  const renderScore = useCallback(() => {
    if (loading) return renderLoading();
    if (error) return renderError();
    return renderScoreDisplay();
  }, [loading, error, latestScore]);

  return (
    <div className="grid max-w-screen-xl place-items-center gap-4">
      {renderScore()}
      <CategoryForm
        handleSubmit={handleSubmit}
        categoryId={categoryId}
        handleChange={handleChange}
      />
    </div>
  );
}
