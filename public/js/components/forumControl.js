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
                console.log(response.body.data)
                response.body.data[0].forEach(element => {
                    //console.log(element);
                    var input = {
                        id: element._id,
                        forumName: element.forumName,
                        lastPost: '',
                        thread: '',
                        post: '',
                    }
                    this.tableData.push(input);
                    console.log(input);
                });
                var i = 0;
                response.body.data[1].forEach(element => {
                    //console.log(element);
                    tableData[i].thread = element;
                    i++;
                });
                i=0;
                response.body.data[2].forEach(element=>{
                    tableData[i].lastPost=element.updateAt;
                    i++;
                })

                //console.log('table data:',this.tableData);
            }, response => {
                // error callback
                console.log('failed');
            })
        }
    }
});