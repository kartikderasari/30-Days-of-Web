const taskList = [
    {
        taskName: 'Have',
        status: 'done',
    },
    {
        taskName: 'Karo',
        status: 'ongoing',
    }
];

showData();

document.getElementById('addTaskButton').addEventListener("click", () => {
    let task = document.getElementById('taskInputField').value;

    if (task == "") {
        alert('Enter some text to add a task!');
    } else {
        var newTaskObj = {
            taskName: task,
            status: 'ongoing',
        };
        addTask(newTaskObj);
    }
});

function addTask(newTaskObj) {
    taskList.unshift(newTaskObj);
    console.log(taskList);
    document.getElementById('taskInputField').value = "";
    showData();
}


function showData() {
    document.getElementById('taskTableData').innerHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        document.getElementById('taskTableData').innerHTML +=
            `<tr>
                    <td class="tasktext">${taskList[i].taskName}</td>
                    <td>
                        <button class="btn ongoingButton" id="ongoing${i}" onclick="setOngoingStatus(${i})">Ongoing</button>
                        <button class="btn doneButton" id="done${i}" onclick="setDoneStatus(${i})">Done</button>
                        <button class="btn abortButton" id="abort${i}" onclick="setAbortStatus(${i})">Abort</button>
                    </td>
                </tr>`;
        document.getElementById(`${taskList[i].status}${i}`).disabled = true;
    }
}

function setOngoingStatus(index) {
    taskList[index].status = "ongoing";
    showData();
}

function setAbortStatus(index) {
    taskList[index].status = "abort";
    showData();
}
function setDoneStatus(index) {
    taskList[index].status = "done";
    showData();
}