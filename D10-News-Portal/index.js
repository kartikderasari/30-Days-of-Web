let showNewsData;
let showWeatherData;
let getLocation;
let calculateTime;
let searchArticles;
let setCountries;
let indianCategoryNews;
let defaultIndiaNews;
let searchGlobalNews;
let showCategory;
let getAQI;
let countries = {
    ar: "Argentina",
    au: "Australia",
    at: "Austria",
    be: "Belgium",
    br: "Brazil",
    bg: "Bulgaria",
    ca: "Canada",
    cn: "China",
    co: "Colombia",
    cu: "Cuba",
    cz: "Czech Republic",
    eg: "Egypt",
    fr: "France",
    de: "Germany",
    gr: "Greece",
    hk: "Hong Kong",
    hu: "Hungary",
    in: "India",
    id: "Indonesia",
    ie: "Ireland",
    il: "Israel",
    it: "Italy",
    jp: "Japan",
    lt: "Lithuania",
    my: "Malaysia",
    mx: "Mexico",
    ma: "Morocco",
    nl: "Netherlands",
    nz: "New Zealand",
    ng: "Nigeria",
    no: "Norway",
    ph: "Philippines",
    pl: "Poland",
    pt: "Portugal",
    ro: "Romania",
    ru: "Russia",
    sa: "Saudi Arabia",
    rs: "Serbia",
    sg: "Singapore",
    sk: "Slovakia",
    si: "Slovenia",
    za: "South Africa",
    kr: "South Korea",
    se: "Sweden",
    ch: "Switzerland",
    tw: "Taiwan",
    th: "Thailand",
    tr: "Turkey",
    ae: "UAE",
    ua: "Ukraine",
    gb: "United Kingdom",
    us: "United States",
    ve: "Venuzuela"
};

let categories = {
    business: "Business",
    entertainment: "Entertainment",
    health: "Health",
    science: "Science",
    sports: "Sports",
    technology: "Technology"
}

let baseURL = 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/';

//Functions-for-India

defaultIndiaNews = () => {
    document.getElementById('india-news-header').innerHTML = 'Top stories - India';
    fetch(baseURL + 'top-headlines?country=in&apiKey=ad6415a1feba413a966465c21c3a2e83')
        .then(res => res.json())
        .then(data => showNewsData(data.articles, 'india-news-container'))
}

showCategory = () => {
    document.getElementById('category-container').innerHTML = `<button onclick="defaultIndiaNews()" class="btn btn-outline-success btn-sm mx-1 my-1">All</button>`;
    for (category in categories) {
        document.getElementById('category-container').innerHTML += `<button onclick="indianCategoryNews('${category}')" class="btn btn-outline-success btn-sm mx-1 my-1">${categories[category]}</button>`;
    }
}

indianCategoryNews = (category) => {
    document.getElementById('india-news-header').innerHTML = `Top ${category} stories - India`;
    fetch(baseURL + `top-headlines?country=in&category=${category}&apiKey=ad6415a1feba413a966465c21c3a2e83`)
        .then(res => res.json())
        .then(data => showNewsData(data.articles, 'india-news-container'))
}

//Functions-for-World

let defaultWorld = () => {
    document.getElementById('globalSearchHeader').innerHTML = '';
    document.getElementById('global-news-container').innerHTML = '';
};

setOptions = () => {
    for (country in countries) {
        document.getElementById('countryGroupSelect').innerHTML += `<option value="${country}">${countries[country]}</option>`;
    };
    for (category in categories) {
        document.getElementById('categoryGroupSelect').innerHTML += `<option value="${category}">${categories[category]}</option>`;
    };
}

searchGlobalNews = () => {

    let country = document.getElementById('countryGroupSelect').value;
    let category = document.getElementById('categoryGroupSelect').value;

    document.getElementById('global-news-container').innerHTML = '';
    let header = `Top ${category} stories - ${countries[country]}`;

    if (country != 'default' && category != 'default') {
        document.getElementById('globalSearchHeader').innerHTML = header;
        fetch(baseURL + `top-headlines?country=${country}&category=${category}&apiKey=ad6415a1feba413a966465c21c3a2e83`)
            .then(res => res.json())
            .then(data => showNewsData(data.articles, 'global-news-container'))

        document.getElementById('countryGroupSelect').value = 'default';
        document.getElementById('categoryGroupSelect').value = 'default';
    } else {
        console.log('Input Data');
    }
}

