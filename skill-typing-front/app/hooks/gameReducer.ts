import type { Question, AnswerResult } from "~/types/types";

export type State = {
  questions: Question[];
  loading: boolean;
  error: string | null;
  screen: "game" | "result" | "explanation";
  currentQuestionIndex: number;
  currentExplanationIndex: number;
  userAnswer: string;
  score: number;
  countTime: number;
  results: AnswerResult[];
};

export const initialState: State = {
  questions: [],
  loading: true,
  error: null,
  screen: "game",
  currentQuestionIndex: 0,
  currentExplanationIndex: 0,
  userAnswer: "",
  score: 0,
  countTime: 60,
  results: [],
};

export type Action =
  | { type: "SET_QUESTIONS"; payload: Question[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_SCREEN"; payload: "game" | "result" | "explanation" }
  | { type: "INCREMENT_QUESTION_INDEX" }
  | { type: "INCREMENT_EXPLANATION_INDEX" }
  | { type: "DECREMENT_EXPLANATION_INDEX" }
  | { type: "SET_USER_ANSWER"; payload: string }
  | { type: "SET_SCORE"; payload: number }
  | { type: "SET_COUNT_TIME"; payload: number }
  | {
      type: "SET_RESULTS";
      payload: { index: number; result: AnswerResult };
    }
  | { type: "RESET_USER_ANSWER" };

export function gameReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload ?? [],
        results: Array(action.payload.length).fill("-"),
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SCREEN":
      return { ...state, screen: action.payload };
    case "INCREMENT_QUESTION_INDEX":
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case "INCREMENT_EXPLANATION_INDEX":
      return {
        ...state,
        currentExplanationIndex: state.currentExplanationIndex + 1,
      };
    case "DECREMENT_EXPLANATION_INDEX":
      return {
        ...state,
        currentExplanationIndex: state.currentExplanationIndex - 1,
      };
    case "SET_USER_ANSWER":
      return { ...state, userAnswer: action.payload };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "SET_COUNT_TIME":
      return { ...state, countTime: action.payload };
    case "SET_RESULTS": {
      const { index, result } = action.payload;
      const updateResults = [...state.results];
      updateResults[index] = result;
      return { ...state, results: updateResults };
    }
    case "RESET_USER_ANSWER":
      return { ...state, userAnswer: "" };
    default:
      return state;
  }
}
