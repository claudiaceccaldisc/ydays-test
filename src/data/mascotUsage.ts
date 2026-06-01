import type { MascotMood } from "./mascotGuide";

export type MascotUsageStep =
  | "introduction"
  | "quiz"
  | "quizSuccess"
  | "quizError"
  | "action"
  | "confidentiality"
  | "situation"
  | "tip"
  | "resume";

export const mascotUsage: Record<MascotUsageStep, MascotMood> = {
  introduction: "welcome",
  quiz: "question",
  quizSuccess: "success",
  quizError: "warning",
  action: "guide",
  confidentiality: "confidentiality",
  situation: "reflection",
  tip: "tip",
  resume: "finish",
};
