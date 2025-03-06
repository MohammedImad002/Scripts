const AWS = require('aws-sdk');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Configure AWS S3
const s3 = new AWS.S3({
  region: 'ap-south-1', // Replace with your region
  accessKeyId: '', // Set your access key
  secretAccessKey: '', // Set your secret key
});

const bucketName = 'upmyranksvideos'; // Replace with your bucket name
const baseFolderPath = 'studymaterials/grade12/biology/teacherpptx'; // Replace with the base folder path
const outputDirectory = './excels/studymaterials/grade12/biology/teacherpptx'; // Directory to save Excel files

// Ensure output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

// Function to list all objects in a folder
const listS3Objects = async (bucket, prefix) => {
  const params = {
    Bucket: bucket,
    Prefix: prefix, // Path to the folder
  };

  let isTruncated = true;
  let continuationToken = null;
  const urls = [];

  while (isTruncated) {
    if (continuationToken) {
      params.ContinuationToken = continuationToken;
    }

    const data = await s3.listObjectsV2(params).promise();

    data.Contents.forEach((item) => {
      // Construct file URL
      const fileUrl = `https://static.upmyranks.com/${item.Key}`;
      urls.push({ Key: item.Key, URL: fileUrl });
    });

    isTruncated = data.IsTruncated; // Check if more data is available
    continuationToken = data.NextContinuationToken;
  }

  return urls;
};

// Function to save URLs to an Excel file
const saveToExcel = (folderName, urls) => {
  const worksheet = XLSX.utils.json_to_sheet(urls);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'URLs');

  const filePath = path.join(outputDirectory, `${ folderName }.xlsx`);
  XLSX.writeFile(workbook, filePath);
  console.log(`Excel file saved: ${filePath}`);
};

// Main function
const main = async () => {
  try {
    const data = await s3.listObjectsV2({ Bucket: bucketName, Prefix: baseFolderPath, Delimiter: '/' }).promise();
    const folders = data.CommonPrefixes.map((prefix) => prefix.Prefix);

    for (const folder of folders) {
      console.log(`Processing folder: ${folder}`);
      const topicName = folder.split('/').slice(-2, -1)[0]; // Extract the topic name
      const urls = await listS3Objects(bucketName, folder);
      saveToExcel(topicName, urls);
    }

    console.log('All Excel files have been generated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();