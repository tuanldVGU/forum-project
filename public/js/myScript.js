import {getCookie} from './getCookie.mjs';

console.log(getCookie('usrName'));

var navbar = new Vue({
    el: '#usrname',
    data: {
        userName: getCookie('usrName')
    }
})

window.filterToggle = function filterToggle(){
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
