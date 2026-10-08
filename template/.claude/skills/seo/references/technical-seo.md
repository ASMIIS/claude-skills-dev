# Technical SEO

## robots.txt

Existe pour tout site public ; n'exclut pas par erreur des sections à indexer ni les CSS/JS
nécessaires au rendu ; déclare le sitemap ; n'expose pas la structure interne sensible (ne jamais
« cacher » une zone privée par `Disallow` : elle reste découvrable — la protéger par
authentification). `robots.txt` bloque le crawl, **pas l'indexation** : pour désindexer, utiliser
`noindex` (la page doit rester crawlable pour que la directive soit lue). Règles par crawler IA :
voir `geo.md`.

## sitemap.xml

Contient uniquement des URLs 200, canoniques, indexables ; généré dynamiquement si le contenu
évolue ; `lastmod` fiable (date de modification réelle) ; ≤ 50 000 URLs / 50 Mo par fichier
(sinon index de sitemaps) ; référencé dans `robots.txt` et soumis dans Search Console. Jamais
d'URL privée, de page `noindex` ni de redirection.

## URLs canoniques

Balise `rel="canonical"` absolue et auto-référente sur chaque page indexable ; cohérente avec
sitemap, hreflang et liens internes. Gère variantes de tracking (`utm_*`), tri, pagination,
HTTP/HTTPS, www, slash final. Un canonical vers une page `noindex`, redirigée ou 404 est invalide.

## Statuts HTTP et redirections

200 contenu valide · 301 déplacement permanent (pas 302 par erreur) · 404/410 supprimé · 503 +
`Retry-After` indisponibilité temporaire. Pas de chaînes ni de boucles de redirections ; pas de
soft-404 (page « introuvable » renvoyant 200). Mettre à jour les liens internes plutôt que de
compter sur la redirection.

## Indexabilité et crawlabilité

`noindex` absent des pages à indexer, présent (volontairement) sur : recherche interne, filtres à
facettes sans valeur, pages de remerciement, espaces authentifiés, doublons. Navigation et
pagination en vrais `<a href>`. Ne pas dépendre du scroll infini seul : fournir des URLs
paginées. Budget de crawl : limiter paramètres infinis, facettes combinatoires, calendriers sans fin.

## Rendu JavaScript

Préférer SSR/SSG/ISR pour le contenu indexable. Vérifier le HTML **rendu** et le HTML **brut** :
titre, description, canonical, `h1`, contenu principal, liens et structured data présents dans le
brut idéalement. Pas d'état « loading » ni d'erreur indexé à la place du contenu. Les crawlers
IA n'exécutent en général pas le JS. Ne pas changer canonical/robots par JS côté client.

## Multilingue et international

`<html lang>` correct ; `hreflang` réciproque (chaque version référence toutes les autres **et
elle-même**), codes valides (`fr`, `fr-CA`), `x-default`. Une URL par langue (pas de langue selon
cookie/IP seule). Ne pas rediriger automatiquement les crawlers selon la géolocalisation.

## Pagination et facettes

Chaque page paginée a sa propre URL canonique auto-référente (pas de canonical vers la page 1) et
un contenu lisible. Facettes : n'indexer que les combinaisons à demande réelle avec contenu
dédié ; sinon `noindex` ou paramètres non crawlés.

## Sécurité et SEO

HTTPS partout + HSTS (voir Skill `security` → `references/transport-and-headers.md`) ; contenu
mixte interdit. Pages d'erreur ne divulguant pas de détails techniques. Anti-bot/WAF ne bloquant
pas les crawlers légitimes (vérifier par reverse DNS). Migrations de domaine : plan de
redirections 301 URL par URL, Search Console « changement d'adresse », surveillance post-migration.

## Migrations et refontes (risque HIGH)

Inventaire des URLs avant, table de redirections 301 exhaustive, conservation des contenus qui
rankent, test sur préproduction (avec `noindex` **retiré à la mise en prod**), crawl
post-déploiement, suivi Search Console quotidien pendant 4 semaines, plan de rollback (CLAUDE.md §3).
