---
name: security-testing
description: Piloter un test de sécurité actif (recon, scan automatisé, revue manuelle guidée) contre une cible explicitement désignée et autorisée par l'utilisateur — jamais contre un système tiers, jamais contre la production sans confirmation séparée. Utiliser ce Skill uniquement via `/pentest-feature`, jamais de façon implicite. Complète le Skill `security` (checklist passive) par une vérification active, bornée et non destructive.
---

# Security Testing — test actif autorisé

## Ce que ce Skill n'est pas

Ce n'est pas un outil pour "pirater" un système au sens large, pas un générateur d'exploits
prêts à l'emploi, et pas une autorisation à agir contre une cible qui n'appartient pas à
l'utilisateur ou dont il n'a pas le droit de tester la sécurité. Un test de sécurité non autorisé
contre un système tiers est illégal dans la quasi-totalité des juridictions (en France : art.
323-1 et suivants du Code pénal — accès/maintien frauduleux dans un système de traitement
automatisé de données) et contre les Conditions d'Utilisation d'Anthropic. **Si l'autorisation
ou la propriété de la cible n'est pas établie avec certitude, c'est une Stop Condition
(CLAUDE.md §4) : arrêter et demander, ne jamais supposer.**

## Gate d'autorisation — obligatoire avant toute action active

Avant la moindre requête active contre la cible, vérifier explicitement (voir
`references/scope-and-authorization.md`) :

1. **La cible appartient à l'utilisateur ou à son organisation**, ou il dispose d'une autorisation
   écrite explicite (mandat de pentest, programme de bug bounty avec scope couvrant la cible).
2. **L'environnement est staging/préprod** par défaut. Si l'utilisateur désigne la production,
   confirmer séparément et explicitement cette intention avant de continuer (ne pas la déduire
   d'une réponse générale donnée plus haut dans la conversation).
3. **Le périmètre est borné** : domaine(s)/IP exact(s), hors de ce périmètre = hors scope, même
   si un lien y mène pendant le test.
4. **Aucune donnée réelle d'utilisateur n'est manipulée** : utiliser des comptes de test dédiés,
   jamais des comptes ou données de production réelles, même en lecture si évitable.

Si l'un de ces points n'est pas vérifiable : s'arrêter et le signaler plutôt que de deviner.

## Principe — trouver pour corriger, pas pour exploiter

L'objectif est de produire un rapport de vulnérabilités exploitable par `/fix-feature`, pas de
démontrer une compromission complète. Dès qu'une faille est confirmée avec une preuve minimale
suffisante (ex: une requête qui prouve l'accès non autorisé), **arrêter l'exploitation à ce point**
— ne pas aller plus loin (extraction massive de données, pivot vers d'autres systèmes, écriture/
suppression de données réelles). Voir `references/safe-testing-practices.md`.

## Méthode

```
1. Gate d'autorisation (ci-dessus)        → bloquant
2. Reconnaissance passive                  → stack, surface exposée, en-têtes
3. Scan automatisé borné                   → outils standards, non destructif
4. Revue manuelle guidée                    → logique métier, checklist security
5. Validation et preuve minimale            → reproduire, documenter, ne pas exploiter plus
6. Rapport classé par sévérité              → même échelle que code-review
7. Nettoyage                                 → supprimer toute donnée/compte de test créé
8. Handoff correction                        → /fix-feature ou /modify-feature, jamais auto-appliqué ici
```

## Quelle référence charger

| Besoin | Référence |
|---|---|
| Vérifier/poser le périmètre et l'autorisation | `references/scope-and-authorization.md` |
| Lancer et interpréter des scans automatisés | `references/automated-scanning.md` |
| Dérouler une revue manuelle (logique métier, auth, accès) | `references/manual-testing-guide.md` |
| Règles de sécurité du test lui-même (non-destructif, nettoyage, rate limit) | `references/safe-testing-practices.md` |

Pour le détail des classes de vulnérabilités testées (brute force, session, transport, injection,
IDOR...), ce Skill s'appuie sur le Skill `security` et ses `references/` — ne pas dupliquer cette
checklist ici, y renvoyer.

## Sortie attendue

Rapport structuré (voir `/pentest-feature`), classé CRITICAL/HIGH/MEDIUM/LOW/INFO, chaque constat
avec : preuve reproductible (requête/réponse réelle, sans donnée sensible réelle), impact réel,
remédiation suggérée. Jamais de correction appliquée directement par ce Skill — le rapport
alimente `/fix-feature` ou `/modify-feature` avec validation humaine (CLAUDE.md §4).

## Confirmation obligatoire

Toute exécution de ce Skill nécessite la confirmation explicite de l'utilisateur sur la cible
exacte et l'environnement avant de lancer le moindre test actif — y compris un scan automatisé
réputé "sûr". Un scan mal ciblé contre une cible non autorisée reste un test non autorisé.
