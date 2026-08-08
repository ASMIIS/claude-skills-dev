---
name: performance
description: Analyser et améliorer la performance frontend, backend, base de données et infrastructure — sans jamais optimiser par intuition seule. Utiliser ce Skill dès qu'une tâche touche explicitement la performance (lenteur signalée, bundle lourd, requête lente, chargement perçu comme lent) ou lorsqu'une modification risque d'en avoir un impact significatif (nouvelle requête dans une boucle, nouvelle dépendance lourde, nouvel appel réseau bloquant). Distingue toujours un problème mesuré d'un problème supposé.
---

# Performance

## Principe fondamental

Ne jamais optimiser uniquement par intuition. Distinguer systématiquement :

```
Measured problem       — mesuré concrètement (temps, taille, nombre de requêtes)
Likely problem         — pattern connu comme problématique, pas encore mesuré sur ce cas précis
Potential optimization — amélioration possible mais sans problème identifié
Premature optimization — complexité ajoutée sans besoin démontré
```

Ne jamais ajouter de cache, queue, worker, abstraction ou infrastructure uniquement parce que
cela semble "plus performant" — voir CLAUDE.md §19 (Enterprise-grade, pas Enterprise-bloat).
Avant d'optimiser, mesurer ou au minimum raisonner concrètement sur le volume/l'usage réel du
projet (Skill `project-analysis`).

## Frontend

Vérifier, selon la nature de la tâche : taille du bundle, stratégie de rendu et re-renders
inutiles, poids et format des images, chargement des polices, lazy loading du contenu hors écran,
nombre et regroupement des requêtes réseau, stratégie de cache, Core Web Vitals (LCP, CLS, INP),
performance perçue au chargement, performance runtime (interactions, animations).

## Backend

Vérifier : requêtes N+1, requêtes base de données inutiles ou redondantes, coût de sérialisation
des réponses, consommation mémoire/CPU des opérations lourdes, gestion de la concurrence, stratégie
de cache applicatif, timeouts configurés sur les appels externes, dimensionnement des pools de
connexion.

## Base de données

Voir Skill `database` → `references/performance.md` pour le détail (index, plans de requête,
requêtes coûteuses ou inutiles, limites de connexion) — ce Skill s'appuie sur cette référence
plutôt que de la dupliquer.

## Infrastructure

Vérifier, en s'appuyant sur le Skill `production-readiness` pour la topologie réelle : usage des
ressources (CPU/mémoire) par rapport aux limites de la plateforme, cold starts sur environnement
serverless, comportement au scaling, goulots d'étranglement identifiés.

## Méthode

1. Identifier si le problème est mesuré ou supposé — chercher une mesure concrète (temps de
   réponse, taille de bundle, nombre de requêtes) avant de conclure à un problème réel.
2. Prioriser les optimisations par impact réel attendu, pas par facilité d'implémentation.
3. Vérifier qu'une optimisation proposée n'introduit pas de régression fonctionnelle ni de
   complexité disproportionnée par rapport au gain (Skill `code-review`).
4. Documenter dans `docs/development/performance.md` les constats significatifs et les décisions
   d'optimisation prises (et celles délibérément écartées comme prématurées).

## Références détaillées

- `references/frontend-performance.md` — bundle, rendu, images, chargement
- `references/backend-performance.md` — requêtes, mémoire, concurrence, cache
- `references/measurement.md` — comment distinguer mesuré/probable/potentiel/prématuré
