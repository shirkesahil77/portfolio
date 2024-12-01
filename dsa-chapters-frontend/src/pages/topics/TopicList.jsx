import React, { useEffect, useState } from "react";
import TopicCard from "../../components/TopicCard";
import { useNavigate } from "react-router-dom";
import { fetchTopics } from "../../services/topic-service";
import Spinner from "../../components/Spinner";

const TopicList = ({ onSelectTopic }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics()
      .then((res) => {
        setTopics(res.data); // Set the fetched topics
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.log("Error fetching topics:", error); // Log any API errors
        setError("Failed to fetch topics"); // Set error if fetch fails
        setLoading(false); // Set loading to false if error occurs
      });
  }, []);

  const handleTopicClick = (topicId) => {
    navigate(`/topics/${topicId}`);
  };
  console.log(topics,'topicslist')

  if (loading) {
    return <div className="text-center"><Spinner/></div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">DSA Learning Path</h1>
          <p className="mt-4 text-xl text-gray-600">
            Master Data Structures and Algorithms one topic at a time
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={() => handleTopicClick(topic.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicList;
