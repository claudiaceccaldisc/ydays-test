export type ActionCoachSuggestion = {
  label: string;
  prompt: string;
};

export const actionCoachIntro =
  "Dis à l'IA ce que tu aimerais apprendre ou la tâche RH sur laquelle tu veux progresser. Elle te proposera des pistes personnalisées, adaptées à ton besoin.";

export const actionCoachWelcome =
  "Décris ton besoin ou choisis une idée ci-dessus, puis lance la simulation. Je te proposerai un plan personnalisé avec des actions concrètes et un exemple de prompt.";

export const actionCoachLoading =
  "Je prépare des pistes personnalisées à partir de ton besoin…";

export const actionCoachFallback =
  "Je ne peux pas générer de proposition personnalisée pour le moment. Reformule avec des mots-clés RH x IA (recrutement, entretien, CV, prompt, RGPD…) ou réessaie quand l'IA est disponible.";

export const actionCoachSuggestions: ActionCoachSuggestion[] = [
  {
    label: "Rédiger une fiche de poste",
    prompt:
      "J'aimerais apprendre à rédiger une fiche de poste claire et attractive avec l'aide de l'IA.",
  },
  {
    label: "Préparer une grille d'entretien",
    prompt:
      "Je veux progresser sur la préparation d'une grille d'entretien structurée pour un recrutement.",
  },
  {
    label: "Trier des candidatures sans biais",
    prompt:
      "Comment utiliser l'IA pour aider au tri des candidatures tout en limitant les biais et la discrimination ?",
  },
  {
    label: "Améliorer ma marque employeur",
    prompt:
      "J'aimerais des pistes pour améliorer la marque employeur de mon entreprise avec l'IA.",
  },
  {
    label: "Anonymiser un CV avant analyse",
    prompt:
      "Apprends-moi à anonymiser un CV avant de l'analyser avec une IA, dans le respect du RGPD.",
  },
  {
    label: "Écrire un meilleur prompt RH",
    prompt:
      "Je veux apprendre à écrire un meilleur prompt pour mes tâches RH au quotidien.",
  },
];
