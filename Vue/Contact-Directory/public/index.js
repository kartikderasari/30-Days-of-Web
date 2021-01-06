// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCLINRfMeRmhJucwOuz9UH_GaWfZxRT1Ug",
    authDomain: "my-contact-directory.firebaseapp.com",
    projectId: "my-contact-directory",
    storageBucket: "my-contact-directory.appspot.com",
    messagingSenderId: "596130865920",
    appId: "1:596130865920:web:b852dcb8c4f302f50509e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app = new Vue({
    el: '#app',
    data: {
        userData: [],
        userLoggedIn: false,
        name: '',
        number: null,
        updateFlag: false,
        updatedName: '',
        updatedContact: null,
        showDataLoad: false,
    },
    methods: {
        showData() {
            this.showDataLoad = true;
            this.userData = [];
            let user = firebase.auth().currentUser;
            firebase.firestore().collection("users").doc(user.uid).collection("contacts").get()
                .then(docs => {
                    docs.forEach(doc => {
                        this.userData.push({ id: doc.id, ...doc.data() })
                        this.showDataLoad = false;
                    })
                }, err => {
                    console.log(err);
                })
        },
        addData() {
            let user = firebase.auth().currentUser;
            let inputData = {
                contactName: this.name,
                contactNumber: this.number,
            };
            firebase.firestore().collection("users").doc(user.uid).collection("contacts").add(inputData)
                .then(() => this.showData())
            this.name = "";
            this.number = null;
        },
        editData() {
            this.updateFlag = true;
        },
        updateData(data) {
            this.updateFlag = false;
            let user = firebase.auth().currentUser;
            let updateData = {
                contactName: this.updatedName,
                contactNumber: this.updatedContact,
            }
            firebase.firestore().collection("users").doc(user.uid).collection("contacts").doc(data.id).update(updateData)
                .then(() => console.log('Contact updated'))
                .then(() => this.showData())
                .catch(e => console.log(e))
            this.updatedName = '';
            this.updatedContact = null;
            console.log('updateData is running');
        },
        deleteData(data) {
            if (confirm('Are you sure if you want to delete?')) {
                let user = firebase.auth().currentUser;
                console.log(data);
                firebase.firestore().collection("users").doc(user.uid).collection("contacts").doc(data.id).delete()
                    .then(() => this.showData())
                    .catch(e => console.log(e))
            }
        },
        login() {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    var credential = result.credential;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    console.log('User logged in');
                    this.userLoggedIn = true;
                    this.showData();
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
        },
        signout() {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                this.userLoggedIn = false;
            }).catch((error) => {
                // An error happened.
            });
        },
        checkAuth() {
            let ref = this;
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    ref.userLoggedIn = true;
                    ref.showData();
                } else {
                    // No user is signed in.
                    ref.userLoggedIn = false;
                }
            });
        },
    },
    mounted: function () {
        this.checkAuth();
    },
});