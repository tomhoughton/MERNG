const postsResolver = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
    Post: {
        likeCount: (parent) => {
            console.log(parent);
            return parent.likes.length;
        },
        commentCount: (parent) => {
            console.log(parent);
            return parent.comments.length;
        }
    },
    Query: {
        ...postsResolver.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolver.Mutation,
        ...commentsResolvers.Mutation
    }
};