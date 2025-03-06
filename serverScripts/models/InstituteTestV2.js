const mongoose = require("mongoose");
const { TEST_TYPES, TEST_STATUS } = require("../constants/commonConstants");
const { QUESTION_TYPES } = require("../constants");
const { questionV2Schema } = require("../models/QuestionV2");

const branchDetailsSchema = new mongoose.Schema(
  {
    branch_id: {
      type: mongoose.Types.ObjectId,
      ref: "Branch",
    },
    branch_name: {
      type: String,
    },
    institute_id: {
      type: mongoose.Types.ObjectId,
    },
    institute_name: {
      type: String,
    },
  },
  { _id: false }
);

const batchDetailsSchema = new mongoose.Schema(
  {
    batch_id: {
      type: mongoose.Types.ObjectId,
      ref: "Batch",
    },
    batch_name: {
      type: String,
    },
    branch_id: {
      type: mongoose.Types.ObjectId,
      ref: "Branch",
    },
    branch_name: {
      type: String,
    },
    institute_id: {
      type: mongoose.Types.ObjectId,
    },
    institute_name: {
      type: String,
    },
    totalStudents: {
      type: Number,
    },
    totalSubmits: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const instituteTestV2Schema = new mongoose.Schema(
  {
    institute_test_name: {
      type: String,
      required: true,
    },
    test_pattern_details: {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "SuperAdminTestTemplate",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    test_duration: {
      type: Number,
      required: true,
    },
    test_start_time: {
      type: Date,
    },
    test_end_time: {
      type: Date,
    },
    add_password: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    institute_details: {
      institute_id: {
        type: mongoose.Types.ObjectId,
      },
      institute_name: {
        type: String,
      },
    },
    branch_details: [branchDetailsSchema],
    batch_details: [batchDetailsSchema],
    test_details: {
      subjects_details: [
        {
          _id: false,
          subject_id: {
            type: mongoose.Types.ObjectId,
          },
          subject_name: {
            type: String,
          },
          total_questions_for_subject: {
            type: Number,
          },
          total_subject_marks: {
            type: Number,
            default: 0,
          },
          questions_to_attempt: {
            type: Number,
            required: true,
          },
          is_teacher_assigned: {
            type: Boolean,
            default: false,
          },
          are_all_questions_added_for_subject: {
            type: Boolean,
            default: false,
          },
          teacher_assigned_by: {
            id: {
              type: mongoose.Types.ObjectId,
            },
            date_time: {
              type: Date,
            },
          },
          teacher_details: {
            institute_id: {
              type: mongoose.Types.ObjectId,
            },
            institute_name: {
              type: String,
              default: "",
            },
            branch_id: {
              type: mongoose.Types.ObjectId,
            },
            branch_name: {
              type: String,
            },
            teacher_id: {
              type: mongoose.Types.ObjectId,
              default: null,
            },
            teacher_name: {
              type: String,
              default: "",
            },
          },
          sections: [
            {
              section_name: {
                type: String,
              },
              question_type: [
                {
                  type: String,
                  required: true,
                  enum: Object.values(QUESTION_TYPES),
                },
              ],
              marks_per_question: {
                type: Number,
              },
              negative_mark: {
                type: Number,
              },
              optional_question: {
                type: Number,
              },
              questions_list: [questionV2Schema],
              total_questions_for_section: {
                type: Number,
              },
              questions_from: {
                type: Number,
              },
              questions_to: {
                type: Number,
              },
              questions_to_attempt: {
                type: Number,
                required: true,
              },
              total_marks: {
                type: Number,
                required: true,
              },
            },
          ],
        },
      ],
    },
    test_duration_type: {
      type: String,
      default: "NONE",
      enum: ["FIXED", "NONE", "PRACTICE"],
    },
    test_type: {
      type: String,
      enum: [
        TEST_TYPES.SUPERADMIN,
        TEST_TYPES.INSTITUTE_ADMIN,
        TEST_TYPES.BRANCH_ADMIN,
        TEST_TYPES.TEACHER,
      ],
    },
    total_test_questions: {
      type: Number,
    },
    total_marks: {
      type: Number,
    },
    questions_to_attempt: {
      type: Number,
      required: true,
    },
    questions_added_for_test: {
      type: Boolean,
      default: false,
    },
    instruction_text: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    last_updated_by: {
      _id: false,
      id: {
        type: mongoose.Types.ObjectId,
      },
      date_time: {
        type: Date,
      },
    },
    result_announce: {
      type: String,
      enum: ["IMMEDIATE", "LATER"],
      default: "IMMEDIATE",
    },
    result_announce_time: {
      type: Date,
      default: new Date().toISOString(),
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [TEST_STATUS.PENDING, TEST_STATUS.CREATED, TEST_STATUS.ASSIGNED],
      default: TEST_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  }
);
const InstituteTestV2 = mongoose.model(
  "InstituteTestV2",
  instituteTestV2Schema,
  "institutetests_v2"
);

module.exports = InstituteTestV2;
