import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { getNextPath } from "../parcours";

export default function Action() {
  const navigate = useNavigate();

  return (
    <Layout currentStep={4}>
      <div className="flex w-full max-w-3xl animate-fade-up flex-col items-center gap-6 rounded-2xl border border-gris-brume bg-carte px-8 py-10 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)]">
        <span className="rounded-full bg-bleu-confiance/10 px-3 py-1 font-sous-titre text-xs font-semibold uppercase tracking-wide text-bleu-confiance">
          Tâche simulée
        </span>
        <h1 className="font-titre text-[28px] font-bold text-bleu-nuit">
          L'IA en action
        </h1>
        <p className="max-w-md font-corps text-sm text-black/80">
          {/* TODO */}
          La tâche simulée assistée par l'IA sera intégrée ici.
        </p>
        <Button onClick={() => navigate(getNextPath("action"))}>
          Voir le résumé
        </Button>
      </div>
    </Layout>
  );
}
