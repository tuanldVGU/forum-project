import {getCookie} from './getCookie.mjs';

var comment = document.getElementsByClassName('comment');
for (var i = 0; i<comment.length;i++){
    var current = comment[i];
    current.addEventListener("mouseout",function(){
        var widget = this.children[2];
        widget.style.display = "none";
    });

    current.addEventListener("mouseover",function(){
        var widget = this.children[2];
        widget.style.display = "block";
    });
}
console.log(getCookie('usrName'));

var navbar = new Vue({
    el: '#usrname',
    data: {
        userName: getCookie('usrName') 
    }
})


function filterToggle(){
    var filter = document.getElementById('filter');
    filter.classList.toggle('hidden');
}

try {
    var author = document.getElementById('author');
    author.value = getCookie('token');
}
catch(err){
    console.log('Not avaliable : ');
}