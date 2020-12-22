document.getElementById('setStorageButton').addEventListener('click', setData);
document.getElementById('deleteStorageButton').addEventListener('click', deleteData);

let showData = () => {
    let name = localStorage.getItem("Name");
    let age = localStorage.getItem("Age");
    document.getElementById('result').innerHTML =
        `
    Name: ${name} <br>
    Age: ${age}
    `;
}
function setData() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;

    localStorage.setItem("Name", name);
    localStorage.setItem("Age", age);
    console.log('Set Data Running');

    document.getElementById('name').value = '';
    document.getElementById('age').value = '';

    showData();
}

function deleteData() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    localStorage.removeItem("Name");
    localStorage.removeItem("Age");
    document.getElementById('result').innerHTML = '';
}


showData();
