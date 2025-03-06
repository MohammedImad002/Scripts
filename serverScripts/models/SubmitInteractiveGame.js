const mongoose = require("mongoose");

const submitTestSchema = new mongoose.Schema(
  {
    qr_code_id: {
      type: String,
      required: true,
    },

    student_id: {
      type: String,
      required: true,
    },
    student_name: {
      type: String,
      required: true,
    },

    total_marks: {
      type: Number,
      required: true,
      default: 0,
    },
    total_right_answers: {
      type: Number,
      required: true,
    },
    total_wrong_answers: {
      type: Number,
      required: true,
    },
    // total_attempted_questions: {
    // 	type: Number,
    // 	required: true,
    // },
    // total_unattempted_questions: {
    // 	type: Number,
    // 	required: true,
    // },
    total_questions: {
      type: Number,
      required: true,
    },
    test_questions_list: [
      {
        question_id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        question: {
          type: String,
        },
        correct_answer: {
          type: String,
        },
        correct_answers: {
          type: [String],
        },
        selected_answers: {
          type: [String],
        },
        selected_answer: {
          type: String,
        },
        // solution: {
        // 	type: String,
        // },
        options: {
          type: Array,
          required: false,
        },
      },
    ],
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSCourse",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSSubject",
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSChapter",
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LMSTopic",
    },

    has_passed_test: {
      type: Boolean,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("SubmitInterActiveTest", submitTestSchema);
