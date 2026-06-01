import { Check } from "lucide-react";
import { STEPS } from "../parcours";

export default function Stepper({ currentStep }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center px-4 pt-7 pb-3 sm:px-6">
      {STEPS.map((s, i) => {
        const isActive = s.step === currentStep;
        const isDone = s.step < currentStep;
        return (
          <div
            key={s.key}
            className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}
          >
            <div className="relative flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full font-titre text-base font-bold transition-all duration-300 sm:h-9 sm:w-9 sm:text-[22px] ${
                  isActive
                    ? "scale-110 bg-bleu-confiance text-ivoire shadow-[0_4px_12px_-2px_rgba(36,86,211,0.5)]"
                    : isDone
                      ? "bg-vert-sauge text-ivoire"
                      : "border-2 border-gris-brume text-gris-brume"
                }`}
              >
                {isDone ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : s.step}
              </div>
              {isActive && (
                <span className="absolute top-full mt-1.5 max-w-[80px] text-center text-[11px] font-bold leading-tight text-bleu-confiance font-titre sm:max-w-none sm:whitespace-nowrap sm:text-sm">
                  {s.label}
                </span>
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-1.5 h-0.5 flex-1 overflow-hidden rounded-full bg-gris-brume sm:mx-3">
                <div
                  className={`h-full rounded-full bg-vert-sauge transition-all duration-500 ${
                    isDone ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
