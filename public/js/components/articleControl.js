var postID = document.URL.split('id=')[1];

var article = new Vue({
    el: '#vue-content',
    data(){
        return{
            info: {
                title: "loading..",
                content: "still loading...",
            },
            email:'',
        }
    },
    created(){
        this.loadContent()
    },
    methods:{
        loadContent: function(){
            this.$http.get('/service/api/post/getpost/'+postID)
            .then(response => {
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
        } ,
        forwardingthread:function(){
            console.log(document.URL);
            console.log("email:", this.email);
            console.log(getCookie("usrName"));
            this.$http.post('/forwardthread', {link:document.URL, email:this.email,username:getCookie("usrName")})
            .then ((res)=> console.log (res.body))
            .catch ((error)=> console.log(error))
        }
    }
});

article.$watch('info',function(){
    console.log("change!!!!");
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
            //this.$http.get('/service/api/comment/getDetail/'+postID)
            this.$http.get('/service/api/comment/getSumComment/'+postID)
            .then(response => {
                var element = response.body.data;
                console.log(element);
                // var input = {
                //     title: element.title,
                //     content: element.description,
                //     subcom: element.subcomment
                // }
                // this.info= input;
                // console.log(input);
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
            //input.user = getCookie("usrName");
            //input.content =  this.commentBox;
            this.comments.push(input);
            this.commentBox = '';
            // get api this.$http.post('/service/api/post/getpost/'+postID,{content: this.commentBox})
            // .then(response => {
            //    //Success
            //    console.log('Success');
            // }, response => {
            //     // error callback
            //     console.log('failed');
            // })


        }
    }
})
