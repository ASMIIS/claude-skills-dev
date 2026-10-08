---
name: responsive-design
description: Rendre et vérifier qu'une interface frontend fonctionne correctement sur mobile, tablette, desktop et large desktop — approche mobile first, pas une réduction d'une interface desktop. Utiliser ce Skill systématiquement lors de la création ou modification de toute interface, en cas de problème signalé sur mobile, et comme dépendance obligatoire de /review-ui et /review-responsive. Le mobile est une cible prioritaire, pas secondaire.
---

# Responsive Design

## Principe — mobile first

Le responsive n'est pas une réduction d'une interface desktop existante. C'est une conception qui
part du contenu et de ses priorités, puis construit le layout mobile en premier, avant de
l'étendre à tablette puis desktop :

```
Contenu → Priorités → Mobile layout → Tablet layout → Desktop layout
```

Ne jamais simplement réduire les dimensions d'une interface desktop pour "faire du responsive".

## Breakpoints

Utiliser les breakpoints réellement définis par le projet (voir
`frontend/docs/design-system/README.md` → Breakpoints, ou la config Tailwind/Bootstrap/Material
UI/Chakra/CSS custom en place). Ne jamais inventer de nouveaux breakpoints sans raison — respecter
les conventions déjà établies.

Tailles minimales à couvrir, quels que soient les breakpoints exacts du projet : Mobile, Tablet,
Desktop, Large Desktop.

## Priorisation du contenu mobile

Avant d'adapter une interface, identifier explicitement : information essentielle, action
principale, actions secondaires, information optionnelle, navigation. Adapter la structure en
conséquence plutôt que de conserver artificiellement une disposition desktop (ex: ne pas garder
trois colonnes côte à côte sur téléphone — repenser en header / contenu principal / action
principale / contenu secondaire).

## Priorité de correction

Quand une interface présente plusieurs problèmes responsive, corriger dans cet ordre :

```
1. Fonctionnalité cassée
2. Contenu inaccessible
3. Accessibilité
4. Navigation
5. Overflow / layout cassé
6. Interaction tactile
7. Lisibilité
8. Cohérence avec le Design System
9. Performance
10. Détails esthétiques
```

Ne pas passer du temps sur un détail visuel si un utilisateur mobile ne peut pas utiliser
l'action principale de la page.

## Composant avant page

Avant de corriger une page, rechercher si le problème vient d'un composant partagé. Corriger le
composant plutôt que d'empiler des ajustements différents page par page (ex: éviter
`margin-top: 17px` sur une page, `23px` sur une autre pour compenser le même problème) — voir
Skill `ui-ux` → `references/design-system.md` pour la logique de correction au niveau composant.

## Références détaillées

Consulter selon la nature de la tâche :

- `references/mobile.md` — priorisation du contenu, navigation mobile, safe areas, orientation
- `references/responsive-layout.md` — containers, grids/flexbox, overflow horizontal
- `references/touch-interactions.md` — zones tactiles, alternatives au hover
- `references/responsive-typography.md` — lisibilité du texte à toutes les tailles
- `references/responsive-components.md` — images, tables, formulaires, modales responsive
- `references/css-rules.md` — règles CSS/HTML d'implémentation : viewport, breakpoints par défaut,
  grilles fluides, `clamp()`, `dvh`, container queries, hover/pointer, médias, matrice de contrôle

## Règles non négociables (rappel court)

- Mobile first : styles de base = mobile, extension par `min-width`.
- Aucun scroll horizontal à 320 px ; `overflow-x: hidden` n'est pas une correction.
- Pas de largeur/hauteur fixe sur du contenu ; `dvh` plutôt que `vh` ; texte en `rem`/`clamp()`.
- Cibles tactiles ≥ 44 px, `hover` jamais indispensable, inputs ≥ 16 px.
- Images avec dimensions déclarées, `srcset`, lazy-loading hors écran initial.
- Contenu mobile = contenu desktop (indexation mobile-first, voir Skill `seo`).
- Vérification sur la matrice 320 → ≥ 1440 px avec captures réelles.

## Accessibilité mobile

Appliquer les règles du Skill `ui-ux` → `references/accessibility.md`, avec une attention
particulière à : zoom utilisateur jamais désactivé (`user-scalable=no` interdit sans
justification exceptionnelle documentée), reflow du contenu, taille des éléments interactifs,
lisibilité à toutes les tailles.

## Performance mobile

Le responsive ne se limite pas au CSS. Vérifier aussi : taille des bundles chargés, images
adaptées à la taille d'écran, lazy loading, nombre de requêtes, coût des animations sur appareils
moins puissants, respect de `prefers-reduced-motion` (voir Skill `ui-ux` →
`references/interaction.md`).

## Tests

Après toute modification responsive, vérifier au minimum les largeurs suivantes (points de
contrôle, pas des breakpoints obligatoires) : 320, 375, 390, 414, 768, 1024, 1280, 1440px et plus.
Utiliser les outils de navigateur/screenshot disponibles pour vérifier concrètement plutôt que de
supposer. Rechercher spécifiquement : scroll horizontal, contenu tronqué, éléments superposés,
boutons inaccessibles, navigation cassée, texte illisible, formulaires cassés, modales cassées,
tableaux cassés.

## Règle finale

Une interface frontend est incomplète si : elle ne fonctionne que sur desktop, son contenu
déborde sur mobile, ses interactions principales nécessitent un hover, ses éléments tactiles sont
difficiles à utiliser, sa navigation est inutilisable sur téléphone, ses formulaires sont
difficiles à remplir, ses modales sont cassées, des informations importantes sont inaccessibles,
elle viole significativement le design system, ou elle présente des problèmes d'accessibilité
évitables. Le responsive fait partie de la conception et de l'implémentation de la feature — ce
n'est pas une étape cosmétique ajoutée à la fin.
