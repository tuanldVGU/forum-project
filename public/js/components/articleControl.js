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
var comment = new Vue({
    el:'#vue-comment',
    data: {
        commentBox:'',
        comments:[]
    },
    created(){
            this.loadComment()
    },
    methods:{
        loadComment: function(){
            this.$http.get('/service/api/comment/getDetail/'+postID)
            //this.$http.get('/service/api/comment/getSumComment/'+postID)
            .then(response => {
                var element = response.body.data;
                console.log(element);
                try {
                    var tmp = element.content.split(':::');
                    var input = {
                        user: tmp[0],
                        content: tmp[1],
                        //subcom: element.subcomment
                    }
                    this.info= input;
                    //console.log(input);
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
                user: getCookie("usrName"),
                content:  this.commentBox
            };

            this.comments.push(input);
            var dataSent ={
                post: postID,
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

            this.commentBox = '';

        }
    }
})
