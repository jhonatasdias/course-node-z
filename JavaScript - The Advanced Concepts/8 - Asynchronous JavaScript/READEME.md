# JavaScript Advanced Concepts

## Asynchronous

![Node Architecture](/images/Nodejs%20Architecture.png)

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

```js


const animals = {
    lion: 15,
    cat: 5,
    dog: 2,
    bird: 20
}

const { lion, ...rest } = animals;

console.log(lion)
console.log(rest)

const numbers = [1, 2, 3, 4, 5]

function sum(a, b, c, d, e) {
    return a + b + c + d + e;
}

console.log(sum(...numbers))

function objectSpread(p1, p2, p3) {
    console.log(p1)
    console.log(p2)
    console.log(p3)
}

const { cat, ...rest2} = animals;

objectSpread(lion, cat, rest2);

```

## Job Queue

![Job Queue](/images/Job%20Queue.jpg)

```js
// Callback Queue - Task Queue => Simulation Web API
setTimeout(() => {
    console.log('1')
}, 0)

setTimeout(() => {
    console.log('2')
}, 10)

// Job Queue - Microtask Queue
Promise.resolve('3').then((data) => console.log(data))

// General Execution
console.log('4')
```

## Parallel, Sequence, Race

```js
// with block code {} arrow function
const promisify = (item, delay) => {
    return new Promise((resolve) => {
        setTimeout(() =>
            resolve(item)
        , delay)
    })
}

// without block code {} arrow function
const promisify2 = (item, delay) => 
    new Promise((resolve) => 
        setTimeout(() => 
            resolve(item), delay))

const a = () => promisify('a', 100)
const b = () => promisify('b', 5000)
const c = () => promisify('c', 3000)
```

### Parallel

```js
async function parallel() {
    const arrayOfPromises = [a(), b(), c()];
    const [output1, output2, output3] = await Promise.all(arrayOfPromises)
    return `parallel is done ${output1}, ${output2}, ${output3}`
}

parallel().then(data => console.log(data))
```

### Race

```js
async function race() {
    const arrayOfPromises = [a(), b(), c()]
    const output1 = await Promise.race(arrayOfPromises);
    return `race is done ${output1}`
}

race().then(data => console.log(data))
```

### Sequence

```js
async function sequence() {
    const output1 = await a();
    const output2 = await b();
    const output3 = await c();
    return `sequence is done: ${output1}, ${output2}, ${output3}`
}

sequence().then(console.log);
```

## allSettled() (ES2020)

```js
const promiseOne = new Promise((resolve, reject) => 
    setTimeout(resolve, 6000))
const promiseTwo = new Promise((resolve, reject) =>
    setTimeout(reject, 3000))

Promise.allSettled([promiseOne, promiseTwo])
    .then(console.log)
    .catch(e => console.log('something falied', e))

Promise.all(promiseOne, promiseTwo)
    .then(console.log)
    .catch(e => console.log('something falied', e))
```

## any() (ES2021)

Promise.any() resolves if any of the supplied promises is resolved. Below we have 3 promises, which resolves at random times.

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("A"), Math.floor(Math.random() * 1000));
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("B"), Math.floor(Math.random() * 1000));
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("C"), Math.floor(Math.random() * 1000));
});
```

Out of p1, p2 and p3, whichever resolves first is taken by Promise.any().

```js
(async function () {
  const result = await Promise.any([p1, p2, p3]);
  console.log(result); // Prints "A", "B" or "C"
})();
```

What if none of the promises resolve? In that case Promise.any() throws an error!