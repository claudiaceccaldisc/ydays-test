import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  CircleCheck,
  Compass,
  CircleHelp,
  Drama,
  Zap,
  RotateCcw,
  PartyPopper,
  ChevronRight,
} from "lucide-react";
import Button from "../components/Button";
import MascotGuide from "../components/MascotGuide";
import { getMascotForStep } from "../utils/getMascotForStep";

const FICHE = [
  {
    Icon: Lock,
    titre: "Confidentialité",
    texte: "Ne jamais saisir de données personnelles ou sensibles dans l'IA.",
    chip: "bg-bleu-confiance/10 text-bleu-confiance",
    bar: "before:bg-bleu-confiance",
  },
  {
    Icon: CircleCheck,
    titre: "Vérification",
    texte: "Toujours relire et valider les réponses avant de les utiliser.",
    chip: "bg-vert-sauge/15 text-vert-sauge",
    bar: "before:bg-vert-sauge",
  },
  {
    Icon: Compass,
    titre: "Responsabilité",
    texte: "L'IA assiste, mais la décision finale vous appartient.",
    chip: "bg-amber-400/15 text-amber-500",
    bar: "before:bg-amber-400",
  },
];

const REVOIR = [
  { label: "Revoir le quiz", hint: "Étape 2", path: "/quiz", Icon: CircleHelp },
  {
    label: "Revoir la mise en situation",
    hint: "Étape 3",
    path: "/situation",
    Icon: Drama,
  },
  {
    label: "Revoir l'IA en action",
    hint: "Étape 4",
    path: "/action",
    Icon: Zap,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Resume() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex w-full max-w-3xl flex-col items-center gap-6"
    >
      <motion.div
        variants={item}
        className="flex w-full flex-col items-center gap-3 rounded-3xl border border-gris-brume bg-carte px-6 py-7 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)] sm:px-10"
      >
        <MascotGuide mood={getMascotForStep("resume")} className="max-w-sm" />

        <div className="inline-flex items-center gap-1.5 rounded-full bg-vert-sauge/15 px-3 py-1 font-sous-titre text-xs font-semibold text-vert-sauge">
          <CircleCheck className="h-3.5 w-3.5" />
          Parcours 100% complété
        </div>

        <h1 className="flex items-center justify-center gap-2 font-titre text-2xl font-bold text-bleu-nuit sm:text-[28px]">
          Parcours terminé !
          <PartyPopper className="h-6 w-6 text-amber-500" />
        </h1>
        <p className="mx-auto max-w-md font-corps text-sm text-black/80">
          {/* TODO (contenu) : message de bilan personnalisé. */}
          Bravo, vous avez terminé le mini-parcours RH×IA. Voici votre fiche
          pratique à garder sous la main.
        </p>
      </motion.div>

      <motion.section variants={item} className="w-full">
        <h2 className="mb-3 text-center font-titre text-lg font-bold text-bleu-nuit sm:text-xl">
          Votre fiche pratique
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {FICHE.map(({ Icon, titre, texte, chip, bar }) => (
            <motion.div
              key={titre}
              variants={item}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-2xl border border-gris-brume bg-carte p-4 pl-5 text-left shadow-[3px_3px_8px_0px_rgba(0,0,0,0.08)] before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:content-[''] ${bar}`}
            >
              <span
                className={`mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl ${chip}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="font-sous-titre text-base font-semibold text-bleu-nuit">
                {titre}
              </p>
              <p className="mt-1 font-corps text-xs text-black/70">{texte}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={item} className="w-full">
        <h2 className="mb-3 text-center font-titre text-lg font-bold text-bleu-nuit sm:text-xl">
          Revoir une étape
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {REVOIR.map(({ label, hint, path, Icon }) => (
            <motion.button
              key={path}
              variants={item}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(path)}
              className="group flex items-center gap-3 rounded-2xl border border-gris-brume bg-carte p-4 text-left transition-colors hover:border-bleu-confiance hover:shadow-[3px_3px_10px_0px_rgba(36,86,211,0.15)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bleu-confiance/10 text-bleu-confiance transition-colors group-hover:bg-bleu-confiance/20">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-sous-titre text-sm font-semibold text-bleu-nuit">
                  {label}
                </span>
                <span className="block font-corps text-xs text-black/50">
                  {hint}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-gris-brume transition-all group-hover:translate-x-0.5 group-hover:text-bleu-confiance" />
            </motion.button>
          ))}
        </div>
      </motion.section>

      <motion.div variants={item}>
        <Button variant="primary" className="px-8" onClick={() => navigate("/")}>
          <RotateCcw className="h-4 w-4" />
          Recommencer le parcours
        </Button>
      </motion.div>
    </motion.div>
  );
}
