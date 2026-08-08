# Lecteurs d'écran, contraste, mouvement

## Lecteurs d'écran

Vérifier que le contenu important est annoncé de façon cohérente : texte alternatif pertinent sur
les images porteuses de sens (`alt=""` pour les images purement décoratives), noms accessibles sur
les boutons icône seuls (`aria-label`), régions `aria-live` pour le contenu qui change
dynamiquement et doit être signalé (notifications, résultats de recherche, erreurs). Éviter les
excès d'annonces (`aria-live="assertive"` sur du contenu non critique) qui rendent l'expérience
bruyante et confuse.

## Contraste

Respecter un ratio suffisant entre le texte et son arrière-plan — référence WCAG AA : 4.5:1 pour
le texte courant, 3:1 pour le texte large (≥18pt ou ≥14pt gras) et les éléments d'interface
significatifs (icônes porteuses de sens, bordures d'input). Vérifier le contraste sur tous les
états d'un composant (hover, focus, disabled), pas uniquement son état par défaut — un état
disabled à très faible contraste reste un problème s'il porte une information nécessaire.

## Mouvement

Respecter `prefers-reduced-motion` pour toute animation non essentielle à la compréhension de
l'interface (transitions décoratives, parallax, auto-play). Une animation strictement nécessaire à
la compréhension d'un changement d'état peut être conservée en version réduite plutôt que
totalement supprimée.

## Absence de dépendance exclusive à la couleur

Toute information portée par une couleur (statut, erreur, catégorie) doit avoir une alternative
non colorée (texte, icône, motif) pour rester perceptible par les utilisateurs daltoniens ou en
cas d'affichage sans couleur.
