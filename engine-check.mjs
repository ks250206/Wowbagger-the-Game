import assert from 'node:assert/strict';
import {createGame,getTarget,getPreviousTarget,localizeTarget,inspect,travel,insult,gift,printModels,nextSector,serialize,restore,view,generateTargets,setLocale,PROFILES,SAVE_VERSION} from './docs/engine.js';
import {profileList} from './docs/profiles.js';

const fresh=createGame('qa-seed');
assert.equal(SAVE_VERSION,2);
assert.deepEqual(fresh,createGame('qa-seed'),'seeded games reproduce');
assert.deepEqual(restore(serialize(fresh)),fresh,'fresh state round-trips');
for(const raw of ['{bad',JSON.stringify({...fresh,phase:'gift'}),JSON.stringify({...fresh,population:'-1'}),JSON.stringify({...fresh,completed:1})])assert.equal(restore(raw),null);

const geography=['system','planet','continent','country','city'];
assert.equal(PROFILES.length,24);
for(const locale of ['ja','en'])for(const profile of profileList(locale)){
 const d=profile.dossier;
 for(const key of [...geography,'species','personality','background','address'])assert.equal(typeof d[key],'string',`${locale}/${profile.profileId}/${key}`);
 assert.equal(d.planet,profile.planetName);
 if(profile.kind==='arthur'){
  assert.equal(d.familyCount,null,'canon must not invent a family size');assert.deepEqual(d.familyMembers,[]);assert.ok(d.familyNote);assert.ok(profile.canonNote);assert.match(profile.canonSource,/penguinrandomhouseretail/);
 }else{assert.equal(d.familyCount,d.familyMembers.length);assert.ok(d.familyCount>0);}
 assert.equal(profile.briefing.length,4);
 assert.ok(profile.briefing.every(line=>line.length>30));
 assert.ok(profile.briefing[3].includes('LGPS'),'every mission retains the model');
 assert.deepEqual(profile.choices.map(c=>c.effect),[3,2,1]);
 if(locale==='en')assert.doesNotMatch(JSON.stringify(profile),/[\u3040-\u30ff\u3400-\u9fff]/,'English profiles must have no Japanese fallback');
}
const first=generateTargets(fresh.seed,1);
assert.deepEqual(first.map(t=>t.romanName),['Argo Hanko','Arthur Philip Dent','Bela Echo','Chroma Live','Col Unopened','Doctor Noise']);
const firstFour=[1,2,3,4].flatMap(sector=>generateTargets(fresh.seed,sector));
assert.equal(new Set(firstFour.slice(0,24).map(t=>t.profileId)).size,24,'all authored people appear exactly once before new fictional registrations');
assert.equal(firstFour[1].profileId,'arthur');
assert.ok(firstFour.slice(0,24).every(t=>!t.registryPrefix),'actual full names govern the authored opening');
const longDirectory=Array.from({length:75},(_,i)=>generateTargets(fresh.seed,i+1)).flat();
assert.equal(longDirectory.filter(t=>t.kind==='arthur').length,1,'the canonical person is never randomly cloned');
assert.ok(longDirectory.every((t,i)=>!i||longDirectory[i-1].romanName<t.romanName),'alphabetic order continues across sector boundaries');
assert.deepEqual(generateTargets(fresh.seed,75),generateTargets(fresh.seed,75));
for(const sector of [1,2,3,75,50000000]){
 const ja=generateTargets(fresh.seed,sector,'ja'),en=generateTargets(fresh.seed,sector,'en');
 assert.deepEqual(ja.map(t=>[t.id,t.profileId,t.romanName,t.x,t.y,t.choices.map(c=>c.effect)]),en.map(t=>[t.id,t.profileId,t.romanName,t.x,t.y,t.choices.map(c=>c.effect)]),'locale cannot alter route or choice order');
}
const isolated=generateTargets(fresh.seed,1);isolated[0].dossier.familyMembers[0]='edited';isolated[0].briefing[0]='edited';assert.notEqual(PROFILES[0].dossier.familyMembers[0],'edited');assert.notEqual(PROFILES[0].briefing[0],'edited');

