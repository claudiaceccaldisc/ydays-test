import { mascotGuideContent, type MascotMood } from "../data/mascotGuide";

type MascotGuideProps = {
  mood: MascotMood;
  className?: string;
};

const mascotAnimationClass: Record<MascotMood, string> = {
  welcome: "mascot-guide-welcome",
  question: "mascot-guide-question",
  success: "mascot-guide-pop",
  warning: "mascot-guide-question",
  tip: "mascot-guide-fade",
  finish: "mascot-guide-pop",
  confidentiality: "mascot-guide-fade",
  guide: "mascot-guide-fade",
  reflection: "mascot-guide-reflection",
};

export default function MascotGuide({ mood, className = "" }: MascotGuideProps) {
  const content = mascotGuideContent[mood];

  return (
    <aside
      className={`mascot-guide-card ${mascotAnimationClass[mood]} mascot-guide-glow w-full max-w-md overflow-hidden rounded-3xl border border-white/60 ${className}`}
      style={{ backgroundColor: "var(--mascot-cream)" }}
      aria-live="polite"
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <div
          className="flex h-24 w-24 shrink-0 items-center justify-center self-center rounded-2xl p-3 sm:h-28 sm:w-28"
          style={{ backgroundColor: content.accent }}
        >
          <img
            src={content.image}
            alt={content.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="text-center sm:text-left">
          <p
            className="text-sm font-semibold uppercase tracking-[0.18em]"
            style={{ color: content.accent }}
          >
            Mascotte guide
          </p>
          <h2
            className="mt-2 text-2xl font-bold sm:text-[1.75rem]"
            style={{ color: "var(--mascot-navy)" }}
          >
            {content.title}
          </h2>
          <p
            className="mt-2 text-sm leading-6 sm:text-base"
            style={{ color: "var(--mascot-navy)" }}
          >
            {content.message}
          </p>
        </div>
      </div>

      <div
        className="h-2 w-full"
        style={{ backgroundColor: content.accent }}
        aria-hidden="true"
      />
    </aside>
  );
}
