// ============================================================
// DỮ LIỆU CỐ ĐỊNH - GÓC TOEIC (vanData_en.js)
// ============================================================
// HƯỚNG DẪN THÊM NỘI DUNG:
//
// 📌 THÊM BÀI HỌC MỚI:
//   { name: "Tên bài", free: true, list: [...] }
//   ➜ free: true  = ai cũng xem được (không cần mở khoá)
//   ➜ free: false = bài khoá (mặc định nếu bỏ trống)
//
// 📌 TỪ VỰNG (dùng trong struct):
//   { c1: "Từ", c2: "Phiên âm (IPA)", c3: "Nghĩa TV", c4: "Ví dụ", c5: "", c6: "", count: 0 }
//   ➜ c1: Từ/cụm từ tiếng Anh
//   ➜ c2: Phiên âm IPA (tuỳ chọn)
//   ➜ c3: Nghĩa tiếng Việt
//   ➜ c4: Câu ví dụ
//   ➜ count: LUÔN để 0
//
// 📌 TRẮC NGHIỆM (dùng trong quiz):
//   { gramType:"quiz", q:"Câu hỏi / ___", ans:"ĐA đúng", w1:"Sai 1", w2:"Sai 2", w3:"Sai 3", explain:"Giải thích", count:0 }
//   ➜ gramType: LUÔN để "quiz"
//   ➜ q: Câu hỏi (dùng _______ để đánh dấu chỗ điền)
//   ➜ ans: Đáp án đúng
//   ➜ w1, w2, w3: 3 đáp án sai (viết lộn xộn để học sinh không đoán được)
//   ➜ explain: Giải thích chi tiết + dịch câu
//   ➜ count: LUÔN để 0
//
// ============================================================
// CẤU TRÚC SECTION (KEY của vanData):
//   toeicpart5 → Part 5 Grammar (điền vào chỗ trống)
//   toeicvoca  → Từ vựng TOEIC theo chủ đề
// ➜ Thêm section mới: copy nguyên 1 block và đổi tên key
// ============================================================

