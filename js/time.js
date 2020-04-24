function formatDate(date,fmt){
    let o = {
        'M+' : date.getMonth() +1,                    //月份
    　　'd+' : date.getDate(),                        //日
　　 'h+' : date.getHours(),                       //小时
    　　'm+' : date.getMinutes(),                     //分  
    　　's+' : date.getSeconds(),                     //秒
    　　"q+":  Math.floor((date.getMonth() + 3) / 3), //季度   
        "S":   date.getMilliseconds()                 //毫秒   
    };
    if(/(y+)/.test(fmt)){   //年份
　　 fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
    }
    for(let k in o){
    if (new RegExp("(" + k + ")").test(fmt)){
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str:padLeftZero(str));
    　　}
    }
    return fmt;
};

function padLeftZero(str){
    return ('00'+str).substr(str.length);
}