const connectedCollectionData = [
  {
    modalName: "Board",
    fieldCollection: [
      {
        idField: "boardId",
        field: "name",
        childField: "boardName",
        connectedCollections: ["Branch"],
      },
    ],
  },
  {
    modalName: "LMSCourse",
    fieldCollection: [
      {
        idField: "courseId",
        field: "name",
        childField: "courseName",
        connectedCollections: [
          "LMSSubject",
          "LMSChapter",
          "LMSTopic",
          "LMSSubTopic",
          "BatchCourse",
          "BranchCourse",
          "InstituteCourse",
          "Material",
          "PublishMaterial",
          "Assignment",
          "AssignBatch",
        ],
      },
      {
        idField: "courseDetails.id",
        field: "name",
        childField: "courseDetails.name",
        connectedCollections: ["Quiz", "SubmitQuiz"],
      },
    ],
  },
  {
    modalName: "CourseV2",
    fieldCollection: [
      {
        idField: "course_id",
        field: "name",
        childField: "course_name",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        idField: "courseDetails.id",
        field: "name",
        childField: "courseDetails.name",
        connectedCollections: ["SubmitPracticeTest"],
      },
      {
        idField: "courseDetails.courseId",
        field: "name",
        childField: "courseDetails.courseName",
        connectedCollections: ["SubmitTest"],
      },
      {
        idField: "course_details.course_id",
        field: "name",
        childField: "course_details.course_name",
        connectedCollections: ["SuperAdminTestTemplate"],
      },
    ],
  },
  {
    modalName: "LMSSubject",
    fieldCollection: [
      {
        idField: "subjectId",
        field: "name",
        childField: "subjectName",
        connectedCollections: [
          "LMSChapter",
          "LMSTopic",
          "LMSSubTopic",

          "Material",
          "PublishMaterial",
          "Assignment",
        ],
      },
      {
        idField: "subjects.subjectId",
        field: "name",
        childField: "subjects.$.subjectName",
        connectedCollections: ["AssignBatch", "BatchCourse", "LMSCourse"],
      },
      {
        idField: "subjectDetails.subjectId",
        field: "name",
        childField: "subjectDetails.subjectName",
        connectedCollections: ["Quiz", "SubmitQuiz"],
      },
      {
        idField: "subjects.subjectId",
        field: "isLab",
        childField: "isLab",
        connectedCollections: ["LMSCourse"],
      },
      {
        idField: "subjects.subjectId",
        field: "icon",
        childField: "subjectIcon",
        connectedCollections: ["LMSCourse"],
      },
    ],
  },
  {
    modalName: "SubjectV2",
    fieldCollection: [
      {
        idField: "subjects_details.subject_id",
        field: "name",
        childField: "subjects_details.$.subject_name",
        connectedCollections: ["SuperAdminTestTemplate"],
      },
      {
        idField: "testDetails.subjectDetails.subjectId",
        field: "name",
        childField: "testDetails.subjectDetails.$.subjectName",
        connectedCollections: ["SubmitTest"],
      },
      {
        idField: "highestMarkSubjectDetails.subjectId",
        field: "name",
        childField: "highestMarkSubjectDetails.subjectName",
        connectedCollections: ["SubmitTest"],
      },
      {
        idField: "subjects.subjectId",
        field: "name",
        childField: "subjects.$.subjectName",
        connectedCollections: ["PracticeTest"],
      },
      {
        idField: "test_details.subjects_details.subject_id",
        field: "name",
        childField: "test_details.subjects_details.$.subject_name",
        connectedCollections: ["InstituteTestV2"],
      },
    ],
  },
  {
    modalName: "UnitV2",
    fieldCollection: [
      {
        idField: "subjects.unitId",
        field: "name",
        childField: "subjects.$.unitName",
        connectedCollections: ["PracticeTest"],
      },
    ],
  },
  {
    modalName: "LMSChapter",
    fieldCollection: [
      {
        idField: "chapterId",
        field: "name",
        childField: "chapterName",
        connectedCollections: [
          "LMSTopic",
          "LMSSubTopic",
          "Material",
          "PublishMaterial",
        ],
      },
      {
        idField: "subjectDetails.chapterId",
        field: "name",
        childField: "subjectDetails.chapterName",
        connectedCollections: ["Quiz", "SubmitQuiz"],
      },
    ],
  },
  {
    modalName: "ChapterV2",
    fieldCollection: [
      {
        idField: "subjects.chapterId",
        field: "name",
        childField: "subjects.$.chapterName",
        connectedCollections: ["PracticeTest"],
      },
    ],
  },
  {
    modalName: "LMSTopic",
    fieldCollection: [
      {
        idField: "topicId",
        field: "name",
        childField: "topicName",
        connectedCollections: ["LMSSubTopic", "Material", "PublishMaterial"],
      },
      {
        idField: "subjectDetails.topicId",
        field: "name",
        childField: "subjectDetails.topicName",
        connectedCollections: ["Quiz", "SubmitQuiz"],
      },
    ],
  },
  {
    modalName: "TopicV2",
    fieldCollection: [
      {
        idField: "subjects.topics.topicId",
        field: "name",
        childField: "subjects.$[subject].topics.$.topicName",
        connectedCollections: ["PracticeTest"],
      },
    ],
  },

  {
    modalName: "LMSSubTopic",
    fieldCollection: [
      {
        idField: "subTopicId",
        field: "name",
        childField: "subTopicName",
        connectedCollections: ["Material"],
      },
    ],
  },
  {
    modalName: "Institute",
    fieldCollection: [
      {
        idField: "instituteId",
        field: "name",
        childField: "instituteName",
        connectedCollections: [
          "Batch",
          "BatchCourse",
          "Branch",
          "BranchCourse",
          "BulkUploadFile",
          "InstituteCourse",
          "User",
        ],
      },
      {
        idField: "institute_details.institute_id",
        field: "name",
        childField: "institute_details.institute_name",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        idField: "branch_details.institute_id",
        field: "name",
        childField: "branch_details.$.institute_name",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        idField: "batch_details.institute_id",
        field: "name",
        childField: "batch_details.$.institute_name",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        field: "name",
        childField:
          "test_details.subjects_details.$[subject].teacher_details.institute_name",
        arrayFilterField: "subject.teacher_details.institute_id",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        idField: "instituteDetails.id",
        field: "name",
        childField: "instituteDetails.name",
        connectedCollections: ["Quiz", "SubmitPracticeTest", "SubmitQuiz"],
      },
    ],
  },
  {
    modalName: "Branch",
    fieldCollection: [
      {
        idField: "branchId",
        field: "name",
        childField: "branchName",
        connectedCollections: [
          "Batch",
          "BatchCourse",
          "BranchCourse",
          "BulkUploadFile",
          "User",
        ],
      },
      {
        idField: "branch_details.branch_id",
        field: "name",
        childField: "branch_details.$.branch_name",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        idField: "batch_details.branch_id",
        field: "name",
        childField: "batch_details.$.branch_name",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        field: "name",
        childField:
          "test_details.subjects_details.$[subject].teacher_details.branch_name",
        arrayFilterField: "subject.teacher_details.branch_id",
        connectedCollections: ["InstituteTestV2"],
      },
      {
        idField: "branchDetails.id",
        field: "name",
        childField: "branchDetails.name",
        connectedCollections: ["Quiz", "SubmitPracticeTest", "SubmitQuiz"],
      },
    ],
  },
  {
    modalName: "Batch",
    fieldCollection: [
      {
        idField: "batchId",
        field: "name",
        childField: "batchName",
        connectedCollections: [
          "BatchCourse",
          "BulkUploadFile",
          "User",
          "AssignBatch",
          "SubmitTest",
        ],
      },
      {
        idField: "batches.batchId",
        field: "name",
        childField: "batches.$.batchName",
        connectedCollections: ["Assignment", "PublishMaterial"],
      },
      {
        idField: "batchDetails.id",
        field: "name",
        childField: "batchDetails.$.name",
        connectedCollections: ["Quiz"],
      },
      {
        idField: "batchDetails.id",
        field: "name",
        childField: "batchDetails.name",
        connectedCollections: ["SubmitPracticeTest", "SubmitQuiz"],
      },
      {
        idField: "batch_details.batch_id",
        field: "name",
        childField: "batch_details.$.batch_name",
        connectedCollections: ["InstituteTestV2"],
      },
    ],
  },
  {
    modalName: "Assignment",
    idField: "assignmentId",
    fieldCollection: [
      {
        field: "name",
        childField: "assignmentName",
        connectedCollections: ["AssignmentSubmission"],
      },
    ],
  },
  {
    modalName: "User",
    fieldCollection: [
      {
        idField: "teacherId",
        field: "name",
        childField: "teacherName",
        connectedCollections: ["AssignBatch"],
      },
      {
        field: "name",
        childField:
          "test_details.subjects_details.$[subject].teacher_details.teacher_name",
        arrayFilterField: "subject.teacher_details.teacher_id",

        connectedCollections: ["InstituteTestV2"],
      },
    ],
  },
];
const TASK_TYPES = {
  QUIZ: "quiz",
  QUESTION_CORNER: "questionCorner",
};
const BULK_UPLOAD_TYPES = {
  QUIZ: "quizQuestions",
  QUESTION_CORNER: "questionCornerQuestions",
  QUESTION: "questions",
  USER: "users",
  MATERIAL: "materials",
  CHAPTER: "chapters",
  TOPIC: "topics",
  SUB_TOPIC: "subTopics",
  QR_CODE: "qrCodes",
};
const QUESTION_TYPES = {
  MCQ: "mcq",
  MULTIPLE_MCQ: "multiple_mcq",
  MULTIPLE_MCQ_ANY: "multiple_mcq_any",
  ASSERTION: "assertion",
  VSA: "vsa", // very short answer ( descriptive )
  SA: "sa", // short answer ( descriptive )
  LA: "la", // long answer ( descriptive )
  HOTS: "hots",
  DESCRIPTIVE: "descriptive",
  NUMBER: "number",
  MATRIX: "matrix",
  TRUE_FALSE: "tf",
  NUMBER_RANGE: "number-range",
  FILL_IN_BLANK: "fill-blank",
  PASSAGE: "passage",
  CASE: "case",
};
const MATERIAL_TYPES = {
  TEACHING: "teaching",
  STUDY: "study",
  MIND_MAP: "mindMap"
};
const MATERIAL_LEVELS = {
  SUBJECT: "subject",
  CHAPTER: "chapter",
  TOPIC: "topic",
  SUB_TOPIC: "subTopic",
};
const MATERIAL_FILE_TYPES = {
  VIDEO: "video",
  PPTX: "pptx",
  PDF: "pdf",
};

