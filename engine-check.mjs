import assert from 'node:assert/strict';
import {createGame, getTarget, inspect, travel, insult, gift, printModels, nextSector, serialize, restore, view, generateTargets, PROFILES} from './docs/engine.js';

const fresh = createGame('qa-seed');
assert.deepEqual(fresh, createGame('qa-seed'), 'seeded games must reproduce');
assert.equal(restore('{bad'), null, 'bad JSON must recover safely');
assert.equal(restore(JSON.stringify({...fresh, phase: 'gift'})), null, 'gift requires a valid pending insult');
assert.equal(restore(JSON.stringify({...fresh, population:'-1'})), null);
assert.equal(restore(JSON.stringify({...fresh, completed:1})), null);
assert.deepEqual(restore(serialize(fresh)), fresh);
const places=['system','planet','continent','country','city'];
for (const profile of PROFILES) {
  const dossier=profile.dossier;
  for(const key of [...places,'species','personality','background','address']) assert.equal(typeof dossier[key],'string',`${profile.name}: ${key} must be authored text`);
  assert.equal(dossier.planet,profile.planetName,'dossier and destination planet must agree');
  assert.equal(dossier.familyCount,dossier.familyMembers.length,'family count must describe individual listed members');
  assert.ok(dossier.familyCount>0&&dossier.familyMembers.every(member=>typeof member==='string'&&member.length>0));
  assert.equal(profile.briefing.length,4,'each cockpit briefing has four sections');
  for(const line of profile.briefing) {
    assert.ok(line.length>=60&&line.length<=110,`${profile.name}: subtitle length ${line.length} is outside 60–110`);
    assert.ok(line.includes('私'),`${profile.name}: briefing must retain Wowbagger's first-person voice`);
  }
  assert.ok(places.every(key=>profile.briefing.join('').includes(dossier[key])),`${profile.name}: spoken route includes every geographic level`);
  assert.ok(profile.briefing[1].includes(dossier.species),'species appears in the spoken introduction');
  assert.ok(profile.briefing[3].includes('LGPS')&&profile.briefing[3].includes('結晶模型'),'every visit includes the LGPS model');
}
const legacySave=JSON.parse(serialize(fresh));
legacySave.targets.forEach(target=>{delete target.dossier;delete target.briefing;});
const upgradedSave=restore(JSON.stringify(legacySave));
assert.equal(upgradedSave.targetIndex,fresh.targetIndex);
assert.equal(upgradedSave.seed,fresh.seed);
assert.deepEqual(upgradedSave.targets[0].dossier,fresh.targets[0].dossier,'old saves receive dossiers without resetting progress');
const isolatedTargets=generateTargets(fresh.seed,1);
isolatedTargets[0].dossier.familyMembers[0]='edited by view';
isolatedTargets[0].briefing[0]='edited by view';
assert.notEqual(PROFILES[0].dossier.familyMembers[0],'edited by view');
assert.notEqual(PROFILES[0].briefing[0],'edited by view');

