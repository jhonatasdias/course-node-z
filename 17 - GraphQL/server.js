const express = require('express');
const cors = require('cors');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
});
const resolversArray = loadFilesSync('**/*', {
    extensions: ['resolvers.js']
});

async function startApolloServer() {
    const PORT = 3000;
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray
    });

    const server = new ApolloServer({
        schema
    });

    await server.start();

    app.use(cors());
    app.use(express.json());
    
    app.all("/graphql", expressMiddleware(server));
    
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/graphql`);
    })
}

startApolloServer();