// Solve the below problems:

// #1) Convert the below promise into async await
fetch('https://swapi.dev/api/starships/9/')
  .then(response => response.json())
  .then(console.log)

async function dataStarShips() {
  const res = await fetch('https://swapi.dev/api/starships/9/')
  const data = await res.json()
  console.log(data);
}

dataStarShips();

// #2) ADVANCED: Update the function below from the video to also have
// async await for this line: fetch(url).then(resp => resp.json())
// So there shouldn't be any .then() calls anymore!
// Don't get discouraged... this is a really tough one...
const urls1 = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

const getData = async function() {
  const [ users, posts, albums ] = await Promise.all(urls.map(async function(url){
    const res = await fetch(url);
    return res.json()
  }
  ));
  console.log('users', users);
  console.log('posta', posts);
  console.log('albums', albums);
}

// #3)Add a try catch block to the #2 solution in order to catch any errors. // Now, use the given array containing an invalid url, so you console.log  //your error with 'oooooops'.
const urls2 = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholdeTYPO.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums'
]

async function placeHolderData(){
  try {
    const [users, posts, albums] = await Promise.all(urls2.map(url => 
      fetch(url).then( res => res.json() )
    ))
    console.log(users)
    console.log(posts)
    console.log(albums)
  } catch (error) {
    console.log('oooooops')
  }
}