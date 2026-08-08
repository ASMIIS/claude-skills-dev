# Rollback

## Principe

Pour toute migration à risque (voir Skill `database` → modifications potentiellement
destructives), avoir un plan de retour en arrière avant d'appliquer le changement — pas après
avoir constaté un problème.

## Éléments à prévoir

- **Migration réversible** — une méthode `down`/rollback qui restaure l'état précédent, quand
  c'est possible techniquement (une suppression de données n'est jamais réversible par une
  migration seule — prévoir une sauvegarde préalable si le risque est réel).
- **Sauvegarde avant migration destructive** — pour toute opération avec perte de données
  potentielle, vérifier qu'une sauvegarde récente existe ou en déclencher une si le projet le
  permet.
- **Compatibilité du code avec l'état pré-migration** — si un rollback de la migration est
  nécessaire après déploiement du nouveau code, vérifier que ce code ne dépend pas
  irréversiblement du nouveau schéma (ou prévoir un rollback du code en même temps).

## Après un rollback

Documenter ce qui s'est passé et pourquoi le rollback a été nécessaire (fiche feature ou ADR si
le changement était structurant) — voir Skill `incident-debugging` si le rollback fait suite à un
incident de production.
