# WOWBAGGER — 悪口と、結晶を。 / Insults and Crystals

**[ブラウザで遊ぶ / Play in your browser](https://ks250206.github.io/Wowbagger-the-Game/)** · [Source](https://github.com/ks250206/Wowbagger-the-Game) · [CI / deployment](https://github.com/ks250206/Wowbagger-the-Game/actions/workflows/pages.yml)

不死身のワウバッガーになって、宇宙の住民にアルファベット順で悪口を届けるブラウザゲームです。今回の用件には、**LGPS（Li₁₀GeP₂S₁₂）の結晶模型を一人に一つ渡すこと**も追加されました。永遠という勤務時間に対して、福利厚生はとくにありません。

Become Wowbagger the Infinitely Prolonged: visit the Universe in alphabetical order, insult each resident personally, and hand over an unsolicited LGPS crystal model. An endless job, now with a second deliverable. Play on desktop or mobile; no installation is required.

## 日本語・English

画面の **「日本語」／「EN」**（物語画面では「English」）で切り替えられます。画面、人物資料、独白、選択肢、反応、航海記録、遊び方をその場で切り替え、**進行をリセットしません**。選んだ言語はブラウザに保存され、次回も引き継がれます。文章は両言語とも、宇宙規模の事務仕事と不条理を淡々と語る調子で書き直しています。

Use **日本語 / EN** or **English** to change language immediately, including during story scenes. The interface, dossiers, monologues, choices, reactions, voyage log and help are available in both languages. Switching preserves your current voyage, score, elapsed years, cargo and any model still awaiting handover. Your language preference is saved in this browser.

## 遊び方 / How to play

1. **船内で資料を読む / Read the briefing.** 次の住民の所在地、性格、経歴、家族の記録を確認して出発します。通常航行は確実に到着し、無茶なワープは事故で年月を失うことがあります。 Read the next recipient's dossier, then choose normal travel or a risky warp.
2. **悪口を選ぶ / Deliver an insult.** 相手を観察し、3つから一つを選びます。こだわりに合う悪口ほど高得点です。 Inspect the resident for a hint, then choose one of three insults.
3. **模型を渡す / Hand over the crystal.** 悪口と模型がそろって初めて配達完了です。在庫は3個まで。補充には8年かかります。 A delivery counts only after both insult and model; refill the three-model shelf when needed.
4. **次の名前へ / Continue down the list.** 6人で一区画を終え、次の区画へ進みます。 Complete six deliveries per sector, then continue. The Universe has declined to provide an end date.

事故で死んでも再生し、ゲームオーバーにはなりません。退屈が限界に達すると千年間の休眠を経て復帰します。模型切れでも、その場で補充して続行できます。効果音は右上の音符ボタンで切り替えられます。

You are immortal: accidents cost time, and excessive boredom costs a thousand-year nap. An empty shelf can be refilled without abandoning the recipient. Sound effects are optional; use the music-note button.

## 物語と船内独白 / Story and cockpit briefings

初回は、事故、不死身の退屈、全宇宙への悪口計画、模型の追加用件を描く**4場面のグラフィック付きイントロ**から始まります。スキップでき、**「?」→「グラフィック付きのあらすじを見る」**から再生できます。

A four-scene illustrated prologue introduces the accident, immortality, the alphabetical undertaking and the crystal assignment. Skip it to begin immediately, or replay it through **? → Replay the illustrated prologue**.

**13人分の人物資料と、それぞれ4章の船内独白**を用意しています。12人は本作の創作住民、1人は原作のアーサー・フィリップ・デントです。独白は字幕で表示し、章に合わせて操縦席の窓、住民の肖像、記録、模型のホログラムが切り替わります。

There are **13 authored dossiers, each with a four-part cockpit monologue**: twelve original residents and an adaptation of Arthur Philip Dent. Text appears as subtitles, with changing cockpit views and holograms. Use the chapter tabs, reveal the complete text, or skip ahead to departure.

| 章 / Chapter | 内容 / Contents |
| --- | --- |
| 航路と所在地 / Route and location | 恒星系、惑星、大陸、国、都市、住所 / System, planet, continent, country, city and address |
| 種族と性格 / Species and disposition | 種族、肩書き、性格、本人のひとこと / Species, occupation, personality and opening remark |
| 経歴と家族 / Background and family | 経歴と家族の記録。未確認情報は未確認と表示 / Background and family records; unknown details stay unknown |
| 今日の用件 / Today's assignment | 悪口、模型の贈呈、現在の在庫 / The insult, the gift and current cargo |

### 名簿の順序 / Directory order

本作は、**英語のフルネームを先頭から辞書順で比較**します。日本語表示でも同じ順序です。原作はアルファベット順という方針を示しますが、名・姓のどちらを優先するかは明示していないため、この比較規則は本作の実装上の選択です。[原作の公開抜粋](https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827)

The game sorts **complete English names lexicographically**, regardless of display language. This is an explicit game rule: the novel specifies alphabetical order without establishing a given-name or surname convention.

| 順番 / Order | 英語フルネーム / Full English name |
| --- | --- |
| 1 | Argo Hanko |
| 2 | Arthur Philip Dent |
| 3 | Bela Echo |
| 4 | Chroma Live |
| 5 | Col Unopened |
| 6 | Doctor Noise |
| 7 | Emper XVII |
| 8 | Finn Mish |
| 9 | Ludo Patch |
| 10 | Omni Deluxe |
| 11 | Posta Notice |
| 12 | Senet Assembly |
| 13 | Sulf Zero |

最初の並びは **Argo Hanko < Arthur Philip Dent < Bela Echo**。**Col Unopened は Chroma Live の直後**です。13人を6人ずつの区画に分けて巡回した後は、`Z` で始まる登録名を持つ創作住民へと名簿が続きます。アーサーは改訂名簿に一度だけ登場し、その後の生成対象には含めません。

The first thirteen entries follow the table across six-person sectors. Afterwards, fictional residents receive increasing `Z`-prefixed registered names, keeping the directory moving forward. **Arthur appears once in the revised route and is excluded from the endless generated population.**

### アーサーとの遭遇 / Arthur's encounter

先史時代の地球、後にイズリントンとなる場所。アーサーは銀色の宇宙船に救助を期待します。ワウバッガーはフルネームを確かめ、悪口を言い、彼を救助せずに去ります。この原作の出来事を専用の4場面で翻案しています。家族人数はこの遭遇の原作箇所から確認できないため、創作で補わず未確認としています。[出版社による第1章の抜粋](https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827)

On prehistoric Earth, at the future site of Islington, Arthur hopes the arriving ship means rescue. Wowbagger checks his full name, insults him and leaves him behind. The four-scene adaptation retains those events. Arthur's family count is left unknown because the cited encounter does not establish it.

**LGPS模型の贈呈は本作で追加したファンアレンジです。台詞と独白も本作のために書いた文章で、原文の再録ではありません。**

**The LGPS gift is an addition created for this fan game. Dialogue and monologues are newly written; the novel's prose is not reproduced.**

## 保存と旧版からの移行 / Saves and migration

進行はブラウザの `localStorage` に自動保存されます。別の端末・ブラウザ・公開先とは共有されません。同じブラウザでも、GitHub Pagesと別の配信URLでは別の記録になります。

旧版（v1）の保存を開いた場合は、**現在の区画を旧名簿のまま完了**できます。悪口を言った後の未贈呈の模型も引き継ぎ、その相手への配達を続けられます。区画を終えて次へ進むと、アーサーを含む改訂名簿が Argo から始まります。過去の配達数、得点、経過年数、模型在庫は保持します。言語を変えるために新しく始め直す必要はありません。

Progress is saved automatically in this browser's `localStorage`, separately for each hosted origin. It does not sync between devices, browsers or hosting URLs. A **v1 save finishes its current sector using the old directory**, including an insult whose model has not yet been handed over. The next sector starts the revised route at Argo, including Arthur, while retaining previous deliveries, score, elapsed years and model stock. Changing language never requires a reset.

## 操作 / Controls

スマートフォンでは、同じ機能を画面上のボタンで操作できます。On mobile, use the corresponding on-screen buttons.

| 操作 / Action | PCのキー / Key | 画面操作 / On-screen control |
| --- | --- | --- |
| 船内で次の住民を確認 / Open briefing | `J`（地図 / map） | 船内で確認 / Open briefing |
| 独白を飛ばして出発 / Skip briefing and depart | `J`（船内 / cockpit） | 出発ボタン / Departure button |
| イントロを進める・戻す / Prologue next / previous | `→` / `←` | 続き・前の場面 / Continue / Previous |
| 船内字幕を全文表示・次章へ / Reveal text / next chapter | `Enter` / `→` | 全文表示・続き / Reveal / Continue |
| 船内の前章へ / Previous briefing chapter | `←` | 章のタブ / Chapter tabs |
| 船内から地図へ / Return to map | `Esc` | 銀河地図に戻る / Return to map |
| 悪口を選ぶ / Choose an insult | `1` / `2` / `3` | 各選択肢 / Choice buttons |
| 模型を渡す・配達後に進む / Hand over model / continue | `Enter` | 贈呈・次へ / Gift / Continue |
| 模型を補充 / Print models | `R` | 模型在庫・補充 / Cargo / Refill |
| 遊び方を開く / Open help | `H` / `?` | 右上の `?` / Top-right `?` |
| 模型を回転 / Rotate model | ドラッグ / Drag | ドラッグ / Drag |
| 表示言語を切り替え / Change language | — | 日本語 / EN / English |

## ローカルで動かす / Run locally

ビルド不要のHTML・CSS・JavaScript製ゲームです。外部ライブラリや外部画像は読み込みません。Canvasで描画し、効果音にはWeb Audioを使用します。動きの軽減設定にも対応しています。

A dependency-free static HTML/CSS/JavaScript game. It uses Canvas for graphics and optional Web Audio effects, with reduced-motion support. No build or package installation is needed to play locally.

リポジトリのルートで実行 / From the project root:

```bash
python3 -m http.server 8000 --directory docs
```

**<http://localhost:8000/>** を開いてください。ES Modulesを使うため、ファイルを直接開く代わりにHTTPサーバーを経由します。

Open **<http://localhost:8000/>**. Serve the files over HTTP; opening `index.html` directly does not provide the module-loading environment the game expects.

### 検証 / Checks

Node.jsとnpmを利用できる環境で実行します。依存パッケージのインストールは不要です。Use Node.js and npm; no `npm install` is required.

```bash
npm run check
```

JavaScriptの構文、配達・在庫・得点・ワープ・休眠・保存の状態遷移、13人の名簿と並び、アーサーの一度だけの登場、旧版の移行、日本語・英語の文言、相対パスの参照を検証します。

Checks cover JavaScript syntax, delivery and inventory transitions, scores, warp and sleep recovery, save restoration, the thirteen-person sorted roster, Arthur's single appearance, v1 migration, Japanese/English text and relative asset references.

## ソース構成 / Source layout

`docs/` がゲームのソースとGitHub Pagesの公開対象を兼ねます。 The files in `docs/` are both the game source and the Pages deployment artifact.

| パス / Path | 役割 / Purpose |
| --- | --- |
| `docs/index.html` | 画面とダイアログ / Screens and dialogs |
| `docs/style.css`, `story.css`, `arthur.css` | 基本画面・物語・アーサーのレイアウト / Main, story and Arthur layouts |
| `docs/app.js` | 画面、入力、保存、言語切替、効果音 / UI, input, saves, language changes and audio |
| `docs/engine.js` | 配達、名簿、在庫、得点、航行、保存移行 / Pure game logic and save migration |
| `docs/profiles.js` | 13人分の日英人物資料・独白 / Bilingual dossiers and monologues for thirteen residents |
| `docs/i18n.js` | 日英UI文言と表示処理 / UI translations and localisation helpers |
| `docs/scene.js` | 銀河・宇宙船・住民の描画 / Galaxy, ship and resident graphics |
| `docs/crystal.js` | 25原子の回転する模式模型 / Rotatable 25-atom schematic model |
| `docs/intro-scene.js`, `cockpit-scene.js` | イントロと操縦席の描画 / Prologue and cockpit graphics |
| `docs/story-ui.js` | イントロ・人物資料・独白字幕 / Prologue, dossiers and briefing subtitles |
| `docs/arthur-episode.js`, `arthur-scene.js` | アーサーの4場面と描画 / Arthur's four-scene episode and graphics |
| `check-project.mjs` | 構文検証と各チェックの実行 / Syntax checks and test runner |
| `engine-check.mjs` | ゲーム状態・名簿・保存移行の検証 / Game state, roster and migration checks |
| `i18n-check.mjs` | 翻訳と配信ファイル参照の検証 / Translation and asset-reference checks |
| `package.json` | `npm run check` の定義 / Check command |
| `docs/.nojekyll` | 静的配信用のマーカー / Static-site marker |
| `.github/workflows/pages.yml` | 自動検証とPages公開 / CI and Pages deployment |

## CIとGitHub Pages / CI and GitHub Pages

公開URL / Public URL: **<https://ks250206.github.io/Wowbagger-the-Game/>**

GitHub版の既存ワークフロー [CI and deploy GitHub Pages](https://github.com/ks250206/Wowbagger-the-Game/actions/workflows/pages.yml) は、`main` へのpushで次の処理を行います。

1. Node.js 24で `npm run check` を実行。
2. 成功した場合に、GitHubリポジトリの `docs/` をPages用成果物としてアップロード。
3. 検証ジョブの成功後に、その成果物をGitHub Pagesへ公開。

The existing GitHub Actions workflow runs **checks → upload `docs/` → deploy Pages** for pushes to `main`. Deployment depends on successful validation. No game build, dependency installation or custom secrets are required, and Pages deployments are serialised.

**Settings → Pages → Build and deployment → Source** は **GitHub Actions** に設定します。必要な場合は、上記Actionsページの **Run workflow** から `main` を選んで手動実行できます。

Set the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. For a manual deployment, select **Run workflow** on the linked Actions page and choose `main`. CSS and JavaScript use relative references so the game works under `/Wowbagger-the-Game/`.

## LGPS模型について / About the crystal model

模型は **Li₁₀GeP₂S₁₂の組成式に対応する25原子（Li 10 + Ge 1 + P 2 + S 12）**と、GeS₄・PS₄の四面体配位を示す模式図です。ドラッグして回転できます。実際の単位格子、結晶座標、Ge/Pの混合占有を再現した結晶構造データではありません。

The rotatable model represents **25 atoms per formula unit: 10 Li + 1 Ge + 2 P + 12 S**, arranged to illustrate GeS₄ and PS₄ tetrahedra. It is a schematic, not a reconstruction of the real unit cell, atomic coordinates or mixed Ge/P occupancy.

LGPSの原著 / Original LGPS paper: N. Kamaya et al., [“A lithium superionic conductor,” *Nature Materials* **10**, 682–686 (2011)](https://www.nature.com/articles/nmat3066). DOI: [10.1038/nmat3066](https://doi.org/10.1038/nmat3066).

## 着想・クレジット / Inspiration and credits

Douglas Adams『宇宙クリケット大戦争』(*Life, the Universe and Everything*) の **Wowbagger the Infinitely Prolonged** に着想を得た非公式ファンゲームです。ワウバッガーとアーサーは原作の登場人物です。12人の創作住民、ゲームの台詞と独白、LGPS模型の贈呈、図版とプログラムは本作のために制作しています。公式作品や権利者との提携を示すものではありません。

An unofficial fan game inspired by Douglas Adams's *Life, the Universe and Everything*. Wowbagger and Arthur are characters from the original work. The twelve fictional residents, game dialogue, monologues, LGPS gift, artwork and code were created for this adaptation. This project is not affiliated with the original work's rights holders.

原作の紹介と公開抜粋 / Publisher's book page and excerpt: [Penguin Random House](https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827).

リポジトリのライセンス / Repository license: [MIT License](LICENSE), copyright 2026 ks250206. 原作の登場人物・作品に関する権利は、それぞれの権利者に帰属します。 Rights in the original characters and work remain with their respective rights holders.
