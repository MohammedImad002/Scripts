const LMSCourse = require("./models/LMSCourse")
const LMSSubject = require("./models/LMSSubject")
const LMSChapter = require("./models/LMSChapter")
const LMSTopic = require("./models/LMSTopic")
const LMSSubTopic = require("./models/LMSSubTopic")
const Material = require("./models/Material")
const mongoose = require("mongoose")

async function updateCounts() {
    try {

        const sslCertPath = "/home/ubuntu/backup/lms-docdb.pem";

        const uri = `mongodb://lmsadmin:lmsdbpass9895@lms-docdb-2025-02-01-07-29-34.ca1u7lspatde.ap-south-1.docdb.amazonaws.com:27017/lms-prod?ssl=true&tlsCAFile=${sslCertPath}&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

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

        // 1. Update subjectCount in Course collection
        const courses = await LMSCourse.find({ deleted: false });
        for (let course of courses) {
            const subjectCount = await LMSSubject.countDocuments({ courseId: course._id, deleted: false });
            await LMSCourse.updateOne({ _id: course._id, deleted: false }, { $set: { subjectCount } });
            console.log(`Updated subjectCount for Course ${course.name}: ${subjectCount}`);
        }

        // 2. Update chapterCount, materialCount, and hasMaterial in Subject collection
        const subjects = await LMSSubject.find({ deleted: false });
        for (let subject of subjects) {
            const chapterCount = await LMSChapter.countDocuments({ subjectId: subject._id, deleted: false });
            const materialCount = await Material.countDocuments({ subjectId: subject._id, deleted: false });
            const hasMaterial = materialCount > 0;
            await LMSSubject.updateOne({ _id: subject._id, deleted: false }, { $set: { chapterCount, materialCount, hasMaterial } });
            console.log(`Updated Subject ${subject.name} → chapterCount: ${chapterCount}, materialCount: ${materialCount}, hasMaterial: ${hasMaterial}`);
        }

        // 3. Update topicCount, materialCount, and hasMaterial in Chapter collection
        const chapters = await LMSChapter.find({ deleted: false });
        for (let chapter of chapters) {
            const topicCount = await LMSTopic.countDocuments({ chapterId: chapter._id, deleted: false });
            const materialCount = await Material.countDocuments({ chapterId: chapter._id, deleted: false });
            const hasMaterial = materialCount > 0;
            await LMSChapter.updateOne({ _id: chapter._id, deleted: false }, { $set: { topicCount, materialCount, hasMaterial } });
            console.log(`Updated Chapter ${chapter.name} → topicCount: ${topicCount}, materialCount: ${materialCount}, hasMaterial: ${hasMaterial}`);
        }

        // 4. Update subTopicCount, materialCount, and hasMaterial in LMSTopic collection
        const topics = await LMSTopic.find({ deleted: false });
        for (let topic of topics) {
            const subTopicCount = await LMSSubTopic.countDocuments({ topicId: topic._id, deleted: false });
            const materialCount = await Material.countDocuments({ topicId: topic._id, deleted: false });
            const hasMaterial = materialCount > 0;
            await LMSTopic.updateOne({ _id: topic._id, deleted: false }, { $set: { subTopicCount, materialCount, hasMaterial } });
            console.log(`Updated Topic ${topic.name} → subTopicCount: ${subTopicCount}, materialCount: ${materialCount}, hasMaterial: ${hasMaterial}`);
        }

        // 5. Update hasMaterial in LMSSubTopic collection
        const subTopics = await LMSSubTopic.find({ deleted: false });
        for (let subTopic of subTopics) {
            const materialCount = await Material.countDocuments({ subTopicId: subTopic._id, deleted: false });
            const hasMaterial = materialCount > 0;
            await LMSSubTopic.updateOne({ _id: subTopic._id, deleted: false }, { $set: { hasMaterial } });
            console.log(`Updated SubTopic ${subTopic.name} → hasMaterial: ${hasMaterial}`);
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
updateCounts();
