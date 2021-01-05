let addTask;
let showData;
let updateStatus;
let deleteTask;
let logoutUser;
let showToast;

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})

checkState = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...     
            setUserData(user);
            showData(user);
        } else {
            // User is signed out.
            // ...
            window.location.href = "./index.html";
        }
    });
}

logoutUser = () => {
    console.log('Log out user');
    firebase
        .auth()
        .signOut()
        .then(function () {
            // Sign-out successful.
            console.log('User logged out');
            window.location.href = "./index.html";
        })
        .catch(function (error) {
            console.log(error);
            // An error happened.
        });
}

function setUserData(user) {
    document.getElementById('userAction').setAttribute("src", `${user.photoURL}`);
    let ele = `
                <li>
                    <h5 class="mx-2 my-1">${user.displayName}</h5>
                    <p class="mx-2 my-1"><small class="d-block">${user.email}</small></p>
                </li>                
                <li><button class="btn btn-primary btn-sm mt-2 mb-1 mx-auto" id="logoutButton"
                        onClick="logoutUser()">Logout</button></li>
    `;
    document.getElementById('userContent').innerHTML = ele;
}



addTask = () => {
    document.getElementById('addTaskSpinner').style.display = 'inline-block';
    let user = firebase.auth().currentUser;
    let task = document.getElementById('taskInputField').value;
    let taskStatus = document.getElementById('taskStatus').value;
    let taskNotes = document.getElementById('taskNotes').value;

    document.getElementById('taskInputField').value = "";
    document.getElementById('taskStatus').value = "default";
    document.getElementById('taskNotes').value = "";

    if (task == "" || taskStatus == 'default') {
        alert('Enter some text to add a task!');
    } else {
        let newTaskObj = {
            name: task,
            status: taskStatus,
            notes: taskNotes,
            timeStamp: Date.now()
        };
        firebase.firestore().collection('edata').doc(user.uid).collection('todoData').add(newTaskObj)
            .then(() => showData(user))
            .then(() => showToast('Task added', `<span class="badge bg-primary">${newTaskObj.name}</span> has been added successfully!`))
    }
    document.getElementById('addTaskSpinner').style.display = 'none';
}

let summary = (text, length, doc) => {
    if (text.length >= length) {
        return text.substring(0, length) + showModal(doc.id, doc.data());
    }
    else {
        return text;
    }
}

let updateSummary = (text, length) => {
    if (text.length >= length) {
        let x = text.substring(0, length) + '...';
        return x;
    }
    else {
        return text;
    }
}

showModal = (id, data) => {
    return `
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-link p-0 m-0 btn-lg" data-bs-toggle="modal" data-bs-target="#${CSS.escape(id)}">...</button>
    
    <!-- Modal -->
    <div class="modal fade" id="${id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">${data.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${data.notes}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>            
          </div>
        </div>
      </div>
    </div>`;
}

showData = (user) => {
    firebase.firestore().collection('edata').doc(user.uid).collection('todoData').onSnapshot(
        docs => {
            document.getElementById('tasks-container').innerHTML = '';
            docs.forEach(doc => {
                document.getElementById('tasks-container').innerHTML +=
                    `
                <div class="col-md-4 my-3" >
                    <div class="card">
                        <div class="card-body">
                            <p style="font-size: 120%;" class="card-title my-1">${summary(doc.data().name, 20, doc)}</p>
                            <p class="card-text mb-0 pb-0">${summary(doc.data().notes, 150, doc)}</p>
                        </div>
                        <div class="text-center my-1">
                            <button class="btn m-1 btn-outline-primary btn-sm" id="${doc.id}.ongoing"
                                onclick="updateStatus('${doc.data().name}','${doc.id}', '${doc.data().notes}', 'ongoing')">Ongoing</button>
                            <button class="btn m-1 btn-outline-success btn-sm" id="${doc.id}.done"
                                onclick="updateStatus('${doc.data().name}','${doc.id}', '${doc.data().notes}', 'done')">Done</button>
                            <button class="btn m-1 btn-outline-danger btn-sm" id="${doc.id}.abort"
                                onclick="updateStatus('${doc.data().name}','${doc.id}', '${doc.data().notes}', 'abort')">Abort</button>
                        </div>
                        <div>
                            <small id="updateTime" class=" mx-3 my-3 text-muted">Last updated: ${new
                        Date(doc.data().timeStamp).toLocaleString()}</small>
                        </div>
                        <div class="text-muted text-center p-1 border-top">
                            <button type="button" class="btn btn-sm text-danger" onclick="deleteTask('${doc.id}')"
                                aria-label="Close">Delete</button>
                        </div>
                    </div>
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
    )
}

updateStatus = (task, id, taskNotes, status) => {
    let user = firebase.auth().currentUser;
    let updatedTask = {
        name: task,
        status: status,
        notes: taskNotes,
        timeStamp: Date.now()
    }
    firebase.firestore().collection('edata').doc(user.uid).collection('todoData').doc(id).update(updatedTask)
        .then(() => showData(user))
        .then(() => showToast('Task Status updated', `<b style = "color: #00e676;"> ${updateSummary(updatedTask.name, 15)}</b> Status has been set to ${updatedTask.status} !`))
        .catch(e => console.log(e))
}

deleteTask = (id) => {
    if (confirm('Do you wish to delete the task?')) {
        let user = firebase.auth().currentUser;
        firebase.firestore().collection('edata').doc(user.uid).collection('todoData').doc(id).delete()
            .then(() => { showData(user) })
            .then(() => showToast('Task deleted', 'Task has been removed successfully'))
            .catch(e => console.log(e))
    }
}

showToast = (heading, text) => {

    $(document).ready(function () {
        $('.toast').toast('show');
    });

    document.getElementById('toast-container').innerHTML = `
        <div class="toast-container position-absolute p-3 bottom-0 start-50 translate-middle-x" id = "toastPlacement"  style = "z-index: 1070;" >
            <div class="toast shadow-sm text-white" style="width: auto; background-color: #424242;">
                <div class="toast-body">
                    ${text}
                    <button type="button" class="btn-close btn-close-white ms-auto me-2 mt-auto"
                        data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
        `;
}

checkState();
document.getElementById('addTaskButton').addEventListener("click", addTask);
