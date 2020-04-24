
// let Url = 'http://10.7.17.33:8763/v1/' 
// let Url = 'http://47.110.34.1:8762/v1/'
let Url = 'http://admin.zhanchengwlkj.com:8080/product_code_applet'
let token = localStorage.getItem('token')
function closeiframe(){
    xadmin.close();
    parent.location.reload()
}
function renderForm(){
    layui.use('form', function(){
    var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
    form.render();
    });
}
function _ajax(options){
    var xhr = null;
    var params = formsParams(options.data);
    //创建对象
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 连接
    if(options.type == "GET"||options.type == "PUT"){
        xhr.open(options.type,Url+options.url + "?"+ params,options.async);
        xhr.send(null)
    } else if(options.type == "POST"){
        xhr.open(options.type,Url+options.url,options.async);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    } else if(options.type == "DELETE"){
        xhr.open(options.type,Url+options.url + "?"+ params,options.async);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    }else if(options.type == "JSON"){
        let paramsdata=  JSON.stringify(params)
        xhr.open('PUT',Url+options.url,options.async);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(paramsdata);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            options.success(xhr.responseText);
            if(JSON.parse(xhr.response).status==4000||JSON.parse(xhr.response).status==4001||JSON.parse(xhr.response).status==4002){
                localStorage.removeItem('token')
                location.href='login.html'
            }
        }
        // if(xhr.readyState == 4&& xhr.status == 200){
        //     console.log(JSON.parse(xhr.response).status)
        // }
    }
    function formsParams(data){
        var arr = [];
        for(var prop in data){
            arr.push(prop + "=" + data[prop]);
        }
        return arr.join("&");
    }
 
}
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
/**
     * 修改数据的ajax-put请求
     * @author laixm
     */
    putJSON = function(url,data,callback){
        $.ajax({
            url:Url+url,
            type:"put",
            headers:{"Content-Type":"application/json",'token':localStorage.getItem('token')},
            dataType:"json",
            data:data,
            timeout:20000,
            success:function(msg){
                if(msg.code==41000||msg.code==41001||msg.code==41002){
                    alert('token失效')
                    localStorage.removeItem('token')
                    top.location.href='login.html'
                }else{
                    callback(msg);
                }
            },
            error:function(xhr,textstatus,thrown){
                console.log(xhr)
            }
        });
    };
    postJSON = function(url,data,callback){
        $.ajax({
            url:Url+url,
            type:"post",
            headers:{"Content-Type":"application/json",'token':localStorage.getItem('token')},
            dataType:"json",
            data:data,
            timeout:3000,
            success:function(msg){
                if(msg.code==41000||msg.code==41001||msg.code==41002){
                    alert('token失效')
                    localStorage.removeItem('token')
                    top.location.href='login.html'
                }else{
                    callback(msg);
                }
            },
            error:function(xhr,textstatus,thrown){
            }
        });
    };

function timeStamp2String(time, type) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    if (type == '1') {
        return year + "年" + month + "月" + date + "日";
    }
    if (type == '2') {
        return year + "-" + month + "-" + date;
    }
    if (type == '3') {
        return month + "-" + date;
    }
    if(type == '4'){
        return month;
    }
    if(type == '5'){
        return date;
    }
    if(type == '6'){
        return year + "." + month + "." + date + " " + hour + ":" + minute + ":" + second;
    }
    if(type == '7'){
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    if(type == '8'){
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
    if(type == '9'){
        return month + "-" + date + " " + hour + ":" + minute;
    }
    if(type == '10'){
        return year + "." + month + "." + date
    }
    if(type == '11'){
        return year + "." + month
    }
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
