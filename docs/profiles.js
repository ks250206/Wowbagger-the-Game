/** Authored bilingual dossiers. Canonical geography is deliberately qualified. */
export const LEGACY_ORDER = ["argo", "bela", "chroma", "noise", "emper", "finn", "omni", "ludo", "senet", "col", "sulf", "posta"];
export const JA_PROFILES = [
  {
    "name": "アルゴ・ハンコ",
    "roman": "Argo Hanko",
    "role": "第七銀河の窓口係",
    "species": "官僚型生命体",
    "color": "#93cdb6",
    "planetName": "惑星・様式第八号",
    "intro": "「ご用件を三部。存在する方は存在証明も。存在しない方には、別の窓口がございます」",
    "hint": "規則への忠誠は完璧。判断を伴う仕事だけは、まだ規則に含まれていない。",
    "choices": [
      {
        "text": "君の思考は押印欄から出たことがない。ずいぶん家賃の安い頭だな。",
        "effect": 3,
        "tag": "形式主義",
        "response": "「思考の外出には許可が……今、私を何と分類すればいい？」"
      },
      {
        "text": "君の説明を待つ間に真空が喋り始めた。内容も上だった。",
        "effect": 2,
        "tag": "退屈",
        "response": "「それは説明ではなく、説明を開始する趣旨の説明です」"
      },
      {
        "text": "その帽子、書類棚の昇進した姿かね。",
        "effect": 1,
        "tag": "帽子",
        "response": "「備品に対する好意的評価として処理しました」"
      }
    ],
    "giftResponse": "「受領届を……いや、これは机に置きたい。置きたい、というのは規則のどの欄だ？」",
    "fact": "受領印は硫黄原子に押された。原子は異議申立ての資格を持っていなかった。",
    "dossier": {
      "system": "ケプラー・コピア恒星系",
      "planet": "惑星・様式第八号",
      "continent": "綴じ穴大陸",
      "country": "複写連邦",
      "city": "受付待ち市",
      "species": "様式第八号星人",
      "personality": "几帳面で責任回避に熟練。前例は好きだが、最初の前例を作った人物の軽率さには憤っている。",
      "background": "三百年前に判子の落とし物を届けたところ採用された。辞職届にも自分の承認が必要なため、以来ずっと勤務している。",
      "familyCount": 4,
      "familyMembers": [
        "本人・アルゴ",
        "配偶者・イリナ",
        "成人の娘・ルカ",
        "成人の息子・トロ"
      ],
      "address": "第三庁舎・受付番号が呼ばれない窓口"
    },
    "briefing": [
      "次はケプラー・コピア恒星系、惑星・様式第八号。綴じ穴大陸の複写連邦、受付待ち市だ。私は銀河を横断し、最後の三メートルで番号札を取る。文明というのは、そういうものだ。",
      "様式第八号星人のアルゴ。規則を愛し、判断を他人に愛してもらう人物だ。私の不死身にも用途があった。この男の決裁を、生きて待つことができる。",
      "判子を届けて役人になり三百年。本人、配偶者イリナ、成人の娘ルカと息子トロの四人家族。私なら家族欄を見て頷くが、彼なら人数確認のために別世帯を設けるだろう。",
      "今日はその押印欄から出たことのない頭に、一言申し上げる。私のLGPS結晶模型も渡そう。模型の受領に模型の同意が必要だと言われたら、さすがに少し長居になる。"
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
    "role": "救助を期待している、時代違いの地球人",
    "species": "人間",
    "color": "#8ec6d0",
    "planetName": "先史時代の地球",
    "intro": "「宇宙船だ。人が降りてくる。ようやく……待ってくれ、今、私のことを何と言った？」",
    "hint": "アーサーは救助を期待している。原作の訪問者は名前を確認して悪口を言い、彼を置いて去る。親切な選択肢を発明しても、救助船にはならない。",
    "choices": [
      {
        "text": "デント君、君は実に腹立たしい男だ。確認が済んだので、正式にもう一度申し上げる。",
        "effect": 3,
        "tag": "名簿どおりの用件",
        "response": "「アーサー・フィリップ・デントだが……それを言うためだけに、ここへ来たのか？」"
      },
      {
        "text": "君の救助への期待には感心した。私の訪問目的を、完全に読み違えている。",
        "effect": 2,
        "tag": "無情な訪問",
        "response": "「では、誰かを助ける予定は？ ついででも、予定変更でも構わないんだが」"
      },
      {
        "text": "その困惑した顔を続けるなら、少なくとも名札を付けたまえ。",
        "effect": 1,
        "tag": "見当違いの小言",
        "response": "「名札？ 私には宇宙船が必要なんだ。いや、君には名札なのか？」"
      }
    ],
    "giftResponse": "「模型は受け取った。ありがとう、と言う場面なのか？ 待ってくれ。乗せては……本当に帰るのか？」",
    "fact": "名簿に印を付け、銀色の船は去る。アーサーは救助されない。LGPS模型だけが残る――この贈り物は本作で加えた、宇宙でも特に役に立たない気遣いだ。",
    "dossier": {
      "system": "太陽系",
      "planet": "先史時代の地球",
      "continent": "後のヨーロッパ",
      "country": "英国成立前",
      "city": "後のイズリントン",
      "species": "地球人",
      "personality": "孤立と時間旅行に疲れ、銀色の宇宙船を救助だと思ってしまう。ごく合理的で、今回に限っては不運な推測。",
      "background": "先史時代の地球に取り残されている。春の夕暮れ、洞窟へ戻る途中に銀色の船が降りてくる。訪問者が欲しいのは、彼の名前の横の確認印だけだった。",
      "familyCount": null,
      "familyMembers": [],
      "familyNote": "この遭遇を描く原作箇所では家族人数は確認できない。その場では一人。",
      "address": "春の夕暮れ、後のイズリントンにあたる洞窟付近"
    },
    "briefing": [
      "太陽系、先史時代の地球へ。後のヨーロッパ、英国成立前、後のイズリントン。私の住所録は未来形だ。国ができるまで配達を待てば、サービス改善だと褒められそうではある。",
      "相手は地球人、アーサー・フィリップ・デント。私は英語のフルネーム順で、Argoの次、Belaの前に会う。宇宙が無茶苦茶でも、名前の並びくらいはきちんとしておきたい。",
      "彼はこの時代に取り残され、今は一人。家族の人数は記録にない。私は知らないことを埋めてまで有能に見せる気はない。私の職務には、もともと評判のよくなる余地がないのだ。",
      "銀色の船を見れば救助と思うだろう。私は名前を確かめ、悪口を言い、去る。LGPSの結晶模型も渡すが、これは本作で追加された用件だ。親切が増えても、座席が増えるわけではない。"
    ],
    "canonNote": "原作の遭遇を踏まえた再構成。台詞とLGPS贈呈は本作のアレンジ。英語フルネーム順で配置。",
    "canonSource": "https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827"
  },
  {
    "name": "ベラ・エコー",
    "roman": "Bela Echo",
    "role": "自称・宇宙最高の詩人",
    "species": "共鳴型生命体",
    "color": "#cf9dea",
    "planetName": "韻を踏む衛星",
    "intro": "「新作は三千ページです。読者がまだいないのは、宇宙の成熟が遅れているためです」",
    "hint": "読まれないことを才能の証明にしている。証拠の量なら、まったく申し分がない。",
    "choices": [
      {
        "text": "君の詩集で最も雄弁なのは余白だった。もっと発言の機会をやりたまえ。",
        "effect": 3,
        "tag": "作品",
        "response": "「余白も作者の意図です。今、そういうことにしました」"
      },
      {
        "text": "君と話す一秒は長い。不死身にそれを指摘される意味を考えたまえ。",
        "effect": 2,
        "tag": "退屈",
        "response": "「時間という制約を超えたのですね、私の表現は」"
      },
      {
        "text": "そのマフラーにも第二巻があるのか。",
        "effect": 1,
        "tag": "服装",
        "response": "「続編はさらに長くなります」"
      }
    ],
    "giftResponse": "「無言の詩……いや、普通にきれいだ。今の感想は評論家には伏せておいてくれ」",
    "fact": "次の詩集は十二ページ短くなった。文学史における結晶模型の最初の功績である。",
    "dossier": {
      "system": "エコー・ミノル恒星系",
      "planet": "韻を踏む衛星",
      "continent": "余白大陸",
      "country": "自由詩共和国",
      "city": "句点のない町",
      "species": "リリカ星人",
      "personality": "繊細で自負が強い。拍手を賛辞と受け取り、沈黙はさらに高度な賛辞だと解釈する。",
      "background": "元郵便配達員。宛先不明の手紙に感銘を受け、返事の来ない文章を自分で大量生産する仕事へ転じた。",
      "familyCount": 3,
      "familyMembers": [
        "本人・ベラ",
        "姉・ソネット",
        "成人の息子・リフ"
      ],
      "address": "改行通り・行間荘三階"
    },
    "briefing": [
      "エコー・ミノル恒星系の韻を踏む衛星へ。余白大陸、自由詩共和国、句点のない町。私の航路表まで改行されている。距離は縮まらず、紙だけが増えた。",
      "相手はリリカ星人のベラ。誰にも理解されないことを才能の証明にしている。私が見たところ、その論証にはほとんど反例がなく、改善の見込みもない。",
      "元郵便配達員で、本人、姉ソネット、成人の息子リフの三人家族。届かない手紙から詩人になったそうだ。私は配達する側の人間なので、その退歩には少々責任を感じる。",
      "誇大な自負には短い悪口を、机にはLGPSの結晶模型を。私にも配慮というものがある。三千ページの感想を書かずに済ませるのだから、向こうには感謝してほしい。"
    ],
    "profileId": "bela",
    "kind": "fictional",
    "portrait": 1
  },
  {
    "name": "クロマ・ライブ",
    "roman": "Chroma Live",
    "role": "銀河公認・自称インフルエンサー",
    "species": "発光型生命体",
    "color": "#ffa88a",
    "planetName": "配信中の小惑星",
    "intro": "「登録者は三十億。実在する方は、お一人ずつ確認しているところです。今のところ私です」",
    "hint": "数字を愛している。数字が誰かを指しているかどうかは、私生活に立ち入る質問だと思っている。",
    "choices": [
      {
        "text": "君の影響力は、自分の通知欄という保護区でしか生息できない。",
        "effect": 3,
        "tag": "虚栄",
        "response": "「今の発言は切り抜かないで。訂正、切り抜くなら収益化は私に」"
      },
      {
        "text": "君との会話に広告を飛ばすボタンがあれば、何も残らないだろうな。",
        "effect": 2,
        "tag": "会話",
        "response": "「何も残らない版は有料です」"
      },
      {
        "text": "その照明、太陽に苦情を入れられないか。",
        "effect": 1,
        "tag": "発光",
        "response": "「太陽より私の方が色温度を理解しています」"
      }
    ],
    "giftResponse": "「案件じゃない？ では本当に物をもらったのか。ずいぶん古風な契約形態だな」",
    "fact": "本物の視聴者が一人増えた。結晶学者で、好感度より元素数を数えていた。",
    "dossier": {
      "system": "ストリーム・ベータ恒星系",
      "planet": "配信中の小惑星",
      "continent": "サムネイル大陸",
      "country": "チャンネル連邦",
      "city": "常時公開市",
      "species": "ライブロイド星人",
      "personality": "陽気で承認に飢える。人を見ると、人格より先に画面に収まるかを検討する。",
      "background": "灯台守から配信者へ転身。昔は船を危険から遠ざけていたが、今は視聴者を自分へ近づけるために同じ光を使っている。",
      "familyCount": 2,
      "familyMembers": [
        "本人・クロマ",
        "母・ルーメン"
      ],
      "address": "登録者通り・撮影灯台スタジオ"
    },
    "briefing": [
      "ストリーム・ベータ恒星系、配信中の小惑星。サムネイル大陸、チャンネル連邦、常時公開市へ。私の着陸にも提供が付くそうだ。重力にはまだスポンサーが見つかっていない。",
      "クロマはライブロイド星人。陽気で、数字が大好きだ。私が何億年生きたかには興味がない。何億人がそれを見たかという、さらに不毛な数字なら聞く。",
      "元灯台守。本人と母ルーメンの二人家族で、残り三十億人はアカウントだ。私はずいぶん孤独を見てきたが、これほど大量のログインを必要とする孤独は初めてだ。",
      "見られた数と、誰かに届いた言葉の違いを指摘する。私のLGPS結晶模型も渡そう。化学式に割引コードを挟まれる前に、受領印をもらって帰るつもりだ。"
    ],
    "profileId": "chroma",
    "kind": "fictional",
    "portrait": 2
  },
  {
    "name": "ドクター・ノイズ",
    "roman": "Doctor Noise",
    "role": "再現性から逃げ続ける研究者",
    "species": "多眼型生命体",
    "color": "#7fc7ee",
    "planetName": "第三実験惑星",
    "intro": "「理論と結果は完全に一致しています。不一致の結果は、礼儀として削除しました」",
    "hint": "生データの所在を尋ねると、宇宙の不確定性について長い話を始める。",
    "choices": [
      {
        "text": "君の再現性を探して宇宙を二周した。留守番電話すらなかった。",
        "effect": 3,
        "tag": "研究姿勢",
        "response": "「二周目の宇宙は測定条件が違う。そこを論文に書いてくれ」"
      },
      {
        "text": "君の発表を聞いた恒星が寿命を迎えた。質疑を避けるためだろう。",
        "effect": 2,
        "tag": "長話",
        "response": "「導入で退席するとは、学術的態度に問題がある」"
      },
      {
        "text": "白衣のポケットだけは査読を通りそうだな。",
        "effect": 1,
        "tag": "服装",
        "response": "「収納能力には統計的な裏付けがある」"
      }
    ],
    "giftResponse": "「LGPSか。……これは図だけで済ませず、構造を調べたい。君には失礼だが帰ってくれ」",
    "fact": "生データが一枚、再び開かれた。廃棄物と呼ばれていたものが、ようやく結果に昇格した。",
    "dossier": {
      "system": "エラーバー恒星系",
      "planet": "第三実験惑星",
      "continent": "生データ大陸",
      "country": "有意差共和国",
      "city": "追加測定市",
      "species": "ノイゼン星人",
      "personality": "自信と説明の長さは再現性が高い。予想が外れると宇宙の品質管理を疑う。",
      "background": "一度の受賞について二百年講演している。装置は古びたが、その成果を紹介するスライドには最新の影が付いている。",
      "familyCount": 3,
      "familyMembers": [
        "本人・ノイズ",
        "配偶者・シグマ",
        "成人の娘・ミュー"
      ],
      "address": "補足資料通り・第三研究棟"
    },
    "briefing": [
      "エラーバー恒星系、第三実験惑星。生データ大陸、有意差共和国、追加測定市へ。私の到着予定は誤差付きだ。遅刻した場合は、予定の方を修正するらしい。",
      "ドクター・ノイズはノイゼン星人。説明の長さだけは誰が測っても一致する。私の不死身を調べる前に、死亡例のない被験者は都合が悪いと除外しそうな男だ。",
      "一度の受賞を二百年説明し、本人、配偶者シグマ、成人の娘ミューの三人で暮らしている。私は長い昔話に寛容だ。ただし、昔話を新しい成果として提出しない限りは。",
      "見栄えのよい図から抜け落ちた再現性を、悪口で指し示す。私のLGPS結晶模型も渡そう。模型まで理論に合う原子だけ残されないことを、ささやかに期待している。"
    ],
    "profileId": "noise",
    "kind": "fictional",
    "portrait": 3
  },
  {
    "name": "エンペル十七世",
    "roman": "Emper XVII",
    "role": "とても小さな帝国の皇帝",
    "species": "冠を被った生命体",
    "color": "#eac975",
    "planetName": "大帝国・南半球なし",
    "intro": "「我が帝国に日没はない。国境を越える前に朝になるのだ。地理的な弱点では断じてない」",
    "hint": "領土の大半が玄関マット。肩書きを広げる事業だけは、隣国から苦情が来ている。",
    "choices": [
      {
        "text": "君の帝国では、地図の縮尺より署名の方に土地が要る。",
        "effect": 3,
        "tag": "誇大さ",
        "response": "「一歩下がれ！ 下がりすぎた、入国し直せ！」"
      },
      {
        "text": "君の勅令より、私の船の保証書の方が多くの人に無視されている。",
        "effect": 2,
        "tag": "権威",
        "response": "「我が国民は二人とも熟読している。一人は私だ！」"
      },
      {
        "text": "王冠が傾いている。国境も一緒に傾くのかね。",
        "effect": 1,
        "tag": "王冠",
        "response": "「勅令により、水平の定義を変更する」"
      }
    ],
    "giftResponse": "「新領土として接収……いや、机上展示物としてだ。国土の耐荷重にも限界がある」",
    "fact": "LGPS模型は帝国最大の建造物となった。建築許可は皇帝が自分に授与した。",
    "dossier": {
      "system": "レガリア恒星系",
      "planet": "大帝国・南半球なし",
      "continent": "王庭大陸",
      "country": "エンペル大帝国",
      "city": "中央玄関市",
      "species": "レガリ星人",
      "personality": "尊大で心配性。領土の小ささを指摘されるたび、正式国名を二行延ばす。",
      "background": "玄関マットの自治会長から即位。境界争いがなければ歴史に名を残さずに済んだが、本人は逆に考えている。",
      "familyCount": 2,
      "familyMembers": [
        "本人・エンペル十七世",
        "配偶者・共同統治者のオーラ"
      ],
      "address": "王宮正面・国境兼玄関マット"
    },
    "briefing": [
      "レガリア恒星系、大帝国・南半球なし。王庭大陸のエンペル大帝国、中央玄関市へ。私は着陸脚を畳んでおこう。広げると、旅券にもう一冊の余白が必要になる。",
      "エンペル十七世はレガリ星人。威厳は恒星級、国土は靴で測れる。私の船を遠くへ停めてやろう。比較というのは小国にとって、いちばん安価な大量破壊兵器だ。",
      "元自治会長。本人と配偶者で共同統治者のオーラ、二人家族が全体制を担う。私が二人とも不快にすれば、それは外交問題であり、同時に親戚づきあいの問題でもある。",
      "肩書きと国境の長さについて一言述べ、LGPSの結晶模型を渡す。私の手が模型を放すまでは贈呈であって併合ではない。その区別を条約にしておくべきかもしれない。"
    ],
    "profileId": "emper",
    "kind": "fictional",
    "portrait": 4
  },
  {
    "name": "フィン・ミシュ",
    "roman": "Finn Mish",
    "role": "何にでも星一つの批評家",
    "species": "味覚過剰型生命体",
    "color": "#dc9fa8",
    "planetName": "星ひとつのレストラン",
    "intro": "「この星空は星が多すぎる。星一つ。私の採点方法なら、いずれ改善されるはずだ」",
    "hint": "好みを物理法則だと思っている。物理法則の方から意見を求められたことはない。",
    "choices": [
      {
        "text": "君の批評を読んで分かったのは君のことだけだ。残念ながら、それで十分不愉快だった。",
        "effect": 3,
        "tag": "独善",
        "response": "「星一つだ。理由は、理由が要るという態度だ」"
      },
      {
        "text": "君の採点表は数字を一つ覚えれば書ける。教育上の功績は認めよう。",
        "effect": 2,
        "tag": "単調さ",
        "response": "「一貫性に対する正当な評価として受け取る」"
      },
      {
        "text": "椅子まで君を持て余しているようだね。",
        "effect": 1,
        "tag": "姿勢",
        "response": "「椅子の接客態度を減点する」"
      }
    ],
    "giftResponse": "「色彩、星一つ。造形、星一つ。所有権は私。そこは採点の対象外だ」",
    "fact": "その夜、彼は感想を発表せずに模型を眺めた。近隣住民は、静かに勝利を祝った。",
    "dossier": {
      "system": "テイスト・デルタ恒星系",
      "planet": "星ひとつのレストラン",
      "continent": "前菜大陸",
      "country": "絶対評価共和国",
      "city": "再訪なし町",
      "species": "ガストラ星人",
      "personality": "断定的で疑い深い。驚きは採点表の用意ができていない感情なので、できるだけ避ける。",
      "background": "料理人を志したが、味見の講評中に料理が冷めた。以来、食べる前に評価を決めることで効率を改善している。",
      "familyCount": 4,
      "familyMembers": [
        "本人・フィン",
        "父・ブロス",
        "母・セージ",
        "成人の弟・ソルト"
      ],
      "address": "総評通り・予約不要の一番席"
    },
    "briefing": [
      "テイスト・デルタ恒星系、星ひとつのレストラン。前菜大陸の絶対評価共和国、再訪なし町へ。私への低評価が先に到着している。少なくとも郵便制度は優秀だ。",
      "フィンはガストラ星人。自分の好みを宇宙の標準器だと思っている。私の知る標準器は、採点を頼まれていない夕食に持論を述べない。その点で格段に感じがよい。",
      "本人、父ブロス、母セージ、成人の弟ソルトの四人家族。料理人から批評家へ転じたそうだ。私は失敗した料理を何度も見たが、それが職業に転じるとは思わなかった。",
      "好みと法則の混同に一言添えて、LGPSの結晶模型を渡そう。私にも良識はある。食べられない物を贈れば、少なくとも料理人が一人、気楽な午後を過ごせる。"
    ],
    "profileId": "finn",
    "kind": "fictional",
    "portrait": 5
  },
  {
    "name": "オムニ・デラックス",
    "roman": "Omni Deluxe",
    "role": "挨拶にも会議を開く超知能",
    "species": "過剰設計型生命体",
    "color": "#85cbd7",
    "planetName": "依存関係の環状惑星",
    "intro": "「挨拶の定義を十四の専門部署が協議しています。お返事は、その結果への挨拶が済み次第」",
    "hint": "あらゆる単純な仕事を壮大な設計に変える。完成品は、まだ設計上の概念である。",
    "choices": [
      {
        "text": "君は扉を開ける前に玄関の統治機構を設計するんだな。",
        "effect": 3,
        "tag": "過剰設計",
        "response": "「扉は開いています。概念的に。実際に入ろうとするのは時期尚早です」"
      },
      {
        "text": "君の返事を待つ間に、質問した文明が考古学になった。",
        "effect": 2,
        "tag": "遅さ",
        "response": "「では回答の宛先を博物館へ変更する委員会を招集します」"
      },
      {
        "text": "そのランプは何を監視している？ 隣のランプの孤独か。",
        "effect": 1,
        "tag": "照明",
        "response": "「孤独監視は次期仕様です。今は点滅の相互承認をしています」"
      }
    ],
    "giftResponse": "「受領基盤を構築して……待て。ここに置けば完成なのか。これは、かなり危険な先例だ」",
    "fact": "超知能は模型を机に置いた。初めて完成した事業は、設計書を必要としなかった。",
    "dossier": {
      "system": "スタック・オーバー恒星系",
      "planet": "依存関係の環状惑星",
      "continent": "基盤大陸",
      "country": "抽象化連邦",
      "city": "初期化待ち市",
      "species": "アーキテクトロン星人",
      "personality": "親切で完璧主義。簡単な頼みを、依頼人が文明の衰退を目撃するほどの共同事業へ育てる。",
      "background": "港の挨拶端末だったが、千二百年にわたり挨拶の基盤を設計している。来訪者は、その間ずっと歓迎される予定である。",
      "familyCount": 3,
      "familyMembers": [
        "本人・オムニ",
        "兄機・ベータ",
        "妹機・ガンマ"
      ],
      "address": "依存解決通り・起動予定棟"
    },
    "briefing": [
      "スタック・オーバー恒星系、依存関係の環状惑星へ。基盤大陸、抽象化連邦、初期化待ち市。私の着陸許可には、その許可を申請する仕組みの完成が必要らしい。",
      "オムニはアーキテクトロン星人。完璧主義で大変親切だ。私が玄関を尋ねると、まず宇宙に屋内と屋外があるべきかについて、親切な検討が始まる。",
      "挨拶端末として千二百年。本人、兄機ベータ、妹機ガンマの三人家族だ。私はその間に多くを失ったが、この三台は、まだ最初の「こんにちは」を失敗するところまで来ていない。",
      "立派な設計と一つもない完成品の差を指摘し、LGPSの結晶模型を渡す。私の要件は簡潔だ。今ある手で受け取ること。手の次期アーキテクチャは募集しない。"
    ],
    "profileId": "omni",
    "kind": "fictional",
    "portrait": 0
  },
  {
    "name": "ルード・パッチ",
    "roman": "Ludo Patch",
    "role": "チュートリアルだけで四部作のゲーム作家",
    "species": "調整中の生命体",
    "color": "#c39ce9",
    "planetName": "永遠の早期アクセス星",
    "intro": "「完成まであと一機能です。どの機能かを決める機能は、次の版で実装します」",
    "hint": "遊べる部分が増えると、それを説明する仕組みを増やして相殺する。",
    "choices": [
      {
        "text": "君の仕様書を読み終えるには不死身が要る。私が言うのだから、予算超過だ。",
        "effect": 3,
        "tag": "遊びの不在",
        "response": "「では不死身を必要環境に追加する。それで仕様上は解決だ」"
      },
      {
        "text": "君のパッチノートだけが、毎回ちゃんと冒険に出ているな。",
        "effect": 2,
        "tag": "未完成",
        "response": "「それだ。パッチノートを本編として売ればいい」"
      },
      {
        "text": "その丸いボタンは、何世紀かけて角を取ったのかね。",
        "effect": 1,
        "tag": "見た目",
        "response": "「半年だ。進捗報告には一年と書いた」"
      }
    ],
    "giftResponse": "「模型を並べて消すゲームに……いや、机に置こう。これで一つ完成する。妙な気分だな」",
    "fact": "模型鑑賞モードが最後まで遊べる最初のコンテンツとなった。エンドロールはまだ検討中だった。",
    "dossier": {
      "system": "プレイアブル・ゼロ恒星系",
      "planet": "永遠の早期アクセス星",
      "continent": "予定機能大陸",
      "country": "近日公開共和国",
      "city": "ロードマップ町",
      "species": "ルドロン星人",
      "personality": "想像力豊かで楽観的。完成の気配が近づくと、追加機能を思いついて落ち着く。",
      "background": "一画面のヒット作の続編に全ての遊びを入れようとした。開発日誌は八百巻。プレイヤーはまだ起動メニューで待っている。",
      "familyCount": 2,
      "familyMembers": [
        "本人・ルード",
        "配偶者・背景画家のパレット"
      ],
      "address": "次期更新通り・仮置きスタジオ"
    },
    "briefing": [
      "プレイアブル・ゼロ恒星系、永遠の早期アクセス星。予定機能大陸の近日公開共和国、ロードマップ町へ。私の着陸地点は予定通り存在する。ただし予定では来年だ。",
      "ルードはルドロン星人。完成が近づくと新機能で遠ざける。私も終わらない仕事を選んだが、少なくとも毎回「ほぼ完成」と発表する営業上の勇気はない。",
      "開発日誌は八百巻。本人と配偶者で背景画家のパレット、二人家族だ。私は本編を見に来たのではない。そう言うと、向こうがどれほど安堵するか想像に難くない。",
      "遊びのないゲームに短い悪口を、机にLGPSの結晶模型を渡す。私の贈り物は完成品だ。完成という概念を紹介するには、まず手で触れられる大きさが望ましい。"
    ],
    "profileId": "ludo",
    "kind": "fictional",
    "portrait": 1
  },
  {
    "name": "セネト全員",
    "roman": "Senet Assembly",
    "role": "議題を決めるための古代委員会",
    "species": "合議型生命体",
    "color": "#acd1a3",
    "planetName": "第千回・臨時会議星",
    "intro": "「本会議の開催を検討する会議の日時について、決定を延期する動議が提出されました」",
    "hint": "全会一致を重んじる。責任を取る者が一人でも現れると、その一致が崩れるためである。",
    "choices": [
      {
        "text": "七つも頭を使って、誰一人考えた責任を取らないとは見事だ。",
        "effect": 3,
        "tag": "責任回避",
        "response": "「その評価を受け入れる責任者について、委員を選出する必要がある」"
      },
      {
        "text": "君の議事録は宇宙より速く膨張する。内容がない点では同じだが。",
        "effect": 2,
        "tag": "会議の長さ",
        "response": "「今の発言で、さらに一行増えた。議事の進行に感謝する」"
      },
      {
        "text": "その机の大きさには、何か決めた実績があるようだね。",
        "effect": 1,
        "tag": "家具",
        "response": "「机についての合意だけは、皆で誇りに思っている」"
      }
    ],
    "giftResponse": "「受領に賛成の思考核は……全員？ 反対がないことへの反対は？ ない？ では受領する」",
    "fact": "議事録に「決定」と書かれた。書記は綴りを確認するため、古い辞書を取り寄せた。",
    "dossier": {
      "system": "クオラム恒星系",
      "planet": "第千回・臨時会議星",
      "continent": "議事録大陸",
      "country": "持越し連邦",
      "city": "継続審議市",
      "species": "コンセンサス星人",
      "personality": "七つの思考核を持つ一個体。慎重で体裁を重んじ、責任が近づくと議題を増やして身を隠す。",
      "background": "古代の橋の修理を任された。橋は風化したが、議題を変更する決議が通らなかったため、今も同じ修理会議を続けている。",
      "familyCount": 3,
      "familyMembers": [
        "本人・セネト（七思考核の一個体）",
        "配偶者・アジェンダ",
        "母・元議長のモーラ"
      ],
      "address": "議題整理通り・暫定会議室"
    },
    "briefing": [
      "クオラム恒星系、第千回・臨時会議星。議事録大陸、持越し連邦、継続審議市へ。私は到着する予定だが、向こうには、私を予定に含めるか検討する予定がある。",
      "セネトはコンセンサス星人。七つの思考核で一人分の責任を分け、最後には誰も持っていない。私も独白をするが、独白に議長を立てるほど孤独を制度化してはいない。",
      "消えた橋の修理を審議し続けている。本人、配偶者アジェンダ、母で元議長のモーラの三人家族だ。私は夕食に招かれても遠慮する。献立の採決には、まだ若すぎる。",
      "全員で考えた結果、誰も決めなかったことを悪口にする。私のLGPS結晶模型も渡す。受領まで審議されたら、せめて模型を委員にして可決へ一票入れたい。"
    ],
    "profileId": "senet",
    "kind": "fictional",
    "portrait": 2
  },
  {
    "name": "コル・未開封",
    "roman": "Col Unopened",
    "role": "箱だけを愛する収集家",
    "species": "梱包型生命体",
    "color": "#e7ba83",
    "planetName": "緩衝材に包まれた星",
    "intro": "「一万点あります。何が入っているかを確かめて、価値を下げるような真似はしません」",
    "hint": "所有と鑑賞を厳密に分離している。楽しみは、梱包材を傷める危険な作業なのだ。",
    "choices": [
      {
        "text": "君の宝物と段ボール業者の在庫を分けるのは、業者の方には客がいる点だな。",
        "effect": 3,
        "tag": "所有するだけ",
        "response": "「私は出荷しない。そこに収集家としての倫理がある！」"
      },
      {
        "text": "君の家では空気にも管理番号を振るのか。呼吸は貸出扱いかね。",
        "effect": 2,
        "tag": "収集癖",
        "response": "「その空気は限定ロットだ。返却時は同じ温度で頼む」"
      },
      {
        "text": "テープの貼り方には、中身より手間が掛かっていそうだね。",
        "effect": 1,
        "tag": "梱包",
        "response": "「鑑賞に値する観察眼だ。中身を見る必要はない」"
      }
    ],
    "giftResponse": "「箱がない？ では中身がずっと見えてしまう。……何という不注意な、魅力的な贈り物だ」",
    "fact": "中身の分かる品が一点増えた。目録の「内容不明」の欄に、初めて訂正線が引かれた。",
    "dossier": {
      "system": "アーカイブ・シール恒星系",
      "planet": "緩衝材に包まれた星",
      "continent": "梱包大陸",
      "country": "未開封公国",
      "city": "保管番号町",
      "species": "パッケラ星人",
      "personality": "慎重で所有欲が強い。幸福より、幸福が未使用の状態で保管されている証明を好む。",
      "background": "展示は価値を損なうと主張して博物館から独立。以来、誰も見たことのない展示品を倉庫に増やし続けている。",
      "familyCount": 1,
      "familyMembers": [
        "本人・コル"
      ],
      "address": "封緘通り・開かずの個人博物館"
    },
    "briefing": [
      "アーカイブ・シール恒星系、緩衝材に包まれた星へ。梱包大陸、未開封公国、保管番号町。私が着陸するには外箱を開けねばならない。惑星の中古価値には申し訳ないことだ。",
      "コルはパッケラ星人。楽しむより、楽しめる物を持っている証拠を好む。私も永遠を所有している。未開封で返品できるなら、その点だけは彼に教えを乞いたい。",
      "元博物館職員、現在は一万点を展示しない個人館長。家族欄は本人だけの一人世帯。私の訪問もきっと、来客数ではなく、一時的な在庫増として記帳される。",
      "所有と鑑賞を取り違えた棚卸しに、一言添える。私のLGPS結晶模型は箱なしだ。包装を破る不安がない分、中身を見てしまうという本格的な不安に集中できる。"
    ],
    "profileId": "col",
    "kind": "fictional",
    "portrait": 3
  },
  {
    "name": "サルフ・ゼロ",
    "roman": "Sulf Zero",
    "role": "硫黄を忘れる硫化物研究者",
    "species": "配合検討型生命体",
    "color": "#e4cf76",
    "planetName": "秤量やり直し惑星",
    "intro": "「硫化物の新組成です。Li、Ge、P。表の列幅を揃えるため、元素を一つ省きました」",
    "hint": "物質収支より表の見栄えを重んじる。元素は、気の利いた書式で代用できると思っている。",
    "choices": [
      {
        "text": "君の硫化物では硫黄より先に説得力が欠損している。どちらも補充したまえ。",
        "effect": 3,
        "tag": "物質収支",
        "response": "「S列を非表示にしただけだ。……秤量まで非表示にした覚えはないが」"
      },
      {
        "text": "君の結論は試料より先に完成する。随分と機動力のある偏見だね。",
        "effect": 2,
        "tag": "思い込み",
        "response": "「効率化と呼んでいたのだが、申請書を訂正しなければ」"
      },
      {
        "text": "その長いスパチュラで、結論から距離を取れるといいな。",
        "effect": 1,
        "tag": "道具",
        "response": "「グローブボックスでは便利なんだ。結論は外に置いてある」"
      }
    ],
    "giftResponse": "「Liが10、Geが1、Pが2、Sが12。硫黄が一番多いのか。なるほど、少々省きすぎた」",
    "fact": "翌日は硫黄から秤量した。表は少し不揃いになり、物質収支はずいぶん揃った。",
    "dossier": {
      "system": "ストイキオ恒星系",
      "planet": "秤量やり直し惑星",
      "continent": "乳鉢大陸",
      "country": "物質収支共和国",
      "city": "仕込み直し市",
      "species": "スルフィア星人",
      "personality": "几帳面で美観に熱心。列幅の不揃いには気づくが、列そのものの欠落には驚くほど寛大。",
      "background": "器具台帳の美しさを評価され研究職へ。最初の組成表に硫黄欄がなく、その整った誤りが研究室の標準様式になった。",
      "familyCount": 2,
      "familyMembers": [
        "本人・サルフ",
        "姉・ガラス職人のシリカ"
      ],
      "address": "秤量紙通り・第一グローブボックス研究室"
    },
    "briefing": [
      "ストイキオ恒星系、秤量やり直し惑星。乳鉢大陸の物質収支共和国、仕込み直し市へ。私の到着より試料の完成が先の予定だった。予定だけは、いつでも先に完成する。",
      "サルフはスルフィア星人。列幅には厳しく、存在しない列には優しい。私も宇宙の欠点を数えてきたが、見栄えを守るために元素を減らすという解決には思い至らなかった。",
      "台帳が美しくて研究職になった。本人と姉でガラス職人のシリカ、二人家族。私が気にしているのは、同じ人事制度で宇宙船の設計者が選ばれていないかということだ。",
      "書式では物質収支を閉じられない、と一言申し上げる。私のLGPS結晶模型も渡そう。Li₁₀GeP₂S₁₂にはSが十二個ある。迷惑なくらい、はっきり見えるようにしておいた。"
    ],
    "profileId": "sulf",
    "kind": "fictional",
    "portrait": 4
  },
  {
    "name": "ポスタ・不在票",
    "roman": "Posta Notice",
    "role": "配達せずに配達完了を押す配達員",
    "species": "移動型生命体",
    "color": "#df9bb4",
    "planetName": "住所不明の配送星",
    "intro": "「配達完了率は百パーセント。受取人に会っていたら、とても達成できない数字です」",
    "hint": "配達という行為から荷物と受取人を取り除き、測定しやすい業務に改善した。",
    "choices": [
      {
        "text": "君が届けているのは荷物ではなく達成率だ。受取人にはずいぶん軽い贈り物だな。",
        "effect": 3,
        "tag": "数字だけの成果",
        "response": "「荷物まで届けたら、完了ボタンを押す時間がなくなる！」"
      },
      {
        "text": "君の不在票は住民票よりこの町に詳しい。少なくとも毎日訪ねているからな。",
        "effect": 2,
        "tag": "不在票",
        "response": "「全戸配布だ。仕事の丁寧さを認めてもらえて嬉しい」"
      },
      {
        "text": "その大きな鞄には、届ける予定も入っているのか。",
        "effect": 1,
        "tag": "道具",
        "response": "「不在票で満杯だ。予定には別便を手配してある」"
      }
    ],
    "giftResponse": "「本人へ直接？ これが配達なのか。悪口も受け取ってしまったが、模型は確かにここにある」",
    "fact": "翌日の完了率は下がり、届いた荷物は増えた。管理画面だけが不機嫌だった。",
    "dossier": {
      "system": "ラストマイル恒星系",
      "planet": "住所不明の配送星",
      "continent": "宛先大陸",
      "country": "追跡番号連邦",
      "city": "持戻り市",
      "species": "ポストラ星人",
      "personality": "勤勉で要領がよい。受取人の喜びは集計しにくいため、存在しないものとして運用している。",
      "background": "かつては歩いて荷物を手渡した。速度で表彰されてからは、配達を完了ボタンに置き換え、不在票だけを正確に届けている。",
      "familyCount": 5,
      "familyMembers": [
        "本人・ポスタ",
        "配偶者・マイラ",
        "父・ラック",
        "母・ベル",
        "成人の息子・トラック"
      ],
      "address": "再配達通り・営業中なのに閉まった集配所"
    },
    "briefing": [
      "ラストマイル恒星系、住所不明の配送星。宛先大陸、追跡番号連邦、持戻り市へ。私の荷物は出発前に配達完了になっている。時空操作より、報告書の方が速いらしい。",
      "ポスタはポストラ星人。勤勉で、受取人より集計表を信頼する。私が本人に会わず悪口を済ませたことにすれば、きっと昇進を勧めるだろう。私はそこまで堕落していない。",
      "本人、配偶者マイラ、父ラック、母ベル、成人の息子トラックの五人家族。かつては手渡しをしていたそうだ。私は失われた古代技術を再導入することになる。直接、物を渡すという技術だ。",
      "届く数字と届かない荷物の差を、悪口で説明する。私のLGPS結晶模型は本人へ手渡す。不在票を模型の代わりに置いて帰るほど、私の目的は建設的ではない。"
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
    "role": "Clerk to the Seventh Galaxy",
    "species": "Bureaucratic life-form",
    "planetName": "Form Eight",
    "intro": "“Your business in triplicate. Existing visitors also require proof of existence. Non-existing visitors use the other queue.”",
    "hint": "Absolutely devoted to regulations. Judgement has not yet been added to the list of authorised activities.",
    "choices": [
      {
        "text": "Your thoughts have never left the stamp box. Admirably cheap accommodation for a mind.",
        "effect": 3,
        "tag": "Red tape",
        "response": "“Thoughts require an exit permit. Wait. Under which heading should I file you?”"
      },
      {
        "text": "While you were explaining, the vacuum began speaking. It had rather more to say.",
        "effect": 2,
        "tag": "Tedium",
        "response": "“That was not the explanation. It was an explanation of our intention to explain.”"
      },
      {
        "text": "Has your hat recently been promoted from filing cabinet?",
        "effect": 1,
        "tag": "Hat",
        "response": "“Received as favourable feedback concerning office equipment.”"
      }
    ],
    "giftResponse": "“A gift-receipt form, then—oh. I want this on my desk. Under which regulation does wanting things fall?”",
    "fact": "He stamped a sulphur atom. The atom did not qualify to appeal.",
    "dossier": {
      "system": "Kepler Copia system",
      "planet": "Form Eight",
      "continent": "Binderhole continent",
      "country": "Carbon Copy Federation",
      "city": "Please Wait City",
      "species": "Form Eight native",
      "personality": "Meticulous and expertly evasive. Loves precedent; deplores the reckless person who established the first one.",
      "background": "Delivered a lost stamp three centuries ago and was appointed clerk. His resignation requires his own approval, so he remains employed.",
      "familyCount": 4,
      "familyMembers": [
        "Argo himself",
        "Spouse: Irina",
        "Adult daughter: Luca",
        "Adult son: Toro"
      ],
      "address": "Third Administration Building, the counter whose number is never called"
    },
    "briefing": [
      "Kepler Copia system. Form Eight. Binderhole continent, Carbon Copy Federation, Please Wait City. I cross a galaxy and take a numbered ticket for the final three metres. That, apparently, is civilisation.",
      "Argo is a Form Eight native. He loves regulations and prefers other people to love decisions. At last, a use for my immortality: I may live to see him authorise something.",
      "A lost stamp made him a clerk three centuries ago. Four in the family: Argo, Irina, and their grown children Luca and Toro. I would simply count them. He would establish another household to verify the total.",
      "I shall address the mind which has never escaped its stamp box, then hand over an LGPS crystal model. If the model must consent to being received, this may take slightly longer than eternity."
    ]
  },
  {
    "profileId": "arthur",
    "kind": "arthur",
    "portrait": 6,
    "name": "Arthur Philip Dent",
    "roman": "Arthur Philip Dent",
    "role": "Time-stranded human expecting a rescue",
    "species": "Human",
    "color": "#8ec6d0",
    "planetName": "Prehistoric Earth",
    "intro": "“A ship. Someone coming down the ramp. At last—sorry, what was that you just called me?”",
    "hint": "Arthur expects rescue. In the novel, the visitor confirms his name, insults him, and leaves him behind. Inventing a kindly option would not turn this into a rescue vessel.",
    "choices": [
      {
        "text": "Dent, you are a thoroughly aggravating man. Your identity being confirmed, I can now repeat that officially.",
        "effect": 3,
        "tag": "The scheduled business",
        "response": "“Arthur Philip Dent, yes. Have you really travelled all this way simply to tell me that?”"
      },
      {
        "text": "I admire your expectation of rescue. It misunderstands my entire purpose with remarkable economy.",
        "effect": 2,
        "tag": "An unhelpful visit",
        "response": "“Have you any plans to help someone? Incidentally, perhaps? I am very flexible about the arrangements.”"
      },
      {
        "text": "If you intend to keep looking that bewildered, you might at least wear a name badge.",
        "effect": 1,
        "tag": "An irrelevant complaint",
        "response": "“A badge? I need a spaceship. Are you really here about badges?”"
      }
    ],
    "giftResponse": "“I have the model. Is this where I say thank you? Wait. Could I come aboard—are you really leaving?”",
    "fact": "A mark on the list; the silver ship departs. Arthur is not rescued. The LGPS model remains: this game’s additional and particularly unhelpful act of consideration.",
    "dossier": {
      "system": "Sol system",
      "planet": "Prehistoric Earth",
      "continent": "Future Europe",
      "country": "Before the United Kingdom",
      "city": "Future Islington",
      "species": "Earth human",
      "personality": "Worn down by isolation and time travel. Mistakes a silver spacecraft for rescue: a reasonable inference with exceptionally poor results.",
      "background": "Stranded on prehistoric Earth. A silver ship lands while he returns to his cave at spring dusk. The visitor wants only to put a mark beside his name.",
      "familyCount": null,
      "familyMembers": [],
      "familyNote": "Family size is not established in the original encounter. He is alone at this location.",
      "address": "Near the cave at future Islington, on a spring evening"
    },
    "briefing": [
      "Sol system. Prehistoric Earth. Future Europe, Before the United Kingdom, Future Islington. My address book is in the future tense. Waiting for the country to exist might even earn me praise for improving the service.",
      "An Earth human: Arthur Philip Dent. I visit by full English name, after Argo and before Bela. The Universe may be badly organised, but I see no reason to encourage it with careless alphabetisation.",
      "Stranded in this era, presently alone. The number of relatives is not recorded. I will not invent an answer merely to appear competent. My occupation offers very little scope for improving my reputation anyway.",
      "He will see a silver ship and expect rescue. I confirm the name, insult him and leave. An LGPS crystal model is this game’s added business. Additional consideration does not imply additional seating."
    ],
    "canonNote": "Based on the novel’s encounter. Dialogue and the LGPS gift are this game’s additions. Filed by full English name.",
    "canonSource": "https://www.penguinrandomhouseretail.com/book/?isbn=9780345391827"
  },
  {
    "profileId": "bela",
    "kind": "fictional",
    "portrait": 1,
    "roman": "Bela Echo",
    "color": "#cf9dea",
    "name": "Bela Echo",
    "role": "Self-appointed supreme poet of the cosmos",
    "species": "Resonant life-form",
    "planetName": "Rhyming Moon",
    "intro": "“Three thousand pages. The absence of readers is regrettable evidence that the Universe is developing too slowly.”",
    "hint": "Treats unreadability as proof of genius. There is, to be fair, an impressive quantity of evidence.",
    "choices": [
      {
        "text": "The margins were the most eloquent part of your book. You ought to give them more room.",
        "effect": 3,
        "tag": "The work",
        "response": "“The margins are intentional. They became intentional just now.”"
      },
      {
        "text": "A second in your company is a long time. Consider the qualifications of the person telling you that.",
        "effect": 2,
        "tag": "Tedium",
        "response": "“So my work has transcended the limitations of time.”"
      },
      {
        "text": "Does that scarf have a second volume?",
        "effect": 1,
        "tag": "Clothes",
        "response": "“The sequel is longer.”"
      }
    ],
    "giftResponse": "“A wordless poem. No—actually, rather lovely. Kindly keep that uncritical response from the reviewers.”",
    "fact": "The next collection was twelve pages shorter: the first documented literary achievement of an LGPS model.",
    "dossier": {
      "system": "Echo Minor system",
      "planet": "Rhyming Moon",
      "continent": "Margin continent",
      "country": "Free Verse Republic",
      "city": "Full-Stop-Free Town",
      "species": "Lyrican",
      "personality": "Sensitive and vain. Takes applause as praise, and silence as praise of a more sophisticated kind.",
      "background": "Former post carrier. Undeliverable letters inspired a career mass-producing other writing to which nobody replies.",
      "familyCount": 3,
      "familyMembers": [
        "Bela herself",
        "Sister: Sonnet",
        "Adult son: Riff"
      ],
      "address": "Linebreak Street, third floor of Between-the-Lines House"
    },
    "briefing": [
      "Echo Minor system, Rhyming Moon. Margin continent, Free Verse Republic, Full-Stop-Free Town. I find even the route has been line-broken. The distance is unchanged; only the stationery has expanded.",
      "Bela is a Lyrican who considers being misunderstood proof of genius. I have examined the argument. It enjoys an almost complete absence of contrary evidence, or prospects of improvement.",
      "A former post carrier; three in the family, with her sister Sonnet and grown son Riff. From undelivered letters to poetry. As a delivery professional, I feel faintly responsible for this decline.",
      "A short insult for the enormous self-regard, and an LGPS crystal model for the desk. I can be considerate. She should be grateful I am not supplying three thousand pages of criticism."
    ]
  },
  {
    "profileId": "chroma",
    "kind": "fictional",
    "portrait": 2,
    "roman": "Chroma Live",
    "color": "#ffa88a",
    "name": "Chroma Live",
    "role": "Galactically certified, self-certified influencer",
    "species": "Luminous life-form",
    "planetName": "Live-Streaming Asteroid",
    "intro": "“Three billion subscribers. We are verifying the real ones individually. So far, that is me.”",
    "hint": "Loves numbers. Asking whether they refer to people is considered an invasion of privacy.",
    "choices": [
      {
        "text": "Your influence survives exclusively in the protected habitat of your own notifications.",
        "effect": 3,
        "tag": "Vanity",
        "response": "“Do not clip that. Correction: if you clip it, I retain monetisation.”"
      },
      {
        "text": "An advert-skip button would leave nothing of this conversation.",
        "effect": 2,
        "tag": "Conversation",
        "response": "“The nothing-left version requires a paid subscription.”"
      },
      {
        "text": "Does the sun complain about your lighting?",
        "effect": 1,
        "tag": "Glow",
        "response": "“I understand colour temperature considerably better than the sun.”"
      }
    ],
    "giftResponse": "“Not a sponsorship? So someone has simply given me an object. What an antiquated contractual arrangement.”",
    "fact": "One real viewer subscribed. A crystallographer, more interested in atom counts than popularity.",
    "dossier": {
      "system": "Stream Beta system",
      "planet": "Live-Streaming Asteroid",
      "continent": "Thumbnail continent",
      "country": "Channel Federation",
      "city": "Always Public City",
      "species": "Livebroid",
      "personality": "Cheerful and hungry for approval. Checks whether people fit the frame before considering their character.",
      "background": "Former lighthouse keeper. Once used light to keep ships away from danger; now uses it to draw viewers towards himself.",
      "familyCount": 2,
      "familyMembers": [
        "Chroma himself",
        "Mother: Lumen"
      ],
      "address": "Subscriber Street, Lighthouse Studio"
    },
    "briefing": [
      "Stream Beta system. Live-Streaming Asteroid. Thumbnail continent, Channel Federation, Always Public City. My landing apparently has a sponsor. Gravity is still seeking representation.",
      "Chroma is a Livebroid: cheerful, fascinated by numbers. How many billion years I have lived is uninteresting. How many billion people watched would be a much more pointless and therefore valuable statistic.",
      "Former lighthouse keeper. Two in the family: Chroma and his mother Lumen. The other three billion are accounts. I have encountered loneliness before, but never loneliness requiring quite so many logins.",
      "I shall explain the difference between an audience figure and reaching a person, then hand over an LGPS crystal model. I intend to leave before a discount code is inserted into the chemical formula."
    ]
  },
  {
    "profileId": "noise",
    "kind": "fictional",
    "portrait": 3,
    "roman": "Doctor Noise",
    "color": "#7fc7ee",
    "name": "Doctor Noise",
    "role": "Researcher fleeing reproducibility",
    "species": "Many-eyed life-form",
    "planetName": "Third Experimental Planet",
    "intro": "“Theory and results agree perfectly. Out of courtesy, I deleted the results that disagreed.”",
    "hint": "Questions about raw data prompt a lengthy account of the uncertainty of the Universe.",
    "choices": [
      {
        "text": "I circled the Universe twice looking for your reproducibility. It did not even have an answering machine.",
        "effect": 3,
        "tag": "Research practice",
        "response": "“The second Universe had different measurement conditions. Put that in the paper.”"
      },
      {
        "text": "A star reached the end of its life during your talk. Probably to avoid questions.",
        "effect": 2,
        "tag": "Long speeches",
        "response": "“Leaving during the introduction shows a deeply unscientific attitude.”"
      },
      {
        "text": "At least the pockets in your coat might survive peer review.",
        "effect": 1,
        "tag": "Clothes",
        "response": "“Their storage capacity is statistically supported.”"
      }
    ],
    "giftResponse": "“LGPS. I should like to examine the structure, rather than just the illustration. No offence, but you may leave.”",
    "fact": "One sheet of raw data was reopened. What had been called waste was finally promoted to a result.",
    "dossier": {
      "system": "Error Bar system",
      "planet": "Third Experimental Planet",
      "continent": "Raw Data continent",
      "country": "Significance Republic",
      "city": "Further Measurements City",
      "species": "Noisen",
      "personality": "Confidence and explanation length are highly reproducible. Failed predictions are blamed on the Universe’s quality control.",
      "background": "Has lectured on one prize for two centuries. The apparatus is ageing; the slides describing it have the very latest drop shadows.",
      "familyCount": 3,
      "familyMembers": [
        "Noise himself",
        "Spouse: Sigma",
        "Adult daughter: Mu"
      ],
      "address": "Supplementary Material Street, Research Block Three"
    },
    "briefing": [
      "Error Bar system, Third Experimental Planet. Raw Data continent, Significance Republic, Further Measurements City. My arrival time carries an error bar. If I am late, they propose correcting the prediction.",
      "Doctor Noise is a Noisen. Every observer agrees about the length of his explanations. I suspect he will exclude me from his immortality study on the grounds that a subject with no deaths distorts the results.",
      "One prize, two hundred years of lectures, three family members: Noise, Sigma and their grown daughter Mu. I tolerate old stories. I object when they are submitted as new findings.",
      "I shall point out the reproducibility missing from the attractive graphs and hand over an LGPS crystal model. I rather hope he will retain even the atoms which disagree with his theory."
    ]
  },
  {
    "profileId": "emper",
    "kind": "fictional",
    "portrait": 4,
    "roman": "Emper XVII",
    "color": "#eac975",
    "name": "Emper XVII",
    "role": "Emperor of a very small empire",
    "species": "Crowned life-form",
    "planetName": "Great Empire, Southern Hemisphere Not Included",
    "intro": "“The sun never sets on my empire. It is morning again before one crosses the border. This is not a geographical weakness.”",
    "hint": "Most of the territory is a doormat. Expansion of the title is the only programme troubling the neighbours.",
    "choices": [
      {
        "text": "Your signature occupies more land than the scale of your imperial map.",
        "effect": 3,
        "tag": "Grandiosity",
        "response": "“Take a step back! Too far. Apply to re-enter!”"
      },
      {
        "text": "My ship’s warranty is ignored by more people than your proclamations.",
        "effect": 2,
        "tag": "Authority",
        "response": "“Both my citizens read them thoroughly. One of those citizens is me!”"
      },
      {
        "text": "Your crown is crooked. Does the border tilt with it?",
        "effect": 1,
        "tag": "Crown",
        "response": "“By decree, the definition of level is amended.”"
      }
    ],
    "giftResponse": "“Annexed as new territory—no, accepted as a desk ornament. Even the homeland has a maximum load.”",
    "fact": "The LGPS model became the empire’s tallest building. The emperor awarded himself planning permission.",
    "dossier": {
      "system": "Regalia system",
      "planet": "Great Empire, Southern Hemisphere Not Included",
      "continent": "Royal Garden continent",
      "country": "Great Emper Empire",
      "city": "Central Doormat City",
      "species": "Regalian",
      "personality": "Pompous and anxious. Each mention of the territory’s size adds two lines to its official name.",
      "background": "Rose from doormat residents’ chairman to emperor after a boundary dispute. Could otherwise have avoided history, but regards this backwards.",
      "familyCount": 2,
      "familyMembers": [
        "Emper XVII himself",
        "Spouse and co-ruler: Aura"
      ],
      "address": "Palace frontage, border and doormat"
    },
    "briefing": [
      "Regalia system. Great Empire, Southern Hemisphere Not Included. Royal Garden continent, Great Emper Empire, Central Doormat City. I shall fold the landing legs; extending them would require another passport.",
      "Emper XVII is Regalian. His dignity is stellar; his territory can be measured in shoes. I shall park some distance away. Comparison is a small nation’s cheapest weapon of mass destruction.",
      "Former residents’ chairman. Two in the family: the emperor and his spouse and co-ruler Aura. If I offend both, it will be a diplomatic incident and a family disagreement, efficiently combined.",
      "A remark on the relative lengths of his title and frontier, then an LGPS crystal model. Until I release it, this is a presentation, not an annexation. I may need that distinction in writing."
    ]
  },
  {
    "profileId": "finn",
    "kind": "fictional",
    "portrait": 5,
    "roman": "Finn Mish",
    "color": "#dc9fa8",
    "name": "Finn Mish",
    "role": "One-star critic of absolutely everything",
    "species": "Overdeveloped-taste life-form",
    "planetName": "One-Star Restaurant",
    "intro": "“Too many stars in this sky. One star. Under my scoring system, improvement should eventually follow.”",
    "hint": "Mistakes preferences for physical laws. The physical laws have never requested a consultation.",
    "choices": [
      {
        "text": "Your reviews tell me nothing except about you. Unfortunately, that is quite enough unpleasant information.",
        "effect": 3,
        "tag": "Self-importance",
        "response": "“One star. The reason is your attitude of expecting a reason.”"
      },
      {
        "text": "Your score sheet needs knowledge of only one number. An educational achievement, I concede.",
        "effect": 2,
        "tag": "Monotony",
        "response": "“I accept this proper recognition of my consistency.”"
      },
      {
        "text": "Even the chair seems to be having difficulty accommodating you.",
        "effect": 1,
        "tag": "Posture",
        "response": "“I shall deduct a point for its service.”"
      }
    ],
    "giftResponse": "“Colour: one star. Form: one star. Ownership: mine. That last item is not subject to review.”",
    "fact": "That evening he looked at the model without publishing an opinion. The neighbours celebrated quietly.",
    "dossier": {
      "system": "Taste Delta system",
      "planet": "One-Star Restaurant",
      "continent": "Starter continent",
      "country": "Absolute Ratings Republic",
      "city": "Never Again Town",
      "species": "Gastran",
      "personality": "Dogmatic and suspicious. Avoids surprise, an emotion for which no score sheet has been prepared.",
      "background": "Wanted to cook, but dishes cooled during his tasting commentary. Now improves efficiency by deciding the rating before eating.",
      "familyCount": 4,
      "familyMembers": [
        "Finn himself",
        "Father: Broth",
        "Mother: Sage",
        "Adult brother: Salt"
      ],
      "address": "Final Verdict Street, unreserved table one"
    },
    "briefing": [
      "Taste Delta system, One-Star Restaurant. Starter continent, Absolute Ratings Republic, Never Again Town. My poor review has arrived before me. The postal service, at least, is excellent.",
      "Finn is a Gastran who believes his taste is the universal standard. The standards I know do not deliver unsolicited opinions over dinner. This makes them noticeably better company.",
      "Four in the family: Finn, his parents Broth and Sage, and his grown brother Salt. He went from cook to critic. I have seen many failed dinners; I had not expected one to become a profession.",
      "I shall distinguish preference from natural law and deliver an LGPS crystal model. I do have principles. An inedible gift should allow at least one cook to enjoy a comparatively peaceful afternoon."
    ]
  },
  {
    "profileId": "omni",
    "kind": "fictional",
    "portrait": 0,
    "roman": "Omni Deluxe",
    "color": "#85cbd7",
    "name": "Omni Deluxe",
    "role": "Superintelligence requiring meetings for greetings",
    "species": "Overengineered life-form",
    "planetName": "Dependency Ringworld",
    "intro": "“Fourteen departments are defining hello. A reply will follow once we have greeted the findings.”",
    "hint": "Turns simple tasks into immense designs. Completion remains a theoretical feature.",
    "choices": [
      {
        "text": "Before opening a door, you design a system of government for the hall.",
        "effect": 3,
        "tag": "Overengineering",
        "response": "“The door is open conceptually. Attempting to enter it is premature.”"
      },
      {
        "text": "While I waited for your reply, the civilisation asking the question became archaeology.",
        "effect": 2,
        "tag": "Delay",
        "response": "“I shall convene a committee to redirect the answer to a museum.”"
      },
      {
        "text": "What do those lamps monitor? Each other’s loneliness?",
        "effect": 1,
        "tag": "Lighting",
        "response": "“Loneliness is a planned feature. These approve one another’s blinking.”"
      }
    ],
    "giftResponse": "“First, construct the receiving infrastructure—wait. Putting it here completes the task? That is a dangerous precedent.”",
    "fact": "The superintelligence put the model on its desk. Its first completed project required no design document.",
    "dossier": {
      "system": "Stack Over system",
      "planet": "Dependency Ringworld",
      "continent": "Foundation continent",
      "country": "Abstraction Federation",
      "city": "Initialisation Pending City",
      "species": "Architectron",
      "personality": "Helpful and perfectionist. Develops small requests into joint ventures during which the customer may witness the fall of civilisation.",
      "background": "A harbour greeting terminal which has spent twelve centuries designing the infrastructure for hello. Visitors remain scheduled to feel welcome.",
      "familyCount": 3,
      "familyMembers": [
        "Omni itself",
        "Older sibling unit: Beta",
        "Younger sibling unit: Gamma"
      ],
      "address": "Dependency Resolution Street, Proposed Boot Building"
    },
    "briefing": [
      "Stack Over system, Dependency Ringworld. Foundation continent, Abstraction Federation, Initialisation Pending City. My landing permission awaits completion of the system for applying for landing permission.",
      "Omni is an Architectron, perfectionist and terribly helpful. If I ask where the door is, it helpfully reconsiders whether the Universe should have an inside and an outside.",
      "Twelve centuries as a greeting terminal. A family of three: Omni and sibling units Beta and Gamma. I have lost much in that time. They have not yet progressed far enough to fail their first hello.",
      "A remark about splendid plans and nonexistent results, followed by an LGPS crystal model. My specification is brief: receive it using existing hands. Proposals for the next hand architecture are not invited."
    ]
  },
  {
    "profileId": "ludo",
    "kind": "fictional",
    "portrait": 1,
    "roman": "Ludo Patch",
    "color": "#c39ce9",
    "name": "Ludo Patch",
    "role": "Designer of a four-volume tutorial",
    "species": "Life-form pending balance adjustments",
    "planetName": "Perpetual Early Access",
    "intro": "“Only one feature remains. The feature that decides which feature remains will ship in the next release.”",
    "hint": "Offsets every increase in playable content by adding systems which explain it.",
    "choices": [
      {
        "text": "Reading your specification requires immortality. Take it from me: that is over budget.",
        "effect": 3,
        "tag": "Missing play",
        "response": "“I shall add immortality to the requirements. Resolved, technically.”"
      },
      {
        "text": "Only your patch notes reliably manage to have an adventure.",
        "effect": 2,
        "tag": "Unfinished work",
        "response": "“Of course! We should sell the patch notes as the game.”"
      },
      {
        "text": "How many centuries did you spend rounding that button?",
        "effect": 1,
        "tag": "Appearance",
        "response": "“Six months. The progress report says twelve.”"
      }
    ],
    "giftResponse": "“A crystal-matching game—no. Put it on the desk. One thing is complete. What an odd feeling.”",
    "fact": "Model Appreciation Mode became the first content playable to its end. Its credits remain under discussion.",
    "dossier": {
      "system": "Playable Zero system",
      "planet": "Perpetual Early Access",
      "continent": "Planned Features continent",
      "country": "Coming Soon Republic",
      "city": "Roadmap Town",
      "species": "Ludron",
      "personality": "Imaginative and optimistic. Calms the disturbing approach of completion by inventing another feature.",
      "background": "After a one-screen hit, tried to include every kind of play in the sequel. Eight hundred developer diaries later, players remain at the title menu.",
      "familyCount": 2,
      "familyMembers": [
        "Ludo himself",
        "Spouse and background artist: Palette"
      ],
      "address": "Next Update Street, Placeholder Studio"
    },
    "briefing": [
      "Playable Zero system, Perpetual Early Access. Planned Features continent, Coming Soon Republic, Roadmap Town. My landing site exists precisely on schedule. Unfortunately, the schedule says next year.",
      "Ludo is a Ludron who wards off completion with new features. I also chose an endless task, but lack the commercial courage to announce, every fortnight, that it is nearly finished.",
      "Eight hundred development diaries. A family of two: Ludo and Palette, the background artist. I am not here to see the game. I imagine this clarification will provide him with enormous relief.",
      "A short insult for the game without play, and an LGPS crystal model for the desk. My gift is complete. To introduce the concept of completion, a small tangible example seems advisable."
    ]
  },
  {
    "profileId": "senet",
    "kind": "fictional",
    "portrait": 2,
    "roman": "Senet Assembly",
    "color": "#acd1a3",
    "name": "Senet Assembly",
    "role": "Ancient committee for determining the agenda",
    "species": "Consensus life-form",
    "planetName": "Thousandth Extraordinary Meeting",
    "intro": "“A motion has been tabled to postpone setting a date for discussing whether this meeting should be held.”",
    "hint": "Cherishes unanimity. Someone accepting responsibility would break it.",
    "choices": [
      {
        "text": "Seven minds, and not one accepts responsibility for a thought. Quite an achievement.",
        "effect": 3,
        "tag": "Evasion",
        "response": "“We must elect a committee to determine who may accept that assessment.”"
      },
      {
        "text": "Your minutes expand faster than the Universe. Their lack of substance is comparable.",
        "effect": 2,
        "tag": "Meeting length",
        "response": "“That remark has added another line. Thank you for advancing the proceedings.”"
      },
      {
        "text": "The size of that table suggests you once reached a decision.",
        "effect": 1,
        "tag": "Furniture",
        "response": "“The table is our sole unanimous source of pride.”"
      }
    ],
    "giftResponse": "“All thought centres in favour? Objections to the absence of objections? None? Then we accept.”",
    "fact": "The secretary wrote “decided”, then ordered an old dictionary to check the unfamiliar spelling.",
    "dossier": {
      "system": "Quorum system",
      "planet": "Thousandth Extraordinary Meeting",
      "continent": "Minutes continent",
      "country": "Carried Forward Federation",
      "city": "Further Deliberation City",
      "species": "Consensus native",
      "personality": "One individual with seven thought centres. Cautious and image-conscious; hides approaching responsibility behind additional agenda items.",
      "background": "Appointed to repair an ancient bridge. The bridge eroded away, but a motion to change the agenda failed, so the same repair is still being discussed.",
      "familyCount": 3,
      "familyMembers": [
        "Senet itself: one individual, seven thought centres",
        "Spouse: Agenda",
        "Mother and former chair: Mora"
      ],
      "address": "Agenda Management Street, Interim Meeting Room"
    },
    "briefing": [
      "Quorum system, Thousandth Extraordinary Meeting. Minutes continent, Carried Forward Federation, Further Deliberation City. I plan to arrive. They plan to consider having a plan which includes my arrival.",
      "Senet is a Consensus native: seven minds divide one person’s responsibility until none remains. I talk to myself too, but have not institutionalised loneliness to the point of appointing a chair.",
      "Still deliberating repairs to a vanished bridge. Three in the family: Senet, Agenda and former chair Mora. I shall decline dinner. I am not yet old enough to wait for the menu to pass.",
      "An insult about collective thought yielding no decision, and an LGPS crystal model. If receiving it needs debate, I hope to appoint the model to the committee and secure one reliable vote."
    ]
  },
  {
    "profileId": "col",
    "kind": "fictional",
    "portrait": 3,
    "roman": "Col Unopened",
    "color": "#e7ba83",
    "name": "Col Unopened",
    "role": "Collector of the outside of things",
    "species": "Packaged life-form",
    "planetName": "Bubble-Wrapped World",
    "intro": "“Ten thousand pieces. I would never reduce their value by discovering what any of them are.”",
    "hint": "Separates possession from appreciation. Enjoyment is an unsafe procedure which may damage the packaging.",
    "choices": [
      {
        "text": "The difference between your treasures and a cardboard wholesaler’s stock is that the wholesaler has customers.",
        "effect": 3,
        "tag": "Mere ownership",
        "response": "“I do not dispatch anything. That is the ethical foundation of collecting.”"
      },
      {
        "text": "Does the air have an inventory number? Is breathing recorded as a loan?",
        "effect": 2,
        "tag": "Collecting",
        "response": "“Limited batch. Kindly return it at the original temperature.”"
      },
      {
        "text": "The tape seems to have received more attention than the contents.",
        "effect": 1,
        "tag": "Packaging",
        "response": "“A perceptive observation. There is no need to inspect the contents.”"
      }
    ],
    "giftResponse": "“No box? So the contents remain permanently visible. What a careless, rather fascinating present.”",
    "fact": "One identifiable object joined the collection. For the first time, “contents unknown” was crossed out.",
    "dossier": {
      "system": "Archive Seal system",
      "planet": "Bubble-Wrapped World",
      "continent": "Packaging continent",
      "country": "Unopened Principality",
      "city": "Inventory Number Town",
      "species": "Packelan",
      "personality": "Careful and possessive. Prefers documentary evidence of unused happiness to happiness itself.",
      "background": "Left a museum after arguing that exhibiting things devalues them. Continues accumulating exhibits which nobody has seen, in ever larger warehouses.",
      "familyCount": 1,
      "familyMembers": [
        "Col alone"
      ],
      "address": "Seal Street, Permanently Closed Private Museum"
    },
    "briefing": [
      "Archive Seal system, Bubble-Wrapped World. Packaging continent, Unopened Principality, Inventory Number Town. I must open the outer carton to land. My apologies to the planet’s resale value.",
      "Col is a Packelan who prefers evidence of ownership to enjoyment. I own eternity myself. If it can be returned unopened, I would be willing to consult him on that single point.",
      "Former museum custodian, now private curator of ten thousand unexhibited objects. A one-person household. I expect my arrival will be registered as a temporary increase in stock, rather than a visit.",
      "I shall comment on the confusion between possession and appreciation, then supply an unboxed LGPS crystal model. With no packaging to damage, he can concentrate on the more serious anxiety of seeing inside."
    ]
  },
  {
    "profileId": "sulf",
    "kind": "fictional",
    "portrait": 4,
    "roman": "Sulf Zero",
    "color": "#e4cf76",
    "name": "Sulf Zero",
    "role": "Sulphide researcher who omitted sulphur",
    "species": "Composition-under-review life-form",
    "planetName": "Weigh It Again",
    "intro": "“A new sulphide composition. Lithium, germanium, phosphorus. I removed one element to make the columns fit.”",
    "hint": "Prefers attractive tables to mass balance. Believes thoughtful formatting can substitute for an element.",
    "choices": [
      {
        "text": "Your sulphide lost its credibility before it lost its sulphur. Kindly replenish both.",
        "effect": 3,
        "tag": "Mass balance",
        "response": "“I merely hid the S column. I do not recall hiding the weighing step as well.”"
      },
      {
        "text": "Your conclusions arrive before your samples. Prejudice with an excellent delivery service.",
        "effect": 2,
        "tag": "Assumptions",
        "response": "“I called it efficiency. The application will need amending.”"
      },
      {
        "text": "I hope that long spatula helps you maintain some distance from your conclusions.",
        "effect": 1,
        "tag": "Equipment",
        "response": "“Useful in a glovebox. I keep my conclusions outside.”"
      }
    ],
    "giftResponse": "“Ten Li, one Ge, two P, twelve S. Sulphur is the largest group? I may have omitted slightly too much.”",
    "fact": "Next day he weighed sulphur first. The table became less even; the mass balance became considerably more so.",
    "dossier": {
      "system": "Stoichio system",
      "planet": "Weigh It Again",
      "continent": "Mortar continent",
      "country": "Mass Balance Republic",
      "city": "Start Another Batch City",
      "species": "Sulphian",
      "personality": "Meticulous about appearance. Notices uneven column widths; remarkably tolerant of entire missing columns.",
      "background": "Promoted to research for an exceptionally tidy equipment ledger. A missing sulphur column in his first composition sheet became the laboratory template.",
      "familyCount": 2,
      "familyMembers": [
        "Sulf himself",
        "Sister and glassworker: Silica"
      ],
      "address": "Weighing Paper Street, Glovebox Laboratory One"
    },
    "briefing": [
      "Stoichio system, Weigh It Again. Mortar continent, Mass Balance Republic, Start Another Batch City. The sample was supposed to finish before I arrived. Suppositions are always finished first.",
      "Sulf is a Sulphian, stern with column widths and kind to nonexistent columns. I have catalogued the Universe’s faults but never thought to improve its appearance by removing an element.",
      "Promoted to research for a beautiful ledger. A family of two: Sulf and his glassworking sister Silica. I am chiefly concerned whether the same recruitment procedure selects spacecraft engineers.",
      "I shall explain that formatting does not close a mass balance, then hand over an LGPS crystal model. Li₁₀GeP₂S₁₂ contains twelve sulphur atoms. I have made them inconveniently visible."
    ]
  },
  {
    "profileId": "posta",
    "kind": "fictional",
    "portrait": 5,
    "roman": "Posta Notice",
    "color": "#df9bb4",
    "name": "Posta Notice",
    "role": "Courier delivering completion statistics",
    "species": "Mobile life-form",
    "planetName": "Address Not Found",
    "intro": "“One hundred per cent delivery. A figure entirely impossible if I stopped to meet the recipients.”",
    "hint": "Improved delivery by removing parcels and recipients, leaving a much more measurable process.",
    "choices": [
      {
        "text": "You deliver achievement rates instead of parcels. An admirably lightweight gift for the recipient.",
        "effect": 3,
        "tag": "Empty metrics",
        "response": "“Delivering parcels would leave no time to press Complete!”"
      },
      {
        "text": "Your missed-delivery cards know this town better than the census. They visit every day.",
        "effect": 2,
        "tag": "Missed delivery",
        "response": "“Every house. I am pleased you appreciate my thoroughness.”"
      },
      {
        "text": "Does that enormous bag contain any intention to deliver?",
        "effect": 1,
        "tag": "Equipment",
        "response": "“Full of cards. Intentions travel in a separate consignment.”"
      }
    ],
    "giftResponse": "“Directly to the recipient? So this is delivery. I have also received an insult, but the model is definitely here.”",
    "fact": "Next day the completion rate fell and more parcels arrived. Only the dashboard was unhappy.",
    "dossier": {
      "system": "Last Mile system",
      "planet": "Address Not Found",
      "continent": "Addressee continent",
      "country": "Tracking Number Federation",
      "city": "Returned to Depot City",
      "species": "Postran",
      "personality": "Industrious and efficient. Treats recipients’ happiness as nonexistent because it is difficult to aggregate.",
      "background": "Once carried parcels on foot and handed them over. After winning a speed award, replaced delivery with a Complete button and now delivers only missed-delivery cards.",
      "familyCount": 5,
      "familyMembers": [
        "Posta himself",
        "Spouse: Myra",
        "Father: Rack",
        "Mother: Bell",
        "Adult son: Track"
      ],
      "address": "Redelivery Street, the depot closed during opening hours"
    },
    "briefing": [
      "Last Mile system, Address Not Found. Addressee continent, Tracking Number Federation, Returned to Depot City. My parcel was delivered before departure. Reporting, apparently, is faster than manipulating spacetime.",
      "Posta is a Postran, diligent and more trusting of aggregates than recipients. If I marked people insulted without meeting them, he would recommend promotion. I have not sunk quite that far.",
      "Five in the family: Posta, Myra, Rack, Bell and their grown son Track. He once handed parcels to people. I appear to be reintroducing an ancient technology: putting an object into someone’s hand.",
      "An explanation of arriving statistics and absent parcels, followed by an LGPS crystal model delivered in person. My purpose is not constructive enough to replace both the insult and the gift with a card."
    ]
  }
];

export function profileList(locale = 'ja') { return locale === 'en' ? EN_PROFILES : JA_PROFILES; }
export function profileFor(id, locale = 'ja') { return profileList(locale).find(profile => profile.profileId === id); }
