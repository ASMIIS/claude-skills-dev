# Mesure — distinguer mesuré, probable, potentiel, prématuré

## Les quatre catégories

- **Measured problem** — un chiffre concret existe (temps de réponse observé, taille de bundle
  mesurée, nombre de requêtes compté, profiling effectué) qui démontre un problème réel.
- **Likely problem** — un pattern reconnu comme problématique est présent (boucle avec requête à
  l'intérieur, absence d'index sur une colonne filtrée fréquemment) mais n'a pas encore été mesuré
  sur ce cas précis — traiter comme probable, pas comme certain.
- **Potential optimization** — une amélioration est possible en théorie mais aucun problème n'a
  été identifié qui la justifie aujourd'hui.
- **Premature optimization** — ajout de complexité (cache, abstraction, infrastructure) sans
  besoin démontré, généralement pour un gain hypothétique à une échelle que le projet n'a pas
  encore atteinte.

## Méthode

1. Avant de qualifier quoi que ce soit de "problème de performance", chercher s'il existe une
   mesure — outil de profiling, métrique de production (Skill `production-logging`), test de
   charge, ou au minimum un raisonnement quantitatif sur le volume réel de données/trafic du
   projet.
2. Si aucune mesure n'est disponible et que le problème n'est pas évident, le classer `Likely
   problem` plutôt que `Measured problem` dans le rapport, et le dire explicitement.
3. Ne jamais implémenter une `Potential optimization` ou pire une `Premature optimization` sans
   la signaler comme telle et sans l'accord de l'utilisateur si elle ajoute de la complexité
   significative (CLAUDE.md §19).

## Conséquence sur le rapport

Dans un audit ou une recommandation, toujours préciser explicitement la catégorie du constat —
"mesuré" n'a pas le même poids que "probable" pour la priorisation des corrections.
