# Usabilité — hiérarchie, cohérence, feedback, erreurs, empty states

## Hiérarchie visuelle

Vérifier : hiérarchie claire, titres/sous-titres cohérents, contraste suffisant, densité
d'information raisonnable, distinction nette entre contenu principal et secondaire, CTA
clairement identifiable.

## Cohérence

Les mêmes actions doivent utiliser les mêmes patterns dans tout le frontend. Éviter par exemple
qu'une même action métier (ex: "valider") soit un bouton bleu rempli sur une page, un bouton
texte sur une autre, un bouton vert sur une troisième — sans justification. Toujours réutiliser
le composant/pattern existant pour une action équivalente.

## Erreurs

Les erreurs doivent être compréhensibles par l'utilisateur final. Éviter d'afficher directement
`Error 500` ou `Something went wrong` lorsqu'un message plus pertinent et actionnable est
possible (que s'est-il passé, que peut faire l'utilisateur maintenant).

## Empty states

Prévoir un état vide pertinent pour toute liste/page pouvant être vide. Un écran vide sans
explication ni action ne doit jamais donner l'impression que l'application est cassée.

## Feedback utilisateur

Toute action importante doit fournir un feedback approprié : succès, erreur, chargement,
confirmation avant une action destructive. Ne pas laisser l'utilisateur dans l'incertitude après
une action déclenchée.

## Loading

Éviter les interfaces qui semblent figées pendant une requête. Utiliser un pattern adapté au
contexte : skeleton pour du contenu structuré, spinner pour une action ponctuelle, barre de
progression pour un processus mesurable.

## Méthode

Pour toute page ou composant créé/modifié impliquant une interaction utilisateur, vérifier
explicitement chacun des points ci-dessus pertinents pour le contexte — ne pas se limiter au
happy path.
