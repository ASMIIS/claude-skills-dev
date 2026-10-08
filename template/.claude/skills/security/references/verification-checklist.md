# Vérification continue des protections (anti brute-force, MITM, vol de session)

À dérouler (a) à chaque modification touchant auth/session/réseau/en-têtes, (b) dans
`/audit-feature`, `/audit-project` et `/production-ready`. Chaque ligne : ✅ preuve / ❌ constat /
➖ N/A / `UNKNOWN`. Une preuve = code lu + test exécuté ou réponse HTTP réelle ; « doit être
configuré » n'est pas une preuve. Aucun contrôle n'est une garantie absolue : on démontre
l'**absence de défaut connu**, on ne certifie pas l'inviolabilité.

## A. Inventaire (toujours en premier)

Lister les points d'entrée à secret devinable ou à coût : login, signup, reset, OTP/MFA,
renvoi d'e-mail/SMS, API keys, webhooks, recherche, upload, export. Chacun doit apparaître dans
la table du bas avec sa limitation.

## B. Recherche statique (Grep) — signaux de défaut

| Motif à rechercher | Risque |
|---|---|
| `verify=False`, `rejectUnauthorized: false`, `InsecureSkipVerify`, `TLS_REJECT_UNAUTHORIZED=0`, `curl -k` | MITM |
| `http://` en dur (hors localhost/tests) | transport clair |
| `md5(`, `sha1(`, `sha256(` appliqué à un mot de passe ; `crypto.createHash` pour mots de passe | hash faible |
| `Math.random`, `random.random`, `rand()` pour jeton/ID/OTP | jeton prévisible |
| `==`/`===` comparant secret, token, signature, HMAC | attaque temporelle |
| `localStorage.setItem(...token...)`, token dans l'URL/query | vol via XSS/logs/Referer |
| cookie sans `HttpOnly`/`Secure`/`SameSite`, `secure: false`, `httpOnly: false` | vol de session |
| `Access-Control-Allow-Origin: *` avec credentials, reflet d'`Origin` | CORS permissif |
| `jwt.decode` sans vérification, `algorithms` absent, `none` | contournement d'auth |
| `X-Forwarded-For` lu directement comme IP | contournement du limiteur |
| `console.log`/`logger` avec password, token, authorization, cookie | secret en logs |
| `innerHTML`, `dangerouslySetInnerHTML`, `v-html`, `|safe` sur données non fiables | XSS → vol de session |
| Route d'auth sans middleware de limitation | brute force |
| `except: pass`/erreurs auth renvoyant le détail interne | fuite d'information |

## C. Tests automatisés à exiger (Skill `testing`)

Ajouter/maintenir des tests (ou, à défaut, une vérification manuelle documentée) :

- [ ] N+1 échecs de login → 429/verrou/délai ; succès normal après la fenêtre ; réponse identique
      compte inconnu / mot de passe faux (corps, code, ordre de grandeur du temps)
- [ ] Limite par compte **et** par IP effective derrière le proxy réel (IP cliente correcte)
- [ ] OTP : bloqué après le nombre d'essais, code expiré/usage unique rejeté
- [ ] Reset : jeton usage unique, expiré rejeté, ancien jeton invalidé, sessions révoquées après reset
- [ ] Session : ID régénéré au login ; logout invalide côté serveur (ancien cookie → 401) ;
      expirations idle/absolue
- [ ] Cookie de session : `HttpOnly`, `Secure`, `SameSite` présents dans la réponse
- [ ] CSRF : requête cross-origin modifiant l'état rejetée
- [ ] CORS : origine non autorisée sans en-têtes d'autorisation
- [ ] IDOR : utilisateur A ne lit/modifie pas la ressource de B
- [ ] En-têtes : HSTS, CSP, `nosniff`, frame-ancestors présents ; HTTP → 301 HTTPS
- [ ] JWT : jeton altéré, expiré, mauvais `aud`/`iss`, `alg:none` → rejetés
- [ ] Webhook : signature invalide / rejeu hors fenêtre → rejeté

## D. Vérification de l'environnement réel (`/production-ready`)

- [ ] `curl -sI` des en-têtes réels derrière CDN/proxy ; certificat valide + renouvellement
- [ ] Proxies de confiance configurés (IP cliente correcte dans les logs)
- [ ] Store de rate limiting partagé et disponible ; comportement en cas de panne défini
- [ ] Secrets de signature (session, JWT, HMAC) en gestionnaire de secrets, rotables, ≥ 256 bits
- [ ] Alertes sur pics 401/403/429 et échecs de login ; journalisation sans secrets

## E. Table de synthèse à produire dans le rapport

| Point d'entrée | Limitation (clé · seuil) | Message générique | Hash/jeton OK | Session/cookie OK | TLS/en-têtes OK | Preuve |
|---|---|---|---|---|---|---|

## F. Sévérité (échelle du Skill `code-review`)

- **CRITICAL** : contournement d'auth, session volable/fixable à distance, TLS désactivé en
  production, mots de passe en clair ou hash réversible, endpoint admin sans limitation ni MFA.
- **HIGH** : login/reset/OTP sans limitation, cookie de session sans `HttpOnly`/`Secure`,
  énumération de comptes, JWT sans vérification complète, CORS permissif avec credentials.
- **MEDIUM** : en-têtes manquants, durée de session excessive, IP cliente non fiable, absence de
  détection/alerte.
- **LOW/INFO** : durcissements (`__Host-`, Trusted Types, pinning), documentation manquante.

Un défaut de ces familles bloque la gate 6 tant qu'il n'est pas corrigé ou explicitement accepté
par l'utilisateur (CLAUDE.md §4). Modifier un mécanisme existant d'auth/sécurité exige sa
confirmation préalable.
