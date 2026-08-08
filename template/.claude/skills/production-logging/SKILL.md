---
name: production-logging
description: Garantir que l'application dispose d'une observabilité applicative exploitable en production — logs structurés aux bons niveaux sans données sensibles, métriques, traces, correlation ID, health checks, error tracking et alertes. Le logging n'est qu'une partie de l'observabilité couverte par ce Skill. Utiliser ce Skill lors de /audit-logs, lors de l'ajout d'une feature introduisant un comportement critique (paiement, auth, opération métier importante), et chaque fois qu'un incident de production révèle une observabilité insuffisante. Ne jamais remplacer un système existant fonctionnel sans raison, et éviter la multiplication d'outils — vérifier d'abord ce que la plateforme fournit déjà (voir Skill production-readiness) avant d'en ajouter un nouveau.
---

# Production Logging & Observability

## Principe fondamental — conserver l'existant

Avant de construire ou modifier le logging ou l'observabilité au sens large :

```
1. Vérifier l'existant
2. Identifier le(s) système(s) utilisé(s) — logs, métriques, traces, alerting
3. Identifier les destinations
4. Identifier les niveaux / seuils
5. Identifier les informations déjà présentes
6. Identifier les problèmes
7. Compléter uniquement ce qui manque
```

Ne pas remplacer un système existant fonctionnel sans raison forte, et ne pas multiplier les
outils : avant d'ajouter un outil externe (ex: Sentry, Datadog, Grafana, OpenTelemetry, ELK ou
équivalent), analyser ce que la plateforme de production fournit déjà (voir Skill
`production-readiness` → `references/observability.md`) — un outil supplémentaire ne se justifie
que si un besoin réel n'est pas déjà couvert.

## Vérification du système existant

Analyser : logger utilisé, niveaux disponibles, format (texte libre vs structuré), destination
(stdout, fichier, service centralisé), persistance, centralisation, correlation IDs, intégration
avec un outil de error tracking, différences de configuration entre environnements.

Classer l'état constaté : development only, production ready, partiellement configuré, absent,
mal configuré.

## Production-ready — logs structurés

Si les logs sont absents ou insuffisants, privilégier un format structuré (JSON ou équivalent)
plutôt que du texte libre, adapté à la stack du projet — ne pas imposer un format générique sans
tenir compte des conventions déjà en place s'il en existe. Exemple de structure (à adapter, ne
jamais copier littéralement) :

```json
{
  "level": "error",
  "timestamp": "2026-08-08T12:00:00Z",
  "service": "api",
  "environment": "production",
  "requestId": "abc123",
  "message": "Payment request failed",
  "errorCode": "PAYMENT_PROVIDER_ERROR"
}
```

## Niveaux de log

Utiliser une convention cohérente (`DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL` ou équivalents du
framework) et les niveaux correctement — éviter `console.log` brut pour une information critique
de production, et éviter de tout logger en `ERROR` par facilité (ce qui rend le niveau inutile
pour le tri des alertes).

## Données sensibles — règle absolue

**Ne jamais logger** : mots de passe, clés API, tokens d'accès, tokens de rafraîchissement, clés
privées, secrets de session, données de carte bancaire, secrets d'authentification.

Éviter également de logger inutilement, quand ce n'est pas nécessaire au diagnostic : email,
téléphone, adresse, données de santé, identifiants personnels, corps de requête complet. Ces
données personnelles doivent être considérées conformément au Skill `legal-compliance` — leur
présence dans des logs conservés est un traitement de données personnelles comme un autre.

## Correlation / Request ID

Pour les applications backend ou distribuées, utiliser un identifiant de suivi (`requestId`,
`correlationId`, `traceId`) permettant de retrouver un même contexte à travers les couches
(frontend → API → service → base de données → API externe) lorsque l'architecture le permet. Ne
jamais exposer au client des informations internes sensibles simplement parce qu'un correlation ID
existe.

## Logs d'erreur

Une erreur importante doit permettre de comprendre : quoi, où, quand, quelle requête, quel
service, quelle opération, quel type d'erreur. Conserver stack trace, code d'erreur, request ID et
contexte pertinent — sans exposer de données sensibles.

## Environnements

Le comportement peut différer : logs détaillés et lisibles en développement, logs structurés et
contrôlés en production. Ne pas désactiver les logs critiques en production. Ne pas laisser des
logs de debug très verbeux actifs en production sans justification (coût, bruit, risque
d'exposition de données).

## Rotation et rétention

Si l'application gère elle-même le stockage des logs, vérifier rotation, rétention, taille,
archivage, suppression, coût, confidentialité. Si un fournisseur externe gère la rétention,
documenter cette responsabilité dans `docs/operations/observability.md`. La conservation de logs
contenant des données personnelles doit être cohérente avec `docs/compliance/data-retention.md`
et le Skill `legal-compliance`.

## Observabilité au-delà des logs

Ce Skill couvre l'observabilité applicative dans son ensemble, pas uniquement les logs :

- **Métriques et traces** — voir `references/metrics-and-traces.md`
- **Health checks et alertes** — voir `references/health-checks-and-alerts.md`

Le but n'est pas de construire une infrastructure d'observabilité maximale, mais une visibilité
suffisante pour diagnostiquer un problème de production réel — identifier ce qui existe déjà
(logs, métriques, traces, error tracking, alertes) et documenter l'état réel avant de compléter
uniquement ce qui manque (CLAUDE.md §19).

## Logging lors d'une nouvelle feature

Lorsqu'une feature introduit un comportement critique (échec d'authentification, échec de
paiement, opération métier importante, échec d'appel à un service externe, événement de
sécurité, échec de job en arrière-plan, échec de migration de données), vérifier que ces
événements sont observables. Ne pas logger chaque action utilisateur sans raison — l'objectif est
de pouvoir diagnostiquer une défaillance de production, pas de tout tracer.

## Références détaillées

- `references/log-levels.md` — convention et usage correct des niveaux
- `references/structured-logging.md` — format structuré, cohérence
- `references/security.md` — données sensibles à ne jamais logger
- `references/correlation.md` — request/correlation ID
- `references/production.md` — configuration par environnement, rotation, rétention
- `references/metrics-and-traces.md` — métriques applicatives et traces distribuées
- `references/health-checks-and-alerts.md` — health checks, seuils d'alerte, error tracking
