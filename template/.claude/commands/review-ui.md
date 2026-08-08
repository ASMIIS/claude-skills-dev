---
description: Audit complet du frontend (toutes pages/composants, pas seulement la dernière feature) avec correction directe des problèmes identifiés, en respectant la DA existante.
---

Périmètre (optionnel, sinon frontend entier) : $ARGUMENTS

Applique le Skill `ui-ux` (et ses `references/`) sur l'ensemble du frontend, en suivant ces
étapes dans l'ordre :

## 1. Inventaire

Identifie : toutes les pages, tous les layouts, les composants principaux et réutilisables, les
routes, les patterns UI récurrents, les systèmes de design existants.

## 2. Comparaison avec la DA

Compare chaque partie du frontend avec `frontend/docs/design-system/README.md` (ou son
emplacement réel dans ce projet). Identifie les écarts sur : typography, colors, spacing,
buttons, inputs, cards, borders, radius, shadows, icons, layouts, responsive, animations.

Si `frontend/docs/design-system/README.md` n'existe pas ou contient des `UNKNOWN` sur les points
audités, analyser le code réel pour les déterminer avant de conclure à un écart.

## 3. Audit UX

Applique `references/usability.md` et `references/accessibility.md` du Skill `ui-ux` : clarté,
cohérence, feedback, prévention des erreurs, visibilité du statut, navigation, découvrabilité,
simplicité, accessibilité.

## 3bis. Audit responsive (dépendance obligatoire)

Applique systématiquement le Skill `responsive-design` (et ses `references/`) sur le périmètre
audité — mobile, tablette, desktop, large desktop. Ne pas traiter le responsive comme un point
parmi d'autres : c'est une dimension obligatoire de `/review-ui`, pas optionnelle. Pour un audit
concentré exclusivement sur le responsive, utiliser `/review-responsive` à la place.

## 4. Audit technique

Vérifie : duplication de composants visuellement similaires, styles incohérents, CSS inutile,
composants trop complexes, mauvais découpage, mauvais usage des composants du design system,
problèmes de performance visibles, problèmes de responsive, erreurs console si accessibles,
problèmes d'accessibilité détectables automatiquement.

## 5. Correction

Contrairement à un simple audit, `/review-ui` corrige directement les problèmes identifiés.

Avant toute correction importante :
1. comprendre le composant concerné ;
2. identifier toutes ses utilisations ;
3. vérifier les effets de bord d'une modification ;
4. vérifier la cohérence avec la DA documentée ;
5. appliquer la correction ;
6. vérifier les autres pages utilisant le composant modifié.

**Priorité aux corrections globales** : corriger le composant partagé (ex: `Button`) plutôt que
chaque page qui l'utilise individuellement — toutes les pages bénéficient alors de la correction
en une seule fois.

Ne jamais imposer arbitrairement une nouvelle DA. Priorité constante : DA documentée du projet →
composants existants → patterns existants → bonnes pratiques UI/UX générales → nouveau pattern
uniquement si nécessaire. Si la DA actuelle contient des incohérences importantes : les
identifier, les documenter, proposer une direction cohérente, puis appliquer les corrections de
manière systématique une fois que l'information est suffisante — sans transformer une préférence
esthétique personnelle en règle absolue.

Toute correction large ou touchant l'architecture des composants partagés à grande échelle doit
suivre la règle de confirmation de CLAUDE.md §4 si elle sort du périmètre évident d'un audit UI.

## 6. Validation

Après les corrections : lancer les tests frontend, le lint, le typecheck, le build, les tests E2E
s'ils existent, vérifier les régressions (Skill `testing`), et vérifier le rendu aux différentes
tailles d'écran quand c'est possible.

## 7. Rapport final

Produire un rapport structuré :

```
# UI Review

## Summary
## Critical issues
## High priority
## Medium priority
## Low priority
## Accessibility
## Responsive
## Design system violations
## UX issues
## Components improved
## Files modified
## Remaining TODO/FIXME
## Tests executed
## Remaining risks
```

Ne pas créer artificiellement un TODO pour chaque problème corrigé — un problème corrigé est
simplement indiqué comme tel dans le rapport (voir `docs/development/todo-conventions.md`). Un
TODO/FIXME n'est créé que pour un problème réellement laissé en attente et pertinent à tracer.

Termine en mettant à jour `frontend/docs/design-system/README.md` si l'audit a fait évoluer ou
clarifié la DA documentée du projet.
