# Working With REST APIs - SpaceX Project

## API version

> /v1/*

## JavaScript Property

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer

> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap


## Query JSON

```json
{
    "query": {},
    "options": {
        "page": 5,
        "limit": 20,
        "populate": [
            {
                "path": "rocket",
                "select": {
                    "name": 1
                }
            },
            {
                "path": "payloads",
                "select": {
                    "customers": 1
                }
            }
        ]
    }
}
```

## Nodejs native dotenv

> https://nodejs.org/en/blog/release/v20.6.0

built-in .env file support
Starting from Node.js v20.6.0, Node.js supports `.env` files for configuring environment variables.

Your configuration file should follow the INI file format, with each line containing a key-value pair for an environment variable. To initialize your Node.js application with predefined configurations, use the following CLI command: `node --env-file=config.env index.js.`

### Information

> https://github.com/motdotla/dotenv/issues/774

Node.js 20.6.0 includes built-in support for .env files
Node v20.6.0+ adds native support for loading .env files.

node --env-file=.env index.js
Wow, cool!

Is dotenv dead? Stop using it? Not so fast. Don't drop dotenv just yet. There are some caveats you should know first.

First, let me say, it is great to see the NodeJS team adopt first-class .env support for developers. As one of the pioneers of dotenv, it's an honor. dotenv is depended on by more than 14 Million open source repos on GitHub alone and downloaded more than 35 Million times per week. dotenv has proven itself as a trusty friend to millions of developers worldwide.

Anyways, let's see how this built-in support works (or skip to the caveats section).

**How it works**

Install Node v20.6.0 or greater using nvm.

```
nvm install 20.6.0
nvm use 20.6.0
node -v
v20.6.0
```

Create your .env file.

```
HELLO="World"
```

Create your node script to make use of it.

```
// index.js
console.log(`Hello ${process.env.HELLO}`)
```

Run it with the --env-file flag.

```
node --env-file=.env index.js
Hello World
That's it!
```



Want to run it in production? Just point it to a .env.production file.

```
.env.production
HELLO="production"
```

node --env-file=.env.production index.js