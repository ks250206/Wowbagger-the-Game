import * as Engine from './engine.js';
import { SpaceScene, drawAlien } from './scene.js';
import { CrystalModel } from './crystal.js';
import { IntroController, BriefingController } from './story-ui.js';
import { ArthurEpisode } from './arthur-episode.js';
import { language, setLanguage, tr, formatNumber as number, applyTranslations, message } from './i18n.js';

const $ = id => document.getElementById(id);
const SAVE_KEY = 'wowbagger-lgps-v1';
const OPTIONS_KEY = 'wowbagger-lgps-options-v1';
let state, options = { sound:false, introSeen:false, language:'ja', arthurArrivalSeen:false, arthurDeparturePending:false }, storageAvailable = true;
try {
  const raw = localStorage.getItem(SAVE_KEY);
  state = Engine.restore(raw);
  if (raw && state && JSON.parse(raw).version === 1 && !localStorage.getItem('wowbagger-lgps-legacy-v1-backup')) localStorage.setItem('wowbagger-lgps-legacy-v1-backup', raw);
  const stored = JSON.parse(localStorage.getItem(OPTIONS_KEY) || '{}');
  options.sound = stored.sound === true; options.introSeen = stored.introSeen === true;
  options.language = stored.language === 'en' || (!stored.language && state?.locale === 'en') ? 'en' : 'ja';
  options.arthurArrivalSeen = stored.arthurArrivalSeen === true;
  options.arthurDeparturePending = stored.arthurDeparturePending === true;
} catch { storageAvailable = false; }
setLanguage(options.language);
state = state ? Engine.setLocale(state, language()) : Engine.createGame(undefined, language());
let mode = 'normal', selectedIndex = -1, busy = false, crystal, toastTimer, previewTimer;
let soundContext, afterGift = null, lastPortrait = '', lastPhase = null, briefingOpen = false;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const text = (id, value) => { $(id).textContent = value; };
const show = (id, visible) => { $(id).hidden = !visible; };
const escape = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const scene = new SpaceScene($('galaxy'), { onSelect: selectTarget, locale:language() });
const briefingUI = new BriefingController({onLaunch:doTravel,onClose:()=>{briefingOpen=false;render();},onPrint:doPrint});
const arthurUI = new ArthurEpisode({onLocaleChange:changeLanguage});
const introUI = new IntroController({onFinish:()=>{options.introSeen=true;saveOptions();render();resumeStory();}});
applyTranslations();

