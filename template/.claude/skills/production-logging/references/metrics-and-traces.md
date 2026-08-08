# Métriques et traces

## Métriques

Identifier ce qui est déjà collecté (souvent en partie fourni par la plateforme — voir Skill
`production-readiness`) : taux de requêtes, taux d'erreur, latence, utilisation CPU/mémoire.
Compléter avec des métriques métier si un besoin réel est identifié (ex: nombre de paiements
échoués, temps de traitement d'une opération critique) — ne pas instrumenter systématiquement
chaque fonction sans justification.

Privilégier des métriques exploitables (agrégeables, avec des labels/dimensions cohérents) plutôt
qu'un comptage isolé sans contexte.

## Traces distribuées

Pertinentes principalement pour une architecture multi-services où une requête traverse plusieurs
composants. Vérifier si un correlation ID (voir `correlation.md`) suffit au besoin réel du projet
avant d'introduire un système de tracing distribué complet (OpenTelemetry ou équivalent) — pour un
projet monolithique ou de petite taille, le correlation ID dans les logs est souvent suffisant
(CLAUDE.md §19).

## Méthode

1. Identifier ce que la plateforme et les outils déjà en place fournissent.
2. Identifier le besoin réel non couvert (diagnostic d'un incident passé, visibilité manquante
   signalée).
3. Ne compléter que ce qui manque, avec l'outil le plus simple qui couvre le besoin.
