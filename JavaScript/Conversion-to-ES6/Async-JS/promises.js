const posts = [
    {
        title: "Post one",
        body: "this is post one!"
    },
    {
        title: "Post two",
        body: "this is post two!"
    }
];

let getPosts = () => {
    setTimeout(
        () => {
            let output = '';
            posts.forEach(post => {
                output += `<li>${post.title}</li>`;
            });
            document.body.innerHTML = output;
        },
        1000);
}

let createPost = (post) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            let error = false;
            if (!error) {
                resolve();
            } else {
                reject('Something went wrong!');
            }
        }, 2000);
    });
}

//Async & Await

/* let init = async () => {
    await createPost({ title: "Post three", body: "This is post three" });
    getPosts();
};

init(); */

//Async & Await with fetch 

let fetchData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data);
}

fetchData();

//Promises
/* createPost({ title: "Post three", body: "This is post three" })
    .then(getPosts)
    .catch(err => console.log(err))

const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Goodbye');
});
const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

Promise.all([promise1, promise2, promise3, promise4])
    .then((values) => console.log(values)); */

