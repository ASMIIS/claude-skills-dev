# Transactions

## Quand utiliser une transaction

Toute séquence d'opérations qui doit réussir ou échouer ensemble (ex: débiter un compte et créer
un enregistrement de paiement) doit être englobée dans une transaction — ne pas laisser un état
intermédiaire incohérent possible si une des opérations échoue.

## Points à vérifier

- La transaction couvre exactement les opérations qui doivent être atomiques — ni plus (transaction
  trop large qui bloque inutilement d'autres accès) ni moins (opérations liées laissées hors
  transaction, risque d'incohérence).
- Le niveau d'isolation utilisé est cohérent avec le besoin (éviter les lectures sales/non
  répétables quand la logique métier l'exige, sans imposer systématiquement le niveau le plus
  strict si non nécessaire).
- Les erreurs déclenchent bien un rollback — vérifier que le code de gestion d'erreur ne masque
  pas un échec partiel silencieux.
- Pas d'appel réseau ou d'opération lente à l'intérieur d'une transaction si évitable (risque de
  blocage prolongé).

## Concurrence

Pour les opérations sensibles à la concurrence (ex: décrémenter un stock, garantir l'unicité d'une
action), vérifier le mécanisme utilisé : verrou pessimiste, verrou optimiste, contrainte unique en
base — et qu'il correspond réellement au besoin métier plutôt que de supposer qu'aucune
concurrence ne se produira.
