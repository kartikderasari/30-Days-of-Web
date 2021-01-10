let app = new Vue({
    el: '#app',
    data: {
        name: 'Kartik',
        age: 32,
        userLoggedIn: false,
        userImageURL: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
        rawHtml: '',
    },
    methods: {
        googleLogin: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider)
                .then(() => {
                    this.userLoggedIn = true;
                    console.log(this.userLoggedIn);
                })
            firebase.auth()
                .getRedirectResult()
                .then((result) => {
                    if (result.credential) {
                        /** @type {firebase.auth.OAuthCredential} */
                        var credential = result.credential;

                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = credential.accessToken;
                        // ...
                    }
                    // The signed-in user info.
                    var user = result.user;
                    console.log(user);
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
        checkState: function () {
            let ref = this;
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    //document.getElementById('loginButton').style.display = 'none';
                    //document.getElementById('redirectButton').style.display = 'inline-block';
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;
                    ref.userLoggedIn = true;
                    ref.setUserData(user);
                    // ...                    
                } else {
                    // User is signed out.
                    // ...
                    ref.userLoggedIn = false;
                }
            });
        },
        logoutUser: function () {
            console.log('Log out user');
            firebase
                .auth()
                .signOut()
                .then(function () {
                    // Sign-out successful.
                    console.log('User logged out');
                    this.userLoggedIn = false;
                })
                .catch(function (error) {
                    console.log(error);
                    // An error happened.
                });
        },
        setUserData: function (user) {
            this.userImageURL = user.photoURL;
            let ele = `
                        <li>
                            <h5 class="mx-2 my-1">${user.displayName}</h5>
                            <p class="mx-2 my-1"><small class="d-block">${user.email}</small></p>
                        </li>                
                        <li><button class="btn btn-primary btn-sm mt-2 mb-1 mx-auto" id="logoutButton"
                                onclick="logoutUser()">Logout</button></li>
            `;
            this.rawHtml = ele;
        },
    },
    mounted: function () {
        this.checkState();
    }
});