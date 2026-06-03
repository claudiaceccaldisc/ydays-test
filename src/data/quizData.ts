import type { MascotMood } from "./mascotGuide";

export type QuizChoice = {
  id: "A" | "B" | "C" | "D";
  text: string;
};

export type QuizModule = {
  id: string;
  title: string;
  infoTitle: string;
  infoText: string[];
  moduleMascotText?: string;
  preQuestionText: string;
  question: string;
  choices: QuizChoice[];
  correctAnswer: QuizChoice["id"];
  correctFeedback: string;
  incorrectFeedback: string;
  mood: MascotMood;
};

export const quizIntro = {
  title: "Quiz RH × IA",
  text:
    "Je vais vous montrer comment l’IA peut vous aider dans vos missions RH de tous les jours, sans remplacer votre expertise.",
};

export const quizSummary = {
  title: "Quiz terminé",
  text:
    "Vous avez revu les usages utiles, la confidentialité, le contrôle humain et le cadre légal. L’idée clé : l’IA aide, mais le RH garde la responsabilité.",
};

export const quizModules: QuizModule[] = [
  {
    id: "module-a",
    title: "Module A · Usages généraux RH",
    infoTitle: "Slide info A",
    infoText: [
      "L’IA générative peut aider les équipes RH à rédiger plus vite des annonces, des descriptions de poste, des mails de convocation ou de refus, ou encore des contenus pour l’onboarding.",
      "Elle peut proposer des grilles de questions d’entretien, synthétiser des notes, ou préparer des résumés de profils à partir d’informations déjà disponibles.",
      "L’objectif : gagner du temps sur les tâches répétitives pour que les RH se concentrent sur l’accompagnement humain, la décision et la relation avec les collaborateurs.",
    ],
    preQuestionText:
      "D’après ce que l’on vient de voir, comment pourriez-vous utiliser l’IA de façon utile dans vos missions RH ?",
    question:
      "Parmi ces propositions, lequel est un usage pertinent de l’IA générative pour un service RH ?",
    choices: [
      { id: "A", text: "Laisser l’IA annoncer seule à un candidat qu’il est licencié." },
      {
        id: "B",
        text: "Utiliser l’IA pour rédiger un premier brouillon d’offre d’emploi, que le RH relit et adapte.",
      },
      { id: "C", text: "Demander à l’IA de choisir les candidats à embaucher sans intervention humaine." },
      { id: "D", text: "Remplacer tous les entretiens par un chatbot." },
    ],
    correctAnswer: "B",
    correctFeedback:
      "Exact. L’IA peut vous aider à rédiger plus vite, mais c’est vous qui gardez la main sur le contenu final.",
    incorrectFeedback:
      "Pas tout à fait. L’IA doit rester un outil d’appui : elle propose, mais le RH décide et adapte.",
    mood: "guide",
  },
  {
    id: "module-b",
    title: "Module B · Recrutement et tri de candidatures",
    infoTitle: "Slide info B",
    infoText: [
      "L’IA peut aider à rédiger des offres d’emploi, à trier des CV selon des critères objectifs définis par les RH, ou à générer des questions d’entretien pertinentes.",
      "Mais l’IA peut reproduire ou amplifier des biais présents dans les données, ce qui peut créer des discriminations indirectes.",
      "Les décisions de présélection et de recrutement doivent donc rester humaines, et l’IA ne doit être qu’un outil de support.",
    ],
    moduleMascotText:
      "Le recrutement est un domaine sensible : l’IA peut aider, mais pas décider à votre place.",
    preQuestionText:
      "Vous devez recruter avec l’aide de l’IA. Comment l’utiliser de façon responsable ?",
    question:
      "Quelle est la bonne façon d’utiliser l’IA dans un processus de recrutement ?",
    choices: [
      {
        id: "A",
        text: "Laisser l’IA sélectionner automatiquement les candidats retenus et refusés, sans contrôle humain.",
      },
      { id: "B", text: "Interdire totalement l’IA, même pour proposer des questions d’entretien." },
      {
        id: "C",
        text: "Utiliser l’IA pour préparer des listes de CV à analyser, puis garder une validation humaine.",
      },
      { id: "D", text: "Demander à l’IA de classer les candidats par âge et origine." },
    ],
    correctAnswer: "C",
    correctFeedback:
      "Bien joué. L’IA peut vous aider à filtrer et organiser, mais c’est au RH de prendre la décision finale.",
    incorrectFeedback:
      "Non. Les décisions de recrutement et les critères sensibles ne doivent pas être entièrement automatisés. Le contrôle humain reste indispensable.",
    mood: "reflection",
  },
  {
    id: "module-c",
    title: "Module C · Confidentialité des données RH",
    infoTitle: "Slide info C",
    infoText: [
      "Les RH manipulent des données sensibles : identité, parcours, santé éventuelle, rémunération, évaluations, etc.",
      "Il ne faut jamais copier-coller ce type d’informations personnelles dans un outil d’IA grand public non validé par l’entreprise (ChatGPT libre, site externe, etc.).",
      "On privilégie les outils encadrés par l’IT, on anonymise les exemples, et on respecte la charte et le RGPD.",
    ],
    moduleMascotText:
      "En RH, vous gérez des données très sensibles : attention à ce que vous envoyez à l’IA.",
    preQuestionText:
      "Quand vous utilisez l’IA, vous devez protéger les données personnelles des candidats et des salariés. Quelle pratique vous semble correcte ?",
    question:
      "Laquelle de ces pratiques est acceptable pour un RH utilisant l’IA ?",
    choices: [
      {
        id: "A",
        text: "Copier-coller un dossier salarié complet (nom, adresse, salaire, entretien annuel) dans un chatbot public pour demander un résumé.",
      },
      {
        id: "B",
        text: "Demander à l’IA un modèle de mail de relance candidat, sans donner de noms ni de détails personnels.",
      },
      { id: "C", text: "Partager la liste des salaires de l’équipe pour optimiser la grille de rémunération." },
      { id: "D", text: "Envoyer l’historique médical d’un collaborateur pour obtenir un conseil." },
    ],
    correctAnswer: "B",
    correctFeedback:
      "Exactement. Vous pouvez demander des modèles génériques, sans jamais divulguer de données personnelles ou sensibles.",
    incorrectFeedback:
      "Non. Les données RH sont très sensibles. Vous ne devez jamais les mettre dans un outil d’IA non encadré par l’entreprise.",
    mood: "confidentiality",
  },
  {
    id: "module-d",
    title: "Module D · Prompting pour les RH",
    infoTitle: "Slide info D",
    infoText: [
      "La qualité des réponses de l’IA dépend beaucoup de la façon dont on formule la demande (prompt).",
      "En RH, il est utile de préciser : le contexte, l’action demandée et le format attendu.",
      "On peut ensuite affiner : « rends ce texte plus simple », « réduis à 150 mots », « adapte au ton d’un message interne », etc.",
    ],
    moduleMascotText:
      "Pour que l’IA vous aide vraiment, il faut lui parler clairement : contexte, action, résultat.",
    preQuestionText:
      "Vous voulez que l’IA vous aide à écrire un mail RH. Quel type de demande va lui donner le meilleur résultat ?",
    question:
      "Lequel de ces prompts est le plus efficace pour un RH qui veut rédiger un mail aux managers pour annoncer une nouvelle formation interne ?",
    choices: [
      { id: "A", text: "« Écris un mail. »" },
      { id: "B", text: "« Fais un texte sympa pour les managers. »" },
      {
        id: "C",
        text: "« Vous êtes un RH. Rédigez un mail clair et professionnel à destination des managers pour annoncer une nouvelle formation interne sur l’IA, en 3 courts paragraphes. »",
      },
      { id: "D", text: "« Donne un truc à envoyer aux gens. »" },
    ],
    correctAnswer: "C",
    correctFeedback:
      "Parfait. Plus votre prompt est précis (contexte, audience, ton, format), plus la réponse sera utile.",
    incorrectFeedback:
      "Ce n’est pas le meilleur prompt. Pour que l’IA vous aide efficacement, vous devez donner du contexte, la cible et le format souhaité.",
    mood: "guide",
  },
  {
    id: "module-e",
    title: "Module E · Vérifier, adapter, rester humain",
    infoTitle: "Slide info E",
    infoText: [
      "L’IA peut produire des textes convaincants mais parfois inexacts ou mal adaptés à la culture de l’entreprise.",
      "Le RH doit relire, corriger, vérifier les infos et ajuster le ton (bienveillance, neutralité, conformité juridique).",
      "L’IA n’a pas la responsabilité juridique : c’est toujours le RH qui signe et endosse le contenu.",
    ],
    moduleMascotText:
      "L’IA vous fait gagner du temps, mais c’est à vous de vérifier et d’adapter ce qu’elle produit.",
    preQuestionText:
      "L’IA vous a proposé un message RH. Que faites-vous avant de l’envoyer à tous les collaborateurs ?",
    question:
      "Après avoir obtenu un texte de l’IA pour un message RH important, que devez-vous faire ?",
    choices: [
      { id: "A", text: "Le publier immédiatement tel quel." },
      {
        id: "B",
        text: "Le relire attentivement, vérifier les informations et adapter le ton à la culture de l’entreprise.",
      },
      { id: "C", text: "Le supprimer systématiquement, l’IA n’est jamais fiable." },
      { id: "D", text: "Le confier à l’IA pour qu’elle se corrige elle-même." },
    ],
    correctAnswer: "B",
    correctFeedback:
      "Exact. Vous devez rester le garant du contenu : vérification, adaptation, respect de la culture et du cadre légal.",
    incorrectFeedback:
      "Non. Un message RH ne doit jamais être envoyé sans relecture humaine. Vous restez responsable de ce qui est diffusé.",
    mood: "reflection",
  },
  {
    id: "module-f",
    title: "Module F · Règles internes et cadre légal",
    infoTitle: "Slide info F",
    infoText: [
      "L’entreprise peut définir une charte d’usage de l’IA et une liste d’outils autorisés, spécialement pour les RH.",
      "En recrutement, certains pays imposent déjà de déclarer l’usage d’outils automatisés de tri ou d’évaluation.",
      "Les RH doivent donc connaître ces règles et vérifier que l’usage de l’IA reste conforme aux obligations de non-discrimination et de protection des données.",
    ],
    moduleMascotText:
      "En RH, vous êtes aussi garant du cadre légal : l’IA doit respecter les règles de l’entreprise et de la loi.",
    preQuestionText:
      "Vous voulez intégrer un nouvel usage de l’IA dans un processus RH. Quelle est la bonne démarche ?",
    question:
      "Que doit faire un RH avant de déployer un nouvel usage de l’IA dans un processus RH ?",
    choices: [
      { id: "A", text: "Le tester directement sur les vrais candidats, sans informer personne." },
      {
        id: "B",
        text: "Vérifier les règles internes, le cadre légal (non-discrimination, RGPD) et impliquer les parties prenantes (IT, juridique, direction).",
      },
      { id: "C", text: "Lancer un test en secret pour gagner du temps." },
      { id: "D", text: "L’appliquer uniquement aux candidats étrangers pour « aller plus vite »." },
    ],
    correctAnswer: "B",
    correctFeedback:
      "Parfait. Un usage d’IA en RH doit toujours être aligné avec la charte interne, la sécurité des données et la loi.",
    incorrectFeedback:
      "Non. On ne peut pas déployer l’IA en RH sans vérifier le cadre légal et les règles internes. Il faut impliquer les bonnes parties prenantes.",
    mood: "confidentiality",
  },
];
