# Licences et attribution

Les données livrées sont des observations publiques et agrégées ou des modèles de collecte vides. `data/ref_source.csv` et `.json` décrivent les producteurs, millésimes, mailles, liens, licences déclarées et preuves de récupération disponibles. Les chemins `raw/...` désignent les fichiers de travail utilisés lors de la collecte ; les fichiers nationaux volumineux ne sont pas inclus dans ce dépôt. Les URL de téléchargement conservées permettent de retrouver les jeux sources lorsqu’elles restent actives.

Attribution à conserver : **INSEE** (COG, RP, Filosofi), **DREES** (APL, SAE), **Assurance Maladie** (cartographie des pathologies), **Santé publique France** (dépistage organisé), **ANS/FINESS** (référentiels), **ARS Bourgogne-Franche-Comté** (documentation GHT), **API administrative française** (géométries). Les fichiers dérivés sont identifiés comme croisements, agrégations ou simplifications et ne doivent pas être présentés comme des publications originales des producteurs.

Les jeux dont les métadonnées indiquent Licence Ouverte 2.0 conservent cette attribution et leurs conditions. Une licence manquante ou à vérifier n’est pas remplacée par une hypothèse. Les liens ARS, ORS, ATIH et RUBFC ne donnent pas une autorisation générale de réutiliser toute information de ces sites. Les tableaux à accès habilité ne sont pas intégrés.

Aucune licence logicielle n’a été choisie au nom du propriétaire du projet : il peut ajouter la licence souhaitée au code du tableau de bord. Cette décision est distincte des licences des données.

## Géométries : ODbL 1.0

Le catalogue officiel [Contours administratifs](https://www.data.gouv.fr/datasets/contours-administratifs), utilisé par l’API administrative, indique ODbL. Les GeoJSON simplifiés communaux et départementaux et le fond géométrique dérivé sont livrés sous [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). Attribution : data.gouv.fr — Contours administratifs, avec source IGN/Admin Express pour la BFC. Les transformations sont la fusion des communes par département et la simplification. Les fichiers dérivés sont librement téléchargeables dans `data/`.
