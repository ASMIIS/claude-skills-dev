# Performance backend

## Requêtes et sérialisation

Voir Skill `database` → `references/performance.md` pour le détail des requêtes. Côté backend,
vérifier aussi le coût de sérialisation des réponses (volume de données transformées inutilement,
champs non utilisés par le consommateur — voir Skill `api-contract`).

## Mémoire et CPU

Identifier les opérations chargeant en mémoire des volumes de données disproportionnés par rapport
au besoin réel (charger une table entière pour n'en utiliser qu'une partie), les calculs lourds
exécutés de façon synchrone et bloquante alors qu'ils pourraient être différés ou parallélisés.

## Concurrence

Vérifier que les opérations concurrentes ne créent pas de contention inutile (verrous trop larges,
transactions trop longues — voir Skill `database` → `references/transactions.md`).

## Cache

Évaluer si un cache applicatif est justifié par un besoin réel mesuré (donnée coûteuse à calculer/
récupérer et réutilisée fréquemment) avant de l'introduire — un cache mal invalidé est une source
de bugs, pas seulement un gain de performance gratuit.

## Timeouts et pools de connexion

Vérifier que tout appel externe (service tiers, base de données) a un timeout configuré — un appel
sans timeout peut bloquer indéfiniment une ressource. Vérifier le dimensionnement des pools de
connexion par rapport à la charge réelle attendue, pas une valeur par défaut copiée sans réflexion.