//Functions-for-Search-Articles

let defaultSearchForArticle = () => {
    document.getElementById('searchHeader').innerHTML = '';
    document.getElementById('searchArticleContainer').innerHTML = '';
}

searchArticles = () => {
    document.getElementById('searchArticleContainer').innerHTML = '';
    let query = document.getElementById('searchArticlesInput').value;
    let header = `Showing search results for ${query}`;

    document.getElementById('searchArticlesInput').value = '';

    if (query.length != 0) {
        document.getElementById('searchHeader').innerHTML = header;
        fetch(baseURL + `everything?q='${query}'&apiKey=ad6415a1feba413a966465c21c3a2e83`)
            .then(res => res.json())
            .then(data => showNewsData(data.articles, 'searchArticleContainer'))
    } else {
        console.log('Input Data');
    }
}

//Common-Functions

getLocation = () => {
    let options = {
        enableHighAccuracy: true,
        timeout: 50000,
    }
    let error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eb0896e08753ba41a1fdec0668d261c0&units=metric`)
                    .then(res => res.json())
                    .then(data => showWeatherData(data))
            }
            , error, options);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

calculateTime = (timePublished) => {
    let a = new Date();
    let b = new Date(timePublished);
    let timeInMS = a - b;
    let milliseconds = parseInt((timeInMS % 1000) / 100),
        seconds = Math.floor((timeInMS / 1000) % 60),
        minutes = Math.floor((timeInMS / (1000 * 60)) % 60),
        hours = Math.floor((timeInMS / (1000 * 60 * 60)) % 24);

    if (hours == 0) {
        return hours = '';
    } else hours = hours + ' hours';

    if (minutes == 0) {
        return minutes = '';
    } else minutes = minutes + ' minutes';

    return `${hours}  ${minutes} ago`;
}

showNewsData = (allData, id) => {
    document.getElementById(`${id}`).innerHTML = '';
    allData.forEach(
        (data) => {
            document.getElementById(`${id}`).innerHTML +=
                `<div class="headline-card my-3 card">
            <div class="row no-gutters">
                <div class="col-md-4 my-auto">
                <img src="${data.urlToImage}" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                            <h4 class="card-title my-0">${data.title}</h4>
                            <small class="text-muted">${data.source.name} | ${calculateTime(data.publishedAt)} </small>
                            <p class="card-text">${data.description}</p>
                            <a class="btn btn-outline-primary btn-sm" href="${data.url}" target="_blank">View full coverage</a>
                        </div>
                </div>
            </div>
        </div>`;
        }
    );
}

/* <div class="headline-card my-3 card">                
                <div class="card-body">
                    <h4 class="card-title my-0">${data.title}</h4>
                    <small class="text-muted">${data.source.name} | ${calculateTime(data.publishedAt)} </small>
                    <p class="card-text">${data.description}</p>
                    <a class="btn btn-outline-primary btn-sm" href="${data.url}" target="_blank">View full coverage</a>
                </div>
            </div> */




showWeatherData = (data) => {
    document.getElementById('weather-container').innerHTML = `
    <div class="headline-header">
        <h5>Weather</h5>
        <div class="headline-card my-3 card" style="background-color: #F8F9FA;">
            <div class="card-body">
                <h6 class="card-title my-0" id="city-name">${data.name}</h6>
                <hr>
                <p>     
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <p class="h4 my-0 py-0">${data.main.temp} &deg; <small>C</small></p>
                    <p>${data.weather[0].main}</p>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <ul class="list-unstyled my-0">
                        <li class="text-muted small"> Min/Max: ${data.main.temp_min}/${data.main.temp_max} </li>
                        <li class="text-muted small">Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</li>
                        <li class="text-muted small">Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</li>
                    </ul>
                    </div>
                </div>                                                                                                  
                </p>
                <a class="btn btn-outline-primary btn-sm" href="https://openweathermap.org/"> <small>More on openweathermap.org</small></a>
            </div>
        </div>
    </div>`;
}

//Default-Function-Calls

defaultIndiaNews();
getLocation();
setOptions();
showCategory();