# Versionnage d'API

Respecter la stratégie de versionnage déjà utilisée par le projet si elle existe (URL `/v1/`,
header, aucun versionnage explicite). Ne pas introduire un nouveau mécanisme de versionnage sans
raison forte — c'est un changement structurant qui nécessite une ADR (`docs/architecture/decisions/`).

## Quand versionner

Un changement qui casse le contrat existant (suppression de champ, changement de type, changement
de comportement) pour des consommateurs déjà en production justifie une nouvelle version plutôt
qu'une modification en place — sauf si tous les consommateurs peuvent être mis à jour de façon
synchronisée (cas fréquent en monorepo avec un seul frontend interne).

## Dépréciation

Si une ancienne version doit être retirée : communiquer un délai de dépréciation raisonnable,
documenter la date de retrait prévue, vérifier qu'aucun consommateur actif ne dépend encore de la
version avant suppression effective.
