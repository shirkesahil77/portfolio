require("dotenv").config();
const { MongoClient } = require("mongodb");
const { getUserIdFromToken } = require("../../../utils/tokens-utils");
const client = new MongoClient(process.env.HOST);

// Fetch all topics with user progress
exports.getAllTopics = async (userId) => {
    try {
      // Connect to MongoDB
      await client.connect();
      const db = client.db(process.env.NAME);
  
      // Collections
      const topicsCollection = db.collection("topics");
      const usersCollection = db.collection("users");
  
      // Fetch all topics
      const topics = await topicsCollection.find({}).toArray();
      console.log("Fetched topics:", topics); // Log the topics
  
      // Fetch user data to get completed topics
      const user = await usersCollection.findOne({ id: userId });
      console.log("Fetched user data:", user); // Log the user data
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // Merge completed topics into the topics array
      const completedTopics = user.completedTopics || [];
  
      // Log the completed topics
      console.log("Completed topics:", completedTopics);
  
      // Mark each topic and its problems with their completion status
      const topicsWithStatus = topics.map((topic) => {
        const chapterId = topic.id; // Assuming each topic has an `id` field
  
        // Check if the topic is completed
        const isCompleted = completedTopics.some(
          (completedTopic) => completedTopic.chapterId === chapterId
        );
  
        // Update problems with their completion status
        const updatedProblems = (topic.problems || []).map((problem) => {
          const isProblemCompleted = completedTopics.some(
            (completedTopic) =>
              completedTopic.chapterId === chapterId &&
              completedTopic.subTopicIds.includes(problem.id) // Check if problem ID exists in subTopicIds
          );
  
          return {
            ...problem,
            status: isProblemCompleted ? true : false, // Add a `status` field to indicate completion
          };
        });
  
        return {
          ...topic,
          status: isCompleted, // Add a `status` field for the entire topic
          problems: updatedProblems, // Include the updated problems
        };
      });
  
      // Log the final merged topics
      console.log("Merged topics with status:", topicsWithStatus);
  
      return topicsWithStatus;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw new Error("Error fetching topics");
    }
  };
  
exports.updateUserProgress = async (token, progressData) => {
    try {
      // Connect to MongoDB
      await client.connect();
      const db = client.db(process.env.NAME);
      const collection = db.collection("users");
  
      // Extract userId from token
      const userId = getUserIdFromToken(token);
  
      if (!userId) {
        return { success: false, message: "Unauthorized." };
      }
  
      // Ensure subTopicIds is an array
      if (!Array.isArray(progressData.subTopicIds)) {
        return { success: false, message: "subTopicIds must be an array." };
      }
  
      // Get the user's current progress
      const user = await collection.findOne({ id: parseInt(userId) });
  
      // If user is not found
      if (!user) {
        return { success: false, message: "User not found." };
      }
  
      // Check if the chapter already exists in the completedTopics array
      const existingChapter = user.completedTopics.find(
        (topic) => topic.chapterId === progressData.chapterId
      );
  
      if (existingChapter) {
        // Check if the subTopicIds already exist in the chapter's completed subtopics
        const existingSubTopics = existingChapter.subTopicIds;
  
        // Get subTopicIds that need to be added (filter out already existing ones)
        const newSubTopics = progressData.subTopicIds.filter(
          (subTopicId) => !existingSubTopics.includes(subTopicId)
        );
  
        // If there are new subTopicIds, push them
        if (newSubTopics.length > 0) {
          await collection.updateOne(
            { id: parseInt(userId), "completedTopics.chapterId": progressData.chapterId },
            {
              $push: { "completedTopics.$.subTopicIds": { $each: newSubTopics } },
            }
          );
        }
  
        // Check if all subtopics in the chapter are completed
        const allSubTopicsCompleted = existingChapter.subTopicIds.length === progressData.subTopicIds.length;
  
        // If all subtopics are completed, set the topic as completed
        await collection.updateOne(
          { id: parseInt(userId), "completedTopics.chapterId": progressData.chapterId },
          {
            $set: { "completedTopics.$.completed": allSubTopicsCompleted },
          }
        );
  
        return { success: true, message: "Progress updated successfully." };
      } else {
        // If the chapter doesn't exist, push the whole chapter with subtopics
        await collection.updateOne(
          { id: parseInt(userId) },
          {
            $push: {
              completedTopics: {
                chapterId: progressData.chapterId,
                subTopicIds: progressData.subTopicIds,
                completed: true, // Mark the topic as completed if all subtopics are included
              },
            },
          }
        );
        return { success: true, message: "Progress updated successfully." };
      }
    } catch (error) {
      console.error("Error updating progress:", error.message);
      throw new Error("Error updating user progress: " + error.message);
    } finally {
      await client.close();
    }
  };
  
  
  
  
