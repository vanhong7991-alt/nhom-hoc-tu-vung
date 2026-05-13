$content = Get-Content "vanData.js" -Raw -Encoding UTF8

$n2vocaBlock = @"
 n2voca: {
        struct: [
            {
                name: "Bai 1",
                free: true,
                list: [
                    { c1: "人生", c2: "じんせい", c3: "nhan sinh, cuoc doi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "人間", c2: "にんげん", c3: "con nguoi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "祖先", c2: "そせん", c3: "to tien", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "親戚", c2: "しんせき", c3: "ho hang", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "夫婦", c2: "ふうふ", c3: "vo chong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "長男", c2: "ちょうなん", c3: "truong nam", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "主人", c2: "しゅじん", c3: "chong, chu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "双子", c2: "ふたご", c3: "sinh doi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "迷子", c2: "まいご", c3: "tre lac", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "他人", c2: "たにん", c3: "nguoi khac", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "敵", c2: "てき", c3: "ke thu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "味方", c2: "みかた", c3: "dong minh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "筆者", c2: "ひっしゃ", c3: "tac gia", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "寿命", c2: "じゅみょう", c3: "tuoi tho", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "将来", c2: "しょうらい", c3: "tuong lai", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "才能", c2: "さいのう", c3: "tai nang", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "能力", c2: "のうりょく", c3: "nang luc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "長所", c2: "ちょうしょ", c3: "so truong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "個性", c2: "こせい", c3: "ca tinh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "遺伝", c2: "いでん", c3: "di truyen", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "動作", c2: "どうさ", c3: "dong tac", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "真似", c2: "まね", c3: "bat chuoc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "睡眠", c2: "すいみん", c3: "giac ngu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "食欲", c2: "しょくよく", c3: "su them an", c4: "", c5: "", c6: "", count: 0 }
                ]
            },
            {
                name: "Bai 2",
                free: true,
                list: [
                    { c1: "外食", c2: "がいしょく", c3: "an ngoai", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "家事", c2: "かじ", c3: "viec nha", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "出産", c2: "しゅっさん", c3: "sinh con", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "介護", c2: "かいご", c3: "cham soc dieu duong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "出勤", c2: "しゅっきん", c3: "di lam", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "出世", c2: "しゅっせ", c3: "thang tien", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "地位", c2: "ちい", c3: "dia vi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "受験", c2: "じゅけん", c3: "du thi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "専攻", c2: "せんこう", c3: "chuyen nganh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "支度", c2: "したく", c3: "chuan bi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "全身", c2: "ぜんしん", c3: "toan than", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "服装", c2: "ふくそう", c3: "trang phuc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "礼", c2: "れい", c3: "le phep, cui chao", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "世辞", c2: "せじ", c3: "loi xa giao", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "言い訳", c2: "いいわけ", c3: "bien ho, vien co", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "話題", c2: "わだい", c3: "chu de cau chuyen", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "秘密", c2: "ひみつ", c3: "bi mat", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "尊敬", c2: "そんけい", c3: "ton kinh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "謙そん", c2: "けんそん", c3: "khiem ton", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "期待", c2: "きたい", c3: "ky vong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "苦労", c2: "くろう", c3: "gian kho, vat va", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "意志", c2: "いし", c3: "y chi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "感情", c2: "かんじょう", c3: "cam xuc", c4: "", c5: "", c6: "", count: 0 }
                ]
            },
            {
                name: "Bai 3",
                free: true,
                list: [
                    { c1: "材料", c2: "ざいりょう", c3: "nguyen lieu, vat lieu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "石", c2: "いし", c3: "da", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "ひも", c2: "ひも", c3: "day", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "券", c2: "けん", c3: "ve", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "名簿", c2: "めいぼ", c3: "danh sach", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "表", c2: "ひょう", c3: "bang bieu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "針", c2: "はり", c3: "kim", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "栓", c2: "せん", c3: "nut day", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "湯気", c2: "ゆげ", c3: "hoi nuoc nong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "日当たり", c2: "ひあたり", c3: "anh nang chieu vao", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "空", c2: "から", c3: "trong rong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "斜め", c2: "ななめ", c3: "cheo, nghieng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "履歴", c2: "りれき", c3: "ly lich", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "娯楽", c2: "ごらく", c3: "giai tri", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "司会", c2: "しかい", c3: "dan chuong trinh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "歓迎", c2: "かんげい", c3: "hoan nghenh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "窓口", c2: "まどぐち", c3: "quay giao dich", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "手続き", c2: "てつづき", c3: "thu tuc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "徒歩", c2: "とほ", c3: "di bo", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "駐車", c2: "ちゅうしゃ", c3: "do xe", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "違反", c2: "いはん", c3: "vi pham", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "平日", c2: "へいじつ", c3: "ngay thuong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "日付", c2: "ひづけ", c3: "ngay thang", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "日程", c2: "にってい", c3: "lich trinh", c4: "", c5: "", c6: "", count: 0 }
                ]
            }
        ],
        quiz: [
            {
                name: "De 1 (Cau 1-25)",
                free: true,
                list: [
                    { gramType: "quiz", q: "彼は子供の頃から音楽の( ________ )がある。", ans: "才能", w1: "動作", w2: "感情", w3: "個性", explain: "「才能」= tai nang", count: 0 },
                    { gramType: "quiz", q: "あの二人は( ________ )なので、顔も性格もよく似ている。", ans: "双子", w1: "夫婦", w2: "祖先", w3: "親戚", explain: "「双子」= sinh doi", count: 0 },
                    { gramType: "quiz", q: "子供が公園で( ________ )になって、警察に連絡した。", ans: "迷子", w1: "他人", w2: "敵", w3: "筆者", explain: "「迷子」= tre lac", count: 0 },
                    { gramType: "quiz", q: "健康のために、十分な( ________ )をとることが大切だ。", ans: "睡眠", w1: "食欲", w2: "動作", w3: "遺伝", explain: "「睡眠」= giac ngu", count: 0 },
                    { gramType: "quiz", q: "毎日残業が続いて、( ________ )がなくなってきた。", ans: "食欲", w1: "睡眠", w2: "才能", w3: "将来", explain: "「食欲」= su them an", count: 0 },
                    { gramType: "quiz", q: "この会社は今年で創立100年を迎えた。「創立」の読み方は？", ans: "そうりつ", w1: "そうりく", w2: "そりつ", w3: "そうりよく", explain: "「創立（そうりつ）」= thanh lap", count: 0 },
                    { gramType: "quiz", q: "彼女は会社でどんどん( ________ )して、今は部長になった。", ans: "出世", w1: "出勤", w2: "外食", w3: "家事", explain: "「出世」= thang tien", count: 0 },
                    { gramType: "quiz", q: "試験に合格するため、毎日図書館で( ________ )の勉強をしている。", ans: "受験", w1: "専攻", w2: "支度", w3: "介護", explain: "「受験」= du thi", count: 0 },
                    { gramType: "quiz", q: "彼はいつも自分の気持ちを( ________ )に出さない人だ。", ans: "感情", w1: "意志", w2: "動作", w3: "話題", explain: "「感情」= cam xuc", count: 0 },
                    { gramType: "quiz", q: "先生はいつも( ________ )で、自分の功績を自慢しない。", ans: "謙そん", w1: "尊敬", w2: "期待", w3: "苦労", explain: "「謙そん」= khiem ton", count: 0 },
                    { gramType: "quiz", q: "この問題を解くのに使う( ________ )が足りない。", ans: "材料", w1: "名簿", w2: "針", w3: "表", explain: "「材料」= nguyen lieu, vat lieu", count: 0 },
                    { gramType: "quiz", q: "イベントの参加者全員の名前が載っている( ________ )を確認してください。", ans: "名簿", w1: "表", w2: "券", w3: "材料", explain: "「名簿」= danh sach", count: 0 },
                    { gramType: "quiz", q: "電車に乗るための( ________ )を買った。", ans: "券", w1: "針", w2: "栓", w3: "ひも", explain: "「券」= ve", count: 0 },
                    { gramType: "quiz", q: "今月は収入より支出が多く、家計が( ________ )になってしまった。", ans: "赤字", w1: "予算", w2: "利益", w3: "勘定", explain: "「赤字」= tham hut, lo von", count: 0 },
                    { gramType: "quiz", q: "この商品は今週末まで( ________ )で手に入れることができる。", ans: "割引", w1: "定価", w2: "無料", w3: "合計", explain: "「割引」= giam gia", count: 0 },
                    { gramType: "quiz", q: "社員食堂では、昼食が( ________ )で食べられる。", ans: "無料", w1: "現金", w2: "定価", w3: "割引", explain: "「無料」= mien phi", count: 0 },
                    { gramType: "quiz", q: "彼は小さい頃から( ________ )を守り続けて、今は社長になった。", ans: "意志", w1: "感情", w2: "話題", w3: "苦労", explain: "「意志」= y chi", count: 0 },
                    { gramType: "quiz", q: "彼女の話はいつも面白くて、みんなの( ________ )になる。", ans: "話題", w1: "秘密", w2: "世辞", w3: "言い訳", explain: "「話題」= chu de cau chuyen", count: 0 },
                    { gramType: "quiz", q: "二人は何年も( ________ )を共にしてきた信頼できる夫婦だ。", ans: "苦労", w1: "期待", w2: "尊敬", w3: "謙そん", explain: "「苦労」= gian kho, vat va", count: 0 },
                    { gramType: "quiz", q: "親は子供の将来に大きな( ________ )をかけている。", ans: "期待", w1: "苦労", w2: "意志", w3: "感情", explain: "「期待」= ky vong", count: 0 },
                    { gramType: "quiz", q: "父の仕事の関係で、子供の頃から( ________ )の家で育った。", ans: "親戚", w1: "祖先", w2: "敵", w3: "味方", explain: "「親戚」= ho hang", count: 0 },
                    { gramType: "quiz", q: "誰でも( ________ )には長所と短所がある。", ans: "個性", w1: "才能", w2: "能力", w3: "遺伝", explain: "「個性」= ca tinh", count: 0 },
                    { gramType: "quiz", q: "彼の( ________ )を見れば、その人柄がよくわかる。", ans: "動作", w1: "遺伝", w2: "真似", w3: "能力", explain: "「動作」= dong tac", count: 0 },
                    { gramType: "quiz", q: "弟は兄の( ________ )ばかりして、自分で何もしない。", ans: "真似", w1: "動作", w2: "長所", w3: "個性", explain: "「真似」= bat chuoc", count: 0 },
                    { gramType: "quiz", q: "お体のご( ________ )をお祈りします。", ans: "寿命", w1: "将来", w2: "才能", w3: "長所", explain: "「寿命」= tuoi tho", count: 0 }
                ]
            }
        ]
    },
