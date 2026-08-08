# WCAG et structure sémantique

## Niveau visé

Se référer au niveau WCAG visé par le projet s'il est documenté (`docs/development/accessibility.md`
ou `docs/compliance/` si une obligation légale s'applique — voir Skill `legal-compliance`). À
défaut d'indication explicite, viser WCAG AA comme référence par défaut raisonnable, sans
l'imposer comme une certitude légale.

## HTML sémantique

Utiliser les éléments natifs porteurs de sens plutôt que des conteneurs génériques stylés :
`button` pour une action, `a` pour une navigation, `nav`/`main`/`header`/`footer`/`aside` pour la
structure de page, listes (`ul`/`ol`) pour du contenu énuméré, titres (`h1`-`h6`) en hiérarchie
cohérente sans saut de niveau arbitraire.

## ARIA — quand et comment

N'utiliser ARIA que lorsque la sémantique HTML native ne suffit pas à exprimer le rôle, l'état ou
la relation. Ne jamais ajouter un rôle ARIA qui contredit le rôle natif de l'élément (ex:
`role="button"` sur un `<button>` est redondant et inutile ; l'ajouter sur un `<div>` cliquable
est nécessaire mais incomplet sans gestion du clavier associée — voir
`keyboard-and-focus.md`). Vérifier la cohérence des relations ARIA (`aria-labelledby`,
`aria-describedby`) avec les éléments qu'elles référencent réellement dans le DOM.
