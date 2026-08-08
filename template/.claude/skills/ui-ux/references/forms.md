# Formulaires

Vérifier systématiquement pour tout formulaire créé ou modifié :

- **Labels explicites** — chaque champ a un label visible et associé, pas seulement un placeholder
- **Validation** — côté client pour le feedback immédiat, **et toujours côté serveur** (voir
  Skill `security` — une validation frontend n'est jamais suffisante seule)
- **Messages d'erreur compréhensibles** — précis, associés au champ concerné, formulés pour
  l'utilisateur final (pas un message technique brut)
- **Indication des champs obligatoires** — convention claire et cohérente avec le reste du projet
- **États loading** — le formulaire indique clairement qu'une soumission est en cours
- **Prévention des doubles soumissions** — désactiver le bouton de soumission ou équivalent
  pendant le traitement
- **Conservation des données saisies** — en cas d'erreur de soumission, ne pas faire perdre à
  l'utilisateur ce qu'il a déjà saisi, sauf raison de sécurité explicite (ex: mot de passe)

## Méthode

Réutiliser les composants de formulaire existants (input, select, champ d'erreur) plutôt que d'en
recréer. Vérifier la cohérence avec `frontend/docs/design-system/README.md` → sections
`Inputs`/`Forms`. Dérouler le Skill `security` pour toute validation métier ou donnée sensible
transitant par le formulaire.
