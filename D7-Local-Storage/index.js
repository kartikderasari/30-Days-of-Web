document.getElementById('setStorageButton').addEventListener('click', setData);
//document.getElementById('deleteStorageButton').addEventListener('click', deleteData);

let users = [];

let deleteData = (index) => {
    let usersData = JSON.parse(localStorage.getItem("usersData"));
    if (window.confirm("Are you sure you want to delete?")) {
        usersData.splice(index, 1);
        localStorage.setItem("usersData", JSON.stringify(usersData));
    }
    printData();
}

let editData = (index) => {
    let newValue = {
        name: "NEWVALUE",
        age: 99
    }
    let usersData = JSON.parse(localStorage.getItem("usersData"));

    if (window.confirm("Are you sure you want to delete?")) {
        usersData.splice(index, 1);
        localStorage.setItem("usersData", JSON.stringify(newValue));
    }
    printData();
}

let printData = () => {
    document.getElementById('result').innerHTML = '';
    let usersData = JSON.parse(localStorage.getItem("usersData"));
    console.log(usersData);

    if (usersData != null) {

        usersData.forEach(user => {
            let i = 0;
            document.getElementById('result').innerHTML +=
                `
        <tr>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>
                <button onclick="deleteData(${i})">Delete</button>
            </td>
        </tr>
        `;
            i++;
        });
    }
}

function setData() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;

    let newData = {
        name: name,
        age: age
    }
    users.unshift(newData);
    localStorage.setItem("usersData", JSON.stringify(users));
    printData();

    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
}

printData();