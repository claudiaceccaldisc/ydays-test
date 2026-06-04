import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TOTAL_STEPS, getStepByPath } from "../parcours";
import Stepper from "./Stepper";
import logoAltis from "../assets/logo_altis.png";

// Variantes de transition entre les pages du parcours.
const pageVariants = {
  initial: { opacity: 0, y: 24, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.985 },
};

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const current = getStepByPath(location.pathname);
  const target = (current.step / TOTAL_STEPS) * 100;

  return (
    <div className="flex min-h-dvh flex-col bg-ivoire">
      {/* En-tête */}
      <header className="flex items-center gap-3 border-b border-gris-brume bg-carte px-4 py-3 sm:gap-8 sm:px-6 sm:py-3.5">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <img
            src={logoAltis}
            alt="Logo ALTIS"
            className="h-10 w-auto object-contain sm:h-11"
          />
        </div>

        {/* Barre de progression*/}
        <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-gris-brume">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-bleu-confiance to-vert-sauge"
            initial={{ width: 0 }}
            animate={{ width: `${target}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <p className="shrink-0 whitespace-nowrap font-corps text-[11px] text-bleu-nuit sm:text-xs">
          Étape {current.step} / {TOTAL_STEPS}
        </p>
      </header>

      {/* Frise des étapes */}
      <Stepper currentStep={current.step} />

      {/* Contenu des vues, animé en entrée/sortie */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-1 flex-col items-center justify-center"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
