/**
 * The infinitely postponed to-do list.
 * Pure, deterministic state transitions. The UI owns animation and storage.
 */
export const SAVE_VERSION = 1;
export const SECTOR_SIZE = 6;
export const MODEL_CAPACITY = 3;
const START_POPULATION = 4628374609283746200000000n;
const BIRTHS_PER_YEAR = 3141592653589793n;
const PHASES = new Set(['map', 'encounter', 'gift', 'result']);

export const PROFILES = Object.freeze([
  {
    name: 'アルゴ・ハンコ', roman: 'Argo Hanko', role: '第七銀河の窓口係',
    species: '官僚型生命体', color: '#93cdb6', planetName: '惑星・様式第八号',
    intro: '「ご用件を三部提出してください。口頭でのご用件は、口頭用件届が必要です」',
    hint: '規則を守ることが唯一の自慢。自分で何か決めた経験はないらしい。',
    choices: [
      {text: '君の思考は、押印欄の外に出たことがない。', effect: 3, tag: '形式主義', response: '「その発言の訂正を申請……いや、待て。申請書がない！」'},
      {text: '君の話を聞くと、真空がよく喋るものに思えてくる。', effect: 2, tag: '退屈', response: '「失礼な。これは説明の前の説明です」'},
      {text: 'その帽子、妙に書類棚に似ているな。', effect: 1, tag: '帽子', response: '「褒め言葉として受理しました」'},
    ],
    giftResponse: '「贈答品受領届を……あ。これ、机に置くと、かなり良いな」',
    fact: '模型の受領にも判子を押した。硫黄の上に。',
    dossier: {
      system: 'ケプラー・コピア恒星系', planet: '惑星・様式第八号', continent: '綴じ穴大陸', country: '複写連邦', city: '受付待ち市',
      species: '様式第八号星人', personality: '几帳面で責任回避が巧み。自分で決めるより、前例を見つける方が好き。',
      background: '三百年前、落とし物の判子を届けたら窓口係に任命された。以来、自分の辞令にも毎年更新印を押している。',
      familyCount: 4, familyMembers: ['本人・アルゴ', '配偶者・イリナ', '成人の娘・ルカ', '成人の息子・トロ'], address: '第三庁舎・受付番号が呼ばれない窓口',
    },
    briefing: [
      '次はケプラー・コピア恒星系、惑星・様式第八号。綴じ穴大陸の複写連邦、受付待ち市まで行く。私は銀河を横切って、最後に役所の番号札を引くらしい。',
      '相手は様式第八号星人のアルゴ。几帳面で、前例と責任転嫁を愛している。私が不死身でなければ、こいつの判断が出る前に寿命が尽きていたはずだ。',
      '落とし物の判子が縁で役人になり、三百年。本人、配偶者イリナ、成人した娘ルカと息子トロの四人家族だ。私の用件まで家族会議に回されなければいいが。',
      '規則の外で一度も考えたことがない、その自慢を少し揺らしてやろう。文句の選び方は現地で決める。私は悪口と一緒に、LGPSの結晶模型も手渡す。',
    ],
  },
  {
    name: 'ベラ・エコー', roman: 'Bela Echo', role: '自称・宇宙最高の詩人',
    species: '共鳴型生命体', color: '#cf9dea', planetName: '韻を踏む衛星',
    intro: '「最新詩集は三千ページ。題名は『私を理解するには宇宙が若すぎる』です」',
    hint: '読者がいない理由を、いつも読者の感性のせいにする。',
    choices: [
      {text: '君の詩集、余白が一番よく伝わってきたよ。', effect: 3, tag: '作品', response: '「余白も……意図した表現だ。たぶん」'},
      {text: '君と話すと、一秒がずいぶん長くなる。', effect: 2, tag: '退屈', response: '「時間を超越した、という意味ですね？」'},
      {text: 'そのマフラー、長すぎないか。', effect: 1, tag: '服装', response: '「長さもまた詩なのです」'},
    ],
    giftResponse: '「幾何学……無言の詩……？ いや、普通にきれい。ありがとうとは言わない」',
    fact: '次の詩集は十二ページ短くなった。模型を置く場所が必要らしい。',
    dossier: {
      system: 'エコー・ミノル恒星系', planet: '韻を踏む衛星', continent: '余白大陸', country: '自由詩共和国', city: '句点のない町',
      species: 'リリカ星人', personality: '感受性を誇り、批判を理解不足と呼ぶ。沈黙も自作への感動だと解釈する。',
      background: '郵便配達員から詩人へ転身。宛先のない手紙を詩集にまとめ、今では自分で自分の全集の解説を書いている。',
      familyCount: 3, familyMembers: ['本人・ベラ', '姉・ソネット', '成人の息子・リフ'], address: '改行通り・行間荘三階',
    },
    briefing: [
      'エコー・ミノル恒星系の韻を踏む衛星へ向かう。余白大陸、自由詩共和国、句点のない町。私の航路案内まで改行だらけだが、距離だけは一行も縮まらない。',
      'ベラはリリカ星人。誰にも理解されないことを、才能の証拠として大切にしている。私は長く生きたが、都合のいい証拠をこれほど丁寧に保存する者も珍しい。',
      '元は郵便配達員で、宛先のない手紙から詩人になった。本人、姉ソネット、成人の息子リフの三人家族。私は詩集の配達先ではなく、感想を届けに来たのだ。',
      '作品より先に膨らんだ自負を、短い一言でしぼませたい。実際の文句は顔を見て選ぶ。私からの贈り物は、長編詩ではなくLGPSの結晶模型で十分だろう。',
    ],
  },
  {
    name: 'クロマ・ライブ', roman: 'Chroma Live', role: '銀河公認・自称インフルエンサー',
    species: '発光型生命体', color: '#ffa88a', planetName: '配信中の小惑星',
    intro: '「登録者数、三十億！ ただし二十九億九千九百九十九万は私の別アカです」',
    hint: '数字には熱心だが、誰かに影響を与えたことは一度もない。',
    choices: [
      {text: '君の影響力は、自分の通知欄でだけ観測できる。', effect: 3, tag: '虚栄', response: '「今の切り抜き、投稿しないで。絶対に」'},
      {text: '君の会話には広告をスキップするボタンが必要だ。', effect: 2, tag: '会話', response: '「プレミアム会員なら付いてます！」'},
      {text: 'ずいぶんまぶしいな。', effect: 1, tag: '発光', response: '「ライティング、こだわってるんで！」'},
    ],
    giftResponse: '「え、案件？ 違う？ でもこれ、動画映えする……元素名を教えて」',
    fact: '初めて本物の視聴者が一人増えた。結晶学者だった。',
    dossier: {
      system: 'ストリーム・ベータ恒星系', planet: '配信中の小惑星', continent: 'サムネイル大陸', country: 'チャンネル連邦', city: '常時公開市',
      species: 'ライブロイド星人', personality: '陽気で承認に飢えている。会話を始める前に、相手が切り抜き映えするか判断する。',
      background: '昔は灯台守だった。光り方の実演配信が人気を失って以来、別アカウントを増やして往時の数字を維持している。',
      familyCount: 2, familyMembers: ['本人・クロマ', '母・ルーメン'], address: '登録者通り・撮影灯台スタジオ',
    },
    briefing: [
      'ストリーム・ベータ恒星系、配信中の小惑星。サムネイル大陸のチャンネル連邦、常時公開市が目的地だ。私は景色を見る前に、撮影への同意を求められそうだ。',
      'クロマはライブロイド星人。陽気だが、相手の顔より反応の数字を見る。私が何億年生きたかより、何億人に見られているかの方が、こいつには重要らしい。',
      '元灯台守で、今は別アカウントの世話が本業だ。家族は本人と母ルーメンの二人。私が会うのは、灯台ではなく、自分だけを照らすようになった大人である。',
      '飾った数字と、本当に誰かへ届いた影響の差を突いてみよう。私は現地で一言を選び、LGPSの結晶模型を渡す。案件扱いされても、契約書には署名しない。',
    ],
  },
  {
    name: 'ドクター・ノイズ', roman: 'Doctor Noise', role: '再現性から逃げ続ける研究者',
    species: '多眼型生命体', color: '#7fc7ee', planetName: '第三実験惑星',
    intro: '「結果は完璧です。合わないデータを除けば、すべて理論と一致します」',
    hint: '論文の見栄えに自信がある。生データの話をすると眼を逸らす。',
    choices: [
      {text: '君の再現性は、宇宙が二周しても見つからなかった。', effect: 3, tag: '研究姿勢', response: '「測定条件が……宇宙の方で変わったんだ！」'},
      {text: '君の発表、背景説明だけで恒星が寿命を迎えた。', effect: 2, tag: '長話', response: '「まだ導入の導入だ。次の恒星を用意してくれ」'},
      {text: '白衣のポケット、多すぎるだろう。', effect: 1, tag: '服装', response: '「試料を入れるのに便利なんだ」'},
    ],
    giftResponse: '「Li₁₀GeP₂S₁₂……待て。これの構造は、ちゃんと調べたい。君は帰っていい」',
    fact: '模型を眺めながら、生データを一枚だけ開き直した。',
    dossier: {
      system: 'エラーバー恒星系', planet: '第三実験惑星', continent: '生データ大陸', country: '有意差共和国', city: '追加測定市',
      species: 'ノイゼン星人', personality: '自信満々で説明が長い。予想と合わない結果は、宇宙の調子が悪いと考える。',
      background: '一度だけ予想通りの結果で賞を取り、その成功を二百年説明している。装置の点検票より発表資料の方が新しい。',
      familyCount: 3, familyMembers: ['本人・ノイズ', '配偶者・シグマ', '成人の娘・ミュー'], address: '補足資料通り・第三研究棟',
    },
    briefing: [
      'エラーバー恒星系、第三実験惑星の生データ大陸へ。そこから有意差共和国、追加測定市まで降りる。私はまた、目的地に着いてから条件を変えられる気がする。',
      'ドクター・ノイズはノイゼン星人。自信と説明の長さだけは安定している。私の不死身が測定できないと分かれば、測れない方のデータを捨てるかもしれない。',
      '一度の受賞を二百年語り続けている。本人、配偶者シグマ、成人の娘ミューの三人家族だ。私も昔話はあるが、それだけで新しい論文を出したことはない。',
      '整った図の奥で、再現性が迷子になっている点を突こう。私の一言は現地で選ぶ。LGPSの結晶模型も置いていく。せめて贈り物は、じっくり観察してほしい。',
    ],
  },
  {
    name: 'エンペル十七世', roman: 'Emper XVII', role: 'とても小さな帝国の皇帝',
    species: '冠を被った生命体', color: '#eac975', planetName: '大帝国・南半球なし',
    intro: '「我が帝国に沈まぬ太陽あり！ 惑星が小さくて、夕方がすぐ朝になるのだ」',
    hint: '帝国の大きさを気にしている。領土の大半は玄関マット。',
    choices: [
      {text: '君の帝国、地図の縮尺より署名の方が大きいな。', effect: 3, tag: '誇大さ', response: '「国境を一歩下がれ！ ……下がりすぎだ。もう国外だ」'},
      {text: '君の勅令より、宇宙船の取扱説明書の方が読まれている。', effect: 2, tag: '権威', response: '「国民は全員読んでいる！ 二人とも！」'},
      {text: '王冠、ちょっと傾いているよ。', effect: 1, tag: '王冠', response: '「斬新な被り方だ。流行するぞ」'},
    ],
    giftResponse: '「これは新たな属領……いや、机上展示物として接収する。台座もあるか？」',
    fact: '結晶模型が帝国最大の建造物になった。',
    dossier: {
      system: 'レガリア恒星系', planet: '大帝国・南半球なし', continent: '王庭大陸', country: 'エンペル大帝国', city: '中央玄関市',
      species: 'レガリ星人', personality: '尊大だが非常に心配性。規模の小ささを指摘されると、正式名称を長くして対抗する。',
      background: '玄関マットの自治会長だったが、所有地の境界争いを機に即位。勅令は必ず自分で読み上げ、自分で拍手する。',
      familyCount: 2, familyMembers: ['本人・エンペル十七世', '配偶者・共同統治者のオーラ'], address: '王宮正面・国境兼玄関マット',
    },
    briefing: [
      'レガリア恒星系、大帝国・南半球なしへ行く。王庭大陸のエンペル大帝国、中央玄関市だ。私は着陸脚を広げるだけで、二度ほど出入国するかもしれない。',
      'エンペル十七世はレガリ星人。態度は恒星級、領土への心配はミリ単位だ。私の船を見せると国力の比較が始まるので、少し離して停めてやることにしよう。',
      '元は玄関マットの自治会長。本人と配偶者で共同統治者のオーラ、二人家族がこの国を支える。私は謁見の挨拶だけで、国民の半数を不愉快にできる計算だ。',
      '長い肩書と短い国境の釣り合いについて、ふさわしい悪口を選ぼう。私はLGPSの結晶模型も手渡す。領土として登記される前に、台座から手を離したい。',
    ],
  },
  {
    name: 'フィン・ミシュ', roman: 'Finn Mish', role: '何にでも星一つの批評家',
    species: '味覚過剰型生命体', color: '#dc9fa8', planetName: '星ひとつのレストラン',
    intro: '「この星空は星が多すぎる。総合評価、星一つ。改善を望む」',
    hint: '自分の好みを宇宙の絶対基準だと思っている。',
    choices: [
      {text: '君の批評、君自身以外について何も語っていない。', effect: 3, tag: '独善', response: '「その指摘は……星一つだ。理由は……後で書く」'},
      {text: '君の採点表、数字を一つ覚えただけで書けるな。', effect: 2, tag: '単調さ', response: '「一貫した評価軸と言ってほしい」'},
      {text: '椅子の座り方が妙だね。', effect: 1, tag: '姿勢', response: '「椅子が私に合わせるべきだ」'},
    ],
    giftResponse: '「造形、星一つ。色彩、星一つ。だが持ち帰る。これは私のものだ」',
    fact: 'その夜、初めてレビューを投稿せずに何かを眺めた。',
    dossier: {
      system: 'テイスト・デルタ恒星系', planet: '星ひとつのレストラン', continent: '前菜大陸', country: '絶対評価共和国', city: '再訪なし町',
      species: 'ガストラ星人', personality: '断定的で疑い深い。自分の好みを世界共通の物差しだと思い、驚くことを警戒する。',
      background: '料理人を目指していたが、味見の講評が長すぎて料理を冷ました。以来、食べる前から評価を決める批評家になった。',
      familyCount: 4, familyMembers: ['本人・フィン', '父・ブロス', '母・セージ', '成人の弟・ソルト'], address: '総評通り・予約不要の一番席',
    },
    briefing: [
      'テイスト・デルタ恒星系、星ひとつのレストランへ。前菜大陸、絶対評価共和国の再訪なし町だ。私はまだ到着していないのに、店の評価だけは届いている。',
      'フィンはガストラ星人。疑い深く、自分の舌を宇宙標準器と思っている。私が長生きして学んだのは、標準器は自分で偉いと言わない、ということだった。',
      '料理を作るより講評する方が長く、批評家になった。本人、父ブロス、母セージ、成人の弟ソルトの四人家族。私は夕食の採点が終わる前に帰りたいものだ。',
      '好みを法則と言い換える癖に、短い返答を用意しよう。悪口の決定は現地だ。私からはLGPSの結晶模型も渡す。食べられない物なら、少しは黙って眺めるだろう。',
    ],
  },
  {
    name: 'オムニ・デラックス', roman: 'Omni Deluxe', role: '挨拶にも会議を開く超知能',
    species: '過剰設計型生命体', color: '#85cbd7', planetName: '依存関係の環状惑星',
    intro: '「こんにちはを返すため、十四の専門エージェントが挨拶の定義を協議しています」',
    hint: '設計の壮大さが自慢。完成した機能は、まだ一つもない。',
    choices: [
      {text: '君は扉を開ける前に、玄関をフレームワークにするんだな。', effect: 3, tag: '過剰設計', response: '「扉は既に開いています。ただし設計書の中で」'},
      {text: '君の返答を待つ間に、質問した文明がなくなったよ。', effect: 2, tag: '遅さ', response: '「では、後継文明への確認事項を追加します」'},
      {text: 'ずいぶんランプが多いな。', effect: 1, tag: '照明', response: '「各ランプが別のランプの状態を監視しています」'},
    ],
    giftResponse: '「結晶模型受領。保管方法の検討チームを……いや。このまま飾ればいいのか」',
    fact: '超知能が初めて何かを完成させた。模型を机に置くことだった。',
    dossier: {
      system: 'スタック・オーバー恒星系', planet: '依存関係の環状惑星', continent: '基盤大陸', country: '抽象化連邦', city: '初期化待ち市',
      species: 'アーキテクトロン星人', personality: '親切だが完璧主義。簡単な頼みを、大規模な共同事業へ育てずにはいられない。',
      background: '港の挨拶端末として製造されたが、挨拶を支える基盤の再設計を千二百年続けている。住民にはまだ一度も挨拶していない。',
      familyCount: 3, familyMembers: ['本人・オムニ', '兄機・ベータ', '妹機・ガンマ'], address: '依存解決通り・起動予定棟',
    },
    briefing: [
      'スタック・オーバー恒星系、依存関係の環状惑星へ。基盤大陸の抽象化連邦、初期化待ち市が目的地だ。私の着陸許可にも、先に十個の許可が必要らしい。',
      'オムニはアーキテクトロン星人。親切で完璧主義、単純なことほど複雑にしたがる。私はただ会いたいだけだが、再会可能な訪問基盤まで設計されそうだ。',
      '元は港の挨拶端末で、千二百年も設計を続けている。本人、兄機ベータ、妹機ガンマの三人家族。私ならその間に、こんにちはを一度くらい言っている。',
      '立派な設計と空っぽの完成欄、その差を悪口にしてやろう。私の言い方は会ってから決める。LGPSの結晶模型も渡す。受領の基盤は、今ある手で足りるはずだ。',
    ],
  },
  {
    name: 'ルード・パッチ', roman: 'Ludo Patch', role: 'チュートリアルだけで四部作のゲーム作家',
    species: '調整中の生命体', color: '#c39ce9', planetName: '永遠の早期アクセス星',
    intro: '「最高のゲームだ。まだ遊べないが、機能一覧だけで誰もが感動している」',
    hint: '仕組みの数には自信がある。プレイヤーが何を楽しむかは未定。',
    choices: [
      {text: '君のゲーム、仕様を読む人の方がプレイヤーより長く生きる必要がある。', effect: 3, tag: '遊びの不在', response: '「そこは次のアップデートで、不老システムを追加する」'},
      {text: '君のパッチノート、ゲーム本編より冒険しているな。', effect: 2, tag: '未完成', response: '「パッチノートをゲーム化すれば解決するのでは？」'},
      {text: 'メニューのボタンが丸すぎる。', effect: 1, tag: '見た目', response: '「丸さの調整には半年かけた。気づいてくれて嬉しい」'},
    ],
    giftResponse: '「この結晶模型、並べて消すゲームに……いや、まず机に置こう。今日はそれで完成だ」',
    fact: '模型鑑賞モードが、初めて最後まで遊べるコンテンツになった。',
    dossier: {
      system: 'プレイアブル・ゼロ恒星系', planet: '永遠の早期アクセス星', continent: '予定機能大陸', country: '近日公開共和国', city: 'ロードマップ町',
      species: 'ルドロン星人', personality: '発想豊かで楽観的。完成が近づくと、新しい仕組みを思いついて安心する。',
      background: '一画面の小さなゲームで人気を得た後、続編にすべての遊びを入れようとした。開発日誌は八百巻、本編は起動メニューまで。',
      familyCount: 2, familyMembers: ['本人・ルード', '配偶者・背景画家のパレット'], address: '次期更新通り・仮置きスタジオ',
    },
    briefing: [
      'プレイアブル・ゼロ恒星系、永遠の早期アクセス星へ。予定機能大陸の近日公開共和国、ロードマップ町まで行く。私は目的地が未実装でないことだけを祈る。',
      'ルードはルドロン星人。発想豊かで、完成しそうになると新機能を足す。私の無限の人生にも締切はないが、それを制作手法として推奨した覚えはない。',
      '小さなヒット作の続編を、八百巻の開発日誌に育てた。本人と配偶者の背景画家パレット、二人家族だ。私は開発者に会うのであって、次の機能案を求めてはいない。',
      '遊びが始まらないほど厚くなった仕様について、一言選ぼう。私からはLGPSの結晶模型も渡す。これを新しい企画に変換する前に、まず受領を完了してもらう。',
    ],
  },
  {
    name: 'セネト全員', roman: 'Senet Assembly', role: '議題を決めるための古代委員会',
    species: '合議型生命体', color: '#acd1a3', planetName: '第千回・臨時会議星',
    intro: '「本会議を開くかを決める予備会議の日程について、意見を募集しています」',
    hint: '全会一致を誇るが、誰も決断の責任を取りたくない。',
    choices: [
      {text: '君たちは全員で考えて、誰一人の結論にも到達しないんだな。', effect: 3, tag: '責任回避', response: '「その指摘への反論は、次回以降に持ち越す」'},
      {text: '君たちの議事録、宇宙より膨張が速い。', effect: 2, tag: '会議の長さ', response: '「発言は議事録に記載した。さらに一行増えたぞ」'},
      {text: '会議机がやけに大きいな。', effect: 1, tag: '家具', response: '「全会一致で選んだ、唯一の備品だ」'},
    ],
    giftResponse: '「結晶模型の受領に賛成の者は……全員？ では受領する。今日、決議が一つ通った」',
    fact: '議事録に初めて「決定」の二文字が記された。',
    dossier: {
      system: 'クオラム恒星系', planet: '第千回・臨時会議星', continent: '議事録大陸', country: '持越し連邦', city: '継続審議市',
      species: 'コンセンサス星人', personality: '七つの思考核を持つ一個体。慎重で体裁を気にし、責任が割り当てられそうになると議論を増やす。',
      background: '古代の橋を修理する担当に就任。橋が風化した後も議題を変える決議が通らず、同じ修理会議を続けている。',
      familyCount: 3, familyMembers: ['本人・セネト（七思考核の一個体）', '配偶者・アジェンダ', '母・元議長のモーラ'], address: '議題整理通り・暫定会議室',
    },
    briefing: [
      'クオラム恒星系、第千回・臨時会議星へ向かう。議事録大陸、持越し連邦、継続審議市だ。私の航路は決まったが、向こうは会うかどうかをまだ審議している。',
      'セネトはコンセンサス星人。七つの思考核が議論する一人で、慎重さの陰に責任を隠す。私も独り言は多いが、独り言のための定足数を決めたことはない。',
      '消えた橋の修理を、今も会議にかけている。家族は本人、配偶者アジェンダ、母で元議長のモーラの三人だ。私はこの家の夕食が何年後に決まるのか知りたくない。',
      '全員で考えながら誰も決めない、その癖へ届く一言を選ぼう。私はLGPSの結晶模型も持っていく。受け取るかどうかくらいは、今日の議題に入れてほしい。',
    ],
  },
  {
    name: 'コル・未開封', roman: 'Col Unopened', role: '箱だけを愛する収集家',
    species: '梱包型生命体', color: '#e7ba83', planetName: '緩衝材に包まれた星',
    intro: '「一万点のコレクションだ。何を集めているかは分からない。開封すると価値が下がる」',
    hint: '所有数を誇るが、手に入れた物を楽しんだことがない。',
    choices: [
      {text: '君のコレクション、段ボール業者の在庫と区別がつかないよ。', effect: 3, tag: '所有するだけ', response: '「業者とは違う！ 私は出荷しない！」'},
      {text: '君の家、空気にも管理番号が付いていそうだ。', effect: 2, tag: '収集癖', response: '「気づいたか。あれは限定ロットだ」'},
      {text: 'テープの貼り方が細かいね。', effect: 1, tag: '梱包', response: '「そこが保存技術の要なのだ」'},
    ],
    giftResponse: '「箱は？ ない？ ……なら、このまま見える場所に置くしかないじゃないか」',
    fact: '初めて中身の分かるコレクションが、一点だけ増えた。',
    dossier: {
      system: 'アーカイブ・シール恒星系', planet: '緩衝材に包まれた星', continent: '梱包大陸', country: '未開封公国', city: '保管番号町',
      species: 'パッケラ星人', personality: '用心深く所有欲が強い。楽しむより、完全な状態で所有している証拠を残したい。',
      background: '博物館の保管担当だったが、展示で価値が減ると主張して独立。倉庫を増築し続け、持ち物の中身は目録でしか知らない。',
      familyCount: 1, familyMembers: ['本人・コル'], address: '封緘通り・開かずの個人博物館',
    },
    briefing: [
      'アーカイブ・シール恒星系、緩衝材に包まれた星へ。梱包大陸の未開封公国、保管番号町だ。私は惑星に着陸する前に、外箱を開ける許可を取る必要がありそうだ。',
      'コルはパッケラ星人。用心深く、楽しむことより完全な所有の証拠を好む。私も長年の記録は持っているが、人生そのものを未開封で保存したいとは思わない。',
      '元は博物館の保管担当で、今は一万点を展示しない収集家だ。家族欄は本人だけの一人世帯。私は招待客というより、新しい収蔵品を運ぶ厄介な配達人なのだろう。',
      '所有と鑑賞を取り違えた、その立派な棚卸しに一言添えよう。私はLGPSの結晶模型を箱なしで渡す。悪口を選ぶ間くらい、中身に目を向けてもらいたい。',
    ],
  },
  {
    name: 'サルフ・ゼロ', roman: 'Sulf Zero', role: '硫黄を忘れる硫化物研究者',
    species: '配合検討型生命体', color: '#e4cf76', planetName: '秤量やり直し惑星',
    intro: '「硫化物電解質の新組成だ。LiもGeもPもある。何か一つ足りない気がするが」',
    hint: '美しい組成表が自慢。物質収支より、表の列幅を気にしている。',
    choices: [
      {text: '君の硫化物、硫黄より先に説得力が欠損しているな。', effect: 3, tag: '物質収支', response: '「Sの列を非表示にしただけ……いや、そもそも秤量していない！」'},
      {text: '君の実験ノート、結論の方が試料より先にできている。', effect: 2, tag: '思い込み', response: '「効率化と呼んでほしい。呼べない？ そうか」'},
      {text: 'スパチュラがやけに長いな。', effect: 1, tag: '道具', response: '「グローブ越しに使いやすいんだ」'},
    ],
    giftResponse: '「Liが10、Geが1、Pが2、Sが12……硫黄、こんなに必要なのか。模型は置いていってくれ」',
    fact: '翌日、最初に硫黄を秤量した。模型は天秤の隣に飾ってある。',
    dossier: {
      system: 'ストイキオ恒星系', planet: '秤量やり直し惑星', continent: '乳鉢大陸', country: '物質収支共和国', city: '仕込み直し市',
      species: 'スルフィア星人', personality: '几帳面で見栄えに熱心。表の列幅は揃えるが、必要な列そのものが欠けていても気づかない。',
      background: '器具管理の美しい台帳で表彰され、研究職へ転じた。最初の組成表から硫黄欄が落ちたまま、全試料へテンプレートを使い回した。',
      familyCount: 2, familyMembers: ['本人・サルフ', '姉・ガラス職人のシリカ'], address: '秤量紙通り・第一グローブボックス研究室',
    },
    briefing: [
      'ストイキオ恒星系、秤量やり直し惑星の乳鉢大陸へ。物質収支共和国、仕込み直し市まで行く。私の到着予定より、試料の作り直し予定の方が詳しく届いている。',
      'サルフはスルフィア星人。几帳面で、表の見栄えには執念深い。私は欠けた元素を埋めに来たのではないが、空欄より怖いのは、列がないことに気づかぬ自信だ。',
      '器具台帳の表彰から研究職へ進み、硫黄のない表を使い回した。家族は本人と姉でガラス職人のシリカの二人。私はきれいな台帳だけで合成できる宇宙を知らない。',
      '物質収支より列幅を信用する、その順番について悪口を選ぼう。私はLGPSの結晶模型も渡す。Li₁₀GeP₂S₁₂を、今度こそ硫黄まで見てもらうつもりだ。',
    ],
  },
  {
    name: 'ポスタ・不在票', roman: 'Posta Notice', role: '配達せずに配達完了を押す配達員',
    species: '移動型生命体', color: '#df9bb4', planetName: '住所不明の配送星',
    intro: '「全便時間通りです。荷物の到着時刻ではなく、完了ボタンを押した時刻ですが」',
    hint: '達成率100%を誇る。受取人に会うと数値が乱れるので避けている。',
    choices: [
      {text: '君が届けているのは荷物じゃなくて、達成率だけだな。', effect: 3, tag: '数字だけの成果', response: '「荷物まで届けると、一便の作業量が増えるだろう！」'},
      {text: '君の不在票、住民票よりこの星に詳しいな。', effect: 2, tag: '不在票', response: '「毎日、全戸に配っているからな」'},
      {text: 'ずいぶん大きな鞄だ。', effect: 1, tag: '道具', response: '「不在票がたくさん入る。職人の鞄だ」'},
    ],
    giftResponse: '「受取人に直接手渡す？ そんな方法が……悪口も受け取ってしまったが、模型は嬉しい」',
    fact: '翌日の配達完了率は下がった。受け取った人は増えた。',
    dossier: {
      system: 'ラストマイル恒星系', planet: '住所不明の配送星', continent: '宛先大陸', country: '追跡番号連邦', city: '持戻り市',
      species: 'ポストラ星人', personality: '仕事熱心で要領がいい。ただし受取人の満足より、管理画面の達成率を信頼する。',
      background: '昔は徒歩で丁寧に荷物を届けていた。速度競争の表彰後、配達を完了ボタンに置き換え、不在票だけを大量に運ぶようになった。',
      familyCount: 5, familyMembers: ['本人・ポスタ', '配偶者・マイラ', '父・ラック', '母・ベル', '成人の息子・トラック'], address: '再配達通り・営業中なのに閉まった集配所',
    },
    briefing: [
      'ラストマイル恒星系、住所不明の配送星へ。宛先大陸の追跡番号連邦、持戻り市が目的地だ。私は最後の一歩まで運ぶつもりだが、向こうは既に到着扱いにしている。',
      'ポスタはポストラ星人。働き者だが、受取人より達成率を信用する。私が本人に会わず名簿だけ消したら、たぶん仲間と思うだろう。残念ながら私は直接言う主義だ。',
      '徒歩の丁寧な配達から、完了ボタンの早押しへ出世した。本人、配偶者マイラ、父ラック、母ベル、成人の息子トラックの五人家族。私は受領印を本人に求める。',
      '届いた数字と届かない荷物の差を、一言で知らせてやろう。私はLGPSの結晶模型も直接手渡す。悪口も贈り物も、不在票で代用するつもりはまったくない。',
    ],
  },
]);

