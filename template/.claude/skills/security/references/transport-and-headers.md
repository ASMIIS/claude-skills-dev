# Transport, en-têtes, CORS, CSRF — attaque de l'homme du milieu (MITM)

## 1. TLS / HTTPS

- HTTPS **partout** (aucune page ni API en HTTP), redirection 301 HTTP→HTTPS, pas de contenu mixte.
- TLS ≥ 1.2 (1.3 préféré), suites modernes (AEAD, PFS), SSLv3/TLS 1.0/1.1 désactivés, certificats
  valides à renouvellement automatique et alerte d'expiration.
- **HSTS** : `Strict-Transport-Security: max-age=31536000; includeSubDomains` (+ `preload`
  seulement après avoir vérifié tous les sous-domaines — difficile à annuler). Monter
  progressivement le `max-age` (5 min → 1 sem → 1 an).
- **Interdit dans le code** : désactiver la vérification de certificat (`verify=False`,
  `rejectUnauthorized: false`, `InsecureSkipVerify`, `NODE_TLS_REJECT_UNAUTHORIZED=0`,
  `curl -k`), accepter tout certificat dans une app mobile, ignorer l'hostname.
- Communications **internes** (service à service, base de données, cache, files) chiffrées dès
  qu'elles traversent un réseau non strictement privé ; secrets jamais en clair sur le réseau.
- Mobile : pinning de certificat/clé publique avec plan de rotation, seulement pour risque élevé.
- E-mail/liens : tous les liens générés en `https://` ; URL de base lue en configuration.

## 2. En-têtes de sécurité (réponses HTML/API)

| En-tête | Valeur de départ |
|---|---|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'nonce-…'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'` — éviter `'unsafe-inline'`/`'unsafe-eval'` ; déployer d'abord en `Report-Only` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (ou `no-referrer` sur pages à jeton) |
| `Permissions-Policy` | désactiver caméra/micro/géoloc/paiement non utilisés |
| `frame-ancestors` (CSP) / `X-Frame-Options: DENY` | anti-clickjacking |
| `Cross-Origin-Opener-Policy` | `same-origin` (isolation) |
| `Cross-Origin-Resource-Policy` | `same-site`/`same-origin` pour ressources privées |
| `Cache-Control` | `no-store` sur réponses authentifiées/sensibles |
| Suppression | retirer `Server`/`X-Powered-By` détaillés |

Vérifier sur la **réponse réelle** (curl -I / outils navigateur), derrière CDN/reverse-proxy, pas
seulement dans le code. Une CSP trop permissive (`*`, `unsafe-inline`) ne protège pas : le signaler.

## 3. CORS

- Liste blanche **explicite** d'origines ; jamais `Access-Control-Allow-Origin: *` avec cookies
  ou données privées ; ne pas refléter aveuglément l'en-tête `Origin` ; ne pas autoriser `null`.
- `Allow-Credentials: true` uniquement avec origine précise ; méthodes et en-têtes limités ;
  `Vary: Origin`. CORS n'est **pas** une protection serveur : l'autorisation reste vérifiée côté API.

## 4. CSRF

Pour toute requête modifiant l'état avec authentification par cookie :
- Aucune modification d'état en `GET`.
- Cookies `SameSite=Lax/Strict` **et** token anti-CSRF (synchronizer token ou double-submit signé)
  **et/ou** vérification de `Origin`/`Sec-Fetch-Site`.
- API JSON avec jeton `Authorization` en en-tête (non cookie) : CSRF non applicable, mais CORS strict.
- Actions sensibles : ré-authentification ou confirmation.

## 5. Autres vecteurs réseau / protocole

- **Open redirect** : redirections post-login vers une liste blanche / chemins relatifs uniquement.
- **Host header injection** : valider l'hôte, ne pas construire de liens (reset password) depuis
  `Host`/`X-Forwarded-Host` non fiable.
- **SSRF** : voir checklist principale (liste blanche, blocage des IP internes/metadata cloud).
- **DNS rebinding / subdomain takeover** : retirer les enregistrements DNS orphelins.
- **WebSocket/SSE** : authentifier à l'ouverture, valider `Origin`, `wss://` uniquement.
- **Proxy de confiance** : ne faire confiance à `X-Forwarded-*` que depuis les proxies connus.
- **Cookies partagés / sous-domaines** : voir `sessions-and-tokens.md`.

## 6. Test rapide de configuration

```
curl -sI https://exemple.tld | grep -i -E "strict-transport|content-security|x-content-type|referrer|frame|permissions"
curl -sI http://exemple.tld   # doit répondre 301 vers https
```
Compléter par un scanner de configuration TLS/en-têtes en préproduction (outil au choix du projet).
