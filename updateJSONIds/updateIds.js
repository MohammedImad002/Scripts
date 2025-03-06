const fs = require("fs");
const inputFilePath = "./testList.json";
const outputFilePath = "./updated-testList.json";

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  let jsonData = JSON.parse(data);
  console.log("data", )

  const newCourseDetails = [
    {
      currentId: "66fa4116a3c5b1ec74a77cee",
      newId: "66f7cacfb888a39510871c26",
      newName: "Grade 11",
    },
    {
      currentId: "66fa4199a3c5b1ec74a77cef",
      newId: "66f7cad9b888a39510871c29",
      newName: "Grade 12",
    },
  ];

  const newSubjectDetails = [
    {
      currentId: "66fa45b3a3c5b1ec74a77cf4",
      newId: "66fa8324547f3353b4f6ca31",
      newName: "Physics",
    },
    {
      currentId: "66fa4611a3c5b1ec74a77cf6",
      newId: "66fa8310547f3353b4f6b5d9",
      newName: "Biology",
    },
    {
      currentId: "66fa45bfa3c5b1ec74a77cf5",
      newId: "66fa831e547f3353b4f6c3ed",
      newName: "Chemistry",
    },
    {
      currentId: "66fa4623a3c5b1ec74a77cf7",
      newId: "66fa832e547f3353b4f6d3f9",
      newName: "Mathematics",
    },
    {
      currentId: "66fa6d21a3c5b1ec74a77d05",
      newId: "66fa836a3dece03c7ab32e76",
      newName: "Physics",
    },
    {
      currentId: "66fa6d4aa3c5b1ec74a77d07",
      newId: "66fa83583dece03c7ab31de0",
      newName: "Biology",
    },
    {
      currentId: "66fa6d40a3c5b1ec74a77d06",
      newId: "66fa83613dece03c7ab32640",
      newName: "Chemistry",
    },
    {
      currentId: "66fa6d58a3c5b1ec74a77d08",
      newId: "66fa83713dece03c7ab33504",
      newName: "Mathematics",
    },
  ];

  jsonData.forEach((item) => {
    // Update course_id and course_name
    const matchingCourse = newCourseDetails.find(
      (course) => course.currentId === item.course_id
    );
    if (matchingCourse) {
      item.course_id = matchingCourse.newId;
      item.course_name = matchingCourse.newName;
    }

    // Update subject_id, subject_name, and question details
    if (item.test_details && item.test_details.subjects_details) {
      item.test_details.subjects_details.forEach((subject) => {
        const matchingSubject = newSubjectDetails.find(
          (newSubject) => newSubject.currentId === subject.subject_id
        );
        if (matchingSubject) {
          subject.subject_id = matchingSubject.newId;
          subject.subject_name = matchingSubject.newName;
        }

        // Update courseId and subjectId for each question
        if (subject.sections) {
          subject.sections.forEach((section) => {
            section.questionsList.forEach((question) => {
              // Update courseId and subjectId in the questionsList
              question.courseId = matchingCourse ? matchingCourse.newId : item.course_id;
              question.subjectId = matchingSubject ? matchingSubject.newId : subject.subject_id;
            });
          });
        }
      });
    }
  });

  console.log("Updated JSON Data:", JSON.stringify(jsonData, null, 2));

  const updatedJsonData = JSON.stringify(jsonData, null, 2);

  fs.writeFile(outputFilePath, updatedJsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }
    console.log(
      "Updated JSON file has been created successfully as 'updatedAssessmentList.json'."
    );
  });
});
