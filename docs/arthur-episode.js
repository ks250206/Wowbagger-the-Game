import { ArthurScene } from './arthur-scene.js';

const TEXT = {
  ja: {
    title: 'ある地球人への、実に迷惑な用件。',
    arrival: '名簿 A / ARTHUR PHILIP DENT', departure: '訪問記録 / 先史時代の地球',
    language: '表示言語', skip: 'スキップする', previous: '前の場面', next: '続きを見る',
    talk: '本人に悪口を言いに行く', leave: '名簿に戻る', scene: '場面',
    source: '着想：原作第1章', credit: '台詞は本作のオリジナル。LGPS模型の押し付けはゲーム独自の追加要素です。',
    sourceLabel: '出版社による原作第1章の公開抜粋を開く',
    pages: [
      {
        label: '先史時代の地球 · とある春の夕暮れ', badge: '原作のエピソードに基づく',
        title: 'どう見ても、\n助けに来た船に見える。',
        body: 'いずれロンドンのイズリントンになる予定の湿っぽい原っぱ。洞窟へ帰る途中のアーサーの前に、ぴかぴかの銀色の宇宙船が降りてきた。彼はボロボロのガウンの裾を翻して手を振った。ついに救助が来た！　熱いミルクティーにありつける！――英国人らしい、実に妥当で、実に気の毒な早とちりだった。',
        speaker: 'ワウバッガーの独り言', quote: '「おや、地球人が必死に手を振っている。じつに愛想がいいじゃないか。もっとも、私が何しに来たかを知る前が、たいてい人間関係のピークなのだがね。」',
        caption: '太陽系 · 地球 · 未来のイズリントン',
        aria: '春の夕暮れの先史時代の地球。洞窟の前のアーサーが、着陸する銀色の宇宙船に救助だと思って手を振っている。',
      },
      {
        label: '本人確認 · Arthur Philip Dent', badge: '名簿の順番どおり',
        title: '挨拶は抜き。\n本人確認だけは律儀。',
        body: 'タラップを降りてきた金色のローブの訪問者は、挨拶もそこそこに失礼な暴言を浴びせ、おもむろにクリップボードをのぞき込んだ。「アーサー・デント……いや、アーサー・フィリップ・デントだな？」――名前だけは役所の戸籍係なみに正確だった。間違っているのは、何光年も飛んできた動機だけだった。',
        speaker: 'ワウバッガーの独り言', quote: '「よし、本人で間違いない。アルゴの次、ベラの前だ。宇宙という場所は基本的にデタラメだが、せめて名簿の順番くらいは英国紳士らしくきっちり守っておきたい。」',
        caption: '本人確認完了 · ARTHUR PHILIP DENT',
        aria: '金色のローブを着たワウバッガーが名簿のArthur Philip Dentの欄を確認している。隣でアーサーが呆然としている。',
      },
      {
        label: 'LGPS · ゲーム独自の余計な手土産', badge: '本作オリジナルの追加場面',
        title: 'お詫びではない。\nだが、なぜか手土産はある。',
        body: '罵倒の余韻が消えないうちに、男は光るLGPS結晶模型をアーサーの腕に押し付けた（念のため言っておくと、原作にこんな模型は影も形もない）。こうしてアーサーは、見知らぬ宇宙人にクズ呼ばわりされた挙げ句、時代を200万年ほど先取りした謎の化学オブジェを抱えるハメになった。',
        speaker: 'ワウバッガーの独り言', quote: '「はい、受領完了。お礼状はいらないよ。どうせ君のところには紙も郵便ポストもないし、私には待つ義理もない。時間なら腐るほどあるんだがね。」',
        caption: 'Li₁₀GeP₂S₁₂ · 構造模式模型（返品不可）',
        aria: '困惑したアーサーが光るLGPS結晶模型を押し付けられている。隣に金色のローブのワウバッガーが立つ。',
      },
      {
        label: '出発 · 救助船ではありません', badge: '原作どおりの結末',
        title: '宇宙船は飛び去る。\nアーサーを残して。',
        body: '名簿にチェックマークを書き込むと、銀色の宇宙船はあっさり夕空へ飛び去っていった。洞窟の前にぽつんと取り残されるアーサー。ただ先史時代に置き去りにされるだけでも十分つらいのに、「わざわざ宇宙船が来て、悪口と謎の模型だけ置いて帰った」という最悪の思い出まで増えてしまった。',
        speaker: 'ワウバッガーの独り言', quote: '「よし、一件片付いた。救助の申し込み？　あいにく承っていないよ。受け付けたら受け付けたで、お断りする書類をもう三枚書かねばならんからね。」',
        caption: '配達完了 · なお救助は実施せず',
        aria: '銀色の宇宙船が夕空へ飛び去り、洞窟のそばにアーサーと謎の結晶模型だけが取り残されている。',
      },
    ],
  },
  en: {
    title: 'A deeply unhelpful visit to an Earthman.',
    arrival: 'DIRECTORY A / ARTHUR PHILIP DENT', departure: 'VISIT RECORD / PREHISTORIC EARTH',
    language: 'Display language', skip: 'Skip scene', previous: 'Previous scene', next: 'Continue',
    talk: 'Go and insult him properly', leave: 'Return to the directory', scene: 'Scene',
    source: 'Inspired by Chapter 1', credit: 'Original game dialogue. The LGPS gift is an inexplicable addition to the novel.',
    sourceLabel: 'Read the publisher’s authorised Chapter 1 excerpt',
    pages: [
      {
        label: 'Prehistoric Earth · A mild spring dusk', badge: 'Based on the original encounter',
        title: 'It really does look\nlike a rescue ship.',
        body: 'On the future site of Islington, a gleaming silver spacecraft settles beside Arthur’s cave. He waves enthusiastically. At last—rescue! A proper cup of tea! It is a perfectly sensible assumption, and therefore catastrophically wrong.',
        speaker: 'Wowbagger, muttering', quote: '“Look at him waving. Awfully friendly chap. Of course, people are always at their most charming in the brief interval before I tell them why I’ve dropped by.”',
        caption: 'SOL SYSTEM · EARTH · FUTURE ISLINGTON',
        aria: 'Prehistoric Earth at spring dusk. Arthur waves hopefully from his cave as a silver spacecraft lands nearby.',
      },
      {
        label: 'Identity check · Arthur Philip Dent', badge: 'Strict directory order',
        title: 'Skip the pleasantries.\nVerify the middle name.',
        body: 'The visitor in the golden robe opens with a brisk insult, then consults his clipboard. Arthur Dent. Arthur Philip Dent. The clerical work is spotless. Only the actual reason for crossing the galaxy leaves something to be desired.',
        speaker: 'Wowbagger, muttering', quote: '“Splendid, that’s our man. Right after Argo and neatly before Bela. The Universe may be a shambles, but I refuse to let standards slip on alphabetisation.”',
        caption: 'IDENTITY CONFIRMED · ARTHUR PHILIP DENT',
        aria: 'Wowbagger ticks off Arthur Philip Dent on a clipboard while a thoroughly bewildered Arthur stares at him.',
      },
      {
        label: 'LGPS · An uncalled-for souvenir', badge: 'Original addition for this game',
        title: 'Not an apology.\nJust a baffling gift.',
        body: 'Hard on the heels of the insult comes an LGPS crystal model—an addition unique to this game, and nowhere to be found in the novel. Having been abused by an alien in a dressing gown even flashier than his own, Arthur is now the proud owner of a solid-state electrolyte two million years ahead of its time.',
        speaker: 'Wowbagger, muttering', quote: '“There we are. No need for a thank-you note—you haven’t invented paper yet, and I’ve no desire to wait around. Though heaven knows I’ve got the time.”',
        caption: 'Li₁₀GeP₂S₁₂ · SCHEMATIC MODEL (NO RETURNS)',
        aria: 'A bemused Arthur holds a glowing LGPS crystal model handed over by Wowbagger.',
      },
      {
        label: 'Departure · Not a taxi service', badge: 'Based on the original outcome',
        title: 'The ship leaves.\nArthur stays put.',
        body: 'With a tidy tick on the list, the silver ship climbs back into the twilight, leaving Arthur right where it found him. Being marooned in prehistory was bad enough; being marooned with a bruised ego and a glowing chemistry ornament is simply taking the mickey.',
        speaker: 'Wowbagger, muttering', quote: '“Job done. Rescue? Terribly sorry, not my department. If I accepted the request, I’d only have to fill in three more forms to turn it down.”',
        caption: 'VISIT COMPLETE · RESCUE DECLINED',
        aria: 'The silver spacecraft ascends into the dusk, leaving Arthur alone beside his cave with the glowing crystal model.',
      },
    ],
  },
};

