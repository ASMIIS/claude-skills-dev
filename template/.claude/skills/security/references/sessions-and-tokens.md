# Sessions, cookies et tokens — vol et fixation de session

## 1. Cookies de session

```
Set-Cookie: __Host-sid=<id opaque>; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=...
```

| Attribut | Règle |
|---|---|
| `HttpOnly` | toujours : un XSS ne peut pas lire le cookie |
| `Secure` | toujours en production : jamais transmis en HTTP clair |
| `SameSite` | `Lax` par défaut, `Strict` pour apps sensibles ; `None` seulement si cross-site nécessaire (avec `Secure` + protection CSRF) |
| Préfixe `__Host-` | verrouille domaine/chemin/Secure, bloque l'écrasement par un sous-domaine |
| `Domain` | omis (cookie lié à l'hôte exact) sauf besoin documenté |
| Durée | cookie de session ou `Max-Age` aligné sur l'expiration serveur |

## 2. Identifiant de session

- Généré par un CSPRNG, ≥ 128 bits d'entropie, opaque (aucune information dedans), jamais dans
  l'URL, jamais dans un log.
- **Régénéré à chaque changement de privilège** (login, élévation, MFA validé, changement de mot de
  passe) → anti **fixation de session**. L'ancien identifiant est détruit.
- Stocké côté serveur (Redis/DB) avec : utilisateur, date de création, dernière activité, appareil/UA,
  IP indicative. Données de session sensibles jamais exposées au client.

## 3. Durée de vie et invalidation

- Timeout d'**inactivité** (ex. 15-30 min pour données sensibles) **et** durée **absolue** maximale
  (ex. 8-24 h ; « se souvenir de moi » = jeton séparé, révocable, durée limitée, ré-authentification
  pour actions sensibles).
- **Logout = invalidation côté serveur** (pas seulement effacer le cookie).
- Invalider tout après : changement de mot de passe, réinitialisation, désactivation du compte,
  suspicion de compromission, changement de MFA.
- Liste « Appareils connectés » avec révocation, notification de nouvelle connexion.
- Ne pas lier fermement une session à l'IP (mobile/NAT) ; utiliser la dérive d'IP/UA/pays comme
  **signal de risque** déclenchant une ré-authentification, pas comme rejet automatique.

## 4. Protéger contre le vol de session

| Vecteur | Défenses |
|---|---|
| XSS | échappement contextuel, CSP stricte (nonces), `HttpOnly`, pas de `innerHTML` avec données non fiables, sanitisation HTML, Trusted Types |
| Réseau (MITM, Wi-Fi public) | HTTPS partout, HSTS, cookie `Secure` (voir `transport-and-headers.md`) |
| Fixation | régénération de l'ID au login |
| CSRF (session abusée sans vol) | SameSite + token anti-CSRF + vérif Origin/Fetch-Metadata |
| Fuites | pas de session/token dans URL, logs, `Referer`, analytics, messages d'erreur |
| Malware / appareil volé | expiration, révocation, ré-auth sensible, MFA |
| Sous-domaine compromis / cookie tossing | `__Host-`, pas de `Domain`, sous-domaines non fiables isolés |
| Cache partagé | `Cache-Control: no-store` sur réponses authentifiées sensibles |

## 5. JWT et tokens d'accès

- Préférer une session serveur opaque pour une app web classique ; un JWT n'est pas une session
  (non révocable sans infrastructure supplémentaire).
- Si JWT : **algorithme imposé côté serveur** (rejeter `none` et la confusion HS/RS), vérifier
  signature, `exp`, `nbf`, `iss`, `aud`, ≤ 5-15 min de validité, clés en gestionnaire de secrets
  avec rotation (`kid`), pas de données sensibles dans le payload (lisible).
- **Refresh token** : opaque, longue durée mais **rotation à chaque usage avec détection de
  réutilisation** (réutilisation d'un ancien = révoquer toute la famille), stocké haché côté
  serveur, lié à l'appareil, révocable.
- Stockage navigateur : cookie `HttpOnly; Secure; SameSite` plutôt que `localStorage`/
  `sessionStorage` (accessibles à tout XSS). Mobile : Keychain/Keystore.
- OAuth/OIDC : flux Authorization Code + **PKCE**, paramètre `state` et `nonce`, URI de redirection
  en liste blanche exacte, pas de flux implicite, scopes minimaux.

## 6. Vérifications d'implémentation

- [ ] Flags du cookie lus dans la **réponse réelle** (pas seulement dans la config)
- [ ] ID régénéré au login (test : ID avant ≠ ID après)
- [ ] Logout / reset invalident côté serveur (test : ancien cookie rejeté)
- [ ] Expiration idle + absolue appliquée côté serveur
- [ ] Aucun token dans URL / logs / stockage persistant exposé au JS sans nécessité
- [ ] JWT : algorithme fixé, `exp/aud/iss` vérifiés, refresh en rotation
