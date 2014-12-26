<!--非现金交事件 -->
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
	//允许插卡
	EnableInserCard(1);
	//开始读卡
	ReadBankTrack2(80);
	//关闭密码键盘
	CloseTheKeyBoard(30);
	
	//采用HTML5数据存储session参数
	var sStorge = window.sessionStorage;
	//获取身份登录信息
	var sname1 = sStorge.getItem("sname");
	var sfz1 = sStorge.getItem("sfz");
	$("#sname").html(sname1[0]+"*"+sname1[sname1.length-1]);
	$("#sfz").html(sfz1);
	
	//获取产品交易信息
	var cp1 = sStorge.getItem("cp");//产品
	var jiage1 = sStorge.getItem("jiage");//价格
	jiage1 = parseInt(jiage1.substr(1,jiage1.length-1));
	var shuliang1 = sStorge.getItem("shuliang");//数量
	var lsh1 = sStorge.getItem("lsh");//流水号
	
	//设置初始界面
	$("#donghua").flash({
		src:'images/shuaka.swf',width:310,height:220
	});
	$("#infosktitle").html("请插入您的银行卡，进行交易...");
	$("#kkxx").html("等待读取银行卡信息...");
	//页面显示
	$("#zhuangtai").fadeIn("slow");
	$("#infosk").fadeIn("slow");
	$("#knum").val("");
	$("#kpass").val("");
	$("#mmxx").hide();
	$("body").css({"background":"url(images/bg1.jpg)","background-repeat":"no-repeat"}); 
	
	//退出身份登录
	$("#logout").click(function(){
		sStorge.clear();
		location.href = 'index.html';
	});
	
	
	//刷卡下一步
	$("#sknext").click(function(){
		if(jiaoyi==0){
			stopCount();
			location.href = "product.html";
		}
		else{
			c=20;
			$("#infosk").hide();
			$("#infoload").fadeIn("slow");
			$("#infoloadtitle").html("等待确定交易...");
			$("#load").html("<p>是否确认支付以下产品：<br>产品名称：<span class='green'>"+cp1+"</span><br>购买数量：<span class='green'>"+shuliang1+"</span><br>支付金额：<span class='red'>¥"+jiage1+"</span></p><p>20秒后自动放弃购买，请抓紧确认操作！</p>");
			
		}
	});
	
	
	
	//加载完成下一步
	$("#loadnext").click(function(){
		stopCount();
		$("#infoloadtitle").html("交易提示");
		$("#load").html("请稍等，交易正在进行中...");
		$("#loadnext").hide();
		//判断卡号密码及交易状态
		if(jiage1<20000){
			c=90;
			timedCount();
			$("#infoload").hide();
			$("#infook").fadeIn("slow");
			$("#cp").html(cp1);
			$("#shuliang").html(shuliang1);
			$("#jiage").html("¥"+jiage1);
			$("#lsh").html(lsh1);
		}
		else{
			c=5;
			timedCount();
			$("#load").html("交易失败，卡内余额不足！5秒后自动返回，请选择其他产品...");
		}
		
	});
	
	
	//打印凭条
	$("#printok").click(function(){
		//打印机打印内容
		var myDate = new Date();
		var rq = myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate()+" "+myDate.toLocaleTimeString();
		
		DriverManager.CleanPrint();//打印内容前要清除打印环境
		
		//LONG L_AddText(LONG m_x1, LONG m_y1, LONG m_FontSize, LPCTSTR m_FontName, LPCTSTR m_PrintText);
		DriverManager.L_AddText(0,45,18,"黑体","力麒自助服务终端演示系统");
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
	
});


var jiaoyi =0;//0-交易状态 1-正在交易，2-交易完
var kahao="";//卡号
var mima="";//密码

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
	//关闭所有设备
	ExitBankCard();
	EnableInserCard(0);
	CloseTheKeyBoard(30);
	
}


//读取银行卡号；m_TimeOut设置读卡超时单位为秒
function ReadBankTrack2(m_Timeout)
{
	DriverManager.ReadBankTrack2(m_Timeout);
}
//退卡
function ExitBankCard()
{
	DriverManager.ExitBankCard();
}
//1允许，0禁止插卡
function EnableInserCard(m_index)
{
	DriverManager.EnableInserCard(m_index);
}

//打开密码键盘
function OpenTheKeyBoard(m_TimeOut)
{
	DriverManager.OpenTheKeyBoard(m_TimeOut);
}

//关闭密码键盘
function CloseTheKeyBoard(m_TimeOut)
{
	DriverManager.CloseTheKeyBoard(m_TimeOut);
}
