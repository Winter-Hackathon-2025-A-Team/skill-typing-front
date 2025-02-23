import type { Choice, handleAnswerProps } from "~/types/types";

export default async function handleAnswer({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  userAnswer,
  score,
  setScore,
  auth,
  setError,
  setLoading,
  setScreen,
  playCorrectAnswer,
  playWrongAnswer,
}: handleAnswerProps) {
  if (!questions) return;

  const currentQuestion = questions[currentQuestionIndex];
  const correctChoice = currentQuestion.choices.find(
    (choice: Choice) => choice.id === currentQuestion.answer_id,
  );

  const normalizedInput = userAnswer.trim().toLowerCase();
  const normalizedCorrectContent =
    correctChoice?.content.trim().toLowerCase() ?? "";

  let newScore = score;
  if (normalizedInput === normalizedCorrectContent) {
    newScore = score + 5;
    setScore(newScore);
    playCorrectAnswer();
  }
  if (normalizedInput !== normalizedCorrectContent) {
    newScore = score - 1;
    setScore(newScore);
    playWrongAnswer();
  }

  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  } else {
    try {
      const uri = import.meta.env.VITE_API_URI;
      const token = auth.user?.access_token;
      const response = await fetch(`${uri}/api/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score: newScore }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status} ${errorText}`);
      }
    } catch (postError) {
      console.error("スコア登録失敗 : ", postError);
      setError("スコアの登録に失敗しました");
      setLoading(false);
      return; // 以降の処理を中断
    }
    setScreen("result");
  }
}
