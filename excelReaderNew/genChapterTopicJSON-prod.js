const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

function readExcelFile(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const subjects = [{ name: "Indian Polity", sequence: 6, chapters: [] }];
  let currentChapter = null;
  let currentTopic = null;
  let currentMaterial = null;

  for (const record of data) {
    if (record[0] === "chapter Seq") continue; 

    // If a new chapter starts
    if (record[0]) {
      // Push the last topic and material if they exist
      if (currentMaterial && currentTopic) {
        currentTopic.materials.push(currentMaterial);
        currentMaterial = null;
      }
      if (currentTopic && currentChapter) {
        currentChapter.topics.push(currentTopic);
        currentTopic = null;
      }
      if (currentChapter) subjects[0].chapters.push(currentChapter);

      // Start a new chapter
      currentChapter = { name: record[1], sequence: record[0], topics: [] };
    }

    // If a new topic starts
    if (record[2]) {
      if (currentMaterial && currentTopic) {
        currentTopic.materials.push(currentMaterial);
        currentMaterial = null;
      }
      if (currentTopic) currentChapter.topics.push(currentTopic);

      // Start a new topic
      currentTopic = { name: record[3], sequence: record[2], materials: [] };
    }

    // If a new material is found
    if (record[4]) {
      if (currentMaterial) currentTopic.materials.push(currentMaterial);

      // Start a new material
      currentMaterial = {
        name: record[5],
        sequence: record[4],
        url: record[7],
        thumbnail: record[8],
        fileType: "video",
        materialType: "study",
      };
    }
  }

  // Ensure that the last chapter, topic, and material are pushed
  if (currentMaterial && currentTopic) {
    currentTopic.materials.push(currentMaterial);
  }
  if (currentTopic && currentChapter) {
    currentChapter.topics.push(currentTopic);
  }
  if (currentChapter) subjects[0].chapters.push(currentChapter);

  subjects[0].chapters.forEach(chapter => {
    chapter.topics = chapter.topics.map(topic => {
      if (!topic.materials.length) delete topic.materials;
      return topic;
    });
  });

  return { data, subjects };
}


function saveAsJsObject(data, outputFilePath) {
  const jsObject = JSON.stringify(data);
  const content = `module.exports = ${jsObject};`;

  fs.writeFileSync(outputFilePath, content);
}

const excelFilePath = "./Indian Polity.xlsx";
const { data, subjects } = readExcelFile(excelFilePath);

// const outputFilePath = "./extractedSubjects.js";
// saveAsJsObject(data, outputFilePath);
saveAsJsObject(subjects, "./Indian Polity.json");