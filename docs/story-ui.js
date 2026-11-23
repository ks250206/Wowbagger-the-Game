import { IntroScene } from './intro-scene.js';
import { CockpitScene } from './cockpit-scene.js';
import { tr, language } from './i18n.js';

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const PROLOGUE = [
  {
    ja:{label:'実に締まらない不死の誕生',time:'とある火曜日の昼休み。残念ながら最後ではない。',title:'事故のせいで、\n死ねなくなった。',body:'宇宙には数多くの不死者がいるが、たいていは生まれつき不死身で、それらしく優雅に振る舞っている。しかしワウバッガーは違った。粒子加速器と、昼間から引っ掛けた安酒と、どこにでもある輪ゴム二本が奇跡の化学反応を起こし、うっかり不死身になってしまったのだ。設備担当者は報告書に「影響：長期的」とだけ書き、紅茶を淹れに行ってしまった。',note:'こうしてあなたは「無限引き伸ばされワウバッガー」になった。定年も、退職金も、死ぬ権利もない。',aria:'粒子加速器と昼酒と輪ゴムの事故で、うっかり不死身になってしまうワウバッガー。'},
    en:{label:'A DEEPLY UNHEROIC IMMORTALITY',time:'One Tuesday lunch break. Regrettably not his last.',title:'The mishap\nrefused to wear off.',body:'Most immortals in the Universe are born that way and carry it off with dignity. Wowbagger was not. A particle accelerator, an ill-advised liquid lunch, and two perfectly ordinary rubber bands achieved a freak consensus, rendering him permanently unkillable. Facilities logged the side effects as “ongoing”, closed the ticket, and wandered off for tea and a biscuit.',note:'You are now Wowbagger the Infinitely Prolonged. Retirement is no longer covered by your pension.',aria:'A particle accelerator, a drink and two rubber bands accidentally render Wowbagger immortal.'},
  },
  {
    ja:{label:'不死身の最大の敵は、日曜の午後',time:'数百万年後。まだ日曜日の午後3時14分。',title:'宇宙は広い。\nだが、暇はもっと広い。',body:'最初の数百万年はそれなりに愉快だった。大金持ちになり、あらゆる銀河を旅し、思いつく限りの趣味が絶滅するのを見届けた。それでも「日曜日の午後3時すぎ」だけはしつこくやって来る。風呂に入る気力もなく、本を読む気も起きず、ぬるくなった紅茶を前に天井を見つめるあの呪われた時間帯が――永遠に。',note:'宇宙の終焉を待つ前に、まず今日の午後をどうにかしないと気が狂いそうだった。',aria:'星も文明も滅びていくのに、日曜日の午後3時すぎのまま動かない時計の前で途方に暮れるワウバッガー。'},
    en:{label:'THE TRUE ENEMY IS SUNDAY AFTERNOON',time:'Several million years later. Still 3:14 p.m.',title:'Space is vast.\nSunday is vaster.',body:'The first few million years were quite jolly. He made a fortune, toured the wonders of the cosmos, and watched every hobby he took up go extinct—usually by Wednesday. Yet Sunday afternoons kept arriving: that damp, soul-sapping stretch around quarter past three, staring at a lukewarm mug of tea with nothing to do. Forever.',note:'Never mind the heat death of the Universe; he simply needed to survive half past three.',aria:'Wowbagger slumps in a decaying armchair while stars die and a cracked clock refuses to leave Sunday afternoon.'},
  },
  {
    ja:{label:'実に建設的な、壮大な暇つぶし',time:'ついに手帳に、予定が一行',title:'宇宙の全員に、\n悪口を言って回ろう。',body:'そこで彼は、永遠の命にふさわしい崇高な目標を立てた。宇宙に生きとし生ける全員のもとを一軒ずつ訪ね、面と向かって悪口を浴びせて回るのだ。英語のフルネーム順で。賢者たちは「絶対に終わらないから無意味だ」と忠告したが、終わらないことこそがこの計画の最大の長所だった。',note:'名簿は英語のフルネーム順。Argo、Arthur、Bela……と銀河の果てまで続いていく。',aria:'全宇宙の住民を英語のフルネーム順に並べた巨大な名簿を開き、やる気を出しているワウバッガー。'},
    en:{label:'A HOBBY WITH EXCELLENT JOB SECURITY',time:'At last, a reason to put trousers on',title:'Insult everyone.\nIn alphabetical order.',body:'At last, a noble purpose worthy of eternity: he would track down every living being in the Universe, one by one, and insult them to their face. In strict alphabetical order. Sages warned that it could never possibly be finished—which Wowbagger felt was the plan’s single finest selling point.',note:'This directory runs strictly by full English name: Argo, Arthur, Bela, and onwards into madness.',aria:'Wowbagger opens a holographic alphabetical directory of the entire Universe and plots his route.'},
  },
  {
    ja:{label:'本作だけの、頼んでもいない付属品',time:'手ぶらで訪ねるのも無粋なので',title:'悪口には、\n結晶模型も付きます。',body:'さらに本作では、悪口を浴びせた直後に「LGPS（Li₁₀GeP₂S₁₂）」という実在の固体電解質の結晶模型まで一個ずつ押し付けることにした。なぜそんな理系っぽい置物を配るのか？　誰にも頼まれていないが、そもそも悪口だって誰にも頼まれていない。理不尽に一貫性が出て、実に結構なことではないか。',note:'相手を観察し、的確に罵倒し、結晶模型を手渡す。クレーム窓口は永遠に開いています（誰も出ませんが）。',aria:'困惑する宇宙人に悪口を言い、光るLGPS結晶模型を手渡すワウバッガー。'},
    en:{label:'THIS GAME’S ENTIRELY UNSOLICITED EXTRA',time:'One mustn’t drop by empty-handed',title:'Every insult comes\nwith a crystal model.',body:'As an inexplicable bonus for this voyage, he is also pressing a scale model of the real solid-state electrolyte LGPS (Li₁₀GeP₂S₁₂) into every victim’s hands. Why a chemistry ornament? Nobody ordered one, of course—but then nobody ordered a bespoke insult either, so the sheer pointlessness is gloriously consistent.',note:'Spot the flaw, deliver the barb, hand over the crystal. Complaints are filed directly into the nearest black hole.',aria:'Wowbagger delivers an insult and hands a glowing LGPS crystal model to a thoroughly bewildered alien.'},
  },
];

