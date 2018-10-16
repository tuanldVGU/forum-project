var formContro2 = new Vue({
    el: "#vue-form2",
    data: {
        username:'',
        email:'',
        password:'',
        isexisting: false,
        usermess:''
    },
    methods:{
        submitsignup:function(){
            this.$http.post('/auth/signup',{ usr: this.username, pwd:this.password, email:this.email})
            .then(function(res){
                //Success
                window.location.href='/signin'

            })
            .catch(function(res){
                //Error
                alert(res.body);
            })
        }
    }
});
