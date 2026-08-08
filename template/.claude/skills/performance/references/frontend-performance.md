# Performance frontend

## Bundle et chargement

Vérifier la taille du bundle chargé au premier rendu, l'usage du code-splitting/lazy loading pour
les routes ou composants non critiques au chargement initial, les dépendances lourdes importées
en entier alors qu'un import ciblé suffirait (Skill `dependencies` pour l'évaluation d'une
nouvelle dépendance sous cet angle).

## Rendu et re-renders

Identifier les re-renders inutiles (composant qui se re-rend sans changement de donnée
pertinente), les calculs coûteux exécutés à chaque rendu au lieu d'être mémoïsés, les listes
longues rendues sans virtualisation quand c'est pertinent pour le volume réel de données.

## Images et fonts

Vérifier le format et le dimensionnement des images (adapté à l'affichage réel, pas surdimensionné),
le lazy loading du contenu hors écran, la stratégie de chargement des polices (éviter un blocage
du rendu texte sans nécessité).

## Réseau

Vérifier le nombre de requêtes réseau déclenchées par une page, la possibilité de les regrouper,
la stratégie de cache (HTTP cache, cache applicatif côté client) pour les données peu changeantes.

## Core Web Vitals

Voir aussi Skill `seo` → `references/performance.md` pour le lien entre performance et
référencement. LCP (élément principal visible rapidement), CLS (pas de décalage de mise en page),
INP (réactivité aux interactions) — mesurer plutôt que supposer avant de conclure à un problème.
