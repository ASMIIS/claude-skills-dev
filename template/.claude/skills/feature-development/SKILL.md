---
name: feature-development
description: Orchestrateur principal d'une modification fonctionnelle — comprend le besoin, détecte les impacts, sélectionne les Skills pertinents (jamais tous les 19 systématiquement), planifie, implémente au minimum nécessaire, puis déclenche tests/sécurité/review/documentation. Utiliser ce Skill pendant la phase d'implémentation de /add-feature et /modify-feature. Ne pas utiliser tant que la demande est encore ambiguë (Skill clarification) ou que l'existant n'a pas été analysé (Skill project-analysis).
---

# Feature Development — orchestrateur

## Rôle

Ce Skill est le principal orchestrateur d'une modification fonctionnelle (GATE 3 et 4 de
CLAUDE.md §1). Il ne duplique pas les règles détaillées des Skills spécialisés — il détermine
lesquels sont pertinents pour la tâche réelle, et s'appuie sur eux plutôt que d'incorporer leur
contenu ici.

## Pré-requis

1. La demande a été clarifiée (Skill `clarification`) — pas d'ambiguïté bloquante restante.
2. L'existant a été analysé (Skill `project-analysis`) — fichiers concernés et patterns identifiés.

Si l'un des deux manque, y revenir avant de continuer.

## 1. Détection d'impact — sélectionner les Skills pertinents

À partir de la nature réelle de la tâche (pas de sa formulation), déterminer quels Skills
spécialisés s'appliquent en utilisant la matrice de routing de CLAUDE.md §9. **Ne jamais dérouler
les 19 Skills par défaut** — une modification CSS n'active pas `database` ni `legal-compliance`.

Suivre la séquence : **classifier** la tâche (nature, impact §2, risque §3) → **sélectionner** les
Skills pertinents → **charger** uniquement leurs `references/` réellement concernées par le
problème détecté (pas tout le dossier `references/` par réflexe — voir CLAUDE.md §10 Progressive
Disclosure) → **exécuter** → cesser d'utiliser un Skill dès qu'il n'est plus pertinent pour l'étape
courante (Context Pruning, CLAUDE.md §10), sauf si les tests ou la review en ont encore besoin.
Le niveau de contexte global (Tier/Budget) suit CLAUDE.md §10 — une tâche triviale reste au
Niveau 0-1, une tâche complexe ou à risque HIGH/CRITICAL peut légitimement monter au Niveau 3-4.

Le Core (`testing`, `code-review`, `documentation`) s'applique presque toujours ; les Skills
Engineering/Frontend/Production/Compliance ne s'activent que si la tâche les concerne réellement.
En cas de doute sur la pertinence d'un Skill, l'inclure plutôt que de risquer un angle mort —
mais ne pas l'inclure "au cas où" sans lien réel avec la tâche.

## 2. Planification

Avant de modifier le moindre fichier, produire un plan explicite contenant :

- **Résumé du changement** en une ou deux phrases
- **Skills spécialisés activés** et pourquoi
- **Fichiers à créer** et leur rôle
- **Fichiers à modifier** et la nature du changement
- **Composants/services réutilisés** (identifiés lors de l'analyse)
- **Impact API / données / permissions / sécurité** si pertinent
- **Risques de régression identifiés** (voir CLAUDE.md §18)
- **Tests prévus** (Skill `testing`)

Pour un changement mineur et évident (renommage local, correction de style, ajustement isolé), un
plan complet n'est pas nécessaire — mais la liste des fichiers impactés doit toujours être
identifiée avant de modifier.

Pour un changement à impact important (breaking change, migration destructive, changement de
permissions, architecture) : présenter le plan et **attendre la validation de l'utilisateur**
avant d'implémenter (CLAUDE.md §4).

## 3. Implémentation

- Appliquer les Skills spécialisés sélectionnés à l'étape 1 pour le détail des règles à respecter
  (`ui-ux`/`accessibility`/`responsive-design` pour le frontend, `api-contract` pour une API,
  `database` pour un schéma, `dependencies` pour une nouvelle dépendance,
  `production-logging`/`production-readiness` pour un comportement de production, `seo` pour une
  page indexable, `performance` si un impact réel est identifié, `legal-compliance` pour des
  données personnelles).
- Respecter les conventions identifiées lors de l'analyse (nommage, structure, style d'erreurs).
- Réutiliser les abstractions existantes plutôt que d'en créer de nouvelles.
- Minimiser le diff : ne pas reformater ou réorganiser du code non lié à la tâche.
- Garder chaque commit/étape logiquement cohérent et compréhensible isolément.
- Annotations `TODO:`/`FIXME:`/`XXX:`/`HACK:`/`NOTE:` : non obligatoires, jamais artificielles,
  jamais utilisées pour reporter une vulnérabilité de sécurité — voir
  `docs/development/todo-conventions.md`.
- Ne jamais introduire une modification silencieuse dangereuse (CLAUDE.md §4) sans confirmation
  explicite de l'utilisateur.

Les TODO/FIXME significatifs pour la compréhension de la feature doivent aussi être reportés dans
sa fiche `docs/features/<feature>.md`, section `## TODO` / `## FIX`.

## 4. Après l'implémentation — gates restantes

Enchaîner systématiquement (voir CLAUDE.md §1) :

1. **GATE 5 — Testing** : Skill `testing` — régression + nouvelle fonctionnalité.
2. **GATE 6 — Security** : Skill `security` si la modification touche auth, permissions, entrées
   utilisateur, fichiers, réseau ou données sensibles ; Skill `legal-compliance` en complément si
   des données personnelles, cookies, prospection ou IA sont concernés.
3. **GATE 7 — Review** : Skill `code-review` — relecture avant de considérer la tâche terminée.
4. **GATE 8 — Documentation** : Skill `documentation` — mise à jour de `PROJECT_CONTEXT.md` et de
   la fiche feature concernée.
5. **GATE 9 — Production Readiness**, si la tâche touche au déploiement ou à la configuration de
   production : Skill `production-readiness`.

Une fonctionnalité n'est pas terminée simplement parce que le code compile — et une gate qui
renvoie `BLOCKED` doit être résolue ou explicitement confirmée par l'utilisateur avant de
considérer la tâche terminée (voir CLAUDE.md §1).
