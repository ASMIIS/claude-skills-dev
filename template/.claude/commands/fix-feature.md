---
description: Corrige un bug en identifiant sa cause racine, avec un test qui reproduit le problème avant correction.
---

Bug à corriger : $ARGUMENTS

Si `--plan` est présent dans la demande : produire l'analyse (reproduction envisagée, hypothèses
de cause racine, Skills nécessaires, risques, tests prévus) puis **s'arrêter** — aucune
modification de code, aucun changement Git.

Pour un bug complexe, une régression peu claire, ou un incident de production, appliquer d'abord
le Skill `incident-debugging` (investigation méthodique, cause racine) avant de dérouler le
workflow ci-dessous — ne jamais commencer par modifier le code sans hypothèse solide sur la cause.

Exécute ce workflow, dans l'ordre — ne jamais masquer un symptôme quand une cause racine peut
être identifiée :

1. **Reproduire le problème** quand c'est possible — via un test, un script, ou une manipulation
   manuelle décrite précisément. Si impossible à reproduire, le dire explicitement et poursuivre
   sur la base des informations disponibles (logs, description, code).
2. **Analyser l'existant** — Skill `project-analysis` sur la zone concernée pour comprendre le
   fonctionnement actuel avant de chercher la cause.
3. **Identifier la cause racine** — pas seulement le symptôme visible. Si plusieurs causes
   possibles existent, les investiguer plutôt que de corriger la première hypothèse venue.
4. **Analyser les effets secondaires** — qui d'autre dépend du comportement actuel, même buggé
   (un correctif peut casser un contournement existant ailleurs).
5. **Vérifier la sécurité** — Skill `security` si le bug ou sa correction touche auth,
   permissions, entrées utilisateur, ou données sensibles.
6. **Ajouter un test qui reproduit le bug**, et vérifier qu'il échoue avant correction (quand
   c'est possible de le vérifier).
7. **Proposer ou appliquer la correction** — si le correctif implique un changement d'architecture
   ou de contrat API, présenter le plan et attendre confirmation avant d'appliquer.
8. **Corriger** la cause racine identifiée.
9. **Vérifier que le test passe** désormais.
10. **Exécuter les tests de régression** pertinents pour la zone modifiée.
11. **Relire** — Skill `code-review` sur le diff produit.
12. **Mettre à jour la documentation** — `docs/features/<feature>.md` (section notes, limitations
    connues, TODO/FIX) si le bug ou sa correction change la compréhension de la feature.

Termine par un résumé : cause racine identifiée, correction appliquée, test de non-régression
ajouté, résultat réel des tests exécutés.
