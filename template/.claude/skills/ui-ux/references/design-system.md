# Design System — analyse et respect de la DA du projet

## Objectif

S'assurer que `frontend/docs/design-system/README.md` reflète fidèlement la DA réellement
implémentée, et que toute nouvelle interface la respecte.

## Comment analyser la DA réelle

Avant de documenter ou d'appliquer une règle de DA, observer dans le code, selon ce qui existe
dans le projet :

- composants existants (bibliothèque interne ou externe : shadcn/ui, MUI, Chakra, custom...)
- fichiers de style (CSS/SCSS, CSS-in-JS, modules CSS)
- variables CSS / design tokens (`:root`, fichier de thème)
- configuration Tailwind (`tailwind.config.*`) — couleurs, spacing, breakpoints, fontFamily
- pages et layouts existants — structure récurrente
- bibliothèque d'icônes utilisée
- animations/transitions définies (CSS, Framer Motion, etc.)

Ne jamais déduire une valeur par supposition. Si une information ne peut pas être déterminée avec
certitude à partir du code, écrire `UNKNOWN` dans la documentation plutôt que d'inventer.

## Maintenir `frontend/docs/design-system/README.md` à jour

- Mettre à jour la section concernée dès qu'un token, composant ou pattern durable est
  ajouté/modifié/supprimé.
- Ne pas dupliquer le détail d'implémentation d'un composant ici — documenter l'usage et les
  règles, pas le code source.
- Si un `UNKNOWN` peut être résolu à l'occasion d'une tâche, le compléter.

## Gestion des incohérences existantes

Si la DA actuelle contient des incohérences (ex: 3 styles de bouton différents pour la même
action métier sans justification) :

1. Les identifier et les documenter (dans le rapport d'audit ou dans le README design-system).
2. Proposer une direction cohérente unique, basée sur le pattern le plus utilisé ou le plus
   récent — pas sur une préférence personnelle.
3. Ne pas corriger silencieusement à grande échelle sans passer par `/review-ui` ou une
   confirmation explicite si le changement est large (voir CLAUDE.md §4).

## Priorité de correction

Corriger au niveau du composant partagé plutôt que page par page :

```
Mauvais Button
    ↓
Corriger le composant Button
    ↓
Toutes les pages qui l'utilisent en bénéficient
```

Avant toute correction d'un composant partagé : identifier toutes ses utilisations et vérifier
qu'aucune ne dépend d'un comportement spécifique qui serait cassé par la correction.
