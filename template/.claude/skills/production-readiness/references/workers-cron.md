# Workers et tâches planifiées

Identifier si la plateforme fournit nativement des cron jobs, des workers, des jobs en arrière-
plan ou des queues. Si non fourni nativement, identifier le service réellement utilisé par le
projet pour cela (queue managée, worker séparé, bibliothèque de jobs).

## Points à vérifier

- **Retry** — comportement en cas d'échec, nombre de tentatives, backoff
- **Timeout** — durée maximale avant interruption forcée par la plateforme
- **Idempotency** — un job relancé après échec partiel ne doit pas produire un effet dupliqué
  (ex: envoi d'email en double, double débit)
- **Monitoring** — visibilité sur les échecs de job, pas seulement sur les succès
- **Failure handling** — que se passe-t-il après épuisement des tentatives (alerte, file morte,
  intervention manuelle nécessaire)

Ne pas construire une infrastructure de queue complexe si le volume et la criticité du projet ne
le justifient pas (CLAUDE.md §19) — un cron simple ou un job synchrone peut suffire pour un petit
projet.
