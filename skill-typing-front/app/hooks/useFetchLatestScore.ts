import { useEffect } from "react";
import type { useFetchLatestScoreProps } from "~/types/types";

export default function useFetchLatestScore({
  auth,
  setLoading,
  setError,
  setLatestScore,
}: useFetchLatestScoreProps) {
  const uri = import.meta.env.VITE_API_URI;
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
}
