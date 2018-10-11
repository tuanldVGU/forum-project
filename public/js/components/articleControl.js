var postID = document.URL.split('id=')[1];

var article = new Vue({
    el: '#vue-content',
    data(){
        return{
            info: {
                title: "loading..",
                content: "still loading...",
            }
        }
    },
    created(){
        this.loadContent()
    },
    methods:{
        loadContent: function(){
            this.$http.get('/service/api/post/getpost/'+postID).then(response => {
                var element = response.body.data;
                var input = {
                    title: element.title,
                    content: element.description,
                }
                this.info= input;
                console.log(input);
            }, response => {
                // error callback
                console.log('failed');
            })
        }    
    }
});
article.$watch('info',function(){
    console.log("change!!!!");
});