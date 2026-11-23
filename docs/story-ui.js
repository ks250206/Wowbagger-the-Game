import { IntroScene } from './intro-scene.js';
import { CockpitScene } from './cockpit-scene.js';
import { tr, language } from './i18n.js';

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const PROLOGUE = [
  {
    ja:{label:'死亡届の、出しようがない',time:'ある日の昼休み。最後ではない。',title:'事故は、\n終わりませんでした。',body:'粒子加速器と昼酒と輪ゴムが、珍しく意見の一致を見せた。ワウバッガーは不死身になった。設備担当者は、事故の影響を「長期的」と報告した。',note:'あなたは、無限引き伸ばされワウバッガー。退職日は未定。',aria:'粒子加速器、昼酒、輪ゴム。事故で不死身になってしまうワウバッガー。'},
    en:{label:'A SMALL ADMINISTRATIVE DIFFICULTY',time:'A lunch break. Not his last.',title:'The accident\nfailed to end.',body:'A particle accelerator, a liquid lunch and some rubber bands achieved an unfortunate consensus. Wowbagger became immortal. Maintenance described the consequences as “ongoing” and closed the ticket.',note:'You are Wowbagger the Infinitely Prolonged. Retirement is not in the benefits package.',aria:'A particle accelerator, a drink and rubber bands cause Wowbagger to become immortal.'},
  },
  {
    ja:{label:'永遠は、休憩にも来る',time:'何百万年か後。まだ日曜日。',title:'宇宙は壮大だ。\n午後は、もっと長い。',body:'見聞を広め、財産を築き、趣味を一通り絶滅させた。それでも日曜の午後が余った。永遠を有意義に使うには、有意義であることを諦める必要があった。',note:'宇宙の終わりより、まず今日の終わりが欲しかった。',aria:'ワウバッガーが座り込み、星と文明が移り変わっても終わらない午後に退屈している。'},
    en:{label:'ETERNITY INCLUDES THE WEEKENDS',time:'Several million years later. Still Sunday.',title:'A vast Universe.\nA longer afternoon.',body:'He acquired experience, wealth and the ability to outlive every hobby he took up. Sunday afternoons remained. Clearly, filling eternity with meaningful activity had been an error in the requirements.',note:'The end of the Universe could wait. The end of the afternoon was becoming urgent.',aria:'Wowbagger sits bored while stars and civilisations pass and the afternoon refuses to end.'},
  },
  {
    ja:{label:'壮大な計画には、事務作業が要る',time:'ついに予定表へ、一件',title:'宇宙の全員に、\n悪口を言おう。',body:'本人の前で、一人ずつ、アルファベット順に。計画が不可能だという意見もあった。不可能なら、終わって次の用事を探す心配がない。採用するには十分だった。',note:'本作の名簿は英語のフルネーム順。Argo、Arthur、Bela……。',aria:'ワウバッガーが宇宙の住民を英語のフルネーム順に並べた名簿と航路を開く。'},
    en:{label:'A PLAN WITH EXCELLENT JOB SECURITY',time:'At last, an entry in the diary',title:'Insult everyone.\nAlphabetically.',body:'In person. Individually. In alphabetical order. Objections were raised that the scheme could never be finished. Wowbagger considered this a substantial advantage over every previous occupation.',note:'This directory uses full English names: Argo, Arthur, Bela…',aria:'Wowbagger opens a directory of residents ordered by full English name and plots his route.'},
  },
  {
    ja:{label:'本作独自の、余計なサービス',time:'しかも、手ぶらでは失礼だ',title:'悪口には、\n模型も付きます。',body:'今回はLGPSの結晶模型も配ることにした。誰からも頼まれていないが、依頼の有無で仕事を選んでいては、この計画は始まらない。Li₁₀GeP₂S₁₂を、一人に一つ。',note:'悪口を選び、模型を手渡す。苦情の受付時間は、永遠です。',aria:'相手に悪口とLGPS結晶模型を届ける。模型の贈呈はこのゲーム独自の追加設定。'},
    en:{label:'AN UNREQUESTED ADDITION FOR THIS GAME',time:'One must bring something',title:'The insult comes\nwith a model.',body:'This time he is also distributing LGPS crystal models. Nobody requested one, but requiring customer demand would cripple the entire operation. One Li₁₀GeP₂S₁₂ per recipient. No substitutions.',note:'Choose the remark. Hand over the model. Complaints remain open for eternity.',aria:'Wowbagger offers an insult and an LGPS crystal model. The model is an original addition for this game.'},
  },
];

