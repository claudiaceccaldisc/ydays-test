import { useEffect, useState } from "react";
import { TOTAL_STEPS } from "../parcours";
import Stepper from "./Stepper";

export default function Layout({ currentStep, children }) {
  const target = (currentStep / TOTAL_STEPS) * 100;
  const start = ((currentStep - 1) / TOTAL_STEPS) * 100;

  const [width, setWidth] = useState(start);
  useEffect(() => {
    const id = requestAnimationFrame(() => setWidth(target));
    return () => cancelAnimationFrame(id);
  }, [target]);

  return (
    <div className="flex min-h-dvh flex-col bg-ivoire">
      {/* En-tête */}
      <header className="flex items-center gap-6 border-b border-gris-brume bg-carte px-6 py-3.5 sm:gap-12">
        <p className="shrink-0 font-titre text-[28px] font-bold leading-none">
          <span className="text-bleu-nuit">RH</span>
          <span className="text-bleu-confiance">x</span>
          <span className="text-bleu-nuit">IA</span>
        </p>

        <div className="relative h-[9px] flex-1 overflow-hidden rounded-full bg-gris-brume">
          <div
            className="h-full rounded-full bg-gradient-to-r from-bleu-confiance to-vert-sauge transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${width}%` }}
          >
            {/* Reflet qui balaie la portion remplie */}
            <span className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/40 blur-[2px] [animation:shimmer_2.4s_ease-in-out_infinite]" />
          </div>
        </div>

        <p className="shrink-0 whitespace-nowrap font-corps text-xs text-bleu-nuit">
          Étape {currentStep} sur {TOTAL_STEPS}
        </p>
      </header>

      {/* Frise des étapes */}
      <Stepper currentStep={currentStep} />

      {/* Contenu de la vue */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-6">
        {children}
      </main>
    </div>
  );
}
