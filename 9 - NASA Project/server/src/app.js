const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')
const planetsRouter = require('./routes/planets/planets.router');

const app = express();

// Midlleware

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(morgan("combined"));


/**
 * This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
 * 
 * Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. 
 * This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
 * 
 * A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), 
 * or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
 */
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))

app.use('/planets', planetsRouter);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

module.exports = app;

// C:\Users\engjh\OneDrive\Documentos\1 - Projects-GitHub\course-node-z\9 - NASA Project\server\public 