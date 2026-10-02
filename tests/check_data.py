"""Contrôles sans dépendance externe. Exécution depuis n'importe quel dossier."""
import pathlib,json,csv,math,re
R=pathlib.Path(__file__).resolve().parents[1];P=R/'data'
def load(name):return json.loads((P/(name+'.json')).read_text())
c=load('croisement_communes');d=load('croisement_departements');g=load('ref_ght');e=load('ref_etablissement');off=load('fait_offre')
assert len(c)==3685 and len({x['code'] for x in c})==3685
assert all(isinstance(x['code'],str) and len(x['code'])==5 for x in c)
assert len(g)==11 and len({x['code_ght'] for x in g})==11
assert len({x['finess_support'] for x in g})==11
assert all(len(x['finess_support'])==9 for x in g)
assert sum(x['ej_publiees'] for x in g)==52 and len(e)==443
assert len(off)==264 and len({(x['code_ght'],x['indicateur'],x['annee']) for x in off})==264
for code in {x['code_ght'] for x in g}:
 vals={x['indicateur']:x['valeur'] for x in off if x['code_ght']==code}
 assert math.isclose(vals['LIT_MCO'],vals['LIT_MED']+vals['LIT_CHI']+vals['LIT_OBS'])
reg=next(x for x in d if x['code']=='27');deps=[x for x in d if x['code']!='27']
assert len(deps)==8 and math.isclose(reg['population_2023'],sum(x['population_2023'] for x in deps))
assert reg['population_2023']==2802670
den=sum(x['population_standardisee_2022'] for x in c)
weighted=sum(x['apl_2024']*x['population_standardisee_2022'] for x in c)/den
assert math.isclose(weighted,reg['apl_2024'],rel_tol=1e-12)
assert math.isclose(sum(x['population_2022'] for x in c),2803977,abs_tol=.001)
assert len([x for x in c if x['pauvrete_2023'] is not None])==198
assert len([x for x in c if x['apl_2024']<3])==2052
assert len([x for x in c if x['apl_2024']<3 and x['pauvrete_2023'] is not None and x['pauvrete_2023']>=15])==35
assert all(x['code_ght'] is None for x in c)
assert all(x['code_ght'] is None for x in load('ref_commune'))
for name in ['fait_besoin','fait_flux','fait_cooperation','fait_maturite','ref_filiere','ref_codegeo_pmsi']:
 assert load(name)==[]
 with (P/(name+'.csv')).open(encoding='utf-8-sig',newline='') as f:
  r=list(csv.reader(f,delimiter=';'));assert len(r)==1 and len(r[0])>1
assert len(load('modele_collecte_maturite'))==33
assert all(x['niveau'] is None for x in load('modele_collecte_maturite'))
fc=json.loads((P/'contours_communes.geojson').read_text());fd=json.loads((P/'contours_departements.geojson').read_text());fg=json.loads((P/'contours_ght.geojson').read_text())
assert {x['properties']['code'] for x in fc['features']}=={x['code'] for x in c}
assert {x['properties']['code'] for x in fd['features']}=={x['code'] for x in deps}
assert not fg['features'] and fg['statut']=='A_VALIDER'
data=json.loads((R/'assets/data.js').read_text()[len('window.FHF_DATA='):].rstrip(' ;\n').replace('<\\/','</'))
assert data['communes']==c and data['departements']==d and data['sources']==load('ref_source')
assert len(data['geo']['deps'])==8 and data['projection']['scale']>0
assert set(load('referentiel'))=={'TERR','FIL','ANS','IND','COOP','REF'}
for f in P.glob('*.csv'):
 with f.open(encoding='utf-8-sig',newline='') as stream:
  rows=list(csv.reader(stream,delimiter=';'));assert len(rows[0])>1;assert all(len(r)==len(rows[0]) for r in rows)
for f in [R/'index.html',R/'assets/app.js']:
 for target in re.findall(r'(?:href|src)=["\']([^"\']+)',f.read_text()):
  if not target.startswith(('http','mailto:','#')) and '${' not in target:assert (R/target).exists(),target
result=dict(success=True,communes=3685,ght=11,mesures_offre=24,faits_offre=264,sites=443,pauvrete_diffusee=198,communes_cumul_3_15=35,apl_region=weighted,population_rp2023=2802670,geometries_codes='CONCORDANTS',non_testables=['partition_residence_GHT','population_GHT','public_MCO_exhaustif','parts_flux_100pct'])
(R/'tests/resultats_donnees.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result,ensure_ascii=False,indent=2))
