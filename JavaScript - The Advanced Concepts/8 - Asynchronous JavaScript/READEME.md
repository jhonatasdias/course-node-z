# JavaScript Advanced Concepts

## Asynchronous

### Call Stack 



### Memory Heap

### Memory Leak

### Web API

> DOM

> fetch()

> setTimeout()

> AJAX

## Promise

A promise is an object that may produce a single value some time in the future either a resolved value, or a reson that it's not resolved (rejected)

> fullfield, rejected, pending

> Promise.all()

Creates a Promise that is resolved with an array of results when all of the provided Promises
resolve, or rejected when any Promise is rejected. => atention here, only one Promise is necessery for rejected the all Promise

## ASYNC / AWAIT => PROMISE

```js
const movePlayer = new Promise()

movePlayer(100, 'Left')
    .then(() => movePlayer(400, 'Left'))
    .then(() => movePlayer(10, 'Right'))
    .then(() => movePlayer(330), 'Left')

async function playerStart(){
    const firstMove = await movePlayer(100, 'Left');
    const segundMove = await movePlayer(400, 'Left'); // or use here const, developing code with the variable loses the chained form of the function (wait for one to finish before stating the next)
    await movePlayer(10, 'Right');
    await movePlayer(330, 'Left'); 
}
```

```js

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(console.log)

async function fetchUsers(){
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data);
}

const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
]

const getData = async function() {
    
    try {
        const [users, posts, albums] = await Promise.all(urls.map(url => 
            fetch(url).then(res => res.json())
        ))
        console.log('users', users)
        console.log('posts', posts)
        console.log('albums', albums)
    } catch (error) {
        console.log('Ohhh:', error);
    }

}

getData();

const getData2 = async function() {
    
    try {
        const arrayOfPromises = await Promise.all(urls.map(url => 
            fetch(url))
        )
        for await (let request of arrayOfPromises){
            const data = await request.json()
            console.log(data)
        }
    } catch (error) {
        console.log('Ohhh:', error);
    }

}

```


## Object Spread Operator (ES2018)

