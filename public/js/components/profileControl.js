import {getCookie} from '../getCookie.mjs';

var usrToken = getCookie('token');
Vue.component('modal', {
    template: '#modal-template'
}) 

var formControl = new Vue({
    el: "#vue-profile",
    data: {
        usr : {},
    },
    created(){
        this.loadInfo();
    },
    methods:{
        loadInfo: function(){
            //get user detail
            this.$http.get('/service/api/user/getDetail/'+usrToken).then(response => {
                this.usr = response.body.data;
            }, response => {
                // error callback
                console.log('failed');
            })
        }
    }
});

var postControl = new Vue({
    el: "#vue-profile-post",
    data: {
        posts: [],
        showModal: false,
        parseData : {}
    },
    component :{

    },
    created(){
        this.loadPost();
    },
    methods:{
        loadPost: function(){
            // get post detail
            this.$http.get('/service/api/post/getUserPost/'+usrToken).then(response => {
                response.body.data.forEach(element => {
                    //console.log(element);
                    this.posts.push(element);
                });
                //console.log(this.posts);
            }, response => {
                // error callback
                console.log('failed');
            })
        },
        deletePost: function(postID,forumID){
            console.log(postID,forumID);
            this.$http.post('/service/api/post/deletePost',{id: postID,fid: forumID}).then(response => {
                console.log(success);
            }, response => {
                // error callback
                console.log('failed');
            })
        },
        deleteReminder: function(postID,forumID){
            this.parseData.pid = postID;
            this.parseData.fid= forumID;
        }
    }

})