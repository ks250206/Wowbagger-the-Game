/** Pure state transitions. Names are filed by their full English spelling. */
import {JA_PROFILES, LEGACY_ORDER, profileList, profileFor} from './profiles.js';
export const SAVE_VERSION = 2;
export const SECTOR_SIZE = 6;
export const MODEL_CAPACITY = 3;
export const PROFILES = Object.freeze(JA_PROFILES);
const START_POPULATION = 4628374609283746200000000n;
const BIRTHS_PER_YEAR = 3141592653589793n;
const PHASES = new Set(['map','encounter','gift','result']);
const POINTS = [0,45,90,150];
const COORDS = [[.22,.28],[.49,.21],[.78,.32],[.86,.68],[.55,.76],[.25,.65]];
const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
const clone=value=>JSON.parse(JSON.stringify(value));
const safeInt=(n,lo=0,hi=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=lo&&n<=hi;
const language=locale=>locale==='en'?'en':'ja';

const COPY={
 ja:{
  sleep:'退屈に負けて千年眠った。日曜の午後は、まだこちらの辞職を認めていなかった。',
  fresh:'永遠の事業を開始した。最初の六人で終わるという意見は、委員会に提出しないことにした。',
  inspectFirst:'まず会いたまえ。不在の相手を観察するのは、星占いの仕事だ。',
  inspected:'これ以上見つめても、人柄への返品保証は付かない。',
  observed:p=>`${p.name}を観察した。自慢はよく燃える。今回も燃料不足の心配はなさそうだ。`,
  outstanding:'目の前の相手への用件が残っている。途中で親切になるのは職務放棄だ。',
  complete:'この区画は完了している。宇宙が小さくなったわけではない。',
  mode:'航法を選び直そう。祈祷は標準装備に含まれていない。',
  died:'ワープ出口が恒星の中だった。一度死に、再生した。保証書の「通常の使用」の定義について考えた。',
  warp:'危ない航路で無事到着した。宇宙船はこの結果を、自社の実績と呼んでいる。',
  normal:'安全航路で到着した。船内音楽は一曲だったが、時間だけは十分にあった。',
  arrived:p=>`${p.planet}に到着。${p.years}年経過。移動距離より待たされた気がする。`,
  insultOnce:'一人に一度。悪口にも、最低限の過剰サービス防止規定がある。',
  choose:'悪口を一つ選ぼう。委員会は不要だ。',
  insulted:p=>`「${p.insult}」`,
  giftFirst:'先に悪口を。模型だけ渡せば、普通に感じのよい人になってしまう。',
  noModels:'模型がない。プリンターで三個作ろう。八年程度なら、すぐという分類だ。',
  duplicate:'その贈呈は処理済みだ。同じ不愉快を二度請求するつもりはない。',
  gifted:p=>`${p.name}にLGPS結晶模型を手渡した。${p.points}点。お礼の有無は採点対象ではない。`,
  sectorDone:p=>`第${p.sector}区画の六人に悪口と模型を配った。宇宙は閉店時間を提示しなかった。`,
  printNext:'次の区画へ進もう。今はプリンターにも区切りを理解する機会を与えたい。',
  full:'棚は三個で満杯だ。空間というものは、宇宙にばかり贅沢に配分されている。',
  printed:p=>`模型を${p.amount}個造形した。八年待った。「あと少し」の表示は正確ではなかった。`,
  printSleep:'印刷中に千年眠った。模型は三個。進捗表示は最後まで「まもなく」だった。',
  printDone:'Li₁₀GeP₂S₁₂の模型を補充した。悪口は一人ずつ選ぶが、贈り物の趣味には融通が利かない。',
  unfinished:'この区画に未贈呈の模型がある。忘れたふりは、配達完了とは異なる。',
  next:p=>`第${p.sector}区画の名簿を開いた。名前順に進んでいる。達成感の順ではない。`,
  nextMessage:'次の六人へ。待っているかは確認していない。待たせるつもりも、特になかった。',
  revised:'改訂名簿を開いた。英語のフルネーム順でArgo、Arthur、Belaへ。長い仕事にも、整頓だけは必要だ。',
  legacyEntry:p=>p.legacyText||'旧航海の記録。記録の存在は、事業の有用性を保証しない。',
  migration:'現在の区画は旧名簿のまま完了できます。次の区画から、アーサーを含むフルネーム順の改訂名簿へ進みます。得点・年月・在庫は引き継がれます。',
  revisedNotice:'改訂名簿に移行しました。過去の配達数と得点を引き継ぎ、Argo → Arthur → Belaの順で巡回します。',
 },
 en:{
  sleep:'Slept for a thousand years from boredom. Sunday afternoon had still not accepted the resignation.',
  fresh:'Established an eternal undertaking. Suggestions that six people might suffice were not forwarded to a committee.',
  inspectFirst:'Meet the recipient first. Observing absent people is the astrology department’s business.',
  inspected:'Further staring will not provide a warranty on the personality.',
  observed:p=>`Observed ${p.name}. Vanity burns beautifully; fuel shortages seem unlikely.`,
  outstanding:'Business with the present recipient remains unfinished. Becoming pleasant halfway through would be neglect of duty.',
  complete:'This section is finished. The Universe has not become smaller.',
  mode:'Choose a navigation method. Prayer is not included as standard.',
  died:'The warp exit was inside a star. Died, regenerated, reconsidered the warranty’s definition of normal use.',
  warp:'Arrived safely by an unsafe route. The spacecraft has filed this as evidence of its own excellence.',
  normal:'Arrived by the safe route. The cabin music comprised one song, with ample time in which to appreciate this.',
  arrived:p=>`Arrived at ${p.planet}. ${p.years} ${p.years===1?'year':'years'} elapsed. It felt longer than the distance.`,
  insultOnce:'Once per recipient. Even abuse has minimal safeguards against excessive service.',
  choose:'Choose one insult. A committee is unnecessary.',
  insulted:p=>`“${p.insult}”`,
  giftFirst:'The insult first. Giving only the model would make this an alarmingly pleasant visit.',
  noModels:'No models. Print three more. Eight years qualifies as shortly.',
  duplicate:'That presentation has been processed. We do not invoice the same unpleasantness twice.',
  gifted:p=>`Handed an LGPS crystal model to ${p.name}. ${p.points} points. Gratitude was not part of the assessment.`,
  sectorDone:p=>`Six recipients in sector ${p.sector} received insults and models. The Universe declined to state its closing time.`,
  printNext:'Proceed to the next sector. Allow the printer an opportunity to understand closure.',
  full:'The shelf holds three and is full. Space has been allocated with extravagant generosity everywhere except here.',
  printed:p=>`Printed ${p.amount} ${p.amount===1?'model':'models'} in eight years. The estimate of “nearly done” was optimistic.`,
  printSleep:'Slept a thousand years while printing. Three models await. The display said “shortly” throughout.',
  printDone:'Li₁₀GeP₂S₁₂ models replenished. Insults are individual; taste in presents remains inflexible.',
  unfinished:'Someone in this sector still lacks a model. Pretending to forget is not delivery.',
  next:p=>`Opened the directory for sector ${p.sector}. Proceeding alphabetically, not in order of fulfilment.`,
  nextMessage:'Another six people. Whether they are waiting was not checked; keeping them waiting was never the ambition.',
  revised:'Opened the revised directory: Argo, Arthur, Bela, by full English name. Even an endless task can be filed properly.',
  legacyEntry:p=>({travel:'Archived voyage: a destination was reached.',rebirth:'Archived voyage: a warp accident was survived.',observe:'Archived voyage: a recipient was inspected.',insult:'Archived voyage: an insult was delivered.',gift:'Archived voyage: an LGPS model was handed over.',print:'Archived voyage: models were printed.',sector:'Archived voyage: a directory section was completed.',eternity:'Archived voyage: a prolonged Sunday was endured.'}[p.legacyType]||'Archived entry from the previous directory. The original record remains in the saved voyage.'),
  migration:'Finish the current sector using its original directory. The next sector opens the revised full-name list, including Arthur. Scores, years and cargo are retained.',
  revisedNotice:'The revised directory is open. Previous deliveries and scores are retained; the route now begins Argo → Arthur → Bela.',
 }
};
function say(locale,key,params={}) {const value=COPY[language(locale)][key]??COPY.ja[key]??key;return typeof value==='function'?value(params):value;}
function hashSeed(value) {const text=String(value);let hash=2166136261;for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);return hash>>>0||1;}
function random(state) {state.rng=(state.rng+0x6D2B79F5)>>>0;let n=state.rng;n=Math.imul(n^n>>>15,n|1);n^=n+Math.imul(n^n>>>7,n|61);return ((n^n>>>14)>>>0)/4294967296;}
function shuffled(values,rng) {const result=values.map(x=>typeof x==='object'?{...x}:x);for(let i=result.length-1;i>0;i--){const j=Math.floor(random(rng)*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
function letters(index,width) {let n=index,word='';do{word=String.fromCharCode(97+n%26)+word;n=Math.floor(n/26);}while(n>0);return word.padStart(width,'a');}
function legacyPrefix(index) {const word=letters(index,6);return word[0].toUpperCase()+word.slice(1);}
const sortedProfiles=locale=>[...profileList(locale)].sort((a,b)=>a.roman<b.roman?-1:a.roman>b.roman?1:0);

function buildTarget(profile,{ordinal,routeOrdinal,point,rng,locale,registryPrefix='',legacySuffix=0,legacy=false}) {
 const target={
  id:`citizen-${ordinal}`,ordinal,routeOrdinal,profileId:profile.profileId,kind:profile.kind,
  romanName:registryPrefix?`${registryPrefix} ${profile.roman}`:profile.roman,
  registryPrefix,legacySuffix,legacy,x:point[0],y:point[1],color:profile.color,portrait:profile.portrait,
  choices:shuffled(profile.choices,rng),
 };
 return localizeTarget(target,locale);
}
/** The first thirteen entries have actual names; later fictional registers use Z-prefixed names. */
export function generateTargets(seed,sector,locale='ja',completedBase=0) {
 const selectedLocale=language(locale),roster=sortedProfiles(selectedLocale);
 const fiction=roster.filter(p=>p.kind!=='arthur');
 const rng={rng:hashSeed(`${seed}:${sector}`)};
 const coordinateOffset=sector===1?0:Math.floor(random(rng)*6);
 return Array.from({length:SECTOR_SIZE},(_,index)=>{
  const routeOrdinal=(sector-1)*SECTOR_SIZE+index+1;
  let profile,registryPrefix='';
  if(routeOrdinal<=roster.length)profile=roster[routeOrdinal-1];
  else {
   const tail=routeOrdinal-roster.length-1;
   const pool=shuffled(fiction,{rng:hashSeed(`${seed}:register:${Math.floor(tail/fiction.length)}`)});
   profile=pool[tail%fiction.length];registryPrefix=`Z${letters(tail+1,7)}`;
  }
  return buildTarget(profile,{ordinal:completedBase+routeOrdinal,routeOrdinal,point:COORDS[(index+coordinateOffset)%6],rng,locale:selectedLocale,registryPrefix});
 });
}
/** Reconstruct the exact old sector membership, without trusting text in a save. */
function legacyTargets(seed,sector,locale='ja') {
 const original=LEGACY_ORDER.map(id=>profileFor(id,locale));
 const rng={rng:hashSeed(`${seed}:${sector}`)};
 const profiles=sector===1?original.slice(0,6):sector===2?shuffled(original.slice(6),rng):shuffled(original,rng).slice(0,6);
 const offset=sector===1?0:Math.floor(random(rng)*6);
 return profiles.map((profile,index)=>{
  const ordinal=(sector-1)*6+index+1;
  return buildTarget(profile,{ordinal,routeOrdinal:ordinal,point:COORDS[(index+offset)%6],rng,locale,registryPrefix:legacyPrefix(ordinal),legacySuffix:sector===1?0:sector,legacy:true});
 });
}
export function localizeTarget(target,locale='ja') {
 if(!target)return null;
 const selectedLocale=language(locale),profile=profileFor(target.profileId,selectedLocale);
 if(!profile)return clone(target);
 const next={...clone(target),locale:selectedLocale};
 for(const key of ['role','species','planetName','intro','hint','giftResponse','fact','canonNote','canonSource']) {
  if(profile[key]!==undefined)next[key]=profile[key];else delete next[key];
 }
 next.name=target.legacy
  ? `${profile.name}${target.legacySuffix?(selectedLocale==='en'?` #${target.legacySuffix}`:` ${target.legacySuffix}号`):''}`
  : target.registryPrefix?(selectedLocale==='en'?`${target.registryPrefix} ${profile.roman}`:`${profile.name}〈${target.registryPrefix}〉`):profile.name;
 next.dossier=clone(profile.dossier);next.briefing=[...profile.briefing];
 next.choices=(target.choices||profile.choices).map(choice=>({...profile.choices.find(item=>item.effect===choice.effect)}));
 next.response=profile.choices[0].response;
 return next;
}
function currentTargets(state) {
 return state.legacyUntil>=state.sector*6
  ?legacyTargets(state.seed,state.sector,state.locale)
  :generateTargets(state.seed,state.sector-state.legacyUntil/6,state.locale,state.legacyUntil);
}
export function getTarget(state) {return state.targets[state.targetIndex]||null;}
export function targetForId(state,id) {
 const match=/^citizen-(\d+)$/.exec(id||'');if(!match)return null;
 const ordinal=Number(match[1]);if(!safeInt(ordinal,1,300000000))return null;
 if(ordinal<=state.legacyUntil)return legacyTargets(state.seed,Math.ceil(ordinal/6),state.locale)[(ordinal-1)%6];
 const relative=ordinal-state.legacyUntil;
 return generateTargets(state.seed,Math.ceil(relative/6),state.locale,state.legacyUntil)[(relative-1)%6];
}
export function getPreviousTarget(state) {return state.lastResult?targetForId(state,state.lastResult.targetId):null;}
function logText(entry,state) {
 const params={...entry.params};
 if(params.targetId){const target=targetForId(state,params.targetId);if(target){params.name=target.name;params.planet=target.planetName;if(params.effect)params.insult=target.choices.find(c=>c.effect===params.effect)?.text||'';}}
 return say(state.locale,entry.key,params);
}
function addLog(state,type,key,params={}) {const entry={type,key,params,years:state.years};entry.message=logText(entry,state);state.log.unshift(entry);state.log=state.log.slice(0,36);}
function advanceYears(state,amount) {state.years=Math.min(Number.MAX_SAFE_INTEGER-10000,state.years+amount);state.population=(BigInt(state.population)+BigInt(amount)*BIRTHS_PER_YEAR).toString();}
function adjustBoredom(state,change) {state.boredom=clamp(state.boredom+change,0,100);if(state.boredom>=100){advanceYears(state,1000);state.boredom=48;state.combo=0;state.sundays++;addLog(state,'eternity','sleep');return true;}return false;}
function blocked(state,key) {return {state,event:{type:'blocked',message:say(state.locale,key)}};}
function success(state,type,message,extra={}) {return {state,event:{type,message,...extra}};}
function migrationNotice(state) {return !state.legacyUntil?null:state.sector*6<=state.legacyUntil?'finish-legacy-sector':state.sector===state.legacyUntil/6+1?'revised-directory':null;}

export function createGame(seed=Date.now(),locale='ja') {
 const normalizedSeed=hashSeed(seed);
 const state={version:SAVE_VERSION,locale:language(locale),legacyUntil:0,migrationNotice:null,seed:normalizedSeed,rng:normalizedSeed,
  sector:1,targetIndex:0,phase:'map',targets:generateTargets(normalizedSeed,1,locale),ship:{x:.10,y:.79},
  years:0,population:START_POPULATION.toString(),completed:0,score:0,boredom:24,combo:0,maxCombo:0,models:3,
  deaths:0,sundays:0,inspected:false,completedIds:[],log:[],pendingInsult:null,lastResult:null,sectorStartScore:0};
 addLog(state,'system','fresh');return state;
}
function rebuildPending(state,effect) {
 const target=getTarget(state),choice=target?.choices.find(c=>c.effect===effect);if(!choice)return null;
 return {targetId:target.id,profileId:target.profileId,targetName:target.name,insultText:choice.text,response:choice.response,giftResponse:target.giftResponse,
  effect:choice.effect,points:POINTS[choice.effect]+(state.inspected&&choice.effect===3?25:0),observed:state.inspected,tag:choice.tag};
}
function rebuildResult(saved,state) {
 if(!saved||typeof saved!=='object'||Array.isArray(saved)||state.completed<1)return null;
 if(!safeInt(saved.effect,1,3)||typeof saved.observed!=='boolean'||!safeInt(saved.combo,0,state.completed)||!safeInt(saved.comboBonus,0,150))return null;
 const target=targetForId(state,`citizen-${state.completed}`);if(!target||saved.targetId!==target.id)return null;
 const choice=target.choices.find(c=>c.effect===saved.effect);
 const comboBonus=choice.effect>=2?Math.min(saved.combo-1,10)*15:0;
 if((choice.effect>=2&&saved.combo<1)||(choice.effect===1&&saved.combo!==0)||saved.comboBonus!==comboBonus||saved.combo>state.maxCombo)return null;
 const points=POINTS[choice.effect]+(saved.observed&&choice.effect===3?25:0)+50+comboBonus;if(saved.points!==points)return null;
 return {targetId:target.id,profileId:target.profileId,targetName:target.name,insultText:choice.text,response:choice.response,giftResponse:target.giftResponse,
  effect:choice.effect,points,observed:saved.observed,tag:choice.tag,combo:saved.combo,comboBonus,fact:target.fact,model:'Li₁₀GeP₂S₁₂',targetColor:target.color};
}
export function setLocale(state,locale) {
 const next=clone(state);next.locale=language(locale);next.targets=currentTargets(next);
 next.pendingInsult=next.phase==='gift'?rebuildPending(next,next.pendingInsult?.effect):null;
 next.lastResult=rebuildResult(next.lastResult,next);
 next.log=next.log.map(entry=>({...entry,message:logText(entry,next)}));
 return next;
}
export function inspect(state) {
 if(state.phase!=='encounter')return blocked(state,'inspectFirst');if(state.inspected)return blocked(state,'inspected');
 const next=clone(state);next.inspected=true;advanceYears(next,2);adjustBoredom(next,-3);addLog(next,'observe','observed',{targetId:getTarget(next).id});
 return success(next,'inspect',getTarget(next).hint);
}
export function travel(state,options={}) {
 if(state.phase!=='map')return blocked(state,'outstanding');const target=getTarget(state);if(!target)return blocked(state,'complete');
 const mode=options.mode||'normal';if(!['normal','warp'].includes(mode))return blocked(state,'mode');
 const next=clone(state);let died=false,years,key;
 if(mode==='warp') {died=random(next)<.24;if(died){years=42+Math.floor(random(next)*300);next.deaths++;next.combo=0;adjustBoredom(next,8);key='died';}
  else{years=1;adjustBoredom(next,-5);key='warp';}}
 else{const distance=Math.hypot(target.x-state.ship.x,target.y-state.ship.y);years=4+Math.round(distance*12);adjustBoredom(next,7);key='normal';}
 advanceYears(next,years);next.ship={x:target.x,y:target.y};next.phase='encounter';next.inspected=false;next.pendingInsult=null;
 addLog(next,died?'rebirth':'travel','arrived',{targetId:target.id,years});
 return success(next,died?'rebirth':'travel',say(next.locale,key),{mode,years,died,targetId:target.id});
}
export function insult(state,index) {
 if(state.phase!=='encounter')return blocked(state,'insultOnce');if(!safeInt(index,0,2))return blocked(state,'choose');
 const next=clone(state),target=getTarget(next),choice=target.choices[index];next.pendingInsult=rebuildPending(next,choice.effect);next.phase='gift';advanceYears(next,1);
 addLog(next,'insult','insulted',{targetId:target.id,effect:choice.effect});return success(next,'insult',choice.response,{...next.pendingInsult});
}
export function gift(state) {
 if(state.phase!=='gift'||!state.pendingInsult)return blocked(state,'giftFirst');if(state.models<1)return blocked(state,'noModels');
 const target=getTarget(state);if(!target||state.pendingInsult.targetId!==target.id||state.completedIds.includes(target.id))return blocked(state,'duplicate');
 const next=clone(state);next.models--;next.completed++;next.completedIds.push(target.id);next.completedIds=next.completedIds.slice(-240);
 const effect=next.pendingInsult.effect;next.combo=effect>=2?next.combo+1:0;next.maxCombo=Math.max(next.maxCombo,next.combo);
 const comboBonus=effect>=2?Math.min(next.combo-1,10)*15:0,points=next.pendingInsult.points+50+comboBonus;
 next.score+=points;adjustBoredom(next,effect===3?-24:effect===2?-13:5);
 next.lastResult={...next.pendingInsult,points,combo:next.combo,comboBonus,fact:target.fact,model:'Li₁₀GeP₂S₁₂',targetColor:target.color};next.pendingInsult=null;
 addLog(next,'gift','gifted',{targetId:target.id,points});next.targetIndex++;next.inspected=false;
 if(next.targetIndex>=SECTOR_SIZE){next.phase='result';addLog(next,'sector','sectorDone',{sector:next.sector});}else next.phase='map';
 return success(next,'gift',target.giftResponse,{...next.lastResult,sectorComplete:next.phase==='result'});
}
export function printModels(state) {
 if(!['map','encounter','gift'].includes(state.phase))return blocked(state,'printNext');if(state.models>=MODEL_CAPACITY)return blocked(state,'full');
 const next=clone(state),amount=MODEL_CAPACITY-next.models;next.models=MODEL_CAPACITY;advanceYears(next,8);const hadSunday=adjustBoredom(next,9);addLog(next,'print','printed',{amount});
 return success(next,'print',say(next.locale,hadSunday?'printSleep':'printDone'),{amount});
}
export function nextSector(state) {
 if(state.phase!=='result'||state.targetIndex!==SECTOR_SIZE)return blocked(state,'unfinished');
 const next=clone(state);next.sector++;next.targetIndex=0;next.phase='map';next.targets=currentTargets(next);next.ship={x:.10,y:.79};next.sectorStartScore=next.score;
 next.pendingInsult=null;next.inspected=false;advanceYears(next,12);adjustBoredom(next,4);next.migrationNotice=migrationNotice(next);
 const revised=next.migrationNotice==='revised-directory';addLog(next,'system',revised?'revised':'next',{sector:next.sector});
 return success(next,'sector',say(next.locale,revised?'revised':'nextMessage'));
}
export function view(state) {
 const en=state.locale==='en';const ranks=en?[[6000,'A Galactic Nuisance'],[3000,'Eternal Door-to-Door Salesman'],[1500,'An Impeccably Polite Disaster'],[700,'That Rude Person with the Crystals'],[0,'Immortal Probationer']]:[[6000,'銀河公認の厄介者'],[3000,'永遠の訪問販売員'],[1500,'礼儀正しい災難'],[700,'結晶模型をくれる嫌な人'],[0,'不死身の試用期間']];
 const boredom=state.boredom>=80?3:state.boredom>=50?2:state.boredom>=20?1:0;
 const objectives=en?{gift:'Hand over the LGPS crystal model',encounter:'Find an insult appropriate to the vanity',result:'Six complete. Eternity remains.',map:'Next recipient, in full-name order'}:{gift:'LGPS結晶模型を手渡す',encounter:'相手の自慢に、適切な悪口を',result:'六人完了。永遠は未完了。',map:'英語フルネーム順で、次の相手へ'};
 return {target:getTarget(state),sectorCompleted:state.targetIndex,sectorTotal:SECTOR_SIZE,sectorScore:state.score-state.sectorStartScore,progress:state.targetIndex/SECTOR_SIZE,
  rank:ranks.find(([minimum])=>state.score>=minimum)[1],remainingPopulation:(BigInt(state.population)-BigInt(state.completed)).toString(),canPrint:state.models<3&&state.phase!=='result',
  boredomLabel:(en?['Inexplicably entertained','Still tolerable','A noticeable amount of eternity','Sunday afternoon approaches']:['珍しく楽しい','まだ耐えられる','永遠を感じ始めた','日曜の午後が近い'])[boredom],objective:objectives[state.phase],
  directoryEdition:state.legacyUntil>=state.sector*6?'legacy':'ordered',migrationMessage:state.migrationNotice?say(state.locale,state.migrationNotice==='finish-legacy-sector'?'migration':'revisedNotice'):''};
}
export function serialize(state) {return JSON.stringify(state);}
function restoreLog(item,state) {
 if(!item||typeof item!=='object')return null;
 const type=typeof item.type==='string'?item.type.slice(0,20):'system',years=safeInt(item.years)?item.years:0;
 let key,params;
 if(typeof item.key==='string'&&Object.hasOwn(COPY.ja,item.key)) {
  key=item.key;const raw=item.params&&typeof item.params==='object'?item.params:{};params={};
  for(const field of ['years','points','amount','sector','effect'])if(safeInt(raw[field]))params[field]=raw[field];
  if(typeof raw.targetId==='string'&&/^citizen-\d+$/.test(raw.targetId))params.targetId=raw.targetId;
  if(key==='legacyEntry'){params.legacyType=typeof raw.legacyType==='string'?raw.legacyType.slice(0,20):type;params.legacyText=typeof raw.legacyText==='string'?raw.legacyText.slice(0,500):'';}
 } else {
  if(typeof item.message!=='string')return null;
  key='legacyEntry';params={legacyType:type,legacyText:item.message.slice(0,500)};
 }
 const entry={type,key,params,years};entry.message=logText(entry,state);return entry;
}
export function restore(raw) {
 try {
  if(typeof raw!=='string'||raw.length>300000)return null;const saved=JSON.parse(raw);
  if(!saved||![1,SAVE_VERSION].includes(saved.version)||!PHASES.has(saved.phase))return null;
  if(!safeInt(saved.seed,1,4294967295)||!safeInt(saved.rng,0,4294967295)||!safeInt(saved.sector,1,50000000)||!safeInt(saved.targetIndex,0,6))return null;
  if(!safeInt(saved.years)||!safeInt(saved.completed)||!safeInt(saved.score)||!safeInt(saved.models,0,3)||!safeInt(saved.boredom,0,100))return null;
  if(!safeInt(saved.combo)||!safeInt(saved.maxCombo)||!safeInt(saved.deaths)||!safeInt(saved.sundays)||!safeInt(saved.sectorStartScore,0,saved.score)||typeof saved.inspected!=='boolean')return null;
  if(typeof saved.population!=='string'||!/^\d{1,80}$/.test(saved.population)||BigInt(saved.population)<START_POPULATION)return null;
  if(saved.completed!==(saved.sector-1)*6+saved.targetIndex||saved.combo>saved.maxCombo||saved.maxCombo>saved.completed||(saved.phase==='result')!==(saved.targetIndex===6))return null;
  if(!saved.ship||!Number.isFinite(saved.ship.x)||!Number.isFinite(saved.ship.y)||saved.ship.x<0||saved.ship.x>1||saved.ship.y<0||saved.ship.y>1)return null;
  if(!Array.isArray(saved.completedIds)||saved.completedIds.length>240)return null;
  const expected=Array.from({length:Math.min(saved.completed,240)},(_,i)=>`citizen-${Math.max(1,saved.completed-239)+i}`);
  if(saved.completedIds.length!==expected.length||saved.completedIds.some((id,i)=>id!==expected[i]))return null;
  const legacyUntil=saved.version===1?saved.sector*6:saved.legacyUntil;
  if(!safeInt(legacyUntil,0,300000000)||legacyUntil%6!==0||legacyUntil>saved.sector*6)return null;
  const next=clone(saved);next.version=SAVE_VERSION;next.locale=language(saved.locale);next.legacyUntil=legacyUntil;next.migrationNotice=migrationNotice(next);next.targets=currentTargets(next);
  if(next.phase==='gift') {
   const pending=next.pendingInsult,target=getTarget(next);
   if(!pending||pending.targetId!==target.id||!safeInt(pending.effect,1,3))return null;
   next.pendingInsult=rebuildPending(next,pending.effect);
  }else next.pendingInsult=null;
  next.lastResult=rebuildResult(saved.lastResult,next);
  next.log=Array.isArray(saved.log)?saved.log.slice(0,36).map(item=>restoreLog(item,next)).filter(Boolean):[];
  return next;
 }catch{return null;}
}
