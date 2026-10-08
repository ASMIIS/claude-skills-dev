# Rate limiting et anti-abus

## 1. Où limiter

Défense en profondeur : **edge** (CDN/WAF/reverse proxy : volumétrie, bots, DDoS applicatif) +
**application** (logique métier : par compte, par route, par clé API). Une limite uniquement
côté frontend n'est pas une limite.

## 2. Quoi limiter (clés de limitation)

| Clé | Usage |
|---|---|
| IP (réseau /24 ou /64 pour IPv6 selon le cas) | trafic anonyme, premier filet |
| Compte / identifiant ciblé | login, reset, OTP — indépendamment de l'IP (attaque distribuée) |
| Session / utilisateur authentifié | API, actions coûteuses |
| Clé API / token | quotas clients |
| Route | seuils spécifiques aux endpoints sensibles |
| Global | plafond de sécurité pour protéger les dépendances |

## 3. Seuils de départ (à adapter, à documenter dans `docs/security/README.md`)

| Endpoint | Point de départ |
|---|---|
| Login | 5 échecs / compte / 15 min (délai progressif) · 20-100 / IP / 15 min |
| Reset mot de passe / renvoi e-mail | 3-5 / compte / h · 10 / IP / h |
| Vérification OTP / code | 3-5 essais par code |
| Inscription | 5-10 / IP / h |
| Envoi SMS / e-mail | plafond par destinataire, IP et jour (coût + abus) |
| Recherche / endpoints coûteux | 30-60 / min / utilisateur |
| API publique | quota par clé + burst limité |
| Upload / export | taille + nombre / période + concurrence |

Ce sont des **points de départ**, pas des vérités : calibrer sur le trafic réel (`UNKNOWN` tant
que non mesuré — le dire).

## 4. Implémentation

- Algorithme : fenêtre glissante ou token bucket ; compteurs **atomiques** (Redis `INCR`+`EXPIRE`
  ou script Lua) pour éviter les races ; stockage **partagé** si plusieurs instances (jamais un
  compteur en mémoire locale derrière un load balancer).
- Réponse : `429 Too Many Requests` + `Retry-After` ; corps générique ; pas d'indice sur le seuil
  exact pour les endpoints d'auth.
- Fail-closed pour auth/OTP si le store de limitation est indisponible (ou fail-open documenté et
  surveillé pour les endpoints non sensibles).
- **IP cliente fiable** : configurer explicitement les proxies de confiance ; ne jamais prendre
  `X-Forwarded-For` brut (falsifiable → contournement du limiteur et logs trompeurs).
- Ralentissement progressif (backoff) et CAPTCHA/PoW après échecs plutôt que blocage dur.
- Exceptions : health checks, crawlers vérifiés (reverse DNS), allow-list d'intégrations.
- Ne pas créer d'oracle : limiter aussi les réponses « existe/n'existe pas ».

## 5. Autres abus à couvrir

- Taille des requêtes (`body` max), timeouts, nombre de connexions, profondeur/complexité GraphQL,
  pagination bornée (`limit` max), regex/parsing coûteux (ReDoS), décompression bombes, uploads.
- Opérations à effet de bord financier/e-mail/SMS : idempotence + quotas.
- Inscriptions et formulaires publics : honeypot, vérification e-mail, challenge, détection d'abus.
- Scraping / énumération d'IDs : IDs non séquentiels (UUID), contrôle d'accès par ressource (IDOR),
  quotas.
- Webhooks sortants : timeouts, retries bornés, pas de SSRF.

## 6. Surveillance

Métriques : taux de 401/403/429, échecs de login par minute, comptes verrouillés, pics par IP/ASN.
Alertes sur anomalies (Skill `production-logging`). Journaliser la décision de blocage sans données
sensibles. Prévoir une procédure de levée de blocage d'un utilisateur légitime.
