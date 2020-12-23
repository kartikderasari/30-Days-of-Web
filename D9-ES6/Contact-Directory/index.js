const userData = [
    {
        name: 'Vrijraj',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Varsha',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Nikita',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Aayush',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Priya',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Priyal',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'Amen',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'XYZ',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
    {
        name: 'ABC',
        mobNumber: '9874541245',
        url: 'https://avatars1.githubusercontent.com/u/40170425?s=460&u=5f4e8068e8eaa19df908d03008fbf534b81bce1b&v=4',
    },
];

let showData;
let searchData;

showData = (user) => {
    document.getElementById('main-container').innerHTML += `
    <div class="profile-card">
        <img src="${user.url}" class="profilepicture">
        <h3 class="userName">${user.name}</h3>
        <h5 class="usermobNumber">${user.mobNumber}</h5>
    </div>
    `;
};

searchData = (keyWord) => {

    var searchUserData = userData.filter(
        function (data) {
            return data.name == keyWord || data.mobNumber == keyWord;
        }
    );
    document.getElementById('main-container').innerHTML = '';
    searchUserData.forEach(function (searchUser) {
        showData(searchUser);
    });

};

userData.forEach(function (user) {
    showData(user);
});

document.getElementById('searchBox').addEventListener("keyup", () => {
    let key = document.getElementById('searchBox').value;

    if (key !== "") {
        searchData(key);
    } else {
        document.getElementById('main-container').innerHTML = '';
        userData.forEach(function (user) {
            showData(user);
        });
    }

});
