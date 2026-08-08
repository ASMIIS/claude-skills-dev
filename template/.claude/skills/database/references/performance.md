# Performance base de données

## Points à vérifier

- **N+1** — une boucle qui déclenche une requête par élément au lieu d'une requête groupée
  (jointure, `IN`, chargement anticipé/eager loading selon l'ORM)
- **Requêtes inutiles** — données chargées mais jamais utilisées, appels redondants dans le même
  cycle de requête
- **Index** — colonnes fréquemment filtrées (`WHERE`), jointes (`JOIN`) ou triées (`ORDER BY`)
  sans index correspondant ; à l'inverse, ne pas ajouter d'index sans besoin identifié
- **Scans coûteux** — requête forçant un scan complet de table sur un volume important
- **Pagination** — absente sur une liste potentiellement grande, ou implémentée par offset sur un
  très grand volume (coût croissant) sans alternative envisagée si pertinent (voir Skill
  `api-contract` → `references/pagination.md`)
- **Chargement excessif** — sélection de toutes les colonnes (`SELECT *`) quand seules quelques-unes
  sont utilisées, sur une table large
- **Transactions longues** — transaction englobant des opérations lentes (appel réseau, calcul
  lourd) qui bloque d'autres accès concurrents plus que nécessaire

## Méthode

Avant d'optimiser, mesurer ou au minimum raisonner concrètement sur le volume de données réel du
projet — une optimisation prématurée sur une table de quelques centaines de lignes ajoute de la
complexité sans bénéfice réel (voir CLAUDE.md §19, Enterprise-grade pas Enterprise-bloat).
