const mongoose = require("mongoose");

const ERPUserSchema = new mongoose.Schema(
  {
    userId: String,
    academicId: String,
    branchId: String,
    branchName: String,
    branchType: String,
    className: String,
    divisionName: String,
    fatherName: String,
    gender: String,
    instituteId: String,
    motherName: String,
    role: String,
    semYear: String,
    semYearNo: String,
    firstName: String,
    studentRegistrationId: String,
    staffRegistrationId: String,
    registrationNo: String,
    department: String,
    designation: String,
    studImagePath: String,
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    staffImagePath: String,
    courses: [
      {
        courseName: String,
        courseId: mongoose.Types.ObjectId,
      },
    ],
    blcId: String,
    blcDivisionId: String,
  },
  { timestamps: true }
);

const ERPUser = mongoose.model("ERPUser", ERPUserSchema, "erp_users");

module.exports = ERPUser;
