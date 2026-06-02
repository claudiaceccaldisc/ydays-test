import { chatbotFaq } from "../data/chatbotFaq";

export function normalizeChatbotText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findBestFaqMatch(query) {
  const normalizedQuery = normalizeChatbotText(query);

  if (!normalizedQuery) {
    return null;
  }

  const queryTokens = normalizedQuery
    .split(" ")
    .filter((token) => token.length > 1);

  let bestMatch = null;
  let bestScore = 0;

  chatbotFaq.forEach((entry) => {
    const normalizedQuestion = normalizeChatbotText(entry.question);
    let score = 0;

    if (normalizedQuestion === normalizedQuery) {
      score += 12;
    }

    if (normalizedQuestion.includes(normalizedQuery)) {
      score += 6;
    }

    entry.keywords.forEach((keyword) => {
      const normalizedKeyword = normalizeChatbotText(keyword);

      if (normalizedQuery.includes(normalizedKeyword)) {
        score += 4;
      }
    });

    queryTokens.forEach((token) => {
      if (normalizedQuestion.includes(token)) {
        score += 1;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  });

  return bestScore > 0 ? bestMatch : null;
}
