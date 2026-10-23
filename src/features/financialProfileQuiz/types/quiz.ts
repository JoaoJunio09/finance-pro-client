export type QuizDimension =
  | "Segurança financeira"
  | "Resiliência"
  | "Organização e controle"
  | "Regulação de impulsos"
  | "Orientação para o futuro"
  | "Equilíbrio e liberdade";

export type QuizQuestion = {
  id: number;
  eyebrow: string;
  title: string;
  helper?: string;
  dimension: QuizDimension;
  layout?: "cards" | "scale";
  options: string[];
};

export type QuizStage = "intro" | "questions" | "complete";

export type FirstStepsContext = {
  nickname: string;
  onBack: (step: number) => void;
};
