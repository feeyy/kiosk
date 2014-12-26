<!--产品选择事件 -->
<!--开发者：陈劲全（QQ:820094076） 最后编辑时间：2014-10-15 -->

$(document).ready(function(){
	//禁止右键
	$(document).bind("contextmenu",function(){
		return false;
	});
	$(document).bind("selectstart",function(){
		return false;
	});
	
	//获取登录参数
	//var sname = $.query.get("sname");
	//var sfz = $.query.get("sfz");
	//采用GET传值方式获取参数，已经取消。
	
	//采用HTML5数据存储session参数
	var sStorge = window.sessionStorage;
	var sname1 = sStorge.getItem("sname");
	var sfz1 = sStorge.getItem("sfz");
	$("#sname").html(sname1[0]+"*"+sname1[sname1.length-1]);
	$("#sfz").html(sfz1);
	
	
	//金额数量初始化
	var j = 1;
	var price=parseFloat(5999.00).toFixed(2);
	var total=10;
	var sum=0;
	sum=parseFloat(j*price).toFixed(2);
	$("#pay").html("¥"+sum);
	$("#num").html(j);
	
	//页面显示
	$("#zhuangtai").fadeIn("slow");
	$("#pchooselist").hide();
	$("body").css({"background":"url(images/bg1.jpg)","background-repeat":"no-repeat"}); 
	
	//退出身份登录
	$("#logout").click(function(){
		sStorge.clear();
		location.href = 'index.html';
	});
	
	//产品类型选址
	$("#pchoose").mouseover(function(){
		$("#pchooselist").show();
		});
	
	$(".swiper-parent").mouseover(function(){
		$("#pchooselist").hide();
		});
	
	
	//现金交易转发
	$("#pay1").click(function(){
		var sStorge = window.sessionStorage;
		//价格
		var jiage1 =$("#pay").text();
		//数量
		var shuliang1 =$("#num").text();
		//产品名称
		var cp1 = "iphone6";
		//流水号
		var sjs=parseInt(Math.random()*(999-100+1)+100);
		var myDate = new Date();
		var lsh1 = "C"+myDate.getFullYear()+""+(myDate.getMonth()+1)+""+myDate.getDate()+""+myDate.getHours()+""+myDate.getMinutes()+""+myDate.getSeconds()+""+sjs;
		
		sStorge.setItem("cp", cp1);
		sStorge.setItem("jiage", jiage1);
		sStorge.setItem("shuliang", shuliang1);
		sStorge.setItem("lsh", lsh1);
		location.href = "cashpay.html";
		
	});
	
	//非现金交易转发
	$("#pay2").click(function(){
		var sStorge = window.sessionStorage;
		//价格
		var jiage1 =$("#pay").text();
		//数量
		var shuliang1 =$("#num").text();
		//产品名称
		var cp1 = "iphone6";
		//流水号
		var sjs=parseInt(Math.random()*(999-100+1)+100);
		var myDate = new Date();
		var lsh1 = "U"+myDate.getFullYear()+""+(myDate.getMonth()+1)+""+myDate.getDate()+""+myDate.getHours()+""+myDate.getMinutes()+""+myDate.getSeconds()+""+sjs;
		
		sStorge.setItem("cp", cp1);
		sStorge.setItem("jiage", jiage1);
		sStorge.setItem("shuliang", shuliang1);
		sStorge.setItem("lsh", lsh1);
		location.href = "unionpay.html";
		
	});
	
	//返回
	$("#pay3").click(function(){
		$("#product").fadeIn("slow");
		$("#proinfoid").hide();
		j=1;
		sum=parseFloat(j*price).toFixed(2)
		$("#pay").html("¥"+sum);
		$("#num").html(j);
		stopCount();
	});
	
	//增加
	$("#j1").click(function(){
		j++;
		if(j>total){
			j=total;
		}
		sum=parseFloat(j*price).toFixed(2)
		$("#pay").html("¥"+sum);
		$("#num").html(j);
	});
	
	//减少
	$("#j2").click(function(){
		j--;
		if(j<1){
			j=1;
		}
		sum=parseFloat(j*price).toFixed(2)
		$("#pay").html("¥"+sum);
		$("#num").html(j);
	});
	
});

//显示产品详细信息
function showpro(){
	$("#proinfoid").fadeIn("slow");
	$("#product").hide();
	timedCount();
}

//计时器
var c=90;
var t;
function timedCount() 
{
	$("#times").fadeIn("slow");
	$("#times").html(c);
	c=c-1;
	t=window.setTimeout("timedCount()",1000);
	if(c<1){
		stopCount();
		
		$("#proinfoid").hide();
		$("#product").fadeIn("slow");
		
		j=1;
		sum=parseFloat(j*price).toFixed(2)
		$("#pay").html("¥"+sum);
		$("#num").html(j);
		
		//location.href = 'index.html';
	}
}

//关闭计时器
function stopCount() 
{
	clearTimeout(t);
	c=90;
	$("#times").fadeOut("slow");
}