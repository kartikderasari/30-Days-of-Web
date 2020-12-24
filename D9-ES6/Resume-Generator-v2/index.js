/* 
// AJAX Implementation of JSON GET Request
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "data.json", true);
xhttp.onload = function () {
    if (this.status == 200) {
        var userData = JSON.parse(xhttp.responseText);
        showData(userData);
    }
}
xhttp.send();*/

let showData;

//Fetch Implementation of JSON GET Request
fetch('data.json')
    .then((res) => res.json())
    .then((data) => { showData(data) })

showData = (userData) => {

    document.getElementById('name').innerHTML = `<h1>${userData.name}</h1>`;
    document.getElementById('address').innerHTML = userData.address;

    userData.socialLinks.forEach((data) => {
        document.getElementById('socialLinks').innerHTML += `
        <p style="margin: 0;"><a href="${data.url}">${data.url}</a></p>`;
    }
    );

    userData.education.forEach((data) => {
        document.getElementById('educationTableBody').innerHTML += `
        <tr>
                <td>${data.year}</td>
                <td>${data.degree}</td>
                <td>${data.institute}</td>
                <td>${data.cgpa}</td>
            </tr>`;
    }
    );

    userData.experience.forEach((data) => {
        document.getElementById('expContent').innerHTML += `
        <strong>${data.designation}</strong>    
        <p>${data.expBrief}</p>`;
    }
    );

    userData.accomplishments.forEach((data) => {
        document.getElementById('accomContent').innerHTML += `
            <li> ${data} </li>`;
    }
    );

    userData.certScholarship.forEach((data) => {
        document.getElementById('certContent').innerHTML += `
            <li> ${data} </li>`;
    }
    );
}

document.getElementById('printResumeButton').addEventListener('click', function (e) {
    window.print();
});