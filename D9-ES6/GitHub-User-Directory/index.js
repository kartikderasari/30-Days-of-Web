let showData;
fetch('https://api.github.com/users')
    .then((res) => res.json())
    .then((data) => showData(data))
showData = (userData) => {
    document.getElementById('main-container').innerHTML = '';
    userData.forEach((user) => {
        document.getElementById('main-container').innerHTML += `
        <div class="profile-card">
            <img src="${user.avatar_url}" class="profilepicture">
            <h3 class="userName">${user.login}</h3>
        </div>
        `;
    });
}
