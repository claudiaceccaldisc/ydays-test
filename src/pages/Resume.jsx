import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import mascotteFin from "/assets/mascotte_fin.png";

// TODO à remplacer par les règles mémo définitives.
const FICHE = [
  {
    icon: "🔒",
    titre: "Confidentialité",
    texte: "Ne jamais saisir de données personnelles ou sensibles dans l'IA.",
  },
  {
    icon: "✅",
    titre: "Vérification",
    texte: "Toujours relire et valider les réponses avant de les utiliser.",
  },
  {
    icon: "🧭",
    titre: "Responsabilité",
    texte: "L'IA assiste, mais la décision finale vous appartient.",
  },
];

// Accès de révision vers les étapes du parcours.
const REVOIR = [
  { label: "Revoir le quiz", hint: "Étape 2", path: "/quiz", icon: "❓" },
  {
    label: "Revoir la mise en situation",
    hint: "Étape 3",
    path: "/situation",
    icon: "🎭",
  },
  { label: "Revoir l'IA en action", hint: "Étape 4", path: "/action", icon: "⚡" },
];

export default function Resume() {
  const navigate = useNavigate();

  return (
    <Layout currentStep={5}>
      <div className="flex w-full max-w-3xl flex-col items-center gap-6">
        {/* Hero de fin */}
        <div className="flex w-full animate-fade-up flex-col items-center gap-3 rounded-3xl border border-gris-brume bg-carte px-8 py-7 text-center shadow-[5px_6px_13.7px_6px_rgba(0,0,0,0.25)]">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-vert-sauge/15 to-bleu-confiance/10 p-2">
            <img
              src={mascotteFin}
              alt="Léa félicite l'utilisateur"
              className="h-full w-full animate-float object-contain"
            />
          </div>
          <h1 className="font-titre text-[28px] font-bold text-bleu-nuit">
            Parcours terminé ! 🎉
          </h1>
          <p className="max-w-md font-corps text-sm text-black/80">
            {/* TODO message de bilan personnalisé. */}
            Bravo, vous avez terminé le mini-parcours RH×IA. Voici votre fiche
            pratique à garder sous la main.
          </p>
        </div>

        {/* Fiche pratique */}
        <section className="w-full">
          <h2 className="mb-3 text-center font-titre text-xl font-bold text-bleu-nuit">
            Votre fiche pratique
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {FICHE.map((item, i) => (
              <div
                key={item.titre}
                className="flex animate-fade-up flex-col items-start gap-2 rounded-2xl border border-gris-brume bg-carte p-4 text-left shadow-[3px_3px_8px_0px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="font-sous-titre text-base font-semibold text-bleu-confiance">
                  {item.titre}
                </p>
                <p className="font-corps text-xs text-black/70">{item.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accès de révision */}
        <section className="w-full">
          <h2 className="mb-3 text-center font-titre text-xl font-bold text-bleu-nuit">
            Revoir une étape
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {REVOIR.map((item, i) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="group flex animate-fade-up items-center gap-3 rounded-2xl border border-gris-brume bg-carte p-4 text-left transition-all hover:-translate-y-1 hover:border-bleu-confiance hover:shadow-[3px_3px_10px_0px_rgba(36,86,211,0.15)] cursor-pointer"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bleu-confiance/10 text-lg transition-colors group-hover:bg-bleu-confiance/20">
                  {item.icon}
                </span>
                <span>
                  <span className="block font-sous-titre text-sm font-semibold text-bleu-nuit">
                    {item.label}
                  </span>
                  <span className="block font-corps text-xs text-black/50">
                    {item.hint}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Recommencer */}
        <Button
          variant="primary"
          className="animate-fade-up px-8"
          style={{ animationDelay: "0.5s" }}
          onClick={() => navigate("/")}
        >
          ↻ Recommencer le parcours
        </Button>
      </div>
    </Layout>
  );
}
