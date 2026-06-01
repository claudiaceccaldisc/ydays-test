import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import Button from "../components/Button";
import MascotGuide from "../components/MascotGuide";
import { getMascotForStep } from "../utils/getMascotForStep";
import { getNextPath } from "../parcours";
import { quizIntro, quizModules, quizSummary } from "../data/quizData";

export default function Quiz() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [showQuestion, setShowQuestion] = useState(false);

  const isFinished = currentIndex >= quizModules.length;
  const currentModule = quizModules[currentIndex];
  const currentAnswer = currentModule ? submittedAnswers[currentModule.id] : null;
  const isSubmitted = Boolean(currentAnswer);
  const isLastQuestion = currentIndex === quizModules.length - 1;

  const score = useMemo(
    () =>
      Object.values(submittedAnswers).filter((answer) => answer.isCorrect).length,
    [submittedAnswers],
  );

  const handleSubmit = () => {
    if (!selectedAnswer || !currentModule || isSubmitted) {
      return;
    }

    const isCorrect = selectedAnswer === currentModule.correctAnswer;

    setSubmittedAnswers((previous) => ({
      ...previous,
      [currentModule.id]: {
        answer: selectedAnswer,
        isCorrect,
      },
    }));
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowQuestion(false);

    if (isLastQuestion) {
      setCurrentIndex(quizModules.length);
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  };

  if (isFinished) {
    return (
      <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-gris-brume bg-carte px-6 py-10 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-8">
        <MascotGuide mood="finish" />
        <div className="rounded-full bg-vert-sauge/15 px-4 py-1 font-sous-titre text-xs font-semibold uppercase tracking-wide text-vert-sauge">
          Score {score}/{quizModules.length}
        </div>
        <h1 className="font-titre text-2xl font-bold text-bleu-nuit sm:text-[28px]">
          {quizSummary.title}
        </h1>
        <p className="max-w-2xl font-corps text-sm text-black/80">
          {quizSummary.text}
        </p>
        <Button variant="primary" onClick={() => navigate(getNextPath("quiz"))}>
          Continuer le parcours
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  const mascotMood = isSubmitted
    ? currentAnswer?.isCorrect
      ? getMascotForStep("quizSuccess")
      : getMascotForStep("quizError")
    : showQuestion
      ? getMascotForStep("quiz")
      : currentModule.mood;

  const feedbackText = currentAnswer?.isCorrect
    ? currentModule.correctFeedback
    : currentModule.incorrectFeedback;

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-gris-brume bg-carte px-6 py-10 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-8">
      <div className="space-y-2">
        <p className="font-sous-titre text-xs font-semibold uppercase tracking-[0.18em] text-bleu-confiance">
          {quizIntro.title} · Module {currentIndex + 1}/{quizModules.length}
        </p>
        <h1 className="font-titre text-2xl font-bold text-bleu-nuit sm:text-[28px]">
          {currentModule.title}
        </h1>
      </div>

      {!showQuestion ? (
        <>
          <div className="quiz-bubble quiz-bubble-left w-full rounded-2xl bg-bleu-confiance/10 px-4 py-4 text-left shadow-[-3px_0px_0px_0px_#2456d3]">
            <p className="font-sous-titre text-xs font-semibold uppercase tracking-wide text-bleu-confiance">
              {currentModule.infoTitle}
            </p>
            <div className="mt-2 space-y-2">
              {currentModule.infoText.map((line) => (
                <p key={line} className="font-corps text-sm text-black/80">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start">
            <MascotGuide mood={mascotMood} className="max-w-sm shrink-0" />
            <div className="quiz-bubble quiz-bubble-left quiz-bubble-mascot w-full rounded-3xl bg-ivoire px-5 py-4 text-left">
              <p className="font-corps text-sm leading-6 text-black/80">
                {currentModule.moduleMascotText || quizIntro.text}
              </p>
            </div>
          </div>

          <Button variant="primary" onClick={() => setShowQuestion(true)}>
            Voir la question
            <ArrowRight className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start">
            <MascotGuide mood={mascotMood} className="max-w-sm shrink-0" />
            <div
              className={`quiz-bubble quiz-bubble-right w-full rounded-3xl bg-carte px-5 py-4 text-left ${
                isSubmitted
                  ? currentAnswer?.isCorrect
                    ? "quiz-bubble-success"
                    : "quiz-bubble-warning"
                  : "quiz-bubble-question"
              }`}
            >
              <p className="font-corps text-sm leading-6 text-black/80">
                {isSubmitted ? feedbackText : currentModule.preQuestionText}
              </p>
            </div>
          </div>

          <div className="w-full text-left">
            <h2 className="font-sous-titre text-lg font-semibold text-bleu-nuit">
              {currentModule.question}
            </h2>
            <div className="mt-4 grid gap-3">
              {currentModule.choices.map((choice) => {
                const isSelected = selectedAnswer === choice.id;
                const isCorrect = isSubmitted && choice.id === currentModule.correctAnswer;
                const isWrongSelected =
                  isSubmitted &&
                  choice.id === currentAnswer?.answer &&
                  !currentAnswer?.isCorrect;

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => !isSubmitted && setSelectedAnswer(choice.id)}
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
                      {choice.id}. {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-corps text-sm text-black/60">
              {isSubmitted
                ? currentAnswer?.isCorrect
                  ? "Bonne réponse validée."
                  : "Lis le feedback avant de continuer."
                : "Sélectionne une réponse pour afficher le feedback."}
            </p>

            {isSubmitted ? (
              <Button variant="primary" onClick={handleNext}>
                {isLastQuestion ? "Voir l’écran de fin" : "Question suivante"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={!selectedAnswer ? "cursor-not-allowed opacity-50" : ""}
              >
                Valider la réponse
              </Button>
            )}
          </div>

          {isSubmitted ? (
            <div className="flex items-center gap-2 rounded-full bg-carte px-4 py-2 text-sm font-semibold text-bleu-nuit">
              {currentAnswer?.isCorrect ? (
                <CircleCheck className="h-4 w-4 text-vert-sauge" />
              ) : (
                <CircleAlert className="h-4 w-4 text-terracotta" />
              )}
              {currentAnswer?.isCorrect ? "Bonne réponse" : "Réponse à revoir"}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
