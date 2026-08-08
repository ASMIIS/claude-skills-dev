# Metadata

## Title et description

Chaque page destinée à l'indexation doit avoir un title unique et pertinent (pas un template
générique identique partout), et une meta description pertinente qui résume réellement le
contenu de la page — générés dynamiquement à partir du contenu réel quand la page est dynamique
(produit, article), pas codés en dur pour un contenu qui varie.

## Open Graph / réseaux sociaux

Vérifier la présence des balises Open Graph pertinentes (`og:title`, `og:description`,
`og:image`, `og:url`, `og:type`) pour un partage correct sur les réseaux sociaux, et les
métadonnées Twitter/X équivalentes si le projet cible ce réseau. Les valeurs doivent refléter le
contenu réel de la page, pas une valeur par défaut trompeuse.

## Langue et viewport

Vérifier la déclaration de langue correcte (`lang` sur `<html>`, cohérente avec le contenu réel
de chaque page si le site est multilingue) et la présence d'un viewport correctement configuré
(sans désactiver le zoom — voir Skill `responsive-design` → `references/mobile.md`).
