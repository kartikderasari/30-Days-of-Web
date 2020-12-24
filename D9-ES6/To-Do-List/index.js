const taskList = [
    {
        taskName: 'Demo Task - 1',
        status: 'done',
    },
    {
        taskName: 'Demo Task - 2',
        status: 'ongoing',
    }
];

let addTask;
let showData;
let setOngoingStatus;
let setAbortStatus;
let setDoneStatus;
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
addTask = (newTaskObj) => {
    taskList.unshift(newTaskObj);
    console.log(taskList);
    document.getElementById('taskInputField').value = "";
    showData();
}
showData = () => {
    document.getElementById('taskTableData').innerHTML = '';
    let i = 0;
    taskList.forEach((data) => {
        document.getElementById('taskTableData').innerHTML +=
            `<tr>
                <td class="tasktext">${data.taskName}</td>
                <td>
                    <button class="btn ongoingButton" id="ongoing${i}" onclick="setOngoingStatus(${i})">Ongoing</button>
                    <button class="btn doneButton" id="done${i}" onclick="setDoneStatus(${i})">Done</button>
                    <button class="btn abortButton" id="abort${i}" onclick="setAbortStatus(${i})">Abort</button>
                </td>
            </tr>`;
        document.getElementById(`${data.status}${i}`).disabled = true;
        i++;
    }
    );
}
setOngoingStatus = (index) => {
    taskList[index].status = "ongoing";
    showData();
}
setAbortStatus = (index) => {
    taskList[index].status = "abort";
    showData();
}
setDoneStatus = (index) => {
    taskList[index].status = "done";
    showData();
}
showData();