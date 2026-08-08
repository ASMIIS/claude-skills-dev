---
description: Audit et correction du comportement responsive du frontend (mobile, tablette, desktop) — focus exclusif responsive, contrairement à /review-ui qui couvre tout le frontend.
---

Périmètre (optionnel, sinon frontend entier) : $ARGUMENTS

Applique le Skill `responsive-design` (et ses `references/`) en suivant ces étapes :

1. **Inventorier** les pages et composants concernés par le périmètre.
2. **Identifier les composants** partagés impliqués, pour corriger au niveau composant plutôt que
   page par page (voir Skill `ui-ux` → `references/design-system.md`).
3. **Analyser les breakpoints** réellement définis par le projet (`frontend/docs/design-system/README.md`
   ou config Tailwind/Bootstrap/Material UI/Chakra/CSS custom) — ne pas en inventer de nouveaux.
4. **Analyser le comportement mobile** — priorisation du contenu, navigation (`references/mobile.md`).
5. **Rechercher les overflow** horizontaux et layouts cassés (`references/responsive-layout.md`).
6. **Analyser les interactions tactiles** — zones cliquables, dépendance au hover
   (`references/touch-interactions.md`).
7. **Vérifier les formulaires** — types d'input, clavier mobile (`references/responsive-components.md`).
8. **Vérifier les tableaux** — stratégie responsive choisie, pas de perte de données silencieuse.
9. **Vérifier les modales** — comportement adapté au mobile (bottom sheet, plein écran, etc.).
10. **Vérifier la navigation** — utilisabilité complète sur téléphone.
11. **Vérifier l'accessibilité mobile** — zoom jamais désactivé, tailles tactiles, lisibilité
    (Skill `ui-ux` → `references/accessibility.md`).
12. **Vérifier les performances pertinentes** — bundles, images, animations coûteuses,
    `prefers-reduced-motion`.
13. **Corriger** les problèmes identifiés, en respectant la priorité de correction du Skill
    `responsive-design` (fonctionnalité cassée → contenu inaccessible → accessibilité →
    navigation → overflow/layout → interaction tactile → lisibilité → design system →
    performance → détails esthétiques). Corriger le composant partagé plutôt que chaque page.
14. **Tester** aux largeurs de contrôle 320, 375, 390, 414, 768, 1024, 1280, 1440px+ — utiliser
    les outils de navigateur/screenshot disponibles plutôt que de supposer.
15. **Produire un rapport** :

```
# Responsive Review

## Summary
## Critical issues
## High priority
## Medium priority
## Low priority
## Breakpoints checked
## Components improved
## Files modified
## Remaining TODO/FIXME
## Tests executed
## Remaining risks
```

Ne pas créer artificiellement un TODO pour chaque problème corrigé (voir
`docs/development/todo-conventions.md`) — uniquement pour ce qui est réellement laissé en attente.

Après correction : exécuter le Skill `testing` (lint, typecheck, build, tests E2E si multi-
viewport disponibles) avant de considérer la tâche terminée.
