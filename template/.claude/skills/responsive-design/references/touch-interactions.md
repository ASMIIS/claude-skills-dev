# Interactions tactiles

Sur mobile, les interactions sont tactiles — vérifier systématiquement :

- **Taille des zones cliquables** — boutons, liens, checkbox, radio, select, dropdown, menus,
  sliders : zone tactile suffisamment confortable (recommandation ~44px), pas seulement le
  visuel de l'élément
- **Espacement entre actions** — éviter les éléments interactifs trop rapprochés qui provoquent
  des clics accidentels
- **Drag & drop** — s'assurer qu'une alternative tactile existe si la fonctionnalité est
  importante, le drag & drop pur souris étant peu fiable au doigt

## Ne jamais dépendre exclusivement de

`hover`, `right click`, `mouse movement` pour accéder à une fonctionnalité importante — ces
interactions n'existent pas ou sont peu fiables sur mobile. Toute fonctionnalité importante doit
avoir un équivalent tactile explicite (tap, long press documenté, bouton visible).

## Méthode

Pour tout composant interactif créé ou modifié, vérifier sa zone tactile réelle et son
comportement sans souris avant de considérer le travail terminé.
