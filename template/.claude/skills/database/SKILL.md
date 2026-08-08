---
name: database
description: Analyser et vérifier toute modification touchant le schéma de base de données, les migrations, les requêtes, les index, les modèles, les relations, les contraintes, les suppressions de données, les seeds ou les transactions. Utiliser ce Skill dès qu'une tâche touche l'une de ces zones — avant de modifier un schéma en production, toujours considérer les données existantes, la compatibilité ascendante et le rollback.
---

# Database

## Avant toute modification

Analyser (Skill `project-analysis`) : schéma actuel, modèles, relations, migrations existantes,
consommateurs des tables/champs concernés, requêtes existantes, index en place, contraintes,
hypothèses faites sur les données déjà présentes en production.

## Migrations

Toute modification de schéma doit considérer : les données existantes (une colonne `NOT NULL`
ajoutée sur une table déjà peuplée nécessite une valeur par défaut ou une migration de données),
la compatibilité ascendante avec le code encore en cours de déploiement, l'ordre des migrations,
le plan de rollback, l'ordre de déploiement (migration avant ou après le déploiement du code selon
le changement), la compatibilité de l'application pendant la fenêtre de migration.

Pour une modification potentiellement destructive — perte de données, suppression de colonne,
suppression de table, resserrement de contrainte, conversion de type avec perte de précision —
une **confirmation explicite est nécessaire** avant application (voir CLAUDE.md §4).

## Performance

Rechercher, lorsque pertinent : requêtes N+1, requêtes inutiles ou redondantes, absence d'index
sur des colonnes fréquemment filtrées/jointes, scans coûteux, pagination incorrecte ou absente,
chargement excessif de données non nécessaires, transactions trop longues bloquant d'autres
opérations. Ne pas ajouter un index ou une optimisation sans comprendre son coût (écriture plus
lente, espace disque, maintenance) — un index inutile n'est pas gratuit.

## Sécurité

Vérifier : accès aux données (permissions au niveau requête, pas seulement applicatif), isolation
entre tenants/utilisateurs si le modèle est multi-tenant, absence d'injection (requêtes
paramétrées, jamais de concaténation de valeur utilisateur dans une requête brute), permissions
réelles du compte de connexion à la base, exposition accidentelle de données sensibles dans une
requête trop permissive (`SELECT *` sur une table contenant des champs sensibles).

## Références détaillées

- `references/migrations.md` — méthode de migration sûre, ordre, rollback
- `references/performance.md` — détection et correction des problèmes de performance
- `references/transactions.md` — cohérence transactionnelle
- `references/data-integrity.md` — contraintes, validations, intégrité référentielle
- `references/rollback.md` — plan de retour en arrière

## Méthode

1. Analyser l'existant avant de modifier.
2. Planifier la migration (voir `references/migrations.md`), avec plan de rollback
   (`references/rollback.md`) pour tout changement à risque.
3. Pour un changement destructif : confirmation explicite avant application.
4. Implémenter, tester (Skill `testing` — inclure un test vérifiant le comportement avec des
   données existantes, pas seulement des données fraîches).
5. Vérifier la sécurité (accès, injection, exposition).
6. Documenter dans `docs/PROJECT_CONTEXT.md` → Database si le schéma change de façon durable, et
   dans la fiche feature concernée (`docs/features/<feature>.md` → Data models).
