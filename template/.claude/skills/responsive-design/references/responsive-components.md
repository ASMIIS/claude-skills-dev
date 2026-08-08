# Composants responsive — images, formulaires

## Images et médias

Vérifier : aspect ratio, dimensions, `object-fit`, résolution adaptée à l'écran, stratégie de
chargement, images trop grandes pour mobile, vidéos, iframes. Éviter les dimensions fixes
susceptibles de casser le layout sur petit écran.

## Formulaires responsive

Vérifier : largeur des inputs, labels, clavier mobile déclenché, types d'input, boutons,
validation, messages d'erreur, champs obligatoires, espacement, ordre des champs.

Utiliser les types HTML adaptés pour que le clavier mobile propose l'interaction pertinente :

```html
<input type="email">
<input type="tel">
<input type="number">
<input type="date">
```

Voir aussi Skill `ui-ux` → `references/forms.md` pour les règles générales de formulaire
(validation serveur, prévention de double soumission, conservation des données saisies).

## Modales — voir `responsive-layout.md`

Le traitement des modales et overlays sur mobile est détaillé dans
`responsive-layout.md` (bottom sheet, plein écran, page dédiée selon le contexte).
