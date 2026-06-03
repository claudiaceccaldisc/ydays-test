import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackHomeButton({ label = "Retour accueil" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className="self-start rounded-full border border-gris-brume bg-carte px-3 py-1.5 font-sous-titre text-xs font-semibold text-bleu-nuit/75 transition-colors hover:border-bleu-confiance/40 hover:text-bleu-confiance"
    >
      <span className="inline-flex items-center gap-1.5">
        <ChevronLeft className="h-3.5 w-3.5" />
        {label}
      </span>
    </button>
  );
}
