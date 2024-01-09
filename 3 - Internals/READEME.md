# Fundamentals: Internals

## What Node.js Includes

Node.js APIs (fs, http, path, crypto), V8 engine and libuv are the two most important internal component of Node.js.

That's because Libuv deals with input and output tasks. This is tasks that Node can delegateto other parts of your operating system.

![What does Node.js do?](/images/What%20does%20Nodejs%20do.jpg)

![Process Client and Server](/images/process%20cliente%20server.png)

## Node Internal Deep Dive

Node API (fs, http, path, crypto and more)

> https://github.com/nodejs/node/tree/main/lib

Node C++ language

> https://github.com/nodejs/node/tree/main/src

## Libuv Internals Deep Dive

Libuv is used for any OS (Operating System)

Libuv for Unix (Linux and MacOS)

> https://github.com/libuv/libuv/tree/v1.x/src/unix

Libuv for Windows

> https://github.com/libuv/libuv/tree/v1.x/src/win

## Synchronous vs Asynchronous

### Synchroous 

```js
// Synchronous
console.log('🐇 finished'); // 1° code - fineshed first
console.log('🐢 fineshed'); // 2° code - fineshed second
```

### Asynchronous

```js
// Asynchronous
setTimeout(() => {
    console.log('🐇 finished'); // 1° code - finshed second
}, 1000);
console.log('🐢 fineshed'); // 2° code - fineshed first
```

Is JavaScript Asynchronous?

The JavaScript is a language synchronous but too bahave asynchronous way. Only works thanks to libuv that functionaly not part of core JavaScipt language.

## Event Loop

What happens when you run a Node.js Program?

when we run our Node.js app it creates

1 Process 🤖

1 Thread 🧵

1 Event Loop ➰

A process is an executing program or a part of an executing program. An application can be made out of many processes. Node.js runtime, however, initiates only one process.

A thread is a basic unit to which the operating system allocates processor time. Think of threads as a unit that lets you use part of your processor.

### What is the Event Loop?

The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.

Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed. We'll explain this in further detail later in this topic.

> https://nodejs.org/en/guides/event-loop-timers-and-nexttick

> https://nodejs.org/en/guides/dont-block-the-event-loop

### Phases of the Event Loop

Event Loop Phases:

* Timers = 
    * setTimeout()
    * setInternal()
    * setImmediate()


* I/O callbacks = responsability for all asynchronous operations I/O system
* setImmediate
* Close callbacks

## Comparing Node with PHP and Python

### PHP

PHP is a synchronous programming language with multi-threaded blocking I/O processing in terms of technology. On the server-side, PHP is executed by an interpreter – Zend Engine, working with Nginx and Apache servers. Without having access to the original code, the client-side waits until it receives the results of a script being processed, and no other code lines are executed until the previous result is received.

### Puthon

Python has some similarities with PHP from the past, however this has changed over time and become closer to how Node works.

### Node.js

Node have Single-thread, Callbacks Queue and Event Loop, works asynchronous and not-blocking.

Node don't is good machine learn

## Observer Design Pattern

Subject

Observer
