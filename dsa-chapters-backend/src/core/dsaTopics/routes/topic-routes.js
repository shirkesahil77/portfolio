const express = require('express');
const { getAllTopics, updateUserProgress } = require('../dal/topic-dal');
const {tokenAuthorization} = require('../../../middleware/authorization');
const topicRouter = express.Router();

// Apply token authorization for protected routes
topicRouter.use(tokenAuthorization);

// Define /topics route
topicRouter.get('/topics/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId); // Get userId from URL parameter

        // Validate userId to ensure it is a valid number
        if (isNaN(userId) || userId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid User ID. Please provide a valid numeric User ID.",
            });
        }

        // Fetch topics based on the userId and merge completion status
        const topicsWithStatus = await getAllTopics(userId);

        // Respond with topics with the completion status
        return res.status(200).json({
            success: true,
            data: topicsWithStatus,
        });
    } catch (error) {
        console.error("Error in /topics route:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message || "An error occurred while fetching topics.",
        });
    }
});


topicRouter.put('/progress', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
      const progressData = req.body; // Assume { chapterId, subTopicIds } sent in body
  
      if (!token) {
        return res.status(401).json({ success: false, message: "Token missing." });
      }
  
      const result = await updateUserProgress(token, progressData);
      
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
// Export the router
module.exports = topicRouter;
