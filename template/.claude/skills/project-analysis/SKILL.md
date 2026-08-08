---
name: project-analysis
description: Inspecter systématiquement l'architecture, les conventions et le code existant d'un projet avant toute modification. Utiliser ce Skill au début de /add-feature, /modify-feature, /fix-feature et /audit-feature, et chaque fois qu'il faut comprendre comment une partie du projet fonctionne réellement avant d'y toucher — endpoints, modèles de données, auth, tests, configuration. Toujours privilégier la réutilisation de l'existant plutôt que la création d'une nouvelle abstraction.
---

# Project Analysis

## Objectif

Comprendre ce qui existe réellement dans le projet avant d'écrire ou de modifier du code, pour :
- réutiliser les patterns et abstractions déjà en place plutôt que d'en recréer de nouveaux ;
- identifier tous les endroits impactés par un changement ;
- respecter les conventions déjà établies plutôt que d'en imposer de nouvelles.

Ne jamais créer une nouvelle abstraction (service, hook, helper, composant) lorsqu'une abstraction
existante répond déjà au besoin — même partiellement : dans ce cas, l'étendre plutôt que dupliquer.

## Checklist d'inspection

Avant toute modification, chercher activement, en fonction de ce qui est pertinent pour la tâche :

- **Architecture générale** — monorepo ou multi-repo, frontend/backend séparés ou non, couches
- **Stack technique** — langages, frameworks, ORM, gestionnaire de paquets, versions
- **Conventions** — nommage des fichiers, style de code, organisation des dossiers, imports
- **Composants / services existants** pouvant déjà couvrir tout ou partie du besoin
- **Endpoints existants** — méthode, path, auth, format des réponses, gestion d'erreurs
- **Modèles de données** — schéma, relations, validations, migrations
- **Authentification / autorisation** — mécanisme utilisé, où sont les vérifications de permission
- **Gestion des erreurs** — convention utilisée (codes, format de réponse, logging)
- **Tests existants** — framework, structure des dossiers de test, conventions de nommage
- **Configuration / variables d'environnement** — où elles sont définies et documentées
- **Migrations** — outil utilisé, réversibilité, conventions de nommage
- **Documentation existante** — `docs/PROJECT_CONTEXT.md`, `docs/features/`, README, doc API frontend
- **Contraintes de compatibilité** — versions supportées, clients externes de l'API

## Méthode

1. Si `docs/PROJECT_CONTEXT.md` existe, le lire en premier — il donne une vue d'ensemble sans
   avoir à tout redécouvrir depuis zéro.
2. Si la tâche concerne une feature déjà documentée, lire sa fiche dans `docs/features/` avant
   de lire le code.
3. Repérer les fichiers réellement concernés par la tâche (recherche par mot-clé, structure de
   dossiers, imports/usages) plutôt que de lire le repository entier.
4. Identifier les patterns récurrents (comment un endpoint est habituellement structuré, comment
   une validation est habituellement faite) pour rester cohérent avec l'existant.
5. Lister explicitement, avant de passer à la planification :
   - les fichiers qui seront probablement modifiés ;
   - les composants/services réutilisables identifiés ;
   - les risques de régression déjà visibles à ce stade ;
   - les incohérences ou absences de documentation constatées (à signaler, pas forcément à corriger).

## Sortie attendue

Un résumé court et concret de l'existant pertinent pour la tâche — pas un audit complet du
repository. Ce résumé alimente directement l'étape de planification (`feature-development`).

## Si `docs/PROJECT_CONTEXT.md` n'existe pas ou est obsolète

Le signaler et proposer de le créer/mettre à jour en suivant la structure définie dans le Skill
`documentation`. Ne pas bloquer la tâche en cours pour autant, sauf si l'utilisateur le demande.
