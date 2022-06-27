// Tutorial Video:
// https://www.youtube.com/watch?v=n1mdAPFq2Os&t=8s

// Dependencies:
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose'); // Lets us interface with MongoDB.

// Other:
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

// Setup Apollo Server:
const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});
00
// Setup Mongoose:
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Successful');
        return serverApollo.listen({ port: 5000 });
    })
    .then(res => { console.log(`Server running on ${res.url}`)});
