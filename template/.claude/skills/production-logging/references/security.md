# Sécurité des logs — données sensibles

## Ne jamais logger

Mots de passe, clés API, tokens d'accès/rafraîchissement, clés privées, secrets de session,
données de carte bancaire, tout secret d'authentification — y compris dans des logs de debug
temporaires, qui finissent souvent par rester en production par oubli.

## À éviter sauf nécessité de diagnostic explicite

Email, téléphone, adresse, données de santé, identifiants personnels, corps de requête complet
(qui peut contenir n'importe lequel des éléments ci-dessus sans qu'on l'ait anticipé). Si un corps
de requête doit être loggé pour le diagnostic, filtrer explicitement les champs sensibles avant
de logger plutôt que de logger l'objet brut.

## Méthode de vérification

Lors d'un `/audit-logs` ou d'une revue de code touchant au logging : rechercher les usages du
logger dans le code modifié/concerné et vérifier qu'aucun des éléments ci-dessus n'y figure,
directement ou via un objet non filtré (ex: `logger.info(user)` qui logge potentiellement le
hash de mot de passe ou d'autres champs sensibles du modèle utilisateur).

## Lien avec legal-compliance

La présence de données personnelles dans des logs conservés constitue un traitement de données
personnelles à part entière — leur durée de conservation doit être cohérente avec
`docs/compliance/data-retention.md` (voir Skill `legal-compliance`).
