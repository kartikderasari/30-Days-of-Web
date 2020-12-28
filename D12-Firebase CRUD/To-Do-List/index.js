let calculateTime;

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD-l3Q0I990uYWpUCLtrg0IXBkUvukq-OU",
    authDomain: "fir-crud-ac1a2.firebaseapp.com",
    projectId: "fir-crud-ac1a2",
    storageBucket: "fir-crud-ac1a2.appspot.com",
    messagingSenderId: "728958961071",
    appId: "1:728958961071:web:a5ea00b878cf06766a1b5a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('addTaskButton').addEventListener("click", addTask);

function addTask() {
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
        };
        firebase.firestore().collection('tasks').add(newTaskObj);
    }
    //showData();
}

function showData() {
    firebase.firestore().collection('tasks').onSnapshot(
        docs => {
            document.getElementById('tasks-container').innerHTML = '';
            docs.forEach(doc => {
                document.getElementById('tasks-container').innerHTML +=
                    `<hr class="my-1">
                <div class="col-12 col-lg-5 col-md-5 col-sm-12 textContainer">
                    ${doc.data().taskName}
                </div>
                <div class="col-12 col-lg-7 col-md-7 col-sm-12 btnContainer">
                    <button class="btn m-1 btn-outline-primary btn-sm" id="${doc.id}.ongoing" onclick="updateStatus('${doc.data().taskName}','${doc.id}','ongoing')">Ongoing</button>
                    <button class="btn m-1 btn-outline-success btn-sm" id="${doc.id}.done" onclick="updateStatus('${doc.data().taskName}','${doc.id}','done')">Done</button>
                    <button class="btn m-1 btn-outline-danger btn-sm" id="${doc.id}.abort" onclick="updateStatus('${doc.data().taskName}','${doc.id}','abort')">Abort</button>
                    <span class="fas fa-times-circle" onclick="deleteTask('${doc.id}')"></span>
                </div>`;
                document.getElementById(`${doc.id}.${doc.data().status}`).disabled = true;
            });
        }
    );
    let updateTime = new Date().getTime();
    setInterval(() => {
        document.getElementById('updateTime').innerHTML = calculateTime(updateTime);
    }, 6000);
}

function updateStatus(task, id, status) {
    let updatedTask = {
        taskName: task,
        status: status,
    }
    firebase.firestore().collection('tasks').doc(id).update(updatedTask)
        .then(() => {
            console.log('Doc updated');
        })
        .then(() => showData())
        .catch(e => console.log(e))
}

function deleteTask(id) {
    firebase.firestore().collection('tasks').doc(id).delete().then(() => {
        console.log('Doc Removed');
    }).catch(e => consple.log(e))
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
        result = 'Last updated: Just now';
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
        } else minutes = minutes + ' minutes';

        result = `Last updated: ${hours}  ${minutes} ago`;
        return result;
    }
}

showData();
