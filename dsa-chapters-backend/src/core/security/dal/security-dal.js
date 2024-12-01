const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

// const client = new MongoClient(process.env.HOST);
const client = new MongoClient(process.env.HOST) || 'mongodb://127.0.0.1:27017/dsa_app_db';
client.connect();
        const db = client.db(process.env.NAME);
        const collection = db.collection('users');

async function authenticateUser(credentials) {
    try {
        await client.connect();
        const db = client.db(process.env.NAME);
        const collection = db.collection('users');
        console.log(collection,'collection')
        const userDocument = collection.findOne({ "email": credentials.email, "password": credentials.password });
        const user = await userDocument;
        if (!user) {
            return {
                success: false,
                message: 'Your email Id or password is wrong!'
            }
        } else {
            const token = jwt.sign({
                email: user.email,
                role: user.role,
                userId: user.id
            }, process.env.TOKEN_SECRET, {
                expiresIn: 5000
            });
            return {
                success: true,
                message: 'Your are successfully authenticated!',
                token,
                role: user.role,
                userId: user.id
            }
        }
    } catch (error) {
        throw new Error(error);
    }
    finally {
        client.close();
    }
}

module.exports = {
    authenticateUser
}