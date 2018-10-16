import {getCookie} from '../getCookie.mjs';

var usrToken = getCookie('token');
var formControl = new Vue({
    el: "#vue-profile",
    data: {
        usr : {},
        posts: []
    },
    components: {
    },
    created(){
        this.loadPost();
    },
    methods:{
        loadPost: function(){
            //get user detail
            this.$http.get('/service/api/user/getDetail'+usrToken).then(response => {
                this.usr = response.body.data
            }, response => {
                // error callback
                console.log('failed');
            })
            //get post detail
            this.$http.get('/service/api/post/getDetail').then(response => {
                response.body.data.forEach(element => {
                    this.posts.push(element);
                });
                console.log(this.posts);
            }, response => {
                // error callback
                console.log('failed');
            })
        }
    }
});