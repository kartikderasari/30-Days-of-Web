let countryData = [];
let showGlobalData;
let showCountryData;

fetch('https://coronavirus-19-api.herokuapp.com/countries')
    .then((res) => res.json())
    .then((data) => countryData = data)
    .then(() => showCountryData(countryData))

fetch('https://coronavirus-19-api.herokuapp.com/all')
    .then((res) => res.json())
    .then((data) => showGlobalData(data))

showGlobalData = (data) => {
    document.getElementById('subglobalcontainer').innerHTML = `
    <div class="globalContainer" id="globalContainer">
            <h2>Global COVID Information</h2>
            <p>Cases: ${data.cases} | Deaths: ${data.deaths} | Recovered: ${data.recovered}</p>
    </div>`;
}

showCountryData = (data) => {

    for (let i = 1; i < data.length; i++) {
        document.getElementById('subcountrycontainer').innerHTML +=
            `<tr>
            <td>${data[i].country}</td>
            <td>${data[i].cases}</td>
            <td>${data[i].todayCases}</td>
            <td>${data[i].deaths}</td>
            <td>${data[i].todayDeaths}</td>
            <td>${data[i].recovered}</td>
    </tr>`;
    }
}

