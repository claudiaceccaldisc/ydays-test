import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  LoaderCircle,
  Lock,
  Sparkles,
} from "lucide-react";
import Button from "../components/Button";
import MascotGuide from "../components/MascotGuide";
import { getMascotForStep } from "../utils/getMascotForStep";
import { findBestFaqMatch } from "../utils/chatbotFaqSearch";
import { getNextPath } from "../parcours";
import {
  actionCoachFallback,
  actionCoachIntro,
  actionCoachLoading,
  actionCoachSuggestions,
  actionCoachWelcome,
} from "../data/actionCoach";

export default function Action() {
  const navigate = useNavigate();
  const [need, setNeed] = useState("");
  const [activeNeed, setActiveNeed] = useState("");
  const [answer, setAnswer] = useState(actionCoachWelcome);
  const [source, setSource] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  function applyLocalFallback(rawNeed, errorMessage) {
    const localMatch = findBestFaqMatch(rawNeed);

    if (localMatch) {
      setAnswer(localMatch.answer);
      setSource("local");
      setStatusMessage(
        `${errorMessage} Voici la piste locale la plus proche de ta demande.`,
      );
      return;
    }

    setAnswer(actionCoachFallback);
    setSource("local");
    setStatusMessage(errorMessage);
  }

  async function handleSubmit(event) {
    event?.preventDefault();

    const trimmedNeed = need.trim();

    if (!trimmedNeed || isLoading) {
      return;
    }

    setIsLoading(true);
    setHasInteracted(true);
    setActiveNeed(trimmedNeed);
    setSource("loading");
    setStatusMessage("Génération d'une proposition personnalisée en cours…");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedNeed, mode: "coach" }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload?.answer) {
        applyLocalFallback(
          trimmedNeed,
          payload?.error || "Le coach IA n'est pas disponible pour le moment.",
        );
        return;
      }

      setAnswer(payload.answer);
      setSource("ai");
      setStatusMessage("Proposition personnalisée générée par l'IA.");
    } catch {
      applyLocalFallback(
        trimmedNeed,
        "Impossible de joindre le coach IA pour le moment.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestion(prompt) {
    setNeed(prompt);
  }

  const mascotMood = getMascotForStep("action");

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-gris-brume bg-carte px-6 py-10 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-8">
      <MascotGuide mood={mascotMood} className="max-w-[10rem]" imageOnly />

      <span className="rounded-full bg-bleu-confiance/10 px-3 py-1 font-sous-titre text-xs font-semibold uppercase tracking-wide text-bleu-confiance">
        Tâche simulée
      </span>
      <h1 className="font-titre text-2xl font-bold text-bleu-nuit sm:text-[28px]">
        L'IA en action
      </h1>
      <p className="max-w-md font-corps text-sm text-black/80">
        {actionCoachIntro}
      </p>

      <div className="w-full rounded-2xl border border-gris-brume bg-ivoire px-5 py-5 text-left">
        <p className="mb-2 font-sous-titre text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
          Quelques idées pour démarrer
        </p>
        <div className="flex flex-wrap gap-2">
          {actionCoachSuggestions.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => handleSuggestion(suggestion.prompt)}
              className="rounded-full border border-gris-brume bg-carte px-3 py-2 font-corps text-xs text-bleu-nuit transition hover:border-bleu-confiance hover:bg-bleu-confiance/8"
            >
              {suggestion.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label htmlFor="action-need" className="sr-only">
            Décris ce que tu veux apprendre
          </label>
          <textarea
            id="action-need"
            value={need}
            onChange={(event) => setNeed(event.target.value)}
            rows={3}
            maxLength={300}
            placeholder="Ex. J'aimerais apprendre à rédiger une fiche de poste claire avec l'IA…"
            className="w-full resize-none rounded-2xl border border-gris-brume bg-carte px-4 py-3 font-corps text-sm text-bleu-nuit outline-none transition placeholder:text-black/35 focus:border-bleu-confiance"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="font-corps text-[11px] text-black/40">
              {need.length}/300
            </span>
            <Button
              type="submit"
              variant="primary"
              disabled={!need.trim() || isLoading}
              className={
                !need.trim() || isLoading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }
            >
              {isLoading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isLoading ? "Génération…" : "Demander à l'IA"}
            </Button>
          </div>
        </form>
      </div>

      <div className="w-full rounded-2xl border border-gris-brume bg-ivoire/80 px-5 py-5 text-left">
        <div className="mb-3 flex items-center gap-2 text-bleu-confiance">
          {isLoading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : source === "ai" ? (
            <Sparkles className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
          <span className="font-sous-titre text-[11px] font-semibold uppercase tracking-[0.16em]">
            {isLoading
              ? "Proposition en cours"
              : source === "ai"
                ? "Proposition IA"
                : source === "local"
                  ? "Proposition locale"
                  : "Proposition personnalisée"}
          </span>
        </div>

        {activeNeed ? (
          <p className="mb-2 font-sous-titre text-sm font-semibold text-bleu-nuit">
            Ton besoin : {activeNeed}
          </p>
        ) : null}

        <p className="whitespace-pre-line font-corps text-sm leading-6 text-black/80">
          {isLoading ? actionCoachLoading : answer}
        </p>

        {statusMessage ? (
          <div className="mt-3 rounded-2xl bg-white/70 px-3 py-2">
            <div className="flex items-start gap-2 text-black/60">
              {source === "ai" && !isLoading ? (
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bleu-confiance" />
              ) : (
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terracotta" />
              )}
              <p className="font-corps text-xs leading-5">{statusMessage}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex w-full items-start gap-2 rounded-2xl bg-bleu-confiance/8 px-4 py-3 text-left">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-bleu-confiance" />
        <p className="font-corps text-xs leading-5 text-black/70">
          Rappel : ne saisis jamais de données personnelles ou sensibles réelles
          dans une IA non validée. Décris ton besoin de façon générale.
        </p>
      </div>

      <Button
        variant="primary"
        onClick={() => navigate(getNextPath("action"))}
        disabled={!hasInteracted}
        className={!hasInteracted ? "cursor-not-allowed opacity-50" : ""}
      >
        Voir le résumé
        <ArrowRight className="h-4 w-4" />
      </Button>
      {!hasInteracted ? (
        <p className="-mt-3 font-corps text-xs text-black/45">
          Lance au moins une demande à l'IA pour continuer.
        </p>
      ) : null}
    </div>
  );
}