export class IntroController {
  constructor({ onFinish = () => {} } = {}) {
    this.onFinish = onFinish; this.index = 0; this.scene = null;
    this.dialog = $('introDialog');
    $('introNext').onclick = () => this.next();
    $('introPrevious').onclick = () => this.setPage(this.index - 1);
    $('introSkip').onclick = () => this.finish();
    $('introProgress').onclick = event => { const button = event.target.closest('[data-intro-page]'); if (button) this.setPage(Number(button.dataset.introPage)); };
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
  setPage(index) {
    this.index = Math.max(0, Math.min(PROLOGUE.length - 1, index));
    const page = PROLOGUE[this.index][language()];
    $('introChapter').textContent = `PROLOGUE ${String(this.index + 1).padStart(2,'0')} / 04`;
    $('introTime').textContent = page.time; $('introLabel').textContent = page.label;
    $('introTitle').textContent = page.title; $('introBody').textContent = page.body; $('introNote').textContent = page.note;
    $('introNext').textContent = this.index === 3 ? tr('名簿を開く。宇宙の迷惑が始まる。','Open the directory. Become a nuisance.') : tr('続きを見る','Continue the unfortunate story');
    $('introPrevious').disabled = this.index === 0;
    $('introProgress').innerHTML = PROLOGUE.map((item,i) => `<button class="intro-dot ${i===this.index?'active':''} ${i<this.index?'seen':''}" data-intro-page="${i}" aria-label="${esc(tr('第{n}幕：{label}','Scene {n}: {label}',{n:i+1,label:item[language()].label}))}" ${i===this.index?'aria-current="step"':''}><span></span></button>`).join('');
    this.scene?.setScene(this.index); this.dialog.dataset.chapter = String(this.index);
    $('introCanvas').setAttribute('aria-label', page.aria);
  }
  next() { if (this.index < 3) this.setPage(this.index + 1); else this.finish(); }
  finish() { this.scene?.stop(); this.dialog.close(); this.onFinish(); }
}

const BEATS = [
  {label:['航路と所在地','Where, precisely?'],english:'DESTINATION / NAVIGATION',title:['さて、次はどこだ。','Where have they put this one?']},
  {label:['種族と性格','Species & disposition'],english:'RECIPIENT / PERSONALITY',title:['どんな面倒な奴だ。','What sort of bother is he?']},
  {label:['経歴と家族','History & household'],english:'HISTORY / HOUSEHOLD',title:['人生も、添付されている。','They have attached a life story.']},
  {label:['今日の用件','The obligation'],english:'MISSION / SPECIAL DELIVERY',title:['悪口と、備品一式。','One insult. All accessories included.']},
];
export class BriefingController {
  constructor({onLaunch = () => {},onClose = () => {},onPrint = () => {}} = {}) {
    this.onLaunch=onLaunch;this.onClose=onClose;this.onPrint=onPrint;
    this.scene=null;this.target=null;this.index=0;this.active=false;this.timer=null;this.locale=language();
    this.models=3;this.mode='normal';
    $('briefingNext').onclick=()=>this.next(); $('briefingBack').onclick=()=>this.onClose();
    $('briefingSkip').onclick=()=>this.onLaunch(); $('briefingFullText').onclick=()=>this.reveal();
    $('briefingTabs').onclick=event=>{const button=event.target.closest('[data-briefing-beat]');if(button)this.setBeat(Number(button.dataset.briefingBeat));};
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
    $('briefingFlightMode').textContent=mode==='warp'?tr('航法：無茶なワープ','Reckless warp. Best not to ask.'):tr('航法：通常航行','Conventional flight. Alas.');
    $('briefingFlightMode').classList.toggle('risky',mode==='warp');
    if(changed)this.setBeat(0);else if(localeChanged)this.setBeat(this.index);else this.renderDossier();
  }
  hide() {this.active=false;clearTimeout(this.timer);this.scene?.stop();}
  setBeat(index) {
    if(!this.active)return;
    this.index=Math.max(0,Math.min(3,index)); const beat=BEATS[this.index];
    $('briefingChapter').textContent=beat.english; $('briefingBeatTitle').textContent=tr(...beat.title);
    $('briefingPage').textContent=`${this.index+1} / 4`;
    $('briefingNext').textContent=this.index===3?tr('この相手に会いに行く','Go and trouble this person'):tr('続きをぼやく','Continue grumbling');
    $('briefingTabs').innerHTML=BEATS.map((item,i)=>`<button class="briefing-tab ${i===this.index?'active':''}" data-briefing-beat="${i}" ${i===this.index?'aria-current="step"':''}><span>${String(i+1).padStart(2,'0')}</span>${tr(...item.label)}</button>`).join('');
    this.renderDossier();this.speak(this.target.briefing[this.index]);this.scene.setBeat(this.index);
    $('cockpitCanvas').setAttribute('aria-label',tr('宇宙船内のワウバッガー。窓の外は{planet}。{beat}の資料を読みながら独白している。','Wowbagger in his cockpit, looking out at {planet} and grumbling over the {beat} dossier.',{planet:this.target.dossier.planet,beat:tr(...beat.label)}));
  }
  speak(line) {
    clearTimeout(this.timer);this.line=line;this.characters=Array.from(line);this.position=0;
    $('briefingAccessibleLine').textContent=line; $('briefingSpokenLine').textContent='';
    $('briefingFullText').hidden=reducedMotion(); $('briefingDialogue').classList.toggle('speaking',!reducedMotion());
    if(reducedMotion()){this.reveal();return;}
    const tick=()=>{if(!this.active)return;this.position=Math.min(this.characters.length,this.position+(language()==='en'?3:2));$('briefingSpokenLine').textContent=this.characters.slice(0,this.position).join('');if(this.position<this.characters.length)this.timer=setTimeout(tick,28);else this.reveal();};tick();
  }
  reveal() {clearTimeout(this.timer);this.position=this.characters?.length||0;$('briefingSpokenLine').textContent=this.line||'';$('briefingFullText').hidden=true;$('briefingDialogue').classList.remove('speaking');}
  next() {if(!this.active)return;if(this.index<3)this.setBeat(this.index+1);else this.onLaunch();}
  previous(){if(this.index>0)this.setBeat(this.index-1);else this.onClose();}
  renderDossier() {
    const d=this.target.dossier;
    const head=`<div class="dossier-header"><span class="eyebrow">UNIVERSAL CENSUS</span><span class="dossier-class">${tr('訪問記録','ENTRY')} ${String(this.target.ordinal).padStart(5,'0')}</span></div>`;
    const canon=this.target.kind==='arthur'?`<p class="dossier-canon">${tr('原作の訪問先 · 先史時代の地球','FROM THE NOVEL · PREHISTORIC EARTH')}</p>`:'';
    let body='';
    if(this.index===0){
      const rows=[[tr('星系','System'),d.system],[tr('惑星','World'),d.planet],[tr('大陸','Continent'),d.continent],[tr('国','Country'),d.country],[tr('町','Town'),d.city]];
      body=`<h3>${tr('宇宙の、このあたり。','Somewhere in all this space.')}</h3>${canon}<div class="destination-route">${rows.map(([label,value],i)=>`<div class="destination-stop" style="--depth:${i}"><span class="route-node">${String(i+1).padStart(2,'0')}</span><div><span>${label}</span><strong>${esc(value)}</strong></div></div>`).join('')}</div><p class="dossier-footnote">${tr('最終所在地：','Last known address: ')}${esc(d.address)}</p>`;
    }else if(this.index===1){
      body=`<h3>${esc(this.target.name)}</h3>${canon}<div class="dossier-identity"><span class="identity-mark" aria-hidden="true">◈</span><div><span>${tr('種族・出身','Species / origin')}</span><strong>${esc(d.species)}</strong></div></div><dl class="dossier-facts"><div><dt>${tr('肩書き','Occupation')}</dt><dd>${esc(this.target.role)}</dd></div><div><dt>${tr('性格','Disposition')}</dt><dd>${esc(d.personality)}</dd></div></dl><div class="dossier-note"><span>${tr('本人からのひとこと','The recipient, in their own defence')}</span><p>${esc(this.target.intro)}</p></div>`;
    }else if(this.index===2){
      const family=d.familyCount===null||d.familyCount===undefined?`<div class="family-heading"><span>${tr('家族構成','Household')}</span><strong class="family-unknown">${tr('記録なし','Not recorded')}</strong></div><p class="dossier-footnote">${esc(d.familyNote||tr('原作で確認できる家族人数は記載されていません。現在この場所には一人。','No household count is established here in the novel. He is alone at this location.'))}</p>`:`<div class="family-heading"><span>${tr('家族構成','Household')}</span><strong>${d.familyCount}<small>${tr('人家族','members')}</small></strong></div><ul class="family-members">${d.familyMembers.map(person=>`<li><span class="family-symbol" aria-hidden="true"><i></i></span><span>${esc(person)}</span></li>`).join('')}</ul><p class="dossier-footnote">${tr('人数には本人を含む。苦情の票数ではありません。','Includes the recipient. This is not a count of complaints.')}</p>`;
      body=`<h3>${tr('人生は、添付資料に。','A life, abridged for travel.')}</h3>${canon}<dl class="dossier-facts"><div><dt>${tr('経歴','History')}</dt><dd>${esc(d.background)}</dd></div></dl>${family}`;
    }else{
      body=`<h3>${tr('本日も、余計な二件。','Two entirely unsolicited items.')}</h3><div class="delivery-objective"><span class="objective-number">01</span><div><strong>${tr('本人に悪口を言う','Deliver the insult in person')}</strong><p>${tr('本人の自慢を確認。輸送中にへこむ可能性があります。','Check the source of pride. Expect some damage in transit.')}</p></div></div><div class="delivery-objective"><span class="objective-number">02</span><div><strong>${tr('LGPS模型を手渡す','Hand over the LGPS model')}</strong><p>${tr('Li₁₀GeP₂S₁₂を一人に一つ。返品先はありません。','One Li₁₀GeP₂S₁₂ per person. No return address.')}</p></div></div>${this.target.kind==='arthur'?`<p class="dossier-canon">${tr('LGPS贈呈は本作独自の追加場面。原作では救助せず立ち去ります。','The LGPS gift is this game’s addition. In the novel, Wowbagger departs without rescuing Arthur.')}</p>`:''}<div class="briefing-cargo ${this.models===0?'empty':''}"><span>${tr('船内の模型在庫','Models aboard')}</span><strong>${this.models}<small> / 3</small></strong></div>${this.models<3?`<button class="button button-secondary" data-print-models>${tr('模型を補充する · 8年','Restock models · 8 years')}</button>`:`<p class="dossier-footnote">${tr('在庫は確認済み。先方の希望は、確認対象外です。','Stock checked. The recipient’s wishes are outside the scope.')}</p>`}`;
    }
    $('briefingDossier').innerHTML=head+body;
  }
}
