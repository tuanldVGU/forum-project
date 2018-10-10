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

function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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

