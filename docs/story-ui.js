import { IntroScene } from './intro-scene.js';
import { CockpitScene } from './cockpit-scene.js';

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PROLOGUE = [
  {label:'不運な事故',time:'ある日の、昼休み',title:'ある日、\n死ねなくなった。',body:'粒子加速器と一杯の昼酒と、いくつかの不運。ワウバッガーは、歳を取らず、死ぬこともできない体になった。',note:'あなたは、無限引き伸ばされワウバッガー。'},
  {label:'永遠の午後',time:'数百万年後の、日曜日',title:'全部、\n飽きてしまった。',body:'星が生まれ、帝国が消え、流行が何千回も巡った。それでも終わらない日曜の午後。必要なのは、永遠に終わらない用事だった。',note:'不死身にも、退屈する能力はある。'},
  {label:'壮大で迷惑な計画',time:'ようやく、やることが見つかった',title:'宇宙の全員に、\n悪口を言おう。',body:'アルファベット順に。一人ずつ、本人の目を見て。相手が何を誇っているか調べ、いちばん嫌がる一言を贈る。これなら、いくら時間があっても足りない。',note:'まずは名簿の、最初の6人から。'},
  {label:'本日の追加用件',time:'そして、なぜかLGPSも',title:'悪口だけでは、\n帰らない。',body:'どうせ全宇宙を訪ねるなら、LGPSの結晶模型も配ろう。相手が怒っていても、机の上にひとつ残る。悪口と模型を渡し終えるまで、一件は完了しない。',note:'相手を知る。悪口を選ぶ。Li₁₀GeP₂S₁₂を渡す。'},
];

export class IntroController {
  constructor({ onFinish = () => {} } = {}) {
    this.onFinish = onFinish; this.index = 0; this.scene = null;
    this.dialog = $('introDialog');
    $('introNext').onclick = () => this.next();
    $('introPrevious').onclick = () => this.setPage(this.index - 1);
    $('introSkip').onclick = () => this.finish();
    $('introProgress').onclick = event => {
      const button = event.target.closest('[data-intro-page]');
      if (button) this.setPage(Number(button.dataset.introPage));
    };
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
    this.scene.start(); this.setPage(0);
    $('introNext').focus({preventScroll:true});
  }
  setPage(index) {
    this.index = Math.max(0, Math.min(PROLOGUE.length - 1, index));
    const page = PROLOGUE[this.index];
    $('introChapter').textContent = `PROLOGUE ${String(this.index + 1).padStart(2,'0')} / 04`;
    $('introTime').textContent = page.time;
    $('introLabel').textContent = page.label;
    $('introTitle').textContent = page.title;
    $('introBody').textContent = page.body;
    $('introNote').textContent = page.note;
    $('introNext').textContent = this.index === 3 ? '名簿を開いて、旅を始める' : '続きを見る';
    $('introPrevious').disabled = this.index === 0;
    $('introProgress').innerHTML = PROLOGUE.map((item,i) => `<button class="intro-dot ${i===this.index?'active':''} ${i<this.index?'seen':''}" data-intro-page="${i}" aria-label="第${i+1}幕：${esc(item.label)}" ${i===this.index?'aria-current="step"':''}><span></span></button>`).join('');
    this.scene?.setScene(this.index);
    this.dialog.dataset.chapter = String(this.index);
    $('introCanvas').setAttribute('aria-label', [
      '粒子加速器の事故に巻き込まれ、永遠の命を得てしまうワウバッガー。',
      '黄金のローブを着たワウバッガーが座り込み、星と文明が過ぎ去るのを退屈そうに眺めている。',
      '宇宙の全住民の名簿を開き、悪口を言うための航路を計画するワウバッガー。',
      '訪問した相手に悪口を言い、光るLGPS結晶模型を差し出すワウバッガー。',
    ][this.index]);
  }
  next() { if (this.index < 3) this.setPage(this.index + 1); else this.finish(); }
  finish() { this.scene?.stop(); this.dialog.close(); this.onFinish(); }
}

