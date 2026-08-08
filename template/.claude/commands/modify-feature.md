---
description: Modifie une fonctionnalité existante sans régression, en s'appuyant sur sa documentation et ses tests existants.
---

Demande : $ARGUMENTS

Si `--plan` est présent dans la demande : produire l'analyse complète (étapes 1 à 9 ci-dessous)
puis **s'arrêter** — aucune modification de code, aucun changement Git. Sinon, exécuter le
workflow complet.

Exécute ce workflow, dans l'ordre :

1. **Clarifier si nécessaire** — si la demande de modification est ambiguë, applique le Skill
   `clarification` avant de continuer.
2. **Retrouver la documentation de la feature** — lis `docs/features/<feature>.md` si elle
   existe. Si elle n'existe pas ou semble obsolète, le signaler.
3. **Comprendre le fonctionnement actuel** — applique le Skill `project-analysis` sur le
   périmètre de la feature : fichiers, logique actuelle, comportements existants à préserver.
4. **Analyser les dépendances** — qui utilise cette feature (autres modules, endpoints, composants
   frontend, jobs, intégrations externes).
5. **Analyser les tests existants** — quels comportements sont déjà couverts et garantis.
6. **Identifier les risques de régression** — dérouler CLAUDE.md §18 selon la nature du changement
   (API, modèle de données, permission, composant frontend, base de données).
7. **Vérifier les impacts API** — breaking change ou non ; si breaking change, s'arrêter et
   demander confirmation explicite avant de continuer.
8. **Vérifier les impacts frontend/backend** — cohérence du contrat si le projet est séparé.
9. **Vérifier les impacts sécurité** — Skill `security` si pertinent. Si la modification touche
   des données personnelles, cookies/traceurs, prospection ou IA, appliquer aussi le Skill
   `legal-compliance`.
10. **Effectuer la modification** — Skill `feature-development`, en minimisant le diff et en
    préservant le comportement non concerné par la demande. Appliquer les Skills spécialisés
    pertinents : `ui-ux`/`accessibility`/`responsive-design` (frontend), `api-contract`
    (API/contrat), `database` (schéma/migration/requête), `dependencies` (dépendance modifiée).
11. **Ajouter ou modifier les tests** — mettre à jour les tests existants impactés, en ajouter
    pour le nouveau comportement (Skill `testing`).
12. **Exécuter les tests de la feature** puis **les tests de régression pertinents** sur le reste
    du projet.
13. **Relire** — Skill `code-review` sur le diff produit.
14. **Mettre à jour la documentation** — `docs/features/<feature>.md`, `docs/PROJECT_CONTEXT.md`
    si nécessaire, documentation API frontend si un contrat a changé.

Termine par un résumé : ce qui a changé, pourquoi, les tests exécutés et leur résultat réel, les
risques de régression vérifiés, la documentation mise à jour.
