# Migrations

## Méthode

1. Utiliser l'outil de migration déjà en place dans le projet (ne pas en introduire un nouveau
   sans raison forte — voir Skill `dependencies` si un nouvel outil semble nécessaire).
2. Écrire une migration réversible quand c'est possible (méthode `up`/`down` ou équivalent).
3. Pour une colonne nouvelle sur une table déjà peuplée : prévoir une valeur par défaut, une
   nullabilité temporaire, ou une migration de données explicite plutôt qu'une contrainte stricte
   appliquée directement sur des lignes existantes non conformes.
4. Vérifier l'ordre d'application par rapport aux autres migrations en attente (conflits de
   branches, migrations concurrentes).
5. Pour les changements structurants : envisager une séquence en plusieurs étapes déployées
   séparément (ex: ajouter la colonne → backfill → rendre obligatoire → supprimer l'ancienne
   colonne) plutôt qu'un unique gros changement risqué.

## Ordre de déploiement

Réfléchir explicitement à l'ordre entre déploiement du code et exécution de la migration : le
code doit-il être compatible avec l'ancien ET le nouveau schéma pendant la fenêtre de migration
(déploiement progressif, plusieurs instances) ? Documenter l'hypothèse si le projet ne fait pas de
déploiement atomique.

## Seeds

Si le projet utilise des seeds (données de démonstration/test), vérifier qu'ils restent
cohérents avec le schéma après une migration — un seed non mis à jour casse silencieusement les
environnements de développement.
