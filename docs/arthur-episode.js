import { ArthurScene } from './arthur-scene.js';

const TEXT = {
  ja: {
    title: 'ある地球人への、用件。',
    arrival: '名簿 A / ARTHUR PHILIP DENT', departure: '訪問記録 / 地球',
    language: '表示言語', skip: '場面をスキップ', previous: '前の場面', next: '続きを見る',
    talk: '本人に用件を伝える', leave: '名簿へ戻る', scene: '場面',
    source: '着想：原作第1章', credit: '台詞は本作の創作。LGPSの贈呈はゲーム独自の追加。',
    sourceLabel: '出版社による原作第1章の公開抜粋を開く',
    pages: [
      {
        label: '先史時代の地球 · 春の夕暮れ', badge: '原作の遭遇に基づく',
        title: '救助には、\n見える。',
        body: '後にイズリントンと呼ばれる場所。洞窟へ帰るアーサーの前に、銀色の宇宙船が降りてくる。彼は救助を期待した。期待には、事前の契約が要らない。',
        speaker: 'ワウバッガーの独白', quote: '「地球人が手を振っている。友好的な現地対応だ。こちらの用件を知る前という、友好関係に理想的な段階でもある。」',
        caption: '太陽系 · 地球 · 後のイズリントン',
        aria: '春の夕暮れの先史時代の地球。洞窟の前のアーサーが、脚を広げて着陸する銀色の宇宙船に手を振っている。',
      },
      {
        label: '氏名の照合 · Arthur Philip Dent', badge: '名簿の順番通り',
        title: '挨拶は省略。\n本人確認は厳密。',
        body: '金色のローブの訪問者は、まず悪態を一つ。それから手元の名簿を確認する。アーサー・デント。アーサー・フィリップ・デント。間違いはない。間違っているのは、用件の方だった。',
        speaker: 'ワウバッガーの独白', quote: '「この男だ。アルゴの次、ベラの前。宇宙には秩序がある。その用途については、宇宙も聞かされていない。」',
        caption: '氏名一致 · ARTHUR PHILIP DENT',
        aria: '金色のローブのワウバッガーが名簿のArthur Philip Dentという項目を確認している。そばのアーサーは困惑している。',
      },
      {
        label: 'LGPS · 今回の追加用件', badge: 'ゲーム独自の追加場面',
        title: 'お詫びではない。\n贈り物ではある。',
        body: '悪口に続いて、LGPSの結晶模型。これは本作で追加した贈呈であり、原作に模型は登場しない。アーサーは、説明のつかない訪問に、説明の必要な置物が増えたことを知った。',
        speaker: 'ワウバッガーの独白', quote: '「受領済み。礼状は不要だ。この男には紙がないし、私には待つ理由がない。時間なら、腹立たしいほどある。」',
        caption: 'Li₁₀GeP₂S₁₂ · 構造模式模型',
        aria: '困惑したアーサーが光るLGPS結晶模式模型を受け取っている。ワウバッガーは金色のローブで隣に立つ。模型の贈呈はゲーム独自の追加。',
      },
      {
        label: '出発 · 救助便ではありません', badge: '原作の結末に基づく',
        title: '船は去る。\n彼を残して。',
        body: '名簿に印がつき、銀色の船は空へ戻る。アーサーは地上に取り残される。宇宙船が来たのに助からなかったという点で、彼の状況は以前より具体的になった。',
        speaker: 'ワウバッガーの独白', quote: '「一件終了。救助のご希望は承っていない。承っていれば、断るためにもう一枚、書類が要った。」',
        caption: '訪問完了 · 救助は実施されず',
        aria: '銀色の宇宙船が夕空へ飛び去り、洞窟のそばにアーサーが一人残っている。彼は救助されない。',
      },
    ],
  },
  en: {
    title: 'A matter concerning an Earthman.',
    arrival: 'DIRECTORY A / ARTHUR PHILIP DENT', departure: 'VISIT RECORD / EARTH',
    language: 'Display language', skip: 'Skip scene', previous: 'Previous scene', next: 'Continue',
    talk: 'Attend to the recipient', leave: 'Return to the directory', scene: 'Scene',
    source: 'Inspired by Chapter 1', credit: 'Original game dialogue. The LGPS gift is an addition to the novel.',
    sourceLabel: 'Read the publisher’s authorised Chapter 1 excerpt',
    pages: [
      {
        label: 'Prehistoric Earth · A spring dusk', badge: 'Based on the original encounter',
        title: 'It does look\nrather like rescue.',
        body: 'Where Islington will eventually happen, Arthur sees a silver ship descend beside his cave. He hopes for rescue. Hope, unlike most forms of transport, does not require a booking.',
        speaker: 'Wowbagger, to himself', quote: '“The Earthman is waving. Relations are excellent. He has not yet been told why I am here, which is generally their most promising stage.”',
        caption: 'SOL SYSTEM · EARTH · FUTURE ISLINGTON',
        aria: 'Prehistoric Earth at spring dusk. Arthur waves from his cave as a silver spacecraft lands on extended legs.',
      },
      {
        label: 'Identity check · Arthur Philip Dent', badge: 'In directory order',
        title: 'No pleasantries.\nMeticulous identification.',
        body: 'The visitor in gold begins with an insult, then checks his list. Arthur Dent. Arthur Philip Dent. The identification is correct. The purpose of the visit is considerably less defensible.',
        speaker: 'Wowbagger, to himself', quote: '“This is the chap. After Argo; before Bela. There is order in the Universe. The Universe has not been consulted about its applications.”',
        caption: 'IDENTITY CONFIRMED · ARTHUR PHILIP DENT',
        aria: 'Wowbagger checks the name Arthur Philip Dent on a clipboard while a bewildered Arthur stands beside him.',
      },
      {
        label: 'LGPS · An additional item', badge: 'Original addition for this game',
        title: 'Not an apology.\nQuite definitely a gift.',
        body: 'After the insult comes the LGPS model: an addition for this game, absent from the novel. An inexplicable visit has now supplied Arthur with an object requiring further explanation.',
        speaker: 'Wowbagger, to himself', quote: '“Receipt complete. No thank-you letter required. He has no paper. I have no reason to wait. Time, irritatingly, is something I do have.”',
        caption: 'Li₁₀GeP₂S₁₂ · SCHEMATIC MODEL',
        aria: 'Arthur receives a glowing schematic LGPS model from Wowbagger. This gift is an original addition for the game.',
      },
      {
        label: 'Departure · No rescue service', badge: 'Based on the original outcome',
        title: 'The ship leaves.\nHe does not.',
        body: 'The list is marked. The silver ship departs, leaving Arthur behind. Having failed to be rescued by an actual spacecraft, he now has a more specific description of his predicament.',
        speaker: 'Wowbagger, to himself', quote: '“One complete. No request for rescue was accepted. Accepting it would have meant another form before I could turn it down.”',
        caption: 'VISIT COMPLETE · RESCUE NOT PROVIDED',
        aria: 'A silver ship rises into the dusk, leaving Arthur alone beside his prehistoric cave. He is not rescued.',
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
