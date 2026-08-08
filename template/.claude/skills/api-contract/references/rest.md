# Conventions REST

Respecter les conventions déjà établies dans le projet avant d'en imposer de nouvelles (voir
Skill `project-analysis`). À défaut de convention existante, appliquer les bonnes pratiques REST
standards :

## Méthodes HTTP

- `GET` — lecture, sans effet de bord, idempotent
- `POST` — création, ou action non idempotente
- `PUT` — remplacement complet d'une ressource, idempotent
- `PATCH` — modification partielle
- `DELETE` — suppression, idempotent

## Statuts HTTP

- `200` OK, `201` Created, `204` No Content
- `400` requête invalide, `401` non authentifié, `403` non autorisé, `404` ressource absente,
  `409` conflit, `422` entité non traitable
- `500` erreur serveur

Utiliser le statut le plus précis disponible plutôt qu'un `200`/`500` générique qui masque la
nature réelle de la réponse.

## Ressources

Nommage cohérent avec les conventions du projet (pluriel/singulier, kebab-case, imbrication des
sous-ressources). Une ressource ne devrait pas exposer d'action métier via un verbe dans l'URL
sauf si le projet utilise déjà ce pattern.

## Idempotence

Vérifier que les méthodes censées être idempotentes (`GET`, `PUT`, `DELETE`) le sont réellement
dans l'implémentation — un appel répété ne doit pas produire un effet différent ou une erreur
inattendue.

## Rate limiting

Si le projet applique un rate limiting, vérifier sa cohérence pour tout nouvel endpoint sensible
(auth, actions coûteuses, endpoints publics).
