var formControl = new Vue({
    el: "#vue-form",
    data: {
        categories: [],
        type:[],
        manufacture:[],
        model:[],
        year:[],
        addType: '',
        addManufacture:'',
        addModel:'',
        addYear:'',
    },
    components: {
    },
    watch:{
        addType: function(news,old){
            this.manufacture.length=0;
            this.model.length=0;
            this.year.length=0;
            this.categories.forEach(element=>{
                if(element.transportType==news)
                {
                    if(this.manufacture.length==0)
                    {
                        this.manufacture.push(element.transportManufacture);
                    }
                    else
                    {   var result=true;
                        for(var i=0; i<this.manufacture.length;i++)
                        {
                            if(element.transportManufacture==this.manufacture[i])
                                {result=false;
                                break;}
                        }
                        if(result==true)
                        {this.manufacture.push(element.transportManufacture);}
                    }
                    
                }
            })
        },
        addManufacture:function(news, old)
        {  this.model.length=0;
           this.year.length=0;
           this.categories.forEach(element=>{
               if(element.transportManufacture==news && element.transportType==this.addType)
               {
                if(this.model.length==0)
                    {
                        this.model.push(element.transportModel);
                    }
                    else
                    {   var result=true;
                        for(var i=0; i<this.model.length;i++)
                        {
                            if(element.transportModel==this.model[i])
                                {result=false;
                                break;}
                        }
                        if(result==true)
                        {this.model.push(element.transportModel);}
                    }
               }
           })
        },
        addModel:function(news, old)
        {  this.year.length=0;
           this.categories.forEach(element=>
            {
               if(element.transportManufacture==this.addManufacture && element.transportType==this.addType&& element.transportModel==news)
               {    
                
                if(this.year.length==0)
                    {
                        this.year.push(element.transportYear);
                    }
                    else
                    {   var result=true;
                        for(var i=0; i<this.year.length;i++)
                        {
                            if(element.transportYear==this.year[i])
                                {result=false;
                                break;}
                        }
                        if(result==true)
                        {this.year.push(element.transportYear);}
                    }
               }
           })
        },


    },
    created(){
        this.loadCategory();
    },
    methods:{
        loadCategory: function(){
            this.$http.get('/service/api/category/getDetail').then(response => {
                response.body.data.forEach(element => {
                    this.categories.push(element);
                });
                this.getType();
                console.log(this.categories);
            }, response => {
                // error callback
                console.log('failed');
            })
        },
        addtotext: function(){
            var categoryText = document.getElementById('categoryText');
            var boxValue = document.getElementById('addCategory');
            var tmp  = this.categories[boxValue.selectedIndex];
            categoryText.value += tmp + ';';
        },
        getType: function(){
          this.categories.forEach(element=>
            { // console.log(element.transportType);
                //console.log(this.type.length);
                if(this.type.length==0){this.type.push(element.transportType);}
                else
                {   var result=true;
                    for(var i=0; i<this.type.length;i++)
                    {
                        if(this.type[i]==element.transportType)
                        {
                            result=false;
                            break;   
                        }
                    }
                    if(result==true){
                    this.type.push(element.transportType)}
                }
              //{   console.log(this.type[i]==element.transportType);
                //  if(this.type[i]==element.transportType){continue;}
                  //else{this.type.push(element.transportType);
                    //    }
             // }

          })
          
        }
    }
});
