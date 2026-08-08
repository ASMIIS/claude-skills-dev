# Root Cause Analysis

## Méthode des "5 pourquoi" (adaptée)

Partir du symptôme observé et demander "pourquoi" successivement jusqu'à atteindre une cause
qu'on peut réellement corriger — pas s'arrêter à la première explication plausible.

Exemple : "Le paiement échoue" → pourquoi ? "Le service externe retourne une erreur 500" →
pourquoi ? "Le timeout est dépassé" → pourquoi ? "La requête n'a pas de timeout configuré et
attend indéfiniment sous charge" → cause racine actionnable : ajouter un timeout et une gestion
d'erreur appropriée, pas seulement retenter l'appel.

## Distinguer cause déclenchante et cause racine

La cause déclenchante (ce qui a immédiatement provoqué l'erreur visible) n'est pas toujours la
cause racine (la faiblesse structurelle qui a permis que ce déclencheur cause un problème). Un
correctif qui ne traite que le déclencheur laisse la faiblesse structurelle intacte pour un futur
incident similaire.

## Vérifier l'hypothèse avant de corriger

Une fois une cause racine identifiée, vérifier qu'elle explique bien l'intégralité du symptôme
observé (pas seulement une partie) avant de considérer l'investigation terminée. Si des éléments
du comportement observé ne s'expliquent pas par l'hypothèse retenue, continuer l'investigation
plutôt que de conclure prématurément.
