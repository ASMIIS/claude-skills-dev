# Risques de la chaîne de dépendances (supply chain)

## Dépendances transitives

Une dépendance directe peu risquée peut introduire des dépendances transitives nombreuses et peu
visibles. Pour un ajout structurant, avoir conscience de l'ampleur de l'arbre de dépendances
introduit (nombre de packages, mainteneurs multiples) plutôt que de ne considérer que le package
de premier niveau.

## Dépendances abandonnées

Une dépendance critique sans mise à jour depuis longtemps est un risque : vulnérabilités non
corrigées, incompatibilité future avec l'écosystème (runtime, autres dépendances). Signaler ce
risque lors d'un audit même si aucun problème n'est actif aujourd'hui.

## Verrouillage des versions

Vérifier que le projet utilise un fichier de verrouillage (`package-lock.json`, `yarn.lock`,
`poetry.lock`, équivalent) pour garantir des builds reproductibles — ne pas laisser les versions
flotter de façon incontrôlée en production.

## Provenance

Pour une dépendance peu connue ajoutée pour un besoin sensible (crypto, auth, parsing de données
non fiables), vérifier la réputation du mainteneur et l'activité du dépôt source plutôt que de se
fier uniquement à la description du package.
