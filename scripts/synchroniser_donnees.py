"""Synchronise les JSON normalisés, CSV et données du navigateur.

Ne collecte pas de nouvelles sources. Toute nouvelle période, géographie ou
mesure exige aussi une revue des textes, méthodes et contrôles du tableau de bord.
"""
import pathlib,json,csv
R=pathlib.Path(__file__).resolve().parents[1];D=R/'data';P=R/'assets/data.js'
data=json.loads(P.read_text()[len('window.FHF_DATA='):].rstrip(' ;\n').replace('<\\/','</'))
mapping={'ght':'ref_ght','membres':'ref_membres_finess','etablissements':'ref_etablissement','departements':'croisement_departements','communes':'croisement_communes','apl_evolution':'apl_evolution','depistage':'depistage_sein','sources':'ref_source','dictionnaire':'dictionnaire_donnees','manques':'manques_actualises','anomalies':'anomalies_referentiel'}
for key,name in mapping.items():data[key]=json.loads((D/(name+'.json')).read_text())
offers=json.loads((D/'fait_offre.json').read_text());years={r['annee'] for r in offers}
if years!={2025}:raise ValueError('Revoir les libellés de période dans l’interface avant de changer le millésime SAE 2025.')
data['offre']=[]
for g in data['ght']:
 r={'code_ght':g['code_ght'],'code_sae':g['code_diffusion_sae'],'nom':g['nom_ght'],'annee':2025,'source':'SAE2025'}
 for x in offers:
  if x['code_ght']==g['code_ght']:r[x['indicateur']]=x['valeur']
 data['offre'].append(r)
for file in D.glob('*.json'):
 rows=json.loads(file.read_text());dest=file.with_suffix('.csv')
 if isinstance(rows,list) and rows and isinstance(rows[0],dict):
  keys=list(dict.fromkeys(k for row in rows for k in row))
  with dest.open('w',encoding='utf-8-sig',newline='') as f:
   w=csv.DictWriter(f,fieldnames=keys,delimiter=';');w.writeheader();w.writerows(rows)
P.write_text('window.FHF_DATA='+json.dumps(data,ensure_ascii=False,separators=(',',':'),allow_nan=False).replace('</','<\\/')+';\n',encoding='utf-8')
print('JSON → CSV et assets/data.js synchronisés ; exécuter ensuite les contrôles.')
