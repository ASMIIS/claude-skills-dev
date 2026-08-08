---
name: accessibility
description: Vérifier l'accessibilité technique du frontend — WCAG, HTML sémantique, ARIA, navigation clavier, gestion du focus, lecteurs d'écran, contraste, mouvement, formulaires et leurs erreurs de validation, noms et états accessibles, zones tactiles. Utiliser ce Skill sur toute tâche touchant le frontend, en complément du Skill ui-ux (qualité UX) et du Skill legal-compliance (obligations légales) — les trois sont distincts et ne se substituent jamais l'un à l'autre.
---

# Accessibility

## Périmètre — distinct de ui-ux et legal-compliance

Trois Skills traitent de sujets proches sur le frontend mais avec des responsabilités différentes :

```
ui-ux            → qualité UX (cohérence, hiérarchie visuelle, feedback...)
accessibility    → accessibilité technique (ce Skill)
legal-compliance → obligations légales, y compris une éventuelle obligation légale d'accessibilité
```

**Une conformité légale n'est jamais une garantie d'accessibilité complète**, et une interface
jugée "accessible" par ce Skill ne dispense pas de vérifier si une obligation légale s'applique
(Skill `legal-compliance` → `references/accessibility.md`). Les trois peuvent partager leurs
constats sans se substituer l'un à l'autre.

## Ce qu'il faut vérifier

- **HTML sémantique** — utiliser les éléments natifs porteurs de sens (`button`, `nav`, `main`,
  `header`, `footer`, listes) plutôt que des `div`/`span` génériques avec du style seul.
- **ARIA** — utilisé uniquement quand la sémantique native ne suffit pas ; jamais en contradiction
  avec le rôle natif de l'élément.
- **Navigation clavier** — tout élément interactif atteignable et actionnable au clavier (Tab,
  Shift+Tab, Entrée, Espace, Échap pour fermer une modale).
- **Gestion du focus** — focus visible et jamais supprimé sans remplacement, focus déplacé
  logiquement lors de l'ouverture/fermeture d'une modale ou d'un changement de vue important,
  focus trap correct dans une modale.
- **Lecteurs d'écran** — contenu annoncé de façon cohérente (texte alternatif pertinent, régions
  `aria-live` pour le contenu dynamique important, labels associés aux champs).
- **Contraste** — ratio suffisant texte/fond (référence WCAG AA : 4.5:1 texte courant, 3:1 texte
  large), y compris sur les états (hover, focus, disabled) et pas seulement l'état par défaut.
- **Mouvement** — respect de `prefers-reduced-motion` pour les animations non essentielles.
- **Formulaires et erreurs de validation** — labels explicites, erreurs associées au champ
  concerné (`aria-describedby`), annoncées si dynamiques (`aria-live`), pas seulement une couleur
  pour indiquer une erreur.
- **Noms et états accessibles** — un bouton icône seul a un nom accessible (`aria-label` ou
  équivalent) ; les états (`aria-expanded`, `aria-selected`, `aria-checked`...) reflètent l'état
  réel du composant.
- **Zones tactiles** — taille suffisante des cibles interactives (voir aussi Skill
  `responsive-design` → `references/touch-interactions.md`).
- **Navigation et responsive accessibility** — la structure de navigation reste utilisable au
  clavier et au lecteur d'écran à toutes les tailles d'écran (croiser avec `responsive-design`).

## Méthode

1. Identifier si la tâche touche le frontend (voir routing CLAUDE.md §9) — ce Skill ne s'active
   pas pour une tâche backend sans impact frontend.
2. Rechercher les composants/patterns d'accessibilité déjà en place (Skill `project-analysis`) et
   les réutiliser plutôt que d'improviser une nouvelle approche pour chaque composant.
3. Dérouler la checklist pertinente pour le composant/la page concernée — pas l'intégralité pour
   chaque modification mineure.
4. Croiser avec `ui-ux` (cohérence des patterns) et `responsive-design` (accessibilité mobile) sans
   dupliquer leur contenu détaillé.
5. Documenter le niveau visé et les constats significatifs dans
   `docs/development/accessibility.md`.

## Références détaillées

- `references/wcag-and-semantics.md` — niveau WCAG visé, structure sémantique, ARIA
- `references/keyboard-and-focus.md` — navigation clavier, gestion du focus, focus trap
- `references/forms-and-errors.md` — formulaires, validation, erreurs accessibles
- `references/screen-readers-and-contrast.md` — lecteurs d'écran, contraste, mouvement
