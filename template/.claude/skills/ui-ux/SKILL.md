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
   - `references/ui-rules.md` — règles UI mesurables (tokens, espacement, typo, contraste, états,
     mouvement, micro-copie, thème sombre) — valeurs par défaut quand la DA est `UNKNOWN`
   - `references/ux-principles.md` — grille de revue UX (heuristiques, lois, parcours, dark patterns)
4. Implémenter en réutilisant la DA et les composants identifiés.
5. Si la DA existante est incohérente ou incomplète sur le point concerné : le signaler et
   proposer une standardisation plutôt que d'en inventer une silencieusement (voir CLAUDE.md §4
   pour les changements nécessitant confirmation si la standardisation est large).

## Règles non négociables (rappel court)

- Tokens du design system, jamais de valeur de couleur/espacement/z-index en dur.
- Tous les états interactifs couverts (focus-visible, disabled, loading, error, empty).
- Contraste AA, couleur jamais seule porteuse de sens, cibles tactiles ≥ 44 px.
- Un seul CTA primaire par zone ; libellés d'action explicites ; aucun dark pattern.
- Mobile first (Skill `responsive-design`) ; `prefers-reduced-motion` et `prefers-color-scheme` respectés.
- Page publique indexable : titres sémantiques, contenu dans le HTML, CLS maîtrisé (Skill `seo`).
- Formulaire d'auth/sensible : conforme à Skill `security` (messages génériques, `autocomplete`).

## Règle absolue

Ne jamais imposer une préférence esthétique personnelle comme règle. Priorité constante :
DA documentée du projet → composants existants → patterns existants → bonnes pratiques UI/UX
générales → nouveau pattern uniquement si réellement nécessaire.

## Après implémentation

Enchaîner sur les Skills habituels : `testing` (y compris visuel/E2E si le projet en dispose),
`code-review`, et `documentation` — mettre à jour `frontend/docs/design-system/README.md` si un
nouveau composant/pattern durable a été introduit.
