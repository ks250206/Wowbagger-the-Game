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
  container.innerHTML=state.targets.map((target,index)=>`<button class="target-row ${index<state.targetIndex?'past':index===state.targetIndex?'current':''} ${target.kind==='arthur'?'canon-target':''}" data-target="${index}" ${index===state.targetIndex?'aria-current="step"':''} aria-label="${escape(target.name)}, ${index<state.targetIndex?tr('配達済み','delivered'):index===state.targetIndex?tr('次の配達先','next recipient'):tr('未訪問','not yet visited')}"><span class="target-id">${index<state.targetIndex?'✓':pad(index+1)}</span><span class="target-person"><strong>${escape(target.name)}</strong><span>${escape(target.romanName)}</span>${target.kind==='arthur'?`<small class="canon-chip">${tr('原作のエピソード','FROM THE NOVEL')}</small>`:''}</span><span class="target-dot" style="background:${target.color}"></span></button>`).join('');
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
    text('mapHeadline',state.completed===0?tr('宇宙に、用事がある。','The Universe requires a word.'):state.targetIndex===0?tr('宇宙は、協力的でない。','The Universe is not helping.'):tr('まだ、帰れない。','Still no reason to go home.'));
    $('mapSubline').innerHTML=state.completed===0?tr('訪ねて、言って、模型を渡す。<br>宇宙規模でも、仕事は増える。','Visit. Offend. Leave a crystal.<br>A remarkably scalable nuisance.'):tr('{n}人に配達完了。<br>感謝状の収納場所は、まだ要りません。',state.completed===1?'One delivery completed.<br>No additional storage for thank-you notes is required.':'{n} deliveries completed.<br>No additional storage for thank-you notes is required.',{n:number(state.completed)});
    crystal?.stop();
  }
  if(phase==='encounter'||phase==='gift'){
    const resident=afterGift?.target||target,pending=afterGift?.result||state.pendingInsult;
    text('encounterStage',afterGift?tr('受領完了 / 感謝は任意','DELIVERED / GRATITUDE OPTIONAL'):phase==='gift'?tr('02 / LGPS模型を渡す','02 / THE UNREQUESTED GIFT'):tr('01 / 本人に悪口を伝える','01 / THE PERSONAL REMARK'));
    text('encounterPlanet',resident.planetName);text('residentName',resident.name);text('residentRoman',resident.romanName);text('residentRole',resident.role);text('residentSpecies',resident.species);
    text('residentSpeech',afterGift?afterGift.result.giftResponse:phase==='gift'?pending.response:resident.intro);
    show('canonNote',resident.kind==='arthur');
    if(resident.kind==='arthur')text('canonNote',tr('『宇宙クリケット大戦争』第1章の遭遇に基づく翻案。台詞は創作、LGPS贈呈は本作独自の追加です。','Adapted from the Chapter 1 encounter in Life, the Universe and Everything. Dialogue is newly written; the LGPS gift is this game’s addition.'));
    const portraitKey=`${resident.id}:${phase}:${language()}:${afterGift?'done':pending?.effect||0}`;
    const mood=afterGift?'confused':phase==='gift'?pending.effect>=2?'angry':'happy':'neutral';
    if(portraitKey!==lastPortrait||lastPhase!==phase){requestAnimationFrame(()=>drawAlien($('alienCanvas'),{species:resident.portrait??resident.species,kind:resident.kind,color:resident.color,mood,locale:language()}));lastPortrait=portraitKey;}
    show('insultPanel',phase==='encounter');show('giftPanel',phase==='gift');show('effectBadge',phase==='gift');
    if(phase==='encounter'){
      show('hintText',state.inspected);text('hintText',resident.hint);$('observeButton').disabled=state.inspected;
      $('observeButton').innerHTML=state.inspected?tr('観察済み <span>自慢の所在を確認しました。</span>','Observation complete <span>Pride successfully located.</span>'):tr('相手を観察する <span>2年かけて</span>','Observe the recipient <span>Allow two years</span>');
      $('insultChoices').innerHTML=resident.choices.map((choice,index)=>`<button class="insult-choice" data-choice="${index}"><span class="choice-number">${index+1}</span><span class="choice-body"><span class="choice-tag">${escape(choice.tag)}</span>${tr('「{line}」','“{line}”',{line:escape(choice.text)})}</span></button>`).join('');crystal?.stop();
    }else{
      const effectText=pending.effect===3?tr('的確な迷惑','PRECISION NUISANCE'):pending.effect===2?tr('十分に不愉快','SATISFACTORILY OFFENDED'):tr('被害は軽微','ONLY SLIGHTLY INCONVENIENCED');
      text('effectBadge',afterGift?tr('悪口 ＋ 模型 受領済み · +{n}点','INSULT + MODEL RECEIVED · +{n} points',{n:pending.points}):effectText);$('effectBadge').classList.toggle('weak',pending.effect===1&&!afterGift);
      show('giftPrintButton',!afterGift&&state.models===0);$('giftButton').disabled=busy||(!afterGift&&state.models<1);
      $('giftButton').innerHTML=afterGift?(resident.kind==='arthur'?tr('船へ戻る','Return to the ship'):state.phase==='result'?tr('この宙域の配達を終える','Complete this sector'):tr('次の名前へ','Next name, please')):tr('LGPS模型を手渡す <kbd>Enter</kbd>','Hand over the LGPS model <kbd>Enter</kbd>');
      $('giftPanel').querySelector('.gift-copy').textContent=afterGift?afterGift.result.fact:state.models===0?tr('模型棚は空です。プリンターだけが、まだやる気です。','The shelf is empty. The printer remains distressingly willing.'):tr('悪口だけでは、サービスが行き届きません。','An insult alone would be a rather incomplete service.');
      $('giftPanel').querySelector('.section-heading .eyebrow').textContent=afterGift?'DELIVERED, WHETHER THEY LIKE IT OR NOT':'AND ONE MORE THING';
      $('giftPanel').querySelector('.section-heading h3').textContent=afterGift?tr('贈り物は、受け取られた。','The present has been accepted.'):tr('それと、こちらをどうぞ。','And this is also for you.');
      requestAnimationFrame(()=>{if(!crystal)crystal=new CrystalModel($('crystalCanvas'),{locale:language()});crystal.setLocale(language());crystal.start();crystal.setCelebrating(!!afterGift);});
    }
  }
  if(phase==='result'){
    crystal?.stop();text('resultSubtitle',tr('第{n}宙域の全員が、悪口とLGPS模型を受け取りました。返品窓口は、ありません。','Everyone in sector {n} has received an insult and an LGPS model. There is no returns desk.',{n:state.sector}));
    $('resultStats').innerHTML=`<div class="result-stat"><span>${tr('この宙域の得点','Sector score')}</span><strong>${number(view.sectorScore)}</strong></div><div class="result-stat"><span>${tr('通算の配達','Lifetime deliveries')}</span><strong>${number(state.completed)}</strong></div><div class="result-stat"><span>${tr('失われた年月','Years misplaced')}</span><strong>${number(state.years)}</strong></div>`;
    text('resultQuote',tr('あなたの称号：{rank}','Your official designation: {rank}',{rank:view.rank}));
  }
  if(lastPhase!==phase){if(window.innerWidth<=650)window.scrollTo({top:0,behavior:'instant'});lastPhase=phase;}
  text('soundText',options.sound?'ON':'OFF');$('soundButton').setAttribute('aria-label',options.sound?tr('効果音をオフにする','Turn sound off'):tr('効果音をオンにする','Turn sound on'));$('soundButton').setAttribute('aria-pressed',String(options.sound));
}
function selectTarget(index) {
  if(busy||state.phase!=='map'||afterGift)return;
  const target=state.targets[index];if(!target)return;selectedIndex=index;scene.setView({selectedIndex});clearTimeout(previewTimer);
  $('selectedPreview').innerHTML=`<button id="closePreview" aria-label="${tr('閉じる','Close')}">×</button><span>${index<state.targetIndex?tr('配達済み','Delivered'):index===state.targetIndex?tr('次の配達先','Next recipient'):tr('あと{n}人先',index-state.targetIndex===1?'One name ahead':'{n} names ahead',{n:index-state.targetIndex})}</span><strong>${escape(target.name)}</strong>${escape(target.role)}<br><span>${escape(target.planetName)}</span>${index>state.targetIndex?`<br><small>${tr('英語のフルネーム順。先方の知名度も例外にはなりません。','Full English-name order. Celebrity does not qualify for an exemption.')}</small>`:''}`;
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
  text('travelButton',mode==='warp'?tr('時空と交渉中…','Negotiating with space-time…'):tr('航行中…','In transit…'));
  computer(mode==='warp'?tr('シートベルトをどうぞ。物理法則に対しては気休めです。','Fasten your seat belt. It provides moral support against the laws of physics.'):tr('出発しました。地図上では、ひどく簡単な仕事です。','We have departed. On the map this is an embarrassingly simple job.'));playSound('travel');
  try{await scene.travelTo(state.targetIndex,mode);}finally{busy=false;document.body.classList.remove('busy');}
  if(result.event.died){show('transitOverlay',true);text('transitTitle',tr('到着先は、恒星の中でした。','We have arrived inside a star.'));text('transitText',tr('再生に{n}年。苦情を言う相手も、あなたです。','Regeneration took {n} years. Complaints may be addressed to yourself.',{n:result.event.years}));playSound('accident');busy=true;await new Promise(resolve=>setTimeout(resolve,reducedMotion?650:1900));show('transitOverlay',false);busy=false;}
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
    if(completedSector){playSound('result');computer(tr('一区画完了。宇宙は、その間に仕事を増やしておきました。','Sector complete. The Universe has used the interval to create more work.'));}
    else{playSound('tap');computer(state.lastResult?.fact||tr('次の配達先を表示しました。','Next recipient displayed.'));scene.burst('success');}return;
  }
  if(state.phase!=='gift')return;const target=Engine.getTarget(state),result=Engine.gift(state);
  if(result.event.type==='blocked'){toast(result.event.message);return;}
  afterGift={target,result:result.state.lastResult};state=result.state;
  if(target.kind==='arthur'){options.arthurDeparturePending=true;saveOptions();}
  save();render();playSound('gift');computer(result.event.giftResponse);
}
function doPrint(){if(busy||afterGift)return;const result=Engine.printModels(state);if(apply(result)){playSound('print');toast(tr('模型を{n}個補充。8年です。お急ぎ便でした。','{n} models restocked. Eight years. That was the express service.',{n:result.event.amount}));}}
function renderLog(){$('logEntries').innerHTML=state.log.length?state.log.map(item=>`<article class="log-entry"><time>${tr('経過 {n} 年','YEAR {n}',{n:number(item.years)})}</time><p>${escape(item.message)}</p></article>`).join(''):`<p class="log-empty">${tr('まだ誰も不愉快になっていません。不手際です。','Nobody has been offended yet. An administrative oversight.')}</p>`;}
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
  if(busy){toast(tr('航行中です。宇宙の順番を守ってください。','Please wait for transit to finish. The Universe has a queue.'));return;}
  $('resetDialog').close();afterGift=null;briefingOpen=false;state=Engine.createGame(undefined,language());selectedIndex=-1;lastPortrait='';lastPhase=null;options.arthurArrivalSeen=false;options.arthurDeparturePending=false;saveOptions();scene.setView({sector:0});save();render();computer(tr('記録は消せました。不死身の方は、権限が足りません。','The records have been cleared. We lack the permissions to remove immortality.'));
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
if(!storageAvailable)toast(tr('自動保存を利用できません。タブを閉じると、この航海の記録が失われる可能性があります。','Automatic saving is unavailable. Closing this tab may lose this voyage.'),5500);
if(!options.introSeen)introUI.open();else resumeStory();
computer(state.completed===0&&state.phase==='map'?tr('まずは6人。名簿は英語のフルネーム順です。礼節は順番にだけ適用されます。','Six names to begin with, in full English-name order. Courtesy applies strictly to the sequence.'):tr('航海記録を復元しました。終わらない仕事へ、お帰りなさい。','Voyage restored. Welcome back to the job that has declined to end.'));
