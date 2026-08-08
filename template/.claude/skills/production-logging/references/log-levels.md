# Niveaux de log

## Convention

`DEBUG` — détail utile en développement, désactivé ou peu verbeux en production.
`INFO` — événement normal notable (démarrage, opération métier réussie importante).
`WARN` — situation anormale mais non bloquante, à surveiller.
`ERROR` — échec d'une opération nécessitant attention, souvent actionnable.
`FATAL` — échec critique compromettant le fonctionnement du service.

Adapter aux niveaux réellement supportés par le framework/logger du projet s'ils diffèrent.

## Erreurs fréquentes à éviter

- Tout logger en `ERROR` par facilité, ce qui rend le niveau inutile pour prioriser les alertes.
- Utiliser `console.log`/équivalent brut pour une information critique de production au lieu du
  logger structuré du projet.
- Logger un `WARN`/`ERROR` pour un cas attendu et géré normalement (ex: validation échouée côté
  utilisateur) — réserver ces niveaux aux situations réellement anormales.
- Ne jamais logger une erreur silencieusement absorbée sans laisser de trace exploitable.

## Cohérence par environnement

Vérifier que le niveau minimum de log actif est cohérent avec l'environnement : plus verbeux en
développement, filtré en production pour éviter le bruit et le coût de stockage, sans supprimer
les niveaux `WARN`/`ERROR`/`FATAL`.
