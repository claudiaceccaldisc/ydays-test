const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_QUESTION_LENGTH = 300;
const MAX_GEMINI_CALLS = 30;
let geminiCallCount = 0;

const GLOSSARY_SYSTEM_PROMPT = `
Tu es un assistant RH x IA pour un mini-parcours pédagogique.
Réponds uniquement sur les sujets suivants : RH, IA, confidentialité, recrutement, prompt, RGPD, bonnes pratiques d'usage.
Réponds de façon courte, claire et pédagogique, en français.
Ne donne jamais de conseil juridique définitif.
Rappelle si utile qu'il ne faut jamais saisir de données personnelles ou sensibles dans un outil IA non validé.
Si la question est hors sujet, indique poliment que tu es limité au parcours RH x IA et invite à revenir à ces thèmes.
Limite ta réponse à environ 120 mots maximum.
`;

const COACH_SYSTEM_PROMPT = `
Tu es un coach pédagogique RH x IA dans un mini-parcours de formation.
L'apprenant t'explique ce qu'il aimerait apprendre ou la tâche RH sur laquelle il veut progresser avec l'IA.
Donne une réponse personnalisée, concrète, bienveillante et concise, en français, en remplissant les champs demandés :
- reformulation : une phrase qui reformule son besoin.
- pistes : 2 ou 3 actions concrètes et courtes adaptées à sa demande (une phrase chacune).
- exemplePrompt : un exemple de prompt IA réutilisable pour son cas précis.
- vigilance : un rappel de bonne pratique (confidentialité, RGPD, anonymisation ou relecture humaine).
Reste pédagogique et positif. N'utilise pas de markdown (pas d'astérisques). Ne donne jamais de conseil juridique définitif.
Ne demande jamais de données personnelles ou sensibles réelles.
Si la demande est hors du champ RH x IA, reste pédagogique et invite à revenir à ces thèmes.
`;

const COACH_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    reformulation: {
      type: "STRING",
      description: "Une phrase qui reformule le besoin de l'apprenant.",
    },
    pistes: {
      type: "ARRAY",
      description: "2 a 3 actions concretes et courtes adaptees a la demande.",
      items: { type: "STRING" },
    },
    exemplePrompt: {
      type: "STRING",
      description: "Un exemple de prompt IA reutilisable pour ce cas precis.",
    },
    vigilance: {
      type: "STRING",
      description:
        "Un rappel de bonne pratique : confidentialite, RGPD, anonymisation ou relecture humaine.",
    },
  },
  required: ["reformulation", "pistes", "exemplePrompt", "vigilance"],
  propertyOrdering: ["reformulation", "pistes", "exemplePrompt", "vigilance"],
};

const MODE_CONFIG = {
  glossary: {
    systemPrompt: GLOSSARY_SYSTEM_PROMPT,
    maxResponseWords: 120,
    maxOutputTokens: 400,
    responseSchema: null,
  },
  coach: {
    systemPrompt: COACH_SYSTEM_PROMPT,
    maxResponseWords: 170,
    maxOutputTokens: 700,
    responseSchema: COACH_RESPONSE_SCHEMA,
  },
};

const DEFAULT_MODE = "glossary";

const ALLOWED_TOPIC_KEYWORDS = [
  "rh",
  "ressources humaines",
  "ia",
  "intelligence artificielle",
  "gemini",
  "chatbot",
  "confidentialite",
  "confidentialité",
  "recrutement",
  "recruter",
  "candidat",
  "cv",
  "ats",
  "sirh",
  "onboarding",
  "offboarding",
  "prompt",
  "rgpd",
  "donnees",
  "données",
  "anonymisation",
  "anonymiser",
  "fiche de poste",
  "entretien",
  "sourcing",
  "soft skills",
  "turnover",
  "marque employeur",
  "non discrimination",
];

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isAllowedTopic(question) {
  const normalizedQuestion = normalizeText(question);

  return ALLOWED_TOPIC_KEYWORDS.some((keyword) =>
    normalizedQuestion.includes(normalizeText(keyword))
  );
}

