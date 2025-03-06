const mongoose = require("mongoose");
const { TEST_TYPES } = require("../constants/commonConstants");
const { QUESTION_TYPES } = require("../constants");

const instituteTestSchema = new mongoose.Schema(
  {
    institute_test_name: {
      type: String,
      required: true,
    },
    test_pattern_details: {
      id: {
        type: mongoose.Types.ObjectId,
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
      required: true,
    },
    test_end_time: {
      type: Date,
      required: true,
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
    branch_details: [
      {
        branch_id: {
          type: mongoose.Types.ObjectId,
          ref: "Branch",
        },
        branch_name: {
          type: String,
        },
      },
      { _id: false },
    ],
    batch_details: [
      {
        batch_id: {
          type: mongoose.Types.ObjectId,
          ref: "Batch",
        },
        batch_name: {
          type: String,
        },
      },
      { _id: false },
    ],
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
              _id: false,
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
              questions_list: [
                {
                  type: mongoose.Types.ObjectId,
                },
              ],
              total_questions_for_section: {
                type: Number,
              },
              questions_from: {
                type: Number,
              },
              questions_to: {
                type: Number,
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
      default: TEST_TYPES.TEACHER,
      enum: [TEST_TYPES.SUPERADMIN, TEST_TYPES.TEACHER],
    },
    total_test_questions: {
      type: Number,
    },
    total_marks: {
      type: Number,
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
  },
  {
    timestamps: true,
  }
);
const InstituteTest = mongoose.model("InstituteTest", instituteTestSchema);

/* instituteTestSchema.post("save", async function (doc, next) {
  try {
    await updateRedisInstituteTest();
  } catch (error) {
    console.error("Error in post save hook:", error);
  }
  next();
});
instituteTestSchema.post("remove", async function (_doc) {
  try {
    await updateRedisInstituteTest();
  } catch (error) {
    console.error("Error in post remove hook:", error);
  }
});
instituteTestSchema.post("findOneAndUpdate", async function (_doc) {
  try {
    await updateRedisInstituteTest();
  } catch (error) {
    console.error("Error in post findOneAndUpdate hook:", error);
  }
});


const updateRedisInstituteTest = async () => {
  const institutetestsData = await InstituteTest.aggregate([
    {
      $match: { is_active: true },
    },
    {
      $unwind: {
        path: "$test_details.subjects_details",
      },
    },
    {
      $unwind: {
        path: "$test_details.subjects_details.sections",
      },
    },
    {
      $sort: {
        "test_details.subjects_details.sections.section_name": 1,
      },
    },
    {
      $lookup: {
        from: `questions_v2`,
        localField: "test_details.subjects_details.sections.questions_list",
        foreignField: "_id",
        as: "test_details.subjects_details.sections.all_questions",
      },
    },
    {
      $lookup: {
        from: `assets_cbse`,
        localField:
          "test_details.subjects_details.sections.all_questions.assets",
        foreignField: "_id",
        as: "test_details.subjects_details.sections.solutionImages",
      },
    },
    {
      $group: {
        _id: "$test_details.subjects_details.subject_id",
        subject_id: {
          $first: "$test_details.subjects_details.subject_id",
        },
        subject_name: {
          $first: "$test_details.subjects_details.subject_name",
        },
        total_subject_marks: {
          $first: "$test_details.subjects_details.total_subject_marks",
        },
        total_questions_for_subject: {
          $first: "$test_details.subjects_details.total_questions_for_subject",
        },
        is_teacher_assigned: {
          $first: "$test_details.subjects_details.is_teacher_assigned",
        },
        author_name: {
          $first: "$test_details.subjects_details.author_name",
        },
        teacher_details: {
          $first: "$test_details.subjects_details.teacher_details",
        },
        are_all_questions_added_for_subject: {
          $first:
            "$test_details.subjects_details.are_all_questions_added_for_subject",
        },
        mainObject: {
          $first: "$$ROOT",
        },
        sections: {
          $addToSet: "$test_details.subjects_details.sections",
        },
      },
    },
    {
      $group: {
        _id: "$mainObject._id",
        institute_test_name: {
          $first: "$mainObject.institute_test_name",
        },
        test_pattern_details: {
          $first: "$mainObject.test_pattern_details",
        },
        course_name: {
          $first: "$mainObject.course_name",
        },
        course_id: {
          $first: "$mainObject.course_id",
        },
        institute_details: {
          $first: "$mainObject.institute_details",
        },
        branch_details: {
          $first: "$mainObject.branch_details",
        },
        batch_details: {
          $first: "$mainObject.batch_details",
        },
        test_pattern: {
          $first: "$mainObject.test_pattern",
        },
        test_start_time: {
          $first: "$mainObject.test_start_time",
        },
        test_end_time: {
          $first: "$mainObject.test_end_time",
        },
        test_duration: {
          $first: "$mainObject.test_duration",
        },
        test_duration_type: {
          $first: "$mainObject.test_duration_type",
        },
        total_test_questions: {
          $first: "$mainObject.total_test_questions",
        },
        total_marks: {
          $first: "$mainObject.total_marks",
        },
        instruction_text: {
          $first: "$mainObject.instruction_text",
        },
        add_password: {
          $first: "$mainObject.add_password",
        },
        password: {
          $first: "$mainObject.password",
        },
        createdAt: {
          $first: "$mainObject.createdAt",
        },
        updatedAt: {
          $first: "$mainObject.updatedAt",
        },
        is_active: {
          $first: "$mainObject.is_active",
        },
        test_type: {
          $first: "$mainObject.test_type",
        },
        created_by: {
          $first: "$mainObject.created_by",
        },
        result_announce: {
          $first: "$mainObject.result_announce",
        },
        result_announce_time: {
          $first: "$mainObject.result_announce_time",
        },
        test_details: {
          $push: {
            subject_id: "$subject_id",
            subject_name: "$subject_name",
            total_questions_for_subject: "$total_questions_for_subject",
            is_teacher_assigned: "$is_teacher_assigned",
            author_name: "$author_name",
            teacher_details: "$teacher_details",
            sections: "$sections",
            are_all_questions_added_for_subject:
              "$are_all_questions_added_for_subject",
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "test_created_by",
      },
    },
    {
      $unwind: "$test_created_by",
    },
    {
      $addFields: {
        "created_by.firstName": "$test_created_by.firstName",
        "created_by.lastName": "$test_created_by.lastName",
        "created_by._id": "$test_created_by._id",
      },
    },
    {
      $project: {
        "test_details.sections.questions_list": 0,
        test_created_by: 0,
      },
    },
  ]).toArray();
  const redisClient = getRedisClient();
  if (institutetestsData) {
    await redisClient.set(
      "institutetestsData",
      JSON.stringify(institutetestsData)
    );
  }
};
// const getRedisInstituteTest = async () => {
//   await redisClient.get(
//     "institutetestsData",
//     JSON.stringify(institutetestsData)
//   );
// };
*/
module.exports = InstituteTest;
