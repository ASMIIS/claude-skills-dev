---
description: Analyse les implications légales et réglementaires d'une feature précise, avant ou après son implémentation. À utiliser avant toute implémentation importante touchant des données personnelles, des cookies, ou de l'IA, pour intégrer les contraintes juridiques dès la conception.
---

Feature à analyser : $ARGUMENTS

Applique le Skill `legal-compliance` sur cette feature précise (existante ou en cours de
conception). Utilisable avant `/add-feature` (Privacy by Design) ou sur une feature déjà
implémentée.

## Recherche des implications

Rechercher, pour cette feature uniquement, ce qui est réellement concerné parmi :

- RGPD (`references/rgpd.md`) — données traitées, base légale, droits des personnes
- Cookies / traceurs (`references/cookies-trackers.md`)
- Confidentialité (`references/privacy.md`) — cohérence avec la politique existante
- Consentement — validité si le traitement en dépend
- Sécurité — croiser avec le Skill `security`
- Droit de la consommation (`references/consumer-law.md`) si B2C
- Accessibilité légale (`references/accessibility.md`)
- Services tiers impliqués et transferts internationaux (`references/european-regulation.md`)
- Rétention des données
- Droits utilisateurs impactés
- Réglementations sectorielles spécifiques si applicable

## Si utilisée avant implémentation (Privacy by Design)

Répondre avant de coder : quelle donnée, pourquoi, quelle base légale probable, qui y accède,
combien de temps elle est conservée, où elle est stockée, si elle est transférée, si on peut en
collecter moins. Ne pas ajouter les mécanismes de confidentialité seulement après avoir terminé
l'implémentation — les intégrer dès la conception.

## Sortie

Mettre à jour ou créer la section `## Legal & Compliance` dans `docs/features/<feature>.md` :

```markdown
## Legal & Compliance

### Personal data
### Legal basis
### Consent
### Cookies / trackers
### Retention
### Third parties
### International transfers
### User rights
### Security
### Regulatory considerations
### Legal review required
```

Si aucun sujet juridique pertinent n'est identifié pour cette feature, écrire simplement :
`No specific legal issue identified based on current project context.` — ne jamais remplir
artificiellement la section pour donner l'impression d'une analyse exhaustive.