function saveOptions() { try { localStorage.setItem(OPTIONS_KEY,JSON.stringify(options)); } catch { /* Preferences must not obstruct the mission. */ } }
function changeLanguage(next) {
  if (!['ja','en'].includes(next) || next === language()) return;
  setLanguage(next); options.language=next; state=Engine.setLocale(state,next);
  if (afterGift) afterGift={target:Engine.localizeTarget(afterGift.target,next),result:state.lastResult};
  saveOptions(); applyTranslations();
  scene.setLocale(next); crystal?.setLocale(next); arthurUI.setLocale(next); introUI.refresh();
  lastPortrait=''; show('selectedPreview',false); show('toast',false); clearTimeout(toastTimer);
  render(); save(); if ($('logDialog').open) renderLog();
  computer(Engine.view(state).objective);
}
function playSound(kind='tap') {
  if (!options.sound) return;
  try {
    soundContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (soundContext.state==='suspended') soundContext.resume();
    const notes={tap:[420],travel:[155,230,310],insult:[290,170],gift:[330,440,660],print:[220,330],result:[262,330,392,523],accident:[140,90,65]}[kind]||[420];
    notes.forEach((frequency,index)=>{const oscillator=soundContext.createOscillator(),gain=soundContext.createGain();const start=soundContext.currentTime+index*.085;oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,start);gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.055,start+.018);gain.gain.exponentialRampToValueAtTime(.001,start+.24);oscillator.connect(gain);gain.connect(soundContext.destination);oscillator.start(start);oscillator.stop(start+.27);});
  } catch { /* Audio is optional. */ }
}
function save() {
  try {localStorage.setItem(SAVE_KEY,Engine.serialize(state));storageAvailable=true;} catch {storageAvailable=false;}
  text('saveStatus',storageAvailable?tr('自動保存済み','Saved locally'):tr('保存できません','Unable to save'));
  $('saveStatus').title=storageAvailable?tr('このブラウザに進行を保存しています','Progress is saved in this browser'):tr('保存領域を利用できません。このタブを閉じると進行が失われる可能性があります。','Storage is unavailable. Closing this tab may lose your progress.');
}
function toast(value,duration=3600) {clearTimeout(toastTimer);text('toast',value);show('toast',true);toastTimer=setTimeout(()=>show('toast',false),duration);}
function computer(value) {text('computerLine',tr('船載AI：{line}','SHIP COMPUTER: {line}',{line:value}));}
function apply(result,{announce=true}={}) {
  if (result.event.type==='blocked') {toast(result.event.message);return false;}
  state=result.state;save();render();if(announce)computer(result.event.message);return true;
}
function renderTargets(container) {
  container.innerHTML=state.targets.map((target,index)=>`<button class="target-row ${index<state.targetIndex?'past':index===state.targetIndex?'current':''} ${target.kind==='arthur'?'canon-target':''}" data-target="${index}" ${index===state.targetIndex?'aria-current="step"':''} aria-label="${escape(target.name)}, ${index<state.targetIndex?tr('不快に済み','already offended'):index===state.targetIndex?tr('次の被害者','next victim'):tr('まだ無事','still blissfully uninsulted')}"><span class="target-id">${index<state.targetIndex?'✓':pad(index+1)}</span><span class="target-person"><strong>${escape(target.name)}</strong><span>${escape(target.romanName)}</span>${target.kind==='arthur'?`<small class="canon-chip">${tr('原作のエピソード','FROM THE NOVEL')}</small>`:''}</span><span class="target-dot" style="background:${target.color}"></span></button>`).join('');
}
function render() {
  const target=Engine.getTarget(state),view=Engine.view(state);
  const phase=afterGift?'gift':briefingOpen?'briefing':state.phase;
  document.body.classList.toggle('briefing-mode',phase==='briefing');
  text('years',number(state.years));text('completed',number(state.completed));
  text('yearUnit',tr('年',state.years===1?'year':'years'));text('completedUnit',tr('人',state.completed===1?'person':'people'));
  text('boredomValue',`${state.boredom}%`);text('boredomText',view.boredomLabel);
  $('boredomBar').style.width=`${state.boredom}%`;$('boredomBar').style.background=state.boredom>=75?'var(--orange)':'var(--acid)';
  text('models',state.models);text('quota',`${state.targetIndex} / 6`);text('mobileQuota',`${state.targetIndex}/6`);
  text('sectorBadge',String(state.sector).padStart(2,'0'));text('chartSector',String(state.sector).padStart(3,'0'));
  text('sectorTitle',tr('宙域 {n} · {label}','SECTOR {n} · {label}',{n:String(state.sector).padStart(3,'0'),label:state.migrationNotice==='finish-legacy-sector'?tr('前の名簿を引き継ぎ中','Finishing the previous directory'):tr('英語のフルネーム順','English full-name order')}));
  text('population',tr('{n} 人','{n} people',{n:number(BigInt(view.remainingPopulation))}));
  const migrating=state.migrationNotice==='finish-legacy-sector';show('migrationNotice',migrating);
  if(migrating)text('migrationNotice',tr('以前の航海を継続しています。この宙域を終えると、Argo → Arthur → Belaの改訂名簿に移ります。得点・在庫・経過時間は引き継ぎます。','Your previous voyage continues. Finish this sector to open the revised Argo → Arthur → Bela directory. Score, stock and elapsed time are preserved.'));
  $('cargoButton').title=tr('{n} / 3個。補充には8年かかります。','{n} / 3 models. Restocking takes eight years.',{n:state.models});
  $('cargoButton').disabled=busy||!!afterGift||state.phase==='result';$('travelButton').disabled=busy;
  if(!busy)$('travelButton').innerHTML=message('openBriefing');
  renderTargets($('targetList'));renderTargets($('mobileTargetList'));
  show('briefingScreen',phase==='briefing');if(phase==='briefing'&&target)briefingUI.open(target,{mode,models:state.models});else briefingUI.hide();
  show('mapScreen',phase==='map');show('encounterScreen',phase==='encounter'||phase==='gift');show('resultScreen',phase==='result');
  scene.setView({targets:state.targets,currentIndex:state.targetIndex,selectedIndex,phase,sector:state.sector,player:state.ship,reducedMotion,locale:language()});
  if(phase==='map'&&target){
    text('nextNumber',pad(state.targetIndex+1));text('nextRole',target.role);text('nextName',target.name);text('nextPlanet',target.planetName);
    text('mapHeadline',state.completed===0?tr('さあ、全宇宙にケンカを売りに行こう。','Right then. Let’s go upset the cosmos.'):state.targetIndex===0?tr('新しい宙域、新しい被害者たち。','A fresh sector of unsuspecting citizens.'):tr('まだまだ先は長い（文字どおり永遠に）。','Only infinity left to go.'));
    $('mapSubline').innerHTML=state.completed===0?tr('訪ねて、悪口を言って、結晶模型を押し付ける。<br>まずは「操縦席で下調べ」を押して出発しよう。','Drop by, insult them personally, leave a crystal.<br>Open the dossier below to get this dreadful show on the road.'):tr('これまで{n}人を不快にしました。<br>感謝状は、いまのところ一通も届いていません。',state.completed===1?'One citizen successfully offended.<br>Curiously, not a single thank-you card has arrived.':'{n} citizens successfully offended.<br>Curiously, not a single thank-you card has arrived.',{n:number(state.completed)});
    crystal?.stop();
  }
  if(phase==='encounter'||phase==='gift'){
    const resident=afterGift?.target||target,pending=afterGift?.result||state.pendingInsult;
    text('encounterStage',afterGift?tr('配達完了 / 苦情はブラックホールまで','DELIVERED / COMPLAINTS IGNORED'):phase==='gift'?tr('02 / LGPS模型を押し付ける','02 / THE UNSOLICITED GIFT'):tr('01 / 面と向かって悪口を言う','01 / THE PERSONAL INSULT'));
    text('encounterPlanet',resident.planetName);text('residentName',resident.name);text('residentRoman',resident.romanName);text('residentRole',resident.role);text('residentSpecies',resident.species);
    text('residentSpeech',afterGift?afterGift.result.giftResponse:phase==='gift'?pending.response:resident.intro);
    show('canonNote',resident.kind==='arthur');
    if(resident.kind==='arthur')text('canonNote',tr('『宇宙クリケット大戦争』第1章の展開に基づく翻案です。台詞は本作オリジナル、LGPS模型の押し付けはゲーム独自の悪ノリです。','Adapted from Chapter 1 of Life, the Universe and Everything. Original dialogue; the LGPS gift is this game’s own mischief.'));
    const portraitKey=`${resident.id}:${phase}:${language()}:${afterGift?'done':pending?.effect||0}`;
    const mood=afterGift?'confused':phase==='gift'?pending.effect>=2?'angry':'happy':'neutral';
    if(portraitKey!==lastPortrait||lastPhase!==phase){requestAnimationFrame(()=>drawAlien($('alienCanvas'),{species:resident.portrait??resident.species,kind:resident.kind,color:resident.color,mood,locale:language()}));lastPortrait=portraitKey;}
    show('insultPanel',phase==='encounter');show('giftPanel',phase==='gift');show('effectBadge',phase==='gift');
    if(phase==='encounter'){
      show('hintText',state.inspected);text('hintText',resident.hint);$('observeButton').disabled=state.inspected;
      $('observeButton').innerHTML=state.inspected?tr('観察済み <span>相手の自慢ポイントが丸見えです</span>','Observation complete <span>Sore spot located</span>'):tr('相手をじっくり観察する <span>2年かけて弱点を探る</span>','Observe the recipient <span>Spend 2 years spotting flaws</span>');
      $('insultChoices').innerHTML=resident.choices.map((choice,index)=>`<button class="insult-choice" data-choice="${index}"><span class="choice-number">${index+1}</span><span class="choice-body"><span class="choice-tag">${escape(choice.tag)}</span>${tr('「{line}」','“{line}”',{line:escape(choice.text)})}</span></button>`).join('');crystal?.stop();
    }else{
      const effectText=pending.effect===3?tr('クリティカル不快！（大成功）','DIRECT HIT ON THE EGO!'):pending.effect===2?tr('まあまあ不快にした','NICELY AGGRAVATED'):tr('ほぼ空振り（相手にされず）','BARELY RUFFLED THEIR FEATHERS');
      text('effectBadge',afterGift?tr('悪口＋模型 配達完了 · +{n}点','INSULT + MODEL DELIVERED · +{n} pts',{n:pending.points}):effectText);$('effectBadge').classList.toggle('weak',pending.effect===1&&!afterGift);
      show('giftPrintButton',!afterGift&&state.models===0);$('giftButton').disabled=busy||(!afterGift&&state.models<1);
      $('giftButton').innerHTML=afterGift?(resident.kind==='arthur'?tr('アーサーを置いて船へ戻る','Leave Arthur behind & board ship'):state.phase==='result'?tr('この宙域の報告書を見る','View sector report'):tr('よし、次の被害者へ','Right then—next name')):tr('LGPS模型を押し付ける <kbd>Enter</kbd>','Hand over the LGPS model <kbd>Enter</kbd>');
      $('giftPanel').querySelector('.gift-copy').textContent=afterGift?afterGift.result.fact:state.models===0?tr('おっと、模型の在庫切れです。船内プリンターで3個作ってから渡しましょう（8年待ち）。','Dear me, out of stock. Print three more models before completing the nuisance (8 years).'):tr('悪口だけでは片手落ち。仕上げに謎の固体電解質模型を押し付けて帰りましょう。','An insult without a baffling souvenir would feel terribly half-hearted.');
      $('giftPanel').querySelector('.section-heading .eyebrow').textContent=afterGift?'DELIVERED, WHETHER THEY WANTED IT OR NOT':'AND ONE MORE THING';
      $('giftPanel').querySelector('.section-heading h3').textContent=afterGift?tr('模型はしっかり押し付けた。','The baffling gift has been accepted.'):tr('それと、ついでにこれをどうぞ。','Oh, and do take this crystal.');
      requestAnimationFrame(()=>{if(!crystal)crystal=new CrystalModel($('crystalCanvas'),{locale:language()});crystal.setLocale(language());crystal.start();crystal.setCelebrating(!!afterGift);});
    }
  }
  if(phase==='result'){
    crystal?.stop();text('resultSubtitle',tr('第{n}宙域の6人全員に、悪口とLGPS模型をお届けしました。返品窓口は銀河のどこにもありません。','All six residents of sector {n} now possess a bruised ego and an LGPS crystal. No returns desk exists anywhere in the galaxy.',{n:state.sector}));
    $('resultStats').innerHTML=`<div class="result-stat"><span>${tr('この宙域のスコア','Sector score')}</span><strong>${number(view.sectorScore)}</strong></div><div class="result-stat"><span>${tr('通算で不快にした人数','Lifetime victims')}</span><strong>${number(state.completed)}</strong></div><div class="result-stat"><span>${tr('無駄にした年月','Years mislaid')}</span><strong>${number(state.years)}</strong></div>`;
    text('resultQuote',tr('現在の称号：{rank}','Your current official title: {rank}',{rank:view.rank}));
  }
  if(lastPhase!==phase){if(window.innerWidth<=650)window.scrollTo({top:0,behavior:'instant'});lastPhase=phase;}
  text('soundText',options.sound?'ON':'OFF');$('soundButton').setAttribute('aria-label',options.sound?tr('効果音をオフにする','Turn sound off'):tr('効果音をオンにする','Turn sound on'));$('soundButton').setAttribute('aria-pressed',String(options.sound));
}
function selectTarget(index) {
  if(busy||state.phase!=='map'||afterGift)return;
  const target=state.targets[index];if(!target)return;selectedIndex=index;scene.setView({selectedIndex});clearTimeout(previewTimer);
  $('selectedPreview').innerHTML=`<button id="closePreview" aria-label="${tr('閉じる','Close')}">×</button><span>${index<state.targetIndex?tr('不快に済み','Already offended'):index===state.targetIndex?tr('次の被害者','Next victim'):tr('あと{n}人先',index-state.targetIndex===1?'One name ahead':'{n} names ahead',{n:index-state.targetIndex})}</span><strong>${escape(target.name)}</strong>${escape(target.role)}<br><span>${escape(target.planetName)}</span>${index>state.targetIndex?`<br><small>${tr('英語のフルネーム順を厳守。どれほど大物でも割り込みは認めません。','Strict alphabetical order. Not even royalty gets to jump this queue.')}</small>`:''}`;
  show('selectedPreview',true);previewTimer=setTimeout(()=>show('selectedPreview',false),5500);$('closePreview').onclick=()=>show('selectedPreview',false);
}
function openBriefing(){if(busy||state.phase!=='map'||afterGift)return;briefingOpen=true;show('selectedPreview',false);render();playSound('tap');}
async function showArthur(mode){
  if(busy)return;busy=true;
  try{await arthurUI.open(mode,language());if(mode==='arrival')options.arthurArrivalSeen=true;else options.arthurDeparturePending=false;saveOptions();}
  finally{busy=false;render();}
}
async function resumeStory(){
  if(busy||document.querySelector('dialog[open]'))return;
  if(options.arthurDeparturePending&&Engine.getPreviousTarget(state)?.kind==='arthur')await showArthur('departure');
  else if(state.phase==='encounter'&&Engine.getTarget(state)?.kind==='arthur'&&!options.arthurArrivalSeen)await showArthur('arrival');
}
async function doTravel(){
  if(busy||state.phase!=='map'||afterGift)return;
  briefingOpen=false;render();const result=Engine.travel(state,{mode});const departureLocale=language();
  if(result.event.type==='blocked'){toast(result.event.message);return;}
  busy=true;show('selectedPreview',false);$('travelButton').disabled=true;document.body.classList.add('busy');
  text('travelButton',mode==='warp'?tr('時空に無理を言っています…','Bending space-time recklessly…'):tr('のんびり航行中…','Chugging along…'));
  computer(mode==='warp'?tr('シートベルトをお締めください。物理法則の前ではただの気休めですが。','Fasten your seat belt. Purely decorative against the laws of physics, mind.'):tr('出発しました。地図の上では、拍子抜けするほど簡単な仕事に見えるんですけどね。','We are under way. Looks embarrassingly easy on the star chart, doesn’t it?'));playSound('travel');
  try{await scene.travelTo(state.targetIndex,mode);}finally{busy=false;document.body.classList.remove('busy');}
  if(result.event.died){show('transitOverlay',true);text('transitTitle',tr('おっと、恒星のど真ん中に出ました。','Slight snag: we’ve parked inside a star.'));text('transitText',tr('丸焦げからの再生に{n}年かかりました。苦情は操縦したご本人までどうぞ。','Regenerating from ash took {n} years. Kindly address all complaints to the pilot.',{n:result.event.years}));playSound('accident');busy=true;await new Promise(resolve=>setTimeout(resolve,reducedMotion?650:1900));show('transitOverlay',false);busy=false;}
  if(departureLocale!==language()){result.state=Engine.setLocale(result.state,language());result.event.message=Engine.view(result.state).objective;}
  selectedIndex=-1;apply(result);$('travelButton').innerHTML=message('openBriefing');
  if(Engine.getTarget(state)?.kind==='arthur'&&!options.arthurArrivalSeen)await showArthur('arrival');
}
function chooseInsult(index){if(busy||state.phase!=='encounter'||afterGift)return;if(apply(Engine.insult(state,index)))playSound('insult');}
async function doGift(){
  if(busy)return;
  if(afterGift){
    if(afterGift.target.kind==='arthur'&&options.arthurDeparturePending)await showArthur('departure');
    const completedSector=state.phase==='result';afterGift=null;render();
    if(completedSector){playSound('result');computer(tr('6人完了！　なお、そのあいだに宇宙では新しい住民が何十億人も生まれました。','Sector complete! Meanwhile, several billion fresh citizens were born to keep you busy.'));}
    else{playSound('tap');computer(state.lastResult?.fact||tr('次の被害者を画面に出しておきました。','Next unsuspecting citizen loaded on screen.'));scene.burst('success');}return;
  }
  if(state.phase!=='gift')return;const target=Engine.getTarget(state),result=Engine.gift(state);
  if(result.event.type==='blocked'){toast(result.event.message);return;}
  afterGift={target,result:result.state.lastResult};state=result.state;
  if(target.kind==='arthur'){options.arthurDeparturePending=true;saveOptions();}
  save();render();playSound('gift');computer(result.event.giftResponse);
}
function doPrint(){if(busy||afterGift)return;const result=Engine.printModels(state);if(apply(result)){playSound('print');toast(tr('模型を{n}個補充しました（たった8年。これでもお急ぎ便です）。','{n} models printed in a brisk eight years. That was the express setting.',{n:result.event.amount}));}}
function renderLog(){$('logEntries').innerHTML=state.log.length?state.log.map(item=>`<article class="log-entry"><time>${tr('経過 {n} 年','YEAR {n}',{n:number(item.years)})}</time><p>${escape(item.message)}</p></article>`).join(''):`<p class="log-empty">${tr('まだ誰ひとり不快にしていません。怠慢極まりないですね。','Not a single citizen offended yet. Dreadful slacking.')}</p>`;}
function showLog(){renderLog();$('logDialog').showModal();}
function setMode(next){if(busy)return;mode=next;$('normalMode').classList.toggle('active',mode==='normal');$('warpMode').classList.toggle('active',mode==='warp');$('normalMode').setAttribute('aria-pressed',String(mode==='normal'));$('warpMode').setAttribute('aria-pressed',String(mode==='warp'));playSound('tap');}
$('travelButton').onclick=openBriefing;$('normalMode').onclick=()=>setMode('normal');$('warpMode').onclick=()=>setMode('warp');
$('observeButton').onclick=()=>{if(!busy&&apply(Engine.inspect(state)))playSound('tap');};
$('insultChoices').onclick=e=>{const button=e.target.closest('[data-choice]');if(button)chooseInsult(Number(button.dataset.choice));};
$('giftButton').onclick=doGift;$('cargoButton').onclick=doPrint;$('giftPrintButton').onclick=doPrint;
$('nextSectorButton').onclick=()=>{if(busy)return;selectedIndex=-1;if(apply(Engine.nextSector(state)))playSound('travel');};
$('helpButton').onclick=()=>$('helpDialog').showModal();$('replayIntroButton').onclick=()=>{$('helpDialog').close();introUI.open();};
$('logButton').onclick=showLog;$('resultLogButton').onclick=showLog;$('directoryButton').onclick=()=>$('directoryDialog').showModal();$('modelInfoButton').onclick=()=>$('modelDialog').showModal();
$('soundButton').onclick=()=>{options.sound=!options.sound;saveOptions();render();playSound('tap');};
document.addEventListener('click',e=>{const button=e.target.closest('[data-language]');if(button)changeLanguage(button.dataset.language);});
for(const id of ['targetList','mobileTargetList'])$(id).onclick=e=>{const button=e.target.closest('[data-target]');if(!button)return;$('directoryDialog').close();selectTarget(Number(button.dataset.target));};
for(const dialog of document.querySelectorAll('dialog:not(#introDialog):not(#arthurEpisodeDialog)'))dialog.addEventListener('click',e=>{if(e.target.closest('[data-close]'))dialog.close();if(e.target===dialog){const box=dialog.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)dialog.close();}});
$('resetButton').onclick=()=>{$('helpDialog').close();$('resetDialog').showModal();};
$('confirmResetButton').onclick=()=>{
  if(busy){toast(tr('今は航行中です。宇宙の順番くらい守りたまえ。','Hold on—we are mid-flight. Even eternity has a queue.'));return;}
  $('resetDialog').close();afterGift=null;briefingOpen=false;state=Engine.createGame(undefined,language());selectedIndex=-1;lastPortrait='';lastPhase=null;options.arthurArrivalSeen=false;options.arthurDeparturePending=false;saveOptions();scene.setView({sector:0});save();render();computer(tr('配達記録はきれいに消しました。不死身のほうは、システム権限が足りなくて消せませんでした。','Voyage wiped clean. Sadly, I lack admin privileges to cancel your immortality.'));
};
document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||e.repeat||document.querySelector('dialog[open]')||busy||/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))return;
  if((e.key==='Enter'||e.key===' ')&&e.target.closest('button,a'))return;const key=e.key.toLowerCase();
  if(briefingOpen&&['arrowright','enter'].includes(key)){e.preventDefault();briefingUI.next();}
  else if(briefingOpen&&key==='arrowleft'){e.preventDefault();briefingUI.previous();}
  else if(briefingOpen&&key==='escape'){e.preventDefault();briefingOpen=false;render();}
  else if(key==='j'&&state.phase==='map'&&!afterGift){e.preventDefault();briefingOpen?doTravel():openBriefing();}
  else if(['1','2','3'].includes(key)&&state.phase==='encounter'&&!afterGift){e.preventDefault();chooseInsult(Number(key)-1);}
  else if(key==='enter'&&(state.phase==='gift'||afterGift)){e.preventDefault();doGift();}
  else if(key==='r'){e.preventDefault();doPrint();}
  else if(key==='h'||key==='?')$('helpDialog').showModal();
});
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(state.phase==='encounter'||state.phase==='gift'||afterGift){lastPortrait='';render();}},120);});
render();save();
if(!storageAvailable)toast(tr('自動保存が使えません。タブを閉じると、せっかく怒らせた記録が消えてしまいます。','Local storage is unavailable. Closing this tab will tragically erase your hard-earned grievances.'),5500);
if(!options.introSeen)introUI.open();else resumeStory();
computer(state.completed===0&&state.phase==='map'?tr('さあまずは6人。英語フルネーム順に、面と向かって悪口と模型を配りましょう。','Six citizens to start with, strictly alphabetical. Do try to offend them properly.'):tr('前回の航海記録を復元しました。終わらないお仕事へ、おかえりなさいませ。','Voyage restored. Welcome back to the chore that stubbornly refuses to end.'));
