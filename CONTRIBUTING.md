# Travailler sur ce dépôt

## Règle de base

`main` est la version distribuée : les installations prennent directement cette branche.
On n'y travaille pas directement : tout passe par une branche courte et une pull request.

## Cycle d'une modification

```bash
git switch main && git pull --ff-only
git switch -c feat/sujet-court
# modifications, puis vérifications
node --check bin/install.js
git commit -m "feat(portee): description"
git push -u origin feat/sujet-court
```

Ouvrir la pull request, attendre la CI, relire, fusionner en « Squash and merge » et supprimer la branche.

## Branches

`<type>/<sujet-court>`, en minuscules avec des tirets. Une branche vit quelques jours au plus.

| Type | Usage |
|---|---|
| `feat/` | nouvelle fonctionnalité |
| `fix/` | correction |
| `chore/` | outillage, dépendances, configuration |
| `docs/` | documentation seule |
| `hotfix/` | correction urgente de la production |

## Commits

[Conventional Commits](https://www.conventionalcommits.org/fr/) : `type(portée): description`, sans point final.
Types : `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `ci`.

## Versions

Un tag par livraison, depuis `main` : `git tag -a v1.0.0 -m "Livraison" && git push origin v1.0.0`.

## Retour en arrière

Annuler par un nouveau commit (`git revert <commit>`) passant par une pull request.

## Interdits

- Pas de `git push --force` sur `main`.
- Aucun secret dans le dépôt.
