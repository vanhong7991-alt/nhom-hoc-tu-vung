// ============================================================
// DỮ LIỆU CỐ ĐỊNH - GÓC CỦA VÂN
// Thêm bài học: { name:"Tên bài", list:[...] }
// Từ vựng: { c1:"Kanji", c2:"Cách đọc", c3:"Nghĩa", c4:"Ví dụ", c5:"Đáp án", c6:"Giải thích", count:0 }
// Trắc nghiệm: { gramType:"quiz", q:"Câu hỏi", ans:"ĐA đúng", w1:"Sai1", w2:"Sai2", w3:"Sai3", explain:"Giải thích", count:0 }
// ============================================================
const vanData = {
    n1voca: {
        struct: [
            {
                name: "Bài 1 (Câu 1-24)", list: [
                    { c1: "身内", c2: "みうち", c3: "người thân trong gia đình", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "配偶者", c2: "はいぐうしゃ", c3: "vợ/chồng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "温もり", c2: "ぬくもり", c3: "sự ấm áp", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "名付ける", c2: "なづける", c3: "đặt tên", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "すやすや", c2: "すやすや", c3: "ngủ ngon, ngủ say", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "懐く", c2: "なつく", c3: "trở nên thân quen, quấn quýt", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "強請る", c2: "ねだる", c3: "vòi vĩnh, đòi hỏi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "拗ねる", c2: "すねる", c3: "dỗi, hờn dỗi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "指図", c2: "さしず", c3: "chỉ huy, sai bảo", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "家出", c2: "いえで", c3: "bỏ nhà đi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "ぎくしゃく", c2: "ぎくしゃく", c3: "không suôn sẻ, gượng gạo", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "言い張る", c2: "いいはる", c3: "khăng khăng, khẳng định", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "散々", c2: "さんざん", c3: "tan nát, thảm hại", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "然も", c2: "しかも", c3: "hơn nữa, lại còn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "山々", c2: "やまやま", c3: "rất muốn nhưng...", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "再婚", c2: "さいこん", c3: "tái hôn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "健在", c2: "けんざい", c3: "vẫn khỏe mạnh, vẫn hoạt động tốt", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "労る", c2: "いたわる", c3: "chăm sóc, quan tâm", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "受け継ぐ", c2: "うけつぐ", c3: "thừa kế, kế thừa", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "遺産", c2: "いさん", c3: "di sản", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "掛け替えのない", c2: "かけがえのない", c3: "không thể thay thế", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "気心", c2: "きごころ", c3: "tính cách, tâm ý", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "打ち明ける", c2: "うちあける", c3: "thổ lộ, tâm sự", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "察する", c2: "さっする", c3: "đoán hiểu, suy ra", c4: "", c5: "", c6: "", count: 0 }
                ]
            }
        ],
        quiz: [
            {
                name: "Bài 1 (Câu 1-25)", list: [
                    { gramType: "quiz", q: "コツコツという足音が廊下に( ________)。", ans: "ひびいた", w1: "ないた", w2: "わいた", w3: "なびいた", explain: "「響く（ひびく）」＝ âm thanh vang, dội lại → Dịch: Tiếng bước chân “cộc cộc” vang lên trong hành lang", count: 0 },
                    { gramType: "quiz", q: "過ぎ去ったことを( ________)仕方がない。前を向いて生きていこう。", ans: "くやんで", w1: "なやんで", w2: "うらやんで", w3: "はやんで", explain: "「悔やむ（くやむ）」＝ hối hận, tiếc nuối → Dịch: Dù có hối hận về chuyện đã qua cũng vô ích. Hãy hướng về phía trước mà sống", count: 0 },
                    { gramType: "quiz", q: "ここは12階で周りのビルより高いので、視界を( ________)ものは何もない。", ans: "さえぎる", w1: "かすめる", w2: "とどめる", w3: "つきる", explain: "「遮る（さえぎる）」＝ che chắn, cản trở → Dịch: Vì ở tầng 12 và cao hơn các tòa nhà xung quanh nên không có gì che khuất tầm nhìn", count: 0 },
                    { gramType: "quiz", q: "国民は国会での首相の発言に( ________)反応し、各地で批判が起こった。", ans: "びんかん", w1: "みんかん", w2: "みんがん", w3: "びんがん", explain: "「敏感（びんかん）」＝ nhạy cảm → Dịch: Người dân phản ứng nhạy cảm với phát biểu của thủ tướng tại quốc hội, và các chỉ trích đã xảy ra ở nhiều nơi", count: 0 },
                    { gramType: "quiz", q: "世界的に男性より女性のほうが平均( ________)が長い傾向がある。", ans: "じゅみょう", w1: "じゅめい", w2: "じゅうめい", w3: "じゅうみょう", explain: "「寿命（じゅみょう）」＝ tuổi thọ → Dịch: Trên thế giới, phụ nữ có xu hướng sống thọ hơn nam giới", count: 0 },
                    { gramType: "quiz", q: "山田選手は3本のヒットでチームの勝利に( ________)。", ans: "貢献した", w1: "かいけん", w2: "かいなん", w3: "こうなん", explain: "「貢献（こうけん）」＝ đóng góp → Dịch: Cầu thủ Yamada đã góp phần vào chiến thắng của đội với 3 cú đánh trúng", count: 0 },
                    { gramType: "quiz", q: "クラスメートの森田さんとデートしているところを友達に見られて( ________)。", ans: "ひやかされた", w1: "しいられた", w2: "もてなされた", w3: "ひきいられた", explain: "「ひやかす」＝ trêu chọc → Dịch: Bị bạn bè trêu chọc khi bị nhìn thấy đang hẹn hò với bạn Morita", count: 0 },
                    { gramType: "quiz", q: "( ________)の社長が、この会社を大きく発展させたらしい。", ans: "先代", w1: "古代", w2: "近郊", w3: "近世", explain: "「先代（せんだい）」＝ đời trước → Dịch: Có vẻ như vị giám đốc đời trước đã phát triển công ty này lớn mạnh", count: 0 },
                    { gramType: "quiz", q: "あの俳優は前から人気はあったが、例のドラマで去年一気に( ________)した。", ans: "ブレイク", w1: "スルー", w2: "ボイコット", w3: "ブーム", explain: "「ブレイクする」＝ nổi tiếng bùng nổ → Dịch: Nam diễn viên đó vốn đã nổi tiếng, nhưng nhờ bộ phim đó mà năm ngoái đã bùng nổ tên tuổi", count: 0 },
                    { gramType: "quiz", q: "いつも仕事をしない彼があの大変な仕事をやらせてくれだなんて、何か( ________)があるに違いない。", ans: "下心", w1: "内心", w2: "気心", w3: "裏心", explain: "「下心（したごころ）」＝ động cơ thầm kín → Dịch: Người vốn không làm việc như anh ta mà lại xin làm việc khó đó, chắc chắn có động cơ gì đó", count: 0 },
                    { gramType: "quiz", q: "そのチームは、力強いプレーで敵を( ________)。", ans: "圧倒した", w1: "完敗した", w2: "健闘した", w3: "突撃した", explain: "「圧倒する」＝ áp đảo → Dịch: Đội đó đã áp đảo đối thủ bằng lối chơi mạnh mẽ", count: 0 },
                    { gramType: "quiz", q: "風邪をひいて頭が痛いが、さっき薬を飲んだので、( ________)よくなるだろう。", ans: "じきに", w1: "じかに", w2: "いかに", w3: "いきに", explain: "「じきに」＝ sớm thôi → Dịch: Bị cảm nên đau đầu nhưng vừa uống thuốc xong nên chắc sẽ sớm khỏi", count: 0 },
                    { gramType: "quiz", q: "今回の台風は、列島各地に大きな被害を( ________)。", ans: "もたらした", w1: "引きずった", w2: "おさめた", w3: "そこなった", explain: "「もたらす」＝ mang lại (kết quả) → Dịch: Cơn bão lần này đã gây ra thiệt hại lớn trên khắp các vùng", count: 0 },
                    { gramType: "quiz", q: "うちの会社とA社は同業ではあるが、( ________)が全然違う。", ans: "規模", w1: "目的", w2: "立地", w3: "方針", explain: "「スケール」＝ quy mô → Dịch: Công ty chúng tôi và công ty A cùng ngành nhưng quy mô hoàn toàn khác", count: 0 },
                    { gramType: "quiz", q: "学生ならほかに( ________)すべきことがあるんじゃない?。", ans: "集中", w1: "挑戦", w2: "研究", w3: "習得", explain: "「専念する」＝ chuyên tâm → Dịch: Nếu là sinh viên thì chẳng phải còn việc khác nên tập trung hơn sao", count: 0 },
                    { gramType: "quiz", q: "土地の( ________)に慣れるのには時間がかかるものだ。", ans: "慣習", w1: "味付", w2: "天候", w3: "言葉", explain: "「しきたり」＝ tập quán → Dịch: Làm quen với tập quán địa phương thì cần thời gian", count: 0 },
                    { gramType: "quiz", q: "会議の進行を( ________)ください。", ans: "邪魔しない", w1: "周知しない", w2: "停止しない", w3: "中断しない", explain: "「妨げる」＝ cản trở → Dịch: Xin đừng làm gián đoạn tiến trình cuộc họp", count: 0 },
                    { gramType: "quiz", q: "この記事は、( ________)のこれまでの発言をまとめたものだ。", ans: "都道府県の長", w1: "村の長", w2: "市の長", w3: "国の長", explain: "「知事」＝ tỉnh trưởng → Dịch: Bài báo này tổng hợp các phát biểu trước đây của thống đốc tỉnh", count: 0 },
                    { gramType: "quiz", q: "( ________)方法でダイエットをするのは体によくない。", ans: "偏った", w1: "間違った", w2: "簡単な", w3: "単純な", explain: "「極端」＝ cực đoan → Dịch: Giảm cân bằng phương pháp cực đoan không tốt cho cơ thể", count: 0 },
                    { gramType: "quiz", q: "【路線】使い方が最も適切なものを選択せよ。", ans: "市民たちは政策路線の変更を求めてデモを起こした", w1: "この路線に住んでいる住民はお金持ちが多い", w2: "彼は他人の言うことは気にしない路線で、自分のやり方を貫くタイプだ", w3: "踏切のない所で路線を横切ると危ない", explain: "「路線」＝ đường lối/chính sách → Dịch: Người dân đã biểu tình yêu cầu thay đổi đường lối chính sách", count: 0 },
                    { gramType: "quiz", q: "【いかにも】使い方が最も適切なものを選択せよ。", ans: "大学生に人気の店だけあって、店内の小物に至るまでいかにも若者が好みそうな雰囲気だ", w1: "近場でこんなにすばらしい景色が見られるなんて、いかにも夢のようだ", w2: "給料が魅力でこの会社に入ったが、残業続きで休日出勤も多いから、いかにも休みたい", w3: "高いところは苦手だから、私がいかにも登りたくないところは東京タワーだ", explain: "「いかにも」＝ đúng là, rõ ràng là → Dịch: Đúng là cửa hàng được sinh viên ưa thích nên từ đồ trang trí đến không khí đều rất hợp gu giới trẻ", count: 0 },
                    { gramType: "quiz", q: "【一息】使い方が最も適切なものを選択せよ。", ans: "作品の完成までもう一息だから、あきらめずに頑張ろうじゃないか", w1: "新聞の号外が配られ始めると、大勢の人々が一息に集まってきた", w2: "この作戦が成功すれば、犯人グループが一息に検挙できるだろう", w3: "彼女の一息は、今アメリカで経済の勉強をしている", explain: "「一息」＝ còn một chút nữa → Dịch: Chỉ còn một chút nữa là hoàn thành tác phẩm nên hãy cố gắng đừng bỏ cuộc", count: 0 },
                    { gramType: "quiz", q: "【割く】使い方が最も適切なものを選択せよ。", ans: "忙しい社長が僕のためにわざわざ時間を割いて話を聞いてくれた", w1: "手がすべって、父が大切にしていたお皿を割いてしまった", w2: "10年間友達の縁を割いていたが、再会したのをきっかけに仲直りした", w3: "この作業は一人では大変だから、グループで仕事を割いてすることにしましょう", explain: "「割く」＝ dành ra (thời gian, công sức) → Dịch: Vị giám đốc bận rộn đã dành thời gian nghe tôi nói", count: 0 },
                    { gramType: "quiz", q: "【シェア】使い方が最も適切なものを選択せよ。", ans: "円滑な業務遂行のために、知り得た情報はチーム全員でシェアすべきだ", w1: "このピザは8枚にシェアして食べることにしましょう", w2: "高齢化が進んだこの町では、シェアの60%は老人が占めている", w3: "ここでは毎年7月になるとアニメが好きな若者を中心に大規模なシェアが行われている", explain: "「シェア」＝ chia sẻ thông tin → Dịch: Để công việc diễn ra suôn sẻ, thông tin cần được chia sẻ với toàn bộ nhóm", count: 0 },
                    { gramType: "quiz", q: "【あやふや】使い方が最も適切なものを選択せよ。", ans: "好きでもないのにデートをするというようなあやふやな態度はとるべきじゃないよ", w1: "昨日の晩は満月だったのに、雲が多くて月があやふやにしか見えなかった", w2: "調査によると、若者の三人に一人が将来に対するあやふやな不安を抱えているという", w3: "遅刻ばかりしている彼が、上司や同僚にあやふやな人だと思われているのも当然だ", explain: "「あやふや」＝ mơ hồ, không rõ ràng → Dịch: Không nên có thái độ mập mờ như đi hẹn hò với người mình không thích", count: 0 }
                ]
            }
        ]
    },
    n2gram: {
        struct: [
            {
                name: "Bài 1 (Câu 1-10)", list: [
                    { c1: "～ぐらい（くらい）", c2: "", c3: "đến mức, đến độ", count: 0 },
                    { c1: "～わけだ", c2: "", c3: "thảo nào, bảo sao (kết quả hợp lý)", count: 0 },
                    { c1: "～はずだ", c2: "", c3: "chắc chắn, lẽ ra phải", count: 0 },
                    { c1: "～ないことはない", c2: "", c3: "không phải là không… (vẫn có thể)", count: 0 },
                    { c1: "～に違いない", c2: "", c3: "chắc chắn là", count: 0 },
                    { c1: "～ようにする", c2: "", c3: "cố gắng, tạo thói quen làm gì", count: 0 },
                    { c1: "～ばかりだ", c2: "", c3: "cứ ngày càng… (xu hướng xấu)", count: 0 },
                    { c1: "～おかげで", c2: "", c3: "nhờ có… (kết quả tốt)", count: 0 },
                    { c1: "～せいで", c2: "", c3: "tại vì… (kết quả xấu)", count: 0 },
                    { c1: "～ところだ", c2: "", c3: "đúng lúc (sắp/đang/vừa làm gì)", count: 0 }
                ]
            }
        ],
        quiz: [
            {
                name: "Bài 1 (Câu 1-10)", list: [
                    { gramType: "quiz", q: "1．専門家に( ________)、そんな環境は快適どころか一歩間違えると「危なくてしょうがない家」になってしまうかもしれないという。", ans: "言われたら", w1: "言われば", w2: "言わせると", w3: "言わせて", explain: "「〜に言われたら」＝ nếu bị/được nói bởi → giả định theo ý chuyên gia → Dịch: Nếu theo lời chuyên gia thì môi trường như vậy không những không thoải mái mà chỉ cần sai một bước có thể trở thành “ngôi nhà nguy hiểm không chịu nổi”", count: 0 },
                    { gramType: "quiz", q: "2．実際にたばこをやめた人間( ________)、事前準備さえしっかりとできていれば、禁煙は中距離どころか短距離走にもなり得ると思います。", ans: "から言わせてもらえば", w1: "に言わせていれば", w2: "から言わせてやれば", w3: "に言わせてあげれば", explain: "「〜から言わせてもらえば」＝ cho phép tôi nói từ góc nhìn → dùng để nêu ý kiến cá nhân → Dịch: Nếu nói từ góc nhìn của người đã bỏ thuốc, chỉ cần chuẩn bị tốt thì việc cai thuốc không phải chạy đường dài mà có thể là chạy ngắn", count: 0 },
                    { gramType: "quiz", q: "3．正直動画を見終わっても何の会社なのかは分からないのですが、最後まで( ________)力のある動画をトップページに採用しています。", ans: "見させてしまう", w1: "見させてみる", w2: "見られてしまう", w3: "見られてみる", explain: "「〜させてしまう」＝ khiến người khác vô thức làm → video có sức hút → Dịch: Thành thật mà nói dù xem xong vẫn không biết công ty gì, nhưng họ dùng video có sức hút khiến người ta xem đến cuối", count: 0 },
                    { gramType: "quiz", q: "4．重要な個人情報など、他人に( ________)困る情報は絶対に入力しないでください。", ans: "知られては", w1: "知られつつも", w2: "知らせられつつも", w3: "知らせられては", explain: "「〜ては困る」＝ nếu bị… thì sẽ rắc rối → Dịch: Tuyệt đối không nhập những thông tin mà nếu bị người khác biết sẽ gây phiền toái", count: 0 },
                    { gramType: "quiz", q: "5．それをどう受け止めてゆくかは、意外と人生にとって大事なことのように、私には( ________)。", ans: "思われる", w1: "思う", w2: "思っている", w3: "思わせる", explain: "「〜ように思われる」＝ có cảm giác là → cách nói khách quan → Dịch: Với tôi, việc tiếp nhận điều đó như thế nào dường như là điều quan trọng trong cuộc đời", count: 0 },
                    { gramType: "quiz", q: "6．胃腸に優しい食べ物を摂取されて、どうか早く回復( ________)。", ans: "されますように", w1: "いたしたく思います", w2: "願ってはどうですか", w3: "していらっしゃるでしょうか", explain: "「〜ますように」＝ cầu chúc → Dịch: Mong bạn ăn đồ nhẹ cho dạ dày và sớm hồi phục", count: 0 },
                    { gramType: "quiz", q: "7．現場の緊張感と責任感は数か月経過した今でも昨日のことのように( ________)。", ans: "思い出される", w1: "思い出す", w2: "思い出すだろう", w3: "思い出させた", explain: "「思い出される」＝ tự nhiên nhớ lại → Dịch: Dù đã qua vài tháng, cảm giác căng thẳng và trách nhiệm tại hiện trường vẫn hiện lên như mới hôm qua", count: 0 },
                    { gramType: "quiz", q: "8．恋愛禁止の塾に通う高校生たちがその中で付き合っている人がいることが発見。親や講師から( ________)二人、果たして花子は二人の恋を実らせられるのか。", ans: "別れさせられそうになる", w1: "別れそうになる", w2: "別れられそうになる", w3: "別れさせそうになる", explain: "「〜させられる」＝ bị ép làm → bị ép chia tay → Dịch: Hai người bị phát hiện hẹn hò trong môi trường cấm yêu và có nguy cơ bị cha mẹ, giáo viên ép chia tay", count: 0 },
                    { gramType: "quiz", q: "9．予約をしていないので( ________)、意外にもすんなり診てもらえた。", ans: "待たされるかと思いきや", w1: "待たされたかと思えば", w2: "待たされることと思い", w3: "待たされたことと思うが", explain: "「〜かと思いきや」＝ tưởng là… nhưng hóa ra → Dịch: Vì không đặt trước nên tưởng sẽ phải chờ lâu, nhưng lại được khám rất nhanh", count: 0 },
                    { gramType: "quiz", q: "10．20代で一度は諦めた夢を、もう一度目指そうと( ________)きっかけとは、いったいどんなものだったのでしょうか。", ans: "思わせてくれた", w1: "思われていた", w2: "思わせてはいけなかった", w3: "思われてならなかった", explain: "「〜させてくれた」＝ khiến ai đó có cảm xúc → Dịch: Điều gì đã trở thành động lực khiến bạn muốn theo đuổi lại giấc mơ từng từ bỏ ở tuổi 20 vậy", count: 0 }
                ]
            },
            {
                name: "Bài 2 (Câu 1-10)", list: [
                    { gramType: "quiz", q: "一回失敗したぐらいで、(★) ____ ____ ____いいだろう。\n① 言わなくても　② なにも　③ 悪く　④ そこまで", ans: "② → ④ → ③ → ①", w1: "① → ③ → ④ → ②", w2: "④ → ② → ① → ③", w3: "③ → ① → ② → ④", explain: "Đáp án: ② → ④ → ③ → ①\nCâu hoàn chỉnh: 一回失敗したぐらいで、なにもそこまで悪く言わなくてもいいだろう。\nDịch: Chỉ vì thất bại một lần thôi, đâu cần phải nói nặng đến mức đó", count: 0 },
                    { gramType: "quiz", q: "会社は倒産するのだろうか。支払われる__ (★) ____ ____いない。\n① 給料を　② 受け取って　③ べき　④ 今月はまだ", ans: "③ → ① → ④ → ②", w1: "① → ③ → ② → ④", w2: "④ → ① → ③ → ②", w3: "② → ④ → ① → ③", explain: "Đáp án: ③ → ① → ④ → ②\nCâu hoàn chỉnh: 会社は倒産するのだろうか。支払われるべき給料を今月はまだ受け取っていない。\nDịch: Không biết công ty có phá sản không, lương đáng lẽ phải được trả thì tháng này vẫn chưa nhận được", count: 0 },
                    { gramType: "quiz", q: "何年ぶりかで家族全員揃って、__ __ (★) __なあ。\n① かのようだ　② 一緒に　③ やってきた　④ 盆と正月が", ans: "④ → ② → ③ → ①", w1: "① → ③ → ② → ④", w2: "② → ④ → ① → ③", w3: "③ → ① → ④ → ②", explain: "Đáp án: ④ → ② → ③ → ①\nCâu hoàn chỉnh: 何年ぶりかで家族全員揃って、盆と正月が一緒にやってきたかのようだなあ。\nDịch: Lâu lắm rồi cả gia đình mới tụ họp đông đủ, cứ như Tết và lễ hội cùng đến một lúc", count: 0 },
                    { gramType: "quiz", q: "今年の冬は寒いのに、こたつがさっぱり売れない。__ __ (★) __いるが、違うんだろうか。\n① 売れるものだと　② こたつは　③ 言われて　④ 寒い冬ほど", ans: "④ → ② → ① → ③", w1: "① → ④ → ③ → ②", w2: "② → ③ → ④ → ①", w3: "③ → ① → ② → ④", explain: "Đáp án: ④ → ② → ① → ③\nCâu hoàn chỉnh: 今年の冬は寒いのに、こたつがさっぱり売れない。寒い冬ほどこたつは売れるものだと言われているが、違うんだろうか。\nDịch: Mùa đông năm nay lạnh mà bàn kotatsu lại không bán được, người ta nói càng lạnh thì càng bán chạy nhưng có lẽ không đúng", count: 0 },
                    { gramType: "quiz", q: "そのスポーツは、もともと__ __ (★) __。\n① ことを目的として　② ものだ　③ 考え出された　④ 身を守る", ans: "④ → ① → ③ → ②", w1: "① → ③ → ② → ④", w2: "③ → ④ → ① → ②", w3: "② → ① → ④ → ③", explain: "Đáp án: ④ → ① → ③ → ②\nCâu hoàn chỉnh: そのスポーツは、もともと身を守ることを目的として考え出されたものだ。\nDịch: Môn thể thao đó ban đầu được nghĩ ra nhằm mục đích tự bảo vệ bản thân", count: 0 },
                    { gramType: "quiz", q: "彼女が会社を辞めたのには、言うに__ __ (★) __。\n① 事情が　② に違いない　③ 言えない　④ あった", ans: "③ → ① → ④ → ②", w1: "① → ③ → ② → ④", w2: "④ → ② → ③ → ①", w3: "② → ④ → ① → ③", explain: "Đáp án: ③ → ① → ④ → ②\nCâu hoàn chỉnh: 彼女が会社を辞めたのには、言うに言えない事情があったに違いない。\nDịch: Việc cô ấy nghỉ công ty chắc hẳn có lý do khó nói", count: 0 },
                    { gramType: "quiz", q: "誰だって年をとるのだから、老人問題(★) ____ ____ ____とは言ってはいけないはずです。\n① など　② なんて　③ 関係がない　④ 自分とは", ans: "② → ④ → ③ → ①", w1: "① → ③ → ④ → ②", w2: "④ → ① → ② → ③", w3: "③ → ② → ① → ④", explain: "Đáp án: ② → ④ → ③ → ①\nCâu hoàn chỉnh: 誰だって年をとるのだから、老人問題なんて自分とは関係がないなどとは言ってはいけないはずです。\nDịch: Ai rồi cũng sẽ già đi nên không nên nói rằng vấn đề người già không liên quan đến mình", count: 0 },
                    { gramType: "quiz", q: "A「こちらに新しいご住所をお書きください。」\nB「あ、新しい住所を__ __ __ (★) しまったわ。家に母がいるから聞いてみます。」\n① くる　② メモして　③ 忘れて　④ のを", ans: "② → ① → ④ → ③", w1: "① → ④ → ② → ③", w2: "③ → ② → ① → ④", w3: "④ → ③ → ② → ①", explain: "Đáp án: ② → ① → ④ → ③\nCâu hoàn chỉnh: あ、新しい住所をメモしてくるのを忘れてしまったわ。家に母がいるから聞いてみます。\nDịch: À, tôi quên mất việc ghi lại địa chỉ mới rồi, để tôi gọi hỏi mẹ ở nhà", count: 0 },
                    { gramType: "quiz", q: "A「火災保険に入っているんだから、払ってくれるんでしょうね。」\nB「お客様、火災保険では__ __ (★) __できかねます。」\n① 被害には　② よる　③ お支払い　④ 地震に", ans: "④ → ② → ① → ③", w1: "① → ④ → ③ → ②", w2: "② → ③ → ① → ④", w3: "③ → ② → ④ → ①", explain: "Đáp án: ④ → ② → ① → ③\nCâu hoàn chỉnh: お客様、火災保険では地震による被害にはお支払いできかねます。\nDịch: Thưa quý khách, bảo hiểm cháy nổ không thể chi trả cho thiệt hại do động đất", count: 0 },
                    { gramType: "quiz", q: "帰りにちゃんとカバンの中に入れたつもりだったので、まだ__ __ (★) __思いませんでした。\n① 置きっぱなしだ　② 夢にも　③ 机の上に　④ なんて", ans: "③ → ① → ④ → ②", w1: "② → ③ → ① → ④", w2: "① → ④ → ② → ③", w3: "④ → ② → ③ → ①", explain: "Đáp án: ③ → ① → ④ → ②\nCâu hoàn chỉnh: 帰りにちゃんとカバンの中に入れたつもりだったので、まだ机の上に置きっぱなしだなんて夢にも思いませんでした。\nDịch: Vì tôi nghĩ là đã bỏ vào cặp rồi nên không thể ngờ là vẫn để quên trên bàn", count: 0 }
                ]
            }
        ]
    },
    bjtvoca: {
        struct: [
            {
                name: "Bài 1", list: [
                    { c1: "アイコン", c2: "", c3: "biểu tượng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "デザイン", c2: "", c3: "thiết kế", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "ウェブ", c2: "", c3: "web", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "サイト", c2: "", c3: "trang web", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "失礼", c2: "しつれい", c3: "thất lễ", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "相談", c2: "そうだん", c3: "trao đổi, bàn bạc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "挨拶", c2: "あいさつ", c3: "chào hỏi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "お詫び", c2: "おわび", c3: "xin lỗi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "相手", c2: "あいて", c3: "đối phương", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "相対", c2: "そうたい", c3: "tương đối", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "IT", c2: "", c3: "công nghệ thông tin", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "ID", c2: "", c3: "mã định danh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "IQ", c2: "", c3: "chỉ số thông minh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "IC", c2: "", c3: "mạch tích hợp", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "相見積もり", c2: "あいみつもり", c3: "báo giá cạnh tranh từ nhiều bên", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アウトレット", c2: "", c3: "cửa hàng giảm giá", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アクション", c2: "", c3: "hành động", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "オールカラー", c2: "", c3: "in màu toàn bộ", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アウトソーシング", c2: "", c3: "thuê ngoài", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "インターフォン", c2: "", c3: "chuông cửa có hình/tiếng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "カテゴリー", c2: "", c3: "danh mục", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "コマーシャル", c2: "", c3: "quảng cáo", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "青写真", c2: "あおじゃしん", c3: "kế hoạch sơ bộ", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "あおり", c2: "", c3: "tác động tiêu cực, ảnh hưởng dây chuyền", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "あおる", c2: "", c3: "kích động, thúc đẩy", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "赤字", c2: "あかじ", c3: "lỗ", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "黒字", c2: "くろじ", c3: "lãi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "白字", c2: "しろじ", c3: "chữ trắng / không dùng tài chính", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "売上", c2: "うりあげ", c3: "doanh thu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "上がる", c2: "あがる", c3: "tăng lên", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "下がる", c2: "さがる", c3: "giảm xuống", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "商い", c2: "あきない", c3: "buôn bán", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "レクリエーション", c2: "", c3: "giải trí", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "レッスン", c2: "", c3: "bài học", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "ラベル", c2: "", c3: "nhãn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アクションを起こす", c2: "", c3: "hành động, bắt đầu hành động", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アクセス", c2: "", c3: "lượt truy cập", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "揚げ足を取る", c2: "あげあしをとる", c3: "bắt bẻ, soi lỗi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "上げる", c2: "あげる", c3: "nâng lên", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "朝一", c2: "あさいち", c3: "việc đầu tiên buổi sáng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "足が出る", c2: "あしがでる", c3: "vượt ngân sách", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "足踏み", c2: "あしぶみ", c3: "giậm chân tại chỗ", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "足元にも及ばない", c2: "あしもとにもおよばない", c3: "không thể so sánh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "足を運ぶ", c2: "あしをはこぶ", c3: "đích thân đến", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "足を引っ張る", c2: "あしをひっぱる", c3: "cản trở", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "遊び", c2: "あそび", c3: "độ rơ (máy móc)", c4: "", c5: "", c6: "", count: 0 }
                ]
            },
            {
                name: "Bài 2", list: [
                    { c1: "頭打ち", c2: "あたまうち", c3: "chững lại, đạt giới hạn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "耳打ち", c2: "みみうち", c3: "thì thầm", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "頭が痛い", c2: "あたまがいたい", c3: "đau đầu (nghĩa đen & bóng)", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "頭が切れる", c2: "あたまがきれる", c3: "thông minh, nhanh nhạy", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "頭金", c2: "あたまきん", c3: "tiền đặt cọc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "前金", c2: "まえきん", c3: "tiền trả trước", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "後金", c2: "あときん", c3: "tiền trả sau", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "貸金", c2: "かしきん", c3: "tiền cho vay", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "頭割り", c2: "あたまわり", c3: "chia đều", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "当たり", c2: "あたり", c3: "mỗi người (bình quân)", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "悪化", c2: "あっか", c3: "xấu đi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "販売", c2: "はんばい", c3: "bán hàng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "圧縮", c2: "あっしゅく", c3: "nén (dữ liệu)", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "閲覧", c2: "えつらん", c3: "xem, duyệt", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "宛て", c2: "あて", c3: "gửi đến", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "当て", c2: "あて", c3: "dựa vào", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "宛先", c2: "あてさき", c3: "địa chỉ người nhận", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "宛名", c2: "あてな", c3: "tên người nhận", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "名刺", c2: "めいし", c3: "danh thiếp", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アドレス", c2: "", c3: "địa chỉ (email)", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アバウト", c2: "", c3: "đại khái", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アピール", c2: "", c3: "thể hiện, nhấn mạnh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アプリケーション", c2: "", c3: "ứng dụng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アポ", c2: "", c3: "cuộc hẹn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "甘い", c2: "あまい", c3: "chưa chặt chẽ, dễ dãi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "洗い出し", c2: "あらいだし", c3: "sự liệt kê, làm rõ", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "洗い出す", c2: "あらいだす", c3: "liệt kê ra", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "予め", c2: "あらかじめ", c3: "trước", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "改めて", c2: "あらためて", c3: "lại một lần nữa", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "改める", c2: "あらためる", c3: "sửa đổi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "粗利", c2: "あらり", c3: "lợi nhuận gộp", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "アレンジ", c2: "", c3: "điều chỉnh, sắp xếp lại", c4: "", c5: "", c6: "", count: 0 }
                ]
            }
        ],
        quiz: [
            {
                name: "Bài 1 (Câu 1-25)", list: [
                    { gramType: "quiz", q: "コンピュータマウスを使用してスクリーンで( ________)を動かし、メニューからコマンドを選択する。", ans: "アイコン", w1: "デザイン", w2: "ウェブ", w3: "サイト", explain: "「アイコン」＝ biểu tượng → Dịch: Di chuyển biểu tượng trên màn hình bằng chuột và chọn lệnh từ menu", count: 0 },
                    { gramType: "quiz", q: "A社の西村さんにはいつもお世話になっているので、一度( ________)に行ったほうがいいだろう。", ans: "挨拶", w1: "失礼", w2: "相談", w3: "お詫び", explain: "「挨拶」＝ chào hỏi → Dịch: Vì luôn được anh Nishimura giúp đỡ nên nên đi chào hỏi một lần", count: 0 },
                    { gramType: "quiz", q: "われわれは( ________)の100議席に対して250議席を獲得した。", ans: "相手", w1: "相談", w2: "相毛", w3: "相対", explain: "「相手」＝ đối phương → Dịch: Chúng tôi giành được 250 ghế so với 100 ghế của đối phương", count: 0 },
                    { gramType: "quiz", q: "パソコン好きの彼は、( ________)業界での就職を希望している。", ans: "IT", w1: "ID", w2: "IQ", w3: "IC", explain: "「IT」＝ công nghệ thông tin → Dịch: Anh ấy muốn làm việc trong ngành IT", count: 0 },
                    { gramType: "quiz", q: "パスワードと( ________)を入れないと、次の画面に進めない。", ans: "ID", w1: "IT", w2: "IC", w3: "IK", explain: "「ID」＝ mã người dùng → Dịch: Không nhập mật khẩu và ID thì không vào được màn tiếp theo", count: 0 },
                    { gramType: "quiz", q: "この件については、( ________)をとって価格を検討しよう。", ans: "相見積もり", w1: "相見責もり", w2: "相見債もり", w3: "相見績もり", explain: "「相見積もり」＝ báo giá so sánh → Dịch: Hãy lấy nhiều báo giá để xem xét giá", count: 0 },
                    { gramType: "quiz", q: "給与計算の事務を( ________)すれば、経理部の業務負担をかなり減らすことができる。", ans: "アウトソーシング", w1: "アウトレット", w2: "アクション", w3: "オールカラー", explain: "「アウトソーシング」＝ thuê ngoài → Dịch: Nếu thuê ngoài việc tính lương thì sẽ giảm tải cho phòng kế toán", count: 0 },
                    { gramType: "quiz", q: "この( ________)では一流ブランド品がそろい、25～65％オフで購入できます。", ans: "アウトレット", w1: "インターフォン", w2: "カテゴリー", w3: "コマーシャル", explain: "「アウトレット」＝ cửa hàng giảm giá → Dịch: Ở outlet này có hàng hiệu giảm 25–65%", count: 0 },
                    { gramType: "quiz", q: "この企画はまだ( ________)の段階で、これから内容を詰めるところです。", ans: "青写真", w1: "積写真", w2: "青写具", w3: "積写具", explain: "「青写真」＝ bản kế hoạch sơ bộ → Dịch: Kế hoạch này vẫn ở giai đoạn phác thảo", count: 0 },
                    { gramType: "quiz", q: "Aホテルは、不況の( ________)で閉鎖に追い込まれた。", ans: "あおり", w1: "いのり", w2: "おあり", w3: "かなり", explain: "「あおり」＝ tác động xấu → Dịch: Khách sạn bị đóng cửa do ảnh hưởng suy thoái", count: 0 },
                    { gramType: "quiz", q: "テレビ通販は、購買意欲を( ________)演出がうまい。", ans: "あおる", w1: "おある", w2: "かおる", w3: "かある", explain: "「あおる」＝ kích thích → Dịch: TV shopping giỏi kích thích nhu cầu mua", count: 0 },
                    { gramType: "quiz", q: "この冷夏でビールの売り上げが落ち込み、今月は2,000万円の( ________)が見込まれている。", ans: "赤字", w1: "黒字", w2: "白字", w3: "売上", explain: "「赤字」＝ lỗ → Dịch: Dự kiến lỗ 20 triệu yên", count: 0 },
                    { gramType: "quiz", q: "小さなクレームだと、上司まで報告が( ________)こない場合がある。", ans: "上がって", w1: "下がって", w2: "見込まれて", w3: "取り込んで", explain: "「上がる」＝ chuyển lên → Dịch: Khiếu nại nhỏ có thể không được báo lên cấp trên", count: 0 },
                    { gramType: "quiz", q: "ちょっとした小( ________)の店ならどこでもそれを買うことができる。", ans: "商い", w1: "荷い", w2: "章い", w3: "売い", explain: "「商い」＝ buôn bán → Dịch: Ở các cửa hàng nhỏ đều có thể mua được", count: 0 },
                    { gramType: "quiz", q: "これだと思う情報をつかんだら、素早く( ________)を起こすことが大切だ。", ans: "アクション", w1: "レクリエーション", w2: "レッスン", w3: "ラベル", explain: "「アクション」＝ hành động → Dịch: Khi nắm thông tin thì cần hành động nhanh", count: 0 },
                    { gramType: "quiz", q: "このサイトには、1日15万件の( ________)がある。", ans: "アクセス", w1: "タイトル", w2: "タイピスト", w3: "コントロール", explain: "「アクセス」＝ lượt truy cập → Dịch: Trang web có 150k lượt truy cập mỗi ngày", count: 0 },
                    { gramType: "quiz", q: "相手の( ________)ばかりいては議論にならない。", ans: "揚げ足を取って", w1: "傷げ足を取って", w2: "揚げ促を取って", w3: "傷げ促を取って", explain: "「揚げ足を取る」＝ bắt lỗi → Dịch: Chỉ bắt lỗi đối phương thì không thể tranh luận", count: 0 },
                    { gramType: "quiz", q: "対応が難しいクレームだったので、上司に報告を( ________)、指示を仰いだ。", ans: "上げて", w1: "上がって", w2: "上けて", w3: "上かって", explain: "「上げる」＝ báo lên → Dịch: Đã báo cáo lên cấp trên để xin chỉ thị", count: 0 },
                    { gramType: "quiz", q: "必要書類を明日( ________)で送れば、昼までには着くと思います。", ans: "朝一", w1: "夜一", w2: "明一", w3: "眠一", explain: "「朝一」＝ sáng sớm → Dịch: Gửi vào sáng sớm thì trưa sẽ tới", count: 0 },
                    { gramType: "quiz", q: "今度のイベント、予算が少ないから、パンフをオールカラーにしたら( ________)よ。", ans: "足が出る", w1: "促が入る", w2: "促が出る", w3: "足が入る", explain: "「足が出る」＝ vượt ngân sách → Dịch: In màu sẽ vượt ngân sách", count: 0 },
                    { gramType: "quiz", q: "( ________)状態にあった景気が今年に入ってやっと回復の兆しを見せてきた。", ans: "足踏み", w1: "足を運び", w2: "足が入り", w3: "足打ち", explain: "「足踏み」＝ đình trệ → Dịch: Kinh tế trì trệ nay đã có dấu hiệu hồi phục", count: 0 },
                    { gramType: "quiz", q: "売り上げは伸びたが、業界トップのA社と比べたら、まだまだ( ________)。", ans: "足元にも及ばない", w1: "足を運ばない", w2: "足を引っ張らない", w3: "足が切らない", explain: "「足元にも及ばない」＝ không bằng → Dịch: Vẫn chưa bằng công ty top", count: 0 },
                    { gramType: "quiz", q: "よりよい原材料を手に入れるため、開発スタッフは産地に何度も( ________)。", ans: "足を運んだ", w1: "足を遊んだ", w2: "足を並んだ", w3: "足を行った", explain: "「足を運ぶ」＝ đích thân đi → Dịch: Đã nhiều lần đến tận nơi nguyên liệu", count: 0 },
                    { gramType: "quiz", q: "円高が景気回復の足を( ________)いる。", ans: "引っ張って", w1: "引っ越して", w2: "引っ並んで", w3: "引っ切って", explain: "「足を引っ張る」＝ cản trở → Dịch: Đồng yên mạnh đang cản trở phục hồi kinh tế", count: 0 },
                    { gramType: "quiz", q: "ハンドルの( ________)は、大きすぎても小さすぎてもいけません。", ans: "遊び", w1: "並び", w2: "売り", w3: "切り", explain: "「遊び」＝ độ rơ → Dịch: Độ rơ của tay lái không được quá lớn hay quá nhỏ", count: 0 }
                ]
            },
            {
                name: "Bài 2 (Câu 26-50)", list: [
                    { gramType: "quiz", q: "発売後しばらくは好調だったが、この製品もそろそろ（___________）らしい。", ans: "頭打ち", w1: "背打ち", w2: "耳打ち", w3: "骨打ち", explain: "頭打ち（あたまうち）: đạt đến giới hạn, không tăng thêm nữa\\n背打ち（せうち）: không dùng thực tế\\n耳打ち（みみうち）: thì thầm, nói nhỏ vào tai\\n骨打ち（ほねうち）: không dùng tự nhiên\\nDịch: Sau khi ra mắt một thời gian thì bán tốt, nhưng có vẻ sắp chững lại.", count: 0 },
                    { gramType: "quiz", q: "佐藤さんの後任がなかなか決まらなくて、本当に（___________）。", ans: "頭が痛い", w1: "足が痛い", w2: "背が痛い", w3: "骨が痛い", explain: "足が痛い（あしがいたい）: đau chân\\n背が痛い（せがいたい）: đau lưng\\n頭が痛い（あたまがいたい）: đau đầu → nghĩa bóng: đau đầu vì vấn đề\\n骨が痛い（ほねがいたい）: không dùng tự nhiên\\nDịch: Không tìm được người thay nên rất đau đầu.", count: 0 },
                    { gramType: "quiz", q: "新しく来た課長、かなり（___________）らしいよ。", ans: "頭が切れる", w1: "足が切れる", w2: "足が上げる", w3: "頭が上げる", explain: "足が切れる（あしがきれる）: không dùng\\n頭が切れる（あたまがきれる）: đầu óc nhanh nhạy, thông minh\\n足が上げる（あしがあげる）: sai cấu trúc\\n頭が上げる（あたまがあげる）: sai cách dùng\\nDịch: Trưởng phòng mới rất giỏi.", count: 0 },
                    { gramType: "quiz", q: "マイホーム購入のため、（___________）として300万円を支払った。", ans: "頭金", w1: "前金", w2: "後金", w3: "貸金", explain: "前金（まえきん）: tiền trả trước\\n後金（あときん）: tiền trả sau\\n貸金（かしきん）: tiền cho vay\\n頭金（あたまきん）: tiền đặt cọc\\nDịch: Đã trả 3 triệu yên tiền đặt cọc mua nhà.", count: 0 },
                    { gramType: "quiz", q: "細かく計算するのは大変だから、支払いは（___________）にしよう。", ans: "頭割り", w1: "足打ち", w2: "足割り", w3: "頭打ち", explain: "足打ち（あしうち）: không dùng\\n足割り（あしわり）: không chuẩn\\n頭打ち（あたまうち）: chững lại\\n頭割り（あたまわり）: chia đều theo đầu người\\nDịch: Chia đều tiền cho đơn giản.", count: 0 },
                    { gramType: "quiz", q: "先月の社員一人（___________）の平均残業時間は20時間だった。", ans: "当たり", w1: "売たり", w2: "相たり", w3: "明たり", explain: "売たり（うりたり）: sai\\n当たり（あたり）: mỗi người\\n相たり（あいたり）: không dùng\\n明たり（あかりたり）: sai\\nDịch: Trung bình mỗi người làm thêm 20 giờ.", count: 0 },
                    { gramType: "quiz", q: "業績悪化や解約増加により、会社の状況はさらに（___________）している。", ans: "悪化", w1: "販売", w2: "悪手", w3: "宛先", explain: "販売（はんばい）: bán hàng\\n悪手（あくしゅ）: nước đi sai\\n悪化（あっか）: xấu đi\\n宛先（あてさき）: địa chỉ người nhận\\nDịch: Tình hình công ty ngày càng xấu.", count: 0 },
                    { gramType: "quiz", q: "このツールを使えば、データの（___________）が簡単に行える。", ans: "圧縮", w1: "運賃", w2: "運搬", w3: "閲覧", explain: "運賃（うんちん）: phí vận chuyển\\n運搬（うんぱん）: vận chuyển\\n閲覧（えつらん）: xem dữ liệu\\n圧縮（あっしゅく）: nén dữ liệu\\nDịch: Có thể dễ dàng nén dữ liệu.", count: 0 },
                    { gramType: "quiz", q: "山本さん（___________）に書類が届いています。", ans: "宛て", w1: "死て", w2: "充て", w3: "当て", explain: "死て（して）: sai\\n充て（あて）: dùng trong “充てる” (phân bổ)\\n当て（あて）: dựa vào, đoán\\n宛て（あて）: gửi đến\\nDịch: Có tài liệu gửi đến anh Yamamoto.", count: 0 },
                    { gramType: "quiz", q: "他人の力を（___________）にせず、自分でやってみます。", ans: "当て", w1: "阿て", w2: "充て", w3: "宛て", explain: "当て（あて）: dựa vào (当てにする)\\n阿て（あて）: sai\\n充て（あて）: phân bổ\\n宛て（あて）: gửi\\nDịch: Không dựa vào người khác.", count: 0 },
                    { gramType: "quiz", q: "荷物の送り先の住所、つまり（___________）を書いてください。", ans: "宛先", w1: "名刺", w2: "宛名", w3: "宛当", explain: "名刺（めいし）: danh thiếp\\n宛先（あてさき）: địa chỉ người nhận\\n宛名（あてな）: tên người nhận\\n宛当（あてとう）: sai\\nDịch: Hãy ghi địa chỉ người nhận.", count: 0 },
                    { gramType: "quiz", q: "封筒には、受け取る人の名前、つまり（___________）を記入する。", ans: "宛名", w1: "宛先", w2: "死名", w3: "死先", explain: "宛名（あてな）: tên người nhận\\n宛先（あてさき）: địa chỉ\\n死名（しめい）: sai\\n死先（しさき）: sai\\nDịch: Ghi tên người nhận trên phong bì.", count: 0 },
                    { gramType: "quiz", q: "連絡用のメール（___________）は履歴書に記載してあります。", ans: "アドレス", w1: "アピール", w2: "アバウト", w3: "アポイントメント", explain: "アドレス: địa chỉ (email)\\nアピール: thể hiện\\nアバウト: đại khái\\nアポイントメント: cuộc hẹn\\nDịch: Email đã ghi trong CV.", count: 0 },
                    { gramType: "quiz", q: "大体でいいので、目標の数字を（___________）で出してください。", ans: "アバウト", w1: "ジャンル", w2: "タイムリー", w3: "ナンセンス", explain: "ジャンル: thể loại\\nタイムリー: đúng lúc\\nアバウト: đại khái\\nナンセンス: vô lý\\nDịch: Đưa ra con số ước lượng.", count: 0 },
                    { gramType: "quiz", q: "面接では、自分の強みをしっかり（___________）したい。", ans: "アピール", w1: "アプリケーション", w2: "マスコミ", w3: "アンケート", explain: "アプリケーション: ứng dụng\\nマスコミ: truyền thông\\nアンケート: khảo sát\\nアピール: thể hiện\\nDịch: Muốn thể hiện điểm mạnh.", count: 0 },
                    { gramType: "quiz", q: "同じ（___________）を複数起動すると不具合が起きる場合がある。", ans: "アプリケーション", w1: "アンケート", w2: "デザイン", w3: "タイムリー", explain: "アンケート: khảo sát\\nアプリケーション: ứng dụng\\nデザイン: thiết kế\\nタイムリー: kịp thời\\nDịch: Mở nhiều ứng dụng có thể gây lỗi.", count: 0 },
                    { gramType: "quiz", q: "取引先とは、すでに（___________）を取りました。", ans: "アポ", w1: "アピール", w2: "アポロ", w3: "アポール", explain: "アピール: thể hiện\\nアポロ: sai\\nアポ: cuộc hẹn\\nアポール: sai\\nDịch: Đã hẹn đối tác.", count: 0 },
                    { gramType: "quiz", q: "計画が（___________）ため、費用が予想以上にかかってしまった。", ans: "甘い", w1: "想い", w2: "軽い", w3: "終い", explain: "想い: suy nghĩ\\n軽い: nhẹ\\n甘い: chưa chặt, lỏng lẻo\\n終い: kết thúc\\nDịch: Kế hoạch chưa kỹ nên tốn hơn.", count: 0 },
                    { gramType: "quiz", q: "アンケート結果をもとに課題の（___________）を行った。", ans: "洗い出し", w1: "洗い入り", w2: "洗い出す", w3: "洗い入れ", explain: "洗い入り: sai\\n洗い出し: việc liệt kê, làm rõ\\n洗い出す: động từ “liệt kê”\\n洗い入れ: sai\\nDịch: Đã tiến hành liệt kê vấn đề.", count: 0 },
                    { gramType: "quiz", q: "問題をすべて（___________）、改善策を考えましょう。", ans: "洗い出す", w1: "洗い入る", w2: "浴び出す", w3: "浴び入る", explain: "洗い入る: sai\\n洗い出す: làm rõ toàn bộ\\n浴び出す: sai\\n浴び入る: sai\\nDịch: Hãy làm rõ vấn đề.", count: 0 },
                    { gramType: "quiz", q: "参加できない場合は、（___________）ご連絡ください。", ans: "予め", w1: "字め", w2: "受め", w3: "改め", explain: "字め: sai\\n受め: sai\\n予め（あらかじめ）: trước\\n改め（あらため）: danh từ “lần khác”\\nDịch: Hãy báo trước.", count: 0 },
                    { gramType: "quiz", q: "後で（___________）ご連絡いたします。", ans: "改めて", w1: "認めて", w2: "務めて", w3: "努めて", explain: "改めて: lại một lần nữa\\n認めて: công nhận\\n務めて: đảm nhiệm\\n努めて: cố gắng\\nDịch: Sẽ liên lạc lại sau.", count: 0 },
                    { gramType: "quiz", q: "制度変更に伴い、規則を（___________）必要がある。", ans: "改める", w1: "認める", w2: "努める", w3: "諦める", explain: "改める: sửa đổi\\n認める: công nhận\\n努める: cố gắng\\n諦める: từ bỏ\\nDịch: Cần sửa quy định.", count: 0 },
                    { gramType: "quiz", q: "この事業では、最低でも（___________）を確保する必要がある。", ans: "粗利", w1: "粗理", w2: "相理", w3: "相利", explain: "粗理: sai\\n相理: sai\\n粗利（あらり）: lợi nhuận gộp\\n相利: sai\\nDịch: Cần đảm bảo lợi nhuận.", count: 0 },
                    { gramType: "quiz", q: "既存の商品に少し（___________）を加えただけで、売上が伸びた。", ans: "アレンジ", w1: "アンケート", w2: "アプール", w3: "アナウンサー", explain: "アンケート: khảo sát\\nアプール: sai\\nアナウンサー: phát thanh viên\\nアレンジ: điều chỉnh, sắp xếp lại\\nDịch: Chỉ điều chỉnh nhẹ mà doanh thu tăng.", count: 0 }
                ]
            }
        ]
    }
};
