let addData = '';
let setData = '';
let showData = '';
let editData = '';
let saveData = '';
let clearAllData = '';
let array = [];

clearAllData = () => {
    localStorage.removeItem("LocalData");
    showData();
    array = [];
}


addData = () => {
    let newValue = {
        name: document.getElementById('name').value,
        no: document.getElementById('no').value
    }
    array.unshift(newValue);
    localStorage.setItem("LocalData", JSON.stringify(array));
    showData();
    document.getElementById('name').value = '';
    document.getElementById('no').value = '';
}

showData = () => {
    if (localStorage.length != 0) {
        let localData = JSON.parse(localStorage.getItem("LocalData"));
        document.getElementById('main-container').innerHTML = '';
        let i = 0;
        localData.forEach(data => {
            document.getElementById('main-container').innerHTML += `
            <div class="contact" id="contact${i}">
                <h3>${data.name}</h3>
                <h5>${data.no}</h5>
                <button id="editButton" onclick="editData(${i})" class="btn">Edit</button>
                <button id="deleteButton" onclick="deleteData(${i})" class="btn">Delete</button>
            </div>`;
            i++;
        });
    } else {
        document.getElementById('main-container').innerHTML = '';
        console.log('Local Storage is Empty');
    }
}

deleteData = (index) => {
    array.splice(index, 1);
    localStorage.setItem("LocalData", JSON.stringify(array));
    showData();
}

editData = (index) => {
    document.getElementById(`contact${index}`).innerHTML = '';
    document.getElementById(`contact${index}`).innerHTML = `
        <div id="contact${index}">
            <h3><input type="text" name="" id="name${index}" placeholder="Edit Name"></h3>
            <h5><input type="text" name="" id="number${index}"  placeholder="Edit Number"></h5>
            <button id="saveButton" onclick="saveData(${index})" class="btn">Save</button>
        </div>`;
}

saveData = (index) => {
    let name = document.getElementById(`name${index}`).value;
    let no = document.getElementById(`number${index}`).value;
    if (name.length == 0 || no.length == 0) {
        return alert('Input proper values');
    }
    let newValue = {
        name: name,
        no: no
    }
    array.splice(index, 1);
    array.unshift(newValue);
    localStorage.setItem("LocalData", JSON.stringify(array));
    showData();
}
showData();