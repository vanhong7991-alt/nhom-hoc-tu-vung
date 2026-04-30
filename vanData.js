    // ============================================================
    // DỮ LIỆU CỐ ĐỊNH - GÓC CỦA VÂN
    // Thêm bài học: { name:"Tên bài", list:[...] }
    // Từ vựng: { c1:"Kanji", c2:"Cách đọc", c3:"Nghĩa", c4:"Ví dụ", c5:"Đáp án", c6:"Giải thích", count:0 }
    // Trắc nghiệm: { gramType:"quiz", q:"Câu hỏi", ans:"ĐA đúng", w1:"Sai1", w2:"Sai2", w3:"Sai3", explain:"Giải thích", count:0 }
    // ============================================================
    const vanData = {
        n1voca: {
            struct: [
                { name: "Bài 1 (Câu 1-24)", list: [
                    { c1:"身内", c2:"みうち", c3:"người thân trong gia đình", c4:"", c5:"", c6:"", count:0 },
                    { c1:"配偶者", c2:"はいぐうしゃ", c3:"vợ/chồng", c4:"", c5:"", c6:"", count:0 },
                    { c1:"温もり", c2:"ぬくもり", c3:"sự ấm áp", c4:"", c5:"", c6:"", count:0 },
                    { c1:"名付ける", c2:"なづける", c3:"đặt tên", c4:"", c5:"", c6:"", count:0 },
                    { c1:"すやすや", c2:"すやすや", c3:"ngủ ngon, ngủ say", c4:"", c5:"", c6:"", count:0 },
                    { c1:"懐く", c2:"なつく", c3:"trở nên thân quen, quấn quýt", c4:"", c5:"", c6:"", count:0 },
                    { c1:"強請る", c2:"ねだる", c3:"vòi vĩnh, đòi hỏi", c4:"", c5:"", c6:"", count:0 },
                    { c1:"拗ねる", c2:"すねる", c3:"dỗi, hờn dỗi", c4:"", c5:"", c6:"", count:0 },
                    { c1:"指図", c2:"さしず", c3:"chỉ huy, sai bảo", c4:"", c5:"", c6:"", count:0 },
                    { c1:"家出", c2:"いえで", c3:"bỏ nhà đi", c4:"", c5:"", c6:"", count:0 },
                    { c1:"ぎくしゃく", c2:"ぎくしゃく", c3:"không suôn sẻ, gượng gạo", c4:"", c5:"", c6:"", count:0 },
                    { c1:"言い張る", c2:"いいはる", c3:"khăng khăng, khẳng định", c4:"", c5:"", c6:"", count:0 },
                    { c1:"散々", c2:"さんざん", c3:"tan nát, thảm hại", c4:"", c5:"", c6:"", count:0 },
                    { c1:"然も", c2:"しかも", c3:"hơn nữa, lại còn", c4:"", c5:"", c6:"", count:0 },
                    { c1:"山々", c2:"やまやま", c3:"rất muốn nhưng...", c4:"", c5:"", c6:"", count:0 },
                    { c1:"再婚", c2:"さいこん", c3:"tái hôn", c4:"", c5:"", c6:"", count:0 },
                    { c1:"健在", c2:"けんざい", c3:"vẫn khỏe mạnh, vẫn hoạt động tốt", c4:"", c5:"", c6:"", count:0 },
                    { c1:"労る", c2:"いたわる", c3:"chăm sóc, quan tâm", c4:"", c5:"", c6:"", count:0 },
                    { c1:"受け継ぐ", c2:"うけつぐ", c3:"thừa kế, kế thừa", c4:"", c5:"", c6:"", count:0 },
                    { c1:"遺産", c2:"いさん", c3:"di sản", c4:"", c5:"", c6:"", count:0 },
                    { c1:"掛け替えのない", c2:"かけがえのない", c3:"không thể thay thế", c4:"", c5:"", c6:"", count:0 },
                    { c1:"気心", c2:"きごころ", c3:"tính cách, tâm ý", c4:"", c5:"", c6:"", count:0 },
                    { c1:"打ち明ける", c2:"うちあける", c3:"thổ lộ, tâm sự", c4:"", c5:"", c6:"", count:0 },
                    { c1:"察する", c2:"さっする", c3:"đoán hiểu, suy ra", c4:"", c5:"", c6:"", count:0 }
                ]}
            ],
            quiz: [
                { name: "Bài 1 (Câu 1-25)", list: [
                    { gramType:"quiz", q:"コツコツという足音が廊下に( ________)。", ans:"ひびいた", w1:"ないた", w2:"わいた", w3:"なびいた", explain:"「響く（ひびく）」＝ âm thanh vang, dội lại → Dịch: Tiếng bước chân “cộc cộc” vang lên trong hành lang", count:0 },
                    { gramType:"quiz", q:"過ぎ去ったことを( ________)仕方がない。前を向いて生きていこう。", ans:"くやんで", w1:"なやんで", w2:"うらやんで", w3:"はやんで", explain:"「悔やむ（くやむ）」＝ hối hận, tiếc nuối → Dịch: Dù có hối hận về chuyện đã qua cũng vô ích. Hãy hướng về phía trước mà sống", count:0 },
                    { gramType:"quiz", q:"ここは12階で周りのビルより高いので、視界を( ________)ものは何もない。", ans:"さえぎる", w1:"かすめる", w2:"とどめる", w3:"つきる", explain:"「遮る（さえぎる）」＝ che chắn, cản trở → Dịch: Vì ở tầng 12 và cao hơn các tòa nhà xung quanh nên không có gì che khuất tầm nhìn", count:0 },
                    { gramType:"quiz", q:"国民は国会での首相の発言に( ________)反応し、各地で批判が起こった。", ans:"びんかん", w1:"みんかん", w2:"みんがん", w3:"びんがん", explain:"「敏感（びんかん）」＝ nhạy cảm → Dịch: Người dân phản ứng nhạy cảm với phát biểu của thủ tướng tại quốc hội, và các chỉ trích đã xảy ra ở nhiều nơi", count:0 },
                    { gramType:"quiz", q:"世界的に男性より女性のほうが平均( ________)が長い傾向がある。", ans:"じゅみょう", w1:"じゅめい", w2:"じゅうめい", w3:"じゅうみょう", explain:"「寿命（じゅみょう）」＝ tuổi thọ → Dịch: Trên thế giới, phụ nữ có xu hướng sống thọ hơn nam giới", count:0 },
                    { gramType:"quiz", q:"山田選手は3本のヒットでチームの勝利に( ________)。", ans:"貢献した", w1:"かいけん", w2:"かいなん", w3:"こうなん", explain:"「貢献（こうけん）」＝ đóng góp → Dịch: Cầu thủ Yamada đã góp phần vào chiến thắng của đội với 3 cú đánh trúng", count:0 },
                    { gramType:"quiz", q:"クラスメートの森田さんとデートしているところを友達に見られて( ________)。", ans:"ひやかされた", w1:"しいられた", w2:"もてなされた", w3:"ひきいられた", explain:"「ひやかす」＝ trêu chọc → Dịch: Bị bạn bè trêu chọc khi bị nhìn thấy đang hẹn hò với bạn Morita", count:0 },
                    { gramType:"quiz", q:"( ________)の社長が、この会社を大きく発展させたらしい。", ans:"先代", w1:"古代", w2:"近郊", w3:"近世", explain:"「先代（せんだい）」＝ đời trước → Dịch: Có vẻ như vị giám đốc đời trước đã phát triển công ty này lớn mạnh", count:0 },
                    { gramType:"quiz", q:"あの俳優は前から人気はあったが、例のドラマで去年一気に( ________)した。", ans:"ブレイク", w1:"スルー", w2:"ボイコット", w3:"ブーム", explain:"「ブレイクする」＝ nổi tiếng bùng nổ → Dịch: Nam diễn viên đó vốn đã nổi tiếng, nhưng nhờ bộ phim đó mà năm ngoái đã bùng nổ tên tuổi", count:0 },
                    { gramType:"quiz", q:"いつも仕事をしない彼があの大変な仕事をやらせてくれだなんて、何か( ________)があるに違いない。", ans:"下心", w1:"内心", w2:"気心", w3:"裏心", explain:"「下心（したごころ）」＝ động cơ thầm kín → Dịch: Người vốn không làm việc như anh ta mà lại xin làm việc khó đó, chắc chắn có động cơ gì đó", count:0 },
                    { gramType:"quiz", q:"そのチームは、力強いプレーで敵を( ________)。", ans:"圧倒した", w1:"完敗した", w2:"健闘した", w3:"突撃した", explain:"「圧倒する」＝ áp đảo → Dịch: Đội đó đã áp đảo đối thủ bằng lối chơi mạnh mẽ", count:0 },
                    { gramType:"quiz", q:"風邪をひいて頭が痛いが、さっき薬を飲んだので、( ________)よくなるだろう。", ans:"じきに", w1:"じかに", w2:"いかに", w3:"いきに", explain:"「じきに」＝ sớm thôi → Dịch: Bị cảm nên đau đầu nhưng vừa uống thuốc xong nên chắc sẽ sớm khỏi", count:0 },
                    { gramType:"quiz", q:"今回の台風は、列島各地に大きな被害を( ________)。", ans:"もたらした", w1:"引きずった", w2:"おさめた", w3:"そこなった", explain:"「もたらす」＝ mang lại (kết quả) → Dịch: Cơn bão lần này đã gây ra thiệt hại lớn trên khắp các vùng", count:0 },
                    { gramType:"quiz", q:"うちの会社とA社は同業ではあるが、( ________)が全然違う。", ans:"規模", w1:"目的", w2:"立地", w3:"方針", explain:"「スケール」＝ quy mô → Dịch: Công ty chúng tôi và công ty A cùng ngành nhưng quy mô hoàn toàn khác", count:0 },
                    { gramType:"quiz", q:"学生ならほかに( ________)すべきことがあるんじゃない?。", ans:"集中", w1:"挑戦", w2:"研究", w3:"習得", explain:"「専念する」＝ chuyên tâm → Dịch: Nếu là sinh viên thì chẳng phải còn việc khác nên tập trung hơn sao", count:0 },
                    { gramType:"quiz", q:"土地の( ________)に慣れるのには時間がかかるものだ。", ans:"慣習", w1:"味付", w2:"天候", w3:"言葉", explain:"「しきたり」＝ tập quán → Dịch: Làm quen với tập quán địa phương thì cần thời gian", count:0 },
                    { gramType:"quiz", q:"会議の進行を( ________)ください。", ans:"邪魔しない", w1:"周知しない", w2:"停止しない", w3:"中断しない", explain:"「妨げる」＝ cản trở → Dịch: Xin đừng làm gián đoạn tiến trình cuộc họp", count:0 },
                    { gramType:"quiz", q:"この記事は、( ________)のこれまでの発言をまとめたものだ。", ans:"都道府県の長", w1:"村の長", w2:"市の長", w3:"国の長", explain:"「知事」＝ tỉnh trưởng → Dịch: Bài báo này tổng hợp các phát biểu trước đây của thống đốc tỉnh", count:0 },
                    { gramType:"quiz", q:"( ________)方法でダイエットをするのは体によくない。", ans:"偏った", w1:"間違った", w2:"簡単な", w3:"単純な", explain:"「極端」＝ cực đoan → Dịch: Giảm cân bằng phương pháp cực đoan không tốt cho cơ thể", count:0 },
                    { gramType:"quiz", q:"【路線】使い方が最も適切なものを選択せよ。", ans:"市民たちは政策路線の変更を求めてデモを起こした", w1:"この路線に住んでいる住民はお金持ちが多い", w2:"彼は他人の言うことは気にしない路線で、自分のやり方を貫くタイプだ", w3:"踏切のない所で路線を横切ると危ない", explain:"「路線」＝ đường lối/chính sách → Dịch: Người dân đã biểu tình yêu cầu thay đổi đường lối chính sách", count:0 },
                    { gramType:"quiz", q:"【いかにも】使い方が最も適切なものを選択せよ。", ans:"大学生に人気の店だけあって、店内の小物に至るまでいかにも若者が好みそうな雰囲気だ", w1:"近場でこんなにすばらしい景色が見られるなんて、いかにも夢のようだ", w2:"給料が魅力でこの会社に入ったが、残業続きで休日出勤も多いから、いかにも休みたい", w3:"高いところは苦手だから、私がいかにも登りたくないところは東京タワーだ", explain:"「いかにも」＝ đúng là, rõ ràng là → Dịch: Đúng là cửa hàng được sinh viên ưa thích nên từ đồ trang trí đến không khí đều rất hợp gu giới trẻ", count:0 },
                    { gramType:"quiz", q:"【一息】使い方が最も適切なものを選択せよ。", ans:"作品の完成までもう一息だから、あきらめずに頑張ろうじゃないか", w1:"新聞の号外が配られ始めると、大勢の人々が一息に集まってきた", w2:"この作戦が成功すれば、犯人グループが一息に検挙できるだろう", w3:"彼女の一息は、今アメリカで経済の勉強をしている", explain:"「一息」＝ còn một chút nữa → Dịch: Chỉ còn một chút nữa là hoàn thành tác phẩm nên hãy cố gắng đừng bỏ cuộc", count:0 },
                    { gramType:"quiz", q:"【割く】使い方が最も適切なものを選択せよ。", ans:"忙しい社長が僕のためにわざわざ時間を割いて話を聞いてくれた", w1:"手がすべって、父が大切にしていたお皿を割いてしまった", w2:"10年間友達の縁を割いていたが、再会したのをきっかけに仲直りした", w3:"この作業は一人では大変だから、グループで仕事を割いてすることにしましょう", explain:"「割く」＝ dành ra (thời gian, công sức) → Dịch: Vị giám đốc bận rộn đã dành thời gian nghe tôi nói", count:0 },
                    { gramType:"quiz", q:"【シェア】使い方が最も適切なものを選択せよ。", ans:"円滑な業務遂行のために、知り得た情報はチーム全員でシェアすべきだ", w1:"このピザは8枚にシェアして食べることにしましょう", w2:"高齢化が進んだこの町では、シェアの60%は老人が占めている", w3:"ここでは毎年7月になるとアニメが好きな若者を中心に大規模なシェアが行われている", explain:"「シェア」＝ chia sẻ thông tin → Dịch: Để công việc diễn ra suôn sẻ, thông tin cần được chia sẻ với toàn bộ nhóm", count:0 },
                    { gramType:"quiz", q:"【あやふや】使い方が最も適切なものを選択せよ。", ans:"好きでもないのにデートをするというようなあやふやな態度はとるべきじゃないよ", w1:"昨日の晩は満月だったのに、雲が多くて月があやふやにしか見えなかった", w2:"調査によると、若者の三人に一人が将来に対するあやふやな不安を抱えているという", w3:"遅刻ばかりしている彼が、上司や同僚にあやふやな人だと思われているのも当然だ", explain:"「あやふや」＝ mơ hồ, không rõ ràng → Dịch: Không nên có thái độ mập mờ như đi hẹn hò với người mình không thích", count:0 }
                ]}
            ]
        },
        n2gram: {
            struct: [
                { name: "Bài 1 (Câu 1-10)", list: [
                    { c1:"～ぐらい（くらい）", c2:"", c3:"đến mức, đến độ", count:0 },
                    { c1:"～わけだ", c2:"", c3:"thảo nào, bảo sao (kết quả hợp lý)", count:0 },
                    { c1:"～はずだ", c2:"", c3:"chắc chắn, lẽ ra phải", count:0 },
                    { c1:"～ないことはない", c2:"", c3:"không phải là không… (vẫn có thể)", count:0 },
                    { c1:"～に違いない", c2:"", c3:"chắc chắn là", count:0 },
                    { c1:"～ようにする", c2:"", c3:"cố gắng, tạo thói quen làm gì", count:0 },
                    { c1:"～ばかりだ", c2:"", c3:"cứ ngày càng… (xu hướng xấu)", count:0 },
                    { c1:"～おかげで", c2:"", c3:"nhờ có… (kết quả tốt)", count:0 },
                    { c1:"～せいで", c2:"", c3:"tại vì… (kết quả xấu)", count:0 },
                    { c1:"～ところだ", c2:"", c3:"đúng lúc (sắp/đang/vừa làm gì)", count:0 }
                ]}
            ],
            quiz: [
                { name: "Bài 1 (Câu 1-10)", list: [
                    { gramType:"quiz", q:"1．専門家に( ________)、そんな環境は快適どころか一歩間違えると「危なくてしょうがない家」になってしまうかもしれないという。", ans:"言われたら", w1:"言われば", w2:"言わせると", w3:"言わせて", explain:"「〜に言われたら」＝ nếu bị/được nói bởi → giả định theo ý chuyên gia → Dịch: Nếu theo lời chuyên gia thì môi trường như vậy không những không thoải mái mà chỉ cần sai một bước có thể trở thành “ngôi nhà nguy hiểm không chịu nổi”", count:0 },
                    { gramType:"quiz", q:"2．実際にたばこをやめた人間( ________)、事前準備さえしっかりとできていれば、禁煙は中距離どころか短距離走にもなり得ると思います。", ans:"から言わせてもらえば", w1:"に言わせていれば", w2:"から言わせてやれば", w3:"に言わせてあげれば", explain:"「〜から言わせてもらえば」＝ cho phép tôi nói từ góc nhìn → dùng để nêu ý kiến cá nhân → Dịch: Nếu nói từ góc nhìn của người đã bỏ thuốc, chỉ cần chuẩn bị tốt thì việc cai thuốc không phải chạy đường dài mà có thể là chạy ngắn", count:0 },
                    { gramType:"quiz", q:"3．正直動画を見終わっても何の会社なのかは分からないのですが、最後まで( ________)力のある動画をトップページに採用しています。", ans:"見させてしまう", w1:"見させてみる", w2:"見られてしまう", w3:"見られてみる", explain:"「〜させてしまう」＝ khiến người khác vô thức làm → video có sức hút → Dịch: Thành thật mà nói dù xem xong vẫn không biết công ty gì, nhưng họ dùng video có sức hút khiến người ta xem đến cuối", count:0 },
                    { gramType:"quiz", q:"4．重要な個人情報など、他人に( ________)困る情報は絶対に入力しないでください。", ans:"知られては", w1:"知られつつも", w2:"知らせられつつも", w3:"知らせられては", explain:"「〜ては困る」＝ nếu bị… thì sẽ rắc rối → Dịch: Tuyệt đối không nhập những thông tin mà nếu bị người khác biết sẽ gây phiền toái", count:0 },
                    { gramType:"quiz", q:"5．それをどう受け止めてゆくかは、意外と人生にとって大事なことのように、私には( ________)。", ans:"思われる", w1:"思う", w2:"思っている", w3:"思わせる", explain:"「〜ように思われる」＝ có cảm giác là → cách nói khách quan → Dịch: Với tôi, việc tiếp nhận điều đó như thế nào dường như là điều quan trọng trong cuộc đời", count:0 },
                    { gramType:"quiz", q:"6．胃腸に優しい食べ物を摂取されて、どうか早く回復( ________)。", ans:"されますように", w1:"いたしたく思います", w2:"願ってはどうですか", w3:"していらっしゃるでしょうか", explain:"「〜ますように」＝ cầu chúc → Dịch: Mong bạn ăn đồ nhẹ cho dạ dày và sớm hồi phục", count:0 },
                    { gramType:"quiz", q:"7．現場の緊張感と責任感は数か月経過した今でも昨日のことのように( ________)。", ans:"思い出される", w1:"思い出す", w2:"思い出すだろう", w3:"思い出させた", explain:"「思い出される」＝ tự nhiên nhớ lại → Dịch: Dù đã qua vài tháng, cảm giác căng thẳng và trách nhiệm tại hiện trường vẫn hiện lên như mới hôm qua", count:0 },
                    { gramType:"quiz", q:"8．恋愛禁止の塾に通う高校生たちがその中で付き合っている人がいることが発見。親や講師から( ________)二人、果たして花子は二人の恋を実らせられるのか。", ans:"別れさせられそうになる", w1:"別れそうになる", w2:"別れられそうになる", w3:"別れさせそうになる", explain:"「〜させられる」＝ bị ép làm → bị ép chia tay → Dịch: Hai người bị phát hiện hẹn hò trong môi trường cấm yêu và có nguy cơ bị cha mẹ, giáo viên ép chia tay", count:0 },
                    { gramType:"quiz", q:"9．予約をしていないので( ________)、意外にもすんなり診てもらえた。", ans:"待たされるかと思いきや", w1:"待たされたかと思えば", w2:"待たされることと思い", w3:"待たされたことと思うが", explain:"「〜かと思いきや」＝ tưởng là… nhưng hóa ra → Dịch: Vì không đặt trước nên tưởng sẽ phải chờ lâu, nhưng lại được khám rất nhanh", count:0 },
                    { gramType:"quiz", q:"10．20代で一度は諦めた夢を、もう一度目指そうと( ________)きっかけとは、いったいどんなものだったのでしょうか。", ans:"思わせてくれた", w1:"思われていた", w2:"思わせてはいけなかった", w3:"思われてならなかった", explain:"「〜させてくれた」＝ khiến ai đó có cảm xúc → Dịch: Điều gì đã trở thành động lực khiến bạn muốn theo đuổi lại giấc mơ từng từ bỏ ở tuổi 20 vậy", count:0 }
                ]}
            ]
        },
        bjtvoca: {
            struct: [
                { name: "Bài 1 (Câu 1-20)", list: [
                    { c1:"相見積もり", c2:"あいみつもり", c3:"báo giá cạnh tranh từ nhiều bên", c4:"", c5:"", c6:"", count:0 },
                    { c1:"原価償却", c2:"げんかしょうきゃく", c3:"khấu hao tài sản", c4:"", c5:"", c6:"", count:0 },
                    { c1:"減価償却", c2:"げんかしょうきゃく", c3:"khấu hao (kế toán)", c4:"", c5:"", c6:"", count:0 },
                    { c1:"与信管理", c2:"よしんかんり", c3:"quản lý tín dụng (đánh giá khả năng thanh toán)", c4:"", c5:"", c6:"", count:0 },
                    { c1:"債権回収", c2:"さいけんかいしゅう", c3:"thu hồi công nợ", c4:"", c5:"", c6:"", count:0 },
                    { c1:"粉飾決算", c2:"ふんしょくけっさん", c3:"làm đẹp sổ sách (gian lận kế toán)", c4:"", c5:"", c6:"", count:0 },
                    { c1:"内部統制", c2:"ないぶとうせい", c3:"kiểm soát nội bộ", c4:"", c5:"", c6:"", count:0 },
                    { c1:"監査法人", c2:"かんさほうじん", c3:"công ty kiểm toán", c4:"", c5:"", c6:"", count:0 },
                    { c1:"連結決算", c2:"れんけつけっさん", c3:"báo cáo tài chính hợp nhất", c4:"", c5:"", c6:"", count:0 },
                    { c1:"事業再編", c2:"じぎょうさいへん", c3:"tái cấu trúc doanh nghiệp", c4:"", c5:"", c6:"", count:0 },
                    { c1:"経営破綻", c2:"けいえいはたん", c3:"phá sản (doanh nghiệp sụp đổ)", c4:"", c5:"", c6:"", count:0 },
                    { c1:"資金繰り", c2:"しきんぐり", c3:"xoay vòng vốn", c4:"", c5:"", c6:"", count:0 },
                    { c1:"増資", c2:"ぞうし", c3:"tăng vốn", c4:"", c5:"", c6:"", count:0 },
                    { c1:"株式公開", c2:"かぶしきこうかい", c3:"niêm yết cổ phiếu (IPO)", c4:"", c5:"", c6:"", count:0 },
                    { c1:"持株会社", c2:"もちかぶがいしゃ", c3:"công ty mẹ (holding)", c4:"", c5:"", c6:"", count:0 },
                    { c1:"買収", c2:"ばいしゅう", c3:"mua lại (M&A)", c4:"", c5:"", c6:"", count:0 },
                    { c1:"合併", c2:"がっぺい", c3:"sáp nhập", c4:"", c5:"", c6:"", count:0 },
                    { c1:"業務提携", c2:"ぎょうむていけい", c3:"liên kết hợp tác kinh doanh", c4:"", c5:"", c6:"", count:0 },
                    { c1:"独占禁止法", c2:"どくせんきんしほう", c3:"luật chống độc quyền", c4:"", c5:"", c6:"", count:0 },
                    { c1:"下請け", c2:"したうけ", c3:"thầu phụ", c4:"", c5:"", c6:"", count:0 }
                ]}
            ],
            quiz: [
                { name: "Bài 1 (Câu 1-25)", list: [
                    { gramType:"quiz", q:"コンピュータマウスを使用してスクリーンで( ________)を動かし、メニューからコマンドを選択する。", ans:"アイコン", w1:"デザイン", w2:"ウェブ", w3:"サイト", explain:"「アイコン」＝ biểu tượng → Dịch: Di chuyển biểu tượng trên màn hình bằng chuột và chọn lệnh từ menu", count:0 },
                    { gramType:"quiz", q:"A社の西村さんにはいつもお世話になっているので、一度( ________)に行ったほうがいいだろう。", ans:"挨拶", w1:"失礼", w2:"相談", w3:"お詫び", explain:"「挨拶」＝ chào hỏi → Dịch: Vì luôn được anh Nishimura giúp đỡ nên nên đi chào hỏi một lần", count:0 },
                    { gramType:"quiz", q:"われわれは( ________)の100議席に対して250議席を獲得した。", ans:"相手", w1:"相談", w2:"相毛", w3:"相対", explain:"「相手」＝ đối phương → Dịch: Chúng tôi giành được 250 ghế so với 100 ghế của đối phương", count:0 },
                    { gramType:"quiz", q:"パソコン好きの彼は、( ________)業界での就職を希望している。", ans:"IT", w1:"ID", w2:"IQ", w3:"IC", explain:"「IT」＝ công nghệ thông tin → Dịch: Anh ấy muốn làm việc trong ngành IT", count:0 },
                    { gramType:"quiz", q:"パスワードと( ________)を入れないと、次の画面に進めない。", ans:"ID", w1:"IT", w2:"IC", w3:"IK", explain:"「ID」＝ mã người dùng → Dịch: Không nhập mật khẩu và ID thì không vào được màn tiếp theo", count:0 },
                    { gramType:"quiz", q:"この件については、( ________)をとって価格を検討しよう。", ans:"相見積もり", w1:"相見責もり", w2:"相見債もり", w3:"相見績もり", explain:"「相見積もり」＝ báo giá so sánh → Dịch: Hãy lấy nhiều báo giá để xem xét giá", count:0 },
                    { gramType:"quiz", q:"給与計算の事務を( ________)すれば、経理部の業務負担をかなり減らすことができる。", ans:"アウトソーシング", w1:"アウトレット", w2:"アクション", w3:"オールカラー", explain:"「アウトソーシング」＝ thuê ngoài → Dịch: Nếu thuê ngoài việc tính lương thì sẽ giảm tải cho phòng kế toán", count:0 },
                    { gramType:"quiz", q:"この( ________)では一流ブランド品がそろい、25～65％オフで購入できます。", ans:"アウトレット", w1:"インターフォン", w2:"カテゴリー", w3:"コマーシャル", explain:"「アウトレット」＝ cửa hàng giảm giá → Dịch: Ở outlet này có hàng hiệu giảm 25–65%", count:0 },
                    { gramType:"quiz", q:"この企画はまだ( ________)の段階で、これから内容を詰めるところです。", ans:"青写真", w1:"積写真", w2:"青写具", w3:"積写具", explain:"「青写真」＝ bản kế hoạch sơ bộ → Dịch: Kế hoạch này vẫn ở giai đoạn phác thảo", count:0 },
                    { gramType:"quiz", q:"Aホテルは、不況の( ________)で閉鎖に追い込まれた。", ans:"あおり", w1:"いのり", w2:"おあり", w3:"かなり", explain:"「あおり」＝ tác động xấu → Dịch: Khách sạn bị đóng cửa do ảnh hưởng suy thoái", count:0 },
                    { gramType:"quiz", q:"テレビ通販は、購買意欲を( ________)演出がうまい。", ans:"あおる", w1:"おある", w2:"かおる", w3:"かある", explain:"「あおる」＝ kích thích → Dịch: TV shopping giỏi kích thích nhu cầu mua", count:0 },
                    { gramType:"quiz", q:"この冷夏でビールの売り上げが落ち込み、今月は2,000万円の( ________)が見込まれている。", ans:"赤字", w1:"黒字", w2:"白字", w3:"売上", explain:"「赤字」＝ lỗ → Dịch: Dự kiến lỗ 20 triệu yên", count:0 },
                    { gramType:"quiz", q:"小さなクレームだと、上司まで報告が( ________)こない場合がある。", ans:"上がって", w1:"下がって", w2:"見込まれて", w3:"取り込んで", explain:"「上がる」＝ chuyển lên → Dịch: Khiếu nại nhỏ có thể không được báo lên cấp trên", count:0 },
                    { gramType:"quiz", q:"ちょっとした小( ________)の店ならどこでもそれを買うことができる。", ans:"商い", w1:"荷い", w2:"章い", w3:"売い", explain:"「商い」＝ buôn bán → Dịch: Ở các cửa hàng nhỏ đều có thể mua được", count:0 },
                    { gramType:"quiz", q:"これだと思う情報をつかんだら、素早く( ________)を起こすことが大切だ。", ans:"アクション", w1:"レクリエーション", w2:"レッスン", w3:"ラベル", explain:"「アクション」＝ hành động → Dịch: Khi nắm thông tin thì cần hành động nhanh", count:0 },
                    { gramType:"quiz", q:"このサイトには、1日15万件の( ________)がある。", ans:"アクセス", w1:"タイトル", w2:"タイピスト", w3:"コントロール", explain:"「アクセス」＝ lượt truy cập → Dịch: Trang web có 150k lượt truy cập mỗi ngày", count:0 },
                    { gramType:"quiz", q:"相手の( ________)ばかりいては議論にならない。", ans:"揚げ足を取って", w1:"傷げ足を取って", w2:"揚げ促を取って", w3:"傷げ促を取って", explain:"「揚げ足を取る」＝ bắt lỗi → Dịch: Chỉ bắt lỗi đối phương thì không thể tranh luận", count:0 },
                    { gramType:"quiz", q:"対応が難しいクレームだったので、上司に報告を( ________)、指示を仰いだ。", ans:"上げて", w1:"上がって", w2:"上けて", w3:"上かって", explain:"「上げる」＝ báo lên → Dịch: Đã báo cáo lên cấp trên để xin chỉ thị", count:0 },
                    { gramType:"quiz", q:"必要書類を明日( ________)で送れば、昼までには着くと思います。", ans:"朝一", w1:"夜一", w2:"明一", w3:"眠一", explain:"「朝一」＝ sáng sớm → Dịch: Gửi vào sáng sớm thì trưa sẽ tới", count:0 },
                    { gramType:"quiz", q:"今度のイベント、予算が少ないから、パンフをオールカラーにしたら( ________)よ。", ans:"足が出る", w1:"促が入る", w2:"促が出る", w3:"足が入る", explain:"「足が出る」＝ vượt ngân sách → Dịch: In màu sẽ vượt ngân sách", count:0 },
                    { gramType:"quiz", q:"( ________)状態にあった景気が今年に入ってやっと回復の兆しを見せてきた。", ans:"足踏み", w1:"足を運び", w2:"足が入り", w3:"足打ち", explain:"「足踏み」＝ đình trệ → Dịch: Kinh tế trì trệ nay đã có dấu hiệu hồi phục", count:0 },
                    { gramType:"quiz", q:"売り上げは伸びたが、業界トップのA社と比べたら、まだまだ( ________)。", ans:"足元にも及ばない", w1:"足を運ばない", w2:"足を引っ張らない", w3:"足が切らない", explain:"「足元にも及ばない」＝ không bằng → Dịch: Vẫn chưa bằng công ty top", count:0 },
                    { gramType:"quiz", q:"よりよい原材料を手に入れるため、開発スタッフは産地に何度も( ________)。", ans:"足を運んだ", w1:"足を遊んだ", w2:"足を並んだ", w3:"足を行った", explain:"「足を運ぶ」＝ đích thân đi → Dịch: Đã nhiều lần đến tận nơi nguyên liệu", count:0 },
                    { gramType:"quiz", q:"円高が景気回復の足を( ________)いる。", ans:"引っ張って", w1:"引っ越して", w2:"引っ並んで", w3:"引っ切って", explain:"「足を引っ張る」＝ cản trở → Dịch: Đồng yên mạnh đang cản trở phục hồi kinh tế", count:0 },
                    { gramType:"quiz", q:"ハンドルの( ________)は、大きすぎても小さすぎてもいけません。", ans:"遊び", w1:"並び", w2:"売り", w3:"切り", explain:"「遊び」＝ độ rơ → Dịch: Độ rơ của tay lái không được quá lớn hay quá nhỏ", count:0 }
                ]}
            ]
        }
    };
