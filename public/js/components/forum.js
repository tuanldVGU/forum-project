var table = new Vue({
    el: '#table',
    data: {
        tableData:{
            forum: [],
            lastpost: [],
            threads: [],
            posts: [],
            categories: [] 
        }
    },
    created: function(){
        this.$http.get('/api/getpost',function(data,status,request){
            if (status == 200){
                this.tableData = data;
                console.log(this.tableData);
            }
        });
    }
});