/** A self-contained, bilingual interlude. It never changes game state. */
export class ArthurEpisode {
  constructor({onLocaleChange = () => {}} = {}) {
    this.onLocaleChange=onLocaleChange;
    this.locale='ja';this.mode='arrival';this.index=0;this.active=false;this.resolve=null;this.scene=null;
    if(!document.querySelector('link[data-arthur-styles]')){
      const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('./arthur.css',import.meta.url).href;link.dataset.arthurStyles='';document.head.append(link);
    }
    this.dialog=document.createElement('dialog');this.dialog.id='arthurEpisodeDialog';this.dialog.className='arthur-episode';
    this.dialog.setAttribute('aria-labelledby','arthurEpisodeTitle');
    this.dialog.innerHTML=`<div class="arthur-shell"><header class="arthur-header"><div class="arthur-brand"><span aria-hidden="true">∞</span><div><strong>WOWBAGGER</strong><small data-arthur="section"></small></div></div><div class="arthur-header-actions"><div class="arthur-language" role="group"><button type="button" data-arthur-locale="ja" lang="ja">日本語</button><button type="button" data-arthur-locale="en" lang="en">English</button></div><button type="button" class="arthur-text-button" data-arthur-action="skip"></button></div></header><main class="arthur-stage"><figure class="arthur-illustration"><canvas data-arthur="canvas" role="img"></canvas><div class="arthur-shot-label"><span data-arthur="label"></span><span data-arthur="badge"></span></div><figcaption data-arthur="caption"></figcaption></figure><article class="arthur-copy" aria-live="polite" aria-atomic="true"><span class="arthur-eyebrow" data-arthur="counter"></span><h2 id="arthurEpisodeTitle"></h2><p data-arthur="body"></p><blockquote><span data-arthur="speaker"></span><p data-arthur="quote"></p></blockquote></article></main><footer class="arthur-controls"><button type="button" class="arthur-text-button" data-arthur-action="previous"></button><div class="arthur-progress" data-arthur="progress"></div><button type="button" class="arthur-primary-button" data-arthur-action="next"></button></footer><p class="arthur-credit"><a href="https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827" target="_blank" rel="noreferrer" data-arthur="source"></a><span data-arthur="credit"></span></p></div>`;
    document.body.append(this.dialog);
    this.el={};for(const element of this.dialog.querySelectorAll('[data-arthur]'))this.el[element.dataset.arthur]=element;
    this.title=this.dialog.querySelector('h2');
    this.nextButton=this.dialog.querySelector('[data-arthur-action="next"]');
    this.previousButton=this.dialog.querySelector('[data-arthur-action="previous"]');
    this.skipButton=this.dialog.querySelector('[data-arthur-action="skip"]');
    this.onClick=event=>{
      const language=event.target.closest('[data-arthur-locale]');
      if(language){this.setLocale(language.dataset.arthurLocale);this.onLocaleChange(this.locale);return;}
      const action=event.target.closest('[data-arthur-action]')?.dataset.arthurAction;
      if(action==='next')this.next();else if(action==='previous')this.previous();else if(action==='skip')this.close(true);
      const page=event.target.closest('[data-arthur-page]');if(page)this.setPage(Number(page.dataset.arthurPage));
    };
    this.onKey=event=>{
      if(event.altKey||event.ctrlKey||event.metaKey)return;
      if(event.key==='ArrowRight'){event.preventDefault();event.stopPropagation();this.next();}
      else if(event.key==='ArrowLeft'){event.preventDefault();event.stopPropagation();this.previous();}
      else if(event.key==='Enter'&&!event.target.closest('button,a')){event.preventDefault();event.stopPropagation();this.next();}
    };
    this.onCancel=event=>{event.preventDefault();this.close(true);};
    this.onClosed=()=>{if(!this.dialog.open)this.finish(this.skipped??true);};
    this.dialog.addEventListener('click',this.onClick);this.dialog.addEventListener('keydown',this.onKey);
    this.dialog.addEventListener('cancel',this.onCancel);this.dialog.addEventListener('close',this.onClosed);
  }
  open(mode='arrival',locale='ja'){
    if(this.active)this.close(true);
    this.mode=mode==='departure'?'departure':'arrival';this.locale=locale==='en'?'en':'ja';this.index=0;this.active=true;this.skipped=false;
    this.returnFocus=document.activeElement;
    const promise=new Promise(resolve=>{this.resolve=resolve;});
    this.dialog.showModal();
    this.scene ||= new ArthurScene(this.el.canvas);
    this.scene.start();this.render();this.nextButton.focus({preventScroll:true});
    return promise;
  }
  setLocale(locale){this.locale=locale==='en'?'en':'ja';if(this.active)this.render();}
  setPage(index){if(!this.active)return;this.index=Math.max(0,Math.min(1,index));this.render();}
  next(){if(!this.active)return;if(this.index===0)this.setPage(1);else this.close(false);}
  previous(){if(this.active&&this.index>0)this.setPage(this.index-1);}
  render(){
    const t=TEXT[this.locale],sceneIndex=this.index+(this.mode==='departure'?2:0),page=t.pages[sceneIndex];
    this.dialog.lang=this.locale;this.dialog.dataset.scene=String(sceneIndex);
    this.el.section.textContent=t[this.mode];this.el.label.textContent=page.label;this.el.badge.textContent=page.badge;
    this.el.caption.textContent=page.caption;this.title.textContent=page.title;this.el.body.textContent=page.body;
    this.el.speaker.textContent=page.speaker;this.el.quote.textContent=page.quote;
    this.el.counter.textContent=`${t.scene} ${this.index+1} / 2`;
    this.el.source.textContent=t.source;this.el.source.setAttribute('aria-label',t.sourceLabel);this.el.credit.textContent=t.credit;
    this.skipButton.textContent=t.skip;this.previousButton.textContent=t.previous;this.previousButton.disabled=this.index===0;
    this.nextButton.textContent=this.index===0?t.next:(this.mode==='arrival'?t.talk:t.leave);
    this.el.progress.replaceChildren();
    for(let i=0;i<2;i++){const button=document.createElement('button');button.type='button';button.dataset.arthurPage=String(i);button.setAttribute('aria-label',`${t.scene} ${i+1}`);button.className=i===this.index?'active':'';if(i===this.index)button.setAttribute('aria-current','step');button.innerHTML='<span></span>';this.el.progress.append(button);}
    const languageGroup=this.dialog.querySelector('.arthur-language');languageGroup.setAttribute('aria-label',t.language);
    for(const button of languageGroup.querySelectorAll('button'))button.setAttribute('aria-pressed',String(button.dataset.arthurLocale===this.locale));
    this.el.canvas.setAttribute('aria-label',page.aria);this.scene?.setScene(sceneIndex,this.locale);
  }
  close(skipped=false){if(!this.active)return;this.skipped=Boolean(skipped);this.dialog.close();this.finish(this.skipped);}
  finish(skipped){
    if(!this.active)return;this.active=false;this.scene?.stop();const resolve=this.resolve;this.resolve=null;
    if(this.returnFocus?.isConnected)this.returnFocus.focus({preventScroll:true});
    resolve?.({mode:this.mode,skipped:Boolean(skipped)});
  }
  destroy(){this.close(true);this.scene?.destroy();this.dialog.removeEventListener('click',this.onClick);this.dialog.removeEventListener('keydown',this.onKey);this.dialog.removeEventListener('cancel',this.onCancel);this.dialog.removeEventListener('close',this.onClosed);this.dialog.remove();}
}
