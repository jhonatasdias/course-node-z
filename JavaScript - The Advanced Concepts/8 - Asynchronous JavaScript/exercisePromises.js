// Solve the questions below:

// #1) Create a promise that resolves in 4 seconds and returns "success" string

const promise = new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 4000)
})

// #2) Run the above promise and make it console.log "success"

promise
  .then( response => {
    console.log(response)
  } )

// #3) Read about Promise.resolve() and Promise.reject(). How can you make
// the above promise shorter with Promise.resolve() and console loggin "success"

/**
 * Creates a new resolved promise.
 * @returns A resolved promise.
 */
//Promise.resolve();

Promise.resolve(
  setTimeout(() => {
    console.log('success');
  }, 4000)
);

/* promise1.then((value) => {
  console.log(value);
})
 */
/**
 * Creates a new rejected promise for the provided reason.
 * @param reason The reason the promise was rejected.
 * @returns A new rejected Promise.
 */
//Promise.reject();

/* function resolved(result){
  console.log('Resolved');
}

function rejected(result){
  console.log(result);
}

Promise.reject(new Error('fail')).then(resolved, rejected); */


// #4) Catch this error and console log 'Ooops something went wrong'

Promise.reject('failed') // reject in terminal always see first
  .catch(console.log)

// #5) Use Promise.all to fetch all of these people from Star Wars (SWAPI) at the same time.
// Console.log the output and make sure it has a catch block as well.
const urls = [
  'https://swapi.dev/api/people/1/',
  'https://swapi.dev/api/people/2/',
  'https://swapi.dev/api/people/3/',
  'https://swapi.dev/api/people/4/'
]

Promise.all(urls.map((url) => {
  return fetch(url).then(res => res.json())
})).then(array => {
  console.log(array[0])
  console.log(array[1])
  console.log(array[2])
  console.log(array[3])
}).catch( error => {
  console.log('ughhh fix it', error)
})

// #6) Change one of your urls above to make it incorrect and fail the promise
// does your catch block handle it?