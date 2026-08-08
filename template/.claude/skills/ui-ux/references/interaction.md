# États UI et animations

## États UI

Un composant interactif doit prendre en compte, quand pertinent pour ce composant : `Default`,
`Hover`, `Focus`, `Active`, `Disabled`, `Loading`, `Success`, `Error`, `Empty`. Ne pas se limiter
au seul "happy path" — un bouton d'action asynchrone sans état `Loading`/`Disabled` pendant la
requête, par exemple, est incomplet.

## Animations

Les animations doivent avoir un objectif UX identifiable (guider l'attention, indiquer un
changement d'état, donner du feedback) — pas être purement décoratives. Éviter les animations
excessives qui ralentissent la perception de rapidité de l'interface.

Respecter `prefers-reduced-motion` lorsque pertinent pour le projet : proposer une version
réduite ou désactivée des animations non essentielles pour les utilisateurs qui l'ont demandé au
niveau système.

## Méthode

Pour tout composant interactif créé ou modifié, vérifier explicitement quels états parmi la liste
ci-dessus sont pertinents pour son usage réel, et s'assurer qu'ils sont bien implémentés — pas
seulement visuellement prévus dans une maquette.
