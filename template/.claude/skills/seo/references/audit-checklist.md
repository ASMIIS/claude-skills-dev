# Audit SEO/GEO priorisé

Vérifier avec preuve (réponse HTTP réelle, HTML rendu, Search Console) — pas de constat
« supposé ». Chaque ligne : ✅ OK / ❌ problème / ➖ N/A / `UNKNOWN`.

## P0 — bloque l'indexation ou le classement

- [ ] Pages cibles en HTTP 200, indexables (pas de `noindex`/`X-Robots-Tag` involontaire)
- [ ] `robots.txt` n'exclut pas les sections à indexer (ni CSS/JS nécessaires au rendu)
- [ ] Aucun `Disallow: /` / `noindex` hérité du staging en production
- [ ] Contenu principal présent dans le HTML initial (tester « afficher la source » / fetch sans JS)
- [ ] Une version canonique (http→https, www, slash) en 301 unique, sans chaîne
- [ ] Canonical présent, auto-référent, absolu, vers une URL 200 indexable
- [ ] Sitemap valide, à jour, ne contient que des URLs 200 canoniques indexables, déclaré dans robots.txt
- [ ] Pas de soft-404 ; vraies 404/410 pour pages supprimées
- [ ] Pages privées/techniques exclues (auth, `noindex`) et absentes du sitemap
- [ ] Certificat HTTPS valide, pas de contenu mixte

## P1 — fort impact

- [ ] Title unique (~50-60 car.), description unique (~120-160 car.), `h1` unique par page
- [ ] Intention unique par page, pas de cannibalisation évidente
- [ ] Maillage interne : pas de page orpheline, ancres descriptives, profondeur ≤ 3 clics
- [ ] Core Web Vitals (p75 terrain) : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 — mobile d'abord
- [ ] Mobile : contenu/liens/structured data équivalents au desktop, viewport correct
- [ ] Structured data valide, conforme au contenu visible (Organization, Breadcrumb, Article/Product…)
- [ ] hreflang réciproque et cohérent si multilingue ; `lang` correct
- [ ] Images : `alt`, dimensions, formats modernes, LCP non lazy-loadée
- [ ] Redirections 301 (pas 302 par erreur), pas de liens internes vers des redirections
- [ ] Open Graph/Twitter complets pour les pages partagées

## P2 — optimisation

- [ ] Rich results éligibles exploités ; FAQ visibles dans la page (pas seulement le JSON-LD)
- [ ] Pagination / facettes maîtrisées (canonical, noindex ciblé)
- [ ] Données d'auteur, dates de mise à jour, sources (E-E-A-T)
- [ ] Contenu fin/obsolète fusionné ou supprimé
- [ ] Preload de la ressource LCP, polices optimisées, JS tiers différé
- [ ] Logs : budget de crawl non gaspillé (paramètres, facettes, 404 répétées)

## GEO

- [ ] Décision documentée sur crawlers de recherche IA vs entraînement
- [ ] Contenu clé rendu côté serveur, réponses directes en tête de section
- [ ] Entités cohérentes (Organization + `sameAs`, page À propos, mentions légales)
- [ ] Jeu de requêtes de test défini et premier relevé daté

## Sécurité × SEO (croiser avec Skill `security`)

- [ ] robots.txt/sitemap/structured data ne divulguent aucune URL privée, ID interne ou donnée perso
- [ ] En-têtes de sécurité n'empêchent pas le crawl légitime ; pas de blocage anti-bot aveugle de
      Googlebot/Bingbot (vérifier par reverse DNS, jamais par user-agent seul)
- [ ] Rate limiting configuré avec exception raisonnée pour les crawlers vérifiés

## Format du rapport

```
# Audit SEO — <périmètre>
## Résumé (état, 3 priorités)
## P0 / P1 / P2 : page · preuve · correction · effet attendu · effort
## GEO
## Données manquantes (UNKNOWN) : Search Console, analytics, logs…
## Plan d'action ordonné + comment mesurer chaque effet
```
