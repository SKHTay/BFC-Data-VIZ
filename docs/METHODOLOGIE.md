# Méthodologie — V5, 2 octobre 2026

## Mailles, dates et dénominateurs

| Mesure | Maille réellement disponible | Millésime / population de référence |
|---|---|---|
| Population et 75 ans ou plus | 8 départements et région | RP2023, géographie 2026 |
| APL généralistes | 3 685 communes, agrégations département/région | 2024, population 2022 standardisée |
| Pauvreté et niveau de vie médian | Communes diffusées, départements/région directement publiés | Filosofi 2023 |
| Diabète | Départements/région | Cartographie CNAM 2024, bénéficiaires consommants |
| Dépistage organisé du sein | 8 départements | 9 périodes biennales 2016–2017 à 2024–2025, femmes 50–74 ans |
| Offre hospitalière | 11 agrégats GHT publiés | SAE administrative 2025, 24 mesures |
| Composition et sites FINESS | EJ et EG publiés dans les groupes | Photographie du 1er octobre 2026 |

Les croisements départementaux sont descriptifs : plusieurs populations et millésimes sont rapprochés. Ils ne mesurent pas la causalité. Le taux CNAM ne remplace ni une prévalence ALD ni un taux de dépistage. Le taux de pauvreté et les médianes départementaux/régionaux sont directement extraits de Filosofi : aucune moyenne des taux ou des médianes communales n’est utilisée.

## Croisement communal

Jointure exacte par code INSEE texte entre APL 2024, COG 2026, centres communaux et Filosofi 2023. Les 3 685 codes APL correspondent au COG et aux contours récupérés. La pauvreté est diffusée pour 198 communes. Ces communes représentent 1 436 340 habitants, soit 51,2251 % de la population brute 2022 disponible dans l’APL (2 803 977 habitants). Ce dénominateur diffère de la population RP2023, 2 802 670 habitants.

La couverture est affichée pour chaque filtre. Les valeurs masquées ou non diffusées restent `null`, ne sont ni reconstituées ni classées comme un taux nul. Le niveau de vie médian disponible sur davantage de communes ne permet pas de déduire leur taux de pauvreté.

APL agrégée = Σ(APL communale × population standardisée) / Σ(population standardisée). La valeur régionale 2024 est 3,43289088 consultations par habitant standardisé. La population standardisée régionale est 2 864 549,251, distincte de la population brute.

Population sous le seuil = somme des populations **brutes 2022** des communes sous le seuil choisi. Aux seuils initiaux APL < 3 et pauvreté ≥ 15 % : 2 052 communes sont sous APL 3, représentant 1 044 670 habitants, soit 37,2567 % de la population brute de référence ; **35 communes** ont aussi un taux de pauvreté diffusé au moins égal à 15 %. Ce dernier nombre ne décrit que le sous-ensemble observable. Les seuils sont modifiables et ne constituent pas le zonage réglementaire ZIP/ZAC.

La corrélation de Pearson est non pondérée, calculée sur les paires numériques complètes. Le nombre de paires est affiché ; moins de trois paires ou une variable constante donnent une corrélation non calculée. Les cercles départementaux représentent la population RP2023. Les points communaux ont une taille fixe.

L’évolution APL 2022–2024 conserve la géographie et la population standardisée propres à chaque publication. C’est une série d’agrégats annuels, pas un panel communal constant.

## Offre et référentiels GHT

La table GHT publiée de la SAE 2025 est utilisée directement : les établissements FINESS 2026 ne servent pas à reconstruire les agrégats 2025. Les capacités et personnels sont des quantités absolues, sans division par une population départementale. Le GHT 21–52 inclut la Haute-Marne ; le total des 11 GHT ne doit pas être présenté comme une offre exclusivement située en BFC.

ETP médicaux salariés = médecins, odontologistes et pharmaciens salariés hors internes, tous champs du GHT. Comparer aux lits MCO reste descriptif et ne donne pas un ratio d’encadrement propre au MCO. Les lits de psychiatrie excluent le champ pénitentiaire. La répartition de lits utilise MCO + SMR + psychiatrie + USLD ; places et HAD sont exclus. Les zéros effectivement publiés dans la SAE sont conservés.

52 EJ et 443 sites actifs des EJ publiées sont documentés. L’extrait contient du sanitaire et du médico-social et ne certifie pas l’exhaustivité des établissements publics MCO parties ou associés. Quatre écarts de composition et une anomalie de catégorie de groupe FINESS sont documentés. Le code de diffusion SAE Haute-Saône `27211` est conservé tel que publié.

## Coopération, flux et maturité

Les passages aux urgences, SMUR et SAMU décrivent l’offre ou l’activité ; ils ne prouvent pas un accord de coopération. Le fichier dédié `offre_urgences.csv` contient ces observations. `fait_cooperation.csv` reste vide en attente d’accords documentés. La prévention est restituée au département, sans affectation arbitraire aux GHT.

Aucune matrice origine-destination publiable n’a été importée. Les taux de fuite, d’attractivité et de recours dans le GHT ne sont pas calculés. Les sept domaines de filières ATIH et leur correspondance ne sont pas définis dans les pièces fournies. `ref_filiere` et `ref_codegeo_pmsi` restent vides.

Aucun questionnaire de maturité validé n’est fourni. Les 33 cellules du modèle de collecte sont vides. Une absence de réponse ne vaut jamais niveau 1. Les rôles proximité/référence/recours, postes partagés, délais et recours SAS restent à documenter.

## Géographie

Les contours communaux de l’API administrative ont été récupérés le 2 octobre 2026 et leurs 3 685 codes rapprochés du COG 2026. L’API ne précise pas l’édition géométrique dans sa réponse. Les communes sont fusionnées par code département et simplifiées pour l’affichage ; le SVG utilise une projection Mercator cohérente avec les centres communaux. Les GeoJSON simplifiés sont livrés, sans vocation cadastralement précise.

Un GHT est un regroupement d’établissements, pas une partition automatiquement validée des communes. `ref_commune.code_ght` reste vide et `contours_ght.geojson` contient zéro polygone avec le statut `A_VALIDER`. Une règle de rattachement fondée sur les temps d’accès ou les flux majoritaires doit être décidée et validée par les acteurs, puis historisée.

## Contrôles

Les contrôles exécutés vérifient les codes, unicités, comptes, sommes de population, calculs APL, dénominateurs, totaux MCO, maintien des valeurs manquantes, fichiers liés et interactions JavaScript. Les contrôles population GHT, une commune/un GHT, inventaire public MCO exhaustif et flux totalisant 100 % sont **NON TESTABLES** avec les références disponibles. Les SVG ont été inspectés ; les interactions sont exécutées avec un DOM simulé, pas avec un navigateur réel. Le fichier `tests/resultats_livraison.json` décrit précisément la portée de la vérification.
