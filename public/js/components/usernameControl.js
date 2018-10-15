var formControl = new Vue({
    el: "#vue-form1",
    data: {
        user:[],
        username:[],
        checkusername:'',
        isexisting:false,
    },
    components: {
    },
    watch:{
        checkusername:function(newname)
        {   this.isexisting=false;
            this.username.forEach(element=>{
            if(element== newname){this.isexisting = true;}
                //console.log(element, this.isexisting);
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
        }
    }
});