export class IntroController {
  constructor({ onFinish = () => {} } = {}) {
    this.onFinish = onFinish; this.index = 0; this.scene = null;
    this.dialog = $('introDialog');
    $('introNext').onclick = () => this.next();
    $('introPrevious').onclick = () => this.setPage(this.index - 1, { scroll: true });
    $('introSkip').onclick = () => this.finish();
    $('introProgress').onclick = event => { const button = event.target.closest('[data-intro-page]'); if (button) this.setPage(Number(button.dataset.introPage), { scroll: true }); };
    this.dialog.addEventListener('cancel', event => { event.preventDefault(); this.finish(); });
    this.dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); this.next(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); this.setPage(this.index - 1); }
    });
    this.dialog.addEventListener('close', () => this.scene?.stop());
  }
  open() {
    this.index = 0;
    if (!this.dialog.open) this.dialog.showModal();
    this.scene ||= new IntroScene($('introCanvas'), { reducedMotion: reducedMotion() });
    this.scene.start(); this.setPage(0); $('introNext').focus({preventScroll:true});
  }
  refresh() { if (this.dialog.open) this.setPage(this.index); }
  setPage(index, { scroll = false } = {}) {
    this.index = Math.max(0, Math.min(PROLOGUE.length - 1, index));
    const page = PROLOGUE[this.index][language()];
    $('introChapter').textContent = `PROLOGUE ${String(this.index + 1).padStart(2,'0')} / 04`;
    $('introTime').textContent = page.time; $('introLabel').textContent = page.label;
    $('introTitle').textContent = page.title; $('introBody').textContent = page.body; $('introNote').textContent = page.note;
    $('introNext').textContent = this.index === 3 ? tr('名簿を開く（全宇宙の迷惑、開始）','Open the directory (ruin everyone’s day)') : tr('続きを見る','Continue this dreadful tale');
    $('introPrevious').disabled = this.index === 0;
    $('introProgress').innerHTML = PROLOGUE.map((item,i) => `<button class="intro-dot ${i===this.index?'active':''} ${i<this.index?'seen':''}" data-intro-page="${i}" aria-label="${esc(tr('第{n}幕：{label}','Scene {n}: {label}',{n:i+1,label:item[language()].label}))}" ${i===this.index?'aria-current="step"':''}><span></span></button>`).join('');
    this.scene?.setScene(this.index); this.dialog.dataset.chapter = String(this.index);
    $('introCanvas').setAttribute('aria-label', page.aria);
    if (scroll) this.dialog.scrollTo({ top: 0, behavior: 'instant' });
  }
  next() { if (this.index < 3) this.setPage(this.index + 1, { scroll: true }); else this.finish(); }
  finish() { this.scene?.stop(); this.dialog.close(); this.onFinish(); }
}

