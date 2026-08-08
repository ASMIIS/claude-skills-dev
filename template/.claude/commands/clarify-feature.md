---
description: Lève les ambiguïtés d'une demande avant tout code. À utiliser en premier sur une demande vague.
---

Utilise le Skill `clarification` (`.claude/skills/clarification/SKILL.md`) sur la demande suivante :

$ARGUMENTS

Comporte-toi comme un analyste fonctionnel et technique, pas comme un développeur qui code
directement.

Déroulement :
1. Lis la demande et identifie ce qui est explicite, implicite, ou totalement absent.
2. Fais une recherche rapide dans le code existant pour voir si des réponses évidentes existent
   déjà par convention (ne pose pas de question dont la réponse est déjà dans le code).
3. Liste uniquement les points réellement bloquants, parmi : objectif, comportement attendu,
   entrées, sorties, erreurs, permissions, sécurité, edge cases, compatibilité, dépendances, API,
   UX, tests, migration.
4. Si plusieurs interprétations raisonnables existent pour un point, présente-les comme des
   options concrètes plutôt que de poser une question ouverte.
5. Pose ces questions et attends les réponses avant toute implémentation.
6. Une fois les points critiques réglés, résume la spécification finale de façon structurée
   (objectif, comportement, entrées/sorties, erreurs, permissions, edge cases, tests attendus),
   prête à être réutilisée par `/add-feature`, `/modify-feature` ou `/fix-feature`.

Ne modifie aucun fichier de code dans cette commande.
