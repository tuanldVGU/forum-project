var postID = document.URL.split('id=')[1];
var userName = getCookie("usrName");

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
                console.log(this.info);
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
            this.$http.post('/service/api/report/createReport', {postId:postID,reason:this.reason.toString(),reporter:getCookie("token")})
            .then ((res)=> console.log (res))
            .catch ((error)=> console.log(error))


        }
    }
});

function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//comment section
new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: function() {
        return {
            likes: 12,
            //Info about the owner of the post
            creator: {
                avatar: 'http://via.placeholder.com/100x100/36846e',
                user: 'owner'
            },
            //Some info about the current user
            current_user: {
                avatar: 'http://via.placeholder.com/100x100/a74848',
                user: 'exampler'
            },
            //Comments that are under the post
            comments: [
                {
                    id: uuidv4(),
                    user: 'example',
                    avatar: 'http://via.placeholder.com/100x100/a74848',
                    text: 'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor',
                },
            ]
        }
    },
    methods: {
        submitComment: function(reply) {
            this.comments.push({
                id: uuidv4(),
                user: this.current_user.user,
                avatar: this.current_user.avatar,
                text: reply
            });
        }
    }
});


//toggle reply function
function toggleReply(){
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


Vue.component('comments', {
    template:
        <div class="comments">
            <div :class="comments_wrapper_classes">
                <single-comment
                    v-for="comment in comments"
                    :comment="comment"
                    :key="comment.id"
                ></single-comment>
            </div>
            <hr>
            <div class="reply">
                <div class="avatar">
                    <img :src="current_user.avatar" alt="">
                </div>
                <input
                    type="text"
                    v-model.trim="reply"
                    class="reply--text"
                    placeholder="Leave a comment..."
                    maxlength="250"
                    required
                    @keyup.enter="submitComment"
                />
                <button
                    class="reply--button"
                    @click.prevent="submitComment">
                    <i class="fa fa-paper-plane"></i> Send
                </button>
            </div>
        </div>
    ,
    data: function() {
        return {
            reply: ''
        }
    },
    methods: {
        //Tell the parent component(main app) that we have a new comment
        submitComment: function() {
            if(this.reply != '') {
                this.$emit('submit-comment', this.reply);
                this.reply = '';
            }
        }
    },
    //What the component expects as parameters
    props: ['comments', 'current_user', 'comments_wrapper_classes']
});


Vue.component('single-comment', {
    delimiters: ['[[', ']]'],
    template: `
        <div class="comment">
            <div class="avatar">
                <img :src="comment.avatar" alt="">
            </div>
            <div class="text">
                <a class="username" href="#">
                    @[[ comment.user ]]
                </a>
                <span>[[ comment.text ]]</span>
            </div>
        </div>
    `,
    props: ['comment']
});
