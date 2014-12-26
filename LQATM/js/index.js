<!--首页业务事件 -->
<!--开发者：陈劲全（QQ:820094076） 最后编辑时间：2014-10-15 -->

$(document).ready(function(){
	//禁止右键
	$(document).bind("contextmenu",function(){
		return false;
	});
	$(document).bind("selectstart",function(){
		return false;
	});
	
	//停止计时
	stopCount();
	
	
	//开始按钮
	$("#star").click(function(){
		$("#chooseid").fadeIn("fast");
		//$("#chooseid").css({"top": "-=80px","opacity": "0"});
		$("#chooseid").animate({top: "+=160px", opacity: "1" }, "slow");
		
		$("body").css({"background":"url(images/bg1.jpg)","background-repeat":"no-repeat"}); 
		$("#star").hide();
		$("#register").hide();
	});
	
	
	//会员注册
	$("#register").click(function(){
		location.href = "register.html";
	});
	
	
	
	//取消登录
	$("#denglu").click(function(){
		
		$("#chooseid").animate({top: "-=160px", opacity: "0" }, "fast");
		//$("#chooseid").css({"top": "+=80px","opacity": "1"});
		//$("#chooseid").animate({top: "+=80px", opacity: "1" }, "fast");
		$("#chooseid").fadeOut("fast");
		
		$("body").css({"background":"url(images/bg.jpg)","background-repeat":"no-repeat"}); 
		$("#star").show();
		$("#register").show();
	});
	
	//取消
	$("#gonext").click(function(){
		stopCount();
	});
	
});

//用户登录
	function userlogin(ac){
		//开始计时
		timedCount();
		$("#star").hide();
		$("#register").hide();
		$("#chooseid").animate({top: "-=160px", opacity: "1" }, "slow");
		$("#chooseid").hide();
		$("#infoid").fadeIn("slow");
		
		
		switch (ac){
			case "1":
			//alert("二代身份证");
			//设置动画提示
			
			$("#infoidtitle").html("等待读取身份证信息中....");
			$("#sfztishi").html("请将二代身份证放到读卡处...");
			ReadSSidCard(80);
			$("#donghua").flash({
				src:'images/sfz.swf',width:310,height:220
			});
			break;
			
			case "2":
			//alert("刷磁条卡登录");
			//设置动画提示
			
			$("#infoidtitle").html("等待读取会员卡登录....");
			$("#sfztishi").html("请将会员卡插入读卡器内进行登录...");
			EnableInserCard(1);
			ReadBankTrack2(80);
			$("#donghua").flash({
				src:'images/shuaka.swf',width:310,height:220
			});
			break;
			
			case "3":
			//alert("指纹仪登录");
			//设置动画提示
			
			$("#infoidtitle").html("等待读取指纹仪登录....");
			$("#sfztishi").html("请将手指放置指纹仪上进行验证...");
			SetEnableFingerPrint(1);
			$("#donghua").flash({
				src:'images/zhiwen.swf',width:310,height:220
			});
			//Identification();
			break;
			
			case "4":
			//alert("RFID登录");
			//设置动画提示
			
			$("#infoidtitle").html("等待读取RFID登录....");
			$("#sfztishi").html("请将RFID卡靠近读卡器进行识别...");
			$("#donghua").flash({
				src:'',width:310,height:220
			});
			break;
			
			case "5":
			//alert("扫描二维码登录");
			//设置动画提示
			
			$("#infoidtitle").html("等待扫描二维码登录....");
			$("#sfztishi").html("请将二维码图片放置二维码扫描仪正下方进行识别...");
			$("#donghua").flash({
				src:'',width:310,height:220
			});
			break;
			
			case "6":
			//alert("游客身份登录");
			//设置动画提示
			var sStorge = window.sessionStorage;
			if(sStorge){
			sStorge.clear();
			sStorge.setItem("sname", "游客账户");
			sStorge.setItem("sfz", "00000000000");
			location.href = "product.html";
			}else{
			alert("该浏览暂不支持HTML5本地数据存储：localStorage！");
			}
			
			break;
		}
		
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
		//location.href = 'index.html';
	}
}
//关闭计时器
function stopCount() 
{
	clearTimeout(t);
	c=90;
	$("#donghua").html("");
	$("#times").fadeOut("slow");
	$("#star").show();
	$("#register").show();
	$("#infoid").fadeOut("slow");
	$("body").css({"background":"url(images/bg.jpg)","background-repeat":"no-repeat"}); 
	//取消读卡
	CancelReadPersonIDCard();
	ExitBankCard();
	EnableInserCard(0);
	SetEnableFingerPrint(0)

}

//以下为各设备调用事件

//读神思读卡器，m_TimeOut超时参数。
function ReadSSidCard(m_TimeOut)
{
	DriverManager.ReadSSidCard(m_TimeOut);
}
//取消神思读卡器读卡
function CancelReadPersonIDCard()
{
	DriverManager.CancelReadPersonIDCard();
	
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

function Identification()//指纹验证
{
	DriverManager.Identification();
	//RegeditState.value=("等待指纹输入..");
}
function SetEnableFingerPrint(m_Enable)
{
	DriverManager.SetEnableFingerPrint(m_Enable);
}