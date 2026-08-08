# Compatibilité ascendante des API

## Méthode

Avant de modifier le contrat d'une API existante :

1. Rechercher tous les consommateurs réels (frontend, autres services, intégrations tierces,
   tests) — voir Skill `project-analysis`.
2. Déterminer si le changement est rétrocompatible :
   - **Rétrocompatible** (généralement sûr) : ajout d'un champ optionnel en réponse, ajout d'un
     paramètre optionnel en requête, ajout d'un nouvel endpoint.
   - **Breaking change** (nécessite prudence) : suppression/renommage d'un champ, changement de
     type, changement de statut HTTP retourné, changement de comportement par défaut, suppression
     d'un endpoint.
3. Pour un breaking change, privilégier la séquence progressive plutôt qu'une rupture immédiate :

```
Changement rétrocompatible ajouté → migration des consommateurs → bascule progressive
→ suppression de l'ancien comportement une fois plus aucun consommateur ne l'utilise
```

4. Obtenir confirmation explicite de l'utilisateur avant un breaking change réel (CLAUDE.md §4).
5. Mettre à jour `frontend/docs/api/README.md` (ou équivalent) dans le même changement que le
   code — jamais après coup.

## Cas particulier — consommateurs externes non maîtrisés

Si l'API a des consommateurs externes (partenaires, clients tiers) dont le code n'est pas
accessible à l'analyse : traiter tout changement de contrat comme potentiellement breaking par
défaut, même s'il semble mineur, et privilégier le versionnage (`versioning.md`) plutôt qu'une
modification en place.
