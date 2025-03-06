const mongoose = require("mongoose");
const { USER_ROLES } = require("../constants/user");

const instituteSettingsSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    instituteName: { type: String, required: true },
    studentFields: [
      {
        _id: false,
        fieldName: { type: String },
        type: { type: String },
        isOptional: { type: Boolean, default: true },
      },
    ],
    teacherFields: [
      {
        _id: false,
        fieldName: { type: String },
        type: { type: String },
        isOptional: { type: Boolean, default: true },
      },
    ],
    lmsModules: [
      {
        _id: false,
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    roleModules: [
      {
        _id: false,
        role: { type: String, enum: USER_ROLES },
        lmsModules: [
          {
            _id: false,
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
      },
    ],
    patterns: [
      {
        _id: false,
        patternId: { type: String, required: true },
        patternName: { type: String, required: true },
      },
    ],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const InstituteSettings = mongoose.model(
  "InstituteSettings",
  instituteSettingsSchema,
  "institute_settings"
);

module.exports = InstituteSettings;
