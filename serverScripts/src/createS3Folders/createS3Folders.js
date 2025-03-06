const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const SubTopic = require('../models/LMSSubTopic')
const { connectToDatabase } = require('../utils/db')

const s3 = new AWS.S3({ region: 'ap-south-1' });
const bucketName = 'allassestsupmyranks-staging';

async function createS3Folders() {
    try {
        // Connect to MongoDB
        await connectToDatabase()

        console.log('Connected to MongoDB.');

        // Fetch SubTopic data
        const subTopics = await SubTopic.find({ topicName: { $exists: ["Characteristic Features of living"] }, deleted: false });

        for (const subTopic of subTopics) {
            // Generate folder path
            const folderPath = `${formatName(subTopic.courseName)}/${formatName(
                subTopic.subjectName
            )}/${formatName(subTopic.chapterName)}/${formatName(
                subTopic.topicName
            )}/${formatName(subTopic.name)}/`;

            console.log(`Creating folder: ${folderPath}`);

            // Create folder in S3 (folder is created by uploading an empty object with a trailing slash in the key)
            await s3
                .putObject({
                    Bucket: bucketName,
                    Key: folderPath,
                })
                .promise();

            console.log(`Folder created: ${folderPath}`);
        }

        console.log('All folders created successfully.');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
}

// Utility function to format names into S3-friendly format
function formatName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Run the script
createS3Folders();
