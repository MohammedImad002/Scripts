const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

function readExcelFile(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const subjects = [{ name: "Biology", sequence: 1, chapters: [] }];
  let currentChapter;
  let currentTopic;
  let currentMaterial;
  for (const record of data) {
    if (record[0] === "chapter Seq") continue;
    if (record[0]) {
      if (currentMaterial && currentTopic) {
        currentTopic.materials.push(currentMaterial);
        currentMaterial = null;
      }
      if (currentTopic && currentChapter) {
        currentChapter.topics.push(currentTopic);
        currentTopic = null;
      }
      if (currentChapter) subjects[0].chapters.push(currentChapter);
      currentChapter = { name: record[1], sequence: record[0], topics: [] };
    }
    if (record[2]) {
      if (currentMaterial && currentTopic) {
        currentTopic.materials.push(currentMaterial);
        currentMaterial = null;
      }
      if (currentTopic) currentChapter.topics.push(currentTopic);
      currentTopic = { name: record[3], sequence: record[2], materials: [] };
    }
    if (record[4]) {
      if (currentMaterial) currentTopic.materials.push(currentMaterial);
      currentMaterial = {
        name: record[5],
        sequence: record[4],
        url: record[7] ,
        thumbnail: record[8],
        fileType: record[9],
        materialType: record[10],
      };
    }
  }
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

const excelFilePath = "./G2_Eng.xlsx";
const { data, subjects } = readExcelFile(excelFilePath);

// const outputFilePath = "./extractedSubjects.js";
// saveAsJsObject(data, outputFilePath);
saveAsJsObject(subjects, "./G2_Eng.json");