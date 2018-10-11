var formControl = new Vue({
    el: "#vue-form",
    data: {
        categories: []
    },
    components: {
    },
    created(){
        this.loadCategory();
    },
    methods:{
        loadCategory: function(){
            this.$http.get('/service/api/category/getDetail').then(response => {
                response.body.data.forEach(element => {
                    this.categories.push(element.transportType);
                });
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
        }
    },
    mounted(){
        document.getElementById('forum_id').value = document.URL.split('id=')[1];
    }
});