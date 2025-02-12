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
