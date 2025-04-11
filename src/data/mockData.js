// src/data/mockData.js

// --- majors and subjects remain the same ---
export const majors = [
  { id: 'm1', code: 'IT-E6', name: 'Vietnamese-Japanese IT', description: 'A collaborative IT program focusing on skills relevant to the Japanese market.', subjects: ['s1', 's2', 's4'] },
  { id: 'm2', code: 'ME-E1', name: 'Mechanical Engineering', description: 'Core mechanical engineering principles and practices.', subjects: ['s1', 's3', 's5'] },
  { id: 'm3', code: 'GEN-ED', name: 'General Education', description: 'Foundational courses for all students.', subjects: ['s1', 's6'] },
];

export const subjects = [
  { id: 's1', code: 'MI1131', name: 'Calculus III (Common)', description: 'Multivariable calculus.', category: 'General Education', documents: ['d1', 'd2'], reviews: [{id: 'r1', user: 'StudentA', comment: 'Tough but essential.', date: '2024-10-01'}] },
  { id: 's2', code: 'IT3080', name: 'Artificial Intelligence', description: 'Introduction to AI concepts.', category: 'Major Subject', documents: ['d3'], reviews: [{id: 'r3', user: 'AI_Enjoyer', comment: 'Fascinating subject!', date: '2025-01-10'}] },
  { id: 's3', code: 'ME3010', name: 'Thermodynamics', description: 'Heat, work, and energy transfer.', category: 'Major Subject', documents: [], reviews: [] },
  { id: 's4', code: 'IT2000', name: 'Introduction to Programming', description: 'Fundamentals of programming using Python.', category: 'Major Subject', documents: ['d4', 'd5'], reviews: [{id: 'r2', user: 'StudentB', comment: 'Great starting point!', date: '2024-09-15'}] },
  { id: 's5', code: 'PH1120', name: 'Physics II', description: 'Electricity and Magnetism.', category: 'Supportive', documents: ['d6'], reviews: [] },
  { id: 's6', code: 'FL1001', name: 'Basic English', description: 'Fundamental English skills.', category: 'Language Subject', documents: [], reviews: [] },
  { id: 's7', code: 'MI1134', name: 'Calculus III (Elitech)', description: 'Advanced multivariable calculus for Elitech programs.', category: 'General Education', documents: ['d7'], reviews: [] },
];

// --- Updated documents array ---
const dummyPdfUrl = '/calculus.pdf'; // Sample PDF

export const documents = [
  {
      id: 'd1',
      name: 'Calculus III Syllabus',
      uploadedDate: '2024-09-01',
      category: 'Curriculum',
      subjectId: 's1',
      stars: 4.5,
      pdfPageCount: 5, // Keep page count for logic if needed
      pdfUrl: dummyPdfUrl, // Add PDF URL
      reviews: [ // Add reviews
          {id:'dr1', user: 'StudentC', stars: 5, comment: 'Very clear syllabus.', date: '2024-09-05'},
          {id:'dr2', user: 'MathWhiz', stars: 4, comment: 'Covers all topics well.', date: '2024-09-06'}
      ]
  },
  {
      id: 'd2',
      name: 'Calculus III Chapter 1 Slides',
      uploadedDate: '2024-09-10',
      category: 'Slide',
      subjectId: 's1',
      stars: 4.0,
      pdfPageCount: 30,
      pdfUrl: dummyPdfUrl,
      reviews: [
          {id:'dr3', user: 'VisualLearner', stars: 4, comment: 'Good visuals, helped understand vectors.', date: '2024-09-12'},
      ]
  },
  {
      id: 'd3',
      name: 'AI Textbook Reference',
      uploadedDate: '2024-09-15',
      category: 'Reference Book',
      subjectId: 's2',
      stars: 5.0,
      pdfPageCount: 500, // Example large page count
      pdfUrl: dummyPdfUrl,
      reviews: [
           {id:'dr4', user: 'Bookworm', stars: 5, comment: 'The definitive guide for AI.', date: '2024-10-01'},
           {id:'dr5', user: 'Researcher', stars: 5, comment: 'Essential reference material.', date: '2024-11-05'}
      ]
  },
  {
      id: 'd4',
      name: 'Python Basics Exercises',
      uploadedDate: '2024-09-05',
      category: 'Exercise',
      subjectId: 's4',
      stars: 4.2,
      pdfPageCount: 15,
      pdfUrl: dummyPdfUrl,
      reviews: [
          {id:'dr6', user: 'CodeNewbie', stars: 4, comment: 'Good practice problems.', date: '2024-09-10'},
      ]
  },
  {
      id: 'd5',
      name: 'Intro Programming Midterm Test',
      uploadedDate: '2024-10-20',
      category: 'Test',
      subjectId: 's4',
      stars: 3.8,
      pdfPageCount: 8,
      pdfUrl: dummyPdfUrl,
      reviews: [
          {id:'dr7', user: 'AnxiousStudent', stars: 3, comment: 'Tricky questions!', date: '2024-10-22'},
          {id:'dr8', user: 'StudentB', stars: 4, comment: 'Fair test, check your loops!', date: '2024-10-23'}
      ]
  },
  {
      id: 'd6',
      name: 'Physics II Lab Manual',
      uploadedDate: '2024-09-03',
      category: 'Reference Book',
      subjectId: 's5',
      stars: 4.0,
      pdfPageCount: 45,
      pdfUrl: dummyPdfUrl,
      reviews: [
           {id:'dr9', user: 'LabRat', stars: 4, comment: 'Clear instructions for experiments.', date: '2024-09-15'},
      ]
  },
  {
      id: 'd7',
      name: 'Elitech Calc III Advanced Problems',
      uploadedDate: '2024-09-12',
      category: 'Exercise',
      subjectId: 's7',
      stars: 4.8,
      pdfPageCount: 25, // Example page count > 20
      pdfUrl: dummyPdfUrl,
      reviews: [
           {id:'dr10', user: 'ChallengeSeeker', stars: 5, comment: 'Really makes you think!', date: '2024-09-20'},
      ]
  },
];

// --- findData, getMajorById, etc. remain the same ---
export const findData = (query) => {
  const lowerQuery = query.toLowerCase();
  const foundDocs = documents.filter(doc => doc.name.toLowerCase().includes(lowerQuery));
  const foundSubjects = subjects.filter(sub => sub.name.toLowerCase().includes(lowerQuery) || sub.code.toLowerCase().includes(lowerQuery));
  const foundMajors = majors.filter(maj => maj.name.toLowerCase().includes(lowerQuery) || maj.code.toLowerCase().includes(lowerQuery));
  return { documents: foundDocs, subjects: foundSubjects, majors: foundMajors };
};

export const getMajorById = (id) => majors.find(m => m.id === id);
export const getSubjectById = (id) => subjects.find(s => s.id === id);
export const getDocumentById = (id) => documents.find(d => d.id === id);
export const getSubjectsByIds = (ids) => subjects.filter(s => ids.includes(s.id));
export const getDocumentsByIds = (ids) => documents.filter(d => ids.includes(d.id));