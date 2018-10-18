import {getCookie} from '../getCookie.mjs'
var postID = document.URL.split('id=')[1];
var userName = getCookie("usrName");

// article content
var article = new Vue({
    el: '#vue-content',
    data(){
        return{
            info: {
                title: "loading..",
                content: "still loading...",
                author:''
            },
            email:'',
            seen:false,
            reason:[]
        }
    },
    created(){
        this.loadContent()
    },
    methods:{
        reportreason:function(){
            this.reason.length=0;
            this.seen=!this.seen;
        },
        loadContent: function(){
            this.$http.get('/service/api/post/getpost/'+postID)
            .then(response => {
                var element = response.body.data;
                var input = {
                    title: element.title,
                    content: element.description,
                    author:element.user
                }
                this.info= input;
                document.title += " "+ input.title;
            }, response => {
                // error callback
                console.log('failed');
            })
        } ,
        forwardingthread:function(){
            //console.log(document.URL);
            //console.log("email:", this.email);
            //console.log(getCookie("usrName"));
            this.$http.post('/forwardthread', {link:document.URL, email:this.email,username:getCookie("usrName")})
            .then ((res)=> console.log (res.body))
            .catch ((error)=> console.log(error))
        },
        createReport:function(){
            console.log("PostID:",postID);
            console.log("Reason:", this.reason);
            console.log("Reporter:",getCookie("token"));
            console.log("Title",this.info.title)
            this.$http.post('/service/api/report/createReport', {postId:postID,reason:this.reason.toString(),reporter:getCookie("token"),title:this.info.title})
             .then ((res)=> {if(res.body.status=="successful"){alert("Report are saved. Thank for your attribute.")}})
             .catch ((error)=> console.log(error))
        }
    }
});

// Realtime comment function
Pusher.logToConsole = true;

var pusher = new Pusher('e0d50cdec56f3482d272', {
    cluster: 'ap1',
    forceTLS: true
});

var channel = pusher.subscribe('motor-forum');

//comment section
var comment = new Vue({
    el:'#vue-comment',
    data: {
        commentBox:'',
        comments:[],

        replyBox:'',
        replies:[]
    },
    created(){
            this.loadComment()
    },
    methods:{
        loadComment: function(){
            this.$http.get('/service/api/comment/getDetail/'+postID)
            //this.$http.get('/service/api/comment/getSumComment/'+postID)
            .then(response => {
                try {
                    response.body.data.forEach(element=>{
                        var tmp = element.content.split(':::');
                        var input = {
                            cmtID: element._id,
                            user: tmp[0],
                            content: tmp[1],
                            time: element.content.createdAt,
                            reply: element.subComment
                        }
                        for (var i=0; i<input.reply.length; i++){
                            var subtmp = input.reply[i].content.split(':::');
                            input.reply[i].username = subtmp[0];
                            input.reply[i].content = subtmp[1];
                        }

                        this.comments.push(input);
                    });
                    console.log(response.body.data);
                    // this.toggleReply();
                }
                catch(err){
                    console.log('empty');
                }
            }, response => {
                // error callback
                console.log('failed');
            })
        },

        addComment: function(){
            var input = {
                user: userName,
                content:  this.commentBox
            };

            if(input.content != '' ){
                this.comments.push(input);
                var dataSent ={
                    post: postID,
                    //user: userName,
                    token: getCookie('token'),
                    content: getCookie("usrName")+":::"+this.commentBox
                }
                //get api
                this.$http.post('/service/api/comment/createComment', { data: dataSent})
                .then(response => {
                   //Success
                   console.log(response);
                }, response => {
                    // error callback
                    console.log('failed');
                })
            }


            this.commentBox = '';
        },

        addReply: function(cid){
            var input ={
                post: postID,
                token: getCookie('token'),
                comment: cid,
                content: userName+":::"+this.replyBox

            }
            console.log(input.comment);
            this.replies.push(input);
            this.$http.post('/service/api/comment/createSubComment', {data: input})
            .then(response => {
               //Success
               console.log(response);
            }, response => {
                // error callback
                console.log(response);
                // console.log('failed');
            })
        },

        toggleReply: function(){
            var comment = document.getElementsByClassName('comment');
            for (var i = 0; i<comment.length;i++){
                var current = comment[i];
                current.addEventListener("mouseout",function(){
                    var widget = this.children[2];
                    widget.style.display = "none";
                });

                current.addEventListener("mouseover",function(){
                    var widget = this.children[2];
                    widget.style.display = "block";
                });
            }
        }
    },
    mounted(){
        this.toggleReply()
    },
    updated(){
        this.toggleReply()   
    },
    ready(){
        channel.bind('add-comment', function(data) {
            var tmp = data.content.split(':::');
            var input = {
                username: tmp[0],
                content: tmp[1]
            }
            this.comments.push(input);
        });
        channel.bind('add-subcomment', function(data) {
            var tmp = data.content.split(':::');
            var input = {
                parent: data.commentID,
                username: tmp[0],
                content: tmp[1]
            }
            this.comments.push(input);
        });
    }
})
