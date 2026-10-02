# Recherche et sources vérifiées

Recherche poursuivie les 1er et 2 octobre 2026 à partir du cahier des charges joint. Les résultats distinguent les données effectivement importées, les catalogues consultables et les extractions nécessitant une demande. L’ouverture d’une page ne vaut pas disponibilité d’un fichier exploitable.

## Sources intégrées

| Producteur / source | Usage dans la V5 | Contrôle et limite |
|---|---|---|
| [INSEE — COG 2026](https://www.insee.fr/fr/statistiques/8740222) | 3 685 communes BFC et identifiants | Commune simple, région 27 ; codes texte |
| INSEE — RP2023 par âge, fichiers référencés dans `ref_source` | Population et part des 75 ans ou plus | Somme des 8 départements concordante avec la région ; pas de population GHT |
| INSEE — Filosofi 2023, fichier DS_FILOSOFI_CC_2023 | Pauvreté et médiane communales ; valeurs département/région publiées | Filtrage par type géographique : le code département 27 (Eure) ne remplace pas la région 27 ; secret conservé |
| [DREES — APL généralistes](https://data.drees.solidarites-sante.gouv.fr/) | APL 2024 et séries 2022–2024 | Moyennes pondérées par population standardisée, populations de référence datées |
| [DREES — SAE](https://www.sae-diffusion.sante.gouv.fr/) | 11 agrégats GHT 2025, 24 mesures | Archive administrative complète et documentation vérifiées ; offre, pas flux des résidents |
| [FINESS / ANS](https://finess.esante.gouv.fr/) | Supports, EJ et EG publiés au 01/10/2026 | Téléchargement national récupéré via le catalogue public ; 5 anomalies à réconcilier. Le site de consultation a expiré lors d’un test, sans invalider le fichier récupéré |
| [ARS BFC — 11 GHT](https://www.bourgogne-franche-comte.ars.sante.fr/onze-groupements-hospitaliers-de-territoire-en-bourgogne-franche-comte) | Confirmation et rapprochement du référentiel | Page datée du 4 mars 2024 ; photographie FINESS 2026 distincte |
| [Assurance Maladie — données](https://data.ameli.fr/) | 79 catégories de pathologies × région/8 départements, année 2024 | 711 observations ; diabète retenu pour le croisement. Pas une substitution aux ALD ou au dépistage |
| [SPF — Odissé](https://odisse.santepubliquefrance.fr/pages/accueil/) | Dépistage organisé du sein, 72 observations | 8 départements × 9 périodes biennales, taux standardisés femmes 50–74 ans |
| [API administrative française](https://geo.api.gouv.fr/decoupage-administratif) | Contours des 3 685 communes et fusion par département | Codes concordants au COG2026 ; réponse API sans édition géométrique explicite, simplification documentée |

Les URL précises de récupération, empreintes SHA256 et horodatages disponibles sont conservés dans `data/ref_source`. Les liens de catalogue ci-dessus ne remplacent pas ces références de fichiers.

## Sources complémentaires examinées

| Source | Résultat concret | Suite requise |
|---|---|---|
| [ScoreSanté](https://www.scoresante.org/) | Catalogue public identifié ; application nécessitant JavaScript, pas d’extraction territoriale exploitable obtenue | Définir mortalité avant 75 ans, période, standardisation et demander export |
| [ORS BFC](https://www.orsbfc.org/) | Site et contact accessibles, capacité d’analyse sanitaire documentée | Demander numérateurs, dénominateurs et agrégations autorisées |
| [CartoSanté](https://cartosante.atlasante.fr/) | Application cartographique identifiée ; pas de table ZIP/ZAC complète importée | Obtenir géométries du zonage et exceptions QPV |
| [ScanSanté](https://www.scansante.fr/) et [ATIH](https://www.atih.sante.fr/) | Nouveau site ATIH annoncé le 28 septembre 2026 ; trois espaces Data Essentiel, Data Avancé, Data Expert | Identifier la restitution adéquate et ses conditions d’accès ; aucune matrice GHT publiable récupérée |
| Anciennes pages ATIH de correspondance codes PMSI | Deux URL officielles testées renvoient 404 après refonte | Demander la localisation actuelle et le fichier annuel ; ne pas assimiler le 404 à l’absence de référentiel |
| [RUBFC — VisUr](https://rubfc.com/visur) | Présentation publique : RPU, activité, durées et qualité ; données détaillées réservées aux professionnels habilités | Demande via orubfc@rubfc.fr ; extraction agrégée et autorisation de diffusion à obtenir |
| [Assurance Maladie — ALD](https://www.assurance-maladie.ameli.fr/etudes-et-donnees/prevalence-beneficiaires-ald-departement) | Source ALD2024 identifiée ; tentative de téléchargement bloquée par une protection du site | Obtenir le fichier officiel ; la cartographie des pathologies reste une mesure différente |
| [DREES — accès urgences](https://data.drees.solidarites-sante.gouv.fr/explore/dataset/2943_diagnostic-d-acces-aux-soins-urgents/) | Fichier historique au 31/12/2019 récupéré en V4 | Ne pas le présenter comme un temps d’accès 2026 ; actualisation requise |
| [DREES — maternités](https://data.drees.solidarites-sante.gouv.fr/explore/dataset/fichier_maternites_112021/) | Inventaire historique identifié | Offre active datée et modèle de trajet nécessaires pour un accès actuel |
| [INSEE — statistiques locales](https://statistiques-locales.insee.fr/) | Application identifiée | Les fichiers RP/Filosofi ont été privilégiés pour les croisements reproductibles |
| [IGN — ADMIN EXPRESS](https://geoservices.ign.fr/adminexpress) | Redirection vers le catalogue cartes.gouv.fr | L’API administrative fournit le fond livré ; une version IGN précisément millésimée reste une alternative |
| Géodes SPF | Une requête a renvoyé 502 | Utiliser Odissé pour les données effectivement récupérées ; l’erreur observée ne prouve pas un arrêt définitif |
| DGOS — GHT par région | Une vérification humaine bloque la lecture automatisée | Rapprocher la source DGOS lors de la validation ; page ARS exploitable en attendant |
| HospiDiag, Soins et Territoires, HPE | Pistes citées dans le cahier des charges ; aucun jeu complet nouveau intégré | Confirmer le périmètre, l’édition, la disponibilité et les droits auprès du producteur |

Les anciens liens ATIH testés sont conservés comme traces de recherche :

- https://www.atih.sante.fr/mise-jour-2026-de-la-liste-de-correspondance-codes-postaux-codes-geographiques-pmsi
- https://www.atih.sante.fr/nomenclatures-de-recueil-de-linformation/codes-geographiques

Les espaces actuels sont liés par la page officielle ATIH : https://data-essentiel.atih.sante.fr/ , https://data-avance.atih.sante.fr/ et https://restitutions.atih.sante.fr/ . Les conditions d’accès dépendent de la restitution ; le tableau ne les classe pas toutes comme restreintes.

## Ce qui empêche les derniers croisements GHT

Un besoin résidentiel par GHT exige un zonage de résidence validé. Un taux de fuite exige une matrice complète d’origine et destination, un dénominateur et des règles de diffusion. Un score de maturité exige un questionnaire et des critères validés. Ces trois dépendances sont exposées dans la V5 et détaillées dans [les demandes aux producteurs](DEMANDES_PRODUCTEURS.md).
