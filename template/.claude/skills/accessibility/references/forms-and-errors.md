# Formulaires et erreurs de validation accessibles

## Labels

Chaque champ a un label visible et associé (`<label for>` ou équivalent) — un placeholder seul
n'est pas un label et disparaît à la saisie, ce qui pénalise particulièrement les utilisateurs de
lecteurs d'écran et ceux ayant des troubles de mémoire courte.

## Erreurs de validation

Associer le message d'erreur au champ concerné via `aria-describedby`, annoncer les erreurs
dynamiques via une région `aria-live` appropriée (poli pour ne pas interrompre brutalement),
indiquer l'état invalide via `aria-invalid`. Ne jamais indiquer une erreur uniquement par une
couleur (bordure rouge seule) — toujours doubler avec un texte ou une icône avec alternative
textuelle. Voir aussi Skill `ui-ux` → `references/forms.md` pour les règles UX générales de
formulaire (ce Skill couvre l'accessibilité technique du même sujet, pas la redondance).

## Champs obligatoires et instructions

Indiquer les champs obligatoires de façon perceptible pour un lecteur d'écran (pas seulement un
astérisque visuel sans texte associé). Donner les instructions de format avant la saisie plutôt
que seulement après une erreur, quand c'est pertinent (ex: format de mot de passe attendu).

## Groupes de champs

Utiliser `fieldset`/`legend` pour grouper des champs liés (ex: un groupe de cases à cocher ou de
boutons radio représentant un même choix) afin que le lecteur d'écran annonce le contexte du
groupe.
