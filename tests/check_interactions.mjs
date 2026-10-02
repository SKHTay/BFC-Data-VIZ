// Tests de calculs et interactions avec DOM simulé ; pas de navigateur réel.
import fs from 'node:fs/promises';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url).pathname, html=await fs.readFile(root+'index.html','utf8'),elements=new Map(),all=[],downloads=[],blobs=[];
class Element{
 constructor(tag='div',attrs={}){this.tag=tag;this.id=attrs.id||'';this.attrs=attrs;this.dataset={};for(const[k,v]of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5)]=v;this._html='';this.value=attrs.value||'';this.textContent='';this.clientWidth=650;this.hidden='hidden'in attrs;this.attributes={};this.classList={toggle(){}};}
 set innerHTML(v){this._html=v;if(this.tag==='select'){this.options=[...v.matchAll(/<option(?: value="([^"]*)")?[^>]*>(.*?)<\/option>/gs)].map(x=>({value:x[1]??x[2]}));this.value=this.options[0]?.value??'';}}
 get innerHTML(){return this._html;}
 setAttribute(k,v){this.attributes[k]=v;}
 focus(){this.focused=true;}
 click(){if(this.tag==='a')downloads.push({name:this.download,blob:blobs.at(-1)});else this.onclick?.();}
}
for(const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/g)){const attrs={};for(const a of m[2].matchAll(/([\w-]+)="([^"]*)"/g))attrs[a[1]]=a[2];if(/\bhidden\b/.test(m[2]))attrs.hidden='';const el=new Element(m[1],attrs);all.push(el);if(el.id)elements.set(el.id,el);}
for(const m of html.matchAll(/<select id="([^"]+)"[^>]*>(.*?)<\/select>/gs))elements.get(m[1]).innerHTML=m[2];
const $=id=>{assert.ok(elements.has(id),'Élément manquant '+id);return elements.get(id);};
const document={getElementById:$,querySelectorAll(s){if(s==='[data-tab]')return all.filter(x=>x.dataset.tab);if(s==='[data-view]')return all.filter(x=>x.dataset.view);if(s==='.subview')return all.filter(x=>x.attrs.class?.includes('subview'));if(s==='.plot')return all.filter(x=>x.attrs.class==='plot');if(s==='main > section[role=tabpanel]')return all.filter(x=>x.tag==='section'&&x.attrs.role==='tabpanel');throw Error('Sélecteur non simulé '+s);},createElement(tag){return new Element(tag);}};
const context=vm.createContext({document,history:{replaceState(){}},location:{hash:''},Blob,URL:{createObjectURL(b){blobs.push(b);return'blob:test';},revokeObjectURL(){}},setTimeout(f){f();},clearTimeout(){},console});context.window=context;
vm.runInContext(await fs.readFile(root+'assets/data.js','utf8'),context);vm.runInContext(await fs.readFile(root+'assets/app.js','utf8'),context,{timeout:30000});
const app=context.FHF_APP,D=context.FHF_DATA;
const count=(id,re)=>[...$(id).innerHTML.matchAll(re)].length;
const valid=id=>assert.ok(!/NaN|Infinity|undefined/.test($(id).innerHTML),id+' : valeur invalide');
assert.equal(count('depMap',/data-id="/g),8);
for(const metric of $('depX').options){$('depX').value=metric.value;$('depY').value=metric.value;$('depColor').value=metric.value;app.updateDep();valid('depScatter');valid('depMap');}
app.setView('communes');let stat=app.getCommStats();assert.equal(stat.total,3685);assert.equal(stat.valid,198);assert.equal(stat.both,35);assert.ok(Math.abs(stat.coverage-51.2250992073)<1e-5);assert.equal(count('commMap',/data-id="/g),3685);
$('commSearch').value='21231';$('commSearch').oninput();assert.equal(app.getCommStats().total,1);assert.ok($('commTable').innerHTML.includes('Dijon'));$('exportComm').onclick();const exported=await downloads.at(-1).blob.text();assert.equal(exported.split('\r\n').length,2);assert.ok(exported.includes('21231')&&exported.includes('APL'));
$('commSearch').value=D.communes.find(x=>x.pauvrete_2023===null).code;$('commSearch').oninput();assert.equal(app.getCommStats().valid,0);assert.ok($('commTable').innerHTML.includes('Non diffusé'));valid('commScatter');
$('commSearch').value='COMMUNE_INEXISTANTE';$('commSearch').oninput();assert.equal(app.getCommStats().total,0);valid('commScatter');valid('commMap');
$('commSearch').value='';$('aplThreshold').value='0';$('aplThreshold').onchange();assert.equal(app.getCommStats().popUnder,0);$('aplThreshold').value='3';app.updateComm();
app.setView('ght');assert.equal($('offerMetric').options.length,24);for(const metric of $('offerMetric').options){$('offerMetric').value=metric.value;app.updateGht();valid('offerBars');valid('offerScatter');valid('bedsChart');}
$('ghtSelect').value='BFC-07';$('ghtSelect').onchange();assert.equal(count('membersTable',/<tr>/g)-1,9);
app.setTab('coop');for(const period of $('screenCurrent').options){$('screenCurrent').value=period.value;$('screenCurrent').onchange();valid('screenChart');}valid('urgChart');assert.equal($('screenCurrent').options.length,9);
app.setTab('maturite');assert.equal(count('maturityGrid',/Non renseigné/g),33);
app.setTab('sources');valid('sourcesTable');assert.ok($('qualityTable').innerHTML.includes('NON TESTABLE'));assert.equal(count('sourcesTable',/<tr>/g)-1,D.sources.length);$('sourceSearch').value='DREES';$('sourceSearch').oninput();assert.ok(count('sourcesTable',/<tr>/g)-1>0);
const r=app.pearson([{a:1,b:2},{a:2,b:4},{a:3,b:6},{a:null,b:9}],'a','b');assert.equal(r.n,3);assert.equal(r.r,1);
$('reset').onclick();app.setTab('carte');assert.equal(app.state.ght,null);assert.equal(app.state.view,'departements');
await fs.mkdir(root+'tests/svg',{recursive:true});
for(const width of [650,340]){for(const el of all)el.clientWidth=width;app.setView('departements');await fs.writeFile(root+`tests/svg/departements_${width}.svg`,$('depScatter').innerHTML);await fs.writeFile(root+`tests/svg/carte_${width}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="617" viewBox="0 0 800 617">${$('depMap').innerHTML}</svg>`);app.setView('communes');await fs.writeFile(root+`tests/svg/communes_${width}.svg`,$('commScatter').innerHTML);app.setView('ght');await fs.writeFile(root+`tests/svg/offre_${width}.svg`,$('offerBars').innerHTML);await fs.writeFile(root+`tests/svg/lits_${width}.svg`,$('bedsChart').innerHTML);app.setTab('coop');await fs.writeFile(root+`tests/svg/depistage_${width}.svg`,$('screenChart').innerHTML);app.setTab('carte');}
const result={success:true,mode:'DOM simulé ; calculs et événements exécutés, pas de navigateur réel',onglets:5,communes:3685,mesures_offre:24,periodes_depistage:9,maturite_non_renseignee:33,tests:['filtres','export CSV Dijon','valeurs non diffusées','sélection vide','seuil zéro','24 mesures offre','composition GHT','9 périodes dépistage','corrélation paires complètes','sources','réinitialisation'],largeurs_svg:[650,340]};await fs.writeFile(root+'tests/resultats_interactions.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
