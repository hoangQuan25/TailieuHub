// --- HELPER FUNCTION ---
const removeDiacritics = (str) => {
  if (!str) return "";
  return str
    .normalize("NFD") // Step 1: Decompose chars into base char + diacritic
    .replace(/[\u0300-\u036f]/g, "") // Step 2: Remove diacritic marks (range U+0300 to U+036f)
    .replace(/[đĐ]/g, "d") // Step 3: Treat Vietnamese 'd'/'D' as 'd'
    .toLowerCase(); // Step 4: Convert to lowercase
};

// --- Dữ liệu Ngành học (Majors) ---
export const majors = [
  {
    id: "m_ITE6", // Việt-Nhật IT
    code: "IT-E6",
    name: "CNTT Việt-Nhật",
    description:
      "Chương trình CNTT hợp tác chất lượng cao Việt-Nhật, tập trung vào kỹ năng phù hợp thị trường Nhật Bản.",
    subjects: [
      // TDTT + QP AN
      "s_PE1014",
      "s_PE1024",
      "s_PE2102", // Example PE elective
      "s_MIL1210",
      "s_MIL1220",
      "s_MIL1230",
      "s_MIL1240",
      // Lý luận CT + Luật
      "s_EM1170",
      "s_SSH1111",
      "s_SSH1121",
      "s_SSH1131",
      "s_SSH1141",
      "s_SSH1151",
      // Toán & KHCB
      "s_IT2110",
      "s_IT2120",
      "s_IT2140",
      "s_IT3020",
      "s_IT3420",
      "s_IT4110",
      "s_IT4172",
      "s_MI1114",
      "s_MI1124",
      "s_MI1134",
      "s_MI1144",
      "s_MI2021",
      "s_PH1110",
      // Cơ sở & Cốt lõi ngành (IT)
      "s_IT2030",
      "s_IT3011",
      "s_IT3070",
      "s_IT3080",
      "s_IT3103",
      "s_IT3160",
      "s_IT3170",
      "s_IT3210",
      "s_IT3220",
      "s_IT3230",
      "s_IT3280",
      "s_IT3283",
      "s_IT3290",
      "s_IT3292",
      "s_IT3323",
      "s_IT3362",
      "s_IT3382",
      "s_IT4015",
      "s_IT4062",
      "s_IT4082",
      "s_IT4549",
      "s_IT4593",
      "s_IT5021",
      "s_IT5022",
      // Bổ trợ
      "s_CH2021",
      "s_ED3220", // Example choices
      // Thực tập
      "s_IT4948",
      // Mô đun (Choose one, e.g., AI/BigData)
      "s_IT3190",
      "s_IT4409",
      "s_IT4441",
      "s_IT4542",
      "s_IT4785",
      "s_IT4930",
      // Ngoại ngữ (Tiếng Nhật)
      "s_JP1110",
      "s_JP1120",
      "s_JP1132",
      "s_JP2111",
      "s_JP2126",
      "s_JP2132",
      "s_JP2210",
      "s_JP2220",
      "s_JP3110",
      "s_JP3120",
    ],
  },
  {
    id: "m_ME2", // Cơ khí
    code: "ME2", // Assuming ME2 is a code, adjust if needed
    name: "Kỹ thuật Cơ khí",
    description:
      "Chương trình đào tạo Kỹ sư Cơ khí với kiến thức nền tảng và chuyên sâu về thiết kế, chế tạo, vận hành máy móc, thiết bị.",
    subjects: [
      // TDTT + QP AN (Common)
      "s_PE1014",
      "s_PE1024",
      "s_PE2202", // Example PE elective
      "s_MIL1210",
      "s_MIL1220",
      "s_MIL1230",
      "s_MIL1240",
      // Lý luận CT + Luật (Common)
      "s_EM1170",
      "s_SSH1111",
      "s_SSH1121",
      "s_SSH1131",
      "s_SSH1141",
      "s_SSH1151",
      // Toán & KHCB (Common + Specific)
      "s_MI1114",
      "s_MI1124",
      "s_MI1134",
      "s_MI1144",
      "s_MI2021",
      "s_PH1110",
      "s_PH1120", // Physics II might be needed
      "s_ME1010", // Example: Intro to Mech Eng
      "s_ME2010", // Example: Engineering Drawing & CAD
      // Cơ sở & Cốt lõi ngành (ME)
      "s_ME3010", // Thermodynamics (example)
      "s_ME3020", // Statics & Dynamics (example)
      "s_ME3030", // Material Science (example)
      "s_ME3040", // Fluid Mechanics (example)
      "s_ME3050", // Machine Elements (example)
      "s_ME4010", // Control Engineering (example)
      "s_ME4020", // Manufacturing Processes (example)
      "s_IT2000", // Programming Basics might be useful
      // Bổ trợ (Common)
      "s_CH2021",
      "s_ED3220",
      // Thực tập
      "s_ME4900", // Example: ME Internship
      // Ngoại ngữ (Tiếng Anh)
      "s_FL1101",
      "s_FL1102",
      "s_FL2101", // Example: English 1, 2, 3
    ],
  },
  {
    id: "m_ED2", // Công nghệ Giáo dục
    code: "ED2", // Assuming ED2 is a code
    name: "Công nghệ Giáo dục",
    description:
      "Chương trình đào tạo về ứng dụng công nghệ trong giảng dạy, học tập và quản lý giáo dục.",
    subjects: [
      // TDTT + QP AN (Common)
      "s_PE1014",
      "s_PE1024",
      "s_PE2302", // Example PE elective
      "s_MIL1210",
      "s_MIL1220",
      "s_MIL1230",
      "s_MIL1240",
      // Lý luận CT + Luật (Common)
      "s_EM1170",
      "s_SSH1111",
      "s_SSH1121",
      "s_SSH1131",
      "s_SSH1141",
      "s_SSH1151",
      // Toán & KHCB (Lighter focus)
      "s_MI1001", // Example: Basic Math for Social Science
      "s_IT2110", // Intro IT
      "s_IT2120", // Computer Knowledge
      // Cơ sở & Cốt lõi ngành (ED)
      "s_ED2010", // Introduction to EdTech (example)
      "s_ED3010", // Instructional Design (example)
      "s_ED3020", // E-learning Technologies (example)
      "s_ED3280", // Applied Psychology
      "s_ED4010", // Learning Management Systems (example)
      "s_ED4020", // Multimedia for Education (example)
      "s_IT2030", // Technical Writing
      // Bổ trợ
      "s_ED3220", // Soft Skills
      "s_EM1180", // Business Culture
      // Thực tập
      "s_ED4900", // Example: EdTech Internship
      // Ngoại ngữ (Tiếng Anh)
      "s_FL1101",
      "s_FL1102",
      "s_FL2101", // Example: English 1, 2, 3
    ],
  },
  {
    id: "m_ITE10", // Khoa học dữ liệu & AI
    code: "IT-E10",
    name: "Khoa học dữ liệu & Trí tuệ nhân tạo",
    description:
      "Chương trình đào tạo chuyên sâu về phân tích dữ liệu lớn, học máy và các ứng dụng trí tuệ nhân tạo.",
    subjects: [
      // TDTT + QP AN (Common)
      "s_PE1014",
      "s_PE1024",
      "s_PE2102",
      "s_MIL1210",
      "s_MIL1220",
      "s_MIL1230",
      "s_MIL1240",
      // Lý luận CT + Luật (Common)
      "s_EM1170",
      "s_SSH1111",
      "s_SSH1121",
      "s_SSH1131",
      "s_SSH1141",
      "s_SSH1151",
      // Toán & KHCB (Strong Math focus)
      "s_MI1114",
      "s_MI1124",
      "s_MI1134",
      "s_MI1144",
      "s_MI2021", // Calculus, LinAlg, ProbStats are essential
      "s_IT3020", // Discrete Math
      "s_IT4110", // Scientific Computing
      "s_PH1110", // Physics I
      // Cơ sở & Cốt lõi ngành (Core IT + AI/DS focus)
      "s_IT2000", // Python programming (alternative to C path?)
      "s_IT3011", // Data Structures & Algorithms
      "s_IT3070", // OS Principles
      "s_IT3080", // Computer Networks
      "s_IT3103", // OOP
      "s_IT3160", // Intro AI
      "s_IT3170", // Applied Algorithms
      "s_IT3190", // Intro ML & Data Mining (Key)
      "s_IT3283", // Computer Architecture
      "s_IT3292", // Databases (Key)
      "s_IT4015", // Info Security Intro
      "s_IT4082", // Software Engineering
      "s_IT4409", // Web Tech (often needed for deployment)
      "s_IT4785", // Mobile Dev (optional but common)
      "s_IT4930", // Intro Data Science (Key)
      "s_IT4800", // Big Data Technologies (Example - Key)
      "s_IT4810", // Deep Learning (Example - Key)
      "s_IT5021",
      "s_IT5022", // Research Projects
      // Bổ trợ
      "s_ED3220",
      "s_CH2021",
      // Thực tập
      "s_IT4948", // Can use IT internship
      // Ngoại ngữ (Tiếng Anh)
      "s_FL1101",
      "s_FL1102",
      "s_FL2101",
      "s_FL2102", // Example: English 1, 2, 3, 4
    ],
  },
];

