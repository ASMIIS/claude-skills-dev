# Cookies et traceurs

## Mécanismes à analyser

Cookies, localStorage, sessionStorage, pixels, SDK, fingerprinting, tracking scripts, analytics,
advertising SDK, social media SDK — tout mécanisme pouvant servir à suivre ou identifier
l'utilisateur.

Vérifier les règles françaises applicables aux traceurs ainsi que le RGPD lorsque des données
personnelles sont traitées. Ne pas supposer que tous les cookies nécessitent un consentement, ni
que tous en sont exemptés — analyser leur finalité (strictement nécessaire au service demandé vs
mesure d'audience vs publicité/personnalisation) et les conditions applicables à cette finalité.

## Règle d'activation

Les traceurs nécessitant un consentement ne doivent **jamais** être activés avant que celui-ci
soit recueilli. Vérifier concrètement dans le code que les scripts concernés ne se chargent pas
avant la décision de l'utilisateur (pas seulement que la bannière existe).

Vérifier notamment : consentement préalable, refus réellement accessible, retrait du consentement
possible, finalités distinctes présentées séparément, documentation, preuve du consentement
lorsque nécessaire, blocage effectif avant consentement.

## CMP / Cookie banner

Si le projet possède une bannière de consentement, vérifier : bouton "tout accepter", bouton
"tout refuser" d'accessibilité équivalente, personnalisation possible, retrait du consentement
accessible après coup, choix granulaires par finalité, information claire, aucune case
présélectionnée, absence de dark pattern.

Le refus ne doit pas être artificiellement rendu plus difficile que l'acceptation (ex: "tout
accepter" en un clic vs "tout refuser" caché dans un sous-menu) lorsque les règles applicables
exigent un choix libre et équilibré. Vérifier que le frontend ne charge pas les scripts soumis au
consentement avant la décision de l'utilisateur — recherche concrète dans le code, pas seulement
lecture de la documentation.
