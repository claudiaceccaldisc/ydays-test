import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { getNextPath } from "../parcours";

export default function Situation() {
  const navigate = useNavigate();

  return (
    <Layout currentStep={3}>
      <div className="flex w-full max-w-3xl animate-fade-up flex-col items-center gap-6 rounded-2xl border border-gris-brume bg-carte px-8 py-10 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)]">
        <h1 className="font-titre text-[28px] font-bold text-bleu-nuit">
          Mise en situation
        </h1>
        <p className="font-corps text-xs text-black">
          {/* TODO scénario de mise en situation et feedbacks. */}
          Le scénario de mise en situation sera intégré ici.
        </p>
        <Button onClick={() => navigate(getNextPath("situation"))}>
          Continuer
        </Button>
      </div>
    </Layout>
  );
}
