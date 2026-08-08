---
name: dependencies
description: Analyser les implications d'ajouter, supprimer, remplacer ou mettre à jour une dépendance — maintenance, sécurité, licence, impact sur le bundle, compatibilité. Utiliser ce Skill avant d'ajouter une nouvelle dépendance, avant une mise à jour importante, et lors d'un audit de sécurité supply chain.
---

# Dependencies & Supply Chain

## Avant d'ajouter une dépendance

Vérifier : une solution existe-t-elle déjà dans le projet ou ses dépendances actuelles pour ce
besoin (voir Skill `project-analysis`) ; maintenance du package (dernière mise à jour, activité) ;
popularité/adoption ; historique de sécurité (vulnérabilités connues) ; licence (compatible avec
le projet — voir `references/licensing.md`) ; impact sur la taille du bundle si frontend ;
dépendances transitives introduites ; compatibilité avec la stack existante ; qualité de l'API
proposée.

**Ne jamais ajouter une dépendance uniquement pour quelques lignes de fonctionnalité** si le
projet possède déjà une solution adaptée en interne ou dans une dépendance existante — évaluer le
coût de maintenance d'une nouvelle dépendance face au coût d'écrire ces quelques lignes soi-même.

## Mise à jour

Avant une mise à jour importante (changement de version majeure notamment) :

1. vérifier les breaking changes annoncés ;
2. consulter le changelog pertinent ;
3. vérifier la compatibilité avec le reste du projet ;
4. exécuter les tests (Skill `testing`) ;
5. vérifier le build ;
6. vérifier si la mise à jour corrige des vulnérabilités connues.

**Ne jamais mettre à jour aveuglément toutes les dépendances en une fois** sans vérifier ce qui
change — préférer des mises à jour ciblées et testées, en particulier pour les versions majeures.

## Sécurité supply chain

Identifier, lorsque pertinent : packages compromis ou récemment suspects, dépendances
abandonnées (pas de maintenance depuis longtemps sur un package critique), versions avec
vulnérabilités connues (CVE), scripts d'installation (`postinstall` etc.) suspects ou inhabituels,
dépendances transitives critiques peu visibles.

## Références détaillées

- `references/security.md` — vulnérabilités connues, audit, scripts suspects
- `references/licensing.md` — compatibilité de licence
- `references/upgrades.md` — méthode de mise à jour sûre
- `references/supply-chain.md` — risques de la chaîne de dépendances

## Méthode

1. Identifier le besoin réel avant de chercher un package.
2. Vérifier l'existant avant d'ajouter.
3. Si ajout nécessaire : dérouler la checklist ci-dessus.
4. Si mise à jour : suivre `references/upgrades.md`.
5. Exécuter les tests et le build après tout changement de dépendance.
6. Documenter dans `docs/PROJECT_CONTEXT.md` si une dépendance structurante change (framework
   majeur, changement d'ORM, etc.) — envisager une ADR pour ce type de changement.
