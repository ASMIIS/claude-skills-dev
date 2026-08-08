---
description: Audit légal et réglementaire (France/UE) du projet entier — RGPD, cookies, droits des personnes, transferts, e-commerce, accessibilité légale, IA. Lecture seule, produit un rapport classé par sévérité et par niveau de certitude juridique.
---

Périmètre (optionnel, sinon projet entier) : $ARGUMENTS

Applique le Skill `legal-compliance` (et ses `references/`, notamment
`compliance-checklist.md`) en lecture seule — **ne modifie aucun fichier de code pendant cet
audit**, sauf demande explicite de l'utilisateur.

## Workflow

1. **Comprendre le produit** — lire `docs/PROJECT_CONTEXT.md` et `docs/compliance/` s'ils
   existent ; sinon, poser les questions essentielles de contexte légal (voir
   `.claude/commands/init-context.md` § contexte légal).
2. **Identifier les pays ciblés** et le modèle B2B/B2C.
3. **Identifier les utilisateurs** concernés et leur profil.
4. **Identifier les données** personnelles traitées (Skill `legal-compliance` →
   `references/rgpd.md`).
5. **Identifier les traitements** et leur base légale probable.
6. **Identifier les services tiers** et transferts hors UE (`references/european-regulation.md`).
7. **Identifier les cookies/traceurs** utilisés (`references/cookies-trackers.md`) — vérifier
   concrètement dans le code frontend quels scripts se chargent avant consentement.
8. **Vérifier la documentation** existante (`docs/compliance/`) — complétude.
9. **Vérifier le code** — cohérence avec la documentation déclarée (`references/privacy.md`),
   recherche de divergences concrètes.
10. **Vérifier la sécurité** — croiser avec le Skill `security` pour les mesures techniques liées
    à la protection des données (chiffrement, accès, logs, rétention).
11. **Vérifier les droits utilisateurs** — fonctionnalités réellement implémentées (export,
    suppression, opposition, etc.).
12. **Vérifier les transferts** hors UE identifiés à l'étape 6, en détail.
13. **Vérifier les obligations sectorielles potentielles** (e-commerce, accessibilité légale,
    IA) selon le contexte réel du produit.
14. **Rechercher les sources juridiques actuelles** (CNIL, EUR-Lex, EDPB, Légifrance) pour tout
    point sensible ou susceptible d'avoir évolué, plutôt que de conclure sur la seule base des
    connaissances internes.
15. **Produire un rapport.**

## Format du rapport

```
# Compliance Audit

## Summary

## CRITICAL
## HIGH
## MEDIUM
## LOW
## INFO
## LEGAL REVIEW REQUIRED
## UNKNOWN

## Sources consulted (with date)

## Recommendations
```

Chaque constat doit préciser : le sujet concerné, ce qui a été vérifié concrètement (code et/ou
documentation), la classification (`COMPLIANT` / `PARTIELLEMENT CONFORME` / `NON CONFORME` /
`INCONNU` / `VALIDATION JURIDIQUE REQUISE`), et la source consultée le cas échéant.

Ne jamais conclure à une conformité générale du produit — le rapport porte sur des constats
techniques et fonctionnels précis, pas sur une certification juridique globale.
