---
description: Vérifie si le projet est réellement prêt pour son environnement de production — jamais un modèle d'infrastructure supposé. Corrige ce qui peut l'être sans risque, signale le reste. Ne déploie jamais réellement sans confirmation explicite.
---

Périmètre (optionnel) : $ARGUMENTS

Si `--plan` est présent : produire l'étape 0 (cible de production) et la liste des vérifications
prévues (étapes 1 à 12 ci-dessous) sans les exécuter, puis **s'arrêter** — aucune modification,
aucune action sur l'infrastructure.

Applique le Skill `production-readiness` (et `production-logging` pour le détail des logs).

## Étape 0 — identifier la cible de production

Avant tout, déterminer où et comment le projet est réellement déployé (voir Skill
`production-readiness` § Étape 1). Ne jamais supposer AWS, Docker, Kubernetes, VPS ou un PaaS par
défaut. Consulter `docs/PROJECT_CONTEXT.md` → Production Topology en premier ; si absente ou
incomplète sur des points critiques, poser les questions nécessaires (qualifier chaque réponse
`KNOWN`/`INFERRED`/`ASSUMED`/`UNKNOWN` — CLAUDE.md §16) avant de continuer.

## Workflow

1. **Identifier la cible de production** (étape 0).
2. **Analyser l'environnement** — ce que la plateforme fournit vs ce que l'application doit gérer
   (`references/paas.md` ou équivalent selon le modèle identifié).
3. **Vérifier la configuration** — build, runtime, variables d'environnement
   (`references/deployment-rollback.md`).
4. **Vérifier les secrets** — mécanisme utilisé, absence de valeur committée, `.env.example` à
   jour (`references/secrets.md`).
5. **Vérifier la base de données** — type, connexion, SSL/TLS, migrations, backups, restauration
   (`references/persistent-storage.md`, Skill `database`).
6. **Vérifier le déploiement** — stratégie, health checks, ordre de migration
   (`references/deployment-rollback.md`).
7. **Vérifier les logs** — Skill `production-logging` (structure, niveaux, absence de secrets,
   correlation ID).
8. **Vérifier le monitoring** — ce qui est fourni par la plateforme vs à compléter
   (`references/observability.md`).
9. **Vérifier les backups** — existence, fréquence, restauration testée ou non.
10. **Vérifier le rollback** — mécanisme réellement disponible, compatibilité avec les migrations
    de base de données (`references/deployment-rollback.md`).
11. **Vérifier la sécurité** — Skill `security` (HTTPS/HSTS, exposition réseau, secrets, CORS) et
    section D de `references/verification-checklist.md` : en-têtes réels derrière le CDN/proxy, IP
    cliente fiable, store de rate limiting partagé, flags des cookies de session dans la réponse réelle.
12. **Vérifier les tests** — Skill `testing`, état de la suite avant tout déploiement.
13. **Corriger ce qui peut l'être sans risque** — uniquement les changements réversibles et non
    destructifs (ex: compléter `.env.example`, corriger une variable mal documentée). Toute
    correction touchant une donnée de production réelle, un secret, ou l'infrastructure elle-même
    nécessite une confirmation explicite (CLAUDE.md §4) avant application.
14. **Produire le rapport final.**

## Résultat

Classer le projet selon l'un de ces quatre statuts, avec justification :

```
PRODUCTION READY
PRODUCTION READY WITH WARNINGS
NOT PRODUCTION READY
BLOCKED
```

`BLOCKED` s'applique aux situations critiques de CLAUDE.md §1 (secret exposé, faille critique,
absence totale de stratégie de sauvegarde pour des données importantes, migration destructive non
validée...).

## Rapport

```
# Production Readiness Report

## Deployment target identified
## Summary
## Status: PRODUCTION READY | PRODUCTION READY WITH WARNINGS | NOT PRODUCTION READY | BLOCKED

## CRITICAL
## HIGH
## MEDIUM
## LOW
## INFO

## Fixed automatically (safe, reversible)
## Requires explicit confirmation
## Remaining recommendations
```

**Ne jamais déclencher un déploiement réel en production, ni exécuter une action irréversible sur
l'infrastructure réelle, sans confirmation explicite de l'utilisateur** — cette commande audite et
corrige ce qui est sûr, elle ne déploie pas.
