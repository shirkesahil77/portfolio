const express = require('express');

const { authenticateUser } = require('../dal/security-dal');

const securityRoutes = express.Router();

securityRoutes.post('/authenticate', async (request, response) => {
    const credentials = request.body;
    console.log(credentials.email);
    try {
        const result = await authenticateUser(credentials);
        response.json(result);
    } catch (error) {
        response.json(error);
    }
});

module.exports = securityRoutes;