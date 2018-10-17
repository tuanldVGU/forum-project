var d = new Date();
var year = d.getFullYear();
var month=d.getMonth()+1;
class input {
    constructor(title,author){
        this.title = title;
        this.author = author;
    }
}
var reportCotrol=new Vue({
    el:'#vue-adminreport',
    data(){
        return{
         report:[],
         thisYear:0,
         thisMonth:0,
         title:[],
         author:[]
        }
    },
    created(){
        this.loadReport();
    },
    methods:{
        loadReport: function(){
            this.report.length=0;
            this.$http.get('/service/api/report/getAllDetail').then(response => {
                response.body.data.forEach(element => {
                   this.report.push(element);
                   this.loadTitle(element.post)
                });
                console.log(this.report);
                this.countReport();
            }, response => {
                // error callback
                console.log(response.body);
            })
        },
        countReport: function(){
            this.report.forEach(element=>{
                var str=element.createdAt;
                if(str.slice(0,4)==year){this.thisYear+=1;}
                if(str.slice(0,4)==year&&str.slice(5,7)==month){this.thisMonth+=1;}
            })
           
        },
        loadTitle:function(postId){
            this.$http.get('/service/api/post/getPost/'+postId).then(response => {
                this.title.push(response.body.data.title)
            }, response => {
                // error callback
                console.log("Fail to load post");
            })
        },
        deleteReport:function(reportId, postId){
            console.log(reportId, postId)
            this.$http.post('/service/api/report/deleteReport', {postId:postId,reportId:reportId})
             .then ((res)=> {if(res.body.status=="successful")
             {alert("Report are saved. Thank for your attribute.")}
              this.loadReport();                                                    
            })
             .catch ((error)=> console.log(error))
        }
    }
})