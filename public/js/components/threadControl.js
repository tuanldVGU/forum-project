var forumID = document.URL.split('id=')[1];
console.log(forumID);
var table = new Vue({
    el: '#vue-thread',
    data: {
        info: {
            forumName: document.URL.split('id=')[1],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        dataTable: []
    },
    created(){
        //this.loadtableData()
    },
    methods:{
        loadforumInfo: function(){
            this.$http.get('/service/api/forumList/getDetail',{params: {id : forumID}}).then(response => {
                response.body.data.forEach(element => {
                    var input = {
                        forumName: element.forumName,
                        description: element.description
                    }
                    this.info=input;
                });
            }, response => {
                // error callback
                console.log('failed');
            })
        },
        loadtableData: function(){
            this.$http.get('/service/api/threadList/getDetail',{params: {id : forumID}}).then(response => {
                response.body.data.forEach(element => {
                    var input = {
                        id: element._id,
                        forumName: element.forumName,
                        lastPost: '',
                        thread: '',
                        post: '',
                    }
                    this.tableData.push(input);
                });
                console.log(this.tableData);
            }, response => {
                // error callback
                console.log('failed');
            })
        }
    }
})