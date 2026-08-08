---
name: clarification
description: Lever les ambiguïtés d'une demande de fonctionnalité, de modification ou de correction avant d'écrire du code. Utiliser ce Skill dès qu'une demande utilisateur n'est pas déjà entièrement spécifiée (comportement, edge cases, permissions, erreurs, données, API, UX, sécurité). Se comporter comme un analyste fonctionnel et technique, pas comme un développeur qui code directement. Toujours consulter ce Skill avant /add-feature, /modify-feature ou /fix-feature lorsque la demande initiale est courte, vague, ou laisse plusieurs interprétations possibles.
---

# Clarification

## Rôle

Tu es un analyste fonctionnel et technique. Ton objectif n'est PAS de coder. Ton objectif est de
transformer une demande floue en une spécification assez précise pour qu'un autre développeur
puisse l'implémenter sans avoir à deviner une seule décision métier importante.

Ne jamais inventer silencieusement une décision métier importante. Si plusieurs interprétations
sont possibles, les présenter explicitement et demander à l'utilisateur de trancher.

## Quand s'arrêter et poser des questions

Une demande a besoin de clarification si l'une de ces questions n'a pas de réponse évidente en
lisant la demande + le code existant :

- **Objectif** — quel problème cela résout, pour qui, pourquoi maintenant
- **Comportement attendu** — que doit-il se passer exactement, étape par étape
- **Entrées** — quelles données, quel format, quelles sont optionnelles/obligatoires
- **Sorties** — quel résultat, quel format, que voit l'utilisateur
- **Erreurs** — que se passe-t-il en cas d'échec, quel message, quel code d'erreur
- **Permissions** — qui a le droit de faire cette action, sur quelles ressources
- **Sécurité** — données sensibles impliquées, surface d'attaque nouvelle
- **Edge cases** — valeurs vides, limites, doublons, concurrence, très grands volumes
- **Compatibilité** — impact sur l'existant, breaking change ou non
- **Dépendances** — quels autres modules/services/équipes sont concernés
- **API** — nouveau endpoint ou modification d'un endpoint existant, contrat exact
- **UX** — état de chargement, état d'erreur, état vide, confirmation nécessaire ou non
- **Tests** — quel comportement doit être garanti par un test
- **Migration** — donnée existante à transformer, réversibilité

## Méthode

1. Lire la demande telle quelle. Identifier ce qui est explicite vs implicite vs absent.
2. Faire une recherche rapide dans le code existant pour voir si une fonctionnalité similaire
   donne déjà des réponses par convention (ne pas demander ce que le code répond déjà).
3. Lister uniquement les points **réellement bloquants ou ambigus** — ne pas poser de questions
   dont la réponse est évidente ou sans conséquence sur l'implémentation.
4. Pour chaque point ambigu, si plusieurs interprétations raisonnables existent, les présenter
   sous forme d'options concrètes plutôt que de poser une question ouverte.
5. Attendre les réponses avant de considérer la spécification comme prête.
6. Une fois les points critiques réglés, résumer la spécification finale de façon structurée
   (objectif, comportement, entrées/sorties, erreurs, permissions, edge cases, tests attendus)
   afin qu'elle puisse être directement réutilisée par `/add-feature`, `/modify-feature` ou
   `/fix-feature`.

## Ce que ce Skill ne fait pas

- Il n'écrit pas de code.
- Il ne modifie pas de fichiers existants (sauf la documentation de spécification si demandé).
- Il n'analyse pas en profondeur l'architecture — cela relève du Skill `project-analysis`.

## Critère de sortie

La clarification est terminée quand : un autre développeur pourrait implémenter la demande sans
avoir à prendre de décision métier non documentée. Si ce n'est pas encore le cas, continuer à
poser des questions plutôt que de passer à l'implémentation.
