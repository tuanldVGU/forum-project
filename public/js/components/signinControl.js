var formContro2 = new Vue({
    el: "#vue-signin",
    data: {
        username:'',
        password:'',
    },
    methods:{
        submitsignin:function(){
            console.log(this.username, this.password)
            this.$http.post('/auth/signin',{ usr: this.username, pwd:this.password})
            .then(function(res){
                //Success
              if(res.data.rule=="admin"){
                window.location.href='/admin'}
                else{
                window.location.href='/home'
                }
            })
            .catch(function(res){
                //Error
               // console.log(res)
                 alert(res.body);
            })
        }
    }
});
