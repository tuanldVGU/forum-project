var formControl = new Vue({
    el: "#vue-form2",
    data: {
        user:[],
        username:[],
        email:[],
        checkusername:'',
        checkemail:'',
        nameexist:false,
        emailexist:false,
        checkexist:false,
    },
    components: {
    },
    watch:{
        checkusername:function(newname)
        {   this.nameexist=false;
            this.checkexist=false;
            this.username.forEach(element=>{
            if(element== newname){this.nameexist = true;
            this.checkexist=this.nameexist||this.emailexist;}
            })
        },
        checkemail:function(newemail)
        {   this.emailexist=false;
            this.checkexist=false;
            this.email.forEach(element=>{
            if(element== newemail){this.emailexist = true;
            this.checkexist=this.nameexist||this.emailexist;}
            })
        }
        },
    created(){
        this.loadUser();
    },
    methods:{
        loadUser: function(){
            this.$http.get('/service/api/user/getDetail').then(response => {
                response.body.data.forEach(element => {
                    this.user.push(element);
                });
                this.loadUsername();
                this.loadEmail();
                console.log(this.user);
            }, response => {
                // error callback
                console.log('failed');
            })
        },
        loadUsername: function(){
            this.user.forEach(element=>{
                this.username.push(element.username)
            });
            console.log(this.username);
        },
        loadEmail: function(){
            this.user.forEach(element=>{
                this.email.push(element.email)
            });
            console.log(this.email);
        }

    }
});
