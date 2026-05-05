// ============================================================
// DỮ LIỆU CỐ ĐỊNH - GÓC HSK (vanData_cn.js)
// ============================================================
// HƯỚNG DẪN THÊM TỪ VỰNG (struct):
//   { c1:"汉字", c2:"pīnyīn", c3:"Nghĩa TV", c4:"Câu ví dụ", c5:"", c6:"", count:0 }
//
// HƯỚNG DẪN THÊM TRẮC NGHIỆM (quiz):
//   { gramType:"quiz", q:"Câu hỏi ___", ans:"ĐA đúng", w1:"Sai1", w2:"Sai2", w3:"Sai3", explain:"Giải thích", count:0 }
//
// ➜ Thêm bài học mới: copy block { name:"...", free:true, list:[...] } và điền vào
// ➜ LUÔN để count:0
// ============================================================

const vanData = {

    // ══════════════════════════════════════════
    // HSK 1 — Cơ bản (150 từ)
    // ══════════════════════════════════════════
    hsk1voca: {
        struct: [
            {
                name: "HSK1 Bài 1: Người & Gia đình",
                free: true,
                list: [
                    { c1:"我",   c2:"wǒ",     c3:"tôi, tao",         c4:"我是学生。(Tôi là học sinh.)",         c5:"", c6:"", count:0 },
                    { c1:"你",   c2:"nǐ",     c3:"bạn, mày",         c4:"你好！(Chào bạn!)",                    c5:"", c6:"", count:0 },
                    { c1:"他",   c2:"tā",     c3:"anh ấy",           c4:"他叫李明。(Anh ấy tên Lý Minh.)",      c5:"", c6:"", count:0 },
                    { c1:"她",   c2:"tā",     c3:"cô ấy",            c4:"她是我朋友。(Cô ấy là bạn tôi.)",      c5:"", c6:"", count:0 },
                    { c1:"爸爸", c2:"bàba",   c3:"bố",               c4:"爸爸在家。(Bố ở nhà.)",                c5:"", c6:"", count:0 },
                    { c1:"妈妈", c2:"māma",   c3:"mẹ",               c4:"妈妈做饭。(Mẹ nấu ăn.)",               c5:"", c6:"", count:0 },
                    { c1:"老师", c2:"lǎoshī", c3:"giáo viên",        c4:"老师很好。(Giáo viên rất tốt.)",       c5:"", c6:"", count:0 },
                    { c1:"同学", c2:"tóngxué",c3:"bạn học",          c4:"我们是同学。(Chúng tôi là bạn học.)", c5:"", c6:"", count:0 }
                    // ➜ THÊM TỪ Ở ĐÂY
                ]
            },
            {
                name: "HSK1 Bài 2: Số & Thời gian",
                free: true,
                list: [
                    { c1:"一", c2:"yī",   c3:"một",   c4:"一个苹果。(Một quả táo.)",     c5:"", c6:"", count:0 },
                    { c1:"二", c2:"èr",   c3:"hai",   c4:"两个人。(Hai người.)",          c5:"", c6:"", count:0 },
                    { c1:"三", c2:"sān",  c3:"ba",    c4:"三点钟。(Ba giờ.)",             c5:"", c6:"", count:0 },
                    { c1:"今天",c2:"jīntiān",c3:"hôm nay", c4:"今天星期几？(Hôm nay thứ mấy?)", c5:"", c6:"", count:0 },
                    { c1:"明天",c2:"míngtiān",c3:"ngày mai",c4:"明天见！(Hẹn gặp ngày mai!)",  c5:"", c6:"", count:0 }
                    // ➜ THÊM TỪ Ở ĐÂY
                ]
            }
            // ➜ THÊM BÀI MỚI Ở ĐÂY
        ],
        quiz: [
            {
                name: "HSK1 Trắc nghiệm Bài 1",
                free: true,
                list: [
                    { gramType:"quiz", q:"\"Bố\" trong tiếng Trung là:", ans:"爸爸", w1:"妈妈", w2:"老师", w3:"同学", explain:"爸爸 (bàba) = bố | 妈妈 = mẹ | 老师 = giáo viên | 同学 = bạn học", count:0 },
                    { gramType:"quiz", q:"\"你好\" có nghĩa là:", ans:"Xin chào", w1:"Cảm ơn", w2:"Tạm biệt", w3:"Xin lỗi", explain:"你好 (nǐ hǎo) = Xin chào / Chào bạn — câu chào phổ biến nhất trong tiếng Trung", count:0 }
                    // ➜ THÊM CÂU HỎI Ở ĐÂY
                ]
            }
        ]
    },

    // ══════════════════════════════════════════
    // HSK 2 — Sơ cấp (300 từ)
    // ══════════════════════════════════════════
    hsk2voca: {
        struct: [
            {
                name: "HSK2 Bài 1: Cuộc sống hàng ngày",
                free: true,
                list: [
                    { c1:"吃饭", c2:"chīfàn",  c3:"ăn cơm",      c4:"我们去吃饭吧。(Chúng ta đi ăn cơm thôi.)",   c5:"", c6:"", count:0 },
                    { c1:"喝水", c2:"hē shuǐ", c3:"uống nước",   c4:"多喝水。(Uống nhiều nước vào.)",              c5:"", c6:"", count:0 },
                    { c1:"睡觉", c2:"shuìjiào",c3:"ngủ",          c4:"我要睡觉了。(Tôi đi ngủ đây.)",              c5:"", c6:"", count:0 },
                    { c1:"起床", c2:"qǐchuáng",c3:"thức dậy",    c4:"几点起床？(Mấy giờ thức dậy?)",              c5:"", c6:"", count:0 },
                    { c1:"学习", c2:"xuéxí",   c3:"học tập",     c4:"我喜欢学习汉语。(Tôi thích học tiếng Trung.)",c5:"", c6:"", count:0 },
                    { c1:"工作", c2:"gōngzuò", c3:"làm việc",    c4:"你在哪儿工作？(Bạn làm việc ở đâu?)",        c5:"", c6:"", count:0 }
                    // ➜ THÊM TỪ Ở ĐÂY
                ]
            }
            // ➜ THÊM BÀI MỚI Ở ĐÂY
        ],
        quiz: [
            {
                name: "HSK2 Trắc nghiệm Bài 1",
                free: true,
                list: [
                    { gramType:"quiz", q:"\"我要睡觉了\" có nghĩa là:", ans:"Tôi đi ngủ đây.", w1:"Tôi muốn ăn cơm.", w2:"Tôi đi học.", w3:"Tôi thức dậy.", explain:"睡觉 (shuìjiào) = ngủ | 要...了 = sắp..., chuẩn bị... → Tôi sắp đi ngủ / Tôi đi ngủ đây.", count:0 }
                    // ➜ THÊM CÂU HỎI Ở ĐÂY
                ]
            }
        ]
    },

    // ══════════════════════════════════════════
    // HSK 3 — Trung cấp thấp (600 từ)
    // ══════════════════════════════════════════
    hsk3voca: {
        struct: [
            {
                name: "HSK3 Bài 1: Gia đình & Quan hệ",
                free: true,
                list: [
                    { c1:"丈夫", c2:"zhàngfu", c3:"chồng",          c4:"她丈夫在银行工作。(Chồng cô ấy làm ở ngân hàng.)", c5:"", c6:"", count:0 },
                    { c1:"妻子", c2:"qīzi",    c3:"vợ",             c4:"他的妻子是护士。(Vợ anh ấy là y tá.)",             c5:"", c6:"", count:0 },
                    { c1:"邻居", c2:"línjū",   c3:"hàng xóm",       c4:"我邻居很友好。(Hàng xóm tôi rất thân thiện.)",     c5:"", c6:"", count:0 },
                    { c1:"关系", c2:"guānxi",  c3:"mối quan hệ",    c4:"我们关系很好。(Chúng tôi quan hệ rất tốt.)",       c5:"", c6:"", count:0 }
                    // ➜ THÊM TỪ Ở ĐÂY
                ]
            },
            {
                name: "HSK3 Bài 2: Công việc & Xã hội",
                free: true,
                list: [
                    { c1:"经理", c2:"jīnglǐ",  c3:"quản lý, giám đốc", c4:"她是我们的经理。(Cô ấy là giám đốc chúng tôi.)", c5:"", c6:"", count:0 },
                    { c1:"同事", c2:"tóngshì", c3:"đồng nghiệp",       c4:"我的同事很友好。(Đồng nghiệp tôi rất thân thiện.)",c5:"", c6:"", count:0 },
                    { c1:"会议", c2:"huìyì",   c3:"cuộc họp",          c4:"下午有重要会议。(Chiều nay có cuộc họp quan trọng.)",c5:"", c6:"", count:0 }
                    // ➜ THÊM TỪ Ở ĐÂY
                ]
            }
        ],
        quiz: [
            {
                name: "HSK3 Trắc nghiệm Bài 1",
                free: true,
                list: [
                    { gramType:"quiz", q:"\"丈夫\" có nghĩa là:", ans:"Chồng", w1:"Vợ", w2:"Bạn trai", w3:"Anh trai", explain:"丈夫 (zhàngfu) = chồng | 妻子 (qīzi) = vợ | 男朋友 = bạn trai | 哥哥 = anh trai", count:0 }
                    // ➜ THÊM CÂU HỎI Ở ĐÂY
                ]
            }
        ]
    },

    // ══════════════════════════════════════════
    // HSK 4 — Trung cấp (1200 từ)
    // ══════════════════════════════════════════
    hsk4voca: {
        struct: [
            {
                name: "HSK4 Bài 1: Kinh tế & Xã hội",
                free: true,
                list: [
                    { c1:"经济",   c2:"jīngjì",     c3:"kinh tế",      c4:"中国经济发展很快。(Kinh tế TQ phát triển nhanh.)",   c5:"", c6:"", count:0 },
                    { c1:"发展",   c2:"fāzhǎn",     c3:"phát triển",   c4:"科技不断发展。(Khoa học không ngừng phát triển.)",    c5:"", c6:"", count:0 },
                    { c1:"影响",   c2:"yǐngxiǎng",  c3:"ảnh hưởng",    c4:"天气影响了我们的计划。(Thời tiết ảnh hưởng kế hoạch.)",c5:"", c6:"", count:0 },
                    { c1:"环境",   c2:"huánjìng",   c3:"môi trường",   c4:"保护环境很重要。(Bảo vệ môi trường rất quan trọng.)", c5:"", c6:"", count:0 },
                    { c1:"政府",   c2:"zhèngfǔ",    c3:"chính phủ",    c4:"政府出台了新政策。(Chính phủ ban hành chính sách mới.)",c5:"", c6:"", count:0 }
                    // ➜ THÊM TỪ Ở ĐÂY
                ]
            }
        ],
        quiz: [
            {
                name: "HSK4 Trắc nghiệm Bài 1",
                free: true,
                list: [
                    { gramType:"quiz", q:"\"保护环境\" có nghĩa là:", ans:"Bảo vệ môi trường", w1:"Phát triển kinh tế", w2:"Chính sách chính phủ", w3:"Ảnh hưởng xã hội", explain:"保护 (bǎohù) = bảo vệ | 环境 (huánjìng) = môi trường", count:0 }
                    // ➜ THÊM CÂU HỎI Ở ĐÂY
                ]
            }
        ]
    },

    // ══════════════════════════════════════════
    // HSK 5 — Cao cấp (2500 từ)
    // ══════════════════════════════════════════
    hsk5voca: {
        struct: [
            {
                name: "HSK5 Bài 1: Học thuật & Nghiên cứu",
                free: true,
                list: [
                    { c1:"研究",   c2:"yánjiū",    c3:"nghiên cứu",        c4:"他在做科学研究。(Anh ấy đang nghiên cứu khoa học.)",   c5:"", c6:"", count:0 },
                    { c1:"分析",   c2:"fēnxī",     c3:"phân tích",         c4:"需要仔细分析数据。(Cần phân tích dữ liệu kỹ lưỡng.)", c5:"", c6:"", count:0 },
                    { c1:"论文",   c2:"lùnwén",    c3:"luận văn, bài báo", c4:"她正在写毕业论文。(Cô ấy đang viết luận văn tốt nghiệp.)",c5:"", c6:"", count:0 },
                    { c1:"理论",   c2:"lǐlùn",     c3:"lý thuyết",         c4:"这个理论很重要。(Lý thuyết này rất quan trọng.)",       c5:"", c6:"", count:0 },
                    { c1:"实践",   c2:"shíjiàn",   c3:"thực tiễn, thực hành",c4:"理论结合实践。(Kết hợp lý thuyết và thực tiễn.)",  c5:"", c6:"", count:0 }
                    // ➜ THÊM TỪ Ở ĐÂY
                ]
            }
        ],
        quiz: [
            {
                name: "HSK5 Trắc nghiệm Bài 1",
                free: true,
                list: [
                    { gramType:"quiz", q:"\"理论结合实践\" có nghĩa là:", ans:"Kết hợp lý thuyết và thực tiễn", w1:"Nghiên cứu khoa học", w2:"Phân tích dữ liệu", w3:"Viết luận văn", explain:"理论 (lǐlùn) = lý thuyết | 结合 (jiéhé) = kết hợp | 实践 (shíjiàn) = thực tiễn", count:0 }
                    // ➜ THÊM CÂU HỎI Ở ĐÂY
                ]
            }
        ]
    },

    // ══════════════════════════════════════════
    // NGỮ PHÁP HSK (tất cả cấp)
    // ══════════════════════════════════════════
    hskgram: {
        struct: [
            {
                name: "Ngữ pháp HSK2-3: Cấu trúc cơ bản",
                free: true,
                list: [
                    { c1:"把字句",           c2:"bǎ zì jù",     c3:"Câu chữ 把 — nhấn mạnh tân ngữ: S + 把 + O + V + kết quả", count:0 },
                    { c1:"被字句",           c2:"bèi zì jù",    c3:"Câu bị động chữ 被: S + 被 + (người) + V", count:0 },
                    { c1:"越...越...",       c2:"yuè...yuè",    c3:"Càng... càng...: 越 + adj/v + 越 + adj/v", count:0 },
                    { c1:"不但...而且...",   c2:"bùdàn...érqiě",c3:"Không những... mà còn...: 不但 A, 而且 B", count:0 },
                    { c1:"虽然...但是...",   c2:"suīrán...dànshì",c3:"Mặc dù... nhưng...: 虽然 A, 但是 B", count:0 }
                    // ➜ THÊM ĐIỂM NGỮ PHÁP Ở ĐÂY
                ]
            },
            {
                name: "Ngữ pháp HSK4-5: Nâng cao",
                free: true,
                list: [
                    { c1:"是...的 (强调)",   c2:"shì...de",     c3:"Nhấn mạnh: S + 是 + [thời gian/địa điểm/cách thức] + V + 的", count:0 },
                    { c1:"连...都/也...",    c2:"lián...dōu/yě",c3:"Thậm chí...: 连 + (tân ngữ) + 都/也 + V", count:0 },
                    { c1:"只要...就...",     c2:"zhǐyào...jiù", c3:"Chỉ cần... là...: 只要 A, 就 B", count:0 },
                    { c1:"宁可...也不...",   c2:"nìngkě...yě bù",c3:"Thà... còn hơn không...: 宁可 A, 也不 B", count:0 }
                    // ➜ THÊM ĐIỂM NGỮ PHÁP Ở ĐÂY
                ]
            }
        ],
        quiz: [
            {
                name: "Ngữ pháp Trắc nghiệm Bài 1",
                free: true,
                list: [
                    { gramType:"quiz", q:"Chọn câu dùng đúng cấu trúc 把字句:", ans:"我把书放在桌子上了。", w1:"书被我放在桌子上。", w2:"我在桌子上放书。", w3:"我放书在桌子上了。", explain:"把字句: S + 把 + O + V + kết quả. Câu 2 dùng 被 (bị động) không phải 把.", count:0 },
                    { gramType:"quiz", q:"\"虽然很累，但是他还是坚持工作\" có nghĩa là:", ans:"Mặc dù rất mệt nhưng anh ấy vẫn kiên trì làm việc.", w1:"Vì mệt nên anh ấy nghỉ làm.", w2:"Anh ấy không mệt vì làm việc.", w3:"Anh ấy mệt và không muốn làm việc.", explain:"虽然...但是... = mặc dù... nhưng... | 坚持 = kiên trì", count:0 }
                    // ➜ THÊM CÂU HỎI Ở ĐÂY
                ]
            }
        ]
    }

    // ➜ THÊM HSK6 Ở ĐÂY NẾU CẦN:
    // ,hsk6voca: { struct: [...], quiz: [...] }
};
