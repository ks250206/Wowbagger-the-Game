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
  sleep:'退屈すぎてうっかり千年ほど昼寝をしてしまった。起きたら日曜の午後はまだ終わっていなかった。',
  fresh:'全宇宙への悪口＆模型ツアーを開始。まずは手始めに6人ほど不快にしてみよう。',
  inspectFirst:'まずは現地へ飛んで本人に会いたまえ。遠くから勝手に人格を決めつけるのは、ただの占星術だ。',
  inspected:'もう十分に観察した。これ以上じろじろ見ても、相手の自慢が増えるだけだ。',
  observed:p=>`${p.name}を2年かけて観察した。プライドのありかが丸見えだ。実に狙いやすい。`,
  outstanding:'まだ目の前の相手への用件が済んでいない。途中で優しくなって帰るなど言語道断だ。',
  complete:'この宙域の6人は全員片付けた。残念ながら宇宙自体はちっとも狭くなっていない。',
  mode:'航行方法を選び直したまえ。お祈り航法はオプション設定にも入っていない。',
  died:'ワープの出口がよりによって恒星の中だった。一度丸焦げになって再生した。保証書には「恒星内部でのご使用はお控えください」と小さい字で書いてあった。',
  warp:'無茶なワープで奇跡的に無事到着。宇宙船は「すべて計算どおり」と言い張っている。',
  normal:'通常航行で安全に到着。船内BGMが1曲しかないせいで、同じサビを4万回ほど聴いた。',
  arrived:p=>`${p.planet}に到着（${p.years}年経過）。宇宙は広いが、待ち時間はもっと広い。`,
  insultOnce:'悪口は一人につき一回まで。あまりしつこいと、ただの嫌な奴ではなく「熱心な嫌な奴」になってしまう。',
  choose:'3つの中から悪口を一つ選びたまえ。わざわざ委員会を開くほどの案件ではない。',
  insulted:p=>`「${p.insult}」`,
  giftFirst:'先に悪口を言いたまえ。いきなり模型だけ渡したら、ただの親切なサンタクロースになってしまう。',
  noModels:'結晶模型の在庫が切れている。船内プリンターで3個作ろう。たった8年だ、お茶を淹れる間に終わる。',
  duplicate:'その相手にはもう渡した。同じ人間に二度も謎の結晶を押し付ける義理はない。',
  gifted:p=>`${p.name}にLGPS結晶模型を押し付けた（${p.points}点）。お礼を言われなかったが、まあ当然である。`,
  sectorDone:p=>`第${p.sector}宙域の6人に悪口と模型を配り終えた。宇宙の残り住民は相変わらず天文学的な数だ。`,
  printNext:'まずは次の宙域へ進もう。プリンターにも一息つかせないと、また労働組合を作りかねない。',
  full:'棚は3個で満杯だ。宇宙には無駄な空間が山ほどあるのに、うちの本棚だけは妙に狭い。',
  printed:p=>`LGPS模型を${p.amount}個プリントした（8年経過）。「残りあと1%」の表示が3年ほど続いた。`,
  printSleep:'模型をプリントしている間に、退屈すぎて千年寝てしまった。起きたら3個できていた。',
  printDone:'Li₁₀GeP₂S₁₂の模型を3個補充した。悪口はオーダーメイドだが、手土産だけは頑なにこれ一択である。',
  unfinished:'まだ模型をもらっていない住民がいる。忘れたふりは配達完了として認められない。',
  next:p=>`第${p.sector}宙域の名簿を開いた。アルファベット順に、次の6人を不快にしに行くぞ。`,
  nextMessage:'さあ次の6人だ。先方が待っているかだって？　待っているわけがないだろう。',
  revised:'改訂名簿を開いた。英語フルネーム順で Argo → Arthur → Bela へ。宇宙は混沌でも、名簿だけは美しく保ちたい。',
  legacyEntry:p=>p.legacyText||'昔の航海記録。残っているからといって、誰の役に立つわけでもない。',
  migration:'今の宙域は旧名簿のまま最後まで進められます。次の宙域から、アーサーを含むフルネーム順の改訂名簿へ切り替わります（スコア・年月・在庫は引き継ぎ）。',
  revisedNotice:'改訂名簿へ移行しました！　これまでの配達数とスコアを引き継ぎ、Argo → Arthur → Bela の順で巡回します。',
 },
 en:{
  sleep:'Napped for a thousand years out of sheer ennui. Woke up to discover it was still Sunday afternoon.',
  fresh:'Operation Cosmic Nuisance has commenced. Six victims to start with; an infinity to follow.',
  inspectFirst:'Meet the fellow first. Judging people from orbit is strictly the astrology department’s job.',
  inspected:'You have stared quite enough. Further scrutiny will not improve their personality.',
  observed:p=>`Spent two years observing ${p.name}. Their favourite delusion is now gloriously obvious.`,
  outstanding:'Finish dealing with the person in front of you. Wandering off politely would be gross misconduct.',
  complete:'This sector is done. Regrettably, the Universe has failed to get any smaller.',
  mode:'Pick a valid flight mode. Hoping for the best is not an approved propulsion system.',
  died:'Emerged from warp inside a star. Incinerated, regenerated, and discovered the warranty excludes “stellar interiors”.',
  warp:'Survived a reckless warp. The ship is already taking full credit for what was clearly blind luck.',
  normal:'Arrived safely via conventional drive. The lift music only had one track, and you now know every note.',
  arrived:p=>`Reached ${p.planet} after ${p.years} ${p.years===1?'year':'years'}. Longer than the actual distance felt.`,
  insultOnce:'One insult per citizen. Anything more would cross the line from nuisance into dedicated hobbyist.',
  choose:'Select one insult from the three available. No committee meeting required.',
  insulted:p=>`“${p.insult}”`,
  giftFirst:'Insult them first. Handing over a crystal without abuse might give the tragic impression you are being nice.',
  noModels:'Out of crystal models. Print three more—eight years is practically express delivery by cosmic standards.',
  duplicate:'Already delivered. There is no need to inflict the same chemistry ornament on someone twice.',
  gifted:p=>`Thrust an LGPS crystal model upon ${p.name} (${p.points} pts). Strangely, they forgot to send a thank-you card.`,
  sectorDone:p=>`All six citizens in sector ${p.sector} have been insulted and crystallised. The Universe remains stubbornly unemptied.`,
  printNext:'Move on to the next sector first, before the 3D printer tries to unionise.',
  full:'The shelf holds three and is quite full. Space is wildly abundant everywhere except in shipboard storage.',
  printed:p=>`Printed ${p.amount} ${p.amount===1?'model':'models'} in eight years. The progress bar sat at 99% for the final three.`,
  printSleep:'Dozed off for a millennium while printing. Three shiny models await; the kettle has gone cold.',
  printDone:'Li₁₀GeP₂S₁₂ stock topped up to three. Bespoke abuse, strictly one-size-fits-all souvenirs.',
  unfinished:'Someone in this sector is still missing their crystal. Pretending you forgot does not count as delivery.',
  next:p=>`Opened the directory for sector ${p.sector}. Six fresh faces, filed strictly alphabetically.`,
  nextMessage:'On to the next six. Are they expecting you? Good heavens, no.',
  revised:'Opened the revised directory: Argo, Arthur, Bela, by full English name. Chaos is no excuse for sloppy filing.',
  legacyEntry:p=>({travel:'Archived voyage: reached a destination without major incident.',rebirth:'Archived voyage: parked inside a star and grew back.',observe:'Archived voyage: stared thoughtfully at a citizen for two years.',insult:'Archived voyage: delivered a bespoke insult.',gift:'Archived voyage: handed over an unsolicited LGPS model.',print:'Archived voyage: waited eight years for the printer.',sector:'Archived voyage: annoyed an entire sector.',eternity:'Archived voyage: survived another endless Sunday.'}[p.legacyType]||'Archived entry from an earlier directory. Retained purely out of bureaucratic habit.'),
  migration:'Finish this sector on your old list. The next sector switches to the revised full-name directory—Arthur included—with all scores, years and stock intact.',
  revisedNotice:'Revised directory active! Your previous score and deliveries are safe; the route now opens with Argo → Arthur → Bela.',
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
 const en=state.locale==='en';const ranks=en?[[6000,'Certified Galactic Nuisance (First Class)'],[3000,'Eternal Door-to-Door Menace'],[1500,'An Impeccably Polite Disaster'],[700,'That Dreadful Chap with the Crystals'],[0,'Immortal on Probation']]:[[6000,'銀河公認・特級厄介者'],[3000,'永遠の押し売り悪口おじさん'],[1500,'やたら礼儀正しい災難'],[700,'結晶模型をくれる感じの悪い人'],[0,'不死身の見習い（試用期間）']];
 const boredom=state.boredom>=80?3:state.boredom>=50?2:state.boredom>=20?1:0;
 const objectives=en?{gift:'Hand over the LGPS crystal model (no refunds)',encounter:'Find their sore spot and deliver the insult',result:'Six annoyed. Only infinity to go.',map:'Pick the next victim in alphabetical order'}:{gift:'仕上げにLGPS結晶模型を押し付けよう',encounter:'相手の自慢を見抜いて、一番効く悪口を選ぼう',result:'6人完了。永遠のほうは、まだ手つかず。',map:'名簿の順番どおり、次の相手を下調べして出発しよう'};
 return {target:getTarget(state),sectorCompleted:state.targetIndex,sectorTotal:SECTOR_SIZE,sectorScore:state.score-state.sectorStartScore,progress:state.targetIndex/SECTOR_SIZE,
  rank:ranks.find(([minimum])=>state.score>=minimum)[1],remainingPopulation:(BigInt(state.population)-BigInt(state.completed)).toString(),canPrint:state.models<3&&state.phase!=='result',
  boredomLabel:(en?['Alarmingly cheerful','Mildly tolerable','Rather a lot of eternity','Sunday at 3:14 p.m. looms']:['珍しくご機嫌','まだ耐えられる','そろそろ暇がつらい','日曜の午後3時が迫る'])[boredom],objective:objectives[state.phase],
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