const vanData = {

    // ─────────────────────────────────────────────
    // 📌 SECTION 1: TỪ VỰNG THEO CHỦ ĐỀ
    // ─────────────────────────────────────────────
    toeicvoca: {
        struct: [
            // ── Bài mẫu: Thêm bài mới phía dưới ──
            {
                name: "Chủ đề 1: Công sở & Văn phòng",
                free: true,
                list: [
                    // ➜ CÁCH THÊM: Copy 1 dòng bên dưới, sửa nội dung
                    { c1: "agenda",      c2: "/əˈdʒendə/",      c3: "chương trình nghị sự", c4: "What's on the agenda for today's meeting?", c5: "", c6: "", count: 0 },
                    { c1: "allocate",    c2: "/ˈæləkeɪt/",      c3: "phân bổ, phân công",   c4: "The manager will allocate tasks to each team member.", c5: "", c6: "", count: 0 },
                    { c1: "deadline",    c2: "/ˈdedlaɪn/",       c3: "hạn chót",              c4: "We need to meet the deadline by Friday.", c5: "", c6: "", count: 0 },
                    { c1: "delegate",    c2: "/ˈdelɪɡeɪt/",      c3: "uỷ thác, phân quyền",  c4: "She delegated the task to her assistant.", c5: "", c6: "", count: 0 },
                    { c1: "negotiate",   c2: "/nɪˈɡoʊʃieɪt/",   c3: "đàm phán",              c4: "They are negotiating a new contract.", c5: "", c6: "", count: 0 },
                    { c1: "implement",   c2: "/ˈɪmplɪment/",     c3: "triển khai, thực hiện", c4: "We will implement the new policy next month.", c5: "", c6: "", count: 0 },
                    { c1: "collaborate", c2: "/kəˈlæbəreɪt/",   c3: "hợp tác",               c4: "The two teams collaborated on the project.", c5: "", c6: "", count: 0 },
                    { c1: "submit",      c2: "/səbˈmɪt/",        c3: "nộp, gửi",              c4: "Please submit your report by end of day.", c5: "", c6: "", count: 0 },
                    { c1: "quarterly",   c2: "/ˈkwɔːrtərli/",   c3: "hàng quý",              c4: "The quarterly report will be released next week.", c5: "", c6: "", count: 0 },
                    { c1: "reimburse",   c2: "/ˌriːɪmˈbɜːrs/",  c3: "hoàn tiền, bồi hoàn",  c4: "The company will reimburse your travel expenses.", c5: "", c6: "", count: 0 }
                    // ➜ THÊM TỪ VỰ TIẾP THEO Ở ĐÂY
                ]
            },
            {
                name: "Chủ đề 2: Tài chính & Ngân hàng",
                free: true,
                list: [
                    { c1: "invoice",     c2: "/ˈɪnvɔɪs/",       c3: "hoá đơn",               c4: "Please send the invoice to our accounting department.", c5: "", c6: "", count: 0 },
                    { c1: "revenue",     c2: "/ˈrevənjuː/",      c3: "doanh thu",             c4: "The company's revenue increased by 15% this year.", c5: "", c6: "", count: 0 },
                    { c1: "budget",      c2: "/ˈbʌdʒɪt/",        c3: "ngân sách",             c4: "The project is over budget.", c5: "", c6: "", count: 0 },
                    { c1: "expenditure", c2: "/ɪkˈspendɪtʃər/", c3: "chi phí, khoản chi",    c4: "We need to reduce our monthly expenditure.", c5: "", c6: "", count: 0 },
                    { c1: "deficit",     c2: "/ˈdefɪsɪt/",       c3: "thâm hụt",              c4: "The government faces a large budget deficit.", c5: "", c6: "", count: 0 }
                    // ➜ THÊM TỪ VỰ TIẾP THEO Ở ĐÂY
                ]
            }
            // ➜ THÊM BÀI HỌC MỚI Ở ĐÂY (copy nguyên block {} phía trên)
        ],
        quiz: [
            {
                name: "Trắc nghiệm Chủ đề 1: Công sở",
                free: true,
                list: [
                    { gramType: "quiz", q: "The project manager will _______ responsibilities to each team member.", ans: "delegate", w1: "negotiate", w2: "allocate", w3: "implement", explain: "delegate = giao việc, uỷ thác → The project manager will assign tasks to team members.", count: 0 },
                    { gramType: "quiz", q: "Please _______ your expense report to the accounting department by Friday.", ans: "submit", w1: "deliver", w2: "forward", w3: "post", explain: "submit = nộp (báo cáo) → Please send your expense report before Friday's deadline.", count: 0 },
                    { gramType: "quiz", q: "The new marketing strategy will be _______ in the third quarter.", ans: "implemented", w1: "submitted", w2: "allocated", w3: "delegated", explain: "implement = triển khai, thực thi → The strategy will be put into action in Q3.", count: 0 }
                    // ➜ THÊM CÂU HỎI TIẾP THEO Ở ĐÂY
                ]
            }
            // ➜ THÊM BÀI TRẮC NGHIỆM MỚI Ở ĐÂY
        ]
    },

    // ─────────────────────────────────────────────
    // 📌 SECTION 2: NGỮ PHÁP - PART 5 (Điền vào chỗ trống)
    // ─────────────────────────────────────────────
    toeicpart5: {
        struct: [
            {
                name: "Ngữ pháp Bài 1: Thì & Thể động từ",
                free: true,
                list: [
                    // Dùng struct để giải thích ngữ pháp (c1 = điểm ngữ pháp, c3 = giải thích)
                    { c1: "Present Simple",          c2: "", c3: "Thì hiện tại đơn: diễn đạt sự thật, thói quen → S + V(s/es)", count: 0 },
                    { c1: "Present Continuous",       c2: "", c3: "Thì hiện tại tiếp diễn: đang xảy ra → S + is/am/are + V-ing", count: 0 },
                    { c1: "Present Perfect",          c2: "", c3: "Thì hiện tại hoàn thành: đã xảy ra, kết quả liên quan hiện tại → S + has/have + V3", count: 0 },
                    { c1: "Past Simple",              c2: "", c3: "Thì quá khứ đơn: đã xảy ra và kết thúc → S + V2/ed", count: 0 },
                    { c1: "Future Simple",            c2: "", c3: "Thì tương lai đơn: sẽ xảy ra → S + will + V", count: 0 }
                    // ➜ THÊM ĐIỂM NGỮ PHÁP TIẾP THEO Ở ĐÂY
                ]
            }
            // ➜ THÊM BÀI NGỮ PHÁP MỚI Ở ĐÂY
        ],
        quiz: [
            {
                name: "Part 5 Bài 1: Chọn đúng thì động từ",
                free: true,
                list: [
                    { gramType: "quiz", q: "The company _______ its new product at the trade show next week.", ans: "will launch", w1: "launches", w2: "launched", w3: "is launched", explain: "will + V: dùng cho kế hoạch tương lai xác định → The product will be introduced at next week's event.", count: 0 },
                    { gramType: "quiz", q: "By the time the manager arrived, the team _______ the presentation.", ans: "had finished", w1: "has finished", w2: "finished", w3: "will finish", explain: "Past Perfect (had + V3): hành động xảy ra trước một hành động khác trong quá khứ → The presentation was done before the manager came.", count: 0 },
                    { gramType: "quiz", q: "The new policy _______ since January and has greatly improved efficiency.", ans: "has been in effect", w1: "was in effect", w2: "is in effect", w3: "will be in effect", explain: "Present Perfect (has been): hành động bắt đầu từ quá khứ và vẫn tiếp tục → Policy started in January and is still working.", count: 0 }
                    // ➜ THÊM CÂU HỎI TIẾP THEO Ở ĐÂY
                ]
            }
            // ➜ THÊM BÀI TRẮC NGHIỆM PART 5 MỚI Ở ĐÂY
        ]
    }

    // ➜ THÊM SECTION MỚI Ở ĐÂY:
    // toeicreading: { struct: [...], quiz: [...] }

    ,

    // ─────────────────────────────────────────────
    // 📌 SECTION 3: 600 TỪ VỰNG TOEIC
    // ─────────────────────────────────────────────
    toeic600: {
        struct: [
            // ── Chủ đề 1: Contracts (Hợp đồng) ──
            {
                name: "Lesson 1: Contracts (Hợp đồng)",
                free: true,
                list: [
                    { c1: "abide by",      c2: "",                    c3: "(v) tuân thủ, tôn trọng",                           c4: "All employees must abide by the company regulations.", c5: "", c6: "", count: 0 },
                    { c1: "agreement",     c2: "/əˈɡriːmənt/",        c3: "(n) sự thỏa thuận, hợp đồng",                      c4: "Both parties signed the agreement yesterday.", c5: "", c6: "", count: 0 },
                    { c1: "assurance",     c2: "/əˈʃʊərəns/",         c3: "(n) sự đảm bảo, sự cam đoan",                      c4: "The manager gave his assurance that the project would be completed on time.", c5: "", c6: "", count: 0 },
                    { c1: "cancellation",  c2: "/ˌkænsəˈleɪʃn/",     c3: "(n) sự hủy bỏ",                                    c4: "The cancellation of the contract surprised everyone.", c5: "", c6: "", count: 0 },
                    { c1: "determine",     c2: "/dɪˈtɜːrmɪn/",        c3: "(v) xác định, quyết định",                         c4: "The court will determine who is responsible.", c5: "", c6: "", count: 0 },
                    { c1: "engage",        c2: "/ɪnˈɡeɪdʒ/",          c3: "(v) tham gia, cam kết",                             c4: "We engaged a law firm to handle the contract.", c5: "", c6: "", count: 0 },
                    { c1: "establish",     c2: "/ɪˈstæblɪʃ/",         c3: "(v) thiết lập, thành lập",                         c4: "They established new guidelines for the partnership.", c5: "", c6: "", count: 0 },
                    { c1: "obligate",      c2: "/ˈɒblɪɡeɪt/",         c3: "(v) bắt buộc, ép buộc",                            c4: "The contract obligates both sides to fulfill their duties.", c5: "", c6: "", count: 0 },
                    { c1: "party",         c2: "/ˈpɑːrti/",            c3: "(n) bên (tham gia hợp đồng), đảng phái",           c4: "Each party must sign the document.", c5: "", c6: "", count: 0 },
                    { c1: "provision",     c2: "/prəˈvɪʒn/",           c3: "(n) điều khoản, sự cung cấp",                      c4: "There is a provision in the contract about late payments.", c5: "", c6: "", count: 0 },
                    { c1: "resolve",       c2: "/rɪˈzɒlv/",            c3: "(v) giải quyết; (n) sự kiên quyết",                c4: "The two companies resolved their dispute out of court.", c5: "", c6: "", count: 0 },
                    { c1: "specific",      c2: "/spəˈsɪfɪk/",          c3: "(adj) cụ thể, riêng biệt",                         c4: "The contract includes specific terms and conditions.", c5: "", c6: "", count: 0 }
                ]
            },
            // ── Chủ đề 2: Marketing (Tiếp thị) ──
            {
                name: "Lesson 2: Marketing (Tiếp thị)",
                free: true,
                list: [
                    { c1: "attract",       c2: "/əˈtrækt/",            c3: "(v) thu hút, lôi cuốn",                             c4: "The new campaign attracted thousands of new customers.", c5: "", c6: "", count: 0 },
                    { c1: "compare",       c2: "/kəmˈpeər/",           c3: "(v) so sánh",                                       c4: "Consumers often compare prices before buying.", c5: "", c6: "", count: 0 },
                    { c1: "competition",   c2: "/ˌkɒmpəˈtɪʃn/",       c3: "(n) sự cạnh tranh, cuộc thi",                      c4: "The competition in the smartphone market is fierce.", c5: "", c6: "", count: 0 },
                    { c1: "consume",       c2: "/kənˈsjuːm/",          c3: "(v) tiêu thụ, tiêu dùng",                          c4: "People consume more digital content than ever before.", c5: "", c6: "", count: 0 },
                    { c1: "convince",      c2: "/kənˈvɪns/",           c3: "(v) thuyết phục",                                   c4: "The salesperson convinced me to buy the premium package.", c5: "", c6: "", count: 0 },
                    { c1: "currently",     c2: "/ˈkɜːrəntli/",         c3: "(adv) hiện nay, hiện tại",                         c4: "We are currently running a promotional campaign.", c5: "", c6: "", count: 0 },
                    { c1: "fad",           c2: "/fæd/",                 c3: "(n) mốt nhất thời, sự thích thú tạm thời",         c4: "Some experts say that this trend is just a fad.", c5: "", c6: "", count: 0 },
                    { c1: "inspiration",   c2: "/ˌɪnspəˈreɪʃn/",      c3: "(n) nguồn cảm hứng",                               c4: "Nature was the inspiration behind their new product design.", c5: "", c6: "", count: 0 },
                    { c1: "market",        c2: "/ˈmɑːrkɪt/",           c3: "(v) tiếp thị; (n) thị trường",                     c4: "They plan to market the product to young adults.", c5: "", c6: "", count: 0 },
                    { c1: "persuasion",    c2: "/pərˈsweɪʒn/",         c3: "(n) sự thuyết phục",                               c4: "It took a lot of persuasion to get the client to agree.", c5: "", c6: "", count: 0 },
                    { c1: "productive",    c2: "/prəˈdʌktɪv/",         c3: "(adj) có năng suất, hữu ích",                      c4: "The marketing meeting was very productive.", c5: "", c6: "", count: 0 },
                    { c1: "satisfaction",  c2: "/ˌsætɪsˈfækʃn/",      c3: "(n) sự hài lòng, sự thỏa mãn",                    c4: "Customer satisfaction is our top priority.", c5: "", c6: "", count: 0 }
                ]
            }
            // ➜ THÊM BÀI HỌC MỚI Ở ĐÂY (copy nguyên block {} phía trên)
        ],
        quiz: [
            {
                name: "Trắc nghiệm Lesson 1: Contracts",
                free: true,
                list: [
                    { gramType: "quiz", q: "The two parties agreed to ______ by the judge's decision.", ans: "abide", w1: "abiding", w2: "abide by", w3: "abides", explain: "Sau 'to' cần động từ nguyên thể. Cụm từ: abide by (tuân thủ).", count: 0 },
                    { gramType: "quiz", q: "After reading the ______, I was still unable to determine if our company was liable.", ans: "agreement", w1: "agree", w2: "agreed", w3: "agreeable", explain: "Sau mạo từ 'the' cần một danh từ (agreement).", count: 0 },
                    { gramType: "quiz", q: "The sales associate gave his ______ that the missing keyboard would be replaced.", ans: "assurance", w1: "assure", w2: "assuredly", w3: "assuring", explain: "Sau tính từ sở hữu 'his' cần một danh từ (assurance).", count: 0 },
                    { gramType: "quiz", q: "The ______ clause appears at the back of the contract.", ans: "cancellation", w1: "cancel", w2: "canceled", w3: "canceling", explain: "Danh từ ghép 'cancellation clause': điều khoản hủy bỏ.", count: 0 },
                    { gramType: "quiz", q: "The skill of the union bargainers will ______ whether the plant will open next week.", ans: "determine", w1: "determined", w2: "determination", w3: "determinant", explain: "Sau động từ khuyết thiếu 'will' cần động từ nguyên thể (determine).", count: 0 },
                    { gramType: "quiz", q: "Before ______ in a new business, it is important to do thorough research.", ans: "engaging", w1: "engage", w2: "engaged", w3: "engagement", explain: "Sau giới từ 'Before' dùng V-ing (engaging).", count: 0 },
                    { gramType: "quiz", q: "The merger of the two companies ______ a powerful new corporation.", ans: "established", w1: "establish", w2: "establishment", w3: "establishing", explain: "Câu miêu tả sự việc đã xảy ra, cần động từ chia thì quá khứ đơn (established).", count: 0 },
                    { gramType: "quiz", q: "The contractor was ______ by the contract to work 40 hours a week.", ans: "obligated", w1: "obligate", w2: "obligation", w3: "obligatory", explain: "Cấu trúc bị động: was obligated (bị bắt buộc).", count: 0 },
                    { gramType: "quiz", q: "The ______ agreed to a settlement in their contract dispute.", ans: "parties", w1: "party", w2: "partial", w3: "parting", explain: "Có sự thỏa thuận (agreed to a settlement) nên phải có từ 2 bên trở lên tham gia -> parties (số nhiều).", count: 0 },
                    { gramType: "quiz", q: "The contract contains a ______ to deal with how payments are made.", ans: "provision", w1: "provide", w2: "provider", w3: "provisioning", explain: "Sau mạo từ 'a' cần một danh từ đếm được số ít (provision - điều khoản).", count: 0 },
                    { gramType: "quiz", q: "The mediator was able to ______ the problem to everyone's satisfaction.", ans: "resolve", w1: "resolution", w2: "resolved", w3: "resolving", explain: "Sau 'be able to' cần động từ nguyên thể (resolve - giải quyết).", count: 0 },
                    { gramType: "quiz", q: "In a contract, one ______ word can change the meaning dramatically.", ans: "specific", w1: "specify", w2: "specification", w3: "specifying", explain: "Trước danh từ 'word' cần một tính từ bổ nghĩa (specific).", count: 0 },
                    { gramType: "quiz", q: "If both parties ______ to the terms, we can finalize the contract.", ans: "agree", w1: "agreement", w2: "agreeable", w3: "agreed", explain: "Câu điều kiện loại 1, mệnh đề if chia hiện tại đơn. Chủ ngữ số nhiều (both parties) -> agree.", count: 0 },
                    { gramType: "quiz", q: "What ______ is there that the company will still be in business?", ans: "assurance", w1: "assure", w2: "assuredly", w3: "assuring", explain: "Cần một danh từ làm chủ ngữ trong câu hỏi: What assurance... (Có sự đảm bảo nào...).", count: 0 },
                    { gramType: "quiz", q: "The ______ concert ended up costing our agency millions.", ans: "canceled", w1: "cancel", w2: "cancellation", w3: "cancels", explain: "Động từ dạng V-ed/V3 (canceled) đóng vai trò như tính từ để bổ nghĩa cho danh từ concert (buổi hòa nhạc bị hủy).", count: 0 },
                    { gramType: "quiz", q: "The factory managers have a legal ______ to provide a safe work site.", ans: "obligation", w1: "obligate", w2: "obligatory", w3: "obliged", explain: "Sau tính từ 'legal' cần một danh từ (obligation - nghĩa vụ pháp lý).", count: 0 },
                    { gramType: "quiz", q: "We must negotiate a new contract with our Internet service ______.", ans: "provider", w1: "provide", w2: "provision", w3: "providing", explain: "Cụm danh từ: service provider (nhà cung cấp dịch vụ).", count: 0 },
                    { gramType: "quiz", q: "The contract ______ the percentage of raise the workers will see next year.", ans: "specifies", w1: "specify", w2: "specific", w3: "specification", explain: "Chủ ngữ 'The contract' là số ít, động từ chia hiện tại đơn thêm -s/es (specifies).", count: 0 },
                    { gramType: "quiz", q: "Through her books, Dr. Wan ______ herself as an authority on conflict resolution.", ans: "established", w1: "establish", w2: "establishment", w3: "establishes", explain: "Câu miêu tả sự việc đã xảy ra, cần động từ chia quá khứ (established).", count: 0 },
                    { gramType: "quiz", q: "I felt ______ to finish the project even though I could have quit.", ans: "obligated", w1: "obligate", w2: "obligation", w3: "obligatory", explain: "Cấu trúc: feel obligated to do sth (cảm thấy có nghĩa vụ phải làm gì).", count: 0 }
                ]
            },
            {
                name: "Trắc nghiệm Lesson 2: Marketing",
                free: true,
                list: [
                    { gramType: "quiz", q: "The new advertising ______ the wrong kind of customer into the store.", ans: "attracts", w1: "attract", w2: "attraction", w3: "attractive", explain: "Chủ ngữ 'advertising' là danh từ không đếm được (số ít) nên động từ thêm -s.", count: 0 },
                    { gramType: "quiz", q: "Once the customer ______ the two products, her choice was easy.", ans: "compared", w1: "compare", w2: "comparison", w3: "comparable", explain: "Mệnh đề chính dùng thì quá khứ (was easy) nên động từ mệnh đề phụ cũng chia quá khứ (compared).", count: 0 },
                    { gramType: "quiz", q: "Hector's has come out on top in the ______ for afternoon diners.", ans: "competition", w1: "compete", w2: "competitive", w3: "competing", explain: "Sau mạo từ 'the' cần một danh từ (competition: sự cạnh tranh).", count: 0 },
                    { gramType: "quiz", q: "The business plans ______ all of Fritz's attention this fall.", ans: "consume", w1: "consumed", w2: "consumer", w3: "consumption", explain: "Chủ ngữ 'business plans' số nhiều, dùng động từ nguyên thể 'consume' (tiêu tốn, thu hút sự chú ý).", count: 0 },
                    { gramType: "quiz", q: "The salesman ______ his customer to buy his entire inventory.", ans: "convinced", w1: "convince", w2: "convincing", w3: "convincible", explain: "Câu diễn tả sự việc đã xảy ra, cần động từ chia thì quá khứ đơn (convinced).", count: 0 },
                    { gramType: "quiz", q: "We are ______ exploring plans to update the MX3 model.", ans: "currently", w1: "current", w2: "currency", w3: "currents", explain: "Trạng từ 'currently' bổ nghĩa cho động từ 'exploring' (hiện đang khám phá/xem xét).", count: 0 },
                    { gramType: "quiz", q: "Classic tastes have proven to resist ______ like the mini dress.", ans: "fads", w1: "fad", w2: "faded", w3: "fading", explain: "Danh từ đếm được, nói chung chung dùng số nhiều 'fads' (những mốt nhất thời).", count: 0 },
                    { gramType: "quiz", q: "Marta's high sales in Spain were an ______ to other European reps.", ans: "inspiration", w1: "inspire", w2: "inspirational", w3: "inspired", explain: "Sau mạo từ 'an' cần một danh từ (inspiration: nguồn cảm hứng).", count: 0 },
                    { gramType: "quiz", q: "When Omar first began making chutneys, he ______ them door-to-door.", ans: "marketed", w1: "market", w2: "marketing", w3: "marketable", explain: "Vế trước 'began' chia quá khứ nên vế sau cũng chia quá khứ đơn (marketed).", count: 0 },
                    { gramType: "quiz", q: "The seminar teaches techniques of ______ to increase sales.", ans: "persuasion", w1: "persuade", w2: "persuasive", w3: "persuasively", explain: "Sau giới từ 'of' cần một danh từ (persuasion: sự thuyết phục).", count: 0 },
                    { gramType: "quiz", q: "Alonzo is excited about his ______ staff.", ans: "productive", w1: "product", w2: "produce", w3: "productivity", explain: "Trước danh từ 'staff' cần tính từ bổ nghĩa (productive staff: nhân viên năng suất).", count: 0 },
                    { gramType: "quiz", q: "Your ______ is guaranteed or you'll get your money back.", ans: "satisfaction", w1: "satisfy", w2: "satisfactory", w3: "satisfied", explain: "Sau tính từ sở hữu 'Your' cần một danh từ làm chủ ngữ (satisfaction).", count: 0 },
                    { gramType: "quiz", q: "The store's poor location did not help it ______ customers.", ans: "attract", w1: "attraction", w2: "attractive", w3: "attractively", explain: "Cấu trúc 'help sb (to) do sth' -> dùng động từ nguyên thể (attract).", count: 0 },
                    { gramType: "quiz", q: "There was no ______ in the quality of the two brands.", ans: "comparison", w1: "compare", w2: "comparable", w3: "comparative", explain: "Sau từ chỉ số lượng 'no' cần một danh từ (comparison).", count: 0 },
                    { gramType: "quiz", q: "We ______ against three other agencies to get this contract.", ans: "competed", w1: "compete", w2: "competition", w3: "competitive", explain: "Hành động đã xảy ra, cần động từ chia quá khứ đơn (competed against: cạnh tranh với).", count: 0 },
                    { gramType: "quiz", q: "The government tracks ______ spending closely.", ans: "consumer", w1: "consume", w2: "consumable", w3: "consumption", explain: "Cụm danh từ ghép 'consumer spending' (chi tiêu của người tiêu dùng).", count: 0 },
                    { gramType: "quiz", q: "A good director of ______ can find a way to sell even an unattractive product.", ans: "marketing", w1: "market", w2: "marketable", w3: "marketed", explain: "Chức danh 'director of marketing' (giám đốc tiếp thị).", count: 0 },
                    { gramType: "quiz", q: "Henri was perfectly ______ with his new fishing rod.", ans: "satisfied", w1: "satisfy", w2: "satisfaction", w3: "satisfactory", explain: "Cấu trúc 'be satisfied with' (hài lòng với).", count: 0 },
                    { gramType: "quiz", q: "Marketing specialists have conducted studies of what ______ customers.", ans: "attracts", w1: "attractive", w2: "attraction", w3: "attracting", explain: "Đại từ 'what' làm chủ ngữ số ít, động từ chia thêm -s (attracts).", count: 0 },
                    { gramType: "quiz", q: "Smart shoppers will ______ similar brands before making a decision.", ans: "compare", w1: "comparison", w2: "comparative", w3: "comparable", explain: "Sau động từ khuyết thiếu 'will' cần động từ nguyên thể (compare).", count: 0 }
                ]
            }
        ]
    }
};
