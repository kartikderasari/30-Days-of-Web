const userData = [
    {
        name: 'XYZ',
        email: 'xyz@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'ABC',
        email: 'abc@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'PQR',
        email: 'pqr@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Random',
        email: 'random@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Random',
        email: 'random@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Random',
        email: 'random@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Random',
        email: 'random@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Random',
        email: 'random@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Random',
        email: 'random@gmail.com',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
]

userData.forEach(function (user) {
    document.getElementById('main-container').innerHTML += `
    <div class="profile-card">
        <img src="${user.url}" class="profilepicture">
        <h3 class="userName">${user.name}</h3>
        <h5 class="userEmail">${user.email}</h5>
    </div>
    `;
});



