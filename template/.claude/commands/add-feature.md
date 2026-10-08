---
description: Ajoute une nouvelle fonctionnalité en suivant le workflow complet (clarification, analyse, plan, implémentation, tests, sécurité, documentation).
---

Demande : $ARGUMENTS

Si `--plan` est présent dans la demande : produire l'analyse (clarification, impact CLAUDE.md §2,
niveau de risque §3, Skills nécessaires, fichiers concernés, tests prévus, documentation
impactée, rollback strategy si HIGH/CRITICAL) puis **s'arrêter** — aucune modification de code,
aucun changement Git. Sinon, exécuter le workflow complet ci-dessous.

Exécute ce workflow complet, dans l'ordre, sans sauter d'étape :

1. **Clarifier** — si la demande n'est pas déjà entièrement spécifiée, applique le Skill
   `clarification` (ou invoque `/clarify-feature`) et attends les réponses avant de continuer.
2. **Analyser l'existant** — applique le Skill `project-analysis` : architecture, conventions,
   fichiers concernés, composants réutilisables, dépendances, tests existants.
3. **Identifier les risques** — régressions possibles, impact sécurité, impact API,
   impact frontend/backend.
4. **Planifier** — produis un plan explicite (Skill `feature-development`) : fichiers à
   créer/modifier, composants réutilisés, impact API/données/permissions, tests prévus.
5. **Valider si nécessaire** — si le changement est à impact important (breaking change,
   migration, architecture, permissions), présente le plan et attends la validation explicite de
   l'utilisateur avant d'implémenter.
6. **Implémenter** — en respectant les conventions identifiées, en réutilisant l'existant, en
   minimisant le diff, avec des TODO/FIXME précis et actionnables si nécessaire. Appliquer les
   Skills spécialisés pertinents pour la nature de la tâche : `ui-ux`/`accessibility`/
   `responsive-design` (frontend), `api-contract` (API/endpoint/contrat), `database`
   (schéma/migration/requête), `dependencies` (nouvelle dépendance), `production-logging`
   (comportement critique à observer), `seo` (page destinée à l'indexation), `performance` si un
   impact de performance réel est identifié (jamais par intuition seule).
7. **Ajouter les tests** — Skill `testing` : tests de la nouvelle fonctionnalité (happy path,
   invalid input, unauthorized/forbidden access, missing data, boundary cases, error handling,
   concurrency si pertinent, security cases).
8. **Exécuter les tests existants** — vérifier qu'aucune régression n'est introduite.
9. **Vérifier les régressions** — dérouler la checklist de non-régression pertinente
   (CLAUDE.md §18) selon la nature du changement.
10. **Auditer la sécurité** — Skill `security` si la feature touche auth, permissions, entrées
    utilisateur, fichiers, réseau ou données sensibles (login/reset/OTP/session/API publique :
    limitation des tentatives, cookies, TLS, CORS/CSRF — `references/verification-checklist.md`). Si la feature touche des données
    personnelles, des cookies/traceurs, de la prospection commerciale ou de l'IA, appliquer aussi
    le Skill `legal-compliance` (idéalement dès la planification, via `/review-compliance-feature`).
11. **Relire** — Skill `code-review` sur le diff produit ; corriger les CRITICAL/HIGH avant de
    continuer.
12. **Documenter** :
    - mettre à jour `docs/PROJECT_CONTEXT.md` si l'environnement du projet a changé ;
    - créer ou mettre à jour `docs/features/<feature>.md` ;
    - mettre à jour la documentation API frontend si un endpoint a été ajouté/modifié.
13. **Signaler** les TODO/FIXME pertinents laissés dans le code et dans la fiche feature.

Termine par un résumé court : ce qui a été fait, les tests exécutés et leur résultat réel, les
points de sécurité vérifiés, la documentation mise à jour, et tout point encore ouvert.