// --- Dữ liệu Môn học (Subjects) - Expanded List ---
export const subjects = [
  {
    id: "s_PE1014",
    code: "PE1014",
    name: "Lý luận TDTT",
    description: "Lý luận chung về Thể dục thể thao.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  {
    id: "s_PE1024",
    code: "PE1024",
    name: "Bơi lội",
    description: "Kỹ thuật bơi cơ bản.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  {
    id: "s_PE2102",
    code: "PE2102",
    name: "Bóng chuyền 2",
    description: "Kỹ thuật và chiến thuật Bóng chuyền nâng cao.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  {
    id: "s_PE2202",
    code: "PE2202",
    name: "Bóng đá 2",
    description: "Kỹ thuật và chiến thuật Bóng đá nâng cao.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  {
    id: "s_PE2251",
    code: "PE2251",
    name: "Taekwondo 1",
    description: "Kỹ thuật Taekwondo cơ bản.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  {
    id: "s_PE2302",
    code: "PE2302",
    name: "Bóng rổ 2",
    description: "Kỹ thuật và chiến thuật Bóng rổ nâng cao.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  {
    id: "s_PE2402",
    code: "PE2402",
    name: "Bóng bàn 2",
    description: "Kỹ thuật và chiến thuật Bóng bàn nâng cao.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  {
    id: "s_PE2502",
    code: "PE2502",
    name: "Cầu lông 2",
    description: "Kỹ thuật và chiến thuật Cầu lông nâng cao.",
    category: "Thể chất",
    documents: [],
    reviews: [],
  },
  // --- QP AN ---
  {
    id: "s_MIL1210",
    code: "MIL1210",
    name: "Đường lối quốc phòng và an ninh...",
    description: "Đường lối QP-AN.",
    category: "Quốc phòng",
    documents: [],
    reviews: [],
  },
  {
    id: "s_MIL1220",
    code: "MIL1220",
    name: "Công tác quốc phòng và an ninh",
    description: "Công tác QP-AN.",
    category: "Quốc phòng",
    documents: [],
    reviews: [],
  },
  {
    id: "s_MIL1230",
    code: "MIL1230",
    name: "Quân sự chung",
    description: "Kiến thức quân sự cơ bản.",
    category: "Quốc phòng",
    documents: [],
    reviews: [],
  },
  {
    id: "s_MIL1240",
    code: "MIL1240",
    name: "Kỹ thuật chiến đấu bộ binh và chiến thuật",
    description: "Chiến thuật và kỹ thuật chiến đấu.",
    category: "Quốc phòng",
    documents: [],
    reviews: [],
  },
  // --- Lý luận CT + Luật ---
  {
    id: "s_EM1170",
    code: "EM1170",
    name: "Pháp luật đại cương",
    description: "Kiến thức cơ bản về pháp luật Việt Nam.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_SSH1111",
    code: "SSH1111",
    name: "Triết học Mác - Lênin",
    description: "Nguyên lý cơ bản của Triết học Mác - Lênin.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_SSH1121",
    code: "SSH1121",
    name: "Kinh tế chính trị Mác - Lênin",
    description: "Nguyên lý cơ bản của Kinh tế chính trị Mác - Lênin.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_SSH1131",
    code: "SSH1131",
    name: "Chủ nghĩa xã hội khoa học",
    description: "Nguyên lý cơ bản của Chủ nghĩa xã hội khoa học.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_SSH1141",
    code: "SSH1141",
    name: "Lịch sử Đảng cộng sản Việt Nam",
    description: "Lịch sử hình thành và phát triển của Đảng CSVN.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_SSH1151",
    code: "SSH1151",
    name: "Tư tưởng Hồ Chí Minh",
    description: "Nội dung cơ bản và giá trị của Tư tưởng Hồ Chí Minh.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  // --- Toán & KHCB ---
  {
    id: "s_MI1114",
    code: "MI1114",
    name: "Giải tích I",
    description: "Giải tích hàm một biến.",
    category: "Đại cương",
    documents: ["d1", "d2"],
    reviews: [],
  }, // Linked d1, d2
  {
    id: "s_MI1124",
    code: "MI1124",
    name: "Giải tích II",
    description: "Giải tích hàm nhiều biến (phần 1).",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_MI1134",
    code: "MI1134",
    name: "Phương trình vi phân và Chuỗi",
    description: "Phương trình vi phân và lý thuyết chuỗi.",
    category: "Đại cương",
    documents: ["d7"],
    reviews: [
      {
        id: "r1",
        user: "AI_Enjoyer",
        comment: "Môn học thú vị!",
        date: "2025-01-10",
        like: 9,
      },
      {
        id: "r2",
        user: "AI_Enjoyer",
        comment: "Hoc mai khong qua troi oi...!",
        date: "2025-01-10",
        like: 7,
      },
      {
        id: "r3",
        user: "AI_Enjoyer",
        comment: "Tích 3 học 3 lần mới thấm các e ạ!",
        date: "2025-01-10",
        like: 5,
      },
      {
        id: "r4",
        user: "AI_Enjoyer",
        comment: "Thầy Thuận là chân ai!",
        date: "2025-01-10",
        like: 3,
      },
      {
        id: "r5",
        user: "AI_Enjoyer",
        comment: "Học để qua thì dễ, còn như nào thì không biết. Chắc học 3 lần là biết!",
        date: "2025-01-10",
        like: 1,
      },
      {
        id: "r6",
        user: "AI_Enjoyer",
        comment: "Tôi yêu môn phương trình vi phân & chuỗi.!",
        date: "2025-01-10",
        like: 0,
      },
      {
        id: "r7",
        user: "AI_Enjoyer",
        comment: "Tôi ghét môn phương trình vi phân & chuỗi!",
        date: "2025-01-10",
        like: 0,
      },
      {
        id: "r8",
        user: "AI_Enjoyer",
        comment: "lấy 4 điểm cũng dễ",
        date: "2025-01-10",
        like: 2,
      },
      {
        id: "r9",
        user: "AI_Enjoyer",
        comment: "Môn học thú vị!",
        date: "2025-01-10",
        like: 4,
      },
      {
        id: "r10",
        user: "AI_Enjoyer",
        comment: "Môn học thú vị!",
        date: "2025-01-10",
        like: 6,
      },
    ],
    tips: [
      {
        id: "st1",
        user: "User1",
        comment:
          "Đầu tiên và quan trọng nhất, hãy nắm thật chắc phần kiến thức giải tích từ các môn trước nhé. Giới hạn, đạo hàm, tích phân, chuỗi số, chuỗi hàm tất cả đều là nền tảng để bạn có thể tiếp thu tốt các khái niệm mới. Nếu cảm thấy chưa vững, đừng ngại dành thời gian ôn lại. Khi học đến các phương trình vi phân, bạn sẽ thấy có rất nhiều dạng và phương pháp giải khác nhau. Đừng cố gắng nhồi nhét tất cả cùng một lúc. Hãy học từng dạng một, hiểu rõ bản chất của phương pháp đó, rồi sau đó làm bài tập thật nhiều. Thực hành chính là chìa khóa để bạn thành thạo môn này. Cố gắng làm đa dạng các bài tập từ cơ bản đến nâng cao, từ sách giáo trình đến các bài tập bổ sung. Đừng ngại sai, vì mỗi lỗi sai sẽ giúp bạn hiểu sâu hơn. Một lời khuyên nữa là đừng học một mình. Hãy tìm một nhóm bạn cùng học, cùng thảo luận. Khi giải thích cho người khác, bạn sẽ tự mình củng cố kiến thức. Và quan trọng nhất, đừng ngại hỏi thầy cô hay bạn bè những chỗ mình chưa hiểu. Đôi khi, chỉ một khúc mắc nhỏ cũng có thể làm bạn mất phương hướng cả buổi học. Cuối cùng, hãy cố gắng liên hệ môn học với các ứng dụng thực tế. Khi thấy được PTVP và Chuỗi được dùng để giải quyết các vấn đề trong vật lý, kỹ thuật, kinh tế... bạn sẽ thấy môn học này không hề khô khan mà cực kỳ sống động và hữu ích. Cứ kiên trì và chăm chỉ, bạn sẽ vượt qua môn này dễ dàng thôi!.",
        date: "2023-10-01",
        likes: 3,
        images: ["/meohoc4.jpg"],
      }, // Tip with one image
      {
        id: "st2",
        user: "User2",
        comment: "Học tủ dạng bài: Quan sát kỹ đề thi các năm trước (hoặc hỏi mấy anh chị khóa trên). Bạn sẽ thấy có một số dạng bài kinh điển luôn xuất hiện: PTVP tuyến tính cấp 1, PTVP tuyến tính cấp 2 (dùng biến đổi Laplace hoặc nghiệm riêng), một vài dạng chuỗi số, và đặc biệt là khai triển Taylor/Maclaurin. Mấy dạng này cứ lặp đi lặp lại. Cày nát mấy dạng này đi, nhớ từng bước giải. Chuẩn bị tài liệu vàng: Nếu thầy cô cho mang tài liệu, hãy chuẩn bị một tờ A4 (hoặc mấy tờ nếu bạn có kỹ năng viết chữ nhỏ) ghi chép thật khoa học tất cả các công thức biến đổi Laplace ngược, các công thức khai triển chuỗi cơ bản, và các mẹo giải nhanh từng dạng. Cái này quan trọng cực kỳ, vì vào phòng thi mà nhớ được hết thì cũng hơi khó. Chiêu đánh lừa chấm điểm: Khi làm bài tự luận, dù không biết cách giải triệt để, bạn hãy cố gắng viết những gì mình nhớ được liên quan đến dạng đó: công thức, phương pháp tiếp cận ban đầu, dù chỉ là vài dòng. Đôi khi, giám khảo sẽ thương tình cho bạn một ít điểm phần ý tưởng hoặc công thức nếu thấy bạn có cố gắng. Quan trọng là đừng để giấy trắng!",
        date: "2023-10-02",
        likes: 2,
        images: [],
      }, // Tip with no images
      {
        id: "st3",
        user: "User3",
        comment: "Một là, hãy thử tìm các đề thi cũ nhất có thể, kiểu như chục năm về trước ấy. Mấy đề đó thường là nguồn vàng vì nhiều khi giáo trình, dạng bài vẫn chưa thay đổi nhiều. Cố gắng học thuộc các dạng ra đề cổ điển ấy, có khi lại trúng tủ không ngờ. Hai là, trong lớp học, đặc biệt là mấy buổi cuối trước khi thi, hãy chú ý cực kỳ kỹ những gì thầy cô gạch chân, nhấn mạnh, hoặc bảo chỗ này quan trọng. Hoặc khi thầy cô chữa bài tập, hãy để ý những câu nào được chữa chi tiết nhất, hoặc có nhiều bạn hỏi nhất. Đó thường là những dấu hiệu rõ ràng cho thấy dạng bài đó khả năng cao sẽ xuất hiện trong đề. Ba là, đây là chiêu ăn may nhưng đôi khi lại hiệu quả: nếu bạn có một nhóm bạn thân và biết chắc đề thi có những phần cố định (ví dụ 3 câu tự luận, mỗi câu một dạng), hãy chia nhau ra mỗi đứa học tủ một dạng. Vào phòng thi, nếu được phép, có thể nháy nhau một chút. Tuy nhiên, cách này rủi ro cao và không được khuyến khích chút nào vì vi phạm quy chế thi đấy nhé.",
        date: "2023-10-03",
        likes: 5,
        images: ["/meohoc1.jpeg", "/meohoc2.jpg"],
      }, // Tip with two images
    ],
  }, // Linked d7
  {
    id: "s_MI1144",
    code: "MI1144",
    name: "Đại số tuyến tính",
    description: "Ma trận, định thức, không gian vector.",
    category: "Đại cương",
    documents: [],
    reviews: [],
    tips: [
      {
        id: "st1",
        user: "User1",
        comment: "Học ít ít thôi.",
        date: "2023-10-01",
        likes: 3,
      },
      {
        id: "st2",
        user: "User2",
        comment: "Chép bài là auto qua môn.",
        date: "2023-10-02",
        likes: 2,
      },
    ],
  },
  {
    id: "s_MI2021",
    code: "MI2021",
    name: "Xác suất thống kê",
    description: "Lý thuyết xác suất và thống kê toán học.",
    category: "Đại cương",
    documents: [],
    reviews: [],
    tips: [
      {
        id: "st1",
        user: "User1",
        comment: "Học ít ít thôi.",
        date: "2023-10-01",
        likes: 3,
      },
      {
        id: "st2",
        user: "User2",
        comment: "Chép bài là auto qua môn.",
        date: "2023-10-02",
        likes: 2,
      },
    ],
  },
  {
    id: "s_PH1110",
    code: "PH1110",
    name: "Vật lý đại cương I",
    description: "Cơ học và Nhiệt học.",
    category: "Đại cương",
    documents: [],
    reviews: [],
    tips: [
      {
        id: "st1",
        user: "User1",
        comment: "Học ít ít thôi.",
        date: "2023-10-01",
        likes: 3,
      },
      {
        id: "st2",
        user: "User2",
        comment: "Chép bài là auto qua môn.",
        date: "2023-10-02",
        likes: 2,
      },
    ],
  },
  {
    id: "s_PH1120",
    code: "PH1120",
    name: "Vật lý đại cương II",
    description: "Điện và Từ.",
    category: "Đại cương",
    documents: ["d6"],
    reviews: [],
  }, // Linked d6
  {
    id: "s_MI1001",
    code: "MI1001",
    name: "Toán cơ bản",
    description: "Kiến thức toán học cơ bản cho KHXH.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT3020",
    code: "IT3020",
    name: "Toán rời rạc",
    description: "Logic, tập hợp, quan hệ, đồ thị, tổ hợp.",
    category: "Đại cương",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4110",
    code: "IT4110",
    name: "Tính toán khoa học",
    description: "Phương pháp số và ứng dụng...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4172",
    code: "IT4172",
    name: "Xử lý tín hiệu",
    description: "Các phương pháp xử lý tín hiệu số.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },

  // --- Cơ sở & Cốt lõi ngành (IT - UPDATED) ---
  {
    id: "s_IT2110",
    code: "IT2110",
    name: "Nhập môn CNTT và TT",
    description: "Tổng quan về ngành...",
    category: "Cơ sở ngành",
    documents: ["d11", "d12"],
    reviews: [],
  },
  {
    id: "s_IT2120",
    code: "IT2120",
    name: "Kiến thức máy tính",
    description: "Kiến thức cơ bản về phần cứng...",
    category: "Cơ sở ngành",
    documents: ["d13", "d14", "d15"],
    reviews: [],
  },
  {
    id: "s_IT2140",
    code: "IT2140",
    name: "Điện tử cho CNTT lab",
    description: "Thực hành mạch điện tử cơ bản...",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  }, // No docs added
  {
    id: "s_IT3420",
    code: "IT3420",
    name: "Điện tử cho CNTT",
    description: "Lý thuyết mạch điện tử cơ bản...",
    category: "Cơ sở ngành",
    documents: ["d16", "d17"],
    reviews: [],
  },
  {
    id: "s_IT2030",
    code: "IT2030",
    name: "Technical Writing and Presentation",
    description: "Kỹ năng viết tài liệu kỹ thuật...",
    category: "Cơ sở ngành",
    documents: ["d18", "d19"],
    reviews: [],
  },
  {
    id: "s_IT3011",
    code: "IT3011",
    name: "Cấu trúc dữ liệu và thuật toán",
    description: "Các cấu trúc dữ liệu và thuật toán cơ bản.",
    category: "Cơ sở ngành",
    documents: ["d20", "d21", "d22", "d23"],
    reviews: [],
  },
  {
    id: "s_IT3070",
    code: "IT3070",
    name: "Nguyên lý hệ điều hành",
    description: "Các khái niệm cốt lõi về hệ điều hành.",
    category: "Cơ sở ngành",
    documents: ["d24", "d25", "d26"],
    reviews: [],
  },
  {
    id: "s_IT3080",
    code: "IT3080",
    name: "Mạng máy tính",
    description: "Nguyên lý và kiến trúc mạng máy tính.",
    category: "Cơ sở ngành",
    documents: ["d27", "d28", "d29"],
    reviews: [
      /* keep existing review if desired */ {
        id: "r11",
        user: "AI_Enjoyer",
        comment: "Môn học thú vị!",
        date: "2025-01-10",
        like: 1,
      },
    ],
  }, // Linked new docs
  {
    id: "s_IT3103",
    code: "IT3103",
    name: "Lập trình hướng đối tượng",
    description: "Các nguyên lý của lập trình hướng đối tượng.",
    category: "Cơ sở ngành",
    documents: ["d30", "d31"],
    reviews: [],
  },
  {
    id: "s_IT3160",
    code: "IT3160",
    name: "Nhập môn Trí tuệ nhân tạo",
    description: "Giới thiệu về các khái niệm Trí tuệ nhân tạo.",
    category: "Cơ sở ngành",
    documents: ["d3", "d32", "d33"],
    reviews: [],
  }, // Linked d3 and new docs
  {
    id: "s_IT3210",
    code: "IT3210",
    name: "C Programming Language",
    description: "Ngôn ngữ lập trình C (Lý thuyết).",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  }, // No docs added
  {
    id: "s_IT3220",
    code: "IT3220",
    name: "C Programming (Introduction)",
    description: "Nhập môn Lập trình C (Thực hành).",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  }, // No docs added
  {
    id: "s_IT3230",
    code: "IT3230",
    name: "Lập trình C cơ bản",
    description: "Lập trình C cơ bản (Bài tập lớn).",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  }, // No docs added
  {
    id: "s_IT2000",
    code: "IT2000",
    name: "Introduction to Programming",
    description: "Nguyên lý cơ bản về lập trình sử dụng Python.",
    category: "Cơ sở ngành",
    documents: ["d4", "d5"],
    reviews: [
      {
        id: "r12",
        user: "StudentB",
        comment: "Khởi đầu tuyệt vời!",
        date: "2024-09-15",
        like: 5,
      },
    ],
  }, // Linked existing docs
  {
    id: "s_IT3280",
    code: "IT3280",
    name: "Thực hành kiến trúc máy tính",
    description: "Thực hành trên các thành phần...",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  }, // No docs added
  {
    id: "s_IT3283",
    code: "IT3283",
    name: "Kiến trúc máy tính",
    description: "Tổ chức và kiến trúc hệ thống máy tính.",
    category: "Cơ sở ngành",
    documents: ["d34", "d35"],
    reviews: [],
  },
  {
    id: "s_IT3290",
    code: "IT3290",
    name: "Thực hành cơ sở dữ liệu",
    description: "Thực hành thiết kế và truy vấn CSDL.",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  }, // No docs added
  {
    id: "s_IT3292",
    code: "IT3292",
    name: "Cơ sở dữ liệu",
    description: "Nguyên lý hệ quản trị cơ sở dữ liệu.",
    category: "Cơ sở ngành",
    documents: ["d36", "d37", "d38"],
    reviews: [],
  },

  // --- Chuyên ngành subjects (examples with linked docs) ---
  {
    id: "s_IT3170",
    code: "IT3170",
    name: "Thuật toán ứng dụng",
    description: "Thiết kế và phân tích thuật toán nâng cao.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT3190",
    code: "IT3190",
    name: "Nhập môn Học máy và khai phá dữ liệu",
    description: "Các thuật toán học máy...",
    category: "Chuyên ngành",
    documents: ["d10"],
    reviews: [],
  }, // Linked existing d10
  {
    id: "s_IT3323",
    code: "IT3323",
    name: "Xây dựng chương trình dịch",
    description: "Nguyên lý và kỹ thuật...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT3362",
    code: "IT3362",
    name: "Kỹ năng ITSS học bằng tiếng Nhật 1",
    description: "Phát triển kỹ năng theo chuẩn ITSS...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT3382",
    code: "IT3382",
    name: "Kỹ năng ITSS học bằng tiếng Nhật 2",
    description: "Phát triển kỹ năng theo chuẩn ITSS...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4015",
    code: "IT4015",
    name: "Nhập môn an toàn thông tin",
    description: "Các khái niệm cơ bản về an toàn...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4062",
    code: "IT4062",
    name: "Thực hành Lập trình mạng",
    description: "Thực hành phát triển ứng dụng mạng.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4082",
    code: "IT4082",
    name: "Kỹ thuật phần mềm",
    description: "Quy trình và phương pháp...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4549",
    code: "IT4549",
    name: "Phát triển phần mềm theo chuẩn kỹ năng ITSS",
    description: "Dự án phần mềm theo chuẩn ITSS.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4593",
    code: "IT4593",
    name: "Nhập môn kỹ thuật truyền thông",
    description: "Các khái niệm cơ bản về hệ thống...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4409",
    code: "IT4409",
    name: "Công nghệ Web và dịch vụ trực tuyến",
    description: "Phát triển ứng dụng web và dịch vụ.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4441",
    code: "IT4441",
    name: "Giao diện và trải nghiệm người dùng",
    description: "Thiết kế UI/UX cho ứng dụng.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4542",
    code: "IT4542",
    name: "Quản trị phát triển phần mềm",
    description: "Quản lý dự án và quy trình...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4785",
    code: "IT4785",
    name: "Phát triển ứng dụng cho thiết bị di động",
    description: "Lập trình ứng dụng...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4930",
    code: "IT4930",
    name: "Nhập môn Khoa học dữ liệu",
    description: "Quy trình và công cụ cơ bản...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4210",
    code: "IT4210",
    name: "Hệ nhúng",
    description: "Thiết kế và lập trình hệ thống nhúng.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4651",
    code: "IT4651",
    name: "Thiết kế và triển khai mạng IP",
    description: "Thiết kế, cấu hình và quản trị mạng IP.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4735",
    code: "IT4735",
    name: "IoT và ứng dụng",
    description: "Nền tảng và ứng dụng của Internet of Things.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4800",
    code: "IT4800",
    name: "Công nghệ Dữ liệu lớn",
    description: "Các công nghệ xử lý và lưu trữ dữ liệu lớn.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT4810",
    code: "IT4810",
    name: "Học sâu",
    description: "Các mô hình và kỹ thuật học sâu.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },

  // --- Cơ sở & Cốt lõi ngành (ME - Examples) ---
  {
    id: "s_ME1010",
    code: "ME1010",
    name: "Nhập môn Kỹ thuật Cơ khí",
    description: "Tổng quan về ngành...",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME2010",
    code: "ME2010",
    name: "Vẽ kỹ thuật & CAD",
    description: "Tiêu chuẩn vẽ kỹ thuật...",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME3010",
    code: "ME3010",
    name: "Nhiệt động lực học",
    description: "Truyền nhiệt, công và năng lượng...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME3020",
    code: "ME3020",
    name: "Cơ học tĩnh & động",
    description: "Phân tích lực và chuyển động...",
    category: "Chuyên ngành",
    documents: ["d8"],
    reviews: [],
  }, // Linked d8
  {
    id: "s_ME3030",
    code: "ME3030",
    name: "Khoa học vật liệu",
    description: "Tính chất và ứng dụng...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME3040",
    code: "ME3040",
    name: "Cơ học chất lỏng",
    description: "Lý thuyết cơ bản về dòng chảy...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME3050",
    code: "ME3050",
    name: "Chi tiết máy",
    description: "Thiết kế và tính toán các chi tiết máy...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME4010",
    code: "ME4010",
    name: "Kỹ thuật điều khiển",
    description: "Lý thuyết và ứng dụng hệ thống điều khiển...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME4020",
    code: "ME4020",
    name: "Công nghệ chế tạo",
    description: "Các phương pháp gia công...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },

  // --- Cơ sở & Cốt lõi ngành (ED - Examples) ---
  {
    id: "s_ED2010",
    code: "ED2010",
    name: "Nhập môn Công nghệ Giáo dục",
    description: "Tổng quan về lĩnh vực...",
    category: "Cơ sở ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ED3010",
    code: "ED3010",
    name: "Thiết kế dạy học",
    description: "Các mô hình và nguyên tắc...",
    category: "Chuyên ngành",
    documents: ["d9"],
    reviews: [],
  }, // Linked d9
  {
    id: "s_ED3020",
    code: "ED3020",
    name: "Công nghệ E-learning",
    description: "Các nền tảng và công cụ...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ED4010",
    code: "ED4010",
    name: "Hệ thống quản lý học tập (LMS)",
    description: "Sử dụng và quản trị các hệ thống LMS.",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ED4020",
    code: "ED4020",
    name: "Đa phương tiện trong giáo dục",
    description: "Thiết kế và ứng dụng multimedia...",
    category: "Chuyên ngành",
    documents: [],
    reviews: [],
  },

  // --- Bổ trợ ---
  {
    id: "s_CH2021",
    code: "CH2021",
    name: "Đổi mới sáng tạo và khởi nghiệp",
    description: "Tư duy đổi mới...",
    category: "Môn bổ trợ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ED3220",
    code: "ED3220",
    name: "Kỹ năng mềm",
    description: "Các kỹ năng giao tiếp...",
    category: "Môn bổ trợ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ED3280",
    code: "ED3280",
    name: "Tâm lý học ứng dụng",
    description: "Ứng dụng tâm lý học...",
    category: "Môn bổ trợ",
    documents: [],
    reviews: [],
  },
  // ... other Bổ trợ subjects ...

  // --- Thực tập ---
  {
    id: "s_IT4948",
    code: "IT4948",
    name: "Thực tập công nghiệp",
    description: "Thực tập tại doanh nghiệp CNTT.",
    category: "Thực tập",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ME4900",
    code: "ME4900",
    name: "Thực tập Kỹ thuật Cơ khí",
    description: "Thực tập tại doanh nghiệp Cơ khí.",
    category: "Thực tập",
    documents: [],
    reviews: [],
  },
  {
    id: "s_ED4900",
    code: "ED4900",
    name: "Thực tập Công nghệ Giáo dục",
    description: "Thực tập tại cơ sở giáo dục...",
    category: "Thực tập",
    documents: [],
    reviews: [],
  },

  // --- Đồ án ---
  {
    id: "s_IT5021",
    code: "IT5021",
    name: "Nghiên cứu tốt nghiệp 1",
    description: "Đồ án tốt nghiệp - giai đoạn 1.",
    category: "Đồ án",
    documents: [],
    reviews: [],
  },
  {
    id: "s_IT5022",
    code: "IT5022",
    name: "Nghiên cứu tốt nghiệp 2",
    description: "Đồ án tốt nghiệp - giai đoạn 2.",
    category: "Đồ án",
    documents: [],
    reviews: [],
  },
  // --- Ngoại ngữ (Tiếng Nhật - for IT-E6) ---
  {
    id: "s_JP1110",
    code: "JP1110",
    name: "Tiếng Nhật 1",
    description: "Tiếng Nhật sơ cấp 1.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP1120",
    code: "JP1120",
    name: "Tiếng Nhật 2",
    description: "Tiếng Nhật sơ cấp 2.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP1132",
    code: "JP1132",
    name: "Tiếng Nhật 3",
    description: "Tiếng Nhật sơ cấp 3.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP2111",
    code: "JP2111",
    name: "Tiếng Nhật 4",
    description: "Tiếng Nhật trung cấp 1.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP2126",
    code: "JP2126",
    name: "Tiếng Nhật 5",
    description: "Tiếng Nhật trung cấp 2.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP2132",
    code: "JP2132",
    name: "Tiếng Nhật 6",
    description: "Tiếng Nhật trung cấp 3.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP2210",
    code: "JP2210",
    name: "Tiếng Nhật 7",
    description: "Tiếng Nhật cao cấp 1.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP2220",
    code: "JP2220",
    name: "Tiếng Nhật 8",
    description: "Tiếng Nhật cao cấp 2.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP3110",
    code: "JP3110",
    name: "Tiếng Nhật chuyên ngành 1",
    description: "Tiếng Nhật chuyên ngành CNTT (P1).",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_JP3120",
    code: "JP3120",
    name: "Tiếng Nhật chuyên ngành 2",
    description: "Tiếng Nhật chuyên ngành CNTT (P2).",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  // --- Ngoại ngữ (Tiếng Anh - for others) ---
  {
    id: "s_FL1101",
    code: "FL1101",
    name: "Tiếng Anh I",
    description: "Tiếng Anh cơ bản.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  }, // Use FL code for English
  {
    id: "s_FL1102",
    code: "FL1102",
    name: "Tiếng Anh II",
    description: "Tiếng Anh sơ trung cấp.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_FL2101",
    code: "FL2101",
    name: "Tiếng Anh III",
    description: "Tiếng Anh trung cấp.",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
  {
    id: "s_FL2102",
    code: "FL2102",
    name: "Tiếng Anh IV",
    description: "Tiếng Anh chuyên ngành (ví dụ).",
    category: "Ngoại ngữ",
    documents: [],
    reviews: [],
  },
];

const dummyPdfUrl = "/calculus.pdf";

// --- Dữ liệu Tài liệu (Documents) ---
// Update subjectId and potentially add more relevant documents
export const documents = [
  {
    id: "d1",
    name: "Đề cương Giải tích I",
    uploadedDate: "2024-09-01",
    category: "Đề cương",
    subjectId: "s_MI1114", // Changed ID
    stars: 4.5,
    pdfPageCount: 5,
    pdfUrl: "/calculus.pdf",
    reviews: [
      {
        id: "dr1",
        user: "SinhVienA",
        stars: 5,
        comment: "Đề cương rất rõ ràng.",
        date: "2024-09-05",
        like: 2,
      },
      {
        id: "dr2",
        user: "ToanCaoCap",
        stars: 4,
        comment: "Bao quát tốt các chủ đề.",
        date: "2024-09-06",
        like: 3,
      },
    ],
  },
  {
    id: "d2",
    name: "Slide Giải tích I - Chương 1",
    uploadedDate: "2024-09-10",
    category: "Bài giảng",
    subjectId: "s_MI1114", // Changed ID
    stars: 4.0,
    pdfPageCount: 30,
    pdfUrl: "/calculus.pdf",
    reviews: [
      {
        id: "dr3",
        user: "SV_Nam_Hai",
        stars: 4,
        comment: "Hình ảnh tốt, giúp hiểu giới hạn.",
        date: "2024-09-12",
        like: 5,
      },
    ],
  },
  {
    id: "d3",
    name: "Sách tham khảo AI (Russell & Norvig)",
    uploadedDate: "2024-09-15",
    category: "Sách tham khảo",
    subjectId: "s_IT3160", // Changed ID (Intro AI)
    stars: 5.0,
    pdfPageCount: 1150,
    pdfUrl: "/calculus.pdf", // Use dummy for now
    reviews: [
      {
        id: "dr4",
        user: "NghienCuuSinh",
        stars: 5,
        comment: "Sách gối đầu giường về AI.",
        date: "2024-10-01",
        like: 10,
      },
      {
        id: "dr5",
        user: "GiangVienX",
        stars: 5,
        comment: "Tài liệu tham khảo không thể thiếu.",
        date: "2024-11-05",
        like: 3,
      },
    ],
  },
  {
    id: "d4",
    name: "Bài tập Lập trình Python cơ bản",
    uploadedDate: "2024-09-05",
    category: "Bài tập",
    subjectId: "s_IT2000", // Changed ID
    stars: 4.2,
    pdfPageCount: 15,
    pdfUrl: "/calculus.pdf",
    reviews: [
      {
        id: "dr6",
        user: "CoderTapSu",
        stars: 4,
        comment: "Bài tập thực hành tốt.",
        date: "2024-09-10",
        like: 2,
      },
    ],
  },
  {
    id: "d5",
    name: "Đề thi giữa kỳ Nhập môn LT Python",
    uploadedDate: "2024-10-20",
    category: "Đề thi",
    subjectId: "s_IT2000", // Changed ID
    stars: 3.8,
    pdfPageCount: 8,
    pdfUrl: "/calculus.pdf",
    reviews: [
      {
        id: "dr7",
        user: "SV_LoLang",
        stars: 3,
        comment: "Câu hỏi hơi khó!",
        date: "2024-10-22",
        like: 0,
      },
      {
        id: "dr8",
        user: "SV_ChamChi",
        stars: 4,
        comment: "Đề công bằng, coi lại vòng lặp!",
        date: "2024-10-23",
        like: 1,
      },
    ],
  },
  {
    id: "d6",
    name: "Giáo trình Thí nghiệm Vật lý II",
    uploadedDate: "2024-09-03",
    category: "Sách tham khảo", // Changed category name slightly
    subjectId: "s_PH1120", // Changed ID
    stars: 4.0,
    pdfPageCount: 45,
    pdfUrl: "/calculus.pdf",
    reviews: [
      {
        id: "dr9",
        user: "NhaVatLy",
        stars: 4,
        comment: "Hướng dẫn thí nghiệm rõ ràng.",
        date: "2024-09-15",
        like: 5,
      },
    ],
  },
  {
    id: "d7",
    name: "Đề thi phương trình vi phân & chuỗi MI1134 hệ Việt Nhật",
    uploadedDate: "2025-06-02",
    category: "Bài tập",
    subjectId: "s_MI1134", // Changed ID (Assuming this is Elitech Calc III)
    stars: 4.8,
    pdfPageCount: 25,
    pdfUrl: "/dummy2.pdf",
    reviews: [
      {
        id: "dr10",
        user: "SV_Gioi",
        stars: 5,
        comment: "This is some real sht man!",
        date: "2025-06-02",
        like: 2,
      },
      {
        id: "dr11",
        user: "SV_Tot",
        stars: 4,
        comment: "Bài tập hay, nhưng rất hơi khó.",
        date: "2025-06-02",
        like: 3,
      },
      {
        id: "dr12",
        user: "SV_Tam",
        stars: 4,
        comment: "Bài tập rất hay, nhưng hơi khó.",
        date: "2025-06-02",
        like: 1,
      },
      {
        id: "dr13",
        user: "SV_Tam",
        stars: 4,
        comment: "Bài tập rất hay, nhưng khó.",
        date: "2025-06-02",
        like: 1,
      },
      {
        id: "dr14",
        user: "SV_Tam",
        stars: 4,
        comment: "Bài tập rất hay, nhưng rất khó.",
        date: "2025-06-02",
        like: 1,
      },
    ],
  },
  // --- Add more mock documents for other subjects as needed ---
  {
    id: "d8",
    name: "Slide Cơ học tĩnh",
    uploadedDate: "2024-10-01",
    category: "Bài giảng",
    subjectId: "s_ME3020",
    stars: 4.1,
    pdfPageCount: 40,
    pdfUrl: "/calculus.pdf",
    reviews: [],
  },
  {
    id: "d9",
    name: "Bài tập Thiết kế dạy học",
    uploadedDate: "2024-10-05",
    category: "Bài tập",
    subjectId: "s_ED3010",
    stars: 4.3,
    pdfPageCount: 20,
    pdfUrl: "/calculus.pdf",
    reviews: [],
  },
  {
    id: "d10",
    name: "Đề cương Học máy",
    uploadedDate: "2024-10-10",
    category: "Đề cương",
    subjectId: "s_IT3190",
    stars: 4.7,
    pdfPageCount: 8,
    pdfUrl: "/calculus.pdf",
    reviews: [],
  },
  {
    id: "d11",
    name: "Bài giảng Nhập môn CNTT - Tuần 1",
    category: "Bài giảng",
    subjectId: "s_IT2110",
    stars: 4.0,
    pdfPageCount: 25,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d12",
    name: "Tổng quan Lịch sử Máy tính",
    category: "Sách tham khảo",
    subjectId: "s_IT2110",
    stars: 4.5,
    pdfPageCount: 150,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT2120 (Kiến thức máy tính)
  {
    id: "d13",
    name: "Slide Phần cứng Máy tính",
    category: "Bài giảng",
    subjectId: "s_IT2120",
    stars: 4.2,
    pdfPageCount: 55,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d14",
    name: "Bài tập Hệ điều hành Cơ bản",
    category: "Bài tập",
    subjectId: "s_IT2120",
    stars: 3.8,
    pdfPageCount: 5,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d15",
    name: "Câu hỏi ôn tập Kiến thức máy tính",
    category: "Bài tập",
    subjectId: "s_IT2120",
    stars: 4.0,
    pdfPageCount: 8,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3420 (Điện tử cho CNTT)
  {
    id: "d16",
    name: "Bài giảng Mạch số",
    category: "Bài giảng",
    subjectId: "s_IT3420",
    stars: 4.3,
    pdfPageCount: 60,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d17",
    name: "Bài tập Thiết kế mạch logic",
    category: "Bài tập",
    subjectId: "s_IT3420",
    stars: 4.1,
    pdfPageCount: 12,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT2030 (Technical Writing and Presentation)
  {
    id: "d18",
    name: "Slide Kỹ năng Thuyết trình",
    category: "Bài giảng",
    subjectId: "s_IT2030",
    stars: 4.6,
    pdfPageCount: 30,
    pdfUrl: dummyPdfUrl,
    reviews: [
      {
        id: "dr15",
        user: "Speaker",
        stars: 5,
        comment: "Rất hữu ích cho thuyết trình!",
        date: "2025-01-05",
        like: 4,
      },
    ],
  },
  {
    id: "d19",
    name: "Hướng dẫn viết Báo cáo Kỹ thuật",
    category: "Sách tham khảo",
    subjectId: "s_IT2030",
    stars: 4.4,
    pdfPageCount: 80,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3011 (Cấu trúc dữ liệu và thuật toán)
  {
    id: "d20",
    name: "Slide CTDL&TT - Chương 2: Danh sách liên kết",
    category: "Bài giảng",
    subjectId: "s_IT3011",
    stars: 4.7,
    pdfPageCount: 50,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d21",
    name: "Bài tập CTDL&TT - Cây nhị phân",
    category: "Bài tập",
    subjectId: "s_IT3011",
    stars: 4.3,
    pdfPageCount: 15,
    pdfUrl: dummyPdfUrl,
    reviews: [
      {
        id: "dr16",
        user: "AlgoMaster",
        stars: 4,
        comment: "Bài tập hay về cây.",
        date: "2025-02-10",
        like: 8,
      },
    ],
  },
  {
    id: "d22",
    name: "Đề thi cuối kỳ CTDL&TT - 20232",
    category: "Đề thi",
    subjectId: "s_IT3011",
    stars: 4.0,
    pdfPageCount: 5,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d23",
    name: 'Sách "Introduction to Algorithms" (CLRS) - Extract',
    category: "Sách tham khảo",
    subjectId: "s_IT3011",
    stars: 5.0,
    pdfPageCount: 300,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3070 (Nguyên lý hệ điều hành)
  {
    id: "d24",
    name: "Bài giảng Nguyên lý HĐH - Quản lý tiến trình",
    category: "Bài giảng",
    subjectId: "s_IT3070",
    stars: 4.5,
    pdfPageCount: 65,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d25",
    name: "Bài tập Lập lịch CPU",
    category: "Bài tập",
    subjectId: "s_IT3070",
    stars: 4.1,
    pdfPageCount: 8,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d26",
    name: "Sách Operating System Concepts (Silberschatz)",
    category: "Sách tham khảo",
    subjectId: "s_IT3070",
    stars: 4.8,
    pdfPageCount: 900,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3080 (Mạng máy tính)
  {
    id: "d27",
    name: "Slide Mạng máy tính - Tầng ứng dụng",
    category: "Bài giảng",
    subjectId: "s_IT3080",
    stars: 4.6,
    pdfPageCount: 70,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d28",
    name: "Bài tập Chia địa chỉ IP (Subnetting)",
    category: "Bài tập",
    subjectId: "s_IT3080",
    stars: 4.0,
    pdfPageCount: 10,
    pdfUrl: dummyPdfUrl,
    reviews: [
      {
        id: "dr17",
        user: "NetworkGuy",
        stars: 4,
        comment: "Cần luyện nhiều bài này.",
        date: "2025-03-01",
        like: 6,
      },
    ],
  },
  {
    id: "d29",
    name: "Đề thi cuối kỳ Mạng máy tính - 20241",
    category: "Đề thi",
    subjectId: "s_IT3080",
    stars: 4.2,
    pdfPageCount: 6,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3103 (Lập trình hướng đối tượng)
  {
    id: "d30",
    name: "Bài giảng OOP - Tính kế thừa & Đa hình",
    category: "Bài giảng",
    subjectId: "s_IT3103",
    stars: 4.7,
    pdfPageCount: 55,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d31",
    name: "Bài tập Design Patterns cơ bản",
    category: "Bài tập",
    subjectId: "s_IT3103",
    stars: 4.4,
    pdfPageCount: 20,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3160 (Nhập môn Trí tuệ nhân tạo) - Already has d3
  {
    id: "d32",
    name: "Slide Nhập môn AI - Thuật toán tìm kiếm",
    category: "Bài giảng",
    subjectId: "s_IT3160",
    stars: 4.3,
    pdfPageCount: 60,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d33",
    name: "Bài tập Logic Vị từ",
    category: "Bài tập",
    subjectId: "s_IT3160",
    stars: 4.0,
    pdfPageCount: 7,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3283 (Kiến trúc máy tính)
  {
    id: "d34",
    name: "Bài giảng Kiến trúc MIPS",
    category: "Bài giảng",
    subjectId: "s_IT3283",
    stars: 4.5,
    pdfPageCount: 75,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d35",
    name: "Sách Computer Organization and Design (Patterson & Hennessy)",
    category: "Sách tham khảo",
    subjectId: "s_IT3283",
    stars: 4.9,
    pdfPageCount: 850,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },

  // s_IT3292 (Cơ sở dữ liệu)
  {
    id: "d36",
    name: "Slide CSDL - Mô hình Quan hệ & Đại số quan hệ",
    category: "Bài giảng",
    subjectId: "s_IT3292",
    stars: 4.6,
    pdfPageCount: 65,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
  {
    id: "d37",
    name: "Bài tập SQL cơ bản",
    category: "Bài tập",
    subjectId: "s_IT3292",
    stars: 4.2,
    pdfPageCount: 15,
    pdfUrl: dummyPdfUrl,
    reviews: [
      {
        id: "dr18",
        user: "DBAdmin",
        stars: 5,
        comment: "SQL is fun!",
        date: "2025-04-01",
        like: 7,
      },
    ],
  },
  {
    id: "d38",
    name: "Đề thi cuối kỳ CSDL - 20232",
    category: "Đề thi",
    subjectId: "s_IT3292",
    stars: 4.1,
    pdfPageCount: 5,
    pdfUrl: dummyPdfUrl,
    reviews: [],
  },
];

// --- Các hàm tìm kiếm/lấy dữ liệu giữ nguyên ---
export const findData = (query) => {
  // Normalize the search query ONCE
  const normalizedQuery = removeDiacritics(query);

  // Filter each type using the normalized query and normalized data fields
  const foundDocs = documents.filter((doc) =>
    removeDiacritics(doc.name).includes(normalizedQuery)
  );
  const foundSubjects = subjects.filter(
    (sub) =>
      removeDiacritics(sub.name).includes(normalizedQuery) ||
      removeDiacritics(sub.code).includes(normalizedQuery) // Also normalize code for searching
  );
  const foundMajors = majors.filter(
    (maj) =>
      removeDiacritics(maj.name).includes(normalizedQuery) ||
      removeDiacritics(maj.code).includes(normalizedQuery) // Also normalize code
  );

  // Map to add type information (remains the same)
  const typedDocs = foundDocs.map((doc) => ({
    ...doc,
    resultType: "document",
  }));
  const typedSubjects = foundSubjects.map((sub) => ({
    ...sub,
    resultType: "subject",
  }));
  const typedMajors = foundMajors.map((maj) => ({
    ...maj,
    resultType: "major",
  }));

  // Combine into a single array (remains the same)
  const combinedResults = [...typedDocs, ...typedSubjects, ...typedMajors];

  return combinedResults;
};

export const getMajorById = (id) => majors.find((m) => m.id === id);
export const getSubjectById = (id) => subjects.find((s) => s.id === id);
export const getDocumentById = (id) => documents.find((d) => d.id === id);
export const getSubjectsByIds = (ids) =>
  subjects.filter((s) => ids.includes(s.id));
export const getDocumentsByIds = (ids) =>
  documents.filter((d) => ids.includes(d.id));

// --- Danh sách các loại tài liệu (đã dịch) ---
export const documentCategories = [
  "Đề cương",
  "Bài giảng",
  "Sách tham khảo",
  "Bài tập",
  "Đề thi",
];

// --- Danh sách các loại môn học (đã dịch) ---
export const subjectCategories = [
  "Đại cương",
  "Cơ sở ngành",
  "Chuyên ngành",
  "Ngoại ngữ",
  "Thể chất",
  "Quốc phòng",
  "Môn bổ trợ",
  "Thực tập",
  "Đồ án",
];
