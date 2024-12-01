import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import ProblemCard from "../../components/ProblemCard";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTopics, updateProgress } from "../../services/topic-service";

const TopicDetails = () => {
  const [topic, setTopic] = useState(null); // Single topic state
  const [allCompleted, setAllCompleted] = useState(false); // Track completion status
  const { topicId } = useParams(); // Get topicId from URL params
  const navigate = useNavigate();

  // Fetch topic data based on the topicId from an API
  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const response = await fetchTopics(); // Fetch all topics from the backend
        const topics = response.data; // Access the 'data' property containing the array of topics
        console.log("Fetched Topics:", topics); // Log the fetched data
    
        // Check if topics is an array
        if (Array.isArray(topics)) {
          const foundTopic = topics.find((t) => String(t.id) === String(topicId)); // Find the topic by ID
          if (foundTopic) {
            setTopic(foundTopic); // Set the found topic data
          } else {
            console.error("Topic not found:", topicId); // Log error if not found
          }
        } else {
          console.error("Fetched data is not an array:", topics); // Handle case when data is not an array
        }
      } catch (error) {
        console.error("Error fetching topics:", error); // Handle API errors
      }
    };
    fetchTopicData();
  }, [topicId]);

  // Handle checkbox change for each problem
  const handleCheckboxChange = (problemId) => {
    const updatedTopic = { ...topic };
    updatedTopic.problems = updatedTopic.problems.map((problem) => {
      if (problem.id === problemId) {
        return { ...problem, status: !problem.status }; // Toggle status between true/false
      }
      return problem;
    });
    setTopic(updatedTopic); // Update state

    // Check if all problems are completed
    const allChecked = updatedTopic.problems.every((problem) => problem.status === true);
    setAllCompleted(allChecked);
  };

  // Handle next chapter button click
  const handleNextChapter = async () => {
    const subTopicIds = topic.problems.filter((problem) => problem.status === true).map((problem) => problem.id);
    const chapterId = topic.id; // Use the current topic id

    try {
      const result = await updateProgress(chapterId, subTopicIds); // Update the user's progress on the backend
      console.log(result.message); // Log the success message
      navigate("/topics"); // Navigate to the topics page (or next chapter path)
    } catch (error) {
      console.error("Error updating progress:", error); // Handle API errors
    }
  };

  const isAllCompleted = topic?.problems.every((problem) => problem.status === true); // Check if all problems are completed

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading topic details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/topics")}
          className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Topics
        </button>

        {/* Topic Title and Description */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{topic.title}</h1>
          <p className="mt-4 text-xl text-gray-600">{topic.description}</p>
        </div>

        {/* Problem List */}
        <div className="space-y-6">
          {topic.problems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              checked={problem.status} // Use the status to check the checkbox
              onToggleComplete={() => handleCheckboxChange(problem.id)} // Toggle problem status
            />
          ))}
        </div>

        {/* Next Chapter Button */}
        <button
          onClick={handleNextChapter}
          disabled={!isAllCompleted} // Enable if all problems are completed
          className={`mt-8 px-4 py-2 text-white ${isAllCompleted ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Next Chapter
        </button>
      </div>
    </div>
  );
};

export default TopicDetails;
