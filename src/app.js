const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');

const app = express()

// app.use('/', (req, res) => {
//     res.json({
//         message: 'welcome'
//     })
// });

app.use('/graphql', graphqlHttp({
    schema: schema,
    graphiql: true

}));

module.exports = app;
