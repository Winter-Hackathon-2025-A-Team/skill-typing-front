import { useEffect } from "react";
import type { useFetchQuestionsProps } from "~/types/types";

export default function useFetchQuestions({
  setLoading,
  setError,
  setQuestions,
  auth,
  category,
}: useFetchQuestionsProps) {
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = auth.user?.access_token;
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/api/game/questions?category=${category}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${response.status} ${errorText}`);
        }

        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        setError("問題の取得に失敗しました");
        console.error("問題取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [auth.isLoading, auth.user, category]);
}
