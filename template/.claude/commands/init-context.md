---
description: Initialise ou reconstruit la connaissance complète du projet (produit, architecture, sécurité, tests, CI/CD, DA, ADR, topologie de production...) en combinant analyse du repo, questions au développeur et documentation existante. Ne demande jamais ce qui est déjà déductible du code. Supporte --audit pour un mode rapport sans modification.
---

Mode (vide = initialisation/mise à jour complète, `--audit` = rapport sans modification) :
$ARGUMENTS

## Principe

`/init-context` ne doit jamais se contenter de parcourir le repository et d'inventer le contexte,
ni demander à l'utilisateur des informations que le repository permet déjà de déduire. Le process
est toujours :

```
Scan → Déduction → Questions uniquement sur les inconnues importantes
→ Validation des hypothèses critiques → Construction de la documentation → Audit de cohérence
```

Ne jamais prétendre qu'une pratique (tests, monitoring, CI/CD...) existe si elle n'est pas
observée dans le repo ou confirmée par l'utilisateur. Documenter l'absence plutôt que de
l'inventer.

## Étape 1 — Scan (Skill `project-analysis`)

Avant de poser la moindre question, extraire tout ce qui est déterminable automatiquement : stack,
frameworks et bibliothèques (fichiers de dépendances), structure des dossiers, présence de tests,
config CI/CD, présence de Docker/config PaaS, variables d'environnement déclarées (noms
seulement, jamais les valeurs), documentation déjà existante, config Todo Tree, design system déjà
documenté, indices de topologie de production (fichiers `vercel.json`, `render.yaml`,
`Procfile`, etc.).

## Étape 2 — Déduction

Pour chaque élément détecté, en déduire ce qui en découle raisonnablement et qualifier le niveau
de certitude selon CLAUDE.md §16 :

```
KNOWN     — lu directement (ex: "next" dans package.json → KNOWN, Next.js)
INFERRED  — déduit avec confiance (ex: dépendance "pg" → INFERRED, PostgreSQL probable)
ASSUMED   — hypothèse plausible non vérifiée (ex: absence de mention de région → ASSUMED EU
            si l'équipe semble française)
```

**Exemple concret** : si le scan détecte Next.js, PostgreSQL (via Prisma), et Stripe, ne jamais
demander "Utilisez-vous Next.js ?" — c'est `KNOWN`. Ne poser de question que sur ce qui reste
réellement `UNKNOWN` après le scan (ex: la stratégie de sauvegarde de la base, le modèle de
gouvernance des reviews, les pays ciblés).

## Étape 3 — Questions structurées (uniquement sur les inconnues réelles)

Poser uniquement les questions dont la réponse n'a pas pu être déterminée avec fiabilité aux
étapes 1-2, groupées par domaine. Ne jamais demander de secrets, mots de passe, tokens ou clés
privées — pour les variables d'environnement sensibles, ne demander que leur **nom** et qu'elles
sont requises, jamais leur valeur (ex: `STRIPE_SECRET_KEY=<required>`).

- **Produit** — but du produit, utilisateurs, problème résolu, fonctionnalités principales et
  critiques, contraintes métier importantes
- **Organisation** — qui maintient le projet, qui valide les changements, qui fait les reviews,
  qui est responsable de la production, répartition des responsabilités entre équipes
- **Architecture** — choix structurants, contraintes, composants critiques, dépendances externes,
  services, communication entre services (compléter uniquement ce que le scan n'a pas déjà établi)
- **Frontend** — design system, conventions, responsive, accessibilité, navigateurs supportés
  (framework/routing/state management généralement déductibles du scan — Skill `ui-ux` en renfort)
- **Backend** — auth, autorisation, validation, gestion des erreurs, jobs/queues, services
  externes (framework généralement déductible du scan)
- **Données** — modèles principaux, contraintes, données sensibles, stratégie de sauvegarde,
  rétention (SGBD généralement déductible du scan)
- **Sécurité** — modèle d'auth/autorisation, rôles, permissions, gestion des secrets, exigences
  réglementaires/conformité, menaces connues, règles internes
- **Production Topology** (Skill `production-readiness`) — où et comment le projet est déployé
  réellement (jamais supposé) : modèle de déploiement, plateforme(s) — la production peut être
  composée de plusieurs services distincts (ex: frontend sur Vercel, backend sur Railway, base de
  données managée séparée, stockage objet, email externe) — région, CI/CD, gestion des secrets,
  logs, monitoring, stratégie de backup, stratégie de rollback
- **Tests** — couverture attendue, tests obligatoires, stratégie de régression (types/outils
  généralement déductibles du scan)
- **Git et workflow** — convention de branches/commits, nombre de reviewers, règles de merge,
  stratégie de release, procédure de hotfix/rollback. Ne pas imposer GitFlow ou une autre
  méthodologie si le projet en utilise déjà une différente.
- **Observabilité** — au-delà de ce que le scan a détecté : alertes, error tracking, audit logs.
  Si absent, le documenter comme absent plutôt que de l'inventer.
- **Documentation** — pour chaque type d'information, quelle est sa source de vérité (voir
  CLAUDE.md §15)
