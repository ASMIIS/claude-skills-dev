# Logs structurés

## Pourquoi

Un log structuré (JSON ou équivalent clé-valeur) est exploitable par un outil de recherche/
agrégation, contrairement à une ligne de texte libre qui nécessite un parsing fragile. Privilégier
ce format en production dès que le projet a une taille justifiant une recherche/analyse des logs.

## Champs de base recommandés

`level`, `timestamp` (format ISO 8601, fuseau explicite), `service`/`module`, `environment`,
`message` — puis des champs contextuels selon l'événement (`requestId`, `userId` si pertinent et
conforme aux règles de données sensibles, `errorCode`, `duration`).

## Cohérence

Utiliser une structure de champs cohérente à travers tout le projet — un champ nommé différemment
selon les modules (`req_id` vs `requestId` vs `correlationId`) complique l'agrégation. Vérifier la
convention déjà en place avant d'en introduire une nouvelle.

## Ne pas sur-structurer

Pour un petit projet sans besoin d'agrégation centralisée, un format structuré simple suffit — ne
pas imposer un schéma de logs complexe disproportionné par rapport à l'échelle réelle du projet
(CLAUDE.md §19).
