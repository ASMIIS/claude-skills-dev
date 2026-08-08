---
name: api-contract
description: Traiter toute API (REST, endpoint, webhook, événement) comme un contrat à préserver. Utiliser ce Skill dès qu'une modification concerne une API, un endpoint, un webhook, un événement, un contrat frontend/backend, une interface publique, des types partagés, ou un changement de format de requête/réponse. Vérifie les consommateurs existants avant toute modification et maintient la documentation frontend/docs/api/README.md cohérente avec le code réel.
---

# API Contract

## Principe

Une API est un contrat entre le producteur et ses consommateurs (frontend, autres services,
intégrations tierces, tests). Avant de la modifier :

1. rechercher tous ses consommateurs ;
2. identifier le contrat actuel (request, response, statuts, erreurs) ;
3. vérifier les dépendances réelles sur ce contrat ;
4. identifier les risques de breaking change ;
5. planifier une migration si nécessaire plutôt qu'une rupture immédiate (voir CLAUDE.md §18).

## Ce qu'il faut vérifier pour toute API

Request, response, status HTTP, validation, format d'erreur, authentification, autorisation,
pagination, filtrage, tri, idempotence, rate limiting, versionnage, compatibilité ascendante.

## Références détaillées

- `references/rest.md` — conventions REST (méthodes, statuts, ressources)
- `references/errors.md` — format d'erreur cohérent
- `references/pagination.md` — pagination, filtrage, tri
- `references/versioning.md` — stratégie de versionnage d'API
- `references/backward-compatibility.md` — méthode pour éviter/gérer les breaking changes

## Frontend / backend séparés

Si le frontend et le backend sont séparés, maintenir `frontend/docs/api/README.md` (ou
équivalent) décrivant pour chaque endpoint pertinent : méthode, path, authentification,
autorisation, format de requête, paramètres, corps de requête, format de réponse, format
d'erreur, statuts, pagination, exemple. Ce contrat documenté doit rester cohérent avec le code
réel — le mettre à jour dès qu'une API change (voir Skill `documentation`).

**Ne jamais modifier uniquement le frontend en supposant le format backend** — vérifier le
contrat réel côté backend (code ou documentation à jour) avant d'adapter le frontend.

## Méthode

1. Identifier si la tâche touche une API existante ou en crée une nouvelle.
2. Si existante : Skill `project-analysis` pour retrouver tous les consommateurs (grep des appels,
   tests, doc frontend).
3. Vérifier le format actuel exact (pas une supposition) avant de le faire évoluer.
4. Si le changement casse le contrat existant : appliquer `references/backward-compatibility.md`
   plutôt qu'une rupture immédiate, et obtenir confirmation explicite (CLAUDE.md §4) si c'est un
   breaking change réel.
5. Implémenter, mettre à jour la doc API frontend, exécuter les tests (Skill `testing`) incluant
   les cas d'erreur et de validation.
6. Croiser avec le Skill `security` pour authentification/autorisation/validation, et avec
   `legal-compliance` si l'API expose ou reçoit des données personnelles.
