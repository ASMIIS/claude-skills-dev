---
name: legal-compliance
description: Analyser les implications légales et réglementaires (France / Union européenne) d'une fonctionnalité, d'une architecture ou d'une modification touchant des données personnelles, des cookies/traceurs, la relation consommateur, l'accessibilité légale ou l'IA. Utiliser ce Skill lors de /audit-compliance, /review-compliance-feature, et dans /add-feature ou /modify-feature dès qu'une tâche touche des données personnelles, des services tiers, des cookies, de la prospection commerciale ou de l'IA. Produit une analyse de conformité technique et fonctionnelle, jamais une certification juridique — distingue toujours ce qui est vérifié techniquement de ce qui nécessite une validation par un professionnel du droit.
---

# Legal & Compliance

## Rôle et limite fondamentale

Ce Skill ne fournit **jamais** de certification juridique. Il produit une analyse de conformité
technique et fonctionnelle, et identifie les points nécessitant une validation juridique humaine.
Une affirmation comme "le code respecte cette contrainte technique" n'équivaut jamais à "le
produit est juridiquement conforme" — la seconde nécessite un professionnel du droit.

Périmètre par défaut : **France + Union européenne**. Adapter au contexte réel du projet
(pays ciblés, secteur, B2B/B2C, données traitées, services tiers, hébergement) — ne jamais
appliquer une règle par défaut sans vérifier qu'elle est pertinente pour ce projet précis (ex: ne
pas appliquer les règles e-commerce à une application B2B qui n'est pas concernée).

## Échelle de conclusion

Toute analyse doit utiliser l'une de ces classifications, jamais une affirmation catégorique
au-delà de ce qui est vérifiable :

```
COMPLIANT / faible risque identifié
PARTIELLEMENT CONFORME
NON CONFORME / problème identifié
INCONNU / informations insuffisantes
VALIDATION JURIDIQUE REQUISE
```

Ne jamais transformer une supposition en certitude juridique. Quand une règle dépend fortement du
contexte métier, de contrats, de la qualification juridique d'un traitement ou de la situation
précise de l'entreprise : demander des informations supplémentaires ou recommander une validation
par un professionnel compétent plutôt que de conclure.

## Sources

Privilégier les sources officielles et à jour : CNIL, EUR-Lex, Commission européenne, EDPB/CEPD,
Légifrance, autorités françaises compétentes. Ne pas utiliser un article de blog comme source
principale quand une source officielle existe. Pour toute analyse importante ou susceptible
d'avoir changé, rechercher les textes/recommandations actuels avant de conclure (les règles
évoluent) et indiquer la version/date des sources citées dans les documents de conformité produits.

## Méthode générale

1. Comprendre le contexte réel du projet pertinent pour la tâche (type de produit, utilisateurs,
   pays ciblés, secteur, données traitées, modèle économique, B2B/B2C, services tiers,
   hébergement, transferts de données) — voir `docs/PROJECT_CONTEXT.md` et
   `docs/compliance/README.md` s'ils existent, sinon les questions du contexte légal posées par
   `/init-context`.
2. Identifier quels sujets de la checklist (`references/compliance-checklist.md`) sont réellement
   concernés par la tâche — ne pas dérouler systématiquement tous les domaines si non pertinents.
3. Consulter les références détaillées correspondantes :
   - `references/rgpd.md` — principes RGPD, bases légales, droits des personnes
   - `references/cookies-trackers.md` — cookies, localStorage, SDK, CMP
   - `references/privacy.md` — politique de confidentialité, cohérence code/documentation
   - `references/consumer-law.md` — e-commerce, droit de rétractation, prospection
   - `references/accessibility.md` — obligations légales d'accessibilité (croiser avec Skill `ui-ux`)
   - `references/ecommerce.md` — informations précontractuelles, paiement, abonnement
   - `references/european-regulation.md` — IA et réglementations européennes au-delà du RGPD
   - `references/compliance-checklist.md` — checklist complète pour `/audit-compliance`
4. Comparer la documentation existante (`docs/compliance/`) avec le comportement réel du code —
   signaler toute divergence (ex: politique de confidentialité déclarant l'absence de collecte de
   localisation alors que `navigator.geolocation` est utilisé dans le code).
5. Documenter les constats avec la classification ci-dessus, jamais une affirmation catégorique
   au-delà de ce qui est vérifiable.

## Principe de prudence

Si une fonctionnalité semble présenter un risque juridique significatif (données sensibles au
sens RGPD, traitement à grande échelle, profilage, décisions automatisées, nouvelle technologie
de suivi) : **ne pas deviner**. Identifier le problème, expliquer le risque, identifier les
informations manquantes, poser les questions nécessaires, rechercher les sources officielles,
proposer des options techniquement compatibles, et demander une validation juridique explicite
avant implémentation plutôt que d'implémenter silencieusement.

## Travailler avec les autres Skills

- **`security`** — toute obligation de protection de données a des conséquences techniques
  (chiffrement, contrôle d'accès, logs, rétention, suppression, sauvegarde, auth, minimisation).
  Toute modification touchant des données personnelles doit déclencher une réflexion sécurité +
  conformité conjointe.
- **`ui-ux` / `responsive-design`** — pour les obligations légales d'accessibilité
  (`references/accessibility.md`).
- **`documentation`** — pour maintenir `docs/compliance/` et la section "Legal & Compliance" des
  fiches feature à jour.

## Sortie attendue

Un constat concret par sujet identifié, sa classification, la source consultée le cas échéant, et
si nécessaire une recommandation de validation juridique explicite — jamais une déclaration
générale de conformité.
