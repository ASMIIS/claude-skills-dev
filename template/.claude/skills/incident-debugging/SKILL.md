---
name: incident-debugging
description: Investiguer méthodiquement un bug complexe, une régression, une erreur de production ou un comportement inexpliqué — sans modifier le code avant d'avoir compris la cause racine. Utiliser ce Skill pour tout problème qui n'a pas de cause évidente immédiate, en particulier en production. Complète (et peut précéder) le Skill testing et la commande /fix-feature.
---

# Incident Debugging

## Principe — ne jamais commencer par modifier le code

Pour un bug complexe ou un incident, suivre la séquence :

```
Symptôme → Reproduction → Collecte d'informations → Hypothèses → Investigation
→ Root cause → Fix → Regression test → Validation
```

Modifier le code avant d'avoir une hypothèse solide sur la cause racine mène généralement à
masquer le symptôme plutôt qu'à résoudre le problème.

## Root cause, pas symptôme

Chercher la cause racine plutôt que de masquer le symptôme. Un signe d'alerte fréquent :

```
if (error) return;
```

ou équivalent, ajouté pour faire disparaître une erreur visible sans comprendre pourquoi elle se
produit. Si le correctif consiste uniquement à avaler une erreur ou ignorer un cas, considérer que
la cause racine n'a probablement pas été trouvée.

## Collecte d'informations — production

Lorsque le problème concerne la production, vérifier dans l'ordre le plus efficace selon ce qui
est disponible : logs (voir Skill `production-logging`), changements récents (déploiements,
migrations, config), dépendances (versions, incidents connus côté fournisseur), métriques si
elles existent (Skill `documentation` → `docs/operations/observability.md`), conditions
d'environnement (variables, ressources), données (état réel en base au moment du problème),
migrations récentes, appels à des services externes.

**Ne jamais supprimer des logs ou désactiver des protections simplement pour faire disparaître
une erreur visible** — cela masque le problème sans le résoudre et retire l'information
nécessaire à l'investigation future.

## Hypothèses

Formuler explicitement plusieurs hypothèses plausibles avant d'investiguer la première venue.
Prioriser les hypothèses par plausibilité et par facilité de vérification, pas uniquement par
préférence personnelle.

## Fix et test de régression

Une fois la cause racine identifiée : corriger la cause, pas seulement le symptôme observé.
Ajouter un test qui reproduit le bug avant correction, vérifier qu'il échoue, corriger, vérifier
qu'il passe — ce test reste comme garde-fou de non-régression (voir Skill `testing` et commande
`/fix-feature`, qui applique ce Skill pour les bugs non triviaux).

## Postmortem

Pour un incident de production significatif, documenter (voir `references/postmortem.md`) : ce
qui s'est passé, l'impact, la cause racine, le correctif, et les actions préventives — sans
chercher un coupable individuel, dans un objectif d'amélioration du système.

## Références détaillées

- `references/investigation.md` — méthode de collecte d'information et de reproduction
- `references/root-cause-analysis.md` — techniques pour remonter à la cause racine
- `references/postmortem.md` — structure d'un rapport post-incident
