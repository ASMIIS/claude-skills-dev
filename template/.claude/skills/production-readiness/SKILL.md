---
name: production-readiness
description: Vérifier que l'application est réellement prête pour la production dans son environnement d'hébergement réel — sans jamais supposer un modèle d'infrastructure par défaut. Utiliser ce Skill lors de toute tâche touchant le déploiement, la configuration production, les secrets, le stockage persistant, les workers/cron, le monitoring ou les domaines. Identifie systématiquement ce que la plateforme fournit déjà avant de construire quoi que ce soit soi-même.
---

# Production Readiness

## Principe fondamental

Ne jamais supposer que la production repose sur une infrastructure administrée manuellement. Le
projet peut être hébergé selon des modèles très différents — PaaS, cloud managé, serverless,
plateforme de conteneurs, VPS, bare metal, Kubernetes, infrastructure interne, ou toute
combinaison. Des exemples de plateformes (Vercel, Netlify, Render, Railway, Fly.io, Heroku, AWS,
Google Cloud, Azure, OVH, Hetzner, Docker/Docker Compose/Kubernetes) sont indicatifs et ne
couvrent jamais l'ensemble des cas réels — toujours identifier la plateforme réelle du projet
plutôt que de deviner à partir d'une liste.

## Étape 1 — identifier le modèle de déploiement

La première question à résoudre, toujours, est : **où et comment le projet sera-t-il (ou est-il)
déployé en production ?** Ne jamais commencer une tâche de production-readiness par une
hypothèse d'infrastructure (AWS, Docker, Kubernetes, VPS, PaaS) — la déterminer avant toute
configuration. Qualifier chaque élément selon CLAUDE.md §16 (`KNOWN`/`INFERRED`/`ASSUMED`/
`UNKNOWN`) et ne jamais transformer silencieusement un `UNKNOWN` critique (ex: stratégie de
backup, secrets de production) en `ASSUMED`.

Déterminer ensuite : quel est le modèle de déploiement, quelle plateforme est utilisée, quels
composants sont gérés par la plateforme, quels composants restent à gérer par l'application.
Consulter `docs/PROJECT_CONTEXT.md` → Production Topology et `docs/operations/deployment.md` s'ils
existent (générés via `/init-context`), sinon les compléter.

```
                 Production
                     │
          ┌──────────┴──────────┐
          │                     │
       Platform             Application
          │                     │
    What it provides       What we must build
          │                     │
          └──────────┬──────────┘
                     ↓
              Configuration → Tests → Production Ready
```

**Ne jamais considérer qu'une plateforme rend automatiquement l'application "production-ready"**
— elle fournit une partie de l'équation, pas la totalité (configuration applicative, secrets,
migrations, logs, gestion d'erreur, sécurité applicative, stratégie de données restent
généralement à la charge du projet même sur un PaaS géré).

## Étape 2 — pour chaque composant, déterminer qui le gère

Pour chaque élément pertinent (build, runtime, variables d'environnement, secrets, déploiements,
environnements de preview, domaines, HTTPS, logs, health checks, scaling, stockage, base de
données, cron, workers, queues, backups, rollback, monitoring), classer :

```
Géré par la plateforme / Géré par l'application / Géré par un service externe / Non nécessaire
```

**Ne jamais recréer manuellement une fonctionnalité déjà correctement fournie par la
plateforme.** Exemple : si la plateforme fournit HTTPS automatiquement, ne pas installer un
reverse proxy uniquement pour l'obtenir. À l'inverse, ne pas supposer qu'un composant est couvert
sans l'avoir vérifié.

## Étape 3 — adapter la configuration, ne pas imposer un modèle

Adapter la configuration à la plateforme réelle plutôt qu'à un modèle générique. Ne pas ajouter
Docker, Nginx, Kubernetes, Terraform, un reverse proxy ou un process manager uniquement parce
qu'ils sont perçus comme "professionnels" — la plateforme peut déjà fournir tout ou partie de ces
fonctions. Avant de créer un fichier de configuration (`Dockerfile`, `docker-compose.yml`,
`vercel.json`, `netlify.toml`, `render.yaml`, `railway.json`, `Procfile`, etc.), vérifier que la
plateforme cible en a réellement besoin — ne jamais créer plusieurs fichiers de déploiement
concurrents sans raison. La configuration se détermine à partir de : stack du projet + plateforme
cible + architecture + services réellement utilisés.

## Références détaillées

- `references/paas.md` — analyse spécifique PaaS (build, runtime, scaling, ce qui est fourni)
- `references/secrets.md` — gestion des secrets par plateforme, `.env.example`
- `references/persistent-storage.md` — filesystem éphémère, stockage objet, base de données
- `references/deployment-rollback.md` — stratégies de déploiement et de rollback réelles
- `references/observability.md` — logs et monitoring déjà fournis vs à compléter
- `references/domains-networking.md` — domaines, HTTPS, CORS, cookies, webhooks
- `references/workers-cron.md` — jobs planifiés, queues, tâches en arrière-plan

## Travailler avec les autres Skills

Ces deux Skills ne sont jamais fusionnés — ils ont des responsabilités distinctes reliées ainsi :

```
production-readiness
        │
        └── production-logging
```

`production-readiness` vérifie que le logging de production **existe** et est correctement
intégré à la plateforme (destination, rétention, accès) ; `production-logging` gère le **détail**
du système de logs lui-même (structure, niveaux, données sensibles, correlation ID). Ne jamais
recréer deux systèmes de logging différents pour un même projet — s'appuyer sur l'existant
identifié par `production-readiness` puis affiner avec `production-logging`.

- **`production-logging`** — pour la qualité des logs applicatifs une fois la destination
  (plateforme, service externe) identifiée. Ne pas installer un système externe de logs si ceux
  de la plateforme répondent déjà au besoin.
- **`database`** — pour les migrations, l'intégrité et la performance, une fois le type de base
  de données identifié (PaaS database, managée, externe, self-hosted).
- **`security`** — gestion des secrets, HTTPS, exposition réseau.
- **`dependencies`** — si la configuration de déploiement introduit de nouveaux outils/paquets.

## Règle générale

L'objectif n'est pas de construire une infrastructure maximale ni de reproduire un modèle
"enterprise" par défaut (voir CLAUDE.md §19, Enterprise-grade pas Enterprise-bloat). L'objectif
est de construire la **configuration minimale suffisante** pour que l'application soit fiable,
sécurisée, observable et maintenable dans son environnement de production **réel** — pas dans un
environnement supposé.
