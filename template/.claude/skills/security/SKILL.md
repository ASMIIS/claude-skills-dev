---
name: security
description: Vérifier systématiquement les implications de sécurité de toute modification touchant l'authentification, les permissions, les entrées utilisateur, les fichiers, les requêtes réseau, les données sensibles ou les secrets. Utiliser ce Skill avant de considérer terminée toute tâche de /add-feature, /modify-feature ou /fix-feature qui touche une de ces zones, et systématiquement lors d'un /audit-feature. La sécurité est une contrainte non négociable : en cas de doute sérieux, arrêter et signaler plutôt que de deviner.
---

# Security

## Principe

La sécurité est prioritaire sur la vitesse de livraison. Ne jamais introduire volontairement une
faille de sécurité, même pour satisfaire une demande explicite qui l'impliquerait sans le
formuler ainsi. Toute donnée contrôlée par l'utilisateur (body, query params, headers, cookies,
fichiers uploadés, paramètres d'URL) est **non fiable** jusqu'à validation côté serveur — une
validation frontend n'est jamais considérée comme une protection suffisante.

Si une modification crée un doute sérieux sur la sécurité, arrêter l'implémentation et signaler
le problème plutôt que de continuer en espérant que ça passe.

## Checklist — classes de vulnérabilités à considérer systématiquement

Pour toute modification touchant entrée utilisateur, requête, fichier, auth ou données :

| Catégorie | Points à vérifier |
|---|---|
| Injection | SQL Injection, NoSQL Injection, Command Injection |
| Web | XSS, CSRF, SSRF, Path Traversal |
| Accès | IDOR, Broken Access Control, Privilege Escalation |
| Auth | Authentication bypass, Authorization bypass |
| Données | Sensitive data exposure, secrets dans le code, secrets dans les logs |
| Entrées | Improper input validation, Mass assignment, Insecure deserialization |
| Fichiers | Unsafe file upload (type, taille, contenu, chemin de destination) |
| Autres | Race conditions, Weak cryptography |
| Abus | Brute force, credential stuffing, énumération de comptes, absence de rate limiting, DoS applicatif |
| Session / transport | Session fixation/hijacking, MITM (TLS désactivé/absent), cookies non sécurisés, CORS permissif, CSRF, clickjacking, open redirect |

## Vérifications systématiques

- **Authentification** — la route/action nécessite-t-elle bien d'être authentifiée, et est-ce
  vérifié côté serveur ?
- **Autorisation** — l'utilisateur a-t-il le droit d'agir sur *cette* ressource précise (pas
  seulement sur des ressources de ce type en général) ? Chercher les cas d'IDOR : un ID passé en
  paramètre suffit-il à accéder à une ressource sans vérifier son propriétaire ?
- **Validation des entrées** — type, format, longueur, plage de valeurs, whitelist plutôt que
  blacklist quand possible ; validation côté serveur systématique, quelle que soit la validation
  frontend déjà en place.
- **Exposition des données** — la réponse renvoie-t-elle des champs sensibles non nécessaires
  (mots de passe hashés, tokens internes, données d'un autre utilisateur) ?
- **Gestion des secrets** — aucun secret en dur dans le code, aucun secret loggé, utilisation du
  mécanisme de configuration existant du projet.
- **Logs et erreurs** — les messages d'erreur exposés au client ne doivent pas révéler de détails
  d'implémentation sensibles (stack trace, requête SQL, chemin serveur).
- **Fichiers uploadés** — validation du type réel (pas seulement l'extension), limite de taille,
  nom de fichier assaini, stockage hors de portée d'exécution directe si pertinent.
- **URLs externes / SSRF** — toute requête serveur vers une URL fournie par l'utilisateur doit
  être validée (whitelist de domaines/schémas, pas d'accès aux plages IP internes).
- **Endpoints publics** — vérifier qu'aucun endpoint destiné à être interne n'est exposé sans
  protection par erreur.

## Anti-abus, sessions et transport — contrôle permanent

Toute modification touchant login, inscription, reset, OTP/MFA, session, cookie, token, API
publique, CORS, en-têtes, TLS/proxy ou envoi d'e-mail/SMS déclenche **obligatoirement** les
références ci-dessous. Ces protections doivent rester vraies après chaque changement : ne jamais
les affaiblir, les contourner « temporairement » ou les désactiver pour un test.

| Menace | Défense minimale à constater (preuve) | Référence |
|---|---|---|
| Brute force, credential stuffing, spraying, énumération de comptes | limitation par compte + IP, délai progressif/verrou temporaire, message générique, hash Argon2id/bcrypt, MFA, OTP à essais bornés | `references/authentication-and-brute-force.md` |
| Vol / fixation de session, XSS→session, jeton volé | cookie `HttpOnly; Secure; SameSite`, ID régénéré au login, invalidation serveur, expiration, refresh tokens en rotation | `references/sessions-and-tokens.md` |
| Homme du milieu, downgrade, CSRF, CORS, clickjacking | HTTPS + HSTS, TLS vérifié partout, CSP/en-têtes, CORS en liste blanche, anti-CSRF | `references/transport-and-headers.md` |
| Rafales de requêtes, abus de coût, DoS applicatif | rate limiting multi-clés (edge + app), `429`, IP cliente fiable, tailles/timeouts bornés | `references/rate-limiting-and-abuse.md` |
| Régression silencieuse de ces protections | recherche statique + tests + inspection des réponses réelles | `references/verification-checklist.md` |

Un endpoint qui vérifie un secret (mot de passe, code, jeton) **sans limitation de tentatives** est
un défaut de sévérité HIGH au minimum (voir échelle dans la checklist de vérification). Ne pas
déclarer la gate 6 `PASS` sans avoir produit la table de synthèse de `verification-checklist.md`
pour les points d'entrée touchés.

## Méthode

1. Identifier si la modification touche une des zones ci-dessus. Si non, ce Skill peut être
   passé rapidement (le mentionner brièvement plutôt que de le sauter silencieusement).
2. Si oui, dérouler la checklist pertinente pour la nature exacte du changement (pas la checklist
   entière si elle n'est pas pertinente — rester ciblé et concret).
3. Pour chaque point vérifié, indiquer explicitement ce qui a été contrôlé et le résultat.
4. Si un problème est trouvé : le corriger avant de considérer la tâche terminée, ou si la
   correction dépasse le périmètre de la tâche, le signaler clairement à l'utilisateur avec sa
   sévérité (voir échelle du Skill `code-review`).

## Travailler avec le Skill `legal-compliance`

Toute modification touchant des données personnelles doit déclencher une réflexion sécurité **et**
conformité conjointe (voir Skill `legal-compliance`) : une obligation de protection des données
peut imposer des mesures techniques précises (chiffrement, contrôle d'accès, logs, rétention,
suppression effective, sauvegardes, authentification, minimisation) qui vont au-delà de la
sécurité générique. Ce Skill couvre le "comment sécuriser techniquement" ; `legal-compliance`
couvre le "pourquoi c'est requis et dans quelle mesure" — les deux sont complémentaires, pas
substituables l'un à l'autre.

## Confirmation obligatoire

Toute modification touchant un mécanisme de sécurité existant (auth, permissions, chiffrement,
validation) nécessite une confirmation explicite de l'utilisateur avant d'être appliquée, même si
la demande initiale semblait l'inclure implicitement.
