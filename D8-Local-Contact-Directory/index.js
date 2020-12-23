let addData = '';
let setData = '';
let showData = '';
let editData = '';
let saveData = '';
let clearAllData = '';
let arr = [];

if (localStorage.length != 0) {
    arr = JSON.parse(localStorage.getItem("LocalData"));
}

clearAllData = () => {
    localStorage.removeItem("LocalData");
    showData();
    arr = [];
}


addData = () => {
    let newValue = {
        name: document.getElementById('name').value,
        no: document.getElementById('no').value
    }
    arr.unshift(newValue);
    localStorage.setItem("LocalData", JSON.stringify(arr));
    showData();
    document.getElementById('name').value = '';
    document.getElementById('no').value = '';
}

showData = () => {
    if (localStorage.length != 0) {
        let localData = JSON.parse(localStorage.getItem("LocalData"));
        document.getElementById('contact-container').innerHTML = '';
        let i = 0;
        localData.forEach(data => {
            document.getElementById('contact-container').innerHTML += `
            
        <tr id="contact${i}">
            <td>${data.name}</td>
            <td>${data.no}</td>
            <td style="text-align: end;"><button id="editButton" onclick="editData(${i})" class="btn">Edit</button>
             <button id="deleteButton" onclick="deleteData(${i})" class="btn">Delete</button></td>
        </tr>`;
            i++;
        });
    } else {
        document.getElementById('contact-container').innerHTML = '';
        console.log('Local Storage is Empty');
    }
}

deleteData = (index) => {
    arr.splice(index, 1);
    localStorage.setItem("LocalData", JSON.stringify(arr));
    showData();
}

editData = (index) => {
    document.getElementById(`contact${index}`).innerHTML = '';
    document.getElementById(`contact${index}`).innerHTML = `
        <tr id="contact${index}">
            <td><input type="text" id="name${index}" value="${arr[index].name}" placeholder="Edit Name"></td>
            <td><input type="text" id="number${index}" value="${arr[index].no}" placeholder="Edit Number"></td>
            <tr>
                <td><button id="saveButton" onclick="saveData(${index})" class="btn">Save</button></td>
            </tr>          
        </tr>`;
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
    arr.splice(index, 1);
    arr.unshift(newValue);
    localStorage.setItem("LocalData", JSON.stringify(arr));
    showData();
}
showData();