let state = fresh;
assert.equal(gift(state).event.type, 'blocked');
const initialJSON = serialize(state);
state = travel(state, {mode:'normal'}).state;
assert.equal(serialize(fresh), initialJSON, 'actions must never mutate their input');
assert.equal(state.phase, 'encounter');
assert.equal(travel(state).event.type, 'blocked');
state = inspect(state).state;
assert.equal(inspect(state).event.type, 'blocked', 'observe cannot repeat for farming');
state = insult(state, getTarget(state).choices.findIndex(choice => choice.effect === 3)).state;
assert.equal(state.phase, 'gift');
assert.equal(state.completed, 0, 'insults alone do not complete the mission');
assert.equal(state.score, 0, 'points wait until delivery');
state = restore(serialize(state));
assert.ok(state, 'saving in the middle of an encounter must resume');
state = gift(state).state;
assert.equal(state.completed, 1);
assert.equal(state.models, 2);
assert.equal(state.score, 225);
assert.equal(gift(state).event.type, 'blocked', 'double-click must not duplicate gifts');
assert.equal(restore(serialize({...state,completedIds:['citizen-2']})),null,'a future target cannot be falsely marked completed');
assert.equal(restore(serialize({...state,completedIds:['citizen-1','citizen-1']})),null,'duplicate completion history must be rejected');
const restoredDisplay = restore(serialize({...state,lastResult:{...state.lastResult,targetName:'<script>bad</script>',giftResponse:{invalid:true},targetColor:42}}));
assert.equal(restoredDisplay.lastResult.targetName,state.lastResult.targetName,'display strings are rebuilt from authored content');
assert.equal(restoredDisplay.lastResult.giftResponse,state.lastResult.giftResponse);
assert.equal(restoredDisplay.lastResult.targetColor,state.lastResult.targetColor);
const malformedResult = restore(serialize({...state,lastResult:{...state.lastResult,points:'wrong'}}));
assert.ok(malformedResult,'a damaged optional result panel should not discard valid game progress');
assert.equal(malformedResult.lastResult,null);
assert.equal(malformedResult.completed,1);

for (let i = 1; i < 6; i++) {
  state = travel(state,{mode:'warp'}).state;
  state = insult(state,getTarget(state).choices.findIndex(choice => choice.effect === 3)).state;
  if (state.models === 0) {
    const before = state.completed;
    const blockedGift = gift(state);
    assert.equal(blockedGift.event.type,'blocked');
    assert.equal(blockedGift.state,state,'zero-stock gifts preserve the entire pending encounter');
    state = printModels(state).state;
    assert.equal(state.phase,'gift','printing preserves the current handover');
    assert.equal(state.completed,before,'printing does not complete a visit');
  }
  state = gift(state).state;
}
assert.equal(state.phase,'result');
assert.equal(state.targetIndex,6);
assert.equal(state.completed,6);
assert.equal(getTarget(state),null);
assert.ok(restore(serialize(state)));
const firstRoles = new Set(generateTargets(state.seed,1).map(target=>target.role));
const secondTargets = generateTargets(state.seed,2);
assert.equal(secondTargets.length,6);
assert.ok(secondTargets.every(target=>!firstRoles.has(target.role)),'the second sector introduces six new personas');
assert.ok(secondTargets.every(target=>target.portrait>=0&&target.portrait<=5),'new personas retain the renderer contract');
for(let sector=3;sector<10;sector++) {
  const targets=generateTargets(state.seed,sector);
  assert.equal(new Set(targets.map(target=>target.role)).size,6,'a mixed sector contains six different personas');
  assert.deepEqual(targets,generateTargets(state.seed,sector),'mixed sectors remain deterministic');
}
const lastName = state.targets.at(-1).romanName;
state = nextSector(state).state;
assert.equal(state.phase,'map');
assert.equal(state.sector,2);
assert.ok(state.targets[0].romanName > lastName,'next sector continues the alphabetical register');
assert.equal(state.completed,6);
assert.equal(view(state).sectorScore,0);
assert.ok(restore(serialize(state)));

let deathObserved = false;
for (let seed = 0; seed < 50; seed++) {
  const result = travel(createGame(seed),{mode:'warp'});
  if (result.event.died) {
    deathObserved = true;
    assert.equal(result.state.phase,'encounter','immortality must not prevent reaching the target');
    assert.equal(result.state.deaths,1);
    assert.ok(result.state.years >= 42);
  }
}
assert.ok(deathObserved,'warp risk must actually be reachable');
const nearBoredom = {...createGame(77), boredom:99,models:0};
const afterSunday = printModels(nearBoredom).state;
assert.equal(afterSunday.sundays,1);
assert.equal(afterSunday.models,3,'boredom cannot remove the way out of a stock shortage');
assert.ok(afterSunday.years >=1000);

console.log('Engine verified: deterministic generation, immutable actions, mandatory LGPS gifts, supply recovery, save/resume, alphabetical progression, immortality, boredom recovery.');
