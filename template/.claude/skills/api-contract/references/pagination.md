# Pagination, filtrage, tri

## Pagination

Respecter la convention déjà en place (offset/limit, page/pageSize, curseur). Ne pas mélanger
plusieurs styles de pagination dans la même API sans raison. Vérifier :

- une limite maximale est appliquée côté serveur (ne jamais faire confiance à une valeur `limit`
  fournie par le client sans plafond) ;
- le total ou l'indicateur de page suivante est cohérent avec les données réellement filtrées ;
- la pagination reste stable si des éléments sont ajoutés/supprimés pendant la consultation
  (comportement acceptable à documenter si non garanti).

## Filtrage et tri

Valider côté serveur les champs de filtrage/tri acceptés (whitelist) — ne jamais construire une
requête dynamique directement à partir d'un paramètre utilisateur non validé (risque d'injection,
voir Skill `security`). Documenter les champs filtrables/triables disponibles dans la doc API
frontend.

## Grands volumes

Pour toute liste potentiellement grande, vérifier qu'une pagination existe — une liste non paginée
est un risque de performance et souvent un signe d'oubli plutôt qu'un choix.
