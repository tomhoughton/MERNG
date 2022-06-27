const postsResolver = require('./posts');
const userResolvers = require('./users');

module.exports = {
    Query: {
        ...postsResolver.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
};