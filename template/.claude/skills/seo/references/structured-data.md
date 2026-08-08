# Structured Data

Utiliser le format adapté au contenu réel (schema.org via JSON-LD généralement recommandé) pour
les types pertinents au projet : produit (prix, disponibilité, avis réels), article (auteur, date
de publication), organisation, FAQ, breadcrumb, événement.

## Règle absolue

Les données structurées doivent refléter le contenu **réellement visible** par l'utilisateur sur
la page. Ne jamais déclarer une note, un nombre d'avis, un prix ou une disponibilité qui ne
correspond pas à la réalité affichée — c'est une pratique trompeuse pouvant entraîner une
pénalité, en plus d'être malhonnête envers l'utilisateur.

## Validation

Vérifier que le balisage structuré est syntaxiquement valide et correspond au schéma attendu pour
le type utilisé — un balisage structuré invalide est simplement ignoré, mais peut aussi induire en
erreur si mal formé.
