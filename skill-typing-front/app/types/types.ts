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
