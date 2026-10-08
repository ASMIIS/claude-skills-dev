---
description: Audit lecture seule du projet entier — sélectionne automatiquement les Skills pertinents (jamais les 19 systématiquement) parmi architecture, sécurité, dépendances, base de données, API, frontend, accessibilité, responsive, SEO, performance, conformité, production/observabilité, documentation, tests. Produit un Executive Summary et un Health Report quantitatif. Ne modifie rien par défaut.
---

Périmètre (optionnel, sinon projet entier) : $ARGUMENTS

**READ ONLY par défaut** — ne modifie aucun fichier de code ni de configuration pendant cet audit,
sauf demande explicite de l'utilisateur en complément de cette commande. Supporte `--plan` : dans
ce cas, produire uniquement la sélection des Skills et le périmètre prévu, puis s'arrêter avant
l'audit détaillé (voir CLAUDE.md §7).

## Sélection automatique des Skills

Appliquer le Skill `project-analysis` en premier pour déterminer ce que le projet contient
réellement, puis sélectionner uniquement les Skills pertinents parmi (voir CLAUDE.md §9 pour la
matrice de routing complète) :

- `security` — toujours pertinent pour un audit projet, y compris `references/verification-checklist.md`
  (anti brute-force, vol de session, MITM, rate limiting, en-têtes) dès qu'il y a authentification ou API publique
- `api-contract` — si le projet expose une API
- `database` — si le projet a une base de données
- `dependencies` — toujours pertinent (supply chain)
- `ui-ux` / `accessibility` / `responsive-design` — si le projet a un frontend
- `seo` — uniquement si des pages sont destinées à l'indexation (jamais sur un dashboard/back-office/espace authentifié) ; inclut stratégie (`docs/seo/README.md`), technique, contenu et GEO via `references/audit-checklist.md`
- `performance` — si un souci de performance est signalé ou si le volume de données/trafic le
  justifie ; ne jamais spéculer sans indice réel (voir Skill `performance` → `references/measurement.md`)
- `legal-compliance` — si le projet traite des données personnelles ou vise des consommateurs
- `production-readiness` / `production-logging` — si une configuration de production existe
- `documentation` — toujours pertinent, pour vérifier la cohérence de la doc existante
- `testing` — toujours pertinent, pour vérifier l'état de la suite de tests

**Ne jamais appliquer les 19 Skills aveuglément.** Justifier brièvement l'inclusion ou l'exclusion
de chaque catégorie (CLAUDE.md §8) en une phrase avant de commencer l'audit détaillé.

## Ce qu'il faut analyser, selon ce qui est pertinent

Architecture, sécurité, dépendances, base de données, API, frontend, accessibilité, responsive,
SEO, performance, conformité légale, production readiness et observabilité, documentation, tests
— un sous-ensemble de ces domaines selon le projet réel, pas systématiquement tous.

## Sortie

```
# Project Audit

## Executive Summary
<!-- 3-5 phrases : état général, points les plus critiques, tendance si un audit précédent existe. -->

## Skills applied (and why)
## Skills skipped (and why)

## CRITICAL
## HIGH
## MEDIUM
## LOW
## INFO
## Unknowns
<!-- Informations UNKNOWN ou ASSUMED sur des sujets importants (CLAUDE.md §16) rencontrées pendant l'audit. -->
## Blocked items
<!-- Situations relevant d'une Stop Condition (CLAUDE.md §4), nécessitant une décision humaine. -->

## Project Health
<!--
Résumé quantitatif dérivé directement des findings ci-dessus — jamais un score arbitraire.
Une catégorie non auditée (Skill non appliqué) est marquée N/A, pas 0.
Exemple :

Security     — CRITICAL 0  HIGH 1  MEDIUM 2  LOW 4
Testing      — CRITICAL 0  HIGH 0  MEDIUM 2  LOW 1
Performance  — CRITICAL 0  HIGH 1  MEDIUM 3  LOW 0
Accessibility— N/A (pas de frontend dans le périmètre audité)
-->

## Gate status
GATE — Security: PASS / WARNING / BLOCKED
GATE — Testing: PASS / WARNING / BLOCKED
GATE — Documentation: PASS / WARNING / BLOCKED
GATE — Production Readiness: PASS / WARNING / BLOCKED / NOT APPLICABLE
(autres gates pertinentes selon les Skills appliqués)

## Recommendations
```

Le **Project Health** est toujours dérivé des findings listés au-dessus — jamais un score global
qui masquerait un problème critique individuel. Si un résumé chiffré global est demandé en plus,
il doit rester subordonné à la liste des `CRITICAL`/`HIGH` : leur présence prime toujours sur
n'importe quel score agrégé.

Utiliser le statut `BLOCKED` uniquement pour une situation critique au sens de CLAUDE.md §1 et §4
(secret exposé, faille critique, perte de données potentielle...). Un `BLOCKED` en lecture seule
signifie que la situation nécessite une action avant toute nouvelle fonctionnalité, pas que
`/audit-project` corrige quoi que ce soit lui-même.

Pour un audit ciblé sur une seule feature, préférer `/audit-feature`. Pour un audit ciblé sur la
readiness production uniquement (avec correction possible du réversible), utiliser
`/production-ready`.
