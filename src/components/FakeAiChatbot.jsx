import { useMemo, useState } from "react";
import { Bot, MessageCircle, Search, X } from "lucide-react";
import {
  chatbotFallbackMessage,
  chatbotFaq,
  chatbotWelcomeMessage,
} from "../data/chatbotFaq";
import { mascotGuideContent } from "../data/mascotGuide";
import { findBestFaqMatch } from "../utils/chatbotFaqSearch";

export default function FakeAiChatbot() {
  const mascot = mascotGuideContent.question;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeQuestion, setActiveQuestion] = useState("");
  const [activeAnswer, setActiveAnswer] = useState(chatbotWelcomeMessage);
  const frequentQuestions = useMemo(() => chatbotFaq.slice(0, 6), []);

  function showEntry(entry) {
    setQuery(entry.question);
    setActiveQuestion(entry.question);
    setActiveAnswer(entry.answer);
  }

  function handleSearch(event) {
    event?.preventDefault();

    const match = findBestFaqMatch(query);

    if (match) {
      setActiveQuestion(match.question);
      setActiveAnswer(match.answer);
      return;
    }

    setActiveQuestion(query.trim() || "Recherche");
    setActiveAnswer(chatbotFallbackMessage);
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
                  alt="Mascotte du chatbot"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="mt-1 font-titre text-lg font-bold text-bleu-nuit">
                  FAQ ALTIS
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gris-brume bg-white/70 text-bleu-nuit transition hover:border-bleu-confiance hover:text-bleu-confiance"
                aria-label="Fermer le chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-4 py-4">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <label htmlFor="fake-ai-chatbot-search" className="sr-only">
                  Rechercher une question ALTIS
                </label>
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                  <input
                    id="fake-ai-chatbot-search"
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ex. RGPD, CV, prompt..."
                    className="w-full rounded-2xl border border-gris-brume bg-ivoire py-2.5 pl-9 pr-3 font-corps text-sm text-bleu-nuit outline-none transition placeholder:text-black/35 focus:border-bleu-confiance"
                  />
                </div>
                <button
                  type="submit"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-bleu-confiance text-white transition hover:brightness-110"
                  aria-label="Lancer la recherche"
                >
                  <Search className="h-4 w-4" />
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
                  <Bot className="h-4 w-4" />
                  <span className="font-sous-titre text-[11px] font-semibold uppercase tracking-[0.16em]">
                    Réponse du bot
                  </span>
                </div>
                {activeQuestion ? (
                  <p className="mb-2 font-sous-titre text-sm font-semibold text-bleu-nuit">
                    {activeQuestion}
                  </p>
                ) : null}
                <p className="font-corps text-sm leading-6 text-black/80">
                  {activeAnswer}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="fake-ai-chatbot-trigger group flex items-center gap-3 rounded-full border border-gris-brume bg-carte px-3 py-2 pr-4 text-left"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Fermer l'assistant FAQ ALTIS" : "Ouvrir l'assistant FAQ ALTIS"}
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
              Aide rapide
            </span>
            <span className="block font-corps text-sm text-bleu-nuit">
              FAQ ALTIS
            </span>
          </span>
          <MessageCircle className="h-4 w-4 shrink-0 text-bleu-confiance transition group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}
