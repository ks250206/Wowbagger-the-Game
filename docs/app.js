import * as Engine from './engine.js';
import { SpaceScene, drawAlien } from './scene.js';
import { CrystalModel } from './crystal.js';
import { IntroController, BriefingController } from './story-ui.js';

const $ = id => document.getElementById(id);
const SAVE_KEY = 'wowbagger-lgps-v1';
const OPTIONS_KEY = 'wowbagger-lgps-options-v1';
let state, options = { sound: false, introSeen: false }, storageAvailable = true;
try {
  state = Engine.restore(localStorage.getItem(SAVE_KEY));
  const storedOptions = JSON.parse(localStorage.getItem(OPTIONS_KEY) || '{}');
  options.sound = storedOptions.sound === true;
  options.introSeen = storedOptions.introSeen === true;
} catch { storageAvailable = false; }
state ||= Engine.createGame();
let mode = 'normal', selectedIndex = -1, busy = false, crystal, toastTimer, previewTimer;
let soundContext, afterGift = null, lastPortrait = '', lastPhase = null, briefingOpen = false;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const number = n => new Intl.NumberFormat('ja-JP').format(n);
const pad = n => String(n).padStart(2, '0');
const text = (id, value) => { $(id).textContent = value; };
const show = (id, visible) => { $(id).hidden = !visible; };
const escape = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const scene = new SpaceScene($('galaxy'), { onSelect: selectTarget });
const briefingUI = new BriefingController({
  onLaunch: doTravel,
  onClose: () => { briefingOpen = false; render(); },
  onPrint: doPrint,
});
const introUI = new IntroController({onFinish: () => {
  options.introSeen = true;
  try { localStorage.setItem(OPTIONS_KEY, JSON.stringify(options)); } catch { /* optional preference */ }
  render();
}});

