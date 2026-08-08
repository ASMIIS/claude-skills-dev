# Workflow — Git, Review, Release

> Pratiques réelles de l'équipe. Ne jamais imposer une méthodologie (ex: GitFlow) que le projet
> n'utilise pas déjà — documenter ce qui est réellement pratiqué, déterminé via `/init-context`.

## Branches

<!-- Convention de nommage, branche principale, branches de feature/fix, durée de vie. -->

## Commits

<!-- Convention utilisée (Conventional Commits, format libre...), langue, granularité attendue. -->

## Pull Requests / Code Review

<!-- Nombre de reviewers requis, règles de merge (squash/merge/rebase), CI obligatoire avant merge. -->

## Ce que la review doit vérifier

Correctness, sécurité, maintenabilité, lisibilité, performance, tests, architecture, gestion des
erreurs, observabilité, documentation, compatibilité ascendante — pas uniquement le style.

## Release / Versioning

<!-- Stratégie de versioning (semver ou autre), fréquence, changelog. -->

## Hotfix

<!-- Procédure en cas de bug critique en production. -->

## Rollback

<!-- Comment revenir en arrière en cas de problème après déploiement. -->

## Gestion du changement

Pour toute modification significative, documenter (dans la PR, un ADR, ou la fiche feature) :
pourquoi, quoi, impact, risques, tests, rollback éventuel.

Le niveau de validation doit être proportionné au risque : un changement cosmétique frontend et
une migration destructive de base de données ne suivent pas le même niveau d'exigence (voir
`docs/development/testing.md` et Skill `security`).
