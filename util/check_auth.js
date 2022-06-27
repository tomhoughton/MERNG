const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    // context -> Header
    const authHeader =  context.req.headers.authorization;
    if (authHeader) {
        // We send the header with the bearer
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication Token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
}