# Health checks, alertes et error tracking

## Health checks

Vérifier l'existence d'un endpoint de santé exploitable par la plateforme de déploiement (voir
Skill `production-readiness`) pour détecter automatiquement une instance défaillante. Un health
check pertinent vérifie que les dépendances critiques (base de données, service externe
indispensable) répondent, sans devenir lui-même une source de lenteur ou de fausse alerte.

## Error tracking

Identifier l'outil déjà en place (Sentry ou équivalent) avant d'en proposer un nouveau. Vérifier
que les erreurs remontées ne contiennent pas de données sensibles (voir `security.md`) et sont
correctement associées à un contexte exploitable (environnement, version déployée, utilisateur
concerné si pertinent et conforme aux règles de données personnelles).

## Alertes

Vérifier que les alertes existantes ciblent des seuils pertinents (pas de bruit excessif qui
mènerait à ignorer les alertes réelles) et couvrent au minimum les événements critiques identifiés
lors de l'implémentation d'une feature (échec d'authentification en masse, échec de paiement,
indisponibilité d'un service externe critique). Ne pas ajouter d'alerte pour un événement sans
action associée possible — une alerte sans action définie n'apporte pas de valeur.

## Méthode

Comme pour les logs et métriques : identifier l'existant, le documenter, ne compléter que ce qui
manque réellement, et documenter le résultat dans `docs/operations/observability.md`.
