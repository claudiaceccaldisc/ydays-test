import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { getNextPath } from "../parcours";
import mascotte from "/assets/mascotte_welcome.png";

const STATS = [
  { value: "10", label: "Minutes max" },
  { value: "5", label: "Étapes clefs" },
  { value: "100%", label: "Pratique !" },
];

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <Layout currentStep={1}>
      <div className="flex w-full max-w-5xl flex-col items-center gap-5">
        {/* Carte principale */}
        <div className="flex w-full max-w-2xl animate-fade-up flex-col items-center gap-3 rounded-2xl border border-gris-brume bg-carte px-8 py-6 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-16">
          <p className="font-sous-titre text-base font-semibold tracking-wide text-vert-sauge">
            MINI-PARCOURS INTERACTIF · 10 MINUTES
          </p>

          {/* Avatar mascotte */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-b from-vert-sauge/15 to-bleu-confiance/10 p-3">
            <img
              src={mascotte}
              alt="Léa, la mascotte guide RHxIA"
              className="h-full w-full animate-float object-contain"
            />
          </div>

          <h1 className="font-titre text-[26px] font-bold leading-tight text-bleu-nuit">
            Bonjour ! Je suis Léa, votre guide RH×IA
          </h1>

          <p className="max-w-md font-corps text-sm text-black/80">
            Dans les 10 prochaines minutes, je vous accompagne pour comprendre
            comment utiliser l'intelligence artificielle dans votre quotidien RH
            — de manière responsable, sécurisée et efficace.
          </p>

          <Button
            className="mt-1"
            onClick={() => navigate(getNextPath("introduction"))}
          >
            Commencer le parcours
          </Button>
        </div>

        {/* Encarts statistiques */}
        <div className="flex flex-wrap justify-center gap-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex h-[88px] w-[200px] animate-fade-up flex-col items-center justify-center rounded-2xl border border-gris-brume bg-carte shadow-[4px_4px_6.3px_0px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-1"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <span className="font-titre text-[38px] font-bold leading-none text-bleu-confiance">
                {stat.value}
              </span>
              <span className="mt-1 font-corps text-xs text-bleu-nuit">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bandeau "Ce que vous allez apprendre" */}
        <div
          className="w-full max-w-2xl animate-fade-up rounded-2xl bg-bleu-confiance/10 px-6 py-3 shadow-[-3px_0px_0px_0px_#2456d3]"
          style={{ animationDelay: "0.45s" }}
        >
          <div className="flex items-start gap-2">
            <span className="text-xl leading-none">💡</span>
            <div className="text-left">
              <p className="font-sous-titre text-base font-semibold text-bleu-confiance">
                Ce que vous allez apprendre
              </p>
              <p className="mt-1 font-corps text-xs text-black/80">
                Ce que l'IA peut faire pour vous · Les règles essentielles de
                confidentialité · Comment utiliser l'IA sur des tâches RH
                concrètes · Les bonnes pratiques pour rester maître de vos
                décisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