let state=fresh;
assert.equal(gift(state).event.type,'blocked');const untouched=serialize(state);
state=travel(state).state;assert.equal(serialize(fresh),untouched,'actions are immutable');assert.equal(state.phase,'encounter');assert.equal(travel(state).event.type,'blocked');
state=inspect(state).state;assert.equal(inspect(state).event.type,'blocked');
state=insult(state,getTarget(state).choices.findIndex(c=>c.effect===3)).state;
assert.equal(state.phase,'gift');assert.equal(state.completed,0);assert.equal(state.score,0,'no points before the model');
const beforeLocale=cloneMetrics(state),choiceEffect=state.pendingInsult.effect;
state=setLocale(state,'en');assert.deepEqual(cloneMetrics(state),beforeLocale);assert.equal(state.pendingInsult.effect,choiceEffect);assert.equal(state.pendingInsult.targetName,'Argo Hanko');
assert.doesNotMatch(state.pendingInsult.insultText,/[\u3040-\u30ff\u3400-\u9fff]/);assert.ok(state.log.every(item=>!/[\u3040-\u30ff\u3400-\u9fff]/.test(item.message)));
assert.deepEqual(restore(serialize(state)),state,'a gift in English round-trips');
state=gift(state).state;assert.equal(state.completed,1);assert.equal(state.models,2);assert.equal(state.score,225);assert.equal(gift(state).event.type,'blocked');
assert.equal(getTarget(state).profileId,'arthur','Arthur follows Argo through normal gameplay');
assert.equal(getPreviousTarget(state).profileId,'argo');assert.equal(localizeTarget(getPreviousTarget(state),'ja').name,'アルゴ・ハンコ');
assert.equal(restore(serialize({...state,completedIds:['citizen-2']})),null);assert.equal(restore(serialize({...state,completedIds:['citizen-1','citizen-1']})),null);
const rebuilt=restore(serialize({...state,lastResult:{...state.lastResult,targetName:'<script>',giftResponse:{bad:1},targetColor:42}}));assert.equal(rebuilt.lastResult.targetName,'Argo Hanko');assert.equal(rebuilt.lastResult.giftResponse,state.lastResult.giftResponse);
const damaged=restore(serialize({...state,lastResult:{...state.lastResult,points:'wrong'}}));assert.equal(damaged.lastResult,null);assert.equal(damaged.completed,1);
state=setLocale(state,'ja');assert.equal(state.lastResult.targetName,'アルゴ・ハンコ');assert.match(state.lastResult.fact,/原子/);
for(let i=1;i<6;i++)state=completeVisit(state);
assert.equal(state.phase,'result');assert.equal(state.targetIndex,6);assert.equal(state.completed,6);assert.equal(getTarget(state),null);
const summaryMetrics=cloneMetrics(state);state=setLocale(state,'en');assert.deepEqual(cloneMetrics(state),summaryMetrics);assert.equal(getPreviousTarget(state).profileId,'noise');assert.doesNotMatch(view(state).rank,/[\u3040-\u30ff\u3400-\u9fff]/);assert.deepEqual(restore(serialize(state)),state);
const lastName=state.targets.at(-1).romanName;state=nextSector(state).state;assert.equal(state.sector,2);assert.equal(state.completed,6);assert.equal(view(state).sectorScore,0);assert.ok(getTarget(state).romanName>lastName);assert.ok(restore(serialize(state)));

