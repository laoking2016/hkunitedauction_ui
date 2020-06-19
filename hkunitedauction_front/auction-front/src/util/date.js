export function calcRemainDate(date1, date2){
    if(date1 >= date2){
        return null;
    }

    var date3 = date2.getTime() - date1.getTime();
    var days=Math.floor(date3/(24*3600*1000))
 
    var leave1=date3%(24*3600*1000)    
    var hours=Math.floor(leave1/(3600*1000))

    var leave2=leave1%(3600*1000)        
    var minutes=Math.floor(leave2/(60*1000))
    
    var leave3=leave2%(60*1000)      
    var seconds=Math.round(leave3/1000)
    
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}