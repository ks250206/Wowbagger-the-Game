/** UI translations are authored in pairs; game state and save data stay separate. */
export const LANGUAGES = Object.freeze(['ja', 'en']);
let current = 'ja';
export const language = () => current;
export function setLanguage(value) { current = value === 'en' ? 'en' : 'ja'; }
export function tr(ja, en, values = {}) {
  return String(current === 'en' ? en : ja).replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}
export const formatNumber = value => new Intl.NumberFormat(current === 'en' ? 'en-GB' : 'ja-JP').format(value);

export const MESSAGES = Object.freeze({
  tagline: ['悪口と、結晶を。', 'Insults. With a complimentary crystal.'],
  routeCaption: ['銀河巡回便', 'A service nobody requested'],
  sound: ['効果音', 'Sound effects'],
  help: ['遊び方を開く', 'Open instructions'],
  language: ['言語', 'Language'],
  voyageStatus: ['航海の状況', 'Voyage status'],
  elapsed: ['経過時間', 'Time mislaid'],
  years: ['年', 'years'],
  delivered: ['配達完了', 'Deliveries'],
  people: ['人', 'people'],
  boredom: ['退屈', 'Ennui'],
  cargo: ['模型在庫', 'Models aboard'],
  refill: ['補充', 'Restock'],
  manifest: ['終わらない名簿', 'The interminable list'],
  quota: ['この宙域のノルマ', 'This sector’s obligations'],
  conditions: ['配達条件', 'Terms of annoyance'],
  conditionsBody: ['英語のフルネーム順。<br>一人ずつ、面と向かって。<br><em>悪口と、LGPS模型を。</em>', 'English full names. Alphabetically.<br>In person. One at a time.<br><em>An insult. An LGPS model.</em>'],
  remaining: ['残りの住民', 'Still to offend'],
  populationNote: ['配達中も増えています。大変協力的です。', 'They keep reproducing. Most inconsiderate.'],
  directory: ['名簿', 'Directory'],
  immortal: ['不死身です', 'Regrettably immortal'],
  chart: ['銀河の航路', 'Galactic route chart'],
  next: ['次の配達先', 'Next recipient'],
  done: ['配達済み', 'Delivered'],
  navigation: ['航行方法', 'Navigation method'],
  normalMode: ['通常航行<span>確実。ただし退屈</span>', 'Conventional<span>Reliable. Dreadfully so.</span>'],
  warpMode: ['無茶なワープ<span>時空にも都合がある</span>', 'Reckless warp<span>Space-time may object.</span>'],
  openBriefing: ['船内で確認 <kbd>J</kbd>', 'Captain’s briefing <kbd>J</kbd>'],
  briefing: ['宇宙船内のブリーフィング', 'Spaceship briefing'],
  briefingTitle: ['次の相手について。', 'A word about the next victim.'],
  skipBriefing: ['独白を飛ばして出発', 'Spare me the monologue. Depart.'],
  briefingChapters: ['ブリーフィングの章', 'Briefing chapters'],
  shipInterior: ['SHIP INTERIOR / 航行待機', 'SHIP INTERIOR / AWAITING DEPARTURE'],
  dossier: ['訪問先の記録', 'Recipient dossier'],
  monologue: ['ワウバッガーの独白', 'Wowbagger, to himself'],
  fullText: ['全文表示', 'Show the whole complaint'],
  backToMap: ['銀河地図に戻る', 'Back to the galactic chart'],
  encounter: ['住民との会話', 'Conversation with the resident'],
  portrait: ['訪問先の住民の肖像', 'Portrait of the recipient'],
  insultHeading: ['長旅の理由を、<br>先方の迷惑に変えよう。', 'Make a very long journey<br>someone else’s problem.'],
  choiceNote: ['相手の自慢にふさわしい一言を。贈り物は、そのあとで。', 'Find the pride. Apply the remark. The present comes afterwards.'],
  model: ['結晶模型', 'Crystal model'],
  rotate: ['ドラッグで回転', 'Drag to rotate'],
  modelInfo: ['構造模式模型 ⓘ', 'Schematic model ⓘ'],
  printModels: ['模型を3個つくる · 8年', 'Print 3 models · 8 years'],
  result: ['宙域の配達結果', 'Sector delivery report'],
  resultHeading: ['6人、片づいた。<br><em>永遠の方は、まだです。</em>', 'Six people dealt with.<br><em>Eternity remains outstanding.</em>'],
  nextSector: ['次の宙域へ', 'On to the next sector'],
  readLog: ['配達日誌を見る', 'Inspect the delivery log'],
  log: ['航海日誌', 'Ship’s log'],
  close: ['閉じる', 'Close'],
  helpHeading: ['あなたは死なない。<br>娯楽の方が、先に死ぬ。', 'You cannot die.<br>Your amusements can.'],
  helpPremise: ['永遠の空欄を埋めるため、宇宙の全住民に悪口を言うことにしました。英語のフルネーム順に、一人ずつ。そして今回は<strong>LGPSの結晶模型も一人に一つ。</strong>迷惑にも、付属品が必要です。', 'To fill a rather large gap in your diary, you have decided to insult every resident of the Universe. Personally, in English full-name order. Each also receives <strong>one LGPS crystal model.</strong> Even a nuisance should arrive with its accessories.'],
  replayIntro: ['グラフィック付きのあらすじを見る', 'Replay the illustrated prologue'],
  howTo: ['<li><span>01</span><div><strong>次の名前へ向かう</strong><p>操縦席で所在地・種族・性格・経歴・家族を確認。通常航行は確実。ワープは速いこともあります。</p></div></li><li><span>02</span><div><strong>相手の自慢を見つける</strong><p>話を聞き、3つの悪口から選択。観察には2年かかります。時間だけは、ご予算の心配がありません。</p></div></li><li><span>03</span><div><strong>模型を手渡す</strong><p>悪口だけでは完了しません。在庫切れならプリンターで補充。誰も頼んでいないのに、保証は万全です。</p></div></li>', '<li><span>01</span><div><strong>Visit the next name</strong><p>Read the destination, species, personality, history and household in the cockpit. Conventional flight arrives reliably. Warp occasionally arrives quickly.</p></div></li><li><span>02</span><div><strong>Locate the source of pride</strong><p>Listen, then choose one of three insults. Observation takes two years. Time, happily, is the one budget you cannot exceed.</p></div></li><li><span>03</span><div><strong>Hand over the model</strong><p>An insult alone does not complete delivery. Print more models when the shelf is empty. Nobody ordered this service. Its terms are nonetheless binding.</p></div></li>'],
  helpNote: ['6人で一区画。その先にも名簿は続きます。退屈が限界になると千年休眠しますが、ゲームオーバーにはなりません。宇宙には、その程度の親切もありません。', 'Six recipients complete a sector. More sectors follow. Excessive boredom produces a thousand-year nap, but never a game over. The Universe is not that considerate.'],
  sortNote: ['名簿は英語のフルネームで比較します。Argo Hanko → Arthur Philip Dent → Bela Echo。原作はアルファベット順を指定しますが、名・姓の優先は明示していないため、本作ではこの規則を採用しています。', 'The directory compares complete English names: Argo Hanko → Arthur Philip Dent → Bela Echo. The novel specifies alphabetical order without establishing a given-name or surname rule; this game explicitly uses full-name order.'],
  keyboardHelp: ['<kbd>J</kbd> 船内確認／出発 <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> 悪口 <kbd>Enter</kbd> 模型 <kbd>R</kbd> 補充', '<kbd>J</kbd> Briefing / depart <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> Insult <kbd>Enter</kbd> Gift <kbd>R</kbd> Restock'],
  beginWork: ['永遠の仕事を始める', 'Resume the eternal obligation'],
  credits: ['Douglas Adams『宇宙クリケット大戦争』に着想を得た非公式ファンゲーム。アーサーとの遭遇は第1章の出来事に基づく翻案です。台詞・他の住民・LGPS贈呈・図版は本作の創作。原文の再録ではありません。', 'An unofficial fan game inspired by Douglas Adams’s Life, the Universe and Everything. Arthur’s encounter adapts the events of Chapter 1. Dialogue, other residents, LGPS delivery and artwork are newly created for this game. The novel’s prose is not reproduced.'],
  source: ['原作・出版社の抜粋', 'Publisher’s authorised excerpt'],
  lgpsPaper: ['LGPSの原著論文', 'Original LGPS paper'],
  reset: ['この航海を最初からやり直す', 'Start this voyage again'],
  logTitle: ['とても長い航海日誌', 'An unnecessarily long ship’s log'],
  modelScience: ['LGPSは、GeS₄・PS₄四面体を含む骨格とLiの伝導経路を持つ硫化物系の固体電解質です。', 'LGPS is a sulphide solid electrolyte with a framework containing GeS₄ and PS₄ tetrahedra and pathways for lithium-ion conduction.'],
  modelCaveat: ['これはLi 10個・Ge 1個・P 2個・S 12個の<strong>組成と配位を示す模式模型</strong>です。実際の単位格子、結晶座標、Ge/P混合占有を再現していません。飾ることはできます。回折データとして提出することはできません。', 'This is a <strong>schematic of composition and coordination</strong>: 10 Li, 1 Ge, 2 P and 12 S atoms. It does not reproduce a unit cell, crystallographic coordinates or mixed Ge/P occupancy. Displaying it is encouraged. Submitting it as diffraction data is not.'],
  backToGift: ['模型を渡す仕事に戻る', 'Return to unsolicited gift delivery'],
  resetHeading: ['もう一度、永遠を始めますか？', 'Begin eternity again?'],
  resetBody: ['この端末の配達記録と得点を消し、改訂された名簿の最初から始めます。言語と効果音の設定は残ります。不死身も残ります。', 'This clears this browser’s deliveries and score and starts the revised directory from its first name. Your language and sound preferences remain. So, regrettably, does immortality.'],
  keepVoyage: ['今の航海を続ける', 'Keep this particular eternity'],
  confirmReset: ['最初から始める', 'Start again'],
  skipIntro: ['あらすじをスキップ', 'Skip the circumstances'],
  previousScene: ['前の場面', 'Previous scene'],
  introScenes: ['あらすじの場面', 'Prologue scenes'],
  introFooter: ['THE INFINITELY PROLONGED · 終わらない仕事には、始まりだけはある。', 'THE INFINITELY PROLONGED · An endless job does at least have a beginning.'],
});

export function message(key) {
  if (!Object.hasOwn(MESSAGES, key)) throw new Error(`Unknown translation: ${key}`);
  return MESSAGES[key][current === 'en' ? 1 : 0];
}
export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = message(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = message(el.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', message(el.dataset.i18nAria)); });
  root.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = message(el.dataset.i18nTitle); });
  document.documentElement.lang = current;
  document.title = tr('WOWBAGGER — 悪口と、結晶を。', 'WOWBAGGER — Insults & Crystals');
  document.querySelector('meta[name="description"]').content = tr('不死身のワウバッガーとして、原作のアーサー・デントも訪ねる、悪口とLGPS模型の銀河配達ゲーム。', 'An immortal, an alphabetical list and a wholly unsolicited crystal. A galactic insult-delivery game featuring Arthur Dent.');
  root.querySelectorAll('[data-language]').forEach(el => { el.setAttribute('aria-pressed', String(el.dataset.language === current)); });
}
