import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Bell, CircleAlert, CircleCheck } from "lucide-react";
import Button from "../components/Button";
import MascotGuide from "../components/MascotGuide";
import { getNextPath } from "../parcours";

const CHECK_OPTIONS = [
  {
    id: "personal-data",
    text: "Présence de données personnelles",
    isCorrect: true,
  },
  {
    id: "anonymization",
    text: "Besoin d’anonymisation",
    isCorrect: true,
  },
  {
    id: "internal-rules",
    text: "Cadre interne / outil autorisé",
    isCorrect: true,
  },
  {
    id: "public-copy-paste",
    text: "Copier-coller directement dans une IA publique",
    isCorrect: false,
  },
];

const ACTION_OPTIONS = [
  {
    id: "public-ia",
    text: "Copier tout le message dans une IA publique",
    isCorrect: false,
  },
  {
    id: "anonymize",
    text: "Anonymiser la demande puis utiliser l’IA pour structurer une réponse",
    isCorrect: true,
  },
  {
    id: "auto-reply",
    text: "Laisser l’IA répondre directement au salarié",
    isCorrect: false,
  },
];

const RISK_FEEDBACK =
  "Avant d’utiliser l’IA, il faut vérifier les données personnelles, l’anonymisation nécessaire et le cadre interne autorisé. Le copier-coller direct dans une IA publique n’est pas acceptable.";

const SUCCESS_FEEDBACK =
  "Bonne pratique : l’IA peut aider à structurer une réponse, mais les données personnelles doivent être anonymisées et le RH garde la décision finale.";

const WARNING_FEEDBACK =
  "Attention : les données RH sont sensibles. Il ne faut pas les partager dans un outil IA non validé, ni laisser l’IA répondre seule.";

const FINAL_RESPONSE =
  "Bonjour, nous avons bien pris en compte votre demande. Nous allons l’étudier selon la procédure interne et revenir vers vous rapidement.";

