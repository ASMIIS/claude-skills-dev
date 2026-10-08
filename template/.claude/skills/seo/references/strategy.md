# Stratégie SEO

À produire/valider **avant** d'optimiser. Sortie : `docs/seo/README.md`. Toute donnée non
disponible (volumes, trafic, concurrents) reste `UNKNOWN` — ne jamais inventer un volume de
recherche ou une position.

## 1. Cadrage

- **Objectif business** (leads, ventes, inscriptions, notoriété) → un KPI de conversion, pas
  seulement du trafic.
- **Audience** : qui cherche, avec quel vocabulaire, à quel stade (découverte, comparaison, achat).
- **Marché** : pays, langues, local ou national → décide hreflang, domaine/sous-dossiers, SEO local.
- **Concurrents SEO** (pas forcément business) : qui occupe aujourd'hui les résultats visés.
- **Ressources** : capacité de production de contenu → dimensionne l'ambition.

## 2. Recherche d'intentions (pas seulement de mots-clés)

Classer chaque requête cible par intention :

| Intention | Exemple | Type de page |
|---|---|---|
| Informationnelle | « comment réduire… » | Article, guide, FAQ |
| Navigationnelle | « <marque> connexion » | Page marque, accueil |
| Commerciale | « meilleur … », « X vs Y » | Comparatif, catégorie |
| Transactionnelle | « acheter… », « tarif… » | Produit, tarifs, landing |
| Locale | « … près de moi » | Page lieu, fiche établissement |

Règle : **une intention dominante = une page**. Deux pages visant la même requête se cannibalisent
(fusionner, ou différencier clairement l'intention). Valider l'intention en regardant ce qui
ranke réellement (type de pages, format) — c'est la vérité du moteur, pas une supposition.

## 3. Architecture de l'information

```
Page pilier (sujet large)  ←→  Pages cluster (sous-questions précises)
        ↓                              ↓
   Pages conversion  ←  maillage interne ciblé  →  Pages support (FAQ, glossaire, preuves)
```

- Profondeur : toute page importante à **≤ 3 clics** de l'accueil.
- URLs courtes, lisibles, stables, en minuscules, mots séparés par `-`, sans paramètres pour le
  contenu indexable. Changer une URL = 301 + mise à jour des liens internes + sitemap.
- Pas de page orpheline : chaque page indexable reçoit au moins un lien interne contextuel.
- Facettes/filtres/recherche interne : par défaut non indexés (voir `technical-seo.md`), sauf
  combinaisons à demande réelle, avec contenu et canonical propres.

## 4. Priorisation

Score simple, à justifier avec des données ou marqué `ASSUMED` :

```
Priorité = (valeur business × probabilité de ranker) / effort
```

Ordre type : (1) corriger ce qui bloque l'indexation → (2) optimiser les pages déjà proches de la
page 1 (positions ~5-20 : gain rapide) → (3) créer les pages de conversion manquantes → (4)
construire les clusters → (5) autorité (liens/mentions de qualité, relations presse, partenariats).

## 5. Mesure et boucle d'itération

| Source | Sert à |
|---|---|
| Google Search Console | requêtes, impressions, CTR, position, couverture d'indexation, CWV, erreurs structured data |
| Bing Webmaster Tools | idem + alimente aussi une partie des moteurs/assistants IA |
| Analytics | trafic organique, conversions par page d'atterrissage |
| Logs serveur | passages réels de Googlebot et crawlers IA, budget de crawl gaspillé |
| Tests de citation IA | présence/exactitude de la marque dans les réponses (voir `geo.md`) |

Cycle : hypothèse → changement unique et daté → attendre (souvent 4 à 12 semaines) → comparer
avant/après → conserver ou annuler. Ne jamais attribuer une variation à un changement sans
contrôler la saisonnalité et les mises à jour d'algorithme. Un CTR faible avec bonne position =
retravailler title/description ; bonne impression mais pas de clic = intention mal servie.

## 6. Contenu du `docs/seo/README.md`

Objectifs & KPI · audience/marchés/langues · intentions et page associée (tableau
requête → intention → URL → statut) · clusters · règles d'URL · pages exclues de l'index · données
de mesure disponibles · décisions et résultats des expériences · `UNKNOWN` restants.
