# Project Context

> Ce fichier est la source de vérité globale du projet pour Claude Code. Il doit être mis à jour
> lors de toute modification qui change l'environnement du projet (nouvelle techno, changement
> d'architecture, nouvelle convention, nouvelle variable d'environnement importante...).
> Ne pas y dupliquer le détail d'une feature : renvoyer vers `docs/features/<feature>.md`.
>
> **À compléter dès la première utilisation** en exécutant le Skill `project-analysis`.

## Purpose

<!-- Ce que fait le projet, pour qui, en une ou deux phrases. -->

## Architecture

<!-- Monorepo ou multi-repo, frontend/backend séparés ou non, couches principales, schéma sommaire. -->

## Technologies

<!-- Langages, frameworks, ORM, gestionnaire de paquets, versions majeures. -->

## Repository structure

<!-- Arborescence des dossiers principaux et leur rôle. -->

## Frontend

<!-- Framework, gestion d'état, routing, structure des dossiers, conventions de composants. -->

## Backend

<!-- Framework, structure (couches/services/controllers), conventions. -->

## Database

<!-- SGBD, ORM/query builder, conventions de schéma, outil de migration. -->

## APIs

<!-- Style d'API (REST/GraphQL/RPC), convention de versionnage, où trouver la doc détaillée. -->

## Authentication

<!-- Mécanisme utilisé (session, JWT, OAuth...), où il est implémenté. -->

## Authorization

<!-- Modèle de permissions (rôles, ACL, ownership...), où les vérifications sont faites. -->

## Security

<!-- Points d'attention spécifiques au projet, mécanismes déjà en place (rate limiting, CSP...). -->

## Testing

<!-- Framework(s), structure des dossiers de test, commandes pour lancer les tests. Voir aussi
docs/development/testing.md, performance.md et accessibility.md pour le détail par domaine. -->

## Build

<!-- Commande(s) de build, particularités. -->

## Deployment

<!-- Environnements, process de déploiement, particularités. -->

## Production Topology

<!--
La production peut être composée de plusieurs services distincts (ex: frontend sur Vercel,
backend sur Railway, base de données managée séparée, stockage objet, email via fournisseur
externe) — ne jamais supposer un fournisseur unique. Rempli/audité via /init-context et
/production-ready (Skill production-readiness). Qualifier chaque ligne en KNOWN / INFERRED /
ASSUMED / UNKNOWN si l'information n'est pas fermement établie (voir CLAUDE.md §16).
-->

### Deployment Model
<!-- PaaS, managed cloud, serverless, container platform, VPS, bare metal, Kubernetes, interne, autre. -->

### Platform
<!-- Nom(s) réel(s) — ex: Vercel, Render, Railway, AWS, OVH... -->

### Region
<!-- Région(s) d'hébergement si connue. -->

### Frontend
<!-- Où et comment le frontend est déployé. -->

### Backend
<!-- Où et comment le backend est déployé. -->

### Database
<!-- PaaS database, managée, externe, self-hosted — laquelle. -->

### Storage
<!-- Stockage de fichiers/objets si applicable. -->

### External Services
<!-- Services tiers impliqués dans la production (email, paiement, monitoring...). -->

### CI/CD
<!-- Pipeline utilisé, déclenchement, étapes. -->

### Domain
<!-- Domaine(s) de production, gestion DNS. -->

### Secrets Management
<!-- Mécanisme utilisé — jamais de valeur réelle ici. -->

### Logging
<!-- Destination des logs en production (voir aussi docs/operations/observability.md). -->

### Monitoring
<!-- Outils de monitoring/alerting en place. -->

### Backup Strategy
<!-- Fréquence, rétention, procédure de restauration testée ou non. -->

### Rollback Strategy
<!-- Mécanisme réel disponible pour revenir en arrière après un déploiement problématique. -->

## Environment variables

<!-- Liste des variables importantes et leur rôle (sans valeurs sensibles). -->

## Coding conventions

<!-- Style de code, formatteur/linter utilisé, conventions d'organisation du code. -->

## Naming conventions

<!-- Convention de nommage des fichiers, variables, endpoints, tables. -->

## Important constraints

<!-- Contraintes non négociables du projet (compatibilité, performance, réglementaire...). Voir
aussi docs/development/risk-management.md (exemples de classification de risque pour ce projet)
et docs/development/definition-of-done.md (Definition of Done adaptée à ce projet). -->

## Known technical debt

<!-- Dette technique connue et assumée, avec contexte. -->

## Common pitfalls

<!-- Pièges connus pour un nouvel agent (humain ou IA) travaillant sur ce projet. -->

## Feature documentation

<!-- Liste des fiches disponibles dans docs/features/, avec un lien et une phrase de résumé. -->
