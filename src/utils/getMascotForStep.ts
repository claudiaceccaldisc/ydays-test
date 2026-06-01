import type { MascotMood } from "../data/mascotGuide";
import { mascotUsage, type MascotUsageStep } from "../data/mascotUsage";

export function getMascotForStep(step?: MascotUsageStep): MascotMood {
  if (!step) {
    return "welcome";
  }

  return mascotUsage[step];
}