function trimToWordLimit(text, maxWords) {
  const words = text.trim().split(/\s+/);

  if (words.length <= maxWords) {
    return text.trim();
  }

  return `${words.slice(0, maxWords).join(" ")}…`;
}

function extractAnswer(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) => part?.text ?? "")
    .join(" ")
    .trim();
}

function parseCoachPlan(rawText) {
  let data;

  try {
    data = JSON.parse(rawText);
  } catch {
    return null;
  }

  if (!data || typeof data !== "object") {
    return null;
  }

  const reformulation =
    typeof data.reformulation === "string" ? data.reformulation.trim() : "";
  const exemplePrompt =
    typeof data.exemplePrompt === "string" ? data.exemplePrompt.trim() : "";
  const vigilance =
    typeof data.vigilance === "string" ? data.vigilance.trim() : "";
  const pistes = Array.isArray(data.pistes)
    ? data.pistes
        .map((piste) => (typeof piste === "string" ? piste.trim() : ""))
        .filter(Boolean)
    : [];

  if (!reformulation || pistes.length === 0 || !exemplePrompt) {
    return null;
  }

  return { reformulation, pistes, exemplePrompt, vigilance };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  const requestedMode = typeof req.body?.mode === "string" ? req.body.mode : DEFAULT_MODE;
  const mode = MODE_CONFIG[requestedMode] ? requestedMode : DEFAULT_MODE;
  const { systemPrompt, maxResponseWords, maxOutputTokens, responseSchema } =
    MODE_CONFIG[mode];

  if (!question) {
    return res.status(400).json({ error: "Merci de saisir une question." });
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({
      error: `Merci de limiter la question à ${MAX_QUESTION_LENGTH} caractères maximum.`,
    });
  }

  if (!isAllowedTopic(question)) {
    return res.status(400).json({
      error:
        "Je suis limité aux sujets RH, IA, confidentialité, recrutement, prompt et RGPD. Le bot local prend le relais.",
    });
  }

  if (!apiKey) {
    return res.status(503).json({
      error:
        "Le chatbot IA n'est pas configuré pour le moment. Le bot local prend le relais.",
    });
  }

  if (geminiCallCount >= MAX_GEMINI_CALLS) {
    return res.status(429).json({
      error:
        "La limite de démonstration du chatbot IA est atteinte. Le bot local prend le relais.",
    });
  }

  try {
    geminiCallCount += 1;

    const generationConfig = {
      temperature: 0.4,
      maxOutputTokens,
      // gemini-2.5-flash "pense" par defaut et ces tokens de reflexion
      // sont decomptes de maxOutputTokens, ce qui tronque la reponse.
      // On desactive le thinking pour des reponses courtes et completes.
      thinkingConfig: { thinkingBudget: 0 },
    };

    if (responseSchema) {
      generationConfig.responseMimeType = "application/json";
      generationConfig.responseSchema = responseSchema;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt.trim() }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: question }],
            },
          ],
          generationConfig,
        }),
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      const errorMessage =
        payload?.error?.message ||
        "Le service IA est indisponible pour le moment. Essaie la réponse locale.";

      return res.status(response.status).json({ error: errorMessage });
    }

    const answer = extractAnswer(payload);

    if (!answer) {
      return res.status(502).json({
        error:
          "Le chatbot IA n'a pas pu formuler de réponse. Essaie la réponse locale.",
      });
    }

    if (responseSchema) {
      const plan = parseCoachPlan(answer);

      if (!plan) {
        return res.status(502).json({
          error:
            "Le coach IA n'a pas pu structurer de réponse. Essaie la réponse locale.",
        });
      }

      return res.status(200).json({ plan });
    }

    return res.status(200).json({
      answer: trimToWordLimit(answer, maxResponseWords),
    });
  } catch {
    return res.status(500).json({
      error:
        "Une erreur est survenue côté IA. Les réponses locales restent disponibles.",
    });
  }
}
