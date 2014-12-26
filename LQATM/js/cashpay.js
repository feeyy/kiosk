<!--现金交易事件 -->
<!--开发者：陈劲全（QQ:820094076） 最后编辑时间：2014-10-15 -->

$(document).ready(function(){
	//禁止右键
	$(document).bind("contextmenu",function(){
		return false;
	});
	$(document).bind("selectstart",function(){
		return false;
	});
	//开始计时
	timedCount();
	
	//开始投币
	$("#counter").html("¥0000");
	startc();
	
	//采用HTML5数据存储session参数
	var sStorge = window.sessionStorage;
	//获取身份登录信息
	var sname1 = sStorge.getItem("sname");
	var sfz1 = sStorge.getItem("sfz");
	$("#sname").html(sname1[0]+"*"+sname1[sname1.length-1]);
	$("#sfz").html(sfz1);
	
	
	//页面显示
	$("#zhuangtai").fadeIn("slow");
	$("#infosk").fadeIn("slow");
	$("body").css({"background":"url(images/bg1.jpg)","background-repeat":"no-repeat"}); 
	
	//获取产品交易信息
	var cp1 = sStorge.getItem("cp");
	var jiage1 = sStorge.getItem("jiage");
	jiage1 = parseInt(jiage1.substr(1,jiage1.length-1));
	var shuliang1 = sStorge.getItem("shuliang");
	var lsh1 = sStorge.getItem("lsh");//流水号
	
	//退出身份登录
	$("#logout").click(function(){
		sStorge.clear();
		location.href = 'index.html';
	});
	
	//现金交易下一步
	$("#sknext").click(function(){
		if(jiaoyi==1){
			stopCount();
			$("#infosk").hide();
			$("#infoload").fadeIn("slow");
			$("#infoloadtitle").html("请等待...");
			$("#load").html("请注意取回您的找零现金，交易正在进行中...");
			
		}
		else{
			stopCount();
			location.href = "product.html";
		}
		
	});
	
	//正在交易下一步
	$("#loadnext").click(function(){
		timedCount();
		$("#infoload").hide();
		$("#infook").fadeIn("slow");
		$("#cp").html(cp1);
		$("#shuliang").html(shuliang1);
		$("#jiage").html("¥"+jiage1);
		$("#lsh").html(lsh1);
		
	});
	
	//打印凭条
	$("#printok").click(function(){
		//打印机打印内容
		var myDate = new Date();
		var rq = myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate()+" "+myDate.toLocaleTimeString();
		
		DriverManager.CleanPrint();//打印内容前要清除打印环境
		
		//LONG L_AddText(LONG m_x1, LONG m_y1, LONG m_FontSize, LPCTSTR m_FontName, LPCTSTR m_PrintText);
		DriverManager.L_AddText(0,45,18,"黑体","LQATM自助服务终端演示系统");
		DriverManager.L_AddText(0,70,12,"宋体","您办理的业务是：购买："+cp1);
		DriverManager.L_AddText(0,90,12,"宋体","数量："+shuliang1);
		DriverManager.L_AddText(0,110,12,"宋体","金额：¥"+jiage1);
		DriverManager.L_AddText(0,130,12,"宋体","流水号："+lsh1);
		DriverManager.L_AddText(0,150,12,"宋体","打印日期："+rq);
		
		DriverManager.L_AddLogo(0,0,"logo.bmp");
		DriverManager.L_BeginPrint();//执行打印动作
		
	
	});
	
	//交易完成返回
	$("#fhok").click(function(){
		stopCount();
		location.href = "product.html";
	});
	
	//模拟滑动投币
	var n = 0;//初始金额
	var s;
	var sm1 = 1000;//每次投币价格
	var sm2 = jiage1;//产品价格
	var jiaoyi=0;//交易状态 0-正在交易，1-交易完成
	function changeNum() {
		
		n=n+sm1;
		
		$("#counter").animate({
			top: "+=50px", opacity: "0" 
		}
		, "slow",function () {
			$("#counter").html("¥"+parseFloat(n).toFixed(0));
			if(n>=sm2){
				jiaoyi=1;
				$("#sknext").html("下一步");
				stopc();
				$("#counterts").html("投币完成，应收货币：¥"+sm2+"，实际收币：¥"+parseFloat(n).toFixed(0)+"，应找零：¥"+parseFloat(n-sm2).toFixed(0)+"<br>请注意取回找零现金！");
			}
		}).animate({
			top: "-=100px" 
		}
		, "slow")
		.animate({
			top: "+=50px", opacity: "1" 
		}
		, "slow");
		
	}
	//开始模拟投币
	function startc(){
		s=window.setInterval(changeNum,3000);
	}
	//结束模拟投币
	function stopc(){
		clearTimeout(s);
	}
	
});

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
		location.href = "product.html";
	}
}

//关闭计时器
function stopCount() 
{
	clearTimeout(t);
	c=90;
	$("#times").fadeOut("slow");
}