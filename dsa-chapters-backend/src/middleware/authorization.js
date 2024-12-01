const jwt = require('jsonwebtoken');

const tokenAuthorization = function (request, response, next) {
    // Fetch token from headers, query, or body
    let token = request.body.token || request.query.token || request.headers['x-synechron-token'];

    // Also check the Authorization header (Bearer token pattern)
    if (!token && request.headers.authorization) {
        const authHeader = request.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
        }
    }

    // If token is found
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return response.status(401).json({
                    message: 'Your token is expired or invalid! Please re-login to generate a new token!'
                });
            }
            // Store decoded token in request for future use if needed
            request.user = decoded;
            // Proceed to the next middleware
            next();
        });
    } else {
        // Return error if no token is provided
        return response.status(401).json({
            message: 'We did not receive the token! Please pass the token with your request!'
        });
    }
};

module.exports = {
    tokenAuthorization
};
