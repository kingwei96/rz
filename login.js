var time_out=3;//秒
var call_me="请联系管理：电话: 15823478870 QQ：1059859610 ";	//对话框文本
var weburl="http://user.qzone.qq.com/1059859610"; //登录后打开第1个通告 tgfile.htm?fn=0 网站必须带http://
var save_time=72;//小时数
function addCookie(objName,objValue,objHours){//添加cookie
			var str = objName + "=" + escape(objValue);
			if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
				var date = new Date();
				var ms = objHours*3600*1000;
				date.setTime(date.getTime() + ms);
				str += "; expires=" + date.toGMTString();
			}
			document.cookie = str;
	//		alert("添加cookie成功");
}
function getCookie(objName){//获取指定名称的cookie的值
			var arrStr = document.cookie.split("; ");
			for(var i = 0;i < arrStr.length;i ++){
				var temp = arrStr[i].split("=");
				if(temp[0] == objName) return unescape(temp[1]);
			} 
			return "";
}
		
function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
			var date = new Date();
			date.setTime(date.getTime() - 10000);
			document.cookie = name + "=a; expires=" + date.toGMTString();
}
		
function allCookie(){//读取所有保存的cookie字符串
			var str = document.cookie;
			if(str == ""){
				str = "没有保存任何cookie";
			}
			alert(str);
	}

document.onkeydown = ondockeydown;

function ondockeydown(ev){
	var eve = (typeof event == "undefined") ? ev : event;				
	var keyCode = (eve.which) ? eve.which : eve.keyCode;	
	
	if (keyCode == 13){
		tijiao();
}}

function tijiao(){
	var usr=$("#usr").val();
	var pwd=$("#pwd").val();
	var str="auth.asp?usr="+usr+"&pwd="+pwd;
	if ($("#save")[0].checked){
		addCookie("usr", usr, save_time);
		addCookie("pwd", pwd, save_time);
		addCookie("save", true, save_time);
		addCookie("auto", $("#auto")[0].checked, save_time);};
	 var data_str=encodeToGB2312(str);
	$.ajax({
		type: "GET",
		url: data_str,
		success: post_fun,
		error: null,
		timeout: 10000,
		dataType: "json",
		cache: false
})}

function post_fun(msg){	
	if(msg.ret==0){
		addCookie("ip", msg.i, save_time);
		if (weburl=="0"){
			weburl="userinfo.htm?u="+ $("#usr").val()+"&i="+msg.i;}
		window.location.replace(weburl);
	}else
	{
		gotousr();
		alert(msg.msg);
}}

function get_ld()
{
	var tmp = window.location.href.split("ld=");
	if(tmp.length==2){			
		return tmp[1];}
	return "";
}	

var ld="";
var init=0;

$(function(){
	ld=get_ld();
	var get_val=getCookie("save");
	if (get_val){
		$("#usr").val(getCookie("usr"));
		$("#pwd").val(getCookie("pwd"));
		$("#save")[0].checked=true;
		get_val=getCookie("auto");
		if (get_val){
			$("#auto")[0].checked=true;
			if (time_out>0){
				setTimeout(autologon, time_out*1000);
			}else
			{
				tijiao();}
		}else
		{time_out=-1;}
	};
	gotousr();
});

function autologon(){
	if (time_out>=0){
		tijiao();
}}

function val_edit(obj){
	if (init>0){
		time_out=-1;
	}
}

function gotousr(){
	init=1;
	$("#usr").select();
	$("#usr").focus();
}

function save_ck(obj)
{
	val_edit();
	if(obj.checked)
	{}else
	{
		$("#auto")[0].checked=false;
		delCookie("usr");
		delCookie("pwd");
		delCookie("save");
		delCookie("auto");
}}

function auto_ck(obj)
{
	val_edit();
	$("#save")[0].checked=obj.checked;
}

function newuser(){
	alert("\n\n"+call_me)
}