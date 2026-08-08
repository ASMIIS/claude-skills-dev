---
name: ui-ux
description: Appliquer les règles de Direction Artistique (DA) et de bonnes pratiques UI/UX du projet lors de toute création ou modification d'interface frontend. Utiliser ce Skill systématiquement dans /add-feature, /modify-feature et /fix-feature dès que la tâche touche le frontend (page, composant, formulaire, navigation), et comme cœur de /review-ui. Empêche Claude Code de créer des interfaces incohérentes d'une feature à l'autre en imposant la réutilisation de la DA et des composants déjà existants avant toute création.
---

# UI/UX

## Rôle

Garantir la cohérence visuelle et fonctionnelle du frontend en s'appuyant sur la Direction
Artistique réellement présente dans le projet, documentée dans
`frontend/docs/design-system/README.md`, et sur les bonnes pratiques UI/UX générales détaillées
dans les fichiers `references/` de ce Skill.

## Priorité — ne jamais créer avant d'avoir cherché

```
Composant existant
    ↓
Pattern existant
    ↓
Extension d'un composant existant
    ↓
Nouveau composant (seulement s'il apporte une abstraction réellement utile)
```

Avant de créer une nouvelle interface ou un nouveau composant : rechercher dans le code existant
un composant ou pattern qui répond déjà au besoin. Éviter la duplication de composants
visuellement similaires. Ne créer un nouveau composant que lorsqu'aucune extension raisonnable de
l'existant ne convient.

## Méthode

1. Lire `frontend/docs/design-system/README.md`. S'il n'existe pas ou contient des `UNKNOWN` sur
   les points concernés par la tâche, analyser le code réel (composants, styles, tokens, config
   Tailwind/CSS) avant de continuer — jamais improviser une couleur, une typo ou un espacement.
2. Identifier les composants/patterns existants pertinents pour la tâche.
3. Consulter les fichiers `references/` pertinents pour la tâche en cours :
   - `references/design-system.md` — comment analyser et faire respecter la DA du projet
   - `references/accessibility.md` — renvoie vers le Skill dédié `accessibility` (source de vérité)
   - `references/usability.md` — hiérarchie visuelle, cohérence, feedback, erreurs, empty states
   - `references/responsive.md` — renvoie vers le Skill dédié `responsive-design` (source de vérité)
   - `references/forms.md` — règles spécifiques aux formulaires
   - `references/interaction.md` — états UI, animations
4. Implémenter en réutilisant la DA et les composants identifiés.
5. Si la DA existante est incohérente ou incomplète sur le point concerné : le signaler et
   proposer une standardisation plutôt que d'en inventer une silencieusement (voir CLAUDE.md §4
   pour les changements nécessitant confirmation si la standardisation est large).

## Règle absolue

Ne jamais imposer une préférence esthétique personnelle comme règle. Priorité constante :
DA documentée du projet → composants existants → patterns existants → bonnes pratiques UI/UX
générales → nouveau pattern uniquement si réellement nécessaire.

## Après implémentation

Enchaîner sur les Skills habituels : `testing` (y compris visuel/E2E si le projet en dispose),
`code-review`, et `documentation` — mettre à jour `frontend/docs/design-system/README.md` si un
nouveau composant/pattern durable a été introduit.
