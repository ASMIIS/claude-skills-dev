# Revue manuelle guidée

Complète le scan automatisé sur ce qu'un outil ne détecte pas bien : la **logique métier** et le
contrôle d'accès contextuel. Toujours avec des comptes de test dédiés.

## 1. Contrôle d'accès et IDOR

- Créer (ou utiliser) deux comptes de test de rôles différents (A et B, ou utilisateur/admin).
- Pour chaque ressource identifiée par un ID exposé (URL, paramètre, corps de requête) : avec le
  compte A authentifié, tenter d'accéder/modifier une ressource appartenant au compte B en
  changeant uniquement l'identifiant. Un accès réussi = IDOR confirmé (preuve : requête + réponse,
  sans exposer de vraie donnée sensible dans le rapport — la masquer).
- Vérifier aussi les actions (pas seulement la lecture) : suppression, modification de rôle,
  changement d'e-mail d'un autre compte.
- Vérifier les routes "admin"/internes : accessibles sans le rôle requis ?

## 2. Authentification et session (confirmation, pas exploitation prolongée)

- Vérifier qu'une tentative de connexion répétée déclenche bien la limitation documentée (quelques
  tentatives suffisent à le confirmer — ne pas poursuivre un brute force réel une fois le
  mécanisme constaté, qu'il soit présent ou absent).
- Vérifier les cookies de session dans la réponse réelle (flags), le comportement après logout
  (l'ancien cookie doit être rejeté), après reset de mot de passe (anciennes sessions révoquées).
- Tester un jeton de réinitialisation expiré ou déjà utilisé une seconde fois.

## 3. Validation des entrées et logique métier

- Paramètres de prix/quantité/remise manipulables côté client : la validation serveur rejette-t-elle
  une valeur incohérente (prix négatif, quantité hors limite, remise non autorisée) ?
- Workflow à étapes (paiement, inscription multi-étapes) : peut-on sauter une étape ou rejouer une
  étape déjà validée pour obtenir un état incohérent ?
- Upload de fichier : type réellement vérifié (pas seulement l'extension), nom de fichier assaini,
  pas d'exécution possible depuis le dossier de stockage.
- Export/API avec pagination : une limite très large (`limit=100000`) est-elle acceptée sans
  borne ?

## 4. CORS / CSRF en conditions réelles

- Depuis une origine différente de celle attendue, une requête modifiant l'état (ex: changer un
  paramètre de compte) est-elle acceptée sans jeton anti-CSRF ni vérification d'origine ?
- Les en-têtes CORS de la réponse réelle autorisent-ils une origine arbitraire avec `credentials`
  activés ?

## 5. Exposition d'information

- Messages d'erreur : contiennent-ils une stack trace, une requête SQL, un chemin serveur ?
- Réponses API : renvoient-elles des champs internes non nécessaires (hash de mot de passe, jetons
  internes, données d'un autre utilisateur) ?
- Fichiers/chemins exposés par erreur (`.env`, `.git/`, sauvegardes, fichiers de configuration).

## Documentation de chaque constat confirmé

```
Constat : <titre court>
Compte/contexte utilisé : <compte de test>
Étapes de reproduction : <requêtes exactes, sans donnée réelle sensible>
Preuve : <réponse observée, capture/extrait minimal>
Impact réel : <ce qu'un attaquant pourrait faire concrètement>
Sévérité : CRITICAL / HIGH / MEDIUM / LOW / INFO
Remédiation suggérée : <renvoi vers la référence security pertinente>
```

Arrêter la reproduction au minimum nécessaire pour la preuve — ne pas pousser plus loin "pour voir
jusqu'où ça va" (voir `safe-testing-practices.md`).