function playSound(kind = 'tap') {
  if (!options.sound) return;
  try {
    soundContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (soundContext.state === 'suspended') soundContext.resume();
    const notes = { tap: [420], travel: [155, 230, 310], insult: [290, 170], gift: [330, 440, 660], print: [220, 330], result: [262, 330, 392, 523], accident: [140, 90, 65] }[kind] || [420];
    notes.forEach((frequency, index) => {
      const oscillator = soundContext.createOscillator(), gain = soundContext.createGain();
      const start = soundContext.currentTime + index * .085;
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(.055, start + .018);
      gain.gain.exponentialRampToValueAtTime(.001, start + .24);
      oscillator.connect(gain); gain.connect(soundContext.destination);
      oscillator.start(start); oscillator.stop(start + .27);
    });
  } catch { /* Audio is optional; a blocked context must not stop the game. */ }
}
function save() {
  try {
    localStorage.setItem(SAVE_KEY, Engine.serialize(state));
    storageAvailable = true;
  } catch { storageAvailable = false; }
  text('saveStatus', storageAvailable ? '自動保存済み' : '保存できません');
  $('saveStatus').title = storageAvailable ? 'このブラウザに進行を保存しています' : 'ブラウザの保存領域を利用できません。このタブを閉じると進行が失われる可能性があります。';
}
function toast(message, duration = 3600) {
  clearTimeout(toastTimer);
  text('toast', message); show('toast', true);
  toastTimer = setTimeout(() => show('toast', false), duration);
}
function computer(message) { text('computerLine', `船載AI：${message}`); }
function apply(result, { announce = true } = {}) {
  if (result.event.type === 'blocked') { toast(result.event.message); return false; }
  state = result.state;
  save(); render();
  if (announce) computer(result.event.message);
  return true;
}
function renderTargets(container) {
  container.innerHTML = state.targets.map((target, index) => `<button class="target-row ${index < state.targetIndex ? 'past' : index === state.targetIndex ? 'current' : ''}" data-target="${index}" ${index === state.targetIndex ? 'aria-current="step"' : ''} aria-label="${escape(target.name)}、${index < state.targetIndex ? '配達済み' : index === state.targetIndex ? '次の配達先' : '未訪問'}"><span class="target-id">${index < state.targetIndex ? '✓' : pad(index + 1)}</span><span class="target-person"><strong>${escape(target.name)}</strong><span>${escape(target.romanName)}</span></span><span class="target-dot" style="background:${target.color}"></span></button>`).join('');
}
function render() {
  const target = Engine.getTarget(state), view = Engine.view(state);
  const phase = afterGift ? 'gift' : briefingOpen ? 'briefing' : state.phase;
  document.body.classList.toggle('briefing-mode', phase === 'briefing');
  text('years', number(state.years)); text('completed', number(state.completed));
  text('boredomValue', `${state.boredom}%`); text('boredomText', view.boredomLabel);
  $('boredomBar').style.width = `${state.boredom}%`;
  $('boredomBar').style.background = state.boredom >= 75 ? 'var(--orange)' : 'var(--acid)';
  text('models', state.models); text('quota', `${state.targetIndex} / 6`); text('mobileQuota', `${state.targetIndex}/6`);
  text('sectorBadge', String(state.sector).padStart(2,'0')); text('chartSector', String(state.sector).padStart(3,'0'));
  text('sectorTitle', `宙域 ${String(state.sector).padStart(3,'0')} · ${state.sector === 1 ? '最初の、長い日曜日' : 'まだ、Aの項です'}`);
  text('population', `${number(BigInt(view.remainingPopulation))} 人`);
  $('cargoButton').title = `${state.models} / 3個。補充に8年かかります。`;
  $('cargoButton').disabled = busy || !!afterGift || state.phase === 'result';
  $('travelButton').disabled = busy;
  renderTargets($('targetList')); renderTargets($('mobileTargetList'));
  show('briefingScreen', phase === 'briefing');
  if (phase === 'briefing' && target) briefingUI.open(target, { mode, models: state.models });
  else briefingUI.hide();
  show('mapScreen', phase === 'map'); show('encounterScreen', phase === 'encounter' || phase === 'gift'); show('resultScreen', phase === 'result');
  scene.setView({ targets: state.targets, currentIndex: state.targetIndex, selectedIndex, phase, sector: state.sector, player: state.ship, reducedMotion });
  if (phase === 'map' && target) {
    text('nextNumber', pad(state.targetIndex + 1)); text('nextRole', target.role); text('nextName', target.name); text('nextPlanet', target.planetName);
    text('mapHeadline', state.completed === 0 ? '宇宙に、用事がある。' : state.targetIndex === 0 ? '宇宙は、まだ広い。' : 'まだ、帰れない。');
    $('mapSubline').innerHTML = state.completed === 0 ? '相手を訪ねて、ひどいことを言おう。<br>模型を忘れずに。' : `${number(state.completed)}人に配達完了。<br>宇宙からのお礼は、まだありません。`;
    crystal?.stop();
  }
  if (phase === 'encounter' || phase === 'gift') {
    const resident = afterGift?.target || target;
    const pending = afterGift?.result || state.pendingInsult;
    text('encounterStage', afterGift ? '受領完了 / 任務達成' : phase === 'gift' ? '02 / LGPS模型を渡す' : '01 / 悪口を伝える');
    text('encounterPlanet', resident.planetName); text('residentName', resident.name); text('residentRoman', resident.romanName); text('residentRole', resident.role);
    text('residentSpecies', resident.species);
    text('residentSpeech', afterGift ? afterGift.result.giftResponse : phase === 'gift' ? pending.response : resident.intro);
    const portraitKey = `${resident.id}:${phase}:${afterGift ? 'done' : pending?.effect || 0}`;
    const mood = afterGift ? 'confused' : phase === 'gift' ? pending.effect >= 2 ? 'angry' : 'happy' : 'neutral';
    if (portraitKey !== lastPortrait || lastPhase !== phase) {
      requestAnimationFrame(() => drawAlien($('alienCanvas'), { species: resident.portrait ?? resident.species, color: resident.color, mood }));
      lastPortrait = portraitKey;
    }
    show('insultPanel', phase === 'encounter'); show('giftPanel', phase === 'gift'); show('effectBadge', phase === 'gift');
    if (phase === 'encounter') {
      show('hintText', state.inspected); text('hintText', resident.hint);
      $('observeButton').disabled = state.inspected;
      $('observeButton').innerHTML = state.inspected ? '観察済み <span>本人の自慢ほど、よく燃える。</span>' : '相手を観察する <span>2年かけて</span>';
      $('insultChoices').innerHTML = resident.choices.map((choice, index) => `<button class="insult-choice" data-choice="${index}"><span class="choice-number">${index+1}</span><span class="choice-body"><span class="choice-tag">${escape(choice.tag)}</span>「${escape(choice.text)}」</span></button>`).join('');
      crystal?.stop();
    } else {
      const effectText = pending.effect === 3 ? '会心の一言' : pending.effect === 2 ? 'しっかり不愉快' : 'あまり刺さらない';
      text('effectBadge', afterGift ? `悪口 ＋ 模型 受領済み · +${pending.points}点` : effectText);
      $('effectBadge').classList.toggle('weak', pending.effect === 1 && !afterGift);
      show('giftPrintButton', !afterGift && state.models === 0);
      $('giftButton').disabled = busy || (!afterGift && state.models < 1);
      $('giftButton').innerHTML = afterGift ? (state.phase === 'result' ? 'この宙域の配達を終える' : '次の名前へ') : 'LGPS模型を手渡す <kbd>Enter</kbd>';
      $('giftPanel').querySelector('.gift-copy').textContent = afterGift ? afterGift.result.fact : state.models === 0 ? '模型棚が空です。今ここで補充できます。' : '悪口だけで帰るのは、礼儀に反する。';
      $('giftPanel').querySelector('.section-heading .eyebrow').textContent = afterGift ? 'DELIVERED, WHETHER THEY LIKE IT OR NOT' : 'AND ONE MORE THING';
      $('giftPanel').querySelector('.section-heading h3').textContent = afterGift ? '贈り物は、受け取られた。' : 'それと、こちらをどうぞ。';
      requestAnimationFrame(() => {
        if (!crystal) crystal = new CrystalModel($('crystalCanvas'));
        crystal.start(); crystal.setCelebrating(!!afterGift);
      });
    }
  }
  if (phase === 'result') {
    crystal?.stop();
    text('resultSubtitle', `第${state.sector}宙域の全員が、悪口とLGPS模型を受け取りました。`);
    $('resultStats').innerHTML = `<div class="result-stat"><span>この宙域の得点</span><strong>${number(view.sectorScore)}</strong></div><div class="result-stat"><span>通算の配達</span><strong>${number(state.completed)} 人</strong></div><div class="result-stat"><span>経過した年月</span><strong>${number(state.years)} 年</strong></div>`;
    text('resultQuote', `あなたの称号：${view.rank}`);
  }
  if (lastPhase !== phase) {
    if (window.innerWidth <= 650) window.scrollTo({ top: 0, behavior: 'instant' });
    lastPhase = phase;
  }
  text('soundText', options.sound ? 'ON' : 'OFF');
  $('soundButton').setAttribute('aria-label', `効果音を${options.sound ? 'オフ' : 'オン'}にする`);
  $('soundButton').setAttribute('aria-pressed', String(options.sound));
}

