import { STEPS } from "../parcours";

export default function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center px-6 pt-8 pb-3">
      {STEPS.map((s, i) => {
        const isActive = s.step === currentStep;
        const isDone = s.step < currentStep;
        return (
          <div key={s.key} className="flex items-center">
            <div className="relative flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full font-titre text-[22px] font-bold transition-all duration-300 ${
                  isActive
                    ? "scale-110 bg-bleu-confiance text-ivoire shadow-[0_4px_12px_-2px_rgba(36,86,211,0.5)]"
                    : isDone
                      ? "bg-vert-sauge text-ivoire"
                      : "border-2 border-gris-brume text-gris-brume"
                }`}
              >
                {s.step}
              </div>
              {isActive && (
                <span className="absolute top-full mt-1.5 whitespace-nowrap font-titre text-sm font-bold text-bleu-confiance">
                  {s.label}
                </span>
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-3 h-0.5 w-16 overflow-hidden rounded-full bg-gris-brume sm:w-24">
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
