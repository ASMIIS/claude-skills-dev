# E-commerce — vérifications techniques et fonctionnelles

Applicable uniquement si le projet vend des biens/services à des consommateurs. Vérifier, selon
ce qui est réellement présent dans le produit :

- **Informations précontractuelles** — caractéristiques du produit/service, prix total (TTC),
  frais additionnels, modalités de paiement/livraison/exécution, identité du professionnel
- **Prix et TVA** — affichage cohérent, calcul correct, devise claire
- **Commande** — récapitulatif avant validation, double-clic/confirmation explicite avant
  engagement payant, email de confirmation
- **Droit de rétractation** — délai correctement implémenté, exceptions au droit de rétractation
  correctement appliquées (pas présumées par défaut), procédure d'exercice accessible
- **Paiement** — sécurisation (voir Skill `security`), traçabilité des transactions
- **Remboursement** — délai et mécanisme réellement fonctionnels
- **Abonnement / renouvellement** — information claire sur la reconduction, résiliation aussi
  simple que la souscription, rappel avant renouvellement lorsque requis
- **Garanties** — information sur les garanties légales, non substituées silencieusement par une
  garantie commerciale plus restrictive
- **Réclamations** — canal accessible, traçabilité

## Méthode

Pour chaque point vérifié, indiquer s'il est implémenté, partiellement implémenté, absent, ou non
applicable au modèle du produit — ne pas dérouler la checklist entière si le produit n'est
manifestement pas concerné par une section (ex: pas d'abonnement dans le produit).
