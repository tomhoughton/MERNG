// Tutorial Video:
// https://www.youtube.com/watch?v=n1mdAPFq2Os&t=8s

// Dependencies:
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose'); // Lets us interface with MongoDB.

// Other:
const Post = require('./models/Post');
const { MONGODB } = require('./config.js');

const typeDefs = gql`
        type Post {
            id: ID!
            body: String!
            createdat: String!
            username: String!
        }
    type Query {
        getPosts: [Post]
    }
`

// for each query, it has a corresponding resolver to process some logic to return what the query returns.
const resolvers = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}

// Setup Apollo Server:
const serverApollo = new ApolloServer({
    typeDefs,
    resolvers
});

// Setup Mongoose:
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Successful');
        return serverApollo.listen({ port: 5000 });
    })
    .then(res => { console.log(`Server running on ${res.url}`)});
