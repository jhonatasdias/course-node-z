# DATABASE

|                | MongoDB            | Postgres         |
|:--------------:|--------------------|------------------|
| Type           | Document           | Relacional       |
| Organized into | Collection         | Tables           |
| Query Language | noSQL              | SQL              |
| Scaling        | Primary Horizontal | Primary Vertical |
| Schema         | Flexible           | Rigid            |

## MongoDB

Validation data

dw9wPWyJLAQh9XAo

## PostgreSQL



## Object–relational impedance mismatch

> https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch


## ACID

> https://www.ibm.com/docs/en/cics-ts/5.4?topic=processing-acid-properties-transactions

## Connectio with database

CIDR = 0.0.0.0/0

> mongodb+srv://brufesdias:<password>@cluster-nasa-project.zo4guy3.mongodb.net/?retryWrites=true&w=majority

## Object Relational Mapping (ORM) vs Object Document Mapping (ODM)

> https://medium.com/spidernitt/orm-and-odm-a-brief-introduction-369046ec57eb

![nosql-driver-odm](../images/nosql-driver-odm.png)

Object modeling

## Knex vs Sequelize (SQL)

> https://stackshare.io/stackups/knex-js-vs-sequelize#:~:text=In%20summary%2C%20Knex.,associations%2C%20migrations%2C%20and%20validations.

In summary, Knex.js is a more flexible and query-focused SQL query builder, while Sequelize is a comprehensive ORM that provides features like model associations, migrations, and validations. Knex.js allows developers more control and flexibility over SQL queries, while Sequelize simplifies the interaction with the database by providing higher-level abstractions. For complex projects requiring advanced database management features, Sequelize is more suitable, whereas Knex.js may be a better choice for projects that prioritize control and flexibility over simplicity.

## Mongoose (noSQL)

### model.find()

> https://mongoosejs.com/docs/api/model.html#Model.find()

```js
// find all documents
await MyModel.find({});

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// executes, name LIKE john and only selecting the "name" and "friends" fields
await MyModel.find({ name: /john/i }, 'name friends').exec();

// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
```

![mongoose](../images/mongoose.png)

```json
{
    "_id": "65c7733eeefc4b71291060c2",
    "keplerName": "Kepler-1652 b",
    "__v": 0
}
```
### _id property

contains date cretion the data

### __v

Version of the schema.

### Understanding async function with MongoDB

First method

```js

async function saveLaunch(newLaunch) {

    const planet = await planetsDatabse.findOne({ // return one object if exist and null if no exist
        keplerName: newLaunch.target
    })

    console.log(planet);

    (...)
}

    // with await the search is complete
    // return is -> null

```

Secound Method

```js

async function saveLaunch(newLaunch) {

    const planet = planetsDatabse.findOne({ // return one object if exist and null if no exist
        keplerName: newLaunch.target
    })

    console.log(planet);

    (...)
}

    // without await the search NO complete
    // return is -> 

    Query {
  _mongooseOptions: {},
  _transforms: [],
  _hooks: Kareem { _pres: Map(0) {}, _posts: Map(0) {} },
  _executionStack: null,
  mongooseCollection: Collection {
    collection: null,
    Promise: [Function: Promise],
    modelName: 'Planet',
    _closed: false,
    opts: {
      autoIndex: true,
      autoCreate: true,
      autoSearchIndex: false,
      schemaUserProvidedOptions: {},
      capped: false,
      Promise: undefined,
      '$wasForceClosed': undefined
    },
    name: 'planets',
    collectionName: 'planets',
    conn: NativeConnection {
      base: [Mongoose],
      collections: [Object],
      models: [Object],
      config: {},
      replica: false,
      options: null,
      otherDbs: [],
      relatedDbs: {},
      states: [Object: null prototype],
      _readyState: 0,
      _closeCalled: false,
      _hasOpened: false,
      plugins: [],
      id: 0,
      _queue: [Array],
      _listening: false
    },
    queue: [],
    buffer: true,
    emitter: EventEmitter {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      [Symbol(kCapture)]: false
    }
  },
  model: Model { Planet },
  schema: Schema {
    obj: { keplerName: [Object] },
    paths: {
      keplerName: [SchemaString],
      _id: [SchemaObjectId],
      __v: [SchemaNumber]
    },
    aliases: {},
    subpaths: {},
    virtuals: { id: [VirtualType] },
    singleNestedPaths: {},
    nested: {},
    inherits: {},
    callQueue: [],
    _indexes: [],
    _searchIndexes: [],
    methods: {},
    methodOptions: {},
    statics: {},
    tree: {
      keplerName: [Object],
      _id: [Object],
      __v: [Function: Number],
      id: [VirtualType]
    },
    query: {},
    childSchemas: [],
    plugins: [ [Object], [Object], [Object], [Object] ],
    '$id': 1,
    mapPaths: [],
    s: { hooks: [Kareem] },
    _userProvidedOptions: {},
    options: {
      strict: true,
      strictQuery: false,
      bufferCommands: true,
      capped: false,
      versionKey: '__v',
      optimisticConcurrency: false,
      minimize: true,
      autoIndex: null,
      discriminatorKey: '__t',
      shardKey: null,
      read: null,
      validateBeforeSave: true,
      validateModifiedOnly: false,
      _id: true,
      id: true,
      typeKey: 'type',
      pluralization: true
    },
    '$globalPluginsApplied': true
  },
  op: 'findOne',
  options: {},
  _conditions: { keplerName: 'Jhonata' },
  _fields: undefined,
  _updateDoc: undefined,
  _path: undefined,
  _distinctDoc: undefined,
  _collection: NodeCollection {
    collection: Collection {
      collection: null,
      Promise: [Function: Promise],
      modelName: 'Planet',
      _closed: false,
      opts: [Object],
      name: 'planets',
      collectionName: 'planets',
      conn: [NativeConnection],
      queue: [],
      buffer: true,
      emitter: [EventEmitter]
    },
    collectionName: 'planets'
  },
  _traceFunction: undefined,
  '$useProjection': true
}

// Probably the search is send for MongoDB Clound, but dont have return the search because there is no async to wait for the database response

```

In the second method, you don't use await with the findOne method. This means that the function will not wait for the database query to complete, and it will proceed with the execution of the rest of the code immediately after sending the query.

The log output you provided for the second method suggests that the planet variable contains a Query object, indicating that the query has been initiated but not completed. This is likely because the function doesn't wait for the query to finish before moving on.

### MongoDB autoincrement

In MongoDB auto increment maybe complexite, because the cluster and your resource the horizontal scaling.

### Testing Mongoose with Jest

> https://mongoosejs.com/docs/jest.html