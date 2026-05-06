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
                name: "HSK1: Từ vựng Phần 1",
                free: true,
                list: [
                    { c1: "爱", c2: "ài", c3: "yêu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "八", c2: "bā", c3: "số 8", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "爸爸", c2: "bàba", c3: "bố, ba", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "杯子", c2: "bēizi", c3: "cái cốc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "北京", c2: "Běijīng", c3: "Bắc Kinh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "本", c2: "běn", c3: "cuốn, quyển", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "不客气", c2: "bú kèqi", c3: "đừng khách khí, đừng ngại", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "不", c2: "bù", c3: "không", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "菜", c2: "cài", c3: "món (ăn)", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "茶", c2: "chá", c3: "trà", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "吃", c2: "chī", c3: "ăn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "出租车", c2: "chūzūchē", c3: "xe taxi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "打电话", c2: "dǎ diànhuà", c3: "gọi điện thoại", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "大", c2: "dà", c3: "to, lớn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "的", c2: "de", c3: "của, cái gì đó", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "点", c2: "diǎn", c3: "giờ", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "电脑", c2: "diànnǎo", c3: "máy vi tính", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "电视", c2: "diànshì", c3: "ti vi, vô tuyến", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "电影", c2: "diànyǐng", c3: "phim điện ảnh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "东西", c2: "dōngxi", c3: "đồ vật", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "都", c2: "dōu", c3: "đều", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "读", c2: "dú", c3: "đọc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "对不起", c2: "duìbuqǐ", c3: "xin lỗi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "多", c2: "duō", c3: "nhiều, quá", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "多少", c2: "duōshao", c3: "bao nhiêu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "儿子", c2: "érzi", c3: "con trai", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "二", c2: "èr", c3: "số 2", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "饭馆", c2: "fàngguǎn", c3: "cửa hàng ăn, quán ăn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "飞机", c2: "fēijī", c3: "máy bay", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "分钟", c2: "fēnzhōng", c3: "phút", c4: "", c5: "", c6: "", count: 0 }
                ]
            },
            {
                name: "HSK1: Từ vựng Phần 2",
                free: true,
                list: [
                    { c1: "高兴", c2: "gāoxìng", c3: "vui vẻ, hào hứng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "个", c2: "gè", c3: "cái", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "工作", c2: "gōngzuò", c3: "công việc, làm việc", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "狗", c2: "gǒu", c3: "chó", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "汉语", c2: "Hànyǔ", c3: "tiếng Hán", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "好", c2: "hǎo", c3: "tốt, OK, yêu thích", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "喝", c2: "hē", c3: "uống", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "和", c2: "hé", c3: "và", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "很", c2: "hěn", c3: "rất", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "后面", c2: "hòumiàn", c3: "phía sau", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "回", c2: "huí", c3: "quay lại, trở về", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "会", c2: "huì", c3: "sẽ, hội (họp)", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "火车站", c2: "huǒchēzhàn", c3: "ga tàu hỏa", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "几", c2: "jǐ", c3: "mấy, vài", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "家", c2: "jiā", c3: "nhà, gia đình", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "叫", c2: "jiào", c3: "gọi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "今天", c2: "jīntiān", c3: "hôm nay", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "九", c2: "jiǔ", c3: "số 9", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "开", c2: "kāi", c3: "mở", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "看", c2: "kàn", c3: "xem, nhìn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "看见", c2: "kànjiàn", c3: "nhìn thấy", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "块", c2: "kuài", c3: "đồng (tiền), miếng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "来", c2: "lái", c3: "đến", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "老师", c2: "lǎoshī", c3: "giáo viên, thầy cô", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "了", c2: "le", c3: "rồi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "冷", c2: "lěng", c3: "lạnh", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "里", c2: "lǐ", c3: "bên trong", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "零", c2: "líng", c3: "số 0", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "六", c2: "liù", c3: "số 6", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "妈妈", c2: "māma", c3: "mẹ, má", c4: "", c5: "", c6: "", count: 0 }
                ]
            },
            {
                name: "HSK1: Từ vựng Phần 3",
                free: true,
                list: [
                    { c1: "吗", c2: "ma", c3: "không?", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "买", c2: "mǎi", c3: "mua", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "猫", c2: "māo", c3: "mèo", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "没", c2: "méi", c3: "chưa, không", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "没关系", c2: "méi guānxi", c3: "không sao", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "米饭", c2: "mǐfàn", c3: "cơm", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "明天", c2: "míngtiān", c3: "ngày mai", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "名字", c2: "míngzi", c3: "tên", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "哪 (哪儿)", c2: "nǎ (nǎr)", c3: "ở đâu", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "那 (那儿)", c2: "nà (nàr)", c3: "ở kia", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "呢", c2: "ne", c3: "thế, nhỉ, vậy", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "能", c2: "néng", c3: "có thể", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "你", c2: "nǐ", c3: "bạn", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "年", c2: "nián", c3: "năm, niên", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "女儿", c2: "nǚér", c3: "con gái", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "朋友", c2: "péngyou", c3: "bạn bè", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "漂亮", c2: "piàoliang", c3: "xinh đẹp", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "苹果", c2: "píngguǒ", c3: "quả táo", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "七", c2: "qī", c3: "số 7", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "钱", c2: "qián", c3: "tiền", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "前面", c2: "qiánmiàn", c3: "phía trước", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "请", c2: "qǐng", c3: "mời", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "去", c2: "qù", c3: "đi", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "热", c2: "rè", c3: "nóng", c4: "", c5: "", c6: "", count: 0 },
                    { c1: "人", c2: "rén", c3: "người", c4: "", c5: "", c6: "", count: 0 }
                ]
            }
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
