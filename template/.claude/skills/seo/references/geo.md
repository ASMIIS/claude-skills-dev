# GEO — Generative Engine Optimization

Objectif : être **découvert, compris, cité et recommandé correctement** par ChatGPT (search),
Perplexity, Gemini, Claude, Copilot, Google AI Overviews / AI Mode. Le GEO s'appuie sur un bon
SEO (ces systèmes récupèrent d'abord des pages via des index web) — ce n'est pas un substitut.
Rien n'est garanti : aucun contrôle sur ce que génère un modèle. Mesurer, ne pas promettre.

## 1. Accès des crawlers IA (robots.txt)

Distinguer les usages — décision **business** à documenter dans `docs/seo/README.md` :

| Usage | Exemples d'agents (à revérifier dans la doc officielle de l'éditeur) | Effet du blocage |
|---|---|---|
| Recherche / citation | `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Bingbot`, `Googlebot` | Disparition des réponses IA avec lien |
| Action à la demande d'un utilisateur | `ChatGPT-User`, `Claude-User`, `Perplexity-User` | L'assistant ne peut pas lire la page demandée |
| Entraînement de modèles | `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot` | Exclusion des corpus d'entraînement, sans effet direct sur le classement Google Search |

- Défaut recommandé pour du contenu public à promouvoir : **autoriser les crawlers de
  recherche/citation**. Bloquer l'entraînement est un choix légitime (propriété intellectuelle) —
  le demander à l'utilisateur plutôt que de décider seul (Stop Condition si `UNKNOWN`).
- `robots.txt` n'est qu'une convention : ne protège pas un contenu sensible (utiliser l'auth).
- Google AI Overviews utilise le crawl Googlebot : se contrôle via `nosnippet`, `max-snippet`,
  `data-nosnippet`, pas via `Google-Extended`.
- Les noms et tokens évoluent : vérifier la documentation officielle avant de figer une règle.
- Contenu critique rendu côté serveur : la plupart des crawlers IA **n'exécutent pas le JS**.
- Ne pas bloquer ces bots au niveau WAF/CDN par un « bot fight mode » par défaut sans vérifier.

## 2. Contenu « extractible » et citable

- **Réponse directe en tête de section** (1-3 phrases autonomes), puis nuance et preuves.
- Titres sous forme de **questions réelles** quand l'intention est informationnelle.
- Faits précis et vérifiables : chiffres, dates, définitions, étapes numérotées, tableaux de
  comparaison avec en-têtes clairs. Les LLM citent ce qui est net, sourcé et non ambigu.
- Une idée par paragraphe ; phrases qui restent compréhensibles hors contexte (pas de « comme dit
  plus haut »).
- **Sources et attribution** : citer les sources primaires, afficher auteur, date de mise à jour,
  méthode (comment un chiffre a été obtenu). Contenu propriétaire (données, études, benchmarks)
  = fort levier de citation.
- Fraîcheur réelle : mettre à jour les pages factuelles (tarifs, specs, comparatifs).

## 3. Entités et cohérence de marque

- Nom de marque, description, offre, fondateurs, adresse **identiques** partout (site, réseaux,
  annuaires, Wikipédia/Wikidata si éligible, Google Business Profile).
- Page « À propos » factuelle (qui, quoi, depuis quand, preuves), page contact, mentions légales.
- `Organization` / `WebSite` / `Person` (auteurs) en JSON-LD avec `sameAs` vers les profils
  officiels (voir `structured-data.md`).
- Mentions tierces de qualité (presse, avis, comparatifs, communautés) pèsent : les modèles
  s'appuient sur ce que le web dit de la marque, pas seulement sur son site.
- Distinguer clairement les produits/plans/noms pour éviter les confusions d'entités.

## 4. `llms.txt` — usage honnête

Fichier proposé (non standard officiel) à la racine : liste Markdown des pages clés et résumés.
Aucun grand moteur n'a confirmé l'utiliser pour le classement/les citations ; coût faible, utile
surtout aux agents/outils de dev qui le lisent explicitement. À ajouter si le projet a une
documentation publique ou une API, **sans** en faire un levier SEO attendu. Ne jamais y mettre
d'information non publique.

## 5. Mesure

- Jeu de 20-50 requêtes réelles (questions clients, comparatifs, « meilleur X pour Y ») testées
  périodiquement dans les assistants : marque citée ? lien présent ? information exacte ?
  concurrents cités à la place ? Consigner dates, assistant, résultat (les réponses varient : répéter).
- Logs serveur : visites des user-agents IA (vérifier via plages IP/DNS inverse publiées, les
  user-agents sont falsifiables).
- Analytics : trafic référent depuis les domaines d'assistants (chatgpt.com, perplexity.ai…).
- Imprécision d'un modèle sur la marque → corriger la **source** (page claire, entité cohérente),
  pas tenter de « prompter » le moteur depuis le site.

## Interdits

Texte caché ou instructions destinées aux LLM dans le HTML (« prompt injection » inversée),
contenu différent servi aux bots IA (cloaking), faux avis/fausses statistiques pour être cités,
pages spammées de « réponses » générées. Risque : pénalité, perte de confiance, et exposition
légale (pratique commerciale trompeuse — voir Skill `legal-compliance`).
