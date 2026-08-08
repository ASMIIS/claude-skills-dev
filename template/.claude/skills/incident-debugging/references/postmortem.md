# Postmortem

Pour un incident de production significatif, documenter (dans `docs/features/<feature>.md` ou un
fichier dédié selon l'ampleur, ex. `docs/operations/incidents/<date>-<titre>.md`) :

```markdown
# Postmortem — <titre>

## Résumé
<!-- Ce qui s'est passé, en une ou deux phrases. -->

## Impact
<!-- Utilisateurs affectés, durée, sévérité, données concernées. -->

## Timeline
<!-- Chronologie factuelle : détection, investigation, correction, résolution. -->

## Root cause
<!-- Cause racine identifiée, pas seulement le symptôme. -->

## Correctif appliqué
<!-- Ce qui a été corrigé, et le test de régression associé. -->

## Actions préventives
<!-- Ce qui est mis en place pour éviter une récidive (monitoring, test, revue de process). -->
```

## Principe — pas de recherche de coupable

Un postmortem documente le système et ses faiblesses, pas les individus. Formuler les constats en
termes de processus et de système ("le déploiement ne vérifiait pas X") plutôt qu'en termes de
personne ("untel a oublié de vérifier X").

Adapter le formalisme à la sévérité réelle de l'incident (CLAUDE.md §19) — un incident mineur ne
nécessite pas un document aussi complet qu'un incident critique en production.
