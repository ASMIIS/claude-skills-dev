---
name: testing
description: Exécuter et écrire les tests après toute modification de code — tests de régression (ce qui existait avant fonctionne toujours) et tests de la nouvelle fonctionnalité (happy path, erreurs, permissions, edge cases). Utiliser ce Skill systématiquement après avoir modifié du code dans /add-feature, /modify-feature et /fix-feature. Ne jamais prétendre qu'un test a été exécuté ou qu'il passe sans l'avoir réellement lancé.
---

# Testing

## Principe

Une modification n'est jamais considérée comme terminée simplement parce que le code compile.
Deux catégories de tests sont systématiquement requises après toute modification de code.

Ne jamais affirmer qu'un test a été exécuté, ou qu'il passe, sans l'avoir réellement lancé et
sans avoir lu sa sortie réelle. Si l'environnement de test ne peut pas être exécuté (dépendance
manquante, script absent), le dire explicitement plutôt que de simuler un résultat.

## 1. Tests de régression — ce qui existait avant fonctionne toujours

Identifier et exécuter, selon ce qui est disponible dans le projet (voir `docs/PROJECT_CONTEXT.md`
et `[À REMPLIR dans CLAUDE.md §12]` pour les commandes exactes) :

- suite de tests unitaires existante
- tests d'intégration existants
- tests E2E existants, quand pertinents pour la zone modifiée
- lint
- typecheck
- build, si pertinent pour valider que rien n'est cassé

Exécuter en priorité les tests couvrant les fichiers/modules identifiés comme impactés lors de
l'analyse (Skill `project-analysis`), puis la suite complète si le temps/l'échelle du projet le
permet.

## 2. Tests de la nouvelle fonctionnalité

Ajouter les tests nécessaires au nouveau comportement, en couvrant systématiquement ce qui est
pertinent pour la feature :

- **Happy path** — comportement nominal attendu
- **Invalid input** — données manquantes, mal formées, de mauvais type
- **Unauthorized access** — utilisateur non authentifié
- **Forbidden access** — utilisateur authentifié mais sans la permission requise
- **Missing data** — ressource inexistante, relation absente
- **Boundary cases** — valeurs limites, listes vides, très grands volumes
- **Error handling** — comportement en cas d'échec d'une dépendance (réseau, DB, service externe)
- **Concurrency**, quand pertinent — accès concurrents à la même ressource
- **Security cases** — tentative de contournement de permission, injection, accès à une ressource
  d'un autre utilisateur (IDOR)

## 3. Pour une correction de bug (`/fix-feature`)

Toujours écrire un test qui reproduit le bug **avant** de corriger, vérifier qu'il échoue,
corriger, puis vérifier qu'il passe. Ce test reste ensuite dans la suite comme garde-fou de
non-régression.

## Sortie attendue

Après exécution, rapporter clairement :
- ce qui a été exécuté (commande réelle) ;
- le résultat réel (pass/fail, avec le détail des échecs le cas échéant) ;
- les tests ajoutés et ce qu'ils couvrent ;
- toute zone qui n'a pas pu être testée et pourquoi.

Si des tests échouent à cause de la modification, corriger avant de considérer la tâche terminée
— ne jamais désactiver ou supprimer un test existant pour le faire passer sans en comprendre la
cause racine.
