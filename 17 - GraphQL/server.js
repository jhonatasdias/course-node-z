const path = require('path');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync('**/*', {
    extensions: ['graphql']
});
const resolversArray = loadFilesSync('**/*', {
    extensions: ['resolvers.js']
});

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
});

const root = {
    products: require('./products/products.model'),
    orders: require('./orders/orders.model')
};

const app = express();
const PORT = 3000;

app.all("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/graphql`);
})