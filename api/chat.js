const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_QUESTION_LENGTH = 300;
const MAX_RESPONSE_WORDS = 120;
const MAX_GEMINI_CALLS = 30;
let geminiCallCount = 0;

const SYSTEM_PROMPT = `
Tu es un assistant RH x IA pour un mini-parcours pédagogique.
Réponds uniquement sur les sujets suivants : RH, IA, confidentialité, recrutement, prompt, RGPD, bonnes pratiques d'usage.
Réponds de façon courte, claire et pédagogique, en français.
Ne donne jamais de conseil juridique définitif.
Rappelle si utile qu'il ne faut jamais saisir de données personnelles ou sensibles dans un outil IA non validé.
Si la question est hors sujet, indique poliment que tu es limité au parcours RH x IA et invite à revenir à ces thèmes.
Limite ta réponse à environ 120 mots maximum.
`;

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";

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
            parts: [{ text: SYSTEM_PROMPT.trim() }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: question }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 220,
          },
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

    return res.status(200).json({
      answer: trimToWordLimit(answer, MAX_RESPONSE_WORDS),
    });
  } catch {
    return res.status(500).json({
      error:
        "Une erreur est survenue côté IA. Les réponses locales restent disponibles.",
    });
  }
}
