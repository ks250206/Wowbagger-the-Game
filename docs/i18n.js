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
  tagline: ['全宇宙へ、悪口と結晶模型をお届け。', 'Personalised insults, plus a crystal you never ordered.'],
  routeCaption: ['・誰も頼んでいない銀河巡回便', '— A galactic service nobody asked for'],
  sound: ['効果音', 'Sound effects'],
  help: ['遊び方と説明書を開く', 'Open instructions'],
  language: ['言語', 'Language'],
  voyageStatus: ['航海の状況', 'Voyage status'],
  elapsed: ['無駄にした年月', 'Time mislaid'],
  years: ['年', 'years'],
  delivered: ['不快にした人数', 'Citizens offended'],
  people: ['人', 'people'],
  boredom: ['退屈ゲージ', 'Sunday dread'],
  cargo: ['結晶模型の在庫', 'Models aboard'],
  refill: ['補充', 'Restock'],
  manifest: ['終わらない悪口名簿', 'The interminable directory'],
  quota: ['この宙域のノルマ', 'This sector’s quota'],
  conditions: ['配達ルール（厳守）', 'Terms of annoyance'],
  conditionsBody: ['英語のフルネーム順。<br>一人ずつ、面と向かって。<br><em>悪口を言い、LGPS模型を渡す。</em>', 'Full English names. Alphabetically.<br>Face to face, one by one.<br><em>Deliver an insult, then an LGPS model.</em>'],
  remaining: ['まだ怒らせていない住民', 'Still waiting to be offended'],
  populationNote: ['配達中もどんどん生まれています。実に非協力的です。', 'They keep reproducing faster than you can insult them. Most inconsiderate.'],
  directory: ['名簿', 'Directory'],
  immortal: ['不死身（辞退不可）', 'Regrettably immortal'],
  chart: ['銀河の航路図', 'Galactic route chart'],
  next: ['次の被害者', 'Next recipient'],
  done: ['配達済み', 'Dealt with'],
  navigation: ['航行方法', 'Navigation method'],
  normalMode: ['通常航行<span>安全確実。ただし退屈</span>', 'Conventional<span>Terribly safe. Dreadfully dull.</span>'],
  warpMode: ['無茶なワープ<span>速いが恒星に出ることも</span>', 'Reckless warp<span>Quick, barring the odd star.</span>'],
  openBriefing: ['操縦席で下調べ <kbd>J</kbd>', 'Check the dossier <kbd>J</kbd>'],
  briefing: ['宇宙船内の事前ブリーフィング', 'Spaceship briefing'],
  briefingTitle: ['さて、次の相手はどんな奴だ？', 'Right then. Who is next on the list?'],
  skipBriefing: ['グチを飛ばしてすぐ出発', 'Skip the grumbling and depart'],
  briefingChapters: ['事前資料の章', 'Briefing chapters'],
  shipInterior: ['SHIP INTERIOR / 航行待機中', 'SHIP INTERIOR / AWAITING DEPARTURE'],
  dossier: ['訪問先の人物資料', 'Recipient dossier'],
  monologue: ['ワウバッガーの独り言', 'Wowbagger, muttering to himself'],
  fullText: ['全文を一気読み', 'Show the whole rant'],
  backToMap: ['銀河地図に戻る', 'Back to the star chart'],
  encounter: ['住民との対面', 'Face-to-face encounter'],
  portrait: ['訪問先の住民の肖像', 'Portrait of the recipient'],
  insultHeading: ['相手の「自慢」を見抜いて、<br>ぴったりの悪口を浴びせよう。', 'Spot their pride and joy,<br>then ruin their afternoon.'],
  choiceNote: ['痛いところを突くほど高得点。終わったら結晶模型を押し付けます。', 'Hit the sore spot for top marks. The unsolicited crystal comes afterwards.'],
  model: ['結晶模型', 'Crystal model'],
  rotate: ['ドラッグで回転', 'Drag to rotate'],
  modelInfo: ['模型の正体 ⓘ', 'About this model ⓘ'],
  printModels: ['模型を3個つくる（8年待ち）', 'Print 3 models · allow 8 years'],
  result: ['宙域の配達レポート', 'Sector delivery report'],
  resultHeading: ['6人、きれいに不快にした。<br><em>残りは、あと無限大です。</em>', 'Six citizens thoroughly annoyed.<br><em>Only infinity left to go.</em>'],
  nextSector: ['次の宙域へ出発', 'On to the next sector'],
  readLog: ['航海日誌を読み返す', 'Inspect the ship’s log'],
  log: ['航海日誌', 'Ship’s log'],
  close: ['閉じる', 'Close'],
  helpHeading: ['あなたは死ねない。<br>退屈だけが、毎日あなたを殺しに来る。', 'You cannot die.<br>Boredom, however, keeps trying.'],
  helpPremise: ['くだらない事故で不死身になったあなたは、気が遠くなるほどの暇をつぶすため、<strong>宇宙の全住民に面と向かって悪口を言って回る</strong>ことにしました。英語のフルネーム順に一人ずつ。しかも今回は<strong>LGPS（固体電解質）の結晶模型</strong>まで一人に一個押し付けます。どうせ迷惑をかけるなら、気の利いた手土産くらい必要ですからね。', 'Rendered immortal by a deeply unimpressive industrial mishap, you have decided to kill eternity by <strong>insulting every living being in the Universe</strong>—personally, in full English alphabetical order. For reasons best left unexamined, each recipient also gets <strong>one LGPS crystal model</strong>. Even a cosmic nuisance ought to bring a small gift.'],
  replayIntro: ['イラスト付きのあらすじをもう一度見る', 'Replay the illustrated prologue'],
  howTo: ['<li><span>01</span><div><strong>次の相手を調べて出発する</strong><p>操縦席で住所・種族・性格・経歴・家族を確認。「通常航行」は安全ですが退屈が増え、「無茶なワープ」は速い代わりに、うっかり恒星の中に飛び込んで丸焦げ（再生に数十年）になることがあります。</p></div></li><li><span>02</span><div><strong>自慢のツボを突く悪口を選ぶ</strong><p>相手の話を聞き、3択から悪口を浴びせます。「観察する（2年消費）」を押すと弱点のヒントが出ます。見当違いの小言より、相手のプライドをえぐる一撃ほど高得点＆退屈スッキリ。</p></div></li><li><span>03</span><div><strong>LGPS模型を押し付けて完了</strong><p>悪口を言っただけでは配達完了になりません。仕上げに結晶模型を手渡しましょう。在庫が切れたら船内プリンターで3個補充（8年待ち）。誰も頼んでいませんが、仕事はきっちりやります。</p></div></li>', '<li><span>01</span><div><strong>Study the next victim and fly</strong><p>Review their address, species, temperament, past and household in the cockpit. Conventional flight is dreadfully safe (and boring). Reckless warp is brisk, though it occasionally parks you inside a star for a few decades.</p></div></li><li><span>02</span><div><strong>Find the sore spot and insult them</strong><p>Listen to their opening remark, then pick one of three insults. Spending two years observing reveals a hint. Piercing their favourite delusion scores highest and keeps the existential dread at bay.</p></div></li><li><span>03</span><div><strong>Hand over the crystal model</strong><p>An insult alone does not close the ticket. Present one LGPS crystal model to complete the visit. Out of stock? Print three more (eight years, express). Nobody asked for any of this, which makes punctuality essential.</p></div></li>'],
  helpNote: ['6人で1宙域クリア。名簿はその先も永遠に続きます。退屈ゲージが100%になると、あまりの虚無感に千年ほど昼寝をしてしまいますが、不死身なのでゲームオーバーにはなりません。宇宙にそんな親切な終了ボタンはないのです。', 'Six recipients complete a sector, after which an infinity of further sectors awaits. Letting dread reach 100% triggers a thousand-year Sunday nap, never a game over. The Universe does not offer that sort of mercy.'],
  sortNote: ['名簿は英語のフルネームを頭から辞書順で並べています（Argo Hanko → Arthur Philip Dent → Bela Echo）。原作では「アルファベット順」とだけ書かれていて名・姓のルールが明言されていないため、本作ではフルネーム順を採用しました。', 'The directory sorts full English names from left to right: Argo Hanko → Arthur Philip Dent → Bela Echo. Since the novel mandates alphabetical order without settling the first-name-versus-surname debate, this game adopts strict full-name order.'],
  keyboardHelp: ['<kbd>J</kbd> 下調べ／出発 <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> 悪口を選ぶ <kbd>Enter</kbd> 模型を渡す <kbd>R</kbd> 模型を補充', '<kbd>J</kbd> Briefing / fly <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> Insult <kbd>Enter</kbd> Hand over model <kbd>R</kbd> Restock'],
  beginWork: ['終わらない仕事に戻る', 'Return to the eternal chore'],
  credits: ['ダグラス・アダムス『宇宙クリケット大戦争』に着想を得た非公式ファンゲームです。アーサー・デントとの遭遇は第1章の展開に基づく翻案で、台詞・他の宇宙人たち・LGPS模型の押し付け・イラストはすべて本作のオリジナルです。', 'An unofficial fan game inspired by Douglas Adams’s Life, the Universe and Everything. Arthur’s encounter adapts the events of Chapter 1; all dialogue, other residents, artwork and the inexplicable LGPS gift are original to this game.'],
  source: ['原作・出版社の公開抜粋', 'Publisher’s authorised excerpt'],
  lgpsPaper: ['LGPSの原著論文（Nature Materials）', 'Original LGPS paper (Nature Materials)'],
  reset: ['この航海を最初からやり直す', 'Start this eternity over'],
  logTitle: ['誰得なほど長い航海日誌', 'An unnecessarily long ship’s log'],
  modelScience: ['LGPS（Li₁₀GeP₂S₁₂）は、GeS₄・PS₄四面体の骨格の中をリチウムイオンがすいすい通り抜ける、れっきとした実在の硫化物系固体電解質です。宇宙の迷惑行為に使うには、いささか立派すぎます。', 'LGPS (Li₁₀GeP₂S₁₂) is a real sulphide solid electrolyte whose framework of GeS₄ and PS₄ tetrahedra creates superhighways for lithium ions—altogether far too respectable a material for cosmic harassment.'],
  modelCaveat: ['この模型は Li 10個・Ge 1個・P 2個・S 12個の<strong>組成と配位をわかりやすく示した模式模型</strong>です。実際の単位格子や結晶座標、Ge/Pの混合占有までは再現していません。机に飾って眺めるには最高ですが、学会に回折データとして提出すると穏やかに門前払いされます。', 'This is a <strong>schematic model of composition and coordination</strong>: 10 Li, 1 Ge, 2 P and 12 S atoms. It does not reproduce crystallographic coordinates, the real unit cell, or mixed Ge/P occupancy. Splendid as a paperweight; inadvisable as peer-reviewed diffraction data.'],
  backToGift: ['模型を押し付ける仕事に戻る', 'Back to unsolicited gift delivery'],
  resetHeading: ['もう一度、永遠をやり直しますか？', 'Fancy starting eternity from scratch?'],
  resetBody: ['このブラウザに保存された配達記録とスコアを消し、名簿の1人目（アルゴ・ハンコ）からやり直します。言語と効果音の設定は残ります。残念ながら、あなたの不死身もそのまま残ります。', 'This wipes your deliveries and score in this browser and sends you back to entry number one. Language and sound settings stay intact. So, regrettably, does your immortality.'],
  keepVoyage: ['今の永遠を続ける', 'Keep this particular eternity'],
  confirmReset: ['最初からやり直す', 'Start again'],
  skipIntro: ['あらすじを飛ばす', 'Skip the prologue'],
  previousScene: ['前の場面', 'Previous scene'],
  introScenes: ['あらすじの場面', 'Prologue scenes'],
  introFooter: ['THE INFINITELY PROLONGED · 終わらない仕事にも、いちおう始まりだけはある。', 'THE INFINITELY PROLONGED · Even an endless job has the decency to start somewhere.'],
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
  document.title = tr('WOWBAGGER — 全宇宙へ、悪口と結晶模型をお届け。', 'WOWBAGGER — Insults & Unsolicited Crystals');
  document.querySelector('meta[name="description"]').content = tr('不死身のワウバッガーになって、アーサー・デントを含む全宇宙の住民に悪口とLGPS結晶模型を届ける、英国風SFコメディ配達ゲーム。', 'Play as Wowbagger the Infinitely Prolonged: insult every resident of the Universe—Arthur Dent included—and leave them an unsolicited LGPS crystal.');
  root.querySelectorAll('[data-language]').forEach(el => { el.setAttribute('aria-pressed', String(el.dataset.language === current)); });
}
