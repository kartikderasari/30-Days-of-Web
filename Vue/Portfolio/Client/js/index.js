let app = new Vue({
    el: '#app',
    data: {
        userData: {},
        experiences: [],
        projects: [],
    },
    methods: {
        readData: function () {
            firebase.firestore().collection('userInfo').doc('data').get()
                .then((doc) => this.userData = doc.data())
        },
        readExpData: function () {
            firebase.firestore().collection('experiences').get()
                .then((doc) => {
                    doc.forEach(doc => this.experiences.push(doc.data()))
                });
        },
        readProjectData: function () {
            firebase.firestore().collection('projects').get()
                .then((doc) => {
                    doc.forEach(doc => this.projects.push(doc.data()))
                });
        },
    },
    mounted: function () {
        this.readData();
        this.readExpData();
        this.readProjectData();
    }
})