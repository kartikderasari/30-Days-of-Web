let app = new Vue({
    el: '#app',
    data: {
        userData: {},
    },
    methods: {
        readData: function () {
            firebase.firestore().collection('userInfo').doc('data').get()
                .then((doc) => this.userData = doc.data())
        },
    },
    mounted: function () {
        this.readData();
    }
})