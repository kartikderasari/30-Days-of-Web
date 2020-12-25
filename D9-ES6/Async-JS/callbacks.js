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

let createPost = (post, callback) => {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

createPost({ title: "Post three", body: "this is post 3!" }, getPosts);