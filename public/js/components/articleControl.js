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

var comment = new VUe({
    el:'#vue-comment',
    data: {
        commentBox:'',
        comments:[]
    },
    methods:{
        loadComment: function(){
            this.$http.get('/service/api/post/getpost/'+postID).then(response => {
                var element = response.body.data;
                var input = {
                    title: element.title,
                    content: element.description,
                    subcom: element.subcomment
                }
                this.info= input;
                console.log(input);
            }, response => {
                // error callback
                console.log('failed');
            })
        },
        submitcomment: function(){
            this.$http.post('/service/api/post/getpost/'+postID,{content: this.commentBox}).then(response => {
               //Success
               console.log('Success');
            }, response => {
                // error callback
                console.log('failed');
            })   
        }
    }
})