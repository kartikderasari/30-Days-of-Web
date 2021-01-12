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
            Facebook: '',
            GitHub: '',
            Instagram: '',
            LinkedIn: '',
            Twitter: '',
        },
        tempProject: {
            title: '',
            projectImageURL: '',
            brief: '',
            liveURL: '',
            githubURL: '',
            techStack: '',
        },
        projects: [],
        tempExp: {
            designation: '',
            start: '',
            end: '',
            brief: '',
            companyName: '',
            companyWebsiteURL: '',
            companyLogoURL: '',
        },
        experiences: [],
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
        addExpData: function () {
            firebase.firestore().collection('experiences').add(this.tempExp);
            this.tempExp = {};
            this.readExpData();
        },
        readExpData: function () {
            this.experiences = [];
            firebase.firestore().collection('experiences').get()
                .then((doc) => {
                    doc.forEach(doc => this.experiences.push({ id: doc.id, ...doc.data() }))
                });
        },
        addProjectData: function () {
            firebase.firestore().collection('projects').add(this.tempProject);
            this.tempProject = {};
            this.readProjectData();
        },
        readProjectData: function () {
            this.projects = [];
            firebase.firestore().collection('projects').get()
                .then((doc) => {
                    doc.forEach(doc => this.projects.push({ id: doc.id, ...doc.data() }))
                });
        },
        deleteExpData: function (id) {
            firebase.firestore().collection('experiences').doc(id).delete();
            this.experiences = [];
            this.readExpData();
        },
        deleteProjectData: function (id) {
            firebase.firestore().collection('projects').doc(id).delete();
            this.projects = [];
            this.readProjectData();
        },
        updateExpData: function (exp, id) {
            firebase.firestore().collection('experiences').doc(id).update(exp)
                .then(() => this.readExpData())
                .catch(e => console.log(e))
        },
        updateProjectData: function (project, id) {
            firebase.firestore().collection('projects').doc(id).update(project)
                .then(() => this.readProjectData())
                .catch(e => console.log(e))
        },
    },
    mounted: function () {
        this.checkState();
        this.readExpData();
        this.readProjectData();
    }
});