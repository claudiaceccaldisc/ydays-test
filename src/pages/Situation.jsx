import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { getNextPath } from "../parcours";

export default function Situation() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-2xl border border-gris-brume bg-carte px-6 py-10 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-8">
      <h1 className="font-titre text-2xl font-bold text-bleu-nuit sm:text-[28px]">
        Mise en situation
      </h1>
      <p className="font-corps text-sm text-black/80">
        {/* TODO scénario de mise en situation et feedbacks. */}
        Le scénario de mise en situation sera intégré ici.
      </p>
      <Button
        variant="primary"
        onClick={() => navigate(getNextPath("situation"))}
      >
        Continuer
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
