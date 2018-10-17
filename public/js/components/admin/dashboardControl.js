class user {
    constructor(id,name,role){
        this.id = id;
        this.usrName = name;
        this.role = role;
    }
}
new Vue({
    el:'#vue-dashboard',
    data(){
        return{
            admin: 0,
            user:0,
            datas: []
        }
    },
    created(){
        this.loadUser();
    },
    methods:{
        loadUser: function(){
            this.$http.get('/service/api/user/getAllDetail/').then(response => {
                response.body.data.forEach(element => {
                    console.log(element.userType);
                    var input = new user(element._id,element.username,element.userType);
                    this.datas.push(input);
                    if (input.role =='admin'){
                        this.admin +=1;
                    }else{
                        this.user +=1;
                    }
                    console.log(input);
                });
               
            }, response => {
                // error callback
                console.log(response.body);
            })
        }
    }
})