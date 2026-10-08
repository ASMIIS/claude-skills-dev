# Scan automatisé — outils standards, usage borné

Utiliser des outils établis en mode **détection**, jamais en mode destructif/intrusif maximal.
Lancer depuis un environnement isolé (conteneur/VM dédiée), jamais depuis une machine qui contient
des secrets d'autres projets. Respecter le rate limiting réel de la cible — un scan trop agressif
contre une cible qui a un rate limiting bien implémenté est normal de voir des 429 : ne pas
contourner ce mécanisme pour "finir le scan", c'est hors scope de ce qu'on cherche à prouver.

## 1. Reconnaissance passive (toujours en premier, non intrusive)

- En-têtes de réponse réelle (`curl -I`), certificat TLS, technologies détectables (via les
  en-têtes, le favicon, les chemins publics connus) — jamais de brute-force de répertoires avant
  cette étape.
- `robots.txt`, `sitemap.xml`, pages d'erreur par défaut (révèlent souvent la stack).
- Sous-domaines déjà listés dans la documentation projet (`docs/PROJECT_CONTEXT.md`,
  `docs/operations/`) plutôt que de lancer une énumération DNS large sans besoin.

## 2. Scan de configuration (bas risque)

| Besoin | Outil type | Mode |
|---|---|---|
| En-têtes de sécurité, cookies | `curl -I`, extension navigateur, scanner d'en-têtes | lecture seule |
| Configuration TLS | `testssl.sh`, scanner TLS en ligne équivalent | lecture seule, pas de handshake abusif |
| Vulnérabilités connues (CVE) sur composants exposés | `nuclei` avec templates officiels à jour, mode non intrusif | détection par signature |
| Dépendances/CVE du code (si accès au repo) | Skill `dependencies` → `references/security.md` | statique, hors réseau |

## 3. Scan applicatif dynamique (DAST) — risque modéré, borné

- **OWASP ZAP** en mode *baseline* (passif + actif léger) plutôt que *full scan* agressif par
  défaut ; limiter la profondeur de crawl au périmètre défini ; exclure explicitement les
  endpoints de déconnexion, suppression de compte, paiement réel, envoi d'e-mail/SMS en masse.
- Authentification du scanner avec un **compte de test dédié**, jamais un compte admin réel sans
  nécessité justifiée et acceptée.
- Limiter la concurrence/le débit du scanner pour rester sous les seuils de rate limiting documentés
  (Skill `security` → `references/rate-limiting-and-abuse.md`) — l'objectif est de vérifier qu'ils
  existent, pas de les faire céder par volume.

## 4. Vérifications ciblées sur les classes déjà documentées

Réutiliser les points de contrôle du Skill `security` plutôt que d'improviser :

- Authentification / brute force → `security/references/authentication-and-brute-force.md`
  (vérifier la présence de la limitation, pas la "casser" par un brute force réel prolongé).
- Session / vol de session → `security/references/sessions-and-tokens.md`.
- Transport / MITM / en-têtes → `security/references/transport-and-headers.md`.
- Rate limiting → `security/references/rate-limiting-and-abuse.md`.
- Checklist de vérification complète → `security/references/verification-checklist.md`.

Pour l'injection (SQL/NoSQL/commande), XSS, SSRF, IDOR et désérialisation : utiliser les capacités
de **détection** des outils ci-dessus (ZAP, nuclei) sur le périmètre de test, dans un environnement
non-production avec des données de test — ne pas construire manuellement un exploit applicatif
pièce par pièce ; si un outil signale une piste positive, la confirmer avec la preuve minimale
strictement nécessaire (voir `safe-testing-practices.md`), puis arrêter et documenter.

## 5. Interprétation

- Un scanner produit des faux positifs : vérifier manuellement avant de reporter (preuve réelle,
  pas juste l'alerte brute de l'outil).
- Un résultat "clean" ne prouve pas l'absence de faille (couverture limitée) — le dire dans le
  rapport plutôt que de conclure à une sécurité absolue.
- Consigner les templates/règles utilisés et leur date pour pouvoir reproduire le scan plus tard.
