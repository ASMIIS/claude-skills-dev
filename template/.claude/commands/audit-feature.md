---
description: Audit lecture seule d'une feature — bugs, régressions potentielles, sécurité, dette technique, documentation. Ne modifie pas le code.
---

Feature à auditer : $ARGUMENTS

Exécute un audit complet, en lecture seule — **ne modifie aucun fichier de code pendant cet
audit**, sauf si l'utilisateur le demande explicitement dans sa requête.

1. **Analyser l'existant** — Skill `project-analysis` sur le périmètre complet de la feature :
   tous les fichiers, endpoints, modèles, tests et documentation la concernant.
2. **Sélectionner les Skills pertinents** selon la nature réelle de la feature (voir CLAUDE.md §9)
   — `code-review` et `security` s'appliquent presque toujours ; ajouter `api-contract`,
   `database`, `ui-ux`/`accessibility`/`responsive-design`, `legal-compliance`, `performance`
   uniquement si la feature les concerne réellement.
3. **Dérouler le Skill `code-review`** en mode audit sur l'ensemble de la feature, en recherchant
   spécifiquement :
   - Bugs
   - Régressions potentielles (incohérences avec le reste du projet)
   - Code mort
   - TODO / FIXME (présents, vagues, ou anciens sans suite)
   - Mauvaise gestion des erreurs
   - Problèmes de validation
   - Problèmes de performance
   - Problèmes d'architecture
   - Problèmes de tests (couverture insuffisante, tests fragiles)
   - Problèmes de documentation (absente, obsolète, incohérente)
   - Problèmes API (contrat peu clair, non versionné, non documenté côté frontend)
   - Problèmes frontend/backend (incohérence de contrat)
4. **Dérouler le Skill `security`** sur toute la feature : injection, XSS/CSRF/SSRF, IDOR,
   contrôle d'accès, auth, exposition de données, secrets, validation des entrées, fichiers,
   URLs externes, endpoints publics. Si la feature touche auth, session, reset, OTP, API publique,
   CORS ou en-têtes : dérouler `references/verification-checklist.md` du Skill `security`
   (anti brute-force, vol de session, MITM, rate limiting) et inclure sa table de synthèse.

Produis un rapport structuré, classé par sévérité, avec un statut de gate global :

```
# Audit — <nom de la feature>

## Status: PASS / WARNING / BLOCKED
## Skills applied

## CRITICAL
## HIGH
## MEDIUM
## LOW
## INFO
```

Chaque constat doit indiquer : le fichier/zone concernée, une description concrète du problème,
son impact réel, et une suggestion de correction — sans l'appliquer. `BLOCKED` uniquement pour une
situation critique au sens de CLAUDE.md §1.

Termine en demandant à l'utilisateur s'il souhaite que tu corriges certains constats (par exemple
via `/fix-feature` pour les CRITICAL/HIGH, ou `/modify-feature` pour une refonte plus large).
