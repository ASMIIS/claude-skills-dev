# Navigation clavier et gestion du focus

## Navigation clavier

Tout élément interactif doit être atteignable via `Tab`/`Shift+Tab` dans un ordre logique
(généralement l'ordre visuel/DOM), actionnable via `Entrée` et/ou `Espace` selon son rôle, et une
modale ou un menu doit être fermable via `Échap`. Un élément rendu interactif via JavaScript sur
un conteneur non nativement focusable (`div`, `span`) nécessite `tabindex="0"` et la gestion
explicite des touches clavier correspondant à son rôle ARIA.

## Focus visible

Ne jamais supprimer l'indicateur de focus (`outline: none`) sans le remplacer par un style de
focus au moins aussi visible — un focus invisible rend la navigation clavier inutilisable même
si elle est techniquement possible.

## Gestion du focus lors des changements de vue

- À l'ouverture d'une modale : déplacer le focus à l'intérieur (généralement sur le premier
  élément interactif ou le titre), et le restituer à l'élément déclencheur à la fermeture.
- Dans une modale : piéger le focus à l'intérieur (`Tab` ne doit pas en sortir) tant qu'elle est
  ouverte.
- Lors d'une navigation qui change significativement le contenu principal (SPA) : déplacer le
  focus vers le nouveau contenu ou son titre plutôt que de le laisser sur un élément disparu.

## Vérification

Pour tout composant interactif nouveau ou modifié, vérifier concrètement (pas seulement en
théorie) qu'il est utilisable entièrement au clavier avant de considérer la tâche terminée.