function selectTarget(index) {
  if (busy || state.phase !== 'map' || afterGift) return;
  const target = state.targets[index]; if (!target) return;
  selectedIndex = index;
  scene.setView({selectedIndex});
  clearTimeout(previewTimer);
  $('selectedPreview').innerHTML = `<button id="closePreview" aria-label="閉じる">×</button><span>${index < state.targetIndex ? '配達済み' : index === state.targetIndex ? '次の配達先' : `あと${index-state.targetIndex}人先`}</span><strong>${escape(target.name)}</strong>${escape(target.role)}<br><span>${escape(target.planetName)}</span>${index > state.targetIndex ? '<br><small>順番は厳守。先に今の相手へ。</small>' : ''}`;
  show('selectedPreview', true);
  previewTimer = setTimeout(() => show('selectedPreview', false), 5500);
  $('closePreview').onclick = () => show('selectedPreview', false);
}
function openBriefing() {
  if (busy || state.phase !== 'map' || afterGift) return;
  briefingOpen = true;
  show('selectedPreview', false);
  render(); playSound('tap');
}
async function doTravel() {
  if (busy || state.phase !== 'map' || afterGift) return;
  briefingOpen = false; render();
  const result = Engine.travel(state, { mode });
  if (result.event.type === 'blocked') { toast(result.event.message); return; }
  busy = true; show('selectedPreview', false); $('travelButton').disabled = true;
  document.body.classList.add('busy');
  text('travelButton', mode === 'warp' ? '時空を曲げています…' : '航行中…');
  computer(mode === 'warp' ? 'シートベルトをどうぞ。効くかは分かりません。' : '出発しました。地図上では近いのですが。');
  playSound('travel');
  try { await scene.travelTo(state.targetIndex, mode); }
  finally { busy = false; document.body.classList.remove('busy'); }
  if (result.event.died) {
    show('transitOverlay', true); text('transitTitle', '恒星の中に、着きました。');
    text('transitText', `${result.event.years}年かけて再生。ご安心ください。不死身です。`); playSound('accident');
    busy = true;
    await new Promise(resolve => setTimeout(resolve, reducedMotion ? 650 : 1900));
    show('transitOverlay', false); busy = false;
  }
  apply(result); selectedIndex = -1;
  $('travelButton').innerHTML = '船内で確認 <kbd>J</kbd>';
}
function chooseInsult(index) {
  if (busy || state.phase !== 'encounter' || afterGift) return;
  if (apply(Engine.insult(state, index))) playSound('insult');
}
function doGift() {
  if (busy) return;
  if (afterGift) {
    const completedSector = state.phase === 'result';
    afterGift = null; render();
    if (completedSector) { playSound('result'); computer('この区画の配達が終わりました。宇宙の人口は、その間にも増えました。'); }
    else { playSound('tap'); computer(state.lastResult?.fact || '次の配達先を表示しました。'); scene.burst('success'); }
    return;
  }
  if (state.phase !== 'gift') return;
  const target = Engine.getTarget(state), result = Engine.gift(state);
  if (result.event.type === 'blocked') { toast(result.event.message); return; }
  afterGift = { target, result: result.state.lastResult };
  state = result.state; save(); render(); playSound('gift');
  computer(result.event.giftResponse);
}
function doPrint() {
  if (busy || afterGift) return;
  const result = Engine.printModels(state);
  if (apply(result)) { playSound('print'); toast(`模型を${result.event.amount}個補充しました。8年ほど、かかりました。`); }
}
function showLog() {
  $('logEntries').innerHTML = state.log.length ? state.log.map(item => `<article class="log-entry"><time>経過 ${number(item.years)} 年</time><p>${escape(item.message)}</p></article>`).join('') : '<p class="log-empty">まだ、誰も不愉快になっていません。</p>';
  $('logDialog').showModal();
}
function setMode(newMode) {
  if (busy) return;
  mode = newMode;
  $('normalMode').classList.toggle('active', mode === 'normal'); $('warpMode').classList.toggle('active', mode === 'warp');
  $('normalMode').setAttribute('aria-pressed', String(mode === 'normal')); $('warpMode').setAttribute('aria-pressed', String(mode === 'warp'));
  playSound('tap');
}
$('travelButton').onclick = openBriefing;
$('normalMode').onclick = () => setMode('normal'); $('warpMode').onclick = () => setMode('warp');
$('observeButton').onclick = () => { if (!busy && apply(Engine.inspect(state))) playSound('tap'); };
$('insultChoices').onclick = e => { const button = e.target.closest('[data-choice]'); if (button) chooseInsult(Number(button.dataset.choice)); };
$('giftButton').onclick = doGift;
$('cargoButton').onclick = doPrint; $('giftPrintButton').onclick = doPrint;
$('nextSectorButton').onclick = () => {
  if (busy) return;
  selectedIndex = -1;
  if (apply(Engine.nextSector(state))) playSound('travel');
};
$('helpButton').onclick = () => $('helpDialog').showModal();
$('replayIntroButton').onclick = () => { $('helpDialog').close(); introUI.open(); };
$('logButton').onclick = showLog; $('resultLogButton').onclick = showLog;
$('directoryButton').onclick = () => $('directoryDialog').showModal();
$('modelInfoButton').onclick = () => $('modelDialog').showModal();
$('soundButton').onclick = () => {
  options.sound = !options.sound;
  try { localStorage.setItem(OPTIONS_KEY, JSON.stringify(options)); } catch { /* nonessential */ }
  render(); playSound('tap');
};
for (const id of ['targetList','mobileTargetList']) $(id).onclick = e => {
  const button = e.target.closest('[data-target]'); if (!button) return;
  $('directoryDialog').close(); selectTarget(Number(button.dataset.target));
};
for (const dialog of document.querySelectorAll('dialog:not(#introDialog)')) {
  dialog.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) dialog.close();
    if (e.target === dialog) { const box = dialog.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close(); }
  });
}
$('resetButton').onclick = () => { $('helpDialog').close(); $('resetDialog').showModal(); };
$('confirmResetButton').onclick = () => {
  if (busy) { toast('航行終了後にやり直せます。少々お待ちください。'); return; }
  $('resetDialog').close(); afterGift = null; briefingOpen = false; state = Engine.createGame(); selectedIndex = -1; lastPortrait = ''; lastPhase = null;
  scene.setView({sector:0});
  save(); render(); computer('記録を消しました。あなたが不死身であることは、消せませんでした。');
};
document.addEventListener('keydown', e => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.repeat || document.querySelector('dialog[open]') || busy || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  // Native focused controls own Enter and Space, preventing duplicate actions.
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('button,a')) return;
  const key = e.key.toLowerCase();
  if (briefingOpen && ['arrowright','enter'].includes(key)) { e.preventDefault(); briefingUI.next(); }
  else if (briefingOpen && key === 'arrowleft') { e.preventDefault(); briefingUI.previous(); }
  else if (briefingOpen && key === 'escape') { e.preventDefault(); briefingOpen = false; render(); }
  else if (key === 'j' && state.phase === 'map' && !afterGift) { e.preventDefault(); briefingOpen ? doTravel() : openBriefing(); }
  else if (['1','2','3'].includes(key) && state.phase === 'encounter' && !afterGift) { e.preventDefault(); chooseInsult(Number(key)-1); }
  else if (key === 'enter' && (state.phase === 'gift' || afterGift)) { e.preventDefault(); doGift(); }
  else if (key === 'r') { e.preventDefault(); doPrint(); }
  else if (key === 'h' || key === '?') $('helpDialog').showModal();
});
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (state.phase === 'encounter' || state.phase === 'gift' || afterGift) { lastPortrait = ''; render(); }
  }, 120);
});
// State is committed at each action; avoid stale tabs overwriting it on unload.
render(); save();
if (!storageAvailable) toast('このブラウザでは自動保存を利用できません。タブを閉じる前にご注意ください。', 5500);
// The skippable prologue gives the player's mission its reason, once per browser.
if (!options.introSeen) introUI.open();
if (state.completed === 0 && state.phase === 'map') computer('まずは6人。悪口を言ってから、LGPS模型を手渡してください。');
else computer('航海記録を復元しました。永遠の仕事に、お帰りなさい。');
