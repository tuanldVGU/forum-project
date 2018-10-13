var table = new Vue({
    el: '#vue-forum',
    data: {
        tableData:[]
    },
    created(){
        this.loadtableData()
    },
    methods:{
        loadtableData: function(){
            this.$http.get('/service/api/forumList/getDetail').then(response => {
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
});