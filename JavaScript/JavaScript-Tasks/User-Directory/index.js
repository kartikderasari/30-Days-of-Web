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

showData();

document.getElementById('addUserButton').addEventListener('click', function (e) {
    e.preventDefault();
    getData();
});

function getData() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let url = document.getElementById('url').value;

    if (name.length > 0 && email.length > 0 && url.length > 0 && email.includes('@') && url.includes('http')) {
        var newUser = {
            name: name,
            email: email,
            url: url
        };
        return addUser(newUser);
    }
    else {
        alert('Please input data in proper format!')
    }
}


function showData() {
    document.getElementById('main-container').innerHTML = '';
    userData.forEach(function (user) {
        document.getElementById('main-container').innerHTML += `
        <div class="profile-card">
            <img src="${user.url}" class="profilepicture">
            <h3 class="userName">${user.name}</h3>
            <h5 class="userEmail">${user.email}</h5>
        </div>
        `;
    });

}
function addUser(newUser) {
    userData.unshift(newUser);
    showData();
    document.getElementById("newUserForm").reset();
}

