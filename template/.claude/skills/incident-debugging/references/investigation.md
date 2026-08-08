# Investigation

## Reproduction

Essayer de reproduire le problème de façon fiable avant d'investiguer plus loin — un problème
reproductible se corrige et se vérifie beaucoup plus efficacement qu'un problème observé une
seule fois. Si impossible à reproduire directement, réduire l'incertitude par d'autres moyens :
logs détaillés, données réelles au moment de l'incident, conditions d'environnement.

Si la reproduction est réellement impossible (donnée de production non disponible, condition de
concurrence rare), le dire explicitement plutôt que de simuler une reproduction qui n'en est pas
une.

## Collecte d'informations

Rassembler avant de formuler des hypothèses : message d'erreur exact, stack trace complète,
requête/action qui a déclenché le problème, timestamp, environnement concerné, changements
récents (déploiements, migrations, configuration, dépendances), état des données concernées,
comportement attendu vs observé.

## Isolation du périmètre

Réduire le périmètre suspect progressivement : quelle couche est concernée (frontend, backend,
base de données, service externe), quel module, quelle fonction. Éviter de sauter directement à
une correction sur la base d'une intuition non vérifiée.
