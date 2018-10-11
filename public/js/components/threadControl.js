var forumID = document.URL.split('id=')[1];
console.log(forumID);
var table = new Vue({
    el: '#vue-thread',
    data: {
        id: forumID,
        info: {
            forumName: document.URL.split('id=')[1],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        tableData: []
    },
    created(){
        this.loadtableData()
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
            this.$http.get('/service/api/post/getDetail/'+forumID).then(response => {
                console.log(response);
                response.body.data.forEach(element => {
                    var input = {
                        id: element._id,
                        title: element.title,
                        Postdate: element.createdAt,
                        comment: 0,
                        lastComment: 'unknown',
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