const BEATS = [
  {label:'航路と所在地',english:'DESTINATION / NAVIGATION',title:'さて、次はどこだ。'},
  {label:'種族と性格',english:'RECIPIENT / PERSONALITY',title:'どんな奴なんだ。'},
  {label:'経歴と家族',english:'HISTORY / HOUSEHOLD',title:'ご丁寧な人生だ。'},
  {label:'今日の用件',english:'MISSION / SPECIAL DELIVERY',title:'忘れるな。模型もだ。'},
];
export class BriefingController {
  constructor({onLaunch = () => {},onClose = () => {},onPrint = () => {}} = {}) {
    this.onLaunch=onLaunch;this.onClose=onClose;this.onPrint=onPrint;
    this.scene=null;this.target=null;this.index=0;this.active=false;this.timer=null;this.revision=0;
    this.models=3;this.mode='normal';
    $('briefingNext').onclick=()=>this.next();
    $('briefingBack').onclick=()=>this.onClose();
    $('briefingSkip').onclick=()=>this.onLaunch();
    $('briefingFullText').onclick=()=>this.reveal();
    $('briefingTabs').onclick=event=>{
      const button=event.target.closest('[data-briefing-beat]');
      if(button)this.setBeat(Number(button.dataset.briefingBeat));
    };
    $('briefingDossier').onclick=event=>{if(event.target.closest('[data-print-models]'))this.onPrint();};
  }
  open(target,{mode='normal',models=3}={}) {
    const changed = !this.active || this.target?.id!==target.id;
    this.target=target;this.models=models;this.mode=mode;this.active=true;
    this.scene ||= new CockpitScene($('cockpitCanvas'), {reducedMotion:reducedMotion()});
    this.scene.setTarget(target);this.scene.start();
    $('briefingName').textContent=target.name;
    $('briefingRoman').textContent=target.romanName;
    $('briefingDestination').textContent=target.dossier.system;
    $('briefingFlightMode').textContent=mode==='warp'?'航法：無茶なワープ':'航法：通常航行';
    $('briefingFlightMode').classList.toggle('risky',mode==='warp');
    if(changed)this.setBeat(0);
    else this.renderDossier();
  }
  hide() {this.active=false;clearTimeout(this.timer);this.scene?.stop();}
  setBeat(index) {
    if(!this.active)return;
    this.index=Math.max(0,Math.min(3,index));
    const beat=BEATS[this.index];
    $('briefingChapter').textContent=beat.english;
    $('briefingBeatTitle').textContent=beat.title;
    $('briefingPage').textContent=`${this.index+1} / 4`;
    $('briefingNext').textContent=this.index===3?'この相手に会いに行く':'続きをぼやく';
    $('briefingTabs').innerHTML=BEATS.map((item,i)=>`<button class="briefing-tab ${i===this.index?'active':''}" data-briefing-beat="${i}" ${i===this.index?'aria-current="step"':''}><span>${String(i+1).padStart(2,'0')}</span>${item.label}</button>`).join('');
    this.renderDossier();this.speak(this.target.briefing[this.index]);this.scene.setBeat(this.index);
    $('cockpitCanvas').setAttribute('aria-label', `宇宙船内のワウバッガー。窓の外は${this.target.dossier.planet}。${beat.label}のホログラムを見ながら独白している。`);
  }
  speak(line) {
    clearTimeout(this.timer);this.line=line;this.characters=Array.from(line);this.position=0;
    $('briefingAccessibleLine').textContent=line;
    $('briefingSpokenLine').textContent='';
    $('briefingFullText').hidden=reducedMotion();
    $('briefingDialogue').classList.toggle('speaking',!reducedMotion());
    if(reducedMotion()){this.reveal();return;}
    const tick=()=>{
      if(!this.active)return;
      this.position=Math.min(this.characters.length,this.position+2);
      $('briefingSpokenLine').textContent=this.characters.slice(0,this.position).join('');
      if(this.position<this.characters.length)this.timer=setTimeout(tick,28);
      else this.reveal();
    };
    tick();
  }
  reveal() {
    clearTimeout(this.timer);this.position=this.characters?.length||0;
    $('briefingSpokenLine').textContent=this.line||'';
    $('briefingFullText').hidden=true;
    $('briefingDialogue').classList.remove('speaking');
  }
  next() {if(!this.active)return;if(this.index<3)this.setBeat(this.index+1);else this.onLaunch();}
  previous(){if(this.index>0)this.setBeat(this.index-1);else this.onClose();}
  renderDossier() {
    const d=this.target.dossier;
    const head=`<div class="dossier-header"><span class="eyebrow">UNIVERSAL CENSUS</span><span class="dossier-class">訪問記録 ${String(this.target.ordinal).padStart(5,'0')}</span></div>`;
    let body='';
    if(this.index===0){
      const rows=[['星系',d.system],['惑星',d.planet],['大陸',d.continent],['国',d.country],['町',d.city]];
      body=`<h3>宇宙の、ここにいる。</h3><div class="destination-route">${rows.map(([label,value],i)=>`<div class="destination-stop" style="--depth:${i}"><span class="route-node">${String(i+1).padStart(2,'0')}</span><div><span>${label}</span><strong>${esc(value)}</strong></div></div>`).join('')}</div><p class="dossier-footnote">最終所在地：${esc(d.address)}</p>`;
    }else if(this.index===1){
      body=`<h3>${esc(this.target.name)}</h3><div class="dossier-identity"><span class="identity-mark" aria-hidden="true">${String.fromCodePoint(0x25C8)}</span><div><span>種族・出身</span><strong>${esc(d.species)}</strong></div></div><dl class="dossier-facts"><div><dt>肩書き</dt><dd>${esc(this.target.role)}</dd></div><div><dt>性格</dt><dd>${esc(d.personality)}</dd></div></dl><div class="dossier-note"><span>本人からのひとこと</span><p>${esc(this.target.intro)}</p></div>`;
    }else if(this.index===2){
      body=`<h3>ひとつの人生の要約。</h3><dl class="dossier-facts"><div><dt>経歴</dt><dd>${esc(d.background)}</dd></div></dl><div class="family-heading"><span>家族構成</span><strong>${d.familyCount}<small>人家族</small></strong></div><ul class="family-members">${d.familyMembers.map((person,i)=>`<li><span class="family-symbol" aria-hidden="true"><i></i></span><span>${esc(person)}</span></li>`).join('')}</ul><p class="dossier-footnote">人数には訪問対象の本人も含む。</p>`;
    }else{
      body=`<h3>今日も、二つの用件。</h3><div class="delivery-objective"><span class="objective-number">01</span><div><strong>本人に悪口を言う</strong><p>話を聞き、こだわりを見抜いてから言葉を選ぶ。</p></div></div><div class="delivery-objective"><span class="objective-number">02</span><div><strong>LGPS模型を手渡す</strong><p>Li₁₀GeP₂S₁₂を一人に一つ。渡すまで配達は終わらない。</p></div></div><div class="briefing-cargo ${this.models===0?'empty':''}"><span>船内の模型在庫</span><strong>${this.models}<small> / 3</small></strong></div>${this.models<3?'<button class="button button-secondary" data-print-models>模型を補充する · 8年</button>':'<p class="dossier-footnote">在庫確認済み。先方の同意は確認していない。</p>'}`;
    }
    $('briefingDossier').innerHTML=head+body;
  }
}
