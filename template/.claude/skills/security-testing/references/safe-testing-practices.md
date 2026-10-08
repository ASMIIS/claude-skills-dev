# Règles de sécurité du test lui-même

Le test ne doit jamais devenir un incident. Ces règles priment sur l'envie d'aller "un peu plus
loin pour confirmer" une fois la preuve obtenue.

## Arrêt à la preuve minimale

Dès qu'une requête démontre qu'une faille existe (ex: accès à la ressource d'un autre compte de
test, contournement d'une validation), **arrêter** : capturer la preuve, ne pas répéter l'action
à plus grande échelle, ne pas enchaîner vers un pivot plus large. Le but est la preuve, pas la
démonstration maximale.

## Non-destructif par défaut

- Jamais de suppression, modification en masse ou écrasement de données réelles.
- Jamais d'envoi en masse d'e-mails/SMS réels (même à des adresses de test, limiter le volume).
- Jamais de paiement réel déclenché, même en mode "test" si cela a un effet comptable réel.
- Si une faille ne peut être prouvée que par une action à effet réel : décrire le risque et
  demander une confirmation explicite avant de l'exécuter, plutôt que de la lancer directement.

## Respect du rate limiting et de la disponibilité

Ne pas générer un volume de requêtes susceptible de dégrader le service pour de vrais
utilisateurs, même en staging (d'autres équipes peuvent y travailler). Si un test nécessite un
volume (ex: confirmer un seuil de rate limiting), le borner au strict nécessaire pour observer le
comportement, pas pour le casser.

## Comptes et données de test

Créer des comptes dédiés avec des identifiants clairement reconnaissables (ex: préfixe
`pentest-`), ne jamais réutiliser un compte réel. Après le test : supprimer les comptes/données de
test créés, ou les signaler explicitement s'ils ne peuvent pas être supprimés automatiquement.

## Journalisation du test lui-même

Noter la fenêtre de temps du test, les comptes utilisés, les outils et leur version/templates.
Utile pour que l'équipe infra distingue un pic d'alertes lié au test d'un incident réel, et pour
qu'une anomalie observée en parallèle (vraie attaque pendant le test) ne soit pas confondue avec
le test.

## Secrets et données découverts pendant le test

Si le test révèle un vrai secret exposé (clé API, mot de passe, token) : ne pas l'utiliser au-delà
de la confirmation qu'il est valide et exploitable, ne jamais le faire figurer en clair dans le
rapport (le masquer partiellement), et signaler en priorité CRITICAL avec recommandation de
rotation immédiate.

## Après le test

Nettoyer tout ce qui a été créé pour les besoins du test (comptes, données, règles temporaires),
confirmer que la cible est dans un état équivalent à avant le test, puis produire le rapport
(voir `/pentest-feature`).
