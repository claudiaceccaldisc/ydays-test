export const STEPS = [
  { key: "introduction", path: "/", step: 1, label: "Introduction" },
  { key: "situation", path: "/situation", step: 2, label: "Mise en situation" },
  { key: "quiz", path: "/quiz", step: 3, label: "Quiz" },
  { key: "action", path: "/action", step: 4, label: "L'IA en action" },
  { key: "resume", path: "/resume", step: 5, label: "Résumé" },
];

export const TOTAL_STEPS = STEPS.length;

export function getStep(key) {
  return STEPS.find((s) => s.key === key);
}

export function getStepByPath(pathname) {
  return STEPS.find((s) => s.path === pathname) ?? STEPS[0];
}

export function getNextPath(key) {
  const index = STEPS.findIndex((s) => s.key === key);
  return index >= 0 && index < STEPS.length - 1 ? STEPS[index + 1].path : null;
}
