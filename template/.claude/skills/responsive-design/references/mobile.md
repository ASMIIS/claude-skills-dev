# Mobile — priorisation, navigation, safe areas, orientation

## Priorisation du contenu

Sur mobile, identifier avant toute adaptation : information essentielle, action principale,
actions secondaires, information optionnelle, navigation. Restructurer en conséquence plutôt que
de compresser une disposition desktop.

Exemple :
```
Desktop : [Sidebar] [Content] [Secondary panel]
Mobile  : [Header] [Main content] [Primary action] [Secondary content]
```

## Navigation mobile

Vérifier : taille du header, menu, navigation secondaire, breadcrumbs, sidebar, bottom navigation
lorsqu'elle est pertinente pour le projet, menu hamburger lorsqu'il est réellement nécessaire (pas
par défaut), profondeur de navigation, retour arrière, état actif clairement visible.

Ne pas simplement masquer une sidebar desktop sans proposer une alternative réellement utilisable
sur mobile.

## Safe areas

Pour les interfaces mobiles modernes, prendre en compte les zones sûres (notch, Dynamic Island,
home indicator, UI système) lorsque des éléments sont positionnés près des bords de l'écran —
utiliser les `safe-area-inset-*` (CSS `env()`) si le projet cible ces appareils.

## Orientation

Ne pas supposer que l'utilisateur reste toujours en portrait. Les composants critiques doivent
rester utilisables en portrait comme en paysage lorsque c'est pertinent pour l'usage réel de
l'application.

## Zoom et accessibilité

Ne jamais désactiver le zoom utilisateur pour "améliorer le design" — éviter
`<meta name="viewport" content="user-scalable=no">` sans justification exceptionnelle et
documentée (voir Skill `ui-ux` → `references/accessibility.md`).