const QUIZ_TYPES = {
  TEST: "test",
  ASSIGNMENT: "assignment",
};
const SUBMIT_TEST_STATUS = {
  IN_PROGRESS: "inProgress",
  COMPLETED: "completed",
};
const COUNTRY_CODE = "91";
const MSG91_URL = "https://control.msg91.com/api/v5/otp";

const GAME_TYPES = {
  FILL_BLANKS: "fillInTheBlanks",
  MCQ: "mcq",
  DRAG_DROP: "dragAndDrop",
  MATCH_FOLLOWING: "matchTheFollowing",
  TRUE_FALSE: "trueFalse",
  JUMBLE_WORD: "jumbleWord",
  LISTEN_FILL: "listenAndFill",
  SEARCH_WORD: "searchWord",
  PUZZLE: "puzzle",
};

const ASSIGNMENT_TYPES = {
  PROJECT: "project",
  ASSIGNMENT_TEST: "assignmentTest",
};

const SCORE_FORMAT = {
  MARKS: "marks",
  GRADE: "grade",
};

const S3_FILE_TYPES = {
  SHEET: "sheet",
  DOCX: "docx",
  IMAGE: "image",
  PDF: "pdf",
  JPG_IMAGE: "jpgImage",
  JPEG_IMAGE: "jpegImage",
  PNG_IMAGE: "pngImage",
  GIF_IMAGE: "gifImage",
  BMP_IMAGE: "bmpImage",
  TIFF_IMAGE: "tiffImage",
  SVG_IMAGE: "svgImage",
};
const S3_CONTENT_TYPES = {
  sheet: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
  jpgImage: "image/jpeg",
  jpegImage: "image/jpeg",
  pngImage: "image/png",
  gifImage: "image/gif",
  bmpImage: "image/bmp",
  tiffImage: "image/tiff",
  svgImage: "image/svg+xml",
};

module.exports = {
  connectedCollectionData,
  TASK_TYPES,
  BULK_UPLOAD_TYPES,
  QUESTION_TYPES,
  QUIZ_TYPES,
  MATERIAL_TYPES,
  COUNTRY_CODE,
  MSG91_URL,
  SUBMIT_TEST_STATUS,
  GAME_TYPES,
  MATERIAL_LEVELS,
  MATERIAL_FILE_TYPES,
  ASSIGNMENT_TYPES,
  SCORE_FORMAT,
  S3_FILE_TYPES,
  S3_CONTENT_TYPES,
};
