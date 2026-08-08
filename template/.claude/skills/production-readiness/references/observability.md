# Observabilité — logs et monitoring

## Logs

Identifier ce qui existe déjà : logs de plateforme, logs applicatifs, error tracking, agrégation
externe. Une fois la destination identifiée, utiliser le Skill `production-logging` pour vérifier
la qualité des logs applicatifs eux-mêmes (structure, niveaux, absence de secrets). **Ne pas
installer un système externe de logs si ceux de la plateforme répondent déjà au besoin réel du
projet.**

## Monitoring

Identifier ce que la plateforme fournit déjà nativement : CPU, mémoire, requêtes, latence,
erreurs, statut de déploiement, health checks. Déterminer ensuite ce qui manque réellement pour
le projet plutôt que d'ajouter des outils par principe.

```
Platform observability + Application observability = Enough visibility
```

Le but n'est pas de multiplier les outils de monitoring, mais d'obtenir une visibilité suffisante
pour diagnostiquer un problème de production — voir CLAUDE.md §19 (Enterprise-grade, pas
Enterprise-bloat) et Skill `incident-debugging` pour l'usage de ces informations lors d'un
incident.
