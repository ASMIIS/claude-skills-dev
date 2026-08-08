# Configuration production — rotation, rétention, environnements

## Différences par environnement

Documenter et vérifier la configuration réelle de logging par environnement
(`docs/operations/environments.md`) : niveau minimum actif, destination des logs, format. Ne pas
désactiver les logs `WARN`/`ERROR`/`FATAL` en production — c'est l'environnement où ils sont les
plus nécessaires. Ne pas laisser un niveau `DEBUG` très verbeux actif en production sans
justification explicite (coût de stockage, bruit, risque d'exposition accidentelle de données).

## Rotation et rétention

Si l'application gère elle-même le stockage des logs (fichiers locaux) : vérifier une politique
de rotation (taille ou durée), une politique de rétention/archivage, et un mécanisme de
suppression au terme de cette durée. Si un fournisseur externe (service de logs managé) gère la
rétention, documenter cette responsabilité dans `docs/operations/observability.md` plutôt que de
la laisser implicite.

## Coût et confidentialité

La rétention des logs a un coût (stockage) et une implication de confidentialité si des données
personnelles y figurent malgré les précautions (`references/security.md`) — la durée de
rétention doit être définie consciemment, pas laissée à la valeur par défaut du fournisseur sans
vérification, et doit rester cohérente avec `docs/compliance/data-retention.md` si le projet a
une documentation de conformité.