const BEATS = [
  {label:['場所と住所','Where on Earth (or elsewhere)?'],english:'DESTINATION / NAVIGATION',title:['さて、今度はどこの田舎だ。','Where have they hidden this one?']},
  {label:['種族と性格','Species & disposition'],english:'RECIPIENT / PERSONALITY',title:['どれどれ、どんな面倒な奴だ。','What brand of nuisance is this?']},
  {label:['経歴と家族','History & household'],english:'HISTORY / HOUSEHOLD',title:['頼んでもいない身の上話付きか。','Someone attached their entire biography.']},
  {label:['本日のノルマ','Today’s awkward errand'],english:'MISSION / SPECIAL DELIVERY',title:['悪口を一発、模型を一個。','One bespoke insult. One inexplicable crystal.']},
];
export class BriefingController {
  constructor({onLaunch = () => {},onClose = () => {},onPrint = () => {}} = {}) {
    this.onLaunch=onLaunch;this.onClose=onClose;this.onPrint=onPrint;
    this.scene=null;this.target=null;this.index=0;this.active=false;this.timer=null;this.locale=language();
    this.models=3;this.mode='normal';
    $('briefingNext').onclick=()=>this.next(); $('briefingBack').onclick=()=>this.onClose();
    $('briefingSkip').onclick=()=>this.onLaunch(); $('briefingFullText').onclick=()=>this.reveal();
    $('briefingTabs').onclick=event=>{const button=event.target.closest('[data-briefing-beat]');if(button)this.setBeat(Number(button.dataset.briefingBeat),{scroll:true});};
    $('briefingDossier').onclick=event=>{if(event.target.closest('[data-print-models]'))this.onPrint();};
  }
  open(target,{mode='normal',models=3}={}) {
    const changed = !this.active || this.target?.id!==target.id;
    const localeChanged = this.locale !== language(); this.locale=language();
    this.target=target;this.models=models;this.mode=mode;this.active=true;
    this.scene ||= new CockpitScene($('cockpitCanvas'), {reducedMotion:reducedMotion(),locale:language()});
    this.scene.setLocale(language());this.scene.setTarget(target);this.scene.start();
    $('briefingName').textContent=target.name; $('briefingRoman').textContent=target.romanName;
    $('briefingDestination').textContent=target.dossier.system;
    $('briefingFlightMode').textContent=mode==='warp'?tr('航法：無茶なワープ（自己責任）','Reckless warp (insurance void)'):tr('航法：通常航行（安全だが退屈）','Conventional flight (safe, dull)');
    $('briefingFlightMode').classList.toggle('risky',mode==='warp');
    if(changed){$('briefingScreen').scrollTop=0;$('briefingDossier').scrollTop=0;this.setBeat(0);}else if(localeChanged)this.setBeat(this.index);else this.renderDossier();
  }
  hide() {this.active=false;clearTimeout(this.timer);this.scene?.stop();}
  scrollToTop() {
    $('briefingScreen').scrollTop=0;
    $('briefingDossier').scrollTop=0;
    if(window.innerWidth>760)return;
    if(document.activeElement?.closest?.('.briefing-controls'))document.activeElement.blur();
    const jump=()=>{
      const anchor=$('briefingTabs')||$('briefingScreen');
      const top=anchor?Math.max(0,anchor.getBoundingClientRect().top+window.scrollY-10):0;
      window.scrollTo({top,behavior:'instant'});
    };
    jump();
    requestAnimationFrame(jump);
  }
  setBeat(index,{scroll=false}={}) {
    if(!this.active)return;
    this.index=Math.max(0,Math.min(3,index)); const beat=BEATS[this.index];
    $('briefingChapter').textContent=beat.english; $('briefingBeatTitle').textContent=tr(...beat.title);
    $('briefingPage').textContent=`${this.index+1} / 4`;
    $('briefingNext').textContent=this.index===3?tr('よし、不快にさせに行くぞ','Right then—off to ruin their day'):tr('次のページをめくる','Next page of grumbling');
    $('briefingTabs').innerHTML=BEATS.map((item,i)=>`<button class="briefing-tab ${i===this.index?'active':''}" data-briefing-beat="${i}" ${i===this.index?'aria-current="step"':''}><span>${String(i+1).padStart(2,'0')}</span>${tr(...item.label)}</button>`).join('');
    this.renderDossier();this.speak(this.target.briefing[this.index]);this.scene.setBeat(this.index);
    $('cockpitCanvas').setAttribute('aria-label',tr('宇宙船内のワウバッガー。窓の外は{planet}。{beat}の資料を読みながらボヤいている。','Wowbagger in his cockpit, peering out at {planet} and grumbling over the {beat} dossier.',{planet:this.target.dossier.planet,beat:tr(...beat.label)}));
    if(scroll)this.scrollToTop();
  }
  speak(line) {
    clearTimeout(this.timer);this.line=line;this.characters=Array.from(line);this.position=0;
    $('briefingAccessibleLine').textContent=line; $('briefingSpokenLine').textContent='';
    $('briefingFullText').hidden=reducedMotion(); $('briefingDialogue').classList.toggle('speaking',!reducedMotion());
    if(reducedMotion()){this.reveal();return;}
    const tick=()=>{if(!this.active)return;this.position=Math.min(this.characters.length,this.position+(language()==='en'?3:2));$('briefingSpokenLine').textContent=this.characters.slice(0,this.position).join('');if(this.position<this.characters.length)this.timer=setTimeout(tick,28);else this.reveal();};tick();
  }
  reveal() {clearTimeout(this.timer);this.position=this.characters?.length||0;$('briefingSpokenLine').textContent=this.line||'';$('briefingFullText').hidden=true;$('briefingDialogue').classList.remove('speaking');}
  next() {if(!this.active)return;if(this.index<3)this.setBeat(this.index+1,{scroll:true});else this.onLaunch();}
  previous(){if(this.index>0)this.setBeat(this.index-1,{scroll:true});else this.onClose();}
  renderDossier() {
    const d=this.target.dossier;
    const head=`<div class="dossier-header"><span class="eyebrow">UNIVERSAL CENSUS</span><span class="dossier-class">${tr('名簿番号','ENTRY')} ${String(this.target.ordinal).padStart(5,'0')}</span></div>`;
    const canon=this.target.kind==='arthur'?`<p class="dossier-canon">${tr('原作の名場面 · 先史時代の地球','FROM THE NOVEL · PREHISTORIC EARTH')}</p>`:'';
    let body='';
    if(this.index===0){
      const rows=[[tr('恒星系','System'),d.system],[tr('惑星','World'),d.planet],[tr('大陸','Continent'),d.continent],[tr('国','Country'),d.country],[tr('町','Town'),d.city]];
      body=`<h3>${tr('だいたい、宇宙のこのあたり。','Somewhere out in the unfashionable bit.')}</h3>${canon}<div class="destination-route">${rows.map(([label,value],i)=>`<div class="destination-stop" style="--depth:${i}"><span class="route-node">${String(i+1).padStart(2,'0')}</span><div><span>${label}</span><strong>${esc(value)}</strong></div></div>`).join('')}</div><p class="dossier-footnote">${tr('詳しい住所：','Last known address: ')}${esc(d.address)}</p>`;
    }else if(this.index===1){
      body=`<h3>${esc(this.target.name)}</h3>${canon}<div class="dossier-identity"><span class="identity-mark" aria-hidden="true">◈</span><div><span>${tr('種族・出身','Species / origin')}</span><strong>${esc(d.species)}</strong></div></div><dl class="dossier-facts"><div><dt>${tr('職業・肩書き','Occupation')}</dt><dd>${esc(this.target.role)}</dd></div><div><dt>${tr('性格（要注意点）','Disposition')}</dt><dd>${esc(d.personality)}</dd></div></dl><div class="dossier-note"><span>${tr('本人のよく言うセリフ','Typical opening remark')}</span><p>${esc(this.target.intro)}</p></div>`;
    }else if(this.index===2){
      const family=d.familyCount===null||d.familyCount===undefined?`<div class="family-heading"><span>${tr('家族構成','Household')}</span><strong class="family-unknown">${tr('記録なし','Not recorded')}</strong></div><p class="dossier-footnote">${esc(d.familyNote||tr('原作のこの場面では家族の人数は書かれていません。今はぽつんと一人です。','No household count appears in this chapter of the novel. At present he is conspicuously alone.'))}</p>`:`<div class="family-heading"><span>${tr('家族構成','Household')}</span><strong>${d.familyCount}<small>${tr('人家族','members')}</small></strong></div><ul class="family-members">${d.familyMembers.map(person=>`<li><span class="family-symbol" aria-hidden="true"><i></i></span><span>${esc(person)}</span></li>`).join('')}</ul><p class="dossier-footnote">${tr('※本人を含む人数です。苦情を入れてくる親戚の人数ではありません（たぶん）。','Includes the recipient. Not necessarily the number of relatives who will write an angry letter.')}</p>`;
      body=`<h3>${tr('経歴と、身内のメモ。','A brief and avoidable history.')}</h3>${canon}<dl class="dossier-facts"><div><dt>${tr('これまでの経歴','Background')}</dt><dd>${esc(d.background)}</dd></div></dl>${family}`;
    }else{
      body=`<h3>${tr('今日のやること（2ステップ）','Today’s two entirely unrequested tasks')}</h3><div class="delivery-objective"><span class="objective-number">01</span><div><strong>${tr('面と向かって悪口を言う','Deliver the insult in person')}</strong><p>${tr('相手が一番自慢している部分をズバリ突くほど高得点です。','Pierce their favourite vanity for maximum score and relief from boredom.')}</p></div></div><div class="delivery-objective"><span class="objective-number">02</span><div><strong>${tr('LGPS結晶模型を手渡す','Hand over the LGPS model')}</strong><p>${tr('Li₁₀GeP₂S₁₂を一個。返品・クーリングオフは一切受け付けません。','One Li₁₀GeP₂S₁₂ per citizen. Strictly no refunds or exchanges.')}</p></div></div>${this.target.kind==='arthur'?`<p class="dossier-canon">${tr('※LGPS模型の押し付けは本作オリジナル。原作では悪口だけ言ってアーサーを放置して帰ります。','Note: the LGPS gift is this game’s twist. In the novel, Wowbagger simply insults Arthur and leaves him stranded.')}</p>`:''}<div class="briefing-cargo ${this.models===0?'empty':''}"><span>${tr('いま船にある模型在庫','Models currently aboard')}</span><strong>${this.models}<small> / 3</small></strong></div>${this.models<3?`<button class="button button-secondary" data-print-models>${tr('模型を3個まで補充する（8年待ち）','Restock to 3 models (8 years)')}</button>`:`<p class="dossier-footnote">${tr('在庫は満タン。相手が欲しがっているかどうかは調査対象外です。','Shelves full. Whether the recipient wants one is outside our remit.')}</p>`}`;
    }
    $('briefingDossier').innerHTML=head+body;
  }
}
