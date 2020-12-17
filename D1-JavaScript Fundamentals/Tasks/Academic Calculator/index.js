var studentData = [];

//TODO: Hide studentData if empty
/* if (studentData.length <= 0) {
    document.getElementById('studentData').classList.add("hide");
}
 */

document.getElementById('addStudentButton').addEventListener('click', e => {
    e.preventDefault();
    addStudentData();
});

function getStudentData() {
    let name = document.getElementById('name').value;
    let age = parseInt(document.getElementById('age').value);
    let physics = parseInt(document.getElementById('physics').value);
    let chemistry = parseInt(document.getElementById('chemistry').value);
    let maths = parseInt(document.getElementById('maths').value);
    let totalMarks = physics + chemistry + maths;
    let percentage = totalMarks / 3;

    if (name.length > 0 || age >= 0 || physics >= 0 || chemistry >= 0 || maths >= 0) {
        return {
            name: name,
            age: age,
            physics: physics,
            chemistry: chemistry,
            maths: maths,
            totalMarks: totalMarks,
            percentage: percentage
        }
    } else {
        alert('Input Data is not in proper format, please check again :)');
    }



}

function addStudentData() {
    studentData.unshift(getStudentData());
    printData();
    document.getElementById("studentDataForm").reset();
};

function printData() {
    document.getElementById('studentTableBody').innerHTML = ''

    for (let i = 0; i < studentData.length; i++) {
        document.getElementById('studentTableBody').innerHTML +=
            `
        <tr class="tableRow">
            <td class="tableData">${studentData[i].name}</td>
            <td class="tableData">${studentData[i].age}</td>
            <td class="tableData">${studentData[i].physics}</td>
            <td class="tableData">${studentData[i].chemistry}</td>
            <td class="tableData">${studentData[i].maths}</td>
            <td class="tableData">${studentData[i].totalMarks}</td>
            <td class="tableData">${studentData[i].percentage}</td>
            <td ><button onclick="deleteRow(${i})">Delete</td>
        </tr>
        `
    }
}

function deleteRow(index) {
    if (confirm('Are you sure if you want to perform this action?')) {
        studentData.splice(index, 1);
    }
    printData();
}