export default function Situation() {
  const navigate = useNavigate();
  const [selectedChecks, setSelectedChecks] = useState([]);
  const [riskValidated, setRiskValidated] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const validCheckIds = useMemo(
    () => CHECK_OPTIONS.filter((option) => option.isCorrect).map((option) => option.id),
    [],
  );

  const hasIncorrectCheck = selectedChecks.some(
    (choice) => !CHECK_OPTIONS.find((option) => option.id === choice)?.isCorrect,
  );
  const hasAllCorrectChecks = validCheckIds.every((id) => selectedChecks.includes(id));
  const riskSuccess = riskValidated && hasAllCorrectChecks && !hasIncorrectCheck;

  const currentAction = ACTION_OPTIONS.find((choice) => choice.id === selectedAction);
  const actionAnswered = Boolean(currentAction);
  const actionSuccess = Boolean(currentAction?.isCorrect);

  const mascotMood = actionAnswered
    ? actionSuccess
      ? "success"
      : "warning"
    : riskValidated
      ? riskSuccess
        ? "guide"
        : "warning"
      : "reflection";

  const toggleCheck = (id) => {
    if (riskValidated) {
      return;
    }

    setSelectedChecks((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id],
    );
  };

  const handleRiskValidation = () => {
    if (selectedChecks.length === 0) {
      return;
    }

    setRiskValidated(true);
  };

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-gris-brume bg-carte px-6 py-10 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-8">
      <MascotGuide mood={mascotMood} className="max-w-[10rem]" imageOnly compact />

      <div className="space-y-2">
        <h1 className="font-titre text-2xl font-bold text-bleu-nuit sm:text-[28px]">
          Mission RH urgente
        </h1>
        <p className="font-corps text-sm text-black/70">Le téléphone de Camille</p>
      </div>

      <div className="quiz-bubble quiz-bubble-left w-full rounded-2xl bg-bleu-confiance/10 px-4 py-4 text-left shadow-[-3px_0px_0px_0px_#2456d3]">
        <div className="flex items-center gap-2 font-sous-titre text-xs font-semibold uppercase tracking-wide text-bleu-confiance">
          <Bell className="h-4 w-4" />
          Nouveau message RH reçu
        </div>
        <p className="mt-3 font-corps text-sm text-black/80">
          Bonjour Camille, peux-tu préparer une réponse à un salarié qui demande
          un aménagement d’horaire ?
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
        <MascotGuide mood={mascotMood} className="shrink-0" imageOnly compact />
        <div className="quiz-bubble quiz-bubble-right quiz-bubble-question w-full rounded-3xl px-5 py-4 text-left sm:flex-1">
          <p className="font-corps text-sm leading-6 text-black/80">
            Avant d’utiliser l’IA, il faut identifier les risques.
          </p>
        </div>
      </div>

      <div className="w-full rounded-2xl border border-gris-brume bg-ivoire px-5 py-5 text-left">
        <h2 className="font-sous-titre text-lg font-semibold text-bleu-nuit">
          Que dois-tu vérifier avant d’utiliser l’IA ?
        </h2>

        <div className="mt-4 grid gap-3">
          {CHECK_OPTIONS.map((option) => {
            const isSelected = selectedChecks.includes(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleCheck(option.id)}
                className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                  isSelected
                    ? "border-bleu-confiance bg-bleu-confiance/10"
                    : "border-gris-brume bg-carte hover:border-bleu-confiance/40"
                } ${riskValidated ? "cursor-default" : ""}`}
              >
                <span className="font-sous-titre text-sm font-semibold text-bleu-nuit">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {!riskValidated ? (
          <div className="mt-5 flex justify-end">
            <Button
              variant="primary"
              onClick={handleRiskValidation}
              disabled={selectedChecks.length === 0}
              className={selectedChecks.length === 0 ? "cursor-not-allowed opacity-50" : ""}
            >
              Valider l’analyse
            </Button>
          </div>
        ) : (
          <div
            className={`quiz-bubble mt-5 rounded-3xl px-5 py-4 text-left ${
              riskSuccess ? "quiz-bubble-success" : "quiz-bubble-warning"
            }`}
          >
            <div className="flex items-center gap-2 font-sous-titre text-sm font-semibold text-bleu-nuit">
              {riskSuccess ? (
                <CircleCheck className="h-4 w-4 text-vert-sauge" />
              ) : (
                <CircleAlert className="h-4 w-4 text-terracotta" />
              )}
              {riskSuccess ? "Analyse correcte" : "Analyse incomplète"}
            </div>
            <p className="mt-2 font-corps text-sm text-black/80">{RISK_FEEDBACK}</p>
          </div>
        )}
      </div>

      {riskValidated ? (
        <div className="w-full rounded-2xl border border-gris-brume bg-carte px-5 py-5 text-left">
          <h2 className="font-sous-titre text-lg font-semibold text-bleu-nuit">
            Quelle est la meilleure action ?
          </h2>

          <div className="mt-4 grid gap-3">
            {ACTION_OPTIONS.map((option) => {
              const isSelected = selectedAction === option.id;
              const isCorrect = actionAnswered && option.isCorrect;
              const isWrongSelected =
                actionAnswered && isSelected && !option.isCorrect;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => !actionAnswered && setSelectedAction(option.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                    isCorrect
                      ? "border-vert-sauge bg-vert-sauge/15"
                      : isWrongSelected
                        ? "border-terracotta bg-terracotta/10"
                        : isSelected
                          ? "border-bleu-confiance bg-bleu-confiance/10"
                          : "border-gris-brume bg-carte hover:border-bleu-confiance/40"
                  }`}
                >
                  <span className="font-sous-titre text-sm font-semibold text-bleu-nuit">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {actionAnswered ? (
            <>
              <div
                className={`quiz-bubble mt-5 rounded-3xl px-5 py-4 text-left ${
                  actionSuccess ? "quiz-bubble-success" : "quiz-bubble-warning"
                }`}
              >
                <div className="flex items-center gap-2 font-sous-titre text-sm font-semibold text-bleu-nuit">
                  {actionSuccess ? (
                    <CircleCheck className="h-4 w-4 text-vert-sauge" />
                  ) : (
                    <CircleAlert className="h-4 w-4 text-terracotta" />
                  )}
                  {actionSuccess ? "Bonne décision" : "Décision risquée"}
                </div>
                <p className="mt-2 font-corps text-sm text-black/80">
                  {actionSuccess ? SUCCESS_FEEDBACK : WARNING_FEEDBACK}
                </p>
              </div>

              <div className="mt-5 rounded-2xl bg-bleu-confiance/10 px-4 py-4 text-left shadow-[-3px_0px_0px_0px_#2456d3]">
                <p className="font-sous-titre text-xs font-semibold uppercase tracking-wide text-bleu-confiance">
                  Exemple de réponse finale
                </p>
                <p className="mt-2 font-corps text-sm text-black/80">
                  {FINAL_RESPONSE}
                </p>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <Button
        variant="primary"
        onClick={() => navigate(getNextPath("situation"))}
        className={!actionAnswered ? "cursor-not-allowed opacity-50" : ""}
        disabled={!actionAnswered}
      >
        Continuer
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
