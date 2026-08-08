# Politique de confidentialité — cohérence documentation / code

Vérifier l'existence et la cohérence d'une politique de confidentialité lorsque nécessaire pour
le projet. Elle doit être cohérente avec les traitements **réellement effectués** par le code —
pas seulement plausible en théorie.

## Méthode — recherche de divergences

Comparer systématiquement la politique de confidentialité déclarée avec le comportement réel :
backend (quelles données sont stockées), base de données (quels champs existent), analytics
(quels événements sont trackés), cookies (quels traceurs sont posés), services tiers (quelles
données leur sont transmises).

Exemple de divergence à signaler immédiatement : la politique indique "aucune donnée de
localisation collectée" alors que le code utilise `navigator.geolocation` — ou qu'un SDK tiers
intégré la collecte implicitement.

## Sortie attendue

Pour chaque divergence trouvée : citer la déclaration de la politique, citer l'élément du code
qui la contredit (fichier concerné), et classer selon l'échelle du Skill (`PARTIELLEMENT
CONFORME`, `NON CONFORME`, etc.) — ne pas se contenter de signaler l'existence d'un écart sans le
documenter précisément.

## Documentation associée

Si le projet a besoin d'une politique de confidentialité documentée dans le repo (pas seulement
publiée sur le site), utiliser `docs/compliance/privacy.md`.
