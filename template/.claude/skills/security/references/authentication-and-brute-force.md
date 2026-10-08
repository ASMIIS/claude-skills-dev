# Authentification et anti brute-force

S'applique à : login, inscription, réinitialisation de mot de passe, OTP/MFA, API keys, magic
links, vérification d'e-mail/SMS, changement d'e-mail/mot de passe, toute vérification d'un secret
devinable.

## 1. Principe

Un attaquant tente un grand nombre de devinettes (brute force : un compte, beaucoup de mots de
passe ; credential stuffing : beaucoup de comptes, identifiants fuités ; password spraying : un mot
de passe courant, beaucoup de comptes). **Tout point d'entrée qui vérifie un secret doit limiter le
nombre de tentatives**, par plusieurs clés à la fois, sans créer un déni de service sur le compte.

## 2. Contrôles obligatoires sur login

| Contrôle | Exigence |
|---|---|
| Limitation par **compte** | ex. ≥ 5 échecs consécutifs → délai progressif (1 s, 2 s, 4 s … plafonné) ou verrouillage **temporaire** (15 min) + notification |
| Limitation par **IP** | seuil plus large (ex. 20-100 / 15 min) car IP partagées (NAT) ; clé IP fiable (voir `rate-limiting-and-abuse.md`) |
| Limitation par **couple (IP, compte)** et globale | détecte le spraying/stuffing distribué |
| Pas de verrouillage **permanent** | sinon DoS : un tiers bloque la victime. Verrou temporaire/progressif + déblocage par e-mail |
| Défi anti-bot | CAPTCHA/PoW/challenge après N échecs, jamais dès la 1re tentative légitime |
| MFA | TOTP/WebAuthn/passkeys proposés (obligatoires pour admin/comptes sensibles) ; codes de secours hachés |
| Mots de passe compromis | refuser ceux présents dans des fuites (API k-anonymity type HIBP ou liste locale) |
| Détection | alerter sur pics d'échecs, nouvelle IP/appareil/pays, succès après nombreux échecs |

## 3. Messages et énumération de comptes

- Message **identique** pour « compte inconnu » et « mot de passe faux » (« Identifiants incorrects »).
- Temps de réponse indistinguable : exécuter la vérification de hash même si le compte n'existe pas
  (hash factice) ; pas de réponse plus rapide quand l'utilisateur n'existe pas.
- Mêmes règles pour inscription (« si cet e-mail est valide, un message a été envoyé »),
  réinitialisation et renvoi de lien. Codes HTTP et corps identiques.

## 4. Stockage des mots de passe

- Hash lent et salé : **Argon2id** (recommandé ; ≥ 19 Mio mémoire, ≥ 2 itérations, 1 parallélisme
  comme plancher OWASP — viser plus), sinon scrypt, sinon bcrypt (coût ≥ 10, limite de 72 octets),
  ou PBKDF2 conforme FIPS (≥ 600 000 itérations SHA-256).
- Jamais MD5/SHA-1/SHA-256 simple, jamais chiffrement réversible, jamais en clair, jamais loggé.
- Ré-hachage transparent à la connexion si les paramètres ont été relevés.
- Politique (NIST 800-63B) : longueur minimale ≥ 8 (≥ 15 si mot de passe seul), accepter ≥ 64
  caractères et tous caractères (espaces, Unicode), pas de règles de composition ni de rotation
  forcée sans suspicion de compromission, coller autorisé (gestionnaires de mots de passe).

## 5. Réinitialisation / récupération

- Jeton : CSPRNG ≥ 128 bits, **stocké haché** en base, usage unique, expiration courte
  (15-60 min), lié au compte, invalidé après usage, après changement de mot de passe et si une
  nouvelle demande est faite.
- Limiter les demandes (par compte, par IP) pour éviter spam et énumération ; lien envoyé à
  l'e-mail enregistré uniquement ; jamais de question secrète ; pas de jeton dans les logs ni dans
  le `Referer` (redirection + `Referrer-Policy: no-referrer` sur cette page).
- Après réinitialisation : **révoquer toutes les sessions et refresh tokens**, notifier l'utilisateur,
  exiger la ré-authentification pour changer e-mail/MFA.
- Comparer les jetons en temps constant.

## 6. OTP, codes à 6 chiffres, magic links

- 6 chiffres = 1 000 000 de possibilités : **max 3-5 tentatives par code**, expiration ≤ 10 min,
  usage unique, invalidation au-delà, limitation par compte + IP.
- Magic link : jeton ≥ 128 bits, usage unique, expiration courte, lié à l'appareil/navigateur si
  possible.
- SMS : limiter l'envoi (coût et abus — SMS pumping), plafond par numéro/IP/jour.

## 7. API keys, tokens d'accès, webhooks

- Clés longues aléatoires (≥ 128 bits), préfixe identifiable, stockées hachées, révocables,
  scopées au moindre privilège, rotation possible, limitation par clé.
- Webhooks entrants : vérifier la signature HMAC (comparaison en temps constant), horodatage +
  fenêtre de tolérance (anti-rejeu), idempotence.
- Ne jamais comparer des secrets avec `==` (utiliser `timingSafeEqual` / `hmac.compare_digest` /
  équivalent).

## 8. Actions sensibles

Ré-authentification (mot de passe ou MFA récent) avant : changement d'e-mail, mot de passe, MFA,
suppression de compte, ajout de moyen de paiement, création de clé API, élévation de privilège.
Notification (e-mail) à l'utilisateur pour chaque changement de sécurité.

## 9. Trace et alertes

Journaliser (sans mot de passe, jeton ni secret — Skill `production-logging` → `security.md`) :
échecs/succès de connexion, verrouillages, resets, changements MFA, création de clé, avec ID de
corrélation, IP et user-agent. Alerter sur anomalies. Rétention conforme à
`legal-compliance`.

## 10. Signaux de défaut (constats à remonter)

Login/reset/OTP sans aucune limitation (HIGH, CRITICAL si comptes admin ou données sensibles) ·
messages distincts selon l'existence du compte · hash rapide · jeton de reset prévisible ou
persistant · OTP sans compteur d'essais · verrouillage permanent exploitable · limite basée sur un
en-tête falsifiable · secret comparé avec `==`.
