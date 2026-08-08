# Performance et Core Web Vitals

Pour les pages destinées à l'indexation, vérifier notamment :

- **LCP (Largest Contentful Paint)** — l'élément principal visible se charge rapidement ; images
  hero optimisées et chargées en priorité, pas de blocage par des ressources non critiques
- **CLS (Cumulative Layout Shift)** — pas de décalage de mise en page pendant le chargement
  (dimensions réservées pour images/publicités/embeds, polices avec fallback cohérent)
- **INP / interactivité** — la page reste réactive rapidement, pas de blocage prolongé du thread
  principal par du JavaScript lourd au chargement

## Points concrets

Poids des pages, optimisation des images (format, dimensionnement, lazy loading pour le contenu
hors écran), stratégie de chargement des polices (éviter le flash de texte invisible/mal stylé
sans nécessité), volume de JavaScript chargé pour le rendu initial, scripts tiers (analytics,
publicité) chargés de façon à ne pas bloquer le rendu principal.

Voir aussi Skill `responsive-design` → performance mobile pour les problématiques spécifiques aux
appareils moins puissants.
