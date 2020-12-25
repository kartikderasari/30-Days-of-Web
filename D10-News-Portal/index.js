let showNewsData;
fetch('')
    .then(res => res.json())
    .then(data => showNewsData(data.articles, 'india-news-container'))

showNewsData = (allData, id) => {
    document.getElementById(`${id}`).innerHTML = '';
    allData.forEach(
        (data) => {
            document.getElementById(`${id}`).innerHTML += `
            <div class="headline-card my-3 card">                
                <div class="card-body">
                    <h4 class="card-title my-0">${data.title}</h4>
                    <small class="text-muted">${data.source.name} | 31 minutes ago</small>
                    <p class="card-text">${data.description}</p>
                    <a class="btn btn-primary btn-sm" href="${data.url}" target="_blank">View full coverage</a>
                </div>
            </div>
            `;
        }
    );
}


