export function urlParam(name){
    var params = document.URL.split('?');
    for (var i = 1; i<params.length; i++){
        var param = params[i].split('=');
        if (param[0]==name){
            return param[1];
        }
    }
}