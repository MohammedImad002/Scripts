function removeEmptyField(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      if (obj[key].trim() === "") {
        delete obj[key];
      }
    }
  }
  return obj;
}
function formatJsonArray(fields, data) {
  for (const field of fields) {
    if (data[field]) {
      try {
        data[field] = JSON.parse(data[field]);
      } catch (_error) {
        throw {
          details: [
            {
              message: `"${data[field]}" must be an array of string`,
            },
          ],
        };
      }
    }
  }
  return data;
}

function formatJson(fields, data) {
  for (const fieldObj of fields) {
    const fieldName = fieldObj.field;
    const fieldType = fieldObj.type;
    if (data[fieldName]) {
      try {
        data[fieldName] = JSON.parse(data[fieldName]);
      } catch (_error) {
        // console.error("Error in utils:formatJson: ", error);
        let message;
        if (fieldType === "number") {
          message = `"${fieldName}" must be a number`;
        } else if (fieldType === "boolean")
          message = `"${fieldName}" must be true or false`;
        else message = `Unknown field type for field "${fieldName}"`;
        throw {
          details: [
            {
              message,
            },
          ],
        };
      }
    }
  }
  return data;
}

function getUniqueFieldsFromDBObject(dbDocs, fieldName) {
  const data = new Set();
  dbDocs.forEach((record) => {
    data.add(record[fieldName]);
  });
  return Array.from(data);
}

function arraysStrictlyEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  removeEmptyField,
  formatJsonArray,
  getUniqueFieldsFromDBObject,
  arraysStrictlyEqual,
  randomIntFromInterval,
  formatJson,
};