// A genuine v1 save captured after eight deliveries, with a weak Sulf insult
// awaiting its gift. The old text is deliberately not reused as the identity.
const legacy={version:1,seed:1514380960,rng:1514380960,sector:2,targetIndex:2,phase:'gift',ship:{x:.55,y:.76},years:116,population:'4628374973708494016415988',completed:8,score:2020,boredom:7,combo:8,maxCombo:8,models:1,deaths:0,sundays:0,inspected:false,completedIds:Array.from({length:8},(_,i)=>`citizen-${i+1}`),log:[{type:'insult',message:'「スパチュラがやけに長いな。」',years:116}],pendingInsult:{targetId:'citizen-9',targetName:'サルフ・ゼロ 2号',insultText:'スパチュラがやけに長いな。',effect:1,points:45,observed:false},lastResult:{targetId:'citizen-8',effect:3,points:305,observed:false,combo:8,comboBonus:105},sectorStartScore:1425};
let migrated=restore(JSON.stringify(legacy));assert.ok(migrated);assert.equal(migrated.version,2);assert.equal(migrated.migrationNotice,'finish-legacy-sector');
assert.equal(getTarget(migrated).profileId,'sulf');assert.equal(getTarget(migrated).romanName,'Aaaaaj Sulf Zero');assert.equal(migrated.pendingInsult.effect,1);assert.equal(migrated.pendingInsult.points,45);
for(const key of ['sector','targetIndex','completed','score','models','years','combo','maxCombo'])assert.equal(migrated[key],legacy[key],`migration retains ${key}`);
assert.equal(getPreviousTarget(migrated).profileId,'ludo');
migrated=setLocale(migrated,'en');assert.match(migrated.log[0].message,/Archived/);assert.equal(migrated.log[0].params.legacyText,legacy.log[0].message,'old wording remains available in the saved record');assert.equal(migrated.pendingInsult.targetName,'Sulf Zero #2');assert.deepEqual(restore(serialize(migrated)),migrated);
migrated=gift(migrated).state;assert.equal(migrated.completed,9);while(migrated.phase!=='result')migrated=completeVisit(migrated);
const legacyTotals=cloneMetrics(migrated);migrated=nextSector(migrated).state;assert.equal(migrated.sector,3);assert.equal(migrated.completed,12);assert.equal(migrated.score,legacyTotals.score);assert.equal(migrated.models,legacyTotals.models);assert.equal(migrated.migrationNotice,'revised-directory');assert.equal(getTarget(migrated).romanName,'Argo Hanko');assert.equal(getTarget(migrated).id,'citizen-13');assert.equal(migrated.targets[1].romanName,'Arthur Philip Dent');assert.equal(migrated.targets[1].id,'citizen-14');assert.deepEqual(restore(serialize(migrated)),migrated);
migrated=completeVisit(migrated);assert.equal(getTarget(migrated).profileId,'arthur');assert.equal(migrated.completed,13,'historical deliveries retain their count');

let sawDeath=false;for(let seed=0;seed<50;seed++){const r=travel(createGame(seed,'en'),{mode:'warp'});if(r.event.died){sawDeath=true;assert.equal(r.state.phase,'encounter');assert.equal(r.state.deaths,1);assert.ok(r.state.years>=42);}}
assert.ok(sawDeath);const afterSunday=printModels({...createGame(77),boredom:99,models:0}).state;assert.equal(afterSunday.sundays,1);assert.equal(afterSunday.models,3);assert.ok(afterSunday.years>=1000);
console.log('Engine verified: 24 bilingual profiles across 4 full sectors, Arthur in real full-name order, unique canonical encounter, immutable locale changes, gift/score integrity, old-save migration, persistence, inventory recovery, immortality.');
function cloneMetrics(s){return Object.fromEntries(['rng','sector','targetIndex','phase','completed','score','models','years','combo','maxCombo','boredom','deaths','sundays'].map(k=>[k,s[k]]));}
function completeVisit(s){if(s.phase==='map')s=travel(s,{mode:'normal'}).state;if(s.phase==='encounter')s=insult(s,getTarget(s).choices.findIndex(c=>c.effect===3)).state;if(s.models===0){const blocked=gift(s);assert.equal(blocked.event.type,'blocked');assert.equal(blocked.state,s);s=printModels(s).state;assert.equal(s.phase,'gift');}return gift(s).state;}
