let app = new Vue({
    el: '#app',
    data: {
        userLoggedIn: false,
        userImageURL: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
        userDetails: null,
        userData: {
            name: '',
            profilePhotoURL: '',
            shortBio: '',
            about: '',
            email: '',
            socialLinks: {
                Facebook: '',
                GitHub: '',
                Instagram: '',
                LinkedIn: '',
                Twitter: '',
            },
        },
        projects: [
            {
                title: '',
                projectURL: '',
                brief: '',
                liveURL: '',
                githubURL: '',
                techStack: [],
            },
        ],
        experience: [],
        tempExp: {
            designation: '',
            start: '',
            end: '',
            brief: '',
            companyName: '',
            companyWebsiteURL: '',
            companyLogoURL: '',
        },
        tempArr: [
            {
                name: 'h1',
                number: 1,
            },
            {
                name: 'h2',
                number: 2,
            }
        ],
        temp: {
            name: null,
            number: null,
        },
    },
    methods: {
        updateUserData: function () {
            firebase.firestore().collection('userInfo').doc('data').update(this.userData);
        },
        readData: function () {
            firebase.firestore().collection('userInfo').doc('data').get()
                .then((doc) => this.userData = doc.data())
        },
        googleLogin: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider)
                .then(() => this.userLoggedIn = true)
        },
        checkState: function () {
            let ref = this;
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    ref.userDetails = user;
                    ref.userLoggedIn = true;
                    ref.readData();
                } else {
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
                    console.log('User logged out');
                    this.userLoggedIn = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addExp: function () {
            let expToAdd = {
                designation: this.tempExp.designation,
                start: this.tempExp.start,
                end: this.tempExp.end,
                brief: this.tempExp.brief,
                companyName: this.tempExp.companyName,
                companyWebsiteURL: this.tempExp.companyWebsiteURL,
                companyLogoURL: this.tempExp.companyLogoURL,
            };
            this.experience.push(expToAdd);
            expToAdd = null;
            console.log(this.experience);
        },
        updateExpData: function () {
            console.log(this.experience);
            let expData = {
                experience: this.experience,
            };
            console.log(expData);
            firebase.firestore().collection('userInfo').doc('experience').set(expData);
        },
        // addHTML: function () {
        //     let dataToAdd = {
        //         name: this.temp.name,
        //         number: this.temp.number,
        //     };
        //     this.tempArr.push(dataToAdd);
        //     dataToAdd = null;
        // },
        // deleteData: function (index) {
        //     this.tempArr.splice(index, 1);
        // },
    },
    mounted: function () {
        this.checkState();
    }
});