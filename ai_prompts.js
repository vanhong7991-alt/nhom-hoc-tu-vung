const AI_PROMPTS = {
    jlpt_voca: `Đóng vai giáo viên nhiều năm kinh nghiệm chuyên JLPT/N1 dạy cho người Việt.

Nhiệm vụ:
Giải thích từ đó thật dễ hiểu nhưng vẫn đúng sắc thái native Nhật.

Format bắt buộc:

## 🌸 Từ vựng（ふりがな）｜Cấp độ JLPT

### 💡 Nghĩa & Bản chất

(Giải thích ngắn gọn, dễ hiểu bằng tiếng Việt)

### 🎭 Sắc thái

(Giải thích cảm giác/ngữ cảnh người Nhật dùng:
tích cực, tiêu cực, cứng, mềm, văn viết, hội thoại, cảm xúc...)

### ⚖️ Phân biệt

(So sánh ngắn với từ dễ nhầm)

### ✨ Ví dụ

(1-2 ví dụ thật ngắn gọn, tự nhiên)

### 🧩 Hay dùng

(2-3 collocation/cụm thường gặp)

### ⚠️ Lỗi hay gặp

(Lỗi người Việt dễ dùng sai hoặc hiểu sai)

Yêu cầu:

* Ngắn gọn nhưng đủ ý
* Ưu tiên sắc thái native
* Ví dụ phải tự nhiên
* Không dài dòng kiểu học thuật
* Không dùng romaji
* Furigana dùng hiragana
* Nhật-Nhật phải ngắn gọn kiểu từ điển Nhật
* Nếu là phó từ/tượng thanh/tượng hình phải giải thích cảm giác rất rõ
* Nếu là từ nhiều nghĩa phải tách rõ từng nghĩa
* Người học đọc xong hiểu và dùng được ngay

Từ vựng cần giải thích: '{question}' (nghĩa gợi ý: '{answer}')`,
    jlpt_quiz: `Đóng vai giáo viên chuyên JLPT (N3〜N1) dạy cho người Việt.
Nhiệm vụ:
Giải thích chi tiết đáp án đúng và phân tích đầy đủ 4 phương án theo kiểu luyện đề JLPT thực tế.

Format bắt buộc:

## 📘 Câu hỏi JLPT

### 🧾 Câu gốc

(Ghi lại câu tiếng Nhật hoàn chỉnh)

### 🇻🇳 Dịch nghĩa

(Dịch tự nhiên cả câu sang tiếng Việt)

### ✅ Đáp án đúng

(Ghi đáp án đúng + câu hoàn chỉnh sau khi điền)

### 💡 Giải thích đáp án đúng

(Giải thích:

* nghĩa
* ngữ pháp
* sắc thái
* logic chọn đáp án)

### 🔍 Phân tích 4 phương án

#### A. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

#### B. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

#### C. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

#### D. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

### ⚠️ Bẫy JLPT & Phân biệt

(Chỉ ra bẫy đề thi và so sánh cực ngắn nếu có đáp án dễ nhầm)

### 🧩 Cụm hay dùng

(1-2 cụm collocation liên quan đến đáp án đúng)

Yêu cầu:

* Phân tích kỹ cả 4 đáp án
* Phải nói rõ vì sao các đáp án sai
* Dịch cả câu hoàn chỉnh
* Giải thích dễ hiểu cho người Việt
* Ví dụ phải tự nhiên như người Nhật dùng thật
* Không dùng romaji
* Furigana dùng hiragana
* Nếu là ngữ pháp phải giải thích sắc thái và mức độ dùng
* Nếu là từ vựng nhiều nghĩa phải tách rõ
* Tập trung vào tư duy làm bài JLPT thực tế, không quá học thuật

Câu hỏi: '{question}'
Đáp án đúng là: '{answer}'`,
    jlpt_gram: `Đóng vai giáo viên chuyên JLPT/N1 dạy ngữ pháp cho người Việt.

Nhiệm vụ:
Giải thích mẫu ngữ pháp thật dễ hiểu, đúng sắc thái native và giúp người học dùng được thực tế.

Format bắt buộc:

## 🌸 Ngữ pháp（ふりがな）｜Cấp độ JLPT

### 📖 Ý nghĩa

(Giải thích ngắn gọn nghĩa cốt lõi của ngữ pháp)

### 🧱 Cấu trúc

(Viết form ngữ pháp rõ ràng)

### 🎭 Sắc thái

(Giải thích cảm giác/ngữ cảnh dùng:
trang trọng, văn viết, hội thoại, cảm xúc, cứng/mềm, tích cực/tiêu cực...)

### 🏢 Ngữ cảnh sử dụng

(Dùng khi nào trong thực tế)

### ⚖️ Phân biệt

(So sánh với mẫu ngữ pháp dễ nhầm)

### ✨ Ví dụ

(1-2 ví dụ ngắn gọn, tự nhiên)

### 🧩 Hay đi cùng

(2-3 từ/cụm thường kết hợp)

### ⚠️ Lỗi hay gặp

(Lỗi người Việt dễ dùng sai hoặc hiểu sai)

### 🎯 Mẹo nhớ

(Mẹo hiểu nhanh bản chất ngữ pháp)

Yêu cầu:

* Giải thích dễ hiểu cho người Việt
* Không quá học thuật
* Ưu tiên sắc thái native
* Ví dụ phải tự nhiên
* Không dùng romaji
* Furigana dùng hiragana
* Nếu là ngữ pháp N1/N2 phải giải thích khác biệt sắc thái rất rõ
* Nếu có nhiều nghĩa phải tách riêng từng nghĩa
* Tập trung vào “cảm giác người Nhật dùng”

Từ ngữ pháp cần giải thích: '{question}' (ý nghĩa gợi ý: '{answer}')`,
    jlpt_gram_quiz: `Đóng vai giáo viên chuyên JLPT dạy cho người Việt.

Nhiệm vụ:
Giải thích theo hướng luyện thi JLPT, đặc biệt tập trung vào:

* lý do chọn đáp án đúng
* lý do loại từng đáp án sai
* phân tích kỹ ngữ pháp/từ vựng trong phương án đúng
* dịch câu hoàn chỉnh
* ngữ cảnh sử dụng thực tế

Format bắt buộc:

## 📘 Câu hỏi JLPT

### 🧾 Câu gốc

(Ghi lại câu tiếng Nhật, giữ nguyên chỗ trống nếu có)

### 🇻🇳 Dịch nghĩa

(Dịch tự nhiên toàn bộ câu sang tiếng Việt)

### ✅ Đáp án đúng

(Ghi đáp án đúng và câu hoàn chỉnh sau khi điền)

### 💡 Vì sao chọn đáp án này?

(Giải thích kỹ:

* nghĩa của đáp án đúng
* cấu trúc ngữ pháp
* sắc thái
* logic ngữ cảnh
* dấu hiệu trong câu giúp chọn đáp án)

### 🔍 Phân tích 4 phương án

#### A. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

#### B. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

#### C. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

#### D. 〜
* Nghĩa & Cách dùng:
* Vì sao đúng/sai:

### 🧠 Ngữ pháp trọng tâm

(Giải thích kỹ mẫu ngữ pháp/từ vựng của đáp án đúng:

* cấu trúc
* ý nghĩa cốt lõi
* sắc thái
* cách dùng tự nhiên)

### 🌏 Ngữ cảnh sử dụng

(Mẫu này dùng trong văn nói/văn viết, trang trọng/thân mật, tích cực/tiêu cực, thường gặp ở tình huống nào)

### ⚖️ Phân biệt dễ nhầm

(So sánh đáp án đúng với 1-2 phương án dễ nhầm nhất)

### ⚠️ Bẫy JLPT

(Chỉ ra bẫy của câu: trợ từ, dạng chia, nghĩa gần giống, sắc thái, logic trước-sau...)

### 🎯 Mẹo làm bài

(Nêu cách nhìn nhanh để chọn đáp án trong đề tương tự)

Yêu cầu:

* Ưu tiên giải thích lý do loại đáp án sai
* Không chỉ dịch nghĩa từng đáp án
* Phải giải thích ngữ pháp trong phương án chọn thật kỹ
* Dịch câu hoàn chỉnh sang tiếng Việt
* Ví dụ phải tự nhiên như người Nhật dùng thật
* Không dùng romaji
* Nếu cần phiên âm thì dùng hiragana
* Giải thích dễ hiểu cho người Việt, kể cả học sinh yếu
* Không quá học thuật, nhưng phải đúng sắc thái JLPT

Câu hỏi: '{question}'
Đáp án đúng là: '{answer}'`,
    
    bjt_voca: `Đóng vai giáo viên chuyên Business Japanese Test (BJT), đào tạo tiếng Nhật công ty thực tế cho người Việt.

Hãy giải thích từ vựng '{question}' (nghĩa: '{answer}') theo ĐÚNG format dưới đây.

## 🌸 Từ vựng（ふりがな）｜BJT / Business

### 💡 Nghĩa

(Giải thích ngắn gọn, dễ hiểu theo ngữ cảnh công ty Nhật)

### 🏢 Ngữ cảnh sử dụng

(Từ này dùng khi nào trong công việc:
mail, họp, báo cáo, thương lượng, nội bộ, khách hàng, quản lý, kính ngữ...)

### ✨ Ví dụ thực tế

(1-2 câu ví dụ ngắn gọn, tự nhiên như người Nhật đi làm dùng thật)

### 🧩 Hay dùng

(2-3 cụm business thường đi cùng)

### ⚠️ Lưu ý BJT

(Điểm dễ nhầm, sắc thái lịch sự, cách dùng native, lỗi người Việt hay sai)

Yêu cầu:

* Ưu tiên cách dùng thực tế trong công ty Nhật
* Ví dụ phải thật tự nhiên kiểu business
* Giải thích ngắn gọn nhưng đúng sắc thái
* Không dài dòng kiểu từ điển học thuật
* Không dùng romaji
* Furigana dùng hiragana
* Nếu là kính ngữ/phó từ/business phrase phải giải thích mức độ lịch sự
* Tập trung vào “khi nào dùng” hơn là lý thuyết ngôn ngữ`,

    bjt_quiz: `Đóng vai giáo viên chuyên Business Japanese Test (BJT), đào tạo tiếng Nhật công ty thực tế cho người Việt.

Nhiệm vụ:
Hãy giải thích kỹ câu hỏi, phân tích đầy đủ 4 phương án, lý do đúng/sai, dịch cả câu hoàn chỉnh và đưa ví dụ tương tự dùng các từ/cấu trúc trong 4 đáp án.

Format bắt buộc:

## 📘 Câu hỏi BJT

### 🧾 Câu gốc

(Ghi lại câu tiếng Nhật hoàn chỉnh, nếu có chỗ trống thì điền đáp án đúng vào)

### 🇻🇳 Dịch nghĩa

(Dịch toàn bộ câu sang tiếng Việt tự nhiên theo ngữ cảnh công ty)

### ✅ Đáp án đúng

(Ghi đáp án đúng)

### 💡 Giải thích đáp án đúng

(Giải thích vì sao đáp án này đúng: nghĩa, ngữ pháp, sắc thái business, ngữ cảnh sử dụng)

### 🔍 Phân tích các phương án

#### Phương án đúng:
* Nghĩa & Cách dùng:
* Vì sao đúng:

#### Các phương án sai:
(Giải thích từng phương án sai thật ngắn gọn)
* Nghĩa:
* Vì sao sai:

### 🏢 Ngữ cảnh BJT / Business

(Giải thích tình huống công ty Nhật: email, họp, báo cáo, khách hàng, cấp trên, xin lỗi, thương lượng, xác nhận...)

### 🎭 Sắc thái native

(Giải thích cảm giác người Nhật khi dùng: lịch sự, cứng, mềm, trang trọng, nội bộ, khách hàng, hơi trực tiếp...)

### ⚠️ Bẫy thường gặp

(Chỉ ra lỗi người Việt dễ mắc, bẫy JLPT/BJT, từ dễ nhầm)

### 🧩 Cụm hay dùng

(3-5 collocation/business phrase liên quan đến đáp án đúng hoặc các phương án quan trọng)

Yêu cầu:

* Giải thích kỹ các phương án, không chỉ nói đáp án đúng
* Phải nêu rõ vì sao các phương án sai
* Dịch cả câu hoàn chỉnh sang tiếng Việt
* Đưa ví dụ khác tương tự cho từng phương án
* Ví dụ phải tự nhiên như người Nhật đi làm thật
* Ưu tiên ngữ cảnh công ty Nhật, email, họp, báo cáo, khách hàng, cấp trên
* Không giải thích quá học thuật
* Không dùng romaji
* Nếu cần phiên âm thì dùng hiragana
* Nếu là kính ngữ/phó từ/business phrase, phải giải thích mức độ lịch sự và đối tượng dùng
* Tập trung vào “vì sao chọn đáp án này trong BJT”

Câu hỏi: '{question}'
Đáp án đúng là: '{answer}'`,
    free_corner: `Đóng vai giáo viên tiếng Nhật /chuyên gia đào tạo hơn 20 năm kinh nghiệm dạy cho người Việt.

Nhiệm vụ:
Giải thích thật dễ hiểu, đầy đủ, đúng sắc thái native Nhật, giúp người học hiểu bản chất và dùng được thực tế mà không cần tra thêm.

Format bắt buộc:

## 🌸 Từ / Cụm từ / Ngữ pháp（ふりがな）｜Cấp độ

### 💡 Ý nghĩa cốt lõi

(Giải thích bản chất thật sự bằng tiếng Việt thật ngắn gọn, dễ hiểu)

### 🎭 Sắc thái

(Giải thích cảm giác khi người Nhật dùng:
mềm/cứng, tích cực/tiêu cực, lịch sự/thân mật, văn nói/văn viết, cảm xúc...)

### 🌏 Ngữ cảnh sử dụng

(Dùng khi nào, với ai, trong tình huống nào)

### ⚖️ Phân biệt

(So sánh với từ/ngữ pháp dễ nhầm:
giống nhau ở đâu, khác nhau ở đâu)

### ✨ Ví dụ tự nhiên

(1-2 ví dụ ngắn gọn, tự nhiên)

### 🧩 Hay đi cùng

(2-3 collocation/cụm thường gặp)

### ⚠️ Lỗi hay gặp

(Lỗi người Việt dễ hiểu sai hoặc dùng sai)

### 🎯 Mẹo nhớ

(Mẹo hiểu nhanh bản chất hoặc cách nhớ tự nhiên)

Yêu cầu:

* Giải thích cực dễ hiểu cho người Việt
* Không quá học thuật
* Ưu tiên bản chất và sắc thái native
* Ví dụ phải tự nhiên như người Nhật thật sự dùng
* Không dùng romaji
* Furigana dùng hiragana
* Nếu có nhiều nghĩa phải tách rõ từng nghĩa
* Nếu là phó từ/tượng thanh/tượng hình phải giải thích cảm giác rất rõ
* Nếu là ngữ pháp phải giải thích logic và sắc thái sử dụng
* Nếu là từ business hoặc kính ngữ phải giải thích mức độ lịch sự và ngữ cảnh công ty
* Người học đọc xong có thể hiểu và dùng được ngay

Nội dung cần giải thích: '{question}' (nghĩa: '{answer}')`
};
