const mongoose = require("mongoose");
const { QUESTION_TYPES } = require("../constants");

const superAdminTestTemplateSchema = new mongoose.Schema(
  {
    test_name: {
      type: String,
      required: true,
    },
    course_details: {
      course_id: mongoose.Types.ObjectId,
      course_name: String,
    },

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
        total_marks: {
          type: Number,
          required: true,
        },
        questions_to_attempt: {
          type: Number,
          required: true,
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
            questions_list: {
              type: Array,
              default: [],
            },
            questions_from: {
              type: Number,
            },
            questions_to: {
              type: Number,
            },
            total_questions: {
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
    total_questions: {
      type: Number,
    },
    questions_to_attempt: {
      type: Number,
      required: true,
    },
    total_marks: {
      type: Number,
    },
    test_duration: {
      type: Number,
    },
    instruction_text: {
      type: String,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const SuperAdminTestTemplate = mongoose.model(
  "SuperAdminTestTemplate",
  superAdminTestTemplateSchema
);
module.exports = SuperAdminTestTemplate;
