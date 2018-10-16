import {urlParam} from '../urlParam.mjs'
import {getCookie} from '../getCookie.mjs'
var postID = urlParam('id');
var token = getCookie('token')

class post{
    constructor(a,b,c,d,e){
        this.ID=a;
        this.title=b;
        this.content=c;
        this.category=d;
        this.author=e;
    }
}

var modify = new Vue({
    el:'#vue-modify-post',
    data:{
        post: new post('','','','',''),
        categories: []
    },
    created(){
        this.loadPost()
    },
    methods:{
        loadPost: function(){
            // load categories
            this.$http.get('/service/api/category/getDetail').then(response => {
                response.body.data.forEach(element => {
                    this.categories.push(element);
                });
            }, response => {
                // error callback
                console.log('failed');
            })

            // load post
            this.$http.get('/service/api/post/getpost/'+postID).then(response => {
                var element = response.body.data;
                console.log(element)
                var input = new post(postID,element.title,element.description,element.category,token);
                console.log(input)
                this.post= input;

            }, response => {
                // error callback
                console.log('failed');
            })
        },
        addtotext: function(){
            var categoryText = document.getElementById('categoryText');
            var boxValue = document.getElementById('addCategory');
            var tmp  = this.categories[boxValue.selectedIndex]._id;
            categoryText.value = tmp;
        }
    }
})