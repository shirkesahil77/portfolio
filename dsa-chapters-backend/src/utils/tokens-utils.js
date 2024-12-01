const jwt = require("jsonwebtoken");

const getUserIdFromToken = (token) => {
    try {
      // Decode the token without verification to extract the payload
      const decoded = jwt.decode(token);
      
      if (decoded && decoded.userId) {
        return decoded.userId; // Return the userId from the token payload
      } else {
        return null; // If userId is not present in the token, return null
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null; // Return null if any error occurs while decoding the token
    }
  };
module.exports = { getUserIdFromToken };
