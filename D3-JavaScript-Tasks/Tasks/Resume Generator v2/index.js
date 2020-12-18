var xhttp = new XMLHttpRequest();
xhttp.open("GET", "data.json", true);
xhttp.onload = function () {
    if (this.status == 200) {
        var userData = JSON.parse(xhttp.responseText);
        showData(userData);
    }
}
xhttp.send();

function showData(userData) {

    document.getElementById('name').innerHTML = `<h1>${userData.name}</h1>`;
    document.getElementById('address').innerHTML = userData.address;
    //document.getElementById('dob').innerHTML += userData.dob;

    for (let i = 0; i < userData.socialLinks.length; i++) {
        document.getElementById('socialLinks').innerHTML += `
            <p style="margin: 0;"><a href="${userData.socialLinks[i].url}">${userData.socialLinks[i].url}</a></p>`;
    }

    for (let i = 0; i < userData.education.length; i++) {
        document.getElementById('educationTableBody').innerHTML += `
            <tr>
                <td>${userData.education[i].year}</td>
                <td>${userData.education[i].degree}</td>
                <td>${userData.education[i].institute}</td>
                <td>${userData.education[i].cgpa}</td>
            </tr>`;
    }

    for (let i = 0; i < userData.experience.length; i++) {
        document.getElementById('expContent').innerHTML += `
            <strong>${userData.experience[i].designation}</strong>    
            <p>${userData.experience[i].expBrief}</p>
        `;
    }

    for (let i = 0; i < userData.accomplishments.length; i++) {
        document.getElementById('accomContent').innerHTML += `
            <li> ${userData.accomplishments[i]} </li>`;
    }

    for (let i = 0; i < userData.certScholarship.length; i++) {
        document.getElementById('certContent').innerHTML += `
            <li> ${userData.certScholarship[i]} </li>`;
    }

}

document.getElementById('printResumeButton').addEventListener('click', function (e) {
    window.print();
});