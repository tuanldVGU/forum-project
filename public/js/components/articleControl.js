var postID = document.URL.split('id=')[1];
console.log(postID);
var article = new Vue({
    el: '#vue-article',
    data:{
        content: {}
    },
    created(){
        this.loadContent()
    },
    methods:{
        loadContent: function(){
            this.$http.get('/service/api/post/getpost/'+forumID).then(response => {
                console.log(response);
                response.body.data.forEach(element => {
                    var input = {
                        id: element._id,
                        title: element.title,
                        Postdate: element.createdAt,
                        comment: 0,
                        lastComment: 'unknown',
                    }
                    this.console= input;
                });
                console.log(this.tableData);
            }, response => {
                // error callback
                console.log('failed');
            })
        }    
    }
});