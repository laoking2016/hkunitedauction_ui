export function formatLink(item){
    if(item.type == "mall"){
        return `/good/${item.id}`
    }
    return `/lot/${item.id}`
}