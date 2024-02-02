# First Express API

## Express

> https://expressjs.com/

## Loopback

> https://loopback.io/

## Koajs

Focused on middlware, instead of using callback funciton, it uses async, await and Promise.

One of the differences from express is that koa integrates response and require (req, res) into a single unit (ctx).

> https://koajs.com/

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

## Next.js

> https://nextjs.org/

### SSR (SERVER-SIDE-REDERING)

> https://docs.logrocket.com/docs/using-logrocket-with-server-side-rendering

## Middleware

![what's middleware](/images/middleware.png)

Introduction

> https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Express_Nodejs/Introduction

The Express middleware modules listed here are maintained by the Expressjs team.

> https://expressjs.com/en/resources/middleware.html

* Example - CORS

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

### Simple Usage (Enable All CORS Requests)

```js
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```
### Enable CORS for a Single Route

```js
var express = require('express')
var cors = require('cors')
var app = express()

app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

### Configuring CORS

```js
var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

## MVC (MODEL-VIEW-CONTROLLER)

![MVC](/images/mvc.png)

> https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller

