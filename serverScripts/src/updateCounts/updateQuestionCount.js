const mongoose = require("mongoose")
const UnitV2 = require("./models/UnitV2")
const ChapterV2 = require("./models/ChapterV2")
const TopicV2 = require("./models/TopicV2")
const { QuestionV2 } = require("./models/QuestionV2")

async function updateQuestionCounts() {
    try {

        const sslCertPath = "/home/ubuntu/backup/lms-docdb.pem";

        const uri = `mongodb://lmsadmin:lmsdbpass9895@lms-docdb-2025-02-01-07-29-34.ca1u7lspatde.ap-south-1.docdb.amazonaws.com:27017/lms-beta?ssl=true&tlsCAFile=${sslCertPath}&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

        try {
            await mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                authMechanism: "SCRAM-SHA-1"
            });

            isConnected = true;
            console.info("Connected to the database");
        } catch (error) {
            console.error("Database connection failed:", error);
            throw error;
        }

        const units = await UnitV2.find();
        for (let unit of units) {
            const questionCount = await QuestionV2.countDocuments({ unitId: unit._id, deleted: false, disabled: false });
            await UnitV2.updateOne({ _id: unit._id }, { $set: { questionCount } });
            console.log(`Updated Unit ${unit.name} → questionCount ${questionCount}`);
        }

        const chapters = await ChapterV2.find();
        for (let chapter of chapters) {
            const questionCount = await QuestionV2.countDocuments({ chapterId: chapter._id, deleted: false, disabled: false });
            await ChapterV2.updateOne({ _id: chapter._id }, { $set: { questionCount } });
            console.log(`Updated Chapter ${chapter.name} → questionCount ${questionCount}`);
        }

        const topics = await TopicV2.find();
        for (let topic of topics) {
            const questionCount = await QuestionV2.countDocuments({ topicId: topic._id, deleted: false, disabled: false });
            await TopicV2.updateOne({ _id: topic._id }, { $set: { questionCount } });
            console.log(`Updated Topic ${topic.name} → questionCount ${questionCount}`);
        }

        console.log("Batch update completed successfully!");
    } catch (error) {
        console.error("Error updating counts:", error);
    }
    finally {
        await mongoose.connection.close();
    }
}

// Run the update function
updateQuestionCounts();
