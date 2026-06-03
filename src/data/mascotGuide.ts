export type MascotMood =
  | "welcome"
  | "question"
  | "success"
  | "warning"
  | "tip"
  | "finish"
  | "confidentiality"
  | "guide"
  | "reflection";

type MascotGuideEntry = {
  image: string;
  title: string;
  message: string;
  accent: string;
};

export const mascotGuideContent: Record<MascotMood, MascotGuideEntry> = {
  welcome: {
    image: "/assets/mascot/mascotte_welcome.png",
    title: "Bienvenue",
    message: "Je suis là pour vous guider pas à pas dans l'application.",
    accent: "#2456D3",
  },
  question: {
    image: "/assets/mascot/mascotte_question.png",
    title: "Une question ?",
    message: "Prenez un instant pour vérifier les informations avant d'avancer.",
    accent: "#6F9D8D",
  },
  success: {
    image: "/assets/mascot/mascotte_bonne-réponse.png",
    title: "Bravo",
    message: "Tout est valide, vous pouvez continuer en confiance.",
    accent: "#2456D3",
  },
  warning: {
    image: "/assets/mascot/mascotte_mauvaise-réponse.png",
    title: "Attention",
    message: "Un point demande une vérification avant la prochaine étape.",
    accent: "#D97A5A",
  },
  tip: {
    image: "/assets/mascot/mascotte_astuce.png",
    title: "Petit conseil",
    message: "Un bon détail maintenant peut vous faire gagner du temps ensuite.",
    accent: "#6F9D8D",
  },
  finish: {
    image: "/assets/mascot/mascotte_fin.png",
    title: "Mission terminée",
    message: "Le parcours est terminé, il ne reste plus qu'à valider le résultat.",
    accent: "#16213E",
  },
  confidentiality: {
    image: "/assets/mascot/mascotte_confidentialité.png",
    title: "Confidentialité",
    message:
      "Attention aux données sensibles : elles ne doivent jamais être partagées dans un outil IA non validé.",
    accent: "#16213E",
  },
  guide: {
    image: "/assets/mascot/mascotte_guide.png",
    title: "Guide",
    message: "Je vous accompagne étape par étape dans ce parcours RH × IA.",
    accent: "#2456D3",
  },
  reflection: {
    image: "/assets/mascot/mascotte_réflexion.png",
    title: "Réflexion",
    message:
      "Prenez le temps d’analyser la situation avant de choisir comment utiliser l’IA.",
    accent: "#6F9D8D",
  },
};
