const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  region: "ap-south-1",
});

const s3 = new AWS.S3();
const bucketName = "jsonimages";
const s3Folder = "question-images/offline/";
const localFolder = path.join(process.cwd(), "question-images");
const errorLogFile = path.join(process.cwd(), "error-log.txt");

// Function to log errors with filename to a text file
const logError = (fileName, message) => {
  fs.appendFileSync(
    errorLogFile,
    `${new Date().toISOString()} - Error with file: ${fileName} - ${message}\n`
  );
};

// Ensure the local folder exists
if (!fs.existsSync(localFolder)) {
  fs.mkdirSync(localFolder, { recursive: true });
}

// Function to download a file from S3
const downloadFileFromS3 = async (fileName) => {
  const filePath = path.join(localFolder, fileName);
  const params = {
    Bucket: bucketName,
    Key: `${s3Folder}${fileName}`,
  };

  console.log(`Processing file: ${fileName}`);

  try {
    const data = await s3.getObject(params).promise();
    fs.writeFileSync(filePath, data.Body);
    console.log(`Downloaded: ${fileName}`);
  } catch (err) {
    logError(fileName, `Failed to download: ${err.message}`);
    console.error(`Error downloading file ${fileName}: ${err.message}`);
  }
};

// Main function to download all files
const downloadAllFiles = async () => {
  let continuationToken;
  let totalFiles = 0;

  do {
    const params = {
      Bucket: bucketName,
      Prefix: s3Folder,
      ContinuationToken: continuationToken,
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      const files = data.Contents.filter((item) => !item.Key.endsWith("/"));
      totalFiles += files.length;

      console.log(`Found ${files.length} files in this batch.`);

      // Dynamically import p-limit
      const { default: pLimit } = await import("p-limit");
      const limit = pLimit(5); // Adjust concurrency limit here

      // Create an array of download promises with concurrency control
      const downloadPromises = files.map((item) => {
        const fileName = path.basename(item.Key);
        return limit(() => downloadFileFromS3(fileName));
      });

      // Wait for all downloads to complete
      await Promise.all(downloadPromises);

      continuationToken = data.NextContinuationToken;
    } catch (err) {
      logError("Listing files", `Failed to list objects in S3: ${err.message}`);
      console.error("Error listing files: ", err.message);
      break; // Exit the loop on error
    }
  } while (continuationToken);

  console.log(`Total files downloaded: ${totalFiles}`);
};

// Start downloading files
downloadAllFiles().catch((err) =>
  console.error("Error in downloading files:", err)
);