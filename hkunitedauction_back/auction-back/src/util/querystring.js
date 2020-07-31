export function stringfy(obj){
    var result = "";
    var arr = Object.keys(obj);
    for(var i = 0; i < arr.length; i++){
        var key = arr[i];
        if(result == ""){
            result = result + `${key}=${obj[key]}`;
        }else{
            result = result + `&${key}=${obj[key]}`;
        }
    }
    return result;
}