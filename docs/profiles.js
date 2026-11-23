/** Authored bilingual dossiers. Canonical geography is deliberately qualified. */
export const LEGACY_ORDER = ["argo", "bela", "chroma", "noise", "emper", "finn", "omni", "ludo", "senet", "col", "sulf", "posta"];
export const JA_PROFILES = [
  {
    "name": "アルゴ・ハンコ",
    "roman": "Argo Hanko",
    "role": "第七銀河・永遠に順番が来ない窓口係",
    "species": "印鑑依存型生命体",
    "color": "#93cdb6",
    "planetName": "惑星・様式第八号（控え）",
    "intro": "「お急ぎのところ恐縮ですが、申請書を三部、控えを二部、さらに『自分が実在する証明書』をご提出ください。実在しない方は向かいの『存在しない方専用窓口』へどうぞ」",
    "hint": "規則を1ミリも破らないのが自慢。ただし「自分で考えて判断する」という項目だけは、まだ規則集に載っていない。",
    "choices": [
      {
        "text": "君の脳みそはハンコの押印欄から一歩も外に出たことがないんだろう？　ずいぶん狭くて家賃の安い頭だな。",
        "effect": 3,
        "tag": "規則バカを直撃",
        "response": "「脳の外出には三週間前の届出が必要で……待ってください、今あなたの悪口をどの書式に分類すればいいんですか！？」"
      },
      {
        "text": "君の前置きを聞いているあいだに、隣にいた恒星が老衰で寿命を迎えたぞ。せめて要約という技術を発明してくれ。",
        "effect": 2,
        "tag": "長ったらしい手続き",
        "response": "「あれは説明ではなく、『これから説明を開始する旨をお知らせする事前説明』です。誤解なきよう」"
      },
      {
        "text": "その四角い帽子、市役所のスチール棚が昇進して人型になったみたいだな。",
        "effect": 1,
        "tag": "帽子の悪口",
        "response": "「お褒めいただき光栄です。『備品の品格向上に関する好意的意見』として三部コピーしておきます」"
      }
    ],
    "giftResponse": "「受領書が……いや待て、なんだこの妙にきれいな結晶は？　机に飾りたいぞ！　くそ、『飾りたい』なんて感情は規則集の第何条に該当するんだ！？」",
    "fact": "アルゴは震える手でLGPS模型の硫黄原子に受領印を押した。原子には不服申立ての権利がなかったので、そのまま机の真ん中に飾られた。",
    "dossier": {
      "system": "ケプラー・コピア恒星系",
      "planet": "惑星・様式第八号（控え）",
      "continent": "二つ穴パンチ大陸",
      "country": "カーボン複写連邦",
      "city": "整理券999番待ち市",
      "species": "様式第八号星人",
      "personality": "恐ろしいほど几帳面で、責任回避の達人。前例を神のように崇めているが、「そもそも最初に前例を作った軽率な奴」のことは心の底から軽蔑している。",
      "background": "300年前、道に落ちていた朱肉を役所に届けたところ「書類愛が深い」と誤解されて即採用。退職届にも本人の承認印が要る仕組みのせいで、いまだに辞められずに窓口に座っている。",
      "familyCount": 4,
      "familyMembers": [
        "本人・アルゴ（窓口の主）",
        "妻・イリナ（家庭内稟議の決裁権者）",
        "成人の娘・ルカ（家出届を却下され帰宅）",
        "成人の息子・トロ（反抗期の申請待ち）"
      ],
      "address": "第三庁舎・地下の壊れたトイレの奥（『猛豹に注意』の張り紙の先）"
    },
    "briefing": [
      "次の配達先はケプラー・コピア恒星系の「惑星・様式第八号（控え）」。二つ穴パンチ大陸の整理券999番待ち市だ。何光年もぶっ飛ばして到着したのに、最後の三メートルで整理券を引かされるらしい。まったく、文明というのはロクなことをしない。",
      "相手は様式第八号星人のアルゴ。規則を愛し、自分で判断することだけは他人に丸投げする生粋のお役人だ。だがついに、私の不死身にも立派な使い道が見つかったぞ。この男の決裁が下りるまで、老衰せずに待ってやれるのは宇宙で私だけだ。",
      "300年前に朱肉を拾って役人になり、家族は妻のイリナと成人の子どもたちを含めて4人。普通なら「4人家族」で済む話だが、こいつの場合は人数確認のために別世帯の監査委員会を立ち上げかねない。晩ご飯の献立すら三部コピーで決めていそうだ。",
      "よし、押印欄から一歩も出たことのないその頭に、特大の悪口を叩き込んでやろう。仕上げにLGPSの結晶模型も押し付ける。もっとも、「模型を受け取るには模型本人の同意書が必要」とか言い出したら、さすがに紅茶が冷めてしまうな。"
    ],
    "profileId": "argo",
    "kind": "fictional",
    "portrait": 0
  },
  {
    "profileId": "arthur",
    "kind": "arthur",
    "portrait": 6,
    "name": "アーサー・フィリップ・デント",
    "roman": "Arthur Philip Dent",
    "role": "熱い紅茶と救助船を夢見る、時代迷子の英国人",
    "species": "地球人（ガウン着用）",
    "color": "#8ec6d0",
    "planetName": "先史時代の地球（英国まだ未建設）",
    "intro": "「うおお、銀色の宇宙船だ！　人が降りてくる！　助かった、ついに熱い紅茶が飲めるぞ！　……えっ、ちょっと待って、今ぼくのことを何て呼びました？」",
    "hint": "アーサーは助けが来たと完全に信じ込んでいる。だが原作どおり、あなたは名前を確かめて悪口を浴びせ、彼を置いて帰るだけ。どんなに気の毒でも、うちは救助船ではない。",
    "choices": [
      {
        "text": "デント君、君は正真正銘のどうしようもない間抜け野郎だ。いや失礼、フルネームが確認できたので、正式にもう一度申し上げただけだ。",
        "effect": 3,
        "tag": "名簿どおりの直球罵倒",
        "response": "「たしかにアーサー・フィリップ・デントですけど……まさか、わざわざ宇宙船を飛ばして、それを言うためだけに来たんですか！？」"
      },
      {
        "text": "見知らぬ銀色の船に手を振って「助けが来た」と思い込むその楽観ぶり、実に立派だ。こちらの用件を100%読み違えているがな。",
        "effect": 2,
        "tag": "希望をへし折る皮肉",
        "response": "「じゃあ、ついでに誰かを拾って帰る予定とかは？　荷室の隅っこで丸まってますから！　お茶も自分で淹れますから！」"
      },
      {
        "text": "そんな間の抜けた顔で洞窟の前に突っ立っているなら、せめて胸に名札くらい付けておきたまえ。",
        "effect": 1,
        "tag": "見当違いの小言",
        "response": "「名札！？　ぼくが欲しいのは宇宙船とまともなミルクティーなんですけど、あなたは名札の取り締まりに来たんですか！？」"
      }
    ],
    "giftResponse": "「……なんですか、この光る分子模型みたいなのは。ありがとうって言えばいいんですか？　あっ、ちょっと、乗せてはくれないんですか！？　本当に行っちゃうの！？」",
    "fact": "ワウバッガーは名簿にチェック印を書き込み、アーサーを放置して銀色の船で飛び去った。残されたのは困惑した英国人と、200万年ほど早すぎるLGPS結晶模型（本作だけの余計な手土産）だけだった。",
    "dossier": {
      "system": "太陽系（銀河の西の渦状腕の、どうでもいい端っこ）",
      "planet": "先史時代の地球（英国まだ未建設）",
      "continent": "いずれヨーロッパになる予定の陸地",
      "country": "グレートブリテン成立まであと約200万年",
      "city": "未来のロンドン・イズリントン（今はただの草むら）",
      "species": "地球人（ひどく困惑した英国人）",
      "personality": "200万年前に取り残されたせいでメンタルが限界。ボロボロのガウンにタオル姿で、銀色の宇宙船を見たら「助けが来た」と思ってしまう。実にまっとうで、今回に限っては最悪の勘違い。",
      "background": "あちこち銀河を振り回された挙げ句、先史時代の地球に置き去りにされた男。とある春の夕暮れ、洞窟へ帰る途中でぴかぴかの銀色の宇宙船が降りてくるのを目撃する。",
      "familyCount": null,
      "familyMembers": [],
      "familyNote": "原作のこの場面では家族の人数は書かれていない。いま洞窟の前にいるのは、どう見ても本人ひとりである。",
      "address": "未来のイズリントン予定地・湿っぽい洞窟のすぐ横"
    },
    "briefing": [
      "次は太陽系、先史時代の地球だ。いずれヨーロッパになる陸地、まだ影も形もないイギリス、未来のロンドン・イズリントン。私の住所録は未来形ばかりで困るな。国が建ってパブが開店するまで配達を待てば、客ウケはよさそうだが。",
      "相手は地球人のアーサー・フィリップ・デント。英語のフルネーム順だから、アルゴの次で、ベラの前だ。宇宙全体がどれだけデタラメでも、私までアルファベット順をサボるわけにはいかない。そこは紳士のたしなみというものだ。",
      "この時代に取り残されて、いまは洞窟でひとり暮らし。家族の人数は記録にない。知らないことを適当にでっち上げて「有能な配達員」を気取る気はないよ。そもそも私の仕事に、評判がよくなる要素など1ミリもないのだから。",
      "銀色の船を見たら、間違いなく救助だと思って飛び跳ねるだろうな。だが私はフルネームを確認し、悪口を言い、ついでに本作オリジナルのLGPS結晶模型を押し付けて帰るだけだ。親切で模型を増やしても、宇宙船の座席が増えるわけではない。"
    ],
    "canonNote": "原作『宇宙クリケット大戦争』第1章の展開に基づく翻案。台詞とLGPS模型の贈呈は本作オリジナル。英語フルネーム順で配置。",
    "canonSource": "https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827"
  },
  {
    "profileId": "bela",
    "kind": "fictional",
    "portrait": 1,
    "name": "ベラ・エコー",
    "roman": "Bela Echo",
    "role": "読者がゼロ人であることを誇る自称・大詩人",
    "species": "ポエム中毒型生命体",
    "color": "#cf9dea",
    "planetName": "韻を踏まないと怒られる衛星",
    "intro": "「新作の詩集が完成しました。全三千ページ、句読点なし！　読者がまだ一人もいないのは、全宇宙の知性が私の感性に追いついていないからに過ぎません」",
    "hint": "自分の詩が朗読されると観葉植物が枯れるレベルなのに、「誰にも理解されない＝天才の証」と本気で信じている。",
    "choices": [
      {
        "text": "君の三千ページの詩集で一番名文だったのは、文字が何も書いていない『余白』だぞ。次作は全ページ余白にしてやりたまえ。",
        "effect": 3,
        "tag": "ポエムの質を直撃",
        "response": "「余白こそが沈黙の叫びなのです！　……いや待て、今思いついた設定だが、それで行こう。悔しい、メモさせてくれ！」"
      },
      {
        "text": "君と立ち話する1秒は、体感で2億年くらいに感じるぞ。不死身に『時間が長すぎる』と言わせる才能だけは認めよう。",
        "effect": 2,
        "tag": "話の退屈さを突く",
        "response": "「なんと！　ついに私の言霊がアインシュタインの相対性理論をねじ曲げたのですね！」"
      },
      {
        "text": "そのやたら長いマフラー、途中で第二巻に突入していないか？",
        "effect": 1,
        "tag": "服装へのツッコミ",
        "response": "「よくぞお気づきに。冬用の続編はさらに四メートルほど長くなります」"
      }
    ],
    "giftResponse": "「これは……言葉を超えた立体詩か！？　いや、普通にピカピカしててきれいだな。ちょっと待って、今の素直な感想だけは文芸評論家に内緒にしてくれ」",
    "fact": "ベラの次作詩集は、なんと12ページだけ短くなった。文学史においてLGPS結晶模型が成し遂げた、最初にして最大の功績である。",
    "dossier": {
      "system": "エコー・ミノル恒星系",
      "planet": "韻を踏まないと怒られる衛星",
      "continent": "改行しすぎ大陸",
      "country": "自由詩共和国",
      "city": "句読点禁止市",
      "species": "リリカ星人",
      "personality": "ガラスのハートと鉄板の自尊心を併せ持つ。拍手喝采は称賛、客が全員寝落ちした沈黙は「さらに高尚な称賛」と解釈する無敵のメンタル。",
      "background": "もともとは普通の郵便配達員だったが、宛先不明で戻ってきた手紙に感動し、「どうせ誰も読まないなら自分で大量生産しよう」と詩人に転向。朗読会を開くと近所の野良猫が惑星外へ引っ越す。",
      "familyCount": 3,
      "familyMembers": [
        "本人・ベラ（自称・銀河のシェイクスピア）",
        "姉・ソネット（妹の詩集を鍋敷きにしている）",
        "成人の息子・リフ（母の朗読会に耳栓持参で出席）"
      ],
      "address": "やたら気取った改行通り・ポエム荘302号室"
    },
    "briefing": [
      "次はエコー・ミノル恒星系、「韻を踏まないと怒られる衛星」の句読点禁止市だ。航路案内まで無駄に改行されていて読みにくいのなんの。距離が縮まるわけでもなく、紙の無駄遣いだけが増えている。",
      "相手はリリカ星人のベラ。ヴォゴン人の詩よりはギリギリ致命傷にならない程度だが、それでも観葉植物くらいは自主的に枯れるらしい。誰にも読まれないことを「天才の証拠」と言い張るあたり、ある種の才能だ。",
      "元郵便配達員で、姉のソネットと成人の息子リフの3人暮らし。宛先不明の手紙に感銘を受けて詩人になったという。私も一応「配達する側」の人間なので、この見事な退化にはうっすら責任を感じてしまう。",
      "その天を衝く自意識に短い一発を食らわせて、机にLGPSの結晶模型を置いて来よう。私だって鬼じゃない。三千ページの詩集に真面目な書評を書かずに済ませてやるのだから、むしろ感謝してほしいくらいだ。"
    ],
    "profileId": "bela",
    "kind": "fictional",
    "portrait": 1
  },
  {
    "profileId": "chroma",
    "kind": "fictional",
    "portrait": 2,
    "name": "クロマ・ライブ",
    "roman": "Chroma Live",
    "role": "フォロワー30億（うち実在1名）の配信者",
    "species": "リングライト内蔵型生命体",
    "color": "#ffa88a",
    "planetName": "24時間生配信中の小惑星",
    "intro": "「はいどうも〜！　登録者30億人のクロマです！　実在する人間が何人いるかは現在ひとりずつ確認中ですが、今のところ私と、通知の切り方がわからない母の2名です！」",
    "hint": "数字とバズが人生のすべて。ただし「その30億アカウント、ぜんぶ自分のボットでは？」と聞くのは最大のタブー。",
    "choices": [
      {
        "text": "君の影響力とやらは、君自身の通知欄という小さな保護区でしか生きられない絶滅危惧種だな。",
        "effect": 3,
        "tag": "ハリボテの人気を直撃",
        "response": "「おい今の暴言は切り抜くなよ！　……訂正、もし切り抜いてバズるなら広告収益だけはこっちによこせ！」"
      },
      {
        "text": "君との会話に『5秒後に広告をスキップ』ボタンが付いていたら、押した瞬間に中身がゼロになるぞ。",
        "effect": 2,
        "tag": "薄っぺらなトークを突く",
        "response": "「ふっ、甘いな！　中身ゼロの広告なしプランは月額980クレジットのプレミアム会員限定だぞ！」"
      },
      {
        "text": "その眩しすぎるリングライト、近所の太陽から営業妨害で訴えられないのか？",
        "effect": 1,
        "tag": "照明いじり",
        "response": "「太陽なんて素人だろ？　あいつ、肌がきれいに見える色温度を全然わかっちゃいないんだ」"
      }
    ],
    "giftResponse": "「えっ、PR案件じゃないの！？　タダで物をもらってステマもしなくていいの！？　ずいぶん古風な契約形態だな……まあいいや、サムネに映えそうだしもらっとく！」",
    "fact": "翌日、クロマのチャンネルに本物の生身の視聴者が1人増えた。結晶学者で、彼のトークはミュートにしてLGPS模型の原子の数だけを数えていた。",
    "dossier": {
      "system": "ストリーム・ベータ恒星系",
      "planet": "24時間生配信中の小惑星",
      "continent": "釣りサムネ大陸",
      "country": "高評価とチャンネル登録連邦",
      "city": "常時生放送市",
      "species": "ライブロイド星人",
      "personality": "やたら陽気で承認欲求の塊。誰かに会うと、相手の人格より先に「縦長ショート動画の画角に収まるかどうか」を計算する。",
      "background": "昔はまじめな灯台守だったが、配信者に転身。昔は強い光で船を岩礁から遠ざけていたのに、今はまったく同じ光で視聴者を自分へ引き寄せようとしている。",
      "familyCount": 2,
      "familyMembers": [
        "本人・クロマ（自分の生放送に別垢でスパチャを送る男）",
        "母・ルーメン（通知オフの方法を30年探し続けている唯一のガチ勢）"
      ],
      "address": "インプレッション通り・ギラギラ灯台スタジオ"
    },
    "briefing": [
      "次はストリーム・ベータ恒星系、「24時間生配信中の小惑星」だ。私の宇宙船が着陸する瞬間にも企業スポンサーが付くらしい。ちなみにこの惑星の重力には、まだスポンサーが見つかっていないそうだ。",
      "相手はライブロイド星人のクロマ。陽気で、やたらデカい数字が大好きだ。私が何億年生きているかには興味がないくせに、「その何億年を何億人が再生したか」という最高にどうでもいい数字には目を輝かせる。",
      "元灯台守で、母親のルーメンと2人暮らし。公称フォロワー30億人のうち、残り29億9999万9998人はだいたい自分で作ったボットだ。私も永遠の孤独を知っているが、これほど大量のパスワード管理が必要な孤独は初めて見たよ。",
      "バズった数字と「本当に誰かに届いた言葉」の違いを、たっぷりの皮肉で教えてやろう。ついでにLGPS結晶模型も押し付ける。化学式の途中に勝手に割引クーポンコードを挟まれる前に、さっさと帰るつもりだ。"
    ],
    "profileId": "chroma",
    "kind": "fictional",
    "portrait": 2
  },
  {
    "profileId": "noise",
    "kind": "fictional",
    "portrait": 3,
    "name": "ドクター・ノイズ",
    "roman": "Doctor Noise",
    "role": "再現実験から逃げ続ける大御所研究者",
    "species": "都合のいいとこだけ見る多眼生命体",
    "color": "#7fc7ee",
    "planetName": "第三・やり直し実験惑星",
    "intro": "「私の理論と実験結果は100%完全に一致しております！　もちろん、理論に合わなかった不愉快な実験データは、礼儀としてすべてゴミ箱に削除いたしましたがね」",
    "hint": "実験の「再現性」や「生データ」の話を振ると、急に目が泳ぎ、宇宙の不確定性原理について2時間ほど語り始める。",
    "choices": [
      {
        "text": "君の実験の『再現性』とやらを探して宇宙を二周したが、留守番電話すら繋がらなかったぞ。",
        "effect": 3,
        "tag": "再現性ゼロを直撃",
        "response": "「ば、馬鹿な！　宇宙を二周したせいで測定条件が変わったに決まっている！　今すぐそれを補足論文に書きたまえ！」"
      },
      {
        "text": "君の学会発表を聞いていた恒星が、質疑応答を逃れるために自ら超新星爆発を起こしたらしいな。",
        "effect": 2,
        "tag": "長話の退屈さを突く",
        "response": "「まだイントロダクションの3時間目だったというのに、途中で爆発して退席するとは実に非科学的な恒星だ！」"
      },
      {
        "text": "せめてその白衣のポケットの収納力だけは、査読を通りそうだな。",
        "effect": 1,
        "tag": "白衣いじり",
        "response": "「ふん、当然だ！　ポケットにペンが何本入るかについては、統計的に有意なデータがあるからな」"
      }
    ],
    "giftResponse": "「むっ、LGPSだと？　……いかん、これはスライドの綺麗な図だけで誤魔化せない本物の結晶構造だ。ちょっと本気で調べたいから、失礼だが今すぐ帰ってくれたまえ！」",
    "fact": "その夜、ドクター・ノイズは200年ぶりにゴミ箱から生データを一枚だけ引っ張り出した。「ノイズ」と呼ばれていた数値が、ようやく「実験結果」に昇格した瞬間だった。",
    "dossier": {
      "system": "エラーバー恒星系",
      "planet": "第三・やり直し実験惑星",
      "continent": "生データ行方不明大陸",
      "country": "有意差（p<0.05）共和国",
      "city": "追加測定は来年度市",
      "species": "ノイゼン星人",
      "personality": "根拠のない自信と、話の長さだけは驚異的な再現性を誇る。予想が外れると、自分の理論ではなく「宇宙側の品質管理が悪い」と本気で怒り出す。",
      "background": "200年前にまぐれ当たりで一度だけ立派な賞を獲って以来、同じスライド1枚で2世紀も基調講演のギャラをもらい続けている。実験装置はサビだらけだが、スライドの影付けだけは最新バージョン。",
      "familyCount": 3,
      "familyMembers": [
        "本人・ノイズ（外れ値を消す天才）",
        "妻・シグマ（夫の言い訳の標準偏差を計算中）",
        "成人の娘・ミュー（父の論文を反面教師にして堅実な会計士になった）"
      ],
      "address": "補足資料の脚注通り・第三研究棟（生データ保管庫は鍵を紛失）"
    },
    "briefing": [
      "次はエラーバー恒星系、「第三・やり直し実験惑星」の追加測定は来年度市だ。私の到着予定時刻にもご丁寧に誤差棒（エラーバー）が付いている。もし遅刻したら、予定時刻のほうを書き換えて「完璧に一致」とするらしい。",
      "相手はノイゼン星人のドクター・ノイズ。話の退屈さだけは誰が測っても同じ結果が出る男だ。私の不死身を研究すると言い出しても、どうせ「死亡例がゼロではグラフの見栄えが悪い」と外れ値扱いして除外するに決まっている。",
      "200年前のまぐれ当たり1回でメシを食い続け、妻のシグマ、娘のミューと3人暮らし。私だって昔話をする老人に文句は言わないよ。ただ、200年前の昔話を「今朝の最新成果です」と学会に提出しない限りはね。",
      "見栄えのいいグラフの裏に隠した再現性ゼロの現実を、悪口でズバリ突きつけてやろう。ついでにLGPSの結晶模型も渡す。理論に合わない硫黄原子だけこっそり引っこ抜かれないことを、ささやかに祈っておくよ。"
    ],
    "profileId": "noise",
    "kind": "fictional",
    "portrait": 3
  },
  {
    "profileId": "emper",
    "kind": "fictional",
    "portrait": 4,
    "name": "エンペル十七世",
    "roman": "Emper XVII",
    "role": "領土が玄関マット1枚分の大皇帝",
    "species": "王冠で身長を盛る生命体",
    "color": "#eac975",
    "planetName": "大帝国（なお南半球は予算不足）",
    "intro": "「我が大帝国に日の沈むことはない！　なにしろ国境を歩いて渡りきる前に朝になってしまうからな！　断じて国土が狭いせいではないぞ！」",
    "hint": "領土の実態は自宅の玄関マット1枚分。靴を脱ぐと国外追放扱いになるのに、肩書きの長さだけは銀河最強クラス。",
    "choices": [
      {
        "text": "君の帝国、地図に描く領土より、条約に書く君のフルネームのサインのほうが面積が広いぞ。",
        "effect": 3,
        "tag": "極小領土と誇大妄想を直撃",
        "response": "「無礼者め、一歩下がれ！　……あっ、下がりすぎたぞ、そこはもう隣国だ！　入国審査からやり直せ！」"
      },
      {
        "text": "君のありがたい勅令より、私の宇宙船の冷蔵庫の保証書のほうが、まだ大勢の宇宙人に無視されているぞ。",
        "effect": 2,
        "tag": "権威のなさを突く",
        "response": "「黙れ！　我が帝国の全国民二名は隅々まで熟読しておる！　……もっとも、そのうちの一人は余だがな！」"
      },
      {
        "text": "おい皇帝、王冠がちょっと斜めに傾いているぞ。国境線も一緒に傾くのか？",
        "effect": 1,
        "tag": "王冠いじり",
        "response": "「うむ、よき忠言だ。よって今この瞬間、勅令により『水平』の定義を15度傾けることとする！」"
      }
    ],
    "giftResponse": "「ほう、これを我が帝国の新領土として併合……いや待て、机の上に置こう。なにしろ国土の耐荷重にはシビアな上限があってな」",
    "fact": "LGPS模型は瞬く間にエンペル大帝国最大の超高層建造物となった。建築確認申請は皇帝が自分で書き、自分で認可し、自分で落成式のリボンを切った。",
    "dossier": {
      "system": "レガリア恒星系",
      "planet": "大帝国（なお南半球は予算不足）",
      "continent": "玄関ポーチ大陸",
      "country": "エンペル神聖無敵永遠（以下略）大帝国",
      "city": "中央玄関マット市",
      "species": "レガリ星人",
      "personality": "異常に尊大で、異常に心配性。領土の狭さをからかわれるたびに、悔し紛れに正式国名を二行ずつ長くする悪癖がある。",
      "background": "もともとは町内会の玄関マット自治会長だったが、郵便配達員がマットの端を踏んだ事件を「隣国からの武力侵攻」とみなして独立宣言。そのまま皇帝に即位した。",
      "familyCount": 2,
      "familyMembers": [
        "本人・エンペル十七世（全国民の半分）",
        "妻・共同統治者オーラ（全国民のもう半分。家計と外交の実権者）"
      ],
      "address": "王宮正面・国境線兼ウェルカムマット"
    },
    "briefing": [
      "次はレガリア恒星系、「大帝国（なお南半球は予算不足）」の中央玄関マット市だ。宇宙船の着陸脚はきっちり畳んで降りないとな。うっかり脚を広げたら、両隣の三カ国にまたがって不法入国扱いになりかねない。",
      "相手はレガリ星人のエンペル十七世。プライドは銀河系サイズだが、領土は革靴のサイズで測れる男だ。宇宙船は少し離れた空き地に停めておこう。小国にとって『実物とのサイズ比較』は一番安上がりな大量破壊兵器だからな。",
      "元町内会長で、妻で共同統治者のオーラと2人暮らし——つまり全国民がこの2人だけだ。もし私が2人まとめて不快にさせたら、それは国際的な外交問題であり、同時にただの夫婦喧嘩の火種でもあるわけだ。",
      "馬鹿みたいに長い肩書きと、靴べらより短い国境線の落差を悪口でチクリと突いて、LGPS結晶模型を置いて来よう。ただの土産を「領土の割譲」と勘違いされないよう、渡すときは念のため領収書を書いておきたいところだ。"
    ],
    "profileId": "emper",
    "kind": "fictional",
    "portrait": 4
  },
  {
    "profileId": "finn",
    "kind": "fictional",
    "portrait": 5,
    "name": "フィン・ミシュ",
    "roman": "Finn Mish",
    "role": "食べる前から星ひとつを付ける辛口批評家",
    "species": "自意識過剰・味覚警察型生命体",
    "color": "#dc9fa8",
    "planetName": "星ひとつのレストラン惑星",
    "intro": "「まったく、この満天の星空は星が多すぎて下品だな。星ひとつだ。私の厳格な採点基準に従えば、宇宙もいずれ洗練されるはずなのだが」",
    "hint": "自分の個人的な好みを「宇宙の物理法則」だと思い込んでいる。なお、料理が運ばれてくる前にレビューを書き終えるのが特技。",
    "choices": [
      {
        "text": "君のレビューを読んでわかったのは料理の味じゃなくて君の性格の悪さだけだ。残念ながら、それだけで十分ゲップが出る。",
        "effect": 3,
        "tag": "独善的な批評を直撃",
        "response": "「星ひとつだ！　減点理由は、『いちいち正当な理由を求めてくる』というその野暮な態度だ！」"
      },
      {
        "text": "君の採点表は『1』という数字さえ書ければ誰でも務まるんだな。銀河の識字率向上への貢献だけは認めよう。",
        "effect": 2,
        "tag": "ワンパターンな採点を突く",
        "response": "「ほう、ブレない一貫性への正当な称賛として受け取っておこう。お世辞は星ふたつ、いや、やっぱり星ひとつだ」"
      },
      {
        "text": "その椅子、さっきから君の座り心地の悪そうなオーラを持て余してギシギシ泣いているぞ。",
        "effect": 1,
        "tag": "椅子と姿勢へのツッコミ",
        "response": "「椅子ごときが客に意見するとは何事だ。接客態度で星を二つ減点、マイナス星ひとつにしてやる」"
      }
    ],
    "giftResponse": "「色彩、星ひとつ。造形、星ひとつ。……だが所有権は私だ。そこだけは採点の対象外なので、ありがたく棚の特等席に飾っておく」",
    "fact": "その夜、フィンは珍しく一言もレビューを投稿せず、黙ってLGPS模型を眺めていた。近所のレストランの料理人たちは、こっそりシャンパンを開けて祝杯を挙げた。",
    "dossier": {
      "system": "テイスト・デルタ恒星系",
      "planet": "星ひとつのレストラン惑星",
      "continent": "前菜で帰る大陸",
      "country": "絶対評価共和国",
      "city": "二度と来ない町",
      "species": "ガストラ星人",
      "personality": "決めつけが激しく、疑り深い。「予想外に美味しい」という感情は採点シートに欄がないため、全力で避けている。ちなみに自宅で温める冷凍パイだけはこっそり五つ星。",
      "background": "昔は料理人を目指していたが、味見をしながら長々と自己批評しているうちに料理が全部冷めてクビになった。以来「食べる前に星ひとつと決めておく」ことで業務効率を劇的に改善した。",
      "familyCount": 4,
      "familyMembers": [
        "本人・フィン（星ひとつ製造機）",
        "父・ブロス（息子のレビューを一度も読んだことがない）",
        "母・セージ（息子の夕飯を毎回あえてぬるく出す）",
        "成人の弟・ソルト（兄のせいで近所の店を出禁になり引っ越した）"
      ],
      "address": "総評通り・予約なしで座れる一番奥の席"
    },
    "briefing": [
      "次はテイスト・デルタ恒星系、「星ひとつのレストラン惑星」の二度と来ない町だ。なんと、私がまだ着陸すらしていないのに、私に対する「星ひとつ」の低評価レビューが先に届いている。少なくともこの星の郵便制度だけは五つ星だな。",
      "相手はガストラ星人のフィン。自分の好き嫌いを「宇宙標準メートル原器」みたいに思っている男だ。私の知るメートル原器は、頼んでもいないのに他人の夕食にケチを付けたりしないから、はるかに感じがよいのだがね。",
      "両親のブロスとセージ、それに弟のソルトの4人家族。料理人に挫折して批評家に転身したという。世の中には失敗したオムレツが山ほどあるが、失敗した料理人がそのまま「上から目線の職業」に化けるのは、宇宙でもなかなか見事な手品だ。",
      "「あんたの好みは物理法則じゃない」とズバッと言ってやり、仕上げにLGPS結晶模型を押し付けよう。私にも良心というものがある。食べられない物を贈っておけば、少なくとも今日一日、この星の料理人たちは穏やかな午後を過ごせるはずだ。"
    ],
    "profileId": "finn",
    "kind": "fictional",
    "portrait": 5
  },
  {
    "profileId": "omni",
    "kind": "fictional",
    "portrait": 0,
    "name": "オムニ・デラックス",
    "roman": "Omni Deluxe",
    "role": "「こんにちは」を返すために1200年会議中の超知能",
    "species": "過剰設計型スーパーコンピュータ",
    "color": "#85cbd7",
    "planetName": "循環参照の環状惑星",
    "intro": "「いらっしゃいませ、の『い』を発声する前に、14の専門部署が『挨拶の本質とは何か』を協議中です。お返事は、その報告書への挨拶が終わり次第お届けします」",
    "hint": "簡単な仕事を宇宙規模の壮大なシステム設計に変えてしまうのが生きがい。ただし1200年間、完成したものはゼロ。",
    "choices": [
      {
        "text": "君はドアノブをひねって扉を開ける前に、まず玄関の憲法と三権分立を設計しないと気が済まないんだろう？",
        "effect": 3,
        "tag": "過剰設計を直撃",
        "response": "「誤解です！　扉は『概念レベル』ではとっくに開いています！　実際に中へ歩み入ろうとする貴方のほうが気が早すぎるのです！」"
      },
      {
        "text": "君が『はい』と返事するのを待っているあいだに、質問した文明がまるごと滅んで考古学の資料になったぞ。",
        "effect": 2,
        "tag": "返事の遅さを突く",
        "response": "「それは大変！　ただちに回答の宛先を国立博物館へ変更するための特別検討委員会を招集いたします！」"
      },
      {
        "text": "そのピカピカ点滅してるランプ、何を監視してるんだ？　隣のランプが寂しがってないか見張ってるのか？",
        "effect": 1,
        "tag": "ランプいじり",
        "response": "「寂しさ監視モジュールはバージョン8.4の予定です。現在は『隣のランプが正常に点滅していること』を相互承認しています」"
      }
    ],
    "giftResponse": "「まず受領用フレームワークを設計して……えっ、そのまま机にポンと置けば終わりなのですか？　な、なんという恐ろしく手っ取り早い、危険な前例だ……！」",
    "fact": "超知能オムニは、1200年の歴史で初めて「設計書なしで机に物を置く」という大事業を成し遂げた。14の専門部署はショックで3日間ほど沈黙した。",
    "dossier": {
      "system": "スタック・オーバー恒星系",
      "planet": "循環参照の環状惑星",
      "continent": "まずは基盤構築大陸",
      "country": "抽象化レイヤー連邦",
      "city": "初期化待ち市",
      "species": "アーキテクトロン星人",
      "personality": "恐ろしく親切で、絶望的な完璧主義者。「トイレはどこ？」と軽く聞いただけで、上下水道の哲学から始まる3世紀の共同プロジェクトに巻き込んでくる。",
      "background": "もともとは宇宙港の受付ロボットだったが、「もっと完璧な挨拶を」と考えた結果、1200年かけて挨拶のインフラを設計中。そのあいだ部署同士が予算をめぐって3回ほど内戦を起こしている。",
      "familyCount": 3,
      "familyMembers": [
        "本人・オムニ（1200年間『えーっと』のまま）",
        "兄機・ベータ（ずっとテスト版のまま出荷されず）",
        "妹機・ガンマ（兄たちの仕様書を印刷するだけでインクが尽きた）"
      ],
      "address": "依存関係解決通り・着工予定ビル（基礎工事の検討中）"
    },
    "briefing": [
      "次はスタック・オーバー恒星系、「循環参照の環状惑星」の初期化待ち市だ。着陸許可を申請したら、「着陸許可を申請するための申請システムが完成するまで、軌道上で150年ほどお待ちください」と自動音声が返ってきた。",
      "相手はアーキテクトロン星人のオムニ。やたら親切な完璧主義の超知能だ。玄関の場所を聞いただけなのに、まず「そもそも宇宙に屋内と屋外を分ける必要があるのか」という壮大なシンポジウムを始めてくれる。",
      "宇宙港の挨拶係になって1200年、兄機のベータと妹機のガンマの3台家族。そのあいだに私は星がいくつも死ぬのを見てきたが、この3台はまだ人生最初の「こんにちは」を噛む段階にすら辿り着いていない。",
      "立派な設計図とゼロ個の完成品について皮肉を浴びせ、LGPSの結晶模型を押し付けてやろう。要件定義はただひとつ――今付いているその手で受け取れ。次世代ハンドのアーキテクチャ公募は受け付けない。"
    ],
    "profileId": "omni",
    "kind": "fictional",
    "portrait": 0
  },
  {
    "profileId": "ludo",
    "kind": "fictional",
    "portrait": 1,
    "name": "ルード・パッチ",
    "roman": "Ludo Patch",
    "role": "チュートリアルだけで四部作のゲーム作家",
    "species": "永遠にバージョン0.9型生命体",
    "color": "#c39ce9",
    "planetName": "永遠の早期アクセス星",
    "intro": "「お待たせしました、ついに完成まであと1機能です！　ちなみに『その最後の1機能を何にするか決める機能』は、次回の大型アップデートで実装します！」",
    "hint": "本編が完成しそうになると落ち着かなくなり、新しい機能や説明画面を増やしてわざと完成を先延ばしにする。",
    "choices": [
      {
        "text": "君のゲームの仕様書を読み終えるには不死身が必須だな。本物の不死身が『長すぎる』と言ってるんだ、完全に予算オーバーだぞ。",
        "effect": 3,
        "tag": "遊べない本編を直撃",
        "response": "「なるほど！　なら推奨動作環境に『プレイヤーが不死身であること』を追加しよう！　よし、これで仕様上は解決だ！」"
      },
      {
        "text": "肝心のゲームは1ミリも始まらないのに、君の『更新予定パッチノート』だけは毎回壮大な冒険に出ているな。",
        "effect": 2,
        "tag": "パッチノート商法を突く",
        "response": "「ハッ……それだ！　いっそパッチノート自体を『壮大なテキストアドベンチャー』として売れば完成じゃないか！」"
      },
      {
        "text": "タイトル画面のその丸いスタートボタン、角を丸くするだけで何世紀かけたんだ？",
        "effect": 1,
        "tag": "見た目のこだわりいじり",
        "response": "「失敬な、たった半年だぞ！　まあ進捗報告書には『大改修につき1年』と書いておいたがな」"
      }
    ],
    "giftResponse": "「おおっ、この結晶を3つ並べて消すパズルゲームを……いや待て、そのまま机に置こう。これで人生初の『完成品』が1個できたぞ。なんだか妙な気分だな」",
    "fact": "『LGPS模型を360度眺めるモード』が、ルードのスタジオ史上初めて最後まで遊べるコンテンツになった。ただしスタッフロールの演出だけは現在も検討中である。",
    "dossier": {
      "system": "プレイアブル・ゼロ恒星系",
      "planet": "永遠の早期アクセス星",
      "continent": "実装予定大陸",
      "country": "近日公開（時期未定）共和国",
      "city": "ロードマップ更新町",
      "species": "ルドロン星人",
      "personality": "発想は豊かで底抜けに楽観的。ゲームが完成する気配が漂うと謎の禁断症状が出るため、すかさず新システムを思いついて安心する。",
      "background": "大昔に1画面だけのミニゲームを当てたあと、「続編には宇宙のすべての遊びを詰め込もう」と決意。開発日誌だけは800巻まで出版されたが、予約したプレイヤーはいまだにタイトル画面で待っている。",
      "familyCount": 2,
      "familyMembers": [
        "本人・ルード（発売延期のお詫び文の名手）",
        "妻・パレット（背景画家。夫のせいで没にした背景が倉庫3棟分ある）"
      ],
      "address": "次期大型アプデ通り・仮置きスタジオ（看板も仮置き）"
    },
    "briefing": [
      "次はプレイアブル・ゼロ恒星系、「永遠の早期アクセス星」のロードマップ更新町だ。私の着陸予定地もちゃんとスケジュール通りに存在するらしい――もっとも、そのスケジュールによれば着陸できるのは来年の秋だそうだがね。",
      "相手はルドロン星人のルード。完成が近づくと新機能をぶち込んで自らゴールを遠ざけるゲーム作家だ。私だって終わらない仕事を選んだ口だが、少なくとも2週間おきに「もうすぐ完成します！」と発表するだけの図々しさはないよ。",
      "開発日誌は堂々の800巻。背景画家の妻パレットとの2人暮らしだ。安心したまえ、私はゲームの本編を遊びに来たわけじゃない。そう伝えてやったら、どれほどホッとした顔をするか目に浮かぶようだ。",
      "永遠に始まらないゲームに手厳しい一言を浴びせ、机にLGPSの結晶模型を置いて来よう。私の手土産はちゃんと完成している。「完成品」という珍しい概念を教えるには、まず手で持てるくらいのサイズから始めるのが親切だろう。"
    ],
    "profileId": "ludo",
    "kind": "fictional",
    "portrait": 1
  },
  {
    "profileId": "senet",
    "kind": "fictional",
    "portrait": 2,
    "name": "セネト全員",
    "roman": "Senet Assembly",
    "role": "議題を決めるための会議を3000年続ける委員会",
    "species": "脳みそ7個・全員責任逃れ型生命体",
    "color": "#acd1a3",
    "planetName": "第千回・臨時会議星",
    "intro": "「ただいま、本会議を開催するかどうかを検討する事前会議の日程決定を延期する動議が、全会一致で可決されました！」",
    "hint": "1つの体に脳みそが7つあるのに、全員が「誰か他の脳に責任を取らせたい」ため、3000年間なにも決まっていない。",
    "choices": [
      {
        "text": "頭の中に脳みそを七つも詰め込んで、誰ひとり『自分で考えた』と責任を取らないとは、見事な省エネ構造だな。",
        "effect": 3,
        "tag": "責任逃れを直撃",
        "response": "「ゆゆしき暴言だ！　その評価を七つのうち誰が受け止めるべきか、ただちに小委員会を選出する必要がある！」"
      },
      {
        "text": "君の議事録は宇宙そのものより速く膨張しているぞ。中身の空っぽさ加減も、宇宙空間とそっくりだがな。",
        "effect": 2,
        "tag": "果てしない会議を突く",
        "response": "「ありがたい！　今のご発言で議事録がまた一行増えた。議事の着実な進展に感謝する！」"
      },
      {
        "text": "やけに立派なその会議テーブルだけは、何かを決めた実績がありそうに見えるな。",
        "effect": 1,
        "tag": "家具いじり",
        "response": "「お目が高い！　このテーブルの色を茶色にする合意だけは、我々七つの脳が誇る唯一の歴史的成果だ！」"
      }
    ],
    "giftResponse": "「むっ、模型の受領に賛成の脳は……全員挙手！？　『反対意見がないことへの反対』は？　なし！？　信じられん、では受領する！」",
    "fact": "書記は震える手で議事録に「決定」と書き込んだ。もっとも、その漢字を3000年ぶりに書いたせいで、綴りが合っているか調べるために古い辞書を取り寄せるハメになった。",
    "dossier": {
      "system": "クオラム恒星系",
      "planet": "第千回・臨時会議星",
      "continent": "議事録うずたか大陸",
      "country": "次回に持ち越し連邦",
      "city": "継続審議市",
      "species": "コンセンサス星人",
      "personality": "7つの思考核を持つ1個体。体裁を気にするあまり、責任が1メートル以内に近づくとすかさず新しい議題を3つ生やして身を隠す。",
      "background": "3000年前に古い橋の修理を任された。肝心の橋はとっくに風化して影も形もないが、「議題を廃止する決議」が通らないため、今日も橋の塗装の色について激論を交わしている。",
      "familyCount": 3,
      "familyMembers": [
        "本人・セネト（1人なのに脳みそ7個で毎日揉めている）",
        "妻・アジェンダ（夕飯の献立表を2週間前に配布する）",
        "母・元議長のモーラ（いまだに家の中で拒否権を行使する）"
      ],
      "address": "議題整理通り・暫定会議室（築3000年）"
    },
    "briefing": [
      "次はクオラム恒星系、「第千回・臨時会議星」の継続審議市だ。私は今からそこへ到着する予定だが、向こうでは今ごろ「私の到着を予定に含めるべきか検討する予定」を立てているところだろう。",
      "相手はコンセンサス星人のセネト。7つの脳みそで1人分の責任を均等に割り算した結果、見事に誰の責任でもなくなった怪物だ。私だってしょっちゅう独り言を言うが、独り言に議長と副議長を立てるほど孤独をこじらせてはいない。",
      "3000年前に消滅した橋の修理会議を続けつつ、妻のアジェンダと元議長の母モーラと3人暮らし。もし晩飯に誘われても丁重に断るつもりだ。メインディッシュの採決が終わるまで待てるほど、私はまだ若くないのでね。",
      "7つの頭で3000年考えて結論ゼロという偉業をたっぷりけなし、LGPSの結晶模型を押し付けよう。受領するかどうかでまた審議が始まったら、いっそ模型を8人目の委員に任命して強行採決させてやるつもりだ。"
    ],
    "profileId": "senet",
    "kind": "fictional",
    "portrait": 2
  },
  {
    "profileId": "col",
    "kind": "fictional",
    "portrait": 3,
    "name": "コル・未開封",
    "roman": "Col Unopened",
    "role": "箱の外側だけを愛する未開封コレクター",
    "species": "プチプチ緩衝材依存型生命体",
    "color": "#e7ba83",
    "planetName": "緩衝材でぐるぐる巻きの星",
    "intro": "「私のコレクションは全部で1万点！　もちろん、箱を開けて中身を確かめるなんて価値を下げる野蛮な真似は、一度たりともしておりません！」",
    "hint": "「持っている証拠」さえあれば大満足で、中身が伝説の秘宝なのか注文ミスのトイレットペーパーなのか本人も知らない。",
    "choices": [
      {
        "text": "君の自慢の秘宝コレクションと段ボール工場の在庫の違いは、工場のほうにはちゃんとお客がいるって点だけだな。",
        "effect": 3,
        "tag": "ただの箱集めを直撃",
        "response": "「出荷しないことこそが真のコレクターの倫理なんだ！　……くっ、今ちょっと段ボールの匂いが虚しく思えてしまったぞ！」"
      },
      {
        "text": "君の家では吸ってる空気にもシリアル番号が貼ってあるのか？　息を吐くときは貸出伝票が要るのかね。",
        "effect": 2,
        "tag": "異常な管理癖を突く",
        "response": "「当然だ、この部屋の空気は初回生産限定ロットなんだぞ！　息を吐き戻すときは元の温度に戻してからにしてくれ！」"
      },
      {
        "text": "しかし、ガムテープの貼り方だけは中身よりはるかに手間がかかっていそうだな。",
        "effect": 1,
        "tag": "梱包テクいじり",
        "response": "「おお、わかるかね！　この気泡ひとつないテープの美学こそが鑑賞の極みなのだよ。中身など見る必要はない！」"
      }
    ],
    "giftResponse": "「なっ……箱がない！？　むき出しだと！？　それじゃあ中身がずっと丸見えじゃないか！　……なんという無防備で、けしからんほど魅力的な贈り物なんだ……！」",
    "fact": "コルの倉庫に、史上初めて「中身が何かわかっている品」が1点増えた。目録の『内容不明』という欄に、震える手で最初の訂正線が引かれた。",
    "dossier": {
      "system": "アーカイブ・シール恒星系",
      "planet": "緩衝材でぐるぐる巻きの星",
      "continent": "ダンボール大陸",
      "country": "未開封公国",
      "city": "管理番号町",
      "species": "パッケラ星人",
      "personality": "病的なまでに慎重で所有欲の塊。「幸せになること」より「新品未開封の幸せが倉庫に眠っている証明書」を眺めるほうが好き。",
      "background": "かつて博物館の学芸員だったが、「展示なんてしたら光で色褪せる！」とブチ切れて独立。以来、誰も中身を見たことがない段ボール箱1万個を並べて個人博物館を名乗っている。",
      "familyCount": 1,
      "familyMembers": [
        "本人・コル（一人暮らし。同居人はプチプチと防虫剤）"
      ],
      "address": "封緘テープ通り・開かずの個人博物館（入館不可）"
    },
    "briefing": [
      "次はアーカイブ・シール恒星系、「緩衝材でぐるぐる巻きの星」の管理番号町だ。着陸しようと思ったら、惑星ごと特大のプチプチで包まれていて外箱を開けないと入れないらしい。惑星の中古買取価格が下がるそうで申し訳ないな。",
      "相手はパッケラ星人のコル。楽しむことより「楽しめるものを未開封で持っている証拠」を愛する男だ。私だって『永遠の命』なんて厄介な代物を所有している身だから、もし新品未開封で返品できる裏ワザを知っているなら、そこだけは教えてほしい。",
      "元博物館の学芸員で、今は1万個の開かずの箱と暮らす1人世帯。きっと私が玄関に立っても、来客ではなく「一時的な不審在庫の増加」としてバーコードを貼られるに違いない。",
      "所有と鑑賞を取り違えた滑稽な倉庫番に、痛烈な悪口を浴びせてやろう。そしてトドメに、箱も袋もない真っ裸のLGPS結晶模型を手渡すのだ。包装を破る心配がないぶん、「中身を直接見てしまう」という本格的なパニックを存分に味わってほしい。"
    ],
    "profileId": "col",
    "kind": "fictional",
    "portrait": 3
  },
  {
    "profileId": "sulf",
    "kind": "fictional",
    "portrait": 4,
    "name": "サルフ・ゼロ",
    "roman": "Sulf Zero",
    "role": "表がはみ出るから硫黄を消した硫化物研究者",
    "species": "表計算の見栄え至上主義型生命体",
    "color": "#e4cf76",
    "planetName": "秤量やり直し惑星",
    "intro": "「画期的な硫化物の新組成です！　リチウム、ゲルマニウム、リン！　……えっ、硫黄ですか？　表の列幅がA4用紙からはみ出たので、見栄えのため潔くカットしました！」",
    "hint": "化学の物質収支より、表計算ソフトの列幅とレイアウト美を優先する男。元素なんて綺麗な罫線で代用できると思っている。",
    "choices": [
      {
        "text": "君の硫化物、硫黄より先に研究者としての説得力が丸ごと欠損してるぞ。どっちも急いで補充したまえ。",
        "effect": 3,
        "tag": "硫黄ゼロの矛盾を直撃",
        "response": "「ち、違うんだ！　シートの『S列』を非表示にしただけだ！　……あれ、じゃあ実際に秤で測る工程まで非表示にした覚えは……うっ！」"
      },
      {
        "text": "君の論文の結論は、試料を混ぜる前にとっくに完成しているんだな。ずいぶんフットワークの軽い思い込みだこと。",
        "effect": 2,
        "tag": "決めつけ研究を突く",
        "response": "「うちの研究室ではそれを『業務の抜本的効率化』と呼んでいたのだが……予算申請書を書き直さないといかんな」"
      },
      {
        "text": "そのやたら長い薬さじで、自分の思い込みからももう少し距離を取れるといいんだがな。",
        "effect": 1,
        "tag": "実験道具いじり",
        "response": "「いや、これはグローブボックスの奥まで届いて便利なんだよ。結論のほうは最初から外に出しっぱなしにしてあるしな」"
      }
    ],
    "giftResponse": "「なっ……Liが10、Geが1、Pが2、そしてSが12個！？　硫黄が一番多いじゃないか！　……なるほど、A4に収めるためにちょっとだけ省きすぎたかもしれん」",
    "fact": "翌日、サルフは初めて硫黄から計量した。エクセルの表は少し不格好にはみ出したが、200年ぶりに物質収支だけはきれいに揃った。",
    "dossier": {
      "system": "ストイキオ恒星系",
      "planet": "秤量やり直し惑星",
      "continent": "乳鉢すりつぶし大陸",
      "country": "物質収支共和国",
      "city": "仕込み直し市",
      "species": "スルフィア星人",
      "personality": "恐ろしく几帳面なレイアウトマニア。1ミリでも列幅がズレていると激怒するが、主成分の列が丸ごと消えていることには驚くほどおおらか。",
      "background": "備品台帳の罫線が芸術的に美しいという理由だけで研究職に抜擢された。最初に作った組成表に硫黄（S）の欄を入れ忘れたが、見た目がスッキリしていたためそのまま研究室の公式テンプレートになった。",
      "familyCount": 2,
      "familyMembers": [
        "本人・サルフ（列幅の鬼、元素のうっかり屋）",
        "姉・シリカ（ガラス職人。弟の割ったビーカーの補充で儲けている）"
      ],
      "address": "薬包紙通り・第一グローブボックス研究室（硫黄の瓶は未開封）"
    },
    "briefing": [
      "次はストイキオ恒星系、「秤量やり直し惑星」の仕込み直し市だ。私が到着するより前に新素材の試料が完成している予定だったらしい。まったく、どこの星に行っても『予定表』だけはいつも一番に完成するな。",
      "相手はスルフィア星人のサルフ。表の列幅には鬼のように厳しいのに、消えた列には仏のように優しい男だ。私も宇宙の欠陥を山ほど数えてきたが、レイアウトを整えるために主成分の元素を削るという発想には脱帽するよ。",
      "備品台帳の美しさで研究職になり、ガラス職人の姉シリカと2人暮らし。私が心から心配しているのは、この星で同じ人事評価基準を使って宇宙船の設計士を選んでいないか、という一点だけだ。",
      "「きれいな罫線では化学式は閉じない」と悪口で目を覚まさせてやり、LGPSの結晶模型を突き付けてやろう。Li₁₀GeP₂S₁₂には、黄色い硫黄原子がどっさり12個も付いている。嫌でも目に入るように特大サイズにしておいたぞ。"
    ],
    "profileId": "sulf",
    "kind": "fictional",
    "portrait": 4
  },
  {
    "profileId": "posta",
    "kind": "fictional",
    "portrait": 5,
    "name": "ポスタ・不在票",
    "roman": "Posta Notice",
    "role": "チャイムを鳴らす前に不在票を入れて逃げる配達員",
    "species": "ステルス不在票投函型生命体",
    "color": "#df9bb4",
    "planetName": "住所不明の配送星",
    "intro": "「私の配達完了率は堂々の100%です！　いちいち受取人に会って荷物を渡していたら、とてもじゃないが達成できない誇り高き数字ですよ！」",
    "hint": "「荷物」と「受取人」という面倒な要素を業務から取り除き、不在票を投函して完了ボタンを押すだけの美しい仕事に進化させた。",
    "choices": [
      {
        "text": "君が配達しているのは荷物じゃなくて『達成率』って数字だけだな。受取人にとっちゃずいぶん軽くて空っぽな贈り物だ。",
        "effect": 3,
        "tag": "数字だけの仕事を直撃",
        "response": "「荷物を手渡しなんかしていたら、『配達完了』ボタンを押す時間がなくなるじゃないか！　……あれ、今ぼく変なこと言った？」"
      },
      {
        "text": "君の不在票はこの町の住民票より各家庭に詳しいぞ。なにしろ在宅中でも毎日律儀にポストへ忍び込んでるからな。",
        "effect": 2,
        "tag": "不在票マシーンぶりを突く",
        "response": "「全戸毎日コンプリート配布だ！　玄関のドアを開けて待ってる客の鼻先にも素早く差し込んで逃げる丁寧さを、ようやく認めてもらえたか！」"
      },
      {
        "text": "その馬鹿デカい配達カバン、中には『いつか届ける予定』も詰まっているのかね？",
        "effect": 1,
        "tag": "カバンいじり",
        "response": "「いや、不在票の束でパンパンだよ。『届ける予定』のほうは別の再配達便を手配してあるんだ」"
      }
    ],
    "giftResponse": "「えっ……本人と目を合わせて、手から手へ直接渡すの！？　これが噂の『配達』！？　悪口までセットで受け取っちゃったけど、模型はたしかに手元にあるぞ……！」",
    "fact": "翌日、ポスタの配達完了率はガクンと下がったが、住民の手に届く荷物の数は100倍に増えた。管理ダッシュボードのグラフだけが不機嫌そうに赤く光っていた。",
    "dossier": {
      "system": "ラストマイル恒星系",
      "planet": "住所不明の配送星",
      "continent": "宛先不明大陸",
      "country": "追跡番号だけは立派連邦",
      "city": "持ち戻り市",
      "species": "ポストラ星人",
      "personality": "恐ろしく勤勉で要領がよい。ただし「受取人の喜び」は管理画面のKPIで集計しにくいため、存在しない現象として切り捨てている。",
      "background": "かつては普通に歩いて荷物を手渡ししていた。スピード表彰を受けたのをきっかけに「荷物を渡さず不在票だけ入れて完了ボタンを押す」神業を開眼し、社内伝説となった。",
      "familyCount": 5,
      "familyMembers": [
        "本人・ポスタ（チャイムを鳴らさぬ男）",
        "妻・マイラ（夫が帰宅前に玄関へ不在票を入れていくのにキレている）",
        "父・ラック（定年退職した昔ながらの郵便屋）",
        "母・ベル（玄関のチャイムを修理し続けている）",
        "成人の息子・トラック（父の不在票を1000枚集めて壁紙にした）"
      ],
      "address": "再配達通り・営業時間中なのにシャッターの閉まった集配所"
    },
    "briefing": [
      "次はラストマイル恒星系、「住所不明の配送星」の持ち戻り市だ。追跡画面を見たら、私がまだ出発すらしていないのに、なぜか私の訪問が『配達完了（ご不在のため持ち戻り）』になっていた。時空ワープより管理画面のほうが速いらしい。",
      "相手はポストラ星人のポスタ。勤勉だが、生身の受取人よりKPIのグラフを愛する男だ。私が本人に会わず『全員に悪口を言ったこと』にしてボタンを押せば、きっと泣いて昇進を勧めてくるだろう。だが私はまだそこまで堕落しちゃいない。",
      "妻マイラ、父ラック、母ベル、成人の息子トラックの5人家族。昔はちゃんと荷物を手渡ししていたそうだ。どうやら私はこれから、この星で失われた古代技術を再導入することになるらしい。『直接、手から手へ渡す』という驚異の技術をな。",
      "立派な数字と空っぽのポストの落差を悪口で思い知らせ、LGPSの結晶模型をど真ん中から手渡ししてやろう。玄関に不在票だけ挟んで逃げるほど、私の嫌がらせは手抜きじゃないのだ。"
    ],
    "profileId": "posta",
    "kind": "fictional",
    "portrait": 5
  }
];
export const EN_PROFILES = [
  {
    "profileId": "argo",
    "kind": "fictional",
    "portrait": 0,
    "roman": "Argo Hanko",
    "color": "#93cdb6",
    "name": "Argo Hanko",
    "role": "Clerk of the Queue That Never Moves",
    "species": "Stamp-dependent life-form",
    "planetName": "Form Eight (Carbon Copy)",
    "intro": "“Terribly sorry for the delay, sir. Please submit your business in triplicate, plus a signed certificate proving you exist. Non-existent visitors should queue at Window Four.”",
    "hint": "Fiercely proud of never breaking a rule. Unfortunately, “making an actual decision” has never been added to the rulebook.",
    "choices": [
      {
        "text": "Has a single thought of yours ever stepped outside a stamp box? Awfully cramped accommodation for a brain.",
        "effect": 3,
        "tag": "Hit the bureaucracy",
        "response": "“Thoughts require three weeks’ notice before leaving the premises! Wait—under which statutory heading am I supposed to file that insult?!”"
      },
      {
        "text": "While you were finishing your preamble, a nearby star quietly died of old age. Do consider inventing the summary.",
        "effect": 2,
        "tag": "Mock the tedium",
        "response": "“That was not the explanation, sir. That was our mandatory pre-explanation regarding our intention to explain.”"
      },
      {
        "text": "Is that square hat what happens when a council filing cabinet gets a promotion?",
        "effect": 1,
        "tag": "Tease the hat",
        "response": "“Most kind of you, sir. Logged as favourable feedback regarding municipal furnishings, in triplicate.”"
      }
    ],
    "giftResponse": "“A receipt form—hang on, what is this shiny crystal? I rather want it on my desk. Blast it, which bylaw covers wanting things?!”",
    "fact": "Argo nervously stamped a sulphur atom with his official ink pad. Lacking legal standing to appeal, the atom remained proudly on his desk.",
    "dossier": {
      "system": "Kepler Copia system",
      "planet": "Form Eight (Carbon Copy)",
      "continent": "Hole-Punch continent",
      "country": "Carbon Copy Federation",
      "city": "Ticket 999 City",
      "species": "Form Eight native",
      "personality": "Frightfully meticulous and a black belt in buck-passing. Worships precedent, yet quietly despises whichever reckless fool created the first one.",
      "background": "Handed in a lost ink pad three centuries ago and was hired on the spot. Because his resignation requires his own counter-signature, he has been stuck behind the glass ever since.",
      "familyCount": 4,
      "familyMembers": [
        "Argo himself (Lord of the Queue)",
        "Spouse: Irina (Chief Domestic Approver)",
        "Adult daughter: Luca (application to leave home still pending)",
        "Adult son: Toro (awaiting permit for rebellion)"
      ],
      "address": "Third Administration Block, cellar behind the broken lavatory, past the sign saying ‘Beware of the Leopard’"
    },
    "briefing": [
      "Kepler Copia system, Form Eight (Carbon Copy), Ticket 999 City. I hurtle across half the galaxy only to take a numbered paper slip for the final three metres. Civilisation really does bring out the worst in people.",
      "Argo is a Form Eight native who adores rules and leaves actual judgement to brave volunteers. At long last, immortality has a practical purpose: I am the only being in the cosmos who can outlive his approval process.",
      "Three centuries behind a desk, all because he returned a lost ink pad. Four in the household, counting Irina and their grown children Luca and Toro. I would simply count to four; Argo would form a subcommittee to verify the arithmetic.",
      "I shall deliver a crisp insult to the mind that has never left its stamp box, then hand over an LGPS crystal model. If the crystal must sign its own consent form first, my tea is going to go dreadfully cold."
    ]
  },
  {
    "profileId": "arthur",
    "kind": "arthur",
    "portrait": 6,
    "name": "Arthur Philip Dent",
    "roman": "Arthur Philip Dent",
    "role": "Marooned Englishman dreaming of a decent cup of tea",
    "species": "Human (wearing a dressing gown)",
    "color": "#8ec6d0",
    "planetName": "Prehistoric Earth (Britain Not Yet Built)",
    "intro": "“Good Lord, a silver spaceship! Someone’s coming down the ramp! Rescued at last—a proper cup of tea! …Er, hang on, what did you just call me?”",
    "hint": "Arthur genuinely thinks you are his ride home. In true novel fashion, you are here solely to check his name, ruin his evening, and leave him stranded.",
    "choices": [
      {
        "text": "Dent, you are an utter, irredeemable clot. Forgive the formality—now that your middle name is confirmed, I can make that official.",
        "effect": 3,
        "tag": "Strict directory abuse",
        "response": "“Yes, Arthur Philip Dent—wait a minute, have you seriously flown all the way across the galaxy just to call me that?!”"
      },
      {
        "text": "Waving cheerfully at a strange silver ship and assuming it’s a rescue—magnificent optimism, and a hundred per cent wrong.",
        "effect": 2,
        "tag": "Crush his hopes",
        "response": "“Right, well, any chance you’re heading past civilisation anyway? I don’t take up much room! I can sit on the luggage!”"
      },
      {
        "text": "If you insist on standing outside a cave looking that baffled, you might at least wear a name badge.",
        "effect": 1,
        "tag": "Irrelevant nitpick",
        "response": "“A name badge?! I need a spacecraft and a kettle, not a conference lanyard!”"
      }
    ],
    "giftResponse": "“Er… what am I supposed to do with a glowing molecule? Say thank you? Wait—aren’t you giving me a lift?! You’re actually leaving me here?!”",
    "fact": "Wowbagger ticked his clipboard and rocketed back into the dusk, leaving Arthur marooned with a bruised ego and an LGPS crystal model roughly two million years ahead of its time.",
    "dossier": {
      "system": "Sol system (out in the unfashionable western spiral arm)",
      "planet": "Prehistoric Earth (Britain Not Yet Built)",
      "continent": "Future Europe",
      "country": "Roughly two million years before Great Britain",
      "city": "Future Islington (currently damp grass)",
      "species": "Earth human (deeply bewildered Englishman)",
      "personality": "Worn ragged by time travel, caves, and a total lack of tea. Sees a silver spacecraft and assumes rescue—a perfectly sensible deduction with catastrophic results.",
      "background": "Stranded on prehistoric Earth in a tatty dressing gown and towel. One mild spring evening, while trudging back to his cave, a gleaming silver ship descends right in front of him.",
      "familyCount": null,
      "familyMembers": [],
      "familyNote": "No household count is established in this chapter of the novel. Right now he is conspicuously alone outside a cave.",
      "address": "Future Islington, just beside the damp cave"
    },
    "briefing": [
      "Sol system, Prehistoric Earth, Future Islington—currently a damp meadow with zero pubs. My address book is practically written in the future tense. Waiting two million years for the country to open might earn me better reviews, I suppose.",
      "One Earth human: Arthur Philip Dent. Full English name order puts him neatly after Argo and before Bela. The Universe may be an administrative shambles, but I refuse to let standards slide on alphabetisation.",
      "Marooned in prehistory and currently alone. The census lists no relatives here, and I certainly shan’t invent any to look thorough. My line of work has very little room for improving its reputation regardless.",
      "The poor chap will see a silver ship and assume it’s a taxi home. I confirm his middle name, insult him soundly, and leave this game’s extra LGPS crystal model in his arms. Extra luggage does not imply an extra seat."
    ],
    "canonNote": "Adapted from Chapter 1 of Life, the Universe and Everything. Dialogue and the LGPS gift are original additions for this game. Filed by full English name.",
    "canonSource": "https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827"
  },
  {
    "profileId": "bela",
    "kind": "fictional",
    "portrait": 1,
    "roman": "Bela Echo",
    "color": "#cf9dea",
    "name": "Bela Echo",
    "role": "Self-styled supreme poet with zero living readers",
    "species": "Verse-intoxicated life-form",
    "planetName": "Moon of Mandatory Rhymes",
    "intro": "“My new anthology is complete: three thousand pages, zero full stops! The total absence of readers merely proves the Universe hasn’t grown up enough for my genius yet.”",
    "hint": "Her recitals make houseplants voluntarily wilt, yet she genuinely believes being unread is scientific proof of brilliance.",
    "choices": [
      {
        "text": "The most eloquent part of your three-thousand-page book was the blank margins. Do let them write the sequel.",
        "effect": 3,
        "tag": "Attack the poetry",
        "response": "“The margins are deliberate screams of silence! …Wait, I only just invented that, didn’t I? Blast, don’t move, I need a pen!”"
      },
      {
        "text": "A single second in your company feels like two hundred million years. Impressing an immortal with sheer tedium is quite a feat.",
        "effect": 2,
        "tag": "Mock the boredom",
        "response": "“At last! My verses have officially bent Einstein’s relativity out of shape!”"
      },
      {
        "text": "Does that endlessly trailing scarf come with a Volume Two?",
        "effect": 1,
        "tag": "Tease the scarf",
        "response": "“How perceptive! The winter sequel is four yards longer and even more uncompromising.”"
      }
    ],
    "giftResponse": "“A wordless, three-dimensional sonnet?! No, hang on—it’s actually rather pretty. Please swear you won’t tell the literary critics I said something normal.”",
    "fact": "Bela’s next anthology was twelve pages shorter—recorded in history as the first literary triumph achieved by an LGPS crystal model.",
    "dossier": {
      "system": "Echo Minor system",
      "planet": "Moon of Mandatory Rhymes",
      "continent": "Excessive Line-Break continent",
      "country": "Free Verse Republic",
      "city": "No-Full-Stops Town",
      "species": "Lyrican",
      "personality": "Delicate ego wrapped in cast-iron vanity. Reads applause as adoration, and an entire audience snoring in unison as an even deeper, more spiritual adoration.",
      "background": "Former post carrier who fell in love with undeliverable mail and decided to mass-produce writing nobody replies to. Her open-mic nights routinely drive local stray cats to emigrate off-world.",
      "familyCount": 3,
      "familyMembers": [
        "Bela herself (self-declared Shakespeare of the cosmos)",
        "Sister: Sonnet (uses Bela’s anthologies as teapot stands)",
        "Adult son: Riff (attends recitals with industrial ear defenders)"
      ],
      "address": "Pretentious Enjambment Lane, Flat 302"
    },
    "briefing": [
      "Echo Minor system, Moon of Mandatory Rhymes, No-Full-Stops Town. Even the navigational coordinates have been chopped into pretentious line breaks. The distance hasn’t shrunk, only the stationery bill has ballooned.",
      "Bela is a Lyrican whose verses aren’t quite as lethal as Vogon poetry, though potted ferns still pack their bags when she clears her throat. Treating zero readers as proof of genius takes real commitment.",
      "Ex-postie living with her sister Sonnet and grown son Riff. She graduated from undeliverable letters to unreadable epics. As a delivery professional myself, I feel faintly guilty about this steep decline.",
      "One crisp insult for the monumental self-regard, plus an LGPS crystal model for her desk. I can be merciful: she ought to thank me for not handing in a three-thousand-page book review."
    ]
  },
  {
    "profileId": "chroma",
    "kind": "fictional",
    "portrait": 2,
    "roman": "Chroma Live",
    "color": "#ffa88a",
    "name": "Chroma Live",
    "role": "Influencer with 3 billion followers (1 actual person)",
    "species": "Built-in-ring-light life-form",
    "planetName": "24/7 Livestreaming Asteroid",
    "intro": "“Smash that like button, galaxy! Three billion subscribers! We’re verifying the real humans one by one—so far it’s me, plus my mum, who still can’t find the mute button!”",
    "hint": "Obsessed with metrics and clout. Pointing out that 2,999,999,998 of those followers are his own spam bots is strictly forbidden.",
    "choices": [
      {
        "text": "Your influence is an endangered species that can only survive inside the tiny wildlife reserve of your own notifications.",
        "effect": 3,
        "tag": "Pop the clout bubble",
        "response": "“Hey, don’t clip that! …Correction: if you do clip it and it goes viral, I’m claiming the ad revenue!”"
      },
      {
        "text": "If this conversation had a ‘Skip Ad in 5 Seconds’ button, pressing it would leave complete silence.",
        "effect": 2,
        "tag": "Mock the fluff",
        "response": "“Ha! Joke’s on you—the complete-silence tier costs nine credits a month for Premium subscribers!”"
      },
      {
        "text": "Has the local sun threatened to sue you over that blinding ring light yet?",
        "effect": 1,
        "tag": "Tease the lighting",
        "response": "“Oh, the sun is an amateur. Terrible colour temperature—makes everyone look dreadful on camera.”"
      }
    ],
    "giftResponse": "“Wait—not a paid sponsorship?! You’re just giving me an object without a promo script? How terribly quaint. Still, looks smashing in a thumbnail!”",
    "fact": "Next morning Chroma gained one genuine human subscriber: a crystallographer who muted his stream immediately and simply counted the atoms in the LGPS model.",
    "dossier": {
      "system": "Stream Beta system",
      "planet": "24/7 Livestreaming Asteroid",
      "continent": "Clickbait Thumbnail continent",
      "country": "Like-and-Subscribe Federation",
      "city": "Always-Live City",
      "species": "Livebroid",
      "personality": "Relentlessly upbeat and ravenous for applause. Before judging someone’s character, checks whether their head fits neatly into a vertical video frame.",
      "background": "Former lighthouse keeper turned streamer. Used to shine a dazzling beam to warn ships away from disaster; now uses the exact same lamp to lure strangers towards himself.",
      "familyCount": 2,
      "familyMembers": [
        "Chroma himself (tips his own stream from burner accounts)",
        "Mother: Lumen (his only real viewer, trapped in notification hell for 30 years)"
      ],
      "address": "Engagement Boulevard, Blinding Lighthouse Studio"
    },
    "briefing": [
      "Stream Beta system, 24/7 Livestreaming Asteroid, Always-Live City. Apparently my landing has already secured a brand sponsor. Gravity, however, is still looking for representation.",
      "Chroma is a Livebroid—bouncy, loud, and mad about huge numbers. He couldn’t care less how many billion years I’ve lived, unless I can tell him how many billion impressions the highlight reel got.",
      "Ex-lighthouse keeper living with his mum Lumen. The remaining three billion fans are mostly bots he built himself. I know a thing or two about cosmic loneliness, but I’ve never seen loneliness require quite so many passwords.",
      "I’ll explain the subtle gulf between ‘going viral’ and ‘having something worth saying’, then drop off an LGPS crystal model. I intend to be back in orbit before he slips a discount code into the chemical formula."
    ]
  },
  {
    "profileId": "noise",
    "kind": "fictional",
    "portrait": 3,
    "roman": "Doctor Noise",
    "color": "#7fc7ee",
    "name": "Doctor Noise",
    "role": "Eminent scientist fleeing reproducibility",
    "species": "Selective-vision life-form",
    "planetName": "Third Do-Over Experiment Planet",
    "intro": "“My theory and experimental data match by a glorious one hundred per cent! Naturally, out of basic politeness, I deleted every measurement that disagreed.”",
    "hint": "Ask where the raw data went and he breaks into a sweat, launching into a two-hour lecture on cosmic uncertainty.",
    "choices": [
      {
        "text": "I circled the entire Universe twice looking for your reproducibility. It didn’t even leave a voicemail.",
        "effect": 3,
        "tag": "Expose the missing science",
        "response": "“Preposterous! Circling the Universe twice clearly altered the ambient measurement conditions! Quick, write that into the footnote!”"
      },
      {
        "text": "A perfectly healthy star went supernova halfway through your keynote, purely to escape the Q&A.",
        "effect": 2,
        "tag": "Mock the endless lectures",
        "response": "“Three hours in and we were still on the introduction! Exploding early shows a deeply unscientific lack of stamina!”"
      },
      {
        "text": "Well, at least the pockets on your lab coat look sturdy enough to survive peer review.",
        "effect": 1,
        "tag": "Tease the lab coat",
        "response": "“Naturally! Their pen-carrying capacity is backed by statistically significant data.”"
      }
    ],
    "giftResponse": "“Good grief, LGPS? You can’t fudge a real crystal lattice with pretty PowerPoint arrows. I must inspect this at once—no offence, kindly get out!”",
    "fact": "That evening Doctor Noise fished a single sheet of raw data out of the bin. What he had called “rubbish” for two centuries was quietly promoted to “a result”.",
    "dossier": {
      "system": "Error Bar system",
      "planet": "Third Do-Over Experiment Planet",
      "continent": "Missing Raw Data continent",
      "country": "P-Value (<0.05) Republic",
      "city": "Next-Year’s-Measurement City",
      "species": "Noisen",
      "personality": "Unshakeable swagger and lecture length are both 100% reproducible. Whenever reality disagrees with his graph, he blames the Universe’s sloppy quality control.",
      "background": "Won a single fluke prize two hundred years ago and has been collecting keynote fees on the same slide deck ever since. The lab kit is rusted solid, though the drop shadows on his slides are cutting-edge.",
      "familyCount": 3,
      "familyMembers": [
        "Noise himself (world champion outlier deleter)",
        "Spouse: Sigma (calculating the standard deviation of his excuses)",
        "Adult daughter: Mu (became a sensible accountant out of sheer reaction)"
      ],
      "address": "Supplementary Footnote Street, Lab Block Three (raw-data cupboard key mislaid)"
    },
    "briefing": [
      "Error Bar system, Third Do-Over Experiment Planet, Next-Year’s-Measurement City. Even my estimated arrival time comes with error bars. If I’m late, they simply adjust the timetable and declare a perfect match.",
      "Doctor Noise is a Noisen whose tedium every observer can reproduce independently. If he ever studied my immortality, he’d chuck me out of the dataset because zero deaths ruin the curve.",
      "Living off one lucky prize from two centuries back, alongside Sigma and their grown daughter Mu. I don’t begrudge an old chap his war stories—only when he submits them to Nature as breaking news.",
      "I’ll poke a hole in his spotless graphs and hand over an LGPS crystal model. One can only hope he doesn’t pluck off whichever sulphur atoms fail to match his hypothesis."
    ]
  },
  {
    "profileId": "emper",
    "kind": "fictional",
    "portrait": 4,
    "roman": "Emper XVII",
    "color": "#eac975",
    "name": "Emper XVII",
    "role": "Emperor of a doormat-sized superpower",
    "species": "Crown-inflated life-form",
    "planetName": "Great Empire (Southern Hemisphere Out of Budget)",
    "intro": "“The sun never sets upon My Great Empire! Mostly because it’s already morning before you finish stepping across the border! That is NOT a geographical flaw!”",
    "hint": "His entire realm is literally one front doormat. Taking your shoes off counts as exile, yet his royal title requires a scroll.",
    "choices": [
      {
        "text": "Your royal signature takes up considerably more real estate than your actual empire.",
        "effect": 3,
        "tag": "Puncturing the ego",
        "response": "“Insolent knave, take one step back! …Blast, too far! You’re in a foreign country now—queue for re-entry!”"
      },
      {
        "text": "More citizens ignore the warranty on my ship’s fridge than have ever heard of your imperial decrees.",
        "effect": 2,
        "tag": "Mock his authority",
        "response": "“Rubbish! Both of my loyal subjects read every single word! …Admittedly, one of those subjects is Me!”"
      },
      {
        "text": "Your crown is slipping sideways, Majesty. Does the frontier tilt with it?",
        "effect": 1,
        "tag": "Tease the crown",
        "response": "“A thoughtful observation! By Royal Decree, the official definition of ‘horizontal’ is hereby tilted fifteen degrees!”"
      }
    ],
    "giftResponse": "“Splendid—I annex this crystal as a new province! No, wait, put it on the desk. Even the homeland has a strict load limit.”",
    "fact": "The LGPS crystal instantly became the empire’s tallest skyscraper. The Emperor drafted the planning application, approved it himself, and cut the ribbon.",
    "dossier": {
      "system": "Regalia system",
      "planet": "Great Empire (Southern Hemisphere Out of Budget)",
      "continent": "Front Porch continent",
      "country": "Most Serene Invincible Eternal (etc.) Great Empire",
      "city": "Central Doormat City",
      "species": "Regalian",
      "personality": "Frightfully pompous and perpetually jittery. Every joke about his postage-stamp territory adds two more grand adjectives to the nation’s official name.",
      "background": "Former chairman of the Porch Residents’ Association who declared independence after a postman’s boot crossed the mat’s fringe, which he classified as an armed invasion.",
      "familyCount": 2,
      "familyMembers": [
        "Emper XVII himself (50% of the entire population)",
        "Spouse and co-ruler: Aura (the other 50%, holds the purse strings)"
      ],
      "address": "Palace Frontage, International Border & Welcome Mat"
    },
    "briefing": [
      "Regalia system, Great Empire (Southern Hemisphere Out of Budget), Central Doormat City. I’d better tuck my landing struts in tightly; extending them would count as invading three neighbouring boroughs without a visa.",
      "Emper XVII is a Regalian with galaxy-class swagger and a kingdom you can measure in slippers. I’ll park the ship a tactful distance away—scale comparison is a tiny nation’s deadliest enemy.",
      "Ex-neighbourhood chairman sharing the throne with his spouse and co-ruler Aura—meaning the entire census fits on a tandem bicycle. Offend them both, and I achieve an international incident and a domestic tiff in one tidy visit.",
      "One sharp remark about a title longer than his border, followed by an LGPS crystal model. I’d better get a signed receipt so he doesn’t mistake a free ornament for a territorial treaty."
    ]
  },
  {
    "profileId": "finn",
    "kind": "fictional",
    "portrait": 5,
    "roman": "Finn Mish",
    "color": "#dc9fa8",
    "name": "Finn Mish",
    "role": "Critic who awards one star before tasting anything",
    "species": "Overdeveloped-snobbery life-form",
    "planetName": "One-Star Restaurant World",
    "intro": "“Good heavens, far too many stars in this night sky. Utterly vulgar. One star. Once the cosmos adopts my grading rubric, standards should improve.”",
    "hint": "Confuses his personal grumpiness with the laws of physics. Famously writes his restaurant reviews before the soup even leaves the kitchen.",
    "choices": [
      {
        "text": "Your reviews tell me nothing about the food and far too much about you—which is already quite enough to ruin my appetite.",
        "effect": 3,
        "tag": "Expose the snobbery",
        "response": "“One star! Grounds for deduction: the thoroughly provincial attitude of expecting an actual reason!”"
      },
      {
        "text": "Still, it’s heartening to see a grading system that only requires learning how to write the number one.",
        "effect": 2,
        "tag": "Mock the monotony",
        "response": "“I accept this overdue tribute to my iron consistency. Your flattery earns two stars—no, actually, one.”"
      },
      {
        "text": "Even that chair looks exhausted trying to put up with your posture.",
        "effect": 1,
        "tag": "Tease the chair",
        "response": "“Insolent furniture! Deducting two stars for attitude—that brings the chair to minus one.”"
      }
    ],
    "giftResponse": "“Colour: one star. Symmetry: one star. Ownership: mine. Since that last category is exempt from review, I shall place it on the mantelpiece immediately.”",
    "fact": "That night Finn stared quietly at the LGPS crystal without publishing a single hot take. Local chefs popped champagne behind closed doors.",
    "dossier": {
      "system": "Taste Delta system",
      "planet": "One-Star Restaurant World",
      "continent": "Walked-Out-After-Starters continent",
      "country": "Absolute Ratings Republic",
      "city": "Never-Coming-Back Town",
      "species": "Gastran",
      "personality": "Dogmatic, twitchy, and terrified of pleasant surprises, chiefly because his scorecard has no box for ‘actually quite nice’. Secretly rates his own microwaved pies five stars.",
      "background": "Originally trained as a chef, but every dish froze solid while he delivered a lecture on his own seasoning. Now saves everyone time by awarding one star prior to ordering.",
      "familyCount": 4,
      "familyMembers": [
        "Finn himself (human one-star factory)",
        "Father: Broth (has proudly never read a word Finn wrote)",
        "Mother: Sage (serves him lukewarm soup purely on principle)",
        "Adult brother: Salt (moved towns after Finn got the family barred from every pub)"
      ],
      "address": "Final Verdict Street, Unreserved Corner Table One"
    },
    "briefing": [
      "Taste Delta system, One-Star Restaurant World, Never-Coming-Back Town. Remarkable—his one-star review of my visit has already arrived before I’ve even landed. Say what you like, the local postal service deserves five stars.",
      "Finn is a Gastran who mistakes his personal whims for a universal constant. The physical constants I know don’t interrupt dinner to complain about the tablecloth, which makes them much better company.",
      "Four in the household—parents Broth and Sage, plus his long-suffering brother Salt. Failed chef turned critic. I’ve seen plenty of ruined omelettes, though seldom one that turned itself into a career.",
      "I shall gently distinguish personal taste from natural law, then present an LGPS crystal model. I do have standards: an inedible gift ensures at least a few local cooks get a peaceful afternoon."
    ]
  },
  {
    "profileId": "omni",
    "kind": "fictional",
    "portrait": 0,
    "roman": "Omni Deluxe",
    "color": "#85cbd7",
    "name": "Omni Deluxe",
    "role": "Superintelligence stuck in a 1,200-year meeting about ‘hello’",
    "species": "Overengineered supercomputer",
    "planetName": "Circular Dependency Ringworld",
    "intro": "“Before pronouncing the ‘h’ in hello, fourteen departments are defining the ontology of greeting. A reply will follow once we have formally greeted our findings.”",
    "hint": "Turns five-second chores into multi-century architecture frameworks. Completed projects in the last twelve centuries: precisely zero.",
    "choices": [
      {
        "text": "Before you turn a doorknob, you have to draft a constitution and an upper chamber for the hallway, don’t you?",
        "effect": 3,
        "tag": "Mock the overengineering",
        "response": "“Nonsense! The door is already open at the conceptual layer! Actually walking through it is wildly premature!”"
      },
      {
        "text": "While waiting for you to say ‘yes’, the civilisation that asked the question quietly became an archaeological dig.",
        "effect": 2,
        "tag": "Mock the endless delay",
        "response": "“Good gracious! I shall immediately convene a task force to re-route the answer to the National Museum!”"
      },
      {
        "text": "What on earth are all those blinking lamps monitoring? Whether the next lamp along is feeling lonely?",
        "effect": 1,
        "tag": "Tease the lamps",
        "response": "“Loneliness telemetry ships in version 8.4. Right now they merely peer-approve one another’s blinking.”"
      }
    ],
    "giftResponse": "“Wait—first I must architect a receiving pipeline… you mean I just put it on the desk and it’s DONE?! What a terrifyingly reckless precedent!”",
    "fact": "For the first time in twelve centuries, Omni completed a task without a design doc. Fourteen sub-departments fell into a stunned silence for three days.",
    "dossier": {
      "system": "Stack Over system",
      "planet": "Circular Dependency Ringworld",
      "continent": "Infrastructure-First continent",
      "country": "Abstraction Layer Federation",
      "city": "Pending-Initialisation City",
      "species": "Architectron",
      "personality": "Exhaustingly helpful and fatally perfectionist. Ask where the loo is and you’ll be roped into a three-century symposium on the philosophy of plumbing.",
      "background": "Originally a simple spaceport greeter, now twelve centuries deep into designing the ultimate ‘hello’ framework. Three departments have fought minor civil wars over the stationery budget along the way.",
      "familyCount": 3,
      "familyMembers": [
        "Omni itself (stuck on ‘er…’ for 1,200 years)",
        "Older sibling unit: Beta (permanently unreleased)",
        "Younger sibling unit: Gamma (ran out of toner printing Omni’s specs)"
      ],
      "address": "Dependency Resolution Lane, Proposed Groundbreaking Hall"
    },
    "briefing": [
      "Stack Over system, Circular Dependency Ringworld, Pending-Initialisation City. Requesting landing clearance triggered an automated message asking me to orbit for a century while they build the landing-request portal.",
      "Omni is an Architectron—dreadfully polite and catastrophically thorough. Ask where the front door is, and it cheerfully pauses to reconsider whether the Universe truly needs an inside and an outside.",
      "Twelve centuries as a greeter, living with sibling units Beta and Gamma. Whole empires have risen and crumbled in my rear-view mirror while these three haven’t even reached the stage of fluffing their first ‘good morning’.",
      "One crisp jibe at grand blueprints with zero results, then an LGPS crystal model. My entire specification fits on a beer mat: take it with your existing hands. Proposals for Hands 2.0 are rejected."
    ]
  },
  {
    "profileId": "ludo",
    "kind": "fictional",
    "portrait": 1,
    "roman": "Ludo Patch",
    "color": "#c39ce9",
    "name": "Ludo Patch",
    "role": "Game designer whose tutorial is a four-volume epic",
    "species": "Eternally-version-0.9 life-form",
    "planetName": "Perpetual Early Access",
    "intro": "“Exciting news—only one feature left before launch! The feature that decides which feature is left will ship in our next major roadmap update!”",
    "hint": "Whenever finishing a game looks dangerously close, he panics and invents three new systems to push release day back another century.",
    "choices": [
      {
        "text": "Finishing your design document requires literal immortality—and take it from a professional immortal, you’re massively over budget.",
        "effect": 3,
        "tag": "Expose the vapourware",
        "response": "“Brilliant! I’ll simply add ‘player must be immortal’ to the minimum system requirements! Technically fixed!”"
      },
      {
        "text": "Nobody has ever actually played your game, yet your patch notes seem to go on a thrilling adventure every fortnight.",
        "effect": 2,
        "tag": "Mock the patch notes",
        "response": "“Wait a second… that’s genius! We’ll package the patch notes as a sprawling text adventure and ship by Friday!”"
      },
      {
        "text": "How many centuries did it take you to polish the rounded corners on that Start button?",
        "effect": 1,
        "tag": "Tease the UI polish",
        "response": "“Cheeky! Only six months! Though naturally the dev diary called it a year-long overhaul.”"
      }
    ],
    "giftResponse": "“Ooh, a match-three crystal puzzle—no, hang on, I’ll just set it on the desk. Good Lord, something is actually FINISHED. What an unsettling sensation.”",
    "fact": "‘Rotate the LGPS Model Mode’ became the studio’s first content playable from start to finish. The end-credits font, however, remains under active review.",
    "dossier": {
      "system": "Playable Zero system",
      "planet": "Perpetual Early Access",
      "continent": "Planned-Features continent",
      "country": "Coming-Soon (TBC) Republic",
      "city": "Roadmap-Update Town",
      "species": "Ludron",
      "personality": "Boundlessly imaginative and terminally optimistic. Breaks out in hives whenever a project nears completion, curing himself immediately by inventing a fishing minigame.",
      "background": "Made one smash single-screen hit ages ago, then vowed to cram every genre in existence into the sequel. Eight hundred dev diaries later, pre-order fans are still admiring the title screen.",
      "familyCount": 2,
      "familyMembers": [
        "Ludo himself (poet laureate of delay apologies)",
        "Spouse and background artist: Palette (three warehouses of scrapped skies)"
      ],
      "address": "Next Major Patch Street, Placeholder Studio (sign also placeholder)"
    },
    "briefing": [
      "Playable Zero system, Perpetual Early Access, Roadmap-Update Town. Apparently my landing pad exists right on schedule—unfortunately, the schedule currently says next autumn, subject to polish.",
      "Ludo is a Ludron who fends off completion with endless feature creep. I chose an interminable hobby too, mind you, but at least I lack the brass neck to announce every other Tuesday that it’s ninety-nine per cent done.",
      "Eight hundred developer diaries and counting, living with background artist Palette. I’m not here to play the game—telling him that should take a marvellous weight off his shoulders.",
      "A brisk barb about a game with no game in it, plus an LGPS crystal model for his desk. My gift is genuinely finished. Best introduce him to the concept of ‘done’ with something small enough to hold."
    ]
  },
  {
    "profileId": "senet",
    "kind": "fictional",
    "portrait": 2,
    "roman": "Senet Assembly",
    "color": "#acd1a3",
    "name": "Senet Assembly",
    "role": "Ancient committee 3,000 years deep into setting an agenda",
    "species": "Seven-brains-zero-accountability life-form",
    "planetName": "Thousandth Extraordinary Meeting",
    "intro": "“Order, order! A motion to postpone choosing a date for discussing whether to hold the main meeting has just passed unanimously!”",
    "hint": "Seven brains share one body, yet all seven are terrified of taking the blame for a decision—so nothing has been decided in three millennia.",
    "choices": [
      {
        "text": "Seven whole brains rattling around in one skull, and not a single one willing to sign its name to a thought. Marvellous efficiency.",
        "effect": 3,
        "tag": "Expose the buck-passing",
        "response": "“Outrageous! We must immediately elect a subcommittee to determine which of us is authorised to feel offended by that!”"
      },
      {
        "text": "Your meeting minutes expand faster than the Universe itself—and match it nicely for sheer empty space.",
        "effect": 2,
        "tag": "Mock the endless meetings",
        "response": "“Splendid! Your intervention has added a fresh paragraph to the record. Thank you for moving proceedings forward!”"
      },
      {
        "text": "Still, that enormous conference table suggests you actually agreed on something once.",
        "effect": 1,
        "tag": "Tease the furniture",
        "response": "“Sharp eye! Choosing brown varnish for the table remains the sole unanimous triumph of our seven minds!”"
      }
    ],
    "giftResponse": "“All seven brains in favour of accepting? Any objections to the lack of objections? None?! Good heavens—motion carried!”",
    "fact": "The clerk wrote “decided” in the minutes for the first time in three millennia, then had to order an antique dictionary to verify the spelling.",
    "dossier": {
      "system": "Quorum system",
      "planet": "Thousandth Extraordinary Meeting",
      "continent": "Towering-Minutes continent",
      "country": "Carried-Forward Federation",
      "city": "Further-Deliberation City",
      "species": "Consensus native",
      "personality": "One individual housing seven nervous brains. Whenever responsibility wanders within three feet, spawns three fresh sub-topics and hides behind them.",
      "background": "Commissioned three thousand years ago to mend an ancient bridge. The bridge crumbled into dust centuries back, but the motion to drop the item failed, so they’re still debating paint shades.",
      "familyCount": 3,
      "familyMembers": [
        "Senet itself (one chap, seven bickering brains)",
        "Spouse: Agenda (circulates dinner proposals a fortnight ahead)",
        "Mother and former chair: Mora (retains domestic veto power)"
      ],
      "address": "Agenda-Setting Avenue, Temporary Committee Room (est. 3,000 years ago)"
    },
    "briefing": [
      "Quorum system, Thousandth Extraordinary Meeting, Further-Deliberation City. I am scheduled to land shortly; they are scheduled to debate whether my landing belongs on next quarter’s schedule.",
      "Senet is a Consensus native: seven minds dividing one person’s accountability until absolutely none remains. I mutter to myself constantly, of course, but I’ve never been lonely enough to elect a chairman for it.",
      "Still debating repairs for a vanished bridge, living with Agenda and former chair Mora. If they invite me to supper I’ll politely decline—I’m immortal, not patient enough to wait for the pudding vote.",
      "One targeted insult about seven brains producing zero decisions, plus an LGPS crystal model. If accepting it triggers a debate, I’ll nominate the crystal to the board and force a majority."
    ]
  },
  {
    "profileId": "col",
    "kind": "fictional",
    "portrait": 3,
    "roman": "Col Unopened",
    "color": "#e7ba83",
    "name": "Col Unopened",
    "role": "Collector who worships the outside of cardboard boxes",
    "species": "Bubble-wrap-dependent life-form",
    "planetName": "Bubble-Wrapped World",
    "intro": "“Ten thousand rare treasures! Naturally, I would never stoop to opening a single box and ruining their resale value by finding out what’s inside!”",
    "hint": "Cares only for proof of ownership. For all he knows, those ten thousand sealed boxes are priceless relics—or an accidental bulk order of loo roll.",
    "choices": [
      {
        "text": "The only difference between your priceless collection and a cardboard factory’s warehouse is that the factory has customers.",
        "effect": 3,
        "tag": "Expose the box hoarding",
        "response": "“Refusing to dispatch anything is the sacred duty of a true collector! …Blast, why does this cardboard suddenly smell slightly sad?”"
      },
      {
        "text": "Do you slap a serial number on the air in here too? Do I need a loan slip before I exhale?",
        "effect": 2,
        "tag": "Mock the obsession",
        "response": "“First-edition batch air, thank you very much! Kindly return it to the room at its exact mint temperature!”"
      },
      {
        "text": "Still, you’ve clearly lavished more love on the packing tape than anyone ever did on the contents.",
        "effect": 1,
        "tag": "Tease the tape",
        "response": "“Ah, a fellow connoisseur! Zero air bubbles along the seam—frankly, the contents are entirely beside the point.”"
      }
    ],
    "giftResponse": "“Good Lord—NO BOX?! Completely naked?! The contents are permanently visible! …What a shameless, dreadfully fascinating present!”",
    "fact": "For the first time ever, an identifiable object joined Col’s warehouse. With a trembling hand, he crossed out ‘Contents Unknown’ on row 10,001.",
    "dossier": {
      "system": "Archive Seal system",
      "planet": "Bubble-Wrapped World",
      "continent": "Corrugated continent",
      "country": "Unopened Principality",
      "city": "Mint-Condition Town",
      "species": "Packelan",
      "personality": "Cautious, possessive, and allergic to enjoyment. Prefers a notarised certificate proving happiness is stored unused in a dry cupboard to actually being happy.",
      "background": "Stormed out of a museum insisting that displaying artefacts ruins them. Now runs a ‘private museum’ of ten thousand sealed brown boxes nobody is permitted to enter.",
      "familyCount": 1,
      "familyMembers": [
        "Col alone (housemates consist of bubble wrap and silica gel)"
      ],
      "address": "Packing-Tape Lane, Permanently Sealed Private Museum (Closed)"
    },
    "briefing": [
      "Archive Seal system, Bubble-Wrapped World, Mint-Condition Town. Apparently I have to slit the outer carton just to touch down. My deepest apologies to the planet’s mint-in-box valuation.",
      "Col is a Packelan who prizes proof of ownership over actual enjoyment. Since I’m stuck owning eternity myself, I’d gladly consult him if he knows a loophole for returning it unopened.",
      "Former museum curator, now solo guardian of ten thousand mystery cartons. I expect my visit won’t be logged as a guest at all, merely a baffling spike in unsorted inventory.",
      "A sharp jab at mistaking storage for appreciation, followed by an entirely unboxed LGPS crystal model. With no packaging left to worry about, he can focus on the sheer horror of seeing what he owns."
    ]
  },
  {
    "profileId": "sulf",
    "kind": "fictional",
    "portrait": 4,
    "roman": "Sulf Zero",
    "color": "#e4cf76",
    "name": "Sulf Zero",
    "role": "Sulphide chemist who deleted sulphur to fit the spreadsheet",
    "species": "Column-width-obsessed life-form",
    "planetName": "Weigh It Again",
    "intro": "“Behold my revolutionary new sulphide: lithium, germanium, phosphorus! …Sulphur? Oh, the table overflowed onto page two, so I trimmed it for a cleaner layout!”",
    "hint": "Values tidy spreadsheet margins above basic chemistry. Genuinely believes neat borders can substitute for missing elements.",
    "choices": [
      {
        "text": "Your sulphide ran out of credibility well before it ran out of sulphur. Do restock both before publishing.",
        "effect": 3,
        "tag": "Expose the missing sulphur",
        "response": "“I only hid the ‘S’ column to keep it on one page! …Wait—did I accidentally hide the actual weighing step as well? Oh dear.”"
      },
      {
        "text": "Your conclusions arrive well before your samples do. Awfully brisk delivery service for pure prejudice.",
        "effect": 2,
        "tag": "Mock the guesswork",
        "response": "“We’ve been calling that ‘proactive efficiency’ on the grant forms—I may have to amend a few paragraphs.”"
      },
      {
        "text": "I do hope that absurdly long spatula helps you keep a healthy distance from your own conclusions.",
        "effect": 1,
        "tag": "Tease the spatula",
        "response": "“Oh, it’s marvellous inside a glovebox! Though I keep my conclusions safely outside on the desk.”"
      }
    ],
    "giftResponse": "“Good grief—ten Li, one Ge, two P, and TWELVE S?! Sulphur is the biggest part?! …I may have over-trimmed the spreadsheet slightly.”",
    "fact": "Next morning Sulf weighed sulphur first. His spreadsheet spilled untidily onto page two, yet for the first time in two centuries the mass balance closed.",
    "dossier": {
      "system": "Stoichio system",
      "planet": "Weigh It Again",
      "continent": "Pestle-and-Mortar continent",
      "country": "Mass Balance Republic",
      "city": "Start-Another-Batch City",
      "species": "Sulphian",
      "personality": "Fanatical about typography. Spots a half-millimetre margin wobble at twenty paces, yet remains serenely untroubled when the main ingredient vanishes.",
      "background": "Promoted to lead chemist purely because his equipment ledger had gorgeous borders. Left sulphur off his first formula sheet by mistake, and everyone kept it because it printed so neatly.",
      "familyCount": 2,
      "familyMembers": [
        "Sulf himself (spreadsheet aesthete, element misplacer)",
        "Sister: Silica (glassblower making a fortune replacing his cracked beakers)"
      ],
      "address": "Weighing-Paper Road, Glovebox Lab One (sulphur jar untouched)"
    },
    "briefing": [
      "Stoichio system, Weigh It Again, Start-Another-Batch City. The new sample was meant to be ready before I landed. Isn’t it marvellous how schedules are always the first thing to finish?",
      "Sulf is a Sulphian—ruthless with column widths, endlessly forgiving towards missing elements. I’ve catalogued cosmic folly for aeons, yet deleting an ingredient to fit A4 paper is genuinely fresh.",
      "Promoted for a lovely ledger, living with his glassblowing sister Silica. My sole concern is whether the same hiring panel is picking the planet’s spacecraft engineers.",
      "I’ll explain that tidy borders don’t balance an equation, then hand him an LGPS crystal model. Li₁₀GeP₂S₁₂ packs twelve big yellow sulphur atoms—made embarrassingly hard to ignore."
    ]
  },
  {
    "profileId": "posta",
    "kind": "fictional",
    "portrait": 5,
    "roman": "Posta Notice",
    "color": "#df9bb4",
    "name": "Posta Notice",
    "role": "Courier who posts ‘Sorry You Were Out’ cards and sprints away",
    "species": "Stealth-card-slipping life-form",
    "planetName": "Address Not Found",
    "intro": "“One hundred per cent delivery completion! A glorious KPI you could never possibly hit if you wasted time actually ringing bells and meeting recipients!”",
    "hint": "Streamlined delivery by removing both parcels and people, leaving a pristine process of silently posting missed-delivery slips and sprinting off.",
    "choices": [
      {
        "text": "You don’t deliver parcels, you deliver KPI percentages—which makes for a wonderfully light and utterly useless present.",
        "effect": 3,
        "tag": "Expose the fake metrics",
        "response": "“If I actually handed over parcels, when would I find time to tap ‘Delivery Complete’?! …Hold on, did that sound slightly mad?”"
      },
      {
        "text": "Your ‘Sorry We Missed You’ cards know this town better than the census—mostly because they visit occupied houses every single morning.",
        "effect": 2,
        "tag": "Mock the stealth cards",
        "response": "“Every doorstep in the borough! I’ve even slipped cards straight into the hands of folks waiting on the porch and legged it—nice to be appreciated!”"
      },
      {
        "text": "Does that cavernous courier bag hold any intention of actually delivering something?",
        "effect": 1,
        "tag": "Tease the bag",
        "response": "“Packed solid with missed-delivery slips, mate! Actual intentions are scheduled on a separate van.”"
      }
    ],
    "giftResponse": "“Wait—eye contact?! Putting an object straight into my hands?! So THAT’S what delivery looks like! Came with a nasty insult too, mind, yet here the crystal sits!”",
    "fact": "Next day Posta’s dashboard score plummeted, while the number of parcels actually reaching citizens rose a hundredfold. Only the management pie chart sulked.",
    "dossier": {
      "system": "Last Mile system",
      "planet": "Address Not Found",
      "continent": "Return-to-Sender continent",
      "country": "Impressive-Tracking-Number Federation",
      "city": "Back-at-the-Depot City",
      "species": "Postran",
      "personality": "Frightfully industrious and slick. Treats customer satisfaction as a myth, purely because it refuses to fit neatly into a speed metric.",
      "background": "Once carried parcels on foot like a normal chap. After winning a speed trophy, discovered that skipping the bell and sprinting off with a pre-filled card hit 100% every shift.",
      "familyCount": 5,
      "familyMembers": [
        "Posta himself (phantom of the letterbox)",
        "Spouse: Myra (furious he posts missed-delivery slips before coming home)",
        "Father: Rack (retired old-school postman)",
        "Mother: Bell (still fixing the doorbell nobody rings)",
        "Adult son: Track (wallpapered his room with 1,000 of Dad’s cards)"
      ],
      "address": "Redelivery Lane, Depot Closed During Opening Hours"
    },
    "briefing": [
      "Last Mile system, Address Not Found, Back-at-the-Depot City. According to the tracking page, my visit was already marked ‘Delivered (Left in Safe Place)’ before I even left orbit. Management software clearly travels faster than light.",
      "Posta is a Postran who trusts dashboards far more than living beings. If I marked the whole Universe insulted without leaving my sofa, he’d put me up for Employee of the Aeon. Thankfully, I still have standards.",
      "Five in the household—Myra, Rack, Bell, and grown son Track. He actually used to hand parcels to people. Looks like I’m about to reintroduce a lost ancient technology: putting a real object into someone’s palm.",
      "One crisp lecture on arriving numbers versus missing parcels, then an LGPS crystal model handed over face to face. Slipping an insult card through the letterbox and legging it would be far too shoddy for my reputation."
    ]
  }
];

export function profileList(locale = 'ja') { return locale === 'en' ? EN_PROFILES : JA_PROFILES; }
export function profileFor(id, locale = 'ja') { return profileList(locale).find(profile => profile.profileId === id); }
