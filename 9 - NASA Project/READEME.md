# NASA Project

## express.json([options])

> https://expressjs.com/en/api.html#express.json

## NPM command projects

> "watch": "nodemon src/server.js"

> "server": "cd server && npm run watch"

> "client": "cd client && npm start"

### Project file

```json
{
    "scripts": {
    "install-server": "npm install --prefix server",
    "install-client": "npm install --prefix client",
    "install": "npm run install-server && npm run install-client",
    "server": "npm run watch --prefix server",
    "client": "npm start --prefix client",
    "watch": "npm run server & npm run client",
    "test": "npm run test --prefix server && npm run test --prefix server"
  }
}
```

### build otimizeted production

```json
{
    "scripts": {
    "start": "react-scripts start",
    "build": "set BUILD_PATH=../server/public&& react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## Middleware Morgan

> https://www.npmjs.com/package/morgan

Create a new morgan logger middleware function using the given format and options. The format argument may be a string of a predefined name (see below for the names), a string of a format string, or a function that will produce a log entry.

The format function will be called with three arguments tokens, req, and res, where tokens is an object with all defined tokens, req is the HTTP request and res is the HTTP response. The function is expected to return a string that will be the log line, or undefined / null to skip logging.

Using a predefined format string

> morgan('tiny')

Using format string of predefined tokens

> morgan(':method :url :status :res[content-length] - :response-time ms')

Using a custom format function

```js
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})
```