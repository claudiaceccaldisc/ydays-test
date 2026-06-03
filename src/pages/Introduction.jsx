import { useNavigate } from "react-router-dom";
import { Lightbulb, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import MascotGuide from "../components/MascotGuide";
import { getMascotForStep } from "../utils/getMascotForStep";
import { getNextPath } from "../parcours";

const STATS = [
  { value: "10", label: "Minutes max" },
  { value: "5", label: "Étapes clefs" },
  { value: "100%", label: "Pratique !" },
];

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full max-w-5xl flex-col items-center gap-5">
        <div className="flex w-full max-w-2xl animate-fade-up flex-col items-center gap-3 rounded-2xl border border-gris-brume bg-carte px-6 py-6 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-12">
          <p className="font-sous-titre text-sm font-semibold tracking-wide text-vert-sauge sm:text-base">
            MINI-PARCOURS INTERACTIF · 10 MINUTES
          </p>

          <MascotGuide
            mood={getMascotForStep("introduction")}
            className="max-w-[10rem]"
            imageOnly
          />

          <h1 className="font-titre text-2xl font-bold leading-tight text-bleu-nuit sm:text-[26px]">
            Bonjour ! Je suis Léa, votre guide RH×IA
          </h1>

          <p className="max-w-md font-corps text-sm text-black/80">
            Dans les 10 prochaines minutes, je vous accompagne pour comprendre
            comment utiliser l'intelligence artificielle dans votre quotidien RH
            de manière responsable, sécurisée et efficace.
          </p>

          <Button
            variant="primary"
            className="mt-1"
            onClick={() => navigate(getNextPath("introduction"))}
          >
            Commencer le parcours
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex animate-fade-up flex-col items-center justify-center rounded-2xl border border-gris-brume bg-carte px-2 py-3 shadow-[4px_4px_6.3px_0px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-1 sm:py-4"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <span className="font-titre text-[28px] font-bold leading-none text-bleu-confiance sm:text-[38px]">
                {stat.value}
              </span>
              <span className="mt-1 text-center font-corps text-[11px] text-bleu-nuit sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="w-full max-w-2xl animate-fade-up rounded-2xl bg-bleu-confiance/10 px-4 py-3 shadow-[-3px_0px_0px_0px_#2456d3] sm:px-6"
          style={{ animationDelay: "0.45s" }}
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bleu-confiance/15 text-bleu-confiance">
              <Lightbulb className="h-4 w-4" />
            </span>
            <p className="font-sous-titre text-sm font-semibold text-bleu-confiance sm:text-base">
              Ce que vous allez apprendre
            </p>
          </div>
          <p className="font-corps text-xs text-black/80">
            Ce que l'IA peut faire pour vous · Les règles essentielles de
            confidentialité · Comment utiliser l'IA sur des tâches RH concrètes
            · Les bonnes pratiques pour rester maître de vos décisions
          </p>
        </div>
      </div>
    </>
  );
}
