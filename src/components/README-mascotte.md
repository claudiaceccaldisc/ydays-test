# MascotGuide

Composant React autonome pour afficher une mascotte guide selon un etat visuel simple.

## Mood disponibles

- `welcome`
- `question`
- `success`
- `warning`
- `tip`
- `finish`
- `confidentiality`
- `guide`
- `reflection`

## Exemple

```tsx
import MascotGuide from "./MascotGuide";

<MascotGuide mood="welcome" />;
<MascotGuide mood="guide" />;
<MascotGuide mood="confidentiality" />;
<MascotGuide mood="reflection" />;
```

## Images attendues

Le composant charge ses visuels depuis `public/assets/mascot/` avec les noms suivants :

- `mascotte_welcome.png`
- `mascotte_question.png`
- `mascotte_bonne-réponse.png`
- `mascotte_mauvaise-réponse.png`
- `mascotte_astuce.png`
- `mascotte_fin.png`
- `mascotte_confidentialité.png`
- `mascotte_guide.png`
- `mascotte_réflexion.png`

Image par defaut ou fallback eventuel :

- `mascotte_principale.png`
