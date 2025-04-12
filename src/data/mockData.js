// src/data/mockData.js

// --- Dữ liệu Ngành học ---
export const majors = [
    {
      id: 'm1',
      code: 'IT-E6',
      name: 'Vietnamese-Japanese IT',
      description: 'Chương trình CNTT hợp tác tập trung vào kỹ năng phù hợp thị trường Nhật Bản.', // Translated
      subjects: ['s1', 's2', 's4']
    },
    {
      id: 'm2',
      code: 'ME-E1',
      name: 'Mechanical Engineering',
      description: 'Các nguyên lý và thực hành cốt lõi của ngành Kỹ thuật Cơ khí.', // Translated
      subjects: ['s1', 's3', 's5']
    },
    {
      id: 'm3',
      code: 'ED2',
      name: 'Education Technique',
      description: 'Ngành Công nghệ Giáo dục đào tạo nguồn nhân lực chất lượng cao có năng lực về công nghệ thông tin chuyên cho lĩnh vực giáo dục và truyền thông, thích ứng với thách thức và cơ hội mà cuộc Cách mạng công nghiệp lần thứ tư mang đến cho giáo dục hiện đại.', // Translated
      subjects: ['s1', 's6']
    },
  ];
  
  // --- Dữ liệu Môn học ---
  export const subjects = [
    {
      id: 's1',
      code: 'MI1131',
      name: 'Calculus III (Common)',
      description: 'Giải tích hàm nhiều biến.', // Translated
      category: 'Đại cương', // Translated
      documents: ['d1', 'd2'],
      reviews: [{id: 'r1', user: 'StudentA', comment: 'Khó nhưng cần thiết.', date: '2024-10-01'}] // Translated comment
    },
    {
      id: 's2',
      code: 'IT3080',
      name: 'Artificial Intelligence',
      description: 'Giới thiệu về các khái niệm Trí tuệ nhân tạo.', // Translated
      category: 'Chuyên ngành', // Translated
      documents: ['d3'],
      reviews: [{id: 'r3', user: 'AI_Enjoyer', comment: 'Môn học thú vị!', date: '2025-01-10'}] // Translated comment
     },
    {
      id: 's3',
      code: 'ME3010',
      name: 'Thermodynamics',
      description: 'Truyền nhiệt, công và năng lượng.', // Translated
      category: 'Chuyên ngành', // Translated
      documents: [],
      reviews: []
    },
    {
      id: 's4',
      code: 'IT2000',
      name: 'Introduction to Programming',
      description: 'Nguyên lý cơ bản về lập trình sử dụng Python.', // Translated
      category: 'Chuyên ngành', // Translated
      documents: ['d4', 'd5'],
      reviews: [{id: 'r2', user: 'StudentB', comment: 'Khởi đầu tuyệt vời!', date: '2024-09-15'}] // Translated comment
     },
    {
      id: 's5',
      code: 'PH1120',
      name: 'Physics II',
      description: 'Điện và Từ.', // Translated
      category: 'Môn bổ trợ', // Translated
      documents: ['d6'],
      reviews: []
    },
    {
      id: 's6',
      code: 'FL1001',
      name: 'Basic English',
      description: 'Kỹ năng tiếng Anh cơ bản.', // Translated
      category: 'Ngoại ngữ', // Translated
      documents: [],
      reviews: []
    },
    {
      id: 's7',
      code: 'MI1134',
      name: 'Calculus III (Elitech)',
      description: 'Giải tích hàm nhiều biến nâng cao cho chương trình Elitech.', // Translated
      category: 'Đại cương', // Translated
      documents: ['d7'],
      reviews: []
    },
  ];
  
  // --- Dữ liệu Tài liệu ---
  // const dummyPdfUrl = '/dummy.pdf'; // Assuming local PDF from previous step
  const dummyPdfUrl = '/calculus.pdf'; // Using the one from your input
  
  export const documents = [
    {
        id: 'd1',
        name: 'Calculus III Syllabus',
        uploadedDate: '2024-09-01',
        category: 'Đề cương', // Translated
        subjectId: 's1',
        stars: 4.5,
        pdfPageCount: 5,
        pdfUrl: dummyPdfUrl,
        reviews: [
            {id:'dr1', user: 'StudentC', stars: 5, comment: 'Đề cương rất rõ ràng.', date: '2024-09-05'}, // Translated
            {id:'dr2', user: 'MathWhiz', stars: 4, comment: 'Bao quát tốt các chủ đề.', date: '2024-09-06'} // Translated
        ]
    },
    {
        id: 'd2',
        name: 'Calculus III Chapter 1 Slides',
        uploadedDate: '2024-09-10',
        category: 'Bài giảng', // Translated
        subjectId: 's1',
        stars: 4.0,
        pdfPageCount: 30,
        pdfUrl: dummyPdfUrl,
        reviews: [
            {id:'dr3', user: 'VisualLearner', stars: 4, comment: 'Hình ảnh tốt, giúp hiểu về vector.', date: '2024-09-12'}, // Translated
        ]
    },
    {
        id: 'd3',
        name: 'AI Textbook Reference',
        uploadedDate: '2024-09-15',
        category: 'Sách tham khảo', // Translated
        subjectId: 's2',
        stars: 5.0,
        pdfPageCount: 500,
        pdfUrl: dummyPdfUrl,
        reviews: [
             {id:'dr4', user: 'Bookworm', stars: 5, comment: 'Tài liệu chuẩn mực về AI.', date: '2024-10-01'}, // Translated
             {id:'dr5', user: 'Researcher', stars: 5, comment: 'Tài liệu tham khảo cần thiết.', date: '2024-11-05'} // Translated
        ]
    },
    {
        id: 'd4',
        name: 'Python Basics Exercises',
        uploadedDate: '2024-09-05',
        category: 'Bài tập', // Translated
        subjectId: 's4',
        stars: 4.2,
        pdfPageCount: 15,
        pdfUrl: dummyPdfUrl,
        reviews: [
            {id:'dr6', user: 'CodeNewbie', stars: 4, comment: 'Bài tập thực hành tốt.', date: '2024-09-10'}, // Translated
        ]
    },
    {
        id: 'd5',
        name: 'Intro Programming Midterm Test',
        uploadedDate: '2024-10-20',
        category: 'Đề thi', // Translated
        subjectId: 's4',
        stars: 3.8,
        pdfPageCount: 8,
        pdfUrl: dummyPdfUrl,
        reviews: [
            {id:'dr7', user: 'AnxiousStudent', stars: 3, comment: 'Câu hỏi lắt léo!', date: '2024-10-22'}, // Translated
            {id:'dr8', user: 'StudentB', stars: 4, comment: 'Đề công bằng, kiểm tra lại vòng lặp nhé!', date: '2024-10-23'} // Translated
        ]
    },
    {
        id: 'd6',
        name: 'Physics II Lab Manual',
        uploadedDate: '2024-09-03',
        category: 'Sách tham khảo', // Translated
        subjectId: 's5',
        stars: 4.0,
        pdfPageCount: 45,
        pdfUrl: dummyPdfUrl,
        reviews: [
             {id:'dr9', user: 'LabRat', stars: 4, comment: 'Hướng dẫn thí nghiệm rõ ràng.', date: '2024-09-15'}, // Translated
        ]
    },
    {
        id: 'd7',
        name: 'Elitech Calc III Advanced Problems',
        uploadedDate: '2024-09-12',
        category: 'Bài tập', // Translated
        subjectId: 's7',
        stars: 4.8,
        pdfPageCount: 25,
        pdfUrl: dummyPdfUrl,
        reviews: [
             {id:'dr10', user: 'ChallengeSeeker', stars: 5, comment: 'Thực sự đáng suy ngẫm!', date: '2024-09-20'}, // Translated
        ]
    },
  ];
  
  
  // --- Các hàm tìm kiếm/lấy dữ liệu giữ nguyên ---
  export const findData = (query) => {
      const lowerQuery = query.toLowerCase();
      const foundDocs = documents.filter(doc => doc.name.toLowerCase().includes(lowerQuery));
      const foundSubjects = subjects.filter(sub => sub.name.toLowerCase().includes(lowerQuery) || sub.code.toLowerCase().includes(lowerQuery));
      const foundMajors = majors.filter(maj => maj.name.toLowerCase().includes(lowerQuery) || maj.code.toLowerCase().includes(lowerQuery));
      const typedDocs = foundDocs.map(doc => ({ ...doc, resultType: 'document' }));
      const typedSubjects = foundSubjects.map(sub => ({ ...sub, resultType: 'subject' }));
      const typedMajors = foundMajors.map(maj => ({ ...maj, resultType: 'major' }));
      const combinedResults = [...typedDocs, ...typedSubjects, ...typedMajors];
      return combinedResults;
  };
  
  export const getMajorById = (id) => majors.find(m => m.id === id);
  export const getSubjectById = (id) => subjects.find(s => s.id === id);
  export const getDocumentById = (id) => documents.find(d => d.id === id);
  export const getSubjectsByIds = (ids) => subjects.filter(s => ids.includes(s.id));
  export const getDocumentsByIds = (ids) => documents.filter(d => ids.includes(d.id));
  
  // --- Thêm danh sách các loại tài liệu để dùng trong form Upload ---
  export const documentCategories = ['Đề cương', 'Bài giảng', 'Sách tham khảo', 'Bài tập', 'Đề thi'];