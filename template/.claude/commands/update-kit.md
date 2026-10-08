---
description: Met à jour les Skills et Commands du kit méthodologique (.claude/skills/, .claude/commands/) vers la dernière version publiée, sans jamais toucher CLAUDE.md ni docs/ (contenu spécifique au projet). Lecture du diff avant tout commit — ne commit/push jamais (CLAUDE.md §5).
---

Argument optionnel (ex: `--dry-run` pour prévisualiser sans écrire) : $ARGUMENTS

## 1. Vérifier l'état du dépôt

Exécute `git status` : si des modifications non liées sont en cours (staging non vide, fichiers
modifiés), signale-le à l'utilisateur avant de continuer plutôt que de lancer la mise à jour sur
un arbre de travail déjà sale — une mise à jour ne doit pas se mélanger avec un autre changement
en cours.

## 2. Lancer la mise à jour

Exécute à la racine du projet :

```
npx github:ASMIIS/claude-skills-dev --update
```

(ou `npx github:ASMIIS/claude-skills-dev --update --dry-run` si `--dry-run` est demandé dans
`$ARGUMENTS`, pour prévisualiser sans rien écrire).

Cette commande met à jour uniquement `.claude/skills/` et `.claude/commands/` — fichiers
génériques du kit, non censés être édités dans le projet. Elle ne touche **jamais** `CLAUDE.md`,
`docs/` ni `frontend/docs/` : ce sont des fichiers spécifiques au projet, remplis via
`/init-context`, qui restent sous le contrôle de l'utilisateur.

## 3. Lire et résumer le résultat

Rapporte à l'utilisateur, à partir de la sortie de la commande :
- fichiers ajoutés (nouveaux Skills/Commands) ;
- fichiers mis à jour (Skills/Commands existants modifiés) ;
- nombre de fichiers déjà à jour.

## 4. Vérifier le diff réel

Exécute `git diff --stat -- .claude/skills .claude/commands` puis, si pertinent, `git diff` sur
les fichiers modifiés pour comprendre concrètement ce qui a changé — ne te contente pas du
résumé de l'installeur.

## 5. Signaler les changements de règles pertinents pour `CLAUDE.md`

Si un Skill ou une Command mis à jour introduit une règle, une référence ou une convention qui
devrait se refléter dans le `CLAUDE.md` de ce projet (ex: un nouveau Skill à ajouter à la matrice
de routing §9, une nouvelle commande à documenter en §7) : signale-le explicitement à
l'utilisateur avec la section concernée, mais **ne modifie jamais `CLAUDE.md` automatiquement**
dans cette commande — proposer la modification, laisser l'utilisateur valider (voir CLAUDE.md §4
si le changement est significatif).

## 6. Ne jamais committer automatiquement

Conformément à CLAUDE.md §5, cette commande ne doit **jamais** exécuter `git add`, `git commit`
ni `git push`. Termine en résumant ce qui a changé et laisse l'utilisateur relire puis committer
lui-même.

## Rapport final

```
# Update Kit

## Fichiers ajoutés
## Fichiers mis à jour
## CLAUDE.md — à revoir manuellement (le cas échéant)
## Prochaine étape : relire le diff, puis committer si satisfaisant
```
