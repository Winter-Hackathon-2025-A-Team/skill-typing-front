import type { PlayFunction } from "node_modules/use-sound/dist/types";
import type { AuthContextProps } from "react-oidc-context";

export type Choice = {
  id: number;
  content: string;
  description: string;
};

export type Question = {
  id: number;
  title: string;
  content: string;
  category: {
    id: number;
    title: string;
  };
  answer_id: number;
  choices: Choice[];
};

export type QuestionsResponse = {
  questions: Question[];
};

export type Score = {
  score: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
  redirectPath?: string;
  redirectDelay?: number;
};

export type GameTitleProps = {
  question: Question;
  countTime: number;
  questionsLength: number;
  currentQuestionIndex: number;
};

export type GameFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userAnswer: string;
  setUserAnswer: (userAnswer: string) => void;
  isLastQuestion: boolean;
};

export type GameExplanationPaginationProps = {
  currentExplanationIndex: number;
  decreaseIndex: () => void;
  increaseIndex: () => void;
};

export type useFetchQuestionsProps = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setQuestions: (questions: Question[]) => void;
  auth: AuthContextProps;
  category: string | null;
};

export type handleAnswerProps = {
  questions: Question[] | null;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  userAnswer: string;
  score: number;
  setScore: (score: number) => void;
  auth: AuthContextProps;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setScreen: (screen: string) => void;
  playCorrectAnswer: PlayFunction;
  playWrongAnswer: PlayFunction;
};

export type GameScreenProps = {
  question: Question;
  countTime: number;
  questionsLength: number;
  currentQuestionIndex: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  isLastQuestion: boolean;
};

export type GameResultProps = {
  score: number;
  handleShowExplanation: () => void;
};

export type GameExplanationProps = {
  question: Question;
  currentExplanationIndex: number;
  handleDecreaseExplanationIndex: () => void;
  handleIncreaseExplanationIndex: () => void;
};

export type useFetchLatestScoreProps = {
  auth: AuthContextProps;
  setLoading: React.Dispatch<React.SetStateAction<boolean | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLatestScore: React.Dispatch<React.SetStateAction<number | null>>;
};

export type CategoryFromProps = {
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  category: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