- **Contexte légal** (Skill `legal-compliance`) — pays ciblés, entreprise française ou non,
  produit visant des consommateurs, données personnelles traitées, données sensibles, transferts
  hors UE, usage de cookies/traceurs, usage de l'IA, obligations sectorielles, existence d'un DPO,
  d'une politique de confidentialité, d'un registre des traitements. Ne jamais demander de secret
  ni de donnée personnelle réelle.

Utiliser l'outil de questions à choix (boutons) quand c'est pertinent pour accélérer les réponses
sur des points fermés ; laisser les questions ouvertes en texte libre pour les points nécessitant
une explication (but du produit, contraintes métier...).

## Étape 4 — Validation des hypothèses critiques

Pour toute information `ASSUMED` ou `UNKNOWN` touchant un sujet critique — sécurité, données
personnelles, production, décision difficilement réversible — la soumettre explicitement à
l'utilisateur pour confirmation avant de la considérer `KNOWN`. **Une information `UNKNOWN` ne
doit jamais être transformée silencieusement en `ASSUMED`** (CLAUDE.md §16). Pour un sujet non
critique, une hypothèse `ASSUMED` clairement signalée comme telle dans la documentation produite
est acceptable.

## Étape 5 — Construction de la documentation

Adapter la structure suivante à la taille réelle du projet — **ne pas créer des dizaines de
fichiers pour un petit projet** (CLAUDE.md §19). Pour un petit projet, regrouper plusieurs
sections dans `PROJECT_CONTEXT.md` plutôt que d'éclater en de nombreux fichiers.

```
docs/
├── PROJECT_CONTEXT.md          (inclut la section Production Topology)
├── architecture/
│   ├── README.md
│   └── decisions/ADR-XXX-<titre>.md   (une ADR par décision architecturale importante)
├── features/
├── development/
│   ├── workflow.md
│   ├── testing.md
│   ├── performance.md
│   ├── accessibility.md
│   ├── risk-management.md
│   ├── definition-of-done.md
│   └── todo-conventions.md
├── security/README.md
└── operations/
    ├── environments.md
    ├── deployment.md
    └── observability.md

docs/compliance/            (si le projet traite des données personnelles ou est concerné légalement)
├── README.md, privacy.md, cookies.md, data-retention.md, third-parties.md, compliance-checklist.md

frontend/docs/
├── api/README.md
└── design-system/README.md
```

Utiliser les templates déjà fournis dans ce kit pour chaque fichier — ne pas en improviser une
structure différente. Pour chaque information : vérifier qu'elle a une **source de vérité
unique** (CLAUDE.md §15) — ne pas dupliquer un même contenu dans plusieurs fichiers, préférer un
lien vers la source. Marquer explicitement dans la documentation produite les informations encore
`ASSUMED` (pour qu'une relecture future sache quoi vérifier en priorité).

## Efficacité de contexte

Écrire la documentation produite de façon concise et structurée plutôt qu'en longs paragraphes
narratifs quand une donnée structurée suffit (ex: `provider: Render` / `model: PaaS` plutôt qu'une
phrase descriptive), si ce format reste cohérent avec les templates déjà fournis dans ce kit — ne
pas réinventer un format incompatible pour gagner quelques lignes. **L'économie de contexte ne
doit jamais signifier moins de questions posées** (Étape 3 reste intégrale) — elle signifie moins
de contexte inutile autour de ces questions et dans la documentation produite. Voir aussi CLAUDE.md
§10 (Context Engineering).

## Étape 6 — Audit de cohérence

Avant de terminer, vérifier : les fichiers créés/mis à jour se référencent correctement entre eux
(pas de lien mort), aucune information n'est dupliquée entre deux fichiers sans qu'un des deux
soit un simple renvoi, `CLAUDE.md` §5-7 (`[À REMPLIR]`) sont bien complétés si déterminables.

## Mode `--audit`

Si `--audit` est passé, ne rien modifier. Produire uniquement un rapport :

- documentation manquante ;
- documentation présente mais probablement obsolète (incohérente avec le code observé) ;
- informations encore `ASSUMED` ou `UNKNOWN` sur des sujets critiques ;
- changements d'architecture ou de topologie de production détectés depuis la dernière mise à
  jour connue ;
- nouvelles features non documentées dans `docs/features/` ;
- incohérences entre les différents fichiers de doc.

Proposer les mises à jour nécessaires sans les appliquer, sauf confirmation explicite de
l'utilisateur pour relancer `/init-context` en mode normal sur les points identifiés.

## Ré-exécution

`/init-context` n'est pas une commande à usage unique. Elle peut être relancée pour mettre à jour
le contexte après une évolution significative du projet, détecter une documentation devenue
obsolète, ou intégrer de nouvelles features. Lors d'une ré-exécution, ne pas repartir de zéro :
lire d'abord les fichiers existants, ne poser des questions que sur ce qui a changé, n'a jamais
été renseigné, ou était `ASSUMED`/`UNKNOWN` et reste à clarifier.
