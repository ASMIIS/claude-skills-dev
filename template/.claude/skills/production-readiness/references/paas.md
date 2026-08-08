# PaaS

Lorsqu'un PaaS est utilisé (Vercel, Netlify, Render, Railway, Fly.io, Heroku ou équivalent),
analyser spécifiquement : build, runtime, variables d'environnement, secrets, déploiements,
environnements de preview, environnement de production, domaines, HTTPS, logs, health checks,
scaling, stockage, base de données, cron, workers, queues, backups, rollback, domaines
personnalisés, monitoring.

## Méthode

Pour chaque élément listé ci-dessus, déterminer s'il est géré par la plateforme, par
l'application, par un service externe, ou s'il n'est pas nécessaire pour ce projet. Documenter le
résultat dans `docs/operations/deployment.md`.

## Configuration adaptée à la plateforme réelle

Ne pas appliquer une configuration générique — adapter précisément à la plateforme identifiée
(la configuration Vercel diffère de Render, qui diffère de Railway, qui diffère de Netlify). Ne
jamais mélanger plusieurs modèles d'infrastructure sans nécessité réelle (ex: ajouter un
Dockerfile complet à côté d'une configuration Vercel native sans que le projet en ait besoin).

## Fichiers de configuration

Avant de créer un fichier de configuration de déploiement, vérifier s'il est réellement
nécessaire pour la plateforme cible et si un fichier équivalent n'existe pas déjà. Ne jamais
laisser plusieurs fichiers de déploiement concurrents et incohérents dans le repository.
