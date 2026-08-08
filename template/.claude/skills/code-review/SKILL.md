---
name: code-review
description: Relire une modification ou auditer une feature existante de façon structurée avant de la considérer terminée ou saine. Utiliser ce Skill en fin de /add-feature, /modify-feature, /fix-feature, et comme cœur de /audit-feature. Produit une liste structurée de constats classés par sévérité (CRITICAL, HIGH, MEDIUM, LOW, INFO) plutôt qu'un avis vague.
---

# Code Review

## Objectif

Relire un changement (ou une feature entière, en mode audit) avec un œil critique, comme le
ferait un développeur senior avant d'approuver une pull request — pas seulement vérifier que le
code compile.

## Ce qu'il faut rechercher

- **Bugs** — logique incorrecte, erreurs off-by-one, mauvaise gestion des cas nuls/vides
- **Régressions potentielles** — impact non anticipé sur du code existant (voir CLAUDE.md §18)
- **Code mort** — code non atteint, imports inutilisés, fonctions jamais appelées
- **TODO / FIXME** — présents, vagues, ou anciens sans suite
- **Gestion des erreurs** — erreurs avalées silencieusement, messages peu clairs, pas de fallback
- **Validation** — entrées non validées, validation incohérente avec le reste du projet
- **Performance** — requêtes N+1, boucles inutiles, absence de pagination sur de grandes listes
- **Architecture** — duplication évitable, couplage inutile, non-respect des conventions du projet
- **Tests** — couverture insuffisante des cas listés dans le Skill `testing`
- **Documentation** — `PROJECT_CONTEXT.md` et fiche feature à jour ou non
- **API** — contrat cohérent, versionné si breaking change, documenté côté frontend si applicable
- **Frontend/backend** — cohérence des contrats, gestion des états de chargement/erreur côté UI
- **Sécurité** — dérouler le Skill `security` si ce n'est pas déjà fait

## Échelle de sévérité

| Niveau | Signification |
|---|---|
| **CRITICAL** | Faille de sécurité exploitable, perte de données possible, casse une fonctionnalité en production |
| **HIGH** | Bug impactant fonctionnellement, régression probable, faille de sécurité peu exploitable |
| **MEDIUM** | Mauvaise pratique avec impact réel mais non urgent, dette technique significative |
| **LOW** | Amélioration souhaitable, style, lisibilité, petite optimisation |
| **INFO** | Observation, suggestion, remarque sans action requise |

## Méthode

### Mode "fin de tâche" (dans /add-feature, /modify-feature, /fix-feature)

Relecture ciblée sur le diff produit. Lister les constats trouvés, classés par sévérité. Corriger
immédiatement les CRITICAL et HIGH avant de considérer la tâche terminée. Signaler les MEDIUM/LOW
à l'utilisateur sans forcément les corriger si hors périmètre de la demande.

### Mode "audit" (`/audit-feature`)

Relecture large de toute la feature désignée, pas seulement d'un diff récent. **Ne pas modifier
le code automatiquement pendant un audit**, sauf demande explicite de l'utilisateur — l'audit est
un rapport, pas une correction. Produire un rapport structuré :

```
# Audit — <nom de la feature>

## CRITICAL
- ...

## HIGH
- ...

## MEDIUM
- ...

## LOW
- ...

## INFO
- ...
```

Chaque constat doit être concret : fichier, ligne ou zone concernée, description du problème,
impact, et suggestion de correction (sans l'appliquer).
