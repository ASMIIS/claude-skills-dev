---
description: Audit de l'observabilité applicative du projet — logs, métriques, traces, correlation IDs, health checks, alertes, error tracking, données sensibles — et complète ce qui manque en conservant l'existant fonctionnel.
---

Périmètre (optionnel, sinon projet entier) : $ARGUMENTS

Applique le Skill `production-logging` (logs et observabilité au sens large). Priorité constante :

```
Conserver l'existant → Améliorer → Compléter → Remplacer uniquement si nécessaire
```

Ne jamais multiplier les outils : avant de proposer un nouvel outil d'observabilité, vérifier ce
que la plateforme de production fournit déjà (Skill `production-readiness`).

## Workflow

1. **Détecter le système de logs existant** — logger utilisé, configuration, où il est appelé
   dans le code.
2. **Vérifier sa configuration** par environnement (`docs/operations/environments.md` si présent).
3. **Vérifier les niveaux** utilisés — cohérence avec `references/log-levels.md`, absence d'abus
   d'un niveau unique ou de `console.log` brut pour du critique.
4. **Vérifier les logs structurés** — format actuel, cohérence des champs
   (`references/structured-logging.md`).
5. **Rechercher les secrets dans les logs** — grep ciblé sur les usages du logger, recherche des
   patterns sensibles (mots de passe, tokens, clés) éventuellement loggés
   (`references/security.md`).
6. **Vérifier les données personnelles** loggées inutilement — croiser avec le Skill
   `legal-compliance` si des données personnelles apparaissent dans les logs.
7. **Vérifier les logs d'erreur** — contiennent-ils assez de contexte pour diagnostiquer
   (quoi/où/quand/quelle requête) sans exposer de détail sensible.
8. **Vérifier les correlation IDs** lorsque pertinents pour l'architecture
   (`references/correlation.md`).
9. **Vérifier métriques et traces** — ce qui est déjà collecté, ce qui manque réellement
   (`references/metrics-and-traces.md`).
10. **Vérifier health checks, error tracking et alertes** — présence, pertinence des seuils,
    absence de bruit excessif (`references/health-checks-and-alerts.md`).
11. **Vérifier la configuration production** — niveaux actifs, rotation, rétention
    (`references/production.md`).
12. **Construire les éléments manquants** lorsque c'est réellement nécessaire — pas
    systématiquement une infrastructure complète, seulement ce qui manque et à l'échelle du
    projet (CLAUDE.md §19).
13. **Tester** le système modifié (logs/métriques générés effectivement, format correct).
14. **Documenter** le résultat dans `docs/operations/observability.md`.

## Rapport

```
# Observability Audit

## Summary
## Existing system detected (logs / metrics / traces / alerts)
## CRITICAL (ex: secret loggé)
## HIGH
## MEDIUM
## LOW
## INFO
## Changes made
## Remaining recommendations
```

Ne pas remplacer un système fonctionnel sans raison justifiée dans le rapport.
