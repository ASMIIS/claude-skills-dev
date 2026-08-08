# Layout responsive et overflow

## Points à vérifier

Largeur des containers, `max-width`, padding, margins, grids, flexbox, colonnes, gaps, overflow,
`position: fixed`, `position: sticky`, éléments absolus, headers, footers, sidebars, modales.

Éviter les layouts basés sur des tailles fixes lorsque le contenu doit être responsive. Attention
particulière à des valeurs comme `width: 500px; height: 800px;` qui provoquent un débordement sur
petit écran. Préférer, lorsque pertinent : `width: 100%`, `max-width: ...`, `min-width: 0`, ou les
équivalents du framework CSS utilisé par le projet.

## Overflow horizontal

Rechercher systématiquement la cause d'un scroll horizontal involontaire plutôt que de le
masquer. Sources fréquentes : images, tableaux, textes longs sans césure, boutons, inputs,
composants flex/grid mal contraints, éléments `fixed`, modales, menus, blocs de code, cartes,
composants tiers.

`overflow-x: hidden` ne doit **pas** être utilisé comme solution par défaut — c'est un
symptôme masqué, pas une correction. Identifier et corriger l'élément qui déborde réellement.

## Modales et overlays

Une modale desktop ne doit pas être simplement réduite sur mobile. Vérifier : hauteur, largeur,
scroll interne, mécanisme de fermeture, disposition des boutons, gestion du clavier virtuel,
gestion du focus, contenu long, safe areas. Sur mobile, une modale peut être transformée en bottom
sheet, vue plein écran, ou page dédiée si cela améliore réellement l'expérience — pas
systématiquement.

## Tables

Ne pas laisser un tableau déborder horizontalement sans réflexion, et ne jamais supprimer
silencieusement des données pour le faire rentrer. Choisir selon le contexte : scroll horizontal
contrôlé, représentation en cartes, priorisation des colonnes affichées, tableau responsive
(colonnes qui passent en lignes), expansion de détails. Choisir la solution qui conserve le mieux
l'information et l'utilisabilité.
