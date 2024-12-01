import axios from "axios";

const authenticationUrl = "http://localhost:9090/api/auth/authenticate";

export const authenticateUser = async (user) => {
  try {
    const response = await axios.post(authenticationUrl, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Assuming the API returns a consistent structure
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);

    if (error.response) {
      // Server responded with a status other than 200
      return { success: false, message: error.response.data.message || "Authentication failed." };
    } else if (error.message === "Network Error") {
      return { success: false, message: "Network Error. Please check your connection." };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
};
