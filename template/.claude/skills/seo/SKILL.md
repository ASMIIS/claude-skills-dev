---
name: seo
description: Concevoir, vérifier et optimiser le référencement (SEO classique + GEO/visibilité dans les moteurs IA) des pages destinées à l'indexation, à partir d'une stratégie explicite — intention de recherche, architecture de l'information, contenu, technical SEO, metadata, structured data, rendu, Core Web Vitals, mesure. Utiliser ce Skill uniquement pour les pages publiques destinées à l'indexation (vitrine, blog, produit, landing), jamais pour un dashboard, un espace authentifié ou une application privée.
---

# SEO + GEO

## Périmètre — ne pas appliquer aveuglément

S'applique aux pages publiques destinées à être trouvées (site vitrine, blog, pages produit,
landing pages, documentation publique). **Ne s'applique pas** à une app privée, un dashboard ou un
espace authentifié : vérifier le contexte réel avant de dérouler quoi que ce soit. Sur ces zones,
le seul travail SEO est de s'assurer qu'elles sont exclues (`noindex`, `robots`, auth).

## Principe — stratégie d'abord, checklist ensuite

Une checklist technique parfaite sur des pages qui ne répondent à aucune intention de recherche
ne produit aucun trafic. Ordre de travail :

```
Stratégie (cible, intentions, pages)  →  Contenu & architecture  →  Technique  →  Mesure  →  Itération
```

1. Lire `docs/seo/README.md` (stratégie du projet : audience, mots-clés/intentions, pages
   prioritaires, KPI). S'il n'existe pas ou contient des `UNKNOWN` critiques (cible, marché,
   langue, offre) : poser la question (CLAUDE.md §4/§16) — jamais inventer une stratégie.
2. Rattacher chaque page créée/modifiée à **une intention** et **un rôle** dans l'architecture
   (pilier, cluster, conversion, support). Une page sans intention ni rôle n'est pas indexable
   utilement : la signaler.
3. Dérouler seulement les sections utiles à la tâche (voir table), puis mesurer.

## Quelle référence charger

| Besoin | Référence |
|---|---|
| Définir/revoir la stratégie, cibles, clusters, priorisation, KPI | `references/strategy.md` |
| Rédiger/optimiser une page (intention, structure, E-E-A-T, maillage) | `references/content-and-intent.md` |
| Visibilité dans ChatGPT/Perplexity/Gemini/AI Overviews (GEO) | `references/geo.md` |
| robots, sitemap, canonical, redirections, hreflang, pagination, rendu JS | `references/technical-seo.md` |
| title, description, Open Graph, langue | `references/metadata.md` |
| JSON-LD / schema.org | `references/structured-data.md` |
| LCP / INP / CLS, poids des pages | `references/performance.md` |
| Audit priorisé P0/P1/P2 et rapport | `references/audit-checklist.md` |
| Accessibilité ↔ SEO | `references/accessibility.md` |

Ne charger que la ou les références du besoin réel (CLAUDE.md §10).

## Règles non négociables

- **Une page = une intention principale**, un `h1` pertinent, un title et une description uniques.
- **Contenu visible = contenu balisé** : jamais de structured data, d'avis, de notes, de prix ou de
  FAQ qui ne correspondent pas à ce que voit l'utilisateur.
- **Aucune manipulation** : pas de keyword stuffing, contenu dupliqué/généré en masse, texte caché,
  cloaking, pages satellites, achat de liens, faux avis. Risque de pénalité manuelle ou algorithmique.
- **Mobile = version de référence** (indexation mobile-first) : le contenu, les liens et les
  données structurées du mobile doivent être équivalents à ceux du desktop.
- **Le contenu critique est dans le HTML initial** (SSR/SSG/pré-rendu), pas uniquement injecté
  après hydratation ; la navigation principale utilise de vrais `<a href>`.
- **HTTPS partout**, une seule version canonique du domaine (www/non-www, http/https, slash final).
- **Ne pas bloquer par erreur** : un `Disallow`/`noindex` hérité d'un environnement de staging est
  la première cause de disparition de l'index — vérifier à chaque release.
- **Le SEO ne dégrade jamais l'UX ni la sécurité** : pas de pop-up intrusif plein écran au
  chargement, pas d'exposition de pages privées/de données sensibles via sitemap, robots ou
  structured data.
- **Pas de promesse de position.** Le SEO est probabiliste et lent : annoncer des hypothèses et des
  KPI, jamais un classement garanti.

## Méthode

1. Confirmer que le périmètre est indexable et lire la stratégie (`docs/seo/README.md`).
2. Qualifier la tâche : **création** (intention → plan de page → implémentation), **audit**
   (`audit-checklist.md`, constats priorisés), **optimisation** (partir des données Search Console
   si disponibles, sinon l'écrire en `UNKNOWN`).
3. Implémenter/vérifier technique + metadata + structured data + contenu + GEO selon la table.
4. Croiser avec `ui-ux`, `accessibility`, `responsive-design`, `performance`.
5. Définir comment mesurer (Search Console, logs de crawl, analytics, tests de citation IA) et
   consigner stratégie/constats dans `docs/seo/README.md` (voir Skill `documentation`).

## Sortie attendue

Pour un audit : constats classés P0 (bloque l'indexation/le classement) / P1 (fort impact) / P2
(optimisation), chacun avec page concernée, preuve observée, correction, effet attendu. Pour une
implémentation : checklist des points vérifiés + ce qui reste `UNKNOWN` (données de trafic,
mots-clés réels) plutôt qu'inventé.
