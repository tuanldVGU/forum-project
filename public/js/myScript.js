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