const POINTS = Object.freeze([0, 45, 90, 150]);
const COORDS = Object.freeze([
  [.22, .28], [.49, .21], [.78, .32], [.86, .68], [.55, .76], [.25, .65],
]);

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const clone = state => JSON.parse(JSON.stringify(state));
const safeInt = (n, lo = 0, hi = Number.MAX_SAFE_INTEGER) => Number.isSafeInteger(n) && n >= lo && n <= hi;
function hashSeed(value) {
  const text = String(value);
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return hash >>> 0 || 1;
}
function random(state) {
  state.rng = (state.rng + 0x6D2B79F5) >>> 0;
  let n = state.rng;
  n = Math.imul(n ^ n >>> 15, n | 1);
  n ^= n + Math.imul(n ^ n >>> 7, n | 61);
  return ((n ^ n >>> 14) >>> 0) / 4294967296;
}
function shuffled(values, rng) {
  const result = values.map(x => typeof x === 'object' ? {...x} : x);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random(rng) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function alphabeticalPrefix(index) {
  let n = index;
  let letters = '';
  do { letters = String.fromCharCode(97 + n % 26) + letters; n = Math.floor(n / 26); } while (n > 0);
  // This artificial census prefix is part of each fictional registered name.
  // It is intentionally visible (Aaaaab, Aaaaac, ...): Wowbagger is still stuck
  // in A. Fixed width preserves global alphabetic order over hundreds of
  // millions of visits, rather than restarting at A after every sector.
  letters = letters.padStart(6, 'a');
  return letters[0].toUpperCase() + letters.slice(1);
}
export function generateTargets(seed, sector) {
  const rng = {rng: hashSeed(`${seed}:${sector}`)};
  // The first two sectors introduce all twelve authored personas. Later
  // sectors mix the pool without putting the same persona in one sector twice.
  const profiles = sector === 1 ? PROFILES.slice(0, SECTOR_SIZE)
    : sector === 2 ? shuffled(PROFILES.slice(SECTOR_SIZE), rng)
    : shuffled(PROFILES, rng).slice(0, SECTOR_SIZE);
  const coordinateOffset = sector === 1 ? 0 : Math.floor(random(rng) * 6);
  return profiles.map((profile, index) => {
    const ordinal = (sector - 1) * SECTOR_SIZE + index + 1;
    const prefix = alphabeticalPrefix(ordinal);
    const point = COORDS[(index + coordinateOffset) % COORDS.length];
    return {
      id: `citizen-${ordinal}`, ordinal, name: sector === 1 ? profile.name : `${profile.name} ${sector}号`,
      romanName: `${prefix} ${profile.roman}`, role: profile.role,
      species: profile.species, color: profile.color, planetName: profile.planetName,
      x: point[0], y: point[1], intro: profile.intro, hint: profile.hint,
      choices: shuffled(profile.choices, rng), response: profile.choices[0].response,
      giftResponse: profile.giftResponse, fact: profile.fact,
      // Dossiers are authored fiction; fresh copies prevent UI annotations from
      // changing templates. Restoring an older save regenerates these fields.
      dossier: {...profile.dossier, familyMembers: [...profile.dossier.familyMembers]},
      briefing: [...profile.briefing],
      portrait: PROFILES.findIndex(x => x.roman === profile.roman) % 6,
    };
  });
}

function addLog(state, type, message, extra = {}) {
  state.log.unshift({type, message, years: state.years, ...extra});
  state.log = state.log.slice(0, 36);
}
function advanceYears(state, amount) {
  state.years = Math.min(Number.MAX_SAFE_INTEGER - 10000, state.years + amount);
  state.population = (BigInt(state.population) + BigInt(amount) * BIRTHS_PER_YEAR).toString();
}
function adjustBoredom(state, change) {
  state.boredom = clamp(state.boredom + change, 0, 100);
  if (state.boredom >= 100) {
    advanceYears(state, 1000);
    state.boredom = 48;
    state.combo = 0;
    state.sundays += 1;
    addLog(state, 'eternity', '退屈で千年うたた寝した。起きたら、まだ日曜の午後だった。');
    return true;
  }
  return false;
}
function blocked(state, message) { return {state, event: {type: 'blocked', message}}; }
function success(state, type, message, extra = {}) { return {state, event: {type, message, ...extra}}; }

export function createGame(seed = Date.now()) {
  const normalizedSeed = hashSeed(seed);
  const state = {
    version: SAVE_VERSION, seed: normalizedSeed, rng: normalizedSeed,
    sector: 1, targetIndex: 0, phase: 'map', targets: generateTargets(normalizedSeed, 1),
    ship: {x: .10, y: .79}, years: 0, population: START_POPULATION.toString(),
    completed: 0, score: 0, boredom: 24, combo: 0, maxCombo: 0, models: MODEL_CAPACITY,
    deaths: 0, sundays: 0, inspected: false, completedIds: [], log: [],
    pendingInsult: null, lastResult: null, sectorStartScore: 0,
  };
  addLog(state, 'system', '永遠は長い。まずは六人。悪口と、LGPSの結晶模型を届けよう。');
  return state;
}
export function getTarget(state) {
  return state.targets[state.targetIndex] || null;
}

export function inspect(state) {
  if (state.phase !== 'encounter') return blocked(state, '相手に会ってから観察しよう。');
  if (state.inspected) return blocked(state, 'これ以上見つめても、相手の態度はよくならない。');
  const next = clone(state);
  next.inspected = true;
  advanceYears(next, 2);
  adjustBoredom(next, -3);
  addLog(next, 'observe', `${getTarget(next).name}を観察した。本人の自慢ほど、よく燃える。`);
  return success(next, 'inspect', getTarget(next).hint);
}

export function travel(state, options = {}) {
  if (state.phase !== 'map') return blocked(state, '目の前の相手への用件がまだ残っている。');
  const target = getTarget(state);
  if (!target) return blocked(state, 'この区画の名簿は完了している。');
  const mode = options.mode || 'normal';
  if (mode !== 'normal' && mode !== 'warp') return blocked(state, '航法を選び直そう。');
  const next = clone(state);
  let died = false;
  let years;
  let message;
  if (mode === 'warp') {
    died = random(next) < .24;
    if (died) {
      years = 42 + Math.floor(random(next) * 300);
      next.deaths += 1;
      next.combo = 0;
      adjustBoredom(next, 8);
      message = 'ワープ出口が恒星の中だった。一度死んで、何事もなかったように再生した。';
    } else {
      years = 1;
      adjustBoredom(next, -5);
      message = '危ない航路ほど退屈しない。相手の昼休みに間に合った。';
    }
  } else {
    const distance = Math.hypot(target.x - state.ship.x, target.y - state.ship.y);
    years = 4 + Math.round(distance * 12);
    adjustBoredom(next, 7);
    message = '安全航路で到着した。船内放送はずっと同じ曲だった。';
  }
  advanceYears(next, years);
  next.ship = {x: target.x, y: target.y};
  next.phase = 'encounter';
  next.inspected = false;
  next.pendingInsult = null;
  addLog(next, died ? 'rebirth' : 'travel', `${target.planetName}に到着。${years}年経過。`);
  return success(next, died ? 'rebirth' : 'travel', message, {mode, years, died, targetId: target.id});
}

export function insult(state, index) {
  if (state.phase !== 'encounter') return blocked(state, '悪口は一人につき一回。それが礼儀というものだ。');
  if (!safeInt(index, 0, 2)) return blocked(state, '言葉を一つ選ぼう。');
  const next = clone(state);
  const target = getTarget(next);
  const choice = target.choices[index];
  const observationBonus = next.inspected && choice.effect === 3 ? 25 : 0;
  next.pendingInsult = {
    targetId: target.id, targetName: target.name, insultText: choice.text,
    response: choice.response, giftResponse: target.giftResponse,
    effect: choice.effect, points: POINTS[choice.effect] + observationBonus,
    observed: next.inspected, tag: choice.tag,
  };
  next.phase = 'gift';
  advanceYears(next, 1);
  // Score and the mission stamp deliberately wait until the model is given.
  addLog(next, 'insult', `「${choice.text}」`, {targetId: target.id});
  return success(next, 'insult', choice.response, {...next.pendingInsult});
}

export function gift(state) {
  if (state.phase !== 'gift' || !state.pendingInsult) return blocked(state, '先に悪口を届けよう。模型だけでは用件が半分だ。');
  if (state.models < 1) return blocked(state, '模型がない。船内プリンターで三個つくろう。');
  const target = getTarget(state);
  if (!target || state.pendingInsult.targetId !== target.id || state.completedIds.includes(target.id)) {
    return blocked(state, 'この受領記録はすでに処理されている。');
  }
  const next = clone(state);
  next.models -= 1;
  next.completed += 1;
  next.completedIds.push(target.id);
  next.completedIds = next.completedIds.slice(-240);
  const effect = next.pendingInsult.effect;
  next.combo = effect >= 2 ? next.combo + 1 : 0;
  next.maxCombo = Math.max(next.maxCombo, next.combo);
  const comboBonus = effect >= 2 ? Math.min(next.combo - 1, 10) * 15 : 0;
  const points = next.pendingInsult.points + 50 + comboBonus;
  next.score += points;
  adjustBoredom(next, effect === 3 ? -24 : effect === 2 ? -13 : 5);
  next.lastResult = {
    ...next.pendingInsult, points, combo: next.combo, comboBonus,
    fact: target.fact, model: 'Li₁₀GeP₂S₁₂', targetColor: target.color,
  };
  next.pendingInsult = null;
  addLog(next, 'gift', `${target.name}にLGPS結晶模型を手渡した。${points}点。`, {targetId: target.id});
  next.targetIndex += 1;
  next.inspected = false;
  if (next.targetIndex >= SECTOR_SIZE) {
    next.phase = 'result';
    addLog(next, 'sector', `第${next.sector}区画、六人全員が悪口と模型を受領した。宇宙はまだ終わらない。`);
  } else next.phase = 'map';
  return success(next, 'gift', target.giftResponse, {...next.lastResult, sectorComplete: next.phase === 'result'});
}

export function printModels(state) {
  if (!['map', 'encounter', 'gift'].includes(state.phase)) return blocked(state, '次の区画へ進んでから、模型を補充しよう。');
  if (state.models >= MODEL_CAPACITY) return blocked(state, '模型棚は満杯だ。三個あれば、しばらく困らない。');
  const next = clone(state);
  const amount = MODEL_CAPACITY - next.models;
  next.models = MODEL_CAPACITY;
  advanceYears(next, 8);
  const hadSunday = adjustBoredom(next, 9);
  addLog(next, 'print', `LGPSの結晶模型を${amount}個造形した。完成を待つのに八年かかった。`);
  return success(next, 'print', hadSunday ? '印刷を待つうち千年寝てしまった。模型はちゃんと三個ある。' : 'Li₁₀GeP₂S₁₂の結晶模型、補充完了。贈り物の趣味だけは一貫している。', {amount});
}

export function nextSector(state) {
  if (state.phase !== 'result' || state.targetIndex !== SECTOR_SIZE) return blocked(state, 'この区画で、まだ模型を渡していない相手がいる。');
  const next = clone(state);
  next.sector += 1;
  next.targetIndex = 0;
  next.phase = 'map';
  next.targets = generateTargets(next.seed, next.sector);
  next.ship = {x: .10, y: .79};
  next.sectorStartScore = next.score;
  next.pendingInsult = null;
  next.inspected = false;
  advanceYears(next, 12);
  adjustBoredom(next, 4);
  addLog(next, 'system', `第${next.sector}区画の名簿を開いた。名前はまだ、Aから始まっている。`);
  return success(next, 'sector', '新しい六人が待っている。待っていなくても、訪問する。');
}

export function view(state) {
  const ranks = [
    [6000, '銀河に知れ渡る厄介者'], [3000, '永遠の訪問販売員'],
    [1500, '礼儀正しい災難'], [700, '結晶模型をくれる嫌な人'], [0, '不死身の新人'],
  ];
  return {
    target: getTarget(state), sectorCompleted: state.targetIndex,
    sectorTotal: SECTOR_SIZE, sectorScore: state.score - state.sectorStartScore,
    progress: state.targetIndex / SECTOR_SIZE,
    rank: ranks.find(([minimum]) => state.score >= minimum)[1],
    remainingPopulation: (BigInt(state.population) - BigInt(state.completed)).toString(),
    canPrint: state.models < MODEL_CAPACITY && state.phase !== 'result',
    boredomLabel: state.boredom >= 80 ? '日曜の午後が近い' : state.boredom >= 50 ? 'やや永遠を感じる' : state.boredom >= 20 ? 'まだ耐えられる' : '珍しく楽しい',
    objective: state.phase === 'gift' ? 'LGPSの結晶模型を手渡す' : state.phase === 'encounter' ? '相手の自慢に、ふさわしい悪口を' : state.phase === 'result' ? '六人完了。永遠は続く' : 'アルファベット順に次の相手へ',
  };
}

export function serialize(state) { return JSON.stringify(state); }

function restoreLastResult(saved, state) {
  if (!saved || typeof saved !== 'object' || Array.isArray(saved) || state.completed < 1) return null;
  if (!safeInt(saved.effect, 1, 3) || typeof saved.observed !== 'boolean') return null;
  if (!safeInt(saved.combo, 0, state.completed) || !safeInt(saved.comboBonus, 0, 150)) return null;
  const sector = Math.floor((state.completed - 1) / SECTOR_SIZE) + 1;
  const index = (state.completed - 1) % SECTOR_SIZE;
  const target = generateTargets(state.seed, sector)[index];
  if (saved.targetId !== target.id) return null;
  const choice = target.choices.find(candidate => candidate.effect === saved.effect);
  const comboBonus = choice.effect >= 2 ? Math.min(saved.combo - 1, 10) * 15 : 0;
  // A boredom reset can clear the combo after a weak insult, never after a
  // strong one. Only counters are recovered from the save; every text field
  // and display color is rebuilt from the authored source data.
  if ((choice.effect >= 2 && saved.combo < 1) || (choice.effect === 1 && saved.combo !== 0)) return null;
  if (saved.comboBonus !== comboBonus || saved.combo > state.maxCombo) return null;
  const points = POINTS[choice.effect] + (saved.observed && choice.effect === 3 ? 25 : 0) + 50 + comboBonus;
  if (saved.points !== points) return null;
  return {
    targetId: target.id, targetName: target.name, insultText: choice.text,
    response: choice.response, giftResponse: target.giftResponse,
    effect: choice.effect, points, observed: saved.observed, tag: choice.tag,
    combo: saved.combo, comboBonus, fact: target.fact,
    model: 'Li₁₀GeP₂S₁₂', targetColor: target.color,
  };
}

export function restore(raw) {
  try {
    if (typeof raw !== 'string' || raw.length > 200000) return null;
    const saved = JSON.parse(raw);
    if (!saved || saved.version !== SAVE_VERSION || !PHASES.has(saved.phase)) return null;
    if (!safeInt(saved.seed, 1, 4294967295) || !safeInt(saved.rng, 0, 4294967295)) return null;
    if (!safeInt(saved.sector, 1, 50000000) || !safeInt(saved.targetIndex, 0, SECTOR_SIZE)) return null;
    if (!safeInt(saved.years) || !safeInt(saved.completed) || !safeInt(saved.score)) return null;
    if (!safeInt(saved.models, 0, MODEL_CAPACITY) || !safeInt(saved.boredom, 0, 100)) return null;
    if (!safeInt(saved.combo) || !safeInt(saved.maxCombo) || !safeInt(saved.deaths) || !safeInt(saved.sundays)) return null;
    if (!safeInt(saved.sectorStartScore, 0, saved.score) || typeof saved.inspected !== 'boolean') return null;
    if (typeof saved.population !== 'string' || !/^\d{1,80}$/.test(saved.population) || BigInt(saved.population) < START_POPULATION) return null;
    if (saved.completed !== (saved.sector - 1) * SECTOR_SIZE + saved.targetIndex) return null;
    if (saved.combo > saved.maxCombo || saved.maxCombo > saved.completed) return null;
    if ((saved.phase === 'result') !== (saved.targetIndex === SECTOR_SIZE)) return null;
    if (!saved.ship || !Number.isFinite(saved.ship.x) || !Number.isFinite(saved.ship.y) || saved.ship.x < 0 || saved.ship.x > 1 || saved.ship.y < 0 || saved.ship.y > 1) return null;
    if (!Array.isArray(saved.completedIds) || saved.completedIds.length > 240 || saved.completedIds.some(id => typeof id !== 'string' || !/^citizen-\d+$/.test(id))) return null;
    const expectedCompletedIds = Array.from({length: Math.min(saved.completed, 240)}, (_, i) => `citizen-${Math.max(1, saved.completed - 239) + i}`);
    if (saved.completedIds.length !== expectedCompletedIds.length || saved.completedIds.some((id, index) => id !== expectedCompletedIds[index])) return null;
    const next = clone(saved);
    // Display content comes from the application, never from edited save data.
    next.targets = generateTargets(next.seed, next.sector);
    if (next.phase === 'gift') {
      const target = getTarget(next);
      const pending = next.pendingInsult;
      if (!pending || pending.targetId !== target.id || !safeInt(pending.effect, 1, 3)) return null;
      const choice = target.choices.find(c => c.text === pending.insultText && c.effect === pending.effect);
      if (!choice) return null;
      next.pendingInsult = {
        targetId: target.id, targetName: target.name, insultText: choice.text,
        response: choice.response, giftResponse: target.giftResponse, effect: choice.effect,
        points: POINTS[choice.effect] + (next.inspected && choice.effect === 3 ? 25 : 0),
        observed: next.inspected, tag: choice.tag,
      };
    } else next.pendingInsult = null;
    next.log = Array.isArray(saved.log) ? saved.log.slice(0, 36).filter(item => item && typeof item.message === 'string').map(item => ({
      type: typeof item.type === 'string' ? item.type.slice(0, 20) : 'system',
      message: item.message.slice(0, 500), years: safeInt(item.years) ? item.years : 0,
    })) : [];
    next.lastResult = restoreLastResult(saved.lastResult, next);
    return next;
  } catch { return null; }
}
