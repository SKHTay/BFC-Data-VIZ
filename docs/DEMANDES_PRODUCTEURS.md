# Données complémentaires à demander

Demandes prêtes à adapter aux interlocuteurs ; aucun message n’a été envoyé. Privilégier des extractions agrégées et explicitement autorisées à la diffusion sur un site public. Conserver les règles de masquage du producteur et ne pas reconstruire des cellules masquées.

| Destinataire / guichet | Extraction ou validation demandée | Champs indispensables |
|---|---|---|
| FHF BFC, ARS et 11 GHT | Référentiel des parties, associés, établissements supports et dates d’effet ; résoudre les 5 anomalies | Code GHT, FINESS EJ/EG, rôle, date début/fin, statut public MCO documenté |
| ARS / GHT, validation conjointe | Partition de résidence commune→GHT, avec règle choisie et exceptions | INSEE texte, code GHT, règle, version, dates, validateur, communes hors BFC éventuelles |
| ATIH, assistance et portails Data | Correspondance annuelle des codes géographiques PMSI et codes INSEE | Code PMSI, année, communes, éventuelles fractions officielles, changements et méthode |
| ATIH Data Avancé / Data Expert | Matrice de séjours résidence→FINESS de prise en charge pour les filières validées | Origine, destination, année, filière, séjours, masquage, dénominateur, périmètre, licence de restitution |
| ARS / FHF / référents filières | Noms et périmètres des sept domaines et nomenclature ATIH correspondante | Code/libellé, activités incluses/exclues, année et validation |
| ARS / SAMU / SAS | Recours au SAS, au-delà de son implantation | Appels orientés, épisodes traités, résultat, période, territoire de couverture, dénominateur |
| RUBFC / ORU | Activité et délais aux urgences à partir des RPU, qualité des remontées | Passages, hospitalisations, durée médiane/distribution, période, EG, complétude, définitions |
| ARS / GHT | Permanence des soins et accords mutualisés | Lignes de garde/astreinte, plage horaire, sites partenaires, convention, date d’effet |
| FHF / GHT | Postes partagés et parcours par filière | Profession, ETP, sites/GHT partenaires, fonction, dates ; rôle proximité/référence/recours validé |
| GHT / professionnels | Délais de rendez-vous comparables | Filière, nouveau/suivi, urgence, délai médian, période, mode de mesure et volume |
| ORS BFC / ScoreSanté | Mortalité prématurée avant 75 ans, période récente, et agrégation autorisée | Décès, population/exposition, période pluriannuelle, standardisation, unités géographiques, masquage |
| CNAM | ALD et définition du dépistage du diabète | Numérateur/dénominateur, population cible, brut/standardisé, âge/sexe, période et géographie |
| ARS / CartoSanté | Zonage ZIP/ZAC 2025 complet, exceptions et mise à jour | Géométries, codes commune/TVS, QPV, catégorie et dates d’effet |
| ARS / DREES | Accès urgences/maternité actualisé | Offre active datée, temps théorique, population source, modèle de trajet et contours |
| FHF / GHT / CIUS | Questionnaire maturité et échelle 1–5 sur trois axes | Critères, preuves, répondant, date, validation, règle de consolidation ; absence distincte du niveau 1 |

## Routes effectivement identifiées

- **ATIH** : https://www.atih.sante.fr/ ; portails Data Essentiel, Data Avancé et Data Expert. Assistance : https://atih.atlassian.net . Les anciens liens de correspondance PMSI testés renvoient une erreur 404 après la refonte ; demander la nouvelle localisation et le fichier annuel.
- **RUBFC / VisUr** : https://rubfc.com/visur ; accès professionnel après activation ENRS. Le site donne le guichet **orubfc@rubfc.fr** et prévoit une demande nominative par la direction. Ne pas confondre une page publique de présentation avec un droit de publier ses données détaillées.
- **ORS BFC** : https://www.orsbfc.org/ ; contact publié **contact@orsbfc.org**.
- **ARS BFC** : https://www.bourgogne-franche-comte.ars.sante.fr/ ; adresser la demande au service concerné par le zonage, les GHT ou le SAS.
- **CNAM** : https://data.ameli.fr/ ; extraction ou demande ciblée sur la définition retenue.

## Validation avant intégration

Une extraction doit fournir sa période, sa maille, ses codes, ses unités, sa méthode, ses règles de diffusion et ses limites. Pour les flux, vérifier les dénominateurs et la couverture avant d’attendre un total de 100 %. Pour un bassin GHT, valider les communes et dates avant de générer les polygones et agrégats. Pour une maturité, valider le questionnaire avant d’afficher des niveaux.
