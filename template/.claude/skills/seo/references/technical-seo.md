# Technical SEO

## robots.txt

Vérifier qu'il existe si le projet a des pages publiques, qu'il n'exclut pas par erreur des
sections censées être indexées, et qu'il n'expose pas d'information sensible sur la structure
interne du site.

## sitemap.xml

Vérifier qu'il est à jour avec les pages réellement destinées à l'indexation, généré
dynamiquement si le contenu évolue régulièrement (pas un fichier statique obsolète), et référencé
dans `robots.txt`.

## URLs canoniques

Vérifier la présence d'une balise canonique cohérente pour éviter le contenu dupliqué (variantes
d'URL avec paramètres de tracking, pagination, filtres).

## Statuts HTTP et redirections

Une page supprimée définitivement doit retourner 404 (ou 410), une redirection permanente doit
être un 301 (pas 302), une page temporairement indisponible peut utiliser un 503 avec
`Retry-After`. Des redirections en chaîne (redirection vers une redirection) doivent être évitées.

## Indexabilité et crawlabilité

Vérifier l'absence de balise `noindex` involontaire sur des pages qui doivent être indexées (et
sa présence volontaire sur celles qui ne doivent pas l'être — ex: pages de recherche interne,
pages de filtrage à facettes générant du contenu dupliqué). Vérifier que la navigation principale
est accessible sans JavaScript pour le crawl, ou que le rendu SSR/pré-rendu le permet.
