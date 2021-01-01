let showNews;
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => showNews(data))

showNews = (data) => {
    data.forEach(data => {
        document.getElementById('newsContainer').innerHTML +=
            `<div class="news-card">
            <h3 style="margin: 0; margin-top: 10px;">${data.title}</h3>
            <p style="margin: 5px 0;"> ${data.body} </p>
            <button style="margin: 10px 0; background-color: #007BFF; color: white; border-radius: 5px; padding: 5px;">Read
                more</button>
            </div>`;
    })
}