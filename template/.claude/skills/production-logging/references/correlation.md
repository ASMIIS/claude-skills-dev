# Correlation / Request ID

## Principe

Un identifiant unique généré au début du traitement d'une requête (ou repris s'il est fourni par
un appelant amont) doit être propagé à travers toutes les couches concernées — frontend → API →
service → base de données → appel externe — et inclus dans chaque log lié à cette requête,
lorsque l'architecture du projet le permet.

## Implémentation

Vérifier le mécanisme déjà en place avant d'en introduire un nouveau (middleware existant, header
`X-Request-Id` ou équivalent). Si absent et pertinent pour la taille du projet (architecture
multi-service ou backend avec volume de requêtes significatif), proposer une implémentation
minimale plutôt qu'un système de tracing distribué complet si non justifié (CLAUDE.md §19).

## Ce qu'il ne faut pas faire

Ne jamais exposer au client final des informations internes sensibles (nom de service interne,
détail d'infrastructure) simplement parce qu'un correlation ID existe et est renvoyé dans la
réponse — le correlation ID lui-même peut être renvoyé pour faciliter le support, pas le détail
de ce qu'il permet de tracer en interne.
