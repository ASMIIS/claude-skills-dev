---
description: Audit lecture seule de l'efficacité de contexte du kit — taille structurelle, duplications, contenu toujours chargé qui pourrait être différé, références jamais utilisées, mauvaise progressive disclosure. Ne modifie rien.
---

Périmètre (optionnel, sinon kit entier) : $ARGUMENTS

**READ ONLY** — cette commande n'édite jamais de fichier. Elle analyse le kit lui-même
(`CLAUDE.md`, `.claude/skills/`, `.claude/commands/`, `docs/`, `frontend/docs/`), pas le code du
projet.

## Ce qu'il faut mesurer

Utiliser des **indicateurs structurels réels** (nombre de fichiers, lignes, mots, caractères via
les outils disponibles) — jamais une consommation de tokens inventée. Toujours désigner ces
chiffres comme une **estimation structurelle** (proxy), jamais comme une "consommation réelle de
tokens" sauf si un tokenizer réel est disponible.

1. **Taille globale** — `CLAUDE.md`, total des `SKILL.md`, total des `references/`, total des
   commandes, total de `docs/`.
2. **Fichiers surdimensionnés** — `CLAUDE.md` ou un `SKILL.md` significativement plus long que les
   autres de sa catégorie, à examiner pour un déplacement de contenu vers `references/`.
3. **Duplications** — rechercher les règles répétées presque à l'identique dans plusieurs fichiers
   (ex: plusieurs formulations proches de "ne jamais logger un secret"). **Ne pas fusionner
   aveuglément** : une répétition courte qui renvoie à une source unique (`voir CLAUDE.md §X`)
   n'est pas un problème — seule une règle recopiée en détail à plusieurs endroits en est un.
4. **Contenu toujours chargé vs différable** — dans `CLAUDE.md`, identifier ce qui pourrait être
   déplacé vers un Skill/référence chargé à la demande sans perte pour l'usage courant.
5. **Références jamais/rarement pertinentes** — un fichier `references/` dont le sujet est très
   spécifique et rarement concerné ; vérifier qu'il est bien chargé à la demande et non
   systématiquement avec son `SKILL.md`.
6. **Progressive disclosure** — pour chaque `SKILL.md`, vérifier qu'il reste orienté décision
   (quand l'activer, responsabilités, workflow, stop conditions, sortie) et que le détail
   théorique est bien dans `references/`, pas mélangé dans le fichier principal.
7. **Documentation manquante pour la navigation** — présence et fraîcheur de `docs/INDEX.md` et
   `docs/CONTEXT_MAP.md` s'ils existent.

## Méthode

Utiliser des commandes de mesure simples (comptage de lignes/mots/caractères, recherche de motifs
textuels) sur les fichiers du kit. Comparer les tailles entre fichiers de même catégorie pour
identifier les écarts significatifs plutôt que de juger dans l'absolu.

## Rapport

```
# Context Efficiency Report

## Global context (CLAUDE.md)
<!-- taille estimée, sections les plus volumineuses -->

## Task context (Skills + references)
<!-- taille cumulée par catégorie, SKILL.md surdimensionnés -->

## Commands
## Documentation

## Duplicated rules found
<!-- avec les fichiers concernés ; préciser si c'est un simple renvoi (OK) ou une vraie duplication -->

## Always-loaded content that could be deferred
## Rarely-used references
## Progressive disclosure issues
## Missing navigation aids (INDEX / CONTEXT_MAP)

## Potential savings
### High
### Medium
### Low

## Note méthodologique
Toutes les tailles ci-dessus sont des estimations structurelles (lignes/mots/caractères), pas une
mesure réelle de tokens consommés.
```

Ordre de préférence pour toute optimisation proposée (ne jamais commencer par la suppression) :
**référencer → différer → résumer → dédupliquer → supprimer uniquement si réellement redondant.**
Ne jamais recommander de retirer une règle de sécurité, de Git Safety, de Stop Condition ou de
Definition of Done pour gagner de la place — signaler plutôt un déplacement vers une référence
chargée à la demande.
