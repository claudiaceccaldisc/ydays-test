import { useMemo, useState } from "react";
import {
  AlertCircle,
  Bot,
  LoaderCircle,
  MessageCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  chatbotFallbackMessage,
  chatbotFaq,
  chatbotWelcomeMessage,
} from "../data/chatbotFaq";
import { mascotGuideContent } from "../data/mascotGuide";
import { findBestFaqMatch } from "../utils/chatbotFaqSearch";

export default function AiChatbot() {
  const mascot = mascotGuideContent.question;
  const frequentQuestions = useMemo(() => chatbotFaq.slice(0, 6), []);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeQuestion, setActiveQuestion] = useState("");
  const [activeAnswer, setActiveAnswer] = useState(chatbotWelcomeMessage);
  const [activeSource, setActiveSource] = useState("local");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function applyLocalFallback(rawQuery, errorMessage) {
    const fallbackQuestion = rawQuery.trim() || "Recherche locale";
    const localMatch = findBestFaqMatch(rawQuery);

    if (localMatch) {
      setActiveQuestion(localMatch.question);
      setActiveAnswer(localMatch.answer);
      setActiveSource("local");
      setStatusMessage(
        errorMessage
          ? `${errorMessage} Voici la réponse locale la plus proche.`
          : "",
      );
      return;
    }

    setActiveQuestion(fallbackQuestion);
    setActiveAnswer(chatbotFallbackMessage);
    setActiveSource("local");
    setStatusMessage(
      errorMessage ||
        "Aucune réponse IA ou locale précise n'a été trouvée pour cette question.",
    );
  }

  function showEntry(entry) {
    setQuery(entry.question);
    setActiveQuestion(entry.question);
    setActiveAnswer(entry.answer);
    setActiveSource("local");
    setStatusMessage("");
    setIsLoading(false);
  }

  async function handleSubmit(event) {
    event?.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      applyLocalFallback("", "Merci de saisir une question.");
      return;
    }

    setIsLoading(true);
    setActiveQuestion(trimmedQuery);
    setStatusMessage("Recherche d'une réponse IA en cours...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuery }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload?.answer) {
        applyLocalFallback(
          trimmedQuery,
          payload?.error || "Le chatbot IA n'est pas disponible pour le moment.",
        );
        return;
      }

      setActiveAnswer(payload.answer);
      setActiveSource("ai");
      setStatusMessage("Réponse IA générée côté serveur.");
    } catch {
      applyLocalFallback(
        trimmedQuery,
        "Impossible de joindre le chatbot IA pour le moment.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex items-end justify-end sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {isOpen ? (
          <section className="fake-ai-chatbot-panel w-[min(calc(100vw-1.5rem),22rem)] overflow-hidden rounded-[28px] border border-gris-brume bg-carte">
            <div className="flex items-start gap-3 border-b border-gris-brume/80 bg-bleu-confiance/8 px-4 py-4">
              <div
                className="fake-ai-chatbot-avatar flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: mascot.accent }}
              >
                <img
                  src={mascot.image}
                  alt="Mascotte du chatbot IA"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="mt-1 font-titre text-lg font-bold text-bleu-nuit">
                  Chatbot RH x IA
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gris-brume bg-white/70 text-bleu-nuit transition hover:border-bleu-confiance hover:text-bleu-confiance"
                aria-label="Fermer le chatbot IA"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-4 py-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <label htmlFor="ai-chatbot-search" className="sr-only">
                  Poser une question au chatbot RH IA
                </label>
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                  <input
                    id="ai-chatbot-search"
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ex. Peut-on mettre un CV dans une IA ?"
                    className="w-full rounded-2xl border border-gris-brume bg-ivoire py-2.5 pl-9 pr-3 font-corps text-sm text-bleu-nuit outline-none transition placeholder:text-black/35 focus:border-bleu-confiance"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-bleu-confiance text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                  aria-label="Envoyer la question"
                >
                  {isLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </button>
              </form>

              <div>
                <p className="mb-2 font-sous-titre text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  Questions fréquentes
                </p>
                <div className="flex flex-wrap gap-2">
                  {frequentQuestions.map((entry) => (
                    <button
                      key={entry.question}
                      type="button"
                      onClick={() => showEntry(entry)}
                      className="rounded-full border border-gris-brume bg-white px-3 py-2 text-left font-corps text-xs text-bleu-nuit transition hover:border-bleu-confiance hover:bg-bleu-confiance/8"
                    >
                      {entry.question}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-gris-brume bg-ivoire/80 p-4">
                <div className="mb-3 flex items-center gap-2 text-bleu-confiance">
                  {isLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : activeSource === "ai" ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="font-sous-titre text-[11px] font-semibold uppercase tracking-[0.16em]">
                    {isLoading
                      ? "Réponse en cours"
                      : activeSource === "ai"
                        ? "Réponse IA"
                        : "Réponse"}
                  </span>
                </div>

                {activeQuestion ? (
                  <p className="mb-2 font-sous-titre text-sm font-semibold text-bleu-nuit">
                    {activeQuestion}
                  </p>
                ) : null}

                <p className="font-corps text-sm leading-6 text-black/80">
                  {isLoading
                    ? "Je prépare une réponse courte et prudente sur le sujet."
                    : activeAnswer}
                </p>

                {statusMessage ? (
                  <div className="mt-3 rounded-2xl bg-white/70 px-3 py-2">
                    <div className="flex items-start gap-2 text-black/60">
                      {activeSource === "ai" && !isLoading ? (
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bleu-confiance" />
                      ) : (
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terracotta" />
                      )}
                      <p className="font-corps text-xs leading-5">{statusMessage}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="fake-ai-chatbot-trigger group flex items-center gap-3 rounded-full border border-gris-brume bg-carte px-3 py-2 pr-4 text-left"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer l'assistant RH IA" : "Ouvrir l'assistant RH IA"}
        >
          <span
            className="fake-ai-chatbot-avatar relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: mascot.accent }}
          >
            <img
              src={mascot.image}
              alt=""
              className="h-9 w-9 object-contain"
              aria-hidden="true"
            />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block font-sous-titre text-[10px] font-semibold uppercase tracking-[0.18em] text-bleu-confiance">
              Aide IA
            </span>
            <span className="block font-corps text-sm text-bleu-nuit">
              RH x IA
            </span>
          </span>
          <MessageCircle className="h-4 w-4 shrink-0 text-bleu-confiance transition group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}
