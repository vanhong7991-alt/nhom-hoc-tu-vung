const fs = require('fs');
const raw = `商品名について、いくつか（___________）を出してみてください。| 件| 状| 章| 案|4|件（けん）: vụ việc
状（じょう）: trạng thái
章（しょう）: chương
案（あん）: phương án, ý tưởng
Dịch: Về tên sản phẩm, hãy đưa ra một vài phương án.
オンライン（___________）は、回答の集計を自動で行えるため、データ収集や分析が容易だ。| アンケート| アンダーライン| アレンジ| アドバイス|1|アンケート: khảo sát
アンダーライン: gạch chân
アレンジ: điều chỉnh
アドバイス: lời khuyên
Dịch: Khảo sát online giúp tổng hợp dữ liệu dễ dàng.
この問題は、明日の会議の最重要（___________）として扱われる。| 案内| 安全| 案件| 安健|3|案内（あんない）: hướng dẫn
安全（あんぜん）: an toàn
案件（あんけん）: vấn đề, hạng mục
Dịch: Đây là nội dung quan trọng nhất của cuộc họp.
カメラは利用者が（___________）を入力するときの手元を撮影していた。| 暗証番号| 明証番号| 暗征番号| 明征番号|1|暗証番号（あんしょうばんごう）: mã PIN
Dịch: Camera quay lúc nhập mã PIN.
修正部分には、（___________）が引いてあります。| アンデルセン| アンケート| アンダーライン| アンティーク|3|アンデルセン: tên riêng
アンケート: khảo sát
アンダーライン: gạch chân
アンティーク: đồ cổ
Dịch: Phần sửa đã được gạch chân.
担当の責任者まで（___________）してくれませんか。| 案内| 感染| 間税| 貢献|1|案内（あんない）: dẫn đường
感染（かんせん）: lây nhiễm
間税（かんぜい）: thuế gián tiếp
貢献（こうけん）: đóng góp
Dịch: Có thể dẫn tôi đến người phụ trách không?
そういう（___________）なやり方じゃ、困ります。| いい加減| いい政権| いい改選| いい納税|1|いい加減（いいかげん）: qua loa
Dịch: Cách làm qua loa như vậy thì không ổn.
遅刻の（___________）をした。| お詫び| 言い訳| お礼| 相談|2|お詫び（おわび）: xin lỗi
言い訳（いいわけ）: biện minh
お礼（おれい）: cảm ơn
相談（そうだん）: trao đổi
Dịch: Đã biện minh cho việc đi muộn.
このような欠陥が見つかり、（___________）に思います。| 責任| 貢献| 遺憾| 感染|3|責任（せきにん）: trách nhiệm
貢献（こうけん）: đóng góp
遺憾（いかん）: đáng tiếc
感染（かんせん）: lây nhiễm
Dịch: Cảm thấy rất đáng tiếc.
この企画、（___________）じゃないかな。| あかるん| いけるん| なげるん| けざるん|2|いける: khả thi
Dịch: Kế hoạch này có vẻ làm được.
利益率を（___________）するのは難しい。| 維持| 拡大| 拡張| 発展|1|維持（いじ）: duy trì
拡大（かくだい）: mở rộng
拡張（かくちょう）: mở rộng
発展（はってん）: phát triển
Dịch: Khó duy trì lợi nhuận.
プロ（___________）を持ってほしい。| 意識| 意味| 常識| 日常|1|意識（いしき）: ý thức
意味（いみ）: ý nghĩa
常識（じょうしき）: thường thức
日常（にちじょう）: hàng ngày
Dịch: Hãy có ý thức chuyên nghiệp.
ネット販売は（___________）、好調を維持している。| 当然| 間然| 自然| 依然|4|当然（とうぜん）: đương nhiên
自然（しぜん）: tự nhiên
依然（いぜん）: vẫn
Dịch: Vẫn duy trì tốt.
ぜひ（___________）ご連絡ください。| 忙し| 急ぎ| 依託| 投げ|2|急ぎ（いそぎ）: gấp
依託（いたく）: gửi nhờ
投げ（なげ）: ném
Dịch: Hãy liên hệ gấp.
サービスを民間に（___________）する。| 遺伝| 依託| 委託| 請託|3|遺伝（いでん）: di truyền
依託（いたく）: gửi nhờ
委託（いたく）: ủy thác
請託（せいたく）: nhờ vả
Dịch: Ủy thác cho tư nhân.
上司と部下の間で（___________）になってストレスがたまる。| 板ばさみ| 枝ばさみ| 板はさみ| 枝はさみ|1|板ばさみ（いたばさみ）: bị kẹt giữa
枝ばさみ（えだばさみ）: kéo cắt cành
Dịch: Bị kẹt giữa cấp trên và dưới.
商品が汚れたり（___________）する。| 揚んだり| 腸んだり| 楊んだり| 傷んだり|4|傷む（いたむ）: hư hỏng
Dịch: Hàng có thể bị hỏng.
当店（___________）の商品です。| 一掃し| 一升し| 一貫し| 一押し|4|一貫（いっかん）: nhất quán
一押し（いちおし）: đề xuất số 1
Dịch: Sản phẩm đề xuất hàng đầu.
この業界で（___________）になる。| 子供| 一人| 二人後| 一人前|4|子供（こども）: trẻ con
一人（ひとり）: một người
一人前（いちにんまえ）: thành thạo
Dịch: Trở thành người chuyên nghiệp.
市場に（___________）対応した。| いち遅く| いち早く| いち速く| いち高く|2|いち早く: nhanh chóng
Dịch: Phản ứng nhanh với thị trường.
取引先を（___________）にしてください。| 一覧| 一層| 一律| 一項|1|一覧（いちらん）: danh sách
一層（いっそう）: hơn nữa
一律（いちりつ）: đồng loạt
一項（いっこう）: một mục
Dịch: Hãy lập danh sách đối tác.
送料（___________）500円です。| 一介| 一掃| 一律| 一床|3|一介（いっかい）: chỉ là
一掃（いっそう）: quét sạch
一律（いちりつ）: đồng loạt
Dịch: Phí ship cố định 500 yên.
（___________）に返事します。| 一再日中| 一両日中| 一切日中| 一掃日中|2|一両日中（いちりょうにちちゅう）: trong 1–2 ngày
Dịch: Sẽ trả lời trong 1–2 ngày.
支払いは（___________）払いです。| 一括| 一話| 一憩| 一舌|1|一括（いっかつ）: trả một lần
一話（いちわ）: một câu chuyện
一憩（いっけい）: nghỉ ngắn
Dịch: Thanh toán một lần.
郊外の（___________）からマンションへ移る。| 一所建て| 一戸建て| 一掃建て| 一升建て|2|一戸建て（いっこだて）: nhà riêng
Dịch: Chuyển từ nhà riêng sang chung cư.`;

const lines = raw.trim().split(/\r?\n/);
const arr = [];
let i = 0;
while(i < lines.length) {
    const l1 = lines[i];
    if(!l1.trim()) { i++; continue; }
    
    let fullItem = l1;
    let nextI = i + 1;
    while(nextI < lines.length && !lines[nextI].includes('|')) {
        fullItem += '\\n' + lines[nextI];
        nextI++;
    }
    
    const parts = fullItem.split('|');
    const q = parts[0].trim();
    const opts = [parts[1].trim(), parts[2].trim(), parts[3].trim(), parts[4].trim()];
    const ansIdx = parseInt(parts[5].trim()) - 1;
    let explain = parts[6].trim().replace(/\n/g, '\\n');
    
    const ans = opts[ansIdx];
    opts.splice(ansIdx, 1);
    
    arr.push(`                    { gramType: "quiz", q: "${q}", ans: "${ans}", w1: "${opts[0]}", w2: "${opts[1]}", w3: "${opts[2]}", explain: "${explain}", count: 0 }`);
    
    i = nextI;
}

const jsObj = `            ,\n            {\n                name: "Bài 3 (51-75)", list: [\n${arr.join(',\n')}\n                ]\n            }`;

fs.writeFileSync("output.txt", jsObj);
