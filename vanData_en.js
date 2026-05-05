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
};
