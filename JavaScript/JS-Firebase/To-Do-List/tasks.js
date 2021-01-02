let calculateTime;
let addTask;
let showData;
let updateStatus;
let deleteTask;

addTask = () => {
    let task = document.getElementById('taskInputField').value;
    let taskStatus = document.getElementById('taskStatus').value;
    document.getElementById('taskInputField').value = "";
    document.getElementById('taskStatus').value = "default";

    if (task == "" || taskStatus == 'default') {
        alert('Enter some text to add a task!');
    } else {
        let newTaskObj = {
            taskName: task,
            status: taskStatus,
            timeStamp: Date.now()
        };
        firebase.firestore().collection('tasks').add(newTaskObj);
    }
    showData();
}

showData = () => {
    firebase.firestore().collection('tasks').onSnapshot(
        docs => {
            document.getElementById('tasks-container').innerHTML = '';
            docs.forEach(doc => {
                document.getElementById('tasks-container').innerHTML +=
                    `<hr class="my-1">
                <div class="col-12 col-lg-5 col-md-5 col-sm-12 textContainer">
                    ${doc.data().taskName}
                    <small id="updateTime" class="my-0 d-block text-muted">Last updated: ${new Date(doc.data().timeStamp).toLocaleString()}</small>
                </div>
                <div class="col-12 col-lg-7 col-md-7 col-sm-12 btnContainer">
                    <button class="btn m-1 btn-outline-primary btn-sm" id="${doc.id}.ongoing" onclick="updateStatus('${doc.data().taskName}','${doc.id}','ongoing')">Ongoing</button>
                    <button class="btn m-1 btn-outline-success btn-sm" id="${doc.id}.done" onclick="updateStatus('${doc.data().taskName}','${doc.id}','done')">Done</button>
                    <button class="btn m-1 btn-outline-danger btn-sm" id="${doc.id}.abort" onclick="updateStatus('${doc.data().taskName}','${doc.id}','abort')">Abort</button>
                    <span class="fas fa-times-circle" onclick="deleteTask('${doc.id}')"></span>
                </div>`;
                document.getElementById(`${doc.id}.${doc.data().status}`).disabled = true;
                if (doc.data().status == 'ongoing') {
                    document.getElementById(`${doc.id}.${doc.data().status}`).classList.remove('btn-outline-primary');
                    document.getElementById(`${doc.id}.${doc.data().status}`).classList.add('btn-primary');
                }
                else if (doc.data().status == 'done') {
                    document.getElementById(`${doc.id}.${doc.data().status}`).classList.remove('btn-outline-success');
                    document.getElementById(`${doc.id}.${doc.data().status}`).classList.add('btn-success');
                }
                else if (doc.data().status == 'abort') {
                    document.getElementById(`${doc.id}.${doc.data().status}`).classList.remove('btn-outline-danger');
                    document.getElementById(`${doc.id}.${doc.data().status}`).classList.add('btn-danger');
                }
            });
        }
    );
}

updateStatus = (task, id, status) => {
    let updatedTask = {
        taskName: task,
        status: status,
        timeStamp: Date.now()
    }
    firebase.firestore().collection('tasks').doc(id).update(updatedTask)
        .then(() => showData())
        .catch(e => console.log(e))
}

deleteTask = (id) => {
    firebase.firestore().collection('tasks').doc(id).delete().then(() => { showData(); }).catch(e => console.log(e))
}

calculateTime = (updateTime) => {
    let currentTime = new Date().getTime();
    let timeInMS = currentTime - updateTime;
    let milliseconds = parseInt((timeInMS % 1000) / 100),
        seconds = Math.floor((timeInMS / 1000) % 60),
        minutes = Math.floor((timeInMS / (1000 * 60)) % 60),
        hours = Math.floor((timeInMS / (1000 * 60 * 60)) % 24);
    let result;
    if (hours == 0 && minutes == 0 && seconds <= 60) {
        //result = 'Last updated: Just now';
        result = `Last updated ${seconds} seconds ago`;
        return result;
    }
    else {
        if (hours == 0) {
            hours = '';
        } else {
            hours = hours + ' hours';
        }
        if (minutes == 0) {
            minutes = '';
        } else if (minutes == 1) minutes = minutes + ' minute';
        else minutes = minutes + ' minutes';
        result = `Last updated: ${hours}  ${minutes} ago`;
        return result;
    }
}

document.getElementById('addTaskButton').addEventListener("click", addTask);
showData();
