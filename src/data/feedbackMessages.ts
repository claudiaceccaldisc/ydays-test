export type FeedbackTone = "success" | "warning" | "info";

export type FeedbackMessageKey =
  | "correct"
  | "incorrect"
  | "confidentiality"
  | "tip"
  | "reflection"
  | "finish";

type FeedbackMessage = {
  title: string;
  message: string;
  tone: FeedbackTone;
};

export const feedbackMessages: Record<FeedbackMessageKey, FeedbackMessage> = {
  correct: {
    title: "Bonne réponse",
    message: "C'est exact, vous pouvez continuer.",
    tone: "success",
  },
  incorrect: {
    title: "Réponse à revoir",
    message: "Ce point mérite une nouvelle vérification.",
    tone: "warning",
  },
  confidentiality: {
    title: "Confidentialité",
    message: "Vérifiez toujours la sensibilité des données avant usage.",
    tone: "warning",
  },
  tip: {
    title: "Astuce",
    message: "Un bon réflexe maintenant peut éviter une erreur ensuite.",
    tone: "info",
  },
  reflection: {
    title: "Réflexion",
    message: "Prenez un instant pour analyser la situation.",
    tone: "info",
  },
  finish: {
    title: "Parcours terminé",
    message: "Vous avez terminé cette étape avec succès.",
    tone: "success",
  },
};
