import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api";
const getUserId = () => {
  return sessionStorage.getItem("userId");
};

export const fetchTopics = async () => {
    const token = sessionStorage.getItem("token");
  
    // Check if token is present
    if (!token) {
      console.error("Token not found in sessionStorage");
      throw new Error("Unauthorized: No token found");
    }
  
    try {
      // Assuming getUserId is a function that gets the current user's ID
      const userId = getUserId(); 
  
      // Make the API request with the token in Authorization header
      const response = await axios.get(`${API_BASE_URL}/topics/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId ? userId : "", // Pass userId if required
        },
      });
  
      return response.data; // Return the fetched data
    } catch (error) {
      // Log any errors
      console.error("Error fetching topics:", error.message);
      throw error;
    }
  };

export const updateProgress = async (chapterId, subTopicIds) => {
    const token = sessionStorage.getItem("token");
  
    // Check if token is present
    if (!token) {
      console.error("Token not found in sessionStorage");
      throw new Error("Unauthorized: No token found");
    }
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/progress`, // PUT request for updating progress
        {
          chapterId,
          subTopicIds,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating progress:", error.message);
      throw error;
    }
  };
  